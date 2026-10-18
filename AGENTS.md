# Antifraud Professional Portal agent contract

Read `.codex/skills/build-antifraud-professional-portal/SKILL.md` before
implementing this portal.

Keep controller administration outside this repository. Never infer authority
from a selected role, organization, learner or group in the browser. Preserve
the distinction between asserted data, reviewed evidence, verification and a
signed issuer attestation.

Education and training is the first implemented professional profile. Keep its
policy behind an explicit server-owned profile so later professional domains
can reuse the application without copying it or weakening authorization.

Use red-green-refactor TDD. Browser acceptance must cross the real portal,
backend for frontend, high-level SDK and local gateway with authoritative
readback. Mocks may isolate units but cannot prove the workflow.

Automated tests may use immediate memory. An explicitly configured staging
demo may use the gateway's six-second memory simulation. Interactive local
acceptance uses real `local-network` Fabric; Test Network and production use
their real Fabric boundaries. Never present staging simulation as Fabric
evidence.
