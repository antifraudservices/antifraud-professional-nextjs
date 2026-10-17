---
name: build-qualification-education-portal
description: Build or review the public education role portal for learner identity evidence, representative relationships, age predicates and qualifications while keeping controller administration separate.
---

# Build Qualification Education Portal

Implement only education role workflows. Controller management belongs to
`antifraud-controller-nextjs`.

Do not create a parallel animal portal. Animal-sector roles and sector-specific
home navigation remain in the existing multisector VetChain professional
portal. Reuse shared Antifraud components in either host without moving host
policy into the component package.

Before coding, inspect the current exports and tests in:

- `antifraud-portal-components-react`
- `antifraud-data-utils-ts`
- `antifraud-sdk-core-ts`
- `antifraud-sdk-node-ts`

Reuse published contracts; do not copy literals or add local package links to
a releasable branch. If a required package is unpublished, prove it with an
immutable temporary tarball and stop publication until the dependency chain is
released in order.

The trusted backend supplies actor, organization, assignment, group
authorization, subject authorization, time and authoritative readback. The
browser supplies only user-entered subject and evidence intentions.

Keep these records distinct: asserted learner data, evidence observation,
claim verification, relationship attestation, employer attestation and
source-issuer credential. Only the standardized age-over-18 element may be
labelled as the corresponding European Digital Identity Wallet Person
Identification Data attribute; other thresholds remain governed predicates.

Use synthetic learners and evidence. Never commit internal prompts, tenant
hosts, secrets or real identity documents. Completion requires local unit and
integration tests plus a real unmocked browser journey with authoritative
readback after reload.
