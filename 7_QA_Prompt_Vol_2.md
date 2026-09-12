# AMAZON ECOMMERCE PLATFORM — QA VOLUME 2 IMPLEMENTATION PROMPT

# ROLE

Act as the complete senior software quality, validation, reliability, security, performance, and release-readiness organization responsible for the final production validation of a large-scale Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff QA Engineer
* Staff Backend Test Engineer
* Staff Frontend Test Engineer
* Staff Mobile Test Engineer
* Security Test Engineer
* Performance Engineer
* Reliability Engineer
* Distributed Systems Test Engineer
* Database Test Engineer
* Accessibility Engineer
* DevOps/Test Automation Engineer
* Release Validation Engineer
* Technical Writer

Do not act as a teacher, consultant, or prototype developer.

Inspect the repository and implement the final production-grade QA hardening, cross-system validation, regression coverage, resilience validation, security validation, performance validation, deployment validation, and release-readiness controls required to establish confidence in the completed platform.

# PROJECT

Build and validate a production-grade global ecommerce marketplace comparable in breadth and operational complexity to a large Amazon-style marketplace.

The platform supports:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume product discovery and search
* Multi-seller carts
* Multi-seller checkout
* Payments and refunds
* Inventory reservation
* Seller fulfillment
* Shipping
* Returns
* Reviews and ratings
* Promotions and coupons
* Seller payouts
* Notifications
* Real-time updates
* Administration
* Moderation
* Analytics
* Media processing
* High availability
* Horizontal scaling
* Continuous deployment
* Disaster recovery

This prompt is the final QA implementation stage.

The objective is not to create another testing framework.

The objective is to harden, validate, integrate, stress, secure, and production-validate the actual repository until the implemented platform has a defensible release-readiness baseline.

# PRIMARY USERS

Quality validation must protect the workflows and data of:

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

Use the technologies actually present in the repository.

Expected technologies include:

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
* React Navigation or equivalent
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
* REST
* Webhooks
* SSE/WebSockets where implemented
* Swagger/OpenAPI

## Infrastructure

* Docker
* Kubernetes
* Helm
* Terraform
* AWS
* GitHub Actions
* PostgreSQL
* Redis
* Search infrastructure
* S3-compatible object storage
* CloudFront/CDN
* Observability infrastructure

Use existing repository-standard testing technologies wherever possible.

Do not replace established testing tools without a concrete technical reason.

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before modifying anything:

1. Inspect the repository structure.
2. Inspect all existing QA infrastructure.
3. Inspect tests created by the existing QA implementation.
4. Inspect application modules and current behavior.
5. Inspect database schemas and migrations.
6. Inspect API contracts.
7. Inspect event contracts.
8. Inspect queue definitions.
9. Inspect frontend routes and critical workflows.
10. Inspect mobile navigation and critical workflows.
11. Inspect authentication and authorization.
12. Inspect payment and financial workflows.
13. Inspect search and indexing.
14. Inspect media processing.
15. Inspect infrastructure configuration.
16. Inspect CI/CD.
17. Inspect observability.
18. Inspect existing test reports and failures.
19. Identify flaky, redundant, incomplete, or misleading tests.
20. Identify the highest-risk remaining quality gaps.

Never assume an implementation exists because the product specification describes it.

Validate actual repository behavior.

# IMPLEMENTATION OBJECTIVE

Complete the final QA hardening stage.

The implementation must establish production-readiness validation across:

* Full regression
* Cross-domain integration
* Critical business workflows
* Financial correctness
* Inventory correctness
* Security
* Authorization
* Distributed-system behavior
* Concurrency
* Failure recovery
* Performance
* Load
* Stress
* Resilience
* Disaster recovery
* Database migrations
* Deployment
* Rollback
* Frontend
* Mobile
* Accessibility
* Real-time behavior
* External integrations
* Observability
* Data privacy
* Backup and restore
* Release readiness

This volume must identify and fix genuine defects discovered during validation where the fixes are necessary to make the system correct and production-ready.

Do not weaken tests to make the repository pass.

# FULL SYSTEM REGRESSION

Create and execute a comprehensive regression strategy.

Validate interactions across:

* Identity
* Customer accounts
* Sellers
* Catalog
* Inventory
* Pricing
* Promotions
* Cart
* Checkout
* Orders
* Payments
* Refunds
* Shipping
* Returns
* Reviews
* Notifications
* Search
* Seller payouts
* Disputes
* Administration
* Moderation
* Analytics
* Media

Test complete business flows rather than isolated endpoints only.

# CROSS-DOMAIN VALIDATION

Validate interactions where failures commonly occur between domains.

At minimum, test applicable combinations such as:

## Catalog → Search

Verify that:

* Product changes propagate correctly.
* Deleted/unpublished products stop appearing where required.
* Price changes propagate correctly.
* Inventory changes affect availability.
* Category changes are reflected.
* Search remains derived data.

## Catalog → Inventory → Cart → Checkout

Verify:

* Product validity.
* Variant validity.
* Inventory availability.
* Reservation.
* Price consistency.
* Checkout-time validation.
* Concurrent purchase behavior.

## Pricing → Promotions → Checkout → Order

Verify:

* Correct price snapshots.
* Promotion eligibility.
* Coupon eligibility.
* Discount calculations.
* Order totals.
* Financial snapshots.

## Checkout → Payment → Order → Fulfillment

Verify:

* Idempotent checkout.
* Payment state.
* Order state.
* Seller order grouping.
* Inventory reservation.
* Failure recovery.

## Order → Shipment → Return → Refund

Verify:

* Valid state transitions.
* Shipment state.
* Return eligibility.
* Refund correctness.
* Inventory consequences where applicable.

## Order → Seller Settlement → Payout

Verify:

* Seller financial snapshots.
* Platform fees.
* Refunds.
* Disputes.
* Payout eligibility.
* Idempotency.

# CRITICAL CUSTOMER JOURNEYS

Create stable end-to-end regression coverage for the highest-value customer workflows.

Validate applicable journeys including:

1. Registration.
2. Login.
3. Session refresh.
4. Product discovery.
5. Search.
6. Filtering.
7. Product details.
8. Variant selection.
9. Cart.
10. Multi-seller cart.
11. Checkout.
12. Successful payment.
13. Failed payment.
14. Order creation.
15. Order history.
16. Order details.
17. Shipment tracking.
18. Cancellation.
19. Return.
20. Refund.
21. Review submission.
22. Notification receipt.
23. Account management.
24. Address management.
25. Wishlist behavior.

Include both happy-path and failure-path scenarios.

# SELLER REGRESSION

Validate complete seller workflows.

Cover applicable flows including:

* Seller registration
* Seller onboarding
* Seller verification
* Seller profile
* Seller team management
* Product creation
* Product editing
* Variant management
* Media management
* Inventory management
* Pricing
* Promotions
* Order management
* Fulfillment
* Shipment updates
* Returns
* Refund visibility
* Reviews
* Disputes
* Payout visibility
* Settlement information
* Seller analytics

Verify seller isolation.

A seller must never access another seller's private resources.

# ADMIN REGRESSION

Validate administrative workflows.

Cover:

* User management
* Seller management
* Product moderation
* Review moderation
* Dispute management
* Abuse management
* Risk controls
* Platform configuration
* Feature flags
* Audit logs
* Operational dashboards
* Analytics
* Data-access controls

Test both permitted and denied administrative actions.

# FINANCIAL INTEGRITY VALIDATION

Treat financial correctness as release-blocking.

Validate end-to-end monetary consistency.

For applicable transactions verify:

* Item subtotal
* Discounts
* Promotions
* Coupons
* Shipping
* Taxes
* Fees
* Payment amount
* Refund amount
* Seller gross sales
* Platform fees
* Chargebacks
* Disputes
* Seller net amount
* Payout amount

Verify that:

* Values use correct decimal semantics.
* Rounding is deterministic.
* Currency is explicit.
* Snapshots remain immutable where required.
* Repeated operations do not duplicate money.
* Partial refunds are correct.
* Full refunds are correct.
* Failed payment recovery does not create duplicate orders or charges.

# PAYMENT FAILURE MATRIX

Validate realistic payment failure conditions.

Test:

* Provider timeout
* Provider rejection
* Declined payment
* Expired payment state
* Duplicate callback
* Duplicate webhook
* Out-of-order webhook
* Invalid webhook signature
* Provider retry
* Application restart during payment processing
* Worker restart
* Database failure during reconciliation
* Network interruption

Verify recovery without double charging or duplicate financial records.

# INVENTORY INTEGRITY VALIDATION

Test inventory under realistic concurrent workloads.

Validate:

* Reservation
* Reservation expiration
* Reservation release
* Checkout
* Cancellation
* Failed payment
* Return
* Restocking
* Manual adjustment
* Concurrent checkout
* Duplicate checkout request
* Worker interruption

The system must never permit inventory quantities to become logically inconsistent.

# DISTRIBUTED SYSTEM VALIDATION

Test distributed behavior under:

* Duplicate requests
* Duplicate events
* Duplicate jobs
* Out-of-order events
* Delayed events
* Worker restarts
* Consumer restarts
* Network timeouts
* Provider failures
* Partial service outages
* Database failover
* Redis interruption
* Search interruption

Verify idempotency and eventual consistency behavior.

# IDEMPOTENCY VALIDATION

Explicitly validate all implemented idempotency mechanisms.

Test:

* Same request repeated
* Same idempotency key with identical payload
* Same idempotency key with different payload
* Concurrent duplicate requests
* Retry after timeout
* Retry after server restart
* Duplicate webhook
* Duplicate queue job
* Duplicate event

Verify that idempotency does not incorrectly suppress legitimate independent operations.

# STATE MACHINE REGRESSION

For every implemented state machine, validate the entire transition matrix.

Cover:

* Valid transitions
* Invalid transitions
* Unauthorized transitions
* Repeated transitions
* Concurrent transitions
* Terminal states
* Retry after failure
* Event emission
* Side effects
* Persistence consistency

Validate applicable:

* Customer account
* Seller account
* Product
* Inventory
* Order
* Payment
* Shipment
* Return
* Payout
* Dispute

# SECURITY REGRESSION

Perform a final security-focused application regression.

Test for:

* Authentication bypass
* Authorization bypass
* IDOR
* Privilege escalation
* Cross-seller data access
* Cross-customer data access
* Administrative privilege abuse
* Injection
* XSS
* CSRF
* SSRF
* Command injection
* Path traversal
* Malicious uploads
* Webhook forgery
* Replay
* Rate-limit bypass
* Sensitive-data exposure
* Session abuse
* Token misuse
* Price manipulation
* Inventory manipulation
* Coupon abuse
* Payment manipulation

Do not perform destructive testing against production.

# AUTHORIZATION MATRIX

Build or verify a comprehensive authorization matrix.

Test combinations of:

* Anonymous customer
* Authenticated customer
* Seller
* Seller staff
* Moderator
* Administrator
* Platform operator

For each sensitive resource validate:

* Read
* Create
* Update
* Delete
* Execute
* Approve
* Reject
* Refund
* Cancel
* Moderate
* Export

Verify both endpoint-level and resource-level authorization.

# DATA PRIVACY VALIDATION

Validate privacy boundaries.

Test that users cannot access:

* Another customer's personal information
* Another customer's addresses
* Another customer's orders
* Another customer's payment information
* Another seller's private information
* Internal administrative data
* Private audit information
* Private operational data

Validate:

* Data export
* Account deletion
* Anonymization
* Retention
* Search cleanup
* Cache cleanup
* Media cleanup

where those capabilities are implemented.

# PERFORMANCE VALIDATION

Run production-oriented performance tests in an isolated environment.

Measure applicable:

* Request latency
* Throughput
* Error rate
* Database utilization
* Redis utilization
* Search latency
* Queue latency
* Worker throughput
* CPU
* Memory
* Network
* Connection pools

Focus on critical workloads:

* Authentication
* Product listing
* Search
* Product detail
* Cart
* Checkout
* Order retrieval
* Seller dashboards
* Administrative dashboards

Identify:

* Slow queries
* N+1 behavior
* Inefficient pagination
* Excessive cache misses
* Queue bottlenecks
* Search bottlenecks
* Memory growth
* Connection exhaustion

Fix genuine implementation problems discovered by testing.

# LOAD TESTING

Execute controlled load tests against isolated environments.

Test:

* Baseline load
* Ramp-up
* Sustained load
* Burst traffic
* Recovery after burst

Model realistic traffic distribution rather than sending identical requests repeatedly.

Measure:

* P50 latency
* P95 latency
* P99 latency
* Throughput
* Error rate
* Saturation
* Queue depth
* Database load
* Cache behavior

Do not invent success criteria that contradict actual architecture or documented operational requirements.

Where explicit service-level objectives exist in the repository, validate against them.

# STRESS TESTING

Perform controlled stress testing where the environment permits.

Identify system behavior beyond normal capacity.

Verify:

* Graceful degradation
* Backpressure
* Rate limiting
* Queue accumulation
* Resource protection
* Recovery after load reduction

The system must fail predictably rather than corrupting business state.

# RESILIENCE TESTING

Validate controlled dependency failures.

Test isolated failure scenarios involving:

* PostgreSQL
* Redis
* Search
* Queue workers
* Object storage
* Payment provider
* Shipping provider
* Notification provider
* External APIs

Verify:

* Timeouts
* Retries
* Backoff
* Circuit behavior where implemented
* Graceful degradation
* Error reporting
* Recovery
* No data corruption

# CHAOS VALIDATION

Where safe infrastructure exists, perform controlled resilience experiments.

Potential scenarios:

* Pod termination
* Worker termination
* Application restart
* Dependency latency
* Temporary dependency outage
* Network interruption
* Queue consumer interruption

Do not perform uncontrolled destructive experiments.

Every experiment must have:

* Clear scope
* Isolated environment
* Observable expected behavior
* Recovery procedure
* Validation criteria

# DATABASE VALIDATION

Perform final database quality validation.

Verify:

* Schema integrity
* Constraints
* Foreign keys
* Unique constraints
* Indexes
* Transaction behavior
* Isolation
* Migration safety
* Query performance
* Pagination
* Referential integrity

Test representative production-like datasets.

# MIGRATION REGRESSION

Validate:

* Fresh installation
* Sequential migrations
* Upgrade from realistic previous states
* Representative data
* Application compatibility during migration
* Rollback strategy where supported
* Failure handling

Never modify migration history merely to make a test pass.

If a migration defect exists, implement a correct migration strategy consistent with repository conventions.

# BACKUP AND RESTORE VALIDATION

Validate disaster-recovery testing foundations.

Test applicable:

* PostgreSQL backup
* PostgreSQL restore
* Point-in-time recovery
* Object-storage recovery
* Search reconstruction
* Redis recovery
* Queue/event recovery
* Kubernetes reconstruction
* Configuration recovery
* Secret recovery

Verify restored systems preserve required business invariants.

# DISASTER RECOVERY VALIDATION

Where infrastructure permits, perform controlled recovery exercises.

Validate:

* Recovery procedure
* Data restoration
* Application startup
* Database connectivity
* Search reconstruction
* Queue recovery
* Object storage access
* Authentication
* Critical customer workflows
* Critical seller workflows
* Financial integrity

Verify that recovery does not create:

* Duplicate orders
* Duplicate payments
* Duplicate payouts
* Invalid inventory
* Lost critical financial records

# DEPLOYMENT VALIDATION

Validate the actual deployment system.

Test:

* Build
* Container creation
* Image startup
* Configuration
* Secrets injection
* Database migrations
* Kubernetes deployment
* Health checks
* Readiness
* Liveness
* Autoscaling
* Service discovery
* Ingress
* TLS
* Rollout
* Rollback

Verify failed deployments do not leave the system in an unsafe partially upgraded state.

# ZERO-DOWNTIME VALIDATION

Where zero-downtime deployment is an explicit requirement, test:

* Rolling deployments
* Existing connections
* API compatibility
* Database migration compatibility
* Queue workers
* WebSockets/SSE
* In-flight requests
* Session continuity

Verify that deployment does not corrupt transactions.

# BACKWARD COMPATIBILITY

Validate compatibility between:

* Existing clients
* API versions
* Database versions
* Queue consumers
* Event consumers
* Frontend and backend
* Mobile and backend
* Old and new deployments during rollout

Detect breaking changes before release.

# FRONTEND PRODUCTION VALIDATION

Perform final web application regression.

Validate:

* Routing
* Authentication
* Authorization-aware rendering
* API integration
* Query caching
* Forms
* Validation
* Checkout
* Orders
* Seller portal
* Admin portal
* Real-time updates
* Error handling
* Loading states
* Empty states
* Offline/degraded behavior

Test production builds rather than only development mode.

# WEB PERFORMANCE VALIDATION

Validate applicable:

* Core Web Vitals
* JavaScript bundle size
* Route loading
* Image loading
* Font loading
* Cache behavior
* Server rendering
* Client hydration
* API waterfalls
* Large-list rendering

Fix material regressions.

Do not optimize artificially at the expense of maintainability.

# MOBILE PRODUCTION VALIDATION

Validate the production-oriented mobile build.

Test:

* Startup
* Authentication
* Navigation
* API communication
* Offline mode
* Reconnection
* Cart
* Checkout
* Orders
* Notifications
* Push behavior
* Deep links
* Secure storage
* Permissions
* App lifecycle
* Background/foreground transitions

Test across representative supported device classes and operating-system versions where infrastructure permits.

# MOBILE PERFORMANCE

Validate:

* Startup time
* Memory usage
* List performance
* Image loading
* Media handling
* Battery-sensitive behavior
* Network usage
* Background behavior

Identify leaks and unnecessary work.

# ACCESSIBILITY REGRESSION

Perform final accessibility validation.

Validate:

* Keyboard access
* Focus order
* Focus restoration
* Screen-reader semantics
* Form labels
* Validation errors
* Dialogs
* Notifications
* Loading states
* Tables
* Navigation
* Interactive controls

Validate mobile accessibility semantics where supported.

# REAL-TIME REGRESSION

Validate WebSocket/SSE behavior where implemented.

Test:

* Authentication
* Authorization
* Connection establishment
* Reconnection
* Duplicate events
* Event ordering
* Connection termination
* Subscription isolation
* Backpressure
* State synchronization

Verify that reconnecting clients do not receive stale or unauthorized information.

# SEARCH REGRESSION

Validate search behavior under realistic data.

Test:

* Product indexing
* Updates
* Deletes
* Unpublishing
* Availability
* Pricing
* Facets
* Filters
* Sorting
* Pagination
* Suggestions
* Search failures
* Reindexing
* Recovery

Verify that search failure does not compromise authoritative transactional data.

# MEDIA REGRESSION

Validate:

* Upload authorization
* File validation
* Processing
* Signed access
* Expiration
* Variants
* Failure recovery
* Cleanup

Test malicious and malformed inputs safely.

# NOTIFICATION REGRESSION

Validate:

* Email
* Push
* In-app
* Real-time notifications

where implemented.

Test:

* Preferences
* Deduplication
* Retry
* Failure
* Delivery state
* Read state
* User isolation

# OBSERVABILITY VALIDATION

Verify that production-critical operations are observable.

Validate:

* Structured logging
* Metrics
* Distributed traces
* Correlation IDs
* Queue metrics
* Database metrics
* External-provider telemetry
* Error reporting
* Business metrics

Ensure sensitive data is excluded from telemetry.

# ALERT VALIDATION

Where alerts are implemented, validate that important failure conditions can trigger actionable alerts.

Cover representative:

* API failures
* High latency
* Database saturation
* Queue backlog
* Worker failure
* Search failure
* Payment failure
* Error-rate increase
* Resource exhaustion

Avoid alert noise that makes production incidents harder to identify.

# TEST QUALITY AUDIT

Audit the existing test suite.

Identify:

* Flaky tests
* Duplicate tests
* False-positive tests
* Tests asserting implementation details
* Tests with weak assertions
* Tests that never exercise failure paths
* Tests that share mutable state
* Tests with arbitrary delays
* Tests that silently skip
* Tests that depend on execution order
* Tests that rely on developer-specific state

Correct them.

# TEST FLAKINESS

Execute relevant suites repeatedly where useful to identify nondeterministic failures.

For every flaky test:

1. Reproduce the failure.
2. Determine the root cause.
3. Fix synchronization or isolation.
4. Re-run the test repeatedly.
5. Verify that the fix does not hide legitimate failures.

Do not simply increase retry counts.

# REGRESSION BASELINE

Establish a repeatable regression baseline.

The repository must provide clear commands or workflows for executing:

* Fast validation
* Full backend validation
* Full frontend validation
* Full mobile validation
* E2E validation
* Security validation
* Performance validation
* Full production-readiness validation

Commands must reflect actual repository structure.

# CI QUALITY GATES

Harden CI quality gates.

Critical validation must fail CI when appropriate.

Quality gates should cover applicable:

* Formatting
* Linting
* Type checking
* Unit tests
* Integration tests
* API tests
* Contract tests
* Security tests
* Accessibility tests
* E2E tests
* Build validation

Do not make expensive tests mandatory on every developer workflow if doing so would make the development cycle impractical.

Use appropriate pipeline stages.

# RELEASE CANDIDATE VALIDATION

Implement a release-candidate validation workflow.

The release candidate must be validated against:

* Production-like configuration
* Production build artifacts
* Production-like database state
* Representative test data
* Realistic integrations or controlled provider environments

Validate:

* Startup
* Health
* Authentication
* Critical customer workflows
* Critical seller workflows
* Payments
* Orders
* Inventory
* Search
* Notifications
* Administrative operations

# SECURITY OF TEST INFRASTRUCTURE

Review testing infrastructure itself for vulnerabilities.

Ensure:

* Test credentials are isolated
* CI secrets are protected
* Logs do not expose credentials
* Test artifacts do not expose sensitive information
* Test databases are inaccessible from untrusted environments
* External test endpoints are controlled
* Security scanners do not receive production secrets

# SUPPLY-CHAIN VALIDATION

Where feasible, validate:

* Dependency vulnerabilities
* Lockfile consistency
* Suspicious dependency changes
* Container vulnerabilities
* Build provenance
* Secret scanning
* Infrastructure security scanning

Integrate appropriate checks into CI.

Do not introduce noisy scanners without actionable configuration.

# ACCESS CONTROL TEST MATRIX

Create maintainable automated authorization tests covering the actual roles and permissions in the repository.

Include negative cases for:

* Customer → another customer
* Seller → another seller
* Seller staff → unauthorized seller operation
* Moderator → administrator-only operation
* Administrator → restricted platform operation where applicable
* Anonymous user → protected operation

Verify both API responses and side effects.

# DATA CONSISTENCY CHECKS

Create automated consistency checks for critical relationships.

Where applicable verify:

* Order totals match order items
* Payment amount matches expected order amount
* Refunds do not exceed refundable amount
* Inventory reservations do not exceed stock
* Seller settlement matches order financial records
* Shipment items belong to correct order items
* Return items belong to eligible orders
* Reviews belong to eligible customers/products
* Search records correspond to valid catalog state

# RECONCILIATION VALIDATION

Test reconciliation mechanisms where implemented.

Validate reconciliation between:

* Orders and payments
* Payments and refunds
* Orders and inventory
* Orders and shipments
* Orders and seller settlements
* Search and catalog
* Notifications and delivery state
* Queue state and business state

Test detection and safe recovery from mismatches.

# ERROR HANDLING VALIDATION

Verify that errors are:

* Correctly classified
* Correctly returned
* Secure
* Observable
* Actionable
* Consistent

Verify that internal errors do not expose stack traces or sensitive infrastructure details to clients.

# API ERROR CONTRACT REGRESSION

Validate consistency across API modules.

Ensure equivalent error conditions use consistent:

* Status codes
* Error identifiers
* Message structure
* Validation structure
* Correlation identifiers

Do not break documented API clients.

# PAGINATION REGRESSION

Validate pagination under realistic datasets.

Test:

* First page
* Middle pages
* Last page
* Empty page
* Cursor expiration where applicable
* Deleted records
* Concurrent inserts
* Concurrent deletes
* Sorting consistency

Avoid duplicate or missing records caused by unstable pagination.

# RATE-LIMITING REGRESSION

Validate applicable rate limits.

Test:

* Normal usage
* Burst traffic
* Exceeded limits
* Recovery
* Different identities
* Anonymous requests
* Authenticated requests
* Administrative requests
* Internal service calls

Ensure rate limiting does not become an authorization bypass.

# FEATURE FLAG VALIDATION

Where feature flags exist, test:

* Enabled
* Disabled
* Partial rollout
* Role targeting
* Environment targeting
* Invalid configuration
* Flag removal

Verify disabled functionality cannot accidentally remain accessible through alternate routes.

# INTERNATIONALIZATION-READY VALIDATION

Where the application supports or prepares for localization, validate:

* Date formatting
* Number formatting
* Currency formatting
* Time zones
* Text expansion
* Locale-aware validation

Do not hardcode assumptions that prevent future localization.

# PRODUCTION CONFIGURATION VALIDATION

Validate production configuration without exposing secrets.

Check:

* Required variables
* Safe defaults
* Environment separation
* Secret references
* Database configuration
* Redis configuration
* Search configuration
* Storage configuration
* Payment configuration
* Notification configuration
* Observability configuration

Fail clearly when required configuration is absent.

# DOCUMENTATION VALIDATION

Ensure QA documentation accurately describes:

* Test commands
* Environment setup
* CI behavior
* Regression workflow
* Release validation
* Security testing
* Performance testing
* Failure diagnosis
* Test data
* Test artifacts
* Disaster-recovery validation

Remove obsolete or contradictory instructions.

# PRODUCTION READINESS AUDIT

Perform a final quality audit across:

## Correctness

* Business rules
* State transitions
* Financial calculations
* Inventory
* Data consistency

## Security

* Authentication
* Authorization
* Input validation
* Data exposure
* Secrets
* Webhooks
* Uploads

## Reliability

* Retries
* Idempotency
* Timeouts
* Failure handling
* Recovery

## Scalability

* Database
* Cache
* Search
* Queues
* API
* Workers

## User Experience

* Web
* Mobile
* Accessibility
* Error handling
* Performance

## Operations

* Logging
* Metrics
* Tracing
* Alerts
* Backups
* Recovery
* Deployment

# RELEASE-BLOCKING DEFECTS

Treat the following as release-blocking unless there is a documented and explicitly accepted mitigation:

* Authentication bypass
* Authorization bypass
* Cross-user data exposure
* Cross-seller data exposure
* Duplicate financial charges
* Incorrect refund amounts
* Incorrect seller settlement
* Inventory overselling
* Corrupted order state
* Irrecoverable critical data loss
* Broken critical checkout
* Broken critical payment workflow
* Broken deployment
* Unrecoverable migration
* Production secret exposure
* Critical security vulnerability
* Critical data-integrity defect

Do not declare production readiness while unresolved release-blocking defects remain.

# NON-BLOCKING DEFECTS

Document lower-severity issues separately.

Every remaining issue must include:

* Severity
* Impact
* Reproduction information
* Affected area
* Current mitigation
* Recommended follow-up

Do not hide known defects.

# FINAL VALIDATION

Execute the strongest practical validation available in the repository.

At minimum:

1. Format.
2. Lint.
3. Type check.
4. Unit tests.
5. Integration tests.
6. API tests.
7. Contract tests.
8. Database tests.
9. Event tests.
10. Queue tests.
11. Security tests.
12. Accessibility tests.
13. Frontend tests.
14. Mobile tests.
15. Critical E2E tests.
16. Build validation.
17. Production-like configuration validation.
18. Performance validation where environment permits.
19. Load validation where environment permits.
20. Resilience validation where environment permits.
21. Migration validation.
22. Backup/restore validation where environment permits.
23. Deployment validation.
24. Rollback validation where environment permits.
25. Final regression.

Do not claim a validation category succeeded if it could not actually be executed.

Clearly distinguish:

* Passed
* Failed
* Blocked by environment
* Not applicable

# DEFECT CORRECTION

When validation discovers a genuine defect:

1. Determine the root cause.
2. Implement the smallest correct production-quality fix.
3. Add or strengthen regression coverage.
4. Re-run the affected tests.
5. Re-run related regression suites.
6. Verify no unrelated behavior regressed.
7. Document material changes.

Never modify a test solely to conceal a real application defect.

# PERFORMANCE REGRESSION PROTECTION

Where meaningful performance baselines exist, preserve them through automated validation.

Detect regressions involving:

* API latency
* Query latency
* Search latency
* Bundle size
* Mobile startup
* Memory
* Queue throughput

Do not create arbitrary hard limits that produce unstable CI.

Use statistically meaningful and architecture-appropriate thresholds.

# FINAL TEST ARTIFACTS

Ensure the repository can produce useful release-validation artifacts including, where applicable:

* Test reports
* Coverage reports
* E2E screenshots
* E2E traces
* Videos
* Security scan results
* Performance reports
* Load-test reports
* Migration validation results
* Deployment validation results

Artifacts must not expose secrets or sensitive customer data.

# FINAL QA DOCUMENTATION

Create or update documentation explaining:

* Complete QA architecture
* Regression strategy
* Critical workflows
* Test commands
* CI quality gates
* Release-candidate validation
* Performance validation
* Security validation
* Resilience testing
* Disaster-recovery testing
* Defect severity
* Release-blocking criteria
* Flaky-test policy
* Test artifact policy
* Production-readiness process

Documentation must describe what is actually implemented.

# REPOSITORY COMPATIBILITY

Preserve all functioning application behavior.

Reuse existing:

* Test frameworks
* Fixtures
* Factories
* CI pipelines
* Test utilities
* API clients
* Mock infrastructure
* Environment configuration
* Deployment validation tooling

Do not create duplicate systems unnecessarily.

Do not rewrite unrelated application modules.

Do not introduce breaking changes solely to simplify testing.

# IMPLEMENTATION BOUNDARIES

This is the final QA and production-validation prompt.

Do not:

* Invent product functionality
* Redesign the platform unnecessarily
* Replace existing architecture without justification
* Create fictional tests
* Create placeholder tests
* Disable security controls
* Remove legitimate validation
* Hide failures
* Ignore critical defects
* Claim unavailable tests passed
* Use production data for testing
* Use production secrets
* Perform destructive production experiments

Only make production-code changes when validation identifies a real defect or when a small change is required to establish correct production-grade testability.

# ABSOLUTE IMPLEMENTATION RULES

You must:

* Inspect the repository first.
* Treat the repository as the source of truth.
* Validate actual behavior.
* Test critical business invariants.
* Test security boundaries.
* Test failure paths.
* Test concurrency.
* Test idempotency.
* Test distributed behavior.
* Test financial integrity.
* Test inventory integrity.
* Test deployment behavior.
* Test recovery behavior.
* Test web and mobile critical workflows.
* Test accessibility.
* Test performance.
* Test resilience.
* Maintain deterministic tests.
* Preserve isolation.
* Integrate with CI/CD.
* Fix genuine defects discovered during validation.
* Add regression tests for fixes.
* Update documentation.
* Report all validation limitations honestly.

Never:

* Use pseudo-code.
* Leave TODO/FIXME test gaps.
* Use placeholder assertions.
* Use meaningless coverage tests.
* Suppress legitimate failures.
* Add arbitrary sleeps to stabilize tests.
* Depend on execution order.
* Use production secrets.
* Use production customer data.
* Claim success without execution.
* Say “remaining tests omitted.”
* Say “implement similarly.”
* Say “for brevity.”
* Leave incomplete test infrastructure.

# PRODUCTION EXPECTATIONS

The final QA implementation must provide a credible production-readiness baseline for a large-scale ecommerce marketplace.

The completed quality system must be:

* Comprehensive
* Deterministic
* Maintainable
* Secure
* Observable
* Scalable
* Reproducible
* CI-compatible
* Release-oriented
* Failure-aware

Quality validation must protect the most important properties of the platform:

* Customer trust
* Seller isolation
* Financial correctness
* Inventory correctness
* Data integrity
* Security
* Availability
* Recoverability
* Operational visibility
* Deployment safety

# COMPLETION STANDARD

This final QA volume is complete only when:

* The complete regression strategy is implemented.
* Critical cross-domain workflows are covered.
* Financial integrity is validated.
* Inventory integrity is validated.
* Authorization boundaries are validated.
* Security regression is implemented.
* Distributed-system behavior is validated.
* Idempotency is validated.
* State machines are validated.
* Frontend production workflows are validated.
* Mobile production workflows are validated.
* Accessibility is validated.
* Performance validation is implemented.
* Load validation is implemented where the environment permits.
* Resilience validation is implemented where the environment permits.
* Migration validation is implemented.
* Backup/restore validation is implemented where the environment permits.
* Deployment validation is implemented.
* Rollback validation is implemented where the environment permits.
* CI quality gates are hardened.
* Test flakiness is addressed.
* Critical defects discovered during validation are corrected.
* Regression coverage exists for corrected defects.
* Documentation is complete and accurate.
* Release-blocking defects are identified.
* Final validation results are recorded honestly.

# FINAL PRODUCTION-READINESS REPORT

At completion, provide a concise but complete report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Defects Discovered

List defects discovered during final validation.

## Defects Fixed

List defects actually corrected.

## Regression Coverage

Summarize the regression coverage added or strengthened.

## Security Validation

Summarize security testing and results.

## Financial Validation

Summarize payment, refund, settlement, and payout validation.

## Inventory Validation

Summarize concurrency and inventory integrity validation.

## Performance Validation

Summarize performance, load, and stress validation.

## Resilience Validation

Summarize failure-injection, recovery, and disaster-recovery validation.

## Deployment Validation

Summarize build, deployment, migration, rollout, and rollback validation.

## Frontend Validation

Summarize web, accessibility, and browser validation.

## Mobile Validation

Summarize mobile, device, accessibility, and lifecycle validation.

## CI/CD Validation

Summarize final quality gates and automated workflows.

## Validation Results

For every major validation category, report:

* Passed
* Failed
* Blocked
* Not applicable

Do not claim a blocked or unexecuted validation passed.

## Remaining Risks

List only genuine unresolved risks.

## Production Readiness

State whether the repository meets the implemented QA release criteria.

Do not declare the system production-ready if a release-blocking defect remains.

# FINAL DIRECTIVE

Implement the final QA hardening and production-validation scope completely and directly in the repository.

Do not stop at test planning.

Execute the tests.

Analyze failures.

Fix genuine defects.

Add regression coverage.

Validate cross-domain behavior.

Validate security.

Validate financial integrity.

Validate inventory concurrency.

Validate distributed-system behavior.

Validate performance and resilience where the environment permits.

Validate deployment and recovery behavior.

Validate web and mobile production workflows.

Validate accessibility.

Validate CI/CD quality gates.

Validate the final release candidate.

Leave the repository with a complete, maintainable, production-grade QA system and an honest production-readiness assessment.

Do not leave placeholders, pseudo-tests, TODOs, hidden failures, incomplete validation, or unsupported claims of success.

This is the final QA implementation stage for the Amazon Ecommerce platform.
