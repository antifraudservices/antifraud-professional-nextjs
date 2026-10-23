import { ProfessionalWorkspace } from '../components/ProfessionalWorkspace'
import { readProfessionalEnvironment } from '../config/environment'
import { readProfessionalPortalProfile } from '../config/portal-profile'

export default function HomePage() {
  return <ProfessionalWorkspace environment={readProfessionalEnvironment()} profile={readProfessionalPortalProfile()} />
}
