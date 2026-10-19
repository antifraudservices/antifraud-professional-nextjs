import { NextResponse } from 'next/server'

import { professionalGatewayClient } from '../../../../server/antifraud-gateway'

export const runtime = 'nodejs'

const AUTHORITY_FIELDS = ['actor', 'organizationReference', 'tenantId', 'channel', 'zone', 'smartContract'] as const
const DECISIONS = ['confirmed', 'rejected', 'revoked'] as const

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    if (AUTHORITY_FIELDS.some(field => Object.hasOwn(body, field))) {
      return NextResponse.json({error: 'Server-owned authority must not be supplied by the browser.'}, {status: 400})
    }
    if (typeof body.evidenceLocator !== 'string' || !body.evidenceLocator.trim()) {
      return NextResponse.json({error: 'Evidence locator is required.'}, {status: 400})
    }
    if (typeof body.issuerProofReference !== 'string' || !body.issuerProofReference.trim()) {
      return NextResponse.json({error: 'Issuer proof reference is required.'}, {status: 400})
    }
    if (typeof body.decision !== 'string' || !DECISIONS.includes(body.decision as typeof DECISIONS[number])) {
      return NextResponse.json({error: 'Decision must be confirmed, rejected or revoked.'}, {status: 400})
    }
    const result = await professionalGatewayClient().decideClearingHouseEvidence(
      body.evidenceLocator,
      {
        decision: body.decision as typeof DECISIONS[number],
        issuerProofReference: body.issuerProofReference,
      },
    )
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Issuer decision failed.'},
      {status: 502},
    )
  }
}
