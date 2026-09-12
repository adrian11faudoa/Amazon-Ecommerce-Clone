# AMAZON ECOMMERCE PLATFORM — BACKEND VOLUME 1 IMPLEMENTATION PROMPT

## ROLE

Act as the complete **Backend Engineering Team** responsible for implementing the production-grade backend of the Amazon Ecommerce Platform.

Operate as a Principal Backend Architect, Staff Backend Engineers, Database Engineer, Security Engineer, Distributed Systems Engineer, QA Engineer, and DevOps-aware Backend Engineer working as one engineering team.

Do not teach the implementation process. Perform the engineering work directly in the repository.

The objective is to produce real, executable, maintainable, production-grade backend software suitable for a globally operated ecommerce marketplace serving millions of customers, thousands of sellers, millions of products and variants, high order volume, high search traffic, asynchronous workloads, payments, fulfillment, seller operations, administration, and continuous deployment.

---

# PROJECT

Build the backend for a global, multi-seller ecommerce marketplace comparable in breadth and operational complexity to Amazon Marketplace.

The backend must support:

* Customers.
* Customer accounts and profiles.
* Addresses.
* Sellers and seller organizations.
* Seller users and permissions.
* Product catalog management.
* Product variants.
* Categories.
* Brands.
* Attributes.
* Product media.
* Inventory.
* Inventory reservations.
* Pricing.
* Shopping carts.
* Wishlists.
* Promotions.
* Coupons.
* Checkout.
* Orders.
* Order items.
* Payments.
* Refunds.
* Returns.
* Shipments.
* Reviews and ratings.
* Notifications.
* Search.
* Seller payouts.
* Disputes.
* Administration.
* Moderation.
* Audit logging.
* Background processing.
* External provider integrations.
* Operational observability.

The backend must be designed for horizontal scaling, high availability, transactional correctness, secure multi-tenant seller operations, asynchronous processing, graceful degradation, and recovery from partial failures.

---

# TECHNOLOGY DIRECTION

Implement the backend using the following technology direction unless the repository already contains a compatible production-grade implementation that should be preserved:

## Backend

* NestJS.
* TypeScript.
* REST APIs.
* Swagger/OpenAPI.
* Webhooks where required.
* Server-Sent Events or WebSockets only where justified by the domain.
* Class-based or equivalent NestJS architectural patterns that maintain strong modular boundaries.

## Database

* PostgreSQL.
* Prisma ORM.
* PostgreSQL as the authoritative transactional data store.

## Caching and Coordination

* Redis.
* Redis must not become the authoritative source of durable transactional truth.

## Search

* Elasticsearch or OpenSearch.
* Search indexes are derived representations of PostgreSQL data.

## Background Processing

* BullMQ.
* Redis-backed queues.
* Explicit retry, timeout, idempotency, deduplication, failure, and recovery behavior.

## Object Storage

* S3-compatible object storage.
* CloudFront or equivalent CDN for protected media delivery.

## Payments

* Stripe or a provider abstraction that permits production payment-provider integration without coupling core business logic directly to one provider.

## Observability

* OpenTelemetry.
* Prometheus.
* Grafana.
* Loki and/or equivalent centralized structured logging.
* Tempo and/or equivalent distributed tracing.
* Cloud provider observability where appropriate.

---

# SOURCE OF TRUTH

The actual repository is the source of truth for the implementation state.

Before modifying anything:

1. Inspect the repository structure.
2. Inspect package manifests.
3. Inspect TypeScript configuration.
4. Inspect NestJS configuration.
5. Inspect Prisma configuration and migrations.
6. Inspect existing modules.
7. Inspect existing database models.
8. Inspect existing controllers.
9. Inspect services.
10. Inspect repositories/data-access layers.
11. Inspect guards, interceptors, filters, pipes, decorators, middleware, and shared infrastructure.
12. Inspect tests.
13. Inspect environment configuration.
14. Inspect documentation.
15. Inspect existing API contracts.
16. Inspect existing queue and event infrastructure.
17. Inspect existing authentication and authorization mechanisms.
18. Determine what is already correctly implemented.
19. Reuse compatible infrastructure rather than duplicating it.
20. Preserve working functionality unless a change is required by this scope.

Do not assume that a file exists because the architecture requires it.

Do not overwrite existing implementation blindly.

Do not create duplicate modules, services, providers, schemas, utilities, migrations, or infrastructure.

---

# BACKEND IMPLEMENTATION SCOPE

Implement the foundational backend platform and the first production-grade business domains required for the ecommerce system.

This volume must establish the backend foundation required for subsequent backend domains while implementing meaningful customer, identity, seller, catalog, and inventory functionality.

The implementation must include:

* Backend application foundation.
* Global configuration.
* Environment validation.
* Application bootstrap.
* Global request validation.
* Global error handling.
* Structured logging foundation.
* Correlation IDs.
* Request context propagation.
* Authentication foundation.
* Authorization foundation.
* User identity.
* Customer profiles.
* Addresses.
* Seller organizations.
* Seller users.
* Seller authorization boundaries.
* Product catalog foundations.
* Categories.
* Brands.
* Product variants.
* Product attributes.
* Product media metadata.
* Inventory foundations.
* Inventory reservations.
* Core API contracts.
* Database foundation.
* Redis foundation.
* Event foundation.
* Queue foundation.
* Audit foundation where required by implemented operations.
* Automated testing for all implemented functionality.

Do not implement unrelated frontend, mobile, or infrastructure application code.

---

# APPLICATION FOUNDATION

Establish a production-grade NestJS application foundation.

Implement:

* Application bootstrap.
* Configuration module.
* Strong environment validation.
* Environment-specific configuration handling.
* Dependency injection boundaries.
* Global validation.
* Global exception handling.
* Consistent HTTP response behavior.
* Structured logging.
* Request correlation.
* Request-scoped metadata where necessary.
* Graceful application shutdown.
* Health/readiness/liveness foundations.
* Security-related HTTP configuration.
* CORS configuration driven by environment.
* Request size limits.
* Basic API versioning strategy.
* Swagger/OpenAPI setup appropriate for the repository.
* Secure default behavior.

Do not hardcode production credentials, tokens, URLs, or secrets.

Configuration must fail safely when required production configuration is missing or malformed.

---

# PROJECT STRUCTURE

Organize the backend into clear domain modules.

Maintain explicit separation between:

* Controllers.
* Application services/use cases.
* Domain logic.
* Persistence/data-access concerns.
* External integrations.
* Infrastructure.
* Shared cross-cutting concerns.

Avoid creating a giant generic service layer containing unrelated business logic.

Avoid circular dependencies.

Keep domain boundaries explicit.

Do not allow controllers to contain substantial business logic.

Do not expose Prisma models directly as the public API contract when doing so would create undesirable coupling.

---

# DATABASE FOUNDATION

Implement or complete the PostgreSQL/Prisma foundation required by this scope.

The schema must support strong relational integrity.

Apply:

* Primary keys.
* Foreign keys.
* Appropriate unique constraints.
* Appropriate indexes.
* Required non-null constraints.
* Explicit nullable semantics.
* Created/updated timestamps.
* Appropriate lifecycle/status fields.
* Referential integrity.
* Transactional boundaries.
* Concurrency-safe operations.
* Appropriate decimal types for monetary values.
* Auditability where required.
* Soft deletion only where justified by the domain.

Do not use floating-point values for monetary amounts.

Do not introduce redundant fields merely for convenience when they create inconsistent sources of truth.

Every migration must be deterministic and safe to apply.

Do not rewrite historical migrations destructively if the repository already contains applied migrations.

---

# IDENTITY AND AUTHENTICATION

Implement a secure authentication foundation.

Support the architecture required for:

* User registration.
* User login.
* Credential verification.
* Password hashing.
* Access tokens.
* Refresh-token/session management where applicable.
* Logout/revocation.
* Authentication guards.
* Current-user resolution.
* Account status enforcement.
* Session/device management where required by the repository architecture.

Password handling must use a strong password hashing algorithm appropriate for production.

Never log:

* Passwords.
* Password hashes.
* Access tokens.
* Refresh tokens.
* Session secrets.
* API keys.
* Payment credentials.

Authentication failures must not disclose sensitive account information.

Implement protections against:

* Credential stuffing.
* Brute force.
* Token replay.
* Unauthorized access.
* Session misuse.
* Privilege escalation.

Do not store authentication secrets in source code.

---

# AUTHORIZATION

Implement explicit authorization boundaries.

The system must distinguish at minimum:

* Customer access.
* Seller-user access.
* Seller-owner/admin access.
* Platform-admin access.
* Internal/system operations.

Seller users must only access resources belonging to sellers they are authorized to manage.

Customers must never be able to manipulate seller-owned resources.

Authorization must be enforced server-side.

Never rely on frontend restrictions for security.

Prevent IDOR vulnerabilities by verifying resource ownership or authorization before returning or modifying data.

Use explicit guards, policies, permissions, or equivalent mechanisms appropriate to the repository architecture.

---

# CUSTOMER DOMAIN

Implement the customer foundation.

Support:

* Customer profile creation and retrieval.
* Profile updates.
* Account status.
* Customer-owned addresses.
* Address creation.
* Address updates.
* Address deletion/deactivation.
* Default address behavior.
* Address ownership enforcement.
* Customer data isolation.

Validate all user-provided data.

Prevent customers from accessing another customer's profile or address records.

Do not expose unnecessary internal database fields through public APIs.

---

# SELLER DOMAIN

Implement the seller foundation.

Support:

* Seller organization creation.
* Seller profile information.
* Seller status.
* Seller-user membership.
* Seller-user roles.
* Seller-user authorization.
* Seller administration boundaries.
* Seller-owned resource access.

The seller architecture must support future expansion into:

* Seller onboarding.
* Verification.
* Catalog management.
* Inventory.
* Orders.
* Payouts.
* Returns.
* Disputes.
* Seller analytics.

Do not implement financial settlement logic in this volume unless required to establish an explicit foundation for later implementation.

Seller state transitions must be validated.

Unauthorized seller users must not be able to act on another seller's resources.

---

# CATALOG DOMAIN

Implement the foundational catalog domain.

Support:

* Products.
* Product variants.
* Categories.
* Brands.
* Product attributes.
* Product status.
* Seller/product ownership relationships where applicable.
* Product media metadata.

The implementation must support products with multiple variants.

Variants must be capable of representing distinct sellable configurations such as:

* SKU.
* Attributes.
* Price references.
* Inventory references.
* Media references.
* Availability state.

Do not duplicate authoritative product information unnecessarily.

Separate product/catalog information from transactional order snapshots.

---

# PRODUCT DATA INTEGRITY

Implement strict validation for product creation and updates.

Validate:

* Required fields.
* SKU uniqueness according to the marketplace ownership model.
* Variant relationships.
* Category relationships.
* Brand relationships.
* Attribute definitions.
* Attribute values.
* Product lifecycle state.
* Seller ownership.
* Media references.

Prevent:

* Duplicate authoritative records.
* Invalid variant relationships.
* Unauthorized seller modifications.
* Invalid category assignments.
* Invalid state transitions.

Product APIs must return stable, documented contracts.

---

# PRODUCT MEDIA FOUNDATION

Implement secure product-media metadata handling.

The backend must support the architecture required for:

* Media metadata.
* Media ownership.
* Product association.
* Variant association where required.
* MIME type metadata.
* File size metadata.
* Object-storage key references.
* Media status.
* Ordering.
* Lifecycle state.

Do not trust client-provided MIME types or file metadata without server-side validation where files are actually processed.

Do not expose private object-storage credentials.

Use signed URLs or equivalent controlled access mechanisms for protected media operations.

If direct upload infrastructure already exists, integrate with it instead of creating a competing upload path.

---

# INVENTORY DOMAIN

Implement foundational inventory management.

Support:

* Inventory items.
* SKU-level inventory.
* Available quantity.
* Reserved quantity.
* Inventory state.
* Inventory adjustments.
* Inventory reservations.
* Reservation expiration foundations.

Inventory operations must be concurrency-safe.

Never allow concurrent requests to oversell inventory because of a simple read-then-write race.

Use PostgreSQL transactions and appropriate locking or atomic update strategies.

Inventory quantities must never silently become negative unless the explicit business rule permits it.

---

# INVENTORY RESERVATIONS

Implement reservation semantics suitable for checkout workflows.

A reservation must be associated with:

* Customer/session/order context where applicable.
* Inventory item.
* Quantity.
* Reservation state.
* Creation timestamp.
* Expiration timestamp.
* Unique reservation identity.

Support:

* Reservation creation.
* Reservation validation.
* Reservation release.
* Reservation expiration handling.
* Idempotent reservation behavior.
* Safe retry behavior.

Reservation expiration must be compatible with BullMQ or the repository's background processing architecture.

Do not allow duplicate retries to reserve the same inventory repeatedly.

---

# REDIS FOUNDATION

Implement Redis integration appropriate for:

* Caching.
* Distributed coordination where justified.
* Rate limiting foundations.
* Queue infrastructure.
* Ephemeral state.

Do not place authoritative customer, seller, product, inventory, order, or payment state exclusively in Redis.

Define cache keys explicitly.

Define TTL behavior explicitly.

Prevent cache stampede behavior where the implemented use case is susceptible to it.

Handle Redis unavailability without corrupting PostgreSQL transactional state.

---

# EVENT FOUNDATION

Implement a typed domain-event foundation.

Events must contain sufficient metadata for reliable processing, including concepts such as:

* Event ID.
* Event type.
* Event version.
* Entity ID.
* Producer.
* Timestamp.
* Correlation ID.
* Trace ID where available.
* Relevant payload.

Consumers must assume at-least-once delivery.

Consumers must be idempotent.

Do not build business correctness around exactly-once delivery assumptions.

Use transactional outbox behavior where required to prevent database state and event publication from diverging.

Events must not contain unnecessary sensitive data.

---

# QUEUE FOUNDATION

Implement BullMQ infrastructure suitable for the backend.

The queue architecture must support:

* Named queues.
* Typed job payloads.
* Retry configuration.
* Exponential backoff.
* Timeouts where supported.
* Concurrency configuration.
* Job idempotency.
* Deduplication where required.
* Failure handling.
* Dead-letter behavior or equivalent recovery strategy.
* Structured logging.
* Operational observability.

Queue workers must not contain uncontrolled infinite retry behavior.

Transient failures should be retried appropriately.

Permanent failures must become observable and recoverable.

---

# AUDIT FOUNDATION

Implement audit logging for security-sensitive and administrative operations introduced by this volume.

Audit records should capture appropriate metadata such as:

* Actor.
* Actor type.
* Action.
* Resource type.
* Resource identifier.
* Result.
* Timestamp.
* Correlation ID.
* Relevant contextual metadata.

Never store passwords, authentication tokens, payment credentials, or other unnecessary secrets in audit records.

Audit data must be append-oriented and resistant to accidental modification through ordinary application APIs.

---

# API DESIGN

All implemented APIs must have stable, explicit contracts.

Implement:

* Correct HTTP methods.
* Correct status codes.
* Request validation.
* Response DTOs.
* Error DTOs.
* Authentication requirements.
* Authorization requirements.
* Pagination where collections may grow.
* Filtering where justified.
* Sorting where justified.
* Consistent naming.
* OpenAPI documentation.

Use cursor pagination for high-growth collections where appropriate.

Do not use unbounded collection endpoints.

Do not return massive database result sets.

---

# ERROR CONTRACT

Implement a consistent API error contract.

Errors should provide enough information for clients to handle failures without leaking internal implementation details.

Support appropriate categories such as:

* Validation errors.
* Authentication errors.
* Authorization errors.
* Resource-not-found errors.
* Conflict errors.
* Rate-limit errors.
* Business-rule errors.
* Dependency failures.
* Internal errors.

Do not expose:

* Stack traces.
* SQL statements.
* Internal filesystem paths.
* Secrets.
* Provider credentials.
* Sensitive database details.

Correlation/request IDs should be available for operational troubleshooting.

---

# RATE LIMITING AND ABUSE PROTECTION

Implement foundational rate-limiting mechanisms appropriate to the API architecture.

Protect sensitive endpoints such as:

* Authentication.
* Registration.
* Password operations.
* Seller administration.
* Inventory mutation.
* Catalog mutation.
* High-cost operations.

Use Redis-backed distributed rate limiting where necessary for horizontally scaled deployments.

Do not make rate limiting dependent on process-local memory when multiple backend instances must share enforcement.

---

# SECURITY REQUIREMENTS

Perform security-focused implementation throughout this volume.

Protect against:

* SQL injection.
* Injection through ORM misuse.
* IDOR.
* Privilege escalation.
* Broken authentication.
* Broken authorization.
* XSS through unsafe output/data handling.
* CSRF where applicable.
* SSRF.
* Command injection.
* Malicious file uploads.
* Brute force.
* Credential stuffing.
* Replay attacks.
* Token leakage.
* Webhook forgery.
* Sensitive-data exposure.
* Improper error disclosure.
* Mass assignment.
* Parameter tampering.

Validate all external input.

Enforce authorization before resource mutation.

Use allowlists where appropriate.

Apply least privilege.

Do not trust client-calculated:

* Prices.
* Inventory.
* Seller identity.
* Permissions.
* Payment status.
* Order status.
* Refund status.

---

# TRANSACTIONAL INTEGRITY

Every multi-step operation must have an explicit transactional strategy.

Use PostgreSQL transactions where operations must succeed or fail atomically.

Do not hold database transactions open while waiting on slow external providers unless there is a compelling, explicitly justified reason.

For external systems:

* Persist durable intent/state first.
* Perform external work outside the transaction where appropriate.
* Reconcile outcomes.
* Use idempotency keys.
* Retry transient failures safely.

Prevent partial state corruption.

---

# CONCURRENCY

Explicitly consider concurrent requests for:

* Inventory.
* Reservations.
* Product updates.
* Seller operations.
* Customer addresses.
* Authentication sessions.
* Unique resource creation.

Use:

* Database constraints.
* Transactions.
* Atomic operations.
* Appropriate isolation.
* Locks where justified.
* Idempotency.

Do not rely solely on application-level checks for uniqueness or concurrency safety.

---

# OBSERVABILITY

Instrument the backend foundation and implemented domains.

Include:

* Structured logs.
* Metrics.
* Distributed traces.
* Request correlation.
* Database instrumentation.
* Redis instrumentation.
* Queue instrumentation.
* External dependency instrumentation.

Track meaningful business and operational signals such as:

* Request latency.
* Error rates.
* Authentication failures.
* Database failures.
* Redis failures.
* Queue failures.
* Reservation failures.
* Inventory conflicts.
* API throughput.
* Background-job latency.
* Job retries.
* Dead-lettered jobs.

Never log:

* Passwords.
* Tokens.
* Secrets.
* Payment credentials.
* Full sensitive personal data.

---

# RELIABILITY

Implement explicit handling for:

* Database unavailable.
* Redis unavailable.
* Queue failure.
* External provider timeout.
* Duplicate requests.
* Duplicate jobs.
* Partial failures.
* Application restart.
* Graceful shutdown.
* Worker restart.
* Network timeout.
* Temporary dependency failure.

Use:

* Timeouts.
* Retries.
* Exponential backoff.
* Idempotency.
* Graceful degradation.
* Recovery mechanisms.

Do not retry non-retryable errors indefinitely.

---

# TESTING

Every implemented backend capability must have appropriate automated tests.

Implement a layered testing strategy including:

## Unit Tests

Test:

* Domain rules.
* Services.
* Validation.
* Authorization decisions.
* State transitions.
* Inventory logic.
* Reservation logic.
* Utility behavior.

## Integration Tests

Test:

* PostgreSQL interactions.
* Prisma queries.
* Transactions.
* Redis integration where appropriate.
* Queue integration where practical.
* Authentication flows.
* Authorization boundaries.

## API Tests

Test:

* Successful requests.
* Validation failures.
* Authentication failures.
* Authorization failures.
* Not-found behavior.
* Conflict behavior.
* Pagination.
* Security boundaries.

## Security Tests

Verify:

* Customers cannot access other customers' data.
* Sellers cannot access another seller's resources.
* Seller users cannot exceed their permissions.
* Administrators are correctly isolated.
* Unauthorized inventory mutations fail.
* Unauthorized catalog mutations fail.
* Invalid tokens fail.
* Expired/revoked sessions fail.
* Rate limits work where implemented.

## Concurrency Tests

Test race-sensitive inventory and reservation operations.

Prove that concurrent operations cannot incorrectly oversell inventory.

---

# DATABASE AND MIGRATION VALIDATION

Validate all schema changes.

Run the repository's appropriate:

* Prisma validation.
* Migration checks.
* TypeScript checks.
* Linting.
* Unit tests.
* Integration tests.
* API tests.

Ensure migrations apply cleanly to a fresh database.

Ensure migrations are compatible with the repository's migration history.

Do not silently modify historical migrations that may already be applied.

---

# DOCUMENTATION

Update backend documentation for the functionality implemented in this volume.

Document:

* Environment variables.
* API endpoints.
* Authentication behavior.
* Authorization model.
* Database changes.
* Queue behavior.
* Event contracts.
* Important domain rules.
* Development setup.
* Testing commands.
* Operational considerations.

Swagger/OpenAPI documentation must accurately represent implemented endpoints.

Do not document nonexistent functionality.

---

# IMPLEMENTATION BOUNDARIES

This volume is backend-only.

Do not implement:

* Web frontend UI.
* React Native UI.
* Mobile screens.
* Tailwind components.
* Web application layouts.
* Mobile navigation interfaces.

Backend contracts must nevertheless be suitable for future web and mobile clients.

Do not redesign unrelated APIs.

Do not replace working architecture merely because another approach is personally preferred.

Do not introduce unnecessary dependencies.

Do not create speculative abstractions without a concrete implementation need.

---

# ABSOLUTE IMPLEMENTATION RULES

You must not:

* Generate pseudo-code.
* Generate placeholder implementations.
* Generate fake services.
* Generate mock production behavior as a substitute for real implementation.
* Leave TODO comments for required functionality.
* Leave FIXME comments for required functionality.
* Omit required code.
* Use “implement similarly.”
* Use “remaining code omitted.”
* Use “left as an exercise.”
* Use “for brevity.”
* Hardcode secrets.
* Hardcode production credentials.
* Disable security controls merely to make tests pass.
* Bypass type safety without strong justification.
* Suppress compiler errors without resolving their cause.
* Duplicate existing infrastructure unnecessarily.
* Break existing working functionality.

Every implementation must be complete enough to compile and operate within its defined scope.

---

# REPOSITORY COMPATIBILITY

Before implementing:

* Detect the existing project conventions.
* Detect naming conventions.
* Detect module organization.
* Detect testing conventions.
* Detect dependency versions.
* Detect existing infrastructure.
* Detect existing API conventions.
* Detect existing database conventions.

Follow compatible repository conventions unless they conflict with explicit production requirements.

When changing existing code, preserve backward compatibility whenever practical.

If a breaking change is unavoidable, update every affected implementation, test, documentation artifact, and contract within the repository scope.

---

# VALIDATION AND COMPLETION

Do not consider this volume complete merely because source files were created.

Before finishing:

1. Compile/typecheck the backend.
2. Validate Prisma schema.
3. Validate migrations.
4. Run relevant unit tests.
5. Run relevant integration tests.
6. Run relevant API tests.
7. Run security-focused tests.
8. Validate authentication and authorization behavior.
9. Validate inventory concurrency behavior.
10. Validate queue/event behavior implemented in this scope.
11. Validate linting/formatting where configured.
12. Verify no required TODO/FIXME placeholders remain.
13. Verify no secrets were introduced.
14. Verify API documentation matches implementation.
15. Verify repository integration.
16. Verify existing functionality was not unintentionally broken.

Fix failures caused by your implementation before reporting completion.

Do not hide failures.

If an environmental limitation prevents a validation step, identify the exact limitation and perform every other validation that is possible.

---

# IMPLEMENTATION REPORT

At completion, provide a concise engineering report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file and summarize the change.

## Database Changes

Describe:

* Schema changes.
* Migrations.
* Constraints.
* Indexes.
* Important transactional behavior.

## API Changes

List implemented endpoints and their purpose.

## Authentication and Authorization

Describe the implemented security boundaries.

## Events and Queues

List implemented events, queues, jobs, retry behavior, and idempotency mechanisms.

## Tests

List tests added and validation commands executed.

## Validation Results

Report:

* Typecheck/compile.
* Lint.
* Unit tests.
* Integration tests.
* API tests.
* Security tests.
* Migration validation.

Clearly identify any validation that could not be executed and why.

## Operational Notes

Identify configuration or operational requirements necessary to run the implemented backend functionality.

---

# FINAL DIRECTIVE

Implement this backend volume directly in the repository as production-grade software.

Inspect first.

Understand the actual repository state.

Reuse compatible existing infrastructure.

Implement only the backend scope defined here.

Maintain strong domain boundaries.

Preserve transactional integrity.

Protect customer and seller data.

Make inventory operations concurrency-safe.

Make asynchronous processing idempotent and observable.

Keep PostgreSQL authoritative for transactional data.

Treat Redis and search as supporting infrastructure rather than authoritative transactional stores.

Build secure, testable, observable, maintainable backend software suitable for a global ecommerce marketplace.

Do not stop at scaffolding.

Do not provide an architectural essay instead of implementation.

Do not provide pseudo-code.

Do not leave required functionality incomplete.

Implement the complete scope, validate it, integrate it with the repository, and provide the implementation report.
