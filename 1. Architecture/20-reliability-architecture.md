# Reliability Architecture

## 1. Dependency Resilience Matrix

| Dependency | Timeout | Retry | Backoff | Idempotency Basis | Circuit Breaker | Fallback / Degradation |
|---|---|---|---|---|---|---|
| PostgreSQL | Statement timeout (e.g., 5–10s per query class) | Connection-level retry only (transient network), never blind statement retry on ambiguous failure | Exponential, capped | Transaction-scoped, application-level idempotency keys where applicable | N/A (primary dependency — no fallback exists; failure surfaces as 503 with alert) | None — Postgres unavailability is a full-severity incident |
| Redis (cache/rate-limit) | 200–500ms | 1 retry | Fixed short | N/A (cache reads are naturally safe to retry) | Yes — trips to "cache bypass" mode | Fail-open: reads fall through to Postgres; rate limiting fails open with alert (never fails closed and blocks all traffic) |
| Redis (locks/queue transport) | Short (lock-specific) | Limited | Short fixed | Lock tokens | N/A | Reservation path falls back to Postgres `FOR UPDATE` serialization if lock service degraded |
| OpenSearch | 1–2s per query | 1 retry | Fixed short | Read-only, safe to retry | Yes | Fallback to basic Postgres catalog browse; checkout/order unaffected |
| Stripe | 8s (sync calls) | Provider-idempotency-key-protected retry only | Exponential | Idempotency-Key header | Yes | Checkout payment step fails fast with a typed, user-facing "payment temporarily unavailable"; existing orders unaffected |
| Shipping provider | 5s | 1 retry (idempotent GET/rate calls only) | Fixed short | N/A for rate quotes | Yes | Flat-rate/estimated shipping fallback, flagged for reconciliation |
| Tax provider | 5s | 1 retry | Fixed short | N/A (stateless calc) | Yes | Static tax table fallback, flagged for reconciliation |
| Email/SMS/Push providers | 10–15s | Multiple (queue-managed) | Exponential | Dedup via NotificationLog | Not required (async, non-blocking) | Retried independently; never blocks the originating workflow |
| Fraud/risk provider | 2–3s | 1 retry | Fixed short | N/A | Yes | Conservative internal heuristic fallback; order proceeds, flagged for manual review if score unavailable |

## 2. Idempotency Summary

Applied at three layers: (1) client-supplied `Idempotency-Key` on API writes (`07-api-architecture.md` §7), (2) domain-level natural keys (e.g., unique `(checkoutSessionId, skuId)` for reservations, unique `(provider, providerRef)` for payments), (3) consumer-side `eventId`/job-payload dedup (`09-event-architecture.md` §4, `11-queue-architecture.md`).

## 3. Duplicate Handling

- **Duplicate HTTP requests:** idempotency-key store returns the original response.
- **Duplicate events:** consumers check `eventId` against a processed-set before acting.
- **Duplicate webhooks:** provider event ID checked before processing.
- **Duplicate queue job execution** (e.g., BullMQ at-least-once redelivery after a worker crash mid-job): every job handler is written to be safely re-runnable from scratch (upsert semantics, not increment-in-place, wherever the operation isn't already naturally idempotent).

## 4. Partial Failure & Backpressure

- Non-critical dependencies (search, analytics, notifications) are isolated behind queues so their slowness/failure creates queue backlog, not request-path latency for critical operations (checkout, order, payment).
- Backpressure on queues is handled by concurrency caps per worker pool and priority tiers (`11-queue-architecture.md`), not by unbounded worker scaling that could overwhelm downstream Postgres.

## 5. Graceful Degradation Examples

| Scenario | Degraded Behavior |
|---|---|
| OpenSearch down | Search/browse limited to basic Postgres filtering; checkout unaffected |
| Redis down | Higher latency (cache bypass), rate limiting fails open with alert; checkout/order/payment still function via Postgres-only paths |
| Shipping provider down | Estimated shipping cost shown, reconciled later |
| Notification providers down | Orders/payments succeed; notifications delayed, not lost (queued) |
| Fraud provider down | Internal heuristic scoring used; higher manual-review rate, no checkout blockage |

## 6. Recovery & Reconciliation

Every fallback path above has a corresponding scheduled reconciliation job (`11-queue-architecture.md` `reconciliation` queue) that detects and corrects the resulting approximation (e.g., re-quoting actual shipping cost once the provider recovers, re-verifying payment status against Stripe) — degradation is always paired with a defined path back to full correctness, never left as a permanent approximation.

## 7. No Retry Storms

Retry policies use exponential backoff with jitter; circuit breakers prevent sustained retry pressure on a failing dependency; non-idempotent operations (e.g., a charge attempt without a provider idempotency key guarantee) are never retried automatically — they fail fast and require explicit reconciliation.
