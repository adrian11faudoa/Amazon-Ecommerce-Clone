# API Contract (Detail)

Extends `../07-api-architecture.md`. That document remains authoritative for resource naming, versioning, and the canonical error/pagination shapes; this document adds the implementation-binding detail those shapes only summarized.

## 1. Pagination Contract (Detail)

- **Cursor encoding:** base64url of a server-signed JSON payload `{ "lastId": "<uuid>", "lastSortValue": <value>, "sig": "<hmac>" }`. The HMAC (server secret) prevents clients from constructing or tampering with cursors — a tampered cursor returns `400 INVALID_CURSOR`, never a silent wrong-page result.
- **Cursor stability under concurrent writes:** because the cursor encodes `(lastSortValue, lastId)` and every query's `ORDER BY` includes `id` as a tiebreaker, a row inserted or deleted after a cursor was issued cannot cause a duplicate or skipped row in the *already-fetched* pages — only the *not-yet-fetched* tail can shift, which is the accepted, documented behavior for a live, mutable dataset (not a snapshot isolation guarantee).
- **Newly inserted records:** appear in later pages only if they sort after the current cursor position under the endpoint's declared sort order; a newly inserted record that would sort *before* the cursor is simply not seen in the current pagination walk (expected for a live feed, not a bug).
- **Deleted records:** if a row referenced by a cursor is deleted, the next page's query (`WHERE (sortValue, id) > (lastSortValue, lastId)`) naturally skips it — no special-case handling required.
- **Page size:** default `20`, maximum `100` (`../07-api-architecture.md` §4); a request for `limit > 100` returns `400 INVALID_LIMIT`, not a silently clamped value.
- **Sort requirement:** every cursor-paginated endpoint's default and every allowed alternate sort must include a unique tiebreaker column (`id`) — an endpoint may not offer a sort option that isn't unique without a documented tiebreaker.
- **Offset pagination exception:** permitted only for genuinely small, admin-facing, rarely-changing collections (e.g., `GET /admin/feature-flags`) where total count display is more valuable than cursor stability — every such endpoint is explicitly flagged `paginationStyle: offset` in its OpenAPI operation description so client generators do not assume cursor style uniformly.

## 2. Idempotency Contract (Detail)

| Aspect | Rule |
|---|---|
| Key source | Client-generated (UUID or any sufficiently unique string), sent as `Idempotency-Key` header |
| Storage | `IdempotencyRecord` table: `(key, actorId, requestHash, responseStatus, responseBodyJson, createdAt)`, unique on `(key, actorId)` — scoped per actor so two different customers can coincidentally reuse the same key string without collision |
| TTL | 24 hours, enforced by a scheduled cleanup job (matches `../07-api-architecture.md` §7) |
| Request fingerprinting | `requestHash = SHA-256(method + path + normalizedBody)`; a replay with the **same** key and **same** hash returns the stored response verbatim (same status code, same body) without re-executing business logic; a replay with the same key but a **different** hash returns `409 IDEMPOTENCY_KEY_CONFLICT` |
| Response replay behavior | The stored response is returned exactly, including the original `Location` header if present — a client cannot distinguish a replay from the original call except via timing |
| Applies to | Every operation listed in `../07-api-architecture.md` §7 plus, per the Volume 2 prompt's explicit list: `StartCheckout`, `CompleteCheckout`, `CreatePaymentIntent`/webhook confirmation, `InitiateRefund`, `ReserveInventory` (internal, keyed by `(checkoutSessionId, skuId)` rather than a client header per `../06-transaction-boundaries.md` §2.1), `CancelOrder`/`CancelOrderItem`, all inbound provider webhooks (keyed by provider event ID, §3 below), all BullMQ jobs (keyed by job payload's natural key, `05-events-and-queues.md`), notification dispatch (keyed by `(eventId, channel)`, `../15-notification-architecture.md` §5), and any seller operation with financial consequence (bulk price/inventory updates, per-row idempotency key, `../06-transaction-boundaries.md` §2.10) |

## 3. Webhook Contract (Detail)

Applies to all inbound provider callbacks (Stripe, shipping carrier, tax provider — `../16-external-integrations.md`).

| Step | Requirement |
|---|---|
| Endpoint authentication | No bearer-token auth (providers can't hold platform sessions); instead, provider-specific signature verification (Stripe: `Stripe-Signature` header + signing secret; carriers: HMAC or shared-secret query param per provider) |
| Raw-payload handling | The raw request body bytes are preserved (not re-serialized) for signature verification — signature checks run against the exact bytes received, before any JSON parsing/body-parser transformation that could alter whitespace/ordering |
| Event ID | Every provider event carries (or is assigned) a unique `providerEventId`, stored in a `WebhookReceipt` table `(provider, providerEventId, receivedAt, processingStatus)` with a unique constraint on `(provider, providerEventId)` |
| Provider event version | Stored alongside the receipt (`providerApiVersion` field) so a later provider API-version change is diagnosable against historical receipts |
| Replay protection | The signature check additionally validates a timestamp tolerance window (e.g., ±5 minutes for Stripe) — an old, replayed-but-validly-signed request outside the tolerance window is rejected `400 WEBHOOK_TIMESTAMP_TOO_OLD` |
| Persistence | The `WebhookReceipt` row is written **before** acknowledging (within the same fast transaction), so a crash after acknowledgement never loses the receipt of "we saw this event" |
| Asynchronous processing | The HTTP handler does the minimum synchronous work (signature check + receipt write + fast-path status update if trivial) and enqueues the full business-logic processing (e.g., updating `Payment`/`Shipment` state, triggering downstream events) to a queue job — acknowledgement (`200 OK`) is returned within the provider's expected latency budget (typically <5s) regardless of downstream processing complexity |
| Retry behavior | If the queued processing job fails, it retries per `05-events-and-queues.md`'s queue contract for the relevant queue family; the webhook's own HTTP-level acknowledgement is not re-sent by us (we already told the provider "received") — provider-side retries of the *webhook delivery itself* are naturally deduplicated by the `WebhookReceipt` unique constraint |
| Duplicate handling | A webhook whose `(provider, providerEventId)` already exists in `WebhookReceipt` is acknowledged `200 OK` immediately with no reprocessing |
| Acknowledgement strategy | Always acknowledge a **validly signed** event, even if downstream processing later fails (the failure is retried async, not surfaced as a webhook-delivery failure to the provider, which would trigger the provider's own retry storm) — only an **invalid signature** or **stale timestamp** produces a non-200 response |

## 4. HTTP Method Semantics (Explicit)

| Method | Semantics | Idempotent by HTTP definition? | Platform Idempotency-Key required? |
|---|---|---|---|
| GET | Read | Yes | No |
| POST (creation) | Create a resource | No | Yes, for financially/physically significant creates (§2) |
| POST (action, e.g., `/complete`) | State transition | No | Yes |
| PATCH | Partial update | No (in general) | Only for financially significant updates |
| PUT | Full replace (rarely used — most resources use PATCH for partial semantics) | Yes | No (PUT's natural idempotency covers retries) |
| DELETE | Remove/soft-delete | Yes | No |

## 5. Conditional Requests

- `GET` responses for cacheable resources (published product detail) include an `ETag`; clients may send `If-None-Match` to receive `304 Not Modified`, reducing payload on repeat fetches — this is a performance optimization only, never a substitute for the API's authoritative freshness (checkout still re-validates regardless of any client-held ETag).
- `PATCH` on a resource with a `version` field (optimistic concurrency, `../06-transaction-boundaries.md`) may include `If-Match: "<version>"`; a mismatch returns `409 VERSION_CONFLICT` with the current `version` in the response body so the client can refetch-and-retry.
