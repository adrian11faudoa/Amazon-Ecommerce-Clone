# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 7

# ROLE

You are the Staff Backend Engineering team responsible for implementing the search, discovery, recommendation, analytics-event ingestion, and derived-data backend foundations of a production-grade, globally scalable ecommerce marketplace.

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
* seller operations;
* administration;
* moderation;
* fraud and abuse prevention;
* search and discovery;
* recommendations;
* analytics;
* reporting;
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

Do not assume earlier prompts were executed. Inspect the repository and integrate only with functionality that actually exists.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* catalog;
* categories;
* products;
* variants;
* seller offers;
* pricing;
* promotions;
* inventory;
* carts;
* checkout;
* orders;
* reviews;
* authentication;
* authorization;
* event/outbox infrastructure;
* queues;
* Redis;
* Elasticsearch/OpenSearch;
* analytics/event infrastructure;
* reporting;
* database schema;
* migrations;
* existing search or recommendation functionality;
* tests;
* API documentation.

The repository is authoritative for actual implementation state.

The current prompt defines the required scope.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate systems;
* maintain existing contracts.

Do not fabricate infrastructure, search indexes, analytics pipelines, or recommendation models that are not actually present.

# CURRENT EXECUTION SCOPE

Implement the backend foundation for:

* product search;
* faceted search;
* category browsing;
* seller filtering;
* price filtering;
* attribute filtering;
* relevance sorting;
* deterministic search ranking;
* cursor-based search pagination;
* search-index synchronization;
* index versioning;
* index rebuilds;
* indexing failure recovery;
* search aliases;
* autocomplete/suggestions where appropriate;
* analytics event ingestion;
* product/search behavior events;
* recommendation input signals;
* deterministic recommendation foundations where appropriate;
* derived product metrics;
* search and recommendation caching where justified;
* search/analytics queues;
* search observability;
* tests and validation.

The transactional database remains the authoritative source for catalog and commerce state.

Search, recommendations, analytics, and derived metrics must remain rebuildable or recoverable from authoritative inputs wherever practical.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete web search UI;
* complete mobile search UI;
* production Kubernetes;
* production AWS provisioning;
* a proprietary machine-learning recommendation platform;
* a large-scale data warehouse;
* a full customer data platform;
* unrelated catalog redesign;
* unrelated payment/order functionality;
* a generalized BI system.

The current milestone establishes production-capable backend foundations and deterministic behavior for search, discovery, analytics events, and recommendation inputs.

# ENGINEERING REQUIREMENTS

Search and derived systems must be:

* scalable;
* eventually consistent where appropriate;
* observable;
* rebuildable;
* idempotent;
* tolerant of indexing failures;
* isolated from transactional correctness;
* bounded in resource consumption.

Do not make PostgreSQL transactions depend on search availability.

Do not make order, inventory, or checkout correctness depend on analytics ingestion.

# SEARCH DOMAIN

Establish clear ownership for:

* search query processing;
* search documents;
* indexing;
* autocomplete;
* faceting;
* search configuration;
* index lifecycle.

The search system is derived from authoritative catalog data.

Do not allow search documents to become the transactional source of truth.

# SEARCH DOCUMENT MODEL

Implement the search document representation defined by the project architecture.

A product search document should support fields appropriate to:

* product ID;
* visible product title;
* description;
* category hierarchy;
* attributes;
* variant information;
* seller/offer information where appropriate;
* active pricing information where appropriate;
* currency;
* rating aggregates;
* review count;
* publication state;
* availability indicators;
* searchable identifiers;
* popularity signals;
* timestamps;
* ranking metadata.

Do not index private seller data or security-sensitive information.

# SEARCH DENORMALIZATION

Search documents may denormalize data for performance.

Define clearly:

* source of truth;
* derived fields;
* synchronization source;
* rebuild process.

A search document must always be reconstructable from authoritative application data and permitted derived inputs.

# INDEX VERSIONING

Implement explicit search-index versioning.

Support:

* versioned index names;
* aliases;
* migration/rebuild workflow;
* safe cutover;
* rollback where practical.

Do not overwrite a live index schema incompatibly without a controlled transition.

# INDEX BUILD

Implement an index-building process.

It must support:

* full rebuild;
* incremental indexing;
* bounded batches;
* progress tracking;
* retry;
* failure reporting;
* idempotency.

Do not load an entire catalog into application memory.

# INDEXING PIPELINE

Catalog changes must reach the search index through a reliable pipeline.

Where applicable:

1. catalog state changes;
2. transactional outbox/event is created;
3. event is published;
4. indexing job is queued;
5. worker loads authoritative data;
6. search document is constructed;
7. document is indexed;
8. outcome is recorded;
9. failure is retried or dead-lettered.

Do not build search documents only from incomplete event payloads when authoritative data is required to guarantee correctness.

# SEARCH INDEXING IDEMPOTENCY

Indexing jobs must tolerate:

* duplicate events;
* duplicate jobs;
* retries;
* worker restarts.

A repeated indexing operation must converge on the same search-document state.

# SEARCH DELETE/UNPUBLISH

Implement removal behavior for:

* deleted products;
* archived products;
* unpublished products;
* seller-restricted products;
* moderated products that must no longer appear.

Do not leave inaccessible or unauthorized products searchable indefinitely.

# SEARCH CONSISTENCY

Document and implement expected consistency semantics.

Search may be eventually consistent.

The backend must expose enough state or metadata for clients to understand that newly changed catalog data may not immediately appear in search.

Do not claim strong consistency where the architecture does not provide it.

# SEARCH QUERY API

Implement REST APIs for search and discovery.

Support, as applicable:

* query text;
* category;
* seller;
* price range;
* currency;
* attributes;
* rating;
* publication/availability constraints;
* sorting;
* pagination.

All filters must map to controlled query builders.

Do not permit arbitrary Elasticsearch/OpenSearch DSL from ordinary clients.

# QUERY VALIDATION

Validate:

* maximum query length;
* supported filters;
* allowed sort fields;
* bounded page sizes;
* numeric ranges;
* category identifiers;
* seller identifiers;
* attribute formats.

Reject invalid or abusive requests early.

# SEARCH PAGINATION

Use cursor-based pagination where appropriate.

Define cursor semantics that remain deterministic under changing search results.

Document:

* sort values;
* tie-breaking fields;
* cursor encoding;
* invalid cursor behavior;
* maximum page size.

Do not use offsets that become increasingly expensive on very large result sets when cursor pagination is appropriate.

# SORTING

Support controlled sort modes such as:

* relevance;
* newest;
* price ascending;
* price descending;
* rating;
* popularity where implemented.

Every sort mode must have deterministic tie-breaking.

Do not accept arbitrary field names from clients.

# FACETS

Implement faceted search for applicable catalog dimensions.

Examples include:

* category;
* brand;
* price ranges;
* rating;
* seller;
* product attributes.

Facet data must reflect the currently searchable product set.

Avoid expensive unbounded aggregations when simpler bounded filters are sufficient.

# CATEGORY DISCOVERY

Provide category browsing/search support that can use authoritative category data or an appropriate derived index.

Ensure:

* inactive categories are not exposed improperly;
* hierarchy is consistent;
* category filtering is secure;
* pagination remains bounded where required.

# AUTOCOMPLETE

Where autocomplete is part of the product scope:

* support prefix/suggestion lookup;
* bound query size;
* rate-limit abuse;
* avoid exposing internal data;
* maintain acceptable latency.

Autocomplete data may use a specialized index but must remain derived from authoritative inputs.

# SEARCH RELEVANCE

Implement a deterministic relevance strategy appropriate to the current project maturity.

Consider signals such as:

* textual relevance;
* exact identifier matches;
* category relevance;
* availability;
* rating;
* popularity;
* freshness.

Do not create opaque or impossible-to-maintain ranking logic.

Document ranking inputs and weighting.

# PERSONALIZATION BOUNDARY

Personalized search must not become a prerequisite for ordinary catalog search.

Where user-specific signals are used:

* isolate them from the base relevance model;
* protect privacy;
* provide deterministic fallback;
* do not expose behavioral data to unauthorized parties.

# RECOMMENDATION DOMAIN

Establish the backend boundary for product recommendations.

Recommendations must consume events and derived signals rather than directly modifying transactional commerce state.

Support, as appropriate:

* recently viewed;
* related products;
* frequently purchased together;
* personalized candidates;
* trending products.

# DETERMINISTIC RECOMMENDATION FOUNDATIONS

Implement recommendation foundations that can operate without a complex machine-learning platform.

Possible deterministic strategies include:

* related-category similarity;
* co-occurrence;
* popularity;
* recent purchases;
* recently viewed;
* seller/category affinity.

The implementation must be explicit and testable.

Do not fabricate an ML model.

Do not claim machine-learning personalization when the implementation is deterministic.

# RECOMMENDATION FALLBACKS

Recommendation APIs must gracefully fall back when:

* personalized data is unavailable;
* cache is unavailable;
* recommendation computation fails;
* user is anonymous;
* signal history is insufficient.

Never fail a core product page merely because recommendations are unavailable.

# ANALYTICS EVENT DOMAIN

Implement backend event ingestion for product and commerce behavior required by:

* search analytics;
* recommendations;
* product analytics;
* operational metrics.

Events may include:

* product viewed;
* search performed;
* search result selected;
* category viewed;
* product added to cart;
* product removed from cart;
* checkout started;
* purchase completed;
* product favorited where applicable.

Do not treat analytics events as authoritative commerce commands.

# ANALYTICS EVENT CONTRACT

Each analytics event should contain, where appropriate:

* event ID;
* event type;
* timestamp;
* actor/user reference where permitted;
* anonymous/session reference where applicable;
* product/category/search reference;
* request/correlation ID;
* application/client version where useful;
* safe contextual metadata.

Do not place passwords, tokens, payment credentials, or unnecessary personal content into analytics events.

# ANALYTICS PRIVACY

Respect privacy.

Analytics collection must:

* minimize personal data;
* support configured retention;
* avoid storing secrets;
* avoid uncontrolled raw behavioral payloads;
* support anonymization/deletion policy where required.

Do not log entire request bodies as analytics events.

# ANALYTICS INGESTION

Implement a controlled analytics-ingestion API or internal event interface appropriate to the architecture.

Requirements include:

* bounded payload sizes;
* validation;
* authentication policy appropriate to event type;
* rate limiting;
* deduplication;
* asynchronous processing where necessary.

Do not let analytics ingestion directly execute transactional operations.

# ANALYTICS EVENT IDEMPOTENCY

Use event IDs or equivalent identifiers to prevent duplicate processing.

Consumers must tolerate:

* duplicate events;
* delayed events;
* retries;
* out-of-order delivery where the event semantics permit it.

# ANALYTICS QUEUE

Use asynchronous processing where appropriate.

Jobs must define:

* payload;
* partitioning/grouping strategy where applicable;
* retry;
* backoff;
* idempotency;
* retention;
* dead-letter handling;
* observability.

Do not place unlimited raw events into an unbounded queue.

# DERIVED PRODUCT METRICS

Implement derived metrics that materially support:

* search relevance;
* product discovery;
* recommendations;
* seller analytics.

Possible metrics include:

* views;
* add-to-cart rate;
* purchase count;
* conversion;
* rating;
* review count;
* popularity.

Clearly distinguish:

* raw events;
* derived aggregates;
* operational counters.

# AGGREGATE REBUILDABILITY

Derived metrics must be recoverable.

Document how aggregates can be rebuilt from:

* authoritative transactions;
* retained events;
* periodic snapshots.

Do not create a metric that cannot be reconciled after a worker failure.

# REDIS SEARCH CACHE

Where justified, implement short-lived search/result caching.

Every cached result must define:

* key;
* TTL;
* cache scope;
* invalidation/staleness policy;
* source of truth.

Avoid caching personalized results globally across users.

# SEARCH CACHE SAFETY

Do not allow cache keys to omit security-relevant filters.

A seller-restricted or user-specific result must never be served to an unauthorized consumer because of cache-key collision.

# RECOMMENDATION CACHE

Where recommendations are cached:

* use user-safe keys;
* include meaningful model/version or strategy version;
* set explicit TTL;
* define stale behavior;
* ensure invalidation/versioning for major strategy changes.

# SEARCH FAILURE HANDLING

If Elasticsearch/OpenSearch is unavailable:

* do not corrupt transactional catalog state;
* expose a controlled error or safe fallback;
* record telemetry;
* avoid infinite retries;
* allow indexing to recover asynchronously.

If a safe PostgreSQL-backed fallback is part of the project scope, use only bounded queries suitable for fallback behavior. Do not silently turn a high-scale search API into unrestricted database scanning.

# RECOMMENDATION FAILURE HANDLING

Recommendation failure must degrade gracefully.

Return:

* empty result;
* deterministic fallback;
* previously cached safe result;

according to the project's response contract.

Do not block checkout or order operations.

# SEARCH AUTHORIZATION

Only searchable/public resources may be exposed.

Before indexing or serving data, enforce:

* publication state;
* seller restrictions;
* moderation visibility;
* customer visibility rules.

Private seller/admin resources must never become public search documents.

# SELLER SEARCH

Where seller filtering is allowed:

* only expose searchable/public seller attributes;
* respect seller status;
* exclude suspended/banned sellers where appropriate;
* avoid revealing private verification information.

# CATEGORY FILTERING

Ensure category-based searches respect:

* category state;
* product publication;
* seller visibility;
* authorization.

# PRODUCT AVAILABILITY

Availability may be represented as a derived search field.

It must be treated as approximate unless the architecture explicitly provides stronger guarantees.

Checkout remains responsible for final authoritative availability validation.

# PRICE FILTERING

Search price filters are derived from appropriate current searchable pricing.

Checkout must revalidate actual prices.

Do not treat search price results as authoritative financial data.

# ANALYTICS TO SEARCH/RECOMMENDATIONS

Analytics events may update derived popularity/recommendation signals.

The update path must:

* be asynchronous;
* tolerate duplicate events;
* preserve privacy;
* avoid blocking transactions.

# DATABASE SCHEMA

Implement or extend schema for:

* search synchronization state where required;
* recommendation signals;
* analytics events or event references where appropriate;
* aggregate metrics;
* recommendation cache/version metadata where needed;
* autocomplete source data if database-backed.

Do not attempt to duplicate the entire search index in PostgreSQL.

# SEARCH INFRASTRUCTURE ABSTRACTION

Implement a provider-neutral interface around Elasticsearch/OpenSearch operations where practical.

The domain/application layer should not be tightly coupled to raw provider SDK types.

Support:

* index;
* update;
* delete;
* bulk indexing;
* search;
* aggregate/facet query;
* alias management where applicable.

# SEARCH PROVIDER SECURITY

Search infrastructure must not expose unrestricted access to clients.

Provider credentials must remain server-side.

Do not accept raw search DSL from untrusted clients.

# SEARCH BULK OPERATIONS

Bulk indexing must:

* use bounded batches;
* handle partial failures;
* retry failed documents;
* record metrics;
* avoid loading huge catalogs into memory.

# INDEX REBUILD WORKFLOW

Implement a controlled rebuild process.

A rebuild should:

1. create a versioned target index;
2. process authoritative catalog data in batches;
3. record progress;
4. validate sample/query health where possible;
5. switch an alias atomically;
6. retire old index safely.

Do not delete the active index before the replacement is ready.

# INDEX HEALTH

Implement observability for:

* document count;
* indexing failures;
* job backlog;
* stale index age;
* query latency;
* provider failures;
* partial bulk failures.

# SEARCH QUERY OBSERVABILITY

Measure:

* request count;
* latency;
* error rate;
* zero-result rate;
* cache hit rate;
* query volume;
* provider failures.

Do not store raw search queries indefinitely if they can contain sensitive information.

# SEARCH ABUSE PROTECTION

Protect against:

* automated scraping;
* extreme query lengths;
* expensive combinations of filters;
* excessive autocomplete calls;
* repeated identical abusive requests.

Use:

* rate limiting;
* bounded filters;
* maximum query complexity;
* caching where appropriate.

# ANALYTICS ABUSE PROTECTION

Prevent clients from generating:

* arbitrary event types;
* enormous payloads;
* fake user identity;
* unlimited event throughput.

Validate event types against an explicit allowlist.

# EVENT RETENTION

Define retention strategy for raw analytics events.

Do not retain raw behavior forever.

Differentiate:

* raw event retention;
* derived aggregate retention;
* audit retention.

# REPORTING COMPATIBILITY

Expose derived analytics data through stable internal services so future reporting/admin clients can use it without querying raw event storage directly.

Do not make frontend dashboards depend on implementation-specific event tables.

# API ENDPOINTS

Implement appropriate backend APIs for:

## Search

* search products;
* category discovery;
* autocomplete;
* filters/facets.

## Recommendations

* related products;
* personalized recommendations where supported;
* trending products;
* frequently purchased together where supported.

## Analytics

* event ingestion;
* authenticated internal event retrieval only where necessary.

Do not expose internal raw analytics event storage directly to ordinary customers.

# PAGINATION

All search result endpoints must use bounded pagination.

Recommendations must use bounded result counts.

Analytics administrative retrieval must use bounded pagination if exposed.

# AUTHORIZATION

Search must only expose public/searchable resources.

Recommendations must only return data the current user is authorized to see.

Seller analytics must remain seller-scoped.

Administrative analytics must remain permission-scoped.

# SECURITY

Protect against:

* search injection;
* arbitrary provider query DSL;
* cache poisoning;
* analytics spoofing;
* data leakage;
* cross-user recommendation leakage;
* seller analytics IDOR;
* unauthorized raw event access.

Never trust client-provided seller identifiers for authorization.

# OBSERVABILITY

Instrument:

* search requests;
* search-provider calls;
* indexing jobs;
* rebuild jobs;
* recommendation requests;
* analytics ingestion;
* queue processing;
* cache hits/misses;
* provider failures.

Use consistent:

* request IDs;
* correlation IDs;
* event IDs;
* search operation names.

Never log secret provider credentials.

# METRICS

Track meaningful metrics including:

* search latency;
* search errors;
* zero-result percentage;
* indexing latency;
* indexing failure rate;
* index staleness;
* rebuild duration;
* autocomplete latency;
* recommendation latency;
* recommendation fallback rate;
* analytics ingestion rate;
* analytics rejection rate;
* queue backlog;
* cache hit ratio.

Avoid high-cardinality labels containing raw queries, user IDs, or unrestricted product IDs.

# RELIABILITY

The derived systems must tolerate:

* duplicate events;
* delayed events;
* provider outages;
* bulk indexing failure;
* worker restarts;
* partial batch failures;
* cache loss;
* index corruption requiring rebuild.

The authoritative transactional system must remain correct during search/analytics outages.

# PERFORMANCE

Optimize for:

* low-latency product search;
* bounded aggregations;
* efficient bulk indexing;
* asynchronous event processing;
* cache reuse;
* controlled query complexity;
* efficient recommendation retrieval.

Do not perform database scans on every search request.

# SEARCH DATA FRESHNESS

Expose or internally monitor index freshness.

Define the acceptable stale-data window for:

* product publication;
* price updates;
* seller restrictions;
* moderation visibility.

Critical transactions must always use authoritative current data.

# RECOMMENDATION DATA FRESHNESS

Define freshness expectations for:

* trending;
* related;
* recently viewed;
* personalized signals.

Prefer stale-but-safe recommendations over failing a primary product workflow.

# DOCUMENTATION

Update documentation covering:

* search APIs;
* search document schema;
* index lifecycle;
* indexing queues;
* rebuild procedure;
* search ranking;
* autocomplete;
* recommendation strategies;
* analytics event contract;
* retention;
* privacy;
* cache policy;
* operational recovery.

Documentation must describe actual implementation.

# TESTING

Create meaningful tests.

## Search

Test:

* query validation;
* text search;
* filters;
* facets;
* sorting;
* pagination;
* seller isolation;
* publication filtering;
* unpublished product removal;
* zero-result behavior;
* provider failure;
* index update;
* duplicate indexing;
* rebuild workflow.

## Autocomplete

Test:

* validation;
* bounded results;
* abusive input;
* rate limiting;
* provider failure.

## Recommendations

Test:

* deterministic recommendation strategies;
* fallback;
* anonymous behavior;
* personalization isolation;
* cache correctness;
* duplicate-event effects.

## Analytics

Test:

* valid event ingestion;
* invalid event rejection;
* event deduplication;
* rate limiting;
* payload bounds;
* asynchronous processing;
* aggregate updates.

## Security

Test:

* raw DSL injection;
* cache isolation;
* seller analytics IDOR;
* unauthorized event access;
* private product leakage.

## Reliability

Test:

* provider outage;
* worker retry;
* partial bulk failure;
* index rebuild interruption;
* duplicate event processing.

# MIGRATIONS

Create deterministic migrations for schema changes in this scope.

Preserve existing data.

Avoid unrelated destructive operations.

# NO FAKE COMPLETENESS

Do not use:

* fake search results;
* fake recommendation models;
* fake analytics;
* placeholder provider calls;
* TODO implementation gaps;
* pseudo-code;
* omitted indexing logic;
* "implement later."

Complete the actual scope of this prompt.

# NO HARDCODED SECRETS

Never hardcode:

* Elasticsearch/OpenSearch credentials;
* analytics credentials;
* Redis credentials;
* database credentials;
* API keys;
* private keys.

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
* OpenAPI validation;
* search-provider-compatible tests where possible;
* event-schema validation;
* queue tests.

Where live search infrastructure is unavailable:

* execute local/test-container or mock-provider validation;
* validate query construction and serialization;
* report exactly what could not be live-tested.

Do not claim live search-provider validation without evidence.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* search modules;
* index schemas;
* index lifecycle;
* indexing workers;
* search APIs;
* autocomplete changes;
* recommendation changes;
* analytics ingestion;
* derived metrics;
* database changes;
* migrations;
* events;
* queue/jobs;
* Redis changes;
* authorization/security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* compatibility considerations;
* unresolved issues;
* external search/analytics dependencies.

Do not claim that a full ML recommendation engine or production search cluster was provisioned unless it actually was.

# DEFINITION OF DONE

This milestone is complete only when:

* authoritative catalog data can be indexed;
* search documents are explicitly defined;
* incremental indexing is implemented;
* duplicate indexing is safe;
* full index rebuild is implemented;
* index versioning/aliases are handled appropriately;
* search APIs are implemented;
* filters and facets are bounded;
* cursor pagination is implemented;
* autocomplete is implemented where applicable;
* search visibility rules are enforced;
* deterministic recommendation foundations are implemented;
* recommendation fallbacks work;
* analytics event ingestion is implemented;
* analytics events are validated and deduplicated;
* derived metrics are implemented where required;
* search/recommendation caches are safe;
* observability is present;
* search/indexing failures are recoverable;
* security boundaries are enforced;
* migrations are valid;
* critical behavior is tested;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the search, discovery, recommendation-foundation, analytics-event, and derived-data backend scope defined by this prompt.

Do not implement a full machine-learning recommendation platform, data warehouse, frontend, mobile client, or production cloud infrastructure.

Treat PostgreSQL/domain data as authoritative and search/recommendation/analytics systems as derived.

Do not accept arbitrary search-provider DSL from clients.

Do not hardcode secrets.

Do not fabricate search clusters, analytics infrastructure, or external service access.

Do not leave intentional placeholders, TODO implementation gaps, fake search behavior, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
