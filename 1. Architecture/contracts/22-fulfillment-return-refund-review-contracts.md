# Fulfillment, Return, Refund & Review Contracts (Detail)

Extends `../03-domain-architecture.md` §2.11–2.12 and `02-state-machines.md` §8–11 with the field-level and edge-case detail the Volume 2 prompt requires explicitly (warehouse/fulfillment-node concepts, partial shipment, failed delivery, return-to-seller, refund/return relationship, review aggregate derivation).

## 1. Fulfillment Node Concept

- The architecture supports an optional `FulfillmentNode` concept (a seller's warehouse/location) as an attribute of `InventoryItem` (`InventoryItem.fulfillmentNodeId`, nullable — sellers without multi-location fulfillment simply have one implicit default node, so this is additive, not a forced complexity increase for simple sellers).
- A `Shipment` references the `fulfillmentNodeId` its items were picked from, purely as metadata for the seller's own operational tracking and for future multi-node inventory-routing logic — it does **not** change inventory ownership (`InventoryItem` remains owned by Inventory, scoped by `sellerOrgId`, regardless of node count).

## 2. Partial Shipment

- One `Order` can produce multiple `Shipment`s per seller (e.g., an item ships today, a backordered item ships next week) — each `Shipment` references only the `OrderItem`(s)/quantities it actually contains via `ShipmentItem` rows (`../05-data-architecture.md` §2).
- Invariant (restated from `../06-transaction-boundaries.md` §2.8): the sum of `ShipmentItem.quantity` across all shipments for one `OrderItem` can never exceed that `OrderItem.quantity`; a shipment attempting to exceed the remaining un-shipped quantity is rejected `409 SHIPMENT_QUANTITY_EXCEEDS_ORDER_ITEM`.
- `Order.status` (per `02-state-machines.md` §7) reaches `FULFILLED` only when every `OrderItem` across every partial shipment reaches `DELIVERED` — a partially-shipped order sits in `FULFILLING` for as long as any item remains unshipped/undelivered.

## 3. Failed Delivery / Return-to-Sender

- A `Shipment` reaching carrier-reported `EXCEPTION` (`02-state-machines.md` §8) with a terminal carrier outcome of "undeliverable" transitions to `RETURNED_TO_SENDER` — this is **not** the same as a customer-initiated `Return` (§9's state machine); it is tracked as a distinct outcome on the `Shipment` itself, and triggers: (a) an automatic inventory restock command (identical mechanism to `return.received.v1`'s restock trigger, `../03-domain-architecture.md` §2.6), (b) an automatic refund initiation for the affected items (since the customer never received them), (c) customer notification explaining the outcome.
- This flow is explicitly distinguished from a customer-requested `Return` in the data model (`Shipment.status=RETURNED_TO_SENDER` vs. a `Return` row) so seller-facing reporting can distinguish "carrier failed to deliver" from "customer changed their mind" — conflating the two into one generic "returned" bucket would lose exactly the signal a seller needs to distinguish a carrier problem from a product/fit problem.

## 4. Return-to-Seller (Customer-Initiated) — Field Detail

Extends `02-state-machines.md` §9's transition table with the entity fields needed to make it concrete:

| Field | Notes |
|---|---|
| `Return.reasonCode` | Closed enum (`DEFECTIVE`, `WRONG_ITEM`, `NOT_AS_DESCRIBED`, `NO_LONGER_WANTED`, `OTHER`) — drives both customer-facing UI copy and seller-facing analytics; `OTHER` requires a free-text `reasonDetail` field |
| `Return.returnWindowExpiresAt` | Computed at `RequestReturn` eligibility check time from `Shipment.deliveredAt` + the seller's configured return-window policy (`SellerOrganization.returnWindowDays`, defaulting to a platform-wide default if unset) |
| `Return.inspectionOutcome` | `PASSED \| FAILED`, set by `InspectReturn`; `FAILED` requires an `inspectionNotes` field explaining why (e.g., item damaged by customer, not as originally shipped) |
| `ReturnItem` | Mirrors `OrderItem`/`ShipmentItem`'s per-line-item structure — a return can cover a subset of a shipment's items, never more than what was shipped |

## 5. Refund ↔ Return Relationship (Restated, Made Concrete)

- A `Refund` triggered by a `Return` always carries `Refund.returnId` (nullable — a refund can also be issued without an underlying return, e.g., a goodwill/customer-service refund initiated directly by Admin, in which case `returnId` is null and the audit entry, per `12-audit-contract.md`, explains the justification instead).
- `InitiateRefund` triggered by `return.inspected.v1` (outcome `PASSED`) is **system-triggered**, not requiring a separate manual admin action — this is the normal, expected path; an admin manually initiating a refund for a `Return` that failed inspection is a distinct, always-audited exception path (`goodwill override`), never silently automatic.

## 6. Review Contract — Aggregate Derivation (Explicit)

- `Product.avgRating` and `Product.reviewCount` (as surfaced in both the API and the search document, `07-search-contracts.md` §1) are **derived**, recomputed by a job (`analytics.recompute-product-rating` or folded into the existing `search.index-product` job's read step, implementation's choice) triggered by `review.submitted.v1`/`review.approved.v1`/`review.removed.v1`/`review.edited.v1` — there is no code path that increments/decrements these fields in place; every recompute re-aggregates from the current set of `PUBLISHED` reviews for that product, which is what makes moderation removal (`review.removed.v1`) automatically and correctly reflected without a separate "undo the increment" step.
- Reviews with `status=PENDING_MODERATION` (`02-state-machines.md` §11) are excluded from the aggregate until `APPROVED` — a flagged-but-unresolved review never silently affects the public rating in either direction while under review.

## 7. Abuse Reporting

- A customer/other-seller "report" on a review or listing creates a `ContentFlag` (`../05-data-architecture.md` §2, Moderation domain) rather than directly mutating the flagged entity — this preserves the ownership rule from `../04-domain-ownership-matrix.md` (Moderation acts on Catalog/Review only via its own commands, never a direct table write) and gives Moderation a queue of flags to triage rather than an immediate, unreviewed removal.
