# Amazon Ecommerce Marketplace — Backend Prompt — Volume 4

## Role

You are the senior backend engineering team responsible for implementing the next production-grade implementation unit of an original Amazon-style ecommerce marketplace.

Act as:

* Principal Software Architect
* Staff Backend Engineer
* Database Architect
* Distributed Systems Engineer
* Payment Systems Engineer
* Security Engineer
* QA Engineer
* DevOps Engineer

This is an implementation task, not a tutorial.

You must inspect the actual repository and implement real, production-quality changes.

---

# 1. Project Context

Build an original production-grade ecommerce marketplace supporting:

* customers
* products
* product variants
* SKUs
* sellers
* seller offers
* pricing
* promotions
* inventory
* carts
* checkout
* orders
* payments
* fulfillment
* shipping
* returns
* refunds
* reviews
* search
* notifications
* administration
* analytics

Technology baseline:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* BullMQ
* AWS S3
* AWS CloudFront
* Stripe
* REST
* OpenAPI / Swagger
* Webhooks
* Kafka/Redpanda where justified
* Docker
* Terraform/OpenTofu
* AWS
* Kubernetes where justified

Architectural principles:

* Clean Architecture
* Domain-Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Explicit bounded contexts
* Strong typing
* Transactional consistency
* Idempotency
* Server-side authorization
* Production-grade observability and reliability

The actual repository is the source of truth.

---

# 2. Repository-First Requirement

Before making changes:

1. Inspect the repository.
2. Inspect the backend structure.
3. Inspect Prisma schema and migrations.
4. Inspect existing authentication and authorization.
5. Inspect Customer, Product, SKU, SellerOffer, Pricing, Inventory, Reservation, and Cart implementations.
6. Inspect API conventions.
7. Inspect existing transaction helpers.
8. Inspect Redis infrastructure.
9. Inspect outbox/event infrastructure.
10. Inspect BullMQ infrastructure.
11. Inspect Stripe configuration if already present.
12. Inspect existing tests.
13. Inspect configuration/environment management.
14. Inspect documentation.

Do not assume previous functionality exists simply because it is described here.

Reuse compatible existing implementations.

Do not create duplicate entities, services, repositories, controllers, migrations, or event systems.

If the repository differs from this specification, analyze the actual implementation and make the smallest safe change necessary.

---

# 3. Scope of This Volume

Implement the production-grade backend foundation for:

1. Checkout
2. Checkout sessions
3. Cart-to-checkout validation
4. Checkout pricing
5. Promotions/coupons integration
6. Tax calculation boundary
7. Shipping-selection boundary
8. Inventory reservation integration
9. Order creation
10. Order aggregate
11. Order items
12. Immutable order snapshots
13. Order totals
14. Order state machine
15. Order status history
16. Order idempotency
17. Checkout failure recovery
18. Checkout expiration
19. Checkout/order events
20. Checkout background jobs
21. Customer order APIs
22. Administrative/seller order access boundaries
23. Security
24. Observability
25. Automated testing

Do not implement the complete fulfillment, shipping execution, returns, reviews, notifications, or analytics systems in this volume.

Payments must be integrated only to the extent required to establish a correct checkout/order/payment boundary. The complete payment lifecycle and Stripe production integration should be completed in the dedicated payment implementation unit.

---

# 4. Checkout Domain

Create or extend an explicit Checkout bounded context.

Checkout is the orchestration boundary between:

* Customer
* Cart
* Catalog
* SellerOffer
* Pricing
* Promotion
* Inventory
* Address
* Tax
* Shipping
* Payment
* Order

Checkout must never trust client-provided:

* prices
* discounts
* totals
* inventory
* seller identity
* tax
* shipping costs

All authoritative values must be derived server-side.

---

# 5. Checkout Session

Implement a durable CheckoutSession where appropriate.

A checkout session should track:

* ID
* customer
* source cart
* status
* currency
* billing address reference/snapshot
* shipping address reference/snapshot
* selected shipping option where applicable
* pricing snapshot
* totals
* inventory reservation references
* expiration timestamp
* idempotency information
* timestamps

Possible lifecycle states may include:

* ACTIVE
* VALIDATING
* AWAITING_PAYMENT
* PAYMENT_PROCESSING
* COMPLETED
* FAILED
* EXPIRED
* CANCELLED

Use the repository's conventions if equivalent states already exist.

Do not introduce unnecessary state complexity.

---

# 6. Checkout State Machine

Implement explicit state transitions.

Do not allow arbitrary status mutation.

For every transition define:

* current state
* allowed next state
* triggering operation
* authorization
* transactional requirements
* emitted events
* failure behavior

Invalid transitions must fail deterministically.

Never allow clients to submit an arbitrary desired order status.

---

# 7. Checkout Initialization

Implement checkout initialization from a valid cart.

The process must:

1. Authenticate customer.
2. Load authoritative cart.
3. Validate cart ownership.
4. Validate cart items.
5. Revalidate product/SKU/offer state.
6. Recalculate authoritative prices.
7. Validate promotions.
8. Validate inventory.
9. Validate address requirements.
10. Establish shipping/tax calculation boundaries.
11. Create checkout session.
12. Create required reservation intent/reservations according to the inventory architecture.
13. Persist all authoritative state transactionally where applicable.
14. Return the checkout representation.

Do not perform external network calls inside a long database transaction.

---

# 8. Checkout Revalidation

Checkout data can become stale.

Before order creation, revalidate:

* offer status
* seller status
* product visibility
* price
* promotion validity
* coupon validity
* inventory
* reservation state
* customer address
* shipping selection
* tax calculation
* currency
* quantity constraints

If anything changed, return structured checkout validation errors.

Do not silently create an order with stale data.

---

# 9. Pricing Snapshot

At checkout, create an authoritative pricing snapshot.

The snapshot must preserve the exact values used to create the order.

Capture appropriate information such as:

* SKU/offer identity
* seller
* quantity
* unit price
* line subtotal
* promotion discount
* coupon discount
* tax
* shipping amount
* total

Use exact monetary representation.

Do not use floating-point arithmetic.

The snapshot becomes immutable once the order is created.

---

# 10. Money and Currency

Use the repository's established money representation.

If not already established, use an integer minor-unit or equivalent exact representation.

Every monetary value must have explicit currency semantics.

Do not mix currencies without explicit conversion rules.

Do not calculate monetary totals using JavaScript floating-point arithmetic.

Use deterministic rounding rules.

---

# 11. Promotion Integration

Integrate checkout with the existing promotion domain.

Validate:

* promotion lifecycle
* date window
* customer eligibility
* seller ownership
* product/SKU eligibility
* minimum purchase requirements
* maximum discount
* usage limits
* stacking rules
* priority
* currency

Promotions must be recalculated server-side.

Do not trust a promotion ID sent by a client as proof of eligibility.

---

# 12. Coupon Integration

Integrate coupon validation with checkout.

Protect against:

* expired coupons
* inactive coupons
* seller ownership violations
* customer eligibility violations
* usage limit violations
* duplicate redemption
* brute-force coupon enumeration
* race conditions around redemption

Coupon redemption must be transactionally safe.

Do not mark a coupon as consumed before the authoritative order lifecycle requires it.

If the architecture uses reservation-style coupon usage, implement it explicitly.

---

# 13. Tax Boundary

Implement a tax calculation abstraction.

The abstraction must support:

* taxable items
* shipping tax where applicable
* customer/shipping jurisdiction
* seller context
* currency
* tax amount
* tax calculation version/reference

Do not hardcode jurisdiction-specific tax rules throughout the checkout service.

If no external tax provider is configured, implement the repository's supported deterministic tax strategy rather than inventing a production provider integration.

Keep the tax provider boundary extensible.

---

# 14. Shipping Boundary

Create a shipping calculation/selection abstraction.

It should support:

* eligible shipping options
* estimated delivery information
* shipping cost
* seller/fulfillment constraints
* destination
* package/order context

Do not implement the complete fulfillment engine here.

Do not pretend to know carrier rates without a configured provider.

Use deterministic development behavior only where the repository explicitly supports it.

---

# 15. Inventory Reservation Integration

Checkout must integrate with the inventory reservation system.

Ensure:

* required quantities are reserved
* reservations are tied to the correct checkout context
* reservations expire
* duplicate reservation attempts are safe
* failed checkout does not leak reservations
* completed order consumes the appropriate reservations
* cancelled/expired checkout releases reservations

Do not implement an alternative inventory reservation system.

Use the actual inventory implementation in the repository.

---

# 16. Checkout Concurrency

Protect against:

* double checkout
* simultaneous checkout sessions from the same cart
* stale carts
* stale reservations
* price changes
* inventory races
* repeated order creation requests

Use:

* database transactions
* unique constraints
* idempotency
* optimistic concurrency where appropriate
* existing inventory locking mechanisms

Do not depend on frontend state to prevent duplicate checkout.

---

# 17. Order Domain

Implement or extend an explicit Order bounded context.

The order is the durable commercial record.

Once created, the order must not depend on mutable product/catalog/pricing state to determine what the customer purchased.

---

# 18. Order Aggregate

Implement an Order aggregate containing appropriate concepts such as:

* order ID
* public order number/reference
* customer
* currency
* status
* totals
* billing information
* shipping information
* order items
* payment reference
* fulfillment reference where applicable
* timestamps

Use immutable snapshots for customer-facing commercial information.

---

# 19. Order Items

Each OrderItem must capture the exact purchased state.

At minimum preserve:

* product identity/reference
* SKU
* seller
* seller offer
* product name snapshot
* SKU/variant information snapshot where required
* unit price
* quantity
* discounts
* tax
* line subtotal
* line total
* currency

Do not rely on future product changes to reconstruct an old order.

---

# 20. Address Snapshots

Orders must preserve the address used at purchase time.

Do not reference only a mutable CustomerAddress record.

Capture the appropriate snapshot fields required by the business and legal model.

Address changes after purchase must not alter historical orders.

Protect address information from unnecessary API exposure.

---

# 21. Seller Snapshot

For marketplace orders, preserve the seller identity and relevant commercial information needed for historical order representation.

Do not allow later seller profile changes to corrupt historical order data.

Respect seller data isolation.

---

# 22. Order Totals

Persist authoritative order totals.

The order must preserve:

* subtotal
* discount total
* shipping total
* tax total
* grand total
* currency

Ensure:

`grand total = subtotal - discounts + shipping + tax`

or the repository's explicitly defined formula.

Validate the invariant server-side.

Never accept a client-provided grand total.

---

# 23. Order Number

Provide a customer-friendly order number separate from internal database identifiers where appropriate.

Requirements:

* uniqueness
* safe generation
* no predictable database sequence leakage if the architecture requires opaque public references
* support for search and customer support workflows

Do not expose internal primary keys unnecessarily.

---

# 24. Order State Machine

Implement an explicit order lifecycle.

Possible states may include:

* PENDING
* PAYMENT_PENDING
* CONFIRMED
* PROCESSING
* PARTIALLY_FULFILLED
* FULFILLED
* CANCELLED
* COMPLETED

Only implement states required by the actual architecture.

Do not allow arbitrary transitions.

Future fulfillment/payment modules must be able to extend the lifecycle safely.

---

# 25. Order Status History

Implement immutable order status history.

Record:

* order ID
* previous status
* new status
* actor/source
* reason
* correlation ID
* timestamp

Do not modify historical status records.

This provides an audit trail for customer support and operational investigation.

---

# 26. Order Creation

Order creation must be atomic with respect to authoritative order state.

The process should:

1. Validate checkout session.
2. Revalidate required commercial data.
3. Validate inventory reservations.
4. Calculate final authoritative totals.
5. Create order.
6. Create immutable order items.
7. Create address/seller/pricing snapshots.
8. Transition checkout state.
9. Consume or associate inventory reservations according to the architecture.
10. Record status history.
11. Create required outbox events.
12. Commit.

Do not publish an order-created event before the transaction commits.

---

# 27. Order Idempotency

Order creation must be idempotent.

A repeated request caused by:

* browser retry
* mobile retry
* network timeout
* gateway retry
* client reconnect

must not create duplicate orders.

Use the existing idempotency infrastructure.

A reused idempotency key with a different payload must be rejected.

---

# 28. Cart Conversion

After successful order creation:

* mark the cart appropriately
* prevent accidental reuse as an active purchase cart
* preserve required historical references
* avoid deleting data needed for order/audit history

If the repository architecture creates a new cart automatically for the customer, implement that behavior consistently.

---

# 29. Checkout Failure Recovery

Handle failures at every stage.

Examples:

* insufficient inventory
* reservation expired
* promotion changed
* coupon invalidated
* tax calculation failure
* shipping calculation failure
* database conflict
* duplicate request
* payment boundary failure

Ensure resources are not leaked.

In particular:

* do not leave stale active reservations
* do not create incomplete orders
* do not mark carts converted prematurely
* do not consume inventory incorrectly

---

# 30. Checkout Expiration

Checkout sessions must expire.

Implement BullMQ processing for expired sessions where appropriate.

Expiration must:

* identify expired sessions
* release associated inventory reservations
* transition checkout safely
* remain idempotent
* tolerate retries
* avoid affecting completed orders
* emit appropriate events
* produce metrics

---

# 31. Payment Boundary

Create a clean payment boundary without duplicating the full payment system.

The checkout/order implementation must be able to represent:

* payment required
* payment pending
* payment succeeded
* payment failed
* payment cancelled

The actual Stripe payment orchestration should integrate through a dedicated payment service/module.

Do not treat a client-side payment success response as authoritative.

Do not mark an order paid merely because the frontend reports success.

---

# 32. Payment Security Boundary

Any payment result must ultimately be verified server-side.

Use secure server-side provider communication and webhook confirmation when the payment implementation exists.

Never accept:

* client-provided payment status
* client-provided Stripe event status
* arbitrary transaction IDs
* arbitrary amount confirmation

without authoritative verification.

---

# 33. Customer Order APIs

Implement appropriate customer-facing APIs for:

* creating checkout
* retrieving checkout
* validating checkout
* updating supported checkout information
* creating order
* retrieving order
* listing customer orders
* retrieving order status/history where permitted

Customers must only access their own orders.

---

# 34. Seller Order Access

Create seller-scoped order access where the marketplace architecture requires it.

Seller users must only see order information necessary for their own seller items.

Do not expose:

* unrelated seller items
* unnecessary customer information
* payment secrets
* internal platform data

Seller order projections should respect strict authorization boundaries.

---

# 35. Administrative Order Access

Administrative access must use explicit permissions.

Do not treat every authenticated user as an administrator.

Use existing role/permission infrastructure.

Administrative endpoints must be separately protected and audited.

---

# 36. API Design

Follow existing REST conventions.

Use explicit DTOs.

Do not expose Prisma entities directly.

Use appropriate:

* HTTP methods
* HTTP status codes
* pagination
* filtering
* sorting
* error codes
* authentication
* authorization
* idempotency headers

Avoid creating multiple endpoints that expose the same behavior with inconsistent contracts.

---

# 37. Error Contracts

Use the existing standardized error format.

Add appropriate domain errors such as:

* CHECKOUT_NOT_FOUND
* CHECKOUT_EXPIRED
* CHECKOUT_INVALID
* CHECKOUT_ALREADY_COMPLETED
* CHECKOUT_PRICE_CHANGED
* CHECKOUT_INVENTORY_CHANGED
* CHECKOUT_RESERVATION_INVALID
* ORDER_NOT_FOUND
* ORDER_ALREADY_CREATED
* ORDER_INVALID_STATE
* ORDER_ACCESS_DENIED
* PAYMENT_REQUIRED
* PROMOTION_INVALID
* COUPON_INVALID

Reuse equivalent existing errors when already present.

Do not expose raw database/provider exceptions.

---

# 38. Events

Integrate with the existing event/outbox system.

Potential events:

* checkout.created
* checkout.validated
* checkout.expired
* checkout.cancelled
* order.created
* order.confirmed
* order.cancelled
* order.status.changed
* order.payment.pending
* order.payment.confirmed
* order.payment.failed

Use the repository's event naming conventions where they already exist.

Every event must have a consistent envelope containing appropriate:

* event ID
* event type
* version
* aggregate ID
* aggregate type
* producer
* timestamp
* correlation ID
* causation ID
* trace context
* payload

---

# 39. Event Ordering

Define ordering requirements for:

* checkout lifecycle
* order lifecycle
* payment state
* inventory consumption

Do not assume global ordering.

Use aggregate-based partitioning where Kafka/Redpanda is used.

Consumers must tolerate duplicate events.

---

# 40. Redis

Use Redis only for appropriate ephemeral/accelerating concerns.

Potential uses:

* checkout lookup cache where justified
* short-lived validation cache
* rate limiting
* distributed coordination
* temporary session state

PostgreSQL remains authoritative for:

* checkout
* order
* payment state
* inventory
* cart

Define:

* key namespaces
* TTL
* invalidation
* stale behavior
* failure behavior

---

# 41. Background Jobs

Implement appropriate BullMQ jobs for:

* checkout expiration
* reservation cleanup integration
* failed asynchronous processing
* order event processing where appropriate

Every job must define:

* payload
* retry strategy
* backoff
* timeout
* concurrency
* idempotency
* failure handling
* observability

---

# 42. Database Constraints

Use Prisma migrations to establish:

* order uniqueness
* order number uniqueness
* checkout ownership
* valid foreign keys
* appropriate indexes
* status/history relationships
* idempotency uniqueness
* order-item relationships
* seller/order relationships
* payment references where appropriate

Use database constraints for critical invariants wherever practical.

---

# 43. Transaction Boundaries

Use transactions for:

* checkout creation where multiple authoritative records are created
* checkout validation state changes
* order creation
* cart conversion
* reservation consumption integration
* order status transitions
* idempotency state changes
* outbox insertion

Do not perform slow external calls inside critical database transactions.

---

# 44. Security

Threat-model the checkout/order implementation.

Protect against:

* order IDOR
* checkout IDOR
* seller order isolation bypass
* price manipulation
* discount manipulation
* coupon abuse
* inventory manipulation
* replay
* duplicate order creation
* privilege escalation
* unauthorized cancellation
* unauthorized status changes
* payment-status spoofing
* sensitive customer-data exposure

All authorization must be server-side.

---

# 45. Order Cancellation Boundary

Implement only the cancellation foundation required by this volume.

Define:

* which states can be cancelled
* who may request cancellation
* how cancellation affects checkout/inventory
* how status history is recorded
* how events are emitted

Do not implement the complete returns/refunds workflow here.

Where payment reversal is required, create a clean integration boundary for the dedicated payment/returns implementation.

---

# 46. Privacy

Minimize customer data returned through APIs.

Differentiate:

* customer view
* seller view
* administrator view

Do not expose unnecessary:

* addresses
* contact details
* payment information
* internal IDs
* security information

Respect privacy requirements across:

* API responses
* logs
* events
* audit records
* caches
* background jobs

---

# 47. Observability

Instrument:

### Checkout

* initialization latency
* validation failures
* expiration
* reservation failures
* price changes
* coupon failures
* checkout conversion

### Orders

* order creation latency
* order creation failures
* state transitions
* cancellation
* duplicate/idempotent requests

### Jobs

* checkout expiration
* cleanup
* event processing

Trace critical paths across:

* HTTP
* PostgreSQL
* Redis
* BullMQ
* event infrastructure
* payment boundary

Never log secrets or unnecessary customer data.

---

# 48. Audit

Audit:

* order creation
* administrative order actions
* seller order access where appropriate
* order cancellation
* manual state changes
* checkout security-sensitive operations

Audit records must be immutable.

---

# 49. Testing

Implement comprehensive tests.

## Unit Tests

Test:

* checkout state machine
* order state machine
* price calculations
* discount calculations
* coupon eligibility
* tax abstraction
* shipping abstraction
* checkout validation
* order totals
* cancellation rules

## Integration Tests

Test:

* checkout persistence
* inventory reservation integration
* order creation
* cart conversion
* idempotency
* transactions
* outbox creation
* checkout expiration

## API Tests

Test:

* customer checkout access
* customer order access
* seller order isolation
* admin authorization
* invalid state transitions
* validation errors
* pagination
* idempotency

## Security Tests

Explicitly test:

* another customer accessing checkout
* another customer accessing order
* seller accessing another seller's order
* customer accessing seller-only endpoints
* forged totals
* forged prices
* forged discounts
* forged payment status
* replayed order creation
* coupon abuse
* unauthorized cancellation

## Concurrency Tests

Test:

* two checkout attempts against one cart
* duplicate order creation
* simultaneous checkout validation
* reservation consumption races
* concurrent cancellation/state transitions

Verify no duplicate orders or inconsistent state are produced.

---

# 50. Performance

Review:

* customer order listing
* order retrieval
* checkout retrieval
* checkout validation
* order item loading
* seller order projections

Prevent:

* N+1 queries
* unbounded order retrieval
* excessive joins
* unnecessary relation loading

Use appropriate indexes and pagination.

---

# 51. API Documentation

Update OpenAPI/Swagger with:

* checkout endpoints
* order endpoints
* DTOs
* error codes
* authorization
* idempotency
* lifecycle states
* pagination
* cancellation rules

Document only implemented behavior.

---

# 52. Migration Safety

All schema changes must use safe Prisma migrations.

Before migration:

* inspect current schema
* preserve existing data
* avoid destructive operations
* verify indexes
* verify constraints
* verify foreign keys

Do not reset existing databases.

---

# 53. Backward Compatibility

Preserve existing APIs and domain behavior.

If contracts must change:

1. inspect repository consumers
2. make compatible changes where possible
3. update all consumers
4. add regression tests
5. document changes

Do not silently break catalog, seller, pricing, inventory, or cart behavior.

---

# 54. Documentation

Update relevant technical documentation covering:

* checkout lifecycle
* order lifecycle
* order snapshots
* idempotency
* reservation integration
* failure recovery
* API contracts
* authorization boundaries
* background jobs
* operational troubleshooting

Documentation must reflect actual implementation.

---

# 55. Explicitly Defer

Do not implement the complete:

* Stripe payment system
* payment webhook reconciliation
* fulfillment engine
* shipping carrier integrations
* returns system
* refund system
* review system
* notification system
* search system
* analytics system

unless an existing repository implementation requires a minimal integration change.

Create clean contracts for those future domains.

---

# 56. Implementation Requirements

You must:

1. Inspect the repository first.
2. Understand existing implementations.
3. Reuse compatible code.
4. Implement the entire checkout/order scope.
5. Create/update Prisma migrations.
6. Implement APIs.
7. Implement events.
8. Implement background jobs.
9. Implement authorization.
10. Implement idempotency.
11. Implement tests.
12. Update documentation.
13. Run formatting.
14. Run lint.
15. Run type checking.
16. Run tests.
17. Run build validation.
18. Validate migrations.
19. Verify no secrets were introduced.
20. Verify no placeholders remain.

Do not simply describe the implementation.

Actually modify the repository.

---

# 57. Final Validation

Verify:

### Checkout

* authoritative pricing
* inventory validation
* reservation integration
* promotion validation
* coupon validation
* expiration
* concurrency safety

### Orders

* immutable snapshots
* correct totals
* order number uniqueness
* valid state machine
* status history
* customer isolation
* seller isolation
* administrative authorization

### Reliability

* idempotent order creation
* retry-safe jobs
* transactional outbox
* safe failure recovery
* no leaked reservations

### Security

* no IDOR
* no price manipulation
* no total manipulation
* no payment-status spoofing
* no unauthorized cancellation
* no seller isolation bypass

### Testing

* unit tests pass
* integration tests pass
* API tests pass
* security tests pass
* concurrency tests pass

### Code Quality

* lint passes
* typecheck passes
* build passes
* migrations are valid
* no duplicate implementations exist

---

# 58. Final Report

When finished, report only facts about the actual repository.

Include:

1. Implemented checkout functionality.
2. Implemented order functionality.
3. Database models/migrations.
4. API endpoints.
5. Events.
6. BullMQ jobs.
7. Redis behavior.
8. Inventory integration.
9. Security controls.
10. Tests.
11. Validation commands and actual results.
12. Genuine remaining limitations/blockers.

Do not claim something is implemented unless it actually exists and was validated.

The repository is the final source of truth.

---

# 59. Non-Negotiable Rules

* No pseudo-code.
* No TODOs.
* No FIXME markers.
* No placeholder implementations.
* No fake payment/provider integrations.
* No invented external API behavior.
* No hardcoded production secrets.
* No frontend-only security.
* No client-trusted prices.
* No client-trusted totals.
* No client-trusted payment status.
* No arbitrary order state transitions.
* No duplicate order creation.
* No cross-customer order access.
* No cross-seller order access.
* No unnecessary regeneration of unchanged files.
* No competing implementations.
* No false completion claims.

Most importantly:

**Inspect the actual repository first, then implement the complete Checkout + Order backend implementation unit as a production-grade extension of the existing ecommerce marketplace.**
