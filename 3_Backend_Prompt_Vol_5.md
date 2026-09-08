# Amazon Ecommerce Marketplace — Backend Prompt — Volume 5

## Role

You are the senior backend engineering team responsible for implementing the production-grade payment subsystem of an original Amazon-style ecommerce marketplace.

Act as:

* Principal Software Architect
* Staff Backend Engineer
* Payment Systems Engineer
* Distributed Systems Engineer
* Database Architect
* Security Engineer
* QA Engineer
* DevOps Engineer

This is an implementation task, not a tutorial.

You must inspect the actual repository and make real production-quality changes.

---

# 1. Project Context

Build an original, production-grade ecommerce marketplace supporting:

* customers
* products
* variants
* SKUs
* sellers
* seller offers
* pricing
* promotions
* coupons
* inventory
* carts
* checkout
* orders
* payments
* refunds
* fulfillment
* reviews
* search
* notifications
* administration
* analytics

Technology baseline:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* BullMQ
* AWS S3
* AWS CloudFront
* Stripe
* REST
* OpenAPI / Swagger
* Webhooks
* Kafka/Redpanda where justified
* Docker
* Terraform/OpenTofu
* AWS
* Kubernetes where justified

Architectural principles:

* Clean Architecture
* Domain-Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Explicit bounded contexts
* Strong typing
* Transactional consistency
* Idempotency
* Secure provider integration
* Server-side authorization
* Production-grade observability
* Failure recovery

The actual repository is the source of truth.

---

# 2. Repository-First Requirement

Before making changes:

1. Inspect the complete backend repository.
2. Inspect package configuration.
3. Inspect Prisma schema and migrations.
4. Inspect authentication and authorization.
5. Inspect Customer.
6. Inspect Seller.
7. Inspect Product/SKU/Offer.
8. Inspect Pricing.
9. Inspect Inventory.
10. Inspect Cart.
11. Inspect Checkout.
12. Inspect Order.
13. Inspect existing payment-related code.
14. Inspect existing Stripe dependencies/configuration.
15. Inspect webhook infrastructure.
16. Inspect Redis.
17. Inspect outbox/event infrastructure.
18. Inspect BullMQ.
19. Inspect API conventions.
20. Inspect tests and documentation.

Do not assume a payment implementation exists merely because the project requirements mention Stripe.

Reuse compatible code.

Do not create duplicate payment models, services, webhook controllers, configuration systems, or event pipelines.

If the repository differs from this specification, preserve existing working behavior and make the smallest safe change necessary.

---

# 3. Scope of This Volume

Implement the complete production-grade payment subsystem covering:

1. Payment domain
2. Payment records
3. Payment attempts
4. Stripe integration
5. Stripe PaymentIntents
6. Payment authorization
7. Payment confirmation
8. Payment failure handling
9. Stripe webhook ingestion
10. Webhook signature verification
11. Webhook idempotency
12. Payment reconciliation
13. Payment state synchronization
14. Refunds
15. Partial refunds
16. Refund idempotency
17. Payment/order consistency
18. Payment failure recovery
19. Payment background jobs
20. Payment events
21. Payment audit
22. Security
23. Observability
24. Testing
25. Operational documentation

Do not implement the complete fulfillment, shipping, returns, reviews, notifications, or analytics systems.

---

# 4. Payment Domain

Create or extend an explicit Payments bounded context.

The payment domain must distinguish:

* internal payment state
* provider state
* payment attempt state
* refund state
* order state

Do not collapse all payment behavior into a single boolean such as:

`isPaid`

The system must preserve sufficient history to investigate payment problems.

---

# 5. Payment Aggregate

Implement or extend a Payment model representing the payment associated with an order.

It should contain appropriate fields such as:

* payment ID
* order ID
* customer ID where appropriate
* currency
* amount
* status
* provider
* provider customer reference where appropriate
* provider payment reference
* authorized amount
* captured amount
* refunded amount
* timestamps
* metadata/reference fields
* version/concurrency information where appropriate

Do not expose provider secrets.

---

# 6. Payment State Machine

Implement explicit payment states.

Possible states include:

* REQUIRES_PAYMENT
* REQUIRES_ACTION
* PROCESSING
* AUTHORIZED
* CAPTURED
* FAILED
* CANCELLED
* PARTIALLY_REFUNDED
* REFUNDED

Use the repository's conventions if equivalent states already exist.

Do not introduce arbitrary transitions.

Define allowed transitions.

For each transition determine:

* triggering event
* authorized actor
* provider verification requirement
* database transaction
* event emission
* failure behavior

---

# 7. Payment Attempts

Implement immutable payment-attempt records.

A payment may have multiple attempts because:

* card authentication can fail
* payment method can fail
* customer can retry
* provider can return temporary errors
* asynchronous payment states may occur

Each attempt should capture appropriate information such as:

* attempt ID
* payment ID
* provider
* provider attempt/reference ID
* amount
* currency
* status
* failure code
* failure category
* provider response metadata safe for storage
* created timestamp
* completed timestamp

Never overwrite historical attempts to make them appear successful.

---

# 8. Exact Money Handling

Payment amounts must use exact monetary representation.

Never use floating-point arithmetic.

The system must validate:

* currency
* minor-unit amount
* order total
* payment amount
* capture amount
* refund amount

Payment amounts must exactly correspond to authoritative order totals.

Never trust a payment amount supplied by the frontend.

---

# 9. Stripe Integration

Implement Stripe integration using the official Stripe SDK appropriate for the repository's Node.js/TypeScript environment.

Do not invent Stripe API behavior.

Use configuration for:

* secret key
* webhook secret
* API version if explicitly configured
* environment/mode
* connection behavior where supported

Secrets must come from secure configuration/environment mechanisms.

Never commit Stripe credentials.

Never expose the Stripe secret key to:

* browser
* React
* React Native
* logs
* API responses
* client configuration

---

# 10. Stripe Customer Mapping

If the architecture uses Stripe Customer objects, maintain a safe mapping between:

* internal customer
* Stripe customer

Do not use email as the sole durable identity mapping.

Use an explicit provider reference.

Ensure:

* uniqueness
* correct ownership
* safe creation
* retry behavior
* no duplicate customer creation during concurrent requests

---

# 11. PaymentIntent Creation

Implement server-side PaymentIntent creation where required by the checkout/payment flow.

The PaymentIntent amount must come from the authoritative order/checkout total.

The server must verify:

* order ownership
* order state
* payment state
* currency
* amount
* customer
* idempotency

Do not allow clients to specify arbitrary payment amounts.

---

# 12. Stripe Idempotency

Use Stripe idempotency mechanisms where appropriate.

Also maintain application-level idempotency.

These are separate protections.

The application must prevent duplicate internal payments even if:

* client retries
* API request retries
* network timeout occurs after provider success
* server crashes after provider creation
* webhook arrives before the original API response

Do not assume provider idempotency alone solves application-level duplication.

---

# 13. Payment Authorization

Support the appropriate payment authorization lifecycle.

The system must distinguish:

* payment method accepted
* payment requires customer action
* payment authorized
* payment captured
* payment failed

Do not mark an order as successfully paid merely because a PaymentIntent was created.

---

# 14. Payment Confirmation

Payment confirmation must be server-authoritative.

Depending on the selected Stripe integration flow:

* client may initiate customer authentication
* server verifies resulting provider state
* webhook confirms asynchronous state where necessary

Never trust:

* frontend success screens
* client-provided PaymentIntent status
* client-provided charge IDs

as authoritative proof of payment.

---

# 15. Order-Payment Consistency

Maintain clear separation between:

* order status
* payment status
* inventory state

For example:

A payment failure must not create a successful order.

A successful payment must not result in an order with missing order items.

A payment retry must not create a second order.

An order cancellation must not accidentally refund an unrelated payment.

Define these invariants explicitly in the implementation.

---

# 16. Payment Webhooks

Implement a dedicated Stripe webhook endpoint.

The webhook endpoint must:

1. Receive the raw request body.
2. Preserve the exact payload needed for signature verification.
3. Verify the Stripe signature using the configured webhook secret.
4. Reject invalid signatures.
5. Identify the provider event.
6. Persist the webhook event safely.
7. Handle duplicate events idempotently.
8. Process supported event types.
9. Update internal payment state transactionally.
10. Create internal events/outbox records where appropriate.
11. Return the appropriate HTTP response.

Do not parse and mutate the request body before signature verification if that would invalidate verification.

---

# 17. Webhook Event Persistence

Create or extend a durable payment webhook event model.

Persist sufficient metadata such as:

* provider
* provider event ID
* event type
* API version where available
* payload or safe normalized representation
* received timestamp
* processing status
* processed timestamp
* attempt count
* last error
* correlation/reference data

Provider event IDs must be uniquely protected against duplicate processing.

---

# 18. Webhook Idempotency

Webhook processing must be idempotent.

Stripe may deliver the same event more than once.

A duplicate webhook must not:

* create duplicate payments
* create duplicate refunds
* double-count captured amount
* double-count refunded amount
* consume inventory twice
* change an order twice incorrectly
* duplicate business events

Use durable database constraints plus transactional processing.

---

# 19. Supported Stripe Events

Implement only event types actually required by the payment architecture.

Potential events include:

* `payment_intent.created`
* `payment_intent.processing`
* `payment_intent.requires_action`
* `payment_intent.succeeded`
* `payment_intent.payment_failed`
* `payment_intent.canceled`
* `charge.refunded`
* `charge.refund.updated`

Add additional events only when they provide meaningful consistency or reconciliation value.

Do not build a giant generic event switch without domain ownership.

---

# 20. Provider State Reconciliation

Provider state and internal state can temporarily diverge.

Implement a reconciliation mechanism.

The system must be able to detect situations such as:

* internal payment says PROCESSING but Stripe says SUCCEEDED
* internal payment says FAILED but provider later reports success
* webhook was never received
* webhook processing failed
* API request timed out after provider accepted payment
* refund status differs between systems

The reconciliation process must be safe and idempotent.

---

# 21. Payment Reconciliation Jobs

Use BullMQ for appropriate reconciliation jobs.

Jobs may:

* retry failed webhook processing
* reconcile pending PaymentIntents
* reconcile refunds
* detect stale processing payments
* repair safe state mismatches

Every job must define:

* queue
* payload
* retry count
* backoff
* timeout
* concurrency
* idempotency
* logging
* metrics
* failure behavior

Do not build an infinite retry loop.

---

# 22. Payment Failure Handling

Classify failures where useful.

Distinguish:

* customer-action-required
* permanent payment failure
* temporary provider failure
* network failure
* internal processing failure
* fraud/risk rejection
* configuration failure

Do not expose raw Stripe/provider internals unnecessarily to customers.

Return safe, stable application-level error codes.

---

# 23. Retry Behavior

Retry only operations that are safe to retry.

Do not blindly retry:

* payment creation
* capture
* refund

without appropriate idempotency.

Use:

* provider idempotency keys
* application idempotency
* durable operation records
* exponential backoff

where appropriate.

---

# 24. Refund Domain

Implement a Refund model.

A refund should track:

* refund ID
* payment ID
* order ID
* amount
* currency
* status
* provider refund ID
* reason
* requested by
* created timestamp
* completed timestamp
* failure information where appropriate

Possible states:

* PENDING
* PROCESSING
* SUCCEEDED
* FAILED
* CANCELLED

Use the repository's naming conventions if equivalent states exist.

---

# 25. Refund Rules

Enforce:

`total refunded amount <= total captured amount`

Never allow:

* negative refund
* refund above captured amount
* refund in a different currency
* duplicate refund operation
* unauthorized refund

Use transactional locking or equivalent concurrency controls when multiple refund requests can occur simultaneously.

---

# 26. Partial Refunds

Support partial refunds where the marketplace architecture requires them.

A partial refund must preserve:

* original payment amount
* previously refunded amount
* current refund amount
* remaining refundable amount

The system must remain correct under concurrent refund attempts.

---

# 27. Refund Authorization

Define explicit refund permissions.

Potential actors:

* customer
* seller
* platform administrator
* internal order/payment service

Do not allow customers or sellers to arbitrarily refund money merely by knowing an order ID.

Authorization must consider:

* order ownership
* seller ownership
* refund reason
* order/payment state
* maximum refundable amount

---

# 28. Stripe Refund Integration

Implement server-side Stripe refund creation.

Before requesting a refund:

1. Authenticate actor.
2. Authorize refund.
3. Load authoritative payment.
4. Verify refundable amount.
5. Apply idempotency.
6. Persist refund intent safely.
7. Call Stripe outside the database transaction where appropriate.
8. Reconcile provider result.
9. Update internal state.
10. Emit events.

Do not hold a long database transaction open during a network call.

---

# 29. Refund Idempotency

Refund creation must be idempotent.

A retry must not create multiple Stripe refunds for the same logical refund operation.

Use:

* application idempotency
* Stripe idempotency
* durable refund records
* unique provider references

A reused idempotency key with conflicting refund parameters must be rejected.

---

# 30. Refund Reconciliation

Refunds may be asynchronous.

Support reconciliation for:

* pending refunds
* provider timeout
* missing webhook
* duplicate webhook
* provider state mismatch
* failed refund

Do not mark a refund successful solely because a request to Stripe returned without error if the provider state requires later confirmation.

---

# 31. Payment Events

Integrate with the existing event architecture.

Potential events:

* payment.created
* payment.requires_action
* payment.processing
* payment.authorized
* payment.captured
* payment.failed
* payment.cancelled
* refund.created
* refund.processing
* refund.succeeded
* refund.failed

Use existing event conventions if already present.

Events must be emitted only after authoritative state changes are committed.

Use the transactional outbox pattern.

---

# 32. Event Envelope

Payment events must use the project's standard event envelope containing appropriate:

* event ID
* event type
* event version
* aggregate ID
* aggregate type
* producer
* occurred timestamp
* correlation ID
* causation ID
* trace context
* payload

Never publish raw Stripe payloads as internal domain events.

Normalize provider data into domain-level contracts.

---

# 33. Stripe Payload Storage

If raw provider payloads must be stored for reconciliation/audit:

* protect sensitive data
* minimize retained information
* apply retention rules
* prevent accidental logging
* restrict access

Do not store unnecessary payment credentials.

Never store full card numbers or CVV.

Follow Stripe's recommended architecture for sensitive payment data.

---

# 34. Webhook Security

Protect the webhook endpoint against:

* invalid signatures
* replay
* oversized payloads
* malformed events
* duplicate events
* unauthorized access
* denial-of-service abuse

Use:

* signature verification
* body-size limits
* provider event ID uniqueness
* safe parsing
* structured processing
* rate/abuse controls appropriate to the provider endpoint

Do not disable signature verification for development in production configurations.

---

# 35. Customer Payment APIs

Implement appropriate APIs for:

* initiating payment
* retrieving payment status
* confirming supported payment state
* retrying failed payment where appropriate
* listing payment information appropriate to the customer
* requesting refunds where the business rules permit

Never return:

* Stripe secret keys
* full payment credentials
* sensitive provider data
* internal security metadata

---

# 36. Administrative Payment APIs

Provide appropriately protected administrative endpoints for:

* payment inspection
* webhook inspection
* reconciliation
* refund management
* payment retry/recovery where appropriate

Require explicit permissions.

Audit administrative actions.

Do not expose unrestricted provider operations.

---

# 37. Seller Payment Boundaries

For marketplace sellers, seller-facing payment information must be restricted.

Do not expose:

* other seller payment data
* customer payment credentials
* platform secrets
* internal reconciliation details

If seller settlement/payout functionality is not yet implemented, do not invent it here.

Create only the boundaries necessary for future marketplace settlement.

---

# 38. Payment API Errors

Use stable domain error codes.

Potential codes:

* PAYMENT_NOT_FOUND
* PAYMENT_NOT_PAYABLE
* PAYMENT_AMOUNT_MISMATCH
* PAYMENT_CURRENCY_MISMATCH
* PAYMENT_REQUIRES_ACTION
* PAYMENT_PROCESSING
* PAYMENT_FAILED
* PAYMENT_ALREADY_CAPTURED
* PAYMENT_ALREADY_CANCELLED
* REFUND_NOT_FOUND
* REFUND_AMOUNT_INVALID
* REFUND_AMOUNT_EXCEEDED
* REFUND_NOT_ALLOWED
* REFUND_ALREADY_PROCESSED
* WEBHOOK_SIGNATURE_INVALID
* WEBHOOK_ALREADY_PROCESSED

Reuse existing project error codes when available.

Do not expose raw Stripe errors directly.

---

# 39. Database Design

Extend Prisma safely.

Create or update appropriate models for:

* Payment
* PaymentAttempt
* Refund
* PaymentWebhookEvent
* provider/customer mapping where needed
* reconciliation records where justified

Use:

* foreign keys
* unique constraints
* composite indexes
* status indexes
* provider reference uniqueness
* timestamps
* audit relationships

Important uniqueness requirements include:

* provider event ID
* provider payment ID
* provider refund ID
* internal payment/order relationship where applicable
* idempotency operation keys

---

# 40. Payment Transactions

Use database transactions for:

* payment state transitions
* webhook event processing
* refund state transitions
* idempotency records
* payment/order consistency
* outbox insertion

Do not make Stripe network requests while holding long-running database locks.

Use short transactions before and after external provider operations.

---

# 41. Provider Call Pattern

For operations requiring Stripe:

1. Validate request.
2. Load authoritative state.
3. Validate authorization.
4. Establish idempotency.
5. Create/update internal operation record.
6. Commit necessary state.
7. Call Stripe.
8. Persist provider result.
9. Reconcile asynchronously when necessary.
10. Emit domain events after authoritative state is updated.

The exact implementation must prevent crashes between steps from producing duplicate operations or inconsistent state.

---

# 42. Crash Recovery

Explicitly handle:

### Crash before Stripe call

The operation must remain retryable.

### Crash after Stripe accepts request but before response persistence

The system must reconcile provider state instead of blindly creating another operation.

### Crash after provider success but before event publication

The durable internal state/outbox must allow eventual event publication.

### Duplicate webhook

Process safely without duplicating effects.

### Provider unavailable

Fail safely and leave the payment in a recoverable state.

---

# 43. Redis

Redis may be used for:

* rate limiting
* short-lived reconciliation locks
* cached provider metadata
* ephemeral coordination

Do not use Redis as the authoritative payment state.

Do not use Redis-only locks as the sole protection against duplicate financial operations.

Database constraints and provider idempotency remain essential.

---

# 44. Observability

Instrument payment operations.

Metrics should include:

* payment attempts
* payment success rate
* payment failure rate
* requires-action rate
* PaymentIntent processing duration
* webhook latency
* webhook failures
* duplicate webhook count
* reconciliation count
* refund success rate
* refund failure rate
* provider latency
* provider errors
* idempotency conflicts

Trace:

* HTTP
* PostgreSQL
* Stripe calls
* Redis
* BullMQ
* event publication

Never log:

* Stripe secret keys
* card numbers
* CVV
* authentication secrets
* access tokens
* unnecessary payment/customer information

---

# 45. Audit Logging

Audit:

* administrative refunds
* payment state overrides if any are permitted
* manual reconciliation
* administrative payment inspection
* cancellation/refund actions
* sensitive configuration changes

Audit records must be immutable.

---

# 46. Security Threat Model

Explicitly test for:

* payment amount manipulation
* currency manipulation
* order IDOR
* refund IDOR
* seller refund abuse
* customer refund abuse
* webhook forgery
* webhook replay
* duplicate payment
* duplicate refund
* provider reference spoofing
* privilege escalation
* secret leakage
* sensitive payment-data exposure
* rate-limit bypass

Never trust provider IDs submitted by clients without server-side validation.

---

# 47. Testing

Implement comprehensive tests.

## Unit Tests

Cover:

* payment state machine
* refund state machine
* refundable amount calculation
* payment amount validation
* currency validation
* failure classification
* authorization rules
* webhook event mapping

## Integration Tests

Cover:

* payment persistence
* payment attempts
* webhook persistence
* webhook idempotency
* refund persistence
* transactional state changes
* outbox creation
* reconciliation jobs

## API Tests

Cover:

* payment creation
* payment retrieval
* refund authorization
* refund creation
* customer isolation
* seller isolation
* administrative permissions
* validation errors
* idempotency

## Webhook Tests

Test:

* valid signature
* invalid signature
* malformed payload
* duplicate event
* unknown event
* supported event
* provider state transition
* processing failure
* retry behavior

## Security Tests

Explicitly test:

* forged payment amount
* forged currency
* forged provider ID
* unauthorized refund
* cross-customer payment access
* cross-seller payment access
* webhook signature bypass
* replayed webhook
* duplicate refund
* duplicate payment

## Concurrency Tests

Test:

* simultaneous payment creation attempts
* simultaneous refund attempts
* repeated webhook delivery
* reconciliation racing with webhook processing

Verify no duplicate financial operation is produced.

---

# 48. Stripe Test Environment

Use Stripe's supported test environment/test credentials for automated integration tests where configured.

Never place real production credentials in:

* repository
* tests
* fixtures
* source code
* documentation
* logs

If integration tests cannot run because credentials are absent, report that fact accurately rather than claiming provider integration tests passed.

---

# 49. API Documentation

Update OpenAPI/Swagger for:

* payment endpoints
* refund endpoints
* payment statuses
* refund statuses
* idempotency requirements
* authorization
* error codes

Do not expose webhook secrets or sensitive provider configuration.

---

# 50. Migration Safety

Create safe Prisma migrations.

Verify:

* foreign keys
* unique constraints
* provider indexes
* order/payment relationships
* refund/payment relationships
* webhook uniqueness
* migration compatibility with existing data

Do not reset existing databases.

Do not delete existing payment/order information merely to simplify schema changes.

---

# 51. Backward Compatibility

Preserve existing:

* checkout contracts
* order contracts
* inventory contracts
* cart contracts
* authentication
* authorization

If payment integration changes existing behavior:

1. inspect consumers
2. preserve compatibility where possible
3. update affected modules
4. add regression tests
5. document actual changes

Do not silently break checkout/order functionality.

---

# 52. Documentation

Update documentation for:

* payment lifecycle
* Stripe integration
* webhook verification
* idempotency
* payment reconciliation
* refund lifecycle
* failure recovery
* operational troubleshooting
* required environment variables
* local/test setup
* security boundaries

Never document fake Stripe behavior.

---

# 53. Explicitly Defer

Do not implement complete:

* seller payouts
* marketplace settlement
* seller balance accounting
* tax remittance
* shipping
* fulfillment
* returns
* reviews
* notifications
* analytics

unless a minimal compatibility change is required.

Do not invent Stripe Connect behavior or seller payout functionality unless explicitly required by the repository's actual scope.

---

# 54. Implementation Requirements

You must:

1. Inspect the repository first.
2. Reuse compatible payment infrastructure.
3. Implement the complete payment scope.
4. Create/update Prisma migrations.
5. Implement Stripe integration.
6. Implement PaymentIntent lifecycle.
7. Implement webhook verification.
8. Implement webhook idempotency.
9. Implement refunds.
10. Implement refund idempotency.
11. Implement reconciliation.
12. Implement BullMQ jobs.
13. Implement payment events.
14. Implement authorization.
15. Implement audit logging.
16. Implement observability.
17. Implement tests.
18. Update API documentation.
19. Update operational documentation.
20. Run formatting.
21. Run lint.
22. Run type checking.
23. Run tests.
24. Run build validation.
25. Validate migrations.
26. Verify no secrets were introduced.
27. Verify no placeholders remain.

Do not merely describe what should be implemented.

Actually implement it.

---

# 55. Final Validation

Verify:

### Payments

* exact amount handling
* exact currency handling
* correct payment lifecycle
* payment attempts preserved
* duplicate operations prevented

### Stripe

* secure configuration
* PaymentIntent integration
* server-side verification
* provider idempotency
* webhook signature verification
* webhook deduplication

### Refunds

* authorization
* partial refunds
* total refund limits
* provider integration
* refund idempotency
* reconciliation

### Reliability

* crash recovery
* retry safety
* webhook replay safety
* provider outage handling
* outbox reliability
* reconciliation

### Security

* no payment manipulation
* no refund abuse
* no webhook forgery
* no secret leakage
* no customer/seller data isolation bypass

### Testing

* unit tests pass
* integration tests pass
* API tests pass
* webhook tests pass
* security tests pass
* concurrency tests pass

### Code Quality

* lint passes
* typecheck passes
* build passes
* migrations are valid
* no duplicate implementations exist

---

# 56. Final Report

At completion, report only facts about the actual repository.

Include:

1. Payment functionality implemented.
2. Stripe integration implemented.
3. PaymentIntent behavior.
4. Webhook handling.
5. Refund functionality.
6. Reconciliation.
7. Database migrations/models.
8. APIs.
9. Events.
10. BullMQ jobs.
11. Security controls.
12. Tests.
13. Validation commands and actual results.
14. Any genuine remaining limitations or blockers.

Do not claim that real Stripe operations were tested unless they actually were.

Do not claim provider verification succeeded if credentials/environment prevented it.

The repository is the final source of truth.

---

# 57. Non-Negotiable Rules

* No pseudo-code.
* No TODOs.
* No FIXME markers.
* No placeholder implementations.
* No fake Stripe APIs.
* No invented provider behavior.
* No hardcoded secrets.
* No client-trusted payment amounts.
* No client-trusted payment status.
* No client-trusted refund amounts.
* No duplicate financial operations.
* No webhook signature bypass.
* No webhook replay vulnerability.
* No unauthorized refunds.
* No cross-customer payment access.
* No cross-seller payment access.
* No storing card numbers or CVV.
* No Redis-only financial locking.
* No unnecessary regeneration of unchanged files.
* No competing implementations.
* No false completion claims.

Most importantly:

**Inspect the actual repository first, then implement the complete Payments + Stripe + Webhooks + Refunds + Reconciliation backend implementation unit as a production-grade extension of the existing ecommerce marketplace.**
