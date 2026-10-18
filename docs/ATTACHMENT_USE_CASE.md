# Professional attachment use case

The authenticated actor prerequisite is defined in
[`BETA_FIREBASE_AUTH.md`](BETA_FIREBASE_AUTH.md). Google login authenticates the
employee but does not grant document retrieval, review, issuer or signing
authority.

The professional panel presents Schema.org `DigitalDocument` and `MediaObject`
records. It never presents or serializes a FHIR `DocumentReference`.

PDF, spreadsheet, Word, image, video and any other media type permitted by the
server policy travels in DIDComm `attachments[]`. Bounded files may be inline;
confidential files use authorized links plus multihash. The UI displays media
type, exact size, CID/digest, sender, purpose and delivery state without
granting access from browser state.

Implementation and acceptance belong to
[GitHub issue #1](https://github.com/antifraudservices/antifraud-professional-nextjs/issues/1).
