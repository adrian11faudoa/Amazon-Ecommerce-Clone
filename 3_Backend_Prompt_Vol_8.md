# Amazon Ecommerce Marketplace — Backend Prompt — Volume 8

## Search, Elasticsearch/OpenSearch, Indexing, Discovery, Facets, Autocomplete, and Search Consistency

You are implementing **Backend Volume 8** of a production-grade, original Amazon-style ecommerce marketplace.

This prompt is fully standalone. Do not assume that another prompt, architecture document, previous conversation, previously generated code, previously approved specification, or previously completed implementation is available. The **actual repository is the only source of truth for the current implementation state**.

Inspect the repository before making changes.

This is one implementation unit of a single coherent ecommerce marketplace. Do not create a separate project or competing architecture.

---

# 1. ROLE

Act as a senior production engineering team consisting of:

* Principal Software Architect
* Staff Backend Engineer
* Search/Information Retrieval Engineer
* Database Architect
* Distributed Systems Engineer
* Security Engineer
* Performance Engineer
* QA Engineer
* DevOps Engineer
* Technical Writer

Your objective is to implement the complete production-grade search capability described in this prompt.

Do not behave as a tutor.

Do not provide pseudo-code instead of implementation.

Do not create placeholders.

Do not create TODO/FIXME implementations.

Do not invent provider capabilities.

Do not claim functionality is complete unless it actually exists in the repository and has been validated.

---

# 2. PROJECT

Build an original production-grade ecommerce marketplace supporting:

* Customers
* Sellers
* Products
* Product variants
* SKUs
* Seller offers
* Categories
* Brands
* Pricing
* Inventory
* Cart
* Checkout
* Orders
* Payments
* Fulfillment
* Returns
* Reviews
* Search
* Notifications
* Administration
* Analytics

This volume focuses on the **Search and Discovery backend**, using Elasticsearch/OpenSearch where the repository's technology baseline supports it.

Search must be treated as a **projection/read model**, not the authoritative source for commerce data.

---

# 3. TECHNOLOGY BASELINE

Use the technology actually established by the repository when compatible.

Expected stack:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* REST APIs
* OpenAPI/Swagger
* BullMQ
* AWS S3
* CloudFront
* Docker
* OpenTelemetry-compatible observability

The authoritative transactional system remains PostgreSQL.

Search infrastructure is a derived projection.

Do not move business-critical transactional authority into Elasticsearch/OpenSearch.

---

# 4. FIRST ACTION — REPOSITORY AUDIT

Before implementing anything:

1. Inspect the complete repository.
2. Identify existing search modules.
3. Inspect existing Elasticsearch/OpenSearch dependencies.
4. Inspect existing index configuration.
5. Inspect:

   * Product models
   * Product variants
   * SKUs
   * Categories
   * Brands
   * Sellers
   * Seller offers
   * Pricing
   * Inventory
   * Product media
   * Reviews
   * Rating aggregates
   * Catalog visibility
   * Product lifecycle
   * Seller lifecycle
   * Authorization
   * Events/outbox
   * BullMQ
   * Redis
   * API conventions
   * Error handling
   * Pagination
   * Observability
6. Determine whether an index already exists.
7. Determine whether search documents already exist.
8. Determine existing event consumers.
9. Determine existing environment/configuration conventions.
10. Identify existing APIs that already expose search.

Do not create duplicate search infrastructure.

If the repository already contains partial search functionality, improve and complete it instead of creating a competing implementation.

---

# 5. PRIMARY OBJECTIVE

Implement a complete production-grade search subsystem supporting:

* Product search
* Catalog discovery
* Keyword search
* Product title matching
* Description matching where appropriate
* SKU/product identifier search where appropriate
* Category search
* Brand search
* Seller/offer discovery where appropriate
* Filters
* Facets
* Sorting
* Pagination
* Autocomplete
* Search suggestions
* Search result ranking
* Visibility filtering
* Seller isolation
* Availability-aware result behavior
* Price filtering
* Rating filtering
* Category filtering
* Brand filtering
* Search indexing
* Incremental indexing
* Full reindexing
* Versioned indexes
* Aliases
* Reindex monitoring
* Failed indexing retry
* Idempotent consumers
* Search consistency
* Event-driven synchronization
* Search API
* Administrative search/reindex controls where appropriate
* Security
* Observability
* Performance testing
* Failure recovery

---

# 6. SEARCH ARCHITECTURE

The architecture must clearly separate:

## Source of truth

PostgreSQL owns authoritative:

* Product
* Variant
* SKU
* Seller
* Seller offer
* Category
* Brand
* Price
* Inventory
* Review
* Rating aggregate
* Product lifecycle
* Seller lifecycle
* Catalog ownership

## Search projection

Elasticsearch/OpenSearch stores optimized search documents.

Search documents may denormalize information from multiple domains.

Search results must never become authoritative commerce state.

For example, search may display a price or availability value, but checkout must revalidate the authoritative current value from transactional systems.

---

# 7. SEARCH BOUNDED CONTEXT

Create or complete an explicit Search bounded context/module.

Search owns:

* Search query processing
* Search documents
* Search mappings
* Search indexing
* Search aliases
* Search projections
* Search query construction
* Search ranking configuration
* Search suggestions
* Search facets
* Search reindex orchestration

Search must not own:

* Product truth
* Inventory truth
* Pricing truth
* Seller ownership truth
* Order truth
* Payment truth

---

# 8. SEARCH DOCUMENT MODEL

Design and implement the appropriate product search document.

A document may include:

* product ID
* product slug
* title
* normalized title
* searchable description
* brand
* category hierarchy
* category IDs
* attributes
* variant information
* SKU information where appropriate
* seller/offer summary
* price projection
* currency
* availability projection
* rating summary
* review count
* media references
* product status
* seller status
* searchable timestamps
* ranking signals

Adapt the exact shape to the actual repository.

Do not copy every PostgreSQL column into Elasticsearch/OpenSearch.

Only index fields required for search, filtering, sorting, ranking, or display.

---

# 9. DOCUMENT OWNERSHIP

Define exactly what creates or updates a searchable product document.

The document must be generated from authoritative data.

Never trust arbitrary client-generated search documents.

If a product is composed from:

* Product
* Variant
* Offer
* Price
* Inventory
* Reviews

the indexing process must retrieve the canonical values from the authoritative systems.

Do not allow frontend clients to submit index documents.

---

# 10. CATALOG VISIBILITY

Search must respect catalog visibility.

Do not index or expose products that should not be customer-visible.

At minimum consider:

* DRAFT products
* PENDING_REVIEW products
* ACTIVE products
* SUSPENDED products
* ARCHIVED products

Only the appropriate states should appear in public search.

Seller status must also be respected.

Do not expose offers from:

* suspended sellers
* closed sellers
* unauthorized marketplace entities

unless the business rules explicitly allow a different behavior.

---

# 11. VISIBILITY IS SERVER-SIDE

Never rely on frontend filtering to hide:

* unpublished products
* suspended products
* private catalog records
* inactive sellers
* restricted offers

Search queries themselves must enforce visibility.

Administrative search may have broader visibility, but only through explicit authorization.

---

# 12. MULTI-SELLER SEARCH

The marketplace may have multiple sellers offering the same product.

Define whether search results represent:

* product-level results
* offer-level results
* a product with aggregated offers
* a hybrid model

Avoid duplicating the same product excessively merely because multiple sellers sell it.

If multiple offers are represented, define:

* primary offer
* lowest eligible price
* availability
* seller information
* offer ranking

Search display data must remain a projection.

Checkout must revalidate the selected offer.

---

# 13. PRODUCT VARIANTS

Define how variants are represented in search.

Examples:

* color
* size
* storage capacity
* material
* configuration

Search must support appropriate variant discovery without creating confusing duplicate product results.

Determine whether variant attributes should be:

* nested
* flattened
* keyword fields
* text fields
* facetable fields

based on actual query requirements.

Avoid mapping explosions.

---

# 14. CATEGORIES

Support hierarchical category filtering.

Search should be able to filter by:

* category ID
* descendant categories where appropriate
* category path
* category hierarchy

Do not rely exclusively on category names because names may not be unique.

Category tree changes must be reflected in search projections.

---

# 15. BRANDS

Support brand search and filtering.

Define fields for:

* brand ID
* brand name
* normalized brand name

Brand identity should use canonical IDs.

Do not use brand name alone as the authoritative relationship.

---

# 16. SEARCHABLE TEXT

Define appropriate analyzers for:

* product title
* product description
* brand
* category names
* relevant attributes

Consider:

* lowercase normalization
* stemming where appropriate
* stop words where appropriate
* synonyms where justified
* exact matching
* prefix matching
* typo tolerance

Do not blindly enable aggressive stemming or fuzzy search everywhere.

Search relevance must remain predictable.

---

# 17. MULTI-LANGUAGE CONSIDERATION

If the platform supports multiple languages, design the index for language-aware analysis.

Do not assume English-only analyzers if the repository already supports localization.

Where multilingual support is not implemented, do not create fake localization behavior.

Document the chosen language strategy.

---

# 18. SEARCH QUERY BEHAVIOR

Implement a robust search query pipeline.

A query should be able to consider:

* exact product identifiers
* exact title matches
* phrase matches
* token matches
* prefix matches
* fuzzy matches where justified
* brand matches
* category matches
* attribute matches

Use relevance weighting.

Exact product identifiers should generally receive higher priority than broad textual matches.

Do not make every query fuzzy by default because this can create poor relevance and high search cost.

---

# 19. TYPO TOLERANCE

Implement typo tolerance carefully.

Consider:

* edit distance
* prefix matching
* fuzzy matching

Apply fuzziness only where it improves user experience.

Prevent pathological queries that create excessive search workload.

Define maximum query length.

Normalize whitespace and unsafe input.

---

# 20. SEARCH FILTERS

Support relevant filters such as:

* category
* brand
* price range
* rating
* verified-review availability where appropriate
* seller
* availability
* condition
* selected product attributes

Do not expose filters that are not represented in the index.

Filters must use canonical IDs where possible.

---

# 21. PRICE FILTERING

Search may contain a price projection for discovery.

Price filtering must clearly define:

* which offer price is represented
* currency
* seller/offer selection
* promotional price behavior
* stale data behavior

Do not treat search price as authoritative for checkout.

Checkout must revalidate current pricing.

Never calculate money using unsafe floating-point arithmetic.

---

# 22. AVAILABILITY FILTERING

Search may include availability projections.

Define states such as:

* in stock
* low stock
* unavailable

Do not promise exact inventory quantities through search unless the business explicitly requires it.

Inventory remains authoritative in PostgreSQL.

A stale search availability result must never allow an invalid purchase.

---

# 23. RATING FILTERING

Integrate existing review/rating aggregates.

Support:

* minimum rating
* rating buckets

Rating data is a projection.

If aggregates are updated asynchronously, search may become eventually consistent.

Document this behavior.

---

# 24. FACETS

Implement aggregations/facets appropriate for ecommerce.

Potential facets:

* category
* brand
* price ranges
* rating
* condition
* attributes
* seller

Facets must be consistent with visibility constraints.

Do not expose private seller/customer data through aggregations.

---

# 25. DYNAMIC ATTRIBUTE FACETS

If product attributes are dynamic:

* define a safe mapping strategy
* prevent uncontrolled field creation
* prevent mapping explosion
* normalize attribute names
* define supported facet types

Do not dynamically create arbitrary Elasticsearch/OpenSearch fields from user-controlled attribute names.

Use controlled mappings or structured attribute representations.

---

# 26. SORTING

Support appropriate sort modes.

Potential modes:

* relevance
* newest
* price ascending
* price descending
* rating
* popularity where a valid signal exists

Do not invent unsupported business metrics.

Every sort must have a stable secondary ordering to prevent result instability.

---

# 27. PAGINATION

Use a scalable pagination strategy.

For high-volume result sets, prefer cursor/search-after style pagination when appropriate.

Avoid deep offset pagination that creates unacceptable search cost.

Define:

* page size limits
* default page size
* maximum page size
* cursor format
* sort compatibility
* invalid cursor behavior

Never trust arbitrary cursor data without validation.

---

# 28. SEARCH RESPONSE

Return a stable API contract.

Potential response structure:

```text
query
results
total
pagination
facets
sort
appliedFilters
suggestions
```

Each result may contain only the information required by the search experience.

Do not expose internal search metadata unnecessarily.

---

# 29. SEARCH API

Implement REST APIs consistent with the repository.

Potential endpoint:

```text
GET /api/v1/search
```

Potential query parameters:

```text
q
categoryId
brandId
sellerId
minPrice
maxPrice
minRating
availability
condition
sort
pageSize
cursor
```

Do not blindly copy these parameters if the repository has different conventions.

Document all supported parameters.

Validate:

* query length
* numeric ranges
* enum values
* IDs
* cursor
* page size
* filter combinations

---

# 30. EMPTY QUERY

Define behavior for empty search queries.

Possible behavior:

* category discovery
* popular products
* no results
* explicit validation error

Choose the behavior based on existing product requirements.

Do not create arbitrary behavior without considering API consistency.

---

# 31. SEARCH SUGGESTIONS

Implement autocomplete/suggestion support.

Potential endpoint:

```text
GET /api/v1/search/suggestions
```

Suggestions may include:

* product titles
* brands
* categories
* popular query terms

Do not expose private or unpublished data.

Autocomplete must have:

* query length limits
* rate limiting
* bounded response size
* low-latency query design

---

# 32. SUGGESTION SECURITY

Suggestion queries are user-controlled and can be abused.

Protect against:

* extremely long queries
* repeated high-volume requests
* expensive wildcard queries
* regex abuse
* fuzzy-search abuse
* enumeration

Do not permit arbitrary Elasticsearch/OpenSearch query DSL from clients.

The API must construct all queries server-side.

---

# 33. SEARCH QUERY DSL SECURITY

Never accept raw:

* Elasticsearch/OpenSearch DSL
* query JSON
* script expressions
* arbitrary field names
* arbitrary sort expressions

from untrusted clients.

The backend must build the search query from validated application-level parameters.

---

# 34. INDEX VERSIONING

Implement versioned index management.

Example:

```text
products-v1
products-v2
products-v3
```

Use aliases such as:

```text
products-read
products-write
```

Exact naming must follow repository conventions.

Never hard-switch production consumers without a controlled migration process.

---

# 35. ZERO-DOWNTIME REINDEXING

Implement a production-safe reindexing strategy.

At minimum:

1. Create a new versioned index.
2. Apply mappings/settings.
3. Populate it from authoritative PostgreSQL data.
4. Validate document counts and representative queries.
5. Perform consistency checks.
6. Switch the read alias atomically.
7. Retain the previous index temporarily for rollback.
8. Remove obsolete indexes only after validation.

Do not delete the active index before the replacement is ready.

---

# 36. FULL REINDEX

Implement a controlled full reindex capability.

It must:

* read authoritative PostgreSQL data
* build search documents
* batch indexing operations
* respect backpressure
* retry transient failures
* record failures
* support resumability where practical
* report progress
* avoid overwhelming PostgreSQL
* avoid overwhelming Elasticsearch/OpenSearch

Do not load the entire catalog into memory.

---

# 37. INCREMENTAL INDEXING

Implement event-driven incremental updates.

Relevant domain events may include:

```text
ProductCreated
ProductUpdated
ProductPublished
ProductSuspended
ProductArchived
ProductDeleted
CategoryUpdated
BrandUpdated
SellerUpdated
SellerOfferCreated
SellerOfferUpdated
SellerOfferRemoved
PriceChanged
InventoryAvailabilityChanged
RatingAggregateChanged
```

Use the actual event names already established by the repository where available.

Do not create duplicate event systems.

---

# 38. EVENT-DRIVEN INDEXING

Search consumers must be:

* idempotent
* retryable
* observable
* safe under duplicate events

An event should identify enough information to rebuild the affected document.

Do not assume event delivery is exactly once.

Design for at-least-once delivery.

---

# 39. OUT-OF-ORDER EVENTS

Handle events arriving out of order.

Examples:

```text
ProductUpdated
ProductPublished
ProductUpdated
```

or:

```text
PriceChanged
ProductUpdated
PriceChanged
```

Use:

* event versions
* timestamps
* aggregate versions
* database re-read
* monotonic version checks

where appropriate.

Do not blindly overwrite newer search state with an older event.

---

# 40. DELETE EVENTS

Handle deletion/removal safely.

When a product becomes permanently non-searchable:

* remove it from the public search projection
* preserve transactional truth
* ensure duplicate deletion events are safe
* handle missing search documents gracefully

Deletion must be idempotent.

---

# 41. SEARCH CONSISTENCY

Define expected consistency guarantees.

Examples:

* product creation: eventually searchable
* product suspension: eventually removed
* price change: eventually reflected
* inventory change: eventually reflected
* rating change: eventually reflected

Do not promise strong consistency from a projection-based search engine unless it is actually implemented.

---

# 42. INDEXING FAILURE RECOVERY

When indexing fails:

* do not lose the event
* retry transient failures
* use exponential backoff
* prevent infinite retry loops
* record permanent failures
* expose operational metrics
* support replay/reprocessing

Use existing BullMQ infrastructure where appropriate.

---

# 43. SEARCH INDEXING QUEUES

If asynchronous indexing uses BullMQ, define jobs with:

* product ID
* event ID
* aggregate version where applicable
* operation
* idempotency key

Configure:

* retries
* backoff
* timeout
* concurrency
* DLQ behavior
* graceful shutdown
* observability

Do not enqueue unbounded duplicate jobs unnecessarily.

---

# 44. BULK INDEXING

Use Elasticsearch/OpenSearch bulk APIs where appropriate.

Implement:

* bounded batches
* partial failure inspection
* retry of failed documents
* backpressure
* request-size limits
* logging without sensitive data

Do not assume an HTTP 200 means every document succeeded.

Inspect individual bulk item results.

---

# 45. DATABASE-TO-SEARCH REBUILD

The reindex process must be able to reconstruct documents from PostgreSQL.

Do not depend exclusively on historical events being available.

A fresh index must be buildable from current authoritative state.

---

# 46. SEARCH CACHE

Redis may be used for carefully selected caching such as:

* popular searches
* autocomplete
* expensive stable aggregations

Do not cache personalized or authorization-sensitive results without correct cache-key isolation.

Every cache must define:

* key
* TTL
* invalidation
* stale behavior
* failure behavior

Redis must never become search authority.

---

# 47. SEARCH PERFORMANCE

Optimize for low-latency customer search.

Measure:

* search latency
* suggestion latency
* indexing latency
* queue latency
* indexing throughput
* query error rate
* timeout rate
* cluster rejection rate

Avoid:

* unbounded queries
* wildcard-heavy searches
* expensive regex
* deep pagination
* massive aggregation responses
* unnecessary source fields
* excessive fuzzy matching

---

# 48. SEARCH RELEVANCE

Implement a sensible initial relevance strategy.

Prioritize where appropriate:

1. Exact identifiers
2. Exact title/phrase matches
3. Strong title matches
4. Brand/category matches
5. Attribute matches
6. Description matches
7. Controlled fuzzy matches

The exact ranking must be validated against realistic examples.

Do not claim machine-learning ranking unless an actual model/system exists.

---

# 49. BUSINESS RANKING SIGNALS

If the repository contains legitimate signals such as:

* popularity
* sales volume
* conversion
* review count
* rating

they may be incorporated carefully.

Do not let seller payment status or arbitrary seller preference manipulate public ranking unless explicitly part of the business rules.

Document ranking behavior.

---

# 50. PERSONALIZATION BOUNDARY

Do not implement personalized recommendations as part of generic search unless the repository already contains a personalization architecture.

Search should remain deterministic for equivalent users unless authorization or personalization requirements explicitly change the result.

Do not invent a recommendation engine.

---

# 51. SEARCH AUTHORIZATION

Search must enforce authorization and visibility.

Public search:

* only public products
* public offers
* public seller information

Seller search:

* seller-authorized records

Administrative search:

* broader visibility according to permission

Never allow an API parameter such as:

```text
includeHidden=true
```

to bypass authorization.

---

# 52. SELLER ISOLATION

Seller-specific search APIs must enforce:

```text
authenticated seller
→ authorized seller account
→ authorized seller resources
```

Prevent:

* seller A querying seller B's private data
* hidden offer exposure
* private pricing exposure
* private inventory exposure

Search projections must not become an IDOR vector.

---

# 53. SEARCH RESULT PRICING

When displaying price in search:

* clearly define which price is projected
* include currency
* handle seller offer selection
* handle promotional pricing appropriately

Never tell the customer that the search price is guaranteed until checkout revalidation confirms it.

---

# 54. SEARCH RESULT INVENTORY

Search results may show:

* in stock
* out of stock
* limited availability

Do not expose exact inventory quantities unless explicitly required.

Inventory reservation remains authoritative.

---

# 55. MEDIA IN SEARCH

Use existing media references.

Search documents may contain:

* thumbnail URL/reference
* primary image ID
* media asset ID

Do not store unnecessary private S3 paths.

Use CloudFront/public media architecture where appropriate.

Search indexing must not expose private media.

---

# 56. SEARCH OBSERVABILITY

Instrument:

## API

* request count
* latency
* error rate
* query complexity
* result count

## Search engine

* request latency
* timeouts
* rejected requests
* cluster errors
* index health

## Indexing

* events consumed
* successful indexing
* failed indexing
* retry count
* queue depth
* indexing latency

## Reindexing

* documents processed
* documents succeeded
* documents failed
* throughput
* elapsed time
* remaining work

Never log full customer search history unless there is a documented privacy-compliant reason.

---

# 57. PRIVACY

Search infrastructure must not unintentionally become a repository for sensitive customer data.

Do not index:

* passwords
* payment credentials
* private addresses
* private phone numbers
* private email addresses
* authentication tokens
* internal fraud signals

Search logs must follow privacy requirements.

Define retention for search telemetry where applicable.

---

# 58. SECURITY

Threat-model search for:

* query injection
* arbitrary DSL injection
* regex abuse
* wildcard abuse
* resource exhaustion
* enumeration
* unauthorized documents
* stale visibility
* private seller data exposure
* private media exposure
* cluster credential exposure

Never expose Elasticsearch/OpenSearch credentials to clients.

Never expose the search cluster directly to the public internet unless the infrastructure architecture explicitly and securely requires it.

---

# 59. ELASTICSEARCH/OPENSEARCH CONNECTION SECURITY

Use secure server-side configuration.

Protect:

* endpoint
* username
* password
* API keys
* certificates

Never hardcode credentials.

Use the repository's secrets/configuration system.

Use TLS where supported by the deployment architecture.

---

# 60. SEARCH HEALTH

Implement operational health checks appropriate for the repository.

Distinguish:

* API healthy
* database healthy
* Redis healthy
* search cluster reachable
* index available

A temporary search outage should not necessarily bring down unrelated transactional APIs.

Define degraded behavior.

---

# 61. FAILURE MODES

Define behavior for:

* search cluster unavailable
* index missing
* alias missing
* stale index
* partial indexing failure
* mapping failure
* malformed document
* event duplication
* event loss
* queue outage
* PostgreSQL outage during reindex
* Redis outage

Core transactional commerce operations must not become dependent on search availability unless explicitly required.

---

# 62. ADMIN SEARCH OPERATIONS

If the repository contains an administration system, implement authorized operational APIs or services for:

* index health
* current index version
* reindex status
* reindex initiation
* failed indexing inspection
* retry/replay
* alias state

Protect all operational endpoints with strong permissions.

Do not expose reindex controls to ordinary users.

---

# 63. REINDEX SAFETY

A reindex operation must:

* prevent conflicting concurrent rebuilds where necessary
* use unique operation IDs
* be observable
* be resumable or safely restartable
* avoid accidental alias corruption
* support rollback

Prevent two independent reindex operations from racing and switching aliases incorrectly.

---

# 64. SEARCH TESTING

Implement real tests.

## Unit tests

Test:

* query construction
* normalization
* filters
* sorting
* pagination
* visibility rules
* search document transformation
* ranking logic
* suggestion construction

## Integration tests

Test:

* PostgreSQL → search document generation
* event → indexing
* update propagation
* deletion
* duplicate events
* out-of-order events
* bulk indexing failures
* alias switching

## API tests

Test:

* search
* suggestions
* filters
* sorting
* pagination
* invalid input
* authorization

## Security tests

Test:

* arbitrary DSL injection
* unauthorized filters
* hidden product access
* seller isolation
* private media exposure
* expensive-query abuse

---

# 65. SEARCH QUALITY TESTS

Create representative search cases.

Examples should cover:

* exact product name
* partial product name
* typo
* brand query
* category query
* attribute query
* product identifier
* no results
* mixed filters
* sorting
* pagination

Validate that the ranking behavior is reasonable.

Do not hardcode artificial expected rankings without a defensible search rule.

---

# 66. LOAD/PERFORMANCE TESTING

Where the repository's testing infrastructure supports it, establish performance tests for:

* search endpoint
* autocomplete
* filtered search
* faceted search
* pagination
* indexing throughput

Define reasonable thresholds based on actual environment rather than inventing production SLA claims.

---

# 67. INDEX MAPPINGS

Create explicit mappings.

Do not rely blindly on dynamic mappings for important fields.

Define:

* text fields
* keyword fields
* numeric fields
* date fields
* boolean fields
* nested/object fields where required

Prevent accidental type conflicts across index versions.

---

# 68. MAPPING EVOLUTION

Search mappings evolve over time.

Implement a versioning process that handles:

* field additions
* field type changes
* analyzer changes
* removed fields
* renamed fields

Do not attempt unsafe in-place mapping changes when reindexing is required.

---

# 69. SYNONYMS

If synonyms are supported:

* define controlled synonym configuration
* version it
* test it
* document it

Do not allow customers or sellers to inject arbitrary search synonyms.

If a synonym system is not yet justified, do not fabricate one.

---

# 70. AUTOCOMPLETE INDEX

If autocomplete requires a specialized index, define it explicitly.

Potential techniques:

* completion suggester
* edge n-gram
* search-as-you-type
* dedicated prefix fields

Choose based on actual repository requirements.

Do not create multiple redundant indexes without justification.

---

# 71. QUERY NORMALIZATION

Normalize user queries consistently.

Handle:

* leading/trailing whitespace
* repeated spaces
* case
* Unicode normalization where appropriate

Preserve meaningful user characters.

Do not strip characters that are important for product identifiers.

---

# 72. SEARCH RATE LIMITING

Apply appropriate rate limits to:

* search
* autocomplete
* administrative reindexing
* indexing operations

Do not use the same rate limit for all traffic.

Use existing Redis-based rate-limiting infrastructure.

Define graceful behavior when Redis is unavailable.

---

# 73. API ERRORS

Use the existing standardized API error architecture.

Potential errors:

* SEARCH_UNAVAILABLE
* INVALID_SEARCH_QUERY
* INVALID_SEARCH_FILTER
* INVALID_SEARCH_CURSOR
* SEARCH_TIMEOUT
* REINDEX_ALREADY_RUNNING
* REINDEX_FAILED
* SEARCH_INDEX_UNAVAILABLE

Do not expose internal Elasticsearch/OpenSearch error details directly to customers.

---

# 74. EVENT SCHEMA COMPATIBILITY

Search consumers must support the existing event envelope.

Respect:

* event version
* aggregate version
* event ID
* correlation ID
* causation ID
* timestamps

Do not create incompatible event formats.

---

# 75. IDEMPOTENCY

Indexing operations must be idempotent.

Repeated processing of:

```text
ProductUpdated(productId=X)
```

must not corrupt the search document.

Deletes must also be idempotent.

Reindexing must safely tolerate retries.

---

# 76. RECONCILIATION

Implement a reconciliation capability where appropriate.

It should be able to detect:

* missing documents
* stale documents
* incorrect visibility
* incorrect version
* projection mismatch

The authoritative PostgreSQL state determines the correct result.

Reconciliation must not make Elasticsearch/OpenSearch authoritative.

---

# 77. SEARCH DOCUMENT VERSIONING

Where useful, store:

* source aggregate version
* projection version
* indexedAt

This can help prevent stale events from overwriting newer data.

Use the actual repository's versioning model when available.

---

# 78. TRANSACTIONAL BOUNDARY

Never hold a PostgreSQL transaction open while waiting for Elasticsearch/OpenSearch network operations unless there is an extremely strong and documented reason.

Prefer:

1. Commit authoritative transaction.
2. Persist outbox event.
3. Publish/process event.
4. Update search projection.

This avoids coupling transaction duration to search availability.

---

# 79. SEARCH AND CHECKOUT

Search must never bypass checkout validation.

A customer selecting a product from search must still have:

* current product validation
* current seller offer validation
* current price validation
* current inventory validation
* current promotion validation

performed by the transactional commerce domains.

---

# 80. SEARCH AND PRODUCT DELETION

If a product is deleted or archived:

* determine whether it should disappear immediately or eventually
* emit appropriate event
* remove from public index
* preserve required transactional records
* handle repeated deletion safely

Do not physically delete transactional product history merely because search visibility changes.

---

# 81. SEARCH AND SELLER STATUS

Seller status changes must propagate to search.

For example:

```text
ACTIVE → SUSPENDED
```

must eventually prevent the seller's affected offers from appearing publicly.

Do not allow stale seller projections to expose prohibited offers indefinitely.

---

# 82. SEARCH AND PRICE CHANGES

Price changes must propagate safely.

Search price is only a discovery projection.

Do not allow search indexing to mutate authoritative pricing.

If price projection fails to update, checkout still uses PostgreSQL-authoritative pricing.

---

# 83. SEARCH AND INVENTORY CHANGES

Inventory changes may update search availability.

Do not attempt to reserve inventory from search.

Do not make Elasticsearch/OpenSearch the inventory authority.

Search should degrade gracefully when availability projections are temporarily stale.

---

# 84. SEARCH AND REVIEWS

Use existing rating aggregates from the Reviews domain.

Search may project:

* average rating
* review count

Do not calculate review truth independently from duplicated review documents unless there is a specific projection architecture.

Rating changes should propagate through events.

---

# 85. DOCUMENT SIZE

Keep search documents reasonably sized.

Avoid indexing:

* full unnecessary descriptions
* massive media metadata
* redundant seller information
* private fields
* complete relational histories

Large documents increase indexing and query costs.

---

# 86. SOURCE FILTERING

Where supported, return only required fields from Elasticsearch/OpenSearch.

Avoid transferring large documents unnecessarily.

The API should expose only fields required by the client.

---

# 87. SEARCH RESPONSE ENRICHMENT

Do not automatically perform an N+1 PostgreSQL lookup for every search result.

If search documents contain sufficient public display data, use the projection.

If authoritative information must be retrieved, batch it carefully.

Never allow search result rendering to create an unbounded database query storm.

---

# 88. SEARCH CACHE INVALIDATION

If search responses are cached:

* define TTL
* define invalidation strategy
* avoid serving private results cross-user
* avoid stale security-sensitive results
* define behavior when invalidation fails

Do not cache administrative search responses in shared public caches.

---

# 89. DOCUMENTATION

Document:

* search architecture
* index structure
* mappings
* aliases
* indexing flow
* event consumers
* queue jobs
* reindex procedure
* rollback procedure
* search API
* query parameters
* filters
* sorting
* pagination
* failure behavior
* operational troubleshooting

Documentation must reflect actual implementation.

---

# 90. FILE ORGANIZATION

Follow repository conventions.

Where a Search module exists, maintain clear separation between:

* domain/application
* query builders
* search client
* document mappers
* repositories/projections
* event consumers
* queue jobs
* controllers
* DTOs
* index definitions
* migrations/reindex tooling
* tests

Do not force a new architecture if the repository already has a coherent implementation.

---

# 91. DEPENDENCY MANAGEMENT

Reuse existing search libraries when appropriate.

Do not add unnecessary dependencies.

Any new dependency must:

* have a legitimate purpose
* be compatible with the current Node/NestJS version
* be maintained
* be reflected in lockfiles
* not duplicate an existing library

---

# 92. CONFIGURATION

Validate search configuration at application startup.

Configuration may include:

* search endpoint
* index prefix
* index version
* authentication
* TLS settings
* timeouts
* retry settings
* batch sizes
* queue configuration

Never hardcode production credentials.

---

# 93. TIMEOUTS AND RETRIES

Search requests and indexing requests must have explicit timeouts.

Retries must:

* distinguish transient vs permanent errors
* use bounded exponential backoff
* avoid retry storms
* respect cluster health
* integrate with queue retry policy

Do not retry invalid queries indefinitely.

---

# 94. GRACEFUL DEGRADATION

When search is unavailable:

* return an explicit controlled error for search endpoints where no meaningful fallback exists
* do not crash unrelated APIs
* do not corrupt transactional data
* do not lose indexing events

If an existing PostgreSQL fallback search exists and is appropriate, use it only if it is actually implemented and performant enough.

Do not invent an untested fallback.

---

# 95. ADMINISTRATIVE REINDEX AUTHORIZATION

Reindex operations are operationally dangerous.

Require explicit administrative permissions.

Protect against:

* unauthorized reindex
* repeated reindex abuse
* concurrent reindex conflicts
* arbitrary index names
* arbitrary aliases

Never allow a normal user to select an arbitrary search index.

---

# 96. TEST ENVIRONMENT

If Elasticsearch/OpenSearch is available in the repository's test infrastructure:

* run integration tests against it.

If it is not available:

* create appropriate test boundaries/mocks only where legitimate
* do not falsely claim full search-cluster integration testing

Prefer real integration testing when infrastructure exists.

---

# 97. DATABASE LOAD DURING REINDEX

A full reindex must not unnecessarily overload PostgreSQL.

Use:

* batching
* controlled concurrency
* indexed queries
* keyset pagination where appropriate
* bounded workers

Do not use one massive `findMany()` operation for the entire catalog.

---

# 98. SEARCH RESULT STABILITY

For pagination, use deterministic sorting.

If two products have identical relevance scores or sort values, apply a stable secondary key.

This prevents:

* duplicate results between pages
* missing results
* unstable ordering

---

# 99. SEARCH FILTER COMBINATIONS

Test combinations such as:

* category + brand
* category + price
* brand + rating
* seller + availability
* multiple attribute filters
* filters + sorting
* filters + pagination

Ensure the generated search query remains valid and performant.

---

# 100. COMPLETION REQUIREMENTS

The implementation is considered complete only when:

* Search module is implemented/integrated.
* Search documents are defined.
* Index mappings are implemented.
* Index versioning is implemented where required.
* Public search API is implemented.
* Suggestions/autocomplete are implemented where required.
* Filters are implemented.
* Facets are implemented where required.
* Sorting is implemented.
* Pagination is implemented.
* Visibility rules are enforced.
* Seller isolation is enforced.
* Incremental indexing is implemented.
* Event consumers are implemented.
* Idempotency is implemented.
* Full reindex capability is implemented where required.
* Reindex safety is implemented.
* Retry/failure handling is implemented.
* Observability is implemented.
* Security controls are implemented.
* Tests are implemented.
* Documentation is updated.

Only claim completion for functionality actually present in the repository.

---

# 101. IMPLEMENTATION BOUNDARY

This volume should implement:

* Search bounded context
* Search document model
* Elasticsearch/OpenSearch integration
* Index mappings
* Index versioning
* Read/write aliases where appropriate
* Product indexing
* Incremental indexing
* Event-driven synchronization
* Search query API
* Suggestions/autocomplete
* Filters
* Facets
* Sorting
* Pagination
* Visibility enforcement
* Seller isolation
* Search ranking
* Reindexing
* Index reconciliation
* Search-related BullMQ jobs where justified
* Redis caching where justified
* Security
* Observability
* Performance protections
* Testing
* Documentation

Do NOT turn this volume into a separate implementation of:

* Notifications
* Recommendations
* Analytics
* Seller payouts
* Advanced warehouse management
* Tax remittance
* Full carrier integrations

Those systems remain separate marketplace capabilities.

---

# 102. NON-NEGOTIABLE RULES

Never:

* make Elasticsearch/OpenSearch the transactional source of truth
* trust raw search DSL from clients
* expose private documents
* expose suspended sellers' offers
* expose unpublished products
* bypass authorization through search parameters
* allow arbitrary index selection
* allow uncontrolled dynamic mappings
* create mapping explosions
* create unbounded queries
* use unlimited fuzzy search
* allow deep unbounded pagination
* expose cluster credentials
* hardcode search credentials
* silently lose indexing events
* assume exactly-once delivery
* assume bulk indexing succeeded without checking item results
* overwrite newer documents with stale events
* delete the active index before replacement is ready
* make checkout trust search price
* make checkout trust search availability
* create a competing search system
* create TODO implementations
* create fake search functionality
* claim search integration works without validation
* claim tests passed when they did not

---

# 103. FINAL IMPLEMENTATION REPORT

At the end, provide a factual report based only on the actual repository.

Include:

## Implemented

Exact search functionality actually implemented.

## Files Added

Actual files added.

## Files Modified

Actual files modified.

## Database Changes

Actual migrations, indexes, models, or other database changes.

## Search Infrastructure

Actual:

* indexes
* mappings
* aliases
* analyzers
* search clients
* configuration

## APIs

Actual search/suggestion/admin endpoints.

## Events

Actual indexing-related events and consumers.

## Jobs

Actual BullMQ jobs.

## Security

Actual security controls.

## Observability

Actual logs, metrics, traces, and health checks.

## Tests

Actual tests created or modified.

## Validation

Actual:

* build result
* typecheck result
* lint result
* migration result
* unit-test result
* integration-test result
* search integration result

## Limitations

Anything not completed, including environmental limitations.

Do not describe planned functionality as implemented functionality.

---

# 104. FINAL INSTRUCTION

Inspect the actual repository first.

Then implement the complete **Search, Elasticsearch/OpenSearch, Indexing, Discovery, Filtering, Faceting, Autocomplete, Ranking, Pagination, Reindexing, Consistency, Security, and Operational backend capability** described above.

Make real repository changes.

Reuse existing architecture and contracts.

Do not create a competing implementation.

Do not stop at an outline.

Do not provide pseudo-code instead of implementation.

Do not leave placeholders.

Do not invent provider capabilities.

Validate the implementation.

Report only facts about the resulting repository.

This prompt is a standalone implementation unit of one coherent ecommerce marketplace. The resulting search system must integrate correctly with the existing products, variants, SKUs, sellers, offers, pricing, inventory, reviews, events, queues, authorization, and APIs actually present in the repository.
