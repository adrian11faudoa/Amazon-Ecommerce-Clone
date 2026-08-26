You are operating in Senior Engineering Team Mode.

Design the complete foundational architecture for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

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

Produce architecture, specifications, contracts, diagrams, schemas, ownership rules, engineering decisions, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready enterprise ecommerce marketplace capable of supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High product-search traffic
• High checkout traffic
• Large inventory volumes
• Large payment volumes
• Global operations
• Multiple currencies
• Multiple languages
• Regional taxes
• Regional shipping
• Multi-region deployment
• High availability
• Horizontal scaling
• Zero-downtime deployments
• Disaster recovery

Comparable architectural scope:

• Amazon Marketplace
• Shopify Marketplace
• Etsy
• Mercado Libre

The platform must be:

• Cloud-native
• Horizontally scalable
• Modular
• Maintainable
• Secure
• Observable
• Fault tolerant
• Cost conscious
• Ready for long-term enterprise growth

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

WEB

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui
• TanStack Query
• Zustand

MOBILE

• React Native
• Expo
• TypeScript

BACKEND

• Node.js
• NestJS
• TypeScript

DATABASE

• PostgreSQL
• Prisma ORM

CACHE

• Redis

SEARCH

• Elasticsearch or OpenSearch

OBJECT STORAGE

• AWS S3-compatible object storage

CDN

• CloudFront or equivalent CDN

PAYMENTS

• Stripe
• Stripe Connect or approved marketplace-payment architecture

BACKGROUND PROCESSING

• BullMQ

EVENT STREAMING

• Kafka or Redpanda where justified

COMMUNICATION

• REST APIs
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

INFRASTRUCTURE

• Docker
• Kubernetes
• Helm
• Terraform
• GitHub Actions

OBSERVABILITY

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

SECRETS

• AWS Secrets Manager
• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

ARCHITECTURAL APPROACH

Determine whether the platform should initially use:

• Modular Monolith
• Service-Oriented Architecture
• Microservices

Do not blindly create a microservice for every domain or database table.

Evaluate:

• Transactional consistency
• Scalability
• Latency
• Deployment independence
• Failure isolation
• Operational complexity
• Cost
• Team ownership
• Developer productivity
• Long-term maintainability

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Strong consistency boundaries
• Eventual consistency boundaries

Provide a migration strategy for future service extraction where appropriate.

────────────────────────────────────────

APPLICATIONS

Design complete architecture for:

CUSTOMER MARKETPLACE

• Public storefront
• Authenticated customer experience
• Product discovery
• Search
• Shopping
• Checkout
• Orders
• Account

SELLER PLATFORM

• Seller onboarding
• Seller dashboard
• Store management
• Product management
• Inventory
• Orders
• Fulfillment
• Analytics
• Financials

ADMINISTRATION

• Customer administration
• Seller administration
• Catalog administration
• Order administration
• Payments
• Refunds
• Moderation
• CMS
• Analytics
• Feature flags
• Audit

MOBILE

• Customer mobile application
• Push notifications
• Deep linking
• Offline-aware browsing and cart behavior where appropriate

PUBLIC API

• Customer APIs
• Seller APIs
• Administrative APIs where authorized

INTERNAL APIs

• Service-to-service communication
• Internal operational APIs

────────────────────────────────────────

ROLES

Define a complete RBAC model for:

• Guest
• Customer
• Seller
• Seller Staff
• Support Agent
• Moderator
• Administrator
• Super Administrator
• System Services

Create a permissions matrix covering:

• Account management
• Catalog management
• Product management
• Inventory
• Orders
• Shipping
• Payments
• Refunds
• Returns
• Promotions
• Reviews
• Messaging
• Reports
• Analytics
• CMS
• Feature flags
• System configuration
• Audit

Define:

• Role ownership
• Permission assignment
• Resource-level authorization
• Seller/store isolation
• Administrative authorization

Frontend role checks must never be the final authorization boundary.

────────────────────────────────────────

DOMAIN DECOMPOSITION

Define bounded contexts and ownership for:

Identity

Users

Accounts

Authentication

Authorization

Profiles

Addresses

Seller Management

Seller Staff

Stores

Catalog

Categories

Brands

Products

Product Variants

Product Attributes

Product Media

Pricing

Promotions

Coupons

Wishlist

Shopping Cart

Checkout

Taxes

Inventory

Warehouses

Inventory Reservations

Inventory Transfers

Orders

Order Items

Fulfillment

Shipments

Shipping

Payments

Refunds

Returns

Exchanges

Seller Payouts

Marketplace Commissions

Reviews

Ratings

Notifications

Messaging

Search

Recommendations

Analytics

Reporting

CMS

Moderation

Administration

Audit

Feature Flags

System Configuration

For each domain define:

• Responsibility
• Aggregate roots
• Entities
• Value objects
• Repositories
• Application services
• Domain services
• Domain events
• Data ownership
• Consistency requirements

────────────────────────────────────────

CORE BUSINESS FLOWS

Architect the complete lifecycle for:

CUSTOMER

Registration
→ Verification
→ Profile
→ Address
→ Product Discovery
→ Product Detail
→ Cart
→ Checkout
→ Payment
→ Order
→ Fulfillment
→ Shipment
→ Delivery
→ Review
→ Return/Refund where applicable

SELLER

Registration
→ Verification
→ Store Setup
→ Product Creation
→ Product Approval
→ Inventory
→ Pricing
→ Promotion
→ Order Receipt
→ Fulfillment
→ Shipment
→ Settlement
→ Payout

ORDER

Cart
→ Checkout
→ Inventory Reservation
→ Payment Authorization
→ Order Creation
→ Payment Confirmation
→ Fulfillment
→ Shipment
→ Delivery
→ Settlement

RETURN

Return Request
→ Eligibility
→ Approval
→ Shipment/Return
→ Inspection
→ Refund/Exchange
→ Seller Settlement Adjustment

Clearly identify transactional boundaries and asynchronous transitions.

────────────────────────────────────────

C4 ARCHITECTURE

Generate:

• System Context Diagram
• Container Diagram
• Component Diagram
• Deployment Diagram

For each major component define:

• Responsibility
• Inputs
• Outputs
• Dependencies
• Data ownership
• Scaling model
• Failure behavior
• Security boundary

Use clear text-based diagrams.

Do not use images.

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define appropriate service boundaries for:

API Gateway

Identity Service

Authentication Service

Account Service

Profile Service

Address Service

Seller Service

Store Service

Catalog Service

Category Service

Brand Service

Product Service

Pricing Service

Promotion Service

Coupon Service

Inventory Service

Warehouse Service

Cart Service

Wishlist Service

Checkout Service

Order Service

Fulfillment Service

Shipping Service

Payment Service

Refund Service

Return Service

Review Service

Notification Service

Messaging Service

Search Service

Recommendation Service

Analytics Service

Reporting Service

CMS Service

Moderation Service

Administration Service

Audit Service

Feature Flag Service

Configuration Service

Do not make every item an independent microservice.

Combine cohesive responsibilities where strong consistency, simplicity, or operational efficiency make that preferable.

For every final service define:

• Responsibility
• Owned data
• APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements
• Security boundary

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Create a complete ownership matrix.

For each major domain identify:

• Authoritative service
• Database ownership
• API ownership
• Event ownership
• Cache ownership
• Search/read-model ownership
• Administrative ownership

Explicitly define which services must never directly modify another service's authoritative data.

────────────────────────────────────────

COMMUNICATION MATRIX

Define communication between major domains and services.

For every important interaction specify:

• Producer
• Consumer
• Protocol
• Direction
• Synchronous/asynchronous
• Purpose
• Consistency requirement
• Timeout
• Retry
• Idempotency
• Failure behavior

Evaluate:

• REST
• Webhooks
• Server-Sent Events
• WebSockets
• Kafka/Redpanda
• BullMQ
• Redis

Avoid unnecessary synchronous dependencies.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo.

APPLICATIONS

• Customer Web
• Seller Dashboard
• Admin Dashboard
• Customer Mobile

BACKEND

• API Gateway
• Domain services
• Background workers
• Scheduled workers
• Event consumers

SHARED PACKAGES

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication interfaces
• Authorization utilities
• Observability
• Database abstractions where appropriate
• Testing utilities
• Design tokens where appropriate

INFRASTRUCTURE

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

DOCUMENTATION

• Architecture
• APIs
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create uncontrolled shared packages.

Do not share domain implementation logic merely to eliminate duplication.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed production-ready folder hierarchy.

Include:

• Monorepo root
• Web application
• Seller application
• Admin application
• Mobile application
• Backend services
• Workers
• Shared packages
• Database
• Infrastructure
• Tests
• Documentation
• Configuration
• Migrations

Include major files and directories.

The hierarchy must remain compatible with all future implementation prompts.

Do not generate source code.

────────────────────────────────────────

CORE DOMAIN MODEL

Evaluate and define:

User

Account

Profile

Address

Seller

SellerStaff

Store

Category

Brand

Product

ProductVariant

ProductAttribute

ProductMedia

Price

Promotion

Coupon

Wishlist

WishlistItem

Cart

CartItem

Checkout

CheckoutItem

Tax

Warehouse

InventoryItem

InventoryReservation

InventoryMovement

InventoryTransfer

Order

OrderItem

Fulfillment

Shipment

ShipmentItem

Payment

PaymentAttempt

Refund

Return

ReturnItem

Exchange

SellerBalance

SellerPayout

MarketplaceCommission

Review

Rating

Notification

Conversation

Message

Recommendation

SearchDocument

Report

ModerationCase

AuditLog

FeatureFlag

Do not force every conceptual entity into a separate database table.

Use proper aggregate boundaries.

For each aggregate define:

• Aggregate root
• Owned entities
• Invariants
• Transaction boundary
• Lifecycle
• Authoritative service

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout volume
• High inventory write volume
• Large payment history
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Indexes
• Partitioning
• Archival
• Retention
• Read replicas
• Connection pooling
• Backup
• Recovery

Identify high-growth tables.

Evaluate partitioning candidates for:

• Orders
• Order items
• Inventory movements
• Inventory reservations
• Payments
• Audit logs
• Analytics events

Do not use PostgreSQL for large binary product media.

Do not overload transactional tables with analytical workloads.

────────────────────────────────────────

DATABASE OWNERSHIP

Define:

• Which service owns each schema
• Which services may directly read
• Which services must use APIs
• Which services consume events
• Which services require read models
• How cross-domain queries are implemented
• How migrations are owned

Avoid unrestricted cross-service database access.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly show relationships among:

• Customers
• Sellers
• Stores
• Products
• Variants
• Categories
• Inventory
• Warehouses
• Carts
• Checkout
• Orders
• Payments
• Shipments
• Returns
• Refunds
• Reviews
• Promotions
• Coupons
• Seller payouts
• Commissions
• Notifications

────────────────────────────────────────

PRISMA STRATEGY

Define:

• Schema organization
• Service ownership
• Prisma client strategy
• Migration ownership
• Transaction boundaries
• Read replica considerations
• Connection pooling
• Query optimization
• Indexing rules
• Migration deployment strategy

Avoid a single uncontrolled shared Prisma schema.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Sessions
• Rate limiting
• Product cache
• Category cache
• Search cache
• Recommendation cache
• Cart acceleration where appropriate
• Checkout temporary state
• Distributed locks
• Idempotency
• Queue infrastructure

For each use case define:

• Key pattern
• TTL
• Invalidation
• Consistency requirement
• Failure behavior

Redis must never become the source of truth for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

INVENTORY ARCHITECTURE

Inventory is a critical consistency domain.

Design:

• Warehouses
• Inventory items
• Available quantity
• Reserved quantity
• Safety stock
• Inventory movements
• Reservations
• Reservation expiration
• Transfers
• Adjustments
• Low-stock alerts

Define concurrency strategy.

Support:

• Transactions
• Optimistic concurrency
• Row-level locks where justified
• Idempotency
• Reservation tokens
• Reservation expiration

Prevent:

• Overselling
• Double reservations
• Negative stock where prohibited
• Duplicate releases
• Race-condition corruption

────────────────────────────────────────

CATALOG ARCHITECTURE

Support:

• Categories
• Brands
• Products
• Variants
• Attributes
• Product media
• Product status
• Seller ownership
• Catalog moderation
• Localization

Define:

• Product lifecycle
• Draft
• Submitted
• Approved
• Published
• Suspended
• Archived

Separate product metadata from inventory and transactional price state.

────────────────────────────────────────

PRICING ARCHITECTURE

Design:

• Base price
• Sale price
• Regional price
• Currency
• Tax treatment
• Seller pricing
• Promotions
• Coupons

Define:

• Price precedence
• Effective dates
• Currency conversion boundaries
• Rounding
• Precision
• Audit history

Do not use floating-point arithmetic for monetary values where exact decimal representation is required.

────────────────────────────────────────

PROMOTIONS AND COUPONS

Support:

• Coupons
• Percentage discounts
• Fixed discounts
• Product-level promotions
• Category promotions
• Seller promotions
• Minimum order requirements
• Usage limits
• Customer limits
• Expiration
• Eligibility rules

Define:

• Validation
• Atomic redemption
• Idempotency
• Abuse prevention
• Concurrent redemption behavior

────────────────────────────────────────

SHOPPING CART

Design:

• Cart ownership
• Cart items
• Variant selection
• Quantity
• Saved state
• Expiration where applicable
• Multi-device synchronization

Define cart consistency expectations.

The cart must not be treated as the authoritative inventory source.

────────────────────────────────────────

CHECKOUT ARCHITECTURE

Design checkout as a reliable workflow.

Support:

• Cart validation
• Product availability
• Price validation
• Promotion validation
• Coupon validation
• Tax calculation
• Shipping calculation
• Inventory reservation
• Payment authorization
• Order creation
• Reservation confirmation
• Failure recovery

Clearly define what happens when:

• Inventory becomes unavailable
• Price changes during checkout
• Coupon expires
• Payment fails
• Payment succeeds but order creation fails
• Order creation succeeds but notification fails

────────────────────────────────────────

ORDER ARCHITECTURE

Support:

• Order creation
• Order items
• Seller split orders
• Order status
• Fulfillment
• Shipment
• Delivery
• Cancellation
• Partial cancellation
• Returns
• Exchanges
• Refunds
• Order timeline

Define:

• State machine
• Allowed transitions
• Ownership
• Auditability
• Idempotency

Order state must not be inferred only from payment state.

────────────────────────────────────────

FULFILLMENT AND SHIPPING

Design:

• Fulfillment orders
• Seller fulfillment
• Warehouse fulfillment
• Shipments
• Shipment items
• Shipping methods
• Tracking
• Delivery status
• Shipping providers

Define integration boundaries for external carriers.

Support provider failures without corrupting order state.

────────────────────────────────────────

PAYMENT ARCHITECTURE

Design Stripe integration.

Support:

• Payment Intents
• Checkout
• Webhook ingestion
• Webhook verification
• Idempotency
• Payment attempts
• Refunds
• Partial refunds
• Chargebacks where applicable
• Reconciliation
• Payment recovery

Separate:

• Payment state
• Order state
• Seller settlement state

Never store raw card information unless absolutely required and permitted.

────────────────────────────────────────

MARKETPLACE PAYOUTS

Design seller financial flows.

Support:

• Seller balances
• Commissions
• Marketplace fees
• Payout eligibility
• Payout creation
• Payout completion
• Payout failure
• Refund adjustments
• Settlement reconciliation

Define consistency and audit requirements.

────────────────────────────────────────

SEARCH ARCHITECTURE

Design Elasticsearch/OpenSearch architecture for:

• Products
• Categories
• Brands
• Sellers
• Stores

Support:

• Full-text search
• Autocomplete
• Typo tolerance
• Faceted search
• Filters
• Sorting
• Price range
• Rating
• Availability
• Category
• Brand
• Seller
• Regional availability
• Ranking
• Synonyms

Define:

• Index ownership
• Mapping strategy
• Indexing pipeline
• Event-driven updates
• Reindexing
• Aliases
• Versioning
• Failure recovery

Search must remain derived from authoritative transactional data.

────────────────────────────────────────

RECOMMENDATION ARCHITECTURE

Design an extensible recommendation system supporting:

• Frequently viewed
• Similar products
• Related products
• Recently viewed
• Personalized recommendations
• Trending products
• Seller recommendations
• Cross-sells
• Upsells

Define:

• Candidate generation
• Ranking
• Signals
• Event ingestion
• Batch processing
• Real-time signals
• Caching
• Experimentation

Do not require advanced machine learning for the first implementation if deterministic systems can establish the correct architecture.

────────────────────────────────────────

MEDIA ARCHITECTURE

Design S3 architecture for:

• Product images
• Product videos
• Seller logos
• Store assets
• Brand assets
• Documents

Define:

• Upload authorization
• Direct upload
• Object naming
• Metadata
• Validation
• Processing
• Multiple resolutions
• Thumbnail generation
• CDN delivery
• Signed URLs
• Cleanup
• Lifecycle policies

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Support:

• Email
• Push
• In-app
• SMS-ready abstraction where appropriate

Notification events may include:

• Order created
• Payment succeeded
• Payment failed
• Shipment created
• Shipment delivered
• Return updated
• Refund issued
• Seller order received
• Low inventory
• Security event
• Promotion

Define:

• Preferences
• Deduplication
• Scheduling
• Retry
• Rate limits
• Provider failure
• Multi-channel routing

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design customer-to-seller communication.

Support:

• Conversations
• Messages
• Attachments
• Unread counts
• Read state
• Seller staff participation
• Customer participation
• Conversation history

Define authorization boundaries.

Business conversations must not automatically grant access to unrelated customer data.

────────────────────────────────────────

REVIEWS AND RATINGS

Support:

• Ratings
• Verified purchases
• Reviews
• Review media
• Seller responses
• Review reports
• Moderation
• Review aggregation

Define:

• Eligibility
• Duplicate review prevention
• Moderation
• Rating calculation
• Fraud prevention

────────────────────────────────────────

SECURITY

Design:

Authentication:

• Credentials
• OAuth where approved
• MFA-ready architecture
• Sessions
• Refresh tokens

Authorization:

• RBAC
• Seller isolation
• Resource ownership
• Administrative permissions

Application:

• Validation
• Rate limiting
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection prevention

Payment:

• Webhook verification
• Idempotency
• Secret isolation

Infrastructure:

• IAM
• Least privilege
• Secrets management
• Encryption
• Audit logging

────────────────────────────────────────

FRAUD AND ABUSE

Design defenses against:

• Fake seller accounts
• Coupon abuse
• Promotion abuse
• Payment fraud
• Refund abuse
• Return abuse
• Review manipulation
• Bot purchasing
• Inventory abuse
• Account takeover

Define:

• Risk signals
• Rate limits
• Reputation
• Device signals
• Transaction signals
• Automated controls
• Manual review
• Audit

────────────────────────────────────────

EVENT ARCHITECTURE

Define a complete initial event catalog.

Identity:

• UserRegistered
• UserVerified
• SessionCreated
• SessionRevoked

Seller:

• SellerRegistered
• SellerVerified
• SellerApproved
• SellerSuspended

Catalog:

• ProductCreated
• ProductUpdated
• ProductPublished
• ProductSuspended
• ProductArchived
• PriceChanged

Inventory:

• InventoryChanged
• InventoryReserved
• InventoryReleased
• InventoryAdjusted
• InventoryTransferCreated

Cart/Checkout:

• CartCreated
• CheckoutStarted
• CheckoutCompleted
• CheckoutFailed

Orders:

• OrderCreated
• OrderConfirmed
• OrderCanceled
• FulfillmentCreated
• ShipmentCreated
• ShipmentDelivered

Payments:

• PaymentAttempted
• PaymentSucceeded
• PaymentFailed
• RefundIssued

Returns:

• ReturnRequested
• ReturnApproved
• ReturnReceived
• ExchangeCreated

Reviews:

• ReviewCreated
• ReviewApproved
• ReviewRejected

Notifications:

• NotificationCreated
• NotificationDelivered
• NotificationFailed

Seller Finance:

• CommissionCalculated
• SellerPayoutCreated
• SellerPayoutCompleted
• SellerPayoutFailed

Do not duplicate entire database records inside events.

────────────────────────────────────────

QUEUE ARCHITECTURE

Define BullMQ queues for:

• Email
• Push notification
• Search indexing
• Media processing
• Image processing
• Recommendation refresh
• Inventory synchronization
• Reservation expiration
• Coupon expiration
• Promotion activation
• Promotion expiration
• Payment reconciliation
• Seller payout processing
• Report generation
• Analytics aggregation
• Cache invalidation
• Cleanup

For each queue define:

• Producer
• Consumer
• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter behavior
• Monitoring

────────────────────────────────────────

API ARCHITECTURE

Define public and internal APIs.

CUSTOMER

• Authentication
• Profile
• Addresses
• Categories
• Products
• Search
• Wishlist
• Cart
• Checkout
• Payments
• Orders
• Returns
• Reviews
• Notifications
• Messaging

SELLER

• Onboarding
• Store
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Reviews
• Analytics
• Financials
• Payouts

ADMIN

• Users
• Sellers
• Catalog
• Products
• Orders
• Payments
• Refunds
• Returns
• Reports
• Moderation
• CMS
• Feature flags
• Audit

Define:

• API versioning
• Naming conventions
• Authentication
• Authorization
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Validation
• Error format
• Idempotency
• Rate limiting
• OpenAPI organization

────────────────────────────────────────

DATA CONSISTENCY

Explicitly define consistency requirements for:

• Accounts
• Seller approval
• Product publication
• Pricing
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Refunds
• Returns
• Seller payouts
• Search indexing
• Recommendations
• Notifications
• Reviews
• Analytics

Identify where to use:

• Strong consistency
• Eventual consistency
• Optimistic concurrency
• Idempotency
• Distributed locks
• Transactional outbox
• Saga patterns where justified

Avoid distributed transactions where possible.

────────────────────────────────────────

SCALABILITY

Design for:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High search traffic
• High checkout traffic
• Large inventory workloads

Analyze scaling for:

• API Gateway
• Catalog
• Search
• PostgreSQL
• Redis
• Kafka
• BullMQ
• Media processing
• Payments
• Inventory
• Orders
• Notifications
• CDN

Identify:

• Likely bottlenecks
• Scaling triggers
• Horizontal scaling strategies
• Partitioning
• Caching
• Backpressure

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Design the foundational multi-region architecture.

Define:

• Regional application clusters
• Global routing
• Regional data ownership
• Database replication/failover
• Event replication
• Object-storage replication
• Search recovery
• Regional failover

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent
• Strongly consistent

Avoid unnecessary cross-region synchronous operations.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior for:

• PostgreSQL unavailable
• Redis unavailable
• Kafka unavailable
• Search unavailable
• Stripe unavailable
• S3 unavailable
• Shipping provider unavailable
• Notification provider unavailable
• Worker failure
• Region failure

For each define:

• Detection
• Retry
• Timeout
• Fallback
• Degraded operation
• Recovery
• Reconciliation

────────────────────────────────────────

OBSERVABILITY

Design:

• Structured logging
• Metrics
• Distributed tracing
• Correlation IDs
• Health checks
• Readiness checks
• Liveness checks
• Alerting

Define dashboards for:

• API
• Search
• Checkout
• Inventory
• Orders
• Payments
• Seller payouts
• Notifications
• Queues
• Database
• Redis
• Kafka
• External providers

Never log payment secrets or customer passwords.

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• PostgreSQL backup
• Point-in-time recovery
• Object storage recovery
• Redis recovery
• Kafka recovery
• Search recovery
• Infrastructure recovery
• Regional failover

Create recovery strategies for:

• Database failure
• Region failure
• Payment-provider outage
• Search outage
• Inventory-system outage

────────────────────────────────────────

TESTING ARCHITECTURE

Define:

UNIT TESTING

• Domain logic
• Pricing
• Promotions
• Coupons
• Inventory
• Orders
• Payments
• Returns
• Permissions

INTEGRATION TESTING

• PostgreSQL
• Redis
• Kafka
• BullMQ
• Elasticsearch
• Stripe
• S3
• Shipping providers

CONTRACT TESTING

• REST APIs
• Webhooks
• Event schemas

END-TO-END TESTING

• Registration
• Product discovery
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
• Seller onboarding
• Seller product creation

PERFORMANCE TESTING

• Search
• Catalog
• Cart
• Checkout
• Inventory
• Orders
• Payment webhooks

SECURITY TESTING

• Authentication
• Authorization
• Seller isolation
• Payment security
• Webhook verification
• Coupon abuse
• Inventory abuse
• API abuse

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Create ADRs for:

• Architecture style
• Service decomposition
• PostgreSQL ownership
• Prisma
• Redis
• Elasticsearch/OpenSearch
• Kafka/Redpanda
• BullMQ
• Stripe marketplace payments
• Inventory reservation model
• Checkout architecture
• Search architecture
• S3 and CDN
• Seller payout architecture
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

PROJECT INDEX

Create the initial Project Index containing:

• Project overview
• Technology stack
• Domain list
• Service list
• Service ownership
• Database ownership
• Core entities
• ERD
• APIs
• Events
• Queues
• Redis responsibilities
• Search architecture
• Payment architecture
• Inventory architecture
• Order architecture
• Seller architecture
• Security boundaries
• Infrastructure principles
• Observability
• Testing strategy
• ADRs
• Implementation dependencies
• Remaining architecture work

────────────────────────────────────────

ARCHITECTURE VOLUME 1 OUTPUT

Produce:

1. Executive Architecture Overview
2. System Context
3. C4 Architecture
4. Architectural Approach
5. Application Architecture
6. Role and Permission Model
7. Domain Decomposition
8. Service Decomposition
9. Service Ownership Matrix
10. Communication Matrix
11. Monorepo Architecture
12. Detailed Folder Hierarchy
13. Core Domain Model
14. Aggregate Boundaries
15. Core Business Flows
16. PostgreSQL Architecture
17. Database Ownership
18. Complete Text-Based ERD
19. Prisma Strategy
20. Redis Architecture
21. Catalog Architecture
22. Pricing Architecture
23. Promotions and Coupons
24. Inventory Architecture
25. Cart Architecture
26. Checkout Architecture
27. Order Architecture
28. Fulfillment and Shipping
29. Payment Architecture
30. Marketplace Payout Architecture
31. Search Architecture
32. Recommendation Architecture
33. Media Architecture
34. Notification Architecture
35. Messaging Architecture
36. Reviews and Ratings
37. Security Architecture
38. Fraud and Abuse Prevention
39. Event Architecture
40. Queue Architecture
41. API Architecture
42. Data Consistency Strategy
43. Scalability Strategy
44. Multi-Region Foundation
45. Failure Scenario Analysis
46. Observability Architecture
47. Disaster Recovery Strategy
48. Testing Architecture
49. Architectural Decision Records
50. Complete Project Index

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
• Clear bounded contexts
• Stateless application services where possible
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Strong inventory consistency
• Strong payment idempotency
• Secure payment-provider integration
• Observable systems
• Graceful degradation

Avoid:

• Unnecessary microservices
• Shared database ownership
• Distributed transactions where avoidable
• Tight coupling
• Single points of failure
• Redis as a system of record
• Search as a transactional source of truth
• Application servers proxying large media
• Floating-point money calculations
• Frontend-only security
• Unnecessary cross-region synchronous dependencies
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
• Database architecture
• ERD
• API contracts
• Event contracts
• Queue definitions
• Inventory consistency rules
• Checkout consistency rules
• Payment contracts
• Seller settlement rules
• Search architecture
• Security boundaries
• Scalability strategies
• Failure strategies
• Disaster recovery
• Testing strategy
• ADRs
• Project Index

The architecture must be sufficiently detailed that independent backend, frontend, mobile, infrastructure, DevOps, and QA teams can implement the complete ecommerce marketplace without making major architectural decisions themselve

You are operating in Senior Engineering Team Mode.

Design the complete foundational architecture for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

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

Produce architecture, specifications, contracts, diagrams, schemas, ownership rules, engineering decisions, and implementation guidance only.

────────────────────────────────────────

PROJECT

Build a production-ready enterprise ecommerce marketplace capable of supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High product-search traffic
• High checkout traffic
• Large inventory volumes
• Large payment volumes
• Global operations
• Multiple currencies
• Multiple languages
• Regional taxes
• Regional shipping
• Multi-region deployment
• High availability
• Horizontal scaling
• Zero-downtime deployments
• Disaster recovery

Comparable architectural scope:

• Amazon Marketplace
• Shopify Marketplace
• Etsy
• Mercado Libre

The platform must be:

• Cloud-native
• Horizontally scalable
• Modular
• Maintainable
• Secure
• Observable
• Fault tolerant
• Cost conscious
• Ready for long-term enterprise growth

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

WEB

• Next.js
• React
• TypeScript
• Tailwind CSS
• shadcn/ui
• TanStack Query
• Zustand

MOBILE

• React Native
• Expo
• TypeScript

BACKEND

• Node.js
• NestJS
• TypeScript

DATABASE

• PostgreSQL
• Prisma ORM

CACHE

• Redis

SEARCH

• Elasticsearch or OpenSearch

OBJECT STORAGE

• AWS S3-compatible object storage

CDN

• CloudFront or equivalent CDN

PAYMENTS

• Stripe
• Stripe Connect or approved marketplace-payment architecture

BACKGROUND PROCESSING

• BullMQ

EVENT STREAMING

• Kafka or Redpanda where justified

COMMUNICATION

• REST APIs
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

INFRASTRUCTURE

• Docker
• Kubernetes
• Helm
• Terraform
• GitHub Actions

OBSERVABILITY

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

SECRETS

• AWS Secrets Manager
• HashiCorp Vault or approved cloud-native secret management

────────────────────────────────────────

ARCHITECTURAL APPROACH

Determine whether the platform should initially use:

• Modular Monolith
• Service-Oriented Architecture
• Microservices

Do not blindly create a microservice for every domain or database table.

Evaluate:

• Transactional consistency
• Scalability
• Latency
• Deployment independence
• Failure isolation
• Operational complexity
• Cost
• Team ownership
• Developer productivity
• Long-term maintainability

Clearly identify:

• Independently deployable services
• Shared transactional boundaries
• Authoritative data ownership
• Synchronous communication
• Asynchronous communication
• Event-driven communication
• Read models
• CQRS requirements
• Strong consistency boundaries
• Eventual consistency boundaries

Provide a migration strategy for future service extraction where appropriate.

────────────────────────────────────────

APPLICATIONS

Design complete architecture for:

CUSTOMER MARKETPLACE

• Public storefront
• Authenticated customer experience
• Product discovery
• Search
• Shopping
• Checkout
• Orders
• Account

SELLER PLATFORM

• Seller onboarding
• Seller dashboard
• Store management
• Product management
• Inventory
• Orders
• Fulfillment
• Analytics
• Financials

ADMINISTRATION

• Customer administration
• Seller administration
• Catalog administration
• Order administration
• Payments
• Refunds
• Moderation
• CMS
• Analytics
• Feature flags
• Audit

MOBILE

• Customer mobile application
• Push notifications
• Deep linking
• Offline-aware browsing and cart behavior where appropriate

PUBLIC API

• Customer APIs
• Seller APIs
• Administrative APIs where authorized

INTERNAL APIs

• Service-to-service communication
• Internal operational APIs

────────────────────────────────────────

ROLES

Define a complete RBAC model for:

• Guest
• Customer
• Seller
• Seller Staff
• Support Agent
• Moderator
• Administrator
• Super Administrator
• System Services

Create a permissions matrix covering:

• Account management
• Catalog management
• Product management
• Inventory
• Orders
• Shipping
• Payments
• Refunds
• Returns
• Promotions
• Reviews
• Messaging
• Reports
• Analytics
• CMS
• Feature flags
• System configuration
• Audit

Define:

• Role ownership
• Permission assignment
• Resource-level authorization
• Seller/store isolation
• Administrative authorization

Frontend role checks must never be the final authorization boundary.

────────────────────────────────────────

DOMAIN DECOMPOSITION

Define bounded contexts and ownership for:

Identity

Users

Accounts

Authentication

Authorization

Profiles

Addresses

Seller Management

Seller Staff

Stores

Catalog

Categories

Brands

Products

Product Variants

Product Attributes

Product Media

Pricing

Promotions

Coupons

Wishlist

Shopping Cart

Checkout

Taxes

Inventory

Warehouses

Inventory Reservations

Inventory Transfers

Orders

Order Items

Fulfillment

Shipments

Shipping

Payments

Refunds

Returns

Exchanges

Seller Payouts

Marketplace Commissions

Reviews

Ratings

Notifications

Messaging

Search

Recommendations

Analytics

Reporting

CMS

Moderation

Administration

Audit

Feature Flags

System Configuration

For each domain define:

• Responsibility
• Aggregate roots
• Entities
• Value objects
• Repositories
• Application services
• Domain services
• Domain events
• Data ownership
• Consistency requirements

────────────────────────────────────────

CORE BUSINESS FLOWS

Architect the complete lifecycle for:

CUSTOMER

Registration
→ Verification
→ Profile
→ Address
→ Product Discovery
→ Product Detail
→ Cart
→ Checkout
→ Payment
→ Order
→ Fulfillment
→ Shipment
→ Delivery
→ Review
→ Return/Refund where applicable

SELLER

Registration
→ Verification
→ Store Setup
→ Product Creation
→ Product Approval
→ Inventory
→ Pricing
→ Promotion
→ Order Receipt
→ Fulfillment
→ Shipment
→ Settlement
→ Payout

ORDER

Cart
→ Checkout
→ Inventory Reservation
→ Payment Authorization
→ Order Creation
→ Payment Confirmation
→ Fulfillment
→ Shipment
→ Delivery
→ Settlement

RETURN

Return Request
→ Eligibility
→ Approval
→ Shipment/Return
→ Inspection
→ Refund/Exchange
→ Seller Settlement Adjustment

Clearly identify transactional boundaries and asynchronous transitions.

────────────────────────────────────────

C4 ARCHITECTURE

Generate:

• System Context Diagram
• Container Diagram
• Component Diagram
• Deployment Diagram

For each major component define:

• Responsibility
• Inputs
• Outputs
• Dependencies
• Data ownership
• Scaling model
• Failure behavior
• Security boundary

Use clear text-based diagrams.

Do not use images.

────────────────────────────────────────

SERVICE DECOMPOSITION

Evaluate and define appropriate service boundaries for:

API Gateway

Identity Service

Authentication Service

Account Service

Profile Service

Address Service

Seller Service

Store Service

Catalog Service

Category Service

Brand Service

Product Service

Pricing Service

Promotion Service

Coupon Service

Inventory Service

Warehouse Service

Cart Service

Wishlist Service

Checkout Service

Order Service

Fulfillment Service

Shipping Service

Payment Service

Refund Service

Return Service

Review Service

Notification Service

Messaging Service

Search Service

Recommendation Service

Analytics Service

Reporting Service

CMS Service

Moderation Service

Administration Service

Audit Service

Feature Flag Service

Configuration Service

Do not make every item an independent microservice.

Combine cohesive responsibilities where strong consistency, simplicity, or operational efficiency make that preferable.

For every final service define:

• Responsibility
• Owned data
• APIs
• Events produced
• Events consumed
• Synchronous dependencies
• Asynchronous dependencies
• Scaling requirements
• Availability requirements
• Security boundary

────────────────────────────────────────

SERVICE OWNERSHIP MATRIX

Create a complete ownership matrix.

For each major domain identify:

• Authoritative service
• Database ownership
• API ownership
• Event ownership
• Cache ownership
• Search/read-model ownership
• Administrative ownership

Explicitly define which services must never directly modify another service's authoritative data.

────────────────────────────────────────

COMMUNICATION MATRIX

Define communication between major domains and services.

For every important interaction specify:

• Producer
• Consumer
• Protocol
• Direction
• Synchronous/asynchronous
• Purpose
• Consistency requirement
• Timeout
• Retry
• Idempotency
• Failure behavior

Evaluate:

• REST
• Webhooks
• Server-Sent Events
• WebSockets
• Kafka/Redpanda
• BullMQ
• Redis

Avoid unnecessary synchronous dependencies.

────────────────────────────────────────

MONOREPO ARCHITECTURE

Design a production-ready monorepo.

APPLICATIONS

• Customer Web
• Seller Dashboard
• Admin Dashboard
• Customer Mobile

BACKEND

• API Gateway
• Domain services
• Background workers
• Scheduled workers
• Event consumers

SHARED PACKAGES

• API contracts
• Event contracts
• Shared types
• Validation
• Configuration
• Authentication interfaces
• Authorization utilities
• Observability
• Database abstractions where appropriate
• Testing utilities
• Design tokens where appropriate

INFRASTRUCTURE

• Docker
• Kubernetes
• Helm
• Terraform
• CI/CD

DOCUMENTATION

• Architecture
• APIs
• Events
• Database
• Security
• Operations
• ADRs
• Runbooks

Do not create uncontrolled shared packages.

Do not share domain implementation logic merely to eliminate duplication.

────────────────────────────────────────

FOLDER HIERARCHY

Generate a detailed production-ready folder hierarchy.

Include:

• Monorepo root
• Web application
• Seller application
• Admin application
• Mobile application
• Backend services
• Workers
• Shared packages
• Database
• Infrastructure
• Tests
• Documentation
• Configuration
• Migrations

Include major files and directories.

The hierarchy must remain compatible with all future implementation prompts.

Do not generate source code.

────────────────────────────────────────

CORE DOMAIN MODEL

Evaluate and define:

User

Account

Profile

Address

Seller

SellerStaff

Store

Category

Brand

Product

ProductVariant

ProductAttribute

ProductMedia

Price

Promotion

Coupon

Wishlist

WishlistItem

Cart

CartItem

Checkout

CheckoutItem

Tax

Warehouse

InventoryItem

InventoryReservation

InventoryMovement

InventoryTransfer

Order

OrderItem

Fulfillment

Shipment

ShipmentItem

Payment

PaymentAttempt

Refund

Return

ReturnItem

Exchange

SellerBalance

SellerPayout

MarketplaceCommission

Review

Rating

Notification

Conversation

Message

Recommendation

SearchDocument

Report

ModerationCase

AuditLog

FeatureFlag

Do not force every conceptual entity into a separate database table.

Use proper aggregate boundaries.

For each aggregate define:

• Aggregate root
• Owned entities
• Invariants
• Transaction boundary
• Lifecycle
• Authoritative service

────────────────────────────────────────

DATABASE ARCHITECTURE

Design PostgreSQL for:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout volume
• High inventory write volume
• Large payment history
• Large audit datasets

Define:

• Database ownership
• Schema boundaries
• Primary keys
• Foreign keys
• Unique constraints
• Check constraints
• Indexes
• Partitioning
• Archival
• Retention
• Read replicas
• Connection pooling
• Backup
• Recovery

Identify high-growth tables.

Evaluate partitioning candidates for:

• Orders
• Order items
• Inventory movements
• Inventory reservations
• Payments
• Audit logs
• Analytics events

Do not use PostgreSQL for large binary product media.

Do not overload transactional tables with analytical workloads.

────────────────────────────────────────

DATABASE OWNERSHIP

Define:

• Which service owns each schema
• Which services may directly read
• Which services must use APIs
• Which services consume events
• Which services require read models
• How cross-domain queries are implemented
• How migrations are owned

Avoid unrestricted cross-service database access.

────────────────────────────────────────

ERD

Generate a complete text-based ERD.

Include:

• Primary keys
• Foreign keys
• Cardinality
• Ownership
• Important indexes
• High-growth tables
• Partitioning candidates

Clearly show relationships among:

• Customers
• Sellers
• Stores
• Products
• Variants
• Categories
• Inventory
• Warehouses
• Carts
• Checkout
• Orders
• Payments
• Shipments
• Returns
• Refunds
• Reviews
• Promotions
• Coupons
• Seller payouts
• Commissions
• Notifications

────────────────────────────────────────

PRISMA STRATEGY

Define:

• Schema organization
• Service ownership
• Prisma client strategy
• Migration ownership
• Transaction boundaries
• Read replica considerations
• Connection pooling
• Query optimization
• Indexing rules
• Migration deployment strategy

Avoid a single uncontrolled shared Prisma schema.

────────────────────────────────────────

REDIS ARCHITECTURE

Design Redis usage for:

• Sessions
• Rate limiting
• Product cache
• Category cache
• Search cache
• Recommendation cache
• Cart acceleration where appropriate
• Checkout temporary state
• Distributed locks
• Idempotency
• Queue infrastructure

For each use case define:

• Key pattern
• TTL
• Invalidation
• Consistency requirement
• Failure behavior

Redis must never become the source of truth for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

INVENTORY ARCHITECTURE

Inventory is a critical consistency domain.

Design:

• Warehouses
• Inventory items
• Available quantity
• Reserved quantity
• Safety stock
• Inventory movements
• Reservations
• Reservation expiration
• Transfers
• Adjustments
• Low-stock alerts

Define concurrency strategy.

Support:

• Transactions
• Optimistic concurrency
• Row-level locks where justified
• Idempotency
• Reservation tokens
• Reservation expiration

Prevent:

• Overselling
• Double reservations
• Negative stock where prohibited
• Duplicate releases
• Race-condition corruption

────────────────────────────────────────

CATALOG ARCHITECTURE

Support:

• Categories
• Brands
• Products
• Variants
• Attributes
• Product media
• Product status
• Seller ownership
• Catalog moderation
• Localization

Define:

• Product lifecycle
• Draft
• Submitted
• Approved
• Published
• Suspended
• Archived

Separate product metadata from inventory and transactional price state.

────────────────────────────────────────

PRICING ARCHITECTURE

Design:

• Base price
• Sale price
• Regional price
• Currency
• Tax treatment
• Seller pricing
• Promotions
• Coupons

Define:

• Price precedence
• Effective dates
• Currency conversion boundaries
• Rounding
• Precision
• Audit history

Do not use floating-point arithmetic for monetary values where exact decimal representation is required.

────────────────────────────────────────

PROMOTIONS AND COUPONS

Support:

• Coupons
• Percentage discounts
• Fixed discounts
• Product-level promotions
• Category promotions
• Seller promotions
• Minimum order requirements
• Usage limits
• Customer limits
• Expiration
• Eligibility rules

Define:

• Validation
• Atomic redemption
• Idempotency
• Abuse prevention
• Concurrent redemption behavior

────────────────────────────────────────

SHOPPING CART

Design:

• Cart ownership
• Cart items
• Variant selection
• Quantity
• Saved state
• Expiration where applicable
• Multi-device synchronization

Define cart consistency expectations.

The cart must not be treated as the authoritative inventory source.

────────────────────────────────────────

CHECKOUT ARCHITECTURE

Design checkout as a reliable workflow.

Support:

• Cart validation
• Product availability
• Price validation
• Promotion validation
• Coupon validation
• Tax calculation
• Shipping calculation
• Inventory reservation
• Payment authorization
• Order creation
• Reservation confirmation
• Failure recovery

Clearly define what happens when:

• Inventory becomes unavailable
• Price changes during checkout
• Coupon expires
• Payment fails
• Payment succeeds but order creation fails
• Order creation succeeds but notification fails

────────────────────────────────────────

ORDER ARCHITECTURE

Support:

• Order creation
• Order items
• Seller split orders
• Order status
• Fulfillment
• Shipment
• Delivery
• Cancellation
• Partial cancellation
• Returns
• Exchanges
• Refunds
• Order timeline

Define:

• State machine
• Allowed transitions
• Ownership
• Auditability
• Idempotency

Order state must not be inferred only from payment state.

────────────────────────────────────────

FULFILLMENT AND SHIPPING

Design:

• Fulfillment orders
• Seller fulfillment
• Warehouse fulfillment
• Shipments
• Shipment items
• Shipping methods
• Tracking
• Delivery status
• Shipping providers

Define integration boundaries for external carriers.

Support provider failures without corrupting order state.

────────────────────────────────────────

PAYMENT ARCHITECTURE

Design Stripe integration.

Support:

• Payment Intents
• Checkout
• Webhook ingestion
• Webhook verification
• Idempotency
• Payment attempts
• Refunds
• Partial refunds
• Chargebacks where applicable
• Reconciliation
• Payment recovery

Separate:

• Payment state
• Order state
• Seller settlement state

Never store raw card information unless absolutely required and permitted.

────────────────────────────────────────

MARKETPLACE PAYOUTS

Design seller financial flows.

Support:

• Seller balances
• Commissions
• Marketplace fees
• Payout eligibility
• Payout creation
• Payout completion
• Payout failure
• Refund adjustments
• Settlement reconciliation

Define consistency and audit requirements.

────────────────────────────────────────

SEARCH ARCHITECTURE

Design Elasticsearch/OpenSearch architecture for:

• Products
• Categories
• Brands
• Sellers
• Stores

Support:

• Full-text search
• Autocomplete
• Typo tolerance
• Faceted search
• Filters
• Sorting
• Price range
• Rating
• Availability
• Category
• Brand
• Seller
• Regional availability
• Ranking
• Synonyms

Define:

• Index ownership
• Mapping strategy
• Indexing pipeline
• Event-driven updates
• Reindexing
• Aliases
• Versioning
• Failure recovery

Search must remain derived from authoritative transactional data.

────────────────────────────────────────

RECOMMENDATION ARCHITECTURE

Design an extensible recommendation system supporting:

• Frequently viewed
• Similar products
• Related products
• Recently viewed
• Personalized recommendations
• Trending products
• Seller recommendations
• Cross-sells
• Upsells

Define:

• Candidate generation
• Ranking
• Signals
• Event ingestion
• Batch processing
• Real-time signals
• Caching
• Experimentation

Do not require advanced machine learning for the first implementation if deterministic systems can establish the correct architecture.

────────────────────────────────────────

MEDIA ARCHITECTURE

Design S3 architecture for:

• Product images
• Product videos
• Seller logos
• Store assets
• Brand assets
• Documents

Define:

• Upload authorization
• Direct upload
• Object naming
• Metadata
• Validation
• Processing
• Multiple resolutions
• Thumbnail generation
• CDN delivery
• Signed URLs
• Cleanup
• Lifecycle policies

────────────────────────────────────────

NOTIFICATION ARCHITECTURE

Support:

• Email
• Push
• In-app
• SMS-ready abstraction where appropriate

Notification events may include:

• Order created
• Payment succeeded
• Payment failed
• Shipment created
• Shipment delivered
• Return updated
• Refund issued
• Seller order received
• Low inventory
• Security event
• Promotion

Define:

• Preferences
• Deduplication
• Scheduling
• Retry
• Rate limits
• Provider failure
• Multi-channel routing

────────────────────────────────────────

MESSAGING ARCHITECTURE

Design customer-to-seller communication.

Support:

• Conversations
• Messages
• Attachments
• Unread counts
• Read state
• Seller staff participation
• Customer participation
• Conversation history

Define authorization boundaries.

Business conversations must not automatically grant access to unrelated customer data.

────────────────────────────────────────

REVIEWS AND RATINGS

Support:

• Ratings
• Verified purchases
• Reviews
• Review media
• Seller responses
• Review reports
• Moderation
• Review aggregation

Define:

• Eligibility
• Duplicate review prevention
• Moderation
• Rating calculation
• Fraud prevention

────────────────────────────────────────

SECURITY

Design:

Authentication:

• Credentials
• OAuth where approved
• MFA-ready architecture
• Sessions
• Refresh tokens

Authorization:

• RBAC
• Seller isolation
• Resource ownership
• Administrative permissions

Application:

• Validation
• Rate limiting
• Secure headers
• CORS
• CSRF where applicable
• XSS protection
• SQL injection prevention

Payment:

• Webhook verification
• Idempotency
• Secret isolation

Infrastructure:

• IAM
• Least privilege
• Secrets management
• Encryption
• Audit logging

────────────────────────────────────────

FRAUD AND ABUSE

Design defenses against:

• Fake seller accounts
• Coupon abuse
• Promotion abuse
• Payment fraud
• Refund abuse
• Return abuse
• Review manipulation
• Bot purchasing
• Inventory abuse
• Account takeover

Define:

• Risk signals
• Rate limits
• Reputation
• Device signals
• Transaction signals
• Automated controls
• Manual review
• Audit

────────────────────────────────────────

EVENT ARCHITECTURE

Define a complete initial event catalog.

Identity:

• UserRegistered
• UserVerified
• SessionCreated
• SessionRevoked

Seller:

• SellerRegistered
• SellerVerified
• SellerApproved
• SellerSuspended

Catalog:

• ProductCreated
• ProductUpdated
• ProductPublished
• ProductSuspended
• ProductArchived
• PriceChanged

Inventory:

• InventoryChanged
• InventoryReserved
• InventoryReleased
• InventoryAdjusted
• InventoryTransferCreated

Cart/Checkout:

• CartCreated
• CheckoutStarted
• CheckoutCompleted
• CheckoutFailed

Orders:

• OrderCreated
• OrderConfirmed
• OrderCanceled
• FulfillmentCreated
• ShipmentCreated
• ShipmentDelivered

Payments:

• PaymentAttempted
• PaymentSucceeded
• PaymentFailed
• RefundIssued

Returns:

• ReturnRequested
• ReturnApproved
• ReturnReceived
• ExchangeCreated

Reviews:

• ReviewCreated
• ReviewApproved
• ReviewRejected

Notifications:

• NotificationCreated
• NotificationDelivered
• NotificationFailed

Seller Finance:

• CommissionCalculated
• SellerPayoutCreated
• SellerPayoutCompleted
• SellerPayoutFailed

Do not duplicate entire database records inside events.

────────────────────────────────────────

QUEUE ARCHITECTURE

Define BullMQ queues for:

• Email
• Push notification
• Search indexing
• Media processing
• Image processing
• Recommendation refresh
• Inventory synchronization
• Reservation expiration
• Coupon expiration
• Promotion activation
• Promotion expiration
• Payment reconciliation
• Seller payout processing
• Report generation
• Analytics aggregation
• Cache invalidation
• Cleanup

For each queue define:

• Producer
• Consumer
• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter behavior
• Monitoring

────────────────────────────────────────

API ARCHITECTURE

Define public and internal APIs.

CUSTOMER

• Authentication
• Profile
• Addresses
• Categories
• Products
• Search
• Wishlist
• Cart
• Checkout
• Payments
• Orders
• Returns
• Reviews
• Notifications
• Messaging

SELLER

• Onboarding
• Store
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Reviews
• Analytics
• Financials
• Payouts

ADMIN

• Users
• Sellers
• Catalog
• Products
• Orders
• Payments
• Refunds
• Returns
• Reports
• Moderation
• CMS
• Feature flags
• Audit

Define:

• API versioning
• Naming conventions
• Authentication
• Authorization
• Pagination
• Cursor pagination
• Filtering
• Sorting
• Validation
• Error format
• Idempotency
• Rate limiting
• OpenAPI organization

────────────────────────────────────────

DATA CONSISTENCY

Explicitly define consistency requirements for:

• Accounts
• Seller approval
• Product publication
• Pricing
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Refunds
• Returns
• Seller payouts
• Search indexing
• Recommendations
• Notifications
• Reviews
• Analytics

Identify where to use:

• Strong consistency
• Eventual consistency
• Optimistic concurrency
• Idempotency
• Distributed locks
• Transactional outbox
• Saga patterns where justified

Avoid distributed transactions where possible.

────────────────────────────────────────

SCALABILITY

Design for:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High search traffic
• High checkout traffic
• Large inventory workloads

Analyze scaling for:

• API Gateway
• Catalog
• Search
• PostgreSQL
• Redis
• Kafka
• BullMQ
• Media processing
• Payments
• Inventory
• Orders
• Notifications
• CDN

Identify:

• Likely bottlenecks
• Scaling triggers
• Horizontal scaling strategies
• Partitioning
• Caching
• Backpressure

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Design the foundational multi-region architecture.

Define:

• Regional application clusters
• Global routing
• Regional data ownership
• Database replication/failover
• Event replication
• Object-storage replication
• Search recovery
• Regional failover

Classify data as:

• Region-local
• Globally replicated
• Eventually consistent
• Strongly consistent

Avoid unnecessary cross-region synchronous operations.

────────────────────────────────────────

FAILURE SCENARIOS

Define graceful behavior for:

• PostgreSQL unavailable
• Redis unavailable
• Kafka unavailable
• Search unavailable
• Stripe unavailable
• S3 unavailable
• Shipping provider unavailable
• Notification provider unavailable
• Worker failure
• Region failure

For each define:

• Detection
• Retry
• Timeout
• Fallback
• Degraded operation
• Recovery
• Reconciliation

────────────────────────────────────────

OBSERVABILITY

Design:

• Structured logging
• Metrics
• Distributed tracing
• Correlation IDs
• Health checks
• Readiness checks
• Liveness checks
• Alerting

Define dashboards for:

• API
• Search
• Checkout
• Inventory
• Orders
• Payments
• Seller payouts
• Notifications
• Queues
• Database
• Redis
• Kafka
• External providers

Never log payment secrets or customer passwords.

────────────────────────────────────────

DISASTER RECOVERY

Define:

• RTO
• RPO
• PostgreSQL backup
• Point-in-time recovery
• Object storage recovery
• Redis recovery
• Kafka recovery
• Search recovery
• Infrastructure recovery
• Regional failover

Create recovery strategies for:

• Database failure
• Region failure
• Payment-provider outage
• Search outage
• Inventory-system outage

────────────────────────────────────────

TESTING ARCHITECTURE

Define:

UNIT TESTING

• Domain logic
• Pricing
• Promotions
• Coupons
• Inventory
• Orders
• Payments
• Returns
• Permissions

INTEGRATION TESTING

• PostgreSQL
• Redis
• Kafka
• BullMQ
• Elasticsearch
• Stripe
• S3
• Shipping providers

CONTRACT TESTING

• REST APIs
• Webhooks
• Event schemas

END-TO-END TESTING

• Registration
• Product discovery
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
• Seller onboarding
• Seller product creation

PERFORMANCE TESTING

• Search
• Catalog
• Cart
• Checkout
• Inventory
• Orders
• Payment webhooks

SECURITY TESTING

• Authentication
• Authorization
• Seller isolation
• Payment security
• Webhook verification
• Coupon abuse
• Inventory abuse
• API abuse

────────────────────────────────────────

ARCHITECTURAL DECISION RECORDS

Create ADRs for:

• Architecture style
• Service decomposition
• PostgreSQL ownership
• Prisma
• Redis
• Elasticsearch/OpenSearch
• Kafka/Redpanda
• BullMQ
• Stripe marketplace payments
• Inventory reservation model
• Checkout architecture
• Search architecture
• S3 and CDN
• Seller payout architecture
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

PROJECT INDEX

Create the initial Project Index containing:

• Project overview
• Technology stack
• Domain list
• Service list
• Service ownership
• Database ownership
• Core entities
• ERD
• APIs
• Events
• Queues
• Redis responsibilities
• Search architecture
• Payment architecture
• Inventory architecture
• Order architecture
• Seller architecture
• Security boundaries
• Infrastructure principles
• Observability
• Testing strategy
• ADRs
• Implementation dependencies
• Remaining architecture work

────────────────────────────────────────

ARCHITECTURE VOLUME 1 OUTPUT

Produce:

1. Executive Architecture Overview
2. System Context
3. C4 Architecture
4. Architectural Approach
5. Application Architecture
6. Role and Permission Model
7. Domain Decomposition
8. Service Decomposition
9. Service Ownership Matrix
10. Communication Matrix
11. Monorepo Architecture
12. Detailed Folder Hierarchy
13. Core Domain Model
14. Aggregate Boundaries
15. Core Business Flows
16. PostgreSQL Architecture
17. Database Ownership
18. Complete Text-Based ERD
19. Prisma Strategy
20. Redis Architecture
21. Catalog Architecture
22. Pricing Architecture
23. Promotions and Coupons
24. Inventory Architecture
25. Cart Architecture
26. Checkout Architecture
27. Order Architecture
28. Fulfillment and Shipping
29. Payment Architecture
30. Marketplace Payout Architecture
31. Search Architecture
32. Recommendation Architecture
33. Media Architecture
34. Notification Architecture
35. Messaging Architecture
36. Reviews and Ratings
37. Security Architecture
38. Fraud and Abuse Prevention
39. Event Architecture
40. Queue Architecture
41. API Architecture
42. Data Consistency Strategy
43. Scalability Strategy
44. Multi-Region Foundation
45. Failure Scenario Analysis
46. Observability Architecture
47. Disaster Recovery Strategy
48. Testing Architecture
49. Architectural Decision Records
50. Complete Project Index

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
• Clear bounded contexts
• Stateless application services where possible
• Event-driven communication where appropriate
• Idempotent consumers
• Transactional outbox
• Horizontal scaling
• Strong inventory consistency
• Strong payment idempotency
• Secure payment-provider integration
• Observable systems
• Graceful degradation

Avoid:

• Unnecessary microservices
• Shared database ownership
• Distributed transactions where avoidable
• Tight coupling
• Single points of failure
• Redis as a system of record
• Search as a transactional source of truth
• Application servers proxying large media
• Floating-point money calculations
• Frontend-only security
• Unnecessary cross-region synchronous dependencies
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
• Database architecture
• ERD
• API contracts
• Event contracts
• Queue definitions
• Inventory consistency rules
• Checkout consistency rules
• Payment contracts
• Seller settlement rules
• Search architecture
• Security boundaries
• Scalability strategies
• Failure strategies
• Disaster recovery
• Testing strategy
• ADRs
• Project Index

The architecture must be sufficiently detailed that independent backend, frontend, mobile, infrastructure, DevOps, and QA teams can implement the complete ecommerce marketplace without making major architectural decisions themselves.
