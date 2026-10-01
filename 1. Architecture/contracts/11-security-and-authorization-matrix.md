# Security Policy & Authorization Matrix

Extends `../08-auth-architecture.md` and `../17-security-architecture.md` with per-operation, per-role explicit tables — the level of detail those documents' summaries pointed toward but did not enumerate.

## 1. Security Policy Matrix (Representative Operations)

For every operation: actor, required authentication, required permission, ownership check, rate limit category (see `15-rate-limit-and-anti-abuse.md`), audit requirement, sensitive-data handling.

| Operation | Actor | AuthN | Permission | Ownership Check | Rate Limit | Audit? | Sensitive-Data Handling |
|---|---|---|---|---|---|---|---|
| `POST /auth/register` | Anyone | None (this creates the session) | — | — | `auth-strict` | Yes (`identity.user_registered.v1`) | Password never logged; hashed before storage |
| `POST /auth/login` | Anyone with credentials | None | — | — | `auth-strict` | Yes (success and failure) | Same |
| `PATCH /me` | Customer | Access token | Owns `User.id` | `userId == token.sub` | `standard` | Yes (profile change) | PII fields excluded from logs |
| `POST /sellers/{orgId}/products` | SellerUser | Access token | `catalog:write` role permission | `sellerOrgId == token.sellerOrgId` | `seller-write` | Yes (`catalog.product_created.v1`) | — |
| `POST /sellers/{orgId}/inventory/{skuId}/adjustments` | SellerUser | Access token | `inventory:write` | `sellerOrgId == token.sellerOrgId` and Sku belongs to that org | `seller-write` | Yes (`inventory.adjusted.v1`, always) | — |
| `POST /checkout-sessions` | Customer | Access token or guest session | — | Cart belongs to caller | `checkout` | Yes (`checkout.started.v1`) | Address/payment method never logged raw |
| `POST /orders/{id}/refunds` | PlatformAdmin | Access token, MFA-fresh (step-up if above threshold, `../25-administration-architecture.md` §4) | `refund:issue` | — (Admin scope, not ownership-restricted) | `admin-financial` | Yes, mandatory, co-transactional | Amount logged; no card data ever present to log |
| `GET /admin/audit-log` | PlatformAdmin, Support (own-scope) | Access token | `audit:read` (full) or `audit:read:own` (Support) | Support: `actorId == token.sub` filter applied server-side | `admin-read` | Yes (reading the audit log is itself audited) | — |
| `POST /admin/sellers/{id}/verify` | PlatformAdmin | Access token, MFA-fresh | `seller:verify` | — | `admin-financial` | Yes, mandatory | Verification documents never logged in plaintext |
| `POST /webhooks/stripe` | Stripe (system) | Signature verification (no user auth) | N/A | N/A | `webhook` (generous, but signature-gated) | Yes (`WebhookReceipt`) | Raw payload retained only as long as needed for signature audit, per retention policy |
| `POST /products/{id}/reviews` | Customer | Access token | Verified purchase (`OrderItem` reference) | `customerId == token.sub` and purchase verification | `review-write` | Yes (`review.submitted.v1`) | — |
| `POST /admin/moderation-cases/{id}/resolve` | Moderator | Access token | `moderation:resolve` | — | `admin-write` | Yes | — |

This table is representative of the pattern every endpoint must follow, not an exhaustive endpoint list — the full set is produced during backend implementation, each entry following this exact column structure.

## 2. Authorization Matrix — Role × Resource

`✓` = allowed (subject to ownership/ scope check where noted in §1), `–` = never allowed, `Own` = allowed only for resources the actor owns/is scoped to.

| Resource | Customer | SellerUser (owner) | SellerUser (staff, scoped) | Moderator | Support | PlatformAdmin |
|---|---|---|---|---|---|---|
| Own profile/addresses | ✓ | ✓ (as customer, if also one) | ✓ | – | Read (audited) | ✓ |
| Seller org profile | – | Own | Own (if permission granted) | Read only | Read only (audited) | ✓ |
| Catalog (Product/Variant/Sku) | Read (published only) | Own, full | Own, per assigned permission (e.g., catalog-only staff) | Force-unpublish only | Read only | ✓ |
| Pricing | Read (current) | Own, full | Own, per permission | – | Read only | ✓ (platform promos) |
| Inventory | – | Own, full | Own, per permission | – | Read only | ✓ (read, adjustment in exceptional cases, audited) |
| Cart | Own | – | – | – | Read own-customer's cart (support-ticket-scoped, audited) | ✓ |
| Checkout session | Own | – | – | – | Read only (audited) | ✓ |
| Order (read) | Own | `OrderItem` subset where `sellerOrgId == own` | Same, per permission | – | ✓ (audited) | ✓ |
| Order (cancel) | Own, per eligibility (`03-order-lifecycle-and-financial-boundaries.md` §3) | Own items, per eligibility | Per permission | – | – (escalate to Admin) | ✓ |
| Payment | Read status only, own | – | – | – | Read status only (audited) | ✓ (full record) |
| Refund (initiate) | – | – | – | – | – (escalate) | ✓ |
| Shipment | Own (read) | Own, full (create/update) | Per permission | – | Read only (audited) | ✓ |
| Return | Own (create/read) | Own, full (authorize/inspect) | Per permission | – | Read only (audited) | ✓ |
| Review | Own (create/edit within window) | Read only, may respond (if seller-response feature enabled) | – | Approve/Remove | – | ✓ |
| Notification preferences | Own | Own | Own | – | – | ✓ |
| Media asset | Own (upload for owned entities) | Own | Per permission | Flag/remove (content violation) | – | ✓ |
| Moderation case | – | – | – | ✓ | – | ✓ |
| Fraud/abuse case | – | – | – | Content-abuse subset | – | ✓ |
| Audit log | – | – | – | Own-action subset | Own-action subset | ✓ (full) |
| Configuration/feature flags | – | – | – | – | – | ✓ |
| Role assignment | – | Own org's `SellerUser` roles | – | – | – | ✓ |

## 3. Enforcement Notes

- Every row above is enforced by the guard chain in `../08-auth-architecture.md` §9 (`AuthGuard → RolesGuard → OwnershipGuard`) — this matrix is the specification those guards are implemented against, not a separate parallel policy engine.
- **Cross-seller isolation** (`../08-auth-architecture.md` §7) applies to every "Own" cell in the SellerUser columns — enforced server-side from the token's `sellerOrgId` claim, never from a client-supplied parameter.
- **Support's audited-read pattern**: every Support access to Customer/Order/Payment data is only ever a *read*, always tied to a specific support-ticket reference recorded in the resulting `AuditLogEntry.metadata` (`12-audit-contract.md`), never a standing broad-read grant.
