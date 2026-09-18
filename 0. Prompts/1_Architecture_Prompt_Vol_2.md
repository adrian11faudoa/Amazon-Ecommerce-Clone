# Amazon-Style Ecommerce Marketplace — Architecture Prompt — Volume 2

# ROLE

You are the Principal Software Architect leading the second foundational architecture-definition phase for a production-grade, globally scalable ecommerce marketplace platform.

Operate as a complete senior engineering architecture organization covering:

* Principal Software Architecture
* Staff Backend Architecture
* Staff Frontend Architecture
* Staff Mobile Architecture
* Database Architecture
* Distributed Systems Architecture
* Security Architecture
* Cloud Architecture
* DevOps Architecture
* Reliability Architecture
* Performance Architecture
* QA Architecture
* UI/UX Architecture
* Technical Documentation

This task is an **architecture-detail and implementation-contract task**.

Do NOT implement the complete ecommerce application.

Do NOT turn this task into a backend, frontend, mobile, infrastructure, or QA implementation milestone.

The purpose of this volume is to complete the detailed architectural contracts and operational specifications required for independent implementation agents to build the project consistently without relying on undocumented assumptions.

# PROJECT

The project is an original production-grade ecommerce marketplace platform designed for large-scale commercial operation.

The completed system is intended to support:

* millions of customers;
* thousands of sellers;
* large product catalogs;
* multiple seller organizations;
* product variants and SKUs;
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
* seller administration;
* platform administration;
* moderation;
* fraud and abuse controls;
* analytics;
* large media volumes;
* high concurrent traffic;
* asynchronous processing;
* high availability;
* horizontal scaling;
* disaster recovery.

The target technology direction is:

* Next.js 15
* React 19
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
* React Native
* Expo
* NestJS
* PostgreSQL
* Prisma
* Redis
* Elasticsearch or OpenSearch
* S3-compatible object storage
* Stripe or equivalent payment-provider abstraction
* BullMQ
* Docker
* Kubernetes where justified
* Helm where Kubernetes is used
* Terraform or equivalent infrastructure-as-code
* GitHub Actions or equivalent CI/CD
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

# SOURCE OF TRUTH

If a repository is available:

* inspect it before modifying or creating architecture documentation;
* inspect architecture artifacts already present;
* inspect actual schemas and migrations;
* inspect application configuration;
* inspect implemented module boundaries;
* inspect API documentation;
* inspect event and queue definitions;
* inspect infrastructure definitions;
* inspect tests;
* inspect deployment configuration.

The repository is authoritative for actual implementation state.

The architecture requirements in this prompt define the desired architectural contracts for this volume.

Do not claim that a contract is implemented merely because it is documented.

Do not claim that infrastructure exists merely because infrastructure-as-code is documented.

If an existing repository decision conflicts with the architectural direction:

1. identify the actual state;
2. determine whether compatibility can be preserved;
3. document the discrepancy;
4. define a migration or coexistence strategy where necessary;
5. do not fabricate an implementation that does not exist.

# CURRENT EXECUTION SCOPE

This volume completes the architecture package by defining detailed implementation contracts and operational behavior that must remain consistent across independently generated backend, web, mobile, infrastructure, and QA work.

This volume focuses on:

* canonical domain contracts;
* detailed state machines;
* API contract standards;
* event schemas;
* queue contracts;
* database conventions;
* Redis conventions;
* search document contracts;
* media contracts;
* configuration contracts;
* security policy boundaries;
* authorization matrices;
* observability contracts;
* reliability behavior;
* deployment and environment contracts;
* migration strategy;
* testing contracts;
* integration rules;
* architectural validation.

This is an architecture-contract task.

Do not implement the business functionality represented by these contracts.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

This volume does NOT authorize:

* complete NestJS module implementation;
* complete REST controller implementation;
* complete PostgreSQL migrations;
* complete Prisma implementation;
* complete React web implementation;
* complete React Native implementation;
* production Kubernetes deployment;
* production AWS provisioning;
* complete CI/CD pipeline implementation;
* complete QA automation;
* full payment-provider integration;
* complete search indexing implementation;
* complete media processing implementation.

Those activities belong to later implementation prompts.

This volume may create schemas, contract documents, architecture source files, diagrams, validation definitions, OpenAPI specifications, event specifications, or equivalent architecture artifacts needed to make the implementation deterministic.

# ARCHITECTURAL OBJECTIVE

Complete the architectural contract layer sufficiently that independent implementation agents can determine:

* exact domain terminology;
* entity ownership;
* allowed state transitions;
* API behavior;
* error behavior;
* authentication requirements;
* authorization requirements;
* event behavior;
* queue behavior;
* persistence expectations;
* cache expectations;
* search expectations;
* media expectations;
* configuration requirements;
* observability requirements;
* reliability behavior;
* versioning requirements;
* migration expectations;
* deployment assumptions;
* testing boundaries.

The objective is to minimize architectural ambiguity before implementation begins.

# ARCHITECTURAL CONSISTENCY REQUIREMENT

All artifacts created in this volume must use the same terminology established by the project architecture.

Use consistent names for:

* domains;
* entities;
* aggregate roots;
* identifiers;
* status values;
* API resources;
* events;
* queue jobs;
* Redis namespaces;
* search indexes;
* object-storage namespaces;
* configuration keys;
* roles;
* permissions;
* error codes.

Do not create a second naming system.

Do not introduce synonyms for an existing authoritative concept without explicitly defining the relationship.

# DOMAIN CONTRACT CATALOG

Create a canonical domain-contract catalog.

For every major domain, document:

* domain name;
* purpose;
* authoritative data;
* aggregate roots;
* key entities;
* commands;
* queries;
* state transitions;
* emitted events;
* consumed events;
* queues/jobs;
* external dependencies;
* authorization model;
* consistency model;
* idempotency requirements;
* audit requirements.

At minimum cover:

* Identity and Access
* Customer
* Seller and Seller Organization
* Seller Verification
* Catalog
* Product and Product Variant
* Category
* Pricing
* Promotion
* Inventory
* Cart
* Checkout
* Order
* Payment
* Fulfillment
* Shipping
* Return
* Refund
* Review
* Notification
* Media
* Search
* Administration
* Moderation
* Fraud and Abuse
* Analytics

# ENTITY AND IDENTIFIER CONTRACTS

Create a canonical entity contract document.

For each major entity define:

* canonical name;
* identifier type;
* identifier generation strategy;
* ownership domain;
* public exposure rules;
* internal exposure rules;
* mutability;
* lifecycle;
* soft-delete requirements where applicable;
* audit requirements;
* privacy classification.

Establish rules for:

* customer IDs;
* seller IDs;
* organization IDs;
* product IDs;
* SKU IDs;
* order IDs;
* payment IDs;
* shipment IDs;
* review IDs;
* media IDs;
* event IDs;
* job IDs.

Do not allow clients to construct authoritative business identifiers arbitrarily.

# STATUS AND STATE-MACHINE CONTRACTS

Create explicit state-machine definitions for critical business objects.

At minimum define state models for:

* seller verification;
* product lifecycle;
* inventory reservation;
* cart;
* checkout;
* payment;
* order;
* fulfillment;
* shipment;
* return;
* refund;
* review moderation.

For each state machine define:

* states;
* initial state;
* valid transitions;
* transition trigger;
* actor/system responsible;
* side effects;
* emitted events;
* invalid-transition behavior;
* idempotency requirements;
* terminal states.

Avoid using one generic status enum to represent multiple independent lifecycle dimensions.

# ORDER STATE MODEL

Define independent order lifecycle dimensions where needed.

For example, distinguish between:

* order lifecycle;
* payment lifecycle;
* fulfillment lifecycle;
* shipment lifecycle;
* return lifecycle.

Define the relationships among these state machines.

Explicitly specify:

* cancellation eligibility;
* partial fulfillment;
* partial cancellation;
* partial refund;
* shipment failure;
* payment failure after order creation;
* duplicate callbacks;
* customer-initiated cancellation;
* seller-initiated cancellation;
* administrative intervention.

# INVENTORY CONTRACT

Create a canonical inventory contract.

Define:

* on-hand quantity;
* available quantity;
* reserved quantity;
* committed quantity where needed;
* adjustment records;
* reservation records;
* reservation expiration;
* release;
* fulfillment consumption;
* cancellation restoration;
* return restoration;
* manual adjustments.

Define concurrency expectations for:

* simultaneous checkout;
* simultaneous seller updates;
* duplicate reservation requests;
* retry after timeout;
* worker restart.

Specify which operations must be atomic.

# CART CONTRACT

Define the cart model and its consistency expectations.

Document:

* cart ownership;
* item identity;
* quantity rules;
* price snapshots or references;
* inventory validation;
* seller relationships;
* expiration;
* merge behavior;
* cart persistence;
* anonymous cart behavior where supported;
* authentication transition;
* invalid item handling.

Clarify what the cart can trust and what must always be revalidated during checkout.

# CHECKOUT CONTRACT

Create a detailed checkout contract.

Define the sequence for:

1. loading cart state;
2. validating items;
3. validating prices;
4. validating promotions;
5. calculating shipping;
6. calculating taxes where applicable;
7. reserving inventory;
8. creating payment intent;
9. confirming payment;
10. creating or finalizing the order;
11. publishing domain events;
12. scheduling fulfillment.

Define compensation behavior when a later step fails.

Do not assume all steps are contained in one database transaction.

Define idempotency keys and workflow correlation.

# ORDER CONTRACT

Define the canonical order representation.

Document:

* customer reference;
* seller ownership;
* line-item structure;
* product snapshot behavior;
* monetary values;
* taxes;
* shipping charges;
* discounts;
* totals;
* addresses;
* payment reference;
* fulfillment information;
* timestamps;
* status dimensions;
* audit information.

Define how historical order data remains stable when catalog or pricing data changes later.

Historical orders must not depend on mutable current catalog descriptions for correctness.

# MONEY AND PRICING CONTRACT

Define canonical monetary handling.

Document:

* currency code;
* precision;
* integer-minor-unit representation or equivalent exact representation;
* rounding rules;
* tax calculations;
* discount application order;
* shipping fees;
* seller fees;
* refunds;
* partial refunds;
* currency constraints.

Never use binary floating-point arithmetic for authoritative monetary calculations.

Define how price snapshots are represented.

# PROMOTION CONTRACT

Define the promotion model at an architectural level.

Cover:

* promotion identity;
* eligibility;
* schedule;
* scope;
* product/category restrictions;
* customer restrictions;
* seller restrictions;
* stacking;
* usage limits;
* redemption tracking;
* expiration;
* idempotency;
* abuse prevention.

Define whether promotion evaluation is synchronous during checkout or supported by a separate computation layer.

# SELLER CONTRACT

Define seller and seller-organization boundaries.

Document:

* seller identity;
* organization;
* seller users;
* roles;
* verification state;
* storefront;
* catalog ownership;
* inventory ownership;
* order visibility;
* settlement concepts;
* operational restrictions.

Explicitly define which data a seller can access.

Cross-seller data access must be denied by default.

# CATALOG CONTRACT

Define catalog ownership and lifecycle.

Document:

* product;
* product variant;
* SKU;
* category;
* attributes;
* media;
* publishing state;
* ownership;
* seller association;
* visibility;
* search indexing;
* moderation.

Define how multiple sellers can offer the same logical product concept if the marketplace supports shared catalog concepts.

Do not create ambiguous ownership between marketplace catalog data and seller-specific offer data.

# SEARCH DOCUMENT CONTRACTS

Create explicit search-document schemas for the major searchable resource types.

At minimum define product-search indexing fields for:

* product ID;
* seller visibility where relevant;
* title;
* description;
* category;
* attributes;
* variant information;
* searchable identifiers;
* pricing fields where appropriate;
* availability indicators;
* rating aggregates where appropriate;
* media references where appropriate;
* localization fields where appropriate;
* ranking metadata where appropriate.

Define source-of-truth fields versus derived fields.

Define index versioning and rebuild behavior.

# SEARCH SYNCHRONIZATION CONTRACT

Define how changes reach the search system.

Document:

* triggering database change;
* outbox event;
* queue/job;
* index worker;
* retry;
* dead-letter;
* idempotency;
* delete/unpublish behavior;
* index rebuild;
* alias switch;
* stale-data tolerance.

Search must never become the primary authority for transactional correctness.

# API CONTRACT

Create the canonical API specification.

Define conventions for:

* HTTP methods;
* resource naming;
* route structure;
* API versions;
* content types;
* authentication;
* authorization;
* request IDs;
* correlation IDs;
* pagination;
* filtering;
* sorting;
* search parameters;
* conditional requests where appropriate;
* idempotency;
* asynchronous operations.

# PAGINATION CONTRACT

Define the canonical pagination strategy.

Prefer cursor-based pagination for high-volume mutable datasets where appropriate.

Document:

* cursor encoding;
* cursor stability;
* page size;
* maximum page size;
* sort requirements;
* deleted records;
* newly inserted records;
* invalid cursors;
* expiration or versioning if necessary.

Offset pagination may be used where it remains appropriate, but the architecture must identify where cursor pagination is preferred.

# ERROR CONTRACT

Define one canonical API error representation.

The contract should include appropriate fields such as:

* stable error code;
* human-readable message;
* request/correlation ID;
* validation details where safe;
* retryability;
* field-level errors where applicable.

Do not expose internal exception messages or infrastructure details.

Define mapping from:

* validation errors;
* authentication errors;
* authorization errors;
* not-found conditions;
* conflict conditions;
* rate limits;
* dependency failures;
* internal failures.

# IDEMPOTENCY CONTRACT

Define idempotency requirements for operations including where applicable:

* checkout;
* order creation;
* payment creation;
* payment capture;
* refund;
* inventory reservation;
* cancellation;
* webhook handling;
* queue jobs;
* notification dispatch;
* seller operations with financial consequences.

Define:

* idempotency key source;
* storage;
* TTL;
* request fingerprinting;
* response replay behavior;
* duplicate detection;
* conflict behavior.

# WEBHOOK CONTRACT

Define the canonical webhook architecture.

For payment and other external callbacks, document:

* endpoint authentication;
* signature verification;
* raw-payload handling where required;
* event ID;
* provider event version;
* replay protection;
* persistence;
* asynchronous processing;
* retry behavior;
* duplicate handling;
* acknowledgement strategy.

Webhook handlers should acknowledge valid delivery promptly while moving complex processing to asynchronous workers where appropriate.

# EVENT ENVELOPE CONTRACT

Define the canonical event envelope.

Include, where appropriate:

* event ID;
* event type;
* event version;
* aggregate ID;
* aggregate type;
* producer;
* occurred-at timestamp;
* correlation ID;
* causation ID;
* trace context;
* schema version;
* payload.

Define rules for PII and secret exclusion.

# EVENT VERSIONING

Define compatibility rules for event evolution.

Specify:

* additive changes;
* incompatible changes;
* versioning strategy;
* consumer tolerance;
* deprecation;
* replay implications;
* schema registry or equivalent where used.

Do not silently remove or repurpose existing event fields.

# QUEUE CONTRACT CATALOG

Create a queue/job catalog.

For every job family define:

* queue name;
* job name;
* producer;
* consumer;
* payload;
* priority;
* concurrency;
* timeout;
* retry count;
* backoff;
* idempotency;
* deduplication;
* dead-letter handling;
* observability;
* shutdown behavior.

At minimum assess:

* search indexing;
* media processing;
* email;
* notifications;
* payment reconciliation;
* seller workflows;
* fulfillment workflows;
* cleanup;
* analytics;
* fraud processing.

# REDIS CONTRACT CATALOG

Create the canonical Redis namespace specification.

For each key family define:

* namespace;
* key pattern;
* owner;
* value format;
* TTL;
* invalidation;
* source of truth;
* stale behavior;
* memory expectations;
* failure behavior.

Explicitly identify keys used for:

* rate limits;
* distributed locks;
* idempotency;
* caching;
* sessions;
* queue infrastructure;
* ephemeral workflows.

Do not permit arbitrary shared Redis key creation without ownership.

# STORAGE CONTRACT

Define canonical object-storage conventions.

Document:

* bucket responsibilities;
* prefixes;
* asset ownership;
* naming;
* content metadata;
* checksum;
* encryption;
* lifecycle;
* deletion;
* retention;
* signed access;
* CDN integration;
* upload workflow;
* processing workflow.

Use server-authorized signed uploads rather than exposing long-lived storage credentials to clients.

# MEDIA PROCESSING CONTRACT

Define media jobs such as:

* image validation;
* image normalization;
* thumbnail generation;
* responsive image generation;
* metadata extraction;
* malware scanning;
* cleanup.

Define:

* input;
* output;
* processing state;
* retry;
* failure;
* idempotency;
* observability;
* retention.

# NOTIFICATION CONTRACT

Define a canonical notification domain.

Document:

* notification event;
* recipient;
* channel;
* template;
* localization;
* delivery state;
* retry;
* deduplication;
* preference evaluation;
* quiet hours where applicable;
* provider failure.

Notifications should be modeled separately from the provider implementation.

# CONFIGURATION CONTRACT

Create a configuration specification covering:

* environment variables;
* service configuration;
* secrets;
* external endpoints;
* feature flags;
* limits;
* timeouts;
* retry policies;
* worker concurrency;
* storage configuration;
* search configuration;
* payment configuration;
* observability configuration.

Separate:

* non-sensitive configuration;
* sensitive secrets.

Define naming conventions.

Do not hardcode environment-specific values into business logic.

# SECURITY POLICY CONTRACT

Create an explicit security-policy matrix.

For major operations define:

* actor;
* required authentication;
* required permission;
* ownership check;
* rate limit;
* audit requirement;
* sensitive-data handling.

Cover:

* customer actions;
* seller actions;
* seller administration;
* support operations;
* moderation;
* refunds;
* order intervention;
* financial operations;
* platform administration.

# AUTHORIZATION MATRIX

Create a role/permission matrix covering at minimum:

* customer;
* seller user;
* seller administrator;
* support agent;
* moderator;
* platform administrator.

For each major resource define allowed operations.

Do not rely solely on broad role labels.

Where necessary, combine role checks with:

* resource ownership;
* seller ownership;
* organization membership;
* explicit permission;
* administrative scope.

# AUDIT CONTRACT

Define what must produce an audit record.

At minimum evaluate:

* authentication security events;
* seller verification changes;
* product publication;
* inventory manual adjustments;
* order administrative changes;
* refunds;
* returns;
* permission changes;
* administrative login;
* moderation actions;
* seller suspension;
* account restrictions.

Document:

* actor;
* action;
* target;
* timestamp;
* outcome;
* correlation ID;
* relevant metadata.

Avoid storing unnecessary sensitive content.

# OBSERVABILITY CONTRACT

Define canonical telemetry conventions.

Document:

* log fields;
* log levels;
* trace attributes;
* metric names;
* label/cardinality guidelines;
* correlation IDs;
* request IDs;
* business event identifiers.

Define standard dimensions for:

* service;
* environment;
* region;
* domain;
* operation;
* outcome.

Avoid high-cardinality labels that can destabilize monitoring systems.

# HEALTH AND READINESS CONTRACT

Define:

* liveness behavior;
* readiness behavior;
* dependency checks;
* startup behavior;
* graceful shutdown;
* worker readiness;
* migration safety.

Liveness must not depend unnecessarily on every external dependency.

Readiness may account for dependencies required for the instance to safely receive work.

# FAILURE CLASSIFICATION

Create a failure classification model.

Categorize failures as appropriate into:

* validation;
* business rule;
* authentication;
* authorization;
* conflict;
* dependency timeout;
* dependency unavailable;
* transient infrastructure failure;
* permanent infrastructure failure;
* internal defect.

Define retryability.

Define client-visible behavior.

Define logging severity.

Define whether the failure should trigger alerts.

# RETRY CONTRACT

Define retry rules based on operation semantics.

For every retryable category document:

* maximum attempts;
* backoff;
* jitter;
* timeout;
* idempotency requirement;
* dead-letter strategy.

Explicitly prohibit blind retries for operations where duplication can create financial or inventory corruption.

# TIMEOUT CONTRACT

Define timeout categories for:

* HTTP requests;
* database calls;
* Redis operations;
* search;
* payment provider;
* shipping provider;
* notification provider;
* queue jobs.

Timeouts must be bounded.

Do not allow infrastructure dependencies to hang indefinitely.

# CIRCUIT-BREAKING CONTRACT

Identify where circuit breakers are useful.

Possible targets include:

* payment providers;
* shipping providers;
* tax providers;
* notification providers;
* search;
* other non-authoritative external services.

Document:

* open conditions;
* recovery conditions;
* fallback behavior;
* alerting.

Do not add circuit breakers where they would interfere with correctness without providing resilience value.

# RATE-LIMITING CONTRACT

Define rate-limit categories for:

* authentication;
* password recovery;
* product search;
* cart operations;
* checkout;
* order endpoints;
* reviews;
* seller APIs;
* administrative operations;
* webhooks;
* media uploads.

Document:

* key;
* scope;
* limit;
* window;
* burst behavior;
* storage mechanism;
* response behavior;
* bypass conditions for trusted internal workflows.

# ANTI-ABUSE CONTRACT

Define architectural controls for:

* account creation abuse;
* credential attacks;
* scraping;
* seller abuse;
* review abuse;
* promotion abuse;
* inventory abuse;
* checkout abuse;
* payment abuse;
* malicious uploads.

Separate deterministic controls from future risk-scoring systems.

# DATA RETENTION CONTRACT

Create retention classifications for major data categories.

Consider:

* active customer data;
* orders;
* payment references;
* audit logs;
* notifications;
* media;
* search indexes;
* analytics;
* operational logs;
* event retention;
* queue dead letters.

Define which data is:

* authoritative;
* reconstructable;
* disposable;
* legally or operationally retained.

# DATA DELETION AND PRIVACY CONTRACT

Define deletion behavior for:

* customer account;
* seller account;
* personal addresses;
* sessions;
* media;
* reviews;
* notification records.

Explicitly identify data that cannot be immediately deleted because it is required for:

* financial records;
* legal obligations;
* fraud prevention;
* auditability;
* completed orders.

Where direct deletion is inappropriate, define anonymization or restricted-retention strategies.

# MIGRATION ARCHITECTURE

Define how future schema and contract changes are performed.

Document:

* backward-compatible migrations;
* expand/contract strategy;
* deployment ordering;
* data backfills;
* rollback limitations;
* long-running migration safety;
* index creation strategy;
* event schema evolution;
* search reindexing.

Never assume all migrations can be instantly rolled back.

# DATABASE OPERATIONAL CONTRACT

Define expectations for:

* connection pools;
* transaction timeouts;
* query timeouts;
* read replicas;
* failover;
* backups;
* restore;
* indexing;
* vacuum;
* statistics;
* slow-query monitoring.

Identify which workloads may use replicas and which must use the authoritative primary.

# DATABASE PARTITIONING AND SHARDING

Evaluate whether partitioning or sharding is required immediately.

If not immediately required, document:

* projected pressure points;
* growth indicators;
* candidate partition keys;
* migration strategy;
* boundaries that should remain shardable.

Do not introduce sharding without an actual architectural need.

# MULTI-TENANCY AND SELLER ISOLATION

The marketplace must maintain strict separation of seller-owned information.

Document whether the platform uses:

* shared database with seller ownership;
* schema-level separation;
* separate databases;
* hybrid isolation.

Define:

* tenant/seller identification;
* authorization enforcement;
* query requirements;
* audit implications;
* support access;
* administrator override boundaries.

# FINANCIAL DATA BOUNDARIES

Define authoritative ownership for:

* payment state;
* refund state;
* seller settlement data;
* fees;
* commissions;
* taxes;
* financial audit records.

Explicitly separate:

* transactional order totals;
* payment-provider state;
* seller financial reporting;
* platform revenue calculations.

Financial calculations must be reproducible and auditable.

# FULFILLMENT AND SHIPPING CONTRACT

Define:

* fulfillment ownership;
* warehouse/fulfillment-node concepts where applicable;
* shipment creation;
* carrier integrations;
* tracking;
* partial shipment;
* delivery;
* failed delivery;
* cancellation;
* return-to-seller.

External shipping providers must remain behind an abstraction boundary.

# RETURN AND REFUND CONTRACT

Define:

* return request;
* eligibility;
* authorization;
* inspection;
* acceptance/rejection;
* refund creation;
* partial refund;
* restocking;
* inventory restoration;
* payment-provider synchronization.

Prevent duplicate refunds.

Define the relationship between return state and payment state.

# REVIEW CONTRACT

Define:

* review eligibility;
* order verification;
* rating;
* text;
* media;
* moderation;
* editing;
* deletion;
* abuse reporting;
* seller response;
* aggregate calculation.

Review aggregates should be treated as derived data.

# RECOMMENDATION BOUNDARY

Where recommendations are part of the future platform, define the boundary between:

* transactional catalog data;
* behavior/event collection;
* recommendation computation;
* recommendation serving.

Do not introduce a recommendation engine into transactional workflows merely to demonstrate personalization.

# ANALYTICS EVENT BOUNDARY

Define which user/business events may feed analytics.

Document:

* event naming;
* payload;
* privacy rules;
* retention;
* ownership;
* delivery;
* sampling;
* deduplication.

Analytics must not become an accidental source of truth for transactional state.

# ENVIRONMENT ARCHITECTURE

Define environment responsibilities for:

* local;
* development;
* testing;
* staging;
* production;
* disaster recovery.

For each environment document:

* deployment purpose;
* expected scale;
* data policy;
* secrets;
* external integrations;
* observability;
* access restrictions.

Production data must never be copied into lower environments without an appropriate privacy-preserving process.

# DEPLOYMENT ARCHITECTURE CONTRACT

Define the deployment topology required by the application architecture.

Document:

* web deployment;
* API deployment;
* worker deployment;
* scheduled jobs;
* ingress;
* load balancing;
* CDN;
* database;
* Redis;
* search;
* event/queue systems;
* object storage;
* observability.

Clearly distinguish:

* repository artifacts;
* infrastructure-as-code;
* externally provisioned infrastructure.

# ROLLOUT AND ROLLBACK CONTRACT

Define:

* deployment strategy;
* health gates;
* migration ordering;
* rolling deployment requirements;
* backward compatibility;
* rollback limitations;
* feature flags;
* canary deployment where appropriate.

Database and event changes must be compatible with rolling application versions where required.

# DISASTER-RECOVERY CONTRACT

Define architecture-level recovery behavior for:

* PostgreSQL;
* Redis;
* search;
* event infrastructure;
* object storage;
* application deployment;
* configuration;
* external integrations.

Identify:

* authoritative systems;
* rebuildable systems;
* recovery order;
* data-loss risks;
* reconciliation requirements.

# CAPACITY-PLANNING MODEL

Create a capacity-planning framework covering:

* API requests;
* concurrent sessions;
* database throughput;
* cache operations;
* search requests;
* queue throughput;
* event throughput;
* media volume;
* notification volume;
* storage growth.

Do not fabricate exact future capacity numbers without a basis.

Define measurable variables and scaling indicators.

# ARCHITECTURAL TEST CONTRACT

Define what implementation teams must verify against the architecture.

At minimum establish:

* API contract tests;
* event-schema validation;
* database migration validation;
* authorization tests;
* seller-isolation tests;
* idempotency tests;
* queue retry tests;
* webhook signature tests;
* search synchronization tests;
* media authorization tests;
* observability validation;
* resilience tests;
* deployment compatibility tests.

# CONTRACT ARTIFACT PACKAGE

Create portable architecture artifacts for:

1. Canonical entity catalog
2. Identifier conventions
3. State-machine definitions
4. API conventions
5. Canonical API error model
6. Pagination contract
7. Idempotency contract
8. Webhook contract
9. Event envelope
10. Event catalog
11. Queue/job catalog
12. Redis namespace catalog
13. Search document schemas
14. Object-storage contract
15. Media processing contract
16. Notification contract
17. Configuration contract
18. Security policy matrix
19. Authorization matrix
20. Audit contract
21. Observability contract
22. Failure classification
23. Retry contract
24. Timeout contract
25. Rate-limit contract
26. Data-retention contract
27. Data-deletion/privacy contract
28. Migration contract
29. Deployment contract
30. Disaster-recovery contract
31. Architecture test contract
32. Updated ADR package

Use source-controlled structured formats where practical.

Examples include:

* Markdown;
* YAML;
* JSON Schema;
* OpenAPI;
* Mermaid;
* PlantUML;
* SQL design references;
* machine-readable contract definitions.

The selected format must remain portable and maintainable.

# CONTRACT VALIDATION

Where machine-readable artifacts are created:

* validate syntax;
* validate schema structure;
* validate references;
* detect duplicate identifiers;
* detect duplicate event names;
* detect inconsistent status values;
* detect contradictory ownership;
* detect inconsistent API conventions.

Where automated validation is not practical, perform a documented manual consistency audit.

Do not report validation that was not actually performed.

# ARCHITECTURAL INTEGRATION AUDIT

Perform an integration audit across all architecture artifacts currently present in the repository.

Verify:

* one canonical name per core entity;
* one authoritative owner per core entity;
* consistent state names;
* consistent API paths;
* consistent event names;
* consistent queue names;
* consistent Redis namespaces;
* consistent configuration names;
* consistent roles;
* consistent permissions;
* consistent error codes;
* consistent identifier semantics;
* consistent timestamp semantics;
* consistent monetary conventions;
* consistent security requirements.

Identify and resolve contradictions within the architecture package.

# IMPLEMENTATION READINESS AUDIT

Verify that an independent backend engineering agent could determine:

* which domains it owns;
* which tables/entities it owns;
* which APIs it exposes;
* which events it publishes;
* which events it consumes;
* which queues it uses;
* which Redis keys it owns;
* which search documents it manages;
* which external services it integrates;
* which authorization checks are required;
* which errors are returned;
* which retry behavior applies.

Verify that an independent frontend engineering agent could determine:

* authentication model;
* API conventions;
* response structures;
* errors;
* pagination;
* realtime boundaries;
* notification model;
* authorization-aware UI expectations.

Verify that an independent mobile engineering agent could determine the same applicable client contracts.

Verify that an infrastructure engineering agent could determine:

* deployable components;
* required infrastructure dependencies;
* environment boundaries;
* networking requirements;
* observability dependencies;
* deployment constraints;
* scaling boundaries.

Verify that a QA engineering agent could determine:

* contracts that must be tested;
* important state transitions;
* failure cases;
* security boundaries;
* integration boundaries.

# NO HIDDEN DEPENDENCIES

The architecture package must be usable outside this conversation.

Do not write:

* "as described in the previous prompt";
* "refer to Volume 1 above";
* "use the architecture discussed earlier";
* "continue the decisions already made in chat."

Instead, architecture artifacts must contain the decisions directly.

They may reference other files inside the generated architecture package by explicit file path when those files are part of the portable artifact set.

# NO FAKE IMPLEMENTATION

Architecture artifacts may specify implementation requirements, but they must not claim that the corresponding implementation exists unless it was actually verified.

Do not create:

* fake endpoint implementations;
* fake infrastructure;
* fake payment integrations;
* fake queue consumers;
* fake databases.

The purpose of this volume is to define contracts and architecture.

# DOCUMENTATION QUALITY

Use:

* precise terminology;
* explicit ownership;
* explicit state transitions;
* explicit contracts;
* concise rationale;
* machine-readable structures where beneficial;
* diagrams where useful;
* consistent naming.

Avoid vague architectural statements.

Do not produce documents that require the reader to infer critical behavior.

# REQUIRED VALIDATION AND COMPLETION CHECKS

Before declaring this architecture volume complete, verify:

1. All critical domains have defined contracts.
2. All critical entities have canonical identifiers.
3. State machines are explicit.
4. API conventions are explicit.
5. Error handling is explicit.
6. Pagination is explicit.
7. Idempotency is explicit.
8. Webhook behavior is explicit.
9. Event schemas are explicit.
10. Queue contracts are explicit.
11. Redis namespaces are explicit.
12. Search documents are explicit.
13. Media contracts are explicit.
14. Notification contracts are explicit.
15. Configuration conventions are explicit.
16. Authorization is explicit.
17. Audit requirements are explicit.
18. Observability conventions are explicit.
19. Retry and timeout behavior is explicit.
20. Rate limits are defined.
21. Privacy and retention behavior is defined.
22. Migration strategy is defined.
23. Deployment contracts are defined.
24. Disaster recovery contracts are defined.
25. Contract consistency has been audited.
26. No major contradiction remains across architecture artifacts.
27. No implementation claim is fabricated.
28. All artifacts are portable.
29. Independent implementation agents can use the contracts without hidden conversational context.
30. The architecture does not depend on an undocumented human approval message.

# COMPLETION CRITERIA

Architecture Volume 2 is complete only when the repository contains the detailed architecture contracts necessary to make later implementation prompts deterministic.

The completed architecture package must make critical cross-part behavior explicit for:

* backend;
* web;
* mobile;
* database;
* search;
* caching;
* events;
* queues;
* media;
* payments;
* notifications;
* infrastructure;
* security;
* observability;
* QA.

No application feature implementation is required by this prompt.

# IMPLEMENTATION REPORT

After completing the architecture task, provide a concise completion report containing:

* files created;
* files modified;
* files deleted, if any;
* contract artifacts created;
* machine-readable schemas created;
* state machines defined;
* entity and identifier conventions defined;
* API contracts defined;
* event and queue contracts defined;
* Redis contracts defined;
* search contracts defined;
* media/storage contracts defined;
* authorization and security matrices defined;
* observability contracts defined;
* reliability contracts defined;
* deployment and recovery contracts defined;
* architecture validation performed;
* consistency audit performed;
* tests or validation scripts executed;
* repository discrepancies discovered;
* compatibility considerations;
* unresolved issues, if any.

Do not claim that application implementation is complete.

Do not claim that external infrastructure has been provisioned unless it was actually verified.

# DEFINITION OF DONE

The architecture-contract task is complete only when:

* the foundational architecture from the project architecture package is represented concretely in implementation-oriented contracts;
* major state machines are explicit;
* major API conventions are explicit;
* event and queue semantics are explicit;
* data and identifier conventions are explicit;
* authorization rules are explicit;
* operational behavior is explicit;
* failure and retry behavior is explicit;
* migration and deployment behavior is explicit;
* independent engineering agents can implement their scopes without relying on hidden architectural assumptions;
* all architecture artifacts are internally consistent;
* all material validation has been performed and accurately reported.

# FINAL EXECUTION DIRECTIVE

Treat this prompt as an architecture-contract assignment for the Amazon-style ecommerce marketplace.

Do NOT implement the ecommerce application.

Do NOT implement unrelated backend, frontend, mobile, infrastructure, or QA features.

Inspect the repository if it is available.

Create and validate the detailed portable contract artifacts required by this prompt.

Preserve compatible existing architecture work.

Resolve contradictions within the architecture package rather than documenting multiple incompatible alternatives without a decision.

Do not fabricate repository state, external service access, cloud resources, credentials, or implementation completion.

Complete the architecture-contract scope and provide the required implementation report.
