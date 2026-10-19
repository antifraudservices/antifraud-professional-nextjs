// Flow contract: reuse shared test fixtures and canonical types; do not introduce duplicated literals.
import { describe, expect, it } from 'vitest'
import { readProfessionalEnvironment } from '../src/config/environment'

describe('professional environment authority', () => {
  it('runs Demo while showing later environments as disabled', () => {
    expect(readProfessionalEnvironment({})).toEqual({active: 'demo', testNetworkEnabled: false, productionEnabled: false})
  })

  it('ignores public browser-shaped environment and prefix values', () => {
    expect(readProfessionalEnvironment({
      NEXT_PUBLIC_ANTIFRAUD_NETWORK_KIND: 'production',
      NEXT_PUBLIC_COLLECTION_PREFIX: 'antifraud_production_',
    })).toEqual({active: 'demo', testNetworkEnabled: false, productionEnabled: false})
  })
})
