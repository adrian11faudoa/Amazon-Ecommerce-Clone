# ADR-0005: Redis-Backed BullMQ Queues over a Dedicated Event Broker (Initial Architecture)

## Status
Accepted

## Context
The platform needs asynchronous job processing (search indexing, notifications, media processing) and an event bus for cross-domain notification (`09-event-architecture.md`, `11-queue-architecture.md`). A dedicated broker (Kafka, Redpanda) offers stronger durability/replay guarantees than a Redis-backed queue.

## Decision
Use **BullMQ on Redis** for both background job processing and as the event-bus transport (via the outbox dispatcher, `10-outbox-architecture.md`) in the initial architecture. Introducing a dedicated broker is deferred to a future ADR triggered by a concrete signal.

## Rationale
- Redis is already part of the technology direction for caching/sessions/locks — reusing it for queue transport avoids introducing an entirely new infrastructure component (and its operational burden: cluster management, partition rebalancing, schema registry) before there is a demonstrated need.
- BullMQ provides the retry/backoff/dead-letter/priority/concurrency primitives required by `11-queue-architecture.md` out of the box.
- Consumer idempotency requirements (§ Event Architecture) are identical regardless of transport choice, so this decision does not compromise correctness relative to a broker-based design.

## Alternatives Considered
- **Kafka/Redpanda from day one:** rejected for the initial architecture — adds operational complexity (partitioning strategy, consumer group management, schema registry) disproportionate to current throughput and replay-retention needs; remains the natural next step if event-replay-retention or sustained throughput requirements exceed Redis-backed queue capacity.

## Consequences
- Event replay is bounded by the outbox's retention window (`10-outbox-architecture.md` §6/§7); long-retention replay needs would require revisiting this decision.
- Migration path if revisited: the event envelope (`09-event-architecture.md` §2) and consumer idempotency model are transport-agnostic by design, so a future broker migration changes the dispatcher/transport layer, not the event contract itself.
