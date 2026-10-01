# Capacity-Planning Model

Extends `../21-scalability-architecture.md` with a measurable-variable framework, per the Master Prompt's explicit prohibition on fabricating exact future capacity numbers without a basis. This document defines *what to measure and how scaling decisions are triggered*, not invented target numbers.

## 1. Capacity Variables by Component

| Component | Primary Variable(s) to Measure | Scaling Trigger (Signal, Not a Fabricated Number) |
|---|---|---|
| API requests | Requests/sec per route class, p50/p95/p99 latency, error rate | Sustained CPU > 60–70% or p99 latency SLO breach for the route class (`../21-scalability-architecture.md` §1) — the actual RPS number this corresponds to is measured per deployment, not predicted in advance |
| Concurrent sessions | Active `Session` count, refresh-token issuance rate | Session-store (Redis revocation cache) memory usage approaching configured limits |
| Database throughput | Queries/sec by query class, connection pool utilization, replica lag (once replicas exist) | Pool utilization sustained near max, or replica lag exceeding an acceptable staleness bound for the read paths using it (`17-migration-and-database-operations.md` §3) |
| Cache operations | Redis ops/sec, hit/miss ratio per namespace, memory usage | Memory usage approaching `maxmemory`, or hit ratio dropping (indicating cache is too small for the working set) |
| Search requests | OpenSearch query latency, indexing lag (`07-search-contracts.md` §3) | Query latency degradation or indexing lag exceeding the 30s SLO |
| Queue throughput | Per-queue-family jobs/sec, queue depth, consumer lag | Queue depth/lag trending upward faster than worker pool processes it (`../11-queue-architecture.md` scaling trigger) |
| Event throughput | Outbox dispatch rate, oldest-pending-message age (`../10-outbox-architecture.md` §6) | Oldest-pending age exceeding a few minutes |
| Media volume | Upload rate, processing-queue depth, storage growth rate | Processing queue depth trending upward; storage growth rate informing capacity/cost planning (not an architectural scaling decision, a cost one) |
| Notification volume | Sends/sec per channel, provider rate-limit headroom | Approaching the notification provider's own rate limits (an external constraint, not an internal scaling one — mitigated by the provider-failure-isolation design in `09-notification-contract.md`, not by "scaling harder" against a fixed external limit) |
| Storage growth | Table size growth rate (esp. `AuditLogEntry`, `Price`, `NotificationLog` — `17-migration-and-database-operations.md` §4's partitioning candidates) | Approaching the size thresholds named in that document |

## 2. Load-Testing Requirement (Process, Not a Number)

Before any milestone claiming production-readiness, a load test exercises the checkout path (the platform's most contention-sensitive flow, per `../06-transaction-boundaries.md` §2.1) at a magnitude informed by the actual product launch plan (marketing commitments, expected traffic from a specific campaign) — this architecture package does not fabricate a target RPS, since the Master Prompt explicitly prohibits inventing capacity numbers without a basis; the number comes from the business, and the *architecture's* obligation is that the scaling mechanisms described in `../21-scalability-architecture.md` and this document's variables are what get tuned to meet whatever number the business supplies.

## 3. Scaling Decision Log (Process)

Every time a scaling trigger above actually fires in production, the resulting scaling action (adding replicas, adding a read replica, tuning autovacuum, etc.) is recorded — this creates the empirical basis for capacity planning that this document explicitly declines to fabricate in advance. This log does not exist yet (no production traffic has occurred against this architecture), and this document does not claim otherwise.
