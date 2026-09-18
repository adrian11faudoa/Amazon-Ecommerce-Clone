# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 4

# ROLE

You are the Staff Backend Engineering team responsible for implementing the order, payment, fulfillment, shipping, cancellation, return, refund, and post-purchase transaction foundations of a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Backend Engineer
* Database Engineer
* Distributed Systems Engineer
* Security Engineer
* Performance Engineer
* Reliability Engineer
* Observability Engineer
* QA Engineer

This is a bounded backend implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future ecommerce domains merely because they belong to the completed platform.

Do not implement web, mobile, production infrastructure, or unrelated QA-platform work outside the backend testing required by this milestone.

# PROJECT

The project is an original production-grade ecommerce marketplace intended to support:

* millions of customers;
* thousands of sellers;
* large product catalogs;
* seller organizations and seller staff;
* products;
* product variants and SKUs;
* seller offers;
* inventory;
* pricing;
* promotions;
* shopping carts;
* checkout;
* payments;
* orders;
* fulfillment;
* shipping;
* returns;
* refunds;
* reviews;
* notifications;
* administration;
* moderation;
* fraud and abuse prevention;
* analytics;
* high traffic;
* asynchronous processing;
* large media volumes;
* high availability;
* horizontal scalability;
* disaster recovery.

The backend technology direction is:

* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* REST/OpenAPI
* BullMQ
* Elasticsearch or OpenSearch
* S3-compatible object storage
* Stripe or equivalent payment-provider abstraction
* OpenTelemetry-compatible observability

The repository may contain functionality from earlier implementation work. Do not assume a previous prompt was executed. Inspect the repository and integrate with the implementation that actually exists.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine:

* current backend structure;
* identity and authorization;
* seller organizations;
* catalog;
* pricing;
* inventory;
* carts;
* checkout;
* Prisma schema;
* migrations;
* payment abstractions;
* Redis;
* queues;
* events;
* outbox implementation;
* error handling;
* observability;
* existing order, fulfillment, shipping, return, or refund functionality;
* tests;
* API documentation.

The repository is authoritative for actual implementation state.

The current prompt defines the required scope.

If compatible functionality already exists:

* reuse it;
* extend it;
* preserve behavior;
* avoid duplicate implementations;
* reconcile contracts carefully.

Do not fabricate functionality merely because it is described in this prompt.

# CURRENT EXECUTION SCOPE

Implement the post-checkout transaction lifecycle:

* order creation;
* immutable order snapshots;
* order state management;
* order-item ownership;
* seller-specific order views;
* payment-provider integration boundary and implementation;
* payment state lifecycle;
* payment webhooks;
* payment idempotency;
* payment reconciliation;
* order/payment consistency;
* cancellation;
* fulfillment preparation;
* shipment records;
* shipment tracking;
* shipping-provider abstraction;
* return requests;
* return authorization;
* refund initiation;
* refund state management;
* inventory release/consumption integration;
* post-purchase events;
* background jobs;
* auditability;
* tests and validation.

This milestone must establish a reliable transactional boundary between checkout and the post-purchase lifecycle.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* customer web UI;
* mobile UI;
* production Kubernetes;
* production AWS provisioning;
* complete recommendation systems;
* complete review UI;
* complete analytics data warehouse;
* full fraud machine-learning systems;
* complete seller settlement/payout accounting unless already required by the repository's existing financial model;
* unrelated catalog/search functionality.

Seller and platform reporting required solely to expose order/fulfillment information may be implemented where necessary.

# ENGINEERING REQUIREMENTS

Orders, payments, fulfillment, returns, and refunds are correctness-critical systems.

Prioritize:

* transactional consistency;
* idempotency;
* state-machine correctness;
* immutable historical data;
* authorization;
* duplicate-event handling;
* concurrency safety;
* external-provider resilience;
* auditability;
* reconciliation;
* observability;
* secure handling of financial operations.

Do not allow external-provider availability to corrupt authoritative order state.

Do not treat provider callbacks as trusted merely because they reach a known endpoint.

# DOMAIN BOUNDARIES

Maintain explicit ownership between:

* Checkout
* Order
* Payment
* Fulfillment
* Shipment
* Return
* Refund
* Inventory

Checkout establishes purchase intent.

Order establishes the durable commercial transaction.

Payment establishes payment-provider and payment-domain state.

Fulfillment establishes preparation and fulfillment state.

Shipment establishes carrier/shipping state.

Return establishes post-delivery return lifecycle.

Refund establishes money-return lifecycle.

Inventory remains the authoritative source for stock state.

Do not collapse these domains into one giant order service.

# ORDER AGGREGATE

Implement the order aggregate.

An order must have:

* stable order ID;
* customer ID;
* seller relationships;
* durable timestamps;
* immutable commercial snapshot information;
* total amounts;
* currency;
* order lifecycle state;
* payment reference/state;
* fulfillment references;
* shipping references;
* cancellation metadata where applicable;
* audit metadata where appropriate.

Do not make a historical order depend on mutable product or pricing records for correctness.

# ORDER NUMBER

If the product exposes a human-readable order number:

* generate it using a collision-safe strategy;
* do not use it as the database primary key;
* make uniqueness enforceable;
* do not expose predictable internal database IDs as the sole customer-facing identifier when the architecture calls for a separate public order number.

# ORDER SNAPSHOT

When creating an order, persist the information required to reproduce the historical transaction.

At minimum evaluate snapshots for:

* product title;
* SKU;
* variant attributes;
* seller identity;
* unit price;
* quantity;
* discounts;
* taxes;
* shipping cost;
* currency;
* relevant address information;
* applicable order terms.

Subsequent catalog changes must not alter historical order correctness.

# ORDER ITEM MODEL

Each order item must preserve:

* seller ownership;
* product reference;
* SKU;
* quantity;
* unit price;
* discounts;
* tax allocation where applicable;
* currency;
* immutable product information required for historical display.

Do not trust current catalog state to reconstruct historical totals.

# MULTI-SELLER ORDERS

If the marketplace allows one checkout to contain products from multiple sellers:

* define one customer-facing order identity or parent transaction as appropriate;
* maintain seller-level sub-order/fulfillment boundaries;
* clearly separate seller ownership;
* prevent one seller from reading another seller's private fulfillment information.

Seller-level order partitions must remain queryable and authorization-safe.

# ORDER STATE MACHINE

Implement a canonical order lifecycle.

Use the state model established by the project's architecture contracts, which should distinguish at minimum concepts equivalent to:

* pending;
* confirmed;
* processing;
* partially_fulfilled where applicable;
* fulfilled/shipped where applicable;
* delivered;
* cancelled;
* closed.

Do not collapse payment, fulfillment, shipping, return, and order lifecycle into one generic state.

Define:

* valid transitions;
* transition actor;
* triggering command;
* side effects;
* emitted event;
* invalid-transition behavior;
* idempotency.

# PAYMENT STATE MACHINE

Implement a separate payment lifecycle.

Support states appropriate to the provider and business flow, such as:

* pending;
* authorized;
* captured;
* failed;
* cancelled;
* partially_refunded;
* refunded.

Do not assume a payment succeeds merely because checkout creation succeeded.

Do not equate an HTTP 200 response from the provider with final settlement if the provider uses asynchronous confirmation.

# PAYMENT PROVIDER ABSTRACTION

Implement a provider-neutral payment service boundary.

The domain layer must not depend directly on Stripe-specific SDK models.

The abstraction should support the operations required by the project, including as applicable:

* create payment intent;
* retrieve payment intent;
* confirm or authorize;
* capture;
* cancel;
* create refund;
* retrieve payment;
* verify webhook event.

Use provider-specific adapters behind the abstraction.

# PAYMENT INTEGRATION

Implement the configured payment-provider integration where credentials and provider configuration are available.

Use secure environment configuration.

Do not hardcode:

* API keys;
* webhook secrets;
* customer credentials;
* private payment information.

If live provider credentials are unavailable:

* implement the integration code and configuration boundary;
* execute available local/provider-SDK validation;
* use deterministic test fixtures where appropriate;
* do not claim a live provider transaction occurred.

# PAYMENT IDEMPOTENCY

Every financially consequential provider request must use an idempotency strategy.

At minimum evaluate:

* payment-intent creation;
* capture;
* cancellation;
* refund.

Persist enough information to prevent duplicate business operations after retries.

Do not blindly repeat a provider operation following a timeout without a deterministic reconciliation strategy.

# CHECKOUT-TO-ORDER HANDOFF

Consume the authoritative checkout information.

Order creation must:

1. verify checkout ownership;
2. verify checkout state;
3. verify pricing snapshot;
4. verify reserved inventory;
5. establish immutable order snapshots;
6. create order records;
7. establish payment relationship;
8. transition checkout appropriately;
9. finalize inventory consumption according to the defined workflow;
10. create required outbox events.

Do not reconstruct commercial totals from mutable current catalog data.

# ORDER CREATION ATOMICITY

Where order creation requires multiple local database mutations:

* use a database transaction;
* create the order;
* create order items;
* persist required snapshots;
* create payment/order state;
* record outbox events;
* update checkout state;

within a single transaction where appropriate.

Do not hold the transaction open while waiting for an external provider.

# PAYMENT-FIRST VS ORDER-FIRST

Implement the ordering strategy established by the architecture contracts.

Where payment authorization is asynchronous, model the intermediate state explicitly rather than forcing synchronous assumptions.

Do not expose an order as fully confirmed when the underlying payment workflow has not reached the required state.

# PAYMENT WEBHOOKS

Implement secure webhook handling.

Webhook endpoints must:

* verify provider signatures;
* use the raw payload where required for signature validation;
* validate provider event IDs;
* persist or deduplicate events;
* acknowledge valid delivery appropriately;
* process business effects asynchronously when appropriate;
* tolerate duplicates;
* reject invalid signatures;
* prevent replay attacks where applicable.

Never trust an arbitrary client to mark a payment as successful.

# PAYMENT WEBHOOK EVENT STORE

Where useful, persist provider webhook events with:

* provider;
* provider event ID;
* event type;
* received timestamp;
* processing state;
* payload reference or securely stored payload where permitted;
* processed timestamp;
* error state.

Use a unique provider-event identifier to prevent duplicate processing.

# PAYMENT RECONCILIATION

Implement a reconciliation path for cases such as:

* provider success without local success;
* local pending state after provider completion;
* duplicate callbacks;
* delayed provider events;
* provider-side refund state differing from local state.

Reconciliation must be:

* idempotent;
* auditable;
* observable;
* safely retryable.

Do not silently overwrite local financial history.

# PAYMENT SECURITY

Never store unnecessary cardholder data.

Use the payment provider's secure primitives.

Do not log:

* full payment credentials;
* secret keys;
* webhook secrets;
* sensitive authorization material.

Translate provider errors into safe domain/API errors.

# ORDER CANCELLATION

Implement cancellation workflows.

Determine eligibility based on:

* order state;
* payment state;
* fulfillment state;
* shipment state;
* seller/administrator rules.

Cancellation may require:

* inventory release;
* payment cancellation;
* refund creation;
* fulfillment cancellation;
* audit;
* events.

Do not allow customer requests to arbitrarily change finalized order state.

# PARTIAL CANCELLATION

Where multi-item orders permit partial cancellation:

* identify affected order items;
* calculate affected money;
* release applicable inventory;
* update fulfillment state;
* initiate appropriate payment/refund operations;
* preserve auditability.

Do not recalculate unrelated order items.

# FULFILLMENT DOMAIN

Implement fulfillment foundations.

A fulfillment record should identify:

* order or seller sub-order;
* seller;
* fulfillment location where applicable;
* fulfillment state;
* items;
* quantities;
* timestamps.

Define states appropriate to the architecture, such as:

* pending;
* processing;
* packed;
* handed_off;
* completed;
* cancelled;
* failed.

Do not conflate fulfillment state with shipment state.

# FULFILLMENT ITEM MODEL

Track fulfillment quantities independently from order quantities when partial fulfillment is possible.

Support:

* ordered quantity;
* allocated quantity;
* fulfilled quantity;
* cancelled quantity;
* remaining quantity.

Enforce quantity invariants.

# INVENTORY CONSUMPTION

Integrate with the inventory implementation.

When the order reaches the appropriate durable transaction state:

* consume the reservation;
* prevent duplicate consumption;
* maintain inventory auditability;
* emit the inventory-consumption event.

Do not manually decrement inventory in the order module through direct quantity mutation that bypasses the inventory domain.

# SHIPPING DOMAIN

Implement shipment records.

Support:

* shipment ID;
* order/fulfillment relationship;
* carrier;
* service level;
* tracking number;
* shipment state;
* timestamps;
* shipment items or quantities;
* delivery information.

Do not assume every shipment contains an entire order.

# SHIPMENT STATE MACHINE

Define states such as:

* pending;
* label_created;
* picked_up;
* in_transit;
* out_for_delivery;
* delivered;
* failed;
* returned.

Use the canonical state model established by the repository/project contracts.

Do not allow arbitrary client-set state transitions.

# SHIPPING PROVIDER ABSTRACTION

Create a provider-neutral shipping boundary.

Support as applicable:

* rate lookup;
* shipment creation;
* label generation;
* tracking lookup;
* cancellation;
* webhook/status updates.

The domain must not depend directly on a specific carrier SDK.

# SHIPPING PROVIDER FAILURES

Shipping-provider failures must:

* remain observable;
* not corrupt order state;
* be retryable when safe;
* avoid duplicate shipment creation through idempotency;
* expose stable internal error classifications.

# TRACKING

Implement tracking updates through a trusted backend path.

Where carrier webhooks exist:

* validate authenticity;
* deduplicate events;
* process asynchronously;
* tolerate out-of-order updates where the provider permits them;
* maintain a clear shipment timeline.

Never let an unauthenticated client mark an order delivered.

# RETURNS

Implement return requests and lifecycle.

A return request must support, as applicable:

* customer;
* order;
* order items;
* quantities;
* reason;
* requested timestamp;
* eligibility;
* state;
* authorization;
* received state;
* resolution.

# RETURN ELIGIBILITY

Return eligibility must consider:

* order state;
* delivery status;
* return window;
* item-specific restrictions;
* quantity already returned;
* previously refunded amounts.

Do not allow clients to determine eligibility solely through client-side logic.

# RETURN STATE MACHINE

Define states such as:

* requested;
* approved;
* rejected;
* received;
* inspected;
* accepted;
* completed;
* cancelled.

Use explicit transitions.

Do not permit a completed return to be reverted arbitrarily.

# RETURN INVENTORY EFFECT

Where returned products become sellable again:

* coordinate with the inventory domain;
* classify restocked versus damaged inventory;
* create an explicit inventory adjustment;
* maintain auditability.

Do not directly modify inventory quantities from the return module without using the inventory domain contract.

# REFUNDS

Implement the refund domain.

Support:

* refund ID;
* payment reference;
* order reference;
* return reference where applicable;
* amount;
* currency;
* reason;
* state;
* provider reference;
* timestamps.

# REFUND STATE MACHINE

Support states appropriate to the payment provider, including:

* pending;
* processing;
* succeeded;
* failed;
* cancelled.

Prevent:

* duplicate refunds;
* refunding more than the refundable amount;
* refunding unrelated orders;
* refunding already refunded amounts.

# PARTIAL REFUNDS

Support partial refunds safely.

Track cumulative refunded amounts.

Before creating a refund:

* calculate refundable balance;
* prevent over-refunding;
* apply idempotency;
* associate refund with the correct order/payment item.

Never rely solely on the provider to reject over-refunds.

# REFUND PROVIDER INTEGRATION

Use the payment-provider abstraction.

A refund operation must:

* create a provider request;
* use deterministic idempotency;
* persist local state;
* reconcile asynchronous provider results;
* handle duplicate callbacks.

Do not mark a refund successful solely because a local request was accepted.

# ORDER TIMELINE

Create a coherent internal order timeline/audit representation.

Track significant transitions such as:

* order created;
* payment authorized;
* payment captured;
* cancellation;
* fulfillment started;
* shipment created;
* shipment delivered;
* return requested;
* refund completed.

Do not duplicate sensitive payment data in timeline records.

# FINANCIAL CONSISTENCY

Order/payment/refund calculations must use exact monetary arithmetic.

Track:

* subtotal;
* discounts;
* taxes;
* shipping;
* grand total;
* captured amount;
* refunded amount;
* refundable amount.

All monetary values must have explicit currency.

# ORDER TOTAL IMMUTABILITY

Once an order is confirmed, historical monetary amounts must not silently change due to later pricing/catalog changes.

Adjustments must occur through explicit refund/credit mechanisms.

Do not mutate historical order totals merely because current pricing differs.

# SELLER ORDER ACCESS

Seller users may only access:

* their own seller order partitions;
* their own fulfillment data;
* their own shipment information;
* permitted customer information required for fulfillment.

Do not expose:

* other sellers' order details;
* unnecessary customer personal information;
* platform-private financial information.

# ADMINISTRATIVE ORDER ACCESS

Administrative/support roles require explicit permissions.

Sensitive actions such as:

* force cancellation;
* manual refund;
* shipment intervention;
* return override;

must be:

* authorized;
* auditable;
* observable.

# ORDER APIs

Implement APIs for appropriate operations such as:

## Customer

* retrieve order;
* list orders;
* request cancellation;
* request return;
* retrieve shipment/tracking information;
* retrieve refund status.

## Seller

* list seller orders;
* retrieve permitted order details;
* update fulfillment status;
* create shipment;
* retrieve shipment status.

## Administrative

* retrieve authorized order information;
* perform approved operational interventions;
* initiate authorized refunds.

Do not expose administrative capabilities through customer endpoints.

# API PAGINATION

Order, fulfillment, shipment, return, refund, and audit listing APIs must use bounded pagination.

Use cursor pagination for large mutable collections where appropriate.

Never return unbounded historical order data.

# AUTHORIZATION

Enforce:

* customer-to-own-order access;
* seller-to-own-order-partition access;
* staff-to-permitted operational data;
* administrator-to-explicitly-permitted operations.

Protect every identifier-based lookup against IDOR.

# EVENT ARCHITECTURE

Emit events appropriate to post-purchase workflows, including as applicable:

* OrderCreated
* OrderConfirmed
* OrderCancelled
* PaymentAuthorized
* PaymentCaptured
* PaymentFailed
* PaymentRefunded
* FulfillmentCreated
* FulfillmentUpdated
* ShipmentCreated
* ShipmentUpdated
* ShipmentDelivered
* ReturnRequested
* ReturnApproved
* ReturnReceived
* RefundCreated
* RefundSucceeded
* RefundFailed

Use the project's canonical event envelope.

Do not place unnecessary PII or payment secrets in event payloads.

# OUTBOX

Critical order/payment/fulfillment state transitions that produce domain events must use the transactional outbox where appropriate.

Database state and the creation of the corresponding outbox record must be atomic.

External provider calls must not be performed inside the database transaction.

# ASYNCHRONOUS JOBS

Implement required queues/jobs for:

* payment reconciliation;
* webhook processing;
* refund processing;
* shipping-provider synchronization;
* shipment tracking synchronization;
* return workflow processing;
* fulfillment notifications if the notification domain already exists;
* abandoned/failed financial reconciliation.

Each job must define:

* payload;
* retry;
* backoff;
* timeout;
* concurrency;
* idempotency;
* deduplication;
* dead-letter behavior where appropriate;
* observability.

# WEBHOOK PROCESSING

Where payment/shipping providers use webhooks:

* validate signatures;
* deduplicate by provider event ID;
* persist processing state;
* process asynchronous effects;
* return valid acknowledgements promptly;
* retry failures;
* alert on persistent failures.

# EVENT ORDERING

Do not assume external provider callbacks arrive in order.

When processing events:

* validate state transitions;
* reject or defer invalid transitions;
* support replay;
* make processing idempotent.

Do not overwrite a newer state with a stale callback.

# RECONCILIATION

Implement reconciliation paths for:

* order/payment mismatch;
* provider/payment mismatch;
* payment/refund mismatch;
* shipment status mismatch;
* fulfillment mismatch;
* reservation not consumed;
* inventory not reconciled after cancellation.

Reconciliation must produce observable, auditable results.

# REDIS

Use Redis only where justified.

Possible uses include:

* idempotency coordination;
* rate limiting;
* distributed locks;
* short-lived provider state;
* cached shipment/rate data where appropriate.

PostgreSQL remains the authoritative source for orders, payments, refunds, returns, and fulfillment.

# LOCKING

Evaluate distributed locks where operations could otherwise be duplicated across workers.

Use locks carefully.

Prefer database uniqueness and idempotency constraints where possible.

Do not use Redis locks as a substitute for transactional correctness.

# DATABASE CONSTRAINTS

Use database constraints for:

* unique order number;
* unique provider payment references where applicable;
* unique provider webhook event IDs;
* unique refund idempotency;
* valid order/payment/return relationships;
* nonnegative monetary amounts;
* quantity invariants where representable.

Application-level validation must complement database constraints.

# DATABASE SCHEMA

Implement schema changes for:

* orders;
* order items;
* payment records;
* payment provider references;
* payment events;
* fulfillment;
* fulfillment items;
* shipments;
* shipment events/tracking;
* returns;
* return items;
* refunds;
* required idempotency/reconciliation records;
* applicable audit records;
* outbox records.

Do not duplicate tables that already exist with different names.

# DATABASE INDEXING

Create indexes for:

* customer orders;
* seller orders;
* order status;
* creation time;
* payment provider reference;
* payment state;
* webhook event ID;
* fulfillment state;
* shipment tracking;
* shipment state;
* return state;
* refund state;
* reconciliation state.

Use composite indexes based on actual query patterns.

# TRANSACTIONS

Use transactions around local state transitions such as:

* order creation;
* order state transitions;
* payment state update after verified webhook;
* refund state update;
* return state transition;
* fulfillment state transition.

Do not hold transactions open across provider network calls.

# ORDER-PAYMENT CONSISTENCY

Define the local state machine so that:

* payment success can confirm an appropriate order state;
* payment failure does not silently produce a paid order;
* duplicate payment callbacks do not create duplicate state changes;
* delayed callbacks are reconciled;
* capture/refund state is auditable.

# CANCELLATION CONSISTENCY

Cancellation must coordinate, as appropriate:

* order state;
* inventory;
* payment;
* fulfillment;
* shipment;
* return eligibility.

Do not perform cancellation as an arbitrary direct status update.

# FULFILLMENT CONSISTENCY

Fulfillment transitions must validate the order state and quantities.

Do not allow:

* fulfillment of cancelled quantities;
* fulfillment above ordered quantity;
* duplicate fulfillment completion.

# RETURN/REFUND CONSISTENCY

A refund must be linked to a legitimate refundable source.

For returns:

* accepted quantity must not exceed shipped/delivered quantity;
* refund amount must not exceed refundable amount;
* duplicate return/refund requests must be handled idempotently.

# SECURITY

Protect against:

* order IDOR;
* seller cross-access;
* refund abuse;
* cancellation abuse;
* forged webhooks;
* replayed webhooks;
* duplicate payment operations;
* duplicate refunds;
* unauthorized administrative overrides;
* tracking manipulation.

Never trust customer-supplied totals.

Never trust client-provided payment state.

Never trust client-provided refund amounts without server-side calculation.

# FINANCIAL AUDITABILITY

Financial operations must be auditable.

At minimum track:

* payment creation;
* authorization;
* capture;
* cancellation;
* refund;
* manual intervention;
* provider reconciliation.

Audit records must identify:

* actor or provider;
* action;
* target;
* timestamp;
* outcome;
* correlation ID.

Do not store secrets in audit records.

# OBSERVABILITY

Instrument:

* order creation;
* payment operations;
* provider calls;
* webhook processing;
* refund operations;
* fulfillment;
* shipment operations;
* return requests;
* reconciliation jobs;
* state-transition failures.

Use distributed tracing across:

* checkout;
* order;
* payment;
* inventory;
* outbox;
* worker.

# METRICS

Track meaningful metrics such as:

* orders created;
* payment success rate;
* payment failure rate;
* webhook processing failures;
* refund success rate;
* order cancellation rate;
* fulfillment latency;
* shipment creation failures;
* return rate;
* reconciliation discrepancies;
* queue backlog;
* duplicate webhook count.

Avoid high-cardinality labels.

# RELIABILITY

The system must tolerate:

* duplicate webhook events;
* out-of-order callbacks;
* provider timeouts;
* provider outages;
* worker restarts;
* duplicate jobs;
* database transient failures;
* delayed reconciliation;
* shipment-provider outages.

Do not create retry storms.

Do not mark uncertain provider outcomes as definitive failures when reconciliation is required.

# EXTERNAL PROVIDER FAILURES

Payment and shipping provider failures must be translated into internal classifications.

For every provider operation:

* define timeout;
* define retryability;
* define idempotency;
* define fallback;
* define reconciliation.

Do not expose raw provider error details to customers.

# CUSTOMER PII

Orders and shipments contain sensitive customer data.

Only expose the minimum data required to each actor.

Seller users should receive only the customer information needed to fulfill the order.

Do not place full addresses or sensitive customer information in broad event payloads when an opaque reference is sufficient.

# ADDRESS SNAPSHOTS

Where order delivery addresses are stored:

* preserve the historical address snapshot necessary for fulfillment;
* do not rely solely on a mutable customer address record;
* protect access;
* avoid exposing it to unauthorized actors.

# PAYMENT DATA PRIVACY

Store only provider references and necessary financial metadata.

Do not store:

* raw card numbers;
* CVV;
* private provider credentials.

# DOCUMENTATION

Update documentation covering:

* order lifecycle;
* payment lifecycle;
* webhook handling;
* fulfillment;
* shipment;
* return;
* refund;
* reconciliation;
* state transitions;
* APIs;
* queue jobs;
* provider configuration;
* failure handling;
* operational recovery.

Documentation must describe actual implementation.

# TESTING

Create meaningful tests.

## Orders

Test:

* order creation from valid checkout;
* invalid checkout state;
* duplicate order creation;
* immutable snapshots;
* multi-seller partitioning;
* order cancellation;
* partial cancellation.

## Payments

Test:

* payment intent creation;
* provider errors;
* idempotent requests;
* verified webhook;
* invalid webhook signature;
* duplicate webhook;
* out-of-order webhook;
* payment failure;
* capture;
* cancellation;
* refund;
* over-refund prevention;
* provider timeout/reconciliation.

## Fulfillment

Test:

* fulfillment creation;
* quantity invariants;
* invalid state transitions;
* partial fulfillment;
* cancellation interaction.

## Shipping

Test:

* shipment creation;
* duplicate shipment prevention;
* tracking updates;
* invalid carrier event;
* out-of-order tracking updates.

## Returns

Test:

* eligibility;
* invalid quantity;
* return state transitions;
* duplicate requests;
* cancellation interaction.

## Refunds

Test:

* full refund;
* partial refund;
* duplicate refund;
* over-refund prevention;
* provider failure;
* asynchronous success.

## Authorization

Test:

* customer order isolation;
* seller order isolation;
* admin authorization;
* IDOR attempts.

## Reliability

Test:

* worker retry;
* duplicate jobs;
* reconciliation;
* transaction rollback;
* webhook replay.

Tests must validate actual state transitions and financial invariants.

# MIGRATIONS

Create safe, deterministic migrations.

Preserve compatibility with existing checkout/inventory structures.

If existing data must be transformed:

* provide explicit migration;
* preserve historical information;
* validate assumptions;
* document irreversible steps.

# PERFORMANCE

Order and payment APIs must use bounded queries.

Avoid:

* loading complete order history unnecessarily;
* N+1 order item access;
* unbounded tracking events;
* unbounded reconciliation queries.

Use:

* targeted projections;
* indexes;
* pagination;
* batching;
* asynchronous processing.

# NO FAKE COMPLETENESS

Do not implement:

* fake payment success;
* fake provider webhooks;
* fake shipping completion;
* fake refunds;
* fake persistence;
* placeholder financial logic;
* pseudo-code;
* TODO implementation gaps;
* omitted state transitions.

Complete the real scope.

# NO HARDCODED SECRETS

Never hardcode:

* Stripe credentials;
* webhook secrets;
* shipping-provider credentials;
* database credentials;
* Redis credentials;
* signing keys.

Use secure configuration.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit tests;
* integration tests;
* migration validation;
* build;
* OpenAPI validation;
* provider-signature test suites;
* state-machine tests.

Where live external-provider validation is unavailable:

* execute local/provider-SDK-compatible tests;
* validate webhook signatures with controlled test fixtures;
* report all external limitations accurately.

Do not claim a real payment or shipment occurred without evidence.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* order modules;
* payment modules;
* payment-provider integration;
* webhook handling;
* fulfillment changes;
* shipping changes;
* return changes;
* refund changes;
* database schema changes;
* migrations;
* API endpoints;
* events;
* outbox changes;
* queue/jobs;
* Redis changes;
* authorization changes;
* audit changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* reconciliation behavior;
* compatibility considerations;
* unresolved issues;
* external configuration requirements.

Do not claim that external production payments, shipping, or refunds were executed unless verified.

# DEFINITION OF DONE

This milestone is complete only when:

* orders are created from valid checkout state;
* order snapshots are immutable and historically sufficient;
* order state transitions are enforced;
* payment state is modeled separately;
* the payment provider is integrated through a secure abstraction;
* payment idempotency is implemented;
* webhooks are authenticated and deduplicated;
* payment reconciliation is implemented;
* cancellation is implemented;
* fulfillment state is implemented;
* shipment records and tracking are implemented;
* shipping-provider boundaries are implemented;
* returns are implemented;
* refunds are implemented;
* over-refunding is prevented;
* inventory reservation consumption/release is integrated correctly;
* post-purchase events are implemented;
* required background jobs are implemented;
* authorization is enforced;
* financial operations are auditable;
* observability is present;
* migrations are valid;
* tests cover critical financial and state-transition behavior;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the order, payment, fulfillment, shipping, return, refund, cancellation, reconciliation, and related backend scope defined by this prompt.

Do not implement frontend, mobile, production infrastructure, recommendation systems, or unrelated domains.

Preserve compatible existing functionality.

Treat external payment and shipping systems as untrusted dependencies that require authenticated, idempotent, observable integration.

Never trust client-supplied payment state, totals, refund amounts, or fulfillment state.

Do not hardcode secrets.

Do not fabricate provider success or live infrastructure access.

Do not leave intentional placeholders, TODO implementation gaps, fake financial behavior, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and report the actual results.
