# Reliability Contracts: Failure Classification, Retry, Timeout, Circuit-Breaking

Extends `../20-reliability-architecture.md` with an explicit failure taxonomy and per-category policy, cross-referenced to the canonical error contract (`04-api-contract.md`, `../07-api-architecture.md` §6).

## 1. Failure Classification

| Category | Example | HTTP Status | Retryable by Client? | Log Severity | Alert? |
|---|---|---|---|---|---|
| Validation | Malformed request body | `400` | Only after fixing the request (not a blind retry) | `info`/`warn` | No |
| Business rule | `InsufficientInventory`, `PromotionNotEligible` | `422` or `409` | No (retrying the identical request will fail identically) | `info` | No |
| Authentication | Expired/invalid token | `401` | Yes, after refreshing the token | `warn` | Only on elevated failure-rate spikes (possible attack) |
| Authorization | Cross-seller access attempt | `403` | No | `warn` | Yes, if repeated from the same actor (possible probing) |
| Conflict | Idempotency-key hash mismatch, optimistic-concurrency `version` mismatch | `409` | Yes, after refetching current state | `info` | No |
| Dependency timeout | Stripe call exceeds 8s | `503` (surfaced to client as a typed, retryable error) | Yes, with backoff, respecting the idempotency key already used | `warn` | Yes, if sustained |
| Dependency unavailable | OpenSearch cluster down | `503` for search endpoints only (other endpoints degrade per `../20-reliability-architecture.md` §5, not fail) | Yes | `error` | Yes |
| Transient infrastructure failure | Momentary DB connection blip | `503` | Yes, connection-level retry already handled internally before surfacing to the client | `warn` | Only if retries exhaust |
| Permanent infrastructure failure | Database unreachable for an extended window | `503` | Client retry will not help until resolved | `error`/`fatal` | Yes, immediately |
| Internal defect | Unhandled exception, unexpected null | `500` | No — client retry is unlikely to succeed and the defect must be fixed | `error` | Yes |

## 2. Retry Contract (Per Category)

| Retryable Category | Max Attempts | Backoff | Jitter | Idempotency Requirement | Dead-Letter |
|---|---|---|---|---|---|
| Outbound provider call (Stripe, shipping, tax) | 1 automatic internal retry for transient network errors only; further retries are the client's/caller's decision | Exponential (base per `../16-external-integrations.md`) | Yes | Provider idempotency key required before any retry beyond the first | N/A (surfaced to caller) |
| Queue job (general) | Per queue family, `../11-queue-architecture.md` table (3–5 attempts typical) | Exponential, family-specific base | Yes (BullMQ built-in jitter) | Job must be safely re-runnable (§ per-family idempotency in `05-events-and-queues.md` §5) | Family-specific `*-dlq` |
| Database transient connection error | Up to 3 attempts | Exponential, 100ms base | Yes | N/A (connection-level, not a business-logic retry) | N/A — escalates to `503` if exhausted |
| Webhook processing (post-acknowledgement async job) | Per its queue family (`fulfillment-workflows`/`reconciliation` as applicable) | Family-specific | Yes | `WebhookReceipt` dedup already guarantees safety | Family-specific dead-letter |

**Explicit prohibition (restated, binding):** a charge/capture/refund call to Stripe, a `CommitReservation` past its first attempt, or any operation without a verified idempotency guarantee from the callee is **never** blindly retried — it fails fast and is queued for reconciliation (`17-migration-and-database-operations.md` is not the right home for this — see `../20-reliability-architecture.md` §7 and `../06-transaction-boundaries.md` throughout).

## 3. Timeout Contract

| Dependency | Timeout |
|---|---|
| HTTP request (client-facing, overall) | 30s hard ceiling at the load balancer; individual endpoints document their own expected p99 well under this |
| Database query (statement timeout) | 5–10s depending on query class (`10-configuration-contract.md`'s `DATABASE_STATEMENT_TIMEOUT_MS`) |
| Redis operation | 200–500ms |
| OpenSearch query | 1–2s |
| Stripe synchronous call | 8s |
| Shipping-provider rate/label call | 5s |
| Tax-provider call | 5s |
| Notification-provider call | 10–15s (async, non-blocking to the caller) |
| Queue job execution | Per-family, `../11-queue-architecture.md` table |

No dependency call in the codebase is permitted to omit an explicit timeout — an unbounded call is treated as a defect (caught by the resilience-test category in `20-architecture-test-contract.md`).

## 4. Circuit-Breaking Contract

| Target | Open Condition | Recovery Condition | Fallback | Alert |
|---|---|---|---|---|
| Stripe (synchronous calls) | Error rate > 50% over a rolling 30s window, min 10 requests | Half-open probe succeeds | Checkout payment step fails fast with `PAYMENT_TEMPORARILY_UNAVAILABLE` | Yes, immediately on open |
| Shipping provider | Same pattern | Same | Flat-rate/estimated shipping (`../16-external-integrations.md` §3) | Yes |
| Tax provider | Same pattern | Same | Static tax table (`../16-external-integrations.md` §4) | Yes |
| Fraud/risk provider | Same pattern | Same | Internal heuristic scoring (`../16-external-integrations.md` §6) | Yes, if sustained |
| OpenSearch | Same pattern, applied per-endpoint that queries search | Same | Basic Postgres catalog browse (`../13-search-architecture.md` §7) | Yes |
| Notification providers | Not circuit-broken — inherently async/queued, so a slow/failing provider only grows queue depth, which has its own alert (`../19-observability-architecture.md` §6) rather than needing a breaker | N/A | N/A | Queue-depth alert instead |

**Explicitly not circuit-broken:** PostgreSQL and Redis (the platform's own primary dependencies) — a circuit breaker in front of the primary datastore would not add resilience (there is no fallback for "the database is down" other than failing the request), so this would only add complexity without value, consistent with `../20-reliability-architecture.md` §1's table already showing "N/A (primary dependency)" for Postgres.
