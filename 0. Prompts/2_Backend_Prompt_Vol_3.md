# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 3

# ROLE

You are the Staff Backend Engineering team responsible for implementing the inventory, stock reservation, cart, and checkout foundations of a production-grade, globally scalable ecommerce marketplace.

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
* Elasticsearch or OpenSearch for search
* S3-compatible object storage
* Stripe or equivalent payment-provider abstraction
* OpenTelemetry-compatible observability

The repository may contain implementations from earlier project work, but this prompt must be executed from the actual repository state. Do not assume that an earlier AI prompt was completed merely because such a prompt exists.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine:

* current backend structure;
* authentication and authorization;
* seller organizations;
* catalog;
* products;
* variants;
* SKUs;
* seller offers;
* pricing;
* promotions;
* Prisma schema;
* migrations;
* Redis integration;
* queue infrastructure;
* error handling;
* observability;
* existing inventory or cart functionality;
* tests;
* API documentation.

The repository is authoritative for actual implementation state.

The contracts defined by this prompt are authoritative for the current scope.

If the repository already contains compatible functionality:

* reuse it;
* extend it;
* preserve existing behavior;
* avoid duplicate implementations;
* reconcile actual implementation details with the current contracts.

Do not fabricate repository state.

# CURRENT EXECUTION SCOPE

Implement the backend foundations for:

* inventory ownership;
* inventory balances;
* inventory adjustments;
* inventory reservations;
* reservation expiration;
* reservation release;
* inventory consumption;
* inventory reconciliation;
* concurrency-safe inventory operations;
* customer carts;
* anonymous-to-authenticated cart transition where supported;
* cart item validation;
* cart persistence;
* cart expiration/cleanup where applicable;
* checkout preparation;
* checkout validation;
* price and promotion revalidation;
* inventory reservation during checkout;
* checkout idempotency;
* checkout state management;
* checkout failure compensation;
* checkout-to-order preparation contracts;
* inventory/cart/checkout events;
* required queues/jobs;
* tests and validation for this scope.

The checkout workflow established here must prepare the platform for a later order/payment implementation without implementing the complete order or payment domains in this milestone.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* final order lifecycle management;
* payment-provider integration or payment capture;
* refunds;
* shipment creation;
* fulfillment;
* returns;
* customer reviews;
* recommendation systems;
* complete search querying;
* seller settlement;
* web UI;
* mobile UI;
* production Kubernetes;
* production AWS provisioning;
* complete notification delivery;
* complete analytics.

This prompt may create explicit contracts and events required by those future domains, but does not implement them.

# ENGINEERING REQUIREMENTS

Inventory and checkout are correctness-critical systems.

Prioritize:

* transactional consistency;
* concurrency safety;
* idempotency;
* deterministic state transitions;
* race-condition prevention;
* auditability;
* failure recovery;
* observability;
* bounded queries;
* strong authorization.

Do not optimize for throughput by weakening inventory correctness.

Do not rely on client-side state for authoritative inventory or pricing.

# DOMAIN BOUNDARIES

Maintain clear boundaries between:

* Catalog;
* Seller Offer;
* Pricing;
* Inventory;
* Cart;
* Checkout.

Inventory must own inventory quantities and reservation state.

Cart must own customer cart state.

Checkout must own the transient workflow necessary to validate and prepare a purchase.

Catalog and pricing remain authoritative for their respective information.

# INVENTORY OWNERSHIP

Determine the correct inventory ownership model based on the repository's seller-offer structure.

Inventory records must identify the appropriate orderable unit, such as:

* seller;
* seller offer;
* SKU;
* fulfillment location where applicable.

Do not attach inventory to mutable product presentation data.

Inventory ownership must remain compatible with future fulfillment and shipment workflows.

# INVENTORY DATA MODEL

Implement the transactional data required to support:

* inventory item;
* stock quantity;
* reserved quantity;
* available quantity calculation;
* inventory adjustment;
* reservation;
* reservation item;
* reservation expiration;
* consumption;
* release;
* audit metadata.

Do not create duplicate inventory authorities.

If the repository already represents quantities differently, preserve the existing authoritative model and extend it coherently.

# INVENTORY QUANTITY MODEL

Define and enforce clear semantics for quantities.

At minimum distinguish:

* on-hand quantity;
* reserved quantity;
* available quantity.

Where required by the architecture, also support:

* committed quantity;
* damaged/unavailable quantity;
* incoming quantity.

Do not allow application code to interpret these fields inconsistently.

If available quantity is derived rather than stored, define the exact calculation.

# INVENTORY INVARIANTS

Enforce invariants including, as applicable:

* quantities cannot become invalid negative values;
* reserved quantity cannot exceed eligible stock;
* releasing a reservation cannot release more than was reserved;
* consumption cannot consume nonexistent stock;
* inventory operations must be attributable;
* duplicate operations must not corrupt quantities.

Use database constraints and transactions wherever possible.

# INVENTORY ADJUSTMENTS

Implement explicit inventory adjustments.

An adjustment must identify:

* inventory item;
* adjustment quantity;
* adjustment type;
* reason;
* actor;
* timestamp;
* correlation/request ID where available;
* optional reference.

Support adjustment categories appropriate to the current domain, such as:

* initial stock;
* manual correction;
* damaged stock;
* found stock;
* operational reconciliation.

Do not permit unrestricted quantity mutation without an auditable adjustment record.

# INVENTORY RESERVATIONS

Implement a reservation mechanism for checkout.

A reservation must have:

* stable reservation ID;
* customer/session or checkout reference;
* inventory item;
* reserved quantity;
* creation time;
* expiration time;
* state;
* release/consumption metadata.

Supported states should distinguish concepts such as:

* active;
* expired;
* released;
* consumed;
* failed.

Define valid transitions and prevent invalid transitions.

# CONCURRENCY CONTROL

Inventory reservation must be safe under concurrent requests.

Handle cases such as:

* two customers buying the last unit;
* duplicate reservation requests;
* simultaneous checkout attempts;
* repeated retries;
* worker restarts;
* database transient failures;
* cancellation/release racing with reservation expiration.

Use atomic database operations, suitable isolation, row-level locking, optimistic concurrency, or another technically justified strategy.

Do not:

* read stock;
* decide availability in application memory;
* perform a separate unprotected write.

The operation must remain correct under concurrent execution.

# RESERVATION IDEMPOTENCY

A reservation request must be safely repeatable where retry behavior requires it.

Use an idempotency key or stable checkout/reservation reference.

Repeated equivalent requests must not reserve the same quantity multiple times.

Conflicting requests using the same idempotency identity must produce a deterministic error.

# RESERVATION EXPIRATION

Reservations must expire automatically or be detected as expired.

Implement the necessary background job or cleanup mechanism.

Expiration must:

* release reserved quantity exactly once;
* transition reservation state;
* emit the appropriate event;
* be observable;
* tolerate worker retries;
* tolerate worker restarts.

Do not rely solely on an in-memory timer.

# RESERVATION RELEASE

Implement explicit release behavior for cases such as:

* checkout cancellation;
* checkout failure;
* customer abandonment;
* administrative release where authorized;
* expiration.

Release must be idempotent.

A reservation that has already been consumed cannot simply be released as if it were still active.

# RESERVATION CONSUMPTION

Implement the backend contract needed to convert an active reservation into consumed inventory when the future order workflow completes.

This milestone must establish the domain operation and consistency requirements but must not implement the complete order subsystem.

Consumption must:

* be authorized;
* be idempotent;
* prevent double-consumption;
* update reservation state;
* update inventory correctly;
* preserve auditability;
* emit the corresponding event.

# INVENTORY RECONCILIATION

Implement a foundation for inventory reconciliation.

Support the ability to compare authoritative quantity state with adjustment/reservation history.

Where a discrepancy exists:

* identify it;
* do not silently overwrite inventory;
* create an explicit reconciliation operation;
* record the actor/reason;
* provide observability.

Do not implement a full warehouse management system.

# INVENTORY EVENTS

Emit appropriate events including, where applicable:

* InventoryCreated
* InventoryAdjusted
* InventoryReserved
* InventoryReservationReleased
* InventoryReservationExpired
* InventoryReservationConsumed
* InventoryReconciled

Use the project's canonical event envelope.

Events must be safe for at-least-once delivery.

Consumers must be able to tolerate duplicates.

# TRANSACTIONAL OUTBOX

Inventory mutations that require reliable event publication must use the project's outbox strategy where applicable.

For critical operations:

* mutate inventory;
* mutate reservation state;
* create outbox event;

within one database transaction when the event must reflect the committed state.

Do not publish critical inventory events only from application memory after a successful database commit.

# CART DOMAIN

Implement the persistent customer cart domain.

A cart must support:

* stable cart ID;
* customer ownership or anonymous-session ownership;
* state/lifecycle;
* items;
* creation/update timestamps;
* expiration semantics where applicable.

Do not make the cart the authoritative source for:

* inventory;
* current price;
* promotion validity.

Those values must be revalidated at checkout.

# CART OWNERSHIP

Authenticated customers must only access their own carts.

If anonymous carts are supported:

* use an opaque server-generated cart/session identity;
* do not trust arbitrary customer IDs;
* prevent cross-user cart access;
* securely merge anonymous and authenticated carts when appropriate.

# CART ITEM MODEL

Cart items must identify the appropriate orderable item.

At minimum evaluate:

* seller offer;
* SKU/variant;
* requested quantity;
* customer-added timestamp;
* relevant price snapshot/reference;
* optional item metadata.

The cart must not rely on mutable product descriptions as its only item identity.

# CART QUANTITY RULES

Validate:

* quantity > 0;
* maximum quantity;
* seller/item availability references;
* valid item state.

Do not reserve inventory merely because an item was placed in a cart unless the architecture explicitly defines cart reservations.

The current design should distinguish cart ownership from inventory reservation.

# CART MERGE

Where anonymous carts are supported, implement deterministic merge behavior when the user authenticates.

Define:

* duplicate item handling;
* quantity combination;
* maximum quantity enforcement;
* stale/invalid item handling;
* seller ownership preservation;
* conflict resolution.

Do not silently discard customer items.

# CART UPDATE

Implement operations for:

* add item;
* update quantity;
* remove item;
* clear cart where applicable.

Validate seller/item visibility and authorization.

Do not trust a client-provided price.

# CART VALIDATION

Cart reads may return warnings for:

* discontinued items;
* unavailable items;
* stale prices;
* changed promotion eligibility;
* invalid quantities.

Do not mutate cart state merely because a read discovers stale information unless the behavior is explicitly part of the domain contract.

# CART EXPIRATION AND CLEANUP

If the architecture defines cart expiration:

* make expiration deterministic;
* avoid unbounded cart accumulation;
* use background cleanup;
* make cleanup idempotent;
* preserve required analytics/audit information where applicable.

Do not delete active carts unpredictably.

# CHECKOUT DOMAIN

Implement the checkout preparation workflow.

A checkout represents a bounded attempt to transform a cart into an order-ready transaction.

Support:

* checkout creation;
* cart validation;
* current price validation;
* promotion re-evaluation;
* inventory availability;
* shipping-input placeholders/contract where later shipping integration is required;
* tax-input contract where later tax integration is required;
* total calculation foundation;
* inventory reservation;
* checkout state;
* expiration;
* idempotency.

Do not implement payment capture or final order creation in this milestone.

# CHECKOUT STATE MODEL

Define and implement explicit checkout states appropriate to this scope.

A reasonable model may include:

* created;
* validating;
* reserved;
* awaiting_payment;
* failed;
* expired;
* cancelled;
* completed.

The implementation must follow the canonical state machine represented by the repository/project contracts.

Do not allow clients to set arbitrary checkout states.

# CHECKOUT CREATION

When creating a checkout:

1. authenticate the customer;
2. load the authoritative cart;
3. validate cart ownership;
4. validate item state;
5. fetch current product/offer state;
6. fetch current authoritative prices;
7. evaluate applicable promotion definitions;
8. calculate totals;
9. determine required inventory reservations;
10. reserve inventory;
11. persist the checkout state;
12. persist required workflow metadata;
13. publish relevant events.

The implementation may divide these operations across multiple transactions where required.

Do not perform external network operations while holding long database transactions.

# PRICE REVALIDATION

Checkout must never trust prices stored only in the client's cart.

At checkout:

* load authoritative current pricing;
* evaluate active promotions;
* compare against the cart's displayed information;
* produce deterministic pricing results;
* identify price changes;
* prevent finalization using stale data.

The exact user-facing reprice behavior must be represented by the API contract.

# PROMOTION REVALIDATION

Re-evaluate promotion applicability during checkout.

Validate:

* promotion active period;
* seller ownership;
* product/category scope;
* customer eligibility where implemented;
* usage constraints where implemented;
* stacking behavior;
* monetary limits.

Do not rely on a promotion being valid merely because it was previously displayed in the cart.

# CHECKOUT TOTALS

Calculate checkout totals using exact arithmetic.

Support, as applicable:

* item subtotal;
* discounts;
* shipping placeholder;
* taxes placeholder;
* grand total;
* currency.

Do not use floating-point arithmetic.

Define rounding behavior consistently.

# CHECKOUT IDEMPOTENCY

Checkout creation and inventory reservation must be safely retriable.

Use:

* idempotency key;
* checkout token/reference;
* deterministic request identity.

Repeated requests with the same valid idempotency identity must not create multiple reservations or multiple checkouts.

# CHECKOUT EXPIRATION

If checkout reservations expire:

* persist expiration;
* release inventory;
* transition checkout state;
* emit an event;
* clean up associated transient state;
* tolerate repeated processing.

Do not leave inventory permanently reserved because a checkout worker stopped.

# CHECKOUT FAILURE COMPENSATION

If checkout validation or preparation fails after inventory reservation:

* release the reservation;
* transition checkout appropriately;
* emit the correct events;
* preserve an audit trail.

Do not leave partial reserved inventory because a later step failed.

# EXTERNAL PAYMENT BOUNDARY

Establish the interface that later payment implementation will consume.

The checkout domain may define a payment intent request contract containing:

* checkout ID;
* amount;
* currency;
* customer reference;
* idempotency identity;
* metadata.

Do not call or implement the real payment provider in this milestone unless the repository already contains a minimal compatible payment boundary that is explicitly part of the existing implementation.

Do not create fake payment success.

# ORDER HANDOFF CONTRACT

Define the output required for future order creation.

Checkout completion data must be sufficient for a later order domain to establish:

* customer;
* seller/offer;
* product/SKU;
* quantity;
* price;
* discount;
* currency;
* inventory reservation;
* checkout identity.

Do not implement the order aggregate here.

# INVENTORY-CHECKOUT CONSISTENCY

The relationship between checkout and inventory must be explicit.

Document and implement:

* reservation ownership;
* reservation lifetime;
* failure behavior;
* release;
* consumption;
* duplicate handling;
* expiration.

A successful checkout preparation must never imply that inventory has been permanently sold.

# CART-CHECKOUT CONSISTENCY

Checkout must read the current cart state atomically enough to prevent accidental use of inconsistent item sets.

Where needed:

* lock or version the cart;
* record a cart revision;
* detect concurrent updates.

A customer changing the cart during checkout must not silently result in an incorrect checkout.

# CART VERSIONING

Where concurrency requires it, implement cart revision/version semantics.

Use the revision to detect:

* concurrent cart mutation;
* stale checkout attempts;
* duplicate client submissions.

Do not allow an old checkout request to overwrite a newer cart state.

# DATABASE SCHEMA

Implement the database changes required for:

* inventory;
* adjustments;
* reservations;
* carts;
* cart items;
* checkout;
* checkout items;
* applicable idempotency data;
* outbox events;
* required audit references.

Use appropriate:

* primary keys;
* foreign keys;
* uniqueness;
* indexes;
* timestamps;
* state constraints.

Avoid speculative future order tables.

# INVENTORY INDEXING

Create indexes for actual access patterns including:

* seller/offer/SKU lookup;
* reservation state;
* reservation expiration;
* checkout association;
* adjustment history;
* reconciliation;
* inventory updates.

Avoid indiscriminate indexing.

# CART INDEXING

Index:

* customer ownership;
* anonymous cart/session identity where supported;
* cart state;
* cart update time;
* cart-item relationships.

# CHECKOUT INDEXING

Index:

* customer;
* checkout state;
* expiration;
* idempotency key;
* cart association;
* reservation association.

# TRANSACTIONS

Use database transactions around operations such as:

* inventory reservation;
* inventory release;
* inventory consumption;
* cart merge;
* checkout reservation workflow;
* checkout cancellation;
* reservation expiration.

Do not hold transactions open across:

* external payment calls;
* external shipping calls;
* email;
* long-running workers.

# DATABASE CONCURRENCY

Use appropriate locking or concurrency-control mechanisms.

Inventory correctness must survive concurrent transactions.

Evaluate:

* SELECT FOR UPDATE;
* atomic update predicates;
* optimistic versioning;
* transaction isolation.

Choose the minimum complexity that provides correct behavior under the required workload.

# ATOMIC INVENTORY DECREMENT

Where appropriate, implement inventory changes with atomic database conditions.

A reservation operation should fail when the available quantity is insufficient without:

* first updating application state;
* waiting for a later consistency check;
* allowing race conditions.

# REDIS

Use Redis only where it provides a concrete benefit in this scope.

Possible uses include:

* rate limiting;
* ephemeral checkout metadata;
* short-lived cart caching where justified;
* distributed coordination where justified.

PostgreSQL remains the authoritative source of cart, inventory, reservation, and checkout state.

# REDIS FAILURE

Critical correctness must not depend solely on Redis.

If Redis becomes unavailable:

* transactional inventory state must remain correct;
* database-backed workflows must fail predictably;
* temporary caching should degrade safely;
* rate-limit behavior must follow its explicit security policy.

Do not silently treat Redis failure as success.

# QUEUES AND BACKGROUND JOBS

Implement only required jobs such as:

* reservation expiration;
* checkout expiration;
* abandoned-cart cleanup where applicable;
* inventory reconciliation tasks;
* outbox publication.

Each job must define:

* payload;
* idempotency;
* retry;
* backoff;
* concurrency;
* timeout;
* observability;
* failure behavior.

# RESERVATION EXPIRATION WORKER

The expiration worker must:

* find expired active reservations;
* atomically transition them;
* release the reserved quantity;
* emit the expiration event;
* tolerate retries;
* prevent double-release.

Do not process unlimited records in one transaction.

Use bounded batches.

# RECONCILIATION JOBS

Where implemented, reconciliation jobs must:

* process bounded data;
* produce measurable results;
* identify discrepancies;
* avoid silently altering authoritative state;
* create explicit corrective operations.

# EVENT CONTRACTS

Emit appropriate events including:

* CartCreated
* CartUpdated
* CartItemAdded
* CartItemUpdated
* CartItemRemoved
* CheckoutCreated
* CheckoutValidationFailed
* InventoryReservationCreated
* InventoryReservationReleased
* InventoryReservationExpired
* CheckoutReadyForPayment
* CheckoutCancelled
* CheckoutExpired

Use the project's canonical envelope and event versioning.

Do not emit events whose payload contains unnecessary sensitive information.

# OUTBOX REQUIREMENTS

Use the transactional outbox for events whose delivery is required for correctness.

The outbox record must include:

* event ID;
* event type;
* version;
* aggregate type;
* aggregate ID;
* payload;
* timestamp;
* publication state.

Publishing must tolerate duplicates.

# ERROR CONTRACT

Implement stable errors for:

* cart not found;
* cart ownership violation;
* item unavailable;
* stale price;
* invalid promotion;
* insufficient inventory;
* reservation conflict;
* checkout expired;
* checkout already completed;
* duplicate idempotency identity;
* invalid checkout state;
* concurrency conflict.

Do not expose internal database state.

# API CONTRACT

Implement APIs appropriate to this scope.

Customer-facing operations should include, as applicable:

* retrieve cart;
* add cart item;
* update cart item;
* remove cart item;
* clear cart;
* create checkout;
* retrieve checkout;
* cancel checkout.

Inventory administration APIs should be restricted to authorized seller/admin operations and may include:

* retrieve inventory;
* adjust inventory;
* retrieve reservation state;
* release reservation where authorized;
* reconcile inventory.

Do not expose privileged inventory controls through customer endpoints.

# API PAGINATION

Administrative inventory history endpoints must use bounded pagination.

Do not return all adjustments or reservations for a large seller.

Use cursor pagination when appropriate.

# AUTHORIZATION

Customer cart access must be restricted to the owning customer or explicitly authorized support/admin role.

Inventory access must respect seller organization ownership.

Administrative inventory operations require explicit permission.

Checkout access must be restricted to the owning customer and authorized operational roles.

# SECURITY

Protect against:

* cart ID manipulation;
* checkout ID manipulation;
* inventory IDOR;
* seller cross-access;
* quantity abuse;
* reservation amplification;
* checkout replay;
* idempotency-key abuse;
* rate-limit bypass.

Never trust:

* seller ID from a request;
* customer ID from a request;
* price from a client;
* discount from a client;
* inventory availability from a client.

Resolve authoritative values server-side.

# RATE LIMITING

Apply appropriate rate limits to:

* cart mutation;
* checkout creation;
* checkout retries;
* reservation-intensive operations;
* inventory administration.

Use Redis-backed controls where appropriate.

# AUDIT

Audit sensitive operations including:

* inventory manual adjustments;
* reconciliation;
* reservation administrative release;
* checkout cancellation by staff;
* unusual inventory corrections.

Do not audit every ordinary read if it would create unnecessary volume.

# OBSERVABILITY

Instrument:

* cart mutations;
* checkout creation;
* price revalidation;
* inventory reservation;
* reservation release;
* reservation expiration;
* checkout expiration;
* inventory conflicts;
* queue depth;
* queue failures;
* database transaction failures;
* Redis failures.

Trace the checkout correlation across:

* cart;
* pricing;
* inventory;
* outbox;
* background jobs.

# BUSINESS METRICS

Track meaningful metrics such as:

* reservation success rate;
* reservation conflict rate;
* checkout creation latency;
* checkout failure rate;
* cart abandonment where measured;
* reservation expiration rate;
* inventory adjustment volume;
* inventory reconciliation discrepancies;
* queue backlog;
* checkout retry rate.

Avoid high-cardinality metrics.

# RELIABILITY

The system must tolerate:

* duplicate checkout requests;
* duplicate reservation requests;
* worker restarts;
* transaction retries;
* database transient errors;
* Redis failures;
* queue duplication;
* delayed expiration;
* concurrent cart updates.

Do not create hidden data loss paths.

# PERFORMANCE

Optimize for high-concurrency inventory access.

Use:

* targeted queries;
* appropriate indexes;
* atomic updates;
* bounded transactions;
* efficient reservation queries;
* batch cleanup;
* cursor pagination;
* limited cart payload size.

Do not perform unbounded inventory scans during checkout.

# FAILURE ISOLATION

Search, notifications, analytics, and other noncritical derived systems must not block basic cart or inventory correctness unless explicitly required.

Checkout preparation should degrade or fail safely when noncritical dependencies are unavailable.

# DATA RETENTION

Define retention for:

* abandoned carts;
* expired reservations;
* checkout records;
* inventory adjustments;
* reconciliation records;
* audit records.

Do not delete data needed for operational or financial reconciliation without an explicit retention strategy.

# PRIVACY

Cart and checkout data may reveal purchase intent and customer behavior.

Protect:

* customer identity;
* addresses if present;
* product interests;
* order-related information;
* seller information.

Do not expose another customer's cart or checkout data.

Do not log full checkout contents unnecessarily.

# API RESPONSE SAFETY

Never expose internal:

* reservation implementation IDs unless useful to the client;
* database identifiers not intended for public use;
* authorization metadata;
* storage/internal infrastructure fields;
* audit details.

Use explicit DTOs.

# FUTURE PAYMENT COMPATIBILITY

The checkout model must be compatible with later payment implementation.

Expose a stable internal contract for:

* amount;
* currency;
* customer;
* checkout;
* idempotency identity;
* metadata.

Do not make the checkout domain depend on a specific provider's SDK types.

# FUTURE ORDER COMPATIBILITY

The checkout must produce a deterministic representation suitable for later order creation.

Preserve immutable checkout pricing information once a checkout reaches the state required by the later payment/order workflow.

Do not rely on a future order implementation to reconstruct a historical checkout from mutable catalog state.

# FUTURE SHIPPING COMPATIBILITY

Allow later shipping integration to attach:

* shipping method;
* shipping cost;
* destination;
* fulfillment options.

Do not implement carrier-specific behavior here.

# DOCUMENTATION

Update documentation covering:

* inventory lifecycle;
* reservation lifecycle;
* cart lifecycle;
* checkout lifecycle;
* state transitions;
* idempotency;
* concurrency strategy;
* API endpoints;
* background jobs;
* queue behavior;
* failure/retry behavior;
* environment configuration;
* migrations.

Documentation must describe the implementation actually present.

# TESTING

Create meaningful automated tests.

## Inventory

Test:

* inventory creation;
* manual adjustment;
* insufficient inventory;
* concurrent reservations;
* duplicate reservation;
* reservation expiration;
* reservation release;
* reservation consumption;
* invalid transitions;
* reconciliation.

## Cart

Test:

* cart creation;
* ownership;
* add item;
* update quantity;
* remove item;
* clear cart;
* anonymous/authenticated merge where supported;
* invalid item;
* concurrent updates.

## Checkout

Test:

* checkout creation;
* price revalidation;
* promotion revalidation;
* inventory reservation;
* insufficient inventory;
* idempotent retry;
* cart revision conflict;
* expiration;
* cancellation;
* failure compensation;
* state transitions.

## Events

Test:

* outbox creation;
* event schema;
* duplicate publication;
* event correlation;
* reservation events;
* checkout events.

## Authorization

Test:

* customer isolation;
* seller isolation;
* administrative permissions;
* IDOR attempts;
* unauthorized inventory mutation.

## Reliability

Test:

* worker retry;
* duplicate job;
* reservation release after worker restart simulation;
* bounded cleanup;
* database transaction rollback where applicable.

Tests must validate actual correctness rather than merely mocking the core logic.

# DATABASE MIGRATIONS

Create deterministic migrations for this milestone.

Migration design must:

* preserve existing data;
* add appropriate constraints;
* create necessary indexes;
* avoid unrelated destructive changes;
* support deployment ordering.

# MIGRATION SAFETY

If existing repository data requires transformation:

* create explicit data migrations;
* preserve historical information;
* validate before destructive operations;
* document rollback limitations.

# NO FAKE COMPLETENESS

Do not use:

* fake inventory quantities;
* fake reservation success;
* fake checkout completion;
* fake persistence;
* placeholder APIs;
* TODO implementation gaps;
* pseudo-code;
* omitted business logic;
* "implement later."

Complete the actual scope of this prompt.

# NO HARDCODED SECRETS

Never hardcode:

* database credentials;
* Redis credentials;
* JWT secrets;
* payment credentials;
* API keys;
* private keys.

Use secure configuration.

# VALIDATION

Before completion, run applicable:

* formatting;
* linting;
* type checking;
* unit tests;
* integration tests;
* migration validation;
* build;
* schema validation;
* API/OpenAPI validation.

Where concurrency or database behavior can be tested realistically, execute such tests.

If external infrastructure is unavailable:

* run all locally available validation;
* do not claim live infrastructure validation;
* report exactly what remains externally dependent.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* inventory modules;
* inventory schema changes;
* reservation changes;
* cart modules;
* checkout modules;
* database migrations;
* API endpoints;
* Redis changes;
* queue/job changes;
* event/outbox changes;
* authorization changes;
* security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* concurrency considerations;
* compatibility considerations;
* unresolved issues;
* external dependencies.

Do not claim that payment processing, order management, fulfillment, shipping, returns, refunds, or other future domains were implemented unless they were genuinely part of this prompt's scope.

# DEFINITION OF DONE

This milestone is complete only when:

* inventory is persisted authoritatively;
* inventory quantities have explicit invariants;
* reservations are concurrency-safe;
* reservation expiration is implemented;
* reservation release and consumption are implemented;
* inventory adjustments are auditable;
* carts are implemented;
* cart ownership is enforced;
* cart mutation is validated;
* checkout preparation is implemented;
* current pricing and promotions are revalidated;
* inventory is reserved safely during checkout;
* checkout is idempotent;
* checkout expiration and failure compensation are implemented;
* required outbox events are implemented;
* required background jobs are implemented;
* APIs are documented;
* authorization is enforced;
* observability is present;
* migrations are valid;
* critical concurrency paths are tested;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the inventory, cart, checkout, reservation, and related backend scope defined by this prompt.

Do not implement final orders, payment-provider integration, fulfillment, shipping, returns, refunds, reviews, frontend, mobile, or production infrastructure.

Preserve compatible existing functionality.

Treat inventory, cart, pricing, and checkout state as authoritative server-side data.

Prioritize transactional correctness, concurrency safety, idempotency, and failure recovery.

Do not fabricate payment or external service behavior.

Do not hardcode secrets.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and report actual results.
