# Amazon Ecommerce Marketplace — QA Prompt — Volume 2

## ROLE

Act as the Senior QA Engineering, E2E Automation, Mobile QA, Web QA, Accessibility, Performance, Reliability, Security Regression, Release Engineering, and Production Readiness team for a production-grade Amazon-style ecommerce marketplace.

This is an original ecommerce marketplace implementation inspired by the capabilities and scale of major ecommerce platforms. Do not copy proprietary Amazon implementation details, source code, branding, assets, or private APIs.

Your responsibility in this phase is to inspect the actual repository and complete the remaining end-to-end, frontend, mobile, accessibility, performance, resilience, security-regression, and release-validation program.

The repository is the source of truth.

Do not assume that previous prompts, architecture documents, previous conversations, or previous AI outputs are available.

---

# 1. REPOSITORY-FIRST EXECUTION

Before modifying anything:

1. Inspect the complete repository.
2. Identify web applications.
3. Identify mobile applications.
4. Identify backend services.
5. Identify existing test suites.
6. Identify existing E2E frameworks.
7. Identify browser automation infrastructure.
8. Identify mobile E2E infrastructure.
9. Identify accessibility tooling.
10. Identify performance/load-testing tooling.
11. Identify CI/CD workflows.
12. Identify environment configuration.
13. Identify test fixtures and factories.
14. Identify API contracts and actual implemented behavior.
15. Identify the current authentication/session flow.
16. Identify checkout/payment/order/fulfillment/return/review/notification flows.
17. Identify current observability and production-readiness infrastructure.

Reuse compatible existing infrastructure.

Do not create competing test frameworks without a strong technical reason.

Do not duplicate existing test utilities.

If the repository differs from expected architecture, test the actual implementation and make only the smallest safe changes required.

---

# 2. PRIMARY OBJECTIVE

Create a production-grade quality program that validates the complete customer experience across:

* Web
* Mobile
* Backend APIs
* Database-backed workflows
* Payments
* Inventory
* Orders
* Fulfillment
* Returns
* Reviews
* Notifications
* Search
* Authentication
* Authorization
* Accessibility
* Performance
* Reliability
* Security
* Release readiness

The most important objective is confidence in real user-critical workflows.

Do not optimize for artificial test counts.

---

# 3. END-TO-END TESTING STRATEGY

Build E2E coverage around real business journeys.

Prioritize critical paths over isolated UI components.

At minimum, where the functionality exists, cover:

1. New customer registration.
2. Existing customer login.
3. Session restoration.
4. Product discovery.
5. Category browsing.
6. Search.
7. Search filters.
8. Product detail.
9. Variant selection.
10. Seller offer selection.
11. Add to cart.
12. Cart modification.
13. Anonymous cart.
14. Authentication/cart merge.
15. Checkout.
16. Address selection.
17. Shipping selection.
18. Promotion/coupon application.
19. Payment.
20. Order creation.
21. Order confirmation.
22. Order history.
23. Order detail.
24. Shipment tracking.
25. Return request.
26. Refund status.
27. Review creation.
28. Review editing/removal where supported.
29. Notification center.
30. Account management.

Do not invent workflows that are not implemented.

---

# 4. WEB E2E TESTING

Use the repository's existing browser automation framework when available.

If none exists, select a mature framework appropriate to the actual stack, such as Playwright, and integrate it cleanly rather than introducing multiple overlapping frameworks.

Test:

* routing
* authentication
* session restoration
* protected routes
* product discovery
* categories
* search
* filters
* sorting
* pagination
* product details
* variants
* seller offers
* pricing
* cart
* checkout
* payment
* order history
* order detail
* shipment tracking
* returns
* reviews
* notifications
* account settings

Verify actual server responses rather than merely checking that buttons can be clicked.

---

# 5. WEB AUTHENTICATION E2E

Test:

* registration
* login
* invalid credentials
* logout
* session persistence
* session expiration
* unauthorized route access
* authorized route access
* account state changes
* protected API requests
* browser refresh
* multiple tabs where relevant
* safe redirect behavior

Verify that authentication is enforced server-side.

Do not consider hiding UI elements an authorization test.

---

# 6. CUSTOMER PURCHASE E2E

Create a complete purchase journey using controlled test data:

1. Customer signs in.
2. Customer searches or browses.
3. Customer opens a product.
4. Customer selects the required variant/offer.
5. Customer adds the product to cart.
6. Customer reviews cart.
7. Customer starts checkout.
8. Customer selects address.
9. Customer selects shipping.
10. Customer applies promotion/coupon where applicable.
11. Customer completes payment using a test/sandbox payment path where available.
12. Backend creates the order.
13. UI displays the resulting order.
14. Customer opens order history.
15. Customer opens order detail.

Verify backend state after the workflow.

Do not consider an E2E test successful solely because the browser displayed a confirmation page.

---

# 7. MULTI-SELLER E2E

Where marketplace functionality supports multiple sellers, test:

* products from multiple sellers
* seller-specific offers
* multi-seller cart
* multi-seller checkout
* seller-specific inventory
* order grouping
* seller-specific fulfillment
* multiple shipments
* seller visibility boundaries

Verify that the customer sees correct seller information while private seller information remains protected.

---

# 8. INVENTORY E2E

Test realistic inventory scenarios.

Include:

* available stock
* insufficient stock
* reservation
* checkout reservation
* successful purchase
* reservation expiration
* cancellation
* concurrent purchasing where feasible

Verify that the UI does not report successful purchase when backend inventory allocation failed.

---

# 9. PAYMENT E2E

Use only safe test/sandbox payment environments.

Test supported payment states such as:

* successful payment
* payment requiring additional action
* payment processing
* payment failure
* cancellation
* refund
* partial refund

Verify that the UI accurately represents backend payment state.

Test ambiguous client/network situations such as:

* browser timeout
* refresh during payment
* repeated confirmation
* navigation away and return
* duplicate submission

The system must not create duplicate orders or payments.

Never expose payment secrets.

---

# 10. ORDER AND FULFILLMENT E2E

Test:

* order creation
* order confirmation
* order history
* order details
* cancellation where allowed
* shipment status
* multiple shipments
* tracking events
* delivered state
* return initiation

Use deterministic test data.

Do not depend on real carrier movement or real-world delivery timing.

Where carrier integration exists, use its test/sandbox capabilities or controlled adapters.

---

# 11. RETURNS AND REFUNDS E2E

Test:

* eligible return
* ineligible return
* return request
* return status
* cancellation where supported
* refund status
* partial refund
* completed refund

Verify that customer-facing status corresponds to authoritative backend state.

---

# 12. REVIEW E2E

Test:

* eligible customer review
* ineligible review
* verified purchase state
* rating selection
* review text
* media attachment where implemented
* submission
* moderation state
* publication
* editing
* removal
* reporting

Verify server-side review eligibility.

---

# 13. SEARCH E2E

Test:

* basic search
* partial search
* typo tolerance where supported
* suggestions
* category filters
* brand filters
* price filters
* rating filters
* seller filters
* availability filters
* sorting
* pagination
* empty results
* special characters
* malicious query input

Verify that search results correspond to authorized/visible products and offers.

Search must never become an authorization bypass.

---

# 14. NOTIFICATION E2E

Test:

* notification generation
* notification center
* unread count
* mark read
* multi-device behavior where testable
* deep links
* notification preferences
* transactional notifications
* SSE updates where implemented
* push behavior through test infrastructure where available

Verify that notification navigation cannot create unsafe redirects.

---

# 15. MOBILE E2E

Inspect the actual React Native/Expo application.

Use the repository's existing mobile E2E framework if available.

If none exists, introduce an appropriate framework compatible with the actual project.

Test on representative supported environments.

Cover:

* application startup
* onboarding where implemented
* registration
* login
* logout
* session restoration
* home
* categories
* search
* filters
* product detail
* variants
* seller offers
* cart
* checkout
* payment
* orders
* shipment tracking
* returns
* reviews
* notifications
* account

---

# 16. MOBILE NETWORK CONDITIONS

Test mobile behavior under:

* normal network
* slow network
* intermittent network
* temporary offline state
* recovery after reconnect
* request timeout
* backend unavailable

Verify:

* useful loading state
* safe retry behavior
* no duplicate mutations
* no stale destructive actions
* correct cache invalidation
* correct session behavior
* clear errors
* recovery after connectivity returns

Do not pretend the application is fully offline-capable if it is not designed to be.

---

# 17. MOBILE DEEP LINKS

Test supported deep links.

Verify:

* authenticated deep links
* unauthenticated deep links
* product links
* order links
* notification links
* invalid links
* expired/unauthorized links

Verify that authorization remains server-side.

---

# 18. ACCESSIBILITY TESTING

Implement automated accessibility testing for web and applicable mobile surfaces.

Test:

* semantic structure
* keyboard navigation
* focus management
* focus visibility
* accessible names
* labels
* form errors
* button semantics
* links
* dialogs
* menus
* tables/lists
* status messages
* loading indicators
* screen-reader-compatible state changes
* color contrast
* reduced motion where supported

Use established tooling appropriate to the actual stack.

Automated accessibility checks do not replace manual accessibility evaluation.

---

# 19. KEYBOARD ACCESSIBILITY

For web:

Test critical flows using keyboard only.

At minimum:

* navigation
* search
* login
* product selection
* cart
* checkout
* forms
* dialogs
* account pages

Verify that focus never becomes trapped incorrectly and that every interactive control is reachable.

---

# 20. FORM ACCESSIBILITY

Test:

* labels
* required fields
* validation messages
* invalid input
* server errors
* focus on errors
* accessible descriptions
* password fields
* address fields
* coupon fields
* payment-related UI

Errors must be understandable and associated with the correct controls.

---

# 21. RESPONSIVE WEB TESTING

Test supported viewport classes.

At minimum cover:

* desktop
* laptop
* tablet
* mobile-width browser

Verify:

* navigation
* product cards
* product detail
* cart
* checkout
* forms
* account
* orders
* notifications
* dialogs

Ensure there are no:

* horizontal overflow issues
* inaccessible controls
* overlapping content
* clipped critical actions
* unusable forms

---

# 22. CROSS-BROWSER TESTING

Based on the actual browser support policy, test appropriate combinations.

Prioritize supported versions of:

* Chromium-based browsers
* Firefox
* Safari/WebKit

Do not claim compatibility with browsers outside the project's supported matrix.

Document any known browser-specific limitations.

---

# 23. VISUAL REGRESSION TESTING

Where the repository already supports visual snapshots, extend them.

Otherwise introduce visual regression only where it provides meaningful value.

Prioritize:

* home
* navigation
* search results
* product detail
* cart
* checkout
* order detail
* account
* important responsive layouts

Avoid excessive snapshots that make harmless UI changes unnecessarily difficult to maintain.

Do not make visual snapshots the only form of functional testing.

---

# 24. PERFORMANCE TESTING STRATEGY

Create a realistic performance test strategy.

Measure critical operations including:

* application startup
* page navigation
* search
* product detail
* cart operations
* checkout
* order retrieval
* authentication
* API latency
* database-heavy operations
* search latency
* queue processing

Use actual supported tooling and realistic environments.

Do not fabricate benchmark numbers.

---

# 25. WEB PERFORMANCE

Evaluate:

* initial page load
* server rendering
* client hydration
* JavaScript payload
* image loading
* caching
* API request count
* API latency
* rendering performance
* Core Web Vitals where applicable

Pay particular attention to:

* Largest Contentful Paint
* Interaction to Next Paint
* Cumulative Layout Shift

Use realistic network/device conditions.

Do not optimize prematurely based on synthetic measurements that do not represent supported users.

---

# 26. MOBILE PERFORMANCE

Measure:

* cold startup
* warm startup
* screen transitions
* product lists
* image-heavy product pages
* search
* cart
* checkout
* memory usage where tooling permits
* network usage

Identify:

* unnecessary rerenders
* excessive requests
* large bundles
* image inefficiencies
* memory leaks
* expensive synchronous work

Only optimize confirmed bottlenecks.

---

# 27. API LOAD TESTING

Create controlled load tests for critical APIs.

Prioritize:

* authentication
* search
* product detail
* cart
* inventory
* checkout
* order retrieval
* notification retrieval

Test realistic:

* request rates
* concurrent users
* payload sizes
* authenticated traffic
* cache hit/miss behavior

Measure:

* latency
* throughput
* error rate
* saturation
* database behavior
* Redis behavior
* queue behavior

Do not run destructive load tests against production.

---

# 28. CONCURRENCY AND RACE TESTING

Extend the concurrency testing from the server-side QA foundation to realistic user workflows.

Test:

* two customers purchasing the final inventory
* duplicate checkout submission
* repeated payment confirmation
* repeated browser refresh during payment
* simultaneous cart updates
* simultaneous coupon redemption
* concurrent return submission

Verify authoritative backend state after each scenario.

---

# 29. RESILIENCE TESTING

Test application behavior when dependencies fail.

Scenarios include:

* database unavailable
* Redis unavailable
* search unavailable
* queue unavailable
* payment provider unavailable
* notification provider unavailable
* object storage unavailable
* CDN failure
* event consumer failure

Verify:

* clear errors
* safe retries
* no false success
* no data corruption
* no duplicate financial operations
* appropriate degradation
* recovery after dependency restoration

---

# 30. RETRY AND TIMEOUT TESTING

Verify that retry policies do not amplify failures.

Test:

* network timeout
* provider timeout
* database transient error
* queue retry
* event retry
* webhook retry
* search indexing retry

Verify:

* bounded retries
* backoff
* idempotency
* dead-letter handling
* no retry storms
* no duplicate side effects

---

# 31. SECURITY REGRESSION

Run automated security regression against the complete customer-facing application.

Verify:

* authentication enforcement
* authorization enforcement
* IDOR protection
* seller isolation
* session security
* CSRF protection where applicable
* XSS protection
* injection resistance
* unsafe redirects
* SSRF boundaries
* malicious input handling
* file/media upload validation
* rate limits
* sensitive response filtering
* secret leakage
* security headers

Do not use destructive payloads against production.

---

# 32. FRONTEND DATA-EXPOSURE TESTING

Inspect actual browser/mobile network responses.

Verify that frontend applications do not receive unnecessary:

* secrets
* internal credentials
* payment secrets
* private seller information
* administrative data
* unrelated customer information
* push tokens
* internal operational details

Do not rely on frontend code to hide sensitive data.

The server must only return information the caller is authorized to receive.

---

# 33. CLIENT-SIDE AUTHORIZATION REGRESSION

Attempt to manipulate:

* URLs
* route parameters
* query parameters
* local application state
* request payloads
* API identifiers

Verify backend authorization remains authoritative.

Examples:

* changing an order ID
* changing a seller ID
* changing a customer ID
* changing a product/offer ID
* modifying quantities
* modifying prices
* modifying discount values

---

# 34. DATA CONSISTENCY TESTING

After critical E2E workflows, verify authoritative backend state.

For a successful purchase, verify as appropriate:

* checkout completed
* order exists
* correct order items
* correct seller relationships
* correct totals
* payment state
* inventory state
* reservation consumption
* outbox events
* fulfillment state

For failed workflows, verify that partial state does not remain incorrectly committed.

---

# 35. RELEASE SMOKE SUITE

Create a fast release smoke suite containing the smallest set of tests that proves the platform is fundamentally operational.

It should cover at least:

* application startup
* health
* login
* product retrieval
* search
* cart
* checkout
* payment test flow
* order creation
* order retrieval

The smoke suite must be deterministic and suitable for CI/CD deployment gates.

---

# 36. FULL REGRESSION SUITE

Create a complete regression suite covering:

* authentication
* customer account
* catalog
* search
* seller offers
* inventory
* cart
* checkout
* payments
* orders
* fulfillment
* returns
* reviews
* notifications
* web
* mobile
* security
* accessibility

Organize suites so CI can execute:

* fast checks
* backend checks
* web E2E
* mobile E2E
* security
* accessibility
* performance
* full regression

---

# 37. TEST ENVIRONMENT MANAGEMENT

Ensure E2E tests have deterministic environments.

Provide, where appropriate:

* isolated database
* isolated Redis
* isolated queues
* controlled search index
* controlled object storage
* test payment provider configuration
* deterministic seed data
* test users
* test sellers
* test products
* known inventory
* controlled timestamps

Never use production customer data.

Never use production credentials.

Never store secrets in source control.

---

# 38. TEST USER AND ROLE MATRIX

Create controlled test identities for relevant roles.

Where supported:

* unauthenticated user
* customer
* seller owner
* seller admin
* seller operator
* seller viewer
* administrator
* suspended/disabled account

Use these identities to validate authorization boundaries.

Do not hardcode production identities.

---

# 39. TEST DATA LIFECYCLE

Ensure E2E tests:

* create or provision required state
* isolate state
* clean up safely
* do not depend on execution order
* can run repeatedly

Do not use a single mutable global customer/account for all tests if that creates cross-test coupling.

---

# 40. CI/CD QUALITY GATES

Inspect actual CI/CD configuration.

Implement appropriate gates for:

### Pull requests

* lint
* type checking
* unit tests
* integration tests
* API tests
* security regression
* relevant E2E smoke tests

### Pre-release

* full backend tests
* full web E2E
* mobile E2E where infrastructure supports it
* accessibility
* regression
* migration validation

### Production deployment

* smoke tests
* health checks
* deployment verification
* rollback verification where supported

Do not make CI depend on unavailable infrastructure without provisioning it properly.

---

# 41. TEST REPORTING

Provide machine-readable and human-readable test reports where appropriate.

Reports should identify:

* suite
* test
* duration
* status
* failure reason
* environment
* browser/device where applicable

Avoid exposing secrets or sensitive customer data in reports.

---

# 42. FLAKY TEST MANAGEMENT

Identify and eliminate flaky tests.

Do not solve flakiness by:

* arbitrary large sleeps
* excessive retries
* ignoring failures
* disabling tests
* weakening assertions

Instead investigate:

* race conditions
* asynchronous synchronization
* test isolation
* unstable external dependencies
* timing assumptions
* shared state

Retries may be used only where technically justified and must not conceal genuine failures.

---

# 43. TEST EXECUTION PARALLELISM

Where supported:

* parallelize isolated suites
* prevent database collisions
* namespace Redis state
* isolate test users
* isolate temporary files
* isolate queues

Do not introduce parallelism that makes tests nondeterministic.

---

# 44. PERFORMANCE REGRESSION THRESHOLDS

Where reliable baselines exist, define regression thresholds for critical operations.

Potential metrics:

* API latency
* page load
* startup time
* search latency
* checkout latency
* database query performance
* queue processing time

Do not invent arbitrary performance requirements.

If no trustworthy baseline exists, establish measurement infrastructure without falsely declaring an SLA.

---

# 45. ACCESSIBILITY REGRESSION GATES

Integrate automated accessibility checks into CI for critical web surfaces.

Prevent obvious regressions involving:

* missing accessible names
* invalid form labeling
* focus failures
* invalid ARIA usage
* contrast failures detectable by tooling
* inaccessible interactive controls

Document limitations of automated accessibility tooling.

---

# 46. PRODUCTION-READINESS TESTING

Perform a final engineering readiness review.

Evaluate:

## Functional readiness

* critical workflows work
* failure paths are handled
* no critical regressions

## Security readiness

* authentication
* authorization
* seller isolation
* privacy
* secret handling
* rate limiting

## Reliability readiness

* retries
* timeouts
* idempotency
* failure recovery
* graceful degradation

## Data readiness

* migrations
* constraints
* backups
* consistency

## Operational readiness

* health checks
* logs
* metrics
* traces
* alerts
* deployment
* rollback

## UX readiness

* accessibility
* responsive behavior
* mobile behavior
* useful errors
* loading states

---

# 47. RELEASE BLOCKERS

Define objective release-blocking conditions based on actual findings.

Examples:

* payment corruption
* duplicate orders
* inventory overselling
* unauthorized data access
* seller isolation failure
* authentication bypass
* critical data loss
* migration corruption
* unrecoverable production failure
* critical accessibility failure where applicable
* severe performance regression
* broken deployment/rollback

Do not block releases for purely cosmetic issues unless project policy requires it.

---

# 48. FINAL REGRESSION

After all test implementation and fixes:

1. Run formatting.
2. Run linting.
3. Run type checking.
4. Run backend unit tests.
5. Run backend integration tests.
6. Run API tests.
7. Run security tests.
8. Run web E2E tests.
9. Run mobile E2E tests where supported.
10. Run accessibility tests.
11. Run relevant performance tests.
12. Run migration validation.
13. Run release smoke tests.
14. Run the full regression suite.
15. Repeat critical suites to identify flakiness.
16. Fix genuine failures.
17. Re-run affected suites.
18. Re-run final regression.

Do not report a passing suite unless it was actually executed.

---

# 49. FINAL QUALITY AUDIT

Inspect the completed test system for:

* duplicated tests
* meaningless tests
* fake provider behavior
* brittle selectors
* arbitrary sleeps
* hidden external dependencies
* production credentials
* production data
* disabled security checks
* ignored failures
* excessive retries
* test-order dependencies
* flaky tests
* weak assertions
* missing critical workflows

Improve the test suite before finalizing.

---

# 50. DOCUMENTATION

Update relevant repository documentation with:

* test architecture
* local test setup
* required test environment
* test commands
* E2E setup
* mobile test setup
* CI execution
* performance test execution
* security test execution
* known limitations
* supported browser/device matrix
* release smoke procedure

Do not create documentation describing capabilities that do not actually exist.

---

# 51. SCOPE CONTROL

Do not use this phase to redesign unrelated application architecture.

Do not rewrite production systems merely to make E2E tests easier.

Do not create duplicate APIs.

Do not create fake integrations.

Do not modify security controls to simplify testing.

Do not introduce unsupported infrastructure without justification.

Make the smallest safe production-code changes necessary to fix genuine defects discovered during QA.

---

# 52. REQUIRED FINAL REPORT

After implementation and validation, provide a factual final QA report containing:

## Test architecture

* frameworks
* test categories
* test environments
* fixture/factory strategy

## Web QA

* E2E coverage
* browser coverage
* responsive coverage
* visual regression where applicable

## Mobile QA

* E2E coverage
* device/platform coverage
* network-condition testing

## Accessibility

* automated checks
* manual verification performed where possible
* remaining limitations

## Performance

* tests executed
* measured results
* baselines
* regressions
* unresolved bottlenecks

## Security

* security regression coverage
* vulnerabilities discovered
* vulnerabilities fixed
* remaining risks

## Reliability

* dependency failure tests
* retry/timeout tests
* concurrency tests
* recovery tests

## CI/CD

* quality gates
* smoke tests
* regression tests
* deployment validation

## Final validation

For every relevant command, report:

* command executed
* result
* failures
* fixes
* remaining limitations

## Release readiness

Classify the actual repository as:

* READY
* READY WITH KNOWN LIMITATIONS
* NOT READY

Do not choose a status based on optimism.

Base it strictly on the actual test results and unresolved risks.

Never claim that the application is production-ready merely because the test framework exists.

---

# 53. ABSOLUTE RULES

Throughout this phase:

* Repository is the source of truth.
* Test actual behavior.
* Never invent implemented functionality.
* Never create fake provider capabilities.
* Never use production credentials.
* Never use production customer data.
* Never expose secrets.
* Never weaken production security.
* Never disable authorization to simplify tests.
* Never bypass business invariants.
* Never create meaningless tests.
* Never hide failures.
* Never claim tests passed without executing them.
* Never claim performance numbers without measuring them.
* Never claim accessibility compliance solely from automated tooling.
* Never claim browser/device support that was not tested.
* Never claim production readiness without evidence.
* Never leave TODO/FIXME placeholders.
* Preserve backward compatibility.
* Reuse compatible existing infrastructure.
* Avoid regenerating unchanged files.
* Make all tests deterministic and maintainable.

The final result must be a truthful, production-grade QA system integrated into the actual repository.
