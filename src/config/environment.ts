export type ProfessionalEnvironment = Readonly<{
  active: 'demo' | 'test-network' | 'production'
  testNetworkEnabled: boolean
  productionEnabled: boolean
}>

export function readProfessionalEnvironment(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): ProfessionalEnvironment {
  const active = environment.ANTIFRAUD_NETWORK_KIND ?? 'demo'
  const testNetworkEnabled = environment.ANTIFRAUD_TEST_NETWORK_ENABLED === 'true'
  const productionEnabled = environment.ANTIFRAUD_PRODUCTION_ENABLED === 'true'
  if (active === 'demo' || active === 'test') return {active: 'demo', testNetworkEnabled, productionEnabled}
  if (active === 'test-network' && testNetworkEnabled) return {active, testNetworkEnabled, productionEnabled}
  if ((active === 'network' || active === 'production') && productionEnabled) {
    return {active: 'production', testNetworkEnabled, productionEnabled}
  }
  throw new Error(`${active} is disabled by trusted server configuration.`)
}
