# Amazon Ecommerce Marketplace — Backend Prompt — Volume 6

## Role

You are the senior backend engineering team responsible for implementing the production-grade fulfillment, shipping, returns, and post-order lifecycle subsystem of an original Amazon-style ecommerce marketplace.

Act as:

* Principal Software Architect
* Staff Backend Engineer
* Distributed Systems Engineer
* Fulfillment Systems Engineer
* Database Architect
* Security Engineer
* QA Engineer
* DevOps Engineer

This is an implementation task, not a tutorial.

You must inspect the actual repository and make real production-quality changes.

---

# 1. Project Context

Build an original production-grade ecommerce marketplace supporting:

* customers
* products
* variants
* SKUs
* sellers
* seller offers
* pricing
* promotions
* coupons
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
* Strong typing
* Explicit bounded contexts
* Transactional consistency
* Idempotency
* Server-side authorization
* Secure external integrations
* Production-grade observability and reliability

The actual repository is the source of truth.

---

# 2. Repository-First Requirement

Before modifying anything:

1. Inspect the complete repository.
2. Inspect backend modules and domain boundaries.
3. Inspect Prisma schema and migrations.
4. Inspect authentication and authorization.
5. Inspect Customer.
6. Inspect Seller.
7. Inspect Product/SKU/Offer.
8. Inspect Pricing.
9. Inspect Inventory and Reservations.
10. Inspect Cart.
11. Inspect Checkout.
12. Inspect Orders.
13. Inspect Payments and Refunds.
14. Inspect Stripe integration.
15. Inspect existing event/outbox infrastructure.
16. Inspect Redis.
17. Inspect BullMQ.
18. Inspect S3/media infrastructure.
19. Inspect API conventions.
20. Inspect tests.
21. Inspect configuration and environment handling.

Do not assume functionality exists merely because this prompt describes it.

Reuse compatible existing implementations.

Do not create duplicate models, services, repositories, queues, event systems, or APIs.

If existing implementation differs from this specification, preserve working behavior and make the smallest safe change necessary.

---

# 3. Scope of This Volume

Implement the production-grade backend subsystem for:

1. Fulfillment
2. Fulfillment groups
3. Shipment creation
4. Shipment items
5. Shipping addresses
6. Shipping methods
7. Tracking
8. Shipment lifecycle
9. Multi-seller order fulfillment
10. Seller fulfillment boundaries
11. Inventory-to-fulfillment integration
12. Order-to-shipment integration
13. Returns
14. Return requests
15. Return items
16. Return eligibility
17. Return state machine
18. Return inspection/outcome boundary
19. Refund integration
20. Inventory restoration for returns
21. Cancellation integration
22. Post-order lifecycle
23. Fulfillment background jobs
24. Tracking synchronization boundary
25. Fulfillment/return events
26. Security
27. Observability
28. Testing
29. Operational documentation

Do not implement reviews, notifications, search, or analytics in this volume except for minimal compatibility integrations.

---

# 4. Fulfillment Domain

Create or extend an explicit Fulfillment bounded context.

Fulfillment is responsible for converting confirmed orders into operational shipment units.

Do not make the Order aggregate responsible for all warehouse/shipping implementation details.

Keep:

* Order
* Payment
* Inventory
* Fulfillment
* Shipment
* Return

as distinct domain responsibilities.

---

# 5. Fulfillment Groups

Support orders containing:

* multiple sellers
* multiple SKUs
* multiple inventory locations
* potentially multiple shipments

A single customer order must not be assumed to equal one shipment.

Create a fulfillment-group abstraction where appropriate.

A fulfillment group should identify:

* order
* seller
* inventory location
* fulfillment status
* associated order items
* shipment relationship
* timestamps

Do not duplicate order-item ownership information unnecessarily.

---

# 6. Seller Fulfillment Isolation

Marketplace sellers must only access fulfillment data belonging to their own offers/order items.

Seller users must never be able to:

* inspect another seller's shipments
* modify another seller's fulfillment
* access unrelated customer data
* alter platform-owned fulfillment state

Use explicit authorization.

Do not rely on:

* seller ID in URLs
* frontend restrictions
* hidden UI elements

for security.

Validate seller ownership server-side for every seller operation.

---

# 7. Fulfillment State Machine

Implement an explicit fulfillment lifecycle.

Possible states:

* PENDING
* ALLOCATED
* READY
* PROCESSING
* SHIPPED
* PARTIALLY_SHIPPED
* DELIVERED
* CANCELLED
* FAILED

Use only states required by the actual architecture.

Define:

* valid transitions
* actor/source
* authorization
* side effects
* event emission
* failure behavior

Do not permit arbitrary state mutation.

---

# 8. Order Fulfillment Eligibility

A fulfillment operation must validate:

* order exists
* order is eligible for fulfillment
* payment state permits fulfillment
* order item is not already fulfilled
* inventory has been consumed/allocated appropriately
* seller is eligible
* fulfillment group is valid

Do not fulfill an unpaid or invalid order unless the business architecture explicitly permits a different payment model.

---

# 9. Inventory Integration

Integrate fulfillment with the existing inventory subsystem.

The implementation must distinguish:

* reserved inventory
* consumed inventory
* allocated inventory
* shipped inventory

Do not create a second inventory system.

Inventory consumption must occur exactly once.

Shipment cancellation or return must use explicit inventory operations.

Never directly manipulate inventory quantities from fulfillment code without going through the inventory domain contract.

---

# 10. Shipment Model

Implement or extend a Shipment model.

A shipment should capture appropriate information such as:

* shipment ID
* order ID
* fulfillment group
* seller where applicable
* origin location
* shipping address snapshot/reference
* shipping method
* carrier
* tracking number
* tracking URL where appropriate
* status
* shipped timestamp
* delivered timestamp
* estimated delivery
* timestamps

Protect sensitive information.

Do not expose internal operational fields to customers unnecessarily.

---

# 11. Shipment Items

Shipment items must reference order items.

Track:

* shipment
* order item
* quantity
* fulfillment state
* timestamps

A shipment must never contain a quantity greater than the unfulfilled quantity of its order item.

Prevent duplicate shipment allocation.

---

# 12. Partial Shipments

Support partial shipments where the marketplace architecture requires them.

Example:

An order contains:

* 3 units of SKU A
* 2 units of SKU B

SKU A may ship separately from SKU B.

The system must maintain:

* ordered quantity
* fulfilled quantity
* shipped quantity
* remaining quantity

Do not mark the entire order delivered when only one shipment is delivered.

---

# 13. Multi-Seller Orders

An order may contain products from multiple sellers.

The fulfillment subsystem must correctly isolate:

* seller fulfillment groups
* seller shipment data
* seller permissions
* customer-facing shipment representation
* platform-level order status

Do not assume one seller per order.

Do not expose one seller's commercial data to another seller.

---

# 14. Shipping Methods

Implement a shipping method abstraction.

A shipping method may include:

* code
* name
* carrier/service
* estimated delivery window
* price
* currency
* eligibility
* active/inactive state

Do not hardcode shipping behavior throughout the fulfillment system.

If a carrier integration is not yet configured, implement a provider boundary rather than inventing external carrier behavior.

---

# 15. Shipping Address

Shipments must preserve the address required for operational fulfillment.

Use the order's immutable shipping snapshot as the historical commercial source.

Do not allow later customer address edits to modify an already-created shipment.

Minimize exposure of sensitive address information.

---

# 16. Shipment Creation

Shipment creation must be transactional.

Validate:

1. order state
2. fulfillment group
3. seller ownership where applicable
4. order-item quantity
5. inventory/fulfillment eligibility
6. shipping method
7. destination
8. duplicate shipment risk

Then:

* create shipment
* create shipment items
* update fulfillment state
* create status history
* create outbox events

Do not publish shipment-created events before commit.

---

# 17. Shipment Idempotency

Shipment creation must be idempotent.

A retry must not create duplicate shipments.

Use:

* unique constraints
* deterministic fulfillment references
* application idempotency
* transaction boundaries

A repeated request with conflicting data must fail rather than create an inconsistent second shipment.

---

# 18. Shipment State Machine

Implement explicit shipment states.

Possible states:

* CREATED
* LABEL_PENDING
* LABEL_CREATED
* READY_TO_SHIP
* SHIPPED
* IN_TRANSIT
* OUT_FOR_DELIVERY
* DELIVERED
* DELIVERY_FAILED
* RETURNED
* CANCELLED
* LOST

Only implement states needed by the repository.

Tracking updates must use valid transitions.

Do not let customers or sellers arbitrarily change shipment status.

---

# 19. Tracking Events

Implement immutable tracking events.

A tracking event should contain:

* shipment ID
* carrier
* provider event/reference
* status
* location where appropriate
* event timestamp
* received timestamp
* source
* raw/sanitized provider reference where appropriate

Provider tracking events must be deduplicated.

Do not overwrite historical tracking events.

---

# 20. Tracking Synchronization Boundary

Create a clean abstraction for external carrier/tracking integrations.

The system must support future providers without coupling domain logic to one carrier SDK.

Provider integration must handle:

* timeouts
* retries
* rate limits
* duplicate events
* provider outages
* malformed responses

Do not invent carrier APIs.

If no provider is configured, do not claim external tracking functionality exists.

---

# 21. Tracking Webhooks

If the repository supports carrier webhooks, implement the foundation for:

* signature verification where supported
* event persistence
* duplicate detection
* safe processing
* status transition
* event publication

Do not create a generic insecure webhook endpoint.

---

# 22. Delivery Confirmation

When a shipment becomes delivered:

* validate shipment state
* persist delivery timestamp
* update fulfillment state
* update relevant order-level state
* create events
* preserve tracking history

Do not mark the entire order delivered until all required shipments/items are fulfilled according to the business rules.

---

# 23. Order Status Integration

Order status must be derived from authoritative lifecycle events rather than arbitrary direct mutation.

For example:

* all required shipments created → fulfillment progresses
* shipment delivered → fulfillment progresses
* all fulfillments delivered → order may become completed

The exact state mapping must follow the repository's order state machine.

Do not create conflicting order and fulfillment state machines.

---

# 24. Cancellation Integration

Integrate cancellation with:

* order
* payment
* inventory
* fulfillment

A shipment that has already been handed to a carrier may not be cancellable in the same way as an unfulfilled order item.

Define cancellation eligibility explicitly.

Do not implement arbitrary cancellation after shipment.

---

# 25. Return Domain

Create or extend a Returns bounded context.

Returns must be independent from the original cart.

A return request references the historical order/item being returned.

---

# 26. Return Request

Implement ReturnRequest.

Appropriate fields include:

* return ID
* order ID
* customer ID
* reason
* status
* requested timestamp
* approval timestamp
* received timestamp
* inspection timestamp
* completion timestamp
* cancellation timestamp
* notes/reference fields
* timestamps

Do not store unnecessary sensitive information.

---

# 27. Return Items

Implement ReturnItem.

Track:

* return request
* order item
* requested quantity
* approved quantity
* received quantity
* accepted quantity
* rejected quantity
* reason
* condition/outcome where appropriate

Quantities must never exceed the quantity originally purchased or the quantity still eligible for return.

---

# 28. Return Eligibility

Create a deterministic return eligibility service.

Consider:

* order state
* delivery state
* return window
* item category restrictions
* quantity already returned
* seller policy where applicable
* promotional constraints
* payment/refund state

Do not allow customers to bypass return policy by modifying request payloads.

---

# 29. Return State Machine

Possible states:

* REQUESTED
* APPROVED
* REJECTED
* LABEL_PENDING
* IN_TRANSIT
* RECEIVED
* INSPECTING
* APPROVED_FOR_REFUND
* REFUNDED
* CANCELLED
* CLOSED

Use only necessary states.

Every transition must be explicit.

---

# 30. Return Authorization

Customers may create return requests only for their own orders.

Sellers may only manage returns involving their own items where marketplace rules permit.

Platform administrators may have broader permissions.

Every operation must validate ownership.

Prevent IDOR using order IDs, return IDs, or item IDs.

---

# 31. Return Quantity Safety

Prevent:

* returning more than purchased
* returning already fully returned quantity
* duplicate return items
* simultaneous requests exceeding eligible quantity

Use database transactions and appropriate locking/constraints.

Concurrent return requests must not exceed eligible quantity.

---

# 32. Return Reasons

Support structured return reasons.

Examples:

* DAMAGED
* DEFECTIVE
* WRONG_ITEM
* NOT_AS_DESCRIBED
* CHANGED_MIND
* SIZE_ISSUE
* OTHER

Use repository conventions where available.

Do not let free-form reason text replace required business classification.

---

# 33. Return Inspection Boundary

Create a return inspection abstraction.

It should allow future handling of:

* item condition
* accepted/rejected quantity
* damage
* missing components
* resale eligibility
* refund eligibility

Do not build a warehouse inspection application in this volume.

Create the correct domain contract.

---

# 34. Return Shipping

Create a return-shipping abstraction supporting:

* return shipment reference
* carrier
* tracking number
* shipping label reference where supported
* status
* timestamps

Do not invent carrier integrations.

Protect provider credentials.

---

# 35. Return Refund Integration

Integrate returns with the existing payment/refund subsystem.

A return approval must not automatically imply an unlimited refund.

Calculate the refundable amount from authoritative order/payment/return data.

Validate:

* eligible quantity
* paid amount
* previous refunds
* return outcome
* refund policy

Use the existing Refund domain.

Do not create a second refund implementation.

---

# 36. Return Inventory Integration

When a return is accepted:

* determine whether inventory can be restored
* use the inventory domain
* create the correct inventory movement
* restore only eligible quantity
* preserve audit history

Do not automatically return defective/damaged goods to sellable inventory.

Use explicit inventory states or movement semantics.

---

# 37. Return Concurrency

Protect against:

* duplicate return requests
* duplicate refund
* duplicate inventory restoration
* simultaneous return approval
* simultaneous return cancellation

Use:

* database constraints
* transactions
* idempotency
* explicit state transitions

Never rely on frontend state.

---

# 38. Return APIs

Implement appropriate REST APIs for:

### Customer

* create return request
* retrieve return
* list returns
* cancel eligible return
* submit required return information

### Seller

* list seller-relevant returns
* review return where authorized
* approve/reject where business rules permit
* inspect return state

### Administration

* inspect returns
* override supported states with explicit permission
* manage return operations

All endpoints must enforce server-side authorization.

---

# 39. Fulfillment APIs

Implement appropriate APIs for:

* customer shipment listing
* customer shipment retrieval
* seller fulfillment listing
* seller shipment management
* shipment creation where authorized
* tracking retrieval
* administrative fulfillment management

Do not expose internal warehouse data unnecessarily.

---

# 40. Pagination

All potentially large collections must support pagination.

Relevant collections include:

* shipments
* tracking events
* returns
* return items
* seller fulfillment queues
* order fulfillment groups

Use existing cursor/offset conventions.

Do not introduce incompatible pagination formats.

---

# 41. Events

Integrate with the existing event architecture.

Potential events:

* fulfillment.created
* fulfillment.allocated
* fulfillment.ready
* fulfillment.shipped
* shipment.created
* shipment.shipped
* shipment.in_transit
* shipment.out_for_delivery
* shipment.delivered
* shipment.delivery_failed
* shipment.returned
* return.requested
* return.approved
* return.rejected
* return.received
* return.inspected
* return.approved_for_refund
* return.completed
* return.cancelled

Use existing naming conventions if present.

Events must be emitted after authoritative state commits.

---

# 42. Event Reliability

Assume:

* duplicate delivery
* delayed delivery
* retry
* replay
* consumer failure
* partial system failure

Consumers must be idempotent.

Do not assume exactly-once processing.

Use transactional outbox integration.

---

# 43. BullMQ Jobs

Implement appropriate background jobs for:

* fulfillment processing
* shipment tracking synchronization where applicable
* stale shipment detection
* return expiration
* return tracking synchronization
* return cleanup
* reconciliation tasks where justified

Every job must define:

* queue
* job name
* payload
* retry count
* timeout
* backoff
* concurrency
* idempotency
* observability
* failure handling

Do not create unbounded retry loops.

---

# 44. Redis

Redis may be used for:

* rate limiting
* short-lived tracking caches
* temporary operational state
* provider throttling
* job coordination where appropriate

PostgreSQL remains authoritative.

Do not store shipment/return state only in Redis.

For each Redis key define:

* namespace
* TTL
* invalidation
* stale behavior
* failure behavior

---

# 45. Database Design

Extend Prisma safely.

Potential models include:

* FulfillmentGroup
* Shipment
* ShipmentItem
* TrackingEvent
* ShippingMethod
* ReturnRequest
* ReturnItem
* ReturnShipment
* ReturnStatusHistory
* FulfillmentStatusHistory

Only create models that are required by the actual architecture.

Use:

* foreign keys
* unique constraints
* composite indexes
* lifecycle indexes
* provider-reference uniqueness
* timestamps
* immutable history records

---

# 46. Database Constraints

Protect invariants such as:

* shipment quantity <= order quantity
* return quantity <= purchased/eligible quantity
* tracking provider event uniqueness
* shipment references
* return ownership relationships
* seller ownership relationships

Where a business invariant cannot be fully represented as a database constraint, enforce it transactionally in domain/application services.

---

# 47. Transaction Boundaries

Use transactions for:

* fulfillment allocation
* shipment creation
* shipment state transition
* delivery confirmation
* return approval
* return quantity allocation
* return inventory restoration
* refund integration state changes
* outbox insertion

Do not make external carrier/payment calls inside long database transactions.

---

# 48. External Provider Reliability

Carrier integrations must handle:

* timeout
* network failure
* rate limiting
* provider outage
* malformed response
* duplicate response
* changed tracking status

Use:

* bounded retries
* exponential backoff
* idempotency
* circuit-breaking/degradation where appropriate
* reconciliation

Do not block core order access because a carrier API is temporarily unavailable.

---

# 49. Security

Threat-model:

* shipment IDOR
* return IDOR
* seller fulfillment isolation bypass
* unauthorized shipment modification
* unauthorized return approval
* refund abuse
* tracking enumeration
* sensitive address exposure
* provider credential leakage
* webhook forgery
* replay
* privilege escalation

All authorization must happen server-side.

---

# 50. Privacy

Customer-facing shipment/return responses should expose only necessary information.

Protect:

* shipping addresses
* phone numbers
* customer contact information
* seller operational information
* internal fulfillment metadata

Seller views must be limited to data required to fulfill their own products.

---

# 51. Observability

Instrument:

### Fulfillment

* fulfillment creation
* allocation failures
* processing latency
* shipment creation
* shipment failures

### Shipping

* provider latency
* tracking synchronization
* tracking failures
* delivery confirmation

### Returns

* return requests
* approvals/rejections
* inspection outcomes
* refund integration
* inventory restoration

### Jobs

* processing success/failure
* retries
* dead-letter conditions

Use distributed tracing across:

* HTTP
* PostgreSQL
* Redis
* BullMQ
* event infrastructure
* external providers

Never log secrets or unnecessary customer data.

---

# 52. Audit Logging

Audit:

* seller fulfillment actions
* administrative shipment changes
* return approval/rejection
* manual inspection outcomes
* refund-triggering return actions
* inventory restoration from returns
* administrative overrides

Audit records must be immutable.

---

# 53. Testing

Implement comprehensive tests.

## Unit Tests

Test:

* fulfillment state machine
* shipment state machine
* return state machine
* fulfillment eligibility
* return eligibility
* quantity rules
* refund eligibility
* inventory restoration rules

## Integration Tests

Test:

* shipment persistence
* partial shipment behavior
* multi-seller fulfillment
* tracking events
* return persistence
* inventory restoration
* refund integration
* transactional outbox
* idempotency

## API Tests

Test:

* customer shipment access
* seller fulfillment access
* cross-seller isolation
* customer return access
* seller return access
* administrative access
* pagination
* invalid transitions

## Security Tests

Explicitly test:

* cross-customer shipment access
* cross-customer return access
* cross-seller fulfillment access
* forged seller IDs
* unauthorized shipment mutation
* unauthorized return approval
* tracking enumeration
* refund abuse

## Concurrency Tests

Test:

* concurrent shipment creation
* concurrent return requests
* concurrent return approval
* duplicate tracking event processing
* concurrent inventory restoration
* refund/return races

Verify no duplicated shipment, refund, or inventory restoration occurs.

---

# 54. Performance

Review:

* customer shipment queries
* seller fulfillment queues
* tracking history
* return listing
* return eligibility
* order fulfillment summaries

Prevent:

* N+1 queries
* unbounded tracking retrieval
* unbounded seller queues
* unnecessary relation loading

Use appropriate indexes and pagination.

---

# 55. API Documentation

Update OpenAPI/Swagger with:

* fulfillment endpoints
* shipment endpoints
* tracking endpoints
* return endpoints
* DTOs
* status transitions
* authorization
* pagination
* error contracts

Document only actual implemented behavior.

---

# 56. Migration Safety

Create safe Prisma migrations.

Verify:

* foreign keys
* unique constraints
* indexes
* seller relationships
* order relationships
* return relationships
* shipment relationships
* provider references

Do not reset existing databases.

Do not destroy historical order, payment, shipment, or return data.

---

# 57. Backward Compatibility

Preserve existing:

* order APIs
* payment APIs
* inventory APIs
* checkout APIs
* seller APIs
* customer APIs

If existing contracts must change:

1. inspect all consumers
2. preserve compatibility where possible
3. update consumers
4. add regression tests
5. document actual changes

---

# 58. Explicitly Defer

Do not implement complete:

* review/rating system
* notification system
* recommendation system
* search system
* analytics system
* seller payout/settlement system
* advanced warehouse management
* carrier-specific integrations without configured providers

Create clean integration boundaries instead.

---

# 59. Documentation

Update technical documentation for:

* fulfillment lifecycle
* shipment lifecycle
* tracking
* multi-seller fulfillment
* returns
* return eligibility
* inventory restoration
* refund integration
* authorization
* background jobs
* provider integrations
* operational troubleshooting

Documentation must reflect actual repository behavior.

---

# 60. Implementation Requirements

You must:

1. Inspect the actual repository first.
2. Reuse existing compatible infrastructure.
3. Implement the complete scope of this volume.
4. Create/update Prisma migrations.
5. Implement fulfillment.
6. Implement shipments.
7. Implement tracking.
8. Implement returns.
9. Integrate inventory.
10. Integrate payments/refunds.
11. Implement events.
12. Implement background jobs.
13. Implement authorization.
14. Implement idempotency.
15. Implement audit logging.
16. Implement observability.
17. Implement tests.
18. Update API documentation.
19. Update operational documentation.
20. Run formatting.
21. Run lint.
22. Run type checking.
23. Run tests.
24. Run build validation.
25. Validate migrations.
26. Verify no secrets were introduced.
27. Verify no placeholders remain.

Do not merely describe what should be implemented.

Actually modify the repository.

---

# 61. Final Validation

Verify:

### Fulfillment

* multi-seller orders work
* fulfillment groups are correct
* seller isolation is enforced
* partial fulfillment is supported where required
* inventory integration is correct

### Shipping

* shipment quantities are correct
* shipment state transitions are valid
* tracking is immutable
* duplicate provider events are safe
* delivery updates are reliable

### Returns

* eligibility is enforced
* return quantities are safe
* return state transitions are valid
* refunds integrate correctly
* inventory restoration is correct

### Reliability

* operations are idempotent
* jobs are retry-safe
* provider failures degrade safely
* outbox events are reliable
* historical records remain immutable

### Security

* no IDOR
* no cross-seller access
* no unauthorized return/refund actions
* no sensitive address leakage
* no provider credential leakage

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

# 62. Final Report

When finished, report only facts about the actual repository.

Include:

1. Fulfillment implementation.
2. Shipment implementation.
3. Tracking implementation.
4. Return implementation.
5. Inventory integration.
6. Refund integration.
7. Database models/migrations.
8. APIs.
9. Events.
10. BullMQ jobs.
11. Security controls.
12. Observability.
13. Tests.
14. Validation commands and actual results.
15. Genuine remaining limitations or blockers.

Do not claim an external carrier integration exists unless it was actually implemented and configured.

Do not claim functionality was tested if it could not actually be tested.

The repository is the final source of truth.

---

# 63. Non-Negotiable Rules

* No pseudo-code.
* No TODOs.
* No FIXME markers.
* No placeholder implementations.
* No fake carrier APIs.
* No invented provider behavior.
* No hardcoded secrets.
* No arbitrary shipment state changes.
* No arbitrary return state changes.
* No duplicate shipments.
* No duplicate refunds.
* No duplicate inventory restoration.
* No cross-customer shipment access.
* No cross-customer return access.
* No cross-seller fulfillment access.
* No frontend-only authorization.
* No unnecessary regeneration of unchanged files.
* No competing implementations.
* No false completion claims.

Most importantly:

**Inspect the actual repository first, then implement the complete Fulfillment + Shipping + Tracking + Returns backend implementation unit as a production-grade extension of the existing ecommerce marketplace.**
