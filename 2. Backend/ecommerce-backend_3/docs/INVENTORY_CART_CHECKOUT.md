# Inventory, Cart & Checkout Domain (Volume 3)

Backend foundation for inventory ownership/reservation, customer carts,
and checkout preparation, built on top of the Volume 1 identity/auth and
Volume 2 catalog/pricing foundations.

**Out of scope for this milestone** (see the prompt): final order
lifecycle, payment capture, refunds, shipment/fulfillment, returns,
reviews, complete search, seller settlement.

## Ownership model

One `InventoryItem` per `SellerOffer` (1:1) — the offer is already the
seller-owned, SKU-scoped orderable unit from Volume 2, so it's the
natural inventory ownership key, matching the prompt's "identify the
appropriate orderable unit... seller offer; SKU."

## Quantity semantics — the core correctness guarantee

`onHandQuantity` and `reservedQuantity` are both stored. `availableQuantity`
is **always** `onHandQuantity - reservedQuantity`, computed at read time
(`InventoryService.toResponseDto`) — **never stored**, so it can never
drift out of sync with its inputs.

Every mutation to either quantity is a single atomic, conditional SQL
statement — never a read-in-application-memory followed by a separate
write:

```sql
-- reserveForCheckout
UPDATE inventory_items
SET "reservedQuantity" = "reservedQuantity" + :qty
WHERE id = :id AND "onHandQuantity" - "reservedQuantity" >= :qty
```

If two concurrent requests race for the last unit, exactly one `UPDATE`
matches a row (the other's `WHERE` clause matches zero rows, and the
caller gets a deterministic `INSUFFICIENT_INVENTORY`). There is no
window between "check availability" and "commit the reservation" for a
second request to slip through — see `InventoryService.spec.ts`'s
concurrency tests, and the CHECK constraints in the migration
(`reservedQuantity <= onHandQuantity`, both `>= 0`) as defense in depth
alongside the transaction-level guard.

`adjust`, `releaseReservation`, `expireReservation`, and
`consumeReservation` all follow the same pattern — see
`InventoryService`'s doc comments on each.

## Reservation idempotency

A reservation's identity is `(checkoutId, inventoryItemId)`, enforced
unique at the database level. `InventoryService.reserveForCheckout`:

1. Looks up an existing reservation for that pair first. Same quantity
   returns it (idempotent replay). Different quantity produces a
   deterministic `RESERVATION_CONFLICT`.
2. If none exists, attempts the atomic reserve + insert. If it loses a
   race to a concurrent identical request (a `P2002` on the unique
   constraint), it re-looks-up and returns the winner's row rather than
   surfacing a raw database error.

## Reservation & checkout state machines

Reservations: `ACTIVE -> RELEASED | EXPIRED | CONSUMED`. All three target
transitions are idempotent (repeating a transition that already
happened is a no-op success, not an error) and mutually exclusive from
`ACTIVE` (see `InventoryService.transitionReservation` /
`consumeReservation`).

Checkouts: `CREATED -> AWAITING_PAYMENT -> {CANCELLED | EXPIRED}`, or
`CREATED -> FAILED` if reservation fails during creation. `COMPLETED`
exists in the enum and API responses can show it, but **nothing in this
milestone ever transitions a checkout into it** — that's the future
payment/order milestone's job (see EXPLICIT OUT-OF-SCOPE BOUNDARIES).
`VALIDATING` and `RESERVED` are intermediate states this
implementation's fast validate-then-reserve-then-ready pipeline doesn't
pause on separately, but the enum values exist for a future
implementation that might (e.g. an async fraud-check step) to slot into
without a schema change.

## Checkout creation: the full flow

1. **Idempotency check first**: `(customerId, idempotencyKey)` is
   unique. A repeat request with the same key always returns the same
   checkout — never re-processes, never creates a second reservation set.
2. **Never a client-supplied cart ID.** Checkout always resolves the
   customer's own current active cart server-side
   (`CartService.getOrCreateActiveCart({ customerId })`) — this is what
   makes "checkout ID manipulation" / "cart ID manipulation" IDOR
   attempts structurally impossible rather than merely checked.
3. **Price/promotion revalidation** (`resolveLines`): for every cart
   line, freshly loads the offer's current status, current active
   `Price`, current inventory, and currently-active promotions. Nothing
   about price or discount is ever taken from the cart (the cart
   intentionally stores no price — see below) or the client.
4. Promotions **do not stack**: the single best-value currently-active
   promotion per line applies (see `computeBestDiscount`), capped so a
   line's discount can never exceed its own subtotal.
5. Totals are computed with `BigInt` minor units throughout — never
   floating point.
6. The `Checkout` + `CheckoutItem` rows are created in one transaction,
   with a `CHECKOUT_CREATED` outbox event in the same transaction.
7. **After** that transaction commits, inventory is reserved per line
   (each reservation is its own short atomic operation — see above). If
   any line fails, every reservation already acquired **for this
   checkout** is released (compensation) and the checkout is marked
   `FAILED` — see `reserveInventoryOrCompensate` and its test coverage.
8. On full success, the checkout moves straight to `AWAITING_PAYMENT`
   with a `CHECKOUT_READY_FOR_PAYMENT` event — the seam
   `buildPaymentIntentContract` exposes for a future payment domain.

## Why the cart never stores a price

The prompt is explicit: *"Do not make the cart the authoritative source
for... current price... Those values must be revalidated at checkout."*
`CartItem` therefore has no price field at all — there's nothing to
"go stale," because nothing was ever cached. `CartService.toResponseDto`'s
`warnings` array flags items whose offer is no longer `ACTIVE`, but never
a price comparison, since there's no stored price to compare against.
Checkout is the only place a price is ever resolved and it always
resolves it fresh.

## Cart ownership: customer or opaque anonymous token, never a client ID

`CartOwner` is `{ customerId }` (from the authenticated JWT — never from
the request body) or `{ anonymousToken }` (an opaque server-issued UUID,
echoed back via the `x-cart-token` response/request header). See
`CartController.resolveOwner` and `OptionalJwtAuthGuard` (authenticates
if a valid bearer token is present, never throws if not — cart supports
both anonymous and authenticated access on the same endpoints).
`CartService.requireOwned` 404s (never 403s) on any mismatch.

## Cart merge

`mergeAnonymousIntoCustomerCart` (only reachable authenticated, via
`POST /cart/merge`) sums quantities for lines present in both carts
(capped at the per-line max) and copies over anonymous-only lines — no
customer item is ever discarded. The anonymous cart is marked `MERGED`
(not deleted), preserving it for analytics/audit.

## Cart versioning

`Cart.revision` increments on every mutation. It's exposed in
`CartResponseDto` so a client can detect "the cart changed since I last
read it," but checkout itself doesn't compare against a client-supplied
revision (a client can't supply the cart at all, per above) — the
`cartRevisionAtCreation` field on `Checkout` is a durable snapshot for
audit/debugging ("what did the cart look like when this checkout was
created"), not a concurrency gate the client controls.

## Background jobs (shared `catalog-maintenance` queue, extended from Volume 2)

All four recurring jobs live on the same queue/processor introduced in
Volume 2 (see `src/maintenance/`, moved out of the catalog module since
it now spans domains):

- `relay-outbox` (10s) — from Volume 2.
- `cleanup-media` (60s) — from Volume 2.
- `expire-reservations` (30s) — bounded batches (100) of `ACTIVE`
  reservations past `expiresAt`; each expiration is independently
  idempotent, so one row failing never blocks the rest of the batch.
- `expire-checkouts` (30s) — same pattern for checkouts; releases every
  active reservation for the checkout, then marks it `EXPIRED`.

## Security notes specific to this milestone

- Every server-side value (price, discount, availability, seller ID,
  customer ID) is re-resolved from the database on every request — see
  `resolveLines`. Nothing about money or stock ever comes from the
  client.
- Rate limits added: `cartMutation` (60/min per IP by default),
  `checkoutCreation` (10/5min per IP by default) — see
  `RATE_LIMIT_CART_MUTATION_*` / `RATE_LIMIT_CHECKOUT_CREATION_*` in
  `.env.example`.
- Cart/checkout ownership checks 404 rather than 403 on mismatch,
  consistent with Volume 2's seller-isolation pattern, so a probing
  request can't even confirm another customer's resource exists.
