# AMAZON ECOMMERCE PLATFORM — BACKEND VOLUME 3 IMPLEMENTATION PROMPT

## ROLE

Act as the complete **Backend Engineering Team** responsible for implementing the next production-grade backend capabilities of the Amazon Ecommerce Platform.

Operate as a Principal Backend Architect, Staff Backend Engineers, Database Engineer, Distributed Systems Engineer, Fulfillment Engineer, Search Engineer, Security Engineer, QA Engineer, and DevOps-aware Backend Engineer working as one engineering team.

Do not teach the implementation process. Perform the engineering work directly in the repository.

The objective is to implement the operational commerce capabilities surrounding fulfillment, shipping, returns, reviews, notifications, seller financial settlement, and the search platform while preserving the transactional integrity of the ecommerce system.

---

# PROJECT

Build the backend for a global, multi-seller ecommerce marketplace comparable in breadth and operational complexity to Amazon Marketplace.

The platform supports:

* Millions of customers.
* Thousands of sellers.
* Millions of products and variants.
* High-volume product search.
* Multi-seller orders.
* Seller-specific fulfillment.
* Shipments.
* Returns.
* Refunds.
* Reviews.
* Notifications.
* Seller payouts.
* Disputes.
* Search indexing.
* Administrative operations.
* Background processing.
* High availability.
* Horizontal scaling.
* Auditable financial operations.

The backend must distinguish clearly between customer-facing order state, seller fulfillment state, shipment state, return state, payment state, and seller settlement state.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless the repository already contains a compatible production-grade implementation that should be preserved.

## Backend

* NestJS.
* TypeScript.
* REST APIs.
* Swagger/OpenAPI.
* Webhooks.
* WebSockets or SSE only where operationally justified.

## Database

* PostgreSQL.
* Prisma ORM.

## Cache

* Redis.

## Search

* Elasticsearch or OpenSearch.

## Background Processing

* BullMQ.

## Object Storage

* S3-compatible object storage.
* CloudFront or equivalent CDN.

## Payments

* Stripe or an existing provider abstraction.

## Observability

* OpenTelemetry.
* Prometheus.
* Grafana.
* Loki and/or equivalent centralized logging.
* Tempo and/or equivalent tracing.

---

# SOURCE OF TRUTH

The repository is the source of truth for implementation state.

Before modifying anything:

1. Inspect the repository.
2. Inspect backend modules.
3. Inspect Prisma schema and migrations.
4. Inspect order and payment models.
5. Inspect inventory functionality.
6. Inspect seller authorization.
7. Inspect event and queue infrastructure.
8. Inspect existing search infrastructure.
9. Inspect storage/media infrastructure.
10. Inspect notification infrastructure.
11. Inspect tests.
12. Inspect API documentation.
13. Inspect configuration.
14. Identify reusable abstractions.
15. Identify existing implementations that must be extended rather than duplicated.

Do not assume that any functionality exists simply because it is architecturally required.

Do not regenerate compatible infrastructure unnecessarily.

---

# BACKEND IMPLEMENTATION SCOPE

Implement the marketplace operational layer:

* Fulfillment.
* Shipments.
* Shipment items.
* Shipping lifecycle.
* Seller fulfillment operations.
* Order cancellation integration.
* Returns.
* Return items.
* Refund integration.
* Customer reviews.
* Ratings.
* Review moderation foundations.
* Notifications.
* Notification preferences.
* Search indexing.
* Product search.
* Search filters and facets.
* Search suggestions.
* Seller payouts.
* Seller settlement calculations.
* Dispute foundations.
* Operational background jobs.
* Relevant real-time updates.
* Auditability.
* Operational observability.

Do not implement web or mobile UI.

---

# FULFILLMENT DOMAIN

Implement production-grade seller fulfillment.

The system must support seller-specific fulfillment workflows within multi-seller customer orders.

Fulfillment must distinguish:

* Customer order.
* Seller order grouping.
* Order item.
* Shipment.
* Shipment item.

A seller must only manage fulfillment for items belonging to that seller.

Implement appropriate fulfillment operations for:

* Confirming fulfillment.
* Preparing items.
* Packing.
* Creating shipments.
* Marking shipments as shipped.
* Marking deliveries.
* Cancelling eligible items.
* Handling fulfillment failures.

Do not allow sellers to arbitrarily transition orders into impossible states.

---

# SHIPMENT DOMAIN

Implement shipments as first-class entities.

A shipment must support relationships to:

* Seller.
* Customer order.
* Seller order grouping.
* Shipment items.
* Shipping address snapshot.
* Carrier.
* Tracking number.
* Shipment status.
* Timestamps.
* Delivery metadata.

Persist the appropriate historical snapshots so shipment behavior does not depend on mutable customer or product data.

---

# SHIPMENT STATE MACHINE

Implement explicit shipment lifecycle behavior.

Support states appropriate to the repository's model, including concepts such as:

* Pending.
* Preparing.
* Packed.
* Shipped.
* In transit.
* Out for delivery.
* Delivered.
* Failed.
* Cancelled.
* Returned.

Enforce valid transitions.

Prevent arbitrary direct status mutation.

Shipment status must be changed through authorized business operations.

---

# SHIPPING INFORMATION

Protect customer shipping information.

Customer addresses used by orders and shipments must be stored as appropriate historical snapshots.

Do not rely on a mutable address record to reconstruct the address used for a historical shipment.

Seller access to customer shipping information must be limited to information required for fulfillment.

Do not expose unnecessary customer profile information.

---

# SHIPPING PROVIDER ABSTRACTION

If external shipping providers are supported, implement a provider abstraction.

The abstraction should support capabilities such as:

* Rate retrieval.
* Label creation.
* Shipment creation.
* Tracking lookup.
* Shipment cancellation where supported.
* Delivery updates.
* Provider webhook processing.

Do not hardcode the entire business domain around one shipping provider.

Provider-specific identifiers must be stored separately from internal shipment identifiers.

---

# SHIPPING WEBHOOKS

If carrier webhooks are supported, implement secure webhook handling.

Validate:

* Provider authenticity.
* Signatures where available.
* Event format.
* Event identity.
* Shipment association.

Webhook processing must be idempotent.

Do not assume webhook events arrive in order.

Handle duplicate events safely.

Persist provider event identifiers where necessary.

---

# ORDER CANCELLATION INTEGRATION

Implement cancellation rules compatible with fulfillment and payment state.

A cancellation must consider:

* Order state.
* Order item state.
* Shipment state.
* Payment state.
* Inventory state.
* Seller permissions.
* Customer permissions.

Cancellation may require:

* Inventory release.
* Payment cancellation.
* Refund initiation.
* Seller notification.
* Shipment cancellation.

Do not execute irreversible side effects without validating the complete state transition.

---

# RETURNS

Implement a production-grade return foundation.

Support:

* Return requests.
* Return items.
* Return reasons.
* Return eligibility.
* Return status.
* Seller review.
* Return authorization where required.
* Return shipment information.
* Refund integration.

Return requests must be associated with the correct customer, order, seller, and order items.

Prevent unauthorized return requests for another customer's order.

---

# RETURN STATE MACHINE

Implement explicit return lifecycle behavior.

Support appropriate states such as:

* Requested.
* Approved.
* Rejected.
* Awaiting shipment.
* In transit.
* Received.
* Inspected.
* Refund pending.
* Refunded.
* Cancelled.

Use the repository's exact state naming when already established.

Only authorized actors may perform state transitions.

Prevent invalid transitions.

---

# RETURN ELIGIBILITY

Return eligibility must be evaluated server-side.

Consider:

* Order state.
* Delivery date.
* Product category.
* Seller policy.
* Return window.
* Item state.
* Previous return activity.
* Existing refund.
* Existing return.

Do not trust clients to determine eligibility.

Return rules must be deterministic and auditable.

---

# REFUND INTEGRATION

Integrate returns with the existing payment/refund domain.

Ensure:

* Refund amounts cannot exceed refundable amounts.
* Duplicate refund attempts are idempotent.
* Partial refunds are tracked correctly.
* Return decisions are auditable.
* Payment provider state is reconciled with internal state.

Do not directly manipulate payment-provider state outside the payment abstraction.

---

# REVIEW DOMAIN

Implement customer reviews and ratings.

Support:

* Product reviews.
* Ratings.
* Review title/body where applicable.
* Verified-purchase indicators.
* Review status.
* Review creation.
* Review updates according to policy.
* Review deletion/moderation rules.
* Seller/product relationships.

Only authorized customers may create reviews.

Prevent arbitrary review creation for products the customer did not legitimately purchase when verified-purchase rules are enabled.

---

# REVIEW INTEGRITY

Implement safeguards against review abuse.

Protect against:

* Duplicate reviews where prohibited.
* Unauthorized review ownership.
* Fake verified-purchase flags.
* Seller manipulation.
* Review bombing.
* Excessive automated submissions.

Verified-purchase state must be determined server-side from order history.

Do not accept a client-provided `verifiedPurchase` flag as authoritative.

---

# REVIEW MODERATION

Implement moderation foundations.

Support:

* Pending moderation where required.
* Published reviews.
* Hidden reviews.
* Removed reviews.
* Moderation reason.
* Moderator identity.
* Moderation timestamp.

Moderation operations must be auditable.

Do not allow ordinary customers or sellers to modify moderation state.

---

# RATINGS AGGREGATION

Implement reliable rating aggregation.

Support:

* Average rating.
* Rating distribution.
* Review counts.

Do not calculate expensive aggregations from the entire review table on every product request when a derived aggregate is appropriate.

Ensure aggregate updates remain consistent with review state.

If asynchronous aggregation is used, design for temporary eventual consistency and safe retries.

---

# NOTIFICATION DOMAIN

Implement backend notification infrastructure.

Support notification records and delivery state for relevant channels such as:

* In-app.
* Email.
* Push notification.
* SMS where the architecture supports it.

Notification records should support:

* Recipient.
* Notification type.
* Title/content or template reference.
* Related entity.
* Delivery state.
* Read state where applicable.
* Created timestamp.
* Delivery timestamp.
* Failure metadata.

Do not place provider credentials in notification records.

---

# NOTIFICATION PREFERENCES

Implement customer notification preferences.

Support preferences for relevant categories such as:

* Order updates.
* Payment updates.
* Shipment updates.
* Delivery updates.
* Returns.
* Refunds.
* Promotions.
* Seller communications where applicable.

Critical transactional notifications must remain distinguishable from optional marketing notifications.

Do not allow users to disable legally or operationally required communications if the business rules prohibit doing so.

---

# NOTIFICATION DELIVERY

Notification delivery must be asynchronous.

Use BullMQ or existing queue infrastructure.

Implement:

* Retry behavior.
* Backoff.
* Provider failure handling.
* Idempotency.
* Deduplication where necessary.
* Delivery status.
* Dead-letter/recovery behavior.

Do not block order creation or payment processing on an email or push provider.

---

# REAL-TIME UPDATES

Where the repository supports real-time functionality, implement appropriate real-time backend events for operationally valuable changes such as:

* Order status.
* Shipment status.
* Delivery status.
* Seller fulfillment updates.
* Notifications.

Real-time channels must be:

* Authenticated.
* Authorized.
* Scoped.
* Observable.
* Resistant to abuse.

Handle:

* Reconnection.
* Duplicate events.
* Ordering where required.
* Backpressure.
* Disconnects.

Do not make critical transactional correctness dependent on WebSocket delivery.

---

# SEARCH PLATFORM

Implement production-grade product search infrastructure.

Search must be based on derived product data.

PostgreSQL remains authoritative.

Search indexing must support:

* Product title.
* Description.
* Brand.
* Category.
* Attributes.
* Variant information where useful.
* Seller/offer information where appropriate.
* Price.
* Availability.
* Ratings.
* Searchable metadata.

---

# SEARCH INDEXING

Implement reliable indexing workflows.

Support:

* Product creation indexing.
* Product update indexing.
* Product deletion/deactivation indexing.
* Inventory availability updates where necessary.
* Price updates where necessary.
* Category updates.
* Brand updates.
* Bulk reindexing foundations.

Search updates should normally occur asynchronously.

Do not make PostgreSQL transactions depend synchronously on search availability.

---

# SEARCH CONSISTENCY

Design search for eventual consistency.

If Elasticsearch/OpenSearch is unavailable:

* Preserve authoritative PostgreSQL state.
* Record failed indexing work.
* Retry indexing.
* Make failures observable.
* Support reconciliation/reindexing.

Do not silently lose index updates.

Do not make search index data the authoritative source for checkout pricing or inventory.

---

# SEARCH API

Implement product search APIs supporting appropriate combinations of:

* Query text.
* Categories.
* Brands.
* Attributes.
* Price ranges.
* Availability.
* Ratings.
* Seller.
* Sorting.
* Pagination.

Use efficient pagination.

Avoid unbounded search result sets.

Return only fields required by the search experience.

---

# SEARCH FACETS

Implement search facets where appropriate.

Potential facets include:

* Category.
* Brand.
* Price range.
* Rating.
* Seller.
* Availability.
* Product attributes.

Facet behavior must remain consistent with applied filters.

---

# SEARCH SUGGESTIONS

Implement search suggestion foundations.

Support:

* Prefix suggestions.
* Popular queries where applicable.
* Product suggestions where appropriate.

Protect suggestion endpoints against abuse and expensive unbounded queries.

---

# SEARCH FAILURE RECOVERY

Implement operational mechanisms for:

* Failed indexing.
* Retry.
* Reindexing.
* Index versioning where appropriate.
* Alias switching where appropriate.
* Index rebuilds.
* Search cluster outages.

A search rebuild must not corrupt the transactional catalog.

---

# SELLER PAYOUT DOMAIN

Implement the foundation for seller financial settlement.

Seller settlement must distinguish:

* Gross merchandise sales.
* Discounts.
* Platform fees.
* Shipping charges where applicable.
* Taxes where applicable.
* Refunds.
* Chargebacks.
* Disputes.
* Other marketplace adjustments.
* Net seller amount.
* Payout eligibility.
* Payout status.
* External provider reference.

Financial calculations must be reproducible.

---

# SELLER SETTLEMENT SNAPSHOTS

Do not reconstruct historical seller payouts using current product or fee configuration.

Persist appropriate immutable settlement information.

A payout calculation should be traceable back to:

* Order.
* Order item.
* Seller.
* Payment.
* Refunds.
* Adjustments.
* Fees.

Financial records must be auditable.

---

# SELLER PAYOUT STATE MACHINE

Implement explicit payout lifecycle behavior.

Support appropriate states such as:

* Pending.
* Eligible.
* Processing.
* Paid.
* Failed.
* Reversed.
* On hold.

Payout transitions must be controlled.

Never allow seller-facing APIs to directly mark payouts as paid.

External payment-provider results must be validated and reconciled.

---

# PAYOUT IDEMPOTENCY

Payout creation and provider operations must be idempotent.

Protect against:

* Worker retries.
* Application restarts.
* Provider timeouts.
* Duplicate requests.
* Duplicate webhook events.

A seller must never receive the same payout twice because of retry behavior.

---

# DISPUTES

Implement dispute foundations.

Support disputes associated with:

* Orders.
* Order items.
* Payments.
* Refunds.
* Sellers.
* Customers.

Implement:

* Dispute creation.
* Status.
* Reason.
* Evidence metadata.
* Resolution.
* Resolution timestamp.
* Responsible actor.

Do not expose internal fraud/security information unnecessarily.

---

# ADMINISTRATION

Implement backend foundations needed for administrative operations introduced in this scope.

Administrators must be able to perform authorized operations involving:

* Orders.
* Returns.
* Reviews.
* Sellers.
* Payouts.
* Disputes.
* Search/indexing operations.

Administrative operations must be:

* Authenticated.
* Authorized.
* Audited.
* Rate-limited where appropriate.

Never expose administrative capabilities to ordinary customer or seller roles.

---

# AUDITABILITY

Extend audit logging across:

* Fulfillment state changes.
* Shipment state changes.
* Return decisions.
* Refund-related actions.
* Review moderation.
* Seller payout changes.
* Dispute decisions.
* Administrative actions.

Audit records must contain enough context to reconstruct important operational decisions without storing unnecessary sensitive information.

---

# EVENTS

Implement typed domain events for the new capabilities.

Examples include:

* ShipmentCreated.
* ShipmentShipped.
* ShipmentDelivered.
* ShipmentFailed.
* OrderCancelled.
* ReturnRequested.
* ReturnApproved.
* ReturnReceived.
* RefundCompleted.
* ReviewCreated.
* ReviewPublished.
* ReviewModerated.
* NotificationCreated.
* SearchIndexRequested.
* SearchIndexFailed.
* SellerPayoutEligible.
* SellerPayoutCreated.
* SellerPayoutCompleted.
* DisputeCreated.
* DisputeResolved.

Use versioned contracts.

Consumers must be idempotent.

Do not assume ordered delivery unless explicitly guaranteed.

---

# BACKGROUND JOBS

Implement background processing for appropriate workloads, including:

* Search indexing.
* Search retry.
* Reservation cleanup.
* Notification delivery.
* Review aggregation.
* Return workflows.
* Shipment synchronization.
* Payout processing.
* Reconciliation.
* Cleanup.

Every job must define:

* Purpose.
* Payload.
* Retry behavior.
* Backoff.
* Timeout.
* Concurrency.
* Idempotency.
* Failure handling.
* Observability.

---

# RECONCILIATION

Implement foundations for reconciliation between internal state and external systems.

Relevant reconciliation targets include:

* Payment providers.
* Shipping providers.
* Seller payout providers.
* Search indexes.

Reconciliation must detect:

* Missing events.
* Stale state.
* Duplicate state.
* Failed operations.
* Provider/internal mismatches.

Reconciliation must not silently overwrite authoritative data.

---

# SECURITY

Perform a security review of all implemented domains.

Protect against:

* Cross-seller access.
* Cross-customer access.
* Review manipulation.
* Shipment-data exposure.
* Refund abuse.
* Payout abuse.
* Search injection.
* Unauthorized administrative actions.
* Webhook forgery.
* Replay attacks.
* IDOR.
* Privilege escalation.
* Sensitive-data leakage.

Apply least privilege.

Validate every resource relationship server-side.

---

# PRIVACY

Apply data minimization throughout fulfillment and operations.

Protect:

* Customer names.
* Addresses.
* Contact information.
* Order history.
* Seller financial information.

Do not expose unnecessary personal information through:

* Seller APIs.
* Search APIs.
* Notifications.
* Logs.
* Events.
* Audit records.

---

# OBSERVABILITY

Instrument:

* Fulfillment.
* Shipments.
* Returns.
* Reviews.
* Notifications.
* Search.
* Payouts.
* Disputes.
* Reconciliation.

Track:

* Shipment creation failures.
* Delivery failures.
* Return rates.
* Refund failures.
* Notification failures.
* Search indexing latency.
* Search indexing failures.
* Search latency.
* Payout failures.
* Reconciliation mismatches.
* Queue retries.
* Dead-lettered jobs.

Use structured logs, metrics, traces, and correlation IDs.

Never log sensitive payment credentials or unnecessary personal information.

---

# RELIABILITY

Design for partial failures involving:

* Search cluster.
* Shipping provider.
* Payment provider.
* Payout provider.
* Notification provider.
* Redis.
* Queue workers.
* PostgreSQL.

Use:

* Timeouts.
* Retries.
* Backoff.
* Idempotency.
* Reconciliation.
* Durable state.
* Recovery workflows.

Do not allow external provider outages to corrupt internal transactional state.

---

# TESTING

Implement comprehensive tests.

## Unit Tests

Cover:

* Shipment transitions.
* Return eligibility.
* Return transitions.
* Review validation.
* Rating aggregation.
* Notification preferences.
* Search document construction.
* Payout calculations.
* Payout transitions.
* Dispute rules.

## Integration Tests

Cover:

* Fulfillment persistence.
* Shipment persistence.
* Return/refund integration.
* Review persistence.
* Notification queues.
* Search indexing.
* Payout persistence.
* Event/outbox behavior.

## API Tests

Cover:

* Customer authorization.
* Seller authorization.
* Administrative authorization.
* Shipment APIs.
* Return APIs.
* Review APIs.
* Notification APIs.
* Search APIs.
* Payout APIs.
* Dispute APIs.

## Security Tests

Verify:

* Sellers cannot access other sellers' shipments.
* Sellers cannot access unrelated customer orders.
* Customers cannot access another customer's returns.
* Customers cannot manipulate review ownership.
* Sellers cannot manipulate reviews improperly.
* Non-admins cannot perform administrative operations.
* Payouts cannot be marked as paid by unauthorized clients.

## Concurrency Tests

Test:

* Concurrent return requests.
* Concurrent refund processing.
* Duplicate shipment webhooks.
* Duplicate payout operations.
* Duplicate notification jobs.
* Concurrent review creation.
* Concurrent search indexing.

---

# DATABASE VALIDATION

Validate:

* Prisma schema.
* Migrations.
* Foreign keys.
* Unique constraints.
* Indexes.
* Monetary precision.
* State consistency.
* Referential integrity.
* Historical snapshots.

Do not destructively rewrite existing migrations.

---

# DOCUMENTATION

Update:

* Fulfillment API documentation.
* Shipment API documentation.
* Return API documentation.
* Review API documentation.
* Notification API documentation.
* Search API documentation.
* Payout API documentation.
* Dispute API documentation.
* Webhook contracts.
* Event contracts.
* Queue/job documentation.
* Operational recovery procedures.

Swagger/OpenAPI must reflect actual implementation.

---

# IMPLEMENTATION BOUNDARIES

This volume is backend-only.

Do not implement:

* Web UI.
* Mobile UI.
* React components.
* React Native screens.
* Tailwind components.
* Frontend state management.

Do not create unrelated infrastructure.

Do not replace working architecture unnecessarily.

Do not introduce speculative services without an actual requirement.

---

# ABSOLUTE IMPLEMENTATION RULES

You must not:

* Generate pseudo-code.
* Generate placeholders.
* Leave required TODO/FIXME gaps.
* Fake shipping or payout success.
* Trust client-provided shipment status.
* Trust client-provided payout status.
* Trust client-provided review verification.
* Trust client-provided refund state.
* Ignore authorization.
* Ignore idempotency.
* Ignore concurrency.
* Hardcode provider credentials.
* Leak customer information.
* Use “implement similarly.”
* Use “remaining code omitted.”
* Use “left as an exercise.”
* Use “for brevity.”
* Disable security controls merely to pass tests.

Every required implementation must be complete and integrated.

---

# REPOSITORY COMPATIBILITY

Follow the repository's existing:

* Module structure.
* Naming conventions.
* API patterns.
* Prisma conventions.
* Authentication.
* Authorization.
* Event system.
* Queue system.
* Search abstractions.
* Storage abstractions.
* Testing patterns.
* Error handling.
* Logging.
* Configuration.

Extend existing functionality rather than duplicating it.

Maintain backward compatibility whenever practical.

Update all affected consumers when contracts change.

---

# VALIDATION AND COMPLETION

Before considering this volume complete:

1. Inspect the repository.
2. Implement fulfillment.
3. Implement shipments.
4. Implement returns.
5. Implement reviews.
6. Implement notifications.
7. Implement search.
8. Implement seller payouts.
9. Implement disputes.
10. Validate database schema.
11. Validate migrations.
12. Compile/typecheck.
13. Run linting.
14. Run unit tests.
15. Run integration tests.
16. Run API tests.
17. Run security tests.
18. Run concurrency tests.
19. Validate search indexing and recovery.
20. Validate webhook idempotency.
21. Validate payout idempotency.
22. Validate return/refund integrity.
23. Validate authorization.
24. Validate observability.
25. Verify no secrets were introduced.
26. Verify API documentation.
27. Verify existing functionality remains operational.

Fix implementation-caused failures before reporting completion.

---

# IMPLEMENTATION REPORT

At completion, provide a concise engineering report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file and summarize the change.

## Database Changes

Describe models, relations, constraints, indexes, snapshots, and migrations.

## Fulfillment

Describe seller fulfillment and shipment lifecycle implementation.

## Returns

Describe return eligibility, state transitions, and refund integration.

## Reviews

Describe review creation, verification, moderation, and aggregation.

## Notifications

Describe notification records, preferences, queues, and delivery behavior.

## Search

Describe search documents, indexing, querying, facets, suggestions, and recovery.

## Seller Payouts

Describe settlement calculations, payout states, idempotency, and reconciliation.

## Disputes

Describe dispute lifecycle and authorization.

## Events and Queues

List events, workers, retries, and recovery mechanisms.

## Tests

List tests added.

## Validation Results

Report:

* Typecheck/compile.
* Lint.
* Unit tests.
* Integration tests.
* API tests.
* Security tests.
* Concurrency tests.
* Migration validation.

Clearly identify any unavailable validation and its exact reason.

## Operational Notes

Document external-provider configuration, workers, indexes, queues, and operational requirements.

---

# FINAL DIRECTIVE

Implement this operational backend volume directly in the repository.

Inspect the actual implementation before making changes.

Build real production-grade fulfillment, shipment, return, review, notification, search, payout, and dispute functionality.

Preserve customer and seller isolation.

Preserve financial integrity.

Make external integrations idempotent and recoverable.

Treat PostgreSQL as the authoritative transactional source.

Treat search as derived data.

Use asynchronous processing where appropriate.

Implement reconciliation for external systems.

Make all operationally significant state transitions explicit, authorized, observable, and auditable.

Do not stop at scaffolding.

Do not provide pseudo-code.

Do not leave required functionality incomplete.

Compile, test, validate, integrate, and provide the implementation report.
