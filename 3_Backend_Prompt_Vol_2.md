# AMAZON ECOMMERCE PLATFORM — BACKEND VOLUME 2 IMPLEMENTATION PROMPT

## ROLE

Act as the complete **Backend Engineering Team** responsible for implementing the next production-grade backend capabilities of the Amazon Ecommerce Platform.

Operate as a Principal Backend Architect, Staff Backend Engineers, Database Engineer, Distributed Systems Engineer, Payments Engineer, Security Engineer, QA Engineer, and DevOps-aware Backend Engineer working as one engineering team.

Do not teach the implementation process. Perform the engineering work directly in the repository.

The objective is to implement the core transactional commerce engine required by a global multi-seller ecommerce marketplace, including pricing, carts, promotions, checkout, orders, payments, refunds, and the transactional foundations required for fulfillment.

---

# PROJECT

Build the backend for a global, multi-seller ecommerce marketplace comparable in breadth and operational complexity to Amazon Marketplace.

The platform supports:

* Millions of customers.
* Thousands of sellers.
* Millions of products and variants.
* High-volume catalog and search traffic.
* Multi-seller shopping carts.
* Multi-seller checkout.
* Inventory reservations.
* Pricing.
* Promotions.
* Coupons.
* Orders.
* Payments.
* Refunds.
* Returns.
* Shipments.
* Seller payouts.
* Notifications.
* Administration.
* Auditing.
* High availability.
* Horizontal scaling.
* Asynchronous processing.
* Continuous deployment.

The backend must maintain strict transactional correctness for money, inventory, orders, and payment state.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless the repository already contains a compatible production-grade implementation that should be preserved.

## Backend

* NestJS.
* TypeScript.
* REST APIs.
* Swagger/OpenAPI.
* Webhooks.
* WebSockets or SSE only where justified.

## Database

* PostgreSQL.
* Prisma ORM.

## Cache and Coordination

* Redis.

## Search

* Elasticsearch or OpenSearch.

## Background Processing

* BullMQ.

## Storage

* S3-compatible object storage.
* CloudFront or equivalent CDN.

## Payments

* Stripe or a provider abstraction supporting production payment-provider integration.

## Observability

* OpenTelemetry.
* Prometheus.
* Grafana.
* Loki and/or equivalent centralized logging.
* Tempo and/or equivalent distributed tracing.

---

# SOURCE OF TRUTH

The repository is the source of truth for implementation state.

Before changing anything:

1. Inspect the complete backend structure.
2. Inspect package manifests.
3. Inspect configuration.
4. Inspect Prisma schema and migrations.
5. Inspect existing domain modules.
6. Inspect existing services.
7. Inspect controllers.
8. Inspect DTOs.
9. Inspect guards and authorization.
10. Inspect existing cart, catalog, inventory, authentication, seller, event, and queue functionality.
11. Inspect tests.
12. Inspect API documentation.
13. Inspect existing payment abstractions if present.
14. Inspect existing environment configuration.
15. Identify reusable infrastructure.
16. Identify incompatible or incomplete implementations.
17. Determine exactly what must be added or changed.

Do not blindly recreate existing functionality.

Do not assume another AI prompt has been executed.

Do not rely on conversation history.

The repository itself must contain everything necessary to understand the current implementation state.

---

# BACKEND IMPLEMENTATION SCOPE

Implement the transactional commerce layer.

This volume must establish production-grade functionality for:

* Product pricing.
* Price snapshots.
* Shopping carts.
* Cart items.
* Wishlists where required by existing domain boundaries.
* Promotions.
* Coupons.
* Promotion validation.
* Checkout preparation.
* Checkout validation.
* Multi-seller checkout.
* Customer orders.
* Seller order groupings.
* Order items.
* Payment intent creation.
* Payment state handling.
* Payment webhooks.
* Refund foundations.
* Idempotent commerce operations.
* Order state transitions.
* Inventory reservation integration.
* Transactional outbox integration.
* Commerce events.
* Background jobs.
* Commerce audit records.

Do not implement frontend or mobile interfaces.

---

# PRICING DOMAIN

Implement a production-grade pricing foundation.

Pricing must support:

* Product-level pricing where applicable.
* Variant-level pricing.
* Seller-specific offers where the marketplace model requires them.
* Currency.
* Monetary precision.
* Effective timestamps.
* Active/inactive state.
* Price history where required.
* Customer-visible pricing.
* Transactional price snapshots.

Never use floating-point arithmetic for money.

Use exact decimal representations.

Every monetary amount must have explicit currency semantics.

Do not allow clients to submit authoritative final prices.

The backend must calculate authoritative prices.

---

# PRICE SNAPSHOTS

Orders must preserve the commercial terms that existed when the order was created.

Persist immutable or effectively immutable snapshots for values such as:

* Unit price.
* Currency.
* Quantity.
* Discount allocation.
* Tax where applicable.
* Shipping charge where applicable.
* Seller information required for order history.
* Product information required for order history.

Do not rely on the current product price to reconstruct historical orders.

Do not mutate historical financial values when a catalog price changes.

---

# CART DOMAIN

Implement production-grade shopping carts.

Support:

* Cart creation.
* Cart retrieval.
* Cart item addition.
* Quantity changes.
* Item removal.
* Cart clearing.
* Cart ownership.
* Guest/session cart behavior if supported by the repository architecture.
* Cart merging after authentication where applicable.
* Product/variant validation.
* Inventory availability checks.
* Seller ownership validation.
* Price refresh behavior.
* Cart expiration or lifecycle handling where required.

Cart operations must be safe under concurrent requests.

Prevent:

* Negative quantities.
* Zero-value quantities.
* Invalid variants.
* Unauthorized cart access.
* Adding unavailable products without proper state handling.
* Manipulation of authoritative prices.

---

# CART CONCURRENCY

Explicitly protect against concurrent cart modifications.

Handle situations such as:

* Two quantity updates arriving simultaneously.
* The same item being added repeatedly.
* Item removal racing with quantity updates.
* Cart merge racing with cart updates.
* Product deactivation while a cart contains the item.
* Inventory becoming unavailable after cart creation.

Do not assume a cart guarantees inventory.

Cart availability is informational until checkout establishes a valid reservation.

---

# PROMOTIONS

Implement the promotion foundation.

Support promotion rules suitable for:

* Percentage discounts.
* Fixed monetary discounts.
* Product-level discounts.
* Variant-level discounts.
* Category-level discounts.
* Seller-specific promotions.
* Cart-level promotions.
* Minimum subtotal requirements.
* Start/end timestamps.
* Activation state.
* Usage restrictions.
* Customer eligibility.
* Seller eligibility where appropriate.

Promotion calculations must be deterministic.

Prevent clients from directly submitting arbitrary discounts.

---

# COUPONS

Implement secure coupon functionality.

Support:

* Coupon codes.
* Promotion association.
* Activation/deactivation.
* Expiration.
* Usage limits.
* Per-customer usage limits.
* Eligibility checks.
* Seller-specific restrictions where applicable.
* Minimum order requirements.
* Idempotent redemption behavior.

Coupon codes should be handled securely and consistently.

Prevent:

* Coupon brute force abuse.
* Unauthorized coupon creation.
* Coupon reuse beyond configured limits.
* Race conditions allowing usage limits to be exceeded.

Coupon redemption must be concurrency-safe.

---

# PROMOTION CALCULATION ENGINE

Create a deterministic promotion calculation mechanism.

The calculation must clearly establish:

1. Eligible products.
2. Eligible variants.
3. Eligible sellers.
4. Eligible customers.
5. Promotion precedence.
6. Discount amount.
7. Discount allocation.
8. Maximum discount limits.
9. Coupon effects.
10. Final totals.

Do not allow ambiguous promotion ordering.

Do not apply discounts twice because of duplicate requests.

The calculation result must be reproducible for the same authoritative inputs.

---

# CHECKOUT

Implement checkout preparation and validation.

Checkout must validate authoritative state before creating an order.

Validate:

* Customer identity.
* Cart ownership.
* Cart contents.
* Product status.
* Variant status.
* Seller status.
* Current pricing.
* Promotion eligibility.
* Coupon eligibility.
* Inventory availability.
* Shipping information.
* Billing information where required.
* Currency consistency.
* Order limits.
* Required customer information.

Do not trust cart totals supplied by clients.

Recalculate authoritative totals server-side.

---

# MULTI-SELLER CHECKOUT

The marketplace must support one customer purchasing items from multiple sellers in a single checkout flow.

The architecture must distinguish:

* Customer order.
* Seller order grouping.
* Order item.
* Shipment.
* Payment.
* Seller settlement.

A single customer checkout may contain products belonging to multiple sellers.

Persist enough structure to allow each seller to independently manage:

* Fulfillment.
* Shipment.
* Cancellation where permitted.
* Returns.
* Seller financial settlement.

Do not collapse all seller ownership into a single ambiguous order record.

---

# ORDER CREATION

Order creation must be transactional and idempotent.

The order workflow must:

1. Validate the cart.
2. Validate product and seller state.
3. Recalculate prices.
4. Apply promotions.
5. Validate inventory.
6. Establish inventory reservations.
7. Create the order.
8. Create order items.
9. Create seller order groupings where required.
10. Persist price and commercial snapshots.
11. Establish payment intent state.
12. Record the appropriate event/outbox records.
13. Release or transition temporary resources appropriately when creation fails.

Do not create partially valid orders.

Do not reserve inventory indefinitely when order creation fails.

Do not charge customers using unverified client-provided totals.

---

# INVENTORY INTEGRATION

Integrate checkout with inventory reservations.

Inventory reservation must be concurrency-safe.

The implementation must handle:

* Concurrent checkouts.
* Insufficient inventory.
* Reservation expiration.
* Duplicate checkout requests.
* Checkout retries.
* Payment failures.
* Order cancellation.
* Reservation release.

Do not permanently reduce available inventory merely because an item was added to a cart.

Use explicit inventory state transitions.

---

# ORDER STATE MACHINE

Implement explicit order lifecycle rules.

At minimum, support a model capable of representing states such as:

* Pending.
* Awaiting payment.
* Paid.
* Processing.
* Partially fulfilled.
* Fulfilled.
* Delivered.
* Cancelled.
* Partially cancelled.
* Refund pending.
* Refunded.
* Completed.

Use the exact repository/domain model when one already exists, but enforce explicit valid transitions.

Prevent arbitrary state mutation through generic update endpoints.

State transitions must be validated server-side.

---

# ORDER ITEM STATE

Order items may have lifecycle states independent from the overall customer order.

Support the architecture necessary for:

* Pending.
* Confirmed.
* Processing.
* Shipped.
* Delivered.
* Cancelled.
* Returned.
* Refunded.

Seller fulfillment boundaries must be respected.

A seller must not be able to modify another seller's order items.

---

# PAYMENT ARCHITECTURE

Implement a provider-agnostic payment foundation.

Core business logic must not depend directly on Stripe-specific objects everywhere.

Define a payment abstraction capable of supporting:

* Payment intent creation.
* Payment confirmation.
* Payment status retrieval.
* Payment cancellation.
* Refund creation.
* Refund status retrieval.
* Provider webhook processing.
* Provider-specific identifiers.
* Provider failure codes.
* Idempotency keys.

The payment domain must own business payment state.

The payment provider must not become the source of truth for marketplace order state.

---

# PAYMENT STATE MACHINE

Implement explicit payment states.

Support the repository's appropriate equivalent of:

* Created.
* Pending.
* Requires action.
* Authorized.
* Succeeded.
* Failed.
* Cancelled.
* Partially refunded.
* Refunded.

Validate every transition.

Prevent impossible transitions.

Never allow an API client to directly mark an order as paid.

Payment success must come from a trusted payment workflow.

---

# PAYMENT INTENTS

Implement payment-intent handling appropriate to the marketplace checkout architecture.

A payment intent must contain sufficient information to correlate:

* Customer.
* Order.
* Currency.
* Amount.
* Provider.
* Provider payment ID.
* Idempotency identity.
* Current payment state.

The backend must calculate and persist the authoritative amount before initiating payment.

Do not trust a client-provided payment amount.

---

# PAYMENT IDEMPOTENCY

Every payment operation that can create financial side effects must support idempotency.

Protect against:

* Client retries.
* Network retries.
* Duplicate webhook deliveries.
* Worker retries.
* Application restarts.
* Provider retry behavior.

Repeated processing of the same logical payment operation must not create duplicate financial effects.

Persist durable idempotency information where required.

Do not rely exclusively on in-memory locks.

---

# PAYMENT WEBHOOKS

Implement secure payment webhook processing.

Validate provider signatures using secure configuration.

Reject:

* Invalid signatures.
* Malformed payloads.
* Unsupported event types.
* Unauthorized requests.

Webhook processing must be idempotent.

Persist provider event identifiers where required to prevent duplicate processing.

Do not assume webhook delivery occurs exactly once.

Do not perform expensive processing synchronously inside the webhook endpoint when asynchronous processing is more appropriate.

Acknowledge valid events reliably while ensuring durable processing state.

---

# REFUNDS

Implement refund foundations.

Support:

* Full refunds.
* Partial refunds where the business rules permit.
* Refund reason.
* Refund amount.
* Currency.
* Payment association.
* Order association.
* Provider refund ID.
* Refund state.
* Idempotency.

Refunds must never exceed the refundable amount.

Refund calculations must account for:

* Previous refunds.
* Partial refunds.
* Order/item boundaries.
* Payment state.

Do not allow clients to arbitrarily choose refund amounts without server-side authorization and validation.

---

# FINANCIAL INTEGRITY

All commerce calculations must be deterministic and auditable.

Maintain clear relationships among:

* Subtotal.
* Discounts.
* Shipping.
* Taxes where applicable.
* Fees where applicable.
* Total.
* Payment amount.
* Refund amount.

Ensure:

`subtotal - discounts + applicable charges = authoritative total`

subject to the marketplace's explicit tax, shipping, and fee model.

Never silently round money.

Define currency and rounding behavior explicitly.

---

# TRANSACTIONAL OUTBOX

Use a transactional outbox mechanism for business events where required to guarantee consistency between database state changes and asynchronous event publication.

For example, order creation should not commit the order while silently losing its required event.

The outbox record must be persisted atomically with the relevant database transaction.

A worker or publisher must safely process outbox records.

Processing must tolerate:

* Duplicate delivery.
* Worker crashes.
* Retries.
* Temporary broker/queue failures.

---

# COMMERCE EVENTS

Implement strongly typed events for relevant operations, such as:

* CartUpdated.
* InventoryReserved.
* InventoryReservationReleased.
* CheckoutStarted.
* OrderCreated.
* OrderPaymentPending.
* OrderPaid.
* OrderPaymentFailed.
* OrderCancelled.
* RefundCreated.
* RefundSucceeded.
* RefundFailed.
* PromotionRedeemed.

Use versioned event contracts.

Do not place sensitive payment credentials or unnecessary personal information in event payloads.

---

# BACKGROUND JOBS

Implement background jobs where asynchronous processing is appropriate.

Potential workloads include:

* Expiring inventory reservations.
* Publishing outbox events.
* Processing payment-related asynchronous workflows.
* Releasing abandoned checkout reservations.
* Coupon usage reconciliation.
* Promotion usage processing.
* Commerce notifications.
* Cleanup.

Every job must define:

* Payload.
* Purpose.
* Retry strategy.
* Backoff.
* Timeout.
* Concurrency.
* Idempotency.
* Failure behavior.
* Observability.

---

# NOTIFICATIONS FOUNDATION

Integrate commerce events with the notification architecture without building frontend notification UI.

Support the backend foundation required for notifications such as:

* Order created.
* Payment succeeded.
* Payment failed.
* Order cancelled.
* Refund initiated.
* Refund completed.

Do not block critical transactional operations on non-critical notification delivery.

Notification delivery must be asynchronous where appropriate.

---

# CUSTOMER ORDER ACCESS

Customers may only retrieve and mutate orders they own.

Implement authorization checks for:

* Order retrieval.
* Order item retrieval.
* Cancellation where allowed.
* Payment information.
* Refund information.
* Shipment information.

Do not expose another customer's order data through predictable IDs.

---

# SELLER ORDER ACCESS

Seller users may only access order data belonging to their authorized seller organization.

Seller APIs must prevent:

* Cross-seller order access.
* Cross-seller item modification.
* Unauthorized cancellation.
* Unauthorized pricing manipulation.
* Unauthorized refund manipulation.
* Unauthorized customer-data access.

Expose only customer information required for legitimate fulfillment operations.

Minimize unnecessary personal-data exposure to sellers.

---

# CUSTOMER DATA PROTECTION

Protect personal data contained in:

* Orders.
* Addresses.
* Payments.
* Customer profiles.

Apply data minimization.

Do not expose:

* Full payment credentials.
* Provider secrets.
* Internal fraud/security metadata.
* Unnecessary customer information.

Logs, events, audit records, and API responses must use appropriate redaction.

---

# API CONTRACTS

Implement stable REST APIs for the functionality in this volume.

Document:

* Authentication.
* Authorization.
* Request bodies.
* Response DTOs.
* Validation.
* Error responses.
* Pagination.
* Idempotency requirements.
* Relevant headers.
* Webhook behavior.

Potential endpoint areas include:

* `/cart`
* `/cart/items`
* `/checkout`
* `/orders`
* `/orders/:id`
* `/payments`
* `/payments/:id`
* `/refunds`
* `/promotions`
* `/coupons`

Use the repository's established routing conventions when they already exist.

Do not create duplicate endpoints for an existing capability.

---

# IDEMPOTENCY API DESIGN

Implement idempotency for operations capable of causing side effects.

At minimum, consider:

* Checkout creation.
* Order creation.
* Payment creation.
* Refund creation.
* Coupon redemption.
* Inventory reservation.

Idempotency keys must be scoped appropriately.

The same key must not accidentally suppress unrelated operations.

Persist enough information to safely replay or return the original operation result.

---

# RATE LIMITING

Protect commerce endpoints against abuse.

Apply appropriate controls to:

* Coupon validation.
* Coupon redemption.
* Checkout.
* Payment creation.
* Refund requests.
* Cart mutation.
* Order operations.

Do not allow rate limiting to become a substitute for authorization.

---

# SECURITY

Perform a security review of every commerce workflow.

Protect against:

* Price manipulation.
* Quantity manipulation.
* Seller-ID manipulation.
* Coupon abuse.
* Promotion abuse.
* Payment tampering.
* Refund abuse.
* Order-ID enumeration.
* IDOR.
* Replay attacks.
* Webhook forgery.
* Race conditions.
* Double charging.
* Double refunding.
* Inventory overselling.
* Privilege escalation.

Never trust:

* Client totals.
* Client discounts.
* Client seller identifiers.
* Client inventory availability.
* Client payment status.
* Client order status.

Recalculate and verify all authoritative business state server-side.

---

# OBSERVABILITY

Instrument commerce operations with structured logs, metrics, and traces.

Capture useful signals such as:

* Cart mutation latency.
* Checkout attempts.
* Checkout failures.
* Inventory reservation failures.
* Order creation rate.
* Order creation failures.
* Payment intent failures.
* Payment success rate.
* Payment webhook processing latency.
* Refund failures.
* Queue retry counts.
* Outbox processing latency.
* Idempotency conflicts.
* Promotion/coupon failures.

Use correlation and trace identifiers across:

* HTTP requests.
* Database operations.
* Redis.
* Queue jobs.
* Payment providers.
* Domain events.

Never log payment credentials or sensitive secrets.

---

# RELIABILITY

Design for partial failure.

Explicitly handle:

* PostgreSQL failure.
* Redis failure.
* Payment provider timeout.
* Payment provider outage.
* Duplicate payment requests.
* Duplicate webhook events.
* Queue failure.
* Worker crash.
* Network timeout.
* Application restart.
* Reservation expiration.
* Checkout retry.

Use:

* Timeouts.
* Retries.
* Exponential backoff.
* Idempotency.
* Durable state.
* Reconciliation.
* Dead-letter/recovery mechanisms.

Never assume an external provider response is received exactly once.

---

# TESTING

Implement comprehensive tests.

## Unit Tests

Cover:

* Pricing calculations.
* Promotion rules.
* Coupon rules.
* Cart rules.
* Checkout validation.
* Order state transitions.
* Payment state transitions.
* Refund calculations.
* Idempotency behavior.

## Integration Tests

Cover:

* PostgreSQL transactions.
* Cart persistence.
* Checkout persistence.
* Inventory reservations.
* Order creation.
* Payment persistence.
* Refund persistence.
* Outbox behavior.
* Redis-backed functionality.
* Queue processing.

## API Tests

Cover:

* Customer access.
* Seller access.
* Unauthorized access.
* Invalid checkout.
* Invalid coupon.
* Invalid promotion.
* Payment creation.
* Duplicate payment requests.
* Refund authorization.
* Pagination.
* Error contracts.

## Webhook Tests

Cover:

* Valid signature.
* Invalid signature.
* Duplicate event.
* Unsupported event.
* Provider failure.
* Retry behavior.

## Concurrency Tests

Explicitly test:

* Two customers purchasing the final inventory.
* Duplicate checkout requests.
* Duplicate payment requests.
* Duplicate refund requests.
* Concurrent coupon redemption.
* Concurrent cart updates.

Prove that financial and inventory invariants remain correct.

---

# DATABASE VALIDATION

Validate all schema changes.

Run:

* Prisma validation.
* Migration validation.
* TypeScript compilation.
* Linting.
* Unit tests.
* Integration tests.
* API tests.
* Concurrency tests.

Verify that:

* Unique constraints work.
* Foreign keys work.
* Monetary precision is correct.
* State transitions are enforced.
* Idempotency constraints work.
* Refund limits are enforced.
* Coupon usage limits are concurrency-safe.

Do not modify historical migrations destructively.

---

# DOCUMENTATION

Update documentation for:

* Cart APIs.
* Checkout APIs.
* Order APIs.
* Payment APIs.
* Refund APIs.
* Promotion APIs.
* Coupon APIs.
* Idempotency requirements.
* Webhook contracts.
* Commerce events.
* Background jobs.
* Database changes.
* Environment variables.

Swagger/OpenAPI must match the implementation.

Document important financial and transactional invariants.

---

# IMPLEMENTATION BOUNDARIES

This volume is backend-only.

Do not implement:

* Web UI.
* Mobile UI.
* React components.
* React Native screens.
* Tailwind styling.
* Frontend state stores.

Do not implement unrelated infrastructure changes.

Do not redesign the entire architecture.

Do not replace compatible existing modules unnecessarily.

Do not introduce speculative abstractions.

---

# ABSOLUTE IMPLEMENTATION RULES

You must not:

* Generate pseudo-code.
* Leave placeholder implementations.
* Leave TODO/FIXME gaps for required functionality.
* Use fake payment success behavior as production logic.
* Trust client-supplied financial totals.
* Trust client-supplied order status.
* Trust client-supplied payment status.
* Hardcode payment credentials.
* Store raw payment credentials.
* Ignore concurrency.
* Ignore idempotency.
* Create duplicate transactional side effects.
* Disable security controls to make tests pass.
* Suppress compiler errors without fixing their causes.
* Break existing working functionality unnecessarily.
* Use “implement similarly.”
* Use “remaining code omitted.”
* Use “left as an exercise.”
* Use “for brevity.”

Every required implementation must be complete, integrated, type-safe, testable, and operationally observable.

---

# REPOSITORY COMPATIBILITY

Inspect and follow the repository's existing:

* Module structure.
* Naming conventions.
* Prisma conventions.
* API conventions.
* Authentication model.
* Authorization model.
* Event model.
* Queue model.
* Testing conventions.
* Error handling.
* Logging.
* Configuration.

Reuse existing infrastructure when compatible.

When an existing implementation is incomplete, improve it rather than creating competing infrastructure.

Maintain backward compatibility whenever practical.

Update all affected callers and tests when a contract must change.

---

# VALIDATION AND COMPLETION

Before considering this volume complete:

1. Inspect the repository.
2. Implement the commerce domains.
3. Validate database schema.
4. Validate migrations.
5. Compile/typecheck the backend.
6. Run linting.
7. Run unit tests.
8. Run integration tests.
9. Run API tests.
10. Run webhook tests.
11. Run concurrency tests.
12. Verify payment idempotency.
13. Verify refund idempotency.
14. Verify inventory reservation correctness.
15. Verify coupon usage limits.
16. Verify seller/customer authorization.
17. Verify event and outbox behavior.
18. Verify queue retry behavior.
19. Verify no secrets were introduced.
20. Verify API documentation.
21. Verify existing functionality remains operational.

Fix implementation-caused failures before reporting completion.

If an environmental limitation prevents a test, clearly identify it and execute every other possible validation.

---

# IMPLEMENTATION REPORT

At completion, provide a concise engineering report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file and summarize the reason.

## Database Changes

Describe:

* Tables/models.
* Relations.
* Indexes.
* Constraints.
* Migrations.
* Transactional behavior.

## Commerce APIs

List implemented endpoints and their purpose.

## Pricing and Promotions

Describe pricing, discount, coupon, and promotion behavior.

## Cart and Checkout

Describe cart, checkout, inventory reservation, and multi-seller behavior.

## Orders

Describe order and order-item state handling.

## Payments and Refunds

Describe:

* Provider abstraction.
* Payment state machine.
* Webhooks.
* Idempotency.
* Refund behavior.

## Events and Queues

List:

* Events.
* Outbox records.
* Jobs.
* Retry behavior.
* Failure handling.

## Tests

List all tests added.

## Validation Results

Report:

* Typecheck/compile.
* Lint.
* Unit tests.
* Integration tests.
* API tests.
* Webhook tests.
* Concurrency tests.
* Migration validation.

Clearly identify any unavailable validation and its exact reason.

## Operational Notes

Document required configuration, external provider setup, queue workers, and database requirements.

---

# FINAL DIRECTIVE

Implement this commerce backend volume directly in the repository.

Inspect the actual repository before modifying it.

Build real production-grade pricing, cart, checkout, multi-seller order, payment, refund, promotion, coupon, event, and queue functionality.

Preserve transactional integrity.

Make financial operations deterministic and idempotent.

Make inventory reservations concurrency-safe.

Protect customers, sellers, payments, and order data.

Treat external payment providers as dependencies rather than authoritative marketplace state.

Use PostgreSQL as the authoritative transactional source.

Use durable state, transactional outbox patterns, asynchronous processing, retries, observability, and reconciliation where required.

Do not stop at scaffolding.

Do not provide pseudo-code.

Do not leave required functionality incomplete.

Compile, test, validate, integrate, and report the completed implementation.
