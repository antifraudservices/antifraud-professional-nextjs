// Flow contract: an education professional opens only the authenticated issuer inbox, submits an exact addressed decision through the BFF and sees authoritative Gateway state after the BFF reload; the browser never supplies tenant or ledger authority.
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ProfessionalWorkspace } from '../src/components/ProfessionalWorkspace'

afterEach(() => vi.unstubAllGlobals())

describe('Professional workspace', () => {
  it('loads addressed issuer evidence and confirms it with authoritative reload', async () => {
    const pending = {
      evidenceLocator: 'evidence:demo:001', lifecycleStatus: 'pending-issuer-confirmation',
      deliveryState: 'queued', channelFamily: 'qualification-education', queuedAt: '2026-10-18T00:00:00.000Z',
    }
    const confirmed = {...pending, lifecycleStatus: 'confirmed', deliveryState: 'delivered'}
    const detail = {
      evidenceLocator: pending.evidenceLocator,
      confidentialClaims: {
        qualification: {classification: {
          system: 'urn:antifraud:terminology:synthetic:education-qualification',
          version: 'demo-2026-10',
          uri: 'urn:antifraud:qualification:synthetic-bachelor-001',
          code: 'synthetic-bachelor-001',
          display: 'Synthetic bachelor-level qualification',
        }},
        assertionKind: 'employer-attestation',
      },
    }
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({items: [pending]}))
      .mockResolvedValueOnce(Response.json(detail))
      .mockResolvedValueOnce(Response.json({status: 'confirmed', transactionId: 'virtual-demo:001'}))
      .mockResolvedValueOnce(Response.json({items: [confirmed]}))
    vi.stubGlobal('fetch', fetchMock)

    render(<ProfessionalWorkspace environment={{active: 'demo', testNetworkEnabled: false, productionEnabled: false}} />)
    fireEvent.click(screen.getByRole('button', {name: 'Issuer inbox'}))

    expect(await screen.findByRole('article', {name: 'evidence:demo:001'})).toBeVisible()
    fireEvent.click(screen.getByRole('button', {name: 'Open evidence'}))
    expect(await screen.findByText('synthetic-bachelor-001')).toBeVisible()
    expect(screen.getByText('demo-2026-10')).toBeVisible()
    expect(screen.getByText('Employer-reviewed evidence; issuer decision pending.')).toBeVisible()
    fireEvent.click(screen.getByRole('button', {name: 'Confirm evidence'}))
    await waitFor(() => expect(screen.getByText('confirmed', {exact: true})).toBeVisible())

    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/inbox', expect.objectContaining({cache: 'no-store'}))
    expect(fetchMock).toHaveBeenNthCalledWith(2, '/api/inbox/evidence%3Ademo%3A001', expect.objectContaining({cache: 'no-store'}))
    const decision = fetchMock.mock.calls[2]
    expect(decision[0]).toBe('/api/inbox/decision')
    expect(JSON.parse(decision[1].body)).toEqual({
      evidenceLocator: 'evidence:demo:001', decision: 'confirmed', issuerProofReference: 'proof:issuer:evidence:demo:001',
    })
    expect(decision[1].body).not.toMatch(/organizationReference|tenantId|channel|zone|smartContract/u)
  })
})
