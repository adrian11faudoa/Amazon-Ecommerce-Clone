# Redis Namespace Catalog

Extends `../12-cache-architecture.md` with exact key patterns and explicit ownership so no module creates an ad hoc, unowned key. Every namespace below has exactly one owning module; a module reads/writes another's namespace only through that module's exposed helper functions (never raw Redis commands against a foreign prefix).

| Namespace Prefix | Key Pattern | Owner | Value Format | TTL | Failure Behavior |
|---|---|---|---|---|---|
| `session:revoked:` | `session:revoked:{sessionId}` | Identity & Access | `"1"` (boolean flag) | 15 min (matches access-token lifetime) | Fail-open on check (`../20-reliability-architecture.md` §1) |
| `ratelimit:` | `ratelimit:{actorOrIp}:{endpointClass}:{windowStart}` | Shared rate-limiting middleware (Administration owns the middleware code, but every module's routes use it) | Integer counter (`INCR`) | Window length (e.g., 60s) | Fail-open, alert |
| `catalog:product:` | `catalog:product:{productId}:v{schemaVersion}` | Catalog | JSON | 5 min or active-invalidated | Fall through to Postgres |
| `catalog:category-tree:` | `catalog:category-tree:v{schemaVersion}` | Catalog | JSON | 1 hour or active-invalidated | Fall through to Postgres |
| `cart:` | `cart:{cartId}` | Cart | JSON | 30 min sliding | Fall through to Postgres |
| `lock:inventory:` | `lock:inventory:{skuId}` | Inventory | Lock token string (Redlock-style single-instance lock, acceptable given Postgres `FOR UPDATE` is the real correctness backstop per `../12-cache-architecture.md`) | A few seconds | Fall back to Postgres-only serialization |
| `idempotency:` | `idempotency:{actorId}:{key}` | Shared idempotency middleware (`04-api-contract.md` §2) | JSON (`{ requestHash, responseStatus, responseBody }`) | 24h | Fall back to the Postgres `IdempotencyRecord` table, which is always also written — Redis is a fast-path cache of it, never the sole store |
| `search:query:` | `search:query:{queryHash}` | Search | JSON | 60s | Fall through to live OpenSearch query |
| `config:` | `config:{flagKey}` | Administration (configuration module) | JSON/scalar | 5 min or pub/sub-invalidated | Fall through to Postgres config table |
| `webhook:seen:` | `webhook:seen:{provider}:{providerEventId}` | Payment / Fulfillment (per-provider) — fast-path duplicate check ahead of the authoritative `WebhookReceipt` unique constraint | `"1"` | 48h (covers realistic provider retry windows) | Fall through to the Postgres `WebhookReceipt` unique-constraint check, which is authoritative regardless of this cache |
| `checkout:step-lock:` | `checkout:step-lock:{checkoutSessionId}` | Checkout | Lock token | A few seconds | Falls back to the `CheckoutSession.version` optimistic-concurrency guard (`../06-transaction-boundaries.md` §2.3) — this Redis lock is purely an optimization to avoid wasted concurrent-step racing, not a correctness requirement |
| `notification:dispatch-lock:` | `notification:dispatch-lock:{eventId}:{channel}` | Notification | Lock token | A few seconds | Falls back to the `NotificationLog` unique-constraint dedup check (`../15-notification-architecture.md` §5), which is authoritative |
| `bull:` | `bull:{queueName}:*` | BullMQ library internals (owned collectively by whichever module registers each queue, per `05-events-and-queues.md` §5) | BullMQ-internal | N/A | See `../12-cache-architecture.md` §"Principles" — bounded by reconciliation jobs |

## Rules

1. **No shared, unnamespaced keys.** Every key belongs to exactly one prefix, and every prefix belongs to exactly one owning module, matching the "one authoritative owner" rule from `../04-domain-ownership-matrix.md` applied to cache state.
2. **New namespace = new row in this table**, added in the same change that introduces the key pattern in code — this table is not allowed to drift from the actual key patterns in use (verified by `validate_contracts.py`, §"Redis namespace check").
3. **Every namespace has a documented failure behavior** — no namespace may be introduced without stating what happens if Redis is unavailable when that key is needed (this is what makes `../20-reliability-architecture.md`'s fail-open/fail-through guarantees actually enforceable rather than aspirational).
4. **Memory isolation:** the general-cache namespaces (`catalog:*`, `search:query:*`, `config:*`) live in a Redis logical database with `allkeys-lru` eviction; `bull:*` (queue transport) and `lock:*`/`idempotency:*`/`webhook:seen:*` (correctness-adjacent) live in a separate logical database with no eviction, so cache pressure can never evict a lock, an idempotency record, or queue data (restates and makes concrete `../12-cache-architecture.md`'s "Memory bounding" principle).
