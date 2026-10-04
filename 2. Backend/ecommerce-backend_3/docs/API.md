# API Reference — Identity & Access Foundation

Full interactive schemas are served at `GET /docs` (Swagger UI) in
non-production environments. This document is a quick index.

All routes are under the configured `API_PREFIX` (default `api/v1`),
except `health/live` and `health/ready`, which are excluded from the
prefix.

## Error shape

Every error response has this shape:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "details": { "...": "optional, validation-specific" },
    "requestId": "...",
    "correlationId": "..."
  }
}
```

`code` is a stable enum (`src/common/errors/api-error-codes.ts`) — build
client logic against `code`, not `message` text.

## Auth (`/auth`)

| Method | Path | Auth | Rate limit | Notes |
|---|---|---|---|---|
| POST | `/auth/register` | none | `register` | Returns access+refresh tokens; sends (console-logged) verification email |
| POST | `/auth/login` | none | `login` | Generic `INVALID_CREDENTIALS` for both unknown email and wrong password |
| POST | `/auth/refresh` | none (refresh token in body) | `tokenRefresh` | Rotates the refresh token; reuse of an old one revokes the whole session family |
| POST | `/auth/logout` | Bearer | — | Idempotent |
| GET | `/auth/me` | Bearer | — | Returns the caller's own profile |
| POST | `/auth/verify-email` | none | `emailVerification` | One-time token |
| POST | `/auth/resend-verification` | none | `emailVerification` | Always 204, regardless of account existence |
| POST | `/auth/password-reset/request` | none | `passwordReset` | Always 204, regardless of account existence |
| POST | `/auth/password-reset/complete` | none | `passwordReset` | Revokes all existing sessions on success |

## Seller organizations (`/seller-organizations`)

| Method | Path | Auth | Permission |
|---|---|---|---|
| POST | `/seller-organizations` | Bearer | any authenticated user (creator becomes SELLER_ADMIN) |
| GET | `/seller-organizations/mine` | Bearer | any authenticated user |
| GET | `/seller-organizations/:organizationId` | Bearer | `seller_organization:read` (org-scoped) |

## Seller memberships (`/seller-organizations/:organizationId/memberships`)

| Method | Path | Auth | Permission |
|---|---|---|---|
| GET | `/.../memberships` | Bearer | `seller_organization:read` (org-scoped) |
| POST | `/.../memberships` | Bearer | `seller_membership:manage` (org-scoped) |
| PATCH | `/.../memberships/:membershipId` | Bearer | `seller_membership:manage` (org-scoped) |

"Org-scoped" means `PermissionsGuard` re-resolves the permission from the
caller's *own* membership row for that exact `:organizationId` — see
`AuthorizationService.requireSellerOrganizationAccess`.

## Health

| Method | Path | Notes |
|---|---|---|
| GET | `/health/live` | Process liveness only — never fails due to a dependency |
| GET | `/health/ready` | Checks Postgres + Redis |

## Catalog (Volume 2)

Full details in `docs/CATALOG.md`. All seller-scoped routes below live
under `/seller-organizations/:organizationId/...` and are permission-
checked org-scoped by `PermissionsGuard` exactly like the memberships
routes in Volume 1.

### Public catalog (`/catalog`)

| Method | Path | Notes |
|---|---|---|
| GET | `/catalog/categories?parentId=` | List children of a category (root if omitted) |
| GET | `/catalog/categories/:categoryId` | |
| GET | `/catalog/attribute-definitions` | Full typed attribute vocabulary |
| GET | `/catalog/products/:productId` | Only `ACTIVE` products; safe/public fields only |

### Category & attribute management (platform-admin only, not org-scoped)

| Method | Path | Permission |
|---|---|---|
| POST | `/catalog/categories` | `catalog:category:manage` |
| PATCH | `/catalog/categories/:categoryId` | `catalog:category:manage` |
| POST | `/catalog/attribute-definitions` | `catalog:attribute:manage` |

### Seller products

| Method | Path | Permission |
|---|---|---|
| GET | `/seller-organizations/:orgId/products` | `catalog:product:read` (cursor-paginated) |
| GET | `/.../products/:productId` | `catalog:product:read` |
| POST | `/.../products` | `catalog:product:manage` |
| PATCH | `/.../products/:productId` | `catalog:product:manage` |
| POST | `/.../products/:productId/publish` | `catalog:product:publish` |
| POST | `/.../products/:productId/unpublish` | `catalog:product:publish` |
| POST | `/.../products/:productId/archive` | `catalog:product:publish` |

### Seller variants (`/.../products/:productId/variants`)

| Method | Path | Permission |
|---|---|---|
| GET | `/` | `catalog:product:read` |
| POST | `/` | `catalog:product:manage` (`DUPLICATE_SKU` / `DUPLICATE_VARIANT` on conflict) |
| PATCH | `/:variantId/activate` \| `/deactivate` | `catalog:product:manage` |

### Seller offers, pricing, promotions, media

| Method | Path | Permission |
|---|---|---|
| GET/POST | `/.../offers` | read: `catalog:product:read`; write: `catalog:offer:manage` |
| PATCH | `/.../offers/:offerId/activate` \| `/pause` \| `/archive` | `catalog:offer:manage` |
| GET/POST | `/.../offers/:offerId/prices` | read: `catalog:product:read`; write: `catalog:price:manage` |
| GET/POST | `/.../promotions` | read: `catalog:product:read`; write: `catalog:promotion:manage` |
| PATCH | `/.../promotions/:promotionId/activate` \| `/deactivate` | `catalog:promotion:manage` |
| POST | `/.../media/upload-intent` | `catalog:media:manage` |
| POST | `/.../media/:mediaAssetId/finalize` | `catalog:media:manage` |
| DELETE | `/.../media/:mediaAssetId` | `catalog:media:manage` |

Catalog-specific error codes added this milestone: `INVALID_STATE_TRANSITION`,
`DUPLICATE_SKU`, `DUPLICATE_VARIANT`, `INVALID_CATEGORY`, `INVALID_PROMOTION`,
`MEDIA_UPLOAD_CONFLICT`, `EXTERNAL_STORAGE_FAILURE`.

## Inventory, cart & checkout (Volume 3)

Full details in `docs/INVENTORY_CART_CHECKOUT.md`.

### Seller inventory (`/seller-organizations/:organizationId/inventory`)

| Method | Path | Permission |
|---|---|---|
| GET | `/` | `inventory:read` |
| GET | `/:inventoryItemId` | `inventory:read` |
| POST | `/` | `inventory:manage` |
| POST | `/:inventoryItemId/adjustments` | `inventory:manage` |
| GET | `/:inventoryItemId/adjustments` | `inventory:read` (cursor-paginated) |
| POST | `/:inventoryItemId/reconcile` | `inventory:reconcile` |
| POST | `/reservations/:reservationId/release` | `inventory:reservation:release` |

### Cart (`/cart`) — supports both anonymous and authenticated customers

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/cart` | optional | Get-or-create; anonymous callers get an `x-cart-token` header back |
| POST | `/cart/items` | optional | Rate-limited (`cartMutation`) |
| PATCH | `/cart/items/:cartItemId` | optional | Rate-limited |
| DELETE | `/cart/items/:cartItemId` | optional | Rate-limited |
| DELETE | `/cart` | optional | Clear cart; rate-limited |
| POST | `/cart/merge` | required | Merges an anonymous cart (by token) into the authenticated customer's |

### Checkout (`/checkout`) — always authenticated

| Method | Path | Notes |
|---|---|---|
| POST | `/checkout` | Body: `{ idempotencyKey }`. Rate-limited (`checkoutCreation`). Uses the customer's own current cart — never a client-supplied cart ID |
| GET | `/checkout/:checkoutId` | Ownership-checked (404 across customers) |
| GET | `/checkout/:checkoutId/payment-intent-contract` | The stable seam for a future payment domain |
| POST | `/checkout/:checkoutId/cancel` | Idempotent; releases any active reservations |

New error codes this milestone: `INSUFFICIENT_INVENTORY`,
`RESERVATION_CONFLICT`, `ITEM_UNAVAILABLE`, `STALE_PRICE`,
`CHECKOUT_EXPIRED`, `CHECKOUT_ALREADY_COMPLETED`, `IDEMPOTENCY_CONFLICT`,
`CART_REVISION_CONFLICT`.
