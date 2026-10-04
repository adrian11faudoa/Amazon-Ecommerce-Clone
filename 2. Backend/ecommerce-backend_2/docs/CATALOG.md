# Catalog Domain (Volume 2)

Backend foundation for seller catalog ownership, categories, products,
variants, SKUs, seller offers, pricing, promotions, and media — built on
top of the Volume 1 identity/authorization foundation.

**Out of scope for this milestone** (see the prompt): inventory
reservation, carts, checkout, payments, orders, fulfillment, returns,
reviews, complete search querying, complete seller settlement.

## Ownership model — why Product is single-seller-owned

The prompt's SELLER OFFERS section makes multi-seller-per-product support
conditional: *"if the project supports multiple sellers offering the same
logical product, maintain explicit ownership of offer-specific data."*
This milestone does not require multiple sellers competing on one listing
(that's a materially bigger modeling problem — shared product identity,
buy-box logic, etc. — appropriately left to a future, explicitly-scoped
prompt). So:

- `Product` belongs to exactly one `SellerOrganization` (`organizationId`).
- `SellerOffer` still exists as a separate concept from `Product`,
  because the prompt asks for it explicitly and because it cleanly
  separates **shared item data** (title, description, attributes — on
  `Product`/`ProductVariant`) from **seller commercial data** (price,
  status, condition — on `SellerOffer`/`Price`). If a future milestone
  needs multi-seller-per-product, `SellerOffer` is already the right
  seam to extend (offers would attach to a shared `Sku` owned by a
  catalog-level product rather than a seller-owned one) without
  redesigning pricing, promotions, or media.

## Data model

```
Category (self-referential tree, platform-wide taxonomy)
AttributeDefinition (typed vocabulary: TEXT/NUMBER/BOOLEAN/SELECT)
  └─ CategoryAttribute (which attributes a category expects/requires)

Product (seller-owned)
  ├─ ProductAttributeValue (typed, validated against AttributeDefinition)
  ├─ MediaAsset (optional, productId)
  └─ ProductVariant (1:1 with Sku)
       ├─ VariantAttributeValue (must reference isVariantAttribute=true definitions)
       ├─ MediaAsset (optional, variantId)
       └─ Sku (1:1)
            └─ SellerOffer (1:1) — separates commercial data from item data
                 ├─ Price (history; at most one active row per offer)
                 └─ PromotionOffer (join table to Promotion)

OutboxEvent — transactional outbox for all catalog domain events
```

## Product lifecycle

`DRAFT → ACTIVE → PAUSED → ARCHIVED`, plus `DRAFT → ARCHIVED` directly.
`PENDING_REVIEW` exists in the enum and is reserved for a future
moderation milestone; nothing in this milestone transitions into or out
of it (see `ProductsService`'s `ALLOWED_TRANSITIONS` graph — the single
source of truth for what's legal).

Publishing (`DRAFT`/`PAUSED` → `ACTIVE`) additionally validates the
product actually has what it needs to be sold: a category, and at least
one variant that is `isActive`, whose SKU `isActive`, whose offer is
`ACTIVE`, with a currently active `Price`. A caller cannot force an
invalid product live just by calling the publish endpoint.

`SellerOffer` has its own, independent status lifecycle
(`DRAFT → ACTIVE ⇄ PAUSED → ARCHIVED`) — you can activate an offer before
it has a price (checkout will need to validate a current price exists
regardless; see FUTURE CHECKOUT COMPATIBILITY), but a *product* can't go
live without one.

## Seller isolation

Every seller-scoped write re-derives ownership from the database, never
from a client-supplied ID alone:
- `ProductsService.requireOwned` / `SellerOffersService.requireOwned` /
  `PromotionsService.requireOwned` / `MediaService.requireOwned` all
  compare the row's own `organizationId` against the authenticated
  caller's, and return **404** (not 403) on mismatch, so a probing seller
  can't even confirm another seller's resource exists.
- `PromotionsService.create` re-checks that every attached `offerIds`
  entry actually belongs to the caller's organization.
- `MediaService.createUploadIntent` re-checks that the target
  product/variant belongs to the caller's organization before issuing a
  signed upload URL.
- See `src/catalog/**/*.service.spec.ts` for the tests proving this
  (cross-tenant 404s, cross-tenant offer/promotion rejection, etc.).

## Duplicate prevention (variants, SKUs)

- **Duplicate SKU**: `Sku` has `@@unique([organizationId, code])`.
  `ProductVariantsService.create` maps the resulting `P2002` to
  `DUPLICATE_SKU`.
- **Duplicate variant combination**: `ProductVariant.attributeSignature`
  is a SHA-256 hash of the sorted `(attributeKey, value)` pairs, enforced
  unique per product (`@@unique([productId, attributeSignature])`). Two
  variants can never unintentionally represent the same combination —
  this is a database constraint, not just an application check.

## Pricing — exact money, no overlapping active price

- Amounts are integer minor units (`BigInt`), never floats. The API
  accepts/returns them as strings to avoid JSON float coercion.
- `PricingService.activatePrice` runs in a transaction: it deactivates
  whatever was previously active (`isActive=false, effectiveTo=now`)
  before inserting the new active row. A partial unique index
  (`prices_one_active_per_offer`, `WHERE isActive AND effectiveTo IS NULL`)
  backs this up at the database level as defense in depth.
- Every prior price row is retained (never deleted) — that's the price
  history/auditability the prompt asks for.

## Media — secure upload orchestration

`MediaService` never trusts a client-supplied storage path: the storage
key is always server-generated
(`catalog/{orgId}/{entityType}/{entityId}/{uuid}.{ext}`). The flow is:

1. `createUploadIntent` — ownership + content-type + size validation,
   then a `MediaAsset` row (`PENDING_UPLOAD`) is created **inside a
   transaction**, and only *after* that transaction commits does the
   code call the storage provider for a presigned URL (never hold a DB
   transaction open across a network call).
2. Client uploads directly to the presigned URL.
3. `finalize` — calls `StorageProvider.headObject` and refuses to mark
   the asset `READY` unless the provider actually confirms the object
   exists. This is deliberately impossible to fake: see
   `LocalStubStorageProvider`, which honestly always returns
   `exists: false` because it has no real backing store, and
   `MediaService.finalize`'s test coverage of that exact case.
4. `delete` — calls the real provider's delete, then marks the asset
   `DELETED`. Both `finalize` and `delete` are idempotent (repeating
   either on an already-`READY`/`DELETED` asset is a no-op success).

Swapping in a real S3 bucket is a configuration change
(`STORAGE_PROVIDER=s3` + `STORAGE_BUCKET`/`STORAGE_REGION` + standard AWS
credentials) — no code change, because everything goes through the
`StorageProvider` interface (see `docs/../README.md`'s environment
caveats for what could/couldn't be live-verified in the authoring
sandbox).

## Events, outbox, and search indexing

- Every durable catalog mutation writes an `OutboxEvent` row **in the
  same transaction** as the domain change (`OutboxService.record`,
  called with the transaction client) — see the event type list in
  `catalog-event-types.ts`.
- `OutboxRelayService` (on a 10s repeatable BullMQ job) enqueues
  `PENDING` outbox rows into the `catalog-search-index` queue, using the
  outbox row's own ID as the BullMQ `jobId` — re-relaying an in-flight or
  already-enqueued event is a safe no-op.
- `SearchIndexProcessor` (the queue worker) calls the `SearchIndexClient`
  abstraction and marks the outbox row `PUBLISHED` on success or
  `FAILED` after BullMQ's configured retries (5 attempts, exponential
  backoff) are exhausted — never an infinite retry loop, never silent
  loss (the row stays queryable in `FAILED` state for reconciliation).
- **No real search cluster is configured or reachable in the authoring
  sandbox.** `ConsoleSearchIndexClient` is the only implementation
  provided; it logs what it would index rather than fabricating a
  connection to Elasticsearch/OpenSearch. Swapping in a real client is a
  one-file change behind the `SEARCH_INDEX_CLIENT` token — nothing else
  needs to change.
- Search documents are always rebuildable from authoritative catalog
  data: `ProductsService.buildSearchPayload` /
  `ProductVariantsService.buildSearchPayload` are the single source of
  the denormalized representation, used both for the live outbox payload
  and for any future reconciliation job that re-walks the catalog.

## Background jobs

Two repeatable BullMQ jobs on a `catalog-maintenance` queue (see
`MaintenanceSchedulerService`):
- `relay-outbox` (every 10s) — see above.
- `cleanup-media` (every 60s) — `MediaService.cleanupExpiredUploadIntents`
  marks `PENDING_UPLOAD` assets past their `uploadExpiresAt` as `FAILED`,
  bounded to 100 rows per tick, and never touches a `READY` asset still
  referenced by an active product/variant.

Both operations are idempotent, so overlapping ticks (e.g. during a
rolling deploy with two instances briefly running) are safe.
