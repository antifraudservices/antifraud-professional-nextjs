// Flow contract: an authenticated Professional BFF opens only the confidential qualification evidence addressed to its fixed Gateway actor; the browser supplies an opaque locator but never organization, tenant, channel, decryption key or storage authority.
import { beforeEach, describe, expect, it, vi } from 'vitest'

const readClearingHouseEvidence = vi.fn()

vi.mock('../../../../server/antifraud-gateway', () => ({
  professionalGatewayClient: () => ({readClearingHouseEvidence}),
}))

describe('Professional issuer evidence detail BFF', () => {
  beforeEach(() => readClearingHouseEvidence.mockReset())

  it('returns the Gateway-authorized confidential detail for the opaque locator', async () => {
    readClearingHouseEvidence.mockResolvedValue({
      evidenceLocator: 'evidence:demo:001',
      confidentialClaims: {assertionKind: 'employer-attestation'},
    })
    const {GET} = await import('./route')
    const response = await GET(new Request('http://portal.invalid/api/inbox/evidence%3Ademo%3A001'), {
      params: Promise.resolve({evidenceLocator: 'evidence:demo:001'}),
    })
    expect(response.status).toBe(200)
    expect(readClearingHouseEvidence).toHaveBeenCalledWith('evidence:demo:001')
    expect(await response.json()).toEqual({
      evidenceLocator: 'evidence:demo:001',
      confidentialClaims: {assertionKind: 'employer-attestation'},
    })
  })
})
