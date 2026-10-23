// Flow contract: the Professional white-label profile is trusted server configuration; reviewed sectors resolve neutral vocabulary and an unreviewed browser-selected sector fails closed.
import { describe, expect, it } from 'vitest'
import { readProfessionalPortalProfile } from '../src/config/portal-profile'

describe('professional portal profile', () => {
  it('resolves a reviewed accounting profile', () => {
    expect(readProfessionalPortalProfile({ANTIFRAUD_PROFESSIONAL_PROFILE_JSON: JSON.stringify({
      id: 'accounting-es', brandName: 'Example Accounting', organizationName: 'Example Organization', contextLabel: 'Professional workspace', sector: 'accounting', accentColor: '#009BFA',
    })})).toEqual({id: 'accounting-es', brandName: 'Example Accounting', organizationName: 'Example Organization', contextLabel: 'Professional workspace', sector: 'accounting', sectorLabel: 'Accounting', accentColor: '#009BFA'})
  })

  it('rejects an unreviewed sector', () => {
    expect(() => readProfessionalPortalProfile({ANTIFRAUD_PROFESSIONAL_PROFILE_JSON: JSON.stringify({id: 'x', brandName: 'X', organizationName: 'X', contextLabel: 'X', sector: 'anything', accentColor: '#009BFA'})})).toThrow('professional_portal_sector_not_allowed')
  })
})
