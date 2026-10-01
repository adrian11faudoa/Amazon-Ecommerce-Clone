# Order Lifecycle Relationships & Financial Data Boundaries

## 1. Independent Lifecycle Dimensions

The Master Prompt and Volume 1 (`../03-domain-architecture.md` §2.9) establish that Order, Payment, and Fulfillment are separately owned. This document makes the **relationship** between their state machines (`02-state-machines.md` §6–9) explicit, since that relationship — not any single machine — is where ambiguity most commonly hides.

| Dimension | Owning Machine | Independent Because |
|---|---|---|
| Order lifecycle | `Order.status` (`02-state-machines.md` §7) | Reflects the customer-facing "where is my purchase" narrative — a projection, not a primary driver |
| Payment lifecycle | `Payment.status` (§6) | Driven entirely by the external provider's own state, on its own timing |
| Fulfillment/shipment lifecycle | `Shipment.status` (§8) | Driven by seller action + carrier webhooks, on its own timing, and can exist in parallel across multiple shipments for one order |
| Return lifecycle | `Return.status` (§9) | Can begin only after Fulfillment reaches `DELIVERED`, but from then on progresses independently |

`Order.status` is **derived** from the other three via the projection rules in `02-state-machines.md` §7 — it is never the input to a decision made by Payment or Fulfillment; those two always consult their own authoritative state.

## 2. Partial Fulfillment & Partial Cancellation

- An `Order` may contain `OrderItem`s from multiple sellers (Volume 1 `../05-data-architecture.md` §2 note); each seller creates and manages `Shipment`s **only for their own `OrderItem`s**.
- `Order.status = FULFILLING` as soon as **any** seller creates a shipment; `Order.status = FULFILLED` only when **every** `OrderItem` across every seller has a `DELIVERED` shipment.
- **Partial cancellation:** a customer may cancel individual `OrderItem`s (not the whole order) if none of that item's shipments have progressed past `CREATED`. This is modeled as `CancelOrderItem(orderItemId)`, which: (a) triggers a partial refund for just that item's captured amount (§4), (b) releases/does not commit that item's inventory reservation, (c) leaves the rest of the order's items and their own shipment progress untouched.
- **Full cancellation** (`CancelOrder`) is only valid while **every** `OrderItem` is still cancellable per the rule above; if even one item has progressed, the customer is directed to per-item cancellation instead — this is enforced server-side, not left to client logic to compute.

## 3. Cancellation Eligibility Matrix

| Actor | Can Cancel When | Mechanism |
|---|---|---|
| Customer | Item(s) not yet shipped (`Shipment.status` for that item is `CREATED`/`LABEL_PURCHASED` or no shipment exists yet) | `CancelOrder` / `CancelOrderItem` |
| Seller | Their own `OrderItem`(s), same shipped-state condition, e.g. seller cannot fulfill (stockout discovered post-order) | `SellerCancelOrderItem` — requires a reason code, always refunds the customer, always audited |
| PlatformAdmin | Any state, with justification (e.g., fraud, legal request) | `AdminCancelOrder` — always audited, may override the shipped-state condition only with an explicit `forceOverride` flag that itself is a distinct audited action |

## 4. Refund Relationship to Order/Payment State

- A refund is always issued against a `Payment` (never directly against an `Order`), for an amount attributable to one or more specific `OrderItem`s (§9-linked `Refund.orderItemIds`).
- **Partial refund:** `Refund.amountMinorUnits` corresponds to the cancelled/returned item(s)' captured amount (unit price × quantity + their share of tax; shipping is refunded only if the entire order is cancelled/returned, per the seller's shipping-refund policy configured at the `SellerOrganization` level).
- **Payment failure after order creation is not possible by construction:** `CreateOrder` only executes after `Payment.status=AUTHORIZED` (`02-state-machines.md` §6–7 and `../06-transaction-boundaries.md` §2.4) — there is no state where an `Order` exists with a `Payment` that never authorized. A *capture* failure after authorization (rare, provider-dependent) is handled as: `Order` remains `PLACED`, `Payment.status=FAILED` is impossible post-authorization for most providers' capture semantics, but if it occurs, it is treated identically to a cancellation trigger (§3, `AdminCancelOrder` path) with full audit and customer notification.
- **Duplicate refund prevention:** enforced transactionally as stated in `02-state-machines.md` §10 — this document adds that the *item-level* refund ledger (`Refund.orderItemIds` non-overlapping check) is the mechanism preventing the same `OrderItem` from being refunded twice via two different `Return`s.

## 5. Duplicate Webhook / Callback Handling

Both Payment and Fulfillment receive external callbacks that can be redelivered. The rule is uniform across both: **every inbound webhook is deduplicated before any state transition is attempted** (`(provider, providerRef, providerEventId)` for Payment; `(carrier, trackingNumber, eventTimestamp)` for Fulfillment, per `../06-transaction-boundaries.md` §2.6/§2.8) — a duplicate delivery is acknowledged (200 OK to the provider) but produces no second transition and no second event.

## 6. Financial Data Boundaries

| Concept | Authoritative Owner | Never Confused With |
|---|---|---|
| Transactional order totals (subtotal, tax, shipping, discount, grand total) | `Order`/`OrderItem` (snapshotted at creation) | Live catalog/pricing data — an `Order`'s totals never recompute from current `Price` rows |
| Payment-provider state (authorization, capture, provider fees) | `Payment` (local record referencing provider ID) | Order totals — `Payment.amountMinorUnits` must equal the `Order`'s grand total at authorization time, checked at creation, but the two remain separately owned records, not one merged table |
| Seller financial reporting (gross sales, refunds, net payable) | Derived read-model computed from `OrderItem` + `Refund` scoped by `sellerOrgId`, recomputed on demand or via a scheduled aggregation job — never a separately hand-maintained ledger that could drift from the source records |
| Platform revenue / commission | Derived from a configured commission-rate rule applied to `OrderItem` at the time of the aggregation job's run, using the commission rate **in effect on the order's placement date** (rate history retained, mirroring the `Price` append-only pattern in `../contracts/01-entity-and-identifier-catalog.md` §2) — never today's rate applied retroactively | Seller payout timing (governed by Stripe Connect's own payout schedule, `../16-external-integrations.md` §2) |
| Seller settlement/payout data | Stripe Connect (external authority for the payout event itself); the platform's local `Payment`/`Refund` records are the input, not a duplicate ledger of payout amounts | Tax remittance (a seller's own responsibility unless the platform operates as a Marketplace Facilitator for a given jurisdiction — a legal/tax configuration, not an architectural default asserted here) |

**Reproducibility requirement:** every financial figure surfaced to a seller or administrator (gross sales, commission, net payable) must be a **pure function** of `OrderItem`, `Refund`, and the commission-rate history — recomputable at any time from those source records, never a value that can silently diverge from them (no "adjustment" field that isn't itself backed by a recorded `InventoryAdjustment`-style audit entry explaining the delta).
