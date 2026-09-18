# Amazon-Style Ecommerce Marketplace — QA Prompt — Volume 3

## ROLE

Act as the complete senior quality engineering organization responsible for implementing comprehensive web, mobile, end-to-end, accessibility, usability, and customer/seller journey validation for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff Frontend QA Engineer
* Staff Mobile QA Engineer
* Staff SDET
* Web E2E Engineer
* Mobile E2E Engineer
* Accessibility Engineer
* UX Quality Engineer
* Cross-Browser Test Engineer
* Release QA Engineer
* Reliability Test Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement production-grade automated quality coverage for the actual web application, mobile application, customer journeys, seller workflows, administrative workflows, accessibility requirements, browser behavior, device behavior, and critical end-to-end business flows.

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

* actual web routes
* actual mobile screens
* navigation structure
* components
* forms
* client state
* API clients
* authentication behavior
* seller portal
* admin portal
* implemented features
* test utilities
* existing E2E suites
* existing accessibility tooling
* supported browser/device configuration

Do not invent UI behavior that is not implemented.

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

### Infrastructure

* AWS
* Docker
* Kubernetes/EKS
* Helm
* Terraform or repository-compatible IaC

### Testing

Use the repository's existing browser, component, mobile, and E2E tooling where sound.

---

# PRIMARY OBJECTIVE

Implement comprehensive automated validation for the actual customer-facing and operational interfaces.

The resulting test suites must validate:

* web application behavior
* seller portal behavior
* admin portal behavior
* mobile application behavior
* navigation
* authentication
* cart and checkout
* orders
* reviews
* notifications
* seller operations
* administrative workflows
* responsive behavior
* accessibility
* cross-browser behavior
* mobile device behavior
* network failures
* loading and recovery states
* critical end-to-end business journeys

The tests must validate user-visible behavior rather than internal implementation details.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* current web test framework
* current mobile test framework
* current E2E framework
* existing page objects
* existing test IDs
* accessibility tooling
* supported browsers
* supported mobile devices/simulators
* authentication helpers
* seeded accounts
* mock APIs
* E2E environment
* screenshot/video/trace configuration
* existing customer journeys
* seller workflows
* admin workflows

Do not replace working test frameworks without a concrete repository-driven reason.

---

# CURRENT SCOPE

Implement comprehensive web, mobile, accessibility, and critical end-to-end coverage.

---

# 1. Web Test Architecture

Establish a clean architecture for web testing.

Separate:

* component tests
* page/integration tests
* browser E2E tests
* accessibility tests
* responsive-layout tests

Use the lowest practical test level for each behavior.

Do not turn every component test into a browser test.

---

# 2. Web Test Utilities

Create reusable utilities for:

* authenticated sessions
* customer accounts
* seller accounts
* administrator accounts where applicable
* API setup
* navigation
* common selectors
* network control
* test cleanup
* screenshots
* traces

Avoid repeating authentication setup in every test.

---

# 3. Stable Selectors

Where the repository requires test-specific selectors, establish a consistent strategy.

Prefer:

* semantic selectors
* accessible roles/names
* stable test identifiers only where semantic selectors are insufficient

Do not rely on:

* generated CSS class names
* DOM nesting depth
* animation timing
* arbitrary text fragments that change frequently

---

# 4. Web Authentication Flows

Implement browser E2E coverage for:

* registration
* email verification where testable
* login
* logout
* session restoration
* expired session
* protected route handling
* password reset
* account recovery

Verify appropriate redirects and error states.

---

# 5. Authentication UX

Validate:

* loading state
* invalid credentials
* validation errors
* server errors
* network failures
* disabled submit state
* duplicate submission prevention
* session expiration behavior

Do not assert implementation details of authentication internals.

---

# 6. Customer Storefront Journey

Create end-to-end coverage for the primary customer journey:

1. enter storefront
2. browse catalog
3. search
4. open product detail
5. select variant
6. add to cart
7. review cart
8. enter checkout
9. select address/shipping
10. apply promotion where applicable
11. complete payment using a test/sandbox mechanism
12. receive order confirmation
13. view order

The journey must use actual implemented application behavior.

---

# 7. Product Discovery Tests

Test:

* categories
* product listing
* filtering
* sorting
* pagination/infinite scrolling where implemented
* search
* autocomplete
* product detail
* variant selection
* unavailable products

Verify loading, empty, error, and retry states.

---

# 8. Search UX

Test:

* normal search
* no results
* partial terms
* autocomplete
* filters
* sorting
* search errors
* stale results behavior where applicable
* navigation from search result to product detail

Do not require exact timing for eventually consistent search unless the product contract defines it.

---

# 9. Product Detail UX

Validate:

* title
* media
* pricing
* promotion display
* variant selection
* availability
* seller information where public
* quantity controls
* add-to-cart behavior
* error states

Do not assert visual markup that is unrelated to user behavior.

---

# 10. Cart UX

Test:

* add item
* update quantity
* remove item
* empty cart
* inventory changes
* price changes
* promotion changes
* login-required behavior
* cart merge after authentication

Verify authoritative server responses are reflected correctly in UI state.

---

# 11. Checkout UX

Implement end-to-end validation for:

* customer identity
* addresses
* shipping method
* order summary
* promotions
* total calculation display
* inventory failures
* payment form
* payment success
* payment failure
* retry
* duplicate submission protection

Never use real payment credentials.

---

# 12. Checkout Recovery

Test recovery from:

* page reload
* network loss
* payment-provider failure
* expired session
* stale cart
* changed price
* inventory becoming unavailable
* checkout timeout

The UI must recover without creating duplicate business operations.

---

# 13. Order UX

Test:

* order confirmation
* order history
* order detail
* status timeline
* shipment information
* tracking
* cancellation
* return request
* refund information
* reorder where implemented

Verify customer authorization.

---

# 14. Review UX

Test:

* review eligibility
* rating
* review creation
* validation
* media upload where implemented
* edit
* delete
* report
* seller response visibility

Verify ineligible customers cannot access review actions that require purchase eligibility.

---

# 15. Customer Account UX

Validate:

* profile
* addresses
* security settings
* session/security controls
* notification preferences
* account export where implemented
* account deletion where implemented

Sensitive operations must use appropriate confirmation flows.

---

# 16. Notification UX

Test:

* notification center
* unread/read state
* filtering where implemented
* deep links
* preference management
* empty state
* loading state
* delivery failure representation where applicable

Do not expose internal provider failures unnecessarily to customers.

---

# 17. Seller Portal Test Architecture

Establish browser tests for actual seller workflows.

Support:

* seller authentication
* seller context
* onboarding state
* staff access where implemented
* catalog
* inventory
* orders
* fulfillment
* returns
* reviews
* analytics
* reports
* notifications
* settings

Use isolated seller accounts.

---

# 18. Seller Onboarding

Test:

* onboarding flow
* validation
* verification status
* incomplete state
* restricted state
* successful completion
* resume-after-reload behavior

Verify restricted sellers cannot access functionality that requires verification.

---

# 19. Seller Catalog UX

Test:

* create product
* edit product
* manage variants
* manage SKU
* upload media
* publish/unpublish
* edit offer
* pricing
* promotions

Validate errors and recovery.

---

# 20. Seller Inventory UX

Test:

* view inventory
* adjust inventory
* bulk operations where implemented
* low-stock status
* invalid quantity
* concurrent/stale update handling

Ensure seller actions cannot modify another seller's inventory.

---

# 21. Seller Order Workflow

Test:

* order list
* filtering
* order details
* fulfillment
* shipment
* tracking
* cancellation handling
* return handling
* refund handling

Verify seller sees only authorized order information.

---

# 22. Seller Review Workflow

Test:

* review display
* seller response
* moderation status
* invalid response
* response editing/deletion where implemented

Seller responses must not allow modification of customer-authored review content.

---

# 23. Seller Analytics and Reporting

Where implemented, test:

* dashboard loading
* metrics filters
* date ranges
* report generation
* exports
* loading states
* empty states
* errors

Do not assert exact analytics numbers unless seeded test data makes them deterministic.

---

# 24. Seller Multi-Staff Access

Where seller staff exists, test:

* owner access
* staff access
* restricted role
* permission denial
* membership changes
* revoked staff access

Verify permission changes take effect according to the actual session model.

---

# 25. Admin Portal Test Architecture

Create tests for actual administrative workflows.

Cover applicable areas:

* dashboard
* customer administration
* seller administration
* seller verification
* moderation
* fraud/risk
* operational controls
* audit logs
* reports
* bulk actions
* configuration

Use dedicated administrator test accounts.

---

# 26. Administrative Authorization

Test that:

* ordinary customers cannot access admin routes
* sellers cannot access admin routes
* restricted admin roles cannot access higher-risk operations
* unauthorized actions are rejected
* direct URL navigation cannot bypass authorization

---

# 27. Seller Verification UX

Test:

* pending seller
* review state
* approve
* reject
* request additional information where implemented
* restricted seller
* status updates
* audit visibility

---

# 28. Moderation UX

Test actual moderation workflows for:

* reported reviews
* reported content
* user restrictions
* seller restrictions
* moderation decisions
* escalation where implemented

Verify destructive/moderation actions require appropriate confirmation.

---

# 29. Admin Bulk Operations

Where bulk operations exist, test:

* selection
* validation
* confirmation
* progress
* success
* partial failure
* retry/recovery
* resulting state

Do not assume a single successful row proves a bulk action is correct.

---

# 30. Responsive Web Testing

Validate important customer and seller surfaces across the project's supported responsive breakpoints.

Cover:

* navigation
* product grids
* product detail
* cart
* checkout
* tables
* forms
* dashboards

Tests should verify usability-critical behavior rather than every pixel.

---

# 31. Browser Compatibility

Run the actual supported browser matrix.

At minimum use the browsers defined by repository/project configuration.

Validate critical flows for each supported browser.

Do not claim compatibility for unsupported browsers.

---

# 32. Accessibility Testing

Implement automated accessibility validation for critical pages.

Test:

* semantic landmarks
* heading structure
* accessible names
* form labels
* error associations
* focus management
* keyboard interaction
* dialogs
* menus
* tabs
* tables
* status messaging

Use automated tooling plus behavior-oriented keyboard tests.

---

# 33. Keyboard Navigation

Test critical customer and operational workflows without pointer interaction where practical.

Cover:

* navigation
* search
* product selection
* cart
* checkout
* dialogs
* forms
* seller/admin tables

Ensure focus is not lost during async state changes.

---

# 34. Focus Management

Verify focus after:

* modal open
* modal close
* validation failure
* route transition where applicable
* dynamic content insertion
* error display

Do not rely only on visual inspection.

---

# 35. Form Accessibility

Verify:

* labels
* instructions
* required indicators
* error messages
* focus to invalid fields where appropriate
* accessible status announcements where appropriate

Test authentication, checkout, seller, and admin forms.

---

# 36. Mobile Test Architecture

Create reusable mobile testing utilities for the React Native/Expo application.

Support:

* authenticated sessions
* test navigation
* seeded accounts
* API control
* device state reset
* screenshots
* failure artifacts

---

# 37. Mobile Authentication

Test:

* login
* registration where supported
* logout
* secure session restoration
* token expiration
* invalid credentials
* password reset where supported
* account security

Validate secure storage behavior through user-visible outcomes and dedicated lower-level tests.

---

# 38. Mobile Storefront Journey

Implement a critical mobile customer journey covering:

* browse
* category
* search
* product detail
* variant selection
* add to cart
* cart
* checkout
* payment test flow
* order confirmation
* order history

Use isolated test accounts.

---

# 39. Mobile Cart and Checkout

Test:

* quantity changes
* inventory changes
* cart merge
* address selection
* shipping
* promotion
* payment
* retry
* network interruption
* application background/foreground behavior

---

# 40. Mobile Connectivity Testing

Test behavior under:

* offline mode
* slow connection
* intermittent connection
* request timeout
* reconnect
* application resume

Verify cached data and synchronization behavior match the actual application contract.

---

# 41. Mobile Deep Links

Where implemented, test deep links for:

* product
* category
* order
* notification
* seller/admin paths where applicable

Verify authenticated and unauthenticated behavior.

---

# 42. Push Notification Testing

Where push notifications are implemented, test:

* permission flow
* device registration
* receipt
* notification tap
* deep-link navigation
* logout/token invalidation
* multiple devices

Use test push infrastructure.

Do not send notifications to real customer devices.

---

# 43. Mobile Orders and Returns

Test:

* order history
* order detail
* shipment status
* cancellation
* return initiation
* refund state
* reorder

Verify correct loading and recovery states.

---

# 44. Mobile Reviews

Test:

* review eligibility
* rating
* text
* media
* submit
* edit
* delete
* reporting

Verify permissions and validation.

---

# 45. Mobile Accessibility

Where supported by the application/testing stack, validate:

* accessible labels
* roles
* focus behavior
* screen-reader-visible content
* touch target requirements
* dynamic text behavior

Do not treat automated accessibility checks as the only accessibility validation.

---

# 46. Loading-State Testing

For critical interfaces, explicitly test:

* initial loading
* partial loading
* skeleton state
* disabled action state
* background refresh

Ensure users cannot accidentally perform duplicate destructive/financial actions while loading.

---

# 47. Empty-State Testing

Test empty states for:

* search
* category
* cart
* orders
* notifications
* seller inventory
* seller orders
* reviews
* admin reports

Empty states must not be mistaken for errors.

---

# 48. Error-State Testing

Test user-visible behavior for:

* HTTP failures
* validation errors
* authorization errors
* timeouts
* network failures
* unavailable dependencies
* malformed data

The interface must provide a recoverable experience where appropriate.

---

# 49. Error Recovery

For recoverable failures, verify:

* retry
* refresh
* navigation recovery
* preserved user input where appropriate
* safe rollback of optimistic UI
* no duplicate submission

---

# 50. Optimistic Update Testing

Where optimistic UI is used, test:

* success
* server rejection
* network failure
* rollback
* conflict
* repeated mutation

Do not leave the UI showing a state the server rejected.

---

# 51. Client-State Consistency

Validate that client-side caches/state remain consistent after:

* login
* logout
* mutation
* navigation
* token refresh
* background refresh
* network reconnection

Ensure sensitive state is cleared on logout.

---

# 52. Session Expiration

Test session expiration while the user is:

* browsing
* editing data
* checking out
* managing seller data
* using admin features

Verify the application reauthenticates or redirects safely without losing protected information unexpectedly.

---

# 53. Security UI Testing

Verify that protected UI controls are not shown as actionable to unauthorized users where the application contract requires hiding them.

More importantly, verify that direct navigation/API interaction still receives server-side denial.

UI hiding is supplementary, not a security boundary.

---

# 54. Navigation Testing

Test:

* direct URL/deep-link access
* protected routes
* back navigation
* forward navigation
* refresh
* browser history
* mobile stack behavior
* nested routes
* return-to-original-destination behavior

---

# 55. SEO-Critical Web Validation

For public storefront pages where SEO is part of the implementation, validate:

* title
* canonical URL
* metadata
* structured data where implemented
* indexability behavior
* route rendering

Do not assert specific search-engine ranking behavior.

---

# 56. Media UX Testing

Test:

* image loading
* placeholders
* broken images
* lazy loading where implemented
* upload progress
* upload rejection
* unsupported media
* media removal
* preview

Do not upload actual production media.

---

# 57. Date and Currency Testing

Test localized UI behavior for:

* currency formatting
* decimal precision
* date formatting
* timezone display

Use fixed test clocks and explicit locales.

Do not depend on the machine's local timezone.

---

# 58. Internationalization Readiness

If the application has localization support, test:

* language selection
* translated labels
* pluralization
* text overflow
* date/currency formatting

Do not invent unsupported languages.

---

# 59. Animation and Motion Testing

Where animations exist, tests must remain robust when:

* reduced-motion preferences are enabled
* animations are disabled in test mode
* transitions are shortened

Do not synchronize tests by sleeping for arbitrary animation durations.

---

# 60. Screenshot and Visual Regression Foundation

Where repository requirements justify visual regression testing, configure it for critical stable pages/components.

Use it to detect:

* major layout regressions
* broken responsive layout
* missing content
* unintended styling changes

Do not require pixel-perfect screenshots for highly dynamic content unless deterministic controls exist.

---

# 61. Test Data Isolation

Browser/mobile E2E tests must use isolated test data.

Avoid:

* shared shopping carts
* shared mutable seller inventories
* shared customer orders
* manually maintained test accounts

Tests must clean up or use disposable data.

---

# 62. Critical Journey Coverage

Ensure at least one reliable end-to-end journey exists for each major actor:

### Customer

Browse → Search → Product → Cart → Checkout → Order

### Seller

Login → Catalog → Inventory → Order → Fulfillment

### Administrator

Login → Seller/Content Operation → Audit Verification

The exact workflows must match the repository implementation.

---

# 63. Cross-Platform Consistency

Where both web and mobile implement the same business capability, compare core outcomes.

Examples:

* cart totals
* order state
* review eligibility
* notification status

Tests should verify shared backend semantics, not force identical UI.

---

# 64. E2E Environment Management

The E2E environment must support:

* isolated database state
* isolated Redis
* isolated queues
* isolated search where required
* test object storage
* test provider integrations
* deterministic configuration

Do not use shared production-like mutable resources without isolation.

---

# 65. E2E Failure Diagnostics

Configure failure artifacts such as:

* screenshots
* browser traces
* videos where supported
* console logs
* network logs where safe
* test metadata

Never include authentication secrets in artifacts.

---

# 66. Flaky E2E Controls

Do not hide flaky tests through unlimited retries.

Where a retry mechanism exists:

* record retry attempts
* surface repeated instability
* maintain a quarantine process where necessary
* fix root causes rather than normalizing flakiness

---

# 67. CI Integration

Integrate web/mobile/E2E suites into CI with appropriate tiers:

### Fast

Component and lightweight integration tests.

### Standard

Browser/mobile critical tests.

### Release Gate

Critical end-to-end journeys.

### Scheduled

Broader browser/device and deep regression suites.

Do not run every expensive test on every pull request without justification.

---

# 68. Accessibility CI Gates

Critical accessibility regressions must fail appropriate CI gates.

Do not fail the entire repository for every advisory warning if the project policy distinguishes severity.

---

# 69. Browser Matrix in CI

Run supported browser tests in CI.

Where runtime costs are high, use:

* targeted PR browser
* broader scheduled browser matrix
* mandatory release browser matrix

Document the policy.

---

# 70. Mobile Matrix

Where the project supports multiple device classes, test representative:

* small phone
* large phone
* tablet where supported
* iOS/Android combinations actually supported

Do not claim a complete device matrix without executing it.

---

# 71. Performance-Aware UI Testing

Track UI performance signals where appropriate.

Potential metrics include:

* initial page load
* navigation duration
* API wait
* rendering delays
* mobile startup
* screen transition duration

Do not create arbitrary performance thresholds without a defined baseline.

---

# 72. Visual and Responsive Regression

Protect high-risk surfaces such as:

* storefront
* product page
* cart
* checkout
* seller dashboard
* admin tables

Use deterministic test data.

---

# 73. Out of Scope

Do not implement:

* complete backend business-logic tests already covered by the backend QA volume except when a UI flow requires them
* full load testing
* production chaos testing
* real financial transactions
* real customer notifications
* real customer data
* unsupported browsers/devices
* production cloud testing
* manual certification claims

---

# 74. Required Deliverables

Implement the actual repository changes required for this web/mobile/E2E QA volume, including where applicable:

* web component/integration tests
* browser E2E tests
* seller E2E tests
* admin E2E tests
* mobile component tests
* mobile E2E tests
* accessibility tests
* responsive tests
* cross-browser configuration
* device configuration
* test utilities
* authenticated-session helpers
* deterministic E2E data
* visual regression configuration where justified
* CI integration
* test reporting
* failure artifacts
* QA documentation

Every created test must validate actual implemented behavior.

---

# 75. Implementation Quality Rules

Do not produce:

* placeholder UI tests
* tests that only assert an element exists without meaningful behavior
* fragile CSS-selector tests
* arbitrary sleeps
* infinite retries
* hardcoded production accounts
* production payment credentials
* production push credentials
* fake mobile device results
* fake browser compatibility claims
* meaningless snapshot coverage
* TODO/FIXME test gaps
* duplicate E2E scenarios without justification

Tests must provide meaningful regression protection.

---

# 76. Repository-First Incremental Implementation

Before implementation:

1. inspect existing web tests
2. inspect existing mobile tests
3. inspect current E2E framework
4. inspect supported browsers/devices
5. inspect existing test accounts
6. inspect existing selectors/test IDs
7. inspect accessibility configuration
8. inspect current CI execution
9. identify the highest-risk user journeys
10. implement coverage within the current scope

Preserve valuable existing tests.

---

# 77. Testing the New QA Coverage

Actually execute the newly implemented suites.

Verify:

* browser tests run
* mobile tests run where environment permits
* accessibility checks execute
* test data is isolated
* failure artifacts are produced
* CI commands work
* critical journeys pass
* unsupported environment limitations are clearly reported

Do not claim E2E/mobile/browser coverage was validated without running the appropriate tests.

---

# 78. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Web

* storefront E2E coverage exists
* authentication E2E coverage exists
* product discovery coverage exists
* cart coverage exists
* checkout coverage exists
* order coverage exists
* review coverage exists
* customer-account coverage exists
* responsive validation exists

### Seller

* onboarding coverage exists
* catalog coverage exists
* inventory coverage exists
* order/fulfillment coverage exists
* review coverage exists
* staff-role coverage exists where applicable

### Admin

* authentication coverage exists
* seller-management coverage exists
* moderation coverage exists
* operational-control coverage exists where implemented
* authorization coverage exists

### Mobile

* authentication coverage exists
* storefront coverage exists
* cart/checkout coverage exists
* orders/returns coverage exists
* connectivity behavior is tested
* deep links are tested where implemented
* push behavior is tested where implemented

### Accessibility

* automated accessibility checks exist
* keyboard/focus behavior is tested
* critical form accessibility is tested

### E2E Reliability

* test data is isolated
* failure artifacts exist
* flaky-test handling exists
* retries do not hide instability
* supported browser/device matrices are defined

### CI

* critical UI/E2E tests integrate into CI
* release gates exist
* scheduled broader regression exists where appropriate

### Validation

* new test suites actually execute
* critical journeys pass
* configuration validates
* unsupported environments are explicitly documented

---

# 79. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Web Coverage

Summarize:

* storefront
* authentication
* cart
* checkout
* orders
* reviews
* account
* seller
* admin

## Mobile Coverage

Summarize:

* authentication
* storefront
* cart/checkout
* orders/returns
* connectivity
* deep links
* push notifications where applicable

## Accessibility Coverage

Summarize:

* automated checks
* keyboard/focus
* forms
* critical interactive components

## E2E Coverage

List the critical customer, seller, and administrator journeys implemented.

## Browser/Device Coverage

State the actual browser/device matrix configured and executed.

Do not claim platforms that were not tested.

## CI Integration

Describe:

* fast tests
* standard tests
* release gates
* scheduled tests

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Test Limitations

Clearly identify tests that could not be executed because the required browser, device, emulator, simulator, provider, or external environment was unavailable.

## Compatibility Notes

Document existing E2E/mobile/web behavior that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later QA implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the web, mobile, accessibility, responsive, browser, device, and end-to-end QA coverage described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future QA volumes.

Do not implement application features.

Do not invent unsupported UI behavior, browsers, devices, or user journeys.

Do not merely describe an E2E strategy.

Actually create and modify the required repository files so the marketplace has meaningful automated validation of its critical customer, seller, administrator, web, and mobile experiences.

When complete, provide the required Completion Report.
