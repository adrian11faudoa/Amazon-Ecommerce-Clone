# Domain Architecture

## 1. Bounded Context Map

Domains are grouped into bounded contexts. Contexts map 1:1 to NestJS modules within the modular monolith (see `02-component-architecture.md`) and are the future extraction boundaries if services are later split out (see ADR-0001).

| Bounded Context | Domains Included | Rationale for Grouping |
|---|---|---|
| Identity & Access | Identity and Access, Session/Device | Shared authn/authz primitives used by every other context |
| Customer | Customer profile, Address | Customer-facing account data, distinct from identity credentials |
| Seller | Seller, Seller Organization, Seller Onboarding/Verification, Storefront | Seller tenancy is a single lifecycle |
| Catalog | Category, Product, Product Variant/SKU, Product Attribute | Shared catalog authoring lifecycle, owned by sellers |
| Pricing & Promotion | Pricing, Promotion | Pricing rules and promotional logic are tightly coupled and both feed checkout |
| Inventory | Inventory Item, Inventory Reservation | Physical/virtual stock is a distinct consistency-critical domain from catalog metadata |
| Cart | Cart, Cart Item | Pre-purchase, ephemeral-leaning, customer-scoped |
| Checkout | Checkout session | Short-lived orchestration workflow bridging Cart → Order |
| Order | Order, Order Item | Durable transactional record, separate from Payment/Fulfillment state machines |
| Payment | Payment, Refund | Stripe-boundary-adjacent, PCI-conscious, isolated from Order |
| Fulfillment & Shipping | Shipment, Return | Post-order physical logistics |
| Review | Review | Independent, moderation-adjacent |
| Notification | Notification, Preference | Cross-cutting consumer of events from all contexts |
| Media | MediaAsset | Cross-cutting, referenced by Catalog/Review/Seller |
| Search | Search index projections | Purely derived |
| Administration | Admin roles, AuditLog | Cross-cutting oversight |
| Moderation | Moderation case, content flags | Policy enforcement over Catalog/Review |
| Fraud & Abuse | Risk signal, abuse case | Cross-cutting risk evaluation |
| Analytics | Analytics event, report | Purely derived/aggregated |

## 2. Per-Domain Detail

For each domain: responsibility, authoritative entities, invariants, owned data, consumers, key commands, key events, external dependencies, consistency model, scaling characteristics, security boundary.

### 2.1 Identity and Access
- **Responsibility:** Account credentials, authentication, session/token issuance across all actor types.
- **Authoritative entities:** `User`, `Credential`, `Session`, `RefreshToken`, `MfaFactor`.
- **Invariants:** One verified email per active `User`; password hashes never stored/logged in plaintext; a `Session` cannot outlive its `RefreshToken` family; revoked sessions cannot be reused.
- **Owned data:** All authentication/session state.
- **Consumers:** Every other domain (read-only, via `AuthContext` derived from a validated token — never direct table access).
- **Commands:** `RegisterUser`, `AuthenticateUser`, `RefreshSession`, `RevokeSession`, `InitiatePasswordReset`, `EnrollMfaFactor`.
- **Events:** `UserRegistered`, `UserEmailVerified`, `SessionRevoked`, `MfaEnrolled`.
- **External dependencies:** Email provider (verification), SMS provider (MFA/OTP).
- **Consistency model:** Strong/transactional (single Postgres transaction per credential mutation).
- **Scaling:** Stateless verification (JWT signature check) scales horizontally; session revocation lookups hit Redis-cached blocklist.
- **Security boundary:** Highest sensitivity — argon2/bcrypt hashing, rate-limited, MFA-capable.

### 2.2 Customer
- **Responsibility:** Customer-facing profile and address book, distinct from credentials.
- **Authoritative entities:** `CustomerProfile`, `Address`, `Wishlist`, `WishlistItem`.
- **Invariants:** A `CustomerProfile` always references exactly one `User`; a default shipping/billing `Address` is unique per customer.
- **Owned data:** Profile attributes, saved addresses, wishlists.
- **Consumers:** Checkout (reads addresses), Order (snapshots address at order time — see 2.9), Notification (reads contact preferences).
- **Commands:** `UpdateProfile`, `AddAddress`, `RemoveAddress`, `AddToWishlist`.
- **Events:** `CustomerProfileUpdated`, `AddressAdded`.
- **Consistency model:** Strong/transactional.
- **Scaling:** Read-heavy; cacheable profile reads.
- **Security boundary:** PII — access restricted to the owning customer and authorized support/admin roles with audit logging.

### 2.3 Seller & Seller Organization
- **Responsibility:** Seller tenancy lifecycle — organization, staff membership, onboarding/verification, storefront presentation.
- **Authoritative entities:** `SellerOrganization`, `SellerUser` (membership + role within org), `SellerVerification`, `Storefront`.
- **Invariants:** A `SellerOrganization` must complete `SellerVerification` before it can publish products or receive payouts; a `SellerUser` role is scoped to exactly one `SellerOrganization`; a `Storefront` has exactly one owning `SellerOrganization`.
- **Owned data:** Seller tenancy, staff roles, verification status, storefront metadata (not catalog content itself).
- **Consumers:** Catalog (validates seller can publish), Payment (Stripe Connect account linkage), Administration (verification review).
- **Commands:** `CreateSellerOrganization`, `InviteSellerStaff`, `SubmitVerification`, `ApproveVerification`, `UpdateStorefront`.
- **Events:** `SellerOrganizationCreated`, `SellerVerified`, `SellerSuspended`.
- **External dependencies:** Stripe Connect (account onboarding), identity verification vendor (optional, via Fraud/Abuse boundary).
- **Consistency model:** Strong/transactional for org/role mutations.
- **Scaling:** Low volume relative to catalog/order traffic.
- **Security boundary:** Cross-seller isolation is mandatory — a `SellerUser` may never read or write another organization's data (see `08-auth-architecture.md` §4).

### 2.4 Catalog (Category, Product, Variant/SKU, Attribute)
- **Responsibility:** Product authoring and catalog structure, owned by sellers within their organization.
- **Authoritative entities:** `Category`, `Product`, `ProductVariant`, `Sku`, `ProductAttribute`, `ProductAttributeValue`.
- **Invariants:** Every `Product` belongs to exactly one `SellerOrganization`; every `Sku` belongs to exactly one `ProductVariant`; `Sku` codes are unique within a seller's catalog; a `Product` cannot be published without at least one purchasable `Sku` with a `Price`.
- **Owned data:** All catalog structure and content (not inventory levels, not price *values* — see 2.5/2.6, though the *existence* of a price record is catalog-adjacent and owned jointly per the ownership matrix).
- **Consumers:** Search (indexing), Cart/Checkout (read product/variant snapshot), Inventory (keyed by `Sku`), Review (keyed by `Product`).
- **Commands:** `CreateProduct`, `PublishProduct`, `UnpublishProduct`, `CreateVariant`, `UpdateAttributes`.
- **Events:** `ProductCreated`, `ProductPublished`, `ProductUnpublished`, `ProductUpdated`, `SkuCreated`.
- **Consistency model:** Strong/transactional for authoring; eventually consistent projection into Search.
- **Scaling:** Very read-heavy; heavily cached and search-indexed; write volume moderate (seller-driven).
- **Security boundary:** Write access restricted to the owning seller's authorized staff; moderation can force-unpublish (see `26` domain interactions).

### 2.5 Pricing & Promotion
- **Responsibility:** Authoritative price per `Sku` and promotional/discount rule evaluation.
- **Authoritative entities:** `Price` (per Sku, currency, effective window), `Promotion`, `PromotionRule`, `Coupon`.
- **Invariants:** Exactly one active `Price` per `Sku`/currency at any instant; a `Promotion` cannot reduce a line total below zero; `Coupon` redemption counts cannot exceed configured limits (enforced transactionally at redemption).
- **Owned data:** Price history, promotion definitions, coupon redemption ledger.
- **Consumers:** Cart (price display), Checkout (authoritative re-validation at order time — see `06-transaction-boundaries.md`), Catalog (display), Search (price fields for filtering/sorting).
- **Commands:** `SetPrice`, `CreatePromotion`, `RedeemCoupon`.
- **Events:** `PriceChanged`, `PromotionActivated`, `PromotionExpired`.
- **Consistency model:** Strong/transactional; checkout always re-reads authoritative price rather than trusting cart snapshot.
- **Scaling:** Read-heavy, cached with short TTL (price correctness matters more than cache hit rate).
- **Security boundary:** Write restricted to owning seller for `Price`; platform-level promotions restricted to Administration.

### 2.6 Inventory
- **Responsibility:** Authoritative stock levels and reservation lifecycle per `Sku`.
- **Authoritative entities:** `InventoryItem` (available/reserved/committed quantities per Sku, optionally per warehouse/location), `InventoryReservation` (linked to a Cart or Checkout, with expiration), `InventoryAdjustment` (audit trail of manual/system changes).
- **Invariants:** `available = onHand − reserved − committed`, never negative; a reservation cannot exceed available quantity at creation time (enforced via row-level locking/`SELECT ... FOR UPDATE` or equivalent optimistic-concurrency retry); expired reservations are released exactly once.
- **Owned data:** All quantity state and reservation records.
- **Consumers:** Cart (soft availability check), Checkout (hard reservation), Order (commit on payment success), Fulfillment (decrement on shipment), Return (increment on restock).
- **Commands:** `ReserveInventory`, `ReleaseReservation`, `CommitReservation`, `AdjustInventory`, `RestockFromReturn`.
- **Events:** `InventoryReserved`, `InventoryReleased`, `InventoryCommitted`, `InventoryLow`, `InventoryAdjusted`.
- **Consistency model:** Strong/transactional — this is the platform's primary overselling-prevention boundary; see `06-transaction-boundaries.md` and `11 (Inventory Architecture)` cross-reference in that document.
- **Scaling:** Write-heavy during flash sales/high traffic; hot-row contention mitigated via optimistic concurrency (version column) plus short-lived Redis-based rate limiting on reservation attempts per Sku.
- **Security boundary:** Write restricted to the owning seller and system workflows (checkout/fulfillment/return) only.

### 2.7 Cart
- **Responsibility:** Pre-purchase, customer-scoped mutable selection of Sku + quantity.
- **Authoritative entities:** `Cart`, `CartItem`.
- **Invariants:** A `Cart` belongs to exactly one `Customer` (or a guest session token); `CartItem` quantity must be positive; carts expire after a configurable inactivity window.
- **Owned data:** Current selection state only — prices/availability shown are *display* snapshots, not authoritative (re-validated at checkout).
- **Consumers:** Checkout (converts Cart → Checkout session).
- **Commands:** `AddCartItem`, `UpdateCartItem`, `RemoveCartItem`, `MergeGuestCart`.
- **Events:** `CartItemAdded` (used for abandonment/remarketing, low criticality).
- **Consistency model:** Strong/transactional but low-stakes (no inventory reservation happens at this stage).
- **Scaling:** High read/write volume, cached aggressively in Redis with Postgres as source of truth (see `12-cache-architecture.md`).
- **Security boundary:** Owned exclusively by the owning customer/guest session.

### 2.8 Checkout
- **Responsibility:** Short-lived orchestration workflow that validates cart contents, reserves inventory, resolves pricing/promotions/tax/shipping, initiates payment, and produces an `Order` on success.
- **Authoritative entities:** `CheckoutSession` (state machine: `Started → PricingResolved → InventoryReserved → PaymentInitiated → Completed | Failed | Expired`).
- **Invariants:** A `CheckoutSession` produces at most one `Order`; a `CheckoutSession` cannot transition to `Completed` without a captured/authorized `Payment` reference; expired sessions release all reservations.
- **Owned data:** The checkout state machine and its idempotency key.
- **Consumers:** None downstream own Checkout's data; it is a pure orchestrator (see `06-transaction-boundaries.md` §"Checkout Architecture" for the full workflow and compensation logic).
- **Commands:** `StartCheckout`, `ResolvePricing`, `ReserveCheckoutInventory`, `InitiatePayment`, `CompleteCheckout`, `ExpireCheckout`.
- **Events:** `CheckoutStarted`, `CheckoutCompleted`, `CheckoutFailed`.
- **Consistency model:** Local transaction per step + explicit compensation on failure (saga-style, no distributed transaction).
- **Scaling:** Bursty (flash sales); horizontally scaled, idempotency-key-protected against double submission.
- **Security boundary:** Owned exclusively by the initiating customer/session; payment initiation additionally bound by webhook-verified provider state.

### 2.9 Order
- **Responsibility:** Durable transactional record of a completed purchase, independent of payment/fulfillment state machines.
- **Authoritative entities:** `Order`, `OrderItem` (immutable snapshot of product/price/tax/seller at order time).
- **Invariants:** An `Order` is immutable in its line-item content once created (corrections happen via `Return`/`Refund`, never in-place edits); `OrderItem` always snapshots seller, Sku, unit price, tax, and quantity at the moment of order creation — it never dereferences live Catalog/Pricing data.
- **Owned data:** Order header/line-item records and the order-level status projection (a read-optimized aggregate of Payment + Fulfillment states, not itself authoritative over them).
- **Consumers:** Payment (keyed by Order), Fulfillment (keyed by Order), Review (post-fulfillment eligibility), Notification, Analytics.
- **Commands:** `CreateOrder` (only invoked by Checkout), `CancelOrder`.
- **Events:** `OrderCreated`, `OrderCancelled`.
- **Consistency model:** Strong/transactional at creation; subsequent status is an eventually-consistent projection updated by Payment/Fulfillment events.
- **Scaling:** High read volume (order history); write volume matches checkout throughput.
- **Security boundary:** Readable only by the owning customer, the fulfilling seller (scoped to their `OrderItem`s), and authorized support/admin.

### 2.10 Payment
- **Responsibility:** Payment intent lifecycle against the external provider (Stripe), and refund lifecycle.
- **Authoritative entities:** `Payment` (local record referencing a Stripe PaymentIntent ID — never card data), `Refund`.
- **Invariants:** A `Payment` transitions only through `Created → Authorized → Captured | Failed | Cancelled`; a `Refund` cannot exceed the captured amount of its `Payment`; every state transition is driven by a verified Stripe webhook or a verified synchronous API response, never by client input.
- **Owned data:** Local payment/refund ledger referencing provider IDs.
- **Consumers:** Order (status projection), Fulfillment (payment-captured gate before shipment), Administration (refund initiation).
- **Commands:** `CreatePaymentIntent`, `ConfirmPayment` (webhook-driven), `InitiateRefund`.
- **Events:** `PaymentAuthorized`, `PaymentCaptured`, `PaymentFailed`, `RefundIssued`.
- **External dependencies:** Stripe (see `16-external-integrations.md`).
- **Consistency model:** Strong/transactional locally; eventually consistent with Stripe's own state via webhook, reconciled by a scheduled job (see `11-queue-architecture.md`).
- **Scaling:** Matches checkout throughput; webhook endpoint independently rate-limited and idempotency-key protected.
- **Security boundary:** Highest sensitivity next to Identity — no cardholder data stored; strict PCI-conscious boundary (see `17-security-architecture.md`).

### 2.11 Fulfillment & Shipping (Shipment, Return)
- **Responsibility:** Post-payment physical logistics — shipment creation/tracking and return authorization/processing.
- **Authoritative entities:** `Shipment`, `ShipmentItem`, `Return`, `ReturnItem`.
- **Invariants:** A `Shipment` can only be created for an `Order` with a captured `Payment`; `ShipmentItem` quantities cannot exceed the corresponding `OrderItem` quantity net of prior shipments/returns; a `Return` must reference a delivered `Shipment`.
- **Owned data:** Shipment and return records and their state machines.
- **Consumers:** Order (status projection), Inventory (restock on return), Notification (tracking updates), Review (post-delivery eligibility).
- **Commands:** `CreateShipment`, `MarkShipped`, `MarkDelivered`, `RequestReturn`, `AuthorizeReturn`, `ReceiveReturn`.
- **Events:** `ShipmentCreated`, `ShipmentDelivered`, `ReturnRequested`, `ReturnReceived`.
- **External dependencies:** Shipping provider (labels/tracking webhooks).
- **Consistency model:** Strong/transactional per state transition; tracking updates are eventually consistent (webhook-driven).
- **Scaling:** Matches order volume; webhook ingestion independently scaled.
- **Security boundary:** Writable by the fulfilling seller (own orders only) and Administration.

### 2.12 Review
- **Responsibility:** Customer product reviews and ratings.
- **Authoritative entities:** `Review`.
- **Invariants:** A `Review` requires a verified purchase (`OrderItem` reference) unless explicitly configured otherwise; one review per customer per `Product` purchase.
- **Owned data:** Review content, rating, moderation status.
- **Consumers:** Catalog (aggregate rating display), Search (rating field), Moderation.
- **Commands:** `SubmitReview`, `FlagReview`, `RemoveReview`.
- **Events:** `ReviewSubmitted`, `ReviewRemoved`.
- **Consistency model:** Strong/transactional; aggregate rating recomputation is eventually consistent (async job).
- **Scaling:** Read-heavy; write volume moderate.
- **Security boundary:** Write restricted to the verified purchasing customer; moderation can remove.

### 2.13 Notification
- **Responsibility:** Cross-cutting delivery of transactional communications across email/SMS/push/in-app.
- **Authoritative entities:** `NotificationPreference`, `NotificationLog` (delivery record, not the message template itself).
- **Owned data:** Preferences and delivery/audit log — never becomes a second source of truth for the business event that triggered it.
- **Consumers:** None (terminal consumer of events from all other domains).
- **Consistency model:** Eventually consistent, asynchronous, at-least-once with deduplication (see `15-notification-architecture.md`).
- **Scaling:** Queue-based, scales independently of API traffic.
- **Security boundary:** Handles PII (contact info) — restricted logging (never logs message body containing sensitive tokens).

### 2.14 Media
- **Responsibility:** Cross-cutting storage/lifecycle of images/video/documents referenced by Catalog, Review, Seller.
- **Authoritative entities:** `MediaAsset` (metadata: owner, storage key, processing status, variants) — bytes live in S3, not Postgres.
- **Consistency model:** Strong/transactional for metadata; asynchronous for derived variants (thumbnails).
- **Scaling:** Processing jobs scale independently (see `14-media-architecture.md`).
- **Security boundary:** Upload authorization scoped to the owning seller/customer/admin context; malware/type scanning before publication.

### 2.15 Search
- **Responsibility:** Derived, read-optimized product discovery index.
- **Authoritative entities:** None — OpenSearch documents are projections of Catalog/Pricing/Inventory-availability/Review data, always reconstructable from Postgres.
- **Consistency model:** Eventually consistent (indexing lag bounded and monitored, see `13-search-architecture.md`).
- **Scaling:** Independent cluster scaling.
- **Security boundary:** Read-only public surface for published, non-suspended products only.

### 2.16 Administration
- **Responsibility:** Cross-cutting operator roles/permissions and the platform audit trail.
- **Authoritative entities:** `AdminUser` role assignment (references `User`), `AuditLogEntry`.
- **Consistency model:** Strong/transactional for the audit write co-located with the action it records (see `25-administration-architecture.md`).
- **Security boundary:** Highest internal sensitivity; every write is audited.

### 2.17 Moderation
- **Responsibility:** Policy enforcement over Catalog listings and Reviews.
- **Authoritative entities:** `ModerationCase`, `ContentFlag`.
- **Consistency model:** Strong/transactional for case state; triggers Catalog/Review state changes via explicit commands, never direct table writes.
- **Security boundary:** Restricted to Moderator/Admin roles.

### 2.18 Fraud & Abuse
- **Responsibility:** Cross-cutting risk evaluation for accounts, orders, and content.
- **Authoritative entities:** `RiskSignal`, `AbuseCase`.
- **Consistency model:** Mostly asynchronous scoring; synchronous checks only at high-value gates (checkout, payout) with a bounded timeout and safe fallback (see `26-fraud-abuse-architecture.md`).
- **Security boundary:** Internal-only; signals never exposed to the subject of the evaluation.

### 2.19 Analytics
- **Responsibility:** Cross-cutting, purely derived business/operational reporting.
- **Authoritative entities:** None — analytics events are append-only projections; the analytics store is fully reconstructable from transactional data and the event log.
- **Consistency model:** Eventually consistent, batched/async.
- **Security boundary:** De-identified where feasible; see `27-analytics-architecture.md` and `18-privacy-architecture.md`.

## 3. Domain Interaction Rules

1. A domain may **read** another domain's data only through that domain's published API/service interface — never a shared table or ORM model.
2. A domain may **write** another domain's data only by issuing that domain's defined command (in-process call within the monolith, or a future network call after extraction) — never a direct repository write.
3. Cross-domain side effects (e.g., "on `OrderCreated`, reduce inventory... already reserved, now commit") are triggered via the event bus (see `09-event-architecture.md`), not via direct synchronous chaining beyond the immediate orchestrator (Checkout).
4. Search, Notification, Media (metadata for derived variants), and Analytics are always downstream/derived — they never originate authoritative business state.
