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
