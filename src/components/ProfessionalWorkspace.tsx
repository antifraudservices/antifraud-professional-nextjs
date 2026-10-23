'use client'

import { useCallback, useEffect, useState } from 'react'
import { CatalogManagementWorkspace, NeutralWorkspace, ProfessionalOperationsHome, SectorPortalShell, TrustVerificationWorkspace, type PortalEnvironment, type ProfessionalDestination, type SectorPortalNavigationItem, type TrustVerificationKind } from 'antifraud-portal-components-react'
import { PortalHeader } from 'uhc-portal-components-react'
import type { ProfessionalPortalProfile } from '../config/portal-profile'

type Environment = Readonly<{active: PortalEnvironment; testNetworkEnabled: boolean; productionEnabled: boolean}>
type InboxItem = Readonly<{evidenceLocator: string; lifecycleStatus: string; deliveryState: string; channelFamily: string; queuedAt: string}>
type EvidenceDetail = Readonly<{evidenceLocator: string; confidentialClaims: Readonly<Record<string, unknown>>}>
type View = 'home' | 'clients' | 'work' | 'scheduling' | 'catalog' | 'communications' | 'trust'
type WorkView = 'evidence' | 'inbox' | 'tasks'

const NAVIGATION: readonly SectorPortalNavigationItem[] = Object.freeze([
  {id: 'home', label: 'Home'}, {id: 'clients', label: 'Clients'}, {id: 'work', label: 'Work'}, {id: 'scheduling', label: 'Scheduling'},
  {id: 'catalog', label: 'Catalog'}, {id: 'communications', label: 'Communications'}, {id: 'trust', label: 'Trust'},
])

function classificationFrom(detail: EvidenceDetail | undefined): Readonly<{system: string; version?: string; uri?: string; code: string; display?: string}> | undefined {
  const qualification = detail?.confidentialClaims.qualification
  if (!qualification || typeof qualification !== 'object' || Array.isArray(qualification)) return undefined
  const classification = (qualification as Record<string, unknown>).classification
  if (!classification || typeof classification !== 'object' || Array.isArray(classification)) return undefined
  const value = classification as Record<string, unknown>
  if (typeof value.system !== 'string' || typeof value.code !== 'string') return undefined
  return {system: value.system, code: value.code, ...(typeof value.version === 'string' ? {version: value.version} : {}), ...(typeof value.uri === 'string' ? {uri: value.uri} : {}), ...(typeof value.display === 'string' ? {display: value.display} : {})}
}

export function ProfessionalWorkspace({environment, profile}: Readonly<{environment: Environment; profile: ProfessionalPortalProfile}>) {
  const [view, setView] = useState<View>('home')
  const [workView, setWorkView] = useState<WorkView>('evidence')
  const [trustDraft, setTrustDraft] = useState<TrustVerificationKind | null>(null)
  const [status, setStatus] = useState('Ready. No authoritative operation has been requested.')
  const [items, setItems] = useState<readonly InboxItem[]>([])
  const [details, setDetails] = useState<Readonly<Record<string, EvidenceDetail>>>({})
  const [loadingInbox, setLoadingInbox] = useState(false)
  const networkLabel = environment.active === 'demo' ? 'Demo · no authoritative write' : environment.active === 'test-network' ? 'Test Network' : 'Production'

  const loadInbox = useCallback(async () => {
    setLoadingInbox(true)
    try {
      const response = await fetch('/api/inbox', {cache: 'no-store'})
      const payload = await response.json() as {items?: readonly InboxItem[]; error?: string}
      if (!response.ok) throw new Error(payload.error ?? 'Issuer inbox failed.')
      setItems(payload.items ?? []); setStatus('Authoritative issuer inbox loaded from the Gateway.')
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Issuer inbox failed.') }
    finally { setLoadingInbox(false) }
  }, [])

  useEffect(() => { if (view === 'work' && workView === 'inbox') void loadInbox() }, [loadInbox, view, workView])

  async function openEvidence(item: InboxItem) {
    setStatus('Opening confidential evidence…')
    const response = await fetch(`/api/inbox/${encodeURIComponent(item.evidenceLocator)}`, {cache: 'no-store'})
    const payload = await response.json() as EvidenceDetail & {error?: string}
    if (!response.ok) { setStatus(payload.error ?? 'Confidential evidence failed.'); return }
    setDetails(current => ({...current, [item.evidenceLocator]: payload})); setStatus('Confidential evidence opened for the addressed issuer.')
  }

  async function decide(item: InboxItem, decision: 'confirmed' | 'rejected') {
    setStatus(`Submitting ${decision} decision…`)
    const response = await fetch('/api/inbox/decision', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({evidenceLocator: item.evidenceLocator, decision, issuerProofReference: `proof:issuer:${item.evidenceLocator}`})})
    const payload = await response.json() as {error?: string}
    if (!response.ok) { setStatus(payload.error ?? 'Issuer decision failed.'); return }
    await loadInbox()
  }

  function openDestination(destination: ProfessionalDestination) {
    setView(destination === 'assigned-evidence' ? 'work' : destination)
    if (destination === 'assigned-evidence') setWorkView('inbox')
  }

  const portalName = `${profile.sectorLabel} · Professional`
  const header = <PortalHeader brand={{family: 'professional', productName: profile.brandName, organizationName: `${portalName} · Authorized professional · ${networkLabel}`, homeHref: '#'}} copy={{home: 'Home', accountAndPreferences: 'Account and preferences', notSignedIn: 'Not signed in', appearance: 'Appearance', textSize: 'Text size', themes: {light: 'Light', dark: 'Dark', system: 'System'}, language: 'Language', chooseAccess: 'Account', signOut: 'Sign out'}} accountIdentifier={profile.contextLabel} guestActionHref="#" storageNamespace="antifraud-professional"/>
  return <SectorPortalShell activeNavigation={view} header={header} navigation={NAVIGATION} onNavigate={id => setView(id as View)} portalName={portalName}>
    {view === 'home' ? <ProfessionalOperationsHome organizationName={profile.organizationName} profileLabel={profile.sectorLabel} onOpen={openDestination}/> : null}
    {view === 'clients' ? <NeutralWorkspace title="Clients" description="Manage authorized client organizations, contacts and subject records. A directory relationship never grants evidence access."/> : null}
    {view === 'scheduling' ? <NeutralWorkspace title="Scheduling" description="Manage availability, appointments, assigned professionals and service locations through the shared scheduling contract."/> : null}
    {view === 'catalog' ? <CatalogManagementWorkspace onOpen={kind => setStatus(`${kind} management requires the shared catalog BFF adapter.`)}/> : null}
    {view === 'communications' ? <NeutralWorkspace title="Communications" description="Manage secure, purpose-bound conversations attached to an authorized client, task or service context."/> : null}
    {view === 'trust' ? <><TrustVerificationWorkspace requests={[]} onSelect={kind => {setTrustDraft(kind); setStatus('Trust request not submitted: an authoritative provider adapter is required.')}}/>{trustDraft ? <div className="professional-trust-draft" role="note">Draft: {trustDraft.replaceAll('-', ' ')}. No result has been asserted.</div> : null}</> : null}
    {view === 'work' ? <section className="professional-workspace"><header><h1>Work</h1><p>Evidence, assigned tasks and decisions for the active organization.</p><div className="work-tabs"><button type="button" aria-current={workView === 'evidence' ? 'page' : undefined} onClick={() => setWorkView('evidence')}>Evidence task</button><button type="button" aria-current={workView === 'inbox' ? 'page' : undefined} onClick={() => setWorkView('inbox')}>Issuer inbox</button><button type="button" aria-current={workView === 'tasks' ? 'page' : undefined} onClick={() => setWorkView('tasks')}>Tasks</button></div></header>
      {workView === 'evidence' ? <div><h2>Evidence preparation</h2><p>Prepare a sector-neutral evidence task while preserving the source issuer as a separate authority.</p><button type="button" onClick={() => setStatus('Evidence prepared; signing requires the managed-wallet BFF session.')}>Prepare evidence</button></div> : null}
      {workView === 'tasks' ? <div className="empty">Assigned tasks appear only after authoritative workspace readback.</div> : null}
      {workView === 'inbox' ? <div><h2>Issuer inbox</h2><p>Only references addressed to the authenticated organization appear here.</p>{loadingInbox && items.length === 0 ? <div className="empty">Loading addressed references…</div> : items.length === 0 ? <div className="empty">No addressed references.</div> : <div className="inbox-list">{items.map(item => {
        const detail = details[item.evidenceLocator]; const classification = classificationFrom(detail)
        return <article key={item.evidenceLocator} aria-label={item.evidenceLocator} className="inbox-item"><h3>{item.evidenceLocator}</h3><dl><div><dt>Status</dt><dd>{item.lifecycleStatus}</dd></div><div><dt>Delivery</dt><dd>{item.deliveryState}</dd></div><div><dt>Domain</dt><dd>{item.channelFamily}</dd></div></dl><button className="secondary" onClick={() => void openEvidence(item)}>Open evidence</button>{classification ? <div className="qualification-detail" aria-label="Qualification classification"><h3>{classification.display ?? classification.code}</h3><p>Employer-reviewed evidence; issuer decision pending.</p><dl><div><dt>System</dt><dd>{classification.system}</dd></div><div><dt>Version</dt><dd>{classification.version ?? 'Unversioned'}</dd></div>{classification.uri ? <div><dt>URI</dt><dd>{classification.uri}</dd></div> : null}<div><dt>Code</dt><dd>{classification.code}</dd></div></dl></div> : null}{item.lifecycleStatus === 'pending-issuer-confirmation' && detail ? <div className="actions"><button onClick={() => void decide(item, 'confirmed')}>Confirm evidence</button><button className="secondary" onClick={() => void decide(item, 'rejected')}>Reject evidence</button></div> : null}</article>
      })}</div>}</div> : null}</section> : null}
    <p role="status" className="professional-status">{status}</p>
  </SectorPortalShell>
}
