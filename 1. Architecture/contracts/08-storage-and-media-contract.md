# Object Storage & Media Contract (Detail)

Extends `../14-media-architecture.md` with concrete bucket/prefix conventions and per-job contracts.

## 1. Bucket Responsibilities

| Bucket | Purpose | Public via CDN? | Encryption |
|---|---|---|---|
| `{env}-marketplace-media` | Product/review/seller-storefront images and video, originals + derived variants | Yes, for `status=PROCESSED` assets belonging to a published owner entity only | SSE-KMS |
| `{env}-marketplace-documents` | Seller verification documents, generated invoices/exports | No — signed URL only | SSE-KMS, stricter bucket policy (no public-read capability at all, not even accidentally) |
| `{env}-marketplace-backups` | Database/config backup archives (infrastructure-managed, not application-written) | No | SSE-KMS |

## 2. Key/Prefix Convention

```
s3://{bucket}/{ownerType}/{ownerId}/{mediaAssetId}/original.{ext}
s3://{bucket}/{ownerType}/{ownerId}/{mediaAssetId}/variant-{name}.{ext}
```

- `ownerType` ∈ `{ product, review, seller-storefront, seller-verification, order-export }` — matches the polymorphic owner types already defined in `../05-data-architecture.md` §2 (`MediaAsset`).
- `ownerId` is the UUID of the owning entity (`productId`, `reviewId`, etc.).
- `mediaAssetId` is the `MediaAsset.id` — guarantees no two uploads (even of visually identical content) ever collide or overwrite (`../14-media-architecture.md` §6 "a new upload gets a new mediaAssetId").
- `variant-{name}` ∈ `{ thumbnail, medium, large }` for images; `{ hls-manifest, mp4-720p, mp4-1080p }` for video, if video is supported.

## 3. Content Metadata & Checksum

- Every uploaded object's S3 metadata includes `x-amz-meta-media-asset-id` (redundant with the key path, used for integrity cross-checks) and `x-amz-meta-checksum-sha256`, computed client-side before upload and re-verified server-side by the processing worker after download — a checksum mismatch marks the asset `status=FAILED` with reason `checksum_mismatch` and never proceeds to publish.

## 4. Upload Workflow (Concrete Sequence)

Restates `../14-media-architecture.md` §2 with contract-level detail:

1. `POST /media/upload-intents` — request body: `{ ownerType, ownerId, contentType, sizeBytes, checksumSha256 }`.
2. Backend authorizes (does the caller own `ownerId`? per `11-security-and-authorization-matrix.md`), validates `contentType` against an allowlist (`image/jpeg`, `image/png`, `image/webp`, and `video/mp4` if video is enabled) and `sizeBytes` against a per-`ownerType` maximum.
3. Backend creates `MediaAsset(status=PENDING)`, generates a signed S3 `PUT` URL scoped to the exact key, content-type, and size (S3 policy conditions), TTL 10 minutes.
4. Response: `{ uploadUrl, mediaAssetId, expiresAt }`.
5. Client `PUT`s the file directly to S3.
6. `POST /media/{mediaAssetId}/confirm` — backend verifies the object now exists at the expected key (HEAD request) and matches the declared `sizeBytes`/checksum, then enqueues `media.process-asset` (§5).
7. If `confirm` is never called within the signed URL's TTL, the `MediaAsset` remains `PENDING` and is swept by `cleanup.purge-media-orphans` (§5) after a grace period (default 24h).

## 5. Media Processing Job Contract

| Job | Input | Output | Processing State Transition | Retry | Idempotency |
|---|---|---|---|---|---|
| `media.process-asset` | `{ mediaAssetId }` | Variant objects written to S3; `MediaAsset.status` updated | `PENDING → SCANNING → (PROCESSED | FAILED)` | 3 attempts, exponential backoff 10s base (`../11-queue-architecture.md`) | Reprocessing overwrites the same deterministic variant key — safe to redeliver |
| Sub-step: malware scan | Downloaded original bytes | Pass/fail verdict | Failure → `MediaAsset.status=FAILED, reason=malware_detected`; asset never served, owner notified | N/A (a scan is not retried on a genuine positive — only on scanner-infrastructure error) | N/A |
| Sub-step: magic-byte type verification | Downloaded original bytes | Pass/fail verdict against declared `contentType` | Mismatch → `status=FAILED, reason=content_type_mismatch` | N/A | N/A |
| Sub-step: variant generation | Original bytes | Thumbnail/medium/large (or video renditions) | On success → `status=PROCESSED` | Retried as part of the parent job | Deterministic output path — safe to redeliver |

## 6. Delivery & Access Control

- **Public media** (`product`, `review`, published `seller-storefront` owner types, `status=PROCESSED`): served via CDN with long-TTL cache headers; CDN origin access is restricted to the CDN's own origin-access-identity/control — the bucket itself has no public-read policy, so even a misconfigured link can't bypass the CDN's own access logic.
- **Non-public media** (`seller-verification`, `order-export`): served only via a short-lived (5–15 min) signed GET URL issued per authorized request — never a CDN path, never a long-lived link shared broadly.

## 7. Lifecycle & Quota

- Orphan cleanup (`cleanup.purge-media-orphans`, §5's sibling job in the `scheduled-cleanup` family): deletes `MediaAsset` rows still `PENDING` past the grace period, and their (nonexistent or partial) S3 objects.
- Owner-entity deletion cascade: when an owning `Product`/`Review`/`SellerOrganization` is deleted or archived past its retention window, referencing `MediaAsset`s are marked for deletion by the same cleanup job family, batched (not deleted synchronously inline with the owner's own deletion transaction, to keep that transaction fast).
- **Per-seller storage quota:** tracked as `SellerOrganization.mediaStorageBytesUsed` (aggregate), incremented/decremented transactionally alongside `MediaAsset` creation/deletion; enforced at upload-intent time (`sizeBytes` would exceed quota → `403 STORAGE_QUOTA_EXCEEDED`).
