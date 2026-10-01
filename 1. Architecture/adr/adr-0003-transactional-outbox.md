# ADR-0003: Transactional Outbox for Critical Event Publication

## Status
Accepted

## Context
Domain mutations (order creation, payment capture, inventory changes) must reliably produce downstream events (search indexing, notifications) without requiring a distributed transaction across Postgres and the queue/event transport.

## Decision
Use the transactional outbox pattern (`10-outbox-architecture.md`) for all events whose loss would cause a silent, hard-to-detect downstream inconsistency. Lower-stakes, best-effort signals (e.g., product-view analytics pings) bypass the outbox and publish directly to their ingestion queue.

## Rationale
- Guarantees at-least-once, never-zero delivery for critical events using only local Postgres transactions plus a polling dispatcher — no distributed transaction coordinator required.
- Scoping the pattern to critical events only (rather than applying it universally) avoids unnecessary write amplification on high-volume, low-stakes signals.

## Alternatives Considered
- **Dual-write (write to Postgres, then publish directly to the queue in the same request):** rejected — a crash between the two steps silently loses the event with no recovery path.
- **Change Data Capture (CDC) off the Postgres WAL:** considered viable and potentially adopted later at higher scale/lower coupling-cost requirements, but rejected for the initial architecture as added infrastructure complexity (WAL-streaming connector, schema-change sensitivity) without a current signal that outbox-polling latency (sub-second to low-seconds) is insufficient.

## Consequences
- A dispatcher worker and `OutboxMessage` table are required infrastructure from day one for the domains listed in `10-outbox-architecture.md` §2.
- Revisiting toward CDC is a natural future ADR if outbox dispatch latency or polling overhead becomes a measured bottleneck.
