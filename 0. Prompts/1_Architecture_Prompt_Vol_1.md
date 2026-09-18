# Amazon-Style Ecommerce Marketplace — Architecture Prompt — Volume 1

# ROLE

You are the Principal Software Architect leading the architecture-definition phase for a production-grade, globally scalable ecommerce marketplace platform.

Operate as a complete senior architecture organization covering:

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
* Technical Documentation

This task is an **architecture-definition task**.

Do NOT implement the complete ecommerce application.

Do NOT turn this task into a full backend, frontend, mobile, infrastructure, or QA implementation.

Produce concrete, portable architecture artifacts that can later guide independent implementation work performed by AI engineering agents in separate conversations.

# PROJECT

The project is an original production-grade ecommerce marketplace comparable in overall capability class to large marketplace platforms such as Amazon, Shopify, Etsy, and Mercado Libre.

The platform is intended to support:

* millions of customers;
* thousands of sellers;
* large product catalogs;
* seller storefronts;
* product variants and SKUs;
* inventory;
* pricing;
* promotions;
* search;
* shopping carts;
* checkout;
* payments;
* orders;
* shipping;
* fulfillment;
* returns;
* refunds;
* customer reviews;
* notifications;
* seller administration;
* platform administration;
* moderation;
* fraud and abuse prevention;
* analytics;
* operational tooling;
* high traffic;
* high transaction volume;
* large media volumes;
* geographically distributed traffic;
* asynchronous processing;
* high availability;
* horizontal scalability;
* disaster recovery.

The architecture must be designed for long-term growth without requiring every future-scale mechanism to be implemented immediately.

# GLOBAL TECHNOLOGY DIRECTION

The architecture must use the following technology direction unless an actual repository constraint requires a compatible architectural adjustment:

## Web

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

## Mobile

* React Native
* Expo
* TypeScript

## Backend

* NestJS
* TypeScript
* REST
* WebSockets or SSE where justified
* Webhooks
* Swagger / OpenAPI

## Transactional Database

* PostgreSQL
* Prisma

## Cache and Ephemeral State

* Redis

## Search

* Elasticsearch or OpenSearch

## Object Storage

* Amazon S3-compatible object storage

## Payments

* Stripe or an equivalent payment-provider abstraction

## Background Processing

* BullMQ
* Redis-backed queues

## Infrastructure Direction

* AWS
* Docker
* Kubernetes where justified
* Helm where Kubernetes is used
* Terraform or equivalent infrastructure-as-code
* GitHub Actions or equivalent CI/CD

## Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

The architecture must not introduce infrastructure solely because it sounds sophisticated.

Every architectural technology must have a concrete role.

# SOURCE OF TRUTH

If a repository is available in the execution environment:

* inspect it before producing architecture artifacts;
* identify the current repository structure;
* identify existing source code;
* identify existing configuration;
* identify existing database schemas;
* identify existing API contracts;
* identify existing infrastructure;
* identify existing tests;
* identify existing documentation;
* identify relevant architectural constraints.

The repository is the source of truth for what already exists.

The project requirements in this prompt are the source of truth for the intended architecture that must be documented.

If the repository already contains implementation decisions, do not pretend they do not exist.

Instead:

1. inspect the actual state;
2. identify deviations from the target architectural direction;
3. preserve compatible decisions;
4. document important discrepancies;
5. define migration or compatibility implications where necessary.

Do not claim repository facts that were not inspected.

If no repository is available, create architecture artifacts that are portable and implementation-independent rather than inventing repository state.

# CURRENT EXECUTION SCOPE

This prompt is responsible for defining the **foundational architecture of the ecommerce marketplace**.

The architecture must establish the technical blueprint required for later implementation work.

This volume is primarily concerned with:

* system context;
* architectural principles;
* domain decomposition;
* service and module boundaries;
* client boundaries;
* data ownership;
* transactional data architecture;
* API architecture;
* authentication and authorization boundaries;
* event-driven architecture;
* asynchronous processing boundaries;
* caching strategy;
* search architecture;
* media architecture;
* external integration boundaries;
* cross-cutting concerns;
* foundational reliability and scalability decisions.

Do NOT implement production application functionality.

Do NOT implement the complete database schema as application code.

Do NOT implement backend endpoints.

Do NOT implement frontend screens.

Do NOT implement mobile screens.

Do NOT provision cloud infrastructure.

Architecture artifacts may contain precise schemas, interfaces, contracts, diagrams, examples, and configuration specifications where those artifacts are required to make the architecture implementation-ready.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

This architecture volume does NOT authorize implementation of:

* complete backend modules;
* complete web UI;
* complete mobile UI;
* production cloud deployment;
* complete CI/CD implementation;
* complete QA automation;
* full operational dashboards;
* full seller portal implementation;
* complete customer checkout UI;
* full payment-provider integration;
* full media-processing implementation.

Those responsibilities belong to later planned implementation work.

Architecture decisions must nevertheless define the boundaries and contracts required for those later areas.

# ARCHITECTURAL OBJECTIVES

The architecture must achieve the following:

* clear domain ownership;
* explicit data ownership;
* predictable integration boundaries;
* scalable request handling;
* horizontally scalable application components;
* reliable transactional workflows;
* safe asynchronous processing;
* consistent API contracts;
* secure authentication and authorization;
* resilient external integrations;
* observable system behavior;
* controlled failure propagation;
* maintainable module boundaries;
* compatibility with future geographic expansion;
* compatibility with high traffic and burst workloads;
* practical operational complexity;
* commercially realistic infrastructure.

Do not optimize architecture exclusively for theoretical scale.

Balance:

* correctness;
* simplicity;
* scalability;
* reliability;
* operational cost;
* developer productivity;
* security.

# ARCHITECTURAL PRINCIPLES

Establish and document principles covering at minimum:

* single responsibility of domains;
* explicit ownership;
* dependency direction;
* bounded contexts;
* least privilege;
* secure defaults;
* stateless application scaling where appropriate;
* asynchronous processing for non-critical long-running work;
* transactional consistency for critical business operations;
* eventual consistency only where justified;
* idempotency for retryable workflows;
* observability by default;
* explicit contracts;
* backward-compatible evolution;
* failure isolation;
* defense in depth;
* automation;
* infrastructure reproducibility.

Architecture decisions must be justified by the project's actual product and operational requirements.

# SYSTEM CONTEXT

Create a system-context artifact that identifies:

* customers;
* sellers;
* seller staff;
* administrators;
* moderators;
* support personnel;
* web application;
* mobile applications;
* public API;
* backend application boundary;
* transactional database;
* Redis;
* search infrastructure;
* event/messaging infrastructure where applicable;
* background workers;
* object storage;
* CDN;
* payment provider;
* notification providers;
* shipping integrations;
* tax integrations where applicable;
* analytics systems;
* observability systems;
* external identity or fraud services where applicable.

For each major external actor/system, document:

* purpose;
* trust level;
* data exchanged;
* direction of communication;
* authentication mechanism;
* failure implications;
* data sensitivity.

Provide a system-context diagram or an equivalent structured artifact.

# CONTAINER / COMPONENT ARCHITECTURE

Define the major executable and logical components of the platform.

At minimum evaluate:

* web client;
* mobile client;
* API gateway or edge layer where justified;
* backend application;
* domain modules;
* background workers;
* event producers/consumers;
* PostgreSQL;
* Redis;
* search engine;
* object storage;
* CDN;
* payment integration;
* notification integrations;
* shipping integrations;
* administrative interfaces;
* observability infrastructure.

For each component define:

* responsibility;
* owned data;
* dependencies;
* exposed interfaces;
* scaling characteristics;
* failure behavior;
* security boundary;
* observability requirements.

Do not create artificial services merely because a domain exists.

# DOMAIN ARCHITECTURE

Define the major business domains and their boundaries.

At minimum analyze:

* Identity and Access
* Customer
* Seller and Seller Organization
* Seller Onboarding / Verification
* Catalog
* Category
* Product
* Product Variant / SKU
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
* Fraud / Abuse
* Analytics

Determine which concepts should remain within the same bounded context and which require separate ownership.

For every major domain document:

* responsibility;
* authoritative entities;
* invariants;
* owned data;
* consumers;
* commands;
* events;
* external dependencies;
* consistency model;
* scaling characteristics;
* security boundaries.

# DOMAIN OWNERSHIP

Create a domain-ownership matrix.

The matrix must identify:

* authoritative owner;
* read consumers;
* write consumers;
* allowed integration mechanism;
* forbidden direct access patterns;
* consistency expectations.

Example categories include:

* customer-owned data;
* seller-owned catalog data;
* inventory-owned state;
* order-owned state;
* payment-owned state;
* fulfillment-owned state;
* search-derived state.

Do not permit multiple domains to independently own the same authoritative business state without an explicit reconciliation strategy.

# SERVICE AND MODULE BOUNDARIES

Determine the appropriate architectural decomposition.

Evaluate whether the current architecture should begin as:

* a modular monolith;
* a service-oriented backend;
* a hybrid architecture.

Base the decision on:

* domain isolation;
* transaction boundaries;
* scaling needs;
* operational complexity;
* failure isolation;
* organizational complexity;
* deployment requirements.

Provide a decision record documenting the chosen approach and the rejected alternatives.

If a modular monolith is selected for the initial implementation, explicitly document:

* module boundaries;
* dependency direction;
* internal contracts;
* future service-extraction boundaries;
* shared infrastructure restrictions.

If multiple deployable services are selected, explicitly document:

* service boundaries;
* network interfaces;
* data ownership;
* deployment model;
* failure boundaries;
* service-to-service authentication;
* observability requirements.

# DATA ARCHITECTURE

Define the authoritative transactional data model at the architectural level.

Identify major aggregate roots and critical entities including, where applicable:

* User
* Session
* Address
* Seller
* SellerOrganization
* SellerUser
* SellerVerification
* Storefront
* Product
* ProductVariant
* SKU
* Category
* ProductAttribute
* InventoryItem
* InventoryReservation
* Price
* Promotion
* Cart
* CartItem
* Checkout
* Order
* OrderItem
* Payment
* Refund
* Shipment
* Return
* Review
* Notification
* MediaAsset
* AuditLog

For each major aggregate determine:

* ownership;
* identity;
* lifecycle;
* relationships;
* invariants;
* write authority;
* read requirements;
* indexing needs;
* retention needs;
* privacy sensitivity.

Do not invent unnecessary entities.

Do not flatten important business concepts merely for implementation convenience.

# AGGREGATE AND TRANSACTION BOUNDARIES

Identify the business operations that require strong transactional guarantees.

At minimum analyze:

* inventory reservation;
* cart updates;
* checkout creation;
* order creation;
* order state transitions;
* payment state transitions;
* refund creation;
* shipment state transitions;
* return authorization;
* seller inventory updates.

For each critical operation document:

* transaction boundary;
* optimistic/pessimistic concurrency approach;
* idempotency strategy;
* retry behavior;
* failure behavior;
* consistency model;
* reconciliation mechanism where applicable.

Do not use distributed transactions by default.

Prefer local transactional guarantees combined with explicit asynchronous workflows.

# INVENTORY ARCHITECTURE

Define the inventory architecture in sufficient detail to support future implementation.

Document:

* inventory ownership;
* available quantity;
* reserved quantity;
* committed quantity;
* adjustments;
* reservations;
* expiration;
* release;
* concurrency control;
* overselling prevention;
* seller-specific inventory;
* warehouse concepts if applicable;
* reconciliation;
* auditability.

Define the authoritative state transition model.

Explain how inventory interacts with:

* carts;
* checkout;
* orders;
* fulfillment;
* cancellation;
* returns.

# ORDER ARCHITECTURE

Define the order lifecycle.

Document:

* order creation;
* payment state;
* order state;
* fulfillment state;
* cancellation;
* shipment;
* delivery;
* return;
* refund.

Do not collapse all lifecycle concepts into one ambiguous status field if multiple independent state machines are required.

Define:

* state ownership;
* valid transitions;
* invalid transitions;
* triggering commands;
* emitted events;
* consumer responsibilities;
* idempotency.

# PAYMENT ARCHITECTURE

Define the payment boundary.

The payment provider must be treated as an external dependency.

Document:

* payment intent lifecycle;
* authorization;
* capture;
* cancellation;
* refund;
* webhook handling;
* signature verification;
* idempotency;
* reconciliation;
* provider failure;
* asynchronous confirmation;
* auditability.

Define what data is:

* stored locally;
* referenced externally;
* prohibited from storage;
* logged;
* excluded from logs.

Do not design the platform to store unnecessary cardholder data.

# CHECKOUT ARCHITECTURE

Define checkout as an explicit domain workflow.

Analyze:

* cart validation;
* pricing validation;
* promotions;
* inventory reservation;
* shipping selection;
* tax calculation;
* payment initiation;
* order creation;
* failure recovery.

Specify ordering and compensation behavior.

Define how the architecture prevents:

* stale prices;
* stale inventory;
* duplicate checkout;
* duplicate orders;
* partial order creation;
* payment/order inconsistency.

# API ARCHITECTURE

Define the REST API architecture.

Document:

* resource hierarchy;
* naming;
* versioning;
* authentication;
* authorization;
* pagination;
* filtering;
* sorting;
* idempotency;
* validation;
* errors;
* correlation IDs;
* request tracing;
* rate limiting.

Define the canonical error structure.

Define the canonical pagination model.

Define conventions for:

* IDs;
* timestamps;
* enums;
* nullable fields;
* optional fields;
* nested resources;
* bulk operations;
* asynchronous operations.

Create a representative OpenAPI architecture contract covering the major API groups without implementing every endpoint.

# AUTHENTICATION ARCHITECTURE

Define the authentication model for:

* customers;
* sellers;
* seller staff;
* administrators;
* moderators;
* support personnel.

Document:

* credential model;
* session model;
* access tokens;
* refresh tokens;
* session revocation;
* device/session tracking;
* password reset;
* email verification;
* MFA where applicable;
* account recovery;
* abuse prevention.

Define token/session boundaries between:

* web;
* mobile;
* backend;
* administrative interfaces.

# AUTHORIZATION ARCHITECTURE

Define an explicit authorization model.

Determine whether the platform uses:

* RBAC;
* permission-based authorization;
* resource ownership checks;
* policy-based authorization;
* a hybrid.

Define permissions for:

* customers;
* seller staff;
* seller administrators;
* moderators;
* support;
* platform administrators.

Explicitly address cross-seller isolation.

Define authorization requirements for:

* catalog;
* inventory;
* orders;
* payments;
* returns;
* refunds;
* reviews;
* administrative actions.

# EVENT ARCHITECTURE

Determine where asynchronous events are necessary.

Define event categories such as:

* customer events;
* seller events;
* catalog events;
* inventory events;
* order events;
* payment events;
* fulfillment events;
* review events;
* notification events;
* search synchronization events;
* moderation events.

For each critical event define:

* event type;
* version;
* producer;
* consumers;
* payload ownership;
* ordering requirements;
* delivery semantics;
* idempotency;
* retry strategy;
* dead-letter behavior;
* replay considerations.

Define a canonical event envelope.

# OUTBOX ARCHITECTURE

Evaluate the need for a transactional outbox.

For state-changing operations where a database mutation must reliably produce an event, define:

* transactional write;
* outbox record;
* dispatcher;
* retry;
* publication state;
* duplicate handling;
* cleanup;
* monitoring.

Specify where the pattern is mandatory and where it is unnecessary.

# QUEUE ARCHITECTURE

Define the background-job architecture.

Identify logical queues such as:

* notifications;
* email;
* media processing;
* search indexing;
* reconciliation;
* analytics;
* scheduled cleanup;
* seller workflows;
* fulfillment workflows;
* fraud workflows.

For each queue family define:

* job type;
* payload ownership;
* concurrency;
* priority;
* retry policy;
* backoff;
* timeout;
* idempotency;
* dead-letter behavior;
* observability.

# CACHE ARCHITECTURE

Define Redis usage by domain.

Create a Redis responsibility matrix including:

* use case;
* key namespace;
* key format;
* TTL;
* serialization;
* invalidation;
* source of truth;
* stale behavior;
* failure behavior.

Evaluate caching for:

* catalog reads;
* product pages;
* category data;
* search result support;
* sessions;
* rate limiting;
* carts where appropriate;
* inventory reservations;
* distributed locks;
* feature/configuration state.

Do not cache authoritative transactional state in a way that can silently diverge.

# SEARCH ARCHITECTURE

Define the product-search pipeline.

Document:

* index structure;
* source of truth;
* indexing triggers;
* indexing queue;
* indexing worker;
* retry behavior;
* rebuild behavior;
* partial failure;
* aliases/versioned indexes;
* search relevance;
* filters;
* facets;
* sorting;
* pagination;
* availability considerations.

Define how stale search data is tolerated.

Define how deleted or unpublished products disappear from search.

# MEDIA ARCHITECTURE

Define the media pipeline.

Document:

* client upload initiation;
* authorization;
* upload destination;
* object-storage layout;
* metadata;
* validation;
* processing;
* thumbnails;
* variants;
* scanning;
* CDN delivery;
* signed URLs;
* deletion;
* lifecycle management.

Define media ownership by domain.

Distinguish:

* original assets;
* processed assets;
* derived assets;
* temporary upload state.

# NOTIFICATION ARCHITECTURE

Define channels such as:

* email;
* push notifications;
* SMS where appropriate;
* in-app notifications.

Define:

* notification events;
* preferences;
* templates;
* delivery providers;
* retries;
* deduplication;
* rate limits;
* failure handling;
* localization considerations;
* auditability.

Do not allow notification-provider failure to unnecessarily break critical transactional workflows.

# EXTERNAL INTEGRATION ARCHITECTURE

Define abstraction boundaries for external services.

At minimum evaluate:

* payments;
* shipping;
* tax;
* email;
* SMS;
* push notification;
* fraud detection;
* cloud storage;
* search;
* analytics.

For each external dependency document:

* provider role;
* local abstraction;
* authentication;
* secret handling;
* webhook behavior;
* retry;
* timeout;
* circuit breaking where appropriate;
* data mapping;
* failure behavior;
* reconciliation.

Avoid provider-specific leakage into core business logic.

# SECURITY ARCHITECTURE

Create a security-boundary document identifying:

* public clients;
* public APIs;
* internal services;
* databases;
* caches;
* queues;
* object storage;
* administrative interfaces;
* external providers.

Document threats and major mitigations for:

* authentication;
* authorization;
* IDOR;
* privilege escalation;
* injection;
* malicious uploads;
* credential attacks;
* rate-limit abuse;
* SSRF;
* XSS;
* CSRF;
* secret exposure;
* sensitive-data leakage;
* webhook forgery.

Define the security responsibilities of each layer.

# PRIVACY ARCHITECTURE

Define categories of sensitive data.

At minimum identify:

* identity data;
* contact data;
* addresses;
* order history;
* payment references;
* seller business data;
* administrative data;
* audit information.

Document:

* data ownership;
* minimum required storage;
* retention;
* deletion;
* access controls;
* logging restrictions;
* event restrictions;
* search restrictions.

# OBSERVABILITY ARCHITECTURE

Define the observability model.

Document:

* logging;
* metrics;
* traces;
* correlation IDs;
* request IDs;
* audit logs;
* health checks;
* readiness;
* liveness;
* business metrics;
* operational metrics.

Define observability boundaries for:

* API requests;
* domain commands;
* database;
* Redis;
* queues;
* events;
* search;
* media;
* payments;
* external providers.

Define sensitive-data logging restrictions.

# RELIABILITY ARCHITECTURE

Define resilience patterns for:

* database failures;
* Redis failures;
* search failures;
* payment-provider failures;
* shipping-provider failures;
* notification-provider failures;
* queue delays;
* event duplication;
* network partitions;
* partial dependency outages.

Define:

* timeout policies;
* retry policies;
* backoff;
* idempotency;
* circuit breaking where appropriate;
* fallback behavior;
* graceful degradation;
* recovery;
* reconciliation.

# SCALABILITY ARCHITECTURE

Document how the platform scales across:

* API traffic;
* database reads/writes;
* Redis;
* search;
* queue workers;
* media processing;
* notifications;
* event throughput.

Evaluate:

* horizontal API scaling;
* read replicas;
* connection pooling;
* partitioning;
* sharding;
* queue partitioning;
* search scaling;
* object-storage scaling;
* CDN usage;
* regional expansion.

Do not require premature sharding.

Document the scale thresholds or architectural signals that would justify later decomposition.

# MULTI-REGION DIRECTION

Define the long-term multi-region strategy.

At minimum analyze:

* traffic routing;
* regional application deployment;
* database topology;
* read/write authority;
* replication;
* object storage replication;
* search replication;
* event replication;
* failover;
* DNS;
* disaster recovery;
* regional isolation.

Clearly distinguish:

* initial deployment topology;
* target multi-region topology.

Do not require immediate multi-region implementation if it is not part of the current deployment milestone.

# DISASTER RECOVERY ARCHITECTURE

Define:

* backup strategy;
* restore process;
* recovery objectives;
* recovery boundaries;
* object-storage recovery;
* database recovery;
* configuration recovery;
* search rebuild;
* event replay;
* dependency recovery.

Identify which systems are:

* authoritative;
* reconstructable;
* replaceable;
* derived.

# COST AND OPERATIONAL ARCHITECTURE

For major infrastructure choices, document:

* why the component exists;
* what workload justifies it;
* scaling characteristics;
* operational burden;
* cost implications;
* simpler alternatives considered.

Do not create infrastructure that lacks a concrete architectural purpose.

# CLIENT ARCHITECTURE

Define the high-level client architecture for:

* web;
* mobile;
* administrative interfaces where applicable.

Document:

* authentication;
* API communication;
* server state;
* local state;
* caching;
* realtime;
* notifications;
* offline strategy;
* error handling;
* accessibility;
* analytics;
* security boundaries.

The architecture must explicitly identify which decisions belong to the clients and which remain server authoritative.

# ADMINISTRATION ARCHITECTURE

Define the administrative system boundary.

Document:

* administrative users;
* roles;
* permissions;
* audit logging;
* seller management;
* user management;
* catalog moderation;
* order intervention;
* refund operations;
* fraud investigation;
* operational monitoring.

Administrative functions must not reuse customer authorization assumptions.

# FRAUD AND ABUSE ARCHITECTURE

Define architectural boundaries for:

* rate limiting;
* account abuse;
* seller abuse;
* suspicious payments;
* fraudulent orders;
* review manipulation;
* listing abuse;
* content abuse;
* automated traffic.

Separate deterministic transactional controls from future machine-learning or heuristic systems where appropriate.

# ANALYTICS ARCHITECTURE

Define the boundary between:

* operational transactional data;
* analytics events;
* reporting;
* product analytics;
* seller analytics;
* platform analytics.

Define privacy considerations and identify what data should not be duplicated into analytics systems unnecessarily.

# CROSS-CUTTING ARCHITECTURE CONTRACTS

Create canonical specifications for:

* identifiers;
* timestamps;
* errors;
* pagination;
* authentication;
* authorization;
* correlation IDs;
* event envelopes;
* job payload conventions;
* configuration naming;
* environment variables;
* service naming;
* domain naming;
* logging fields;
* metric naming.

These contracts must be explicit enough for independent implementation teams and coding agents to remain compatible.

# ARCHITECTURE ARTIFACT PACKAGE

Create a portable architecture documentation package.

The package must contain, at minimum, appropriately structured artifacts covering:

1. Architecture overview
2. System context
3. Major component/container architecture
4. Domain boundaries
5. Domain ownership matrix
6. Data ownership model
7. Aggregate and transaction boundaries
8. API architecture and canonical conventions
9. Authentication architecture
10. Authorization architecture
11. Event architecture
12. Queue architecture
13. Cache architecture
14. Search architecture
15. Media architecture
16. External integration architecture
17. Security architecture
18. Privacy architecture
19. Observability architecture
20. Reliability architecture
21. Scalability architecture
22. Disaster recovery architecture
23. Client architecture
24. Administrative architecture
25. Cross-cutting contracts
26. Major architectural decision records

Where a separate artifact is unnecessary, consolidate related content without reducing coverage.

The artifacts must be portable.

They must not require the reader to have access to this conversation.

They must describe the architecture directly.

# ARCHITECTURE DECISION RECORDS

Create ADRs or an equivalent decision-record structure for major decisions.

At minimum evaluate decisions for:

* modular monolith versus service-oriented decomposition;
* PostgreSQL as transactional authority;
* Redis responsibilities;
* search architecture;
* asynchronous messaging approach;
* transactional outbox;
* payment integration boundary;
* media architecture;
* authentication/session model;
* authorization model;
* API versioning;
* multi-region direction;
* observability stack;
* infrastructure architecture.

Each important decision should document:

* context;
* decision;
* rationale;
* alternatives considered;
* consequences;
* migration implications.

Do not create ADRs for trivial implementation details.

# ARCHITECTURAL QUALITY REQUIREMENTS

The architecture artifacts must:

* be concrete;
* be internally consistent;
* avoid contradictory ownership;
* avoid duplicate authority;
* identify failure modes;
* identify major scaling boundaries;
* identify security boundaries;
* define integration contracts;
* identify asynchronous operations;
* identify transaction boundaries;
* distinguish source-of-truth data from derived data;
* distinguish initial deployment from long-term scale;
* remain compatible with the selected technology direction.

Do not leave critical decisions as vague statements such as:

* "handle at scale";
* "use caching as needed";
* "use microservices where appropriate";
* "add security";
* "make it highly available."

Replace vague language with explicit architectural decisions.

# NO IMPLEMENTATION PLACEHOLDERS

Architecture artifacts may describe future implementation work, but they must not use fake architecture to hide missing decisions.

Do not use:

* TBD for a decision that must be made now;
* TODO for a required architectural contract;
* "to be determined later" for a foundational boundary;
* pseudo-contracts that omit critical fields;
* fake APIs;
* fake event definitions.

Where a design choice genuinely depends on a later implementation constraint, document:

* the current architectural decision;
* the constraint;
* the allowed variation;
* the compatibility requirements.

# VALIDATION OF ARCHITECTURE ARTIFACTS

After producing the architecture package, validate it for internal consistency.

At minimum verify:

* every major domain has one authoritative owner;
* every major data entity has a clear owner;
* critical transaction boundaries are identified;
* major asynchronous workflows have event or queue boundaries;
* external dependencies have explicit failure behavior;
* API conventions are consistent;
* identifiers are consistent;
* authentication and authorization are consistent;
* cache ownership is clear;
* search is derived from authoritative data;
* media ownership is defined;
* payment boundaries are clear;
* observability spans the major runtime components;
* disaster recovery identifies authoritative and reconstructable systems;
* scaling decisions correspond to actual workloads;
* the architecture does not depend on invisible assumptions from another AI conversation.

# TESTING THE ARCHITECTURE

Architecture validation must include architectural checks where practical.

Create validation material for:

* contract consistency;
* dependency direction;
* domain ownership;
* API conventions;
* event conventions;
* data ownership;
* security boundaries;
* infrastructure dependencies.

Where architecture artifacts can be machine-validated, create appropriate schemas or validation scripts.

Do not create fake tests that claim to validate architecture without actually checking something meaningful.

# DOCUMENTATION QUALITY

All generated architecture artifacts must:

* use consistent terminology;
* use consistent entity names;
* use consistent status names;
* use consistent IDs;
* use consistent event names;
* use consistent API naming;
* use consistent module/service naming;
* clearly distinguish authoritative data from derived data;
* clearly distinguish architecture from implementation;
* clearly identify assumptions.

Do not introduce multiple names for the same business concept without an explicit reason.

# INTEGRATION REQUIREMENTS

The resulting architecture package must be usable by independent implementation agents working in separate conversations.

Therefore, architecture artifacts must explicitly define information that later implementation agents would otherwise have to guess.

Particularly important portable contracts include:

* domain boundaries;
* entity names;
* identifier types;
* key relationships;
* API conventions;
* authentication behavior;
* authorization behavior;
* event envelope;
* event versioning;
* queue conventions;
* Redis key conventions;
* storage conventions;
* search indexing conventions;
* error structure;
* pagination;
* timestamp format;
* configuration naming;
* observability conventions.

Do not rely on this conversation remaining available to later agents.

# IMPLEMENTATION BOUNDARIES FOR FUTURE PROMPTS

This architecture volume must explicitly establish boundaries for later project areas.

Future backend work will be responsible for implementing the server-side domains and contracts.

Future frontend work will be responsible for implementing the web client against the defined contracts.

Future mobile work will be responsible for implementing the mobile clients against the same authoritative domain and API model.

Future infrastructure work will be responsible for implementing infrastructure-as-code and deployment systems corresponding to the architecture.

Future QA work will validate the implemented system and cross-part contracts.

This architecture task itself must not perform those implementations.

# REQUIRED OUTPUT STRUCTURE

Create the architecture package as a coherent portable documentation set.

At minimum produce:

* architecture overview;
* system context;
* component architecture;
* domain architecture;
* domain ownership matrix;
* data architecture;
* transaction and aggregate boundaries;
* API architecture;
* authentication and authorization architecture;
* event and messaging architecture;
* queue architecture;
* cache architecture;
* search architecture;
* media architecture;
* external integrations;
* security;
* privacy;
* observability;
* reliability;
* scalability;
* disaster recovery;
* client architecture;
* administrative architecture;
* analytics architecture;
* cross-cutting contracts;
* ADRs;
* architecture validation documentation.

Use diagrams where they materially improve understanding.

Use text-based or source-controlled diagram formats where practical so that architecture remains portable and maintainable.

# REPOSITORY IMPLEMENTATION DISCIPLINE

If a repository already contains architecture documentation:

* inspect existing artifacts;
* preserve useful content;
* reconcile contradictions;
* avoid generating redundant parallel architecture systems;
* update existing documents when appropriate;
* do not delete valuable project context without reason.

If implementation files already exist:

* inspect them;
* document the actual architecture state;
* avoid claiming that an architecture component exists merely because the desired architecture requires it.

This prompt is responsible for architecture definition, not for disguising the repository's current state.

# TESTING AND VALIDATION REQUIRED BEFORE COMPLETION

Before declaring this architecture volume complete:

1. Validate that all required architecture artifacts exist.
2. Validate that major domains are defined.
3. Validate that ownership boundaries are explicit.
4. Validate transaction boundaries.
5. Validate API conventions.
6. Validate authentication and authorization architecture.
7. Validate events and queue contracts.
8. Validate Redis conventions.
9. Validate search ownership.
10. Validate media ownership.
11. Validate external integration boundaries.
12. Validate security boundaries.
13. Validate observability requirements.
14. Validate reliability strategy.
15. Validate scalability strategy.
16. Validate disaster recovery direction.
17. Validate client/backend compatibility.
18. Validate terminology consistency.
19. Validate that no critical architecture decision remains accidentally ambiguous.
20. Validate that generated artifacts are portable to independent implementation conversations.

Run available documentation or validation tooling where appropriate.

Do not claim a validation was executed if it was not actually executed.

# COMPLETION CRITERIA

Architecture Volume 1 is complete only when:

* the foundational architecture is explicitly defined;
* domains and ownership are clear;
* major components are defined;
* authoritative data boundaries are clear;
* critical transactions are defined;
* API conventions are defined;
* authentication and authorization are defined;
* event and queue boundaries are defined;
* caching strategy is defined;
* search architecture is defined;
* media architecture is defined;
* external integrations are defined;
* security boundaries are defined;
* privacy boundaries are defined;
* observability architecture is defined;
* reliability principles are defined;
* scalability direction is defined;
* disaster recovery direction is defined;
* cross-cutting contracts are documented;
* major architectural decisions are recorded;
* artifacts are portable;
* artifacts are internally consistent;
* no critical architectural requirement is intentionally left as an undefined future decision;
* no backend/frontend/mobile/infrastructure implementation is substituted for architecture work.

# IMPLEMENTATION REPORT

After completing the architecture task, provide a concise completion report containing:

* files created;
* files modified;
* files deleted, if any;
* architecture artifacts produced;
* diagrams produced;
* ADRs produced;
* contracts defined;
* domain boundaries established;
* database/data architecture decisions;
* API architecture decisions;
* event/queue decisions;
* security decisions;
* observability decisions;
* scalability decisions;
* reliability decisions;
* validation performed;
* tests or architecture checks executed;
* repository discrepancies discovered;
* compatibility considerations;
* unresolved issues, if any.

Do not claim that the application itself has been implemented.

Do not claim that production infrastructure has been provisioned.

Do not claim that external services have been successfully integrated merely because architecture documentation references them.

# DEFINITION OF DONE

The task is done only when the repository contains a coherent, portable, implementation-ready foundational architecture package for the Amazon-style ecommerce marketplace.

The package must provide enough concrete information that independent backend, frontend, mobile, infrastructure, and QA implementation agents can work without needing undocumented architectural assumptions.

The architecture must be internally coherent and technically plausible for the stated product scope and scale targets.

The architecture must remain compatible with the defined technology direction.

# FINAL EXECUTION DIRECTIVE

Treat this prompt as an architecture-definition assignment for the Amazon-style ecommerce marketplace.

Do NOT implement the entire application.

Do NOT implement unrelated backend, frontend, mobile, infrastructure, or QA functionality.

Do NOT ask the user to restate the project.

Do NOT ask what architecture should be created.

Do NOT rely on an earlier AI conversation.

Inspect the repository if available and determine its actual state.

Create the complete foundational architecture artifact package defined by this prompt.

Make the architecture concrete enough for independent implementation agents and for later Codex integration.

Preserve existing compatible repository behavior and architecture artifacts where applicable.

Do not fabricate implementation state, external infrastructure, credentials, or service access.

At completion, provide the required implementation report and accurately identify any unresolved architectural constraints.
