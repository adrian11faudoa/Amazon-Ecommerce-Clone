# Authentication & Authorization Architecture

## PART A — Authentication

## 1. Credential Model

- Email + password (argon2id hashed, never bcrypt-only-legacy without a migration path) as the baseline credential for Customers and Sellers.
- Optional OAuth/social login (Google/Apple) mapped to the same `User` record via a linked-identity table — never a parallel identity system.
- MFA (TOTP, with SMS OTP as a fallback) is mandatory for Platform Administrator, Moderator, and Support roles; optional but encouraged for Customers/Sellers.

## 2. Session Model

- **Access token:** short-lived (15 min) JWT, signed (asymmetric, RS256/EdDSA), containing `sub` (userId), `roles`, `sellerOrgId` (if applicable), `sessionId`, `iat`/`exp`. Stateless verification — no DB hit on the hot path. See ADR-0006 for the full rationale behind this session model.
- **Refresh token:** long-lived (30 days sliding, capped at 90 days absolute), opaque random value, stored hashed in `RefreshToken` table, rotated on every use (rotation-on-use with reuse detection: a reused, already-rotated token immediately revokes the entire token family and alerts).
- **Session revocation:** revoking a `Session` invalidates its refresh-token family immediately (DB-checked) and is propagated to access-token verification via a short-TTL Redis revocation cache keyed by `sessionId`, so already-issued access tokens stop working within seconds, not just at natural expiry.

## 3. Web / Mobile / Backend / Admin Token Boundaries

| Client | Access Token Storage | Refresh Token Storage | Notes |
|---|---|---|---|
| Web | In-memory (JS), never localStorage | HttpOnly, Secure, SameSite=Strict cookie | Mitigates XSS token theft |
| Mobile | Secure device keystore (Keychain/Keystore) | Secure device keystore | Expo SecureStore or equivalent |
| Admin Web | Same as Web, additionally IP-allowlist-aware session policy optional | Same as Web | Shorter absolute session lifetime (e.g., 8h) |
| Backend-to-backend (webhooks) | N/A — provider signature verification, not a session token | N/A | See `16-external-integrations.md` |

## 4. Account Recovery & Abuse Prevention

- Password reset via time-boxed (15 min), single-use signed token emailed to the verified address; reset invalidates all existing sessions.
- Login attempts rate-limited per (account, IP) via Redis token bucket; progressive backoff; account lockout notification sent, never silently locked without user-visible explanation.
- Email verification required before a Customer/Seller account can complete checkout or publish products, respectively.

## PART B — Authorization

## 5. Model

Hybrid: **role-based** (coarse actor type: Customer, SellerUser with a role within org, Moderator, Support, PlatformAdmin) **+ resource-ownership checks** (fine-grained: "is this the owner of this Order/Product/SellerOrganization") **+ policy checks** for cross-cutting rules (e.g., "can this action proceed given the SellerOrganization's verification status").

## 6. Role/Permission Table

| Role | Scope | Representative Permissions |
|---|---|---|
| Customer | Own account | Manage own profile/addresses/cart/orders/reviews |
| SellerUser (owner) | Own `SellerOrganization` | Full catalog/inventory/order-fulfillment/staff management within org |
| SellerUser (staff) | Own `SellerOrganization`, scoped | Subset of owner permissions per assigned role (e.g., catalog-only, fulfillment-only) |
| Moderator | Platform-wide, content scope | View/flag/force-unpublish listings and reviews; cannot access payment or payout data |
| Support | Platform-wide, support scope | View order/account details for assisting a specific ticket; limited order intervention (e.g., resend notification); cannot directly alter payment amounts |
| PlatformAdmin | Platform-wide | Full administrative authority, including seller verification, refund authorization, role management; all actions audited |

## 7. Cross-Seller Isolation (Mandatory)

Every catalog/inventory/order/fulfillment query issued on behalf of a `SellerUser` is scoped server-side by `sellerOrgId` derived from the authenticated token — **never** from a client-supplied `sellerOrgId` parameter. A request whose path/body `sellerOrgId` does not match the token's `sellerOrgId` (for non-admin roles) is rejected with `403`, not silently filtered. This is enforced centrally in a NestJS guard applied to every seller-scoped route, not re-implemented per-endpoint.

## 8. Domain Authorization Rules

| Domain | Rule |
|---|---|
| Catalog | Write requires `SellerUser` with a role permitting catalog management, scoped to own `sellerOrgId`; Moderator may force-unpublish via a distinct permission, not generic write access |
| Inventory | Write requires `SellerUser` (own org) or an internal system actor (Checkout/Fulfillment/Return service identity) |
| Orders | Read requires: owning Customer, OR SellerUser scoped to `OrderItem.sellerOrgId = own`, OR Support/Admin with audit-logged access |
| Payments | Write restricted to the Payment domain's own webhook/service identity and PlatformAdmin (refund initiation only, never direct status edits) |
| Reviews | Write (submit) requires the verified purchasing Customer; removal requires Moderator/Admin |
| Administration | All actions require PlatformAdmin (or a narrower delegated permission) and are audited per `25-administration-architecture.md` |

## 9. Enforcement Mechanism

- NestJS guards (`AuthGuard` → `RolesGuard` → resource-specific `OwnershipGuard`) execute in that order before any controller method body runs.
- Authorization decisions are never made client-side; UI-level hiding of controls is a UX convenience only, not a security boundary (`17-security-architecture.md` §"Defense in Depth").
