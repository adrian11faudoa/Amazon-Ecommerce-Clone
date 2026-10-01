# Rate-Limiting & Anti-Abuse Contract (Detail)

Extends `../26-fraud-abuse-architecture.md` §5 with the full category table and explicit anti-abuse control-to-risk mapping.

## 1. Rate-Limit Category Table

| Category | Key | Scope | Limit (Representative) | Window | Burst Behavior | Storage | Response | Bypass |
|---|---|---|---|---|---|---|---|---|
| `auth-strict` | `(accountEmailOrPhone, ip)` | Login, registration, password recovery | 5 attempts | 60s, escalating lockout beyond 3 windows | None — strict | Redis (`ratelimit:` namespace, `06-redis-namespace-catalog.md`) | `429` + `Retry-After` | None |
| `standard` | `actorId` (or `ip` if unauthenticated) | General authenticated reads/writes not otherwise categorized | 100 req | 60s | Small burst allowance (token bucket) | Redis | `429` | None |
| `checkout` | `customerId` | Checkout session start/complete | 10 req | 60s | None | Redis | `429` | None |
| `seller-write` | `sellerOrgId` | Catalog/inventory writes | 50 req | 60s | Small burst | Redis | `429` | None |
| `seller-bulk` | `sellerOrgId` | Bulk import row submission | 500 req | 60s | Queue-smoothed (see `05-events-and-queues.md`'s `seller-bulk-import` queue) rather than hard-rejected | Redis + queue backpressure | `429` if queue backlog for this seller exceeds a cap | None |
| `review-write` | `(customerId, productId)` | Review submission | 1 per product per purchase (not a time-window limit — a business-rule uniqueness constraint, see `02-state-machines.md` §11) plus a general anti-spam `5 req / 60s` per customer across all products | 60s | None | Redis + Postgres unique constraint | `429` or `409 DUPLICATE_REVIEW` | None |
| `product-search` | `ip` (unauthenticated) or `actorId` | Public catalog/search reads | 300 req | 60s | Generous burst (legitimate browsing is bursty) | Redis | `429` | Internal service-to-service calls (e.g., Search reindex jobs reading Catalog) use a separate internal-actor identity exempt from this consumer-facing limit |
| `admin-read` | `actorId` | Admin read endpoints | 200 req | 60s | Moderate | Redis | `429` | None |
| `admin-financial` | `actorId` | Refunds, seller verification approval, role grants | 20 req | 60s | None — deliberately tight given the sensitivity | Redis | `429` | None |
| `webhook` | `(provider, sourceIp-range)` | Inbound provider webhooks | Generous (providers can burst-deliver), but signature-gated — this limit exists only to blunt a genuine flood/attack, not to throttle legitimate provider traffic | 60s | Generous | Redis | `429` (rare) | Requests failing signature verification are rejected before consuming rate-limit budget meaningfully counted against the provider — they're logged/alerted separately (`04-api-contract.md` §3) |
| `media-upload` | `actorId` | Upload-intent creation | 30 req | 60s | Small burst | Redis | `429` | None |

## 2. Anti-Abuse Control-to-Risk Mapping (Deterministic Controls, Detail)

| Risk | Deterministic Control | Where Enforced |
|---|---|---|
| Account-creation abuse (bulk fake accounts) | Rate limit (`auth-strict`) + email verification requirement before checkout/publish + optional CAPTCHA-class challenge on anomalous registration velocity from one IP/range | Identity & Access |
| Credential attacks | `auth-strict` limit + progressive lockout + MFA for internal roles (`../08-auth-architecture.md` §4) | Identity & Access |
| Scraping | `product-search` limit; additionally, response payloads for unauthenticated bulk-pattern access may be throttled more aggressively via a secondary anomaly-detection rule (request pattern, not just raw count) — this secondary layer is the async, heuristic-tier control, not the deterministic rate limiter itself | Search/API gateway layer |
| Seller abuse (non-delivery, counterfeit) | Deterministic: shipment-SLA-miss counter per seller feeding a visible "at risk" flag once a threshold is crossed; Asynchronous: `fraud-scoring` queue trend analysis (`../26-fraud-abuse-architecture.md` §3) | Fulfillment + Fraud & Abuse |
| Review abuse | `review-write` limit + purchase-verification requirement (`02-state-machines.md` §11) + async anomaly flagging (burst pattern) routed to `PENDING_MODERATION` | Review + Fraud & Abuse |
| Promotion abuse | Transactional `redemptionCount ≤ redemptionLimit` check (`../06-transaction-boundaries.md` pattern) + per-customer usage cap enforced the same way | Pricing & Promotion |
| Inventory abuse (reservation hoarding to deny stock to others without purchasing) | Reservation TTL + expiry sweep (`02-state-machines.md` §3) bounds the damage window; a per-customer/per-session reservation-attempt rate limit (folded into `checkout` category) further bounds abuse velocity | Inventory + Checkout |
| Checkout abuse (automated checkout bots) | `checkout` rate limit + idempotency-key requirement (prevents duplicate-order farming via retries) + synchronous fraud-scoring gate at high-value thresholds (`../26-fraud-abuse-architecture.md` §3) | Checkout + Fraud & Abuse |
| Payment abuse (stolen cards) | Stripe Radar (or equivalent) signal at the checkout gate (`../16-external-integrations.md` §6); chargeback-rate monitoring per seller feeding seller risk status | Payment + Fraud & Abuse |
| Malicious uploads | Type/size/malware validation (`08-storage-and-media-contract.md` §5) | Media |

## 3. Trusted Internal Workflow Bypass

Internal system actors (background workers calling their own domain's APIs, e.g., the Checkout saga calling Inventory's reservation endpoint in-process within the modular monolith) are **not** subject to the consumer-facing rate-limit categories above — they authenticate as a distinct internal service identity and are governed instead by the queue-level concurrency caps (`../11-queue-architecture.md`) that already bound their throughput. This bypass is explicit and scoped to identified internal actors only — it is never a blanket "internal IP range" exemption, which could be abused if an internal network boundary were ever compromised.
