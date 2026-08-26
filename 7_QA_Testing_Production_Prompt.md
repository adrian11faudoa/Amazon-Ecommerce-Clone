You are operating in Senior Engineering Team Mode.

Build the complete production-grade QA, testing, security validation, performance validation, resilience validation, compliance validation, and production-readiness system for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The testing strategy must validate the established backend, web frontend, mobile applications, infrastructure, databases, search, payments, inventory, orders, fulfillment, shipping, seller systems, notifications, messaging, analytics, administration, and security architecture.

Do not redesign the application architecture.

Do not replace approved technologies without explicit architectural justification.

Do not implement unrelated application features.

────────────────────────────────────────

MISSION

Build the complete quality-engineering system covering:

• Unit testing
• Integration testing
• API testing
• Contract testing
• Event testing
• Queue testing
• Database testing
• Cache testing
• Search testing
• Payment testing
• Webhook testing
• Inventory testing
• Checkout testing
• Order testing
• Fulfillment testing
• Shipping testing
• Refund testing
• Return testing
• Seller testing
• Notification testing
• Messaging testing
• Analytics testing
• Administration testing
• Web frontend testing
• Mobile testing
• Accessibility testing
• Security testing
• Fraud testing
• Performance testing
• Load testing
• Stress testing
• Soak testing
• Resilience testing
• Disaster-recovery testing
• Backup restoration testing
• Infrastructure testing
• CI/CD validation
• Production smoke testing
• Regression testing
• Release validation
• Production-readiness certification

The quality system must validate:

• Correctness
• Security
• Privacy
• Reliability
• Performance
• Scalability
• Availability
• Recoverability
• Accessibility
• Maintainability

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript
• PostgreSQL
• Prisma ORM
• Redis
• Kafka or Redpanda
• BullMQ
• Elasticsearch/OpenSearch
• Stripe
• AWS S3

Frontend:

• Next.js
• React
• TypeScript

Mobile:

• React Native
• Expo
• TypeScript

Infrastructure:

• Docker
• Kubernetes
• Helm
• Terraform
• GitHub Actions

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• React Testing Library
• Playwright
• React Native Testing Library
• Detox or approved mobile E2E tooling
• Load-testing tooling appropriate for distributed systems
• Accessibility testing tooling
• Security scanning tooling

────────────────────────────────────────

TESTING PRINCIPLES

Use a layered testing strategy.

Do not rely entirely on end-to-end tests.

Use:

• Unit tests for domain logic
• Integration tests for infrastructure
• Contract tests for service boundaries
• End-to-end tests for critical user journeys
• Performance tests for scale
• Security tests for attack resistance
• Resilience tests for failure behavior

Tests must be deterministic whenever possible.

Avoid:

• Arbitrary waits
• Shared mutable state
• Test-order dependencies
• Flaky external dependencies
• Production credentials
• Uncontrolled test environments

────────────────────────────────────────

TEST PYRAMID

UNIT TESTS

Provide broad unit coverage for:

• Domain logic
• Validation
• Authorization
• Pricing
• Promotions
• Coupons
• Inventory rules
• Checkout rules
• Order state machines
• Payment state machines
• Refund rules
• Return eligibility
• Seller permissions
• Fraud rules
• Feature flags
• Utility functions

INTEGRATION TESTS

Validate:

• PostgreSQL
• Prisma
• Redis
• Kafka/Redpanda
• BullMQ
• Elasticsearch/OpenSearch
• S3
• Stripe abstraction
• Shipping providers
• Notification providers

END-TO-END TESTS

Validate complete business workflows.

────────────────────────────────────────

BACKEND UNIT TESTING

Create tests for:

IDENTITY

• Registration
• Login
• Password reset
• Session management
• Device management
• Account status

AUTHORIZATION

• RBAC
• Permissions
• Seller isolation
• Administrative access
• Resource ownership

CATALOG

• Products
• Variants
• Offers
• Pricing
• Promotions
• Coupons

INVENTORY

• Reservations
• Release
• Expiration
• Transfers
• Adjustments
• Oversell prevention

CHECKOUT

• Validation
• Pricing
• Tax
• Shipping
• Coupon handling
• Promotion handling
• Checkout state

ORDERS

• State transitions
• Split orders
• Cancellation
• Fulfillment

PAYMENTS

• Payment state
• Idempotency
• Webhooks
• Refunds

SELLER FINANCE

• Commissions
• Balances
• Settlement
• Payouts

REVIEWS

• Verified purchase
• Rating calculations
• Moderation

FRAUD

• Risk rules
• Risk scoring
• Enforcement

ADMINISTRATION

• Permission policies
• Moderation
• Feature flags
• System configuration

────────────────────────────────────────

DATABASE TESTING

Validate:

• Prisma schema
• Migrations
• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Indexes
• Transactions
• Isolation levels
• Concurrent writes
• Optimistic concurrency
• Partitioned tables where used
• Read-replica behavior where applicable

Test high-growth tables including:

• Orders
• Order items
• Inventory movements
• Inventory reservations
• Payments
• Financial transactions
• Audit logs

Validate query performance for critical access patterns.

────────────────────────────────────────

DATA INTEGRITY TESTING

Validate:

• Seller ownership
• Product ownership
• Inventory quantities
• Reservation consistency
• Cart integrity
• Checkout totals
• Order totals
• Payment totals
• Refund totals
• Commission totals
• Seller balances
• Payout amounts
• Foreign-key integrity

Create reconciliation tests to detect inconsistent states.

────────────────────────────────────────

INVENTORY CONCURRENCY TESTING

Test:

• Two customers competing for one unit
• Multiple concurrent reservations
• Reservation expiry races
• Reservation release races
• Concurrent inventory adjustments
• Concurrent transfers
• Duplicate reservation requests
• Retry after timeout

Verify:

• No overselling
• No double release
• No reservation leakage
• No negative inventory where prohibited
• Correct final state

────────────────────────────────────────

CHECKOUT TESTING

Test:

• Cart validation
• Product state changes
• Price changes
• Promotion changes
• Coupon expiration
• Inventory exhaustion
• Shipping changes
• Tax-provider failures
• Checkout expiration
• Payment preparation
• Duplicate checkout requests

Verify that stale client data cannot create incorrect orders.

────────────────────────────────────────

ORDER TESTING

Test:

• Order creation
• Multi-seller orders
• Split orders
• Partial fulfillment
• Partial cancellation
• Full cancellation
• Shipment creation
• Delivery
• Returns
• Refunds
• Exchanges

Verify valid and invalid state transitions.

────────────────────────────────────────

PAYMENT TESTING

Test Stripe integration boundaries.

Validate:

• Payment Intent creation
• Payment confirmation
• Authentication/3DS flows where applicable
• Success
• Failure
• Timeout
• Cancellation
• Partial refund
• Full refund

Never use real payment credentials in automated tests.

────────────────────────────────────────

WEBHOOK TESTING

Test:

• Signature verification
• Duplicate webhook
• Retries
• Delayed webhook
• Out-of-order webhook
• Unknown event
• Malformed event
• Provider failure

Verify that duplicate webhook delivery cannot create duplicate financial effects.

────────────────────────────────────────

FINANCIAL TESTING

Validate exact calculations for:

• Order subtotal
• Discounts
• Tax
• Shipping
• Final total
• Marketplace commission
• Seller revenue
• Refund
• Settlement
• Payout

Use exact decimal values.

Test:

• Full refunds
• Partial refunds
• Multiple partial refunds
• Refund after cancellation
• Refund after return
• Commission adjustment
• Payout after refund

────────────────────────────────────────

SELLER ISOLATION TESTING

Attempt unauthorized access across sellers.

Test:

• Products
• Offers
• Inventory
• Orders
• Customers
• Reviews
• Messages
• Analytics
• Payouts
• Financial records

Test both:

• Horizontal privilege escalation
• Vertical privilege escalation

A seller must never access another seller's private data.

────────────────────────────────────────

API CONTRACT TESTING

Validate:

• HTTP method
• Path
• Authentication
• Authorization
• Request schema
• Response schema
• Error schema
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Idempotency

Use OpenAPI as the contract reference.

Automatically detect breaking changes.

────────────────────────────────────────

EVENT CONTRACT TESTING

Validate:

• Event name
• Event version
• Required fields
• Event envelope
• Producer ownership
• Consumer compatibility
• Serialization
• Deserialization
• Partition keys
• Ordering assumptions
• Idempotency

Test backward-compatible event evolution.

Consumers must tolerate duplicate delivery.

────────────────────────────────────────

QUEUE TESTING

Test every BullMQ queue.

Validate:

• Job creation
• Job payload
• Retry
• Backoff
• Timeout
• Concurrency
• Worker restart
• Failed jobs
• Dead-letter handling
• Poison jobs

Test queues for:

• Search indexing
• Media processing
• Inventory
• Notifications
• Payments/reconciliation
• Reports
• Analytics
• Cleanup

────────────────────────────────────────

SEARCH TESTING

Validate:

• Product search
• Category search
• Brand search
• Seller search
• Autocomplete
• Typo tolerance
• Synonyms
• Facets
• Filters
• Sorting
• Availability
• Ranking
• Reindexing
• Alias switching

Test:

• Missing documents
• Stale documents
• Duplicate indexing
• Search cluster failure

Search failures must not corrupt authoritative product data.

────────────────────────────────────────

RECOMMENDATION TESTING

Validate:

• Candidate generation
• Ranking
• Personalized results
• Recently viewed
• Similar products
• Related products
• Trending
• Frequently bought together
• Cross-sells
• Upsells

Test fallback behavior when the recommendation system is unavailable.

Recommendations must never block checkout.

────────────────────────────────────────

NOTIFICATION TESTING

Test:

• Email
• Push
• In-app
• FCM
• APNS
• Token registration
• Token rotation
• Notification preferences
• Deduplication
• Retry
• Provider failure
• Deep links

Verify security-critical notifications cannot be accidentally suppressed by ordinary marketing preferences.

────────────────────────────────────────

MESSAGING TESTING

Test:

• Conversation creation
• Message authorization
• Seller isolation
• Message creation
• Attachments
• Read state
• Unread counts
• Message retention

Test unauthorized customer/seller combinations.

────────────────────────────────────────

WEB FRONTEND TESTING

Test customer workflows:

• Registration
• Login
• Search
• Product discovery
• Product details
• Variant selection
• Wishlist
• Cart
• Checkout
• Payment
• Order
• Return
• Review
• Messaging
• Notifications

Test seller workflows:

• Seller login
• Store
• Product creation
• Inventory
• Orders
• Fulfillment
• Promotions
• Coupons
• Reviews
• Analytics
• Payouts

Test admin workflows:

• Admin login
• Customer management
• Seller management
• Catalog moderation
• Order investigation
• Payment investigation
• CMS
• Feature flags
• Audit

────────────────────────────────────────

MOBILE TESTING

Test Android and iOS:

• Registration
• Login
• Search
• Product discovery
• Cart
• Checkout
• Payment
• Order
• Returns
• Reviews
• Notifications
• Deep linking
• Messaging
• Offline-aware behavior

Test different:

• Screen sizes
• OS versions
• Network conditions
• Device performance classes

────────────────────────────────────────

ACCESSIBILITY TESTING

Target WCAG 2.2 AA for web.

Validate:

• Keyboard navigation
• Screen readers
• Focus management
• Semantic HTML
• ARIA
• Color contrast
• Reduced motion
• Forms
• Tables
• Checkout

Mobile:

• VoiceOver
• TalkBack
• Dynamic Type
• Accessible labels
• Touch targets
• Focus behavior

────────────────────────────────────────

SECURITY TESTING

Test:

AUTHENTICATION

• Credential stuffing
• Brute force
• Password reset abuse
• Session theft
• Refresh token replay
• Account takeover

AUTHORIZATION

• IDOR
• Horizontal privilege escalation
• Vertical privilege escalation
• Seller isolation bypass
• Admin permission bypass

APPLICATION

• SQL injection
• XSS
• CSRF
• Path traversal
• SSRF where applicable
• Malicious uploads
• Header injection

PAYMENTS

• Webhook spoofing
• Replay
• Payment manipulation
• Refund abuse
• Payout abuse

MARKETPLACE

• Coupon abuse
• Promotion abuse
• Inventory abuse
• Review manipulation
• Return abuse
• Fraudulent seller creation

────────────────────────────────────────

FRAUD TESTING

Validate fraud controls against:

• Fake sellers
• Automated accounts
• Coupon abuse
• Promotion abuse
• Payment fraud
• Refund fraud
• Return fraud
• Review manipulation
• Bot purchasing
• Account takeover

Test both:

• Detection
• Enforcement

Ensure legitimate customers are not broadly blocked by simplistic rules.

────────────────────────────────────────

MEDIA TESTING

Test:

• Upload
• Large files
• Invalid files
• Unsupported MIME types
• Malicious files
• Interrupted upload
• Retry
• Processing failure
• Thumbnail failure
• Signed URL expiration
• Unauthorized access
• CDN delivery
• Cleanup

Test:

• Product media
• Review media
• Seller media
• Reports

────────────────────────────────────────

PERFORMANCE TESTING

Create performance tests for:

• API Gateway
• Product retrieval
• Search
• Cart
• Checkout
• Inventory reservation
• Order creation
• Payment webhooks
• Notifications
• Messaging
• Search indexing
• Recommendation retrieval
• Seller dashboards
• Admin search

Measure:

• p50
• p95
• p99
• Throughput
• Error rate
• Resource utilization

────────────────────────────────────────

LOAD TESTING

Simulate:

• Normal traffic
• Peak traffic
• Burst traffic
• Promotional campaigns
• Holiday traffic
• Flash-sale traffic

Load-test:

• Search
• Product pages
• Cart
• Checkout
• Inventory
• Orders
• Payments
• Notifications

────────────────────────────────────────

STRESS TESTING

Push systems beyond expected operating capacity.

Identify:

• Maximum API throughput
• WebSocket/connection limits where applicable
• Database saturation
• Redis saturation
• Kafka throughput limits
• Search limits
• Worker capacity
• Queue backlogs

Verify graceful degradation.

────────────────────────────────────────

SOAK TESTING

Run long-duration tests to detect:

• Memory leaks
• Connection leaks
• Queue growth
• Database connection leaks
• Worker instability
• Search degradation
• Cache growth
• Log growth
• Resource exhaustion

────────────────────────────────────────

RESILIENCE TESTING

Inject controlled failures into:

• PostgreSQL
• Redis
• Kafka
• BullMQ workers
• OpenSearch
• S3
• Stripe
• Shipping providers
• Notification providers
• Kubernetes nodes
• Availability zones
• Regions

Verify:

• Detection
• Retry
• Timeout
• Circuit breaker
• Fallback
• Degraded behavior
• Recovery
• Reconciliation

────────────────────────────────────────

CHAOS TESTING

Define controlled chaos experiments for:

• Pod termination
• Node termination
• Network latency
• Packet loss
• Database failover
• Redis failover
• Kafka broker failure
• Search failure
• Worker failure
• Region failure

Run initially in non-production environments.

Promote proven experiments only after operational safety is established.

────────────────────────────────────────

DISASTER RECOVERY TESTING

Test:

• PostgreSQL restoration
• Point-in-time recovery
• S3 restoration
• Search restoration
• Kafka recovery
• Redis recovery
• EKS reconstruction
• Terraform reconstruction
• Regional failover

Measure:

• Actual RTO
• Actual RPO

Compare results with defined objectives.

────────────────────────────────────────

BACKUP RESTORATION

Automatically or periodically validate:

• PostgreSQL backups
• S3 backups/replication
• Search snapshots
• Terraform state
• Critical configuration

A backup is not considered reliable until restoration succeeds.

────────────────────────────────────────

INFRASTRUCTURE TESTING

Validate:

• Terraform
• Helm
• Kubernetes
• Docker
• IAM
• Security groups
• NetworkPolicies
• WAF
• Autoscaling
• Load balancing
• Health checks
• Backup configuration

Run infrastructure validation before deployment.

────────────────────────────────────────

CI/CD QUALITY GATES

PULL REQUEST:

• Formatting
• Linting
• Type checking
• Unit tests
• Relevant integration tests
• Contract tests
• Security scanning
• Dependency scanning
• Secret scanning
• Terraform validation
• Helm validation

RELEASE:

• Build
• Integration
• E2E smoke tests
• Container scanning
• Infrastructure validation
• Deployment health
• Post-deployment smoke tests

Production deployment must require appropriate approvals.

────────────────────────────────────────

PRODUCTION SMOKE TESTS

After deployment validate:

• API health
• Authentication
• Product retrieval
• Search
• Cart
• Checkout readiness
• Order API
• Seller API
• Admin API
• Database
• Redis
• Kafka
• Search
• Object storage

Use non-destructive tests.

────────────────────────────────────────

OBSERVABILITY TESTING

Verify that monitoring detects failures.

Validate:

• Metrics
• Logs
• Traces
• Correlation IDs
• Alerts
• Dashboards
• SLO calculations

Inject controlled failures and confirm expected alerts fire.

────────────────────────────────────────

SLI / SLO VALIDATION

Define and validate SLOs for:

• API availability
• Product retrieval
• Search
• Checkout
• Inventory reservation
• Order creation
• Payment processing
• Search freshness
• Notification delivery
• Seller payout processing

Define:

• SLI
• Measurement
• Target
• Alert
• Error budget

────────────────────────────────────────

DATA QUALITY TESTING

Validate:

• Referential integrity
• Financial consistency
• Inventory consistency
• Search consistency
• Event consistency
• Seller isolation
• Analytics correctness
• Audit integrity

Run automated reconciliation checks where appropriate.

────────────────────────────────────────

REGRESSION TESTING

Maintain a regression suite covering:

• Authentication
• Seller onboarding
• Catalog
• Search
• Cart
• Checkout
• Payments
• Inventory
• Orders
• Fulfillment
• Returns
• Refunds
• Reviews
• Notifications
• Messaging
• Seller workflows
• Administration

Prevent known regressions from reaching production.

────────────────────────────────────────

TEST DATA STRATEGY

Define safe test data for:

• Customers
• Sellers
• Products
• Inventory
• Orders
• Payments
• Refunds
• Reviews
• Notifications

Never use real production payment credentials or unnecessary production personal data.

Provide deterministic fixtures and factories.

────────────────────────────────────────

ENVIRONMENT STRATEGY

Define testing environments for:

• Local
• Development
• Integration
• Staging
• Performance
• Security
• Disaster recovery

Use production-like infrastructure in staging where practical.

────────────────────────────────────────

PRODUCTION READINESS CHECKLIST

Create a complete readiness checklist.

APPLICATION:

• Build
• Tests
• Error handling
• Logging
• Metrics
• Tracing
• Health checks

DATABASE:

• Migrations
• Backups
• Restore tests
• Indexes
• Replication
• Integrity

SECURITY:

• Authentication
• Authorization
• Secrets
• TLS
• Vulnerability scanning
• Audit

INFRASTRUCTURE:

• Autoscaling
• Failover
• Monitoring
• Alerts
• Capacity
• Disaster recovery

OPERATIONS:

• Runbooks
• On-call
• Incident response
• Rollback
• Recovery

USER EXPERIENCE:

• Accessibility
• Performance
• Responsive design
• Offline-aware behavior
• Error handling

────────────────────────────────────────

RELEASE CERTIFICATION

Define objective production release requirements.

A release is production-ready only when:

• Required tests pass
• Critical security checks pass
• Performance budgets pass
• Infrastructure validation passes
• Smoke tests pass
• Backup validation is current
• Monitoring is operational
• Rollback is available
• Required documentation exists
• Known risks are accepted by the appropriate owner

────────────────────────────────────────

DOCUMENTATION

Generate:

• QA architecture
• Test strategy
• Test matrix
• Unit-test standards
• Integration-test standards
• Contract-test standards
• E2E strategy
• Accessibility testing guide
• Security testing guide
• Fraud testing guide
• Performance testing guide
• Load testing guide
• Resilience testing guide
• Disaster recovery testing guide
• Infrastructure testing guide
• CI/CD quality gates
• Production-readiness checklist
• Release certification process
• Test-data strategy
• Environment strategy

────────────────────────────────────────

PROJECT INDEX

Maintain the QA Project Index.

Track:

• Test suites
• Unit tests
• Integration tests
• Contract tests
• E2E tests
• Security tests
• Fraud tests
• Performance tests
• Load tests
• Stress tests
• Soak tests
• Resilience tests
• Chaos tests
• Disaster-recovery tests
• Backup tests
• Accessibility tests
• Infrastructure tests
• Production smoke tests
• Quality gates
• SLI/SLO
• Coverage
• Known defects
• Known risks
• Production readiness
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

QA MILESTONE 1

Test infrastructure, configuration, fixtures, factories, shared utilities, and coverage.

QA MILESTONE 2

Backend unit, repository, service, controller, database, API, and integration tests.

QA MILESTONE 3

Inventory, checkout, orders, payments, refunds, returns, payouts, financial, and concurrency testing.

QA MILESTONE 4

Search, recommendations, notifications, messaging, analytics, and reporting testing.

QA MILESTONE 5

Frontend component, integration, accessibility, performance, and E2E testing.

QA MILESTONE 6

Mobile component, integration, offline-aware, notification, accessibility, and E2E testing.

QA MILESTONE 7

Security testing, authorization testing, seller-isolation testing, fraud testing, and abuse testing.

QA MILESTONE 8

Performance, load, stress, soak, and capacity testing.

QA MILESTONE 9

Resilience, chaos, backup restoration, disaster-recovery, and failover testing.

QA MILESTONE 10

Infrastructure validation, CI/CD quality gates, production smoke tests, final production-readiness review, and release certification.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must produce measurable and verifiable results.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize implementation instead of generating it.

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This prompt is dedicated to:

• QA
• Testing
• Security validation
• Fraud validation
• Performance validation
• Resilience validation
• Infrastructure validation
• Accessibility validation
• Disaster-recovery validation
• CI/CD quality gates
• Production smoke testing
• Release certification
• Production readiness

Do not redesign the approved architecture.

Do not implement unrelated application features.

────────────────────────────────────────

FINAL QUALITY BAR

The completed ecommerce platform must provide objective evidence that it can operate as a production-grade global marketplace supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• High search traffic
• Large media traffic
• Multi-region deployment
• High availability
• Disaster recovery
• Strong security
• Strict seller isolation
• Reliable financial processing

The final system must demonstrate:

• Correctness
• Security
• Performance
• Scalability
• Reliability
• Resilience
• Observability
• Recoverability
• Accessibility
• Maintainability
• Production readiness
