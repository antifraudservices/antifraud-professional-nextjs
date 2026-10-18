# Antifraud Professional Portal

Public professional role-portal scaffold for Antifraud workflows. Education
and training is the first bounded profile; later professional domains may be
added without creating a separate portal for each qualification sector.

This application is separate from the controller portal. Controllers configure
organizations, employees, departments, groups and reusable group
authorizations there. This role portal consumes only trusted, server-resolved
authorization and performs education subject work.

The shared shell is profile-neutral, but every enabled profile keeps its own
server-owned vocabulary, authorization and home navigation. The first MVP must
not implement speculative legal, accounting or other profiles.

## Intended public scope

- create or update an authorized learner record;
- record identity and lawful-representative evidence;
- request or record governed age predicates;
- review qualification evidence and clearly distinguish employer attestations
  from source-issuer credentials; and
- work assigned Clearing House items for the employee's active review group,
  including permitted evidence retrieval, authoritative comparison, draft or
  approved issuer decisions, delivery receipts and history; and
- display authoritative status and proof references returned by the backend.

The employee portal is not limited to creating age predicates. It must expose
only work assigned through the employee's active organization, assignment,
group membership and reusable group authorization. It never lets an employee
grant their own capability or browse Fabric channels.

The portal must reuse the shared component package, data contracts and
high-level SDK. It must not copy authority logic into the browser or duplicate
shared contract literals.

## Status

Scaffold only. No application code, authentication, persistence, gateway
integration or executable user journey exists yet. The implementation must be
test-driven and must not claim completion from mock data or screenshots.

## Network profiles and acceptance

- Component and application tests may use immediate in-memory adapters.
- An explicitly enabled staging demo uses the normal portal, backend,
  high-level SDK and gateway routes with an in-memory Fabric adapter that waits
  six seconds for each simulated ledger operation.
- An interactively run local portal uses real `local-network` Fabric. Its
  browser journey must return a real transaction identifier and complete
  authoritative readback after gateway, peer and chaincode restart.
- Test Network and production use their real Fabric adapters. The staging demo
  adapter is forbidden in both environments.

The browser never chooses an adapter, network, zone, channel or chaincode. The
trusted gateway selects them from immutable deployment configuration. Staging
must visibly identify simulated operations, which never count as Test Network
or production evidence.

## Public-repository boundary

Do not commit internal prompts, tenant hosts, credentials, real learner data,
commercial planning, private organization evidence or unpublished deployment
details. Use synthetic fixtures only.

## Licence

Licensed under Apache-2.0.
