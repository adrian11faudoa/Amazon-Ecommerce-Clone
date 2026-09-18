# Amazon-Style Ecommerce Marketplace — QA Prompt — Volume 2

## ROLE

Act as the complete senior quality engineering organization responsible for implementing comprehensive backend, API, data-consistency, security-boundary, asynchronous-workflow, integration, and transactional test coverage for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff Backend QA Engineer
* Staff SDET
* API Test Engineer
* Database Test Engineer
* Distributed Systems Test Engineer
* Security Test Engineer
* Reliability Test Engineer
* Integration Test Engineer
* Performance-Aware Test Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement production-grade automated backend and integration test coverage for the marketplace's actual business domains and infrastructure contracts.

This is an incremental implementation task.

Do not implement QA work outside the scope defined in this prompt.

---

# PROJECT

Build and validate an original Amazon-style ecommerce marketplace serving:

* millions of customers
* thousands of sellers
* large product catalogs
* high request volumes
* large media volumes
* asynchronous workflows
* customer and seller web applications
* customer mobile applications
* backend APIs and workers
* search infrastructure
* payments
* notifications
* analytics
* administrative operations
* high availability requirements
* horizontal scalability
* disaster recovery requirements
* strict security and tenant-isolation requirements

The repository is the source of truth for:

* actual backend modules
* APIs
* DTOs
* database schemas
* services
* queues
* events
* permissions
* state machines
* integrations
* infrastructure adapters
* current business rules
* existing test infrastructure

Do not invent undocumented business rules merely to create tests.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction:

### Backend

* NestJS
* TypeScript
* REST
* OpenAPI
* WebSockets/SSE where justified
* webhooks

### Data

* PostgreSQL
* Prisma
* Redis
* BullMQ
* Elasticsearch/OpenSearch
* S3-compatible object storage

### External Integrations

* Stripe or equivalent payment provider abstraction
* shipping providers where implemented
* email/SMS/push providers where implemented

### Infrastructure

* AWS
* Docker
* Kubernetes/EKS
* Helm
* Terraform or repository-compatible IaC

---

# PRIMARY OBJECTIVE

Implement high-value automated backend and integration tests covering the marketplace's actual business-critical behavior.

The resulting test suite must detect:

* incorrect authorization
* seller cross-tenant access
* customer privacy leaks
* invalid state transitions
* inventory races
* checkout inconsistencies
* duplicate financial operations
* webhook replay
* queue failures
* outbox inconsistencies
* stale data
* cache errors
* search synchronization errors
* media authorization failures
* notification failures
* transaction failures
* retry/idempotency defects

The tests must provide real protection against regressions.

---

# EXECUTION RULE

Inspect the repository before changing anything.

Determine:

* actual backend modules
* current service boundaries
* existing test suites
* existing factories
* current Prisma schema
* migration structure
* queue definitions
* event definitions
* outbox implementation
* state machines
* authorization guards
* API controllers
* DTO validation
* error contracts
* cache patterns
* search adapters
* object-storage adapters
* payment adapters
* webhook handlers
* notification services

Do not rewrite working test infrastructure from the previous QA foundation unless necessary.

Extend the repository's existing test architecture.

---

# CURRENT SCOPE

Implement comprehensive backend and integration test coverage for the core marketplace domains.

This prompt focuses on business correctness and cross-system integration rather than UI/E2E coverage.

---

# 1. Identity and Authentication Tests

Implement backend tests for:

* registration
* login
* logout
* token/session lifecycle
* email verification
* password reset
* credential validation
* session revocation
* expired credentials
* invalid credentials
* account restrictions
* account deactivation
* security-sensitive account changes

Verify both successful and failure paths.

---

# 2. Authentication Security

Test against:

* missing credentials
* malformed tokens
* expired tokens
* revoked tokens
* altered tokens
* wrong audience/issuer where applicable
* token replay
* session fixation risks where applicable
* privilege escalation attempts

Do not merely test that the authentication guard returns `401`.

Verify that protected business operations remain inaccessible.

---

# 3. Authorization Matrix Testing

Create reusable authorization matrices for:

* customer
* seller owner
* seller staff
* support/operations roles
* moderator
* administrator
* internal service identities where applicable

Test:

* allowed operations
* denied operations
* resource ownership
* role combinations
* restricted resources

---

# 4. Customer Isolation

Implement tests ensuring one customer cannot access another customer's:

* account information
* addresses
* carts
* orders
* payment-related information
* returns
* notifications
* private support information

Test both direct-ID access and list/filter endpoints.

---

# 5. Seller Isolation

Implement comprehensive seller-isolation testing.

A seller must not be able to access another seller's:

* products
* variants/SKUs
* offers
* prices
* inventory
* orders
* shipments
* returns
* reviews requiring restricted seller access
* analytics
* reports
* private media
* staff records
* operational configuration

Test both explicit resource access and filtered collection endpoints.

---

# 6. Administrative Authorization

Verify administrative actions cannot be performed by ordinary users.

Test:

* seller verification
* account restriction
* moderation decisions
* audit access
* operational controls
* bulk actions
* configuration changes
* report generation

Where roles have different capabilities, test the exact boundary.

---

# 7. Catalog Tests

Implement integration tests for:

* category creation
* category hierarchy
* product creation
* product updates
* variant/SKU management
* attributes
* publication
* unpublication
* seller offers
* offer association
* invalid product state
* duplicate identifiers
* invalid relationships

Verify database constraints and application validation together.

---

# 8. Catalog Authorization

Test that:

* only authorized sellers can modify their own catalog data
* public users see only published content
* unpublished products remain appropriately restricted
* seller-private fields are not exposed
* administrative overrides behave according to role

Do not assume frontend filtering is a security control.

---

# 9. Product Publication State

Create tests for product/offer publication state transitions.

Cover:

* draft
* pending/review states where implemented
* published
* unpublished
* restricted
* archived where implemented

Reject invalid transitions.

---

# 10. Pricing Tests

Implement tests for:

* base price
* seller offer price
* sale price
* effective price
* currency
* price validity windows
* invalid values
* price precedence
* price changes

Verify that public pricing is calculated from the authoritative backend state.

---

# 11. Promotion Tests

Test:

* valid promotions
* invalid promotions
* expired promotions
* not-yet-active promotions
* usage limits
* customer eligibility
* seller eligibility
* product/category eligibility
* stackability
* promotion removal
* promotion recalculation

Test both positive and negative cases.

---

# 12. Promotion Concurrency

Test concurrent promotion redemption where limits matter.

Verify that:

* usage limits are not exceeded
* duplicate requests do not double-consume usage
* retries preserve correctness
* failed transactions do not consume valid usage

---

# 13. Inventory Tests

Implement comprehensive inventory integration tests.

Cover:

* stock creation
* adjustment
* increment
* decrement
* reservation
* reservation expiration
* release
* consumption
* reconciliation
* insufficient inventory
* invalid quantities

---

# 14. Inventory Concurrency

Create tests specifically targeting race conditions.

Scenarios should include:

* two customers attempting to purchase the final unit
* multiple checkout attempts against limited stock
* simultaneous inventory adjustments
* reservation and expiration racing
* reservation and cancellation racing
* duplicate consumption requests

Verify that overselling cannot occur under the implemented transaction/locking model.

---

# 15. Inventory Failure Recovery

Test partial failures such as:

* reservation succeeds but downstream checkout fails
* persistence fails after reservation attempt
* release fails
* worker retry occurs
* expiration job runs twice
* reconciliation discovers an inconsistency

Verify compensation behavior.

---

# 16. Cart Tests

Implement integration tests for:

* cart creation
* adding items
* removing items
* quantity updates
* unavailable items
* price changes
* promotion changes
* inventory changes
* cart expiration where applicable
* empty cart handling

---

# 17. Cart Merge

Test guest-to-authenticated cart merge behavior.

Cover:

* no overlap
* same SKU in both carts
* quantity conflicts
* unavailable products
* pricing changes
* promotion changes
* oversized quantities
* deleted products

Verify deterministic merge behavior.

---

# 18. Checkout Tests

Implement comprehensive checkout integration tests.

Cover:

* valid checkout
* invalid customer
* invalid address
* unavailable item
* price change
* promotion failure
* inventory reservation failure
* shipping-option failure
* payment initiation failure
* duplicate checkout request
* retry after partial failure

---

# 19. Checkout Idempotency

Test repeated requests with the same idempotency key.

Verify:

* only one checkout outcome
* no duplicate inventory reservation
* no duplicate order
* no duplicate payment operation
* same logical result for repeated requests

Test idempotency-key collision with different request payloads where the implementation defines such behavior.

---

# 20. Checkout Concurrency

Test concurrent checkout requests for:

* same cart
* same inventory
* same promotion
* same customer

Ensure the final state is consistent.

---

# 21. Order Creation

Implement tests for order creation from successful checkout.

Verify:

* line items
* prices
* discounts
* tax/shipping totals where implemented
* currency
* customer ownership
* seller attribution
* inventory consumption
* payment association
* initial state

Do not rely only on HTTP-level assertions.

Verify persisted state.

---

# 22. Order State Machines

Test every implemented order state transition.

For each transition verify:

* valid source state
* valid target state
* authorization
* side effects
* events
* audit records
* invalid-transition rejection

---

# 23. Payment Integration Tests

Use provider sandbox/test mechanisms or controlled adapters.

Test:

* successful authorization
* failed payment
* cancellation
* webhook confirmation
* duplicate webhook
* delayed webhook
* provider timeout
* provider rejection
* refund
* partial refund
* reconciliation

Never use real financial credentials in CI.

---

# 24. Payment Idempotency

Test repeated payment requests.

Verify that retries do not create:

* duplicate charges
* duplicate payment records
* duplicate order transitions

---

# 25. Payment Webhook Security

Test:

* valid signature
* invalid signature
* altered body
* missing signature
* replayed event
* duplicate event identifier
* out-of-order event
* unsupported event type

Verify that invalid webhook requests cannot mutate financial state.

---

# 26. Payment Reconciliation

Test reconciliation behavior when:

* local state says pending but provider says successful
* local state says failed but provider says successful
* refund status differs
* webhook was missed
* duplicate notification arrives

Verify deterministic reconciliation.

---

# 27. Fulfillment Tests

Implement tests for:

* fulfillment creation
* seller fulfillment state
* shipment creation
* carrier information
* tracking updates
* shipment state
* delivery state

Verify seller/customer access boundaries.

---

# 28. Cancellation Tests

Test cancellation rules for:

* allowed states
* disallowed states
* customer cancellation
* seller cancellation
* administrative cancellation
* paid orders
* shipped orders
* partially fulfilled orders where supported

Verify:

* inventory behavior
* payment/refund behavior
* events
* notifications

---

# 29. Returns Tests

Test:

* return eligibility
* return creation
* return reason
* status transitions
* authorization
* seller interaction
* item validation
* return deadlines
* duplicate return attempts

---

# 30. Refund Tests

Test:

* full refund
* partial refund
* duplicate refund request
* invalid amount
* refund after cancellation
* refund state transitions
* provider failure
* retry

Verify no refund exceeds refundable value.

---

# 31. Review Tests

Implement tests for:

* purchase verification
* review eligibility
* duplicate-review prevention
* rating range
* content validation
* edit
* delete
* report
* moderation
* seller response
* aggregate rating updates

---

# 32. Review Authorization

Verify:

* customers can modify only permitted reviews
* sellers cannot alter customer reviews
* sellers can respond only to reviews involving their products/offers
* moderators can perform only authorized actions
* private moderation information is not public

---

# 33. Notification Tests

Test:

* notification creation
* preference evaluation
* channel selection
* deduplication
* delivery
* retry
* provider failure
* read state
* deletion/retention where implemented

---

# 34. Notification Preferences

Verify that user preferences correctly suppress or allow applicable notification types.

Test channel-specific behavior:

* email
* push
* SMS
* in-app

where supported.

---

# 35. Notification Provider Failures

Test:

* timeout
* rejected delivery
* invalid recipient/device
* provider rate limit
* temporary provider outage
* retry exhaustion

Verify that provider failures do not corrupt the underlying business transaction.

---

# 36. Queue Integration Tests

For each actual critical BullMQ queue, test:

* producer behavior
* payload structure
* consumer behavior
* successful completion
* retry
* permanent failure
* duplicate execution
* idempotency
* delayed jobs
* worker shutdown

---

# 37. Queue Failure Isolation

Verify a failing worker or queue does not corrupt unrelated workflows.

Examples:

* notification worker failure does not cancel an order
* search indexing failure does not roll back the source catalog transaction
* report worker failure does not block checkout

---

# 38. Event Contract Tests

For each critical event, verify:

* event name
* version
* producer
* payload schema
* required identifiers
* timestamp
* correlation metadata
* consumer expectations

Test incompatible payloads where schema validation exists.

---

# 39. Outbox Integration Tests

Test:

* transaction writes business data and outbox event atomically
* event is not published if the transaction rolls back
* event is eventually published after successful commit
* failed publication is retried
* duplicate publication is safely handled

---

# 40. Search Integration Tests

Test the actual search integration against an isolated search service.

Cover:

* product indexing
* update indexing
* unpublish/removal
* seller offer changes
* price updates
* inventory availability updates where indexed
* faceting
* filters
* sorting
* autocomplete
* alias/index switching where implemented

---

# 41. Search Consistency Tests

Verify that eventually consistent search behavior remains within expected boundaries.

Test:

* source update
* indexing event
* delayed indexing
* indexing failure
* retry
* rebuild

Do not assert immediate search visibility if the architecture intentionally uses asynchronous indexing.

---

# 42. S3 Integration Tests

Test:

* authorized uploads
* unauthorized uploads
* pre-signed URL generation
* object ownership
* private downloads
* deletion
* invalid object key
* invalid content type
* expired URL behavior where testable

---

# 43. Media Authorization Tests

Specifically verify that:

* customer A cannot access customer B's private media
* seller A cannot access seller B's private media
* unauthorized users cannot guess valid object keys and retrieve private assets
* expired upload/download URLs cannot be reused beyond their intended validity

---

# 44. Rate-Limiting Integration Tests

Test actual configured rate limits for critical protected endpoints.

Cover:

* login
* password reset
* registration
* webhook endpoints
* sensitive seller/admin endpoints
* public APIs where rate limits exist

Verify that rate-limited requests do not mutate state.

---

# 45. Cache Integration Tests

Test cache behavior for actual cached resources.

Cover:

* cache hit
* cache miss
* invalidation
* expiration
* stale data
* cache failure
* fallback to authoritative storage

The system must remain correct when Redis is unavailable if the architecture specifies a fallback.

---

# 46. Cache Invalidation Tests

Verify that mutations invalidate or refresh relevant cache entries.

Examples:

* product update
* price change
* inventory availability change
* promotion change
* account setting change

Do not accept stale cache behavior when the contract requires immediate invalidation.

---

# 47. Transaction Boundary Tests

Identify critical transaction boundaries and verify them.

Examples:

* checkout
* order creation
* inventory reservation
* cancellation
* refund state
* seller catalog updates
* promotion usage

Test rollback behavior explicitly.

---

# 48. Failure Injection

Introduce controlled failure points into integration tests where practical.

Examples:

* database failure
* Redis failure
* search unavailable
* payment timeout
* notification provider failure
* queue publish failure
* S3 failure

Verify the application responds according to its defined resilience behavior.

Do not use destructive failure injection against production.

---

# 49. Timeout Testing

Verify timeout configuration for external dependencies.

Test:

* slow payment provider
* slow shipping provider
* slow notification provider
* slow search
* slow database operation

Ensure timeouts produce controlled failures rather than hanging requests indefinitely.

---

# 50. Retry Policy Testing

For each retry-enabled integration, test:

* first failure
* subsequent success
* maximum retry count
* backoff
* permanent failure
* duplicate handling

Do not allow retries to multiply financial operations.

---

# 51. API Pagination Tests

Test collection endpoints for:

* first page
* middle page
* final page
* empty result
* invalid cursor
* invalid limit
* stable ordering
* duplicate/missing records across pages

Where cursor pagination is used, test cursor behavior under concurrent inserts where applicable.

---

# 52. API Filtering and Sorting

Test supported:

* filters
* sorting
* search parameters
* date ranges
* status filters
* seller filters
* category filters

Verify unauthorized filters cannot expose restricted data.

---

# 53. Input Validation Tests

Test boundary conditions for:

* strings
* numeric quantities
* monetary values
* dates
* enums
* arrays
* pagination
* uploaded metadata
* addresses
* promotion values

Cover both malformed and semantically invalid inputs.

---

# 54. Error Handling Tests

Verify expected behavior for:

* not found
* conflict
* unauthorized
* forbidden
* validation failure
* rate limit
* dependency timeout
* provider failure
* internal failure

Ensure sensitive internal errors are not exposed to clients.

---

# 55. Audit Log Testing

Where audit logs are implemented, test that security-sensitive operations produce appropriate audit records.

Examples:

* login/security changes
* seller membership changes
* admin actions
* moderation
* refunds
* account restrictions
* sensitive configuration changes

Verify sensitive values are not stored in audit logs.

---

# 56. Data Consistency Testing

Create reconciliation-style integration tests for related records.

Examples:

* order totals versus line items
* payment amounts versus orders
* inventory versus reservations
* seller offers versus products
* review aggregates versus review records
* notification status versus delivery records

The tests should detect inconsistent persisted state.

---

# 57. Migration Tests

Validate database migrations from a clean environment.

Where realistic, also test migration upgrades from representative previous schema states.

Verify:

* migration success
* rollback assumptions where supported
* application startup against migrated schema
* backward compatibility during rolling deployment where applicable

Do not run destructive migration tests against production.

---

# 58. Seed and Fixture Integrity

Validate that test factories/fixtures create data satisfying:

* database constraints
* application validation
* required relationships
* authorization assumptions

Do not create invalid fixture data unless testing an invalid state intentionally.

---

# 59. Integration-Test Performance

Integration tests must remain practical at repository scale.

Avoid:

* unnecessary full-database resets for every small test
* excessive external-service startup
* long real-time waits
* giant fixture graphs

Measure slow test suites and optimize them without weakening coverage.

---

# 60. Backend Test Coverage Strategy

Prioritize coverage around:

* authorization
* financial correctness
* inventory correctness
* state transitions
* idempotency
* event/queue contracts
* data consistency
* failure recovery

Do not optimize solely for line coverage.

---

# 61. CI Quality Gates

Integrate these backend/integration suites with CI.

Critical failures should block promotion.

Categorize tests as:

* fast PR
* standard CI
* release-gate
* scheduled/deep validation

Do not run extremely expensive suites on every small pull request unless justified.

---

# 62. Scheduled Deep Testing

Where appropriate configure scheduled test suites for scenarios such as:

* concurrency
* failure injection
* full integration
* search rebuild
* provider failure
* data consistency reconciliation

Do not use scheduled tests to hide failures from pull requests.

---

# 63. Failure Artifacts

When backend/integration tests fail, retain useful artifacts such as:

* logs
* database diagnostics where safe
* queue state summaries
* request/response metadata without secrets
* screenshots only where applicable
* traces
* test reports

Never upload secrets or sensitive customer data as CI artifacts.

---

# 64. Test Data Privacy

Test fixtures must use synthetic data.

Do not copy production customer or seller information into test environments.

Generated names, addresses, emails, and identifiers must clearly belong to test data.

---

# 65. Test Isolation

Every test suite must define ownership of external state.

Shared state must be minimized.

Tests must not rely on whichever test happened to run first.

---

# 66. Out of Scope

Do not implement:

* full web UI/E2E feature coverage
* full mobile journey coverage
* complete accessibility certification
* exhaustive performance/load testing
* chaos testing against production
* actual financial transactions
* actual customer notifications
* production search indexes
* production media buckets
* application feature changes

These are handled by the appropriate QA/application work.

---

# 67. Required Deliverables

Implement the actual repository changes required for this backend/integration QA volume, including where applicable:

* backend domain tests
* API integration tests
* database integration tests
* Redis integration tests
* BullMQ tests
* event/outbox tests
* search integration tests
* S3 integration tests
* provider integration tests
* authorization/security tests
* concurrency tests
* idempotency tests
* failure-injection tests
* reconciliation tests
* migration tests
* CI integration
* test reports
* supporting fixtures/factories

Every created test must exercise real implemented behavior.

---

# 68. Implementation Quality Rules

Do not produce:

* placeholder tests
* tests that merely assert HTTP 200 without validating business state
* tests that mock the system under test
* arbitrary sleeps
* unlimited retries
* hardcoded production data
* production credentials
* fake payment success
* fake queue behavior where real integration testing is required
* fake search responses where search integration is the behavior under test
* TODO/FIXME test gaps
* duplicate test suites without justification

Every test must provide meaningful regression protection.

---

# 69. Repository-First Incremental Implementation

Before implementation:

1. inspect existing backend tests
2. inspect current test framework
3. inspect actual domain modules
4. inspect database schema
5. inspect API routes
6. inspect queue/event contracts
7. inspect integration adapters
8. identify highest-risk untested boundaries
9. implement comprehensive tests within the current scope

Do not rewrite valid tests merely to change style.

---

# 70. Testing the New Test Coverage

Actually execute the newly created suites.

Verify:

* valid-path tests pass
* invalid-path tests pass
* authorization denials work
* concurrency tests behave deterministically
* integration services are isolated
* cleanup succeeds
* CI commands execute
* failure artifacts are generated where configured

Do not claim coverage was added without executing the tests.

---

# 71. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Backend Domains

* authentication tests exist
* authorization tests exist
* catalog tests exist
* pricing/promotion tests exist
* inventory tests exist
* cart tests exist
* checkout tests exist
* order tests exist
* payment tests exist
* fulfillment/shipping tests exist
* cancellation/return/refund tests exist
* review tests exist
* notification tests exist

### Distributed Workflows

* queue tests exist
* event tests exist
* outbox tests exist
* webhook tests exist
* retry tests exist
* idempotency tests exist
* concurrency tests exist

### Data and Integrations

* PostgreSQL integration tests exist
* Redis integration tests exist
* search integration tests exist
* object-storage integration tests exist
* external-provider integration tests exist

### Security

* customer isolation tests exist
* seller isolation tests exist
* admin authorization tests exist
* webhook signature tests exist
* sensitive-resource access tests exist
* audit behavior tests exist

### Reliability

* rollback/compensation paths are tested
* timeout behavior is tested
* failure handling is tested
* cache fallback behavior is tested where applicable

### CI

* critical backend/integration suites run in CI
* deep suites have appropriate execution strategy
* reports are published
* sensitive data is excluded from artifacts

---

# 72. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Backend Coverage

Summarize domain areas tested.

## Integration Coverage

Summarize:

* PostgreSQL
* Redis
* queues
* events
* search
* S3
* payment/provider integrations

## Security Coverage

Summarize authentication, authorization, tenant isolation, webhook security, privacy, and audit tests.

## Reliability Coverage

Summarize:

* concurrency
* idempotency
* retry
* timeout
* compensation
* failure injection
* consistency checks

## CI Integration

Describe where the suites execute.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Test Limitations

Clearly identify any integration tests that could not be executed because required external dependencies or credentials were unavailable.

## Compatibility Notes

Document any existing test behavior that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later QA implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the backend, API, database, asynchronous-workflow, integration, security, concurrency, and transactional QA coverage described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future QA volumes.

Do not implement application features.

Do not invent business rules or tests for nonexistent functionality.

Do not merely describe testing strategy.

Actually create and modify the required repository files so the marketplace has meaningful automated regression protection across its highest-risk backend and distributed-system behaviors.

When complete, provide the required Completion Report.
