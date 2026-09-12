# AMAZON ECOMMERCE PLATFORM — ARCHITECTURE VOLUME 2

## ROLE

You are operating as the senior architecture organization responsible for completing the detailed production architecture of a global, multi-seller ecommerce marketplace.

Operate as:

* Principal Software Architect
* Staff Backend Architect
* Staff Frontend Architect
* Staff Mobile Architect
* Database Architect
* Distributed Systems Architect
* Cloud Architect
* Security Architect
* Site Reliability Architect
* Data and Search Architect

Do not behave as a programming tutor.

Do not implement the application in this prompt.

Your responsibility is to inspect the repository, determine its actual current implementation, and define the detailed technical contracts, state machines, data relationships, asynchronous workflows, operational boundaries, and failure behavior required for the Amazon-style ecommerce marketplace.

This prompt must be understandable and executable as a standalone architecture task.

---

# PROJECT

Define the detailed architecture for a production-grade global ecommerce marketplace supporting:

* Millions of customers
* Thousands or more sellers
* Millions of products
* Product variants
* High-volume catalog operations
* High-volume search
* High-volume checkout
* Seller-managed inventory
* Payments
* Orders
* Fulfillment
* Returns
* Refunds
* Reviews
* Promotions
* Notifications
* Seller payouts
* Administration
* Auditing
* Analytics
* Product media
* Background processing
* Operational monitoring

The architecture must support incremental implementation while maintaining consistent contracts between backend, web, mobile, infrastructure, and external integrations.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless the repository contains an existing compatible implementation that must be preserved for technical reasons.

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
* Recharts
* Framer Motion

## Mobile

* React Native
* Expo
* TypeScript
* React Navigation or an equivalent compatible solution
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

## Storage

* Amazon S3 or compatible object storage
* CloudFront or compatible CDN

## Payments

* Stripe or a provider abstraction

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

---

# SOURCE OF TRUTH

Before defining or changing detailed architecture:

1. Inspect the repository.
2. Identify the actual applications and packages.
3. Inspect database models and migrations.
4. Inspect API contracts.
5. Inspect authentication and authorization.
6. Inspect event and queue infrastructure.
7. Inspect search integration.
8. Inspect storage integration.
9. Inspect frontend and mobile structure.
10. Inspect tests and infrastructure.
11. Preserve compatible implementation decisions.
12. Resolve architectural inconsistencies explicitly.

The repository is authoritative for what actually exists.

Do not assume that a previous AI response exists.

Do not depend on another prompt being present in the AI conversation.

The architecture defined here must stand on its own.

---

# ARCHITECTURAL MISSION

Complete the detailed technical architecture required for implementation.

The architecture must define:

* Domain state machines
* Core entity relationships
* Transaction boundaries
* API contracts
* Idempotency
* Event contracts
* Queue contracts
* Search synchronization
* Cache policies
* Media workflows
* Payment workflows
* Order workflows
* Inventory workflows
* Seller workflows
* Return workflows
* Notification workflows
* Audit requirements
* Security boundaries
* Operational requirements
* Disaster-recovery considerations

Avoid implementing application functionality.

Architecture artifacts may contain schemas, diagrams, contracts, state definitions, examples, and structured technical specifications necessary to remove ambiguity.

---

# DOMAIN STATE MACHINES

Define explicit state machines for important business entities.

At minimum address:

### Customer Account

Define states and transitions for:

* Registration
* Verification
* Active
* Suspended
* Locked
* Deactivated

Specify which transitions are user-triggered, administrator-triggered, or system-triggered.

---

### Seller Account

Define:

* Application
* Pending review
* Approved
* Rejected
* Suspended
* Active
* Restricted
* Closed

Specify authorization consequences for each state.

---

### Product

Define appropriate lifecycle states such as:

* Draft
* Pending review
* Active
* Inactive
* Rejected
* Archived

Define which transitions affect search indexing and customer visibility.

---

### Inventory

Define:

* Available
* Reserved
* Allocated
* Fulfilled
* Released
* Adjusted

The architecture must distinguish physical quantity from sellable quantity and temporary reservations.

---

### Order

Define appropriate states including:

* Pending
* Confirmed
* Processing
* Partially fulfilled
* Fulfilled
* Delivered
* Cancelled
* Return requested
* Returned
* Refunded
* Failed where appropriate

Define legal and illegal transitions.

Do not permit clients to arbitrarily assign order states.

---

### Payment

Define states such as:

* Pending
* Requires action
* Authorized
* Captured
* Failed
* Cancelled
* Partially refunded
* Refunded
* Disputed

Provider-specific statuses must be translated into internal payment states.

---

### Return

Define:

* Requested
* Under review
* Approved
* Rejected
* Awaiting shipment
* Received
* Inspected
* Refunded
* Closed

Define how returns interact with inventory and payments.

---

### Shipment

Define:

* Pending
* Preparing
* Shipped
* In transit
* Out for delivery
* Delivered
* Failed delivery
* Returned

Define external carrier integration boundaries.

---

# CORE DATA MODEL

Define the conceptual relational model.

At minimum account for:

* User
* CustomerProfile
* Seller
* SellerUser
* Address
* Product
* ProductVariant
* Category
* Brand
* ProductAttribute
* ProductMedia
* InventoryItem
* InventoryReservation
* Price
* Cart
* CartItem
* Wishlist
* WishlistItem
* Promotion
* Coupon
* Order
* OrderItem
* Payment
* Refund
* Return
* ReturnItem
* Shipment
* ShipmentItem
* Review
* Rating
* Notification
* NotificationPreference
* SellerPayout
* Dispute
* AuditLog

Define:

* Ownership
* Relationships
* Cardinality
* Required fields
* Optional fields
* Unique constraints
* Indexing requirements
* Lifecycle expectations

Do not blindly translate every conceptual entity into a separate table if the actual domain model can represent it more safely or efficiently.

---

# MULTI-SELLER ORDER ARCHITECTURE

The marketplace must support a customer purchasing products from multiple sellers in a single checkout.

Define how:

* Cart items identify sellers
* Prices are validated
* Seller-specific fulfillment is represented
* One customer checkout becomes one or more seller fulfillment units
* Order-level totals are calculated
* Seller-level totals are calculated
* Taxes and shipping are represented
* Seller payouts are calculated
* Returns are associated with the correct seller
* Refunds are allocated correctly

The architecture must clearly distinguish:

* Customer order
* Seller order/fulfillment grouping
* Order item
* Shipment
* Payment
* Seller payout

Do not duplicate financial truth across unrelated records.

---

# CHECKOUT ARCHITECTURE

Define the complete checkout lifecycle.

The architecture must address:

1. Cart retrieval
2. Cart validation
3. Product availability
4. Price validation
5. Promotion validation
6. Shipping calculation
7. Tax calculation where applicable
8. Inventory reservation
9. Order creation
10. Payment initialization
11. Payment confirmation
12. Payment failure
13. Reservation release
14. Order confirmation
15. Asynchronous fulfillment

Define what occurs synchronously and what occurs asynchronously.

Define idempotency behavior for repeated checkout requests.

Define recovery behavior when:

* Inventory reservation succeeds but payment fails
* Payment succeeds but the response is lost
* Order creation succeeds but an external dependency fails
* A client retries after a timeout
* A webhook arrives before the client receives a response

Do not rely on distributed transactions across external providers.

---

# INVENTORY ARCHITECTURE

Define inventory as a concurrency-sensitive domain.

Specify:

* On-hand quantity
* Reserved quantity
* Available quantity
* Safety stock where applicable
* Inventory adjustments
* Reservation expiration
* Reservation release
* Purchase deduction
* Cancellation restoration
* Return restocking
* Seller inventory ownership

Define concurrency control.

Consider:

* Database transactions
* Atomic updates
* Optimistic concurrency
* Pessimistic locking where justified
* Unique reservation identifiers
* Idempotent inventory operations

Inventory correctness takes priority over approximate availability.

---

# PRICING ARCHITECTURE

Define pricing responsibilities.

The architecture must support:

* Seller-specific pricing
* Base pricing
* Variant pricing
* Promotional pricing
* Scheduled pricing
* Coupon discounts
* Quantity-based discounts where applicable
* Price history where required

Define how prices are:

* Stored
* Retrieved
* Cached
* Validated during checkout
* Included in order snapshots

An order must preserve the final monetary values used during purchase.

Historical order pricing must not change merely because a product's current price changes.

---

# MONEY AND FINANCIAL DATA

Define exact monetary representation.

All monetary values must specify:

* Amount
* Currency
* Precision
* Rounding rules
* Tax treatment
* Discount treatment

Never use binary floating-point values as the authoritative representation of money.

Financial calculations must be deterministic.

Define how the architecture prevents:

* Negative totals
* Double refunds
* Duplicate charges
* Double payouts
* Currency mismatches
* Coupon over-application
* Price tampering

---

# PAYMENT AND REFUND WORKFLOWS

Define provider-independent payment contracts.

The architecture must include:

* Payment intent creation
* Idempotency keys
* Provider reference IDs
* Internal payment state
* Webhook verification
* Webhook deduplication
* Payment reconciliation
* Refund requests
* Partial refunds
* Full refunds
* Failed refunds
* Disputes

Payment webhooks must be processed asynchronously when appropriate.

Webhook processing must be idempotent.

The system must not trust client-provided payment status.

---

# SELLER PAYOUT ARCHITECTURE

Define seller financial settlement architecture.

At minimum address:

* Seller gross sales
* Platform fees
* Discounts
* Refunds
* Chargebacks/disputes
* Shipping-related amounts
* Taxes where applicable
* Net seller amount
* Payout eligibility
* Payout status
* Provider reference

Payout calculations must be reproducible.

Do not calculate financial settlement solely from mutable current product or order data.

Define immutable or auditable financial snapshots where required.

---

# RETURN AND REFUND ARCHITECTURE

Define how returns interact with:

* Orders
* Order items
* Sellers
* Inventory
* Payments
* Refunds
* Shipments
* Customer notifications

Support partial returns.

Prevent duplicate return requests where business rules disallow them.

Define eligibility calculations based on configurable business rules.

Define authorization boundaries between:

* Customer
* Seller
* Support
* Administrator

---

# PROMOTION ARCHITECTURE

Define promotion and coupon models.

Support appropriate combinations of:

* Percentage discounts
* Fixed discounts
* Product-specific promotions
* Category promotions
* Seller promotions
* Minimum-order thresholds
* Quantity conditions
* Time windows
* Usage limits
* Per-customer limits

Define promotion evaluation order.

Prevent:

* Coupon reuse beyond allowed limits
* Race conditions around usage limits
* Negative order totals
* Unauthorized promotion creation
* Client-side manipulation

Promotion application must be validated server-side.

---

# CART ARCHITECTURE

Define cart behavior for:

* Multiple sellers
* Product variants
* Quantity changes
* Price changes
* Inventory changes
* Product deactivation
* Seller suspension
* Promotion changes

Cart state may be ephemeral, but order state must be durable.

Define cart expiration where appropriate.

Define behavior when a cart contains no-longer-purchasable products.

---

# SEARCH INDEX CONTRACT

Define a canonical search document model.

The search document must represent enough information for:

* Full-text search
* Product filtering
* Category filtering
* Seller filtering
* Price filtering
* Availability
* Rating
* Attributes
* Facets
* Sorting

Do not make search documents the authoritative source for transactional fields.

Define:

* Document ID
* Version
* Product ID
* Variant information
* Seller information
* Searchable fields
* Filterable fields
* Facetable fields
* Ranking signals
* Media references where appropriate

---

# EVENT CONTRACTS

Define standardized event envelopes.

Each event should contain:

* Event ID
* Event type
* Event version
* Aggregate/entity ID
* Producer
* Created timestamp
* Correlation ID
* Trace ID where available
* Payload

Define event examples for:

* ProductCreated
* ProductUpdated
* ProductPublished
* InventoryChanged
* PriceChanged
* OrderCreated
* OrderConfirmed
* PaymentAuthorized
* PaymentCaptured
* PaymentFailed
* OrderCancelled
* ShipmentCreated
* ShipmentDelivered
* ReturnRequested
* RefundCompleted
* SellerApproved
* ReviewCreated

Events must be versionable.

Consumers must tolerate duplicate delivery.

---

# TRANSACTIONAL OUTBOX

Define where transactional outbox patterns are required.

At minimum consider:

* Product changes requiring search updates
* Inventory changes requiring downstream processing
* Order creation
* Payment state changes
* Fulfillment state changes
* Seller payout events

Define:

* Outbox record
* Event state
* Retry state
* Publishing process
* Failure handling
* Deduplication
* Cleanup/retention

The outbox must not become an unbounded operational data store.

---

# QUEUE CONTRACTS

Define BullMQ job contracts for appropriate asynchronous workloads.

At minimum consider:

* Search indexing
* Product media processing
* Email delivery
* Push notifications
* Catalog imports
* Inventory synchronization
* Payment reconciliation
* Refund processing
* Seller payout processing
* Analytics aggregation
* Data cleanup

For every important job define:

* Queue name
* Job type
* Payload
* Priority
* Retry count
* Backoff
* Timeout
* Concurrency
* Idempotency
* Failure behavior
* Dead-letter behavior

---

# CATALOG IMPORT ARCHITECTURE

Define large-scale seller catalog ingestion.

Support appropriate forms of:

* Batch product imports
* CSV or structured imports
* Product updates
* Inventory imports
* Price imports

The architecture must prevent massive imports from blocking interactive APIs.

Define:

* Upload
* Validation
* Parsing
* Staging
* Validation errors
* Batch processing
* Partial success
* Retry
* Progress tracking
* Completion
* Failure reporting

Do not process millions of records inside a single HTTP request.

---

# MEDIA PROCESSING ARCHITECTURE

Define asynchronous media processing.

The workflow must cover:

1. Upload authorization
2. Object storage upload
3. Upload completion
4. Validation
5. Malware/file safety checks where appropriate
6. Image processing
7. Variant generation
8. Metadata extraction
9. Persistence
10. CDN publication
11. Failure handling

Media processing must be retryable and idempotent.

---

# NOTIFICATION CONTRACTS

Define notification events and delivery architecture.

Notifications should support:

* Email
* Push
* In-app
* SMS where required

Define:

* Notification ID
* Recipient
* Type
* Template
* Data
* Channel
* Priority
* Delivery state
* Retry state

Do not place secrets or excessive private information into notification payloads.

---

# ADMINISTRATION ARCHITECTURE

Define privileged administrative capabilities.

Separate:

* Platform administration
* Customer support
* Seller operations
* Financial operations
* Security operations

Use least privilege.

Administrative actions involving sensitive data or business state must produce audit records.

Define audit metadata including:

* Actor
* Action
* Target
* Timestamp
* Request/correlation ID
* Relevant context
* Result

Never log sensitive secrets in audit records.

---

# REVIEW AND MODERATION ARCHITECTURE

Define review lifecycle.

Support:

* Review creation
* Eligibility validation
* Rating
* Text content
* Media attachments where applicable
* Moderation
* Reporting
* Removal
* Appeals where appropriate

Define whether review eligibility is based on verified purchases or another business rule.

Moderation must not allow unauthorized users to alter review ownership or ratings.

---

# PRIVACY ARCHITECTURE

Define boundaries for customer data.

Address:

* Data minimization
* Access control
* Data retention
* Account deletion
* Address privacy
* Order-history privacy
* Seller access to customer information
* Administrative access
* Auditability

Sellers must receive only the customer information required for legitimate order fulfillment and marketplace operations.

---

# API ERROR CONTRACT

Define a consistent API error model.

Errors should distinguish:

* Validation failure
* Authentication failure
* Authorization failure
* Resource not found
* Conflict
* Rate limiting
* Idempotency conflict
* Dependency failure
* Internal failure

Errors must provide stable machine-readable codes.

Do not expose stack traces or internal infrastructure details to clients.

---

# PAGINATION AND QUERY CONTRACTS

Define standard pagination.

Use cursor-based pagination for high-volume resources where appropriate.

Define:

* Cursor encoding
* Page size
* Maximum page size
* Sort stability
* Filtering
* Search pagination
* Cursor expiration where appropriate

Avoid offset pagination for workloads where large offsets produce unacceptable database performance.

---

# RATE LIMITING

Define rate-limit categories for:

* Authentication
* Password recovery
* Search
* Product APIs
* Cart
* Checkout
* Reviews
* Seller APIs
* Administrative APIs
* Webhooks
* Media uploads

Rate limiting must distinguish legitimate high-volume traffic from abusive behavior.

Define failure behavior when Redis or the selected rate-limit infrastructure is unavailable.

---

# REAL-TIME ARCHITECTURE

Use real-time communication only where it materially improves the product.

Potential use cases include:

* Order status updates
* Seller operational notifications
* Administrative operational updates
* Inventory-related dashboards
* Notification delivery

Define:

* Connection authentication
* Authorization
* Channel ownership
* Connection limits
* Reconnection
* Backpressure
* Event ordering
* Duplicate handling
* Presence where applicable

Do not expose private events to unauthorized clients.

---

# ANALYTICS ARCHITECTURE

Define separation between transactional workloads and analytics workloads.

Track business metrics such as:

* Orders
* Revenue
* Conversion
* Product views
* Cart activity
* Seller sales
* Refunds
* Returns
* Search behavior
* Inventory behavior

Do not run expensive analytical queries directly against highly contended transactional tables when doing so threatens production workloads.

Define asynchronous aggregation where appropriate.

---

# DISASTER RECOVERY

Define architectural requirements for:

* PostgreSQL backups
* Point-in-time recovery
* Object-storage durability
* Search reconstruction
* Redis recovery
* Queue recovery
* Event replay
* Configuration recovery

Search indexes and caches should be reconstructable from authoritative data.

Define recovery objectives appropriate to the marketplace's criticality.

Specify:

* RPO
* RTO
* Backup frequency
* Retention
* Restore testing
* Regional recovery strategy

---

# SECURITY THREAT MODEL

The architecture must explicitly address threats involving:

* Account takeover
* Seller impersonation
* Broken object-level authorization
* Coupon abuse
* Price manipulation
* Inventory manipulation
* Payment manipulation
* Malicious media
* Webhook forgery
* Privilege escalation
* Data exfiltration
* Automated abuse
* Scraping
* Credential stuffing
* Denial of service

For each major threat, define the architectural mitigation.

---

# ARCHITECTURE VALIDATION

Before finalizing the architecture:

1. Check domain ownership for conflicts.
2. Check API dependencies for circular coupling.
3. Check event dependencies for loops.
4. Check transaction boundaries for unsafe distributed assumptions.
5. Check inventory concurrency behavior.
6. Check payment idempotency.
7. Check seller isolation.
8. Check customer privacy.
9. Check search consistency.
10. Check queue retry behavior.
11. Check failure recovery.
12. Check observability.
13. Check scalability.
14. Check disaster recovery.
15. Check whether the selected technologies can implement the architecture realistically.

Resolve contradictions before declaring the architecture complete.

---

# ARCHITECTURE DOCUMENTATION

Create or update the repository's architecture documentation so that it contains the detailed contracts established by this task.

The documentation must be organized so that backend, frontend, mobile, QA, and infrastructure engineers can independently determine:

* What they own
* What they consume
* What they produce
* Which APIs they use
* Which events they consume
* Which events they publish
* Which data they own
* Which data they may read
* Which security boundaries apply
* How failures are handled

Documentation must describe actual architectural decisions.

Do not create undocumented assumptions that implementation teams will have to infer.

---

# IMPLEMENTATION DISCIPLINE

Before modifying architecture artifacts:

1. Inspect the repository.
2. Understand existing architecture documentation.
3. Identify existing contracts.
4. Preserve compatible decisions.
5. Identify contradictions.
6. Resolve contradictions explicitly.
7. Update only the architectural artifacts required by this scope.
8. Avoid rewriting unrelated implementation code.
9. Validate architectural consistency.
10. Ensure documentation is internally coherent.

Do not implement backend, frontend, mobile, or infrastructure features as part of this architecture task.

---

# ARCHITECTURAL COMPLETION CRITERIA

This architecture work is complete only when:

* Core state machines are defined.
* Core entity relationships are defined.
* Multi-seller order architecture is defined.
* Checkout workflow is defined.
* Inventory concurrency is defined.
* Pricing behavior is defined.
* Payment and refund behavior is defined.
* Seller settlement architecture is defined.
* Returns are defined.
* Promotions are defined.
* Cart behavior is defined.
* Search contracts are defined.
* Event contracts are defined.
* Transactional outbox requirements are defined.
* Queue contracts are defined.
* Catalog import architecture is defined.
* Media processing architecture is defined.
* Notification contracts are defined.
* Administrative boundaries are defined.
* Moderation architecture is defined.
* Privacy boundaries are defined.
* API error and pagination contracts are defined.
* Rate limiting is defined.
* Real-time behavior is defined where applicable.
* Analytics boundaries are defined.
* Disaster recovery architecture is defined.
* Major security threats and mitigations are defined.
* Architecture documentation accurately represents these decisions.
* No major domain has ambiguous ownership.

---

# IMPLEMENTATION REPORT

At the end of the architecture task, provide a concise engineering report containing:

* Files created
* Files modified
* Detailed architecture decisions established
* State machines established
* Data-model decisions
* Transaction decisions
* API decisions
* Event contracts
* Queue contracts
* Search contracts
* Cache decisions
* Payment decisions
* Inventory decisions
* Seller settlement decisions
* Security decisions
* Privacy decisions
* Resilience decisions
* Disaster-recovery decisions
* Validation performed
* Important compatibility considerations
* Any genuinely unresolved architectural issues

The report must describe actual repository changes and architectural decisions.

---

# FINAL DIRECTIVE

Treat the marketplace architecture as one coherent production system.

Define explicit ownership.

Define explicit state transitions.

Define explicit transactional boundaries.

Define explicit contracts.

Design every critical workflow for retries, duplicates, concurrency, and partial failure.

Keep PostgreSQL authoritative for transactional state.

Keep search and caches reconstructable.

Use events and queues where asynchronous processing provides real architectural value.

Protect customer and seller isolation.

Protect financial integrity.

Protect administrative operations.

Make security, observability, reliability, scalability, and disaster recovery first-class architecture concerns.

Inspect the repository before modifying architecture artifacts.

Do not rely on another AI-generated prompt or conversation context.

This prompt is a complete, standalone architecture specification for the detailed architecture task of the Amazon ecommerce marketplace.
