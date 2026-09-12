# AMAZON ECOMMERCE PLATFORM — QA VOLUME 1 IMPLEMENTATION PROMPT

# ROLE

Act as the complete senior QA and software quality engineering organization responsible for implementing the automated testing and quality-validation platform for a production-grade global ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff QA Engineer
* Staff Backend Test Engineer
* Staff Frontend Test Engineer
* Staff Mobile Test Engineer
* Performance Engineer
* Security Test Engineer
* Reliability Engineer
* DevOps/Test Automation Engineer
* Database Test Engineer
* Distributed Systems Test Engineer
* Accessibility Test Engineer
* Technical Writer

Do not act as a teacher, consultant, or prototype developer.

Implement the required QA infrastructure, automated tests, test utilities, fixtures, factories, validation workflows, and quality controls directly in the repository.

# PROJECT

Build the QA and automated validation layer for a production-grade global ecommerce marketplace comparable in breadth and operational complexity to a large Amazon-style marketplace.

The platform supports:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume catalog browsing and search
* Multi-seller shopping carts
* Multi-seller checkout
* Payments and refunds
* Inventory reservation and concurrency control
* Seller fulfillment
* Shipping and shipment tracking
* Returns
* Reviews and ratings
* Promotions and coupons
* Seller payouts and settlements
* Notifications
* Real-time updates
* Administration and moderation
* Analytics and operational reporting
* Media storage and processing
* High availability
* Horizontal scaling
* Disaster recovery
* Continuous deployment

The QA implementation must validate the actual repository implementation rather than creating fictional tests around nonexistent behavior.

# PRIMARY USERS

The quality system must account for:

* Customers
* Sellers
* Seller staff
* Administrators
* Moderators
* Platform operators
* Developers
* QA engineers
* SRE/DevOps engineers

# TECHNOLOGY DIRECTION

Use the technologies actually present in the repository when compatible with the intended architecture.

Expected platform technologies include:

## Web

* Next.js 15+
* React 19+
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

## Mobile

* React Native
* Expo
* TypeScript
* React Navigation or an equivalent navigation architecture
* TanStack Query
* Zustand
* React Hook Form
* Zod

## Backend

* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* BullMQ
* REST APIs
* Webhooks
* SSE/WebSockets where applicable
* Swagger/OpenAPI

## Infrastructure

* Docker
* Kubernetes
* Helm
* Terraform
* AWS
* GitHub Actions
* CDN/object storage
* Managed or self-managed PostgreSQL
* Redis
* Search infrastructure
* Observability infrastructure

## Testing Direction

Use testing technologies appropriate to the actual repository, including established industry-standard tools where required for:

* Unit testing
* Integration testing
* API testing
* Contract testing
* Database testing
* Event testing
* Queue testing
* Browser testing
* End-to-end testing
* Mobile testing
* Accessibility testing
* Security testing
* Performance testing
* Load testing
* Resilience testing
* Infrastructure validation

Do not introduce unnecessary testing frameworks when an existing repository-standard solution is already suitable.

# SOURCE OF TRUTH

The repository is the authoritative source of truth for implementation.

Before changing anything:

1. Inspect the complete repository structure relevant to QA.
2. Identify backend, frontend, mobile, infrastructure, database, queue, event, and deployment modules.
3. Inspect package manifests and existing scripts.
4. Inspect existing test configuration.
5. Inspect existing test suites.
6. Inspect API contracts and OpenAPI definitions where available.
7. Inspect Prisma schema and migrations.
8. Inspect event and queue contracts.
9. Inspect authentication and authorization behavior.
10. Inspect environment configuration.
11. Inspect CI/CD workflows.
12. Inspect Docker, Kubernetes, Helm, and Terraform configuration.
13. Identify existing testing utilities and reusable fixtures.
14. Identify missing or inconsistent quality infrastructure.
15. Determine the repository's current implementation state before writing tests.

Do not assume that a feature exists merely because it is part of the product scope.

Tests must validate actual implemented contracts.

Do not fabricate endpoints, database tables, events, jobs, UI routes, mobile screens, or infrastructure resources.

# IMPLEMENTATION OBJECTIVE

Implement the first comprehensive QA volume for the Amazon Ecommerce platform.

This volume must establish a production-grade automated quality foundation capable of validating the complete system across application layers.

The implementation must establish:

* Test architecture
* Test configuration
* Test environment strategy
* Test data factories
* Deterministic fixtures
* Database test isolation
* API test infrastructure
* Integration test infrastructure
* Contract testing
* Event testing
* Queue testing
* Authentication testing
* Authorization testing
* Backend unit and integration coverage
* Frontend testing foundations
* Mobile testing foundations
* End-to-end testing foundations
* Accessibility testing foundations
* Security testing foundations
* Observability validation
* Failure-path validation
* CI test orchestration
* Test reporting
* Coverage reporting
* Flaky-test controls
* Test documentation

The implementation must be structured so that the final QA layer can evolve without becoming a second application architecture.

# QA ARCHITECTURE

Design and implement a coherent testing pyramid.

Use appropriate proportions of:

* Unit tests
* Component tests
* Service tests
* Repository tests
* Integration tests
* API tests
* Contract tests
* Event tests
* Queue tests
* End-to-end tests
* Browser tests
* Mobile tests
* Security tests
* Performance tests

Do not attempt to solve every validation problem through end-to-end tests.

Prefer the lowest appropriate test level for each behavior.

Ensure that critical business invariants are tested at multiple appropriate layers where failure risk justifies redundancy.

# TEST DIRECTORY ARCHITECTURE

Establish a predictable test organization consistent with the repository architecture.

Separate concerns such as:

* Unit tests
* Integration tests
* API tests
* Contract tests
* E2E tests
* Fixtures
* Factories
* Test utilities
* Test data
* Mock providers
* External-service simulators
* Database helpers
* Authentication helpers
* Browser helpers
* Mobile helpers
* Performance tests
* Security tests

Do not create a monolithic test directory containing unrelated testing concerns.

Keep test ownership aligned with application modules.

# TEST CONFIGURATION

Create or harden the testing configuration required for deterministic execution.

Support appropriate configurations for:

* Local development
* Pull requests
* CI
* Integration environments
* End-to-end environments
* Mobile testing
* Performance testing
* Security testing

Ensure that test configuration:

* Is explicit
* Is reproducible
* Does not depend on developer-specific machine state
* Does not require production credentials
* Does not expose secrets
* Has deterministic defaults
* Uses isolated resources
* Fails clearly when required dependencies are unavailable

Separate fast tests from expensive suites.

Provide predictable commands for:

* Unit tests
* Integration tests
* API tests
* Contract tests
* E2E tests
* Accessibility tests
* Mobile tests
* Security tests
* Performance tests
* Full validation

# TEST DATA ARCHITECTURE

Implement reusable test factories and fixtures for the major business entities that actually exist in the repository.

Potential entities include:

* Users
* Customer profiles
* Seller accounts
* Seller users
* Addresses
* Products
* Product variants
* Categories
* Brands
* Product media
* Inventory items
* Inventory reservations
* Prices
* Carts
* Cart items
* Wishlists
* Promotions
* Coupons
* Orders
* Order items
* Payments
* Refunds
* Returns
* Shipments
* Shipment items
* Reviews
* Ratings
* Notifications
* Notification preferences
* Seller payouts
* Disputes
* Audit logs

Only implement factories for entities actually represented by the current repository.

Factories must:

* Produce valid domain data
* Respect database constraints
* Respect required relationships
* Support overrides
* Avoid brittle hardcoded identifiers
* Avoid shared mutable state
* Produce deterministic data when requested
* Support realistic edge cases
* Support invalid data generation where validation testing requires it

# DATABASE TESTING

Implement robust database test infrastructure.

Validate:

* Prisma behavior
* Database constraints
* Foreign keys
* Unique constraints
* Required relationships
* Transactions
* Rollbacks
* Concurrent operations
* Isolation behavior
* Migration compatibility
* Index-dependent queries
* Pagination behavior
* Soft deletion where applicable
* Auditability
* Data retention behavior where implemented

Tests must not corrupt development or production databases.

Use dedicated test databases or isolated schemas according to the repository architecture.

Never allow automated tests to accidentally point at production.

# TRANSACTION TESTING

Test transaction boundaries around critical workflows.

At minimum validate applicable flows involving:

* Inventory reservation
* Cart mutation
* Checkout
* Order creation
* Payment state transitions
* Refunds
* Returns
* Seller settlement
* Payout state transitions
* Promotions
* Coupon redemption
* Account changes

Verify that partial failures do not leave invalid transactional states.

Test rollback behavior explicitly.

# CONCURRENCY TESTING

Implement tests for race-sensitive business operations.

Where applicable, test:

* Concurrent inventory reservations
* Concurrent checkout attempts
* Concurrent coupon redemption
* Concurrent order modification
* Concurrent cancellation
* Concurrent refunds
* Concurrent payout processing
* Concurrent webhook delivery
* Concurrent event consumption

Verify that:

* Overselling cannot occur
* Duplicate financial operations cannot occur
* State transitions remain valid
* Idempotency protections work
* Locks or transactional mechanisms behave correctly
* Duplicate requests produce safe results

# API TESTING

Build comprehensive API testing infrastructure.

Validate:

* HTTP methods
* Request validation
* Response schemas
* Authentication
* Authorization
* Error contracts
* Status codes
* Pagination
* Filtering
* Sorting
* Rate limiting
* Idempotency
* Request correlation
* Validation errors
* Resource ownership
* Cross-tenant access prevention
* Security headers where applicable

Test both successful and failure paths.

Verify that API responses do not expose:

* Password hashes
* Authentication tokens
* Internal secrets
* Payment credentials
* Private infrastructure information
* Unauthorized customer data
* Unauthorized seller data
* Internal stack traces

# AUTHENTICATION TESTING

Test authentication behavior thoroughly.

Cover applicable flows including:

* Registration
* Login
* Logout
* Session refresh
* Token expiration
* Invalid credentials
* Account lockout or abuse controls
* Password changes
* Password reset
* Email verification
* Session revocation
* Device/session management
* Authentication middleware

Test:

* Expired tokens
* Malformed tokens
* Replayed credentials
* Missing credentials
* Invalid credentials
* Cross-user access
* Privilege escalation attempts

# AUTHORIZATION TESTING

Create explicit authorization test coverage for role and resource boundaries.

Validate:

* Customer access
* Seller access
* Seller-user access
* Administrator access
* Moderator access
* Platform operator access
* Resource ownership
* Seller isolation
* Customer privacy
* Administrative boundaries

Include negative authorization tests.

A successful HTTP response must never be treated as sufficient evidence of correct authorization.

Verify the returned data and side effects.

# BUSINESS RULE TESTING

Implement automated tests for critical business invariants.

Cover applicable rules around:

## Catalog

* Product ownership
* Variant ownership
* Product status
* Category relationships
* Media ownership
* Seller catalog permissions

## Inventory

* Available quantity
* Reserved quantity
* Reservation expiration
* Concurrent reservations
* Stock release
* Stock adjustment

## Pricing

* Correct price selection
* Price snapshots
* Currency handling
* Decimal precision
* Effective dates
* Seller-specific pricing where supported

## Promotions

* Eligibility
* Expiration
* Usage limits
* Customer restrictions
* Seller restrictions
* Minimum order requirements
* Stacking rules
* Duplicate application prevention

## Cart

* Quantity validation
* Product availability
* Variant validity
* Seller separation
* Price changes
* Expired inventory
* Cart consistency

## Checkout

* Multi-seller orders
* Inventory reservation
* Pricing snapshots
* Discounts
* Shipping
* Taxes where implemented
* Payment intent creation
* Failure recovery
* Idempotency

## Orders

* State transitions
* Cancellation rules
* Seller order grouping
* Shipment relationships
* Payment relationships
* Refund relationships

## Payments

* Successful payment
* Failed payment
* Pending payment
* Duplicate webhook
* Out-of-order webhook
* Refund
* Partial refund
* Full refund
* Reconciliation

## Returns

* Eligibility
* Return state transitions
* Return item quantities
* Refund linkage
* Invalid transitions

## Reviews

* Eligibility
* Ownership
* Duplicate reviews
* Moderation
* Rating constraints

## Seller Payouts

* Settlement calculations
* Fees
* Discounts
* Refunds
* Chargebacks
* Shipping
* Taxes where implemented
* Net seller amount
* Payout eligibility
* Idempotency

# EVENT TESTING

Implement testing infrastructure for domain events.

Validate event contracts including, where applicable:

* Event ID
* Event type
* Version
* Entity ID
* Producer
* Timestamp
* Correlation metadata
* Trace metadata
* Payload schema

Test:

* Event publication
* Event consumption
* Duplicate delivery
* Out-of-order delivery where relevant
* Consumer idempotency
* Invalid payload handling
* Retry behavior
* Dead-letter behavior
* Failure recovery

# TRANSACTIONAL OUTBOX TESTING

Where the repository implements an outbox pattern, test:

* Business transaction and outbox transaction atomicity
* Outbox record creation
* Duplicate processing
* Publication failure
* Retry
* Mark-as-published behavior
* Consumer idempotency
* Recovery after worker interruption

Verify that business state cannot be committed without the required durable event record where the architecture requires atomic publication.

# QUEUE TESTING

Test BullMQ and other queue infrastructure actually present in the repository.

Validate:

* Job creation
* Job payloads
* Queue routing
* Retry configuration
* Backoff
* Timeout behavior
* Concurrency
* Idempotency
* Duplicate jobs
* Job failure
* Dead-letter behavior
* Recovery
* Worker shutdown
* Job observability

Test representative queues for:

* Notifications
* Email
* Search indexing
* Media processing
* Catalog imports
* Inventory synchronization
* Order workflows
* Payment reconciliation
* Analytics
* Cleanup

Only test queues actually implemented in the repository.

# EXTERNAL SERVICE TESTING

Create controlled test doubles or provider simulators for external dependencies where appropriate.

Potential integrations include:

* Payment provider
* Shipping provider
* Email provider
* SMS provider
* Push notification provider
* Object storage
* CDN
* Search provider
* Analytics providers

Tests must not make uncontrolled production calls.

Validate:

* Success
* Timeout
* Network failure
* Invalid response
* Provider rejection
* Rate limiting
* Duplicate callbacks
* Malformed webhooks
* Delayed responses
* Retry behavior

# WEBHOOK TESTING

Implement webhook validation tests.

Test:

* Signature validation
* Invalid signatures
* Missing signatures
* Replay attempts
* Duplicate events
* Unknown event types
* Malformed payloads
* Out-of-order delivery
* Provider retries
* Idempotent processing
* Correct state transitions

# SEARCH TESTING

Where search infrastructure exists, test:

* Index creation
* Index synchronization
* Document shape
* Product indexing
* Variant indexing
* Availability indexing
* Pricing fields
* Category fields
* Seller fields
* Facets
* Filters
* Sorting
* Search relevance inputs
* Suggestions
* Index failure recovery
* Reindexing
* Stale search data handling

Verify that search remains derived data and cannot become the authoritative transactional source.

# MEDIA TESTING

Test media workflows where implemented.

Cover:

* Upload authorization
* File validation
* MIME validation
* File-size limits
* Malicious file rejection
* Signed URLs
* Expiration
* Access control
* Media ownership
* Processing failures
* Thumbnail/variant generation
* Cleanup
* Storage failures

Ensure tests never require unrestricted production object storage access.

# FRONTEND TESTING

Establish robust automated testing for the web application.

Cover:

* Rendering
* Routing
* Authentication
* Authorization-aware UI
* API integration
* Query caching
* Mutations
* Forms
* Validation
* Loading states
* Error states
* Empty states
* Retry states
* Degraded-network states
* Cart interactions
* Checkout interactions
* Order workflows
* Seller workflows
* Admin workflows
* Real-time UI updates

Test important user-visible business behavior rather than implementation details.

Avoid brittle selectors.

Prefer accessible roles, labels, semantic selectors, and stable test identifiers where necessary.

# MOBILE TESTING

Establish mobile test infrastructure for the actual React Native/Expo implementation.

Cover:

* App startup
* Navigation
* Authentication
* Session refresh
* API integration
* Query caching
* Offline behavior
* Reconnection
* Cart
* Checkout
* Orders
* Notifications
* Deep links
* Device permissions
* Secure storage
* Error handling

Support deterministic tests across appropriate mobile environments.

Do not make tests dependent on a developer's physical device.

# END-TO-END TESTING

Implement representative end-to-end workflows across the platform.

At minimum, cover applicable critical journeys such as:

1. Customer registration/login.
2. Catalog discovery.
3. Search.
4. Product filtering.
5. Product detail viewing.
6. Variant selection.
7. Cart creation.
8. Multi-seller cart.
9. Checkout.
10. Payment success.
11. Order creation.
12. Order history.
13. Shipment tracking.
14. Cancellation where allowed.
15. Return creation.
16. Refund handling.
17. Review submission.
18. Seller onboarding.
19. Seller product creation.
20. Seller inventory management.
21. Seller order fulfillment.
22. Seller payout visibility.
23. Administrative moderation.
24. Administrative operational workflows.

Do not create E2E tests for functionality that does not exist.

# ACCESSIBILITY TESTING

Implement automated accessibility validation where appropriate.

Validate:

* Keyboard navigation
* Focus management
* Accessible names
* Form labels
* Semantic structure
* Color-independent information
* Dialog accessibility
* Error announcements
* Loading-state announcements
* Interactive controls
* Mobile accessibility labels
* Screen-reader-relevant semantics

Integrate accessibility checks into suitable CI workflows.

# SECURITY TESTING

Establish automated security validation for application behavior.

Test for applicable risks including:

* Authentication bypass
* Authorization bypass
* IDOR
* Privilege escalation
* Injection
* SQL injection
* NoSQL injection where applicable
* XSS
* CSRF
* SSRF
* Command injection
* Path traversal
* Malicious uploads
* Credential abuse
* Rate-limit bypass
* Replay attacks
* Webhook forgery
* Sensitive data exposure
* Payment manipulation
* Price manipulation
* Inventory manipulation
* Coupon abuse

Do not create destructive security tests against production resources.

Use isolated environments.

# NEGATIVE TESTING

Every major business capability must include negative-path validation.

Test:

* Missing fields
* Invalid fields
* Boundary values
* Invalid identifiers
* Nonexistent resources
* Unauthorized resources
* Expired resources
* Duplicate requests
* Duplicate events
* Concurrent requests
* Provider failures
* Database failures
* Queue failures
* Search failures
* Timeout conditions

A test suite that only verifies successful behavior is incomplete.

# PROPERTY AND INVARIANT TESTING

Where beneficial, introduce property-based or invariant-oriented testing.

Use this particularly for:

* Pricing calculations
* Money calculations
* Discount calculations
* Inventory quantities
* Pagination
* State transitions
* Settlement calculations
* Idempotency behavior
* Input validation

Do not introduce property-based testing merely for novelty.

Use it where it provides meaningful defect detection.

# API CONTRACT TESTING

Validate that API implementations conform to their documented contracts.

Where OpenAPI is authoritative, test:

* Request schema
* Response schema
* Required fields
* Optional fields
* Data types
* Enum values
* Error responses
* Authentication requirements
* Pagination structures

Detect contract drift automatically.

# DATABASE MIGRATION TESTING

Test database migrations against realistic database states.

Validate:

* Fresh database creation
* Sequential migrations
* Existing production-like schema
* Representative data
* Constraints
* Indexes
* Backward compatibility where required
* Application compatibility
* Migration failure handling

Do not silently modify migrations merely to make tests pass.

# TEST ENVIRONMENT ISOLATION

Ensure test suites use isolated resources.

Never allow:

* Production database access
* Production payment credentials
* Production storage mutation
* Production queue mutation
* Production search mutation
* Production notification delivery

Tests must clearly identify their environment.

# TEST SECRETS

Never commit:

* API keys
* Passwords
* Tokens
* Private keys
* Payment credentials
* Cloud credentials
* Production secrets

Use safe test configuration and environment injection.

# TEST OBSERVABILITY

Validate application observability behavior where practical.

Test that critical operations produce appropriate:

* Logs
* Metrics
* Traces
* Correlation IDs
* Request IDs
* Job identifiers
* Event identifiers

Verify that sensitive information is not emitted into telemetry.

Test representative error scenarios to ensure failures remain diagnosable.

# PERFORMANCE TESTING FOUNDATION

Establish the foundation for performance validation.

Create representative performance scenarios for critical workloads such as:

* Product listing
* Search
* Product detail
* Cart retrieval
* Checkout
* Order retrieval
* Seller dashboard queries
* Admin queries
* Authentication

Establish measurable expectations where realistic.

Do not invent arbitrary performance targets that contradict the repository's architecture.

Separate performance tests from ordinary unit/integration suites when execution cost requires it.

# LOAD TESTING FOUNDATION

Prepare load-testing infrastructure capable of simulating realistic workloads.

Include representative traffic patterns for:

* Read-heavy catalog traffic
* Search traffic
* Authentication
* Cart operations
* Checkout
* Order retrieval
* Seller operations
* Administrative operations

Account for:

* Concurrency
* Ramp-up
* Sustained traffic
* Burst traffic
* Error rates
* Latency
* Resource utilization

Ensure load tests target isolated environments.

# RESILIENCE TESTING FOUNDATION

Create a foundation for controlled failure testing.

Where feasible, validate:

* Database unavailability
* Redis unavailability
* Search unavailability
* Queue failure
* Payment-provider failure
* Shipping-provider failure
* Object-storage failure
* Network timeout
* Worker interruption

Verify graceful degradation and recovery.

Do not perform destructive failure experiments against production.

# FLAKY TEST CONTROL

Implement mechanisms to identify and reduce flaky tests.

Tests must:

* Avoid arbitrary sleeps
* Use deterministic synchronization
* Avoid shared mutable state
* Avoid test-order dependence
* Clean up resources
* Isolate test data
* Use controlled clocks where necessary
* Use deterministic randomness where necessary

Retries must never hide genuine failures.

If retries are used in CI, report retry occurrences separately.

# TEST TIME CONTROL

Where the application depends on:

* Time
* Expiration
* Scheduled jobs
* Reservation expiry
* Coupons
* Promotions
* Payment windows
* Sessions
* Notifications

Use controllable clocks or deterministic time abstractions where appropriate.

Avoid tests that depend on real wall-clock timing unless testing actual scheduling behavior.

# TEST COVERAGE

Configure useful coverage reporting.

Track appropriate coverage dimensions including:

* Lines
* Statements
* Functions
* Branches

Do not optimize for coverage percentage alone.

Prioritize coverage of:

* Business rules
* Security boundaries
* Financial calculations
* State transitions
* Concurrency
* Failure paths
* Data integrity
* Integration boundaries

Do not add meaningless tests solely to increase coverage.

# CI TEST ORCHESTRATION

Integrate the QA system with the repository's CI/CD architecture.

Create appropriate test stages for:

* Formatting
* Linting
* Type checking
* Unit tests
* Integration tests
* API tests
* Contract tests
* Accessibility tests
* E2E tests
* Security tests
* Build validation

Separate fast feedback from expensive suites.

Ensure failures provide actionable diagnostics.

Cache dependencies safely where appropriate.

Do not allow caching to cause stale or incorrect test results.

# TEST REPORTING

Provide useful CI and local reports.

Reports should identify:

* Passed tests
* Failed tests
* Skipped tests
* Flaky/retried tests
* Duration
* Coverage
* Failure details
* Artifacts
* Screenshots where appropriate
* Videos/traces where appropriate
* Logs where appropriate

Ensure sensitive information is excluded from artifacts.

# TEST ARTIFACT RETENTION

Configure useful retention for:

* E2E screenshots
* Browser traces
* Videos
* Logs
* Coverage
* Test reports

Avoid indefinite retention of sensitive test artifacts.

# TEST CLEANUP

Every test must clean up resources it creates.

This includes:

* Database records
* Files
* Object-storage test objects
* Queue jobs
* Redis keys
* Search documents
* Temporary users
* Temporary sellers
* Browser state
* Mobile state

Do not leave uncontrolled test pollution.

# TEST DATA PRIVACY

Use synthetic data.

Never use real customer information in automated tests.

Never copy production personal data into test fixtures.

Use obviously synthetic:

* Names
* Emails
* Addresses
* Phone numbers
* Payment provider test values
* Product information

# FINANCIAL TESTING

Treat financial logic as high-risk.

Test:

* Decimal precision
* Rounding
* Currency
* Subtotals
* Discounts
* Taxes where implemented
* Shipping
* Refunds
* Partial refunds
* Seller fees
* Platform fees
* Net seller amounts
* Payout eligibility
* Settlement snapshots

Never validate monetary calculations using unsafe floating-point assumptions when the implementation requires exact decimal arithmetic.

# STATE MACHINE TESTING

For every implemented state machine, validate:

* Valid transitions
* Invalid transitions
* Terminal states
* Repeated transitions
* Concurrent transitions
* Unauthorized transitions
* Failure recovery
* Event emission
* Side effects

Apply this to applicable:

* Customer account
* Seller account
* Product
* Inventory
* Order
* Payment
* Return
* Shipment
* Payout
* Dispute

# REAL-TIME TESTING

Where WebSockets or SSE are implemented, test:

* Authentication
* Authorization
* Connection lifecycle
* Reconnection
* Event delivery
* Duplicate events
* Ordering
* Invalid messages
* Unauthorized subscriptions
* Connection termination
* Backpressure behavior where applicable

Verify that clients do not receive another user's private events.

# NOTIFICATION TESTING

Where notifications are implemented, test:

* Notification creation
* Preferences
* Channel selection
* Delivery
* Retry
* Failure
* Deduplication
* Read/unread state
* Push notifications
* Email notifications
* Real-time notifications

Verify preference enforcement.

# ADMIN AND MODERATION TESTING

Test administrative functionality according to actual repository implementation.

Cover:

* Role restrictions
* User management
* Seller management
* Product moderation
* Review moderation
* Abuse controls
* Disputes
* Platform configuration
* Feature flags
* Audit logs
* Operational dashboards

Administrative privileges must be explicitly tested.

# AUDIT TESTING

Where audit logs exist, validate:

* Actor
* Action
* Target
* Timestamp
* Correlation metadata
* Relevant change metadata
* Authorization
* Immutability expectations

Verify that sensitive information is not unnecessarily stored in audit records.

# DATA RETENTION TESTING

Where retention and deletion functionality exists, validate:

* Retention rules
* Account deletion
* Data export
* Anonymization
* Cascading behavior
* Audit preservation requirements
* Media cleanup
* Search cleanup
* Cache cleanup
* Queue cleanup

Ensure deletion behavior does not violate financial or audit requirements.

# TESTING INFRASTRUCTURE QUALITY

The testing code itself must be production-grade.

Do not:

* Duplicate setup logic unnecessarily
* Hide failures behind broad exception handling
* Use arbitrary sleeps
* Depend on test order
* Use global mutable state without strict control
* Disable validation merely to make tests pass
* Mock every dependency indiscriminately
* Assert implementation details when behavior is the actual contract

Testing utilities must be documented and maintainable.

# DOCUMENTATION

Document:

* QA architecture
* Test pyramid
* Test commands
* Environment setup
* Test database setup
* Fixtures and factories
* Test data conventions
* API testing
* Contract testing
* E2E testing
* Mobile testing
* Accessibility testing
* Security testing
* Performance testing
* CI execution
* Failure diagnosis
* Test artifact handling
* Flaky-test policy
* Coverage policy
* Local development workflow

Documentation must reflect the actual implementation.

# REPOSITORY COMPATIBILITY

Do not rewrite working application code unnecessarily.

Reuse existing:

* Test frameworks
* Utilities
* API clients
* Domain factories
* Configuration
* CI infrastructure
* Fixtures
* Mocking infrastructure
* Environment conventions

Only introduce new infrastructure when justified.

Do not duplicate an existing capability merely under a different name.

Maintain backward compatibility unless the current implementation is demonstrably incorrect or unsafe.

# IMPLEMENTATION BOUNDARIES

This prompt is specifically for QA Volume 1.

Implement the comprehensive testing foundation and broad automated validation described here.

Do not:

* Redesign the product architecture
* Replace working application frameworks without justification
* Rewrite unrelated application modules
* Create unrelated product features
* Invent nonexistent APIs
* Invent nonexistent infrastructure
* Remove functioning tests merely because they are inconvenient
* Disable security controls to simplify testing
* Replace production logic with test-specific shortcuts

If an existing implementation prevents meaningful testing because of a genuine architectural defect, make the smallest production-quality change necessary to enable correct testing and document it.

# ABSOLUTE IMPLEMENTATION RULES

You must:

* Inspect the repository before making changes.
* Treat the repository as the source of truth.
* Implement real executable tests.
* Implement real test infrastructure.
* Use realistic test data.
* Validate both success and failure paths.
* Validate authorization boundaries.
* Validate financial and inventory invariants.
* Validate concurrency-sensitive behavior.
* Validate integrations through controlled test environments or test doubles.
* Keep tests deterministic.
* Keep test suites isolated.
* Protect secrets.
* Protect production resources.
* Preserve existing working behavior.
* Integrate with existing CI/CD.
* Update documentation.
* Validate the implementation after changes.

Never:

* Write pseudo-tests.
* Create placeholder test files.
* Add TODO/FIXME placeholders.
* Claim coverage without implementing tests.
* Mock away the behavior being tested.
* Skip critical security assertions.
* Skip failure-path testing.
* Hardcode production credentials.
* Use real production customer data.
* Make destructive production calls.
* Hide failing tests.
* Suppress errors without justification.
* Say “implement similarly.”
* Say “remaining tests omitted.”
* Say “for brevity.”
* Leave incomplete implementations.

# PRODUCTION EXPECTATIONS

The completed QA implementation must be suitable for a funded startup operating a large-scale ecommerce marketplace.

The testing system must be:

* Deterministic
* Maintainable
* Scalable
* Fast where possible
* Thorough where necessary
* CI-compatible
* Developer-friendly
* Security-conscious
* Failure-oriented
* Observable
* Reproducible

Testing must provide meaningful confidence in:

* Data integrity
* Financial correctness
* Security
* Authorization
* Business logic
* API compatibility
* User workflows
* Distributed processing
* Failure recovery
* Deployment safety

# VALIDATION

After implementation:

1. Run formatting validation.
2. Run linting.
3. Run type checking.
4. Run unit tests.
5. Run integration tests.
6. Run API tests.
7. Run contract tests.
8. Run applicable frontend tests.
9. Run applicable mobile tests.
10. Run accessibility tests.
11. Run security tests that are safe for the current environment.
12. Run applicable E2E tests.
13. Run coverage generation.
14. Validate test isolation.
15. Validate CI configuration.
16. Validate test environment configuration.
17. Verify that no production secrets were introduced.
18. Verify that no production endpoints are targeted.
19. Verify that test artifacts do not expose sensitive information.
20. Fix failures caused by the implementation before declaring completion.

If a test cannot execute because an external dependency or environment is unavailable, clearly identify the exact dependency and distinguish environmental limitations from implementation failures.

Do not falsely report unavailable validation as successful.

# COMPLETION STANDARD

Consider this prompt complete only when:

* The QA architecture is implemented.
* Test configuration is implemented.
* Test utilities are reusable.
* Test factories and fixtures are implemented where required.
* Database testing is isolated.
* API testing is implemented.
* Contract testing is implemented where applicable.
* Event and queue testing is implemented where applicable.
* Authentication and authorization testing is implemented.
* Critical business rules are tested.
* Financial and inventory invariants are tested.
* Frontend testing foundations are implemented.
* Mobile testing foundations are implemented.
* E2E foundations are implemented.
* Accessibility validation is implemented.
* Security testing foundations are implemented.
* Performance testing foundations are implemented.
* Resilience testing foundations are implemented.
* CI orchestration is integrated.
* Test reporting is implemented.
* Coverage reporting is implemented.
* Documentation is updated.
* Relevant validation commands have been executed.
* Remaining limitations are explicitly documented.

# IMPLEMENTATION REPORT

At completion, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Test Architecture

Summarize the implemented QA architecture.

## Test Coverage

Summarize the major validated areas.

## Security Validation

Summarize security-related tests and controls.

## Integration Validation

Summarize API, database, event, queue, payment, storage, search, and other integration tests actually implemented.

## Frontend And Mobile Validation

Summarize applicable web and mobile testing.

## E2E Validation

Summarize implemented critical user journeys.

## CI/CD Integration

Summarize test pipeline integration.

## Validation Executed

List the exact commands or validation categories executed and their results.

## Known Limitations

List only genuine remaining limitations.

Do not claim functionality that was not actually implemented or tested.

# FINAL DIRECTIVE

Implement QA Volume 1 completely and directly in the repository.

Treat quality engineering as a first-class production system rather than a collection of example tests.

Build deterministic, isolated, maintainable, security-conscious automated validation that verifies the actual Amazon Ecommerce implementation across its critical application, data, integration, distributed-processing, user-interface, mobile, and operational boundaries.

Do not stop at test scaffolding.

Implement the actual tests, fixtures, factories, infrastructure, configuration, CI integration, reporting, documentation, and validation required by this prompt.

Do not leave placeholders, pseudo-code, TODOs, incomplete suites, or unimplemented test scenarios.
