---
name: build-antifraud-professional-portal
description: Build or review the public Antifraud professional portal, beginning with education and training, while keeping controller administration separate.
---

# Build Antifraud Professional Portal

Implement education and training workflows as the first professional profile.
Controller management belongs to the separate controller portal. Preserve an
explicit profile boundary so future professional domains can reuse this
application without creating a portal for each sector.

Before coding, inspect the published shared component package, data-contract
package, runtime-neutral orchestration SDK and trusted server SDK. Reuse their
contracts; do not copy governed literals or add local package links to a
releasable branch.

The trusted backend supplies actor, organization, assignment, group
authorization, subject authorization, time and authoritative readback. The
browser supplies only user-entered subject and evidence intentions. It never
selects a network adapter, zone, Fabric channel or chaincode.

Keep asserted learner data, evidence observations, claim verification,
relationship attestation, employer attestation and source-issuer credentials
distinct. Only the standardized age-over-18 element may use the corresponding
European Digital Identity Wallet Person Identification Data label; other
thresholds remain governed predicates.

Implement the education Clearing House work inbox as well as evidence
creation. An authorized employee sees only work assigned to the exact active
group, retrieves evidence only under separate policy, compares it with
authoritative issuer records and submits only the granted action. Confirmation,
rejection, revocation and an authentic issuer credential remain distinct
issuer-owned outcomes.

Reuse the secure-message, wallet and managed-profile security already
implemented by the shared core and Node.js SDKs. Do not implement cryptography,
canonicalization, private-key custody or wallet unlocking in React. The
professional inbox exchanges the governed encrypted Communication collection
or batch and protected JSON:API documents with individuals and other
professionals; do not substitute a clinical Bundle.

Document panels use Schema.org `DigitalDocument`/`MediaObject`, never FHIR
`DocumentReference`. PDF, spreadsheet, Word, image, video and other governed
bytes travel only in DIDComm `attachments[]`, inline or by protected
reference, using the exact released data-utils and SDK contracts. Follow
GitHub issue `antifraud-professional-nextjs#1`.

Dynamic Client Registration publishes separate ML-KEM-768 communication and
policy-required ML-DSA-65 signing public keys. Private keys stay protected in
the wallet. Cloud signing requires local biometric unlock when available, with
a governed PIN or password fallback. It authorizes only a short-lived,
user-bound, device-bound and operation-bound backend-for-frontend session. The
backend invokes the managed wallet through the high-level SDK and returns only
the proof and receipt. Lock, expiry, cancellation or binding failure destroys
the unlocked session. Authentication, delivery, read state and a UI action are
never signatures.

Use synthetic subjects and evidence. Never commit internal prompts, tenant
hosts, secrets or real identity documents. Use red-green-refactor TDD.

Environment acceptance is fixed:

1. automated component and application tests may use immediate in-memory
   adapters;
2. an explicitly configured staging demo uses the same portal-to-gateway path
   with a fixed six-second in-memory Fabric simulation;
3. an interactively run local portal uses real `local-network` Fabric and must
   prove a real transaction plus authoritative readback after restart; and
4. Test Network and production always use real Fabric and reject demo mode.

Mocks may isolate units but never prove the workflow. Completion requires a
real browser, backend for frontend, high-level SDK, gateway and authoritative
readback for each required environment gate.
