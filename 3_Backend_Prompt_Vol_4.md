You are operating in Senior Engineering Team Mode.

Build the production-ready backend for inventory, warehouses, inventory reservations, transfers, shopping cart, wishlist, checkout, taxes, shipping calculation, and order-preparation workflows for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, seller-isolation rules, catalog architecture, pricing architecture, API conventions, event architecture, payment boundaries, and security model.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Warehouses
• Inventory
• Inventory items
• Inventory movements
• Inventory adjustments
• Inventory reservations
• Reservation expiration
• Inventory transfers
• Low-stock alerts
• Multi-warehouse allocation
• Shopping cart
• Wishlist
• Checkout sessions
• Tax calculation
• Shipping calculation
• Delivery estimates
• Checkout validation
• Order-preparation workflows

The implementation must support:

• Millions of products
• Hundreds of thousands of sellers
• Multiple warehouses
• High inventory-write volume
• High checkout concurrency
• Multiple sellers in a single cart
• Multi-seller checkout
• Regional inventory
• Regional pricing
• Regional taxes
• Regional shipping
• Horizontal scaling
• High availability
• Strong transactional correctness

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Background Processing:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

Payments:

• Stripe integration boundary from the established architecture

Search:

• Elasticsearch/OpenSearch integration where required

Object Storage:

• AWS S3 integration where required

Testing:

• Jest
• Supertest
• Integration testing tools

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

Keep domain rules outside controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use production-ready transaction handling.

────────────────────────────────────────

DOMAIN OWNERSHIP

Maintain clear boundaries between:

Inventory

Warehouses

Inventory Reservations

Inventory Transfers

Cart

Wishlist

Checkout

Taxes

Shipping Calculation

Do not mix inventory state with cart state.

Do not treat the cart as an inventory source of truth.

Do not create orders directly from unvalidated cart state.

────────────────────────────────────────

WAREHOUSE DOMAIN

Implement:

• Warehouse creation
• Warehouse update
• Warehouse status
• Warehouse address
• Warehouse region
• Warehouse operating settings
• Warehouse capacity metadata
• Warehouse ownership

Support states such as:

• Draft
• Active
• Maintenance
• Suspended
• Closed

Define seller ownership for seller-controlled warehouses.

Platform-controlled warehouses must be isolated from seller-controlled warehouse data.

────────────────────────────────────────

WAREHOUSE LOCATIONS

Support warehouse locations where required.

Define:

• Location
• Zone
• Bin
• Storage area

Use warehouse-location metadata only where it provides operational value.

Do not create unnecessary physical-logistics complexity in the transactional model.

────────────────────────────────────────

INVENTORY ITEM

Implement inventory records associated with:

• Product variant
• Seller offer
• Warehouse

Track appropriate quantities:

• On hand
• Available
• Reserved
• Damaged
• In transit
• Safety stock

Define derived versus persisted quantities carefully.

Avoid allowing multiple independent sources of truth for the same stock quantity.

────────────────────────────────────────

INVENTORY INVARIANTS

Enforce:

• Available quantity cannot exceed on-hand quantity
• Reserved quantity cannot exceed available reservable quantity
• Invalid negative values must be rejected
• Inventory updates must be atomic
• Inventory reservations must be idempotent
• Inventory releases must be idempotent

Define behavior for products where negative inventory is intentionally allowed, if supported.

Do not silently allow negative inventory for ordinary physical goods.

────────────────────────────────────────

INVENTORY MOVEMENTS

Implement an immutable inventory movement ledger.

Support movement types such as:

• Receipt
• Sale
• Reservation
• Reservation Release
• Adjustment
• Transfer Out
• Transfer In
• Return
• Damage
• Loss
• Correction

Each movement must include:

• Product/variant
• Seller
• Warehouse
• Quantity
• Movement type
• Reference
• Actor/system source
• Timestamp
• Idempotency key where appropriate

The movement ledger must be auditable.

────────────────────────────────────────

INVENTORY ADJUSTMENTS

Implement controlled stock adjustments.

Support:

• Increase
• Decrease
• Reason
• Reference
• Actor
• Approval where required

High-risk manual adjustments should require elevated permissions.

Every adjustment must create an auditable movement.

────────────────────────────────────────

INVENTORY RESERVATIONS

Implement reservation functionality.

Support:

• Reservation creation
• Reservation confirmation
• Reservation release
• Reservation expiration
• Reservation extension where allowed
• Reservation cancellation
• Reservation lookup

A reservation must include:

• Reservation ID
• Cart/checkout reference
• Product/variant
• Seller offer
• Warehouse
• Quantity
• Status
• Expiration
• Created timestamp
• Updated timestamp

────────────────────────────────────────

RESERVATION STATE MACHINE

Support states such as:

• Pending
• Active
• Confirmed
• Released
• Expired
• Canceled
• Failed

Define allowed transitions.

Transitions must be idempotent.

A released or expired reservation cannot be released twice in a way that corrupts inventory.

────────────────────────────────────────

INVENTORY CONCURRENCY

Prevent overselling under concurrent requests.

Evaluate:

• Row-level locking
• Optimistic concurrency
• Atomic updates
• Serializable transactions where justified
• Reservation tokens

Use the least complex strategy that guarantees correctness at the required scale.

Define behavior when two checkout requests compete for the same final units.

────────────────────────────────────────

MULTI-WAREHOUSE ALLOCATION

Implement inventory allocation logic.

Support selection based on:

• Availability
• Customer region
• Shipping region
• Warehouse status
• Seller ownership
• Shipping speed
• Cost
• Warehouse capacity

Do not reserve inventory in every possible warehouse.

Select an appropriate fulfillment plan before creating reservations.

────────────────────────────────────────

INVENTORY TRANSFERS

Implement:

• Transfer creation
• Transfer approval
• Transfer dispatch
• Transfer receipt
• Transfer cancellation
• Transfer failure

Support:

• Source warehouse
• Destination warehouse
• Product/variant
• Quantity
• Transfer status
• Tracking metadata

Inventory must not become available at the destination until the appropriate transfer state is reached.

────────────────────────────────────────

LOW-STOCK ALERTS

Implement low-stock thresholds.

Support:

• Product-level threshold
• Warehouse-level threshold
• Seller-level threshold where appropriate

Use asynchronous notifications rather than slowing inventory transactions.

────────────────────────────────────────

INVENTORY EXPIRATION JOBS

Implement background jobs for:

• Reservation expiration
• Reservation reconciliation
• Stale transfer detection
• Inventory reconciliation
• Low-stock processing

Jobs must be:

• Idempotent
• Retryable
• Observable

────────────────────────────────────────

CART DOMAIN

Implement shopping cart functionality.

Support:

• Cart creation
• Cart retrieval
• Add item
• Update quantity
• Remove item
• Clear cart
• Cart expiration where appropriate
• Multi-device cart access
• Seller separation
• Cart totals

Cart items must reference authoritative catalog and offer identifiers.

Do not trust client-submitted prices.

────────────────────────────────────────

CART VALIDATION

Before checkout, validate:

• Product exists
• Offer exists
• Offer is active
• Seller is active
• Product is purchasable
• Variant exists
• Current price
• Promotion eligibility
• Quantity limits
• Inventory availability
• Regional availability
• Shipping eligibility

The cart may contain stale information.

Checkout must always revalidate authoritative state.

────────────────────────────────────────

CART CONSISTENCY

The cart may be eventually consistent in some UI scenarios.

However:

• Checkout validation must be strongly consistent
• Prices must be revalidated
• Inventory must be revalidated
• Promotions must be revalidated

Do not permanently reserve inventory simply because an item was added to a cart unless the business model explicitly requires it.

────────────────────────────────────────

WISHLIST

Implement:

• Wishlist creation
• Add item
• Remove item
• List items
• Reordering where appropriate

Prevent duplicate wishlist entries.

Wishlist must not reserve inventory.

────────────────────────────────────────

CHECKOUT DOMAIN

Implement checkout as an explicit workflow.

Support:

• Checkout creation
• Checkout retrieval
• Address selection
• Shipping selection
• Tax calculation
• Promotion validation
• Coupon validation
• Inventory validation
• Inventory reservation
• Payment preparation
• Order-preparation validation

Do not create a permanent order merely because checkout began.

────────────────────────────────────────

CHECKOUT STATE MACHINE

Support states such as:

• Draft
• Validating
• Inventory Reserved
• Awaiting Payment
• Payment Processing
• Ready for Order Creation
• Completed
• Failed
• Expired
• Canceled

Define transitions.

Every transition must be validated server-side.

────────────────────────────────────────

CHECKOUT SNAPSHOTS

Persist snapshots where required for:

• Product title
• Seller
• Offer
• Price
• Currency
• Discount
• Tax
• Shipping
• Customer address
• Selected delivery method

The final order must not depend on mutable current catalog state.

────────────────────────────────────────

TAX ARCHITECTURE

Implement the tax abstraction boundary.

Support:

• Tax jurisdiction
• Tax rates
• Tax categories
• Exemptions where applicable
• Tax calculation
• Tax rounding
• Tax snapshots

The system must support future integration with external tax providers.

Do not hard-code a single country's tax rules into the core domain.

────────────────────────────────────────

TAX CALCULATION

Calculate taxes based on:

• Product
• Seller
• Customer location
• Shipping destination
• Tax jurisdiction
• Price
• Discount
• Shipping charges

Define rounding strategy.

Historical orders must preserve the tax result used during checkout.

────────────────────────────────────────

SHIPPING DOMAIN

Implement shipping calculation foundations.

Support:

• Shipping addresses
• Shipping zones
• Shipping methods
• Shipping rates
• Delivery estimates
• Seller shipping rules
• Warehouse shipping rules
• Regional restrictions

Define provider abstraction.

Do not tie core checkout logic directly to a specific shipping carrier.

────────────────────────────────────────

SHIPPING RATE CALCULATION

Support:

• Flat rate
• Free shipping
• Threshold-based shipping
• Weight-based shipping
• Region-based shipping
• Seller-specific shipping

Prepare for external carrier-rate APIs.

Handle provider failures safely.

────────────────────────────────────────

DELIVERY ESTIMATES

Calculate estimated delivery based on:

• Warehouse
• Inventory availability
• Processing time
• Shipping method
• Destination
• Carrier/service
• Cutoff times where applicable

Clearly identify estimates versus guarantees.

────────────────────────────────────────

CHECKOUT SHIPPING ALLOCATION

For multi-seller or multi-warehouse carts, design:

• Shipping groups
• Seller shipping groups
• Warehouse shipping groups
• Shipping methods
• Shipping costs
• Delivery estimates

Do not assume a single shipment for every cart.

────────────────────────────────────────

CHECKOUT PROMOTIONS

Integrate with the established promotion and coupon engine.

Validate:

• Coupon
• Promotion
• Eligibility
• Usage limits
• Expiration
• Seller restrictions
• Product restrictions

Do not permanently consume a coupon before the appropriate transactional point.

────────────────────────────────────────

CHECKOUT IDEMPOTENCY

Implement idempotency for:

• Checkout creation
• Inventory reservation
• Shipping selection
• Coupon redemption preparation
• Payment preparation

Client retries must not create duplicate reservations or duplicate checkout objects.

────────────────────────────────────────

CHECKOUT FAILURE HANDLING

Define behavior when:

• Inventory becomes unavailable
• Price changes
• Promotion expires
• Coupon becomes invalid
• Tax provider fails
• Shipping provider fails
• Payment cannot proceed
• Reservation cannot be created

Return recoverable errors where possible.

Do not leave stale reservations behind.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for:

• Warehouse
• WarehouseLocation where justified
• InventoryItem
• InventoryMovement
• InventoryReservation
• InventoryTransfer
• InventoryTransferItem where required
• LowStockRule
• Cart
• CartItem
• Wishlist
• WishlistItem
• Checkout
• CheckoutItem
• CheckoutShippingGroup
• ShippingMethod
• ShippingRate
• TaxCalculation
• AddressSnapshot where appropriate

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Check constraints
• Optimistic concurrency fields where required
• Status constraints
• Timestamps

Identify high-growth tables and partitioning candidates.

────────────────────────────────────────

DATABASE TRANSACTIONS

Use transactions for:

• Inventory reservation
• Inventory release
• Inventory adjustment
• Inventory transfer transitions
• Checkout state transitions requiring strong consistency
• Wishlist uniqueness
• Cart item uniqueness where needed

Do not use distributed transactions between payment, shipping, and inventory systems.

Use orchestration and idempotency.

────────────────────────────────────────

EVENTS

Publish events including:

INVENTORY

• WarehouseCreated
• WarehouseUpdated
• InventoryItemCreated
• InventoryChanged
• InventoryReserved
• InventoryReservationConfirmed
• InventoryReservationReleased
• InventoryReservationExpired
• InventoryAdjusted
• InventoryTransferCreated
• InventoryTransferDispatched
• InventoryTransferReceived
• InventoryTransferCanceled
• LowStockDetected

CART

• CartCreated
• CartItemAdded
• CartItemUpdated
• CartItemRemoved
• CartCleared

CHECKOUT

• CheckoutStarted
• CheckoutValidated
• CheckoutFailed
• InventoryReservationFailed
• CheckoutExpired

WISHLIST

• WishlistCreated
• WishlistItemAdded
• WishlistItemRemoved

SHIPPING

• ShippingRateCalculated
• ShippingSelectionChanged

TAX

• TaxCalculated

Events must not duplicate entire cart, checkout, or inventory records.

Use transactional outbox where appropriate.

────────────────────────────────────────

BACKGROUND JOBS

Implement BullMQ jobs for:

• Reservation expiration
• Inventory reconciliation
• Transfer monitoring
• Low-stock alerts
• Cart cleanup where appropriate
• Checkout expiration
• Tax calculation retries
• Shipping-rate retries
• Inventory synchronization

Every worker must implement:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter handling
• Metrics
• Structured logging

────────────────────────────────────────

REDIS

Use Redis selectively for:

• Cart acceleration where appropriate
• Checkout temporary state where appropriate
• Rate limiting
• Idempotency
• Distributed locking
• Cached shipping rates where safe
• Cached tax configuration where safe

PostgreSQL remains authoritative.

────────────────────────────────────────

API

Implement production-ready APIs.

WAREHOUSES

• Create
• Get
• List
• Update
• Activate
• Suspend

INVENTORY

• Get inventory
• Adjust inventory
• Inventory history
• Low-stock configuration

RESERVATIONS

• Reserve
• Confirm
• Release
• Get status

TRANSFERS

• Create
• Get
• Approve
• Dispatch
• Receive
• Cancel

CART

• Get
• Add item
• Update item
• Remove item
• Clear

WISHLIST

• Get
• Add
• Remove

CHECKOUT

• Create
• Get
• Validate
• Select address
• Calculate tax
• Calculate shipping
• Apply coupon
• Reserve inventory
• Update shipping method
• Prepare payment
• Cancel
• Expire

Every endpoint must include:

• Authentication
• Authorization
• Validation
• Idempotency
• Rate limiting
• OpenAPI documentation
• Consistent errors

────────────────────────────────────────

SELLER ISOLATION

Seller-owned inventory must always be scoped to the authenticated seller.

Apply isolation to:

• Warehouses
• Inventory
• Transfers
• Seller carts where relevant
• Seller-specific shipping configuration
• Seller-specific promotions

Never trust client-provided seller IDs.

Platform administrators require explicit elevated permissions.

────────────────────────────────────────

SECURITY

Implement protections against:

• Inventory manipulation
• Unauthorized warehouse access
• Checkout tampering
• Price tampering
• Coupon abuse
• Shipping-rate manipulation
• Tax manipulation
• Quantity manipulation
• IDOR
• Replay attacks
• Duplicate reservation

All critical values must be recalculated or validated server-side.

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Inventory operations
• Reservation latency
• Reservation failures
• Checkout validation
• Checkout duration
• Cart operations
• Shipping calculations
• Tax calculations
• Transfer operations

Track:

• Inventory reservation success rate
• Oversell-prevention failures
• Reservation leaks
• Checkout abandonment
• Checkout failure rate
• Shipping provider latency
• Tax provider latency
• Queue backlog

Never log sensitive payment credentials.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Inventory invariants
• Reservation state machine
• Concurrency rules
• Transfer state machine
• Cart validation
• Checkout state machine
• Shipping calculations
• Tax calculations
• Coupon integration
• Seller isolation

INTEGRATION TESTS

Test:

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• Shipping providers
• Tax provider abstraction

CONCURRENCY TESTS

Test:

• Two buyers competing for one unit
• Multiple reservations
• Reservation expiration races
• Concurrent inventory adjustments
• Concurrent checkout retries

API TESTS

Test all endpoints.

PERFORMANCE TESTS

Test:

• Inventory reads
• Inventory writes
• Reservation throughput
• Checkout throughput
• Cart operations
• Shipping calculations

SECURITY TESTS

Test:

• Seller isolation
• Inventory tampering
• Checkout tampering
• Coupon abuse
• IDOR
• Replay
• Reservation duplication

────────────────────────────────────────

DOCUMENTATION

Generate:

• Inventory architecture
• Reservation model
• Warehouse model
• Transfer model
• Cart architecture
• Checkout architecture
• Tax architecture
• Shipping architecture
• Concurrency strategy
• State machines
• API contracts
• Event contracts
• Database schema
• Failure handling
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Warehouse modules
• Inventory modules
• Reservation modules
• Transfer modules
• Cart modules
• Wishlist modules
• Checkout modules
• Tax modules
• Shipping modules
• Database objects
• Migrations
• APIs
• Events
• Queues
• Workers
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Warehouses, locations, inventory items, inventory schema, and core inventory services.

BACKEND MILESTONE 2

Inventory movements, adjustments, concurrency controls, and auditability.

BACKEND MILESTONE 3

Inventory reservations, expiration, reconciliation, and low-stock processing.

BACKEND MILESTONE 4

Inventory transfers and multi-warehouse allocation.

BACKEND MILESTONE 5

Shopping cart and wishlist.

BACKEND MILESTONE 6

Checkout lifecycle, validation, snapshots, and idempotency.

BACKEND MILESTONE 7

Tax calculation and shipping calculation.

BACKEND MILESTONE 8

Checkout promotion/coupon integration and inventory reservation integration.

BACKEND MILESTONE 9

Events, queues, Redis, observability, and scheduled jobs.

BACKEND MILESTONE 10

Integration, concurrency, performance, security, and production-readiness testing.

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

• Warehouses
• Inventory
• Inventory movements
• Inventory reservations
• Inventory transfers
• Low-stock processing
• Shopping cart
• Wishlist
• Checkout
• Taxes
• Shipping calculation
• Delivery estimates
• Checkout promotion integration

Do not implement complete:

• Final order orchestration
• Payments
• Seller payouts
• Fulfillment execution
• Shipment execution
• Returns
• Refunds
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration UI
• Infrastructure

Those belong to later implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat inventory and checkout as critical transactional infrastructure.

Assume:

• High checkout concurrency
• Limited inventory
• Millions of carts
• Multiple sellers per cart
• Multiple warehouses
• Regional fulfillment
• Payment retries
• Shipping-provider failures
• Tax-provider failures
• Global traffic

Prioritize:

• Inventory correctness
• Oversell prevention
• Idempotency
• Transaction safety
• Checkout reliability
• Seller isolation
• Scalability
• Observability
• Recovery
• Production readiness
