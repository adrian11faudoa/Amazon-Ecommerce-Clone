# API Architecture

## 1. Style & Versioning

- REST over HTTPS, JSON bodies, resource-oriented URLs.
- Versioned via URL prefix: `/api/v1/...`. A breaking change requires a new version prefix (`/api/v2/...`); additive changes (new optional fields, new endpoints) do not require a version bump.
- OpenAPI 3.1 is the canonical contract, generated from NestJS decorators and published at `/api/v1/openapi.json`. See `openapi/marketplace-architecture.yaml` for a representative skeleton.

## 2. Resource Naming

- Plural nouns for collections: `/products`, `/orders`, `/carts`.
- Nested resources reflect real ownership, capped at two levels: `/orders/{orderId}/items`, `/sellers/{sellerOrgId}/products`. Do not nest beyond two levels — use query filters instead (`/products?sellerOrgId=...`).
- Actions that are not pure CRUD are modeled as sub-resources or POST verbs on a noun, never as verbs in the path root: `/checkout-sessions/{id}/complete` (POST), not `/completeCheckout`.

## 3. Authentication & Authorization on Every Request

Every non-public endpoint requires a valid access token (see `08-auth-architecture.md`). Authorization is enforced in a NestJS guard layer before any handler logic executes — handlers never re-implement authorization checks ad hoc.

## 4. Pagination (Canonical Model)

Cursor-based pagination for all collection endpoints (offset pagination is disallowed for any collection that can exceed ~1000 rows, to avoid deep-offset performance cliffs):

```json
// Request
GET /api/v1/products?limit=20&cursor=eyJpZCI6Ii4uLiJ9

// Response
{
  "data": [ { "...": "..." } ],
  "pagination": {
    "nextCursor": "eyJpZCI6Ii4uLiJ9",
    "hasMore": true,
    "limit": 20
  }
}
```

- `limit` defaults to 20, max 100.
- `cursor` is an opaque, base64-encoded, server-signed token — clients must not construct or parse it.
- Sort order must be stable (secondary sort key = `id`) so cursors remain valid under concurrent writes.

## 5. Filtering & Sorting

- Filtering via query params matching documented field names: `?status=published&categoryId=...`.
- Sorting via `?sort=field` or `?sort=-field` (descending). Multiple sort keys comma-separated. Only indexed, documented fields are sortable.

## 6. Canonical Error Structure

```json
{
  "error": {
    "code": "INSUFFICIENT_INVENTORY",
    "message": "Requested quantity exceeds available stock.",
    "correlationId": "01J8Z...",
    "details": [
      { "field": "items[0].quantity", "issue": "exceeds_available" }
    ]
  }
}
```

- `code` is a stable, machine-readable, UPPER_SNAKE_CASE enum documented per endpoint — clients branch on `code`, never on `message` text.
- `message` is human-readable, safe to display, never contains stack traces, SQL, secrets, or internal paths.
- `correlationId` matches the request's trace ID (see `19-observability-architecture.md`) for support/debugging correlation.
- HTTP status codes follow standard semantics: 400 validation, 401 unauthenticated, 403 unauthorized, 404 not found, 409 conflict (e.g., version mismatch, duplicate), 422 semantic validation failure, 429 rate limited, 5xx server-side.

## 7. Idempotency

- Any `POST` that creates a financially or physically significant resource (`CheckoutSession`, `Order`, `Payment`, `Refund`, bulk imports) requires an `Idempotency-Key` header.
- Server stores `(key, requestHash, responseSnapshot)` for a bounded window (24h default); a repeated key with a matching request hash returns the stored response with the original status code; a repeated key with a *different* request body returns `409 IDEMPOTENCY_KEY_CONFLICT`.

## 8. Validation

- Every request body is validated against a Zod-mirrored DTO schema (NestJS `class-validator`/`ZodValidationPipe`) before reaching business logic. Validation failures return `400` with per-field `details`.

## 9. Conventions Summary

| Concept | Convention |
|---|---|
| IDs | UUIDv7 string, e.g. `"01J8Z3K9F7QATN0T5C2H1X6E4B"`-style or standard UUID string form — see `28-cross-cutting-contracts.md` |
| Timestamps | ISO-8601 UTC, e.g. `"2026-09-16T14:32:00Z"` |
| Enums | UPPER_SNAKE_CASE string values, documented in OpenAPI as closed enums |
| Nullable fields | Explicit `null`, never omitted when the schema declares the field |
| Optional fields | Omitted when not applicable, documented as `nullable`/optional in OpenAPI, never conflated with `null` semantics |
| Nested resources | Max 2 levels deep; otherwise flattened with query filters |
| Bulk operations | Modeled as an async job resource: `POST /bulk-imports` → `202 Accepted` + `{ "jobId": ... }`, polled via `GET /bulk-imports/{jobId}` |
| Async operations | Same 202+job-resource pattern; long-running work never blocks an HTTP request beyond a documented short timeout (default 10s) |
| Money | Integer minor units (cents) + ISO 4217 currency code, never floating point |

## 10. Rate Limiting

- Enforced at the API gateway/backend layer using Redis-backed token buckets keyed by `(actor, endpoint-class)`. Limits and remaining quota surfaced via standard headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`). See `26-fraud-abuse-architecture.md` for policy detail.

## 11. Realtime (WebSocket/SSE)

- Used only where polling would be materially worse: order-status live updates, seller notification feed. Authenticated via the same access token (passed at connection time). Not used as a substitute for the REST API's authoritative request/response semantics — realtime channels are notify-then-refetch, not the source of truth for state.

## 12. Representative API Groups (Non-Exhaustive)

| Group | Example Endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` |
| Customers | `GET/PATCH /me`, `GET/POST /me/addresses` |
| Catalog | `GET /products`, `GET /products/{id}`, `POST /sellers/{sellerOrgId}/products` |
| Inventory | `GET /sellers/{sellerOrgId}/inventory/{skuId}`, `POST /sellers/{sellerOrgId}/inventory/{skuId}/adjustments` |
| Cart | `GET/POST /cart`, `PATCH/DELETE /cart/items/{itemId}` |
| Checkout | `POST /checkout-sessions`, `POST /checkout-sessions/{id}/complete` |
| Orders | `GET /orders`, `GET /orders/{id}` |
| Payments | `POST /webhooks/stripe` (provider-facing), `POST /orders/{id}/refunds` (admin) |
| Fulfillment | `POST /orders/{id}/shipments`, `POST /orders/{id}/returns` |
| Reviews | `POST /products/{id}/reviews` |
| Admin | `GET /admin/audit-log`, `POST /admin/sellers/{id}/verify` |

The full endpoint set is defined during backend implementation prompts against this architecture, not enumerated exhaustively here.
