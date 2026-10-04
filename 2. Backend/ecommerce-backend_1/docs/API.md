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
