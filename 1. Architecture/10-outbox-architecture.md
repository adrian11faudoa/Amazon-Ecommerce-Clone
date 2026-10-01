# Transactional Outbox Architecture

## 1. Purpose

Guarantees that a database mutation and the resulting event publication either both happen or neither does — eliminating the "wrote to Postgres but the event bus was down" failure mode without a distributed transaction (see ADR-0003).

## 2. Where It Is Mandatory

- `catalog.product_published.v1` / `product_unpublished.v1` (Search must not miss these)
- `inventory.*` events (Analytics/low-stock alerting reliability)
- `order.created.v1`, `order.cancelled.v1`
- `payment.captured.v1`, `payment.failed.v1`, `refund.issued.v1`
- `shipment.delivered.v1`, `return.received.v1`
- `review.submitted.v1`

Any event whose loss would cause a silent, hard-to-detect downstream inconsistency (missing search entry, missing notification for a financial event, missed inventory restock) goes through the outbox.

## 3. Where It Is Unnecessary

- Low-stakes, best-effort signals where occasional loss is acceptable and independently reconcilable — e.g., `catalog.viewed` style analytics pings (these are emitted directly to the analytics ingestion queue, not via the outbox, per `27-analytics-architecture.md`).
- Any event that has no consequence if delayed by the outbox dispatcher's normal polling interval (all events tolerate some delay by design — this exemption is only for events where even eventual delivery is non-essential).

## 4. Mechanism

1. Within the same Postgres transaction as the business mutation (e.g., inserting the `Order` row), insert a row into `OutboxMessage` (`id`, `eventEnvelopeJson`, `status='pending'`, `createdAt`).
2. A dedicated dispatcher worker polls `OutboxMessage WHERE status='pending' ORDER BY createdAt LIMIT N FOR UPDATE SKIP LOCKED`, publishes each to the event-bus queue, and marks it `status='dispatched'` in a follow-up transaction.
3. On publish failure, the message remains `pending` and is retried on the next poll with backoff; a message stuck `pending` past a threshold triggers an alert.
4. Dispatched messages are retained for a bounded audit window then purged/archived (they are not the event log of record for replay beyond that window — see below).

## 5. Duplicate Handling

The dispatcher may publish a message more than once if it crashes between publish and status update — this is acceptable because all consumers are required to be idempotent on `eventId` (§ Event Architecture). The outbox never attempts exactly-once delivery; it guarantees **at-least-once, never-zero** delivery.

## 6. Cleanup & Monitoring

- Dispatched messages older than the audit retention window (default 14 days) are purged by a scheduled job.
- Metrics: `outbox_pending_count`, `outbox_oldest_pending_age_seconds`, `outbox_dispatch_failures_total` — alert when oldest-pending age exceeds a few minutes, which indicates dispatcher stall rather than normal processing lag.

## 7. Replay Considerations

For genuine event replay needs (e.g., rebuilding the Search index from scratch), the architecture does not rely on outbox history — it re-derives the full event stream from the authoritative source tables directly (Catalog/Pricing/Inventory) via a dedicated reindex job (see `13-search-architecture.md` §"Rebuild"), since the outbox is a delivery mechanism, not a permanent event store.
