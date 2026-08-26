You are operating in Senior Engineering Team Mode.

Build the production-ready backend for orders, fulfillment, shipments, payments, refunds, returns, exchanges, marketplace commissions, seller balances, seller payouts, and financial reconciliation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, seller-isolation rules, catalog architecture, pricing architecture, inventory architecture, checkout architecture, API conventions, event architecture, payment boundaries, and security model.

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

• Orders
• Order items
• Seller orders
• Split orders
• Fulfillment
• Fulfillment orders
• Shipments
• Shipment tracking
• Delivery status
• Payment intents
• Payment attempts
• Payment confirmation
• Payment failures
• Payment webhooks
• Refunds
• Partial refunds
• Returns
• Return eligibility
• Return approval
• Return processing
• Exchanges
• Marketplace commissions
• Seller balances
• Seller settlements
• Seller payouts
• Payout failures
• Financial reconciliation
• Order timelines
• Financial auditability

The implementation must support:

• Millions of orders
• Multiple sellers per customer order
• Multiple shipments per order
• Multiple fulfillment locations
• Partial cancellation
• Partial refund
• Partial return
• Marketplace commissions
• Seller payouts
• High payment traffic
• High checkout traffic
• Duplicate webhooks
• Provider retries
• Multi-region operation
• Strong financial consistency
• High availability

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

Event Streaming:

• Kafka or Redpanda where justified

Background Processing:

• BullMQ

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Shipping:

• Shipping-provider abstraction

Object Storage:

• AWS S3-compatible object storage where documents are required

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools

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

Keep business rules outside controllers.

Use repositories for persistence.

Use DTOs for APIs.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use idempotency for financial operations.

Never trust payment-provider callbacks without verification.

────────────────────────────────────────

DOMAIN OWNERSHIP

Maintain explicit boundaries between:

Orders

Seller Orders

Fulfillment

Shipments

Payments

Refunds

Returns

Exchanges

Marketplace Commissions

Seller Balances

Seller Payouts

Reconciliation

Audit

Do not combine payment state and order state.

Do not combine shipment state and fulfillment state.

Do not combine seller balance and payout state.

Do not infer financial state solely from external provider state.

────────────────────────────────────────

ORDER DOMAIN

Implement order creation from validated checkout state.

Support:

• Order creation
• Parent order
• Seller sub-orders
• Order items
• Price snapshots
• Tax snapshots
• Shipping snapshots
• Customer address snapshot
• Billing snapshot where required
• Order totals
• Order status
• Order timeline

The order must be immutable with respect to critical historical commercial data.

Do not recalculate historical order totals from current catalog values.

────────────────────────────────────────

ORDER STRUCTURE

Support:

• Parent marketplace order
• Seller order
• Fulfillment order
• Shipment
• Shipment item

Define relationships among:

Customer
→ Parent Order
→ Seller Orders
→ Fulfillment Orders
→ Shipments

Support multiple sellers and multiple shipments.

────────────────────────────────────────

ORDER STATE MACHINE

Implement explicit order states.

Support appropriate states such as:

• Pending
• Awaiting Payment
• Confirmed
• Processing
• Partially Fulfilled
• Fulfilled
• Partially Shipped
• Shipped
• Partially Delivered
• Delivered
• Partially Canceled
• Canceled
• Return Pending
• Partially Returned
• Returned
• Refunded
• Closed

Define all allowed transitions.

Invalid state transitions must be rejected.

State transitions must be idempotent.

────────────────────────────────────────

SELLER ORDER

Implement seller-scoped order representation.

A seller must only access the order items and customer information required for fulfillment.

Support:

• Seller order
• Seller order status
• Seller order totals
• Fulfillment state
• Seller cancellation
• Seller return handling
• Seller financial references

Do not expose unrelated sellers' order data.

────────────────────────────────────────

ORDER ITEM SNAPSHOTS

Persist authoritative historical snapshots for:

• Product
• Variant
• Seller
• Seller offer
• SKU
• Product title
• Unit price
• Discount
• Tax
• Shipping allocation
• Currency

Historical order information must remain stable even when catalog data changes later.

────────────────────────────────────────

ORDER CREATION

Order creation must be idempotent.

Support:

• Checkout reference
• Idempotency key
• Payment reference
• Inventory reservation references

Prevent:

• Duplicate orders
• Duplicate order items
• Duplicate financial records

Use transactional boundaries appropriate to the local database.

Do not attempt distributed transactions across payment providers and inventory systems.

────────────────────────────────────────

ORDER TIMELINE

Implement an auditable order timeline.

Track events such as:

• Created
• Payment Pending
• Paid
• Processing
• Fulfillment Started
• Shipped
• Delivered
• Canceled
• Return Requested
• Return Approved
• Return Received
• Refund Issued
• Closed

Timeline entries must be immutable.

────────────────────────────────────────

FULFILLMENT DOMAIN

Implement:

• Fulfillment order creation
• Fulfillment assignment
• Fulfillment status
• Seller fulfillment
• Warehouse fulfillment
• Partial fulfillment
• Fulfillment cancellation
• Fulfillment completion

Support fulfillment states such as:

• Pending
• Assigned
• Processing
• Ready
• Shipped
• Completed
• Canceled
• Failed

Define ownership of every state transition.

────────────────────────────────────────

FULFILLMENT ALLOCATION

Support:

• Warehouse allocation
• Seller allocation
• Multi-warehouse orders
• Backorders where explicitly supported
• Partial fulfillment

Use the inventory allocation architecture established in the previous backend volume.

Do not reserve inventory again during fulfillment if it has already been reserved and committed correctly.

────────────────────────────────────────

SHIPMENT DOMAIN

Implement:

• Shipment creation
• Shipment items
• Carrier
• Service level
• Tracking number
• Tracking URL where available
• Shipment status
• Shipment events
• Estimated delivery
• Actual delivery

Support multiple shipments for a single seller order.

────────────────────────────────────────

SHIPMENT STATE MACHINE

Support:

• Pending
• Label Created
• Ready for Pickup
• In Transit
• Out for Delivery
• Delivered
• Delayed
• Failed
• Returned
• Lost
• Canceled

Define valid transitions and provider synchronization behavior.

External carriers may report events out of order or more than once.

The integration must be idempotent.

────────────────────────────────────────

SHIPPING PROVIDER ABSTRACTION

Create an abstraction for external shipping providers.

Support operations such as:

• Rate lookup
• Shipment creation
• Label generation
• Tracking
• Cancellation where supported

Provider-specific response formats must not leak into core order logic.

Handle:

• Timeouts
• Retries
• Provider failures
• Duplicate callbacks
• Out-of-order tracking events

────────────────────────────────────────

PAYMENT DOMAIN

Implement production Stripe integration.

Support:

• Payment Intent
• Payment attempt
• Payment confirmation
• Payment failure
• Payment cancellation
• Payment status
• Webhook ingestion
• Webhook verification
• Payment reconciliation

Use idempotency keys for operations where supported.

────────────────────────────────────────

PAYMENT STATE MACHINE

Separate payment state from order state.

Support states such as:

• Created
• Requires Action
• Processing
• Succeeded
• Failed
• Canceled
• Partially Refunded
• Refunded

Define valid transitions.

Never move a payment to a successful state solely because a client reports success.

Use verified payment-provider events where appropriate.

────────────────────────────────────────

STRIPE WEBHOOKS

Implement secure webhook processing.

Support:

• Signature verification
• Event persistence
• Duplicate detection
• Idempotent processing
• Event ordering tolerance
• Retry
• Failure recording

Persist webhook event identifiers so the same provider event cannot be processed twice incorrectly.

Never trust an unsigned webhook request.

────────────────────────────────────────

PAYMENT RECONCILIATION

Implement reconciliation processes that compare:

• Internal payment records
• Stripe payment state
• Order state
• Refund state
• Seller settlement state

Identify:

• Missing payments
• Unknown payments
• State mismatches
• Duplicate events
• Failed reconciliation

Reconciliation must be auditable.

────────────────────────────────────────

REFUNDS

Implement:

• Full refund
• Partial refund
• Refund reason
• Refund state
• Refund amount
• Refund eligibility
• Refund provider reference
• Refund timeline

Support refund causes such as:

• Cancellation
• Return
• Partial compensation
• Payment correction
• Administrative refund

Prevent duplicate refund requests.

────────────────────────────────────────

REFUND STATE MACHINE

Support:

• Requested
• Pending
• Processing
• Succeeded
• Failed
• Canceled

Do not mark an external refund as successful without appropriate provider confirmation.

────────────────────────────────────────

PARTIAL REFUNDS

Support refunds at:

• Order level
• Seller-order level
• Order-item level
• Quantity level

Maintain exact financial allocation.

Refund calculations must account for:

• Item price
• Discounts
• Taxes
• Shipping
• Marketplace commission adjustments where required

Use exact decimal arithmetic.

────────────────────────────────────────

RETURN DOMAIN

Implement:

• Return request
• Return eligibility
• Return items
• Return reason
• Return status
• Return shipping
• Return receipt
• Inspection
• Refund eligibility
• Return rejection

Define return states such as:

• Requested
• Under Review
• Approved
• Rejected
• In Transit
• Received
• Inspected
• Refund Pending
• Completed
• Canceled

────────────────────────────────────────

RETURN ELIGIBILITY

Determine eligibility using:

• Order status
• Delivery date
• Return window
• Product rules
• Seller policy
• Marketplace policy
• Regional requirements
• Item condition

Eligibility must be evaluated server-side.

────────────────────────────────────────

RETURN PROCESSING

Support:

• Return authorization
• Return shipping
• Return tracking
• Warehouse receipt
• Inspection
• Condition result
• Refund authorization
• Exchange authorization

Define recovery for:

• Lost return
• Damaged return
• Invalid item
• Missing item
• Late return

────────────────────────────────────────

EXCHANGES

Implement:

• Exchange request
• Eligibility
• Replacement product
• Replacement inventory
• Approval
• Replacement fulfillment
• Return of original item
• Financial adjustment

Coordinate with:

• Inventory
• Orders
• Fulfillment
• Shipping
• Refunds

Avoid duplicate financial operations.

────────────────────────────────────────

MARKETPLACE COMMISSIONS

Implement marketplace commission calculation.

Support:

• Percentage commission
• Fixed commission
• Category-specific commission
• Seller-specific commission
• Promotional commission rules where appropriate

Commission calculations must be deterministic and auditable.

Persist commission snapshots on financial records.

Do not recalculate historical commission using current rules.

────────────────────────────────────────

SELLER BALANCE

Design seller accounting state.

Support separate amounts for:

• Pending
• Available
• Reserved
• Paid
• Refunded
• Adjusted

Seller balances must be derived from immutable financial transactions or a strongly auditable ledger.

Do not simply update one mutable balance field without transactional accounting records.

────────────────────────────────────────

SELLER SETTLEMENT

Implement settlement workflows.

Support:

• Order settlement
• Commission deduction
• Refund adjustment
• Return adjustment
• Shipping adjustment where applicable
• Tax-related adjustment where applicable

Define when seller revenue becomes:

• Pending
• Available
• Eligible for payout

Use settlement rules that can accommodate configurable hold periods.

────────────────────────────────────────

SELLER PAYOUTS

Implement:

• Payout creation
• Payout status
• Payout provider reference
• Payout completion
• Payout failure
• Payout cancellation where supported

Support:

• Stripe Connect or approved marketplace payout integration
• Idempotency
• Reconciliation
• Retry
• Failure handling

Never pay sellers solely because a client requests a payout.

────────────────────────────────────────

PAYOUT STATE MACHINE

Support:

• Pending
• Eligible
• Created
• Processing
• Paid
• Failed
• Reversed where applicable

Separate payout state from seller balance state.

────────────────────────────────────────

FINANCIAL LEDGER

Implement an auditable internal financial ledger appropriate for marketplace operations.

Track immutable financial transactions for:

• Customer payment
• Platform commission
• Seller revenue
• Refund
• Return adjustment
• Payout
• Chargeback where applicable
• Manual adjustment

Define:

• Transaction ID
• Account/reference
• Amount
• Currency
• Direction
• Type
• Related order
• Related seller
• Related payment
• Timestamp

Do not allow silent balance changes without ledger entries.

────────────────────────────────────────

MONETARY PRECISION

Use exact decimal types.

Define:

• Currency
• Minor units or decimal precision
• Rounding rules
• Tax rounding
• Commission rounding
• Refund rounding

Never use JavaScript floating-point arithmetic as the authoritative financial calculation mechanism.

────────────────────────────────────────

FINANCIAL IDEMPOTENCY

Use idempotency for:

• Order creation
• Payment creation
• Payment confirmation
• Refund creation
• Payout creation
• Webhook handling
• Settlement processing

Retries must never create duplicate monetary effects.

────────────────────────────────────────

ORDER/PAYMENT CONSISTENCY

Define behavior for:

Payment succeeds but order creation fails.

Payment fails but order exists.

Order exists but payment webhook is delayed.

Webhook is delivered multiple times.

Inventory reservation expires during payment.

Payment succeeds after checkout expiration.

Refund provider event arrives before internal refund record is updated.

Resolve these scenarios deterministically.

────────────────────────────────────────

ORDER CANCELLATION

Support:

• Customer cancellation
• Seller cancellation
• Administrative cancellation
• Partial cancellation

Define effects on:

• Inventory
• Payment
• Refund
• Fulfillment
• Seller settlement
• Notifications

Cancellation operations must be idempotent.

────────────────────────────────────────

PAYMENT FAILURE RECOVERY

Support:

• Retry payment where appropriate
• Customer action required
• Payment expiration
• Inventory release
• Checkout expiration
• Order cancellation

Do not leave inventory permanently reserved after terminal payment failure.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for:

• Order
• OrderItem
• SellerOrder
• FulfillmentOrder
• FulfillmentItem
• Shipment
• ShipmentItem
• ShipmentEvent
• Payment
• PaymentAttempt
• PaymentWebhookEvent
• Refund
• Return
• ReturnItem
• Exchange
• Commission
• SellerBalance
• SellerBalanceEntry
• Settlement
• SellerPayout
• FinancialTransaction
• OrderTimelineEntry

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Check constraints
• Status constraints
• Monetary decimal types
• Immutable financial records where appropriate
• Timestamps

Identify partitioning candidates such as:

• Orders
• Order events
• Payment webhook records
• Financial transactions
• Audit/settlement records

────────────────────────────────────────

DATABASE TRANSACTIONS

Use local database transactions for operations requiring strong consistency.

Examples:

• Order creation from validated checkout
• Order item creation
• Seller-order creation
• Financial ledger writes
• Commission creation
• Refund record creation
• Balance ledger entry

Do not use distributed database transactions across external providers.

Use:

• Idempotency
• Outbox events
• Reconciliation
• Compensating workflows

────────────────────────────────────────

EVENTS

Publish appropriate events.

ORDERS

• OrderCreated
• OrderConfirmed
• OrderCanceled
• OrderPartiallyCanceled
• SellerOrderCreated
• OrderCompleted

FULFILLMENT

• FulfillmentCreated
• FulfillmentAssigned
• FulfillmentStarted
• FulfillmentCompleted
• FulfillmentFailed

SHIPMENTS

• ShipmentCreated
• ShipmentLabelCreated
• ShipmentShipped
• ShipmentInTransit
• ShipmentOutForDelivery
• ShipmentDelivered
• ShipmentDelayed
• ShipmentFailed
• ShipmentReturned

PAYMENTS

• PaymentCreated
• PaymentRequiresAction
• PaymentProcessing
• PaymentSucceeded
• PaymentFailed
• PaymentCanceled

REFUNDS

• RefundRequested
• RefundProcessing
• RefundSucceeded
• RefundFailed

RETURNS

• ReturnRequested
• ReturnApproved
• ReturnRejected
• ReturnReceived
• ReturnInspected
• ReturnCompleted

EXCHANGES

• ExchangeRequested
• ExchangeApproved
• ExchangeCompleted

SELLER FINANCE

• CommissionCalculated
• SettlementCreated
• SellerBalanceUpdated
• SellerPayoutCreated
• SellerPayoutSucceeded
• SellerPayoutFailed

Events must contain only the information required by consumers.

Use transactional outbox where appropriate.

────────────────────────────────────────

BACKGROUND JOBS

Implement BullMQ jobs for:

• Payment reconciliation
• Webhook retry
• Shipment synchronization
• Tracking synchronization
• Return expiration
• Settlement processing
• Seller payout processing
• Financial reconciliation
• Failed-payout retry
• Stale-order detection
• Order cleanup where appropriate

Every job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter behavior
• Metrics
• Structured logs

────────────────────────────────────────

API

Implement production-ready REST APIs.

ORDERS

• Create/order confirmation where required
• Get order
• List orders
• Get order timeline
• Cancel order
• Seller order access

FULFILLMENT

• Get fulfillment
• Update fulfillment state
• Assign fulfillment
• Complete fulfillment

SHIPMENTS

• Create shipment
• Get shipment
• Tracking
• Update shipment status
• Carrier webhook

PAYMENTS

• Create payment intent
• Get payment
• Confirm payment status
• Payment history
• Webhook endpoint

REFUNDS

• Create refund
• Get refund
• Refund history

RETURNS

• Check eligibility
• Create return
• Get return
• Approve
• Reject
• Record receipt
• Complete return

EXCHANGES

• Create exchange
• Get exchange
• Approve
• Complete

SELLER FINANCE

• Get balance
• Get settlements
• Get payouts
• Create payout request where applicable
• Get payout status

ADMINISTRATION

• Investigate orders
• Investigate payments
• Investigate refunds
• Investigate payouts
• Manual adjustments with elevated permissions

Every endpoint must include:

• Authentication
• Authorization
• Validation
• Seller isolation
• Idempotency where appropriate
• Rate limiting
• OpenAPI documentation
• Consistent errors

────────────────────────────────────────

WEBHOOK SECURITY

All external webhooks must:

• Verify signatures
• Persist event IDs
• Reject duplicate effects
• Handle retries
• Handle unknown event types safely
• Record failures
• Support reconciliation

Never trust webhook payloads before verification.

────────────────────────────────────────

SELLER ISOLATION

Seller financial and order data must be isolated.

A seller may only access:

• Its seller orders
• Its fulfillment
• Its shipments
• Its commissions
• Its balances
• Its payouts
• Its allowed customer information

A seller must never access another seller's financial information.

Platform administrators require explicit permissions.

────────────────────────────────────────

SECURITY

Protect against:

• Payment tampering
• Refund abuse
• Payout abuse
• Order IDOR
• Seller data leakage
• Webhook spoofing
• Duplicate webhook attacks
• Replay attacks
• Privilege escalation
• Manual-adjustment abuse

Sensitive administrative financial actions must be audited.

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Order creation
• Order transitions
• Payment operations
• Webhook processing
• Refunds
• Returns
• Fulfillment
• Shipment updates
• Seller settlement
• Payouts
• Reconciliation

Measure:

• Order creation latency
• Payment success rate
• Payment failure rate
• Webhook processing latency
• Refund latency
• Payout latency
• Shipment synchronization latency
• Reconciliation mismatches

Never log:

• Card numbers
• Payment secrets
• Authentication secrets
• Sensitive financial credentials

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Order state machine
• Seller-order state
• Fulfillment state
• Shipment state
• Payment state
• Refund state
• Return eligibility
• Exchange rules
• Commission calculation
• Seller balance calculations
• Settlement rules
• Payout state machine
• Monetary rounding

INTEGRATION TESTS

Test:

• PostgreSQL
• Prisma
• Kafka
• BullMQ
• Stripe
• Shipping providers

WEBHOOK TESTS

Test:

• Signature validation
• Duplicate event
• Retry
• Out-of-order events
• Unknown events
• Provider failures

FINANCIAL TESTS

Test:

• Payment success
• Payment failure
• Partial refund
• Full refund
• Multiple refunds
• Seller commission
• Payout
• Payout failure
• Reconciliation

CONCURRENCY TESTS

Test:

• Duplicate order request
• Duplicate payment request
• Duplicate refund request
• Concurrent cancellation
• Concurrent return
• Multiple webhook deliveries

SECURITY TESTS

Test:

• Seller isolation
• Financial IDOR
• Payout authorization
• Refund authorization
• Webhook spoofing
• Privilege escalation

PERFORMANCE TESTS

Test:

• Order creation
• Payment processing
• Webhook throughput
• Reconciliation
• Shipment synchronization
• Payout processing

────────────────────────────────────────

DOCUMENTATION

Generate:

• Order architecture
• Order state machine
• Seller-order architecture
• Fulfillment architecture
• Shipment architecture
• Payment architecture
• Refund architecture
• Returns architecture
• Exchanges
• Marketplace commission model
• Seller balance model
• Settlement model
• Payout model
• Financial ledger
• Reconciliation
• Webhook handling
• API contracts
• Event contracts
• Database schema
• Failure handling
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Order modules
• Seller-order modules
• Fulfillment modules
• Shipment modules
• Payment modules
• Refund modules
• Return modules
• Exchange modules
• Commission modules
• Seller balance modules
• Settlement modules
• Payout modules
• Financial ledger
• Reconciliation
• Database objects
• Migrations
• APIs
• Webhooks
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

Order models, order state machine, order snapshots, seller-order structure, and order APIs.

BACKEND MILESTONE 2

Fulfillment orders, fulfillment state, allocation integration, and seller fulfillment.

BACKEND MILESTONE 3

Shipments, shipment tracking, carrier abstraction, and tracking events.

BACKEND MILESTONE 4

Stripe payment intents, payment persistence, payment state machine, and secure webhook processing.

BACKEND MILESTONE 5

Refunds, partial refunds, cancellation flows, and payment recovery.

BACKEND MILESTONE 6

Returns, return eligibility, return processing, and exchanges.

BACKEND MILESTONE 7

Marketplace commissions, seller balances, settlement, and financial ledger.

BACKEND MILESTONE 8

Seller payouts, payout state, provider integration, and reconciliation.

BACKEND MILESTONE 9

Cross-domain events, background jobs, notifications integration, observability, and audit.

BACKEND MILESTONE 10

Financial concurrency tests, integration testing, performance testing, security hardening, reconciliation testing, and production readiness.

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

This volume covers:

• Orders
• Seller orders
• Fulfillment
• Shipments
• Tracking
• Payments
• Stripe webhooks
• Refunds
• Returns
• Exchanges
• Marketplace commissions
• Seller balances
• Settlements
• Seller payouts
• Financial ledger
• Reconciliation

Do not implement complete:

• Reviews
• Recommendations
• Search
• Notifications
• Customer/seller messaging
• Analytics
• CMS
• Administration UI
• Infrastructure
• Frontend
• Mobile

Those belong to later implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat orders and financial systems as mission-critical production infrastructure.

Assume:

• Millions of orders
• High concurrent checkout traffic
• Multiple sellers per order
• Multiple shipments
• Payment-provider retries
• Duplicate webhooks
• Partial refunds
• High seller payout volume
• Financial audits
• Regional operations

Prioritize:

• Financial correctness
• Idempotency
• Auditability
• Exact monetary calculations
• Strong authorization
• Seller isolation
• Transactional integrity
• Reconciliation
• Fault tolerance
• Observability
• Security
• Production readiness
