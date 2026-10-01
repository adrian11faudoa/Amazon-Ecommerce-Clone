# Recommendation Engine Boundary & Analytics Event Boundary (Detail)

Extends `../27-analytics-architecture.md` with the recommendation-specific boundary the Volume 2 prompt requires, and adds explicit event naming/sampling/dedup rules for analytics ingestion.

## 1. Recommendation Boundary

The architecture defines the boundary for a future recommendation capability without implementing or requiring one now (Master Prompt: "Do not introduce a recommendation engine into transactional workflows merely to demonstrate personalization").

| Layer | Responsibility | Owner |
|---|---|---|
| Transactional catalog data | `Product`/`Sku`/`Category`/`Price`/rating aggregates — the substrate any recommendation logic would read | Catalog / Pricing / Review (unchanged — recommendations never become a reason to relax these domains' ownership) |
| Behavior/event collection | Click-through, view, add-to-cart, purchase events, captured via the same analytics event pipeline (§2) with a `recommendationContext` field (if the view/click occurred within a recommendation surface) so recommendation-specific signal is separable from general product-analytics signal without a second collection pipeline | Analytics (collection only) |
| Recommendation computation | A batch or near-real-time job (not specified further here — an implementation detail of whichever recommendation approach is eventually chosen: collaborative filtering, a hosted recommendation service, a simple "customers who bought X also bought Y" co-occurrence query) reads collected behavior events and transactional catalog data, writes results to a dedicated `RecommendationResult` store (could be Redis, could be a dedicated table — an implementation decision deferred until the capability is actually built) | A new, not-yet-implemented "Recommendation" bounded context, if/when built |
| Recommendation serving | An API endpoint (e.g., `GET /products/{id}/recommendations`) reads only from `RecommendationResult` — it never computes recommendations synchronously inline with a customer-facing request, consistent with the platform's "search/analytics/derived data never blocks transactional paths" principle applied to this new derived surface | Recommendation context's own read API |

**Binding constraint:** whenever a Recommendation context is eventually implemented, it follows the same ownership discipline as every other derived/cross-cutting context in `../04-domain-ownership-matrix.md` (Search, Analytics) — it reads Catalog/Pricing/Review via their published interfaces or consumed events, never a direct table join across domain boundaries, and it never becomes an authoritative source for anything (price, availability, or otherwise) that a transactional workflow depends on.

## 2. Analytics Event Boundary (Detail)

Extends `../27-analytics-architecture.md` §1–2 with concrete naming/payload/sampling/dedup rules.

| Aspect | Rule |
|---|---|
| Event naming | `analytics.{surface}.{action}`, e.g., `analytics.storefront.product_viewed`, `analytics.checkout.step_completed` — distinct namespace from the domain event catalog (`05-events-and-queues.md` §4) even though both may originate from the same user action, because analytics events are allowed a materially looser delivery guarantee (§ below) that domain events must never have |
| Payload | `{ sessionId, userId (nullable for anonymous), surface, action, properties: {...}, occurredAt }` — `properties` is a bounded, documented set per action, never an arbitrary client-supplied free-form object (an unbounded client-controlled payload is both a privacy risk and an analytics-schema-drift risk) |
| Privacy rules | No payload field may carry a value classified in `../18-privacy-architecture.md` §1 as High sensitivity; `userId` is included only to support authorized joins back through the operational system's own authorization path (§3 below), never duplicated with contact/address/financial fields alongside it |
| Retention | 90 days raw (`16-data-retention-and-privacy.md` §1), then purged; aggregates derived within that window are retained longer if they contain no row-level PII |
| Ownership | Analytics domain (collection, storage, retention), per `../04-domain-ownership-matrix.md`'s "Analytics events/aggregates" row |
| Delivery | Best-effort, **not** outboxed (`../10-outbox-architecture.md` §3 explicitly exempts this category) — an occasional lost page-view event is accepted; this is the documented, deliberate exception to the platform's general at-least-once discipline, scoped narrowly to this one category |
| Sampling | High-volume, low-value events (e.g., generic page-view pings on non-conversion pages) may be sampled at ingestion (e.g., 10% sampling with a `sampleRate` field recorded alongside, so downstream aggregation can correct for it) — conversion-relevant events (`checkout.step_completed`, `product_viewed` on a product detail page) are never sampled, since undercounting them would corrupt exactly the metrics the business cares most about |
| Deduplication | Best-effort only, keyed by a client-generated `eventId` within a bounded dedup window (e.g., 5 minutes) to absorb double-fires from client-side retry logic — this is a data-quality measure, not a correctness guarantee on the level domain events require |

## 3. Never an Accidental Source of Truth

Restates `../27-analytics-architecture.md` §4 with the concrete enforcement mechanism: no backend code path reads from the analytics store to make a transactional decision (inventory, pricing, order state) — the analytics store's only consumers are reporting dashboards and, per §1, a future recommendation-computation job that writes to its own separate derived store rather than the transactional path reading analytics data directly.
