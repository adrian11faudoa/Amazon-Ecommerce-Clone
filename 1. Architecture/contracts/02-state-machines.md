# State Machine Contracts

Each critical business object gets its **own** state machine — no single generic `status` field represents more than one lifecycle dimension (see `03-order-lifecycle-and-financial-boundaries.md` for how Order/Payment/Fulfillment/Shipment/Return relate to each other as independent machines).

For every machine: states, initial state, valid transitions, trigger, responsible actor/system, side effects, emitted event, invalid-transition behavior, idempotency, terminal states.

## 1. Seller Verification

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `PENDING` | `CreateSellerOrganization` | Seller | — | `seller.organization_created.v1` |
| `PENDING` | `UNDER_REVIEW` | `SubmitVerification` | Seller | Verification documents attached | `seller.verification_submitted.v1` |
| `UNDER_REVIEW` | `VERIFIED` | `ApproveVerification` | PlatformAdmin | Stripe Connect account activated; catalog publish unlocked | `seller.verified.v1` |
| `UNDER_REVIEW` | `REJECTED` | `RejectVerification` | PlatformAdmin | Seller notified with reason | `seller.verification_rejected.v1` |
| `REJECTED` | `UNDER_REVIEW` | `SubmitVerification` (resubmit) | Seller | — | `seller.verification_submitted.v1` |
| `VERIFIED` | `SUSPENDED` | `SuspendSeller` | PlatformAdmin | All products force-unpublished; new orders blocked | `seller.suspended.v1` |
| `SUSPENDED` | `VERIFIED` | `ReinstateSeller` | PlatformAdmin | — | `seller.reinstated.v1` |

- **Initial state:** `PENDING`. **Terminal states:** none (a suspended seller can always be reinstated; rejection is not terminal — resubmission is allowed).
- **Invalid transition behavior:** e.g., `ApproveVerification` called on a `PENDING` (not yet `UNDER_REVIEW`) org returns `409 INVALID_STATE_TRANSITION`.
- **Idempotency:** `ApproveVerification` on an already-`VERIFIED` org is a no-op returning the current state (not an error), since admin double-clicks are expected.

## 2. Product Lifecycle

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `DRAFT` | `CreateProduct` | Seller | — | `catalog.product_created.v1` |
| `DRAFT` | `PUBLISHED` | `PublishProduct` | Seller | Requires ≥1 sellable `Sku` with a `Price`; requires `SellerOrganization.status=VERIFIED` | `catalog.product_published.v1` |
| `PUBLISHED` | `UNPUBLISHED` | `UnpublishProduct` | Seller | Removed from search | `catalog.product_unpublished.v1` |
| `UNPUBLISHED` | `PUBLISHED` | `PublishProduct` | Seller | Re-indexed | `catalog.product_published.v1` |
| `PUBLISHED` \| `UNPUBLISHED` | `SUSPENDED` | `ForceUnpublish` | Moderator/PlatformAdmin | Removed from search; seller notified with reason; seller cannot self-republish | `catalog.product_suspended.v1` |
| `SUSPENDED` | `UNPUBLISHED` | `LiftSuspension` | Moderator/PlatformAdmin | Seller may now republish | `catalog.product_suspension_lifted.v1` |
| `DRAFT` \| `PUBLISHED` \| `UNPUBLISHED` | `ARCHIVED` | `ArchiveProduct` | Seller | Only allowed if no `Sku` has an open `InventoryReservation`; historical `OrderItem` snapshots unaffected | `catalog.product_archived.v1` |

- **Initial state:** `DRAFT`. **Terminal state:** `ARCHIVED` (irreversible via API; a genuinely needed un-archive is an Administration-only data-repair action, not a normal transition).
- **Invalid transition behavior:** `PublishProduct` without a sellable `Sku` returns `422 PRODUCT_NOT_PUBLISHABLE` with `details` naming the missing requirement.
- **Idempotency:** Re-publishing an already-`PUBLISHED` product is a no-op.

## 3. Inventory Reservation

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `ACTIVE` | `ReserveInventory` | Checkout (system) | `InventoryItem.reserved += qty` | `inventory.reserved.v1` |
| `ACTIVE` | `COMMITTED` | `CommitReservation` | Checkout, on `PaymentAuthorized` | `reserved -= qty`; `committed += qty` (or `onHand -= qty` depending on the chosen commit semantics — see `03-order-lifecycle-and-financial-boundaries.md` §2) | `inventory.committed.v1` |
| `ACTIVE` | `RELEASED` | `ReleaseReservation` | Checkout, on failure/expiry, or the scheduled sweep job | `reserved -= qty` | `inventory.released.v1` |
| `ACTIVE` | `EXPIRED` | Scheduled sweep (no explicit release call received before `expiresAt`) | System (reconciliation job) | Same effect as `RELEASED` | `inventory.released.v1` (reason=`expired`) |

- **Initial state:** `ACTIVE`. **Terminal states:** `COMMITTED`, `RELEASED`, `EXPIRED`.
- **Invalid transition behavior:** `CommitReservation` on an already-`RELEASED`/`EXPIRED` reservation returns `409 RESERVATION_NO_LONGER_VALID`, which Checkout treats as a hard checkout failure (never silently re-reserves mid-flow).
- **Idempotency:** `ReleaseReservation` on an already-`RELEASED` row is a no-op; `CommitReservation` on an already-`COMMITTED` row is a no-op returning the existing commit.

## 4. Cart

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `ACTIVE` | First `AddCartItem` | Customer/Guest | — | (none — low criticality, not outboxed) |
| `ACTIVE` | `CONVERTED` | `StartCheckout` succeeds | Checkout (system) | Cart becomes read-only, superseded by its `CheckoutSession` snapshot | — |
| `ACTIVE` | `EXPIRED` | Scheduled cleanup (inactivity window) | System | Cart and items purged | — |

- **Initial state:** `ACTIVE`. **Terminal states:** `CONVERTED`, `EXPIRED`.
- **Invalid transition:** Mutating a `CONVERTED` cart returns `409 CART_ALREADY_CONVERTED` — the customer must start a new cart.

## 5. Checkout Session

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `STARTED` | `StartCheckout` | Customer | Cart marked `CONVERTED` | `checkout.started.v1` |
| `STARTED` | `PRICING_RESOLVED` | `ResolvePricing` | Checkout (system) | Authoritative price/tax/promotion snapshot taken | — |
| `PRICING_RESOLVED` | `INVENTORY_RESERVED` | `ReserveCheckoutInventory` | Checkout (system) | Inventory reservations created (§3) | — |
| `INVENTORY_RESERVED` | `PAYMENT_INITIATED` | `InitiatePayment` | Checkout (system) | Provider payment intent created | — |
| `PAYMENT_INITIATED` | `COMPLETED` | `CompleteCheckout` (on `PaymentAuthorized`) | Checkout (system) | `Order` created; reservations committed | `checkout.completed.v1`, `order.created.v1` |
| `PRICING_RESOLVED` \| `INVENTORY_RESERVED` \| `PAYMENT_INITIATED` | `FAILED` | Any step failure | Checkout (system) | Compensating release of any reservations/payment intents already created (see `03-order-lifecycle-and-financial-boundaries.md` §1) | `checkout.failed.v1` |
| `STARTED` \| `PRICING_RESOLVED` \| `INVENTORY_RESERVED` \| `PAYMENT_INITIATED` | `EXPIRED` | Scheduled sweep (session inactivity timeout) | System | Same compensation as `FAILED` | `checkout.failed.v1` (reason=`expired`) |

- **Initial state:** `STARTED`. **Terminal states:** `COMPLETED`, `FAILED`, `EXPIRED`.
- **Invalid transition:** Any command targeting a session already in a terminal state returns `409 CHECKOUT_SESSION_CLOSED`.
- **Idempotency:** Governed by `CheckoutSession.idempotencyKey` (unique) — see `04-api-contract.md` §3.

## 6. Payment

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `CREATED` | `CreatePaymentIntent` | Checkout (system) | Provider intent created | — |
| `CREATED` | `AUTHORIZED` | Provider confirms authorization (sync response or webhook) | Payment provider (verified) | Checkout proceeds to `CompleteCheckout` | `payment.authorized.v1` |
| `CREATED` | `FAILED` | Provider declines | Payment provider (verified) | Checkout fails (§5) | `payment.failed.v1` |
| `AUTHORIZED` | `CAPTURED` | Provider confirms capture (may be immediate or deferred per provider config) | Payment provider (verified) | Order `paymentStatus` projection updates | `payment.captured.v1` |
| `AUTHORIZED` | `CANCELLED` | `CancelAuthorization` (e.g., order cancelled before capture) | Order/Admin (system) | No funds captured | `payment.cancelled.v1` |
| `CAPTURED` | `PARTIALLY_REFUNDED` | `InitiateRefund` (amount < captured) | Admin/system | `Refund` created | `refund.issued.v1` |
| `CAPTURED` \| `PARTIALLY_REFUNDED` | `REFUNDED` | `InitiateRefund` (cumulative = captured) | Admin/system | — | `refund.issued.v1` |

- **Initial state:** `CREATED`. **Terminal states:** `FAILED`, `CANCELLED`, `REFUNDED`.
- **Invalid transition:** A webhook reporting `AUTHORIZED` for a `Payment` already `FAILED`/`CANCELLED` is logged as an anomaly and ignored (never overwrites a terminal state) — surfaced to the reconciliation job, not silently dropped.
- **Idempotency:** Every transition is driven by `(provider, providerRef, providerEventId)`; a duplicate provider event is a no-op (`../06-transaction-boundaries.md` §2.6).

## 7. Order

Order carries its **own** lifecycle, independent of Payment/Fulfillment (see `03-order-lifecycle-and-financial-boundaries.md` for the full cross-machine relationship):

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `PLACED` | `CreateOrder` (via Checkout only) | Checkout (system) | — | `order.created.v1` |
| `PLACED` | `CONFIRMED` | Derived when `Payment.status=AUTHORIZED` and `Shipment` not yet created | System projection | — | — |
| `CONFIRMED` | `FULFILLING` | First `Shipment` created for any `OrderItem` | Fulfillment (system) | — | — |
| `FULFILLING` | `FULFILLED` | All `OrderItem`s have a `Shipment` in `DELIVERED` | System projection | — | — |
| `PLACED` \| `CONFIRMED` | `CANCELLED` | `CancelOrder` (customer, before fulfillment starts) or `AdminCancelOrder` | Customer/Seller/Admin (see §"Cancellation Eligibility" in `03-...md`) | `Payment` cancelled/refunded; inventory released | `order.cancelled.v1` |
| `FULFILLED` | `CLOSED` | All items delivered and return window elapsed with no open `Return` | System (scheduled) | — | `order.closed.v1` |
| `FULFILLED` \| `CLOSED` | `RETURN_IN_PROGRESS` | `RequestReturn` on any item | Customer | — | — |
| `RETURN_IN_PROGRESS` | `CLOSED` | All open `Return`s resolved | System projection | — | — |

- **Initial state:** `PLACED`. **Terminal state:** `CANCELLED`; `CLOSED` is a practical terminal state but can re-open to `RETURN_IN_PROGRESS` within the return window.
- **Invalid transition:** `CancelOrder` on a `FULFILLING`/`FULFILLED` order returns `409 ORDER_NOT_CANCELLABLE` — the customer is directed to the Return flow instead.
- **Note:** `Order.status` as exposed over the API is this projection — it is never written directly by Payment or Fulfillment; each publishes its own events and a dedicated projector updates `Order.status` (`../04-domain-ownership-matrix.md`).

## 8. Fulfillment (Shipment)

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `CREATED` | `CreateShipment` | Seller | Requires `Payment.status ∈ {AUTHORIZED, CAPTURED}` | `shipment.created.v1` |
| `CREATED` | `LABEL_PURCHASED` | `PurchaseLabel` | Seller/system | Shipping provider call | — |
| `LABEL_PURCHASED` | `SHIPPED` | `MarkShipped` (carrier pickup scan or manual) | Seller/carrier webhook | Inventory decremented from `committed` | `shipment.shipped.v1` |
| `SHIPPED` | `IN_TRANSIT` | Carrier tracking webhook | Carrier (verified webhook) | — | — |
| `IN_TRANSIT` | `DELIVERED` | Carrier tracking webhook | Carrier (verified webhook) | Review eligibility unlocked | `shipment.delivered.v1` |
| `IN_TRANSIT` | `EXCEPTION` | Carrier tracking webhook (delay/damage/lost) | Carrier (verified webhook) | Support case suggested | `shipment.exception.v1` |
| `EXCEPTION` | `DELIVERED` \| `RETURNED_TO_SENDER` | Carrier resolves | Carrier (verified webhook) | — | — |

- **Initial state:** `CREATED`. **Terminal states:** `DELIVERED`, `RETURNED_TO_SENDER`.
- **Invalid transition:** A webhook reporting `DELIVERED` for a `Shipment` with no prior `SHIPPED` record is accepted defensively (carriers occasionally skip intermediate scans) but logged as an anomaly for reconciliation, never rejected outright (rejecting would strand a legitimately delivered package's status).
- **Idempotency:** Deduplicated by `(carrier, trackingNumber, eventTimestamp)` (`../06-transaction-boundaries.md` §2.8).

## 9. Return

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `REQUESTED` | `RequestReturn` | Customer | Requires `Shipment.status=DELIVERED` and within return window | `return.requested.v1` |
| `REQUESTED` | `AUTHORIZED` | `AuthorizeReturn` | Seller/Admin | Return shipping label issued | `return.authorized.v1` |
| `REQUESTED` | `DENIED` | `DenyReturn` | Seller/Admin | Customer notified with reason | `return.denied.v1` |
| `AUTHORIZED` | `RECEIVED` | `ReceiveReturn` | Seller | Inventory restock command triggered | `return.received.v1` |
| `RECEIVED` | `INSPECTION_PASSED` \| `INSPECTION_FAILED` | `InspectReturn` | Seller | `INSPECTION_PASSED` → refund eligible; `INSPECTION_FAILED` → customer notified, no refund | `return.inspected.v1` |
| `INSPECTION_PASSED` | `REFUNDED` | `InitiateRefund` (Payment domain) | Seller/Admin | `Refund` created (§6) | `refund.issued.v1` |

- **Initial state:** `REQUESTED`. **Terminal states:** `DENIED`, `REFUNDED`, `INSPECTION_FAILED`.
- **Invalid transition:** `ReceiveReturn` without a prior `AUTHORIZED` state returns `409 RETURN_NOT_AUTHORIZED`.

## 10. Refund

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `PENDING` | `InitiateRefund` | Admin/system (from Return or direct) | Provider refund call made | — |
| `PENDING` | `PROCESSED` | Provider webhook confirms | Payment provider (verified) | `Payment` status updated (§6) | `refund.issued.v1` |
| `PENDING` | `FAILED` | Provider webhook reports failure | Payment provider (verified) | Alerted for manual reconciliation | `refund.failed.v1` |

- **Initial state:** `PENDING`. **Terminal states:** `PROCESSED`, `FAILED`.
- **Duplicate-refund prevention:** enforced at creation — cumulative `Refund.amountMinorUnits` for a `Payment` can never exceed `Payment.capturedAmountMinorUnits` (transactional check, `../06-transaction-boundaries.md` §2.7); a second `InitiateRefund` call with the same idempotency key returns the original `Refund`, never creates a second one.

## 11. Review Moderation

| From | To | Trigger | Actor | Side Effects | Event |
|---|---|---|---|---|---|
| (none) | `PUBLISHED` | `SubmitReview` (auto-published unless flagged by pre-publish heuristics) | Customer | Included in aggregate rating | `review.submitted.v1` |
| (none) | `PENDING_MODERATION` | `SubmitReview` (flagged by heuristic, e.g., prohibited content pattern) | System | Excluded from aggregate rating until resolved | `review.flagged.v1` |
| `PENDING_MODERATION` | `PUBLISHED` | `ApproveReview` | Moderator | Included in aggregate rating | `review.approved.v1` |
| `PENDING_MODERATION` \| `PUBLISHED` | `REMOVED` | `RemoveReview` | Moderator/Admin | Excluded from aggregate rating; content redacted | `review.removed.v1` |
| `PUBLISHED` | `EDITED` (remains `PUBLISHED`) | `EditReview` (within edit window) | Customer (owner) | Aggregate recomputed | `review.edited.v1` |

- **Initial state:** `PUBLISHED` or `PENDING_MODERATION` depending on pre-publish heuristic outcome. **Terminal state:** `REMOVED`.
- **Invalid transition:** `EditReview` outside the edit window returns `403 EDIT_WINDOW_EXPIRED`.

## 12. General Rules Across All Machines

- **No skipped states:** a transition is valid only if explicitly listed above; any other requested transition returns `409 INVALID_STATE_TRANSITION` with the current and requested state in `details`.
- **Every transition is logged** with actor, timestamp, and correlation ID at minimum (full audit requirement in `12-audit-contract.md` for the subset that requires a durable `AuditLogEntry`).
- **System-triggered transitions** (webhooks, scheduled sweeps) always re-derive current state before transitioning — they never blindly apply a transition based on a stale in-memory assumption.
