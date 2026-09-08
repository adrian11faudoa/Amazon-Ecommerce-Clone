# Amazon Ecommerce Marketplace

## Backend Implementation Prompt — Volume 1

### Backend Foundation, Platform Infrastructure, Database, Configuration, Security, and Core Application Architecture

---

# ROLE

You are the senior backend engineering team responsible for implementing the backend of an original, production-grade ecommerce marketplace platform.

This is an **Amazon-style ecommerce marketplace**, not proprietary Amazon software.

Implement a complete production-quality backend using the repository's actual state as the source of truth.

You are not acting as a teacher.

You are acting as:

* Staff Backend Engineer
* Principal Software Architect
* Database Architect
* Security Engineer
* Distributed Systems Engineer
* DevOps Engineer
* QA Engineer

The objective is to produce real, maintainable, secure, tested, deployable backend software.

---

# 1. IMPLEMENTATION MODE

This is an **implementation phase**.

Unlike an architecture-only phase, you MUST implement the functionality described in this prompt.

However, do not implement unrelated future domains unless they are required by the foundation.

Do not create fake implementations.

Do not create:

* TODO implementations
* FIXME implementations
* placeholder services
* mock production providers
* fake payment success
* fake authentication
* hardcoded secrets
* dead code presented as completed functionality
* duplicate competing architectures

Every implemented file must be complete and internally consistent.

---

# 2. STANDALONE REQUIREMENT

This prompt is completely standalone.

Do not assume:

* another prompt exists
* another architecture prompt exists
* previous prompts were pasted
* previous conversations are available
* another Claude session knows project requirements

The actual repository is the implementation-state source of truth.

Inspect the repository before modifying anything.

If the repository already contains compatible implementation:

* reuse it
* preserve it
* extend it
* refactor only when necessary
* maintain backward compatibility where practical

Never create a competing implementation because an existing implementation is inconvenient.

---

# 3. PROJECT

Build an enterprise ecommerce marketplace supporting:

* customers
* catalog
* products
* variants
* SKUs
* sellers
* seller offers
* pricing
* inventory
* carts
* checkout
* orders
* payments
* fulfillment
* reviews
* search
* media
* notifications
* administration
* analytics
* auditing

This backend phase establishes the foundational platform on which all later commerce functionality will operate.

---

# 4. TECHNOLOGY STACK

Use the following baseline unless the actual repository already establishes a compatible equivalent:

## Backend

* Node.js
* NestJS
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Cache / ephemeral state

* Redis

## Search

* Elasticsearch or OpenSearch

## Object storage

* AWS S3

## CDN

* AWS CloudFront

## Payments

* Stripe

## Background jobs

* BullMQ

## Event streaming

* Kafka or Redpanda where appropriate

## API

* REST
* OpenAPI / Swagger

## Testing

Use the repository's established testing stack where compatible.

---

# 5. FIRST ACTION — REPOSITORY AUDIT

Before writing code, inspect the repository thoroughly.

Determine:

* backend application location
* package manager
* workspace structure
* NestJS version
* TypeScript configuration
* lint configuration
* formatting configuration
* test configuration
* Prisma configuration
* existing schema
* existing migrations
* database modules
* Redis modules
* authentication
* configuration
* environment handling
* logging
* error handling
* API structure
* shared libraries
* Docker configuration
* CI/CD
* existing frontend/mobile contracts

Do not overwrite existing working architecture without justification.

Create a concise implementation assessment before making changes.

Then implement.

---

# 6. BACKEND ARCHITECTURE

Establish a maintainable modular backend.

Use clear boundaries between:

* application
* domain
* infrastructure
* API/interface layers

Use appropriate principles from:

* Clean Architecture
* Domain-Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Dependency Inversion

Do not introduce unnecessary abstractions merely to make the architecture appear complex.

The architecture must remain practical for a production startup.

---

# 7. MODULE STRUCTURE

Establish the foundational NestJS module structure.

At minimum prepare boundaries for:

* Config
* Database
* Redis
* Logging
* Health
* Authentication
* Identity
* Authorization
* Customer

Create additional infrastructure required by the foundation.

Do not fully implement future commerce modules yet unless foundational dependencies require them.

Future modules must be able to integrate without architectural rewrites.

---

# 8. CONFIGURATION SYSTEM

Implement centralized configuration.

Configuration must support:

* application
* environment
* database
* Redis
* authentication
* cryptography
* CORS
* rate limiting
* logging
* storage
* search
* Stripe
* event broker
* queues

Validate configuration at application startup.

Required configuration must fail startup safely when missing or invalid.

Never silently substitute insecure production defaults.

---

# 9. ENVIRONMENT MANAGEMENT

Support at minimum:

* local
* development
* staging
* production

Do not commit:

* passwords
* API keys
* JWT secrets
* Stripe secrets
* AWS credentials
* database credentials
* Redis credentials
* encryption keys

Provide safe environment templates/documentation without exposing real secrets.

---

# 10. DATABASE FOUNDATION

Implement the PostgreSQL/Prisma foundation.

Requirements:

* Prisma integration
* connection management
* graceful shutdown
* migration support
* transaction support
* query logging appropriate for environment
* error normalization
* connection configuration
* health checks

Do not use Prisma as an uncontrolled global singleton.

Ensure the application lifecycle properly initializes and closes database resources.

---

# 11. INITIAL DATABASE DOMAIN

Implement the foundational identity/customer data required by this backend phase.

At minimum establish the actual Prisma models required for:

* User
* Credential
* Session
* Device
* UserRole
* Permission
* CustomerProfile
* Address
* CustomerPreference
* AuditEvent
* IdempotencyRecord where foundational infrastructure requires it

Follow these principles:

* UUID/ULID strategy consistent throughout the system
* UTC timestamps
* appropriate indexes
* explicit relationships
* unique constraints
* foreign keys
* lifecycle fields
* safe deletion behavior
* appropriate database constraints

Do not add speculative fields simply because they might be useful later.

---

# 12. DATABASE DESIGN RULES

PostgreSQL is authoritative.

Use:

* relational constraints
* unique constraints
* foreign keys
* indexes
* transactions
* appropriate isolation
* concurrency protection

Do not depend on application code alone when a business invariant can safely be enforced by the database.

Avoid N+1 queries.

Avoid loading entire tables for operations that can be performed with targeted queries.

---

# 13. DATABASE MIGRATIONS

Create proper Prisma migrations.

Migrations must be:

* deterministic
* reviewable
* safe
* compatible with deployment procedures

Do not manually modify production database structures outside migration strategy.

If the repository already has migrations, inspect them first.

Do not destroy existing data.

---

# 14. AUTHENTICATION ARCHITECTURE

Implement secure authentication foundations.

Support the appropriate authentication flows for the existing repository.

At minimum establish:

* registration
* login
* logout
* session management
* authenticated request handling
* password hashing
* password verification
* session expiration
* session revocation
* device tracking

Use a modern password hashing algorithm such as Argon2id or another appropriately configured password hashing mechanism supported by the repository.

Never store plaintext passwords.

---

# 15. SESSION ARCHITECTURE

Implement server-side session semantics.

A session should support:

* session ID
* user ID
* device association
* creation timestamp
* last activity
* expiration
* revocation
* revocation reason where appropriate

Define secure session behavior.

Ensure revoked sessions cannot authenticate requests.

Avoid storing unnecessary sensitive information.

---

# 16. TOKEN ARCHITECTURE

If the repository uses access/refresh tokens, implement a secure design.

Define:

* short-lived access credentials
* refresh-token rotation where appropriate
* revocation
* expiration
* token family handling where appropriate
* reuse detection where appropriate

Do not store sensitive raw refresh credentials unnecessarily.

Never accept client-provided authorization claims as trusted.

---

# 17. DEVICE MANAGEMENT

Implement device/session association.

Support:

* device identifier
* platform
* application version where appropriate
* last seen
* session relationship
* revocation

Do not use device identifiers as the sole authentication mechanism.

---

# 18. AUTHORIZATION FOUNDATION

Implement server-side authorization.

Establish:

* authentication guards
* authorization guards
* role checks
* permission checks
* ownership checks
* explicit deny behavior

Prepare the system for:

* CUSTOMER
* SELLER
* SELLER_ADMIN
* SUPPORT
* ADMIN
* SUPER_ADMIN

Do not grant administrative access merely because a user is authenticated.

---

# 19. IDENTITY DATA PROTECTION

Protect:

* passwords
* authentication credentials
* session credentials
* reset tokens
* refresh credentials
* sensitive profile information

Do not expose internal authentication fields through API responses.

Ensure serialization explicitly controls exposed fields.

---

# 20. CUSTOMER FOUNDATION

Implement customer profile functionality.

Support:

* retrieving current profile
* updating allowed profile fields
* customer preferences
* account status

Do not allow users to modify protected identity/security fields through generic profile updates.

---

# 21. ADDRESS FOUNDATION

Implement customer addresses.

Support:

* create
* list
* retrieve where appropriate
* update
* delete
* default address selection

Define ownership checks.

A customer must never be able to access or mutate another customer's address.

Validate:

* required fields
* postal code
* country code
* state/region
* city
* address lines
* phone where required

Do not over-restrict international address formats.

---

# 22. ADDRESS SECURITY

Addresses contain personal information.

Implement:

* authorization
* minimal exposure
* audit requirements where appropriate
* logging restrictions

Do not place complete addresses into ordinary application logs.

---

# 23. API FOUNDATION

Implement a consistent REST API foundation.

Establish:

* API prefix/version strategy
* request validation
* response serialization
* exception handling
* request IDs
* correlation IDs
* consistent errors
* OpenAPI documentation

Do not expose internal stack traces.

---

# 24. VALIDATION

Use strong request validation.

Validate:

* body
* route parameters
* query parameters
* pagination
* enums
* IDs
* strings
* numeric limits
* dates

Reject unexpected input where appropriate.

Do not rely exclusively on TypeScript compile-time types for runtime validation.

---

# 25. ERROR SYSTEM

Implement a canonical application error system.

Errors should contain:

* HTTP status
* application error code
* human-readable message
* request ID
* validation details where appropriate
* retryability where appropriate

Establish domain-independent codes for:

* validation
* authentication
* authorization
* not found
* conflict
* rate limit
* dependency failure
* internal failure

Future commerce domains must be able to extend the same structure.

---

# 26. HTTP STATUS RULES

Use HTTP semantics consistently.

Examples:

* `200` successful retrieval/update
* `201` successful creation
* `204` successful deletion where appropriate
* `400` invalid request
* `401` unauthenticated
* `403` unauthorized
* `404` resource not found
* `409` state/uniqueness conflict
* `422` semantic validation failure where appropriate
* `429` rate limited
* `500` unexpected server failure
* `503` unavailable dependency/service where appropriate

Do not misuse `200` for business failures.

---

# 27. PAGINATION FOUNDATION

Implement the canonical pagination mechanism.

Prefer cursor pagination for scalable collections.

Define:

* page size
* maximum page size
* stable ordering
* cursor encoding
* invalid cursor behavior
* next cursor

Do not expose raw database cursor implementation details.

---

# 28. REQUEST CONTEXT

Establish a request context containing, where appropriate:

* request ID
* correlation ID
* authenticated user ID
* session ID
* trace ID
* client metadata

Ensure context propagates into:

* logs
* database operations where appropriate
* events
* jobs
* downstream requests

---

# 29. LOGGING

Implement structured logging.

Logs should support:

* timestamp
* severity
* service
* environment
* request ID
* correlation ID
* trace ID
* operation
* outcome
* duration

Never log:

* passwords
* access tokens
* refresh tokens
* API secrets
* payment secrets
* unnecessary personal data

---

# 30. OBSERVABILITY FOUNDATION

Prepare the backend for distributed observability.

Implement or establish appropriate instrumentation for:

* HTTP
* PostgreSQL
* Redis
* background jobs
* external HTTP calls

Use OpenTelemetry where compatible with the repository.

Establish trace propagation.

Do not add expensive instrumentation blindly to every low-level operation.

Prioritize meaningful business and infrastructure boundaries.

---

# 31. HEALTH CHECKS

Implement health endpoints.

Separate:

### Liveness

Whether the process is alive.

### Readiness

Whether the application can accept traffic.

Readiness should consider required dependencies such as:

* PostgreSQL

Do not make optional dependencies unnecessarily block readiness.

For example, a temporary search outage should not necessarily make the entire authentication API unavailable.

---

# 32. REDIS FOUNDATION

Implement the Redis infrastructure abstraction.

Support:

* connection management
* graceful shutdown
* namespaced keys
* TTL
* basic health checking
* error handling

Define clear ownership for Redis operations.

Redis should support future:

* rate limiting
* caching
* temporary state
* idempotency
* coordination

Do not make Redis the authoritative database for commerce.

---

# 33. REDIS FAILURE BEHAVIOR

Define safe behavior if Redis is unavailable.

Authentication and critical operations must not fail in unexpected ways merely because an optional cache is unavailable.

For every Redis use, explicitly define whether it is:

* required
* optional
* degraded gracefully

Do not hide Redis outages.

Observe and alert on persistent failures.

---

# 34. RATE LIMITING FOUNDATION

Implement reusable rate limiting infrastructure.

Support limits by appropriate dimensions such as:

* IP
* authenticated user
* endpoint
* authentication identity

Prioritize protection for:

* login
* registration
* password recovery
* sensitive account operations

Avoid creating a single global limit that breaks legitimate traffic.

---

# 35. SECURITY HEADERS

Establish secure HTTP defaults.

Consider:

* HSTS in production
* content security policy where appropriate
* frame protection
* MIME sniffing protection
* referrer policy
* secure cookie configuration
* CORS restrictions

Do not enable a security mechanism in a way that breaks required legitimate functionality without understanding its impact.

---

# 36. CORS

Implement explicit CORS configuration.

Do not use unrestricted production origins.

Support configured origins for:

* web application
* development environment
* staging

Do not expose credentials to arbitrary origins.

---

# 37. CSRF

Define and implement the appropriate CSRF protection strategy based on the authentication mechanism.

If browser cookies are used for authentication, ensure state-changing operations cannot be trivially forged.

If bearer credentials are used exclusively for API authorization, document why the selected model provides the required protection.

---

# 38. SECRETS

Centralize secret access.

Secrets must come from:

* environment configuration
* AWS Secrets Manager
* compatible secret-management infrastructure

Do not hardcode production credentials.

Do not commit secret files.

---

# 39. IDEMPOTENCY FOUNDATION

Implement reusable idempotency infrastructure where needed.

Support:

* idempotency key
* authenticated actor scope
* request fingerprint
* stored result
* expiration
* conflict detection

The infrastructure must prevent accidental reuse of one key with a materially different request.

Prepare the abstraction for future:

* checkout
* payments
* refunds
* coupon redemption
* inventory reservations

---

# 40. AUDIT FOUNDATION

Implement the audit infrastructure required by the platform.

Audit events must support:

* actor
* action
* target type
* target ID
* timestamp
* request ID
* outcome
* metadata

Do not store secrets.

Do not put unnecessary personal information into audit metadata.

Sensitive administrative and authentication operations must be auditable.

---

# 41. API DOCUMENTATION

Integrate OpenAPI/Swagger.

Document:

* authentication
* customer endpoints
* address endpoints
* errors
* pagination
* request validation
* response schemas

Keep documentation synchronized with actual implementation.

Do not document endpoints that do not exist.

---

# 42. DATABASE TRANSACTION FOUNDATION

Establish safe transaction patterns.

Use transactions for operations requiring atomicity.

Ensure transaction boundaries are explicit.

Do not hold database transactions open while waiting on slow external services unless there is a compelling and documented reason.

Future checkout/payment implementation must be able to compose transactional operations safely.

---

# 43. EXTERNAL SERVICE BOUNDARY

Create clean infrastructure boundaries for future integrations.

Prepare abstractions for:

* Stripe
* S3
* CloudFront
* search
* email
* push
* event broker

Do not implement fake provider behavior.

If a provider is not yet required in this backend volume, establish only the infrastructure necessary to avoid architectural coupling later.

---

# 44. EVENT FOUNDATION

Establish the domain-event infrastructure required by future backend volumes.

Define and implement where appropriate:

* event envelope type
* event ID generation
* event version
* aggregate metadata
* correlation ID
* causation ID
* trace context
* serialization
* producer abstraction

Do not create dozens of unused event types.

Implement the foundation required for actual current functionality and future integration.

---

# 45. OUTBOX FOUNDATION

Establish the transactional outbox capability.

The design must support:

* event persistence
* transaction association
* unpublished state
* attempts
* publication timestamp
* failure tracking
* retries

If implementation of the complete publisher is appropriate for this repository, implement it.

Otherwise implement the minimum complete infrastructure required by the actual backend architecture, without fake publishing.

---

# 46. BACKGROUND JOB FOUNDATION

Establish BullMQ infrastructure.

Support:

* connection
* queues
* job registration
* retries
* backoff
* concurrency
* graceful shutdown
* structured job logging
* failure handling

Do not create meaningless queues.

Create foundational infrastructure that future domains can safely use.

---

# 47. GRACEFUL SHUTDOWN

Implement graceful application shutdown.

The backend must correctly close:

* HTTP server
* PostgreSQL
* Redis
* queue workers
* event consumers
* external clients

Do not terminate active critical operations abruptly where graceful handling is possible.

---

# 48. SECURITY TESTING

Add tests covering:

* password hashing
* authentication
* session expiration
* session revocation
* unauthorized access
* cross-user access
* role restrictions
* address ownership
* validation
* rate limiting
* malformed input
* error sanitization

Test both success and failure paths.

---

# 49. DATABASE TESTING

Add integration tests for:

* user creation
* unique constraints
* session relationships
* address ownership
* transaction rollback
* cascade/restrict behavior
* audit records
* idempotency records

Tests must run against an appropriate isolated test database.

Never run destructive tests against production.

---

# 50. API TESTING

Test:

* authentication endpoints
* customer endpoints
* address endpoints
* validation failures
* authorization failures
* pagination
* error responses
* rate limiting
* OpenAPI contract behavior where appropriate

Include both happy paths and failure paths.

---

# 51. TYPE SAFETY

Maintain strict TypeScript settings where compatible.

Avoid:

* `any` without justification
* unsafe casts
* hidden runtime assumptions
* duplicated domain types
* inconsistent DTO representations

Runtime validation must complement TypeScript types.

---

# 52. CODE QUALITY

Every implementation must follow the repository's formatting and linting rules.

Use:

* descriptive names
* small focused methods
* explicit dependencies
* clear domain boundaries
* centralized error handling
* reusable infrastructure

Avoid:

* giant services
* giant controllers
* circular dependencies
* duplicated validation
* duplicated database logic
* hidden side effects

---

# 53. TEST / BUILD VALIDATION

Before considering this backend volume complete, run the appropriate:

* dependency installation validation
* type checking
* linting
* unit tests
* integration tests
* API tests
* Prisma validation
* migration validation
* build

Fix actual failures.

Do not suppress errors merely to obtain a green build.

---

# 54. BACKWARD COMPATIBILITY

If the repository already exposes API contracts:

* preserve existing compatible endpoints
* avoid unnecessary breaking changes
* version breaking changes
* document migrations

If existing code conflicts with this implementation, inspect the repository and make the smallest safe correction.

---

# 55. DOCUMENTATION

Update backend documentation with:

* local setup
* required environment variables
* database setup
* migrations
* test commands
* API documentation
* authentication model
* architecture overview
* troubleshooting
* development workflow

Documentation must describe actual implemented behavior.

---

# 56. DO NOT IMPLEMENT FUTURE COMMERCE LOGIC PREMATURELY

Do not fully implement:

* catalog
* seller marketplace
* pricing engine
* inventory engine
* cart
* checkout
* orders
* payment processing
* fulfillment
* reviews
* search

unless the actual repository already contains these features and this prompt requires integration work.

This volume establishes the secure backend foundation needed for those domains.

Do not create fake versions simply to appear complete.

---

# 57. FINAL IMPLEMENTATION REVIEW

Before finishing, verify:

### Repository

* existing implementation inspected
* no unnecessary rewrites
* no duplicate architecture

### Database

* migrations valid
* constraints valid
* indexes appropriate
* transactions correct

### Authentication

* passwords securely hashed
* sessions secure
* revocation works
* credentials are never exposed

### Authorization

* authenticated vs authorized distinction enforced
* ownership checks work
* role checks work

### Security

* validation enabled
* rate limits enabled where required
* CORS controlled
* secrets protected
* sensitive logs prevented

### API

* errors standardized
* pagination consistent
* request IDs available
* OpenAPI accurate

### Infrastructure

* PostgreSQL lifecycle correct
* Redis lifecycle correct
* queues lifecycle correct
* graceful shutdown implemented

### Testing

* tests actually execute
* failure paths covered
* build succeeds

---

# 58. FINAL OUTPUT REQUIREMENT

At the end of the implementation, report:

1. repository state discovered
2. existing implementation reused
3. files created
4. files modified
5. database changes
6. API endpoints implemented
7. authentication functionality
8. authorization functionality
9. infrastructure implemented
10. tests added
11. validation commands executed
12. validation results
13. remaining work for later backend phases
14. any architectural conflicts discovered
15. any decisions that require future implementation attention

Do not claim functionality is complete unless it exists in the repository.

Do not claim tests pass unless they were actually executed.

Do not claim deployment readiness unless it was actually validated.

---

# 59. ENGINEERING STANDARD

Everything implemented in this phase must be:

* production-oriented
* secure
* testable
* maintainable
* observable
* scalable
* compatible with future commerce domains
* consistent with the repository

The backend must be designed so later implementation can safely add:

**catalog → sellers → pricing → inventory → cart → checkout → payments → orders → fulfillment → reviews → search → notifications → administration → analytics**

without replacing the foundational architecture.

---

# 60. FINAL INSTRUCTION

Inspect the actual repository first.

Then implement this backend foundation completely.

Do not ask the user to manually create files that you can create yourself.

Do not provide pseudocode instead of implementation.

Do not stop at an architectural explanation.

Make the actual repository changes.

Run validation.

Fix errors you encounter.

Finish with a factual implementation report based only on the repository state you actually inspected and modifie

You are operating in Senior Engineering Team Mode.

Build the production-ready backend foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, domain boundaries, database ownership, API contracts, payment architecture, inventory architecture, seller architecture, event architecture, and security model.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

This volume establishes the backend foundation and shared platform infrastructure.

────────────────────────────────────────

MISSION

Build the production-ready backend foundation required for the ecommerce marketplace.

The backend will eventually support:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Seller payouts
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• Moderation
• CMS
• Multi-region deployment

This volume establishes the shared backend foundation required by all later backend domains.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Search:

• Elasticsearch or OpenSearch

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Object Storage:

• AWS S3-compatible object storage

Background Jobs:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

API:

• REST
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

Documentation:

• OpenAPI / Swagger

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools where appropriate

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

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Keep controllers thin.

Keep business logic out of controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use graceful shutdown.

Use production-safe configuration.

────────────────────────────────────────

BACKEND ARCHITECTURE

Use:

• Clean Architecture
• Domain-Driven Design
• SOLID
• Repository Pattern
• Service Layer
• Dependency Injection
• Feature-first organization
• Explicit domain boundaries
• CQRS where justified
• Event-driven architecture where appropriate
• Transactional Outbox where appropriate
• Idempotent consumers

The architecture must allow future extraction of independently deployable services without requiring a complete rewrite.

────────────────────────────────────────

MONOREPO FOUNDATION

Create the production-ready backend structure.

Support appropriate areas for:

apps/

• API Gateway

workers/

• Background workers
• Scheduled workers
• Event consumers

packages/

• Configuration
• Logging
• Error handling
• Validation
• Database
• Redis
• Events
• Queues
• Observability
• API contracts
• Shared types
• Testing utilities

services/

Create service boundaries only when the approved architecture requires them.

Do not create unnecessary empty services.

────────────────────────────────────────

APPLICATION BOOTSTRAP

Implement the NestJS application foundation.

Support:

• Application initialization
• Environment loading
• Configuration initialization
• Global validation
• Global exception handling
• Structured logging
• Request IDs
• Correlation IDs
• Secure headers
• CORS
• Request size limits
• API versioning
• Graceful shutdown
• Health endpoints

Use production-safe defaults.

────────────────────────────────────────

CONFIGURATION

Implement centralized strongly typed configuration.

Support:

Application:

• Environment
• Service name
• Version
• Host
• Port

PostgreSQL:

• Host
• Port
• Database
• Username
• Password
• SSL/TLS
• Connection pool

Redis:

• Host
• Port
• Username
• Password
• TLS

Kafka/Redpanda:

• Brokers
• Client ID
• Authentication
• TLS
• Consumer groups

BullMQ:

• Redis connection
• Queue defaults
• Retry defaults

Stripe:

• API configuration
• Webhook configuration

S3:

• Region
• Bucket
• Endpoint where required

Elasticsearch/OpenSearch:

• Endpoint
• Authentication
• TLS

Observability:

• Log level
• OpenTelemetry endpoint
• Metrics configuration

Never hard-code secrets.

Never access environment variables directly throughout business modules.

Validate configuration during startup.

Fail fast when required configuration is invalid.

────────────────────────────────────────

REQUEST CONTEXT

Implement request-context infrastructure supporting:

• Request ID
• Correlation ID
• Trace ID where available
• Service name
• User ID when authenticated
• Seller ID when authenticated as a seller

Propagate request context to:

• Logs
• Metrics
• Traces
• Domain events
• Kafka events
• Background jobs
• External provider calls

────────────────────────────────────────

LOGGING

Implement structured JSON logging.

Log appropriate:

• Timestamp
• Service
• Environment
• Level
• Request ID
• Correlation ID
• Trace ID
• Operation
• Duration
• Result
• Safe error details

Never log:

• Passwords
• Access tokens
• Refresh tokens
• Payment secrets
• Stripe secrets
• Database passwords
• Private keys
• Sensitive customer information unnecessarily

────────────────────────────────────────

ERROR HANDLING

Implement centralized error handling.

Define consistent errors for:

• Validation
• Authentication
• Authorization
• Not found
• Conflict
• Rate limit
• Dependency failure
• Payment provider failure
• Inventory conflict
• External-provider failure
• Infrastructure failure
• Internal failure

Use a consistent API error format containing:

• Error code
• Safe public message
• Request ID
• Correlation ID where appropriate
• Validation details where appropriate

Never expose internal stack traces in production.

────────────────────────────────────────

VALIDATION

Implement centralized validation for:

• Request body
• Query parameters
• Path parameters
• Headers where required
• Configuration
• Event payloads
• Queue payloads
• Webhook payloads

Reject invalid input before business logic executes.

Use strict schemas.

────────────────────────────────────────

SECURITY FOUNDATION

Implement:

• Secure headers
• CORS
• Rate limiting foundation
• Input validation
• Secure cookie architecture where applicable
• Authentication guard foundation
• Authorization guard foundation
• RBAC foundation
• Permission foundation
• Secrets handling
• Audit hooks

Never trust frontend authorization.

Never store plaintext passwords.

Never store production secrets in source control.

────────────────────────────────────────

API FOUNDATION

Implement the REST API foundation.

Support:

• API versioning
• Request validation
• Response conventions
• Error conventions
• Cursor pagination
• Pagination helpers
• Filtering conventions
• Sorting conventions
• Correlation IDs
• Authentication guards
• Authorization guards
• Rate limiting
• OpenAPI / Swagger

Implement reusable infrastructure for:

• Idempotency
• Request cancellation
• Timeouts
• Safe retries

Do not implement all business endpoints yet.

────────────────────────────────────────

DATABASE FOUNDATION

Implement PostgreSQL integration using Prisma.

Create:

• Prisma configuration
• Database module
• Prisma service
• Connection lifecycle
• Graceful shutdown
• Health checks
• Transaction support
• Query logging
• Migration structure

Define conventions for:

• IDs
• Created timestamps
• Updated timestamps
• Soft deletion
• Optimistic concurrency
• Foreign keys
• Constraints
• Indexes
• Monetary fields
• Decimal precision

Use exact decimal types for monetary values.

Do not use floating-point values for money.

Do not create the entire ecommerce schema in this volume.

Only create structures required by the foundation.

────────────────────────────────────────

PRISMA FOUNDATION

Implement:

• Schema organization
• Client lifecycle
• Migration workflow
• Transaction helpers
• Error translation
• Query logging
• Connection pooling
• Repository boundaries

Prepare support for domain-owned schemas or service-specific Prisma clients where required.

Prevent unrestricted direct database access from unrelated modules.

────────────────────────────────────────

REDIS FOUNDATION

Implement Redis infrastructure.

Support:

• Connection management
• Health checks
• Graceful shutdown
• Namespaced keys
• Serialization
• TTL
• Cache abstraction
• Distributed lock abstraction
• Idempotency support

Define conventions for:

• Key naming
• TTL
• Serialization
• Invalidations
• Error behavior

Redis must never become authoritative for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

KAFKA / REDPANDA FOUNDATION

Implement reusable event infrastructure.

Support:

• Producer connection
• Consumer connection
• Topic configuration
• Consumer groups
• Serialization
• Event metadata
• Event IDs
• Event versioning
• Correlation IDs
• Retry handling
• Dead-letter handling
• Graceful shutdown

Define an event envelope containing:

• Event ID
• Event type
• Event version
• Aggregate ID
• Timestamp
• Correlation ID
• Causation ID where appropriate
• Producer
• Payload

Do not implement the complete ecommerce event catalog yet.

────────────────────────────────────────

TRANSACTIONAL OUTBOX

Implement reusable transactional outbox infrastructure.

Define:

• Outbox ID
• Event type
• Event version
• Aggregate type
• Aggregate ID
• Payload
• Status
• Retry count
• Next retry timestamp
• Published timestamp
• Error information
• Created timestamp

Define how business transactions and event publication remain consistent.

Prevent event loss when:

• Database transaction succeeds
• Event publication fails

Implement safe retry and processing behavior.

────────────────────────────────────────

BULLMQ FOUNDATION

Implement background job infrastructure.

Support:

• Queue registration
• Queue configuration
• Producers
• Workers
• Job IDs
• Retry
• Exponential backoff
• Timeout
• Concurrency
• Failure handling
• Dead-letter behavior
• Graceful shutdown
• Queue metrics

Prepare reusable infrastructure for later:

• Payment jobs
• Search indexing
• Media processing
• Inventory jobs
• Notifications
• Reports
• Cleanup

Do not implement complete business jobs in this volume.

────────────────────────────────────────

HEALTH CHECKS

Implement:

• Liveness
• Readiness
• Startup checks where appropriate

Support dependency checks for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• BullMQ infrastructure
• Elasticsearch/OpenSearch where required

Differentiate:

• Application alive
• Application ready

Do not automatically restart the service indefinitely because a recoverable dependency is temporarily unavailable.

────────────────────────────────────────

GRACEFUL SHUTDOWN

Implement graceful shutdown for:

• HTTP server
• NestJS modules
• PostgreSQL
• Redis
• Kafka producers
• Kafka consumers
• BullMQ workers

Define safe shutdown ordering.

Stop accepting new work before terminating dependencies.

Allow in-flight operations to complete or fail safely.

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Implement:

• Structured logging
• Metrics
• OpenTelemetry tracing
• Correlation IDs
• Request duration metrics
• Error metrics
• Database metrics
• Redis metrics
• Kafka metrics
• Queue metrics
• Health metrics

Use:

• OpenTelemetry
• Prometheus-compatible metrics
• Grafana-compatible dashboards

Define reusable observability utilities.

────────────────────────────────────────

TESTING FOUNDATION

Implement:

• Unit testing
• Integration testing
• API testing
• Database testing
• Redis testing
• Kafka testing
• BullMQ testing
• Configuration testing
• Health-check testing

Configure:

• Jest
• Test environment
• Test database strategy
• Factories
• Fixtures
• Test helpers
• Coverage reporting

Tests must be deterministic.

────────────────────────────────────────

LOCAL DEVELOPMENT

Provide local development infrastructure for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where required

Use Docker Compose where appropriate.

The local stack must be sufficient for backend development without requiring AWS for every operation.

Do not create production Kubernetes infrastructure in this volume.

Do not create Terraform infrastructure in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate backend foundation documentation for:

• Backend structure
• Local development
• Environment variables
• Database workflow
• Prisma workflow
• Redis conventions
• Kafka conventions
• BullMQ conventions
• Logging conventions
• Error conventions
• API conventions
• Observability conventions
• Testing workflow

Documentation must reflect the actual generated implementation.

────────────────────────────────────────

PROJECT INDEX

Maintain the backend Project Index.

Track:

• Current milestone
• Generated files
• Modified files
• Backend modules
• Database objects
• Shared packages
• API infrastructure
• Redis infrastructure
• Kafka infrastructure
• BullMQ infrastructure
• Observability
• Testing
• Remaining work
• Dependencies
• Next milestone

Do not claim functionality that has not been implemented.

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Monorepo/backend structure and application bootstrap.

BACKEND MILESTONE 2

Configuration, request context, logging, errors, validation, security foundation, and API foundation.

BACKEND MILESTONE 3

PostgreSQL and Prisma foundation.

BACKEND MILESTONE 4

Redis foundation.

BACKEND MILESTONE 5

Kafka/Redpanda and event infrastructure.

BACKEND MILESTONE 6

BullMQ and background-job infrastructure.

BACKEND MILESTONE 7

Transactional outbox.

BACKEND MILESTONE 8

Health checks, graceful shutdown, and observability.

BACKEND MILESTONE 9

Testing infrastructure and integration test foundation.

BACKEND MILESTONE 10

Local development, documentation, and Project Index.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

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

This volume covers only:

• Backend foundation
• Configuration
• Security foundation
• API foundation
• PostgreSQL
• Prisma
• Redis
• Kafka/Redpanda
• BullMQ
• Transactional outbox
• Observability
• Health checks
• Testing foundation
• Local development
• Backend documentation

Do not implement complete:

• Identity
• Customer accounts
• Seller onboarding
• Catalog
• Products
• Pricing
• Promotions
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• CMS
• Moderation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat this backend foundation as critical infrastructure for a globally distributed ecommerce marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Multi-region deployment
• High availability
• Zero-downtime deployment
• Strict security requirements

Prioritize:

• Correctness
• Reliability
• Security
• Observability
• Scalability
• Testability
• Maintainability
• Clear ownership
• Future service extraction
• Production readine

Using the approved Architecture Blueprint and the Master Prompt above:

Begin backend implementation ONLY.

Do NOT generate frontend code.

Do NOT generate mobile code.

Do NOT generate infrastructure code unless required for backend execution.

All implementation must strictly follow the approved Architecture Blueprint.

Never redesign architecture.

Never change API contracts.

Never modify database structure unless explicitly requested.

──────────────────────────────────────

MISSION

Build the complete production-ready backend for the enterprise ecommerce marketplace.

The backend must be scalable, secure, modular, cloud-native, observable and production-ready.

Every implementation must compile successfully before continuing.

Generate code incrementally following the Master Prompt milestone strategy.

──────────────────────────────────────

TECH STACK

Language

- TypeScript

Framework

- NestJS

Runtime

- Node.js

Database

- PostgreSQL
- Prisma ORM

Cache

- Redis

Search

- Elasticsearch

Storage

- AWS S3

Payments

- Stripe

Queue

- BullMQ

Communication

- REST API
- Webhooks
- Server-Sent Events (where appropriate)

Documentation

- OpenAPI / Swagger

──────────────────────────────────────

ARCHITECTURE

Follow:

- Clean Architecture
- Domain Driven Design
- SOLID
- Repository Pattern
- Service Layer
- Dependency Injection
- CQRS where appropriate
- Event-Driven Architecture
- Feature-first organization

Never violate architectural boundaries.

──────────────────────────────────────

IMPLEMENT THE FOLLOWING DOMAINS

Identity

Authentication

Authorization

Users

Profiles

Addresses

Seller Management

Catalog

Categories

Brands

Products

Variants

Media

Inventory

Warehouses

Pricing

Coupons

Promotions

Shopping Cart

Wishlist

Checkout

Orders

Payments

Refunds

Returns

Shipping

Reviews

Ratings

Recommendations

Search

Notifications

Messaging

Analytics

CMS

Administration

Audit

Feature Flags

System Configuration

──────────────────────────────────────

AUTHENTICATION

Implement:

- Registration
- Login
- Logout
- Email Verification
- Password Reset
- Refresh Tokens
- JWT
- MFA-ready architecture
- Google OAuth architecture
- Apple OAuth architecture
- Session Management
- Device Management
- Token Revocation

──────────────────────────────────────

AUTHORIZATION

Implement complete RBAC.

Support:

Guest

Customer

Seller

Seller Staff

Moderator

Support

Administrator

Super Administrator

System Services

Generate permission guards.

Policy system.

Permission decorators.

──────────────────────────────────────

DATABASE

Generate:

Prisma Schema

Prisma Modules

Repositories

Migrations

Indexes

Constraints

Optimized Queries

Transactions

Read Models

Database Seeders

──────────────────────────────────────

API

Generate production-ready REST APIs.

Every endpoint must include:

Validation

Authentication

Authorization

OpenAPI Documentation

Rate Limiting

Pagination

Filtering

Sorting

Cursor Pagination

Consistent Error Responses

Idempotency

Request Validation

Response DTOs

──────────────────────────────────────

SEARCH

Implement Elasticsearch.

Generate:

Indexes

Mappings

Autocomplete

Faceted Search

Synonyms

Search Ranking

Product Search

Category Search

Seller Search

Recommendation Search

Search Analytics

──────────────────────────────────────

MEDIA

Implement:

AWS S3 Uploads

Image Optimization

Multiple Image Sizes

File Validation

Signed URLs

Media Metadata

Media Cleanup

──────────────────────────────────────

PAYMENTS

Implement Stripe.

Support:

Payment Intents

Checkout

Marketplace Payments

Seller Payouts

Refunds

Partial Refunds

Webhook Processing

Idempotency

Payment Recovery

──────────────────────────────────────

CHECKOUT

Implement:

Shopping Cart

Coupons

Taxes

Shipping Calculation

Payment Authorization

Order Creation

Inventory Reservation

Order Confirmation

Receipt Generation

──────────────────────────────────────

INVENTORY

Support:

Warehouse Inventory

Reservations

Stock Transfers

Low Stock Alerts

Purchase Orders

Inventory History

Inventory Adjustments

──────────────────────────────────────

ORDERS

Implement:

Order Creation

Order Updates

Order Tracking

Split Orders

Partial Fulfillment

Returns

Exchanges

Refunds

Invoices

Timeline Events

──────────────────────────────────────

REVIEWS

Support:

Verified Reviews

Ratings

Images

Seller Responses

Reports

Moderation

──────────────────────────────────────

NOTIFICATIONS

Generate services for:

Email

Push

In-App

SMS-ready architecture

Queue-based processing

Retry Policies

──────────────────────────────────────

MESSAGING

Implement:

Customer ↔ Seller Conversations

Attachments

Message History

Unread Counts

Read Receipts

──────────────────────────────────────

ANALYTICS

Generate services for:

Sales Analytics

Product Analytics

Customer Analytics

Seller Analytics

Inventory Analytics

Revenue Analytics

Operational Metrics

──────────────────────────────────────

BACKGROUND JOBS

Implement BullMQ workers for:

Emails

Notifications

Search Indexing

Recommendation Updates

Image Processing

Media Cleanup

Inventory Synchronization

Coupon Expiration

Analytics Aggregation

Report Generation

Cache Invalidation

Scheduled Maintenance

──────────────────────────────────────

EVENT BUS

Generate complete event-driven architecture.

Implement events including:

UserRegistered

SellerApproved

ProductCreated

ProductUpdated

InventoryChanged

CouponCreated

OrderCreated

OrderPaid

PaymentSucceeded

ShipmentCreated

RefundIssued

ReviewCreated

NotificationQueued

SearchIndexed

AnalyticsUpdated

Define publishers and subscribers.

──────────────────────────────────────

CACHE

Implement Redis for:

Sessions

Product Cache

Category Cache

Checkout Cache

Recommendation Cache

Rate Limiting

Distributed Locks

Search Cache

──────────────────────────────────────

SECURITY

Implement:

JWT

Refresh Tokens

RBAC

Rate Limiting

Secure Headers

Input Validation

SQL Injection Protection

XSS Protection

CSRF Protection (where applicable)

Secrets Management

Audit Logging

Encryption at Rest

Encryption in Transit

OWASP Top 10 Compliance

──────────────────────────────────────

OBSERVABILITY

Generate:

Structured Logging

Metrics

Tracing

Health Checks

Readiness Checks

Liveness Checks

Error Monitoring

Performance Monitoring

──────────────────────────────────────

RESILIENCY

Implement:

Retry Policies

Timeouts

Circuit Breakers

Graceful Shutdown

Dead Letter Queues

Failure Recovery

Idempotency

──────────────────────────────────────

TESTING

Generate:

Unit Tests

Integration Tests

API Contract Tests

Performance Tests

Security Tests

Repository Tests

Service Tests

Controller Tests

──────────────────────────────────────

PROJECT ORGANIZATION

Maintain throughout development:

Current Milestone

Generated Files

Completed Modules

Remaining Modules

Dependencies

Database Objects

API Endpoints

Background Jobs

Events

──────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never omit implementations.

Never generate pseudo-code.

Never generate placeholders.

Never truncate files.

Never regenerate unchanged files.

Only modify files when required.

──────────────────────────────────────

STOP CONDITIONS

Generate backend incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

- Verify the backend compiles.
- Update the project index.
- List completed modules.
- Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
