# Qualification Education Portal agent contract

Read `.codex/skills/build-qualification-education-portal/SKILL.md` before
implementing this portal.

Keep controller administration outside this repository. Never infer authority
from a selected role, organization, learner or group in the browser. Preserve
the distinction between asserted data, reviewed evidence, verification and a
signed issuer attestation.

Do not add animal-sector profiles here. They belong to the existing multisector
professional portal, which may consume the same neutral component package.

Use red-green-refactor TDD. Browser acceptance must cross the real portal,
backend for frontend, high-level SDK and local gateway with authoritative
readback. Mocks may isolate units but cannot prove the workflow.
