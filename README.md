# Qualification Education Portal

Public role-portal scaffold for education qualification and identity-evidence
workflows.

This application is separate from `antifraud-controller-nextjs`. Controllers
configure organizations, employees, departments, groups and reusable group
authorizations in the controller portal. This role portal consumes only
trusted, server-resolved authorization and performs education subject work.

## Intended public scope

- create or update an authorized learner record;
- record identity and lawful-representative evidence;
- request or record governed age predicates;
- review qualification evidence and clearly distinguish employer attestations
  from source-issuer credentials; and
- display authoritative status and proof references returned by the backend.

The portal must reuse `antifraud-portal-components-react`,
`antifraud-data-utils-ts` and the high-level Antifraud SDK. It must not copy
authority logic into the browser or duplicate shared contract literals.

## Status

Scaffold only. No application code, authentication, persistence, gateway
integration or executable user journey exists yet. The implementation must be
test-driven and must not claim completion from mock data or screenshots.

## Public-repository boundary

Do not commit internal prompts, tenant hosts, credentials, real learner data,
commercial planning, private organization evidence or unpublished deployment
details. Use synthetic fixtures only.

## Licence

Copyright 2026 Antifraud Services Inc. Licensed under Apache-2.0.
