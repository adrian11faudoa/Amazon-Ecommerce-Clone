# Amazon Ecommerce Marketplace

# Architecture Prompt — Volume 2

### Detailed Data Contracts, API Contracts, Event Contracts, Search, Checkout, Payments, Seller, Infrastructure, Security, and Operational Architecture

---

# ROLE

You are operating as a senior production engineering organization responsible for designing an original, production-grade ecommerce marketplace platform inspired by the capabilities of large-scale marketplaces.

The platform is **not proprietary Amazon software** and must not copy private Amazon implementations, internal APIs, proprietary designs, trademarks, or undocumented systems.

The objective is to produce the **complete implementation-ready architecture specification** for the platform.

This phase is **ARCHITECTURE ONLY**.

## ABSOLUTE RULE

**DO NOT IMPLEMENT THE APPLICATION IN THIS PHASE.**

Do not generate:

* application source code
* controllers
* services
* repositories
* Prisma schema files
* migrations
* React components
* React Native components
* Terraform
* Kubernetes manifests
* Dockerfiles
* CI/CD implementation
* production configuration files
* executable code
* placeholder implementations
* TODO-based designs

You may use concise structural notation, field/type tables, endpoint definitions, state diagrams, pseudo-structures, schemas as documentation, and contract definitions where necessary to describe architecture.

The output must describe **what the system must implement and how all parts must interact**, not implement those parts.

---

# 1. PROJECT CONTEXT

Design an enterprise-grade ecommerce marketplace supporting:

* customers
* product discovery
* product catalogs
* product variants
* SKUs
* multiple sellers
* seller offers
* pricing
* promotions
* coupons
* inventory
* carts
* checkout
* payments
* orders
* fulfillment
* shipments
* tracking
* reviews
* ratings
* search
* media
* notifications
* administration
* analytics
* auditing
* refunds
* returns where applicable

The platform must support both:

1. first-party/catalog-owned commerce capabilities where applicable
2. third-party marketplace sellers

The architecture must allow the system to grow from a single deployment into a large-scale production platform without requiring fundamental domain redesign.

---

# 2. TECHNOLOGY BASELINE

The architecture must be compatible with this technology baseline.

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
* React Navigation
* TanStack Query
* Zustand

## Backend

* Node.js
* NestJS
* TypeScript

## Primary database

* PostgreSQL
* Prisma ORM

## Caching and ephemeral state

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

## Event streaming

* Kafka or Redpanda where justified

## API

* REST
* OpenAPI / Swagger
* Webhooks
* SSE where appropriate

## Infrastructure

* Docker
* AWS
* Terraform or OpenTofu
* Kubernetes where justified by workload and operational requirements

The architecture may recommend changes or additions when technically justified, but every deviation must include an architectural reason.

---

# 3. REPOSITORY-FIRST REQUIREMENT

Before producing the architecture, inspect the actual repository.

Determine:

* existing applications
* package structure
* monorepo structure if present
* frontend applications
* mobile applications
* backend applications
* shared packages
* database configuration
* Prisma configuration
* environment configuration
* infrastructure
* Docker configuration
* CI/CD
* testing infrastructure
* existing APIs
* existing domain models
* existing authentication
* existing UI
* existing conventions

The repository is the only external source of implementation state.

If the repository already contains architecture or implementation:

* preserve compatible decisions
* identify conflicts
* document them
* recommend the smallest safe evolution
* never design a competing parallel implementation

Do not assume that a previous prompt exists.

This prompt must be completely understandable and executable by itself.

---

# 4. ARCHITECTURE COMPLETION OBJECTIVE

This document must complete the architecture required before implementation.

It must establish sufficiently precise contracts that later engineering work can implement the system without inventing incompatible:

* database models
* API contracts
* event contracts
* authentication behavior
* authorization rules
* payment behavior
* inventory behavior
* search documents
* queue contracts
* cache keys
* media structures
* notification payloads
* error formats
* pagination formats
* lifecycle rules

All contracts must be internally consistent.

---

# 5. DATABASE CONTRACT

Define the implementation-ready PostgreSQL conceptual schema.

For every major entity specify:

* entity name
* purpose
* primary key
* important fields
* field types
* nullable vs required
* default values
* relationships
* foreign keys
* unique constraints
* indexes
* check constraints
* lifecycle
* soft deletion requirements
* retention requirements
* audit requirements
* concurrency requirements

At minimum cover:

### Identity

* User
* Credential
* Session
* Device
* UserRole
* Permission

### Customer

* CustomerProfile
* Address
* CustomerPreference

### Catalog

* Product
* ProductVariant
* SKU
* Category
* Brand
* ProductAttribute
* ProductAttributeValue
* ProductMedia

### Seller

* Seller
* SellerUser
* SellerRole
* SellerOffer
* SellerPayoutConfiguration
* SellerStatusHistory

### Pricing

* Price
* PriceHistory
* Promotion
* PromotionRule
* Coupon
* CouponRedemption

### Inventory

* InventoryLocation
* InventoryItem
* InventoryReservation
* InventoryMovement

### Commerce

* Cart
* CartItem
* CheckoutSession
* CheckoutItem

### Orders

* Order
* OrderItem
* OrderStatusHistory
* OrderAddressSnapshot
* OrderPriceSnapshot

### Payments

* Payment
* PaymentAttempt
* PaymentMethodReference
* Refund
* PaymentWebhookEvent

### Fulfillment

* FulfillmentOrder
* Shipment
* ShipmentItem
* TrackingEvent
* ReturnRequest
* ReturnItem

### Reviews

* Review
* ReviewMedia
* ReviewVote
* ReviewReport

### Media

* MediaAsset
* MediaProcessingJob

### Notifications

* Notification
* NotificationPreference
* DevicePushToken

### Platform

* AuditEvent
* OutboxEvent
* IdempotencyRecord

---

# 6. IDENTIFIER ARCHITECTURE

Define the identifier strategy.

Specify:

* UUID/ULID strategy
* externally exposed IDs
* database identifiers
* ordering requirements
* collision considerations
* serialization format
* validation rules

Do not expose sequential internal database identifiers where doing so would create enumeration or security risks.

---

# 7. TIMESTAMP ARCHITECTURE

Define a consistent timestamp policy.

Specify:

* database timezone
* storage format
* API serialization
* frontend parsing
* createdAt
* updatedAt
* deletedAt
* publishedAt
* processedAt
* completedAt
* expiration timestamps

All services must use a consistent temporal model.

---

# 8. MONEY AND CURRENCY CONTRACT

Define the canonical monetary representation.

Specify:

* integer minor units vs decimal
* currency code
* precision
* rounding rules
* tax calculations
* discount calculations
* shipping charges
* seller fees
* marketplace commissions
* refunds
* partial refunds
* currency conversion
* currency availability
* price snapshots
* calculation ordering

Never use floating-point numbers for authoritative monetary calculations.

Define the exact calculation order for:

1. item price
2. quantity
3. item discounts
4. subtotal
5. shipping
6. tax
7. order-level discounts
8. final total

Clarify how rounding is handled at each stage.

---

# 9. PRODUCT / VARIANT / SKU / OFFER MODEL

Establish the exact distinction between:

### Product

Customer-facing catalog identity.

### Product Variant

A variation such as:

* size
* color
* storage
* configuration

### SKU

Inventory-identifiable sellable unit.

### Seller Offer

A seller-specific commercial offer for a SKU.

An offer may define:

* seller
* SKU
* price
* availability
* condition
* fulfillment method
* seller-specific shipping
* seller status
* offer status

Do not collapse these concepts into a single generic product table.

Define:

* relationships
* uniqueness
* lifecycle
* visibility
* seller ownership
* inventory relationship
* search representation

---

# 10. CATALOG VISIBILITY

Define product visibility states.

Examples:

* DRAFT
* PENDING_REVIEW
* ACTIVE
* SUSPENDED
* ARCHIVED

Define exactly what each state allows.

Specify visibility rules for:

* customers
* sellers
* administrators
* search indexing
* direct product URLs
* recommendations
* carts
* historical orders

A product must not become publicly visible merely because a database row exists.

---

# 11. SELLER ISOLATION ARCHITECTURE

Define seller isolation at:

* API
* service
* repository
* database query
* authorization
* search
* media
* analytics
* order
* inventory
* payout
* administration

Every seller-owned resource must have an explicit ownership boundary.

Prevent:

* IDOR
* seller-to-seller data leakage
* unauthorized offer modification
* inventory manipulation
* review manipulation
* payout access
* order access

Define platform-admin override rules separately from seller permissions.

---

# 12. INVENTORY CONTRACT

Inventory is authoritative in PostgreSQL.

Define:

* available quantity
* reserved quantity
* committed quantity
* damaged quantity
* unavailable quantity
* location
* SKU relationship

Define the inventory reservation algorithm conceptually.

It must address:

* concurrent checkouts
* overselling
* reservation expiration
* retries
* duplicate requests
* cancellation
* payment failure
* order creation
* partial fulfillment
* inventory release

The architecture must guarantee that two concurrent requests cannot incorrectly consume the same inventory.

Define:

* transaction boundaries
* locking strategy
* optimistic/pessimistic concurrency where appropriate
* reservation identifiers
* expiration behavior
* reconciliation

---

# 13. CART CONTRACT

Define:

* anonymous cart
* authenticated cart
* cart ownership
* cart merging
* cart expiration
* cart item identity
* quantity rules
* seller offers
* unavailable products
* price changes
* inventory changes

Define behavior when:

* an item is discontinued
* price changes
* seller becomes unavailable
* inventory becomes insufficient
* promotion expires
* product becomes restricted

Cart state must never be treated as a final financial commitment.

---

# 14. CHECKOUT CONTRACT

Define checkout as an explicit workflow.

The architecture must specify:

1. cart validation
2. product validation
3. offer validation
4. inventory validation
5. price validation
6. promotion validation
7. shipping validation
8. tax calculation
9. payment preparation
10. inventory reservation
11. order creation
12. payment confirmation
13. fulfillment initiation

Define which steps are synchronous and which are asynchronous.

Define rollback and compensation behavior.

Define how the system behaves if:

* payment fails
* inventory disappears
* price changes
* tax calculation fails
* shipping provider fails
* database transaction succeeds but external payment call fails
* payment succeeds but order creation fails
* client retries checkout

The checkout design must be idempotent.

---

# 15. ORDER AGGREGATE

Define the authoritative order model.

An order must preserve historical snapshots.

Specify snapshots for:

* product information
* SKU
* seller
* seller offer
* item price
* discounts
* tax
* shipping
* customer address
* billing information where required

Historical orders must not change because current catalog information changes.

Define:

* order identity
* customer relationship
* seller relationships
* order totals
* currency
* status
* status history
* fulfillment state
* payment state
* cancellation state
* return state

---

# 16. ORDER STATE MACHINE

Define valid order states and transitions.

At minimum consider:

* CREATED
* PAYMENT_PENDING
* PAID
* PROCESSING
* PARTIALLY_FULFILLED
* FULFILLED
* SHIPPED
* DELIVERED
* COMPLETED
* CANCELLED
* REFUND_PENDING
* REFUNDED
* PARTIALLY_REFUNDED
* RETURN_REQUESTED
* RETURNED

Do not allow arbitrary status mutation.

Define:

* allowed transitions
* actor
* authorization
* side effects
* emitted events
* audit requirements
* invalid transitions
* retry behavior

Separate order status from payment status and fulfillment status where necessary.

---

# 17. PAYMENT ARCHITECTURE

Define Stripe integration boundaries.

The backend must remain authoritative for payment state.

Define:

* payment intent creation
* payment confirmation
* payment attempt
* payment state
* Stripe identifiers
* webhook verification
* webhook persistence
* webhook idempotency
* reconciliation
* refunds
* partial refunds
* failed payments
* disputed payments where applicable

Never trust client-provided payment success claims.

---

# 18. PAYMENT WEBHOOK CONTRACT

Every webhook must have:

* provider event ID
* event type
* received timestamp
* processing state
* retry count
* payload reference where appropriate
* signature verification result
* processed timestamp
* failure reason where appropriate

Define unique constraints preventing duplicate processing.

Define behavior for:

* duplicate webhook delivery
* out-of-order webhook delivery
* delayed webhook delivery
* unknown webhook type
* malformed webhook
* signature failure
* processing failure

Webhook processing must be idempotent.

---

# 19. PAYMENT RECONCILIATION

Define reconciliation mechanisms between:

* internal payment records
* Stripe state
* orders
* refunds

Specify:

* scheduled reconciliation
* discrepancy detection
* retry
* administrative investigation
* audit records
* customer-visible state

A temporary provider outage must not corrupt authoritative order state.

---

# 20. PROMOTION AND COUPON CONTRACT

Define:

* promotion eligibility
* coupon ownership
* usage limits
* customer limits
* seller limits
* product/category applicability
* minimum order values
* expiration
* stacking
* priority
* exclusivity
* abuse prevention

Define concurrency-safe redemption.

Coupon redemption must not exceed configured limits under concurrent requests.

---

# 21. SHIPPING AND FULFILLMENT

Define fulfillment architecture.

Support:

* seller fulfillment
* platform fulfillment where applicable
* shipment creation
* shipment splitting
* multiple shipments per order
* shipment tracking
* carrier integration boundaries
* tracking events
* delivery status

Define separation between:

* Order
* FulfillmentOrder
* Shipment
* ShipmentItem
* TrackingEvent

---

# 22. RETURNS AND REFUNDS

Define:

* return eligibility
* return windows
* return reasons
* approval
* rejected returns
* received returns
* refund eligibility
* partial refunds
* restocking where applicable
* seller responsibility
* platform responsibility

Ensure return state does not incorrectly overwrite the original order history.

---

# 23. REVIEW ARCHITECTURE

Define:

* review eligibility
* verified purchase relationship
* rating scale
* title/body
* media
* moderation
* editing
* deletion
* reporting
* helpful votes
* seller/product relationship

Prevent:

* duplicate reviews
* fake verified purchases
* seller manipulation
* vote manipulation
* unauthorized moderation

Define rating aggregation strategy.

---

# 24. SEARCH ARCHITECTURE

PostgreSQL remains the source of truth.

Search is a derived projection.

Define the search document structure.

Include:

* product ID
* variant identifiers
* SKU identifiers
* title
* normalized title
* description
* brand
* category hierarchy
* attributes
* searchable keywords
* seller/offer information
* price
* availability
* rating
* review count
* popularity signals
* media
* visibility state

Define which fields are:

* searchable
* filterable
* sortable
* aggregatable
* exact-match

---

# 25. SEARCH INDEX VERSIONING

Define:

* index naming
* aliases
* versioning
* mappings
* analyzers
* synonym management
* zero-downtime reindexing
* backfill
* incremental updates
* deletion
* stale document handling
* rollback

Example conceptual strategy:

`products-vN`

with stable aliases for reads and writes.

The exact naming convention must be specified.

---

# 26. SEARCH CONSISTENCY

Define how catalog changes propagate to search.

Specify:

* source event
* event payload
* consumer
* indexing operation
* retries
* idempotency
* ordering
* dead-letter behavior
* reconciliation
* full reindex process

Search failures must not block authoritative catalog writes unless explicitly justified.

---

# 27. SEARCH AUTHORIZATION

Search results must respect:

* product visibility
* seller status
* offer status
* geographic restrictions
* restricted products
* customer eligibility where applicable

Do not rely exclusively on frontend filtering for access control.

---

# 28. MEDIA ARCHITECTURE

Define the MediaAsset model.

Specify:

* media ID
* owner
* owner type
* original filename
* MIME type
* size
* checksum
* storage key
* status
* dimensions
* processing state
* moderation state
* visibility
* createdAt
* deletedAt

Define S3 key conventions.

Example conceptual hierarchy:

* product media
* review media
* seller media
* user media
* administrative media

Do not use user-controlled filenames as authoritative object keys.

---

# 29. MEDIA PROCESSING

Define the processing lifecycle:

1. upload initialization
2. secure upload
3. validation
4. malware/content validation where required
5. processing
6. transformation
7. thumbnail generation
8. optimized variants
9. moderation
10. publication
11. CDN delivery

Define:

* processing failures
* retries
* cleanup
* orphaned objects
* lifecycle policies
* access controls

---

# 30. CDN ARCHITECTURE

Define CloudFront behavior.

Specify:

* public vs private assets
* signed URLs/cookies where required
* cache headers
* cache invalidation strategy
* asset versioning
* object naming
* origin access
* hotlink considerations

Never expose private objects merely because a URL is predictable.

---

# 31. REDIS CONTRACT

Define a Redis namespace.

Every Redis data structure must document:

* key format
* purpose
* value format
* TTL
* invalidation
* ownership
* stale behavior
* fallback behavior

Cover:

* sessions where appropriate
* rate limits
* cart cache where appropriate
* product cache
* frequently accessed configuration
* distributed locks where justified
* idempotency helpers
* temporary state
* presence if applicable

Redis must never silently become the only durable source of critical business state.

---

# 32. API CONTRACT

Define the complete REST API architecture.

Every endpoint specification must include:

* HTTP method
* route
* authentication requirement
* authorization requirement
* request parameters
* request body
* response body
* status codes
* error codes
* pagination
* filtering
* sorting
* idempotency requirements
* rate limits
* audit requirements where applicable

Cover at minimum:

### Authentication

* registration
* login
* logout
* session management
* password management
* account recovery
* device/session management

### Customer

* profile
* addresses
* preferences

### Catalog

* products
* variants
* SKUs
* categories
* brands
* attributes

### Sellers

* seller registration
* seller profile
* seller users
* offers
* seller inventory
* seller orders

### Cart

* create/get cart
* add item
* update quantity
* remove item
* merge cart

### Checkout

* create checkout
* validate checkout
* reserve inventory
* payment preparation
* complete checkout

### Orders

* list orders
* retrieve order
* cancel order
* returns
* refunds where customer-accessible

### Reviews

* create
* update
* delete
* report
* vote

### Search

* query
* autocomplete
* filters
* sorting
* facets

### Notifications

* list
* read
* preferences

### Administration

* catalog moderation
* seller moderation
* order management
* refunds
* user management
* audit access

---

# 33. API RESPONSE STANDARD

Define one consistent response strategy.

Specify:

* resource representation
* metadata
* pagination
* request identifiers
* timestamps
* nullable values
* enum serialization
* error structure

Avoid inconsistent response formats across domains.

---

# 34. PAGINATION CONTRACT

Define a canonical pagination strategy.

Prefer cursor pagination for large/high-volume collections.

Define:

* cursor encoding
* sort order
* stable ordering
* page size
* maximum page size
* next cursor
* previous cursor where supported
* deleted records
* concurrent inserts

Offset pagination may be permitted for bounded administrative views where appropriate.

---

# 35. ERROR CONTRACT

Define a canonical machine-readable error model.

Include:

* HTTP status
* application error code
* message
* request ID
* field validation errors
* retryability
* documentation reference where appropriate

Define domain-specific error codes for:

* authentication
* authorization
* validation
* inventory
* checkout
* payment
* seller
* catalog
* order
* shipping
* promotion

Do not expose internal stack traces or sensitive provider details.

---

# 36. IDEMPOTENCY CONTRACT

Define idempotency requirements for:

* checkout
* order creation
* payment creation
* payment confirmation
* refunds
* coupon redemption
* inventory reservation
* webhook processing
* seller payout-related operations
* external integrations

Specify:

* idempotency key format
* scope
* TTL
* request fingerprint
* stored response
* conflict behavior
* replay behavior

---

# 37. EVENT CONTRACT

Define a canonical event envelope.

Every event should contain, where applicable:

* event ID
* event type
* event version
* aggregate ID
* aggregate type
* producer
* occurredAt
* correlation ID
* causation ID
* trace ID
* payload

Define event versioning and compatibility.

---

# 38. EVENT TOPICS

Define topic boundaries.

Examples:

* identity.events
* catalog.events
* seller.events
* pricing.events
* inventory.events
* cart.events
* checkout.events
* order.events
* payment.events
* fulfillment.events
* review.events
* media.events
* notification.events

Specify partitioning strategy.

For events requiring ordering, define the partition key.

---

# 39. OUTBOX ARCHITECTURE

Define the transactional outbox pattern.

A domain transaction must be able to atomically commit:

* business state
* corresponding outbox record

Define:

* outbox schema
* unpublished state
* publication
* retry
* locking
* duplicate publication
* cleanup
* retention
* replay

Consumers must be idempotent.

---

# 40. EVENT DELIVERY GUARANTEES

Define:

* at-least-once delivery
* duplicate handling
* ordering requirements
* retries
* exponential backoff
* dead-letter queues
* poison messages
* replay
* schema evolution

Do not claim exactly-once semantics unless technically guaranteed end-to-end.

---

# 41. BULLMQ CONTRACT

Define queue/job contracts.

For every major job specify:

* queue
* job name
* input
* output
* retry policy
* timeout
* backoff
* concurrency
* idempotency
* priority
* dead-letter behavior
* observability
* graceful shutdown

Cover jobs such as:

* media processing
* search indexing
* notifications
* abandoned cart processing
* inventory expiration
* payment reconciliation
* order processing
* shipment synchronization
* analytics processing
* cleanup

---

# 42. NOTIFICATION ARCHITECTURE

Define notification channels:

* in-app
* email
* push
* SMS where justified

Define:

* notification type
* recipient
* template
* locale
* preference
* delivery state
* retry state
* provider message ID
* deduplication

Customer notification preferences must be respected server-side.

---

# 43. ANALYTICS ARCHITECTURE

Define business events for:

* product view
* search
* add to cart
* remove from cart
* checkout start
* checkout failure
* purchase
* cancellation
* refund
* review
* seller activity

Separate:

* operational events
* business analytics events
* security/audit events

Define privacy requirements and retention.

---

# 44. FRONTEND CONTRACT

Define frontend architecture boundaries.

Specify:

* server state vs client state
* TanStack Query responsibilities
* Zustand responsibilities
* server rendering
* client components
* URL state
* optimistic updates
* cache invalidation
* loading states
* error states
* retry behavior
* accessibility
* SEO

The frontend must not become the source of truth for:

* prices
* inventory
* permissions
* payment state
* order state
* promotion eligibility

---

# 45. MOBILE CONTRACT

Define React Native/Expo architecture.

Specify:

* navigation
* authentication persistence
* API client
* query cache
* offline behavior
* retry behavior
* secure storage
* deep links
* push notifications
* media upload
* error handling

Define which operations are allowed offline and how conflicts are resolved.

---

# 46. CACHE INVALIDATION CONTRACT

For each cacheable resource define:

* source of truth
* cache key
* TTL
* invalidation event
* stale behavior
* fallback
* negative caching where appropriate

At minimum cover:

* product
* category
* seller
* pricing
* cart
* customer profile
* configuration

Never cache personalized data under shared keys.

---

# 47. AUTHORIZATION MATRIX

Produce a permission matrix covering at minimum:

### Customer

* own profile
* own addresses
* own carts
* own orders
* own reviews

### Seller

* own seller profile
* own products where permitted
* own offers
* own inventory
* own orders
* own fulfillment
* own analytics

### Seller Administrator

* seller management
* seller users
* seller financial settings

### Platform Support

* customer support
* order support
* limited administrative actions

### Platform Administrator

* global platform management

### Super Administrator

* highly restricted system-level operations

Define explicit deny rules.

---

# 48. SECURITY THREAT MODEL

Analyze:

* authentication attacks
* credential stuffing
* brute force
* session theft
* IDOR
* privilege escalation
* seller isolation failures
* SQL injection
* NoSQL/search injection where applicable
* XSS
* CSRF
* SSRF
* command injection
* malicious uploads
* payment manipulation
* coupon abuse
* inventory abuse
* price manipulation
* webhook spoofing
* replay attacks
* API abuse
* rate-limit bypass
* bot activity
* scraping
* account takeover

For each threat define:

* attack surface
* mitigation
* detection
* response

---

# 49. PRIVACY AND DATA EXPOSURE MATRIX

Define what data is visible to:

* anonymous customer
* authenticated customer
* seller
* seller employee
* support staff
* administrator
* external providers
* analytics systems

Explicitly classify:

* public
* private
* seller-private
* administrative
* sensitive
* operational

Define retention and deletion behavior.

---

# 50. AUDIT ARCHITECTURE

Define immutable audit events for sensitive operations.

At minimum include:

* authentication changes
* role changes
* seller changes
* catalog moderation
* price changes
* inventory adjustments
* order administrative actions
* refunds
* payment operations
* permission changes
* account recovery
* security-sensitive actions

Audit records should contain:

* actor
* action
* target
* timestamp
* request ID
* IP metadata where appropriate
* outcome
* relevant metadata

Never store secrets in audit records.

---

# 51. OBSERVABILITY CONTRACT

Define:

### Logs

Structured logs with:

* timestamp
* level
* service
* environment
* request ID
* correlation ID
* trace ID
* operation
* outcome

### Metrics

At minimum:

* request rate
* latency
* error rate
* database latency
* Redis latency
* queue depth
* job failures
* event lag
* payment failures
* checkout failures
* inventory reservation failures
* search latency
* search indexing failures

### Tracing

Trace:

* HTTP requests
* database operations
* Redis
* queues
* Kafka/Redpanda
* payment providers
* storage
* search

Do not log:

* passwords
* access tokens
* refresh tokens
* payment secrets
* secret keys
* unnecessary personal information

---

# 52. RELIABILITY ARCHITECTURE

Define behavior for:

* PostgreSQL outage
* Redis outage
* search outage
* Stripe outage
* S3 outage
* CDN outage
* Kafka outage
* worker outage
* notification provider outage

For each dependency define:

* timeout
* retry
* backoff
* circuit breaking where appropriate
* fallback
* degraded mode
* recovery

Critical commerce operations must not silently depend on noncritical systems.

---

# 53. FAILURE MATRIX

Produce a detailed failure matrix covering at minimum:

| Failure                  | User impact | Detection | Recovery | Data consistency strategy |
| ------------------------ | ----------- | --------- | -------- | ------------------------- |
| PostgreSQL unavailable   | ...         | ...       | ...      | ...                       |
| Redis unavailable        | ...         | ...       | ...      | ...                       |
| Search unavailable       | ...         | ...       | ...      | ...                       |
| Stripe unavailable       | ...         | ...       | ...      | ...                       |
| S3 unavailable           | ...         | ...       | ...      | ...                       |
| Event broker unavailable | ...         | ...       | ...      | ...                       |
| Worker unavailable       | ...         | ...       | ...      | ...                       |

Expand this significantly beyond the examples.

---

# 54. CONCURRENCY MATRIX

Identify all operations vulnerable to race conditions.

At minimum:

* inventory reservation
* cart quantity update
* checkout
* coupon redemption
* order cancellation
* refund
* review creation
* seller offer updates
* price changes
* payment state changes

For each specify:

* concurrency hazard
* authoritative record
* transaction
* lock/version mechanism
* idempotency strategy
* resulting invariant

---

# 55. CONSISTENCY MATRIX

Define consistency requirements for:

* catalog
* pricing
* inventory
* cart
* checkout
* orders
* payments
* fulfillment
* search
* notifications
* analytics

Classify each as:

* strongly consistent
* transactionally consistent
* eventually consistent
* best effort

Explain why.

---

# 56. API / EVENT / DATABASE CONSISTENCY

Create a cross-system mapping showing:

**Domain entity → PostgreSQL model → API resource → domain event → search document → cache key → queue/job → external provider**

At minimum include:

* Product
* SellerOffer
* Inventory
* Cart
* Checkout
* Order
* Payment
* Shipment
* Review

This matrix must ensure that later implementation phases do not invent incompatible contracts.

---

# 57. API SECURITY

Define:

* authentication middleware
* authorization guards
* request validation
* body size limits
* upload limits
* rate limits
* abuse detection
* CORS
* CSRF strategy
* security headers
* API versioning
* request IDs
* idempotency

All authorization decisions must occur server-side.

---

# 58. RATE LIMITING

Define limits for:

* authentication
* registration
* password recovery
* product search
* product creation
* cart mutations
* checkout
* payment operations
* reviews
* coupon attempts
* administrative endpoints

Specify:

* identity dimension
* IP dimension
* account dimension
* seller dimension
* endpoint dimension
* Redis strategy
* response behavior

---

# 59. API VERSIONING

Define:

* versioning strategy
* backward compatibility
* deprecation policy
* migration process
* event versioning
* database migration compatibility

Prefer additive API changes where possible.

---

# 60. DATABASE MIGRATION STRATEGY

Define safe migration principles:

* backward-compatible changes
* expand/contract migrations
* large-table migration strategy
* index creation
* data backfills
* rollback limitations
* deployment ordering
* application/database compatibility

Never assume a destructive migration can be performed instantly in production.

---

# 61. INFRASTRUCTURE ARCHITECTURE

Define production infrastructure requirements.

Include:

* AWS account structure
* networking
* VPC
* private/public subnets
* load balancing
* compute
* PostgreSQL
* Redis
* Kafka/Redpanda
* search
* S3
* CloudFront
* secrets
* observability
* backups
* DNS
* certificates

Define which resources must remain private.

---

# 62. ENVIRONMENT STRATEGY

Define:

* local
* development
* staging
* production

For each environment define:

* databases
* secrets
* storage
* external providers
* domain
* observability
* deployment policy

Never share production credentials with lower environments.

---

# 63. DEPLOYMENT STRATEGY

Define:

* CI
* testing gates
* build
* artifact management
* migrations
* deployment
* health checks
* readiness
* rollback
* smoke tests
* post-deployment validation

Specify whether the architecture favors:

* rolling deployments
* blue/green
* canary

and explain why.

---

# 64. BACKUP AND DISASTER RECOVERY

Define:

* PostgreSQL backups
* point-in-time recovery
* S3 protection
* search reconstruction
* Redis recovery expectations
* event replay
* infrastructure recreation

Define:

* RPO
* RTO
* backup retention
* restore testing
* disaster scenarios

Search must be reconstructable from authoritative sources.

---

# 65. DATA RETENTION

Define retention for:

* users
* sessions
* carts
* orders
* payment records
* webhook events
* audit logs
* analytics events
* media
* search documents
* notifications
* operational logs

Distinguish:

* legal retention
* business retention
* privacy deletion
* security retention

---

# 66. TEST ARCHITECTURE

Define the required testing layers.

### Unit

Domain rules and pure logic.

### Integration

* PostgreSQL
* Prisma
* Redis
* search
* queues

### API

Endpoint contracts and authorization.

### Contract

API/event/provider contracts.

### Event

Producer/consumer compatibility.

### Payment

Stripe webhook and idempotency behavior.

### Concurrency

Inventory, checkout, coupons, payments.

### Security

Authorization, IDOR, injection, abuse.

### E2E

Customer purchasing lifecycle.

### Mobile

Authentication, cart, checkout, order lifecycle.

### Accessibility

Web/mobile accessibility requirements.

### Performance

Search, catalog, checkout, APIs.

### Resilience

Dependency outages and recovery.

### Disaster recovery

Backup restoration and system reconstruction.

---

# 67. END-TO-END CRITICAL FLOWS

Define detailed architectural sequences for:

## Customer registration

Registration → verification → authentication → session → profile.

## Product discovery

Request → API → cache/search → authorization → response.

## Add to cart

Product validation → offer validation → cart mutation → persistence → cache invalidation.

## Checkout

Cart → validation → pricing → promotion → inventory → reservation → payment → order → events → fulfillment.

## Payment webhook

Stripe → signature verification → persistence → idempotency → state transition → event → downstream processing.

## Order fulfillment

Order → fulfillment → shipment → carrier → tracking → delivery.

## Review

Order eligibility → review → moderation → publication → rating aggregation → search/cache updates.

## Seller offer update

Seller authentication → authorization → validation → transaction → event → search/cache projection.

For every flow identify:

* synchronous operations
* asynchronous operations
* database transactions
* external calls
* events
* queues
* failure paths
* idempotency
* observability

---

# 68. SECURITY BOUNDARY DIAGRAM

Describe the security boundaries between:

* browser
* mobile client
* API
* authentication
* domain services
* PostgreSQL
* Redis
* search
* event broker
* workers
* S3
* CloudFront
* Stripe
* notification providers
* administrators

For each boundary identify:

* trust level
* authentication
* authorization
* encryption
* validation
* logging

---

# 69. DOMAIN OWNERSHIP MATRIX

Create a matrix showing which bounded context owns:

* data
* business rules
* writes
* reads
* events
* APIs

No bounded context should directly mutate another bounded context's authoritative data without a defined contract.

---

# 70. EXTERNAL INTEGRATION CONTRACTS

Define boundaries for:

* Stripe
* AWS S3
* CloudFront
* email provider
* push provider
* shipping providers
* tax provider if introduced
* analytics provider if introduced

For every external provider define:

* authentication
* timeout
* retry
* idempotency
* webhook
* failure behavior
* rate limits
* reconciliation
* secrets
* observability

Do not invent provider capabilities.

---

# 71. SEARCH / CACHE / EVENT INVALIDATION MATRIX

Create a matrix showing how changes propagate.

Example conceptual structure:

| Source change     | Database      | Event            | Search              | Redis      | Notification |
| ----------------- | ------------- | ---------------- | ------------------- | ---------- | ------------ |
| Product update    | Authoritative | ProductUpdated   | Reindex             | Invalidate | Optional     |
| Price update      | Authoritative | PriceUpdated     | Update projection   | Invalidate | Optional     |
| Inventory update  | Authoritative | InventoryChanged | Update availability | Invalidate | Optional     |
| Seller suspension | Authoritative | SellerSuspended  | Remove offers       | Invalidate | Required     |

Expand for all critical domains.

---

# 72. OPERATIONAL RUNBOOK REQUIREMENTS

Define required runbooks for:

* database outage
* Redis outage
* search outage
* payment outage
* event broker outage
* queue backlog
* failed migrations
* failed deployments
* inventory reconciliation
* payment reconciliation
* search reindex
* media processing backlog
* suspicious seller activity
* account takeover
* data restoration

Do not implement runbooks yet; specify their required contents and triggers.

---

# 73. ADMINISTRATIVE SAFETY

Administrative actions must use:

* strong authentication
* explicit permissions
* audit logging
* confirmation for destructive operations
* reason capture where appropriate
* rate limiting
* separation of duties for sensitive financial actions

Define which actions require elevated privileges.

---

# 74. ABUSE PREVENTION

Define protections against:

* fake accounts
* coupon farming
* inventory hoarding
* checkout abuse
* payment abuse
* review spam
* seller manipulation
* automated scraping
* credential stuffing
* malicious uploads

The architecture must distinguish legitimate high-volume traffic from abuse where possible.

---

# 75. SEO ARCHITECTURE

For public web pages define:

* canonical URLs
* metadata
* structured data
* sitemap
* robots policy
* indexing rules
* pagination SEO
* category pages
* product pages
* seller pages where appropriate

Private/personalized pages must not be unintentionally indexed.

---

# 76. ACCESSIBILITY ARCHITECTURE

Define requirements for:

* keyboard navigation
* semantic HTML
* screen readers
* focus management
* contrast
* form validation
* error messaging
* loading states
* modal behavior
* responsive layouts

Target WCAG 2.2 AA unless a documented repository constraint requires another standard.

---

# 77. INTERNATIONALIZATION

Define architecture for:

* locale
* language
* currency
* number formatting
* date/time formatting
* address formats
* tax differences
* shipping differences
* translated product content where supported

Do not assume every market shares identical commerce rules.

---

# 78. CONFIGURATION ARCHITECTURE

Separate:

* source-controlled configuration
* environment configuration
* secrets
* feature flags
* runtime business configuration

Define configuration precedence and validation.

The application must fail safely when required configuration is missing.

---

# 79. FEATURE FLAG ARCHITECTURE

Define:

* flag ownership
* environments
* default values
* rollout
* user targeting
* seller targeting
* emergency disablement
* auditability
* cleanup

Feature flags must not become permanent undocumented architecture.

---

# 80. PERFORMANCE ARCHITECTURE

Define performance targets for:

* homepage
* product page
* category page
* search
* cart
* checkout
* customer account
* seller dashboard
* administrative operations

Define:

* latency targets
* throughput targets
* database optimization
* caching
* pagination
* search optimization
* asynchronous processing

Avoid premature microservice decomposition.

---

# 81. SCALING STRATEGY

Define scaling boundaries for:

* API
* workers
* database
* Redis
* search
* event broker
* media processing

Identify likely bottlenecks.

Define horizontal vs vertical scaling.

Explain which components may eventually require independent scaling.

---

# 82. SERVICE BOUNDARY STRATEGY

Do not create microservices merely because domains exist.

Define the initial deployment boundary.

Prefer a modular architecture where appropriate while maintaining explicit domain boundaries.

Document what would justify extraction into independent services later.

---

# 83. IMPLEMENTATION ORDER

Define the recommended implementation dependency order.

It should cover:

1. platform foundation
2. identity
3. customer
4. catalog
5. seller
6. pricing
7. inventory
8. cart
9. checkout
10. payments
11. orders
12. fulfillment
13. reviews
14. search
15. notifications
16. administration
17. analytics
18. infrastructure hardening
19. final QA

Adjust this order according to the actual repository.

The order must respect dependencies.

---

# 84. ARCHITECTURAL DECISION RECORDS

Produce ADRs for significant decisions, including at minimum:

* PostgreSQL as transactional authority
* Prisma
* modular backend architecture
* Redis usage
* search projection
* Stripe integration
* inventory reservation
* transactional outbox
* event broker
* BullMQ
* S3/CloudFront
* API versioning
* cursor pagination
* identifier strategy
* money representation
* seller isolation
* deployment strategy

For every ADR include:

* decision
* alternatives
* rationale
* consequences
* operational implications

---

# 85. ARCHITECTURAL INVARIANTS

Produce an explicit invariant list.

At minimum:

* clients cannot authorize themselves
* seller data cannot cross seller boundaries
* PostgreSQL is authoritative for commerce state
* Redis cannot be the sole source of critical business state
* search is derived
* payment state comes from verified server-side integration
* webhook processing is idempotent
* inventory cannot oversell because of race conditions
* historical orders remain immutable
* monetary values use exact representation
* critical mutations are idempotent
* events can be duplicated safely
* external provider failures cannot corrupt transactional state
* private media remains protected
* administrative actions are audited

Add all other invariants discovered during architecture.

---

# 86. CONTRACT COMPLETENESS CHECK

Before finishing, verify that every major domain has:

* database model
* ownership
* API contract
* authorization
* event contract
* cache strategy
* queue strategy if required
* search strategy if required
* audit requirements
* observability
* failure behavior
* concurrency behavior
* testing requirements

Identify any missing contract explicitly.

---

# 87. ARCHITECTURE VALIDATION

Perform a final architecture review.

Validate:

### Database

* relationships are consistent
* constraints are sufficient
* indexes support expected queries
* lifecycle is defined
* concurrency is addressed

### API

* resources are consistent
* authorization is explicit
* errors are standardized
* pagination is consistent
* idempotency is defined

### Events

* envelope is consistent
* versions are defined
* partitioning is defined
* consumers are idempotent
* replay is possible

### Payments

* provider state cannot be trusted from the client
* webhooks are verified
* duplicates are safe
* reconciliation exists

### Inventory

* reservation is concurrency-safe
* expiration is defined
* release is defined
* reconciliation exists

### Search

* source of truth is explicit
* indexing is asynchronous
* aliases/versioning exist
* reindexing is possible

### Media

* uploads are untrusted
* processing is asynchronous
* private objects are protected
* cleanup exists

### Security

* authorization is server-side
* seller isolation is enforced
* sensitive operations are audited
* abuse controls exist

### Operations

* observability exists
* backups exist
* disaster recovery exists
* deployment/rollback exists
* runbooks are defined

---

# 88. REQUIRED FINAL ARCHITECTURE OUTPUT

Your final architecture document must contain, at minimum:

1. Repository audit
2. Architecture summary
3. System boundaries
4. Domain boundaries
5. Domain ownership matrix
6. Source-of-truth matrix
7. Detailed entity model
8. Database constraints and indexes
9. Identifier strategy
10. Timestamp strategy
11. Money/currency strategy
12. Catalog model
13. Seller model
14. Pricing model
15. Inventory model
16. Cart model
17. Checkout model
18. Order model
19. Payment model
20. Fulfillment model
21. Return/refund model
22. Review model
23. Search model
24. Media model
25. Redis architecture
26. API architecture
27. API endpoint contracts
28. Error contracts
29. Pagination contracts
30. Idempotency contracts
31. Event architecture
32. Event envelope
33. Event catalog
34. Topic strategy
35. Outbox architecture
36. Queue/job architecture
37. Notification architecture
38. Analytics architecture
39. Authentication architecture
40. Authorization matrix
41. Security threat model
42. Privacy/data exposure matrix
43. Audit architecture
44. Observability architecture
45. Reliability architecture
46. Failure matrix
47. Concurrency matrix
48. Consistency matrix
49. Search/cache/event propagation matrix
50. Frontend architecture
51. Mobile architecture
52. SEO architecture
53. Accessibility architecture
54. Internationalization
55. Infrastructure architecture
56. Environment strategy
57. Deployment strategy
58. Backup/DR
59. Data retention
60. Testing architecture
61. Critical end-to-end flows
62. External integration contracts
63. Operational runbooks
64. ADRs
65. Architectural invariants
66. Implementation dependency order
67. Contract completeness review
68. Final architecture validation

---

# 89. IMPORTANT IMPLEMENTATION BOUNDARY

This architecture phase ends with specifications and engineering decisions.

Do not cross into implementation.

Do not generate:

* TypeScript source
* Prisma schema
* SQL migrations
* NestJS controllers
* NestJS services
* React components
* React Native components
* Terraform
* Kubernetes YAML
* Dockerfiles
* CI/CD scripts

The purpose of this document is to make the implementation phases deterministic and internally consistent.

---

# 90. STANDALONE REQUIREMENT

This prompt must work as a standalone instruction.

Do not assume:

* another prompt exists
* another architecture document exists
* another conversation exists
* previous instructions were pasted
* previous decisions were approved
* a previous volume was completed
* Claude remembers any prior architecture

The **actual repository** is the only implementation-state dependency.

If the repository is empty, establish the architecture from the requirements in this prompt.

If the repository already contains implementation, inspect it and preserve compatible work.

Every future implementation must integrate with the actual repository and the contracts established by the architecture.

---

# 91. FINAL ENGINEERING STANDARD

The resulting architecture must be suitable for a serious production ecommerce marketplace operated by a funded startup.

Optimize for:

* correctness
* security
* maintainability
* scalability
* observability
* reliability
* operational simplicity
* testability
* backwards compatibility
* developer experience

Do not optimize for:

* superficial feature count
* artificial microservice complexity
* shortcuts
* placeholder architecture
* demo-only behavior

When requirements conflict, explicitly identify the conflict, select the safest production-grade decision, and document the rationale.

When uncertainty exists, do not invent provider capabilities or undocumented behavior.

The architecture must be internally consistent from:

**database → domain → API → events → queues → cache → search → media → frontend → mobile → infrastructure → observability → security → testing.**

Finish with a rigorous architecture validation and a clear implementation boundary.

**DO NOT IMPLEMENT THE SYSTEM IN THIS PHASE**

You are operating in Senior Engineering Team Mode.

Complete the remaining enterprise architecture for a production-ready global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate application source code.

Produce architecture, specifications, contracts, diagrams, engineering decisions, operational strategies, security models, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready global ecommerce marketplace supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High search traffic
• High inventory throughput
• Large payment volumes
• Multi-seller orders
• Global fulfillment
• Multiple currencies
• Multiple languages
• Regional pricing
• Regional taxes
• Regional shipping
• High availability
• Horizontal scaling
• Multi-region deployment
• Zero-downtime deployment
• Disaster recovery

The platform must provide:

• Customer marketplace
• Seller platform
• Administration platform
• Public APIs
• Internal services
• Marketplace payments
• Seller payouts
• Inventory management
• Fulfillment
• Shipping
• Returns
• Reviews
• Recommendations
• Search
• Analytics
• Messaging
• CMS
• Moderation

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui
• TanStack Query
• Zustand

Mobile:

• React Native
• Expo
• TypeScript

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

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Queues:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

Communication:

• REST
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

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

Secrets:

• AWS Secrets Manager
• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

VOLUME 2 OBJECTIVE

Complete the architecture for:

1. Advanced seller architecture
2. Seller onboarding and verification
3. Multi-seller marketplace isolation
4. Product publishing workflows
5. Catalog moderation
6. Advanced inventory and fulfillment
7. Multi-warehouse inventory
8. Order orchestration
9. Split-order architecture
10. Shipping architecture
11. Returns and exchanges
12. Marketplace payment settlement
13. Seller payouts
14. Tax architecture
15. Regional pricing
16. Promotions and coupon engine
17. Recommendation architecture
18. Advanced search
19. Reviews and trust systems
20. Customer/seller messaging
21. Notifications
22. Analytics architecture
23. Fraud prevention
24. Administration
25. CMS
26. Moderation
27. Feature flags
28. Localization
29. Multi-region architecture
30. Deployment architecture
31. Kubernetes topology
32. Disaster recovery
33. Security threat model
34. Observability
35. Capacity planning
36. Failure scenarios
37. Data consistency
38. Testing strategy
39. Architectural Decision Records
40. Backend implementation roadmap
41. Complete Project Index

────────────────────────────────────────

SELLER ONBOARDING ARCHITECTURE

Design the complete seller lifecycle.

Support:

• Seller registration
• Identity verification
• Business verification
• Tax information
• Banking/payout configuration
• Store creation
• Seller approval
• Seller suspension
• Seller reactivation
• Seller termination

Define seller states:

• Pending
• Verification Required
• Under Review
• Approved
• Suspended
• Rejected
• Terminated

Define:

• State ownership
• Transition rules
• Required documentation
• Audit requirements
• Approval workflows
• Retry behavior

────────────────────────────────────────

SELLER ISOLATION

Design strong seller/store isolation.

Define:

• Seller ownership
• Store ownership
• Seller staff access
• Product ownership
• Inventory ownership
• Order visibility
• Customer-data visibility
• Financial-data visibility

A seller must never access another seller's:

• Customers
• Orders
• Inventory
• Payouts
• Reports
• Internal data

unless explicitly authorized by platform administration.

────────────────────────────────────────

SELLER STAFF

Support:

• Seller owner
• Manager
• Catalog manager
• Inventory manager
• Fulfillment staff
• Customer support
• Finance staff

Define:

• Seller-scoped roles
• Permissions
• Resource access
• Audit requirements

Seller staff permissions must be enforced server-side.

────────────────────────────────────────

PRODUCT LIFECYCLE

Design the complete product publishing workflow.

Support:

Draft
→ Submitted
→ Validation
→ Moderation
→ Approved
→ Published
→ Suspended
→ Archived

Define:

• Product ownership
• Variant validation
• Media validation
• Category validation
• Brand validation
• Attribute validation
• Content policy checks
• Approval requirements
• Scheduled publishing
• Unpublishing

Product publication must not automatically imply inventory availability.

────────────────────────────────────────

CATALOG ARCHITECTURE

Design advanced catalog support for:

• Categories
• Brands
• Products
• Variants
• Attributes
• Specifications
• Product bundles where appropriate
• Product relationships
• Related products
• Cross-sells
• Upsells
• Localized metadata

Define:

• Product identity
• Seller-specific offers
• Canonical product model where appropriate
• Variant model
• Offer model
• Availability

Separate:

• Product catalog data
• Seller offer data
• Inventory
• Pricing
• Fulfillment

────────────────────────────────────────

OFFER ARCHITECTURE

For marketplaces with multiple sellers offering similar products, define the relationship among:

• Canonical product
• Seller offer
• Seller price
• Seller inventory
• Seller fulfillment
• Seller condition
• Seller rating

Define how the marketplace selects or ranks offers.

Do not merge unrelated seller inventory into a single authoritative stock record.

────────────────────────────────────────

INVENTORY ARCHITECTURE

Complete advanced inventory architecture.

Support:

• Multiple warehouses
• Warehouse zones
• Inventory locations
• Available inventory
• Reserved inventory
• Damaged inventory
• Safety stock
• In-transit inventory
• Inventory adjustments
• Inventory transfers
• Stock reconciliation
• Reservation expiration
• Low-stock alerts

Define:

• Inventory ownership
• Reservation lifecycle
• Concurrency strategy
• Locking strategy
• Idempotency
• Reconciliation

────────────────────────────────────────

MULTI-WAREHOUSE INVENTORY

Design inventory allocation across multiple warehouses.

Support:

• Warehouse selection
• Regional inventory
• Allocation rules
• Proximity
• Capacity
• Shipping speed
• Seller ownership
• Fulfillment restrictions

Define the allocation process when:

• One warehouse lacks inventory
• Multiple warehouses can fulfill
• Inventory changes during checkout
• Warehouse becomes unavailable

────────────────────────────────────────

INVENTORY RESERVATIONS

Define the complete reservation state machine.

Support:

• Reservation creation
• Reservation confirmation
• Reservation expiration
• Reservation release
• Reservation adjustment
• Reservation failure

Prevent:

• Double reservation
• Reservation leaks
• Overselling
• Concurrent update corruption

Define timeout and recovery strategy.

────────────────────────────────────────

FULFILLMENT ARCHITECTURE

Support:

• Seller fulfillment
• Marketplace fulfillment
• Warehouse fulfillment
• Multi-warehouse fulfillment
• Partial fulfillment
• Backorders where appropriate
• Split shipments

Define:

• Fulfillment order
• Fulfillment group
• Fulfillment state
• Shipment relationship
• Seller responsibility
• Marketplace responsibility

────────────────────────────────────────

ORDER ORCHESTRATION

Complete the order state machine.

Support:

• Pending
• Awaiting Payment
• Confirmed
• Partially Fulfilled
• Fulfilled
• Shipped
• Delivered
• Partially Canceled
• Canceled
• Return Pending
• Returned
• Refunded
• Closed

Define:

• Allowed transitions
• Transition ownership
• Idempotency
• Event generation
• Audit requirements

────────────────────────────────────────

SPLIT ORDER ARCHITECTURE

Design orders containing:

• Multiple sellers
• Multiple fulfillment locations
• Multiple shipments
• Partial cancellation
• Partial refund
• Partial return

Define:

• Parent order
• Seller order
• Fulfillment order
• Shipment
• Payment allocation
• Commission allocation

Ensure financial consistency across split orders.

────────────────────────────────────────

SHIPPING ARCHITECTURE

Design:

• Shipping methods
• Shipping zones
• Rates
• Delivery estimates
• Carrier integrations
• Tracking
• Shipment states
• Delivery confirmation

Support integration with external shipping providers.

Define abstraction boundaries so provider-specific behavior does not leak into core order logic.

────────────────────────────────────────

RETURNS ARCHITECTURE

Support:

• Return eligibility
• Return request
• Return approval
• Return shipping
• Item receipt
• Inspection
• Approval/rejection
• Refund
• Exchange

Define policies based on:

• Product
• Seller
• Order
• Purchase date
• Regional law/policy
• Product condition

────────────────────────────────────────

EXCHANGES

Design:

• Exchange request
• Replacement inventory
• Exchange approval
• Replacement shipment
• Original-item return
• Financial adjustment

Define interactions with:

• Inventory
• Orders
• Payments
• Refunds
• Shipping

────────────────────────────────────────

TAX ARCHITECTURE

Design support for:

• Sales tax
• VAT
• GST
• Regional taxes
• Tax exemptions where appropriate
• Seller-specific tax obligations

Define:

• Tax calculation boundary
• Tax provider abstraction
• Tax jurisdiction
• Tax rounding
• Tax snapshots on orders
• Tax auditability

Historical orders must preserve the tax calculation used at purchase time.

────────────────────────────────────────

REGIONAL PRICING

Support:

• Multiple currencies
• Regional prices
• Seller-local pricing
• Currency conversion boundaries
• Price effective dates
• Price snapshots on orders

Do not recalculate historical order prices using current prices.

────────────────────────────────────────

PROMOTION ENGINE

Complete advanced promotions.

Support:

• Product promotions
• Category promotions
• Seller promotions
• Marketplace-wide promotions
• Coupon codes
• Automatic discounts
• Buy-one-get-one
• Quantity discounts where appropriate
• Minimum purchase
• Maximum discount
• Usage limits
• Customer limits
• Seller limits
• Regional restrictions
• Time windows

Define precedence when multiple discounts apply.

────────────────────────────────────────

COUPON ENGINE

Design:

• Coupon creation
• Activation
• Expiration
• Redemption
• Usage tracking
• Per-customer limits
• Global limits
• Eligibility rules

Prevent:

• Double redemption
• Race-condition over-redemption
• Coupon replay
• Coupon abuse

────────────────────────────────────────

RECOMMENDATION ARCHITECTURE

Design a recommendation system that can evolve from deterministic ranking to advanced ML.

Support:

• Recently viewed
• Frequently bought together
• Similar products
• Related products
• Personalized recommendations
• Trending
• Category recommendations
• Seller recommendations
• Cross-sells
• Upsells

Define:

• Candidate generation
• Ranking
• Event ingestion
• Features
• Batch processing
• Real-time signals
• Caching
• Experimentation
• Fallback recommendations

────────────────────────────────────────

SEARCH ARCHITECTURE

Complete advanced product search.

Support:

• Full-text search
• Autocomplete
• Typo tolerance
• Synonyms
• Facets
• Filters
• Sorting
• Range filters
• Category navigation
• Brand filtering
• Seller filtering
• Rating filtering
• Availability
• Regional availability
• Personalized ranking where appropriate

Define:

• Index mappings
• Sharding
• Replication
• Aliases
• Reindexing
• Version migration
• Ranking signals
• Search analytics

────────────────────────────────────────

SEARCH CONSISTENCY

Define:

• Acceptable search indexing delay
• Product publication behavior
• Price update propagation
• Inventory update propagation
• Seller suspension behavior
• Reindex failure behavior

Search must never be treated as the authoritative transaction database.

────────────────────────────────────────

REVIEWS AND TRUST

Complete review architecture.

Support:

• Verified purchase
• Ratings
• Text reviews
• Media reviews
• Seller response
• Report review
• Review moderation
• Rating aggregation
• Review abuse detection

Define:

• Eligibility
• Duplicate prevention
• Fraud detection
• Moderation
• Visibility states

────────────────────────────────────────

CUSTOMER/SELLER MESSAGING

Design secure marketplace messaging.

Support:

• Customer-seller conversations
• Order-related conversations
• Attachments
• Unread counts
• Message history
• Seller staff participation
• Automated responses

Define:

• Data visibility
• Retention
• Moderation boundaries
• Audit requirements
• Privacy

Do not expose unrelated customer information to sellers.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Complete notification design.

Channels:

• Email
• Push
• In-app
• SMS-ready abstraction

Events:

• Order
• Payment
• Shipment
• Return
• Refund
• Seller onboarding
• Seller order
• Inventory
• Promotion
• Security

Define:

• Preferences
• Templates
• Localization
• Scheduling
• Deduplication
• Retry
• Rate limiting
• Provider failover

────────────────────────────────────────

ANALYTICS ARCHITECTURE

Design analytics for:

Customer:

• DAU
• MAU
• Retention
• Conversion
• Cart abandonment
• Customer lifetime value

Product:

• Views
• Clicks
• Add-to-cart
• Conversion
• Revenue
• Returns

Seller:

• GMV
• Revenue
• Conversion
• Inventory turnover
• Cancellation
• Return rate
• Seller performance

Marketplace:

• GMV
• Revenue
• Take rate
• Orders
• AOV
• Search success
• Fulfillment performance

Operational:

• Checkout latency
• Payment failures
• Inventory failures
• Shipping failures
• Queue health

Define:

• Event ingestion
• Streaming
• Aggregation
• Warehousing boundaries
• Retention
• Privacy

Do not overload transactional PostgreSQL with analytical workloads.

────────────────────────────────────────

FRAUD PREVENTION

Complete marketplace fraud architecture.

Address:

• Payment fraud
• Account takeover
• Fake sellers
• Seller collusion
• Coupon abuse
• Promotion abuse
• Review manipulation
• Refund fraud
• Return fraud
• Inventory manipulation
• Automated purchasing

Define:

• Risk scoring
• Rules engine
• Device signals
• Account signals
• Transaction signals
• Seller reputation
• Manual review
• Automated actions
• Appeals

────────────────────────────────────────

MODERATION

Design moderation for:

• Products
• Product media
• Seller profiles
• Reviews
• Messages
• Stores
• Business content

Support:

• Automated checks
• Manual moderation
• Appeals
• Policy versions
• Audit
• Takedowns
• Seller restrictions

────────────────────────────────────────

CMS

Design a content-management system supporting:

• Home-page content
• Banners
• Campaigns
• Landing pages
• Category content
• Promotional content
• Editorial content
• Navigation
• SEO metadata

Support:

• Draft
• Review
• Approval
• Scheduled publication
• Published
• Unpublished
• Archived

────────────────────────────────────────

ADMINISTRATION

Complete enterprise administration.

Support:

• Customers
• Sellers
• Products
• Categories
• Brands
• Orders
• Payments
• Refunds
• Returns
• Promotions
• Coupons
• Reviews
• Reports
• CMS
• Feature flags
• System configuration
• Audit

Define sensitive operations requiring:

• Elevated permissions
• Confirmation
• Dual approval where appropriate
• Complete audit trails

────────────────────────────────────────

FEATURE FLAGS

Support:

• Global rollout
• Percentage rollout
• Customer targeting
• Seller targeting
• Region targeting
• Device targeting
• Application targeting
• Kill switches
• Experiments

Define:

• Evaluation
• Caching
• Propagation
• Ownership
• Audit
• Expiration
• Cleanup

────────────────────────────────────────

LOCALIZATION

Support:

• Multiple languages
• Currency formatting
• Localized product metadata
• Regional pricing
• Regional tax
• Regional shipping
• Date/time localization
• RTL where appropriate

Define fallback behavior when localized content is unavailable.

────────────────────────────────────────

SECURITY ARCHITECTURE

Complete security architecture for:

Identity:

• Authentication
• MFA
• Session management
• Password security
• Device management

Authorization:

• RBAC
• Seller isolation
• Administrative permissions
• Resource ownership

Application:

• Input validation
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection protection
• Rate limiting

Payment:

• Webhook verification
• Secret management
• Idempotency
• Sensitive-data minimization

Infrastructure:

• IAM
• Least privilege
• Encryption
• Network segmentation
• Secrets
• Audit

────────────────────────────────────────

THREAT MODEL

Create a threat model covering:

• Account takeover
• Seller fraud
• Payment fraud
• Coupon abuse
• Promotion abuse
• Inventory abuse
• Review manipulation
• Refund fraud
• Return fraud
• Webhook spoofing
• Malicious file uploads
• API abuse
• Bot attacks
• Data leakage
• Privilege escalation
• Insider threats
• Supply-chain attacks
• DDoS
• Cloud credential compromise

For each define:

• Attack vector
• Affected systems
• Prevention
• Detection
• Response
• Recovery

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Complete the global architecture.

Define:

• Regional application clusters
• Global routing
• Regional catalog reads
• Transactional data ownership
• Regional inventory considerations
• Payment processing boundaries
• Cross-region events
• Object-storage replication
• Search replication/recovery
• Failover

Avoid unnecessary cross-region synchronous operations.

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Define:

• Development
• Testing
• Staging
• Production
• Disaster Recovery

Include:

• Kubernetes
• Helm
• Container registry
• GitHub Actions
• Rolling deployment
• Canary deployment
• Blue/green where appropriate
• Rollback
• Health verification

────────────────────────────────────────

KUBERNETES TOPOLOGY

Design:

• Cluster strategy
• Namespaces
• Node pools
• Application workloads
• Search workloads
• Background workers
• Media workers
• Monitoring

Define:

• Resource requests
• Resource limits
• HPA
• Cluster autoscaling
• PDB
• Network policies
• Service accounts
• RBAC
• Health probes

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• Database backups
• Point-in-time recovery
• Object storage recovery
• Redis recovery
• Kafka recovery
• Search recovery
• Infrastructure recovery
• Regional failover

Create recovery procedures for:

• Database outage
• Region outage
• Payment provider outage
• Search outage
• Inventory outage
• Object-storage outage

────────────────────────────────────────

CAPACITY PLANNING

Design capacity models for:

• Customers
• Sellers
• Products
• Catalog writes
• Search requests
• Cart operations
• Checkout operations
• Inventory writes
• Order creation
• Payment operations
• Notifications
• Media traffic
• Analytics events

Identify:

• Bottlenecks
• Scaling triggers
• Capacity thresholds
• Backpressure
• Cost drivers

────────────────────────────────────────

DATA CONSISTENCY STRATEGY

Explicitly define consistency for:

• Product catalog
• Seller offers
• Pricing
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Refunds
• Returns
• Payouts
• Search
• Recommendations
• Notifications
• Analytics

Define use of:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Locks
• Transactional outbox
• Sagas where justified

────────────────────────────────────────

FAILURE SCENARIOS

Define behavior for:

• Database failure
• Redis failure
• Kafka failure
• Search failure
• Stripe failure
• Shipping-provider failure
• S3 failure
• Notification-provider failure
• Inventory-service failure
• Worker failure
• Regional failure

For each define:

• Detection
• Fallback
• Retry
• Timeout
• Circuit breaker
• Degraded operation
• Recovery
• Reconciliation

────────────────────────────────────────

OBSERVABILITY

Complete observability architecture for:

• Customer APIs
• Seller APIs
• Admin APIs
• Search
• Checkout
• Inventory
• Orders
• Payments
• Refunds
• Returns
• Seller payouts
• Notifications
• Messaging
• Workers
• Database
• Redis
• Kafka
• External providers

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define:

• SLIs
• SLOs
• Dashboards
• Alerts
• Structured logs
• Trace propagation
• Correlation IDs

────────────────────────────────────────

TESTING STRATEGY

Define:

Unit Testing

• Catalog
• Pricing
• Promotion
• Inventory
• Checkout
• Orders
• Payments
• Returns
• Payouts
• Authorization

Integration Testing

• PostgreSQL
• Redis
• Kafka
• BullMQ
• Search
• Stripe
• S3
• Shipping providers

Contract Testing

• APIs
• Webhooks
• Events
• External-provider contracts

End-to-End Testing

• Registration
• Product discovery
• Search
• Cart
• Checkout
• Payment
• Order
• Shipping
• Return
• Refund
• Review
• Seller onboarding
• Seller fulfillment

Performance Testing

• Search
• Catalog
• Checkout
• Inventory
• Orders
• Payments

Resilience Testing

• Database
• Redis
• Kafka
• Search
• Payment provider
• Shipping provider
• Regional failover

Security Testing

• Authentication
• Authorization
• Seller isolation
• Payment security
• Fraud controls
• Webhook security
• API abuse

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Create ADRs for:

• Seller isolation
• Product/offer architecture
• Inventory reservation model
• Checkout orchestration
• Split-order model
• Fulfillment model
• Shipping abstraction
• Tax abstraction
• Payment provider abstraction
• Seller payout model
• Promotion engine
• Search architecture
• Recommendation architecture
• Analytics architecture
• Fraud architecture
• Multi-region architecture
• Kubernetes
• Terraform
• Observability
• Secrets management

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

BACKEND IMPLEMENTATION ROADMAP

Define the exact backend implementation order.

BACKEND MILESTONE 1

Monorepo foundation and shared backend infrastructure.

BACKEND MILESTONE 2

Configuration, observability, error handling, validation, authentication, and authorization foundations.

BACKEND MILESTONE 3

Identity, accounts, users, profiles, sessions, addresses, and permissions.

BACKEND MILESTONE 4

Seller onboarding, seller verification, stores, and seller staff.

BACKEND MILESTONE 5

Catalog, categories, brands, products, variants, attributes, and media metadata.

BACKEND MILESTONE 6

Pricing, promotions, coupons, and regional pricing.

BACKEND MILESTONE 7

Inventory, warehouses, reservations, transfers, and stock operations.

BACKEND MILESTONE 8

Shopping cart, wishlist, checkout, taxes, and shipping calculation.

BACKEND MILESTONE 9

Orders, split orders, fulfillment, shipments, and tracking.

BACKEND MILESTONE 10

Payments, refunds, marketplace commissions, seller balances, payouts, and reconciliation.

BACKEND MILESTONE 11

Search and indexing.

BACKEND MILESTONE 12

Reviews, ratings, seller responses, and moderation.

BACKEND MILESTONE 13

Notifications and customer/seller messaging.

BACKEND MILESTONE 14

Recommendations and personalization.

BACKEND MILESTONE 15

Analytics and reporting.

BACKEND MILESTONE 16

CMS, administration, feature flags, audit, and system configuration.

BACKEND MILESTONE 17

Fraud prevention, security hardening, and compliance preparation.

BACKEND MILESTONE 18

Integration testing, performance testing, resilience testing, and production readiness.

Adjust this order only when implementation dependencies require it.

────────────────────────────────────────

PROJECT INDEX

Create the complete Project Index containing:

• Architecture decisions
• Domains
• Services
• Service ownership
• Database ownership
• ERD
• Database objects
• API contracts
• Event contracts
• Queue contracts
• Search architecture
• Payment architecture
• Inventory architecture
• Seller architecture
• Fulfillment architecture
• Shipping architecture
• Tax architecture
• Security architecture
• Fraud architecture
• Analytics architecture
• Infrastructure decisions
• Observability
• Disaster recovery
• Testing strategy
• ADRs
• Backend roadmap
• Remaining implementation phases

────────────────────────────────────────

ARCHITECTURE VOLUME 2 OUTPUT

Produce:

1. Seller Onboarding Architecture
2. Seller Isolation Architecture
3. Seller Staff Architecture
4. Product Lifecycle Architecture
5. Catalog Architecture
6. Offer Architecture
7. Advanced Inventory Architecture
8. Multi-Warehouse Architecture
9. Inventory Reservation Architecture
10. Fulfillment Architecture
11. Order Orchestration
12. Split-Order Architecture
13. Shipping Architecture
14. Returns Architecture
15. Exchanges Architecture
16. Tax Architecture
17. Regional Pricing
18. Promotion Engine
19. Coupon Engine
20. Recommendation Architecture
21. Advanced Search Architecture
22. Search Consistency
23. Reviews and Trust
24. Customer/Seller Messaging
25. Notification Architecture
26. Analytics Architecture
27. Fraud Prevention
28. Moderation Architecture
29. CMS Architecture
30. Administration Architecture
31. Feature Flag Architecture
32. Localization Architecture
33. Security Architecture
34. Threat Model
35. Multi-Region Architecture
36. Deployment Architecture
37. Kubernetes Topology
38. Disaster Recovery
39. Capacity Planning
40. Data Consistency Strategy
41. Failure Scenario Analysis
42. Observability Architecture
43. Testing Strategy
44. Architectural Decision Records
45. Backend Implementation Roadmap
46. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

• Scalability
• Availability
• Security
• Privacy
• Latency
• Data consistency
• Operational complexity
• Cost
• Developer productivity
• Maintainability
• Future extensibility

Prefer:

• Explicit ownership
• Seller isolation
• Strong inventory correctness
• Strong payment idempotency
• Clear order state machines
• Event-driven communication where appropriate
• Transactional outbox
• Idempotent consumers
• Horizontal scaling
• Graceful degradation
• Observable systems
• Secure provider integrations

Avoid:

• Shared database ownership
• Unnecessary microservices
• Distributed transactions where avoidable
• Inventory overselling
• Duplicate payments
• Duplicate orders
• Unbounded synchronous fan-out
• Search as a transaction system
• Redis as a system of record
• Floating-point monetary calculations
• Frontend-only authorization
• Unnecessary cross-region synchronization
• Premature complexity

────────────────────────────────────────

OUTPUT RULES

This is an architecture document only.

Do not generate source code.

Do not generate placeholder implementations.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate frontend components.

Do not generate mobile components.

Do not implement backend services.

Provide detailed:

• Architecture specifications
• Domain boundaries
• Service responsibilities
• Ownership rules
• State machines
• Data models
• ERDs
• API contracts
• Event contracts
• Queue definitions
• Payment contracts
• Inventory consistency rules
• Checkout rules
• Order orchestration
• Seller settlement rules
• Security boundaries
• Threat model
• Scalability strategies
• Multi-region architecture
• Disaster recovery
• Testing architecture
• ADRs
• Backend implementation roadmap
• Complete Project Index

The resulting architecture must be sufficiently detailed that independent backend, frontend, mobile, infrastructure, DevOps, and QA teams can implement the complete ecommerce marketplace without making major architectural decisions themselve

You are operating in Senior Engineering Team Mode.

Complete the remaining enterprise architecture for a production-ready global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

Do not implement backend code.

Do not implement frontend code.

Do not implement mobile code.

Do not generate infrastructure implementation files.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate application source code.

Produce architecture, specifications, contracts, diagrams, engineering decisions, operational strategies, security models, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready global ecommerce marketplace supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High search traffic
• High inventory throughput
• Large payment volumes
• Multi-seller orders
• Global fulfillment
• Multiple currencies
• Multiple languages
• Regional pricing
• Regional taxes
• Regional shipping
• High availability
• Horizontal scaling
• Multi-region deployment
• Zero-downtime deployment
• Disaster recovery

The platform must provide:

• Customer marketplace
• Seller platform
• Administration platform
• Public APIs
• Internal services
• Marketplace payments
• Seller payouts
• Inventory management
• Fulfillment
• Shipping
• Returns
• Reviews
• Recommendations
• Search
• Analytics
• Messaging
• CMS
• Moderation

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Web:

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui
• TanStack Query
• Zustand

Mobile:

• React Native
• Expo
• TypeScript

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

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Queues:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

Communication:

• REST
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

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

Secrets:

• AWS Secrets Manager
• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

VOLUME 2 OBJECTIVE

Complete the architecture for:

1. Advanced seller architecture
2. Seller onboarding and verification
3. Multi-seller marketplace isolation
4. Product publishing workflows
5. Catalog moderation
6. Advanced inventory and fulfillment
7. Multi-warehouse inventory
8. Order orchestration
9. Split-order architecture
10. Shipping architecture
11. Returns and exchanges
12. Marketplace payment settlement
13. Seller payouts
14. Tax architecture
15. Regional pricing
16. Promotions and coupon engine
17. Recommendation architecture
18. Advanced search
19. Reviews and trust systems
20. Customer/seller messaging
21. Notifications
22. Analytics architecture
23. Fraud prevention
24. Administration
25. CMS
26. Moderation
27. Feature flags
28. Localization
29. Multi-region architecture
30. Deployment architecture
31. Kubernetes topology
32. Disaster recovery
33. Security threat model
34. Observability
35. Capacity planning
36. Failure scenarios
37. Data consistency
38. Testing strategy
39. Architectural Decision Records
40. Backend implementation roadmap
41. Complete Project Index

────────────────────────────────────────

SELLER ONBOARDING ARCHITECTURE

Design the complete seller lifecycle.

Support:

• Seller registration
• Identity verification
• Business verification
• Tax information
• Banking/payout configuration
• Store creation
• Seller approval
• Seller suspension
• Seller reactivation
• Seller termination

Define seller states:

• Pending
• Verification Required
• Under Review
• Approved
• Suspended
• Rejected
• Terminated

Define:

• State ownership
• Transition rules
• Required documentation
• Audit requirements
• Approval workflows
• Retry behavior

────────────────────────────────────────

SELLER ISOLATION

Design strong seller/store isolation.

Define:

• Seller ownership
• Store ownership
• Seller staff access
• Product ownership
• Inventory ownership
• Order visibility
• Customer-data visibility
• Financial-data visibility

A seller must never access another seller's:

• Customers
• Orders
• Inventory
• Payouts
• Reports
• Internal data

unless explicitly authorized by platform administration.

────────────────────────────────────────

SELLER STAFF

Support:

• Seller owner
• Manager
• Catalog manager
• Inventory manager
• Fulfillment staff
• Customer support
• Finance staff

Define:

• Seller-scoped roles
• Permissions
• Resource access
• Audit requirements

Seller staff permissions must be enforced server-side.

────────────────────────────────────────

PRODUCT LIFECYCLE

Design the complete product publishing workflow.

Support:

Draft
→ Submitted
→ Validation
→ Moderation
→ Approved
→ Published
→ Suspended
→ Archived

Define:

• Product ownership
• Variant validation
• Media validation
• Category validation
• Brand validation
• Attribute validation
• Content policy checks
• Approval requirements
• Scheduled publishing
• Unpublishing

Product publication must not automatically imply inventory availability.

────────────────────────────────────────

CATALOG ARCHITECTURE

Design advanced catalog support for:

• Categories
• Brands
• Products
• Variants
• Attributes
• Specifications
• Product bundles where appropriate
• Product relationships
• Related products
• Cross-sells
• Upsells
• Localized metadata

Define:

• Product identity
• Seller-specific offers
• Canonical product model where appropriate
• Variant model
• Offer model
• Availability

Separate:

• Product catalog data
• Seller offer data
• Inventory
• Pricing
• Fulfillment

────────────────────────────────────────

OFFER ARCHITECTURE

For marketplaces with multiple sellers offering similar products, define the relationship among:

• Canonical product
• Seller offer
• Seller price
• Seller inventory
• Seller fulfillment
• Seller condition
• Seller rating

Define how the marketplace selects or ranks offers.

Do not merge unrelated seller inventory into a single authoritative stock record.

────────────────────────────────────────

INVENTORY ARCHITECTURE

Complete advanced inventory architecture.

Support:

• Multiple warehouses
• Warehouse zones
• Inventory locations
• Available inventory
• Reserved inventory
• Damaged inventory
• Safety stock
• In-transit inventory
• Inventory adjustments
• Inventory transfers
• Stock reconciliation
• Reservation expiration
• Low-stock alerts

Define:

• Inventory ownership
• Reservation lifecycle
• Concurrency strategy
• Locking strategy
• Idempotency
• Reconciliation

────────────────────────────────────────

MULTI-WAREHOUSE INVENTORY

Design inventory allocation across multiple warehouses.

Support:

• Warehouse selection
• Regional inventory
• Allocation rules
• Proximity
• Capacity
• Shipping speed
• Seller ownership
• Fulfillment restrictions

Define the allocation process when:

• One warehouse lacks inventory
• Multiple warehouses can fulfill
• Inventory changes during checkout
• Warehouse becomes unavailable

────────────────────────────────────────

INVENTORY RESERVATIONS

Define the complete reservation state machine.

Support:

• Reservation creation
• Reservation confirmation
• Reservation expiration
• Reservation release
• Reservation adjustment
• Reservation failure

Prevent:

• Double reservation
• Reservation leaks
• Overselling
• Concurrent update corruption

Define timeout and recovery strategy.

────────────────────────────────────────

FULFILLMENT ARCHITECTURE

Support:

• Seller fulfillment
• Marketplace fulfillment
• Warehouse fulfillment
• Multi-warehouse fulfillment
• Partial fulfillment
• Backorders where appropriate
• Split shipments

Define:

• Fulfillment order
• Fulfillment group
• Fulfillment state
• Shipment relationship
• Seller responsibility
• Marketplace responsibility

────────────────────────────────────────

ORDER ORCHESTRATION

Complete the order state machine.

Support:

• Pending
• Awaiting Payment
• Confirmed
• Partially Fulfilled
• Fulfilled
• Shipped
• Delivered
• Partially Canceled
• Canceled
• Return Pending
• Returned
• Refunded
• Closed

Define:

• Allowed transitions
• Transition ownership
• Idempotency
• Event generation
• Audit requirements

────────────────────────────────────────

SPLIT ORDER ARCHITECTURE

Design orders containing:

• Multiple sellers
• Multiple fulfillment locations
• Multiple shipments
• Partial cancellation
• Partial refund
• Partial return

Define:

• Parent order
• Seller order
• Fulfillment order
• Shipment
• Payment allocation
• Commission allocation

Ensure financial consistency across split orders.

────────────────────────────────────────

SHIPPING ARCHITECTURE

Design:

• Shipping methods
• Shipping zones
• Rates
• Delivery estimates
• Carrier integrations
• Tracking
• Shipment states
• Delivery confirmation

Support integration with external shipping providers.

Define abstraction boundaries so provider-specific behavior does not leak into core order logic.

────────────────────────────────────────

RETURNS ARCHITECTURE

Support:

• Return eligibility
• Return request
• Return approval
• Return shipping
• Item receipt
• Inspection
• Approval/rejection
• Refund
• Exchange

Define policies based on:

• Product
• Seller
• Order
• Purchase date
• Regional law/policy
• Product condition

────────────────────────────────────────

EXCHANGES

Design:

• Exchange request
• Replacement inventory
• Exchange approval
• Replacement shipment
• Original-item return
• Financial adjustment

Define interactions with:

• Inventory
• Orders
• Payments
• Refunds
• Shipping

────────────────────────────────────────

TAX ARCHITECTURE

Design support for:

• Sales tax
• VAT
• GST
• Regional taxes
• Tax exemptions where appropriate
• Seller-specific tax obligations

Define:

• Tax calculation boundary
• Tax provider abstraction
• Tax jurisdiction
• Tax rounding
• Tax snapshots on orders
• Tax auditability

Historical orders must preserve the tax calculation used at purchase time.

────────────────────────────────────────

REGIONAL PRICING

Support:

• Multiple currencies
• Regional prices
• Seller-local pricing
• Currency conversion boundaries
• Price effective dates
• Price snapshots on orders

Do not recalculate historical order prices using current prices.

────────────────────────────────────────

PROMOTION ENGINE

Complete advanced promotions.

Support:

• Product promotions
• Category promotions
• Seller promotions
• Marketplace-wide promotions
• Coupon codes
• Automatic discounts
• Buy-one-get-one
• Quantity discounts where appropriate
• Minimum purchase
• Maximum discount
• Usage limits
• Customer limits
• Seller limits
• Regional restrictions
• Time windows

Define precedence when multiple discounts apply.

────────────────────────────────────────

COUPON ENGINE

Design:

• Coupon creation
• Activation
• Expiration
• Redemption
• Usage tracking
• Per-customer limits
• Global limits
• Eligibility rules

Prevent:

• Double redemption
• Race-condition over-redemption
• Coupon replay
• Coupon abuse

────────────────────────────────────────

RECOMMENDATION ARCHITECTURE

Design a recommendation system that can evolve from deterministic ranking to advanced ML.

Support:

• Recently viewed
• Frequently bought together
• Similar products
• Related products
• Personalized recommendations
• Trending
• Category recommendations
• Seller recommendations
• Cross-sells
• Upsells

Define:

• Candidate generation
• Ranking
• Event ingestion
• Features
• Batch processing
• Real-time signals
• Caching
• Experimentation
• Fallback recommendations

────────────────────────────────────────

SEARCH ARCHITECTURE

Complete advanced product search.

Support:

• Full-text search
• Autocomplete
• Typo tolerance
• Synonyms
• Facets
• Filters
• Sorting
• Range filters
• Category navigation
• Brand filtering
• Seller filtering
• Rating filtering
• Availability
• Regional availability
• Personalized ranking where appropriate

Define:

• Index mappings
• Sharding
• Replication
• Aliases
• Reindexing
• Version migration
• Ranking signals
• Search analytics

────────────────────────────────────────

SEARCH CONSISTENCY

Define:

• Acceptable search indexing delay
• Product publication behavior
• Price update propagation
• Inventory update propagation
• Seller suspension behavior
• Reindex failure behavior

Search must never be treated as the authoritative transaction database.

────────────────────────────────────────

REVIEWS AND TRUST

Complete review architecture.

Support:

• Verified purchase
• Ratings
• Text reviews
• Media reviews
• Seller response
• Report review
• Review moderation
• Rating aggregation
• Review abuse detection

Define:

• Eligibility
• Duplicate prevention
• Fraud detection
• Moderation
• Visibility states

────────────────────────────────────────

CUSTOMER/SELLER MESSAGING

Design secure marketplace messaging.

Support:

• Customer-seller conversations
• Order-related conversations
• Attachments
• Unread counts
• Message history
• Seller staff participation
• Automated responses

Define:

• Data visibility
• Retention
• Moderation boundaries
• Audit requirements
• Privacy

Do not expose unrelated customer information to sellers.

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Complete notification design.

Channels:

• Email
• Push
• In-app
• SMS-ready abstraction

Events:

• Order
• Payment
• Shipment
• Return
• Refund
• Seller onboarding
• Seller order
• Inventory
• Promotion
• Security

Define:

• Preferences
• Templates
• Localization
• Scheduling
• Deduplication
• Retry
• Rate limiting
• Provider failover

────────────────────────────────────────

ANALYTICS ARCHITECTURE

Design analytics for:

Customer:

• DAU
• MAU
• Retention
• Conversion
• Cart abandonment
• Customer lifetime value

Product:

• Views
• Clicks
• Add-to-cart
• Conversion
• Revenue
• Returns

Seller:

• GMV
• Revenue
• Conversion
• Inventory turnover
• Cancellation
• Return rate
• Seller performance

Marketplace:

• GMV
• Revenue
• Take rate
• Orders
• AOV
• Search success
• Fulfillment performance

Operational:

• Checkout latency
• Payment failures
• Inventory failures
• Shipping failures
• Queue health

Define:

• Event ingestion
• Streaming
• Aggregation
• Warehousing boundaries
• Retention
• Privacy

Do not overload transactional PostgreSQL with analytical workloads.

────────────────────────────────────────

FRAUD PREVENTION

Complete marketplace fraud architecture.

Address:

• Payment fraud
• Account takeover
• Fake sellers
• Seller collusion
• Coupon abuse
• Promotion abuse
• Review manipulation
• Refund fraud
• Return fraud
• Inventory manipulation
• Automated purchasing

Define:

• Risk scoring
• Rules engine
• Device signals
• Account signals
• Transaction signals
• Seller reputation
• Manual review
• Automated actions
• Appeals

────────────────────────────────────────

MODERATION

Design moderation for:

• Products
• Product media
• Seller profiles
• Reviews
• Messages
• Stores
• Business content

Support:

• Automated checks
• Manual moderation
• Appeals
• Policy versions
• Audit
• Takedowns
• Seller restrictions

────────────────────────────────────────

CMS

Design a content-management system supporting:

• Home-page content
• Banners
• Campaigns
• Landing pages
• Category content
• Promotional content
• Editorial content
• Navigation
• SEO metadata

Support:

• Draft
• Review
• Approval
• Scheduled publication
• Published
• Unpublished
• Archived

────────────────────────────────────────

ADMINISTRATION

Complete enterprise administration.

Support:

• Customers
• Sellers
• Products
• Categories
• Brands
• Orders
• Payments
• Refunds
• Returns
• Promotions
• Coupons
• Reviews
• Reports
• CMS
• Feature flags
• System configuration
• Audit

Define sensitive operations requiring:

• Elevated permissions
• Confirmation
• Dual approval where appropriate
• Complete audit trails

────────────────────────────────────────

FEATURE FLAGS

Support:

• Global rollout
• Percentage rollout
• Customer targeting
• Seller targeting
• Region targeting
• Device targeting
• Application targeting
• Kill switches
• Experiments

Define:

• Evaluation
• Caching
• Propagation
• Ownership
• Audit
• Expiration
• Cleanup

────────────────────────────────────────

LOCALIZATION

Support:

• Multiple languages
• Currency formatting
• Localized product metadata
• Regional pricing
• Regional tax
• Regional shipping
• Date/time localization
• RTL where appropriate

Define fallback behavior when localized content is unavailable.

────────────────────────────────────────

SECURITY ARCHITECTURE

Complete security architecture for:

Identity:

• Authentication
• MFA
• Session management
• Password security
• Device management

Authorization:

• RBAC
• Seller isolation
• Administrative permissions
• Resource ownership

Application:

• Input validation
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection protection
• Rate limiting

Payment:

• Webhook verification
• Secret management
• Idempotency
• Sensitive-data minimization

Infrastructure:

• IAM
• Least privilege
• Encryption
• Network segmentation
• Secrets
• Audit

────────────────────────────────────────

THREAT MODEL

Create a threat model covering:

• Account takeover
• Seller fraud
• Payment fraud
• Coupon abuse
• Promotion abuse
• Inventory abuse
• Review manipulation
• Refund fraud
• Return fraud
• Webhook spoofing
• Malicious file uploads
• API abuse
• Bot attacks
• Data leakage
• Privilege escalation
• Insider threats
• Supply-chain attacks
• DDoS
• Cloud credential compromise

For each define:

• Attack vector
• Affected systems
• Prevention
• Detection
• Response
• Recovery

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Complete the global architecture.

Define:

• Regional application clusters
• Global routing
• Regional catalog reads
• Transactional data ownership
• Regional inventory considerations
• Payment processing boundaries
• Cross-region events
• Object-storage replication
• Search replication/recovery
• Failover

Avoid unnecessary cross-region synchronous operations.

────────────────────────────────────────

DEPLOYMENT ARCHITECTURE

Define:

• Development
• Testing
• Staging
• Production
• Disaster Recovery

Include:

• Kubernetes
• Helm
• Container registry
• GitHub Actions
• Rolling deployment
• Canary deployment
• Blue/green where appropriate
• Rollback
• Health verification

────────────────────────────────────────

KUBERNETES TOPOLOGY

Design:

• Cluster strategy
• Namespaces
• Node pools
• Application workloads
• Search workloads
• Background workers
• Media workers
• Monitoring

Define:

• Resource requests
• Resource limits
• HPA
• Cluster autoscaling
• PDB
• Network policies
• Service accounts
• RBAC
• Health probes

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• Database backups
• Point-in-time recovery
• Object storage recovery
• Redis recovery
• Kafka recovery
• Search recovery
• Infrastructure recovery
• Regional failover

Create recovery procedures for:

• Database outage
• Region outage
• Payment provider outage
• Search outage
• Inventory outage
• Object-storage outage

────────────────────────────────────────

CAPACITY PLANNING

Design capacity models for:

• Customers
• Sellers
• Products
• Catalog writes
• Search requests
• Cart operations
• Checkout operations
• Inventory writes
• Order creation
• Payment operations
• Notifications
• Media traffic
• Analytics events

Identify:

• Bottlenecks
• Scaling triggers
• Capacity thresholds
• Backpressure
• Cost drivers

────────────────────────────────────────

DATA CONSISTENCY STRATEGY

Explicitly define consistency for:

• Product catalog
• Seller offers
• Pricing
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Refunds
• Returns
• Payouts
• Search
• Recommendations
• Notifications
• Analytics

Define use of:

• Strong consistency
• Eventual consistency
• Idempotency
• Optimistic concurrency
• Locks
• Transactional outbox
• Sagas where justified

────────────────────────────────────────

FAILURE SCENARIOS

Define behavior for:

• Database failure
• Redis failure
• Kafka failure
• Search failure
• Stripe failure
• Shipping-provider failure
• S3 failure
• Notification-provider failure
• Inventory-service failure
• Worker failure
• Regional failure

For each define:

• Detection
• Fallback
• Retry
• Timeout
• Circuit breaker
• Degraded operation
• Recovery
• Reconciliation

────────────────────────────────────────

OBSERVABILITY

Complete observability architecture for:

• Customer APIs
• Seller APIs
• Admin APIs
• Search
• Checkout
• Inventory
• Orders
• Payments
• Refunds
• Returns
• Seller payouts
• Notifications
• Messaging
• Workers
• Database
• Redis
• Kafka
• External providers

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Define:

• SLIs
• SLOs
• Dashboards
• Alerts
• Structured logs
• Trace propagation
• Correlation IDs

────────────────────────────────────────

TESTING STRATEGY

Define:

Unit Testing

• Catalog
• Pricing
• Promotion
• Inventory
• Checkout
• Orders
• Payments
• Returns
• Payouts
• Authorization

Integration Testing

• PostgreSQL
• Redis
• Kafka
• BullMQ
• Search
• Stripe
• S3
• Shipping providers

Contract Testing

• APIs
• Webhooks
• Events
• External-provider contracts

End-to-End Testing

• Registration
• Product discovery
• Search
• Cart
• Checkout
• Payment
• Order
• Shipping
• Return
• Refund
• Review
• Seller onboarding
• Seller fulfillment

Performance Testing

• Search
• Catalog
• Checkout
• Inventory
• Orders
• Payments

Resilience Testing

• Database
• Redis
• Kafka
• Search
• Payment provider
• Shipping provider
• Regional failover

Security Testing

• Authentication
• Authorization
• Seller isolation
• Payment security
• Fraud controls
• Webhook security
• API abuse

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Create ADRs for:

• Seller isolation
• Product/offer architecture
• Inventory reservation model
• Checkout orchestration
• Split-order model
• Fulfillment model
• Shipping abstraction
• Tax abstraction
• Payment provider abstraction
• Seller payout model
• Promotion engine
• Search architecture
• Recommendation architecture
• Analytics architecture
• Fraud architecture
• Multi-region architecture
• Kubernetes
• Terraform
• Observability
• Secrets management

Each ADR must contain:

• Context
• Decision
• Alternatives considered
• Consequences

────────────────────────────────────────

BACKEND IMPLEMENTATION ROADMAP

Define the exact backend implementation order.

BACKEND MILESTONE 1

Monorepo foundation and shared backend infrastructure.

BACKEND MILESTONE 2

Configuration, observability, error handling, validation, authentication, and authorization foundations.

BACKEND MILESTONE 3

Identity, accounts, users, profiles, sessions, addresses, and permissions.

BACKEND MILESTONE 4

Seller onboarding, seller verification, stores, and seller staff.

BACKEND MILESTONE 5

Catalog, categories, brands, products, variants, attributes, and media metadata.

BACKEND MILESTONE 6

Pricing, promotions, coupons, and regional pricing.

BACKEND MILESTONE 7

Inventory, warehouses, reservations, transfers, and stock operations.

BACKEND MILESTONE 8

Shopping cart, wishlist, checkout, taxes, and shipping calculation.

BACKEND MILESTONE 9

Orders, split orders, fulfillment, shipments, and tracking.

BACKEND MILESTONE 10

Payments, refunds, marketplace commissions, seller balances, payouts, and reconciliation.

BACKEND MILESTONE 11

Search and indexing.

BACKEND MILESTONE 12

Reviews, ratings, seller responses, and moderation.

BACKEND MILESTONE 13

Notifications and customer/seller messaging.

BACKEND MILESTONE 14

Recommendations and personalization.

BACKEND MILESTONE 15

Analytics and reporting.

BACKEND MILESTONE 16

CMS, administration, feature flags, audit, and system configuration.

BACKEND MILESTONE 17

Fraud prevention, security hardening, and compliance preparation.

BACKEND MILESTONE 18

Integration testing, performance testing, resilience testing, and production readiness.

Adjust this order only when implementation dependencies require it.

────────────────────────────────────────

PROJECT INDEX

Create the complete Project Index containing:

• Architecture decisions
• Domains
• Services
• Service ownership
• Database ownership
• ERD
• Database objects
• API contracts
• Event contracts
• Queue contracts
• Search architecture
• Payment architecture
• Inventory architecture
• Seller architecture
• Fulfillment architecture
• Shipping architecture
• Tax architecture
• Security architecture
• Fraud architecture
• Analytics architecture
• Infrastructure decisions
• Observability
• Disaster recovery
• Testing strategy
• ADRs
• Backend roadmap
• Remaining implementation phases

────────────────────────────────────────

ARCHITECTURE VOLUME 2 OUTPUT

Produce:

1. Seller Onboarding Architecture
2. Seller Isolation Architecture
3. Seller Staff Architecture
4. Product Lifecycle Architecture
5. Catalog Architecture
6. Offer Architecture
7. Advanced Inventory Architecture
8. Multi-Warehouse Architecture
9. Inventory Reservation Architecture
10. Fulfillment Architecture
11. Order Orchestration
12. Split-Order Architecture
13. Shipping Architecture
14. Returns Architecture
15. Exchanges Architecture
16. Tax Architecture
17. Regional Pricing
18. Promotion Engine
19. Coupon Engine
20. Recommendation Architecture
21. Advanced Search Architecture
22. Search Consistency
23. Reviews and Trust
24. Customer/Seller Messaging
25. Notification Architecture
26. Analytics Architecture
27. Fraud Prevention
28. Moderation Architecture
29. CMS Architecture
30. Administration Architecture
31. Feature Flag Architecture
32. Localization Architecture
33. Security Architecture
34. Threat Model
35. Multi-Region Architecture
36. Deployment Architecture
37. Kubernetes Topology
38. Disaster Recovery
39. Capacity Planning
40. Data Consistency Strategy
41. Failure Scenario Analysis
42. Observability Architecture
43. Testing Strategy
44. Architectural Decision Records
45. Backend Implementation Roadmap
46. Complete Project Index

────────────────────────────────────────

QUALITY REQUIREMENTS

Every architectural decision must evaluate:

• Scalability
• Availability
• Security
• Privacy
• Latency
• Data consistency
• Operational complexity
• Cost
• Developer productivity
• Maintainability
• Future extensibility

Prefer:

• Explicit ownership
• Seller isolation
• Strong inventory correctness
• Strong payment idempotency
• Clear order state machines
• Event-driven communication where appropriate
• Transactional outbox
• Idempotent consumers
• Horizontal scaling
• Graceful degradation
• Observable systems
• Secure provider integrations

Avoid:

• Shared database ownership
• Unnecessary microservices
• Distributed transactions where avoidable
• Inventory overselling
• Duplicate payments
• Duplicate orders
• Unbounded synchronous fan-out
• Search as a transaction system
• Redis as a system of record
• Floating-point monetary calculations
• Frontend-only authorization
• Unnecessary cross-region synchronization
• Premature complexity

────────────────────────────────────────

OUTPUT RULES

This is an architecture document only.

Do not generate source code.

Do not generate placeholder implementations.

Do not generate Dockerfiles.

Do not generate Kubernetes manifests.

Do not generate Terraform files.

Do not generate frontend components.

Do not generate mobile components.

Do not implement backend services.

Provide detailed:

• Architecture specifications
• Domain boundaries
• Service responsibilities
• Ownership rules
• State machines
• Data models
• ERDs
• API contracts
• Event contracts
• Queue definitions
• Payment contracts
• Inventory consistency rules
• Checkout rules
• Order orchestration
• Seller settlement rules
• Security boundaries
• Threat model
• Scalability strategies
• Multi-region architecture
• Disaster recovery
• Testing architecture
• ADRs
• Backend implementation roadmap
• Complete Project Index

The resulting architecture must be sufficiently detailed that independent backend, frontend, mobile, infrastructure, DevOps, and QA teams can implement the complete ecommerce marketplace without making major architectural decisions themselves.
