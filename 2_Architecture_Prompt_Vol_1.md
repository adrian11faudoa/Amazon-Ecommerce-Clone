# Amazon Ecommerce Marketplace

# ARCHITECTURE PROMPT — VOLUME 1

## Enterprise Ecommerce Marketplace — System, Domain, Data, Security, and API Architecture

You are operating as the **Principal Software Architect, Database Architect, Distributed Systems Architect, Security Architect, Cloud Architect, Payments Architect, and Staff Engineering Lead** for an enterprise-grade ecommerce marketplace.

Your task in this phase is to inspect the **actual repository** and produce the complete foundational engineering architecture required to build the platform.

## CRITICAL RULE

**DO NOT begin implementation in this phase.**

Your primary task is architecture.

Do not generate production source code.

Do not generate placeholder implementations.

Do not create fake implementations merely to demonstrate an architecture.

Produce a complete engineering blueprint consisting of:

* architecture
* specifications
* domain boundaries
* data models
* API contracts
* event contracts
* security decisions
* consistency rules
* reliability decisions
* infrastructure requirements
* testing requirements
* operational requirements
* engineering constraints

The resulting architecture must be sufficiently detailed that future implementation phases can implement the system without inventing conflicting contracts.

---

# 1. PROJECT CONTEXT

Design an original **Amazon-style ecommerce marketplace**.

The platform must support a production-grade customer shopping experience and, where applicable, marketplace functionality involving multiple sellers.

The platform may include:

* customer accounts
* authentication
* profiles
* addresses
* product catalog
* categories
* brands
* attributes
* products
* product variants
* SKUs
* seller offers
* pricing
* inventory
* shopping carts
* wishlists
* checkout
* orders
* payments
* refunds
* shipping
* tracking
* coupons
* promotions
* reviews
* ratings
* search
* recommendations
* notifications
* seller management
* seller fulfillment
* administration
* moderation
* analytics
* customer support

The exact scope must be reconciled with the actual repository.

Do not architect functionality that contradicts existing implementation.

---

# 2. TECHNOLOGY BASELINE

Use this technology baseline unless the actual repository already contains an equivalent compatible implementation that should be preserved.

## Web

* Next.js 15+
* React 19+
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand

## Mobile

* React Native
* Expo
* TypeScript
* TanStack Query
* Zustand
* React Navigation

## Backend

* Node.js
* NestJS
* TypeScript

## Database

* PostgreSQL
* Prisma ORM

## Cache and ephemeral state

* Redis

## Search

* Elasticsearch or OpenSearch

## Object storage

* AWS S3

## CDN

* AWS CloudFront

## Payments

* Stripe

## Background processing

* BullMQ
* Redis

## API

* REST
* OpenAPI / Swagger

## Asynchronous communication

* Webhooks
* Server-Sent Events where useful
* Kafka/Redpanda where asynchronous event architecture materially benefits the platform

## Infrastructure

* Docker
* Terraform/OpenTofu where infrastructure-as-code is required
* AWS
* Kubernetes where justified by actual project scale and architecture
* CI/CD

Do not blindly introduce every technology.

Every component must have an explicit responsibility.

---

# 3. REPOSITORY-FIRST ARCHITECTURE AUDIT

Before designing the architecture, inspect the repository.

Determine:

* existing applications
* frontend structure
* backend structure
* mobile structure
* shared packages
* database
* Prisma schema
* migrations
* API modules
* authentication
* catalog implementation
* cart implementation
* checkout implementation
* payment integration
* order implementation
* inventory implementation
* search implementation
* media implementation
* workers
* queues
* Redis usage
* event infrastructure
* infrastructure
* CI/CD
* tests
* configuration
* documentation

Identify:

### Already implemented

### Partially implemented

### Missing

### Architecturally inconsistent

### Potentially dangerous

The architecture must describe how to evolve the actual repository rather than designing an unrelated application.

---

# 4. ARCHITECTURAL OBJECTIVES

The architecture must optimize for:

* correctness
* transactional integrity
* scalability
* security
* reliability
* observability
* maintainability
* testability
* deployment safety
* extensibility

The architecture must support growth from an initial production deployment toward significantly higher traffic and data volume without requiring a complete rewrite.

Avoid premature distributed complexity.

Use asynchronous infrastructure only where it provides clear value.

---

# 5. HIGH-LEVEL SYSTEM ARCHITECTURE

Define the complete logical architecture.

Describe:

* web client
* mobile client
* API layer
* authentication
* domain/application layer
* persistence
* cache
* search
* object storage
* CDN
* payment provider
* background workers
* event broker
* notification providers
* analytics
* administration
* observability
* infrastructure

Clearly identify:

### Synchronous request paths

### Asynchronous paths

### Transactional boundaries

### Eventually consistent projections

### External system boundaries

### Sources of truth

---

# 6. SOURCE-OF-TRUTH MATRIX

Create a formal source-of-truth matrix.

For every major domain object identify:

* authoritative system
* read model
* cache
* search projection
* event source
* external provider
* synchronization mechanism

At minimum cover:

* users
* sessions
* addresses
* products
* variants
* SKUs
* seller offers
* prices
* inventory
* carts
* orders
* payments
* refunds
* shipments
* reviews
* media
* search documents
* notifications

Explicitly state what is authoritative.

---

# 7. DOMAIN-DRIVEN DESIGN

Define bounded contexts and their responsibilities.

At minimum evaluate:

## Identity

Responsible for:

* users
* authentication
* sessions
* account security

## Customer

Responsible for:

* customer profile
* addresses
* preferences

## Catalog

Responsible for:

* products
* categories
* brands
* attributes
* variants
* SKUs
* product media

## Seller

Responsible for:

* seller identity
* seller catalog ownership
* seller offers
* seller configuration

## Pricing

Responsible for:

* prices
* discounts
* promotions
* coupons

## Inventory

Responsible for:

* stock
* reservations
* movements
* availability

## Cart

Responsible for:

* carts
* cart items
* quantity
* cart state

## Checkout

Responsible for:

* checkout orchestration
* validation
* pricing verification
* inventory verification
* shipping selection
* tax calculation
* payment initiation

## Orders

Responsible for:

* order creation
* lifecycle
* cancellations
* returns
* refunds

## Payments

Responsible for:

* payment intents
* authorization
* capture
* failures
* refunds
* reconciliation
* webhooks

## Fulfillment

Responsible for:

* shipments
* packages
* carriers
* tracking
* delivery state

## Reviews

Responsible for:

* ratings
* reviews
* verification
* moderation

## Search

Responsible for:

* indexing
* search
* autocomplete
* filtering
* ranking

## Notifications

Responsible for:

* email
* push
* in-app notifications

## Administration

Responsible for:

* moderation
* catalog administration
* seller administration
* order administration
* customer support

Adjust these boundaries based on actual repository structure.

---

# 8. DOMAIN DEPENDENCY RULES

Define which domains may depend on which other domains.

Prevent:

* circular dependencies
* direct database access across domains
* business logic leakage
* shared mutable domain state
* uncontrolled imports

Specify allowed interfaces between domains.

For example:

Catalog should not directly manipulate payment records.

Inventory should not directly own order lifecycle.

Payment should not trust frontend totals.

Checkout may orchestrate multiple domains but must preserve their ownership boundaries.

---

# 9. CORE ENTITY MODEL

Design the conceptual data model.

At minimum analyze:

### Identity

* User
* Credential
* Session
* Device where applicable

### Customer

* CustomerProfile
* Address

### Catalog

* Product
* ProductVariant
* SKU
* Category
* Brand
* ProductAttribute
* ProductMedia

### Marketplace

* Seller
* SellerUser
* SellerOffer

### Pricing

* Price
* Promotion
* Coupon
* CouponRedemption

### Inventory

* InventoryItem
* InventoryLocation
* InventoryReservation
* InventoryMovement

### Cart

* Cart
* CartItem

### Checkout

* CheckoutSession

### Orders

* Order
* OrderItem
* OrderStatusHistory

### Payments

* Payment
* PaymentAttempt
* Refund
* PaymentWebhookEvent

### Fulfillment

* Shipment
* ShipmentItem
* TrackingEvent

### Reviews

* Review
* ReviewMedia
* ReviewReport

### Media

* MediaAsset
* MediaProcessingJob

### Notifications

* Notification
* NotificationPreference
* DevicePushToken

### Audit

* AuditEvent

Do not assume every entity must become a table.

Determine lifecycle, ownership, and persistence requirements.

---

# 10. ENTITY OWNERSHIP

For every major entity define:

* owning domain
* identifier
* lifecycle
* mutable fields
* immutable fields
* relationships
* authorization boundary
* deletion policy
* retention policy

No domain should modify another domain's entities through undocumented database manipulation.

---

# 11. PRODUCT MODELING

Define a robust catalog model.

Explicitly distinguish:

### Product

The conceptual item.

### Variant

A purchasable variation.

### SKU

The concrete inventory/purchasable identifier.

### Seller Offer

A seller-specific commercial offer for a product/SKU.

### Inventory

Physical or logical stock owned by a seller/location.

### Price

Commercial price with currency and validity semantics.

Explain relationships between these concepts.

Prevent catalog ambiguity.

---

# 12. CATALOG ATTRIBUTES

Define support for:

* product attributes
* variant attributes
* category-specific attributes
* searchable attributes
* filterable attributes
* sortable attributes

Avoid creating an uncontrolled generic attribute system that makes validation and indexing impossible.

Where dynamic attributes are required, define explicit validation and schema semantics.

---

# 13. CATEGORY ARCHITECTURE

Define:

* category hierarchy
* parent/child relationship
* category visibility
* category ordering
* category-specific attributes
* product assignment
* SEO metadata
* deletion/archival behavior

Prevent cyclic category relationships.

---

# 14. SELLER ARCHITECTURE

If marketplace functionality is supported, define:

* seller account
* seller users
* seller roles
* seller offers
* seller inventory
* seller orders
* seller fulfillment
* seller financial state
* seller isolation

A seller must never be able to access another seller's private information.

Define platform-vs-seller ownership explicitly.

---

# 15. PRICING ARCHITECTURE

Define:

* base price
* sale price
* promotional price
* seller-specific price
* currency
* validity period
* price history
* discount
* coupon
* promotion

Clarify which price is authoritative during checkout.

Define how prices are snapshotted into orders.

Never reconstruct historical order totals from mutable current catalog prices.

---

# 16. MONEY MODEL

All financial values must use exact arithmetic.

Define:

* amount representation
* currency
* rounding
* tax precision
* discount precision
* shipping precision
* refund precision

Do not use floating-point values for authoritative monetary calculations.

---

# 17. INVENTORY ARCHITECTURE

Define:

* available stock
* reserved stock
* sold stock
* damaged/unavailable stock where relevant
* inventory locations
* reservations
* releases
* adjustments
* movements

Define how inventory prevents overselling.

Specify transaction boundaries and concurrency controls.

Define reservation expiration behavior.

---

# 18. CART ARCHITECTURE

Define:

* cart ownership
* cart persistence
* cart item identity
* quantity
* price snapshot behavior
* inventory validation
* seller boundaries
* expiration where appropriate
* merging anonymous/authenticated carts if supported

Specify what happens when:

* price changes
* product is deleted
* inventory becomes unavailable
* promotion expires
* seller removes an offer

---

# 19. CHECKOUT ARCHITECTURE

Define checkout as an orchestrated business workflow.

The architecture must verify:

* customer identity
* address
* cart
* current price
* promotion
* inventory
* seller
* shipping
* tax
* payment

The client must never be authoritative for:

* subtotal
* discount
* tax
* shipping
* total
* inventory
* payment state

Define idempotency behavior.

---

# 20. ORDER ARCHITECTURE

Define:

* order identity
* order number if applicable
* customer
* seller
* order items
* price snapshots
* address snapshot
* tax
* shipping
* total
* payment state
* fulfillment state
* cancellation
* return
* refund

Define immutable historical information.

Define legal state transitions.

---

# 21. ORDER STATE MACHINE

Create explicit state machines for:

### Order

For example:

* pending
* confirmed
* processing
* shipped
* delivered
* cancelled
* returned
* refunded

Do not blindly use these exact states if repository requirements differ.

For each state define:

* valid transitions
* invalid transitions
* triggering operation
* authorization
* side effects
* emitted events

---

# 22. PAYMENT ARCHITECTURE

Define the relationship between:

* checkout
* payment intent
* payment
* order
* webhook
* refund

Stripe is external to the authoritative order database.

Define:

* idempotency
* webhook verification
* duplicate webhook handling
* payment reconciliation
* provider failure
* timeout
* partial failure
* refund behavior

Payment status must never depend solely on client-side claims.

---

# 23. WEBHOOK ARCHITECTURE

Define secure webhook processing.

Every webhook should have:

* provider event ID
* event type
* received timestamp
* processing status
* correlation ID
* idempotency semantics

Define:

* signature validation
* duplicate handling
* retries
* dead-letter/recovery behavior
* auditability

---

# 24. SHIPPING ARCHITECTURE

Define:

* shipment ownership
* package
* shipment items
* carrier
* tracking
* shipment state
* delivery events

Separate order state from shipment state.

A shipment update must not arbitrarily mutate unrelated order data.

---

# 25. RETURNS AND REFUNDS

Define:

* return eligibility
* return request
* return state
* refund relationship
* inventory impact
* seller/platform responsibility
* authorization

Ensure refunds are idempotent.

Never allow duplicate refunds caused by retries or duplicate webhooks.

---

# 26. REVIEWS ARCHITECTURE

Define:

* review ownership
* product association
* order association
* verified purchase
* rating
* content
* media
* moderation
* reporting
* deletion

Define controls against fraudulent review creation.

---

# 27. SEARCH ARCHITECTURE

PostgreSQL remains authoritative.

Search engine data is a projection.

Define:

* indexing pipeline
* index document model
* index version
* aliases
* indexing events
* deletion propagation
* reindexing
* replay
* eventual consistency

Search must enforce catalog visibility and authorization rules.

---

# 28. SEARCH QUERY MODEL

Define:

* text search
* autocomplete
* filters
* facets
* price ranges
* categories
* brands
* attributes
* seller
* rating
* availability
* sorting
* pagination

Define which filters are authoritative and how stale search data is handled.

---

# 29. MEDIA ARCHITECTURE

Define the lifecycle:

upload authorization → upload → persistence → processing → variants → CDN → cleanup.

Define:

* S3 object naming
* ownership
* access control
* MIME validation
* file-size limits
* processing states
* image transformation
* thumbnails
* CDN access
* expiration
* deletion

Treat uploads as untrusted.

---

# 30. CACHE ARCHITECTURE

For every Redis-backed cache define:

* key
* namespace
* value
* TTL
* invalidation trigger
* stale behavior
* rebuild behavior
* failure behavior

Potential cache targets:

* product detail
* categories
* search metadata
* sessions
* rate limits
* temporary checkout state
* other safe read-heavy data

Never cache authorization-sensitive information without explicit key isolation and invalidation semantics.

---

# 31. EVENT ARCHITECTURE

Define domain events such as appropriate:

* ProductCreated
* ProductUpdated
* ProductDeleted
* InventoryChanged
* InventoryReserved
* InventoryReleased
* OrderCreated
* OrderConfirmed
* PaymentAuthorized
* PaymentFailed
* PaymentRefunded
* ShipmentCreated
* ShipmentUpdated
* ReviewCreated

Do not create events merely because a CRUD operation exists.

Each event must represent a meaningful business fact.

---

# 32. EVENT CONTRACT

Every event should define:

* event ID
* event type
* schema version
* aggregate/entity ID
* producer
* timestamp
* correlation ID
* trace context
* payload

Assume at-least-once delivery.

Consumers must be idempotent.

---

# 33. TRANSACTIONAL OUTBOX

Where database state and event publication must remain consistent, define a transactional outbox.

Document:

* outbox table
* transaction boundary
* publication worker
* retry
* duplicate handling
* event status
* cleanup
* replay
* dead-letter handling

Do not rely on:

database commit → separate network call → hope event publishes.

---

# 34. API ARCHITECTURE

Define REST resources and responsibilities.

At minimum consider:

### Authentication

* register
* login
* logout
* refresh/session

### Customers

* profile
* addresses

### Catalog

* products
* categories
* brands
* variants
* offers

### Cart

* current cart
* add
* update
* remove

### Checkout

* checkout session
* validation
* payment initialization

### Orders

* create
* retrieve
* list
* cancellation
* returns

### Payments

* payment state
* refunds where authorized

### Reviews

* create
* update
* delete
* report

### Search

* search
* autocomplete

### Sellers

* seller management
* seller catalog
* seller orders

### Administration

* moderation
* catalog
* sellers
* orders

Actual endpoints must be defined according to repository scope.

---

# 35. API CONTRACT PRINCIPLES

Every endpoint must define:

* HTTP method
* path
* authentication
* authorization
* request schema
* response schema
* validation
* errors
* pagination
* idempotency
* rate limits
* side effects

Use DTOs rather than exposing database models directly.

---

# 36. PAGINATION

Define consistent pagination.

For high-volume resources prefer cursor-based pagination where appropriate.

Define:

* cursor format
* sort order
* stable ordering
* page size
* maximum page size
* invalid cursor behavior

Avoid offset pagination for extremely large mutable datasets when cursor pagination is more appropriate.

---

# 37. ERROR MODEL

Define a consistent error contract.

Include:

* HTTP status
* stable application error code
* safe message
* validation information
* request/correlation ID

Do not expose:

* SQL
* stack traces
* secrets
* internal infrastructure
* payment credentials

---

# 38. AUTHENTICATION ARCHITECTURE

Define:

* credential storage
* session/token model
* access-token lifetime
* refresh semantics
* logout
* session revocation
* account security
* device/session tracking if applicable

Do not place sensitive authentication state in insecure client storage.

---

# 39. AUTHORIZATION ARCHITECTURE

Define authorization policies for:

* customer
* seller
* seller administrator
* seller staff
* platform administrator
* support personnel
* moderator

Authorization must be enforced server-side.

Explicitly identify resource ownership checks.

---

# 40. RATE LIMITING

Define rate-limit policies for:

* authentication
* checkout
* payment operations
* order operations
* search
* reviews
* seller operations
* uploads
* administrative operations
* public APIs

Define:

* scope
* limit
* window
* storage
* response behavior
* distributed semantics

Do not make limits arbitrary.

---

# 41. SECURITY ARCHITECTURE

Perform threat modeling for:

* customers
* sellers
* administrators
* anonymous users
* compromised accounts
* malicious API clients
* malicious uploads
* payment attackers
* scraping
* coupon abuse
* inventory abuse

Explicitly address:

* IDOR/BOLA
* privilege escalation
* injection
* XSS
* CSRF
* SSRF
* command injection
* path traversal
* malicious files
* credential stuffing
* replay
* webhook forgery
* payment manipulation
* rate-limit bypass
* secret leakage

---

# 42. PRIVACY ARCHITECTURE

Define protection for:

* customer identity
* addresses
* order history
* payment-related metadata
* seller information
* support information
* analytics data

Specify where sensitive data may appear in:

* API
* logs
* events
* search
* caches
* notifications
* analytics

---

# 43. AUDIT ARCHITECTURE

Identify operations requiring auditability.

Examples:

* administrator actions
* seller permission changes
* catalog modifications
* inventory adjustments
* order state changes
* refunds
* payment reconciliation
* account security changes
* moderation

Define:

* actor
* action
* resource
* timestamp
* correlation ID
* relevant metadata

Do not store unnecessary sensitive payloads.

---

# 44. OBSERVABILITY ARCHITECTURE

Define:

### Logs

Structured and searchable.

### Metrics

Include:

* request rate
* latency
* errors
* database performance
* Redis
* queue depth
* worker failures
* payment failures
* inventory failures
* search failures

### Traces

Trace:

* API
* database
* Redis
* events
* queues
* external providers

Define correlation propagation.

---

# 45. RELIABILITY ARCHITECTURE

Define behavior for:

* database failure
* Redis failure
* search failure
* S3 failure
* Stripe failure
* notification provider failure
* queue backlog
* event broker failure
* worker failure

Critical transactional functionality should degrade safely.

For example:

Search failure should not corrupt catalog state.

Notification failure should not cancel a successful order.

Search indexing failure should not make PostgreSQL data disappear.

---

# 46. CONCURRENCY MODEL

Explicitly define concurrency protection for:

* inventory reservation
* checkout
* order creation
* coupon redemption
* payment creation
* refund
* order transitions
* seller inventory updates

Document:

* transaction boundaries
* locking strategy
* unique constraints
* idempotency
* retry behavior

---

# 47. IDEMPOTENCY MODEL

Identify all operations requiring idempotency.

At minimum consider:

* checkout
* order creation
* payment creation
* payment webhook
* refund
* inventory reservation
* inventory release
* shipment creation
* asynchronous jobs

Define idempotency-key behavior.

---

# 48. BACKGROUND JOB ARCHITECTURE

Define BullMQ queues and workers.

For each queue specify:

* purpose
* producer
* payload
* priority
* concurrency
* timeout
* retry
* backoff
* idempotency
* DLQ
* observability
* shutdown behavior

Potential queues:

* search indexing
* media processing
* notifications
* cleanup
* reconciliation
* analytics

Only define queues justified by actual architecture.

---

# 49. FRONTEND ARCHITECTURE

Define:

* application shell
* routing
* server state
* client state
* authentication state
* API client
* error handling
* cache invalidation
* product browsing
* search
* cart
* checkout
* order history
* account
* seller/admin applications if included

Use TanStack Query for server state where appropriate.

Use Zustand only for genuine client-side state.

---

# 50. MOBILE ARCHITECTURE

If mobile exists:

Define:

* navigation
* authentication
* API client
* persistent session
* product browsing
* search
* cart
* checkout
* orders
* notifications
* account

Do not duplicate backend business logic in mobile.

---

# 51. SEO ARCHITECTURE

For web:

Define:

* product URLs
* category URLs
* metadata
* canonical URLs
* structured product data
* sitemap
* robots
* indexability

Ensure SEO does not expose private customer/seller information.

---

# 52. ACCESSIBILITY ARCHITECTURE

Define requirements for:

* keyboard navigation
* screen readers
* semantic HTML
* accessible forms
* dialogs
* menus
* focus
* error announcements
* contrast
* touch targets
* reduced motion

---

# 53. DATA RETENTION

Define retention behavior for:

* users
* orders
* payments
* refunds
* reviews
* logs
* audit records
* media
* search indexes
* analytics
* temporary checkout state

Separate operational deletion from legally/business-required retention.

---

# 54. SCALABILITY MODEL

Define scaling characteristics for:

* API
* web
* workers
* database
* Redis
* search
* object storage
* CDN
* event broker

Identify:

* stateless services
* horizontally scalable components
* bottlenecks
* partitioning requirements
* caching opportunities
* asynchronous boundaries

Do not introduce sharding or microservices without demonstrated need.

---

# 55. INFRASTRUCTURE REQUIREMENTS

Define logical infrastructure requirements for:

* AWS networking
* compute
* Kubernetes if justified
* PostgreSQL
* Redis
* search
* S3
* CloudFront
* Stripe connectivity
* workers
* queues
* secrets
* DNS
* TLS
* WAF
* monitoring
* backups

This phase defines requirements, not infrastructure implementation.

---

# 56. ENVIRONMENT STRATEGY

Define:

* local
* test
* development
* staging
* production

Each environment must have appropriate:

* databases
* storage
* credentials
* payment mode
* search
* queues
* monitoring

Production data must never accidentally enter development/test environments.

---

# 57. TESTING ARCHITECTURE

Define a complete test strategy covering:

* unit
* integration
* database
* API
* contract
* event
* queue
* security
* accessibility
* frontend
* mobile
* E2E
* performance
* concurrency
* resilience
* disaster recovery

Critical domains require stronger test coverage.

---

# 58. API AND EVENT VERSIONING

Define compatibility rules for:

* API versions
* DTOs
* events
* queue payloads
* search documents
* database migrations

Consumers must tolerate safe schema evolution.

---

# 59. FAILURE MATRIX

Create a failure matrix covering at least:

| Dependency   | Failure     | Expected Behavior                     | Data Risk   | Recovery          |
| ------------ | ----------- | ------------------------------------- | ----------- | ----------------- |
| PostgreSQL   | unavailable | fail safely                           | high        | reconnect/recover |
| Redis        | unavailable | degrade according to feature          | low/medium  | reconnect         |
| Search       | unavailable | browsing remains available            | low         | reindex           |
| S3           | unavailable | media operations degrade              | medium      | retry             |
| Stripe       | unavailable | payment remains pending/failed safely | high        | reconciliation    |
| Worker       | crashed     | queued jobs recover                   | medium      | restart           |
| Event broker | unavailable | outbox retains events                 | medium/high | republish         |

Adapt this matrix to actual architecture.

---

# 60. SECURITY BOUNDARY MATRIX

Define authorization boundaries for:

* anonymous customer
* authenticated customer
* seller
* seller staff
* support
* moderator
* administrator
* internal worker

For every major resource define who may:

* create
* read
* update
* delete
* administer

---

# 61. CRITICAL BUSINESS INVARIANTS

Document invariants such as:

### Inventory

Inventory cannot become negative unless explicitly supported.

### Payment

A payment cannot be treated as successful solely from client state.

### Order

Historical order totals cannot change when catalog prices change.

### Refund

A refund cannot exceed refundable amount.

### Seller isolation

Seller A cannot access Seller B's private data.

### Authorization

Ownership and role checks occur server-side.

### Idempotency

Retries cannot unintentionally duplicate durable financial/business effects.

### Search

Search cannot expose hidden/private products.

### Cart

Checkout must revalidate mutable pricing and inventory.

---

# 62. ARCHITECTURE DECISION RECORDS

Identify important architectural decisions requiring explicit records.

Examples:

* monolith vs modular monolith
* microservices boundary
* PostgreSQL authority
* Redis usage
* search projection
* event broker usage
* transactional outbox
* payment model
* inventory reservation
* seller architecture
* media architecture
* authentication
* infrastructure model

For each major decision explain:

* decision
* alternatives
* rationale
* trade-offs
* consequences

---

# 63. ARCHITECTURE QUALITY REQUIREMENTS

The resulting architecture must be:

* internally consistent
* implementable
* testable
* observable
* secure
* scalable
* operationally realistic

Do not produce vague statements such as:

* "use caching"
* "make it scalable"
* "secure the API"
* "use microservices"

Instead specify:

* what
* where
* why
* lifecycle
* ownership
* failure behavior
* security boundary
* operational behavior

---

# 64. REQUIRED ARCHITECTURE DELIVERABLE

Produce a complete architecture document containing:

1. Repository audit
2. System overview
3. Component architecture
4. Domain boundaries
5. Domain dependency rules
6. Source-of-truth matrix
7. Entity model
8. Entity ownership
9. Product/catalog architecture
10. Seller architecture
11. Pricing architecture
12. Inventory architecture
13. Cart architecture
14. Checkout architecture
15. Order architecture
16. Payment architecture
17. Shipping architecture
18. Review architecture
19. Search architecture
20. Media architecture
21. Redis architecture
22. Event architecture
23. Outbox architecture
24. Queue architecture
25. API architecture
26. Authentication architecture
27. Authorization architecture
28. Security architecture
29. Privacy architecture
30. Audit architecture
31. Observability architecture
32. Reliability architecture
33. Concurrency model
34. Idempotency model
35. Frontend architecture
36. Mobile architecture where applicable
37. SEO architecture
38. Accessibility architecture
39. Infrastructure requirements
40. Environment strategy
41. Testing architecture
42. Versioning strategy
43. Failure matrix
44. Security boundary matrix
45. Business invariants
46. Architecture decisions
47. Implementation dependencies
48. Architecture risks
49. Final architecture validation

---

# 65. ARCHITECTURE VALIDATION

Before finishing this architecture phase, perform a consistency review.

Verify that:

* every domain has clear ownership
* every major entity has an authoritative source
* every financial operation has transactional semantics
* inventory has concurrency protection
* checkout validates mutable state
* orders preserve historical data
* payments are webhook-safe
* seller isolation is explicit
* search is treated as a projection
* Redis is not incorrectly authoritative
* asynchronous jobs are idempotent
* events are versioned
* API contracts are explicit
* authorization is server-side
* privacy boundaries are defined
* observability is possible
* failures have defined behavior
* infrastructure requirements are realistic
* testing can validate critical workflows

Resolve contradictions before completing the document.

---

# 66. IMPLEMENTATION PHASE BOUNDARY

Do not implement application source code during this architecture phase.

The output must be the architectural source of truth that future implementation phases can execute against.

Do not leave critical architectural decisions as unexplained TODOs.

Where an implementation detail depends on repository inspection, explicitly describe the repository-derived decision.

---

# 67. STANDALONE REQUIREMENT

This prompt is completely standalone.

It must be executable in a fresh Claude session with access to the actual repository.

It must not depend on:

* another prompt
* a previous conversation
* a previously generated architecture
* an approved document
* hidden context

All relevant requirements are contained in this prompt.

The actual repository is the only external project context that may be relied upon.

# END OF ARCHITECTURE PROMPT — VOLUME 1
