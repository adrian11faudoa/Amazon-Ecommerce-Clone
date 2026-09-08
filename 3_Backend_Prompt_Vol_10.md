# Amazon Ecommerce Marketplace — Backend Prompt — Volume 10

## Administration, Seller Operations, Customer Support, Platform Operations, and Audit

You are implementing the next production-grade backend implementation unit for an original Amazon-style enterprise ecommerce marketplace.

This is a standalone implementation prompt. It must contain everything necessary to execute this phase without relying on any previous prompt, architecture document, conversation, generated artifact, or remembered decision.

The actual repository is the only source of truth for the current implementation state.

Do not assume that another prompt was executed successfully. Inspect the repository and existing implementation first. Reuse and integrate with what actually exists.

---

# 1. Mission

Implement the complete **Administration, Seller Operations, Customer Support, Platform Operations, and advanced Audit capability** for the existing ecommerce marketplace backend.

This phase must integrate with the existing backend capabilities for:

* Identity and authentication
* Authorization
* Customers
* Catalog
* Products
* Categories
* Brands
* Sellers
* Seller users and roles
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
* Media
* Redis
* BullMQ
* Event/outbox infrastructure
* Observability

Do not create competing implementations of functionality that already exists.

If the repository differs from these requirements, inspect the actual implementation, preserve compatible contracts, and make the smallest safe changes necessary to produce a coherent production-grade system.

Do not falsely claim that functionality exists merely because it was requested.

---

# 2. Technology Baseline

Use the technologies already established by the repository where present.

Expected backend baseline:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Redis
* Elasticsearch/OpenSearch where already implemented
* BullMQ
* REST APIs
* OpenAPI/Swagger
* Webhooks where required
* SSE where already supported
* AWS S3/CloudFront where media integration exists
* Stripe where payment integration exists
* Kafka/Redpanda where the repository already uses it or where the existing event architecture requires it
* Docker-compatible development/runtime environment

Follow the repository's actual versions and conventions rather than blindly replacing dependencies.

---

# 3. Repository-First Execution

Before changing anything:

1. Inspect the repository structure.
2. Inspect package manifests.
3. Inspect NestJS modules.
4. Inspect Prisma schema and migrations.
5. Inspect authentication and authorization.
6. Inspect existing roles and permissions.
7. Inspect seller modules.
8. Inspect order/payment/refund/fulfillment/return modules.
9. Inspect reviews and moderation functionality.
10. Inspect notifications.
11. Inspect audit logging.
12. Inspect event/outbox infrastructure.
13. Inspect Redis and BullMQ infrastructure.
14. Inspect OpenAPI configuration.
15. Inspect tests.
16. Inspect environment/configuration.
17. Inspect existing admin functionality, if any.
18. Identify incomplete, duplicated, or conflicting implementations.

Do not regenerate unchanged files.

Do not introduce a second permission system, audit system, seller-management system, or administration framework if one already exists.

Extend the existing architecture.

---

# 4. Administration Bounded Context

Implement a clearly defined Administration/Platform Operations capability.

Administration must be separated from normal customer and seller authorization.

Administrative privileges must never be inferred merely from frontend routes or UI visibility.

Every administrative operation must be authorized server-side.

Define explicit administrative roles and permissions based on the existing authorization architecture.

Possible permission categories include:

* ADMIN_USERS_READ
* ADMIN_USERS_MANAGE
* ADMIN_CUSTOMERS_READ
* ADMIN_CUSTOMERS_MANAGE
* ADMIN_SELLERS_READ
* ADMIN_SELLERS_MANAGE
* ADMIN_CATALOG_READ
* ADMIN_CATALOG_MANAGE
* ADMIN_INVENTORY_READ
* ADMIN_INVENTORY_MANAGE
* ADMIN_ORDERS_READ
* ADMIN_ORDERS_MANAGE
* ADMIN_PAYMENTS_READ
* ADMIN_REFUNDS_MANAGE
* ADMIN_FULFILLMENT_READ
* ADMIN_RETURNS_MANAGE
* ADMIN_REVIEWS_MODERATE
* ADMIN_NOTIFICATIONS_MANAGE
* ADMIN_AUDIT_READ
* ADMIN_PLATFORM_CONFIG_READ
* ADMIN_PLATFORM_CONFIG_MANAGE
* ADMIN_OPERATIONS_READ

Use the actual repository's authorization model where already present.

Do not blindly create these exact permissions if equivalent permissions already exist.

---

# 5. Administrator Identity and Access

Implement or complete administrative account management.

Support:

* Administrator identity
* Administrative roles
* Administrative permissions
* Role assignment
* Permission evaluation
* Administrative session security
* Administrative account activation/deactivation
* Administrative audit trail
* Sensitive-operation authorization
* Least privilege

High-risk administrative operations should support stronger protections where appropriate, such as:

* Re-authentication
* Recent authentication requirement
* Idempotency
* Explicit reason capture
* Audit logging

Never allow privilege escalation through:

* Client-provided roles
* Manipulated IDs
* Mass assignment
* Missing authorization checks
* Tenant/seller identifiers
* Query parameters
* Hidden frontend fields

---

# 6. User and Customer Administration

Implement administrative capabilities for customer account operations.

Support appropriate operations such as:

* Search users/customers
* View customer profiles
* View account status
* View account-related audit history
* Suspend customer account
* Reactivate customer account
* Lock account when required
* Manage account status for operational reasons
* Review associated orders where authorized
* Review account security events where authorized

Do not expose unnecessary private information.

Administrative APIs must return only fields required for the requested operation.

Do not expose:

* Password hashes
* Authentication secrets
* Refresh tokens
* Session secrets
* Push-token secrets
* Payment credentials
* Sensitive provider secrets

Customer account changes must produce audit events.

---

# 7. Seller Administration

Implement production-grade seller administration.

Support seller operational workflows such as:

* Seller search
* Seller profile inspection
* Seller status inspection
* Seller approval
* Seller suspension
* Seller reactivation
* Seller rejection
* Seller closure where supported
* Seller role management
* Seller user management
* Seller offer visibility management
* Seller operational restrictions
* Seller compliance/verification status where represented by the existing domain

Respect the existing seller lifecycle.

Do not invent regulatory or legal verification requirements that the system cannot actually support.

Seller administrative operations must be isolated from customer operations.

Seller data must never leak across seller boundaries.

Every seller-management mutation must be auditable.

---

# 8. Seller Operational Dashboard APIs

Implement backend APIs necessary to support seller operational dashboards.

Provide appropriate read models/endpoints for information such as:

* Seller account status
* Active products/offers
* Inventory summaries
* Orders requiring seller action
* Fulfillment status
* Shipments
* Returns
* Review summaries
* Operational warnings
* Relevant notifications
* Recent seller events

Do not create a separate database authority merely for dashboard convenience.

Use PostgreSQL and existing domain services as authoritative sources.

Where aggregation is expensive, use carefully designed read models or cached projections without compromising correctness.

Clearly distinguish:

* Authoritative transactional data
* Derived operational metrics
* Cached dashboard values

---

# 9. Seller Product and Offer Operations

Implement administrative and seller-authorized operational controls around catalog offers.

Support appropriate operations such as:

* Review seller offers
* Activate/deactivate offers
* Suspend offers
* Inspect offer pricing
* Inspect offer inventory
* Inspect seller ownership
* Review offer history
* Remove invalid offers from marketplace visibility

Never allow a seller to modify another seller's offer.

Never allow sellers to modify platform-owned catalog data unless explicitly authorized by the repository's domain model.

Use server-side ownership validation.

---

# 10. Catalog Administration

Implement administrative catalog operations where required.

Support appropriate workflows such as:

* Product moderation
* Product visibility control
* Product lifecycle management
* Category management
* Brand management
* Product status management
* Product correction workflows
* Catalog quality review

Respect existing product lifecycle states.

Do not bypass domain invariants simply because an administrator is performing an operation.

Administrative privileges may override normal ownership restrictions only where explicitly justified and authorized.

Every override must be auditable.

---

# 11. Inventory Administration

Implement operational inventory-management APIs.

Support appropriate administrative capabilities such as:

* Inventory inspection
* Inventory-location inspection
* Stock adjustment
* Inventory discrepancy review
* Reservation inspection
* Reservation investigation
* Expired reservation review
* Inventory movement history
* Seller inventory inspection subject to authorization

Stock adjustments must use the existing inventory domain.

Do not directly mutate stock quantities without the repository's established inventory transaction/movement mechanism.

Every manual stock adjustment must include:

* Actor
* Target inventory
* Quantity change
* Reason
* Timestamp
* Correlation/request ID
* Audit event

Prevent:

* Negative inventory unless explicitly supported
* Duplicate adjustments
* Cross-seller access
* Lost updates
* Silent inventory mutation

---

# 12. Order Administration

Implement administrative order-management operations.

Support:

* Order search
* Order filtering
* Order inspection
* Customer association
* Seller association
* Order status
* Order history
* Payment status
* Fulfillment status
* Shipment status
* Return status
* Order operational actions where permitted

Order APIs must preserve immutable historical snapshots.

Administrative actions must respect the existing order state machine.

Do not introduce arbitrary state transitions.

For any exceptional administrative transition:

* Validate the current state
* Validate the target state
* Enforce business invariants
* Capture the reason
* Record the actor
* Record an audit event
* Emit appropriate domain events
* Preserve history

---

# 13. Payment and Refund Administration

Implement administrative read and operational capabilities around payments and refunds.

Support appropriate:

* Payment search
* Payment inspection
* Payment-attempt inspection
* Payment state inspection
* Refund inspection
* Refund status
* Payment-provider reference lookup
* Reconciliation status
* Refund operational actions where permitted

Do not expose:

* Full card numbers
* CVV
* Provider secrets
* Authentication credentials

Administrative refund actions must reuse the existing Refund/Payment domain.

Do not directly mutate payment state merely to make the UI display a desired result.

External payment provider state must remain distinct from internal application state.

Every sensitive financial operation must be:

* Authorized
* Idempotent
* Audited
* Observable
* Recoverable

---

# 14. Fulfillment and Shipment Administration

Implement operational APIs for:

* Fulfillment groups
* Shipment inspection
* Shipment status
* Tracking events
* Delivery failures
* Fulfillment exceptions
* Seller fulfillment issues
* Return-to-sender situations where supported

Do not invent carrier APIs.

Use existing provider abstractions.

Administrative tracking corrections must preserve the original tracking history where possible.

Do not silently overwrite immutable tracking events.

---

# 15. Returns Administration

Implement operational return-management functionality.

Support:

* Return search
* Return inspection
* Return eligibility inspection
* Return status
* Return-item status
* Inspection outcome
* Refund status
* Inventory restoration status
* Return exception handling
* Administrative return decisions where permitted

Do not allow an administrator to bypass quantity limits, refund limits, or inventory rules.

Any manual override must:

* Require appropriate permission
* Capture reason
* Preserve original state/history
* Be auditable
* Be idempotent where applicable

---

# 16. Review Moderation Administration

Integrate administrative review moderation with the existing Reviews bounded context.

Support:

* Review moderation queue
* Review search
* Review inspection
* Review reports
* Moderation decisions
* Hide/remove/reject actions
* Moderation reason
* Moderator identity
* Moderation audit history

Do not implement fake AI moderation.

If automated moderation signals exist, treat them as signals rather than authoritative decisions unless the repository explicitly defines otherwise.

Prevent moderators from manipulating review aggregates without legitimate state transitions.

---

# 17. Customer Support Operations

Implement backend capabilities needed by authorized customer-support personnel.

Support operational lookup of:

* Customer
* Orders
* Payments
* Refunds
* Shipments
* Returns
* Relevant notifications
* Account status
* Relevant audit events

Support controlled operational actions where appropriate.

Customer-support personnel must not automatically receive unrestricted administrator privileges.

Create granular permissions for support operations.

Sensitive fields should be minimized or masked where appropriate.

Every support mutation must be auditable.

---

# 18. Support Case / Ticket Boundary

If the repository already contains a support/ticket domain, integrate with it.

If no support-ticket system exists, do not create an unnecessarily large external helpdesk platform in this phase.

If operational support cases are required by the existing application, implement a minimal production-grade domain supporting:

* Case ID
* Customer
* Seller where applicable
* Order/reference context
* Category
* Priority
* Status
* Assigned support user
* Description
* Internal notes
* Resolution
* Created/updated timestamps
* Audit history

Never expose internal notes to customers unless explicitly designed for that purpose.

Protect customer and seller data.

---

# 19. Platform Configuration

Implement a controlled platform configuration mechanism only where actually required.

Configuration must be:

* Typed
* Validated
* Versioned where necessary
* Permission-controlled
* Audited
* Environment-aware

Do not store secrets in the database merely because configuration exists.

Secrets remain in the existing secret-management/environment configuration system.

Avoid arbitrary JSON configuration that allows users to inject uncontrolled behavior.

If dynamic configuration is required, define explicit schemas.

Examples of legitimate configuration:

* Feature flags
* Operational thresholds
* Marketplace limits
* Supported currencies
* Operational toggles
* Notification policy settings
* Review/report thresholds

Do not allow administrators to modify security-critical configuration without appropriate controls.

---

# 20. Feature Flags

If the repository uses feature flags, integrate with the existing mechanism.

If feature flags do not exist and are genuinely required, implement a minimal typed mechanism.

Requirements:

* Explicit flag identifiers
* Typed values
* Environment awareness
* Safe defaults
* Audit history
* Permission checks
* Cache invalidation
* No client-only enforcement for security-sensitive behavior

Feature flags must never be the sole authorization mechanism.

---

# 21. Advanced Audit System

Complete and harden the audit subsystem.

Audit events should capture appropriate information such as:

* Audit ID
* Actor ID
* Actor type
* Action
* Resource type
* Resource ID
* Previous state where safe
* New state where safe
* Reason where required
* Request ID
* Correlation ID
* IP address where appropriate
* User-agent/device metadata where appropriate
* Timestamp
* Result/outcome

Do not store secrets or unnecessarily sensitive payloads.

Audit records should be append-oriented and resistant to ordinary application mutation.

Protect audit APIs with strict permissions.

---

# 22. Audit Coverage

Ensure important administrative and sensitive business operations generate audit events.

At minimum cover:

* User status changes
* Role changes
* Permission changes
* Seller status changes
* Seller-user changes
* Product moderation
* Offer moderation
* Inventory adjustments
* Order administrative actions
* Payment/refund administrative actions
* Return decisions
* Review moderation
* Notification administrative actions
* Platform configuration changes
* Feature-flag changes
* Support mutations
* Security-sensitive operations

Do not create noisy audit events for meaningless internal reads unless the security model requires them.

---

# 23. Audit Query API

Implement secure administrative audit-search APIs.

Support:

* Filtering by actor
* Resource
* Action
* Date range
* Result
* Seller where authorized
* Customer where authorized
* Correlation/request ID
* Pagination
* Sorting

Use cursor pagination where appropriate.

Prevent unbounded audit queries.

Do not expose audit data to ordinary customers or sellers unless explicitly required.

---

# 24. Operational Search and Filtering

Administrative search endpoints must support safe filtering.

Possible filters:

* IDs
* Statuses
* Date ranges
* Seller
* Customer
* Order number
* Payment reference
* Shipment tracking reference
* Review status
* Resource type

Validate all filters.

Do not expose raw database query syntax.

Do not allow arbitrary SQL/Prisma filters from clients.

Prevent expensive unbounded queries.

Add appropriate database indexes.

---

# 25. Administrative API Design

Use the repository's established API versioning.

Maintain consistent conventions for:

* URLs
* HTTP methods
* DTOs
* Validation
* Response envelopes
* Error format
* Error codes
* Pagination
* Sorting
* Filtering
* Request IDs
* Idempotency
* Authorization
* OpenAPI documentation

Administrative endpoints should be clearly separated from customer and seller APIs.

Example conceptual grouping:

```text
/api/v1/admin/users
/api/v1/admin/customers
/api/v1/admin/sellers
/api/v1/admin/catalog
/api/v1/admin/inventory
/api/v1/admin/orders
/api/v1/admin/payments
/api/v1/admin/refunds
/api/v1/admin/fulfillment
/api/v1/admin/returns
/api/v1/admin/reviews
/api/v1/admin/notifications
/api/v1/admin/audit
/api/v1/admin/config
/api/v1/admin/operations
```

Use actual repository conventions if they differ.

---

# 26. Seller API Boundaries

Seller-facing APIs must remain separate from platform-admin APIs.

Seller users may only access resources belonging to their authorized seller organization.

For every seller-scoped request:

1. Authenticate the actor.
2. Resolve seller membership server-side.
3. Resolve seller role.
4. Check permission.
5. Verify resource ownership.
6. Perform operation.
7. Record audit event where required.

Never trust:

* sellerId from the body
* sellerId from query parameters
* hidden frontend fields
* route parameters without ownership verification

---

# 27. Customer Support Authorization

Implement granular support roles if the repository supports support users.

Examples:

* SUPPORT_AGENT
* SUPPORT_SUPERVISOR
* SUPPORT_ADMIN

Do not use broad administrator privileges for ordinary support actions.

Separate:

* Read customer data
* Read financial data
* Refund
* Cancel order
* Modify customer account
* View security events
* Modify seller data

according to least privilege.

---

# 28. Business Invariants

Enforce invariants such as:

* Administrators cannot grant permissions they are not authorized to grant.
* Sellers cannot access other sellers.
* Support agents cannot perform unauthorized financial operations.
* Customers cannot access administrative resources.
* Audit history cannot be silently rewritten.
* Manual inventory adjustments cannot bypass inventory invariants.
* Administrative order transitions cannot violate the order state machine.
* Administrative refunds cannot exceed refundable amounts.
* Review moderation cannot corrupt rating aggregates.
* Configuration changes are validated.
* Feature flags cannot bypass authorization.
* Sensitive financial data remains protected.
* Platform secrets are never exposed through admin APIs.

---

# 29. Concurrency and Idempotency

Protect administrative mutations against:

* Double-clicks
* Retries
* Network failures
* Concurrent administrators
* Concurrent seller actions
* Worker retries
* Duplicate event delivery

Use idempotency where operations are externally retryable or financially significant.

Use database transactions where state transitions require atomicity.

Use optimistic concurrency/version checks where appropriate.

Do not hold database transactions open while calling external providers.

---

# 30. Events and Outbox Integration

Use the existing event/outbox architecture.

Emit appropriate events for significant administrative mutations.

Examples:

* UserSuspended
* UserReactivated
* SellerApproved
* SellerSuspended
* SellerReactivated
* ProductModerated
* OfferSuspended
* InventoryAdjusted
* OrderAdminUpdated
* RefundAdminActionCompleted
* ReturnAdminDecisionMade
* ReviewModerated
* PlatformConfigurationChanged

Use the repository's actual event naming/versioning convention.

Events must:

* Have stable identifiers
* Be versioned
* Include aggregate/resource identity
* Include timestamps
* Include correlation/trace context where supported
* Avoid secrets
* Avoid unnecessary private data
* Be safe for at-least-once delivery

Use transactional outbox patterns where appropriate.

---

# 31. BullMQ / Background Operations

Use BullMQ only for operations that benefit from asynchronous execution.

Potential jobs:

* Administrative report generation
* Audit maintenance
* Reconciliation
* Operational notifications
* Large data exports
* Search/index maintenance where relevant
* Configuration propagation
* Cleanup

Every job must define:

* Payload contract
* Queue
* Job name
* Idempotency strategy
* Retry policy
* Backoff
* Timeout
* Concurrency
* Failure handling
* DLQ behavior where appropriate
* Logging
* Metrics
* Graceful shutdown

Do not create background jobs for simple transactional operations that should remain synchronous.

---

# 32. Data Export

If administrative data export is part of the existing application, implement it securely.

Exports must:

* Be permission-controlled
* Be asynchronous for large datasets
* Be scoped
* Avoid secrets
* Avoid unnecessary sensitive fields
* Have controlled retention
* Use secure object storage if persisted
* Avoid public S3 objects
* Use short-lived access URLs where appropriate
* Be audited

Never expose arbitrary database dumps through an API.

---

# 33. Privacy and Data Minimization

Administrative access does not eliminate privacy requirements.

Implement:

* Field minimization
* Access control
* Sensitive-field masking
* Auditability
* Retention rules
* Secure exports
* No unnecessary logging

Never log:

* Passwords
* Authentication tokens
* Refresh tokens
* API secrets
* Payment secrets
* Full card information
* Sensitive provider credentials

Do not include private customer data in events unless required.

---

# 34. Security Hardening

Threat-model administrative APIs against:

* Privilege escalation
* IDOR
* Broken access control
* Role manipulation
* Seller boundary bypass
* Customer data leakage
* Financial abuse
* Refund abuse
* Inventory manipulation
* Audit tampering
* Configuration abuse
* SSRF
* Injection
* XSS through stored administrative content
* CSRF where applicable
* Brute force
* Session hijacking
* Replay
* Rate-limit bypass
* Mass assignment
* Excessive data exposure

Administrative endpoints require stronger security assumptions than public catalog endpoints.

Apply:

* Authentication
* Authorization
* Input validation
* Rate limiting
* Security headers
* Audit logging
* Secure error handling
* Least privilege
* Secret protection

---

# 35. Rate Limiting

Apply appropriate rate limits to sensitive administrative endpoints.

Prioritize protection for:

* Login
* Role changes
* Permission changes
* Refund operations
* Inventory adjustments
* Bulk moderation
* Exports
* Configuration changes
* Audit searches
* Large operational queries

Avoid rate limits that make legitimate operational workflows unusable.

Use Redis only if the repository's existing rate-limit architecture uses it.

---

# 36. Observability

Instrument administrative operations with:

* Structured logs
* Metrics
* Distributed traces
* Request IDs
* Correlation IDs
* Audit events

Useful metrics include:

* Administrative requests
* Authorization failures
* Seller-management operations
* Inventory adjustments
* Refund operations
* Order overrides
* Review moderation volume
* Support actions
* Configuration changes
* Export jobs
* Audit query latency
* Background-job failures

Never log secrets or unnecessary private information.

---

# 37. Database Design

Extend Prisma/PostgreSQL only as required by the implementation.

Potential models include:

* AdminProfile
* AdminRole
* SupportAssignment
* SupportCase
* PlatformConfiguration
* PlatformConfigurationVersion
* FeatureFlag
* FeatureFlagHistory
* AuditEvent extensions
* AdministrativeAction
* DataExportJob

Do not create duplicate models where the repository already has equivalent structures.

For every new model:

* Define appropriate primary keys
* Foreign keys
* Unique constraints
* Check constraints where supported
* Indexes
* Lifecycle behavior
* Retention requirements
* Referential actions

Avoid unnecessary denormalization.

---

# 38. Database Transactions

Use transactions for operations requiring atomicity.

Examples:

* Role assignment
* Permission changes
* Seller status changes
* Inventory adjustments
* Administrative order transitions
* Refund authorization records
* Review moderation affecting aggregates
* Configuration updates
* Audit-linked mutations

Do not place slow external network requests inside long-running database transactions.

Use durable state plus asynchronous processing where required.

---

# 39. API Documentation

All administrative APIs must be represented in OpenAPI/Swagger.

Document:

* Authentication
* Required permissions
* Request DTOs
* Response DTOs
* Validation
* Pagination
* Filtering
* Errors
* Idempotency
* Sensitive operations

Do not document endpoints that do not actually exist.

---

# 40. Testing Requirements

Implement real tests.

At minimum cover:

### Authorization

* Admin access
* Support access
* Seller access
* Customer denial
* Permission denial
* Cross-seller denial
* Privilege escalation attempts

### Customer administration

* Suspend
* Reactivate
* Invalid transitions
* Audit creation

### Seller administration

* Approval
* Suspension
* Reactivation
* Seller-user management
* Cross-seller protection

### Inventory

* Valid adjustment
* Invalid adjustment
* Concurrent adjustment
* Duplicate request
* Audit event

### Orders

* Valid administrative action
* Invalid state transition
* Unauthorized action
* Audit history

### Payments/refunds

* Authorized refund operation
* Duplicate refund request
* Refund limit protection
* Provider failure behavior

### Reviews

* Moderation
* Invalid moderation transition
* Aggregate consistency
* Audit

### Configuration

* Valid configuration
* Invalid configuration
* Unauthorized mutation
* Version/history behavior

### Audit

* Audit creation
* Search
* Pagination
* Permission protection
* Sensitive-data protection

### Security

* IDOR
* Role manipulation
* Mass assignment
* Injection
* Rate-limit behavior
* Sensitive-field exposure

### Integration

* Database
* Redis where applicable
* BullMQ where applicable
* Event/outbox behavior
* Existing domain services

---

# 41. Performance

Inspect query plans for high-volume administrative queries.

Add indexes for common access patterns.

Avoid:

* N+1 queries
* Unbounded queries
* Full-table scans for routine operations
* Excessive relation loading
* Returning unnecessary columns

Use pagination for all potentially large collections.

Large exports must not run as synchronous HTTP operations.

---

# 42. Backward Compatibility

Do not break existing:

* Customer APIs
* Seller APIs
* Catalog APIs
* Inventory APIs
* Cart APIs
* Checkout APIs
* Order APIs
* Payment APIs
* Fulfillment APIs
* Return APIs
* Review APIs
* Search APIs
* Notification APIs
* Event contracts
* Database assumptions

If changes are required:

* Make them backward-compatible where possible.
* Use migrations.
* Version breaking APIs.
* Update tests.
* Update OpenAPI.
* Update consumers.
* Explain unavoidable breaking changes in the final report.

---

# 43. Code Quality

Follow:

* Clean Architecture
* Domain Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Dependency inversion
* Strong TypeScript typing
* Explicit domain errors
* Consistent DTO validation
* Small cohesive modules
* Clear naming
* No hidden global state

Do not introduce unnecessary abstractions.

Do not duplicate business rules between controllers and services.

Controllers should remain thin.

Business invariants belong in appropriate domain/application services.

---

# 44. Configuration and Environment

Any new environment variables must:

* Be explicitly defined
* Be validated
* Have safe behavior when optional
* Never contain hardcoded production secrets
* Be documented

Do not silently introduce required environment variables that prevent the project from starting without updating configuration documentation.

---

# 45. Documentation

Update relevant documentation for:

* Administrative roles
* Permissions
* Seller operations
* Support operations
* Audit model
* Configuration
* Feature flags
* Operational APIs
* Security requirements
* Environment variables
* Background jobs
* Operational procedures

Documentation must describe the actual implementation.

---

# 46. What This Volume Must NOT Implement

Do not expand this phase into unrelated systems.

Explicitly defer unless already required by the existing repository:

* Recommendation engine
* Machine-learning personalization
* Full marketing automation
* Advanced business intelligence platform
* Seller payouts/settlement
* Tax remittance platform
* Advanced warehouse management system
* Carrier-specific integrations without real provider contracts
* Fraud/AML platform
* External helpdesk replacement
* Full data warehouse
* Data lake
* Arbitrary reporting engine
* New frontend implementation
* New mobile implementation

Do not invent external provider capabilities.

---

# 47. Production Readiness

Before considering this implementation unit complete:

1. Run the relevant build.
2. Run TypeScript validation.
3. Run linting.
4. Run unit tests.
5. Run integration tests.
6. Run database tests.
7. Run API tests.
8. Run authorization/security tests.
9. Run concurrency tests for sensitive mutations.
10. Run existing regression tests.
11. Validate Prisma migrations.
12. Validate OpenAPI generation.
13. Validate background jobs.
14. Validate event/outbox behavior.
15. Validate graceful shutdown.
16. Validate error handling.
17. Validate observability.
18. Inspect changed files for accidental regressions.

Fix actual failures rather than documenting them as acceptable without justification.

---

# 48. Final Repository Validation

After implementation, inspect the final repository state.

Verify:

* No duplicate administration architecture exists.
* No duplicate authorization architecture exists.
* No duplicate audit system exists.
* No duplicate seller-management architecture exists.
* Existing domains still compile.
* Existing APIs still function.
* Existing migrations remain coherent.
* New migrations are safe.
* New permissions are enforced server-side.
* Seller isolation is preserved.
* Customer privacy is preserved.
* Financial operations are protected.
* Administrative mutations are auditable.
* Background jobs are observable.
* Events are consistent.
* Tests cover important failure paths.
* Documentation reflects actual implementation.

---

# 49. Final Implementation Report

At the end, provide a factual implementation report based only on the actual repository state.

Include:

### Implemented

List the functionality actually implemented.

### Modified

List important existing modules/files that were changed.

### Database

List actual migrations/models/constraints/indexes added or modified.

### APIs

List actual administrative/support/seller endpoints implemented.

### Authorization

List actual roles and permissions implemented.

### Events

List actual events added or modified.

### Jobs

List actual BullMQ jobs added or modified.

### Audit

Describe actual audit coverage.

### Security

Describe actual protections implemented.

### Tests

List actual tests added and validation commands/results.

### Documentation

List documentation updated.

### Remaining Work

List only genuinely incomplete functionality discovered in the repository.

Do not claim successful implementation for anything that was not actually implemented and validated.

---

# 50. Non-Negotiable Rules

* Inspect the repository before modifying it.
* The actual repository is the source of truth.
* This prompt is standalone.
* This is one implementation unit of one coherent ecommerce marketplace.
* Integrate with existing implementation.
* Do not create competing architectures.
* Do not regenerate unchanged files.
* Do not use pseudo-code.
* Do not use TODOs as substitutes for implementation.
* Do not create fake provider integrations.
* Do not invent provider capabilities.
* Do not hardcode secrets.
* Do not trust client-provided authorization data.
* Never trust seller IDs supplied by clients for authorization.
* Never expose sensitive payment credentials.
* Never bypass inventory invariants.
* Never bypass order/refund state machines.
* Never allow administrative privilege escalation.
* Never expose private customer/seller information unnecessarily.
* Every sensitive administrative mutation must be authorized and auditable.
* Every retryable sensitive mutation must be safely idempotent.
* Preserve backward compatibility.
* Implement real production-grade functionality.
* Add real tests.
* Validate the implementation against the actual repository.
* Never falsely claim completion.

Now inspect the repository and implement this entire **Administration, Seller Operations, Customer Support, Platform Operations, and Advanced Audit backend implementation unit** as a production-grade extension of the existing Amazon-style ecommerce marketplace.
