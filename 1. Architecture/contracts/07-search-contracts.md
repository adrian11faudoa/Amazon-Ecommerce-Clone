# Search Contracts (Detail)

Extends `../13-search-architecture.md` with a concrete, machine-validated document schema and explicit sync/rebuild rules.

## 1. Product Search Document — Concrete Schema

See `schemas/search-product-document.schema.json` for the machine-readable definition. Field-by-field source-of-truth mapping:

| Field | Derived From | Source of Truth |
|---|---|---|
| `productId`, `sellerOrgId`, `title`, `description` | `Product` | Catalog (Postgres) |
| `categoryPath` | `Category` parent chain, resolved at index time | Catalog (Postgres) |
| `attributes` | `ProductAttribute`/`ProductAttributeValue`, flattened | Catalog (Postgres) |
| `priceRange` | Current `Price` row(s) across the product's `Sku`s | Pricing & Promotion (Postgres) |
| `availability` | Computed from `InventoryItem.available` across the product's `Sku`s at index time (`IN_STOCK` if any Sku has `available > threshold`, `LIMITED` if `0 < available ≤ threshold`, `OUT_OF_STOCK` if all Skus have `available = 0`) | Inventory (Postgres), snapshotted — never a live read at query time |
| `avgRating`, `reviewCount` | Aggregated from published `Review` rows | Review (Postgres) |
| `primaryMediaAssetId` | `MediaAsset` marked primary for the product | Media (Postgres) |
| `status` | Always `PUBLISHED` — a document only exists in the index while the product is published (§3) | Catalog (Postgres) |

## 2. Localization Fields

Where the platform indexes localized title/description per supported locale, one document per `(productId, locale)` combination is indexed (document ID becomes `{productId}:{locale}`), rather than a single document with nested locale objects — this keeps relevance scoring per-locale clean and avoids cross-locale term pollution. The `locale` field is omitted entirely for a locale-neutral catalog configuration.

## 3. Synchronization Contract (Detail)

Extends `../13-search-architecture.md` §3:

| Step | Detail |
|---|---|
| Triggering DB change | Any of: `Product` publish/unpublish/suspend/archive, `Price` change, `InventoryItem` quantity crossing the availability threshold, `Review` publish/removal affecting the aggregate |
| Outbox event | The relevant event from the catalog in `05-events-and-queues.md` §4 (`catalog.product_published.v1`, `pricing.price_changed.v1`, `inventory.*`, `review.*`) |
| Queue/job | `search-indexing` queue, `search.index-product` job, dedup key `(productId, latest eventId)` per `05-events-and-queues.md` §5 |
| Index worker | Re-reads current authoritative state for the `productId` from Postgres (never trusts the triggering event's payload as the final value — this makes out-of-order or duplicate delivery safe by construction) |
| Retry | Per `../11-queue-architecture.md`'s `search-indexing` row (5 attempts, exponential backoff) |
| Dead-letter | `search-indexing-dlq`; a reconciliation job (`reconciliation.search-drift`, added to the `reconciliation` queue family) periodically diffs a sample of Postgres `Product` rows against their corresponding index documents and re-enqueues any drifted `productId` |
| Delete/unpublish behavior | `catalog.product_unpublished.v1` / `product_suspended.v1` / `product_archived.v1` all trigger a **document delete** (`DELETE /products/_doc/{productId}` or `{productId}:{locale}` for each locale) — the index never retains a "hidden" published-false document, keeping every query's implicit filter simple |
| Index rebuild | A full reindex job pages through every currently `PUBLISHED` `Product` directly from Postgres (bypassing the event pipeline entirely) into a new physical index `products_v{n+1}`; used for schema changes (a bump to this document's `schemaVersion`) or when the drift-reconciliation job detects significant divergence |
| Alias switch | The `products` alias is atomically repointed to `products_v{n+1}` only after the rebuild job reports 100% of expected documents present (row-count cross-check against Postgres's published-product count at rebuild-start time, tolerant of the small number of publish/unpublish events that land during the rebuild window, which the next incremental sync step reconciles) |
| Stale-data tolerance | p99 indexing lag SLO of 30 seconds (`../13-search-architecture.md` §6); checkout and cart never query the index for authoritative availability — only Inventory's live state is trusted there |

## 4. Non-Product Search (If Enabled)

If the platform later indexes sellers/storefronts or reviews as independently searchable resources (not required by this architecture volume, but anticipated), each gets its own index (`storefronts`, not folded into `products`) with its own schema file under `schemas/`, following the same source-of-truth-mapping and sync-contract pattern as this document — never a single "everything" index mixing unrelated document shapes.
