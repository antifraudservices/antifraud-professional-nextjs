export const PROFESSIONAL_PORTAL_SECTORS = ['legal-services', 'accounting', 'education', 'insurance', 'professional-services'] as const
export type ProfessionalPortalSector = typeof PROFESSIONAL_PORTAL_SECTORS[number]
export type ProfessionalPortalProfile = Readonly<{ id: string; brandName: string; organizationName: string; contextLabel: string; sector: ProfessionalPortalSector; sectorLabel: string; accentColor: string }>
const LABELS: Readonly<Record<ProfessionalPortalSector, string>> = Object.freeze({'legal-services': 'Legal services', accounting: 'Accounting', education: 'Education', insurance: 'Insurance', 'professional-services': 'Professional services'})
const DEFAULT_PROFILE = Object.freeze({id: 'antifraud-professional', brandName: 'antifraud.online', organizationName: 'Active organization', contextLabel: 'Professional workspace', sector: 'professional-services', accentColor: '#009BFA'})

export function readProfessionalPortalProfile(environment: Readonly<Record<string, string | undefined>> = process.env): ProfessionalPortalProfile {
  const raw = environment.ANTIFRAUD_PROFESSIONAL_PROFILE_JSON
  let candidate: unknown = DEFAULT_PROFILE
  if (raw) { try { candidate = JSON.parse(raw) } catch { throw new Error('professional_portal_profile_invalid_json') } }
  if (!candidate || typeof candidate !== 'object') throw new Error('professional_portal_profile_invalid')
  const value = candidate as Record<string, unknown>
  if (!PROFESSIONAL_PORTAL_SECTORS.includes(value.sector as ProfessionalPortalSector)) throw new Error('professional_portal_sector_not_allowed')
  for (const field of ['id', 'brandName', 'organizationName', 'contextLabel', 'accentColor'] as const) if (typeof value[field] !== 'string' || value[field].trim().length === 0) throw new Error(`professional_portal_${field}_invalid`)
  if (!/^#[0-9a-f]{6}$/iu.test(value.accentColor as string)) throw new Error('professional_portal_accentColor_invalid')
  const sector = value.sector as ProfessionalPortalSector
  return {id: value.id as string, brandName: value.brandName as string, organizationName: value.organizationName as string, contextLabel: value.contextLabel as string, sector, sectorLabel: LABELS[sector], accentColor: value.accentColor as string}
}
