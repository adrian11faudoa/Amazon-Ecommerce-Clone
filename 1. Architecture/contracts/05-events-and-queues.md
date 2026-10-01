# Events & Queues Contract (Detail)

Extends `../09-event-architecture.md`, `../10-outbox-architecture.md`, `../11-queue-architecture.md`. This document adds the missing binding detail: PII/secret exclusion rules, causation-ID propagation, full event versioning policy, a completed event catalog, and the full queue/job catalog cross-referenced with dedup keys.

## 1. Event Envelope — Additions to the Canonical Shape

`../09-event-architecture.md` §2 defines `eventId, eventType, eventVersion, aggregateType, aggregateId, producer, occurredAt, correlationId, traceContext, payload`. This adds:

| Field | Rule |
|---|---|
| `causationId` | The `eventId` (or API request's `correlationId`, if this is the first event in a chain) of whatever directly caused this event to be emitted. Distinct from `correlationId` (which threads an entire end-to-end request/workflow) — `causationId` threads one *direct* cause-effect link, letting a consumer reconstruct the exact causal chain, not just "everything from the same request." |
| `schemaVersion` | Redundant with, and always equal to, the numeric suffix on `eventType` (e.g., `order.created.v1` → `schemaVersion: 1`) — included as a separate field so consumers can branch on it without string-parsing `eventType`. |

Machine-readable schema: `schemas/event-envelope-v2.schema.json` (this package) supersedes `../schemas/event-envelope.schema.json` by adding `causationId`/`schemaVersion` as required fields; the Volume 1 schema remains valid for envelopes that predate this addition (an old consumer that only checks the Volume 1 required fields still validates a Volume 2 envelope, since the addition is backward-compatible/additive).

## 2. PII and Secret Exclusion Rules (Binding)

- **Never in any event payload:** password hashes, MFA secrets, access/refresh tokens, full card data (never held at all), full provider API secrets, raw webhook signatures.
- **Address fields:** included only in events where the consumer genuinely needs them for its function (e.g., `order.created.v1` includes shipping-relevant address fields for Fulfillment/Notification) — an event with no such need (e.g., `catalog.product_published.v1`) never includes any customer PII, even if it would be "convenient" for a hypothetical future consumer.
- **Enforcement mechanism:** every event payload is defined by an explicit, versioned schema (§6) reviewed at creation time against this rule — payloads are never `{ ...entity }` spreads of a full ORM entity, which is exactly the pattern that leaks new sensitive fields silently when an entity gains a column later.

## 3. Event Versioning Policy (Detail)

| Change Type | Action |
|---|---|
| Add an optional field | No version bump; existing consumers unaffected (they ignore unknown fields per standard forward-compatible parsing) |
| Add a required field with a sensible default for old data | No version bump if the field is additive with a documented default; otherwise treat as breaking (below) |
| Remove a field | Breaking — bump `eventType` to `.v{n+1}`; the old version continues to be dual-published for a defined deprecation window (default 90 days) so existing consumers migrate on their own schedule |
| Change a field's type or semantic meaning | Breaking — same dual-publish/deprecation approach |
| Rename a field | Breaking (treated as remove + add) — never silently repurposed under the same field name |
| Deprecation | A deprecated event version is announced via an entry in `deprecation-log.md` (this package) with a removal date; producers stop dual-publishing only after the removal date and after confirming (via consumer-side metrics — which consumers are still processing `.v{n}`) that no active consumer remains |
| Schema registry | No standalone schema-registry service is introduced at this stage (consistent with ADR-0005's Redis-backed-queues-over-broker decision) — the JSON Schema files in `schemas/` **are** the registry, version-controlled alongside the code; a consumer's CI can validate incoming fixture payloads against the pinned schema file for the version it declares support for |

## 4. Complete Event Catalog

Supersedes the "representative" table in `../09-event-architecture.md` §3 with the full catalog. Columns follow the same shape as Volume 1's table, with `causationId`-bearing chains noted.

| Event Type | Producer | Key Consumers | Causation Chain Note |
|---|---|---|---|
| `identity.user_registered.v1` | Identity & Access | Notification | Root event (causationId = originating request's correlationId) |
| `identity.session_revoked.v1` | Identity & Access | (security monitoring only) | Root or caused by `identity.password_reset_completed.v1` |
| `seller.organization_created.v1` | Seller | Notification | Root |
| `seller.verification_submitted.v1` | Seller | Notification, Administration (queue entry) | Root |
| `seller.verified.v1` | Seller | Catalog (unlock publish), Notification | Caused by an Admin `ApproveVerification` action |
| `seller.verification_rejected.v1` | Seller | Notification | Caused by Admin action |
| `seller.suspended.v1` / `seller.reinstated.v1` | Seller | Catalog (force-unpublish trigger), Notification | Caused by Admin action |
| `catalog.product_created.v1` | Catalog | (none critical — informational) | Root |
| `catalog.product_published.v1` / `product_unpublished.v1` | Catalog | Search, Notification | Root (seller action) |
| `catalog.product_suspended.v1` / `catalog.product_suspension_lifted.v1` | Catalog | Search, Notification | Caused by Moderation case resolution |
| `catalog.product_archived.v1` | Catalog | Search | Root |
| `pricing.price_changed.v1` | Pricing & Promotion | Search, Notification (price-drop alerts) | Root |
| `promotion.activated.v1` / `promotion.expired.v1` | Pricing & Promotion | Notification | Root/scheduled |
| `inventory.reserved.v1` / `inventory.released.v1` / `inventory.committed.v1` | Inventory | Analytics | Caused by the corresponding `CheckoutSession` step |
| `inventory.low_stock.v1` | Inventory | Notification (seller alert), Analytics | Root (threshold crossed) |
| `inventory.adjusted.v1` | Inventory | Analytics | Root (seller/admin manual adjustment) |
| `checkout.started.v1` / `checkout.completed.v1` / `checkout.failed.v1` | Checkout | Notification, Analytics | Root (customer action) / `checkout.completed.v1` causes `order.created.v1` |
| `order.created.v1` | Order | Notification, Analytics, Fulfillment (readiness), Search (review-eligibility groundwork) | Caused by `checkout.completed.v1` |
| `order.cancelled.v1` | Order | Notification, Inventory (release if applicable), Analytics | Caused by `CancelOrder`/`CancelOrderItem`/`AdminCancelOrder` |
| `order.closed.v1` | Order | Analytics | Caused by scheduled projection job |
| `payment.authorized.v1` / `payment.captured.v1` / `payment.failed.v1` / `payment.cancelled.v1` | Payment | Order (projection), Notification, Analytics | Caused by provider webhook `WebhookReceipt` |
| `refund.issued.v1` / `refund.failed.v1` | Payment | Order (projection), Notification, Analytics | Caused by `InitiateRefund` (itself often caused by `return.inspected.v1`) |
| `shipment.created.v1` / `shipment.shipped.v1` / `shipment.delivered.v1` / `shipment.exception.v1` | Fulfillment & Shipping | Order (projection), Notification, Review (eligibility) | `.created`/`.shipped` caused by seller action; `.delivered`/`.exception` caused by carrier webhook |
| `return.requested.v1` / `return.authorized.v1` / `return.denied.v1` / `return.received.v1` / `return.inspected.v1` | Fulfillment & Shipping | Order (projection), Inventory (restock, on `.received`), Notification | Chain rooted at customer's `RequestReturn` |
| `review.submitted.v1` / `review.flagged.v1` / `review.approved.v1` / `review.removed.v1` / `review.edited.v1` | Review | Catalog (rating recompute), Search, Moderation | Root (customer/moderator action) |
| `media.processed.v1` / `media.failed.v1` | Media | Catalog/Review/Seller (whichever owns the referencing entity) | Caused by upload confirmation |

## 5. Full Queue / Job Catalog

Supersedes `../11-queue-architecture.md`'s table with explicit dedup-key formulas and shutdown behavior per family (the retry/backoff/timeout/priority columns from Volume 1 are unchanged and not repeated here).

| Queue | Job Name | Dedup Key | Shutdown Behavior |
|---|---|---|---|
| `event-dispatch` | `outbox.dispatch` | `outboxMessage.id` | Drains in-flight dispatch, remaining `pending` rows picked up by the next replica on restart |
| `search-indexing` | `search.index-product` | `(productId, latest eventId processed)` — job re-reads current state so redelivery is a safe overwrite | Safe to kill mid-job; redelivered job re-derives from current Postgres state |
| `media-processing` | `media.process-asset` | `mediaAssetId` | In-flight scan/transcode allowed to finish (bounded by job timeout) before worker exit |
| `notification-email` \| `notification-sms` \| `notification-push` | `notification.send-{channel}` | `(eventId, channel)` — checked against `NotificationLog` before send | Safe to kill; redelivery re-checks `NotificationLog` before resending |
| `fulfillment-workflows` | `fulfillment.purchase-label` \| `fulfillment.sync-tracking` | `shipmentId` (+ provider idempotency key passed through) | In-flight label purchase allowed to finish (never interrupted mid-provider-call without a defined outcome check on restart) |
| `reconciliation` | `reconciliation.payment-drift` \| `reconciliation.inventory-sweep` \| `reconciliation.outbox-health` | `(jobType, windowStart, windowEnd)` | Always safe to kill — next scheduled run re-diffs from scratch |
| `analytics-ingest` | `analytics.ingest-batch` | `batchId` | Drains current batch; remaining events re-batched on next run |
| `scheduled-cleanup` | `cleanup.expire-carts` \| `cleanup.purge-media-orphans` \| `cleanup.rollup-notification-log` | `(jobType, runDate)` | Safe to kill — re-run is idempotent (delete-where-condition) |
| `fraud-scoring` | `fraud.score-subject` | `(subjectType, subjectId, ruleVersion)` | Safe to kill; redelivery recomputes and upserts |
| `seller-bulk-import` | `import.process-row` | `batchRowId` | In-flight row allowed to finish; remaining rows continue after restart from the job-status resource's last-processed marker |

## 6. Payload Schema Location

Every event type and job payload referenced above has (or, for future additive fields, will have) a JSON Schema file under `schemas/` in this package (`schemas/events/{eventType}.schema.json`) or `schemas/jobs/{jobName}.schema.json` — this document defines the catalog and naming; the exhaustive per-type schema authoring is a normal part of the corresponding backend implementation prompt, not fabricated here as already-existing files beyond the representative ones actually included in `schemas/` (see this package's `schemas/` directory listing for what is concretely provided now: the updated envelope schema).
