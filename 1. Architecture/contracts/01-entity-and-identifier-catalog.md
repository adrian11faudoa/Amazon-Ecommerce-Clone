# Canonical Entity & Identifier Catalog

Extends `../05-data-architecture.md` with per-entity exposure, mutability, soft-delete, and privacy rules. Entity names, ownership, and relationships are as defined there — this document does not redefine them, only adds implementation-binding detail.

## 1. Identifier Generation Strategy (Binding)

- **All primary keys:** UUIDv7, generated **application-side** at the moment of creation (never database-default `gen_random_uuid()`, which is UUIDv4 and loses time-ordering). Generation happens in the domain's command handler, before the INSERT, so the ID is known to the caller (needed for idempotency and for returning `201 Created` with a `Location` header).
- **Clients never construct authoritative business identifiers.** Any client-supplied "ID" in a request body (e.g., a `clientRequestId` used purely for idempotency correlation) is stored as a separate field, never substituted for the server-generated primary key.
- **Human-facing, non-authoritative reference codes** (e.g., an order confirmation number shown to a customer, a SKU code a seller chooses) are separate string fields with their own uniqueness constraints — they are never used as the join key between tables; the UUID is always the join key.

## 2. Per-Entity Contract

| Entity | Canonical Name | ID Type | Owning Domain | Public Exposure | Internal Exposure | Mutability | Soft Delete? | Audit Required | Privacy Classification |
|---|---|---|---|---|---|---|---|---|---|
| User | `User` | UUIDv7 | Identity & Access | `id` only (never email to other users) | Full record to Identity & Access service | Credentials mutable via defined commands only | Yes — `status=deleted`, PII nulled (never hard-deleted while referenced by `Order`) | Yes (all auth events) | High |
| Session/RefreshToken | `Session` | UUIDv7 | Identity & Access | Never exposed as a resource (token strings only) | Full record to Identity & Access | Status transitions only (active→revoked) | No — expires naturally, rows purged by cleanup job past TTL | Yes (issuance, revocation) | Moderate |
| CustomerProfile | `Customer` | UUIDv7 | Customer | Own profile only, via `/me` | Support/Admin (audited) | Mutable via `UpdateProfile` | Yes — on account deletion request | Yes (deletion/export requests) | High |
| Address | `Address` | UUIDv7 | Customer | Own addresses only | Fulfillment (shipping subset only, at order time) | Mutable/removable by owner | Yes — retained as an immutable `Order` snapshot even after the live `Address` is removed | Yes (add/remove) | High |
| SellerOrganization | `SellerOrganization` | UUIDv7 | Seller | Storefront-facing subset (name, public profile) public; legal/tax fields never public | Full record to Seller's own `SellerUser`s and Administration | Mutable via defined commands; legal identity fields require re-verification on change | Yes — on account closure, catalog unpublished first | Yes (verification, suspension) | Moderate |
| SellerUser | `SellerUser` | UUIDv7 | Seller | Never exposed outside own org | Own org + Administration | Role mutable by org owner/Admin | Yes — on removal | Yes (invite, role change, removal) | Moderate |
| Storefront | `Storefront` | UUIDv7 | Seller | Fully public once published | — | Mutable by owning org | Yes — unpublish on org suspension | No (non-sensitive) | Low |
| Category | `Category` | UUIDv7 | Catalog | Fully public | — | Mutable by Administration/Catalog admin only | Yes — archived, not deleted (referenced historically by `OrderItem` snapshots) | Yes (structural changes) | Low |
| Product | `Product` | UUIDv7 | Catalog | Public once `status=PUBLISHED` | Full record to owning seller | Mutable by owning seller; force-unpublishable by Moderation | Yes — `status=SUSPENDED`/archived, never hard-deleted if any `OrderItem` references it | Yes (publish/unpublish/suspend) | Low |
| ProductVariant | `ProductVariant` | UUIDv7 | Catalog | Public as part of `Product` | Full record to owning seller | Mutable by owning seller | Yes | No | Low |
| Sku | `Sku` | UUIDv7 | Catalog | Public (code + attributes) | Full record to owning seller | Mutable by owning seller (code immutable once orders exist) | Yes — `status=DISCONTINUED` | No | Low |
| Price | `Price` | UUIDv7 | Pricing & Promotion | Current price public; history internal | Full history to owning seller/Admin | Immutable rows (new row per price change, never UPDATE of amount) | No (append-only history) | Yes (every price change) | Low |
| Promotion / Coupon | `Promotion` | UUIDv7 | Pricing & Promotion | Public promotion metadata; coupon codes revealed only to eligible recipients | Full record to owning seller/Admin | Mutable until first redemption's dependent fields (discount logic) are frozen | Yes — expired, not deleted | Yes (creation, redemption) | Low |
| InventoryItem | `InventoryItem` | UUIDv7 | Inventory | Only derived `availability` enum exposed publicly | Full quantities to owning seller | Mutated only via defined commands (never raw UPDATE from outside Inventory) | No (1:1 with Sku, lives as long as Sku) | Yes (adjustments) | Low |
| InventoryReservation | `InventoryReservation` | UUIDv7 | Inventory | Never exposed directly | Internal to Checkout/Inventory | Status transitions only | No — archived after resolution | No | Low |
| InventoryAdjustment | `InventoryAdjustment` | UUIDv7 | Inventory | Never exposed directly | Owning seller (adjustment history) | Immutable, append-only | N/A | Yes (this table *is* the audit trail) | Low |
| Cart | `Cart` | UUIDv7 (or guest token, see §3) | Cart | Owner only | — | Mutable by owner | Yes — expired carts purged by cleanup job | No | Low |
| CartItem | `CartItem` | UUIDv7 | Cart | Owner only, as part of `Cart` | — | Mutable/removable by owner | Cascades with `Cart` | No | Low |
| CheckoutSession | `CheckoutSession` | UUIDv7 | Checkout | Owner only, transient | — | Status transitions only | No — archived after resolution | Yes (every transition, for reconciliation) | Moderate |
| Order | `Order` | UUIDv7 (+ human-facing `orderNumber`, see §3) | Order | Owning customer; scoped `OrderItem` subset to fulfilling seller; Support/Admin (audited) | — | Line items immutable post-creation; status projection updates only | No — never deleted within financial retention window | Yes (creation, cancellation) | Moderate |
| OrderItem | `OrderItem` | UUIDv7 | Order | Same as `Order` | — | Immutable | No | No | Low |
| Payment | `Payment` | UUIDv7 | Payment | Owning customer sees status only, never raw provider payload; Admin sees full record (audited) | — | Status transitions only, provider-driven | No — retained per financial record retention | Yes (every transition) | High |
| Refund | `Refund` | UUIDv7 | Payment | Owning customer sees status; Admin full record (audited) | — | Status transitions only | No | Yes | High |
| Shipment | `Shipment` | UUIDv7 (+ carrier `trackingNumber`) | Fulfillment & Shipping | Owning customer + fulfilling seller | — | Status transitions only | No | Yes (creation, delivery, exception) | Moderate |
| Return | `Return` | UUIDv7 | Fulfillment & Shipping | Owning customer + fulfilling seller | — | Status transitions only | No | Yes | Low |
| Review | `Review` | UUIDv7 | Review | Public once `status=PUBLISHED` | Owning customer (edit window); Moderation | Editable by owner within a defined window; removable by Moderation | Yes — `status=REMOVED`, content redacted, rating excluded from aggregate | Yes (submission, removal) | Low |
| MediaAsset | `MediaAsset` | UUIDv7 | Media | Public once `status=PROCESSED` and owner entity is public | Owning entity's authorized actor | Immutable content once processed (a "new image" is a new `MediaAsset`, never an overwrite) | Yes — orphan cleanup after grace period | No | Low–Moderate |
| AuditLogEntry | `AuditLogEntry` | UUIDv7 | Administration | Never public; Admin only | Support (own-action subset) | Immutable, append-only | No — retained per compliance window | N/A (is itself the audit mechanism) | Moderate |

## 3. Human-Facing Reference Codes (Non-Authoritative)

| Code | Format | Uniqueness Scope | Notes |
|---|---|---|---|
| `Order.orderNumber` | `ORD-{YYYYMMDD}-{6-char base32}` | Global | Generated at order creation, shown to customer; never used as a lookup join key internally (the API still resolves by `id`, but accepts `orderNumber` as an alternate lookup parameter on customer-facing endpoints for convenience) |
| `Sku.code` | Seller-chosen string | Unique within `sellerOrgId` | Seller's own SKU/barcode convention; validated for uniqueness at creation |
| `Promotion.couponCode` | Seller/Admin-chosen string | Global (or seller-scoped, per promotion type) | Case-insensitive uniqueness check at creation |

## 4. Cross-Entity Exposure Rule

A response DTO exposes only the fields declared for the requesting actor's exposure tier in §2 above ("Public Exposure" vs. "Internal Exposure") — this is enforced by explicit DTO classes per actor type (e.g., `OrderCustomerViewDto` vs. `OrderAdminViewDto`), never a single serializer with field-level conditional logic scattered through business code, consistent with `../17-security-architecture.md` §2 ("Sensitive-data leakage" mitigation).
