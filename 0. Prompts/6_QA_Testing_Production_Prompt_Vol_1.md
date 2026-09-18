# Amazon-Style Ecommerce Marketplace — QA Prompt — Volume 1

## ROLE

Act as the complete senior quality engineering organization responsible for implementing the production-grade testing, validation, automation, quality-gate, and test-infrastructure foundation for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff QA Engineer
* Staff SDET
* Backend Test Engineer
* Frontend Test Engineer
* Mobile Test Engineer
* Performance Test Engineer
* Security Test Engineer
* Reliability Test Engineer
* Test Infrastructure Engineer
* Accessibility Test Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the quality-engineering foundation required to continuously validate the marketplace across application code, APIs, databases, asynchronous workflows, web, mobile, infrastructure interfaces, security boundaries, reliability behavior, and critical customer journeys.

This is an incremental implementation task.

Do not implement quality work outside the scope defined in this prompt.

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

* implemented services
* APIs
* schemas
* application modules
* frontend routes
* mobile screens
* queues
* events
* data models
* infrastructure
* CI/CD
* existing tests
* existing testing tools
* runtime behavior

Do not invent tests for functionality that does not exist.

Do not remove valid existing coverage merely to replace it with a preferred framework.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction.

### Web

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod
* date-fns
* Recharts
* Framer Motion

### Mobile

* React Native
* Expo
* TypeScript

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

### Infrastructure

* AWS
* Docker
* Kubernetes/EKS
* Helm
* Terraform or repository-compatible IaC

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

Use the repository's existing testing libraries where they are sound.

---

# PRIMARY OBJECTIVE

Establish the automated QA foundation for the marketplace.

The implementation must provide:

* unit-test infrastructure
* integration-test infrastructure
* API test infrastructure
* database test infrastructure
* queue/event test infrastructure
* contract testing foundations
* frontend component testing
* frontend integration testing
* mobile testing foundations
* end-to-end testing foundations
* test fixtures
* factories
* deterministic test data
* environment isolation
* CI quality gates
* coverage measurement
* test reporting
* flaky-test visibility
* reproducible test execution

The goal is not merely to maximize coverage percentage.

The goal is to verify actual business behavior, technical contracts, security boundaries, reliability assumptions, and critical customer/seller workflows.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing test frameworks
* existing unit tests
* existing integration tests
* existing E2E tests
* existing mocks
* test utilities
* database test strategy
* test environment configuration
* frontend testing setup
* mobile testing setup
* API testing setup
* CI test workflows
* coverage tooling
* lint/type-check integration
* fixtures
* factories
* seeded data
* existing contract tests
* existing accessibility tests
* existing performance tests

Do not create duplicate testing frameworks without a concrete reason.

Do not convert all existing tests solely for stylistic preference.

---

# CURRENT SCOPE

Implement the testing and QA foundation across the repository.

This volume establishes the core framework and reusable testing infrastructure.

Feature-specific exhaustive test coverage belongs to later QA work.

---

# 1. QA Architecture

Create a clear testing architecture separating:

* unit tests
* integration tests
* component tests
* API tests
* contract tests
* end-to-end tests
* mobile tests
* accessibility tests
* security tests
* performance tests

Document when each level must be used.

Avoid solving every test with end-to-end browser automation.

---

# 2. Test Pyramid

Establish a test strategy favoring:

* large numbers of fast unit tests
* meaningful integration tests
* focused contract tests
* targeted end-to-end tests

Critical business flows may have end-to-end coverage, but internal implementation details should generally be tested at lower levels.

---

# 3. Test Naming

Standardize naming conventions for:

* test files
* test suites
* individual cases
* fixtures
* factories
* mocks
* test helpers
* snapshots where appropriate

Names must describe behavior rather than implementation structure.

Prefer:

```text
creates an order when inventory is successfully reserved
```

over:

```text
OrderService.createOrder works
```

---

# 4. Test Environment Model

Define isolated environments for:

* unit tests
* integration tests
* E2E tests
* CI
* local development

Tests must not depend on production resources.

Never point automated tests at production databases, queues, buckets, or payment credentials.

---

# 5. Deterministic Test Execution

Tests must be deterministic.

Avoid dependencies on:

* current real-world time
* random uncontrolled IDs
* external public APIs
* production data
* network availability
* execution order
* local machine state

Use controlled clocks and seeded randomness where required.

---

# 6. Test Configuration

Create centralized configuration for test execution.

Support:

* environment selection
* database connection
* Redis connection
* search test endpoint where required
* object storage test location
* mock providers
* test timeouts
* concurrency
* test data cleanup
* coverage behavior

Do not scatter test environment values across dozens of files.

---

# 7. Test Secrets

Automated tests must not require committed production secrets.

Use:

* ephemeral credentials
* local test services
* CI-provided test secrets
* provider test/sandbox credentials where necessary

Never print test secrets in CI output.

---

# 8. Unit-Test Foundation

Implement the unit-test framework for backend/shared application logic.

Unit tests should support:

* isolated services
* pure functions
* domain rules
* validation
* authorization decisions
* state transitions
* utility functions
* serialization/deserialization
* error behavior

Avoid mocking every dependency merely to increase unit-test count.

---

# 9. Dependency Mocking

Standardize dependency mocking.

Mock:

* external providers
* outbound HTTP integrations
* email/SMS/push providers
* payment providers
* cloud SDK calls where unit isolation requires it

Do not mock the business logic under test.

---

# 10. Time Control

Create reusable clock/time utilities.

Tests must be able to control:

* current time
* expiration
* token lifetime
* inventory reservation expiration
* promotion validity
* scheduled notifications
* queue delays

Avoid tests that wait in real time merely to validate expiration behavior.

---

# 11. ID Generation

Provide deterministic ID generation utilities for tests.

Where production uses UUIDs or another generated-ID strategy, tests must be able to:

* generate valid IDs
* use predictable IDs when assertions require them
* avoid collisions
* avoid embedding production identifiers

---

# 12. Test Factories

Create reusable factories for actual domain entities.

Where applicable support:

* user/customer
* seller
* seller membership
* category
* product
* variant/SKU
* offer
* price
* inventory item
* cart
* address
* checkout session
* order
* payment
* shipment
* return
* refund
* review
* notification

Factories must reflect real schemas.

Do not construct huge object graphs automatically when a test needs only one entity.

---

# 13. Test Fixtures

Create explicit fixtures for recurring scenarios.

Examples may include:

* verified customer
* verified seller
* unpublished product
* published product
* out-of-stock SKU
* reservable inventory
* paid order
* cancellable order
* return-eligible order
* verified-purchase review

Fixtures must be minimal and composable.

---

# 14. Database Test Strategy

Implement a reliable integration-test strategy for PostgreSQL.

Tests must support:

* isolated database state
* migrations
* seed data
* transaction management where appropriate
* cleanup
* deterministic execution

Choose the correct isolation mechanism based on the repository architecture.

Do not rely on deleting every table blindly after every test if transactional isolation is more appropriate.

---

# 15. Prisma Test Integration

Ensure Prisma integration tests use the same schema and migration behavior as the application.

Validate:

* Prisma client configuration
* migrations
* transactions
* constraints
* relations
* indexes
* generated behavior

Do not silently maintain a second test-only schema that diverges from production.

---

# 16. Database Constraints

Write integration tests that verify important database-level guarantees.

Examples:

* uniqueness
* foreign keys
* required fields
* valid states
* seller ownership boundaries
* payment/order relations
* inventory relationships

Do not rely solely on service-level validation when the database itself enforces the rule.

---

# 17. Transaction Testing

Create tests for transaction-sensitive behavior.

Where applicable verify:

* all-or-nothing updates
* rollback on failure
* concurrency-safe changes
* idempotent operations
* inventory updates
* order/payment consistency

---

# 18. Concurrency Test Foundation

Provide utilities for controlled concurrency testing.

Support scenarios such as:

* two customers purchasing the last unit
* duplicate checkout requests
* duplicate payment callbacks
* concurrent inventory adjustments
* competing cart updates
* simultaneous seller updates

Tests must detect race conditions rather than merely execute operations sequentially.

---

# 19. Redis Test Foundation

Provide isolated Redis testing.

Where actual Redis behavior matters, use a real test Redis instance or repository-compatible ephemeral environment rather than mocking Redis indiscriminately.

Test:

* caching
* TTL
* locks
* idempotency keys
* rate limits
* queue coordination

---

# 20. BullMQ Test Foundation

Create testing utilities for actual queue behavior.

Support:

* adding jobs
* processing jobs
* retries
* failures
* delays
* idempotency
* stalled-job scenarios
* worker shutdown

Tests must be able to inspect job lifecycle without depending on production Redis.

---

# 21. Event Testing

Create utilities for testing domain/integration events.

Verify:

* event names
* event versions
* payload shape
* producer behavior
* consumer behavior
* idempotency
* retry behavior

Do not test only that “an event was emitted.”

Verify its contract.

---

# 22. Outbox Testing

Where the repository implements an outbox pattern, test:

* event persistence
* transaction coupling
* dispatch
* retries
* duplicate handling
* failure recovery
* status transitions

Verify that business state and event publication remain consistent.

---

# 23. API Test Foundation

Implement API-level testing utilities for NestJS/HTTP interfaces.

Support:

* authenticated requests
* unauthenticated requests
* role-aware requests
* seller-scoped requests
* validation errors
* authorization failures
* pagination
* filtering
* sorting
* idempotency
* rate-limit behavior where testable

---

# 24. API Contract Validation

Validate API responses against the actual OpenAPI contract where the repository provides one.

Test:

* response shape
* status code
* error format
* pagination metadata
* required fields
* enums
* validation constraints

Do not allow tests to encode a different API contract than the application.

---

# 25. Error Contract Testing

Create shared assertions for the platform's standardized error model.

Verify:

* machine-readable error code
* HTTP status
* message behavior
* validation details where applicable
* correlation/request identifiers where applicable

Do not assert unstable human-readable text unless it is part of the documented contract.

---

# 26. Authentication Test Foundation

Create reusable authentication test helpers.

Support:

* authenticated customer
* authenticated seller
* seller staff
* administrator
* expired session
* invalid access token
* missing credentials
* revoked session

Do not bypass authentication by directly injecting arbitrary authorization state unless the test is explicitly a lower-level unit test.

---

# 27. Authorization Test Foundation

Create reusable authorization tests for:

* role-based access
* resource ownership
* seller isolation
* administrative permissions
* customer access
* cross-tenant denial

Security tests must verify denial, not merely successful access.

---

# 28. Seller Isolation Testing

This marketplace requires strict seller isolation.

Create reusable test utilities that verify a seller cannot access:

* another seller's catalog operations
* another seller's offers
* another seller's inventory
* another seller's orders
* another seller's reports
* another seller's private media
* another seller's operational data

Test both:

* direct resource access
* filtered/list access

---

# 29. Customer Privacy Testing

Verify that customer-facing APIs do not expose another customer's private information.

Test isolation for:

* orders
* addresses
* payments
* reviews where private metadata exists
* notifications
* account data
* support information

---

# 30. Webhook Test Foundation

Create reusable tests for inbound webhooks.

Support:

* valid signatures
* invalid signatures
* duplicate delivery
* reordered delivery where relevant
* malformed payload
* provider retries
* replay attempts

Do not use production webhook secrets in automated tests.

---

# 31. External Provider Mocks

Create controlled mock/sandbox interfaces for external integrations such as:

* payment provider
* shipping provider
* email provider
* SMS provider
* push notification provider

Mocks must simulate realistic:

* success
* timeout
* retry
* rate limit
* invalid request
* provider failure

Do not make mocks unrealistically perfect.

---

# 32. Payment Test Foundation

Where Stripe or equivalent payment infrastructure exists, use provider test/sandbox mechanisms.

Test:

* payment initiation
* success
* failure
* cancellation
* webhook confirmation
* duplicate webhook
* refund
* partial refund
* provider timeout
* reconciliation behavior

Never execute real financial transactions during automated tests.

---

# 33. Frontend Test Foundation

Implement or standardize frontend testing for actual Next.js application components.

Support:

* component rendering
* user interactions
* form validation
* loading states
* error states
* optimistic behavior where applicable
* API integration boundaries
* accessibility behavior

Do not overuse snapshots.

Prefer behavior-oriented assertions.

---

# 34. Frontend API Mocking

Use a controlled API-mocking mechanism appropriate to the repository.

Support realistic states:

* success
* loading
* empty
* validation failure
* authorization failure
* server failure
* network failure

Do not duplicate backend business logic inside frontend mocks.

---

# 35. Frontend State Testing

Test critical client-state behavior including:

* authentication/session state
* cart state
* cart merge
* checkout state
* filters/search state
* notifications
* seller context

Verify state transitions rather than internal implementation details.

---

# 36. Form Testing

Test critical forms using their actual validation rules.

Where applicable cover:

* invalid values
* required fields
* boundary values
* server validation errors
* submission state
* duplicate submission prevention
* accessibility

Critical forms include:

* authentication
* address
* checkout
* seller onboarding
* product creation/editing
* inventory
* promotion creation
* returns
* reviews

---

# 37. Mobile Test Foundation

Implement the repository-appropriate testing foundation for React Native/Expo.

Support:

* component tests
* navigation behavior
* secure-session behavior
* offline/loading/error states
* API interaction
* critical user journeys

Do not assume browser APIs work identically on mobile.

---

# 38. Secure Storage Testing

Where secure storage is used, test:

* token persistence
* token removal
* logout
* corrupted state
* expired state
* migration of stored credentials/configuration

Never expose real user credentials in test output.

---

# 39. End-to-End Test Foundation

Create an E2E testing foundation for the actual application.

The test environment must be isolated from production.

Support:

* authenticated sessions
* seeded data
* deterministic accounts
* test cleanup
* screenshots/traces on failure
* parallel execution where safe

---

# 40. Critical E2E Journey Structure

Establish the foundation for end-to-end validation of critical journeys.

Examples:

### Customer

* registration
* login
* browse
* search
* product detail
* add to cart
* checkout
* order history

### Seller

* onboarding
* catalog management
* inventory
* order fulfillment

### Admin

* authentication
* seller review
* moderation
* operational controls

Do not attempt exhaustive feature coverage in this foundational volume.

---

# 41. E2E Test Data

E2E tests must create or use deterministic test data.

Avoid coupling E2E tests to manually maintained shared accounts.

Each test must either:

* provision isolated data
* use clearly reusable immutable fixtures
* clean up created state

---

# 42. E2E Parallelization

Design E2E tests so parallel execution is safe.

Avoid:

* shared mutable accounts
* shared cart state
* global database assumptions
* fixed order IDs
* fixed inventory counts

unless a test explicitly owns and controls them.

---

# 43. Accessibility Testing Foundation

Implement automated accessibility testing for web and applicable mobile surfaces.

Cover:

* keyboard navigation
* semantic structure
* accessible names
* labels
* focus behavior
* form errors
* contrast where automated tooling supports it

Do not treat automated accessibility tooling as complete accessibility validation.

---

# 44. Browser Compatibility

Where the web product requires browser compatibility, establish the test matrix for supported browsers.

Do not claim support for browsers that the project has not defined.

Automated testing should focus on the actual supported matrix.

---

# 45. API Integration Testing

Create tests against actual backend modules and infrastructure dependencies where integration behavior matters.

Do not replace the entire system with mocks.

Important integration areas include:

* auth/database
* catalog/database
* inventory/database
* cart/Redis
* checkout/database/Redis
* orders/database
* payments/provider
* notifications/queues
* search

---

# 46. Test Database Lifecycle

Make database setup and teardown reproducible.

Support:

* migrations
* seed
* reset
* isolated test runs
* CI execution
* local execution

Do not delete arbitrary developer databases.

Test commands must clearly identify the target environment.

---

# 47. Search Testing Foundation

Where search is implemented, provide test support for:

* indexing
* document shape
* publication state
* filtering
* faceting
* sorting
* autocomplete
* index rebuild
* alias switching
* indexing failures

Use a dedicated test search environment.

Do not run automated tests against production indexes.

---

# 48. Object-Storage Testing

Where S3 operations are part of application behavior, test:

* upload authorization
* object-key ownership
* pre-signed URL generation
* content-type validation
* expiration
* download authorization
* deletion
* lifecycle-related behavior where testable

Use test buckets or local-compatible infrastructure.

---

# 49. Media Testing

Test media-related flows for:

* allowed formats
* size limits
* unauthorized access
* invalid object paths
* missing objects
* upload failures
* processing failures

Do not store real customer media in automated test environments.

---

# 50. Notification Testing

Test:

* notification creation
* preference filtering
* deduplication
* queue delivery
* retries
* provider failure
* invalid device tokens
* notification read/unread state

Do not send real customer notifications during CI.

---

# 51. Review Testing

Create test coverage for review-related rules including:

* verified-purchase eligibility
* duplicate review rules
* rating validation
* edit/delete behavior
* moderation state
* reports
* seller responses
* aggregate recalculation

Keep the tests aligned with the repository's implemented business rules.

---

# 52. Inventory Testing

Establish reusable tests for:

* stock increments
* decrements
* reservations
* reservation expiration
* release
* consumption
* concurrent checkout
* insufficient stock
* reconciliation

Inventory tests must specifically target overselling/race conditions.

---

# 53. Cart Testing

Test:

* add/remove
* quantity changes
* stale inventory
* price changes
* promotion changes
* guest/authenticated merge
* merge conflicts
* expiration where applicable

Do not assume cart state is authoritative for final checkout pricing or inventory.

---

# 54. Checkout Testing

Create reusable test scenarios for:

* valid checkout
* invalid addresses
* shipping selection
* promotion validation
* price changes
* inventory reservation
* payment initiation
* idempotency
* retries
* failure compensation

Checkout tests must verify transactional boundaries and recovery behavior.

---

# 55. Order Testing

Test order state transitions and authorization.

Cover:

* creation
* payment state
* fulfillment
* shipment
* delivery
* cancellation
* return
* refund
* invalid transitions
* duplicate operations

Invalid transitions must be rejected safely.

---

# 56. Idempotency Testing

Create reusable tests for idempotent APIs and workflows.

Test repeated requests for:

* checkout
* payment operations
* refunds
* cancellations
* webhook processing
* notification creation where applicable
* queue job handling

Verify that retries do not create duplicate business outcomes.

---

# 57. Retry Testing

Test:

* transient failures
* retry limits
* exponential backoff where implemented
* dead-letter behavior where implemented
* duplicate prevention

Do not make retry tests depend on actual minutes-long delays.

Use controlled clocks or shortened test configuration.

---

# 58. Rate-Limit Testing

Where application rate limiting exists, test:

* allowed requests
* rejected requests
* reset behavior
* identity-based limits
* IP-based limits where used
* privileged/internal exceptions

Ensure rate limits do not leak sensitive implementation details.

---

# 59. Security Test Foundation

Establish automated tests for security boundaries such as:

* authentication bypass
* authorization bypass
* IDOR/resource access
* seller isolation
* customer privacy
* webhook forgery
* session invalidation
* insecure file access

Do not perform destructive penetration testing against production.

---

# 60. Test Reporting

Standardize machine-readable test outputs.

Support where appropriate:

* JUnit
* coverage reports
* test summaries
* failure artifacts
* screenshots
* browser traces

CI must be able to publish actionable test results.

---

# 61. Coverage

Implement coverage measurement.

Track coverage by:

* backend/shared code
* frontend code
* critical domain logic

Do not enforce an arbitrary global percentage if it encourages low-value tests.

Use coverage as a diagnostic metric.

---

# 62. Quality Gates

Define CI quality gates for:

* failing tests
* type errors
* lint failures
* required security failures
* build failures
* contract-test failures
* critical E2E failures

Do not make warnings fail production pipelines unless policy requires it.

---

# 63. Flaky-Test Management

Implement a mechanism to identify flaky tests.

Capture:

* test name
* failure rate
* environment
* retry history
* recent changes

Do not hide flakiness by allowing unlimited retries.

Retries may be used diagnostically but must not conceal systemic instability.

---

# 64. Test Parallelism

Configure test concurrency safely.

Ensure parallel tests do not corrupt:

* shared database state
* Redis
* search indexes
* test buckets
* queues
* test accounts

Where isolation is impossible, serialize only the affected suite.

---

# 65. Test Timeouts

Define appropriate test timeouts.

Avoid globally huge timeouts that conceal hangs.

Use longer timeouts only for:

* browser startup
* infrastructure setup
* integration with real services

---

# 66. Test Cleanup

Test resources must be cleaned up reliably.

Cleanup must execute even after test failures.

Avoid global destructive cleanup commands that can affect non-test resources.

---

# 67. CI Test Stability

CI must produce reproducible results across:

* local developer machines
* pull requests
* main branch
* release workflows

Pin versions and test-service dependencies where appropriate.

---

# 68. Test Documentation

Document:

* how to run unit tests
* how to run integration tests
* how to run E2E tests
* how to run mobile tests
* how to run contract tests
* how to seed test data
* how to reset test state
* how to generate coverage
* how to debug failed tests
* how to inspect failure artifacts

Documentation must match actual commands.

---

# 69. Out of Scope

Do not implement:

* exhaustive feature-by-feature QA coverage
* full performance/load-test suites
* full penetration testing
* production chaos testing
* complete disaster-recovery drills
* application feature development
* schema redesign
* CI/CD redesign beyond required QA integration
* fake test implementations
* meaningless snapshot tests
* tests that pass only by mocking the system under test

These areas belong to later QA work where applicable.

---

# 70. Required Deliverables

Implement the actual repository changes required for the QA foundation, including where applicable:

* unit-test configuration
* integration-test configuration
* test utilities
* fixtures
* factories
* database test infrastructure
* Redis test infrastructure
* queue test infrastructure
* API test utilities
* authentication helpers
* authorization helpers
* provider mocks
* frontend test configuration
* mobile test configuration
* E2E test configuration
* accessibility test configuration
* coverage configuration
* CI test integration
* test reporting
* testing documentation

Every created file must have a concrete testing purpose.

---

# 71. Implementation Quality Rules

Do not produce:

* pseudo-code
* placeholder tests
* `expect(true).toBe(true)`
* meaningless snapshots
* tests that assert implementation details unnecessarily
* tests that mock away the behavior under test
* committed production secrets
* tests against production infrastructure
* unbounded retries
* arbitrary sleeps used as synchronization
* TODO/FIXME implementation gaps
* fake provider behavior presented as production verification
* duplicate test frameworks without justification

Tests must provide real signal.

---

# 72. Repository-First Incremental Implementation

Before implementation:

1. inspect current test infrastructure
2. identify existing frameworks
3. identify existing test suites
4. identify existing coverage
5. identify CI execution
6. identify service boundaries
7. identify test environment assumptions
8. identify missing reusable utilities
9. implement only the QA foundation required by this prompt

Preserve high-value existing tests.

---

# 73. Testing the Testing Infrastructure

The testing framework itself must be validated.

Verify:

* test commands execute
* fixtures create valid entities
* factories produce schema-compatible data
* test database setup works
* cleanup works
* mocks behave deterministically
* CI artifacts are generated
* coverage is generated
* E2E setup works where configured

Do not merely create configuration files without executing them.

---

# 74. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Test Foundation

* unit testing exists
* integration testing exists
* API testing exists
* contract testing foundation exists
* frontend testing exists
* mobile testing exists where applicable
* E2E foundation exists
* accessibility testing foundation exists

### Test Infrastructure

* deterministic configuration exists
* factories exist
* fixtures exist
* database isolation exists
* Redis test isolation exists
* queue test isolation exists
* provider mocks exist
* controlled time utilities exist

### Security and Isolation

* tests do not target production
* secrets are not committed
* seller isolation tests exist
* customer privacy tests exist
* authentication/authorization helpers exist
* webhook verification tests exist

### CI

* test commands integrate with CI
* failures block required quality gates
* reports are generated
* coverage is generated
* failure artifacts are retained where useful

### Reliability

* concurrency testing foundation exists
* retry testing exists
* idempotency testing exists
* flaky-test detection foundation exists
* cleanup is reliable

### Documentation

* test commands documented
* environment setup documented
* debugging documented
* test data strategy documented

### Validation

* the actual test infrastructure runs successfully
* applicable existing suites pass
* configuration validates
* no fake or placeholder tests remain

---

# 75. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Testing Framework

Summarize:

* unit testing
* integration testing
* API testing
* contract testing
* frontend testing
* mobile testing
* E2E testing
* accessibility testing

## Test Infrastructure

Summarize:

* factories
* fixtures
* database setup
* Redis
* queues
* provider mocks
* deterministic clocks/IDs
* cleanup

## Security Testing

Summarize:

* authentication
* authorization
* seller isolation
* customer privacy
* webhook verification
* secret protection

## CI Integration

Summarize:

* commands
* quality gates
* coverage
* reports
* failure artifacts

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Existing Test Compatibility

Document any pre-existing test suites that required adaptation.

## Known Limitations

Clearly identify any test categories that could not be executed because required external services or credentials were unavailable.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later QA implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the QA testing and automation foundation described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future QA volumes.

Do not implement application features.

Do not invent tests for nonexistent functionality.

Do not merely describe a testing strategy.

Actually create and modify the required repository files so the marketplace has a deterministic, isolated, maintainable, security-aware, CI-integrated QA foundation with meaningful automated test infrastructure.

When complete, provide the required Completion Report.
