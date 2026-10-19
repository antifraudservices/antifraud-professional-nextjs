'use client'

import { useCallback, useEffect, useState } from 'react'
import { EnvironmentSelector, type PortalEnvironment } from 'antifraud-portal-components-react'

type Environment = Readonly<{
  active: PortalEnvironment
  testNetworkEnabled: boolean
  productionEnabled: boolean
}>

type InboxItem = Readonly<{
  evidenceLocator: string
  lifecycleStatus: string
  deliveryState: string
  channelFamily: string
  queuedAt: string
}>

export function ProfessionalWorkspace({environment}: Readonly<{environment: Environment}>) {
  const [view, setView] = useState<'evidence' | 'inbox'>('evidence')
  const [status, setStatus] = useState('Ready for a synthetic education-evidence task.')
  const [items, setItems] = useState<readonly InboxItem[]>([])
  const [loadingInbox, setLoadingInbox] = useState(false)

  const loadInbox = useCallback(async () => {
    setLoadingInbox(true)
    try {
      const response = await fetch('/api/inbox', {cache: 'no-store'})
      const payload = await response.json() as {items?: readonly InboxItem[]; error?: string}
      if (!response.ok) throw new Error(payload.error ?? 'Issuer inbox failed.')
      setItems(payload.items ?? [])
      setStatus('Authoritative issuer inbox loaded from the Gateway.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Issuer inbox failed.')
    } finally {
      setLoadingInbox(false)
    }
  }, [])

  useEffect(() => {
    if (view === 'inbox') void loadInbox()
  }, [loadInbox, view])

  async function decide(item: InboxItem, decision: 'confirmed' | 'rejected') {
    setStatus(`Submitting ${decision} decision…`)
    const response = await fetch('/api/inbox/decision', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        evidenceLocator: item.evidenceLocator,
        decision,
        issuerProofReference: `proof:issuer:${item.evidenceLocator}`,
      }),
    })
    const payload = await response.json() as {error?: string}
    if (!response.ok) {
      setStatus(payload.error ?? 'Issuer decision failed.')
      return
    }
    await loadInbox()
  }
  return <div className="portal-shell">
    <header><a href="/" className="brand"><span aria-hidden="true">A</span><strong>Antifraud Professional</strong></a><span>Education profile</span></header>
    <aside>
      <EnvironmentSelector value={environment.active} onChange={() => undefined} testNetworkEnabled={environment.testNetworkEnabled} productionEnabled={environment.productionEnabled}/>
      <nav aria-label="Professional workspace"><button aria-current={view === 'evidence' ? 'page' : undefined} onClick={() => setView('evidence')}>Evidence task</button><button aria-current={view === 'inbox' ? 'page' : undefined} onClick={() => setView('inbox')}>Issuer inbox</button></nav>
    </aside>
    <main>
      <div className="demo-banner"><strong>Demo — simulated blockchain</strong><span>The BFF uses the same high-level SDK and Gateway contract intended for Test Network.</span></div>
      {view === 'evidence' ? <section><h1>Education evidence</h1><p>Review a synthetic qualification attachment, record the employer attestation and preserve the source issuer as a separate authority.</p><dl><div><dt>Document model</dt><dd>Schema.org DigitalDocument / MediaObject</dd></div><div><dt>Binary transport</dt><dd>DIDComm attachment</dd></div><div><dt>Ledger content</dt><dd>Minimized anchor only</dd></div></dl><button onClick={() => setStatus('Synthetic evidence prepared; signing requires the managed-wallet BFF session.')}>Prepare synthetic evidence</button></section> : <section><h1>Issuer inbox</h1><p>Only references addressed to the authenticated organization appear here.</p>{loadingInbox && items.length === 0 ? <div className="empty">Loading addressed references…</div> : items.length === 0 ? <div className="empty">No addressed references.</div> : <div className="inbox-list">{items.map(item => <article key={item.evidenceLocator} aria-label={item.evidenceLocator} className="inbox-item"><h2>{item.evidenceLocator}</h2><dl><div><dt>Status</dt><dd>{item.lifecycleStatus}</dd></div><div><dt>Delivery</dt><dd>{item.deliveryState}</dd></div><div><dt>Domain</dt><dd>{item.channelFamily}</dd></div></dl>{item.lifecycleStatus === 'pending-issuer-confirmation' && <div className="actions"><button onClick={() => void decide(item, 'confirmed')}>Confirm evidence</button><button className="secondary" onClick={() => void decide(item, 'rejected')}>Reject evidence</button></div>}</article>)}</div>}</section>}
      <p role="status" className="status">{status}</p>
    </main>
  </div>
}
