// Flow contract: the authenticated Professional browser calls its own BFF, which keeps the Gateway bearer server-only, uses the high-level Node SDK and returns only references addressed to the fixed issuer actor.
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GET } from './route'

afterEach(() => {
  vi.unstubAllGlobals()
  delete process.env.ANTIFRAUD_GATEWAY_BASE_URL
  delete process.env.ANTIFRAUD_GATEWAY_BEARER
})

describe('Professional issuer inbox BFF', () => {
  it('reads the authoritative Gateway inbox without exposing authority in browser input', async () => {
    process.env.ANTIFRAUD_GATEWAY_BASE_URL = 'https://gateway.example.invalid'
    process.env.ANTIFRAUD_GATEWAY_BEARER = 'server-only-professional-token'
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      expect(init?.headers).toMatchObject({authorization: 'Bearer server-only-professional-token'})
      return Response.json({items: [{evidenceLocator: 'evidence:demo:001', lifecycleStatus: 'pending-issuer-confirmation'}]})
    })
    vi.stubGlobal('fetch', fetchMock)

    const response = await GET()
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({items: [{evidenceLocator: 'evidence:demo:001', lifecycleStatus: 'pending-issuer-confirmation'}]})
    expect(fetchMock).toHaveBeenCalledWith('https://gateway.example.invalid/v1/clearing-house/inbox', expect.objectContaining({method: 'GET'}))
  })
})
