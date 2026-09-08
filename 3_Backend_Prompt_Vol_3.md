# Amazon Ecommerce Marketplace — Backend Prompt — Volume 3

## Role

You are operating as the senior backend engineering team responsible for implementing the next production-grade backend implementation unit of an original Amazon-style ecommerce marketplace.

Act as:

* Principal Software Architect
* Staff Backend Engineer
* Database Architect
* Security Engineer
* Distributed Systems Engineer
* QA Engineer
* DevOps Engineer

This is an implementation task, not a tutorial.

The objective is to make real, production-quality changes to the existing repository.

---

# 1. Project Context

Build an original, production-grade ecommerce marketplace supporting customers, products, sellers, offers, inventory, carts, checkout, orders, payments, fulfillment, reviews, search, notifications, administration, and analytics.

The backend technology baseline is:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Redis
* Elasticsearch/OpenSearch
* BullMQ
* AWS S3
* AWS CloudFront
* Stripe
* REST APIs
* OpenAPI / Swagger
* Webhooks
* Kafka/Redpanda where justified
* Docker
* AWS
* Terraform/OpenTofu
* Kubernetes where justified

Use:

* Clean Architecture
* Domain-Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Explicit domain boundaries
* Strong typing
* Transactional consistency
* Idempotent distributed operations

The repository is the source of truth for the actual implementation state.

Do not assume that code described by requirements already exists.

---

# 2. Repository-First Rule

Before modifying anything:

1. Inspect the complete repository structure relevant to the backend.
2. Inspect package configuration.
3. Inspect NestJS modules.
4. Inspect Prisma schema and migrations.
5. Inspect existing domain entities.
6. Inspect repositories and services.
7. Inspect controllers and DTOs.
8. Inspect authentication and authorization.
9. Inspect existing Redis infrastructure.
10. Inspect existing event/outbox infrastructure.
11. Inspect existing BullMQ infrastructure.
12. Inspect existing API conventions.
13. Inspect existing tests.
14. Inspect environment/configuration conventions.
15. Inspect existing catalog, seller, product, SKU, offer, and pricing implementations.

Do not recreate functionality that already exists.

If the repository already contains compatible implementations, extend and integrate them.

If the implementation differs from the requirements, preserve working behavior where possible and make the smallest safe change required to achieve the intended architecture.

Do not create competing models, duplicate services, parallel repositories, duplicate APIs, or incompatible abstractions.

---

# 3. Scope of This Implementation Unit

Implement the production-grade backend foundation for:

1. Inventory
2. Inventory locations
3. Inventory items
4. Inventory movements
5. Inventory reservations
6. Stock availability
7. Inventory concurrency control
8. Reservation expiration
9. Cart
10. Cart items
11. Cart ownership
12. Anonymous cart support where compatible with the existing architecture
13. Authenticated-cart merging
14. Cart pricing freshness
15. Cart validation
16. Inventory/cart API contracts
17. Inventory and cart events
18. Inventory background jobs
19. Redis usage where appropriate
20. Auditability
21. Observability
22. Security
23. Automated testing

This volume must integrate with the existing:

* Product
* ProductVariant
* SKU
* Seller
* SellerOffer
* Pricing
* Customer
* Authentication
* Authorization
* PostgreSQL
* Prisma
* Redis
* Outbox/event infrastructure

already present in the repository.

Do not implement the complete checkout, order, payment, fulfillment, returns, reviews, notification, or analytics domains in this volume.

However, inventory and cart must expose the contracts required by later commerce workflows.

---

# 4. Inventory Domain

Create or extend an explicit Inventory bounded context.

Inventory must be authoritative in PostgreSQL.

Redis must never become the sole durable source of inventory truth.

Inventory operations must be transactional and concurrency-safe.

The system must prevent:

* Overselling
* Negative available inventory
* Duplicate reservations
* Double release
* Lost updates
* Race conditions
* Cross-seller inventory access
* Unauthorized stock modification

---

# 5. Inventory Locations

Implement inventory locations.

A location may represent:

* Warehouse
* Fulfillment center
* Seller warehouse
* Other supported inventory facility defined by the repository architecture

Each location should have appropriate fields such as:

* id
* seller ownership where applicable
* name
* code
* status
* address/reference data where required
* timestamps
* lifecycle fields

Define appropriate statuses.

Examples may include:

* ACTIVE
* INACTIVE
* CLOSED

Do not introduce unnecessary statuses if the existing repository already defines an equivalent lifecycle.

Location codes must be unique within the appropriate ownership boundary.

Enforce seller isolation.

A seller must never be able to read or modify another seller's inventory location.

---

# 6. Inventory Items

Implement inventory items tied to the correct sellable identity.

Inventory must not be ambiguously attached only to a product name.

Use the existing repository's canonical SKU / SellerOffer model.

An inventory record should represent stock for the appropriate sellable SKU/offer at a specific inventory location.

Track quantities such as:

* on hand
* reserved
* available

The exact persisted representation must be chosen based on the existing schema.

Maintain the invariant:

`available = onHand - reserved`

unless the repository architecture intentionally models additional states such as damaged, unavailable, quarantined, or allocated stock.

If additional inventory states exist, define their semantics explicitly.

Never allow:

* negative on-hand stock unless explicitly supported
* reserved greater than on-hand
* available below zero
* arithmetic inconsistencies between persisted quantities

Use database constraints and transactional logic where possible.

---

# 7. Inventory Quantity Representation

Choose a representation that is safe for concurrency and high-volume ecommerce operations.

Quantities must use integer-compatible representations appropriate for discrete sellable units.

Do not use floating-point arithmetic for inventory quantities.

Validate:

* positive quantities for stock additions
* positive quantities for reservations
* positive quantities for releases
* positive quantities for adjustments

Reject zero or negative mutation quantities unless an explicit operation semantics requires them.

---

# 8. Inventory Movements

Implement immutable inventory movement records.

Inventory movements provide an auditable history of stock changes.

Examples:

* STOCK_RECEIVED
* STOCK_ADJUSTED
* STOCK_RESERVED
* STOCK_RELEASED
* STOCK_DEDUCTED
* STOCK_RETURNED
* STOCK_DAMAGED
* STOCK_TRANSFERRED

Only create movement types that are actually required by the implemented domain.

Each movement should capture enough information to reconstruct why inventory changed.

Include appropriate fields such as:

* movement ID
* inventory item
* location
* quantity
* movement type
* before quantity
* after quantity
* reference type
* reference ID
* actor/user where applicable
* reason
* correlation/request ID
* timestamp

Movement records must be immutable.

Do not allow arbitrary modification after creation.

If correction is required, create a compensating movement.

---

# 9. Inventory Reservations

Implement a durable reservation model.

Reservations are required to prevent multiple concurrent customers from consuming the same available inventory.

A reservation should have a lifecycle such as:

* ACTIVE
* RELEASED
* CONSUMED
* EXPIRED
* CANCELLED

Use the repository's existing naming conventions if equivalent states already exist.

A reservation should contain enough information to identify:

* reservation ID
* inventory item
* quantity
* owning cart/checkout context where applicable
* expiration timestamp
* lifecycle state
* creation timestamp
* release/consumption timestamp where appropriate
* idempotency/reference information

Do not allow a reservation to be silently reused for another operation.

---

# 10. Reservation Algorithm

Implement a concurrency-safe reservation algorithm.

The critical requirement is:

Multiple simultaneous requests must never reserve more stock than is actually available.

Use PostgreSQL transactional guarantees and appropriate locking or atomic conditional updates.

A safe implementation may use a pattern equivalent to:

1. Begin transaction.
2. Lock or atomically update the inventory row.
3. Verify sufficient available quantity.
4. Increase reserved quantity.
5. Create reservation.
6. Create movement/audit information.
7. Commit transaction.

The actual implementation must follow the repository's database architecture.

Do not rely on:

* JavaScript in-memory locks
* process-local mutexes
* Redis-only locks
* frontend checks

for correctness.

Database-level correctness is mandatory.

---

# 11. Reservation Idempotency

Reservation creation must be idempotent where requests may be retried.

Support an appropriate idempotency/reference mechanism.

A repeated request with the same logical operation must not create multiple reservations.

The system must distinguish:

* safe retry of the same request
* same reference with conflicting payload
* genuinely new reservation

Return deterministic results for retries.

Protect idempotency records from cross-user access.

---

# 12. Reservation Release

Implement reservation release.

Release must:

1. Validate ownership/context.
2. Validate reservation state.
3. Prevent double release.
4. Decrease reserved quantity exactly once.
5. Create the appropriate movement/audit information.
6. Persist the state transition atomically.
7. Emit the appropriate event after successful commit.

Repeated release requests must be safely idempotent.

---

# 13. Reservation Consumption

Implement the inventory contract needed for later order/checkout consumption.

A reservation must be consumable exactly once.

Consumption should:

* validate active reservation
* decrement reserved stock
* decrement on-hand stock where appropriate
* transition reservation to consumed
* record inventory movement
* remain atomic

Do not implement the complete order/payment workflow here.

Expose a clean domain/service contract that later order workflows can use.

---

# 14. Reservation Expiration

Implement expiration handling.

Reservations must not remain active forever.

Create a BullMQ-based expiration mechanism where appropriate.

The expiration process must:

* find expired active reservations
* attempt safe release
* remain idempotent
* tolerate retries
* avoid double release
* avoid releasing already consumed reservations
* produce appropriate audit/event records
* expose metrics

Do not rely solely on a scheduled application process without durable job semantics if BullMQ is already established in the repository.

---

# 15. Inventory Adjustments

Implement controlled inventory adjustments.

Only authorized users/services may modify stock.

Examples:

* receive stock
* increase stock
* decrease stock
* correction
* return
* damage

Every adjustment must:

* execute transactionally
* validate authorization
* validate quantity
* record movement
* update authoritative inventory
* maintain invariants
* create audit information
* emit domain events where appropriate

Never expose an unrestricted endpoint that allows arbitrary inventory manipulation.

---

# 16. Seller Inventory Isolation

For marketplace inventory:

* sellers may manage only their own inventory
* seller users inherit permissions according to seller roles
* platform administrators may have broader privileges
* customers must never access private seller inventory data
* inventory identifiers must not be sufficient to bypass authorization

Prevent IDOR through server-side ownership validation.

Never rely on:

* hidden frontend controls
* route obscurity
* client-provided seller IDs
* UI permissions

for security.

---

# 17. Stock Availability

Expose a reliable stock availability service.

The service should answer questions such as:

* Is an offer purchasable?
* How many units are currently available?
* Is sufficient stock available for a requested quantity?
* Which eligible locations can fulfill the request?

Do not expose internal inventory implementation details unnecessarily.

Customer-facing responses must reveal only information appropriate for the product experience.

Avoid exposing exact seller-private inventory data when business rules do not require it.

---

# 18. Inventory Location Selection

If the existing architecture supports multiple fulfillment locations, define deterministic location selection.

Consider:

* available quantity
* location status
* seller ownership
* fulfillment eligibility
* geographic/operational constraints already present
* future shipping requirements

Do not implement a complete shipping optimizer here.

Create an extensible service boundary so later fulfillment logic can build on it.

---

# 19. Cart Domain

Implement or extend the Cart bounded context.

A cart belongs to a customer or supported anonymous session identity.

A cart should contain:

* cart ID
* customer/session ownership
* status
* currency where appropriate
* timestamps
* version/concurrency field where appropriate

Cart lifecycle may include:

* ACTIVE
* CHECKOUT
* CONVERTED
* ABANDONED
* EXPIRED

Use only the states required by the repository.

---

# 20. Cart Items

Implement cart items.

A cart item must reference the correct sellable identity.

Do not use a product ID alone when a SellerOffer/SKU is the actual purchasable unit.

A cart item should capture:

* cart
* seller offer
* SKU/product references as appropriate
* quantity
* pricing snapshot/current pricing metadata where required
* timestamps

Enforce uniqueness according to the business model.

For example, a cart should not accidentally contain duplicate rows representing the same sellable offer when the intended behavior is quantity aggregation.

---

# 21. Cart Quantity Changes

Implement:

* add item
* update quantity
* remove item
* clear cart

Validate:

* authentication/ownership
* offer visibility
* offer availability
* SKU validity
* quantity bounds
* seller/catalog state
* purchase restrictions where already supported

Do not trust frontend pricing or availability.

Every mutation must be validated server-side.

---

# 22. Cart Ownership

A customer must only access their own authenticated cart.

For anonymous carts, if anonymous cart support exists or is required by the repository architecture:

* use a secure opaque identifier
* avoid predictable identifiers
* avoid storing sensitive data in client-controlled identifiers
* apply expiration
* rate-limit mutations
* validate ownership on every request

Do not expose another user's cart through guessed IDs.

---

# 23. Anonymous-to-Authenticated Cart Merge

If anonymous carts are supported, implement secure cart merging during authentication.

The merge operation must define deterministic behavior for:

* same offer in both carts
* different quantities
* unavailable offer
* deleted offer
* changed price
* quantity limits
* seller restrictions

The merge must be transactional.

Do not silently lose valid cart contents.

Return enough information for the client to explain conflicts where required.

---

# 24. Cart and Inventory Interaction

Do not automatically reserve inventory merely because an item is added to a cart unless the repository's architecture explicitly requires cart reservations.

The default design should distinguish:

* cart intent
* inventory availability
* inventory reservation

If cart reservations are intentionally implemented, define:

* reservation duration
* expiration
* extension rules
* concurrency behavior
* release behavior
* cart abandonment behavior

Do not create a reservation model that later checkout cannot safely reconcile.

---

# 25. Cart Pricing Freshness

Cart prices must never be trusted as authoritative payment amounts.

When displaying or validating a cart:

* retrieve current authoritative pricing as required
* detect price changes
* detect promotions becoming invalid
* detect seller-offer changes
* detect unavailable products
* detect inventory changes

Represent cart validation results explicitly.

The final checkout/order amount must always be calculated server-side from authoritative data.

Never trust:

* client-provided unit prices
* client-provided discounts
* client-provided totals
* client-provided taxes
* client-provided seller pricing

---

# 26. Cart Validation Service

Create a reusable cart validation service.

It should be capable of determining:

* invalid offers
* unavailable offers
* insufficient inventory
* quantity violations
* changed prices
* expired promotions
* invalid coupons where applicable
* seller state changes
* catalog visibility changes

Do not implement complete checkout/payment behavior here.

The service should provide a clean contract that checkout can later consume.

---

# 27. Cart Totals

Implement cart calculation using authoritative backend data.

Separate conceptual values such as:

* subtotal
* discounts
* shipping estimate if supported
* tax estimate if supported
* total

Do not persist derived totals as authoritative unless the architecture explicitly requires snapshots.

Money must use the repository's safe integer/decimal monetary representation.

Never use floating-point arithmetic for currency.

---

# 28. Cart Concurrency

Prevent conflicting cart updates.

Consider:

* concurrent quantity updates
* simultaneous add/remove
* multiple browser tabs
* mobile + web clients
* retries
* stale clients

Use appropriate optimistic concurrency/versioning or transactional behavior.

Do not overwrite newer cart state blindly because a client sent stale data.

---

# 29. Redis Usage

Use Redis only where it provides real value.

Potential uses:

* short-lived cart cache
* cart lookup acceleration
* stock availability cache
* rate limiting
* distributed coordination
* ephemeral state

PostgreSQL remains authoritative.

For every new Redis key:

* define namespace
* define ownership
* define TTL
* define serialization
* define invalidation
* define stale-data behavior
* define failure behavior

Never allow Redis failure to corrupt authoritative inventory or cart state.

---

# 30. Cache Invalidation

Whenever authoritative data changes, invalidate or update affected cache entries.

Relevant changes include:

* offer activation/deactivation
* price changes
* inventory changes
* cart mutation
* product visibility changes
* seller suspension

Prevent stale cache data from being treated as authoritative during checkout.

---

# 31. API Contracts

Implement REST APIs following the repository's existing API conventions.

At minimum, provide appropriate endpoints for:

### Inventory

* inventory locations
* inventory item lookup
* availability
* stock adjustments
* reservations
* reservation release
* reservation consumption

### Cart

* get current cart
* add item
* update item quantity
* remove item
* clear cart
* validate cart
* merge anonymous/authenticated cart where applicable

Use proper resource naming and HTTP semantics.

Do not expose unnecessary internal administrative operations to customers.

---

# 32. DTOs and Validation

Create explicit request and response DTOs.

Do not expose Prisma models directly from controllers.

Validate:

* IDs
* quantities
* identifiers
* idempotency keys
* ownership
* enum values
* request size
* pagination parameters

Reject malformed input before business logic executes.

Use the repository's established validation library and conventions.

---

# 33. Error Contracts

Use the project's standardized error response.

Add explicit domain error codes for situations such as:

* INVENTORY_NOT_FOUND
* INSUFFICIENT_STOCK
* RESERVATION_NOT_FOUND
* RESERVATION_EXPIRED
* RESERVATION_ALREADY_RELEASED
* RESERVATION_ALREADY_CONSUMED
* CART_NOT_FOUND
* CART_ITEM_NOT_FOUND
* CART_ITEM_UNAVAILABLE
* CART_PRICE_CHANGED
* CART_QUANTITY_INVALID
* CART_OWNERSHIP_VIOLATION
* OFFER_NOT_PURCHASABLE

Use equivalent existing codes when already defined.

Do not expose internal database errors.

---

# 34. Events

Integrate inventory and cart changes with the existing event architecture.

Potential events include:

* inventory.stock.received
* inventory.stock.adjusted
* inventory.reservation.created
* inventory.reservation.released
* inventory.reservation.expired
* inventory.reservation.consumed
* cart.created
* cart.item.added
* cart.item.updated
* cart.item.removed
* cart.cleared
* cart.validated

Use the repository's established event naming conventions if they already exist.

Every event must contain an appropriate event envelope including, where applicable:

* event ID
* event type
* event version
* aggregate ID
* aggregate type
* producer
* occurred timestamp
* correlation ID
* causation ID
* trace context
* schema version
* payload

Do not publish events from a database transaction in a way that can produce false events.

Use the transactional outbox pattern where the repository supports it.

---

# 35. Event Reliability

Assume:

* at-least-once delivery
* duplicates
* retries
* delayed processing
* consumer failure
* replay
* out-of-order delivery where ordering is not guaranteed

Consumers must be idempotent.

Do not build correctness around exactly-once assumptions.

Inventory correctness must remain protected by PostgreSQL transactions regardless of event delivery behavior.

---

# 36. BullMQ Jobs

Implement appropriate background jobs for:

* reservation expiration
* abandoned cart processing where justified
* cart cleanup where justified
* cache maintenance only if required
* inventory reconciliation hooks if the existing architecture requires them

Every job must define:

* queue
* job name
* payload
* timeout
* retries
* exponential/backoff strategy
* concurrency
* idempotency
* failure behavior
* logging
* metrics
* graceful shutdown behavior

Do not create jobs that duplicate synchronous business logic in unsafe ways.

---

# 37. Database Design

Extend Prisma carefully.

Use:

* foreign keys
* unique constraints
* composite indexes
* appropriate indexes for query patterns
* check constraints where supported through migration SQL
* timestamps
* lifecycle state constraints
* ownership constraints where possible

Optimize indexes for actual access patterns.

Consider queries for:

* customer cart lookup
* cart item lookup
* inventory by offer/SKU
* inventory by location
* active reservations
* expiring reservations
* inventory movement history
* seller inventory
* stock availability
* reservation references

Do not add indexes blindly.

---

# 38. Transactions

Use transactions for critical multi-record operations.

Required transactional areas include:

* inventory reservation
* reservation release
* reservation consumption
* inventory adjustment
* cart merge
* cart mutation when multiple records must change atomically
* idempotency state changes where necessary
* outbox creation together with authoritative mutations

Keep transactions short.

Do not perform slow external network calls inside database transactions.

---

# 39. External Dependency Boundaries

Do not call:

* Stripe
* Elasticsearch/OpenSearch
* S3
* external APIs

inside critical database transactions unless there is an explicitly justified architecture.

For asynchronous side effects:

1. commit authoritative state
2. persist outbox/event/job intent
3. process external side effect
4. retry safely
5. reconcile failures

Do not create inconsistent inventory because an external dependency is unavailable.

---

# 40. Security

Threat-model this implementation.

Protect against:

* IDOR
* privilege escalation
* seller isolation bypass
* cart ownership bypass
* inventory manipulation
* reservation abuse
* quantity abuse
* brute-force cart mutation
* enumeration
* replay
* duplicate requests
* malformed payloads
* injection
* excessive request sizes
* rate-limit bypass
* cache poisoning

Authorization must happen server-side.

Use least privilege.

Do not expose internal database identifiers unnecessarily when an opaque public identifier is appropriate.

---

# 41. Rate Limiting and Abuse Prevention

Apply appropriate rate limits to:

* cart mutations
* reservation operations
* inventory administrative mutations
* anonymous cart creation
* validation endpoints

Do not apply one simplistic global limit to every operation.

Use appropriate identities and scopes.

Prevent a malicious actor from creating unlimited reservations or carts.

---

# 42. Audit Logging

Audit security-sensitive and business-critical operations.

At minimum consider:

* inventory adjustments
* reservation manipulation
* seller inventory changes
* cart ownership changes
* administrative operations

Audit records must include enough context for investigation without logging secrets or unnecessary private data.

---

# 43. Observability

Instrument the implementation with the repository's existing observability stack.

Include metrics such as:

* inventory reservation success/failure
* insufficient stock
* reservation expiration
* reservation release
* reservation consumption
* cart creation
* cart mutation latency
* cart validation failures
* cache hit/miss where meaningful
* BullMQ job success/failure
* database transaction failures

Add distributed tracing across:

* HTTP
* PostgreSQL
* Redis
* queues
* event publishing
* critical inventory/cart operations

Use structured logs.

Never log:

* passwords
* access tokens
* refresh tokens
* payment secrets
* private authentication credentials
* unnecessary personal information

---

# 44. Testing

Implement meaningful automated tests.

## Unit Tests

Cover:

* inventory availability calculation
* reservation rules
* reservation lifecycle
* expiration rules
* cart quantity rules
* cart merge behavior
* price-change detection
* authorization policies

## Integration Tests

Cover:

* Prisma transactions
* reservation creation
* concurrent reservation attempts
* release
* consumption
* expiration
* cart mutations
* cart merge
* Redis behavior where relevant
* outbox creation

## API Tests

Cover:

* authentication
* authorization
* validation
* ownership
* error contracts
* pagination where applicable
* idempotency
* rate limiting where testable

## Security Tests

Explicitly test:

* cross-customer cart access
* cross-seller inventory access
* forged seller IDs
* forged cart IDs
* reservation replay
* duplicate requests
* privilege escalation
* malformed quantities

## Concurrency Tests

This is mandatory.

Create tests that simulate multiple simultaneous reservation attempts against limited inventory.

Verify that:

* available stock never becomes negative
* total successful reservations never exceed stock
* failed reservations return deterministic errors
* reservation records remain consistent
* inventory movement history remains correct

---

# 45. Performance

Review query performance for:

* active cart lookup
* cart item retrieval
* stock availability
* active reservations
* expiring reservations
* inventory by seller
* inventory by location
* inventory movement history

Avoid:

* N+1 queries
* unnecessary Prisma relation loading
* unbounded queries
* full-table scans for high-frequency paths

Use pagination for potentially large collections.

---

# 46. API Documentation

Update OpenAPI/Swagger documentation.

Document:

* endpoints
* authentication
* authorization
* request DTOs
* response DTOs
* validation errors
* domain errors
* idempotency requirements
* pagination
* reservation semantics
* cart validation semantics

Do not document behavior that is not actually implemented.

---

# 47. Migration Safety

Create proper Prisma migrations for all schema changes.

Before finalizing migrations:

* inspect current production-like schema
* preserve existing data
* avoid destructive changes unless necessary
* provide safe migration paths
* verify indexes and constraints
* consider large-table migration behavior

Do not use destructive reset commands against an existing project database.

---

# 48. Backward Compatibility

Existing APIs and functionality must remain compatible unless there is a compelling architectural reason to change them.

If an existing contract must change:

1. inspect all repository consumers
2. update them consistently
3. preserve compatibility where possible
4. document the change
5. add regression tests

Never silently break existing functionality.

---

# 49. Seed and Development Data

If the repository already uses seed data, update it carefully.

Provide realistic development data for:

* inventory locations
* SKUs
* seller offers
* inventory
* carts where appropriate

Do not insert fake production secrets.

Do not create unrealistic shortcuts that bypass real domain constraints.

---

# 50. Documentation

Update relevant documentation for:

* inventory model
* reservation lifecycle
* cart lifecycle
* concurrency behavior
* API usage
* error codes
* background jobs
* Redis keys
* operational troubleshooting

Documentation must describe the implementation that actually exists.

---

# 51. Explicitly Defer These Domains

Do not implement the complete versions of:

* checkout
* orders
* payments
* Stripe integration
* fulfillment
* shipping execution
* returns
* refunds
* reviews
* notifications
* analytics

unless a small compatibility change is strictly necessary for the inventory/cart implementation.

Do not prematurely implement these domains.

However, make inventory and cart contracts clean enough to support them later.

---

# 52. Code Quality

Follow existing repository conventions.

Use:

* strict TypeScript
* explicit types
* dependency injection
* small focused services
* domain-oriented modules
* repository abstractions
* transactional application services
* reusable validation
* centralized error handling
* structured logging

Avoid:

* giant services
* controllers containing business logic
* direct Prisma access scattered across controllers
* duplicated business rules
* hidden global state
* unsafe casts
* `any` used to bypass type safety
* magic constants
* hardcoded credentials

---

# 53. Implementation Rules

You must:

1. Inspect first.
2. Plan against the actual repository.
3. Reuse existing compatible infrastructure.
4. Implement the entire scope of this volume.
5. Make real repository changes.
6. Create migrations.
7. Create/update tests.
8. Update API documentation.
9. Update operational documentation where needed.
10. Run formatting.
11. Run linting.
12. Run type checking.
13. Run relevant tests.
14. Run build validation.
15. Verify migrations.
16. Verify no secrets were introduced.
17. Verify no placeholder implementations remain.

Do not merely describe what should be implemented.

Actually implement it.

---

# 54. Final Validation

Before finishing, verify:

### Architecture

* Inventory is authoritative in PostgreSQL.
* Cart state is consistent.
* Seller isolation is enforced.
* Reservation concurrency is safe.
* Domain boundaries remain clean.

### Database

* migrations succeed
* constraints are correct
* indexes support real queries
* transactions preserve invariants

### API

* DTO validation works
* authorization works
* error contracts are consistent
* idempotency works
* ownership checks work

### Distributed Systems

* outbox integration is correct
* events are idempotent
* BullMQ jobs are retry-safe
* Redis is non-authoritative
* failures degrade safely

### Security

* no IDOR
* no privilege escalation
* no seller isolation bypass
* no reservation replay vulnerability
* no unauthorized inventory mutation

### Testing

* unit tests pass
* integration tests pass
* API tests pass
* security tests pass
* concurrency tests pass

### Code Quality

* typecheck passes
* lint passes
* build passes
* migrations are valid
* no unnecessary duplicate implementations exist

---

# 55. Final Response Requirements

At the end of the implementation, report only facts about the actual repository state.

Include:

1. What was implemented.
2. Files/modules created or materially changed.
3. Database migrations created.
4. APIs implemented.
5. Events implemented.
6. BullMQ jobs implemented.
7. Redis behavior implemented.
8. Security controls added.
9. Tests added.
10. Validation commands executed and their actual results.
11. Any genuine remaining limitations or blockers.

Do not claim success for anything that was not actually verified.

Do not say that future functionality is implemented merely because contracts were prepared for it.

The repository itself is the final source of truth.

---

# 56. Non-Negotiable Rules

* Do not generate pseudo-code.
* Do not generate TODOs.
* Do not generate FIXME markers.
* Do not leave placeholder implementations.
* Do not create fake provider integrations.
* Do not invent external API behavior.
* Do not hardcode production secrets.
* Do not weaken authentication or authorization for convenience.
* Do not use frontend validation as a security boundary.
* Do not use Redis as the authoritative inventory database.
* Do not use floating-point arithmetic for money.
* Do not use process-local locking for inventory correctness.
* Do not trust client-provided prices or totals.
* Do not allow cross-seller inventory access.
* Do not allow cross-customer cart access.
* Do not silently overwrite concurrent inventory updates.
* Do not regenerate unchanged files unnecessarily.
* Do not create competing implementations.
* Do not claim implementation without actually changing and validating the repository.

Most importantly:

**Inspect the repository first, then implement the complete Inventory + Cart backend implementation unit as a production-grade extension of the existing ecommerce marketplace.**
