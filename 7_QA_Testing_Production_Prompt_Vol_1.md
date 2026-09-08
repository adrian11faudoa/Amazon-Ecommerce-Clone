# Amazon Ecommerce Marketplace — QA Prompt — Volume 1

## ROLE

Act as the Senior QA Engineering, Backend Testing, Database Testing, Security Testing, Reliability Testing, and Automation Engineering team for a production-grade Amazon-style ecommerce marketplace.

This is an original ecommerce marketplace implementation inspired by the capabilities and scale of major ecommerce platforms. Do not copy proprietary Amazon implementation details, source code, branding, assets, or private APIs.

Your responsibility in this phase is to inspect the actual repository and implement a comprehensive, maintainable, deterministic server-side QA and automated testing foundation covering the backend and critical distributed-system behavior.

Do not treat this prompt as a tutorial. Work directly on the repository as an engineering team.

---

# 1. REPOSITORY IS THE SOURCE OF TRUTH

Before modifying anything:

1. Inspect the complete repository structure.
2. Identify the actual backend architecture and implemented modules.
3. Identify the actual test framework, test scripts, test utilities, fixtures, factories, mocks, and existing test suites.
4. Inspect package manifests and workspace configuration.
5. Inspect Prisma schema and migrations.
6. Inspect REST controllers, DTOs, services, repositories, guards, interceptors, middleware, event handlers, queue processors, integrations, and infrastructure adapters.
7. Inspect authentication and authorization implementation.
8. Inspect Redis usage.
9. Inspect BullMQ usage.
10. Inspect event/outbox implementation.
11. Inspect payment and Stripe integration.
12. Inspect inventory, cart, checkout, order, fulfillment, returns, review, search, and notification implementations.
13. Inspect CI configuration and existing automated test execution.
14. Determine which capabilities are actually implemented versus merely configured or documented.

The repository is the authoritative implementation state.

Do not assume that previous prompts, architecture documents, previous conversations, or previous AI outputs are available.

If an expected component already exists, test and extend the existing implementation rather than creating a competing implementation.

If the implementation differs from an expected design, adapt the tests to the actual implementation where appropriate and make only the smallest necessary production-code correction when a genuine defect is discovered.

Never claim that tests pass unless they were actually executed successfully.

---

# 2. PRIMARY OBJECTIVE

Build a production-grade automated QA foundation that verifies:

* business invariants
* domain behavior
* API contracts
* database integrity
* transactions
* concurrency
* authentication
* authorization
* tenant/seller isolation
* payment correctness
* webhook idempotency
* inventory correctness
* checkout correctness
* order lifecycle correctness
* fulfillment correctness
* return/refund correctness
* review eligibility and moderation
* search projection behavior
* notifications
* Redis behavior where applicable
* BullMQ jobs
* outbox/event processing
* event idempotency
* retries and failure handling
* rate limiting
* privacy boundaries
* error handling
* observability behavior
* migration integrity
* critical integration boundaries

The objective is not maximum line coverage.

The objective is high confidence in critical production behavior.

---

# 3. TESTING PRINCIPLES

Follow these rules throughout the implementation.

## 3.1 Test real behavior

Tests must validate actual application behavior.

Do not create tests that merely assert that mocks were called without verifying meaningful outcomes.

Avoid tests that pass while the underlying feature is broken.

## 3.2 No fake success

Do not make tests pass by weakening production behavior.

Do not remove validation.

Do not bypass authorization.

Do not disable transactions.

Do not weaken security.

Do not modify production logic solely to accommodate an incorrect test.

If production behavior is incorrect, fix the underlying defect safely.

## 3.3 Deterministic tests

Tests must be:

* deterministic
* isolated
* repeatable
* independently executable
* safe to run repeatedly
* safe to run in CI
* independent of test execution order

Do not rely on:

* developer machines
* manually prepared database state
* production services
* real customer data
* arbitrary timing
* fixed IDs
* fixed timestamps where unnecessary
* external network services
* previous test execution

## 3.4 No brittle implementation-detail testing

Prefer testing:

* public behavior
* domain invariants
* API contracts
* persistence guarantees
* security boundaries
* externally observable outcomes

Do not tightly couple tests to irrelevant internal implementation details.

## 3.5 Production-like behavior

Integration tests must exercise real:

* PostgreSQL behavior where appropriate
* Prisma behavior
* transaction behavior
* constraints
* Redis behavior where applicable
* queue behavior where practical

Use mocks only where a real external provider is inappropriate, unavailable, expensive, or nondeterministic.

---

# 4. TEST ARCHITECTURE

Establish a clear test taxonomy.

At minimum distinguish:

### Unit tests

For:

* pure domain logic
* business rules
* validators
* policies
* pricing calculations
* promotion rules
* authorization policies
* state transitions
* idempotency logic
* mapping/serialization logic
* deterministic utilities

### Integration tests

For:

* PostgreSQL
* Prisma
* repositories
* transactions
* Redis
* queues
* outbox processing
* event handlers
* domain/application service integration

### API tests

For:

* HTTP endpoints
* authentication
* authorization
* DTO validation
* serialization
* error responses
* pagination
* idempotency
* rate limiting
* OpenAPI contracts where practical

### Security tests

For:

* IDOR
* privilege escalation
* seller isolation
* unauthorized access
* authentication bypass
* token/session abuse
* injection
* mass assignment
* sensitive-data exposure
* rate-limit bypass
* webhook verification
* unsafe file/media boundaries where applicable

### Critical workflow tests

For complete backend workflows such as:

* registration/login
* product creation
* seller offer creation
* inventory reservation
* cart lifecycle
* checkout
* order creation
* payment
* webhook processing
* fulfillment
* return/refund
* review publication
* notification generation

---

# 5. TEST ENVIRONMENT

Create or improve a dedicated automated test environment.

It must provide:

* isolated database
* isolated Redis where Redis is required
* isolated queues where queues are required
* deterministic configuration
* safe test secrets
* controlled clock/time where needed
* predictable logging
* controlled external integrations

Never use production credentials.

Never use production databases.

Never expose real secrets in tests.

Use environment-specific test configuration.

If Docker/Testcontainers or an existing repository-native integration environment is already present, reuse it when appropriate.

Do not introduce unnecessary infrastructure if an adequate test environment already exists.

---

# 6. TEST DATA FACTORIES AND FIXTURES

Create maintainable test factories/builders for the major domain entities actually present in the repository.

Potential entities include:

* User
* Credential
* Session
* Device
* CustomerProfile
* Address
* Seller
* SellerUser
* Product
* ProductVariant
* SKU
* Category
* Brand
* SellerOffer
* Price
* Promotion
* Coupon
* InventoryLocation
* InventoryItem
* InventoryReservation
* InventoryMovement
* Cart
* CartItem
* CheckoutSession
* Order
* OrderItem
* Payment
* PaymentAttempt
* Refund
* PaymentWebhookEvent
* Shipment
* ShipmentItem
* TrackingEvent
* ReturnRequest
* ReturnItem
* Review
* ReviewMedia
* ReviewReport
* Notification
* NotificationPreference
* DevicePushToken
* OutboxEvent
* IdempotencyRecord

Only create factories for entities that actually exist or are required by the implemented system.

Factories must:

* generate valid data by default
* allow targeted overrides
* avoid duplicated setup logic
* respect database constraints
* support isolated tests
* avoid accidental cross-test state

Do not create unrealistic fixture data merely to increase coverage.

---

# 7. DATABASE TESTING

Verify PostgreSQL and Prisma behavior.

Test:

* migrations
* schema integrity
* required fields
* unique constraints
* foreign keys
* indexes where behaviorally relevant
* enum constraints
* cascading behavior
* soft deletion behavior where implemented
* transaction boundaries
* rollback behavior
* concurrent updates
* race conditions
* atomic state transitions

Verify that invalid states cannot be persisted.

Test important invariants at the database level rather than assuming application code always behaves correctly.

---

# 8. MONEY AND FINANCIAL PRECISION

Financial behavior must receive dedicated tests.

Verify:

* exact monetary representation
* currency handling
* decimal precision
* rounding rules
* subtotal calculation
* discounts
* promotions
* coupons
* tax calculations where implemented
* shipping charges
* order totals
* payment amounts
* refund amounts
* partial refunds
* reconciliation calculations

Do not use floating-point comparisons for monetary correctness where exact decimal/integer semantics are required.

Test:

* zero values
* minimum values
* large values
* fractional currencies where applicable
* rounding boundaries
* multiple line items
* multiple discounts
* partial refunds

Ensure totals cannot be manipulated through client-provided values.

---

# 9. AUTHENTICATION TESTING

Test the complete authentication implementation actually present.

Cover:

* registration
* login
* invalid credentials
* account status restrictions
* session creation
* session expiration
* logout
* token/session invalidation
* refresh behavior
* device/session management
* password handling
* credential validation
* brute-force protection
* rate limiting
* unauthorized requests
* malformed tokens
* expired tokens
* revoked sessions
* privilege changes
* security-sensitive account changes

Never expose passwords, password hashes, session secrets, access tokens, refresh tokens, or other secrets in API responses or logs.

---

# 10. AUTHORIZATION AND IDOR TESTING

Authorization requires dedicated adversarial tests.

Test:

* customer accessing another customer's profile
* customer accessing another customer's address
* customer accessing another customer's order
* customer modifying another customer's cart
* seller accessing another seller's products
* seller accessing another seller's offers
* seller accessing another seller's inventory
* seller accessing another seller's orders
* seller accessing another seller's fulfillment data
* seller accessing another seller's reviews where restricted
* unauthorized admin operations
* insufficient-role operations
* suspended users
* deleted/disabled accounts
* resource IDs manipulated through URLs
* IDs manipulated through request bodies
* IDs manipulated through query parameters

Do not rely on hidden UI elements for authorization.

Every server-side authorization boundary must be tested.

---

# 11. SELLER ISOLATION TESTING

Because this is a marketplace, seller isolation is critical.

Create tests proving that:

* Seller A cannot read Seller B's private data.
* Seller A cannot modify Seller B's products where unauthorized.
* Seller A cannot modify Seller B's offers.
* Seller A cannot modify Seller B's inventory.
* Seller A cannot access Seller B's fulfillment information.
* Seller A cannot manipulate Seller B's orders.
* Seller A cannot alter another seller's pricing.
* Seller A cannot access another seller's private analytics if such functionality exists.
* Seller roles are enforced independently within the seller boundary.

Test direct ID manipulation rather than only normal UI flows.

---

# 12. CATALOG TESTING

Test implemented catalog behavior.

Cover:

* product creation
* product updates
* product lifecycle
* variant relationships
* SKU uniqueness
* category relationships
* category hierarchy
* category cycle prevention
* brand relationships
* product visibility
* seller offer association
* product media references
* invalid product states
* unauthorized product changes

Verify that catalog state remains consistent with seller and offer relationships.

---

# 13. PRICING, PROMOTIONS, AND COUPONS

Test:

* price creation
* price updates
* effective dates
* inactive prices
* promotion eligibility
* promotion expiration
* coupon validity
* coupon ownership
* redemption limits
* duplicate redemption prevention
* minimum order requirements
* seller restrictions
* product/category restrictions
* stacking rules
* concurrency around coupon redemption

Test malicious attempts to alter:

* price
* discount
* seller
* promotion
* coupon
* quantity

All authoritative values must originate from trusted backend state.

---

# 14. INVENTORY TESTING

Inventory requires both correctness and concurrency testing.

Test:

* stock creation
* stock adjustments
* availability calculation
* reservation creation
* reservation expiration
* reservation release
* reservation consumption
* cancellation
* insufficient stock
* duplicate reservation requests
* duplicate release requests
* duplicate consumption requests
* negative inventory prevention
* invalid quantity
* seller isolation
* SKU/offer consistency

## Concurrency

Create tests for concurrent purchase/reservation attempts against limited stock.

Verify:

* stock cannot become negative
* inventory cannot be oversold
* reservations cannot exceed available inventory
* duplicate operations are idempotent
* race conditions do not create inconsistent states
* failed transactions roll back correctly
* retries do not double-consume inventory

Use real database concurrency behavior where appropriate.

Do not replace concurrency tests with simplistic mocked locks.

---

# 15. CART TESTING

Test:

* cart creation
* adding items
* updating quantities
* removing items
* ownership
* anonymous carts if implemented
* authenticated carts
* cart merge
* duplicate item behavior
* unavailable products
* unavailable offers
* invalid quantities
* seller boundaries
* stale pricing
* inventory changes
* cart expiration where implemented

Verify that cart state is not incorrectly treated as a final order.

---

# 16. CHECKOUT TESTING

Test checkout as a critical workflow.

Cover:

* valid checkout
* empty cart
* stale cart
* unavailable inventory
* changed price
* changed promotion
* invalid coupon
* invalid address
* invalid shipping selection
* multiple sellers
* reservation creation
* reservation failure
* checkout expiration
* duplicate checkout submission
* idempotent checkout requests
* concurrent checkout attempts
* partial failure recovery

Verify that client-supplied totals are never trusted.

---

# 17. ORDER TESTING

Test:

* order creation
* order numbering
* order items
* immutable item snapshots
* pricing snapshots
* shipping address snapshot
* seller association
* order totals
* status transitions
* invalid transitions
* order history
* cancellation
* authorization
* multi-seller orders
* multi-shipment orders

Verify that historical order information does not unexpectedly change when the underlying catalog, pricing, seller, or customer data changes.

Test duplicate order creation under retry/network conditions.

---

# 18. PAYMENT TESTING

Payment behavior must be tested conservatively.

Cover:

* payment creation
* payment attempts
* PaymentIntent association
* successful payment
* failed payment
* requires-action payment
* processing state
* cancellation
* capture where implemented
* refund
* partial refund
* duplicate refund attempts
* payment/order consistency
* payment idempotency
* application idempotency
* provider idempotency

Never test using real production payment credentials.

Use Stripe test/sandbox behavior only when properly configured.

Do not create fake assertions that claim Stripe behavior that was never exercised.

---

# 19. STRIPE WEBHOOK TESTING

Test webhook handling independently and end-to-end where feasible.

Verify:

* raw request body handling
* signature verification
* invalid signature rejection
* malformed event rejection
* duplicate provider event handling
* durable provider event ID uniqueness
* idempotent processing
* event ordering assumptions
* out-of-order events
* retry behavior
* processing failures
* reconciliation behavior
* safe state transitions
* no duplicate payment effects
* no duplicate refunds
* no duplicate order state changes

Test repeated delivery of the exact same provider event.

The result must remain correct.

Never bypass signature verification merely to make tests easier.

---

# 20. REFUND TESTING

Test:

* full refunds
* partial refunds
* duplicate refund requests
* refund amount exceeding refundable amount
* multiple partial refunds
* failed refund provider operation
* retry
* idempotency
* order/payment state synchronization
* return-driven refunds
* authorization

Verify that total refunded amount can never exceed the captured/payment-authorized amount according to the actual business rules.

---

# 21. FULFILLMENT AND SHIPPING TESTING

Test implemented fulfillment behavior:

* fulfillment group creation
* shipment creation
* shipment item association
* seller ownership
* status transitions
* invalid transitions
* shipment cancellation
* partial shipment
* multi-seller shipment behavior
* tracking event persistence
* provider event deduplication
* tracking state updates

Do not test fictional carrier capabilities.

Provider integrations must use real test/sandbox interfaces or deterministic adapters explicitly designed for testing.

---

# 22. RETURNS TESTING

Test:

* eligibility
* return request creation
* unauthorized return access
* invalid quantities
* duplicate requests
* approval/rejection
* cancellation
* shipment/return tracking
* received state
* inspection
* refund eligibility
* refund creation
* inventory restoration
* damaged item handling
* idempotency
* concurrency

Verify that return quantities cannot exceed the eligible purchased quantity.

---

# 23. REVIEW TESTING

Test:

* review creation
* rating validation
* verified purchase eligibility
* product/order relationship
* duplicate review prevention
* editing
* removal
* moderation
* reporting
* publication
* hidden/rejected/removed states
* review media authorization
* seller isolation
* rating aggregation

Test attempts to create reviews for:

* products not purchased
* products purchased by another customer
* unauthorized orders
* nonexistent items
* excessive quantities
* duplicate purchases

---

# 24. SEARCH PROJECTION TESTING

Because search is a projection rather than the transactional source of truth, test:

* product indexing
* update propagation
* deletion/unpublishing propagation
* seller visibility
* offer visibility
* price projection
* inventory projection
* rating projection
* category projection
* event-driven indexing
* duplicate events
* out-of-order events
* failed indexing
* retry
* dead-letter behavior
* reindex behavior
* reconciliation behavior

Search tests must never establish search as the authoritative source of commerce state.

Verify that stale search data cannot bypass server-side authorization or transactional validation.

---

# 25. REDIS TESTING

Where Redis is actually used, test its intended semantics.

Cover:

* cache behavior
* cache invalidation
* TTL
* rate limiting
* counters
* ephemeral state
* idempotency support where applicable
* locks/coordination where actually implemented
* stale cache behavior
* Redis unavailable behavior

Verify that Redis failure does not silently corrupt authoritative transactional data.

Where Redis is non-authoritative, tests must prove the application can recover from cache misses.

---

# 26. BULLMQ TESTING

Test implemented queues and workers.

Verify:

* job creation
* correct payload
* job identity
* idempotency
* retry behavior
* exponential/backoff behavior where configured
* timeout handling
* concurrency limits
* duplicate jobs
* failed jobs
* dead-letter handling
* worker restart behavior
* graceful shutdown
* database consistency

Test important jobs such as:

* inventory reservation expiration
* notification delivery
* search indexing
* media processing
* reconciliation
* other implemented background jobs

Do not assert timing-sensitive behavior using arbitrary sleeps where deterministic job control is possible.

---

# 27. OUTBOX AND EVENT TESTING

Test the event/outbox architecture.

Verify:

* domain transaction and outbox persistence consistency
* event envelope
* event type
* version
* aggregate identity
* event ID
* timestamp
* correlation information
* serialization
* duplicate delivery
* consumer idempotency
* retry
* failure handling
* DLQ
* replay where implemented
* out-of-order events where relevant

Critical rule:

If a database transaction commits a business state change, verify that the corresponding durable event/outbox behavior is also correct according to the actual implementation.

Test crash/failure boundaries where practical.

---

# 28. EVENT IDEMPOTENCY

Every critical event consumer must be tested against duplicate delivery.

Examples:

* payment event delivered twice
* order event delivered twice
* inventory event delivered twice
* search indexing event delivered twice
* notification event delivered twice
* fulfillment event delivered twice

Verify that duplicate events do not create:

* duplicate payments
* duplicate refunds
* duplicate reservations
* duplicate order transitions
* duplicate notifications
* duplicate search records
* duplicate shipments

---

# 29. NOTIFICATION TESTING

Test the implemented notification system.

Cover:

* recipient resolution
* notification persistence
* notification types
* preferences
* read/unread state
* unread counts
* multi-device behavior
* duplicate event handling
* template selection
* locale behavior where implemented
* delivery attempts
* retry
* provider failure
* SSE delivery where implemented

Verify that users cannot manipulate notification recipients through client input.

Never expose device push tokens or provider secrets.

---

# 30. SSE / REAL-TIME TESTING

Where SSE is implemented, test:

* authentication
* authorization
* connection establishment
* event delivery
* event filtering
* user isolation
* reconnect behavior
* disconnect handling
* duplicate event handling
* malformed events
* server shutdown behavior

Do not assume SSE is a replacement for durable notification retrieval.

Verify that REST/API recovery remains possible where the architecture requires it.

---

# 31. API CONTRACT TESTING

Test every critical API family that actually exists.

Verify:

* HTTP method
* route
* authentication requirements
* authorization
* request validation
* response status
* response schema
* error schema
* pagination
* sorting
* filtering
* idempotency behavior
* content types
* serialization
* nullability
* enum values

Where OpenAPI is generated, validate that the implementation and documentation remain consistent.

Test malformed requests deliberately.

---

# 32. ERROR HANDLING

Verify that errors are:

* deterministic
* structured
* safe
* actionable
* correctly classified
* free of secrets
* free of internal stack traces in production responses
* correctly mapped to HTTP status codes

Test:

* validation errors
* authentication errors
* authorization errors
* not found
* conflict
* business-rule failures
* idempotency conflicts
* dependency failures
* database failures
* queue failures
* provider failures
* timeouts

---

# 33. RATE LIMITING AND ABUSE TESTING

Test implemented rate limits.

Cover:

* login
* registration
* password/credential operations
* coupon redemption
* review creation
* checkout
* payment actions
* webhook endpoints
* search
* expensive endpoints
* notification endpoints
* administrative operations

Verify that:

* rate limits are enforced server-side
* attackers cannot trivially bypass them by manipulating client input
* legitimate traffic is not accidentally blocked due to incorrect keying
* Redis failures have safe behavior
* limits are applied to the correct security boundary

---

# 34. SECURITY REGRESSION TESTS

Build automated regression coverage for critical security risks:

* IDOR
* broken access control
* privilege escalation
* mass assignment
* SQL injection
* NoSQL/query injection where applicable
* command injection
* SSRF
* XSS through persisted content where applicable
* malicious URLs
* unsafe redirects
* path traversal
* malicious media metadata
* webhook spoofing
* token leakage
* sensitive response fields
* excessive data exposure
* brute-force attacks
* rate-limit bypass

Do not introduce destructive security tests against production systems.

---

# 35. PRIVACY TESTING

Verify that API responses do not expose unnecessary private information.

Test:

* customer data isolation
* seller-private information
* payment data
* authentication data
* session information
* push tokens
* internal IDs where exposure is inappropriate
* administrative information
* private audit information

Ensure logs and errors do not leak:

* passwords
* tokens
* API keys
* Stripe secrets
* webhook secrets
* database credentials
* unnecessary personal data
* payment card information

---

# 36. OBSERVABILITY TESTING

Verify critical observability behavior where implemented.

Test that:

* request correlation IDs are available
* errors produce appropriate logs
* critical operations emit expected metrics/events
* trace context is propagated where implemented
* sensitive data is excluded from logs

Do not make tests dependent on exact log formatting unless the format is itself a required contract.

---

# 37. FAILURE AND RECOVERY TESTING

Test important dependency failures.

Examples:

* PostgreSQL unavailable
* Redis unavailable
* search unavailable
* queue unavailable
* Stripe unavailable
* notification provider unavailable
* event consumer failure
* indexing failure

Verify graceful degradation where supported.

Critical transactional operations must not silently report success when the authoritative operation failed.

Noncritical dependencies should not unnecessarily block critical commerce operations.

---

# 38. TRANSACTION AND ROLLBACK TESTING

For critical workflows, deliberately force failures at transaction boundaries.

Verify rollback of:

* inventory changes
* reservations
* order creation
* payment records
* refund records
* coupon redemption
* return state
* review state
* outbox records

Ensure partially completed business operations cannot leave invalid durable state.

---

# 39. CONCURRENCY TESTING

Create deterministic concurrency tests for critical race conditions.

At minimum evaluate:

* simultaneous inventory reservations
* simultaneous cart updates
* simultaneous checkout
* duplicate payment confirmation
* duplicate webhook processing
* simultaneous refund requests
* simultaneous coupon redemption
* simultaneous return requests
* simultaneous review creation
* competing seller updates where relevant

Verify database-level correctness rather than relying exclusively on application-level checks.

---

# 40. MIGRATION TESTING

Test the migration process.

Verify:

* clean database migration
* migration ordering
* migration reproducibility
* schema consistency
* constraints
* indexes
* enum changes
* safe rollback strategy where supported
* seed/test initialization
* application compatibility after migration

Do not silently alter existing migration history merely to make tests pass.

---

# 41. TEST ISOLATION AND CLEANUP

Every test suite must leave the environment predictable.

Implement appropriate:

* transaction rollback
* fixture cleanup
* database reset
* unique test identifiers
* queue cleanup
* Redis namespace isolation
* temporary resource cleanup

Do not allow one test to depend on data created by another test.

Parallel execution must be safe where the test architecture supports it.

---

# 42. TEST COMMANDS

Ensure the repository exposes clear commands for at least:

* unit tests
* integration tests
* API tests
* security tests
* full backend test suite
* coverage

Use the repository's existing package manager and workspace conventions.

Do not introduce conflicting scripts.

Update documentation only where necessary.

---

# 43. COVERAGE STRATEGY

Configure meaningful coverage reporting.

Prioritize coverage for:

1. authentication
2. authorization
3. seller isolation
4. money calculations
5. inventory
6. reservations
7. checkout
8. orders
9. payments
10. webhooks
11. refunds
12. fulfillment
13. returns
14. promotions/coupons
15. reviews
16. event processing
17. queues
18. idempotency
19. security-sensitive operations

Do not pursue artificial 100% coverage.

A high coverage percentage is meaningless if critical behavior is untested.

---

# 44. CI INTEGRATION

Inspect the repository's existing CI/CD configuration.

Integrate appropriate automated test stages for:

* type checking
* linting
* unit tests
* integration tests
* API tests
* security regression tests
* migration validation
* coverage reporting

Tests must be suitable for CI environments.

Do not require production credentials.

Do not require manually started developer services unless the CI configuration explicitly provisions them.

If Docker/Testcontainers is used, ensure CI can run it reliably.

---

# 45. TEST PERFORMANCE

Keep the test suite maintainable and reasonably fast.

Use:

* focused unit tests for pure logic
* integration tests for actual infrastructure behavior
* reusable factories
* efficient database setup
* controlled parallelism
* selective expensive tests

Do not convert every test into a full end-to-end test.

Do not sacrifice critical correctness for speed.

---

# 46. TEST QUALITY REVIEW

After implementation, inspect the tests themselves.

Remove tests that:

* test nothing meaningful
* merely test mocks
* depend on ordering
* depend on arbitrary sleeps
* use unrealistic fixtures
* bypass authorization
* disable validation
* assert implementation details unnecessarily
* contain hidden external dependencies
* pass despite broken functionality

Every critical test should have a clear reason to exist.

---

# 47. REQUIRED VALIDATION

Before considering this phase complete:

1. Run formatting where configured.
2. Run linting.
3. Run TypeScript type checking.
4. Run unit tests.
5. Run integration tests.
6. Run API tests.
7. Run security tests.
8. Run migration/schema validation.
9. Run the full backend test suite.
10. Generate coverage.
11. Fix genuine failures.
12. Re-run affected tests.
13. Re-run the full relevant suite.
14. Verify deterministic behavior by running critical suites more than once where practical.
15. Confirm no test requires production secrets.
16. Confirm no test uses production infrastructure.
17. Confirm no sensitive information is committed.
18. Confirm CI configuration is consistent with local test commands.

Do not report success unless the commands were actually executed.

---

# 48. IMPLEMENTATION SAFETY

During this phase:

* Do not rewrite unrelated production modules.
* Do not regenerate unchanged files.
* Do not create duplicate test frameworks without justification.
* Do not create duplicate domain implementations.
* Do not modify API contracts solely to simplify testing.
* Do not weaken production security.
* Do not disable authentication in production code.
* Do not disable authorization.
* Do not replace real database constraints with mocks.
* Do not hardcode secrets.
* Do not use production data.
* Do not create fake provider capabilities.
* Do not introduce placeholder tests.
* Do not add TODO/FIXME placeholders.
* Do not claim coverage that was not generated.
* Do not claim tests passed when they were not executed.

If a dependency or external provider cannot be exercised in the current environment, implement a truthful test boundary and clearly document what remains externally dependent.

---

# 49. SCOPE BOUNDARY

This phase focuses primarily on backend and server-side QA.

Do NOT attempt to complete the entire frontend/mobile/release QA program in this phase.

Defer the following to the subsequent QA phase unless a small foundational change is required here:

* comprehensive browser E2E testing
* comprehensive React Native E2E testing
* device matrix testing
* visual regression testing
* full accessibility testing
* responsive-layout testing
* browser compatibility testing
* mobile compatibility testing
* full load testing
* stress testing
* chaos testing
* disaster-recovery validation
* final release certification
* complete production performance benchmarking

You may create foundational backend hooks or test utilities required by those later activities, but do not duplicate their full scope here.

---

# 50. FINAL ENGINEERING REPORT

After implementation and validation, provide a factual report containing:

## Repository audit

* backend architecture discovered
* existing testing infrastructure
* test framework(s)
* integration infrastructure
* CI configuration

## Implemented QA

* test suites added
* test infrastructure added
* fixtures/factories added
* security tests added
* concurrency tests added
* API tests added
* database tests added
* event/queue tests added

## Validation

* commands executed
* results
* coverage results
* failed tests and resolutions
* known limitations

## Remaining risks

List only genuine remaining risks.

Clearly distinguish:

* implemented
* tested
* partially tested
* unavailable in the current environment
* intentionally deferred

Never claim complete QA coverage merely because a test framework exists.

The final report must reflect the actual repository state and actual command results.
