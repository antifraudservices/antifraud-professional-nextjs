---
name: build-qualification-education-portal
description: Build or review the public education role portal for learner identity evidence, representative relationships, age predicates and qualifications while keeping controller administration separate.
---

# Build Qualification Education Portal

Implement only education role workflows. Controller management belongs to
the separate controller portal.

Do not create a parallel animal portal. Animal-sector roles and sector-specific
home navigation remain in the existing multisector professional portal. Reuse
shared neutral components in either host without moving host policy into the
component package.

Before coding, inspect the current exports and tests in:

- the shared portal component package;
- the shared data-contract package;
- the runtime-neutral orchestration SDK; and
- the trusted server SDK.

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

Implement the education Clearing House work inbox as well as evidence
creation. An authorized employee may list only items assigned to the exact
active group, retrieve evidence only under separate policy, compare it with
authoritative issuer records, prepare a decision, obtain approval when policy
requires it and submit only the action granted to that employee. Preserve
confirmation, rejection, revocation and linking of an authentic issuer
credential as distinct issuer-owned outcomes.

The browser never discovers hosts or Fabric channels. The trusted backend asks
the issuer's home host, which performs exact authenticated discovery against
approved peer-host local indexes. Display delivery receipts and authoritative
status returned by the backend.

Treat future machine endpoints and artificial-intelligence agents as separate
registered service principals with bounded assignments, capabilities and audit
records. They may propose outcomes when authorized but do not inherit
controller authority or bypass a required human approval. Implement the first
MVP as a manual human workflow.

Use synthetic learners and evidence. Never commit internal prompts, tenant
hosts, secrets or real identity documents. Completion requires local unit and
integration tests plus a real unmocked browser journey with authoritative
readback after reload.
