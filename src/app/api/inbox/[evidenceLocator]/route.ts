import { NextResponse } from 'next/server'

import { professionalGatewayClient } from '../../../../server/antifraud-gateway'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  context: Readonly<{params: Promise<Readonly<{evidenceLocator: string}>>}>,
) {
  try {
    const {evidenceLocator} = await context.params
    return NextResponse.json(
      await professionalGatewayClient().readClearingHouseEvidence(evidenceLocator),
    )
  } catch (error) {
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Confidential evidence failed.'},
      {status: 502},
    )
  }
}
