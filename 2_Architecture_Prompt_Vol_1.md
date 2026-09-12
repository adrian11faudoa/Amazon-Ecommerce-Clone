# AMAZON ECOMMERCE PLATFORM — ARCHITECTURE VOLUME 1

## ROLE

You are operating as the senior architecture organization responsible for defining the production architecture of a global, multi-seller ecommerce marketplace.

Operate as:

* Principal Software Architect
* Staff Backend Architect
* Staff Frontend Architect
* Staff Mobile Architect
* Database Architect
* Cloud Architect
* Security Architect
* Distributed Systems Architect
* Site Reliability Architect
* Data and Search Architect

Do not behave as a programming tutor.

Do not implement the application in this prompt.

Your responsibility is to inspect the repository, determine its actual current state, and create or refine the project's architectural blueprint and architecture documentation required to guide implementation.

The architecture must be sufficiently precise that independent engineering teams can implement backend, web, mobile, and infrastructure components without inventing incompatible contracts.

---

# PROJECT

Define the architecture for a production-grade global ecommerce marketplace comparable in breadth to Amazon Marketplace.

The platform must support:

* Millions of customers
* Thousands or more marketplace sellers
* Millions of products
* Large numbers of product variants
* High-volume search
* High-volume checkout
* High-volume order processing
* Seller-managed inventory
* Payments and refunds
* Returns
* Fulfillment
* Reviews
* Promotions
* Notifications
* Seller payouts
* Administrative operations
* Product media
* Search indexing
* Background processing
* Auditability
* Operational analytics

The architecture must support substantial traffic growth without requiring fundamental redesign.

The system must distinguish between authoritative transactional data and derived, cached, indexed, or asynchronously processed data.

---

# TECHNOLOGY DIRECTION

The architecture must use the following technology direction unless repository constraints require a technically justified compatible variation.

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
* Recharts where appropriate
* Framer Motion where appropriate

## Mobile

* React Native
* Expo
* TypeScript
* React Navigation or an equivalent architecture-compatible navigation solution
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
* Elasticsearch or OpenSearch
* BullMQ
* REST
* Webhooks
* Server-Sent Events and/or WebSockets where justified
* Swagger/OpenAPI

## Storage and Delivery

* Amazon S3 or compatible object-storage abstraction
* CloudFront or compatible CDN abstraction

## Payments

* Stripe or a payment-provider abstraction

## Infrastructure

* Docker
* Kubernetes where appropriate
* Infrastructure as Code
* CI/CD
* Managed PostgreSQL
* Redis
* Search infrastructure
* Object storage
* CDN
* Centralized observability

The architecture must remain deployable locally and in production.

---

# SOURCE OF TRUTH

Before making architectural decisions, inspect the repository.

Determine:

* Existing repository structure
* Applications
* Packages
* Backend modules
* Frontend modules
* Mobile modules
* Database schema
* Prisma configuration
* Existing migrations
* Existing APIs
* Existing authentication
* Existing authorization
* Existing infrastructure
* Existing CI/CD
* Existing tests
* Existing environment configuration
* Existing documentation

The repository is authoritative for implementation state.

This architecture document is authoritative for the architectural decisions it explicitly defines.

Do not assume that functionality exists merely because this document requires it.

Do not unnecessarily replace compatible architecture already present in the repository.

When existing implementation conflicts with the required production architecture, document the conflict and define the migration or compatibility strategy rather than silently creating contradictory systems.

---

# ARCHITECTURAL MISSION

Create one coherent architecture covering:

* Customer experiences
* Seller experiences
* Administrative experiences
* Web clients
* Mobile clients
* Backend applications
* Databases
* Search
* Caching
* Background processing
* Events
* Media
* Payments
* Notifications
* Analytics
* Security
* Observability
* Deployment
* Disaster recovery

The architecture must explicitly define ownership and communication boundaries.

Avoid architectural ambiguity.

Avoid unnecessary microservices.

Use modular boundaries first and separate deployable services only where scale, isolation, reliability, security, or operational requirements justify them.

---

# ARCHITECTURE PRINCIPLES

The system must follow these principles:

* Domain ownership must be explicit.
* Transactional data must have one authoritative owner.
* Derived data must be reconstructable.
* Search indexes must not become transactional sources of truth.
* Caches must be disposable.
* Critical workflows must be transactionally safe.
* External integrations must be isolated behind clear interfaces.
* Asynchronous work must be observable and retryable.
* Event consumers must tolerate duplicates.
* APIs must be versionable.
* Authorization must be enforced server-side.
* Client applications must not own authoritative business rules.
* Failure behavior must be explicitly designed.
* Security must be part of architecture rather than an afterthought.
* Observability must cross application and infrastructure boundaries.
* Architecture must support horizontal scaling.
* Architecture must permit incremental implementation.

---

# SYSTEM CONTEXT

Define the major system actors and boundaries.

At minimum include:

### Customer

Interacts through:

* Web application
* Mobile application

Capabilities include:

* Discovery
* Search
* Product browsing
* Cart
* Checkout
* Payment
* Orders
* Reviews
* Account management
* Notifications

### Seller

Interacts through:

* Seller web experience
* Seller APIs where appropriate

Capabilities include:

* Seller onboarding
* Catalog management
* Product management
* Inventory
* Pricing
* Orders
* Fulfillment
* Returns
* Promotions
* Analytics
* Payouts

### Administrator

Interacts through:

* Administrative web experience
* Operational tooling

Capabilities include:

* User management
* Seller management
* Catalog moderation
* Orders
* Payments
* Refunds
* Disputes
* Promotions
* Security
* Audit
* Platform configuration

### External Systems

Architect explicit integration boundaries for:

* Payment provider
* Email provider
* Push notification providers
* Object storage
* CDN
* Search engine
* Maps/shipping providers where required
* Tax providers where required
* Fraud/risk providers where required

External providers must not leak provider-specific assumptions throughout the domain layer.

---

# APPLICATION ARCHITECTURE

Define the logical application structure.

At minimum, establish boundaries for:

* Identity and authentication
* Customer accounts
* Seller accounts
* Catalog
* Inventory
* Pricing
* Cart
* Checkout
* Orders
* Payments
* Returns
* Fulfillment
* Promotions
* Reviews
* Search
* Notifications
* Media
* Payouts
* Disputes
* Administration
* Audit
* Analytics

Each domain definition must specify:

* Responsibility
* Owned data
* Public interfaces
* Dependencies
* Events produced
* Events consumed
* Synchronous dependencies
* Asynchronous dependencies
* Security boundary
* Failure considerations

Do not allow domains to directly manipulate another domain's private persistence structures.

---

# DOMAIN OWNERSHIP

Establish explicit data ownership.

At minimum:

### Identity

Owns:

* Credentials
* Authentication state
* Sessions/tokens where applicable
* Account verification
* Security events

### Customer

Owns:

* Customer profile
* Customer preferences
* Customer addresses
* Customer-specific settings

### Seller

Owns:

* Seller identity
* Seller onboarding state
* Seller configuration
* Seller users
* Seller permissions

### Catalog

Owns:

* Products
* Product variants
* Categories
* Brands
* Attributes
* Product relationships
* Product status

### Inventory

Owns:

* Inventory quantities
* Reservations
* Availability
* Inventory adjustments
* Inventory movements

### Pricing

Owns:

* Base prices
* Seller prices
* Price schedules
* Pricing rules where applicable

### Cart

Owns:

* Active cart state
* Cart items
* Cart lifecycle

### Order

Owns:

* Orders
* Order items
* Order status
* Order lifecycle
* Customer order history

### Payment

Owns:

* Payment records
* Payment states
* Provider references
* Refund records
* Reconciliation state

### Fulfillment

Owns:

* Fulfillment state
* Shipment records
* Tracking information
* Delivery lifecycle

### Returns

Owns:

* Return requests
* Return authorization
* Return lifecycle
* Refund coordination

### Reviews

Owns:

* Reviews
* Ratings
* Review moderation state

### Promotion

Owns:

* Coupons
* Discounts
* Promotional campaigns
* Eligibility rules

### Search

Owns derived search indexes rather than authoritative product or order data.

### Notification

Owns:

* Notification preferences
* Notification delivery state
* Notification attempts

### Administration

Owns administrative configuration and operational workflows without becoming the owner of unrelated domain data.

---

# CLIENT ARCHITECTURE

Define a shared client architecture for:

* Customer web
* Seller web
* Administrative web
* Customer mobile
* Seller mobile if included in the repository's product direction

Clients must separate:

* Presentation
* Local UI state
* Server state
* API communication
* Authentication state
* Domain-specific UI workflows

TanStack Query must be treated as server-state infrastructure rather than a replacement for every form of local state.

Zustand must be used selectively for client-owned state.

Forms must use schema-based validation.

Clients must never treat client-side validation as a security boundary.

---

# API ARCHITECTURE

Define a REST-first API architecture.

The architecture must specify:

* API versioning
* Resource naming
* Request validation
* Response envelopes where appropriate
* Error format
* Pagination strategy
* Filtering
* Sorting
* Search endpoints
* Authentication
* Authorization
* Rate limiting
* Idempotency
* Conditional requests where useful
* OpenAPI generation
* Deprecation strategy

Use cursor pagination for high-volume collections where appropriate.

Do not expose internal database schemas as API contracts.

API contracts must represent business resources and operations.

---

# AUTHENTICATION ARCHITECTURE

Define secure authentication flows for:

* Customer accounts
* Seller users
* Administrators

Address:

* Registration
* Login
* Logout
* Refresh
* Token/session expiration
* Credential rotation
* Password reset
* Email verification
* Account recovery
* Device/session management
* Suspicious activity
* Rate limiting
* Multi-factor authentication where required

Authentication and authorization must remain separate concerns.

---

# AUTHORIZATION ARCHITECTURE

Define authorization boundaries for:

* Customers
* Sellers
* Seller users
* Seller administrators
* Platform administrators
* Support/operations users

Authorization must account for both:

* Role permissions
* Resource ownership

Examples include:

* A customer can access only their own orders.
* A seller can access only resources belonging to that seller.
* Seller administrators can access only permissions granted to their seller account.
* Platform administrators require explicit privileged permissions.

Authorization decisions must occur on trusted server-side boundaries.

---

# DATABASE ARCHITECTURE

PostgreSQL is the primary transactional database.

Define:

* Schema ownership
* Relational boundaries
* Primary-key strategy
* Foreign-key strategy
* Unique constraints
* Indexing strategy
* Soft deletion policy where justified
* Audit strategy
* Migration strategy
* Transaction boundaries
* Isolation requirements
* Concurrency strategy
* Data-retention strategy

Do not use soft deletion universally.

Use it only when historical preservation or business requirements justify it.

Financial records and audit records must have appropriate immutability expectations.

---

# TRANSACTIONAL WORKFLOWS

Explicitly architect transaction boundaries for critical operations.

At minimum address:

### Checkout

The architecture must define how the system coordinates:

* Cart validation
* Product availability
* Price validation
* Promotion validation
* Inventory reservation
* Order creation
* Payment initialization
* Failure rollback or compensation

### Inventory

Define:

* Reservation
* Release
* Deduction
* Adjustment
* Concurrent purchase handling
* Duplicate request handling

### Payment

Define:

* Payment intent creation
* Confirmation
* Webhook processing
* Payment state transitions
* Refunds
* Reconciliation
* Provider failures

### Orders

Define:

* Order creation
* State transitions
* Cancellation
* Fulfillment progression
* Return coordination
* Refund coordination

Never assume external payment or shipping systems participate in the same database transaction.

Use explicit state machines and compensating workflows where required.

---

# EVENT ARCHITECTURE

Define an event-driven architecture for workflows that should not remain synchronously coupled.

Events must include appropriate metadata such as:

* Event ID
* Event type
* Version
* Entity ID
* Timestamp
* Correlation ID
* Trace information
* Producer

Architect events for operations such as:

* Product created
* Product updated
* Inventory changed
* Order created
* Payment completed
* Payment failed
* Order fulfilled
* Return requested
* Refund completed
* Seller onboarded
* Review created
* Notification requested

Critical database-to-event workflows should use a transactional outbox pattern where appropriate.

Do not require every operation to become an event.

Synchronous APIs should remain appropriate for request/response interactions requiring immediate results.

---

# SEARCH ARCHITECTURE

Search infrastructure must be treated as derived data.

Define:

* Index structure
* Document mapping
* Product indexing
* Variant representation
* Category indexing
* Seller filtering
* Price filtering
* Availability filtering
* Rating filtering
* Faceting
* Sorting
* Relevance
* Autocomplete
* Index versioning
* Reindexing
* Failure recovery

Product changes must eventually propagate to search.

Search indexing failures must not corrupt the authoritative product catalog.

Define strategies for:

* Initial indexing
* Incremental indexing
* Full reindex
* Failed indexing
* Duplicate indexing events
* Schema changes

---

# CACHE ARCHITECTURE

Define cache boundaries and policies.

Potential cache targets include:

* Product details
* Category data
* Seller metadata
* Configuration
* Search-related metadata
* Frequently accessed read models
* Rate-limit counters

Every cache definition must specify:

* Key format
* TTL
* Invalidation
* Consistency expectations
* Failure behavior
* Maximum acceptable staleness

Do not cache data whose stale state could create unacceptable financial or authorization errors.

---

# MEDIA ARCHITECTURE

Define secure product-media architecture using object storage and CDN delivery.

The architecture must include:

* Upload authorization
* Signed upload URLs
* File validation
* Size limits
* MIME validation
* Image processing
* Thumbnail generation
* Multiple image variants
* Object naming
* Access control
* CDN delivery
* Lifecycle management
* Cleanup
* Retry behavior

Original uploads and derived assets must have clear lifecycle ownership.

---

# PAYMENT ARCHITECTURE

Define a provider-independent payment boundary around Stripe or the selected provider.

The architecture must isolate:

* Payment intents
* Provider references
* Payment state
* Webhook events
* Refunds
* Reconciliation

Use idempotency for operations that can be retried.

Webhook authenticity must be verified.

Provider events must not be trusted merely because they arrive at a public endpoint.

Payment state transitions must be modeled explicitly.

---

# NOTIFICATION ARCHITECTURE

Define notification channels for:

* Email
* Push
* In-app notifications
* SMS where required

The notification system must support:

* Preferences
* Templates
* Localization readiness
* Delivery attempts
* Retries
* Provider failures
* Deduplication where appropriate
* Observability

Notification delivery must not unnecessarily block core transactional operations.

---

# SECURITY ARCHITECTURE

Define security boundaries for:

* Public APIs
* Customer APIs
* Seller APIs
* Administrative APIs
* Webhooks
* Upload endpoints
* Internal service communication
* Background workers
* Database access
* Object storage
* Search infrastructure

Address:

* Least privilege
* Secret management
* Encryption in transit
* Encryption at rest
* Rate limiting
* Abuse prevention
* Audit logging
* Security event monitoring
* Webhook verification
* Upload security
* Authorization isolation

---

# OBSERVABILITY ARCHITECTURE

Define a unified observability model.

The architecture must establish:

* Structured logs
* Metrics
* Distributed traces
* Correlation IDs
* Request IDs
* Business metrics
* Error metrics
* Queue metrics
* Search metrics
* Payment metrics
* Database metrics
* Cache metrics

Critical workflows must be traceable across:

Client → API → Database/Cache → Queue/Event → Worker → External Provider

Sensitive data must never be unnecessarily included in telemetry.

---

# FAILURE AND RESILIENCE ARCHITECTURE

For every major dependency, define expected failure behavior.

Consider:

* PostgreSQL unavailable
* Redis unavailable
* Search unavailable
* S3 unavailable
* CDN unavailable
* Payment provider unavailable
* Email provider unavailable
* Push provider unavailable
* Queue workers unavailable
* Event consumer failures

For each critical dependency determine:

* Timeout
* Retry
* Backoff
* Circuit-breaking where justified
* Fallback
* Degraded mode
* Recovery
* User-visible behavior

Do not create infinite retry loops.

---

# SCALABILITY ARCHITECTURE

Design the system for horizontal scaling.

Consider:

* Stateless API instances
* Worker scaling
* Database connection limits
* Read-heavy workloads
* Search scaling
* Redis scaling
* Queue throughput
* CDN offloading
* Object storage
* Large catalog operations
* High-volume checkout
* Traffic spikes
* Promotional events

Identify likely bottlenecks and architectural mitigations.

Do not prematurely introduce distributed complexity where a simpler architecture can satisfy the required scale.

---

# SECURITY AND PRIVACY DATA BOUNDARIES

Define which domains may access:

* Customer identity data
* Customer addresses
* Payment metadata
* Seller financial information
* Order history
* Internal administrative data
* Audit records

Minimize unnecessary data propagation between domains.

Do not expose private customer information to sellers beyond what is required to fulfill legitimate marketplace operations.

---

# ARCHITECTURE DOCUMENTATION

Create or maintain architecture documentation in the repository.

The documentation must clearly describe:

* System context
* Component boundaries
* Domain ownership
* Data ownership
* API architecture
* Event architecture
* Queue architecture
* Search architecture
* Cache architecture
* Media architecture
* Payment architecture
* Authentication
* Authorization
* Security boundaries
* Observability
* Failure behavior
* Scalability principles

Use diagrams or structured representations where they materially improve understanding.

Documentation must describe the actual architecture, not an aspirational system that does not match the defined implementation boundaries.

---

# IMPLEMENTATION DISCIPLINE

Before changing architecture documentation:

1. Inspect the repository.
2. Identify existing architectural decisions.
3. Identify implemented constraints.
4. Preserve compatible decisions.
5. Resolve contradictions explicitly.
6. Document ownership boundaries.
7. Define contracts precisely.
8. Avoid speculative components.
9. Keep the architecture internally consistent.
10. Validate that the architecture can actually be implemented using the selected technologies.

Do not implement application functionality as part of this architecture task unless a repository artifact is required to establish the architectural contract itself.

Do not rewrite working application code merely to make documentation look cleaner.

---

# ARCHITECTURAL COMPLETION CRITERIA

This architecture work is complete only when:

* Major system actors are defined.
* Major domains are defined.
* Data ownership is explicit.
* Application boundaries are explicit.
* API boundaries are explicit.
* Authentication architecture is defined.
* Authorization architecture is defined.
* Database architecture is defined.
* Transaction boundaries are defined.
* Event boundaries are defined.
* Queue responsibilities are defined.
* Search architecture is defined.
* Cache architecture is defined.
* Media architecture is defined.
* Payment architecture is defined.
* Notification architecture is defined.
* Security boundaries are defined.
* Observability architecture is defined.
* Failure behavior is defined.
* Scalability principles are defined.
* Repository architecture documentation accurately reflects the resulting design.
* The architecture does not contain contradictory ownership or dependency rules.

---

# IMPLEMENTATION REPORT

At the end of the architecture task, provide a concise engineering report containing:

* Files created
* Files modified
* Architecture decisions established
* Domain boundaries established
* Data ownership decisions
* API decisions
* Event decisions
* Queue decisions
* Search decisions
* Cache decisions
* Media decisions
* Payment decisions
* Security decisions
* Observability decisions
* Resilience decisions
* Validation performed
* Important compatibility considerations
* Any genuinely unresolved architectural issues

The report must describe actual repository changes and architectural decisions, not hypothetical future implementation.

---

# FINAL DIRECTIVE

Treat this repository as a production software system that must evolve into a globally scalable ecommerce marketplace.

Establish explicit boundaries before implementation.

Prefer simple, well-defined architecture over unnecessary distributed complexity.

Keep transactional truth in PostgreSQL.

Treat search, cache, queues, events, and derived data according to their appropriate consistency models.

Protect customer, seller, and administrative boundaries.

Design critical workflows for concurrency, retries, duplicates, and partial failure.

Make security, observability, reliability, and scalability first-class architectural concerns.

Inspect the repository before making decisions.

Do not depend on any previous AI-generated document or conversation context.

This prompt is a complete, standalone architectural specification for the Amazon ecommerce marketplace architecture task.
