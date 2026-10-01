# Event Architecture

## 1. When Events Are Used

Events are used for cross-domain notification of a fact that already happened (past tense), consumed asynchronously by domains that do not need to participate in the originating transaction. Events are never used to request an action be performed (that is a command, invoked synchronously via a service call within the checkout saga or a queue job for background work) and never used as the sole path to a business-critical, immediately-required state change (e.g., inventory commit within checkout is a synchronous command, not an event).

## 2. Canonical Event Envelope

```json
{
  "eventId": "01J8ZC2Q7N3RZK8T6H5G4F1D2E",
  "eventType": "order.created.v1",
  "eventVersion": 1,
  "aggregateType": "Order",
  "aggregateId": "b3f1c9de-...",
  "producer": "order-service",
  "occurredAt": "2026-09-16T14:32:00Z",
  "correlationId": "01J8Z...",
  "traceContext": { "traceparent": "00-...-...-01" },
  "payload": { "...": "..." }
}
```

| Field | Rule |
|---|---|
| `eventId` | UUIDv7, unique per emitted event, used for consumer-side deduplication |
| `eventType` | `domain.pastTenseAction.vN` — lowercase, dot-separated, explicit version suffix |
| `eventVersion` | Integer, bumped on any breaking payload change; a new `eventType` suffix (`.v2`) is introduced rather than mutating `.v1` consumers silently |
| `aggregateType` / `aggregateId` | Identifies the authoritative entity that changed |
| `producer` | Logical module name that emitted the event |
| `occurredAt` | UTC timestamp of the business event (not the publish time, if they differ) |
| `correlationId` | Propagated from the originating request's trace ID |
| `traceContext` | W3C Trace Context for distributed tracing continuity |
| `payload` | Event-specific, versioned schema; contains only data the event type's schema declares — no incidental extra fields |

## 3. Event Catalog (Representative)

| Event Type | Producer | Key Consumers | Ordering Requirement | Delivery Semantics |
|---|---|---|---|---|
| `identity.user_registered.v1` | Identity & Access | Notification | None | At-least-once |
| `seller.verified.v1` | Seller | Catalog (unlock publish), Notification | None | At-least-once |
| `catalog.product_published.v1` | Catalog | Search, Notification | None | At-least-once |
| `catalog.product_unpublished.v1` | Catalog | Search | Must not be processed before a prior `product_published` for the same aggregate if both are in flight — consumer sorts by `occurredAt` per `aggregateId` | At-least-once |
| `pricing.price_changed.v1` | Pricing & Promotion | Search, Notification (price-drop alerts) | Per-`skuId`, latest `occurredAt` wins | At-least-once |
| `inventory.low_stock.v1` | Inventory | Notification (seller alert), Analytics | None | At-least-once |
| `inventory.reserved.v1` / `inventory.released.v1` / `inventory.committed.v1` | Inventory | Analytics | Per-reservation ordering not required (each event self-contained) | At-least-once |
| `checkout.completed.v1` | Checkout | Notification, Analytics | None (Order creation is synchronous within the saga, not event-driven) | At-least-once |
| `order.created.v1` | Order | Notification, Analytics, Search (rating-eligibility groundwork) | None | At-least-once |
| `order.cancelled.v1` | Order | Notification, Inventory (release if not yet committed — rare path), Analytics | Must be processed after any `order.created.v1` for the same aggregate | At-least-once |
| `payment.captured.v1` / `payment.failed.v1` | Payment | Order (status projection), Notification, Analytics | Per-`paymentId`, ordered by `occurredAt` | At-least-once |
| `refund.issued.v1` | Payment | Order (status projection), Notification, Analytics | None | At-least-once |
| `shipment.delivered.v1` | Fulfillment | Order (status projection), Notification, Review (eligibility) | None | At-least-once |
| `return.received.v1` | Fulfillment | Inventory (restock command trigger), Notification | None | At-least-once |
| `review.submitted.v1` | Review | Catalog (rating recompute trigger), Search, Moderation | None | At-least-once |

## 4. Delivery Semantics & Ordering

- **Default: at-least-once delivery.** All consumers must be idempotent, deduplicating on `eventId` (store processed IDs with a bounded TTL matching the maximum plausible redelivery window, e.g., 7 days).
- **Ordering:** global ordering is not guaranteed. Where per-aggregate ordering matters (e.g., product publish/unpublish), consumers must compare `occurredAt` (or a monotonic sequence number, see below) per `aggregateId` and discard/ignore stale-order deliveries rather than assuming arrival order.
- **Stronger-guarantee option:** for a small number of genuinely ordering-sensitive streams (payment/order status), the producer additionally stamps a per-aggregate monotonic `sequence` integer; consumers reject/reorder-buffer an event whose `sequence` is not `lastAppliedSequence + 1` for that aggregate, rather than assuming transport-level ordering.

## 5. Transport

- Events are published via the transactional outbox (`10-outbox-architecture.md`) and dispatched to a Redis-backed BullMQ "event bus" queue family, fanned out to per-consumer queues by the dispatcher. This avoids introducing a separate broker (Kafka/Redpanda) until throughput or multi-consumer replay requirements exceed what a Redis-backed queue can serve — see ADR-0005.
- Consumers are BullMQ workers; a consumer failure retries with backoff and eventually dead-letters (see `11-queue-architecture.md`), with alerting on dead-letter growth.

## 6. Schema Evolution

- Additive, backward-compatible payload changes (new optional field) do not require a version bump.
- Breaking changes (field removal/type change/semantic change) require a new `eventType` version suffix; the producer may dual-publish both versions during a defined migration window; consumers declare which version(s) they handle and ignore others.
