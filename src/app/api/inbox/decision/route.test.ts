// Flow contract: the Professional browser submits only an addressed evidence locator and decision intent; its BFF supplies the fixed issuer credential and SDK rejects browser-authored actor, organization or ledger authority.
import { afterEach, describe, expect, it, vi } from 'vitest'

import { POST } from './route'

afterEach(() => {
  vi.unstubAllGlobals()
  delete process.env.ANTIFRAUD_GATEWAY_BASE_URL
  delete process.env.ANTIFRAUD_GATEWAY_BEARER
})

describe('Professional issuer decision BFF', () => {
  it('submits an exact addressed decision through the high-level SDK', async () => {
    process.env.ANTIFRAUD_GATEWAY_BASE_URL = 'https://gateway.example.invalid'
    process.env.ANTIFRAUD_GATEWAY_BEARER = 'server-only-professional-token'
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(JSON.parse(String(init?.body))).toEqual({decision: 'confirmed', issuerProofReference: 'proof:issuer:demo-001'})
      return Response.json({status: 'confirmed', transactionId: 'virtual-demo:001'})
    })
    vi.stubGlobal('fetch', fetchMock)

    const response = await POST(new Request('http://portal.invalid/api/inbox/decision', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        evidenceLocator: 'evidence:demo:001',
        decision: 'confirmed',
        issuerProofReference: 'proof:issuer:demo-001',
      }),
    }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({status: 'confirmed', transactionId: 'virtual-demo:001'})
    expect(fetchMock).toHaveBeenCalledWith(
      'https://gateway.example.invalid/v1/clearing-house/evidence/evidence%3Ademo%3A001/decision',
      expect.objectContaining({method: 'POST'}),
    )
  })

  it('rejects browser-authored authority before calling the Gateway', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const response = await POST(new Request('http://portal.invalid/api/inbox/decision', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        evidenceLocator: 'evidence:demo:001', decision: 'confirmed', issuerProofReference: 'proof:issuer:demo-001',
        organizationReference: 'organization:attacker',
      }),
    }))
    expect(response.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
