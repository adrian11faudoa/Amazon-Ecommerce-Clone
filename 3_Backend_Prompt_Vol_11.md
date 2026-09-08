# Amazon Ecommerce Marketplace — Backend Prompt — Volume 11

## Analytics, Business Events, Reporting, and Operational Metrics

You are implementing the next production-grade backend implementation unit for an original Amazon-style enterprise ecommerce marketplace.

This is a **standalone implementation prompt**. It must contain everything necessary to execute this phase without relying on any previous prompt, architecture document, conversation, generated artifact, or remembered decision.

The actual repository is the only source of truth for the current implementation state.

Do not assume any previous implementation phase was completed successfully. Inspect the repository and integrate with what actually exists.

This phase is an implementation unit of **one coherent ecommerce marketplace**, not a separate application.

---

# 1. Mission

Implement the production-grade **Business Events, Analytics Foundations, Operational Reporting, and Marketplace Metrics** backend capability.

The implementation must integrate with the existing domains and infrastructure actually present in the repository, including where available:

* Identity
* Customers
* Catalog
* Products
* Categories
* Brands
* Sellers
* Seller offers
* Pricing
* Promotions
* Coupons
* Inventory
* Cart
* Checkout
* Orders
* Payments
* Refunds
* Fulfillment
* Shipments
* Tracking
* Returns
* Reviews
* Search
* Notifications
* Administration
* Audit
* Redis
* BullMQ
* Event/outbox infrastructure
* PostgreSQL
* Prisma
* Elasticsearch/OpenSearch
* Observability infrastructure

Do not create competing implementations.

If an analytics/event system already exists, inspect it and extend it rather than creating a second pipeline.

---

# 2. Core Principle

The transactional ecommerce database remains authoritative for transactional state.

Analytics must be treated as a **derived/read-oriented capability**.

Never make checkout, payment, inventory, order creation, fulfillment, refunds, or other critical commerce operations depend synchronously on analytics availability.

Analytics failure must not corrupt core commerce.

The system must tolerate:

* Duplicate events
* Out-of-order events
* Delayed events
* Missing events
* Worker failures
* Partial processing
* Consumer restarts
* Temporary analytics-store failures
* Reprocessing
* Replay

---

# 3. Technology Baseline

Use the actual repository stack.

Expected baseline:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* BullMQ
* REST/OpenAPI
* Existing event/outbox infrastructure
* Kafka/Redpanda where already used or genuinely required
* Elasticsearch/OpenSearch where useful for operational/search analytics
* Docker-compatible runtime
* AWS-compatible production infrastructure

Do not introduce a separate data warehouse or streaming platform unless the repository already contains one or the implementation genuinely requires it.

Do not add infrastructure merely for architectural appearance.

---

# 4. Repository-First Audit

Before implementation:

1. Inspect the repository.
2. Inspect package manifests.
3. Inspect NestJS module structure.
4. Inspect Prisma schema.
5. Inspect existing event contracts.
6. Inspect outbox implementation.
7. Inspect Kafka/Redpanda integration if present.
8. Inspect BullMQ.
9. Inspect Redis.
10. Inspect existing audit system.
11. Inspect existing admin APIs.
12. Inspect existing seller APIs.
13. Inspect order/payment/fulfillment/return domains.
14. Inspect existing metrics and observability.
15. Inspect tests.
16. Inspect infrastructure/configuration.

Determine:

* What analytics functionality already exists.
* What business events already exist.
* What metrics are already emitted.
* Which event contracts can be reused.
* Whether a reporting/read-model layer already exists.

Do not duplicate existing systems.

---

# 5. Analytics Bounded Context

Create a clearly separated Analytics/Business Intelligence foundation.

The analytics layer must not become an alternative transactional domain.

Conceptually separate:

### Transactional data

Authoritative business state.

### Domain events

Facts that happened in the transactional system.

### Analytics projections

Derived representations optimized for reporting.

### Operational metrics

Infrastructure/application measurements.

### Business metrics

Commerce measurements derived from domain facts.

Keep these categories distinct.

---

# 6. Business Event Model

Define or complete a stable business-event model.

Events should represent meaningful domain facts rather than arbitrary CRUD operations.

Examples include:

### Customer

* CustomerRegistered
* CustomerAccountActivated
* CustomerAccountSuspended

### Catalog

* ProductCreated
* ProductPublished
* ProductArchived
* ProductUpdated
* OfferCreated
* OfferActivated
* OfferSuspended

### Seller

* SellerRegistered
* SellerApproved
* SellerSuspended
* SellerReactivated

### Cart

* CartCreated
* CartItemAdded
* CartItemRemoved
* CartUpdated

### Checkout

* CheckoutStarted
* CheckoutCompleted
* CheckoutFailed
* CheckoutExpired

### Orders

* OrderCreated
* OrderCancelled
* OrderConfirmed
* OrderCompleted

### Payments

* PaymentAttempted
* PaymentAuthorized
* PaymentCaptured
* PaymentFailed
* RefundCreated
* RefundCompleted

### Fulfillment

* ShipmentCreated
* ShipmentShipped
* ShipmentDelivered
* ShipmentFailed

### Returns

* ReturnRequested
* ReturnApproved
* ReturnReceived
* ReturnRefunded

### Reviews

* ReviewSubmitted
* ReviewPublished
* ReviewRemoved

### Notifications

* NotificationCreated
* NotificationDelivered
* NotificationFailed

Use the actual repository event vocabulary when it already exists.

Do not introduce duplicate events representing the same domain fact.

---

# 7. Event Contract

Every analytics-consumable business event must have a stable envelope.

Include appropriate fields such as:

* eventId
* eventType
* eventVersion
* aggregateType
* aggregateId
* occurredAt
* producedAt
* actor/context where appropriate
* correlationId
* causationId where available
* traceId where available
* producer
* schemaVersion
* payload

Do not place secrets in event payloads.

Avoid unnecessary personal data.

Use stable identifiers rather than duplicating sensitive records into event payloads.

---

# 8. Event Versioning

Business-event contracts must be versioned.

Support:

* Schema version
* Event type version
* Backward-compatible evolution
* Consumer compatibility
* Deprecation strategy

Never silently change the meaning of an existing event.

If a breaking semantic change is necessary, create a new version/type.

---

# 9. Transactional Outbox

Where business events originate from transactional mutations, use the existing transactional outbox mechanism.

The critical invariant is:

> A successful transactional business change must not depend on a separate synchronous analytics request.

For example:

```text
Order transaction
    ↓
Order state persisted
    ↓
Outbox event persisted
    ↓
Transaction commits
    ↓
Event published
    ↓
Analytics consumer processes event
```

Do not perform analytics network calls inside critical commerce database transactions.

---

# 10. Event Delivery Guarantees

Assume at-least-once delivery.

Consumers must tolerate:

* Duplicate events
* Retries
* Redelivery
* Worker restarts
* Consumer crashes
* Partial processing

Implement idempotency where appropriate.

Do not assume exactly-once delivery unless the actual infrastructure provides and guarantees it.

---

# 11. Analytics Event Processing

Implement analytics consumers using the existing event infrastructure.

Where Kafka/Redpanda is already available, use it according to the repository's existing architecture.

Where Kafka/Redpanda is not present and the existing system uses outbox + BullMQ, do not introduce Kafka solely for this phase unless genuinely justified.

Consumers should:

* Validate event envelopes
* Validate payloads
* Deduplicate where required
* Transform events into analytics projections
* Handle failures
* Retry safely
* Record processing state where necessary
* Emit operational metrics
* Avoid blocking transactional operations

---

# 12. Analytics Projection Strategy

Create derived analytics representations appropriate to the repository.

Potential projections include:

* Daily sales
* Orders by day
* Revenue by day
* Refunds by day
* Units sold
* Average order value
* Conversion metrics
* Seller sales
* Product sales
* Category sales
* Payment success rate
* Fulfillment delivery metrics
* Return rate
* Review activity
* Customer activity

Do not calculate all metrics synchronously from raw transactional tables on every dashboard request if that would create unacceptable load.

Use appropriate aggregation strategies.

---

# 13. Revenue Definition

Define revenue metrics precisely.

Do not use ambiguous terminology.

Distinguish where applicable:

* Gross merchandise value
* Product subtotal
* Discounts
* Shipping revenue
* Tax
* Refunds
* Net sales
* Payment processing fees
* Seller-related amounts
* Platform fees

Use the repository's actual financial model.

Never infer financial metrics from UI totals.

Do not introduce accounting claims that the system cannot substantiate.

---

# 14. Money in Analytics

Never use floating-point arithmetic for monetary calculations.

Use the same exact-money representation established by the transactional domain.

Analytics calculations must preserve:

* Currency
* Precision
* Rounding rules
* Sign
* Refund treatment

If multiple currencies are supported, never aggregate incompatible currencies without an explicit conversion strategy.

Do not invent foreign-exchange rates.

---

# 15. Time and Date Semantics

Define consistent time handling.

Use UTC for persisted event timestamps unless the repository has another explicit standard.

Analytics should support:

* Date ranges
* Day boundaries
* Week boundaries
* Month boundaries
* Time-zone-aware presentation where required

Do not mix local server time and UTC unpredictably.

Document the timezone semantics of reports.

---

# 16. Customer Analytics

Implement privacy-conscious customer metrics.

Possible metrics:

* New customers
* Active customers
* Orders per customer
* Average order value
* Purchase frequency
* Repeat purchase rate
* Cart activity
* Checkout conversion

Do not expose individual customer behavioral analytics to users without appropriate authorization.

Avoid collecting unnecessary personally identifiable information.

Use anonymous or aggregated dimensions where possible.

---

# 17. Product Analytics

Implement product-level metrics where supported.

Examples:

* Units sold
* Orders containing product
* Revenue contribution
* Refund quantity
* Return quantity
* Review count
* Rating average
* Inventory turnover indicators
* Product conversion indicators where reliable

Do not expose seller-private product analytics to another seller.

Respect product/offer ownership.

---

# 18. Seller Analytics

Implement seller-specific analytics.

Seller metrics may include:

* Orders
* Units sold
* Gross sales
* Discounts
* Refunds
* Returns
* Average order value
* Product performance
* Offer performance
* Inventory-related performance
* Fulfillment performance
* Review activity

Seller analytics must be scoped to the authorized seller.

A seller must never query another seller's analytics by changing an ID.

Platform administrators may have broader access according to explicit permissions.

---

# 19. Marketplace Analytics

Implement platform-level aggregate metrics.

Examples:

* Total orders
* Gross sales
* Net sales
* Refunds
* Units sold
* Active sellers
* Active products
* Conversion
* Return rate
* Payment success rate
* Fulfillment performance
* Customer growth

Administrative analytics must be permission-controlled.

Avoid exposing raw customer-level data when aggregated data is sufficient.

---

# 20. Order Analytics

Implement derived order metrics.

Support dimensions such as:

* Date
* Order status
* Seller
* Product
* Category
* Customer segment where legitimately defined
* Payment status
* Fulfillment status
* Return status

Support aggregate calculations such as:

* Order count
* Item count
* Average order value
* Cancellation rate
* Completion rate
* Return rate

Use indexed/read-optimized projections where required.

---

# 21. Payment Analytics

Implement payment operational metrics.

Examples:

* Payment attempts
* Success rate
* Failure rate
* Authorization rate
* Capture rate
* Refund volume
* Refund success/failure
* Provider reconciliation discrepancies

Do not expose sensitive payment credentials.

Provider IDs should only be exposed to authorized operational personnel.

---

# 22. Fulfillment Analytics

Implement metrics such as:

* Shipments created
* Shipments shipped
* Shipments delivered
* Delivery failures
* Average fulfillment duration
* Average delivery duration
* Return-to-sender rate
* Fulfillment exception rate

Metrics must use actual shipment/tracking events.

Do not fabricate carrier performance metrics.

---

# 23. Return Analytics

Implement:

* Return request count
* Return approval rate
* Return rejection rate
* Return completion rate
* Refund rate
* Return quantity
* Return reasons
* Return timing

Return reasons should use controlled values from the existing domain.

Do not expose individual customer information unnecessarily.

---

# 24. Review Analytics

Implement aggregate review metrics such as:

* Review count
* Average rating
* Rating distribution
* Moderation volume
* Report volume
* Removal rate

Maintain consistency with the authoritative Reviews domain.

Do not maintain a second independent rating calculation.

---

# 25. Search Analytics

If the existing search implementation supports analytics events, capture appropriate aggregate information such as:

* Search volume
* Search terms
* Zero-result searches
* Suggestion usage
* Search-to-product interaction
* Search conversion

Treat search analytics as privacy-sensitive.

Avoid storing raw sensitive user queries indefinitely.

Apply retention and aggregation rules.

Do not expose one customer's search history to another customer.

---

# 26. Cart and Checkout Funnel

Implement an aggregate commerce funnel where feasible.

Possible stages:

```text
Product interaction
    ↓
Add to cart
    ↓
Checkout started
    ↓
Checkout validation
    ↓
Payment initiated
    ↓
Order created
    ↓
Payment completed
```

Metrics may include:

* Cart additions
* Checkout starts
* Checkout failures
* Payment failures
* Orders completed
* Conversion rates

Define denominator/numerator semantics precisely.

Do not calculate conversion using incompatible populations.

---

# 27. Dashboard APIs

Implement secure APIs for analytics consumers.

Potential groups:

```text
/api/v1/admin/analytics
/api/v1/admin/reports
/api/v1/seller/analytics
/api/v1/seller/reports
```

Use actual repository conventions.

Support:

* Date range
* Dimensions
* Metrics
* Filters
* Pagination where applicable
* Aggregation limits

Do not expose arbitrary SQL or query expressions.

Do not allow clients to submit raw Elasticsearch/OpenSearch or database queries.

---

# 28. Analytics Query Safety

Protect analytics endpoints from expensive requests.

Apply:

* Maximum date ranges
* Maximum dimensions
* Maximum result counts
* Query timeouts
* Pagination
* Rate limiting
* Permission checks

Reject pathological queries.

Do not allow users to construct arbitrary joins or aggregations.

---

# 29. Reporting

Implement production-grade reports that provide actual business value.

Potential reports:

### Marketplace Sales Report

* Orders
* Units
* Gross sales
* Discounts
* Refunds
* Net sales

### Seller Performance Report

* Orders
* Sales
* Returns
* Refunds
* Fulfillment performance
* Reviews

### Product Performance Report

* Units sold
* Revenue
* Returns
* Ratings

### Operational Report

* Payment failures
* Fulfillment failures
* Return volume
* Notification failures
* Background-job failures

Use actual repository data.

---

# 30. Report Generation

Small reports may be generated synchronously if bounded.

Large reports should be asynchronous.

Use BullMQ where appropriate.

Report jobs must define:

* Job name
* Payload
* Scope
* Filters
* Idempotency
* Retry policy
* Timeout
* Backoff
* Concurrency
* Failure behavior
* Result storage
* Retention
* Access control

Do not keep HTTP requests open while generating very large reports.

---

# 31. Export Security

If reports are exported:

* Authorize export creation.
* Scope export data.
* Remove secrets.
* Minimize sensitive data.
* Store files privately.
* Use short-lived access.
* Record audit events.
* Apply retention.
* Prevent cross-seller access.
* Prevent predictable object access.

Never expose private S3 objects publicly.

---

# 32. CSV/JSON Export

If CSV/JSON exports are supported:

* Use stable schemas.
* Escape fields correctly.
* Prevent spreadsheet formula injection where relevant.
* Preserve exact monetary values.
* Preserve currency.
* Define timestamp format.
* Define null behavior.
* Limit export size.
* Apply permissions.

Do not generate malformed CSV files.

---

# 33. Analytics Data Retention

Define retention according to actual business requirements and repository capabilities.

Separate:

* Raw event retention
* Operational event-processing state
* Aggregated analytics retention
* Generated report retention

Do not retain sensitive data indefinitely without purpose.

Cleanup operations should be safe and observable.

Use background jobs for large cleanup tasks.

---

# 34. Privacy

Analytics must follow data-minimization principles.

Do not unnecessarily persist:

* Full addresses
* Payment credentials
* Authentication secrets
* Private message-like content
* Push tokens
* Sensitive customer attributes

Prefer:

* IDs
* Aggregates
* Controlled dimensions
* Anonymized identifiers where appropriate

Do not expose individual customer behavior through aggregate APIs if the result can reveal private information.

Consider small-group aggregation leakage when applicable.

---

# 35. Access Control

Define analytics permissions separately for:

### Customer

Only personal order/account-related metrics where explicitly supported.

### Seller

Only analytics for the authorized seller.

### Support

Only operational analytics required for support.

### Administrator

Platform-level analytics according to role.

### Super-administrator

Only if the existing authorization model requires it.

Do not use frontend route restrictions as security.

---

# 36. Seller Isolation

Every seller analytics request must enforce server-side seller scope.

Never trust:

```text
sellerId
```

from a client request as authorization.

Resolve seller membership from the authenticated principal and verify the requested scope.

Prevent:

* Cross-seller analytics
* Cross-seller exports
* Cross-seller report access
* Cross-seller cache leakage

Redis cache keys must include tenant/seller scope where applicable.

---

# 37. Redis

Use Redis only for appropriate analytics acceleration such as:

* Short-lived dashboard caches
* Rate limiting
* Job coordination
* Temporary aggregation state where safely reconstructible

Every cache must define:

* Purpose
* Key format
* TTL
* Invalidation
* Stale behavior
* Failure behavior

Redis must not become the sole authoritative analytics database.

Never allow cache failures to corrupt transactional data.

---

# 38. Cache Key Design

Use explicit namespaces.

Conceptually:

```text
analytics:admin:...
analytics:seller:{sellerId}:...
analytics:report:{reportId}:...
```

Follow the repository's existing naming convention.

Ensure seller/customer scope is encoded where necessary.

Never use a shared cache key for data belonging to different authorization scopes.

---

# 39. BullMQ Analytics Jobs

Implement only justified background jobs.

Possible jobs:

* Business-event processing
* Analytics projection updates
* Daily aggregation
* Report generation
* Event reconciliation
* Projection rebuild
* Retention cleanup

Every job must define:

* Input schema
* Output behavior
* Retry
* Backoff
* Timeout
* Concurrency
* Idempotency
* Failure handling
* Metrics
* Logs
* Shutdown behavior

---

# 40. Projection Rebuild

Analytics projections must be rebuildable from authoritative data/events where practical.

Support:

* Full rebuild
* Incremental rebuild
* Date-scoped rebuild
* Failure recovery

Do not make a derived projection permanently authoritative.

If historical events are unavailable, use transactional data to reconstruct projections where feasible.

Clearly document limitations.

---

# 41. Reconciliation

Implement reconciliation where appropriate.

Examples:

* Transactional order count vs analytics order count
* Payment capture events vs payment projection
* Refund events vs refund aggregates
* Shipment events vs fulfillment projections

Detect:

* Missing events
* Duplicate processing
* Stale projections
* Invalid aggregates

Reconciliation should report discrepancies rather than silently modifying authoritative data.

---

# 42. Event Processing State

If required by the implementation, maintain durable processing metadata such as:

* Event ID
* Consumer
* Processing status
* Attempts
* First processed time
* Last processed time
* Error information
* Version

Use this only where necessary.

Avoid unnecessary duplication if the existing event infrastructure already provides durable consumer state.

---

# 43. Dead-Letter Handling

Failed analytics events must not disappear.

Use the repository's existing DLQ strategy.

Record:

* Event ID
* Event type
* Consumer
* Error
* Attempt count
* Timestamp
* Relevant correlation information

DLQ operations must be administrative and permission-controlled.

Support safe retry/replay.

Do not blindly replay events that may produce duplicate financial effects.

Analytics consumers must be idempotent.

---

# 44. Observability

Instrument:

* Event throughput
* Event processing latency
* Consumer failures
* Duplicate events
* DLQ volume
* Projection lag
* Reconciliation discrepancies
* Report generation duration
* Report failures
* Analytics query latency
* Cache hit/miss
* Background-job failures

Useful metrics include:

```text
analytics_events_processed_total
analytics_events_failed_total
analytics_projection_lag_seconds
analytics_dlq_events_total
analytics_report_duration_seconds
analytics_query_duration_seconds
analytics_reconciliation_mismatch_total
```

Use actual repository naming conventions if metrics infrastructure already exists.

---

# 45. Tracing

Propagate:

* Request ID
* Correlation ID
* Trace ID
* Event ID

Across:

```text
HTTP request
    ↓
transaction
    ↓
outbox
    ↓
event transport
    ↓
consumer
    ↓
projection
```

Do not lose correlation information at asynchronous boundaries.

---

# 46. Logging

Use structured logs.

Include appropriate:

* Event ID
* Event type
* Consumer
* Aggregate ID
* Correlation ID
* Processing duration
* Result
* Error category

Never log:

* Passwords
* Tokens
* Provider secrets
* Full payment credentials
* Unnecessary private customer data

---

# 47. Business Metric Correctness

Every metric must define:

* Name
* Meaning
* Source
* Inclusion criteria
* Exclusion criteria
* Time semantics
* Currency semantics
* Refund treatment
* Cancellation treatment
* Aggregation method

Do not produce metrics whose definitions are ambiguous.

For example, "sales" must have a documented definition.

---

# 48. Database Design

Use PostgreSQL/Prisma for analytics projections if that is appropriate for the repository scale.

Potential models include:

* DailySalesAggregate
* DailyOrderAggregate
* SellerDailyAggregate
* ProductDailyAggregate
* PaymentDailyAggregate
* FulfillmentDailyAggregate
* ReturnDailyAggregate
* ReviewDailyAggregate
* SearchDailyAggregate
* ReportJob
* ReportArtifact

Do not blindly create every model.

Choose a coherent design based on actual requirements and existing architecture.

Use:

* Composite indexes
* Unique aggregation keys
* Date-based indexing
* Seller-scoped indexes
* Product-scoped indexes

where appropriate.

---

# 49. Avoid Overengineering

Do not turn this phase into a massive enterprise data platform.

Do not automatically introduce:

* Snowflake
* BigQuery
* Redshift
* Databricks
* Spark
* Flink
* Airflow
* Separate lakehouse
* Complex ML infrastructure

unless the actual repository and project requirements justify them.

A production-grade ecommerce backend can begin with reliable domain events and carefully designed PostgreSQL-based analytics projections.

---

# 50. Testing

Implement comprehensive tests.

### Event contracts

* Valid event
* Invalid event
* Version compatibility
* Missing fields
* Unknown version

### Idempotency

* Duplicate event
* Duplicate consumer delivery
* Worker retry
* Consumer restart

### Analytics

* Correct aggregation
* Correct refunds
* Correct cancellations
* Correct currency handling
* Correct date boundaries
* Correct seller isolation

### Reports

* Valid report
* Invalid filters
* Large report
* Job retry
* Job failure
* Export security

### Authorization

* Admin
* Seller
* Support
* Customer
* Cross-seller denial
* Unauthorized analytics access

### Security

* IDOR
* Injection
* Query abuse
* Cache leakage
* Export leakage
* Spreadsheet injection where applicable

### Reliability

* Event transport unavailable
* Analytics projection database unavailable
* Redis unavailable
* BullMQ failure
* Duplicate events
* Out-of-order events
* DLQ behavior

### Reconciliation

* Missing event
* Duplicate event
* Projection mismatch
* Recovery

---

# 51. Performance Testing

Test realistic analytics workloads.

Measure:

* Dashboard query latency
* Report generation time
* Event processing throughput
* Projection update latency
* Database query plans
* Cache effectiveness

Prevent analytics queries from degrading transactional commerce.

If analytics queries contend with transactional workloads, optimize through:

* Indexes
* Aggregates
* Read models
* Query limits
* Caching
* Asynchronous reports

Do not compromise transactional correctness for analytics speed.

---

# 52. API Documentation

Document analytics/report APIs in OpenAPI.

For every endpoint define:

* Authentication
* Permissions
* Query parameters
* Date semantics
* Filters
* Metrics
* Pagination
* Result limits
* Error responses

Do not expose arbitrary database or search-engine queries.

---

# 53. Error Handling

Use the repository's standard error model.

Analytics errors should distinguish:

* Invalid filters
* Unauthorized access
* Unsupported metric
* Invalid date range
* Query limit exceeded
* Report not found
* Report generation failed
* Projection unavailable

Do not leak database errors or internal implementation details.

---

# 54. Failure Isolation

Analytics must degrade independently from core commerce.

If analytics is unavailable:

* Checkout must still work.
* Orders must still work.
* Payments must still work.
* Inventory must still work.
* Fulfillment must still work.
* Returns must still work.

The system may temporarily show:

* Stale dashboards
* Delayed metrics
* Unavailable reports

rather than corrupting transactional workflows.

---

# 55. Security Threat Model

Explicitly test for:

* Cross-seller analytics access
* Customer data leakage
* Report authorization bypass
* Predictable report IDs
* Export URL abuse
* Cache poisoning
* Cache scope leakage
* Query injection
* Resource exhaustion
* Event payload injection
* Stored XSS in report metadata
* Privilege escalation
* Unauthorized replay
* Sensitive logging

---

# 56. Backward Compatibility

Do not break existing:

* API contracts
* Event contracts
* Database models
* Seller APIs
* Admin APIs
* Order/payment workflows
* Inventory workflows
* Fulfillment workflows
* Review workflows
* Notification workflows

If an event contract must change:

* Version it.
* Preserve existing consumers.
* Update documentation.
* Update tests.
* Provide migration/replay strategy.

---

# 57. Documentation

Update documentation for:

* Business-event catalog
* Event schemas
* Analytics metrics
* Report definitions
* Permissions
* Seller analytics isolation
* Report generation
* Data retention
* Reconciliation
* DLQ/replay procedures
* Operational monitoring
* Environment variables
* Background jobs

Documentation must describe actual implemented behavior.

---

# 58. What This Volume Must NOT Implement

Do not expand into unrelated functionality.

Explicitly defer unless already required:

* Machine-learning recommendation systems
* Personalized recommendation models
* Marketing automation
* Advertising platform
* Full accounting/ERP
* Tax remittance platform
* Seller payout/settlement platform
* Advanced warehouse management
* Fraud/AML platform
* Full data warehouse/lakehouse
* Carrier-specific integrations without actual providers
* New web frontend
* New mobile frontend

---

# 59. Production Validation

Before completion:

1. Build the backend.
2. Run TypeScript validation.
3. Run linting.
4. Run unit tests.
5. Run integration tests.
6. Run database tests.
7. Run API tests.
8. Run authorization/security tests.
9. Run event-processing tests.
10. Run queue/job tests.
11. Validate Prisma migrations.
12. Validate OpenAPI.
13. Validate report generation.
14. Validate export security.
15. Validate seller isolation.
16. Validate analytics failure isolation.
17. Validate observability.
18. Validate graceful shutdown.
19. Run existing regression tests.

Fix real failures.

Do not mark failures as complete merely because the implementation exists.

---

# 60. Final Repository Inspection

After implementation, inspect the final repository.

Verify:

* No duplicate analytics system exists.
* No duplicate event system exists.
* Existing outbox infrastructure remains coherent.
* Existing event consumers still work.
* Core commerce remains independent of analytics availability.
* Seller isolation remains intact.
* Customer privacy remains intact.
* Financial metrics use exact money.
* Reports are authorization-protected.
* Exports are secure.
* Background jobs are observable.
* Projection processing is idempotent.
* Reconciliation is possible.
* DLQ/replay behavior is safe.
* Tests cover failure paths.
* Documentation reflects actual behavior.

---

# 61. Final Implementation Report

Provide a factual report based exclusively on the actual repository.

Include:

### Implemented

Actual analytics/business-event/reporting functionality implemented.

### Existing Infrastructure Reused

Actual event, outbox, queue, Redis, database, and observability infrastructure reused.

### Database

Actual models, migrations, indexes, and constraints.

### Events

Actual event types/contracts added or modified.

### Consumers

Actual analytics consumers implemented.

### Projections

Actual analytics projections/aggregates implemented.

### APIs

Actual analytics/report endpoints implemented.

### Jobs

Actual BullMQ jobs implemented.

### Exports

Actual export functionality implemented.

### Security

Actual access-control/privacy/security protections.

### Observability

Actual metrics, logs, and traces.

### Tests

Actual tests and validation commands/results.

### Documentation

Actual documentation updates.

### Remaining Work

Only genuinely incomplete functionality discovered in the repository.

Do not claim implementation of anything that was not actually completed and validated.

---

# 62. Non-Negotiable Rules

* Inspect the repository first.
* The actual repository is the source of truth.
* This prompt is standalone.
* This is one implementation unit of one coherent ecommerce marketplace.
* Integrate with the existing implementation.
* Do not create competing systems.
* Do not regenerate unchanged files.
* Do not use pseudo-code.
* Do not use TODOs as substitutes for implementation.
* Do not fabricate analytics.
* Do not fabricate provider capabilities.
* Do not use floating-point monetary calculations.
* Do not expose private customer data unnecessarily.
* Do not allow cross-seller analytics access.
* Do not trust client-provided seller IDs for authorization.
* Do not expose raw database/search queries.
* Do not make core commerce depend on analytics.
* Treat events as at-least-once unless the actual infrastructure guarantees otherwise.
* Make consumers idempotent.
* Preserve event versioning.
* Protect exports.
* Protect report artifacts.
* Never hardcode secrets.
* Never falsely claim completion.
* Implement real production-grade functionality.
* Add real tests.
* Validate against the actual repository.

Now inspect the repository and implement this entire **Analytics, Business Events, Reporting, and Operational Metrics backend implementation unit** as a production-grade extension of the existing Amazon-style ecommerce marketplace.
