import { NextResponse } from 'next/server'

import { professionalGatewayClient } from '../../../server/antifraud-gateway'

export const runtime = 'nodejs'

export async function GET() {
  try {
    return NextResponse.json(await professionalGatewayClient().listClearingHouseInbox())
  } catch (error) {
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Issuer inbox failed.'},
      {status: 502},
    )
  }
}
