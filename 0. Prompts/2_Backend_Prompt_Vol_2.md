# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 2

# ROLE

You are the Staff Backend Engineering team responsible for implementing the catalog, seller commerce, product, category, pricing, promotion, and media foundations of a production-grade, globally scalable ecommerce marketplace.

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
* product variants;
* SKUs;
* categories;
* product attributes;
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
* Stripe or equivalent payment abstraction
* OpenTelemetry-compatible observability

The preceding backend foundation is expected to provide reusable identity, organization, authentication, authorization, configuration, persistence, Redis, error handling, and observability capabilities where those capabilities are actually present in the repository.

This prompt does not assume that an earlier AI prompt was executed. Inspect the repository and integrate with what actually exists.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine:

* current NestJS structure;
* existing domain modules;
* Prisma schema;
* migrations;
* authentication and authorization implementation;
* seller organization implementation;
* configuration;
* Redis integration;
* API conventions;
* error contracts;
* audit infrastructure;
* logging/tracing;
* tests;
* existing catalog or product functionality;
* existing media/storage abstractions.

The repository is authoritative for actual implementation state.

The project contracts defined by this prompt are authoritative for the current scope.

If the repository already implements part of this scope:

* preserve compatible behavior;
* extend existing modules instead of duplicating them;
* reconcile implementation details with the canonical contracts;
* avoid unnecessary rewrites.

Do not claim that anything exists unless repository inspection verifies it.

# CURRENT EXECUTION SCOPE

Implement the backend foundation for:

* seller catalog ownership;
* categories;
* products;
* product variants;
* SKUs;
* product attributes;
* seller offers;
* product publication lifecycle;
* base pricing;
* promotional pricing foundations;
* product media metadata;
* secure object-storage upload orchestration;
* catalog authorization;
* catalog validation;
* catalog APIs;
* catalog auditability;
* catalog events;
* asynchronous search-indexing foundations;
* catalog-related Redis usage where justified;
* tests and validation for this scope.

The implementation must establish the transactional source of truth required for later:

* inventory;
* carts;
* checkout;
* orders;
* search;
* reviews;
* analytics;
* moderation.

Do not implement those future domains in this milestone.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* inventory reservation;
* inventory availability management;
* shopping carts;
* checkout;
* payment processing;
* orders;
* fulfillment;
* shipments;
* returns;
* refunds;
* review submission;
* recommendation engines;
* complete search querying;
* complete seller settlement;
* customer web UI;
* mobile UI;
* production Kubernetes;
* production AWS provisioning;
* complete analytics pipelines;
* complete moderation workflows.

This prompt may create the events, schemas, interfaces, and derived-data contracts needed by those future domains, but must not implement their unrelated business logic.

# ENGINEERING REQUIREMENTS

The implementation must be:

* production-grade;
* strongly typed;
* modular;
* transactional where required;
* authorization-aware;
* seller-isolated;
* observable;
* testable;
* migration-safe;
* horizontally scalable;
* compatible with future inventory and order workflows.

Catalog data must be treated as authoritative transactional data.

Search indexes, caches, media variants, and other derived artifacts must not become the authoritative product source of truth.

# DOMAIN BOUNDARIES

Establish clear boundaries between:

* Seller Organization
* Catalog
* Product
* Product Variant
* SKU
* Category
* Product Attribute
* Seller Offer
* Pricing
* Promotion
* Media

Do not collapse these concepts into one generic entity merely for implementation convenience.

The exact module organization may differ according to the existing repository, but domain ownership must remain explicit.

# SELLER CATALOG OWNERSHIP

Implement seller-scoped catalog ownership.

Every seller-controlled catalog operation must evaluate:

* authenticated user;
* seller organization membership;
* required permission;
* target resource ownership.

A seller must not be able to read or modify another seller's protected catalog resources by manipulating IDs or organization parameters.

Administrative access must be explicitly authorized.

# CATALOG DATA MODEL

Implement the transactional data model required for the current catalog scope.

At minimum evaluate support for:

* Category
* Product
* ProductVariant
* SKU
* ProductAttribute / AttributeDefinition where needed
* SellerOffer
* Price
* Promotion
* MediaAsset
* ProductPublication state

The exact entities and relations must reflect the actual marketplace model established by the repository and project contracts.

Do not create duplicate concepts when an existing compatible model already exists.

# PRODUCT MODEL

Implement the product aggregate with appropriate fields for:

* stable product ID;
* seller or catalog ownership semantics;
* title;
* description;
* brand where applicable;
* category;
* attribute values;
* publication state;
* moderation state where the current scope requires a minimal state;
* timestamps;
* audit metadata where appropriate.

Do not store mutable presentation data that belongs to separate derived systems unless there is a clear reason.

# PRODUCT VARIANT MODEL

Implement product variants for products that have variable characteristics.

Support, where appropriate:

* stable variant ID;
* parent product;
* variant attributes;
* SKU relationship;
* media relationships where appropriate;
* publication state;
* timestamps.

Variant attribute combinations must be validated to avoid ambiguous duplicate variants.

For example, if a product has size and color dimensions, two active variants must not unintentionally represent the same combination.

# SKU MODEL

Implement the SKU concept as the transactional identifier for an orderable product variant or seller-specific offer as required by the marketplace model.

The model must provide:

* stable internal identifier;
* human/business SKU code where applicable;
* ownership relationship;
* variant relationship;
* active/inactive lifecycle;
* uniqueness constraints appropriate to seller scope;
* timestamps.

Do not assume SKU codes are globally unique unless the business model explicitly requires it.

# CATEGORY MODEL

Implement hierarchical categories.

Support:

* stable category ID;
* name;
* slug;
* parent category;
* publication/active state;
* ordering metadata where appropriate;
* timestamps.

Prevent invalid structures such as:

* cycles;
* a category being its own parent;
* invalid ancestor relationships.

Define appropriate uniqueness rules.

Do not implement an unrestricted arbitrary graph.

# CATEGORY HIERARCHY

Support category trees with controlled depth or a clearly defined operational strategy.

Avoid recursive database behavior that becomes inefficient for common catalog operations.

Where hierarchical queries are required, use an explicit strategy appropriate to PostgreSQL and Prisma.

Do not use unbounded recursive queries in ordinary product listing requests.

# PRODUCT ATTRIBUTES

Implement a flexible attribute model appropriate to marketplace catalogs.

Where required, support:

* attribute definition;
* attribute type;
* allowed values;
* product-level values;
* variant-level values;
* validation rules;
* searchable/filterable metadata where appropriate.

The system must prevent invalid attribute values from being accepted when the category or product configuration imposes restrictions.

Do not create an untyped JSON-only catalog model if it would prevent validation and efficient querying of important attributes.

JSON fields may be used selectively for genuinely flexible metadata.

# SELLER OFFERS

Separate shared product information from seller-specific commercial information where the marketplace model requires it.

A seller offer may include:

* seller;
* product/variant reference;
* SKU;
* seller-specific price;
* seller-specific status;
* seller-specific condition where applicable;
* seller-specific fulfillment metadata where appropriate.

Do not permit one seller to modify another seller's offer.

If the project supports multiple sellers offering the same logical product, maintain explicit ownership of offer-specific data.

# PRODUCT LIFECYCLE

Implement explicit product lifecycle states appropriate to the current scope.

At minimum distinguish concepts such as:

* draft;
* pending review where applicable;
* active/published;
* unpublished/paused;
* archived.

State transitions must have:

* valid actors;
* authorization;
* validation rules;
* audit events;
* emitted domain events where appropriate.

Do not allow arbitrary direct status mutation from client input.

# PRODUCT PUBLICATION

Publication must validate required product state before activating a product or offer.

Validate as appropriate:

* required title;
* required category;
* required variant/SKU information;
* required media where business rules require it;
* valid seller ownership;
* required attribute values;
* valid price configuration where publication depends on price;
* moderation state where applicable.

Do not publish an invalid entity merely because a caller explicitly requested publication.

# PRODUCT UPDATE SEMANTICS

Separate:

* mutable product fields;
* immutable identity;
* fields requiring reindexing;
* fields requiring audit;
* fields requiring publication-state transitions.

Avoid allowing a generic update endpoint to bypass domain invariants.

Use explicit command behavior for high-risk transitions.

# PRICING FOUNDATION

Implement a canonical pricing foundation.

Support, where applicable:

* base price;
* currency;
* seller ownership;
* effective dates;
* active/inactive state;
* price history or auditability;
* product/offer association.

Use exact monetary representations.

Never use binary floating-point values for authoritative monetary calculations.

# PRICE VALIDATION

Validate:

* currency;
* nonnegative or domain-valid monetary values;
* effective-date ranges;
* seller ownership;
* duplicate active-price conditions;
* allowed transitions.

Do not allow overlapping active price definitions unless the pricing model explicitly supports deterministic precedence.

# PROMOTION FOUNDATION

Implement the data and business-rule foundation for promotions.

Support, as applicable:

* promotion identity;
* seller ownership;
* scope;
* start time;
* end time;
* active state;
* percentage or fixed discount;
* eligibility restrictions;
* usage limits where appropriate.

Do not implement the complete checkout-time promotion engine.

The current scope establishes the authoritative promotion definitions that a later checkout implementation can consume.

# PROMOTION SAFETY

Validate:

* date ranges;
* discount limits;
* seller ownership;
* incompatible rule combinations;
* activation/deactivation permissions.

Never allow discounts to produce undefined or invalid monetary values.

# MEDIA METADATA

Implement media metadata attached to catalog entities.

Support:

* media asset ID;
* owner;
* asset type;
* storage key;
* MIME/type metadata;
* size;
* checksum where available;
* processing state;
* visibility;
* created/updated timestamps.

Do not store binary media in PostgreSQL unless the architecture explicitly requires it.

# OBJECT-STORAGE UPLOAD FLOW

Implement the repository-side orchestration needed for secure product-media uploads.

The flow must support:

1. authenticated authorization;
2. seller/resource ownership validation;
3. requested media metadata validation;
4. creation of controlled upload intent;
5. generation of a short-lived signed upload mechanism through the selected storage abstraction;
6. persistence of expected upload metadata;
7. subsequent confirmation/finalization;
8. media lifecycle state transition.

Never expose permanent object-storage credentials to clients.

Do not claim that the file was successfully uploaded if the external storage operation was not actually executed.

# UPLOAD SECURITY

Treat uploads as untrusted input.

Validate:

* size limits;
* allowed content types;
* extension/content consistency where feasible;
* ownership;
* upload expiration;
* storage prefix;
* server-generated keys.

Do not trust a client-provided storage path.

Do not allow arbitrary bucket or object-key selection.

# MEDIA FINALIZATION

Implement a safe media-finalization boundary.

The server must verify appropriate properties before marking an asset usable, such as:

* expected object existence where verification is possible;
* size;
* content type;
* checksum where supported;
* ownership;
* upload expiration;
* processing status.

If processing occurs asynchronously, represent that lifecycle explicitly rather than claiming completion prematurely.

# MEDIA DELETION

Implement catalog-scoped media deletion behavior.

Deleting media metadata must not automatically imply unrestricted object deletion if the object lifecycle has dependencies.

Where actual object deletion is required:

* authorize it;
* make it idempotent;
* record the state change;
* handle provider failures;
* support reconciliation.

# CATALOG API

Implement the REST API needed for this scope.

The API must follow the project's canonical conventions.

Provide appropriate endpoints for:

* seller product creation;
* product retrieval;
* seller-scoped product listing;
* product update;
* publication/unpublication;
* category management;
* variant management;
* seller offer management;
* pricing management;
* promotion management;
* media-upload intent;
* media finalization;
* media deletion.

Do not create endpoints for future domains outside this milestone.

# CUSTOMER-FACING READ API BOUNDARY

Where a public product-read surface is required by the current architecture, expose only publishable data.

Do not expose:

* seller-internal fields;
* moderation data;
* private pricing configuration;
* internal storage paths;
* authorization metadata;
* audit information.

Seller administration APIs and public catalog APIs must have separate authorization and response models.

# API VALIDATION

Validate:

* UUID/identifier formats where applicable;
* text lengths;
* required fields;
* monetary fields;
* currency codes;
* category relationships;
* variant combinations;
* SKU uniqueness;
* date ranges;
* media metadata;
* promotion rules.

Reject malformed input before domain logic and avoid relying solely on database errors.

# ERROR HANDLING

Use stable, machine-readable error codes.

Support appropriate categories such as:

* invalid product data;
* invalid category;
* duplicate SKU;
* duplicate variant;
* invalid state transition;
* seller ownership violation;
* authorization failure;
* resource not found;
* conflicting price;
* invalid promotion;
* media upload conflict;
* external storage failure.

Do not expose database or storage-provider internals.

# AUTHORIZATION

Use the existing repository authorization foundation when available.

Catalog actions must verify:

* authenticated identity;
* seller organization membership;
* relevant permission;
* resource ownership.

Administrative operations must be explicitly authorized.

Do not infer authorization merely because an entity ID appears in the request.

# SELLER ISOLATION TESTING

Include tests proving that:

* seller A cannot retrieve seller B's private catalog data;
* seller A cannot update seller B's products;
* seller A cannot modify seller B's offers;
* seller A cannot generate upload permissions for seller B's resources;
* seller A cannot manipulate seller B's promotions;
* administrative users can perform explicitly authorized operations.

These checks must occur server-side.

# DATABASE DESIGN

Create or update Prisma models and migrations for this scope.

Use:

* primary keys;
* foreign keys;
* uniqueness constraints;
* appropriate indexes;
* check constraints where PostgreSQL can enforce important invariants;
* timestamps;
* explicit nullable behavior.

Do not duplicate a database concept because a separate module wants a different name.

# PRODUCT INDEXING

Add indexes corresponding to actual catalog access patterns.

Evaluate indexes for:

* seller ownership;
* publication state;
* category;
* slug;
* SKU;
* product/variant relationships;
* offer lookup;
* active prices;
* promotion dates;
* media ownership.

Avoid indiscriminate indexing.

# DATA INTEGRITY

Use database constraints for invariants that must never be violated.

Examples include:

* unique seller-scoped SKU;
* unique category slug where required;
* unique variant attribute combination where representable;
* valid foreign keys;
* nonnegative quantities/values where appropriate;
* mutually exclusive lifecycle relationships.

Application validation must complement database constraints rather than replace them.

# TRANSACTIONS

Use transactions for multi-write operations whose integrity depends on atomicity.

Examples:

* product creation with required variants;
* product publication state transition plus audit record;
* price replacement;
* seller-offer changes;
* promotion activation where multiple records change;
* media finalization metadata changes.

Do not create unnecessarily large transactions around external network calls.

Never hold database transactions open while waiting for external storage operations.

# CONCURRENCY

Catalog operations must remain correct under concurrent requests.

Handle:

* duplicate product creation;
* duplicate SKU creation;
* simultaneous variant creation;
* concurrent price activation;
* concurrent publication;
* repeated media finalization;
* repeated promotion activation.

Use database constraints and transaction isolation appropriately.

Do not rely on application-side existence checks alone.

# IDEMPOTENCY

Use idempotent behavior where repeated operations are expected.

Important examples include:

* media-finalization requests;
* publication/unpublication;
* price activation where appropriate;
* webhook/event-driven catalog updates;
* asynchronous indexing jobs.

Do not create artificial idempotency contracts where ordinary resource replacement semantics are sufficient.

# EVENT ARCHITECTURE

Emit appropriate catalog events when durable business changes occur.

Examples include:

* ProductCreated
* ProductUpdated
* ProductPublished
* ProductUnpublished
* ProductArchived
* ProductVariantCreated
* ProductVariantUpdated
* OfferCreated
* OfferUpdated
* PriceChanged
* PromotionActivated
* PromotionDeactivated
* MediaAssetCreated
* MediaAssetReady
* MediaAssetRemoved
* CategoryChanged

Use the project's canonical event envelope.

Each event must have:

* stable event type;
* version;
* event ID;
* aggregate identity;
* producer;
* timestamp;
* correlation ID where available;
* safe payload.

Do not expose unnecessary personal or security-sensitive information.

# TRANSACTIONAL OUTBOX

Where catalog state changes must reliably produce events:

* perform domain state mutation and outbox insertion atomically;
* publish asynchronously;
* support retries;
* tolerate duplicate delivery;
* record publication state where required;
* monitor failures.

Do not publish critical events directly from application memory after the database commit if doing so can lose events.

# SEARCH INDEXING FOUNDATION

Implement the backend foundation needed to propagate catalog changes to the search subsystem.

This may include:

* search-indexing event producers;
* queue/job definitions;
* indexing payload construction;
* indexing worker foundation;
* retry behavior;
* idempotency.

The current milestone must not become the complete search-query implementation.

# SEARCH PAYLOAD

Define the catalog-to-search representation.

Ensure that the index payload contains only information appropriate for search.

Distinguish:

* authoritative product data;
* denormalized search data;
* derived ranking data.

Search documents must be rebuildable from authoritative catalog data.

# SEARCH FAILURE BEHAVIOR

If search indexing fails:

* do not roll back already committed catalog data merely because a derived index is unavailable;
* record failure;
* retry appropriately;
* expose operational visibility;
* prevent infinite retry loops;
* support eventual reconciliation.

Catalog correctness must not depend on search availability.

# REDIS USAGE

Only introduce Redis usage that materially supports the current catalog scope.

Appropriate use cases may include:

* short-lived catalog cache;
* rate limiting;
* distributed coordination where truly necessary;
* temporary media-upload state if justified.

Define key namespaces and TTLs.

Do not cache authoritative product state in a way that can silently become the source of truth.

# CACHE INVALIDATION

For any catalog cache introduced:

* define the source of truth;
* define cache keys;
* define TTL;
* define invalidation triggers;
* define stale behavior;
* define failure behavior.

Do not introduce a cache that cannot be safely invalidated.

# MEDIA STORAGE INTEGRATION

Implement a storage abstraction rather than coupling catalog services directly to a provider SDK wherever practical.

The abstraction should support:

* signed upload;
* metadata inspection;
* object deletion;
* controlled URL generation;
* provider error translation.

Provider credentials must come from secure configuration.

# EXTERNAL STORAGE FAILURE

Storage provider failures must produce:

* stable internal error classification;
* secure telemetry;
* retry behavior where safe;
* no exposure of provider credentials or raw response details.

Do not report a media upload as completed when the storage provider did not confirm it.

# API PAGINATION

Seller catalog listing APIs must support bounded pagination.

Use cursor pagination where appropriate for large mutable catalogs.

Define:

* sort order;
* cursor;
* page size;
* maximum page size;
* filtering;
* invalid-cursor behavior.

Never expose unrestricted catalog queries.

# FILTERING AND SORTING

Catalog APIs may support filters such as:

* publication state;
* category;
* seller;
* updated time;
* SKU;
* status.

Only expose filters that have corresponding bounded database access paths.

Do not construct arbitrary user-provided SQL or unbounded sorting.

# SLUGS

If public product/category URLs use slugs:

* define normalization;
* define uniqueness scope;
* define conflict handling;
* define update behavior;
* avoid using mutable slugs as authoritative identifiers.

Do not allow slug changes to silently break durable internal references.

# AUDITABILITY

Audit appropriate catalog operations including:

* product creation;
* sensitive product updates;
* publication;
* unpublication;
* deletion/archival;
* offer changes;
* price changes;
* promotion activation;
* category changes;
* media deletion.

Record:

* actor;
* organization;
* action;
* target;
* timestamp;
* outcome;
* request/correlation ID;
* safe metadata.

Never store secrets or raw authentication credentials.

# MODERATION BOUNDARY

If publication requires moderation in the target architecture, implement only the minimal state and authorization hooks needed for the catalog lifecycle.

Do not implement the complete moderation system.

Ensure that later moderation functionality can consume the appropriate product lifecycle state and events.

# ADMIN OVERRIDE BOUNDARY

If administrators can modify seller catalog data:

* use explicit authorization;
* record actor identity;
* audit the operation;
* retain seller ownership metadata;
* prevent the override mechanism from becoming an untracked bypass.

# DATA PRIVACY

Do not expose seller-private or internal catalog metadata through customer-facing APIs.

Where product descriptions or seller information can contain user-generated text, treat the content as untrusted input.

Store only the personal/business information needed for the current scope.

# SERIALIZATION

Use explicit API response DTOs.

Do not return Prisma models directly.

Prevent accidental exposure of:

* internal IDs not meant for clients;
* ownership metadata;
* private seller fields;
* audit records;
* storage credentials;
* internal object keys where inappropriate;
* moderation internals.

# OBSERVABILITY

Instrument:

* catalog API requests;
* authorization failures;
* product publication;
* pricing changes;
* search-indexing jobs;
* media processing/upload workflows;
* database errors;
* Redis operations where relevant;
* object-storage calls;
* queue processing.

Use structured logs and trace propagation.

Do not log:

* signed URLs if they contain sensitive authorization material beyond what is operationally necessary;
* storage credentials;
* private seller data unnecessarily;
* user authentication tokens.

# METRICS

Provide meaningful metrics such as:

* product creation failures;
* publication failures;
* catalog API latency;
* authorization failures;
* indexing queue depth;
* indexing failures;
* media upload failures;
* media finalization latency;
* storage-provider errors;
* price-update failures.

Avoid uncontrolled high-cardinality metric labels.

# RELIABILITY

Catalog operations must tolerate:

* duplicate requests;
* concurrent updates;
* database failures;
* Redis failures;
* search failures;
* storage failures;
* worker restarts.

Critical catalog state must remain correct even if derived systems are temporarily unavailable.

# BACKGROUND JOBS

Implement only the asynchronous jobs required by this scope.

Likely jobs include:

* search-index synchronization;
* media processing/finalization;
* cleanup of expired upload intents.

Each job must define:

* payload;
* retry policy;
* timeout;
* backoff;
* concurrency;
* idempotency;
* failure handling;
* observability.

# MEDIA CLEANUP

Expired or abandoned upload intents must have a cleanup path where practical.

Cleanup must be:

* bounded;
* idempotent;
* observable;
* safe against deleting objects still referenced by active entities.

# PRODUCT ARCHIVAL

Define archival behavior so that catalog records can be removed from active customer-facing surfaces without destroying historical references required by future orders or analytics.

Do not physically delete business data merely because it is no longer active.

# FUTURE ORDER COMPATIBILITY

Catalog data must remain suitable for future order snapshots.

Order processing will eventually need immutable or reproducible representations of:

* product name;
* seller identity;
* SKU;
* variant attributes;
* unit price;
* applied discounts;
* currency;
* relevant tax/shipping context.

This milestone does not implement order snapshots, but the catalog model must not make them impossible.

# FUTURE INVENTORY COMPATIBILITY

The catalog model must allow later inventory implementation to attach inventory ownership to appropriate:

* SKU;
* seller offer;
* fulfillment unit.

Do not place mutable availability state into product descriptions or presentation tables.

# FUTURE CHECKOUT COMPATIBILITY

Pricing APIs and models must make it possible for checkout to:

* validate current prices;
* identify currency;
* identify active offers;
* evaluate promotions;
* determine whether a price is stale.

Do not make checkout depend on mutable UI state.

# API DOCUMENTATION

Document the APIs implemented in this milestone using the project's canonical OpenAPI tooling.

Documentation must accurately represent:

* request schemas;
* response schemas;
* authentication;
* authorization;
* errors;
* pagination;
* lifecycle operations.

Do not document endpoints that do not exist.

# TESTING

Create meaningful tests covering the actual catalog behavior.

## Products

Test:

* product creation;
* invalid product data;
* seller ownership;
* product update;
* publication validation;
* valid publication;
* unpublication;
* archival.

## Variants and SKUs

Test:

* variant creation;
* duplicate combinations;
* SKU uniqueness;
* invalid variant data;
* seller isolation.

## Categories

Test:

* creation;
* hierarchy;
* duplicate slug;
* cycle prevention;
* authorization;
* retrieval.

## Offers

Test:

* seller-specific ownership;
* creation;
* update;
* duplicate offer constraints;
* cross-seller isolation.

## Pricing

Test:

* valid prices;
* invalid prices;
* currency;
* active-price constraints;
* concurrent updates.

## Promotions

Test:

* valid promotion;
* invalid dates;
* invalid discount;
* seller isolation;
* activation/deactivation.

## Media

Test:

* upload-intent authorization;
* invalid file metadata;
* ownership;
* finalization;
* repeated finalization;
* deletion authorization;
* provider failure handling where mockable.

## Events and Jobs

Test:

* outbox creation;
* event schema;
* retry behavior;
* duplicate handling;
* indexing job creation;
* indexing failure handling.

## API

Test:

* validation;
* authorization;
* pagination;
* structured errors.

Tests must validate behavior, not merely controller invocation.

# DATABASE MIGRATIONS

Create migrations for all schema changes within this scope.

Migrations must be:

* deterministic;
* production-conscious;
* correctly constrained;
* indexed according to access patterns;
* compatible with existing data where applicable.

Do not perform destructive migrations on unrelated domains.

# DATA MIGRATION SAFETY

If existing repository data must be transformed:

* inspect current production-relevant schema assumptions;
* use an explicit migration;
* preserve existing data;
* make the migration repeat-safe where appropriate;
* document irreversible steps.

Do not silently delete or reinterpret existing catalog data.

# PERFORMANCE

Catalog reads and seller operations must use bounded queries.

Avoid:

* N+1 queries;
* unbounded category-tree loads;
* fetching all seller products;
* loading full media metadata unnecessarily;
* arbitrary JSON scans for common filters.

Use:

* appropriate indexes;
* projection/selects;
* pagination;
* batching where appropriate.

# CONCURRENCY

Verify correct behavior for:

* simultaneous publication;
* duplicate SKU creation;
* concurrent price replacement;
* concurrent media finalization;
* simultaneous category modification where hierarchy constraints apply.

Use database constraints and transactions to establish correctness.

# CODE QUALITY

Use:

* strict TypeScript;
* explicit DTOs;
* clear domain services;
* dependency injection;
* repository/data-access boundaries;
* transaction-aware services;
* deterministic validation;
* testable abstractions.

Do not place business logic in controllers.

Do not scatter ownership checks across random utility functions.

Centralize security-sensitive authorization patterns.

# NO FAKE COMPLETENESS

Do not use:

* fake catalog persistence;
* fake media storage;
* fake pricing;
* fake search synchronization;
* placeholder APIs;
* TODO-only business logic;
* pseudo-code;
* commented-out implementations;
* "implement later";
* "remaining code omitted";
* "for brevity".

Complete all functionality within the scope of this prompt.

# NO HARDCODED SECRETS

Never hardcode:

* storage credentials;
* AWS keys;
* signing keys;
* database credentials;
* Redis credentials;
* search credentials;
* API keys;
* payment credentials.

Use secure configuration.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* type checking;
* unit tests;
* integration tests;
* migration validation;
* build;
* API/OpenAPI validation;
* schema validation where applicable.

If external object storage or search infrastructure cannot be accessed:

* run all possible local validation;
* validate the integration abstraction;
* use appropriate test doubles for local tests;
* clearly report what could not be live-validated.

Never claim live provider validation without evidence.

# DOCUMENTATION

Update documentation for:

* catalog domain behavior;
* category model;
* product model;
* seller ownership;
* API endpoints;
* pricing;
* promotions;
* media storage;
* event contracts;
* queue jobs;
* configuration;
* migrations;
* operational behavior.

Documentation must describe the actual implementation.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* modules created or changed;
* database schema changes;
* migrations;
* API endpoints;
* product/category/variant/SKU changes;
* offer changes;
* pricing changes;
* promotion changes;
* media changes;
* storage changes;
* event changes;
* queue changes;
* Redis changes;
* security/authorization changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* compatibility considerations;
* unresolved issues;
* external dependencies requiring configuration.

Do not claim that inventory, checkout, orders, payments, shipping, reviews, or search querying were implemented unless they genuinely belong to and were completed within this prompt's scope.

# DEFINITION OF DONE

This milestone is complete only when:

* catalog persistence is implemented;
* seller ownership is enforced;
* product lifecycle is implemented;
* variants are implemented;
* SKU integrity is enforced;
* categories are implemented;
* catalog attributes are implemented where required;
* seller offers are implemented;
* pricing foundation is implemented;
* promotion foundation is implemented;
* media metadata is implemented;
* secure upload orchestration is implemented;
* catalog APIs are implemented;
* catalog authorization is enforced;
* catalog events are implemented;
* required outbox behavior is implemented;
* search-indexing foundations required by this scope are implemented;
* required background jobs are implemented;
* observability is present;
* migrations are valid;
* tests cover critical behavior;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the catalog, seller commerce, pricing, promotion, and media backend scope defined by this prompt.

Do not implement inventory, checkout, orders, payments, shipping, returns, reviews, or unrelated application domains.

Preserve compatible existing functionality.

Enforce seller isolation and server-side authorization.

Treat PostgreSQL as the authoritative transactional source of truth.

Treat search, caches, media derivatives, and asynchronous processing as derived or auxiliary systems unless explicitly specified otherwise.

Do not fabricate external storage or search infrastructure.

Do not hardcode secrets.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation.

Provide the required completion report accurately describing actual repository changes and external dependencies.
