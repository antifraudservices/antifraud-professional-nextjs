import { AntifraudGatewayClient } from 'antifraud-sdk-node-ts'

function requiredEnvironment(name: 'ANTIFRAUD_GATEWAY_BASE_URL' | 'ANTIFRAUD_GATEWAY_BEARER'): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is required.`)
  return value
}

export function professionalGatewayClient(): AntifraudGatewayClient {
  return new AntifraudGatewayClient({
    baseUrl: requiredEnvironment('ANTIFRAUD_GATEWAY_BASE_URL'),
    bearerCredential: async () => requiredEnvironment('ANTIFRAUD_GATEWAY_BEARER'),
  })
}
