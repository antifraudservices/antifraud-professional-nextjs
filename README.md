# Antifraud Professional Portal

Public professional role portal for Antifraud workflows. Education
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

## Encrypted communications and document signatures

The professional inbox uses the governed encrypted Communication collection or
batch for exchanges with individuals and other professionals. Its protected
business attachment is a JSON:API primary document containing one or more
Schema.org `DigitalDocument` and `MediaObject` resources, not a clinical
Bundle. One immutable manifest may cover one file or a governed set of files.
The file bytes themselves travel through DIDComm `attachments[]`, inline under
the governed limit or by protected `links + hash`. This applies to PDF, Excel,
Word, image, video and every other permitted media type. The panel must never
label or serialize an attachment as FHIR `DocumentReference`. Implementation
is tracked in [GitHub issue #1](https://github.com/antifraudservices/antifraud-professional-nextjs/issues/1).

Reuse the wallet, cryptography, secure-message and managed-profile behavior
already implemented in the shared core and Node.js SDKs. Do not recreate key
generation, encryption, signing, canonicalization, wallet custody or session
security in React components or portal-local utilities. The portal integration
must pin the reviewed SDK versions and prove the existing contracts through
its backend-for-frontend boundary.

Dynamic Client Registration publishes distinct device public keys: ML-KEM-768
for communication encryption and, when document policy requires it, ML-DSA-65
for manifest signing. Private keys remain protected by the wallet. For a cloud
wallet, signing requires biometric unlock when the device supports it, with a
governed PIN or password fallback. The local ceremony authorizes only a short,
user-bound, device-bound and operation-bound backend-for-frontend session. The
backend uses the managed wallet through the high-level SDK and returns only the
proof and receipt; lock, expiry, cancellation or binding failure destroys the
unlocked session.

A delivery receipt, read state, authenticated session or UI action is not a
signature. The proof binds the immutable manifest and exact document versions,
the natural signer, purpose, signing time and verification method. Natural
signer, represented organization, employee assignment and delivery actor remain
separate.

The portal must reuse the shared component package, data contracts and
high-level SDK. It must not copy authority logic into the browser or duplicate
shared contract literals.

## Status

The preliminary Next.js workspace is executable. Its BFF uses the high-level
Node SDK to load only Gateway references addressed to the fixed professional
actor and to submit confirmed or rejected issuer decisions without accepting
browser-authored organization, tenant or ledger authority. The complete
Controller-to-Professional synthetic education journey is exercised in the
Controller portal's real browser suite. Authentication and broader learner,
communication and wallet journeys remain deferred and are not simulated.

## Network profiles and acceptance

- Component and application tests may use immediate in-memory adapters.
- Demo is the only executable MVP profile. It uses the normal portal, BFF,
  high-level SDK and gateway routes with the in-memory Fabric adapter and its
  six-second simulated confirmation.
- Test Network is visible but disabled until the separately operated Fabric
  topology and service endpoints are deployed and configured. Kubernetes is
  not a prerequisite for this Beta Demo or for a later single-orderer Test
  Network; Production redundancy remains a separate gate.
- Production is visible and disabled.

The browser never chooses an adapter, network, zone, channel or chaincode. The
trusted gateway selects them from immutable server configuration. Demo uses
the same components, options, validation and business flows designed for Test
Network, but visibly identifies every simulated operation. BFF and gateway
reuse their configured collection-prefix resolver; React never supplies a
prefix, and Demo cannot access Test Network or Production namespaces.

For Firebase App Hosting, the project owner—not Bolt—authorizes the official
Firebase GitHub application and chooses the Firebase project, region, backend
and live branch. Never paste or commit a service-account key. Runtime Firebase
Admin/Firestore uses Application Default Credentials, and Secret Manager names
may be referenced from `apphosting.yaml`. Prefer Firestore for the hosted Demo;
PostgreSQL plus local IPFS is the verified self-hosted profile. Supabase is
currently a blob adapter and MongoDB is not wired as the current vault
repository, so neither is claimed as a complete database profile.

Enabling Google alone is not enough for local or hosted login. Register this
portal's Firebase web app, authorize `localhost` and all deployed Beta origins,
provide only public browser configuration, verify the ID token in the BFF and
preserve popup-compatible headers. Follow the exact
[Beta Firebase authentication handoff](docs/BETA_FIREBASE_AUTH.md).

Implementation is tracked in [Demo environment issue #2](https://github.com/antifraudservices/antifraud-professional-nextjs/issues/2).

## Public-repository boundary

Do not commit internal prompts, tenant hosts, credentials, real learner data,
commercial planning, private organization evidence or unpublished deployment
details. Use synthetic fixtures only.

## Licence

Licensed under Apache-2.0.
