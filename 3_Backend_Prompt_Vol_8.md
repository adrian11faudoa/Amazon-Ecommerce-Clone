You are operating in Senior Engineering Team Mode.

Complete the production-ready backend integration, hardening, reconciliation, performance optimization, security hardening, observability validation, resilience, and production-readiness work for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must integrate all previously defined ecommerce domains without redesigning their approved architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Complete backend production readiness across the entire ecommerce platform.

Validate and harden:

• Identity
• Authentication
• Authorization
• Customers
• Addresses
• Sellers
• Seller staff
• Stores
• Catalog
• Products
• Variants
• Seller offers
• Pricing
• Promotions
• Coupons
• Inventory
• Warehouses
• Reservations
• Cart
• Wishlist
• Checkout
• Orders
• Fulfillment
• Shipping
• Payments
• Refunds
• Returns
• Exchanges
• Seller commissions
• Seller balances
• Seller payouts
• Search
• Recommendations
• Reviews
• Notifications
• Messaging
• Analytics
• Reporting
• Administration
• Moderation
• Fraud
• CMS
• Feature flags
• System configuration
• Audit
• Privacy workflows

The final backend must be:

• Secure
• Observable
• Horizontally scalable
• Idempotent
• Resilient
• Testable
• Maintainable
• Multi-region ready
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Use the established project stack:

• Node.js
• NestJS
• TypeScript
• PostgreSQL
• Prisma ORM
• Redis
• Elasticsearch/OpenSearch
• Kafka/Redpanda
• BullMQ
• AWS S3
• CloudFront
• Stripe/Stripe Connect
• REST
• Webhooks
• WebSockets/SSE where appropriate
• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Do not replace technologies unless a real implementation blocker exists.

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "left as an exercise"
- "for brevity"
- "remaining code omitted"

Every generated file must be complete.

Every generated file must compile.

Never regenerate unchanged files.

Only modify files when required.

When modifying an existing implementation:

1. Identify the exact file.
2. Explain why it requires modification.
3. Provide the complete updated file.

Maintain backward compatibility wherever possible.

────────────────────────────────────────

CROSS-DOMAIN INTEGRATION

Verify correct integration between:

Identity
→ Customers
→ Sellers
→ Catalog
→ Inventory
→ Cart
→ Checkout
→ Payments
→ Orders
→ Fulfillment
→ Shipping
→ Returns
→ Refunds
→ Seller Settlement

Also verify:

Catalog
→ Search
→ Recommendations

Orders
→ Notifications
→ Messaging
→ Analytics

Reviews
→ Ratings
→ Recommendations

Administration
→ Moderation
→ Fraud
→ Audit

Feature Flags
→ Backend behavior

System Configuration
→ Runtime behavior

No domain may silently bypass another domain's authoritative state.

────────────────────────────────────────

BUSINESS INVARIANTS

Validate and enforce the platform's critical invariants.

Inventory:

• Cannot oversell
• Reservations cannot double-release
• Expired reservations cannot be reused
• Inventory movements are auditable

Checkout:

• Client prices are never trusted
• Inventory is revalidated
• Promotions are revalidated
• Coupons are revalidated
• Taxes are recalculated when required
• Shipping is recalculated when required

Orders:

• Duplicate orders cannot be created
• Historical commercial data is immutable
• Order state transitions are valid

Payments:

• Duplicate payment effects are impossible
• Webhooks are verified
• Webhooks are idempotent
• Payment state is authoritative only after verified provider confirmation

Refunds:

• Duplicate refunds are prevented
• Refund amounts cannot exceed refundable amounts
• Partial refunds remain financially consistent

Seller finance:

• Commissions are deterministic
• Seller balances reconcile
• Payouts cannot exceed eligible balances
• Every financial adjustment is ledgered

Seller isolation:

• Sellers cannot access other sellers' resources

Administration:

• High-risk operations require appropriate permissions
• Sensitive actions are audited

────────────────────────────────────────

IDEMPOTENCY AUDIT

Perform a complete idempotency review.

Implement or verify idempotency for:

• Registration where appropriate
• Checkout creation
• Inventory reservation
• Order creation
• Payment creation
• Payment confirmation
• Refund creation
• Return creation
• Exchange creation
• Payout creation
• Coupon redemption
• Webhook processing
• Event consumers
• Background jobs
• Report generation
• CMS publication

Define:

• Idempotency key format
• Storage
• TTL
• Scope
• Replay behavior
• Conflict behavior

────────────────────────────────────────

EVENT CONSISTENCY

Verify all event-driven workflows.

Validate:

• Transactional outbox usage
• Event ownership
• Event versioning
• Event ordering assumptions
• Consumer idempotency
• Retry
• Backoff
• Dead-letter behavior
• Replay behavior
• Event observability

Ensure a successful database transaction cannot silently lose its required event.

────────────────────────────────────────

RECONCILIATION SYSTEMS

Implement reconciliation processes for:

PAYMENTS

Compare:

• Internal payment records
• Stripe state
• Order state

INVENTORY

Compare:

• Inventory records
• Inventory movements
• Reservations
• Transfers

SELLER FINANCE

Compare:

• Seller ledger
• Commissions
• Settlements
• Payouts
• Refund adjustments

SEARCH

Compare:

• Published catalog
• Search index

NOTIFICATIONS

Compare:

• Notification records
• Delivery records

Each reconciliation system must:

• Detect mismatches
• Record mismatches
• Be idempotent
• Support retry
• Expose operational metrics
• Avoid making destructive automatic corrections without sufficient confidence

────────────────────────────────────────

DATA INTEGRITY

Implement integrity checks for:

• Foreign keys
• Unique constraints
• Monetary consistency
• Seller ownership
• Inventory consistency
• Order totals
• Payment totals
• Refund totals
• Commission totals
• Seller balances
• Payout totals

Detect inconsistencies early.

────────────────────────────────────────

ORDER TOTAL VALIDATION

Verify that:

subtotal

+ shipping
+ tax
+ applicable adjustments

- discounts
  =

final total

Apply exact decimal arithmetic.

Persist snapshots required for historical reconstruction.

────────────────────────────────────────

FINANCIAL RECONCILIATION

Verify:

• Order total
• Payment amount
• Refund amount
• Commission
• Seller revenue
• Payout
• Remaining balance

Support reconciliation reports and discrepancy investigation.

────────────────────────────────────────

SEARCH CONSISTENCY

Implement operational tooling for:

• Search lag detection
• Missing product detection
• Stale product detection
• Failed-index detection
• Reindexing
• Alias verification

Search failures must not prevent authoritative catalog transactions.

────────────────────────────────────────

RECOMMENDATION RESILIENCE

Recommendations must degrade gracefully.

Support fallbacks:

• Trending products
• Popular products
• Category recommendations
• Recently viewed
• Related products

Recommendation failures must never block:

• Product pages
• Cart
• Checkout
• Order creation

────────────────────────────────────────

NOTIFICATION RESILIENCE

Notification failure must not invalidate business transactions.

Examples:

Order succeeds
→ notification fails
→ order remains successful

Payment succeeds
→ email fails
→ payment/order state remains authoritative

Shipment created
→ push fails
→ shipment remains valid

Use asynchronous retries.

────────────────────────────────────────

SEARCH AND CACHE FAILURE

Define and implement graceful behavior when:

Redis fails:

• Use authoritative databases
• Disable non-critical caches
• Protect databases from stampedes

Search fails:

• Fall back to category/catalog paths where possible
• Do not fail transactional operations

────────────────────────────────────────

RATE-LIMITING AUDIT

Verify rate limits across:

• Authentication
• Account recovery
• Seller registration
• Product creation
• Search
• Cart
• Checkout
• Coupon redemption
• Review submission
• Messaging
• Reports
• Administrative APIs

Prevent abuse while allowing legitimate marketplace traffic.

────────────────────────────────────────

SECURITY HARDENING

Perform complete backend security hardening.

Validate:

• Authentication
• Authorization
• RBAC
• Seller isolation
• Input validation
• Output filtering
• Secure headers
• CORS
• CSRF where applicable
• XSS defenses
• SQL injection defenses
• Webhook verification
• Secret handling
• Audit logging
• Least privilege
• Rate limiting

Protect against:

• IDOR
• Privilege escalation
• Session attacks
• Replay attacks
• Webhook spoofing
• Coupon abuse
• Payment abuse
• Refund abuse
• Payout abuse
• Seller data leakage

────────────────────────────────────────

DATA PRIVACY

Review handling of:

• Customer profiles
• Addresses
• Order information
• Payment references
• Seller financial records
• Analytics
• Messaging
• Reports

Minimize unnecessary sensitive-data exposure.

Ensure API responses contain only authorized fields.

────────────────────────────────────────

PERFORMANCE OPTIMIZATION

Optimize critical operations:

• Product retrieval
• Search
• Cart
• Checkout
• Inventory reservation
• Order creation
• Payment webhook processing
• Seller dashboards
• Analytics
• Administrative search

Use:

• Efficient indexes
• Cursor pagination
• Query batching
• Caching
• Appropriate connection pools
• Asynchronous processing
• Event-driven workloads

Do not optimize by weakening correctness.

────────────────────────────────────────

DATABASE PERFORMANCE

Review:

• Slow queries
• Missing indexes
• Redundant indexes
• N+1 queries
• Excessive joins
• Lock contention
• Connection exhaustion
• Long-running transactions

Optimize high-growth tables.

Identify partitioning candidates.

Verify read/write separation where applicable.

────────────────────────────────────────

REDIS PERFORMANCE

Review:

• Key design
• TTL
• Memory usage
• Eviction behavior
• Hot keys
• Cache stampedes
• Lock contention

Prevent unbounded cache growth.

Use jittered expiration where appropriate.

────────────────────────────────────────

KAFKA PERFORMANCE

Review:

• Partition keys
• Partition count
• Consumer groups
• Consumer lag
• Batch size
• Retry behavior
• Dead-letter queues
• Retention

Avoid hot partitions.

Do not rely on global ordering where it is not available.

────────────────────────────────────────

BULLMQ PERFORMANCE

Review:

• Queue concurrency
• Retry behavior
• Backoff
• Worker scaling
• Job timeouts
• Stuck jobs
• Queue depth

Prevent runaway retries.

────────────────────────────────────────

OBSERVABILITY VALIDATION

Verify that all critical operations emit:

• Logs
• Metrics
• Traces

Critical flows include:

• Login
• Seller onboarding
• Product publishing
• Inventory reservation
• Checkout
• Order creation
• Payment
• Refund
• Return
• Payout
• Search
• Notification
• Messaging
• Administration

Use:

• Correlation IDs
• Request IDs
• Trace IDs

Never log:

• Passwords
• Tokens
• Card data
• Secrets

────────────────────────────────────────

SLO / SLI FOUNDATION

Define measurable SLIs and SLOs for:

• Authentication
• Product retrieval
• Search
• Cart
• Checkout
• Inventory reservation
• Order creation
• Payment processing
• Search indexing
• Notification delivery
• Seller payout processing
• API availability

Define:

• Target
• Measurement source
• Alert
• Error budget

────────────────────────────────────────

HEALTH CHECKS

Verify:

• Liveness
• Readiness
• Dependency health
• Database health
• Redis health
• Kafka health
• Search health
• Queue health
• Object-storage health
• Payment-provider connectivity where safe

Health checks must distinguish:

• Process alive
• Service ready
• Dependency degraded

────────────────────────────────────────

GRACEFUL SHUTDOWN

Verify graceful shutdown for:

• API servers
• Workers
• Kafka consumers
• BullMQ workers
• WebSocket connections where applicable

Avoid:

• Dropped financial operations
• Lost events
• Lost queue jobs
• Partial database writes

────────────────────────────────────────

BACKGROUND JOB HARDENING

Review every worker for:

• Idempotency
• Retry
• Backoff
• Dead-letter
• Timeout
• Concurrency
• Poison-message handling
• Observability

Prevent infinite retry loops.

────────────────────────────────────────

API CONTRACT VALIDATION

Verify consistency across all APIs.

Check:

• Versioning
• DTO schemas
• Error formats
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Authentication
• Authorization
• Idempotency
• OpenAPI

Detect breaking changes.

────────────────────────────────────────

OPENAPI

Ensure the complete backend API is documented.

Include:

• Authentication
• Customers
• Sellers
• Catalog
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Administration

Keep documentation synchronized with implementations.

────────────────────────────────────────

TESTING

Implement comprehensive backend production-readiness testing.

UNIT:

• Domain logic
• State machines
• Pricing
• Promotions
• Inventory
• Checkout
• Orders
• Payments
• Returns
• Payouts
• Authorization
• Fraud rules

INTEGRATION:

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• Search
• S3
• Stripe
• Shipping providers

CONTRACT:

• REST APIs
• Webhooks
• Events

E2E:

• Customer registration
• Seller onboarding
• Product publication
• Search
• Cart
• Checkout
• Payment
• Order
• Fulfillment
• Shipping
• Return
• Refund
• Review
• Seller payout
• Administration

────────────────────────────────────────

CONCURRENCY TESTING

Test:

• Inventory races
• Checkout races
• Duplicate orders
• Duplicate payments
• Duplicate refunds
• Concurrent coupon redemption
• Concurrent seller operations
• Concurrent administrative operations

────────────────────────────────────────

PERFORMANCE TESTING

Test:

• Product reads
• Search
• Checkout
• Inventory reservations
• Orders
• Payment webhooks
• Search indexing
• Notification throughput
• Messaging
• Reporting

Measure:

• p50
• p95
• p99
• Throughput
• Error rate
• Resource utilization

────────────────────────────────────────

RESILIENCE TESTING

Inject failures into:

• PostgreSQL
• Redis
• Kafka
• Search
• Stripe
• Shipping providers
• S3
• Notification providers
• Background workers

Verify graceful degradation.

────────────────────────────────────────

SECURITY TESTING

Test:

• IDOR
• Horizontal privilege escalation
• Vertical privilege escalation
• Seller isolation
• Payment abuse
• Refund abuse
• Payout abuse
• Coupon abuse
• Webhook spoofing
• Session attacks
• Rate-limit bypass
• Malicious file upload

────────────────────────────────────────

PRODUCTION READINESS REVIEW

Create a backend production-readiness review covering:

Architecture:

• Domain boundaries
• Dependencies
• Failure modes

Code:

• Type safety
• Error handling
• Logging
• Validation

Data:

• Migrations
• Backups
• Integrity
• Reconciliation

Security:

• Authentication
• Authorization
• Secrets
• Vulnerability status

Performance:

• API latency
• Database
• Redis
• Search
• Queues

Operations:

• Health checks
• Metrics
• Alerts
• Runbooks

────────────────────────────────────────

DATABASE MIGRATION SAFETY

Review all migrations.

Support:

• Expand-and-contract strategy
• Backward-compatible changes
• Index creation strategy
• Large-table migration strategy
• Rollout verification

Avoid migrations that require prolonged production downtime.

────────────────────────────────────────

FINAL BACKEND EVENTS

Verify that all major domains publish and consume the correct events.

Create a complete event dependency map.

Show:

• Producer
• Consumer
• Topic
• Partition key
• Retry
• Dead-letter
• Consistency requirement

────────────────────────────────────────

FINAL BACKEND PROJECT INDEX

Produce a complete backend Project Index containing:

• All domains
• All services
• All APIs
• All database objects
• All Prisma migrations
• All Redis usage
• All Kafka topics
• All events
• All BullMQ queues
• All workers
• All external providers
• All authentication mechanisms
• All authorization rules
• All security controls
• All reconciliation systems
• All tests
• All documentation
• Current status
• Remaining work
• Known risks
• Production-readiness status

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Cross-domain integration validation and dependency hardening.

BACKEND MILESTONE 2

Idempotency audit, event consistency, transactional outbox validation, and reconciliation systems.

BACKEND MILESTONE 3

Security hardening, seller isolation validation, authorization audit, and abuse protection.

BACKEND MILESTONE 4

Database performance, query optimization, indexing, partitioning review, and transaction optimization.

BACKEND MILESTONE 5

Redis, Kafka, BullMQ, and background-processing optimization.

BACKEND MILESTONE 6

API contract completion, OpenAPI validation, health checks, and observability validation.

BACKEND MILESTONE 7

Integration, concurrency, performance, resilience, and security testing.

BACKEND MILESTONE 8

Migration safety, backup/recovery validation, operational tooling, documentation, and production-readiness review.

BACKEND MILESTONE 9

Final full-platform regression and cross-domain workflow validation.

BACKEND MILESTONE 10

Backend production-readiness certification and final Project Index.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile and pass the applicable validation suite before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize source code instead of generating it.

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

This volume is the final backend hardening and production-readiness implementation.

Do not implement:

• New frontend features
• New mobile features
• Kubernetes infrastructure
• Terraform
• CI/CD infrastructure

Do not redesign approved domains.

Do not replace approved technologies without a concrete implementation requirement.

────────────────────────────────────────

QUALITY BAR

Treat the backend as the transactional and operational foundation of a globally distributed enterprise ecommerce marketplace.

The final system must demonstrate:

• Correct inventory
• Correct checkout
• Correct orders
• Correct payments
• Correct refunds
• Correct seller settlement
• Strong seller isolation
• Strong authorization
• Reliable events
• Idempotent processing
• Reconciliation
• High observability
• Graceful failure
• High performance
• Security
• Maintainability
• Production readiness
