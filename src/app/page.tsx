import { ProfessionalWorkspace } from '../components/ProfessionalWorkspace'
import { readProfessionalEnvironment } from '../config/environment'

export default function HomePage() {
  return <ProfessionalWorkspace environment={readProfessionalEnvironment()} />
}
