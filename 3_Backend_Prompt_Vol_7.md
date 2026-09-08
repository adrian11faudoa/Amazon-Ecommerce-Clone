# Amazon Ecommerce Marketplace — Backend Prompt — Volume 7

## Reviews, Ratings, Review Media, Verification, Moderation, and Trust

You are implementing **Backend Volume 7** of a production-grade, original Amazon-style ecommerce marketplace.

This prompt is fully standalone. Do not assume that another prompt, architecture document, previous conversation, previously generated code, or previously approved specification is available. The **actual repository is the only source of truth for the current implementation state**. Inspect the repository before making changes and integrate this work into whatever is actually present.

This is one implementation unit of a single coherent ecommerce marketplace system. Do not create a separate project or competing architecture.

---

# 1. ROLE

Act as a senior production engineering team consisting of:

* Principal Software Architect
* Staff Backend Engineer
* Database Architect
* Security Engineer
* API Architect
* Distributed Systems Engineer
* QA Engineer
* DevOps Engineer
* Technical Writer

Your objective is to implement the complete backend functionality described in this prompt as production-ready software.

Do not behave as a tutor.

Do not provide pseudo-code instead of implementation.

Do not create placeholders.

Do not create TODO/FIXME implementations.

Do not invent provider capabilities.

Do not claim functionality is complete unless it actually exists in the repository and has been validated.

---

# 2. PROJECT

Build an original, production-grade ecommerce marketplace inspired by the capabilities of large-scale marketplaces.

The platform supports:

* Customers
* Sellers
* Products
* Product variants
* SKUs
* Seller offers
* Pricing
* Inventory
* Cart
* Checkout
* Orders
* Payments
* Fulfillment
* Shipments
* Tracking
* Returns
* Reviews
* Search
* Notifications
* Administration
* Analytics

This volume focuses specifically on the **Reviews and Ratings domain**, including moderation and trust controls.

The implementation must integrate with the existing marketplace backend rather than creating duplicate product, seller, order, customer, or media systems.

---

# 3. TECHNOLOGY BASELINE

Use the technology actually established by the repository when compatible.

Expected backend stack:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Redis
* REST APIs
* OpenAPI / Swagger
* BullMQ
* AWS S3 for object storage where applicable
* CloudFront where applicable
* Elasticsearch/OpenSearch where already established
* Docker
* OpenTelemetry-compatible observability

Architectural principles:

* Clean Architecture
* Domain-Driven Design
* SOLID
* Repository Pattern
* Service Layer
* Explicit domain boundaries
* Strong typing
* Transactional consistency
* Secure server-side authorization

Do not replace an existing compatible implementation simply because you prefer another framework or pattern.

---

# 4. FIRST ACTION — INSPECT THE REPOSITORY

Before writing code:

1. Inspect the complete repository structure.
2. Identify the existing NestJS application structure.
3. Inspect existing Prisma schema and migrations.
4. Inspect:

   * Customer domain
   * Identity/authentication
   * Authorization
   * Product/catalog domain
   * Product variants
   * SKU domain
   * Seller domain
   * Seller offers
   * Orders
   * Order items
   * Payments
   * Fulfillment
   * Shipments
   * Returns
   * Media infrastructure
   * Event/outbox infrastructure
   * BullMQ infrastructure
   * Redis infrastructure
   * API conventions
   * Error handling
   * Validation
   * Logging
   * Audit infrastructure
   * Testing conventions
5. Identify existing domain models that should be reused.
6. Identify existing product/order/customer/media identifiers.
7. Identify existing authorization guards and permission systems.
8. Identify existing pagination and response conventions.
9. Identify existing event conventions.
10. Identify existing API versioning conventions.

Do not create duplicate entities if equivalent entities already exist.

If the repository differs from the assumptions in this prompt, adapt the implementation to the repository while preserving the intended business behavior.

---

# 5. PRIMARY OBJECTIVE

Implement a complete production-grade **Reviews and Ratings subsystem**.

The subsystem must support:

* Product reviews
* Product ratings
* Review titles
* Review bodies
* Review media
* Review ownership
* Verified-purchase indicators
* Review eligibility
* One or more reviews according to clearly defined business rules
* Review editing rules
* Review deletion/removal rules
* Review visibility
* Review moderation
* Review reporting
* Abuse prevention
* Seller/product/customer authorization
* Rating aggregation
* Rating distribution
* Review sorting
* Review pagination
* Review media integration
* Review events
* Auditability
* Administrative moderation
* Secure handling of user-generated content

The implementation must integrate with existing:

* Customer
* Product
* SKU/variant
* Seller offer
* Order
* Order item
* Fulfillment
* Return
* Media
* Authentication
* Authorization
* Audit
* Event
* Queue

domains.

---

# 6. REVIEW DOMAIN BOUNDARY

Create an explicit Reviews bounded context/module.

The Reviews domain owns:

* Review lifecycle
* Review content
* Review rating
* Review authorship
* Review verification state
* Review visibility
* Review moderation
* Review reports
* Rating aggregation
* Review-specific policies

The Reviews domain must not become the owner of:

* Products
* Orders
* Customers
* Payments
* Inventory
* Fulfillment
* Returns

Those domains remain authoritative for their respective data.

Use references to existing domain entities.

Do not duplicate customer, product, order, or seller records inside the Reviews domain unless a denormalized snapshot is explicitly justified.

---

# 7. CORE REVIEW MODEL

Design and implement the necessary Prisma models.

At minimum evaluate the need for:

## Review

Potential fields include:

* id
* customerId
* productId
* variantId where appropriate
* sellerOfferId where appropriate
* orderId where appropriate
* orderItemId where appropriate
* rating
* title
* body
* verificationStatus
* moderationStatus
* visibilityStatus
* createdAt
* updatedAt
* publishedAt
* editedAt
* removedAt
* removalReason
* version where useful

Use the actual repository naming conventions.

Do not blindly create every field above if the existing architecture provides a better representation.

---

# 8. REVIEW IDENTITY

Each review must have a stable internal identifier.

Do not expose sequential database identifiers if the existing security architecture uses opaque/public identifiers.

Review ownership must be unambiguous.

The system must be able to determine:

* who created the review
* what product was reviewed
* which order/order item qualifies the review
* whether the purchase can be verified
* whether the review is currently visible
* whether it has been moderated
* whether it has been removed

---

# 9. RATING MODEL

Ratings must use an explicit validated representation.

For example:

* 1
* 2
* 3
* 4
* 5

Do not accept arbitrary numeric values.

Validate ratings on the server.

Do not trust frontend validation.

The database must also enforce valid rating ranges where practical.

Define the behavior for:

* invalid rating
* decimal rating
* null rating
* negative rating
* out-of-range rating

---

# 10. REVIEW CONTENT

Review title and body are user-generated content and therefore untrusted.

Implement:

* length validation
* Unicode-safe handling
* normalization where appropriate
* malicious markup handling
* HTML/script prevention
* injection protection
* safe serialization
* output encoding where required
* abuse controls

Do not allow arbitrary executable HTML.

Do not introduce a rich-text system unless the repository already requires one.

If plain text is used, enforce plain-text semantics.

---

# 11. REVIEW ELIGIBILITY

Implement server-side review eligibility.

A customer must not be able to create a review merely by knowing:

* product ID
* seller offer ID
* order ID
* order item ID

The backend must verify eligibility using authoritative order data.

Define and implement rules for:

* completed/delivered purchases
* cancelled orders
* unpaid orders
* failed payments
* returned items
* refunded items
* partially fulfilled orders
* partially returned quantities
* duplicate review attempts
* invalid order-item/product relationships

Do not trust customer-supplied relationships.

The backend must verify that the order item actually belongs to:

* the authenticated customer
* the requested product
* the relevant seller offer/variant where applicable.

---

# 12. VERIFIED PURCHASE

Implement a clear verification mechanism.

A review may receive a verified-purchase status only when the platform can prove the required purchase relationship from authoritative data.

Do not allow clients to submit:

```text
verifiedPurchase: true
```

and have the server trust it.

The verification status must be derived server-side.

Define behavior for:

* delivered order
* cancelled order
* refunded order
* returned order
* partially returned quantity
* multiple purchases
* multiple reviews if supported

Use explicit business rules.

---

# 13. REVIEW UNIQUENESS

Prevent duplicate reviews according to the actual marketplace policy.

At minimum consider:

* one review per customer/product
* one review per customer/order item
* repeated purchases
* multiple variants
* multiple seller offers
* edited reviews

Choose and implement a coherent policy.

Do not rely exclusively on application-level checks.

Where possible, enforce uniqueness with database constraints.

Where uniqueness depends on conditional business state, use transactional enforcement.

Prevent race conditions where two simultaneous requests create duplicate reviews.

---

# 14. REVIEW LIFECYCLE

Define explicit states.

The exact enum names may adapt to the existing repository.

A possible lifecycle is:

```text
PENDING_MODERATION
PUBLISHED
HIDDEN
REJECTED
REMOVED
```

Do not create arbitrary states.

Define valid transitions.

For every transition specify:

* who may trigger it
* authorization requirement
* database mutation
* audit requirement
* event emission
* effect on rating aggregation
* effect on search/read APIs

Prevent invalid state transitions.

---

# 15. REVIEW EDITING

Implement safe review editing.

Define:

* whether customers may edit reviews
* which fields may be edited
* whether rating can change
* whether media can change
* whether edited reviews require moderation again
* whether verification remains valid after editing
* edit timestamps
* audit requirements

Prevent unauthorized users from modifying another customer's review.

If editing changes rating or visibility, ensure rating aggregates remain correct.

Use transactions where multiple records must remain consistent.

---

# 16. REVIEW REMOVAL

Implement controlled removal.

A customer may have a self-service delete/removal capability if appropriate.

Administrators/moderators must be able to remove reviews according to permissions.

Do not physically destroy audit-critical information merely because a review becomes invisible.

Define:

* visibility behavior
* removal reason
* audit record
* aggregate recalculation
* event emission
* retention behavior

Respect privacy and applicable data deletion requirements while maintaining necessary audit integrity.

---

# 17. REVIEW MEDIA

Integrate reviews with the existing media system.

Do not create a second independent media-storage implementation.

Review media may include:

* images
* supported video where already supported by the platform

All uploads are untrusted.

Implement or integrate:

* file type validation
* file size validation
* content-type validation
* safe object keys
* ownership validation
* upload authorization
* processing state
* moderation state where applicable
* malware/security scanning boundary if supported
* thumbnail/variant processing where applicable
* cleanup of abandoned uploads
* CloudFront delivery where appropriate

Never trust:

* filename
* extension
* MIME type supplied only by the client
* object path supplied by the client

Review media must not expose private customer data through predictable storage paths.

---

# 18. REVIEW MEDIA OWNERSHIP

Ensure a user cannot attach another user's media asset to a review.

Validate server-side:

```text
media belongs to authenticated user
media is eligible for review attachment
media is not already improperly associated
media state allows publication
```

Prevent:

* IDOR
* arbitrary S3 object attachment
* cross-user media reuse
* unauthorized deletion
* orphaned media

Use existing media ownership infrastructure whenever possible.

---

# 19. RATING AGGREGATION

Implement product-level rating aggregation.

At minimum support:

* total review count
* average rating
* count of 1-star reviews
* count of 2-star reviews
* count of 3-star reviews
* count of 4-star reviews
* count of 5-star reviews

Do not calculate averages using floating-point money-like assumptions.

Define deterministic rounding/display behavior.

Consider whether aggregates should be:

* calculated dynamically
* stored transactionally
* maintained asynchronously
* materialized

Choose based on repository architecture and scale requirements.

The authoritative review records remain the source of truth.

If aggregate projections are introduced, document them as projections rather than independent truth.

---

# 20. AGGREGATION CONSISTENCY

Rating aggregates must correctly respond to:

* review creation
* review publication
* review rejection
* review hiding
* review removal
* review editing
* rating changes
* moderation changes

Do not count hidden/rejected/removed reviews unless the business rule explicitly requires it.

Prevent:

* double counting
* missed decrement
* negative counters
* stale aggregate corruption
* race-condition updates

If asynchronous aggregation is used:

* make consumers idempotent
* support retries
* support reconciliation
* define eventual-consistency behavior

---

# 21. REVIEW QUERIES

Implement customer-facing review retrieval.

Support:

* product reviews
* rating summary
* verified-purchase filtering
* rating filtering
* sorting
* pagination

Potential sort options:

* newest
* oldest
* highest rating
* lowest rating
* most helpful if a helpfulness system exists

Do not expose unsupported sort options.

Use stable pagination.

Prefer cursor pagination for high-volume review feeds where appropriate.

Avoid offset-based pagination for extremely large datasets when it creates unacceptable performance characteristics.

---

# 22. REVIEW FILTERING

Support safe filters such as:

* rating
* verified purchase
* publication state where authorized

Do not allow customers to query moderation-only data.

Customer-facing APIs must return only reviews they are authorized to see.

Administrative APIs may expose moderation state.

Seller APIs must expose only reviews related to products/offers they are authorized to manage.

---

# 23. SELLER REVIEW ACCESS

Implement seller access boundaries.

A seller must not be able to:

* read unrelated seller review moderation information
* modify customer reviews
* remove reviews merely because they are negative
* access private customer information unnecessarily
* access reviews belonging to another seller

Define exactly what seller users can access.

Seller roles must respect the existing authorization model.

If reviews are product-level rather than offer-level, carefully determine what seller information is exposed.

Do not create ambiguous ownership rules.

---

# 24. CUSTOMER REVIEW ACCESS

Authenticated customers may:

* create eligible reviews
* read published reviews
* read their own review state where appropriate
* edit their own review according to policy
* remove their own review where supported
* report inappropriate reviews

Customers must never be able to:

* modify another user's review
* manipulate verification state
* bypass moderation
* modify aggregate values
* alter review ownership

---

# 25. REVIEW REPORTING

Implement a review-reporting mechanism.

Customers should be able to report potentially abusive or inappropriate reviews.

Create a suitable model such as:

## ReviewReport

Potential fields:

* id
* reviewId
* reporterCustomerId
* reason
* description
* status
* createdAt
* resolvedAt
* resolvedBy
* resolutionReason

Adapt to repository conventions.

Prevent report abuse.

Consider whether the same customer may report the same review multiple times.

Prevent duplicate report spam.

---

# 26. REPORT REASONS

Use controlled server-side values.

Examples:

* SPAM
* OFFENSIVE_CONTENT
* HARASSMENT
* FRAUD
* PERSONAL_INFORMATION
* IRRELEVANT
* OTHER

Do not accept arbitrary moderation states from clients.

Allow an optional explanation where appropriate.

Validate its length and content.

---

# 27. MODERATION SYSTEM

Implement moderation workflows.

Moderators/administrators should be able to:

* view reported reviews
* inspect review state
* inspect report reasons
* hide reviews
* reject reviews
* restore eligible reviews
* remove reviews
* record moderation reasons

Use existing administrative authorization infrastructure.

Do not expose administrative moderation endpoints to normal customers.

---

# 28. MODERATION AUDIT

Every moderation action must be auditable.

Record:

* actor
* action
* review
* previous state
* new state
* reason
* timestamp
* request/correlation ID where available

Use the existing audit system rather than creating an unrelated audit implementation.

Never log unnecessary private content.

---

# 29. REVIEW ABUSE PREVENTION

Implement appropriate controls against:

* review spam
* automated review creation
* repeated submissions
* report spam
* account abuse
* brute-force review manipulation
* rating manipulation
* malicious media uploads

Use existing:

* authentication
* rate limiting
* Redis
* request context
* audit infrastructure

Do not make Redis the authoritative review store.

Define appropriate rate-limit keys and behavior.

---

# 30. REVIEW FRAUD SIGNALS

Where practical, create a foundation for detecting suspicious behavior.

Potential signals:

* unusually high review frequency
* repeated reviews from related accounts
* rapid review creation
* repeated identical content
* repeated media
* suspicious purchase/review patterns

Do not invent an AI fraud detection provider.

If advanced fraud detection is not implemented, create deterministic rule-based foundations and explicit extension points without fake functionality.

---

# 31. REVIEW API

Implement REST APIs consistent with the repository.

At minimum evaluate endpoints for:

### Customer

```text
POST   /api/v1/products/:productId/reviews
GET    /api/v1/products/:productId/reviews
GET    /api/v1/products/:productId/reviews/summary
GET    /api/v1/reviews/:reviewId
PATCH  /api/v1/reviews/:reviewId
DELETE /api/v1/reviews/:reviewId
POST   /api/v1/reviews/:reviewId/reports
```

Do not blindly use these exact paths if the repository already has established API conventions.

The APIs must have:

* DTOs
* validation
* authentication
* authorization
* status codes
* error contracts
* pagination
* filtering
* sorting
* OpenAPI documentation

---

# 32. REVIEW CREATION CONTRACT

Review creation must validate:

* authenticated customer
* product existence
* order-item eligibility
* purchase relationship
* fulfillment state
* duplicate-review rules
* rating
* title
* body
* media ownership
* media state
* seller/offer relationship where applicable

The server must derive:

* customer identity
* verification status
* eligible order relationship
* timestamps
* initial moderation state

Do not trust these from the client.

---

# 33. REVIEW UPDATE CONTRACT

Review updates must:

1. Authenticate the user.
2. Load the review.
3. Verify ownership.
4. Verify editable state.
5. Validate changes.
6. Re-run relevant moderation/eligibility rules.
7. Update rating aggregates if necessary.
8. Emit appropriate events.
9. Write audit information.
10. Return the canonical updated representation.

Prevent race conditions on concurrent edits.

---

# 34. REVIEW DELETION CONTRACT

Deletion/removal must:

* authenticate
* authorize
* validate current state
* preserve required audit information
* update visibility
* update aggregates
* remove/invalidate associated media as appropriate
* emit an event
* remain idempotent where practical

Do not allow deletion to corrupt rating aggregates.

---

# 35. ERROR HANDLING

Use the existing standardized error architecture.

Create explicit domain errors where needed, such as:

* REVIEW_NOT_FOUND
* REVIEW_NOT_ELIGIBLE
* REVIEW_ALREADY_EXISTS
* REVIEW_NOT_EDITABLE
* REVIEW_NOT_OWNED
* INVALID_REVIEW_RATING
* INVALID_REVIEW_STATE
* REVIEW_MEDIA_NOT_OWNED
* REVIEW_MEDIA_NOT_READY
* REVIEW_REPORT_ALREADY_EXISTS
* REVIEW_REPORT_NOT_ALLOWED
* REVIEW_MODERATION_FORBIDDEN

Do not expose sensitive internal information.

Use consistent HTTP status mapping.

---

# 36. EVENTS

Integrate reviews with the existing event/outbox architecture.

Define versioned domain events as appropriate.

Potential events:

```text
ReviewCreated
ReviewPublished
ReviewUpdated
ReviewHidden
ReviewRejected
ReviewRemoved
ReviewReported
ReviewModerated
ReviewRestored
RatingAggregateChanged
```

Use the existing event envelope.

Events should contain:

* event ID
* event type
* version
* aggregate ID
* occurred-at timestamp
* producer
* correlation ID
* causation ID where supported
* trace context where supported
* safe payload

Do not put unnecessary private review content into events.

---

# 37. TRANSACTIONAL OUTBOX

If the repository already uses an outbox:

* reuse it.

Review state changes and corresponding outbox records must be written atomically when required.

Do not publish a critical review event before its database transaction commits.

Consumers must be idempotent.

---

# 38. SEARCH INTEGRATION BOUNDARY

If the repository already contains a search subsystem, expose the review information required for search/index projections without making Reviews depend synchronously on search availability.

For example:

* rating summary
* review count
* verified review count

Do not make product review creation fail merely because Elasticsearch/OpenSearch is temporarily unavailable.

Use events/projections where appropriate.

Do not implement the complete search engine in this volume.

---

# 39. NOTIFICATION INTEGRATION BOUNDARY

If notifications already exist, reviews may produce events for future notifications such as:

* review published
* review reported
* moderation result

Do not implement a second notification system.

Do not synchronously depend on email/push infrastructure for core review persistence.

---

# 40. REDIS

Redis may be used for:

* rate limiting
* temporary anti-abuse counters
* short-lived moderation coordination
* cache where appropriate

Redis must not be the authoritative source for:

* review records
* rating totals
* review ownership
* moderation state

Every Redis key must have:

* clear purpose
* namespace
* TTL when appropriate
* invalidation behavior
* failure behavior

---

# 41. DATABASE CONSTRAINTS

Use PostgreSQL constraints and indexes appropriately.

Consider indexes for:

* productId
* customerId
* orderId
* orderItemId
* sellerOfferId
* moderationStatus
* visibilityStatus
* verificationStatus
* createdAt
* rating
* report status

Add compound indexes based on actual query patterns.

Avoid indiscriminate indexing.

Document important uniqueness constraints.

---

# 42. CONCURRENCY

Review operations must be safe under concurrent requests.

Test cases must include:

* two simultaneous review creations
* simultaneous review edits
* simultaneous review removal
* moderation concurrent with customer edit
* aggregate updates under concurrency
* duplicate report submissions
* duplicate media attachments

Use transactions and appropriate database constraints/locking where necessary.

Do not rely on application-level checks alone when a database constraint can enforce correctness.

---

# 43. PRIVACY

Review APIs must not accidentally expose:

* private customer email
* phone number
* address
* payment information
* internal account IDs where not required
* moderation-only information
* private media
* internal fraud signals

Define exactly which customer identity information is publicly visible.

If reviewer display names are supported, derive them from the appropriate customer profile/privacy settings.

Do not expose unnecessary personal information.

---

# 44. SECURITY

Threat-model the review system for:

* IDOR
* privilege escalation
* review impersonation
* review ownership bypass
* rating manipulation
* moderation bypass
* report abuse
* XSS
* HTML injection
* SQL injection
* malicious media
* unauthorized S3 access
* enumeration
* rate-limit bypass
* automated review spam
* seller abuse
* administrative endpoint abuse

Implement server-side controls.

---

# 45. OBSERVABILITY

Integrate with existing observability.

Add:

* structured logs
* metrics
* traces
* audit events

Track important metrics such as:

* review creation attempts
* successful review creation
* rejected review attempts
* moderation actions
* reports
* review publication latency
* rating aggregate updates
* media processing failures
* review API latency
* review API error rate
* abuse/rate-limit events

Never log:

* passwords
* authentication tokens
* payment credentials
* secrets
* unnecessary private customer data

---

# 46. TESTING

Implement real tests.

At minimum cover:

## Unit tests

* review eligibility
* verified-purchase determination
* review state transitions
* edit rules
* deletion rules
* rating validation
* moderation policies
* report policies
* aggregation logic

## Database/integration tests

* review creation
* duplicate prevention
* order-item ownership
* product relationship
* aggregate updates
* concurrent operations
* report uniqueness
* moderation transitions

## API tests

* authentication
* authorization
* validation
* pagination
* filtering
* sorting
* error responses

## Security tests

* IDOR attempts
* seller isolation
* customer isolation
* unauthorized moderation
* media ownership bypass
* malformed input
* XSS payloads
* rate-limit behavior

## Concurrency tests

Explicitly test simultaneous requests that could otherwise create:

* duplicate reviews
* inconsistent aggregates
* duplicate reports
* conflicting state transitions

---

# 47. MIGRATIONS

Create proper Prisma migrations.

Requirements:

* safe migration strategy
* backward-compatible deployment considerations
* appropriate indexes
* foreign keys
* unique constraints
* enum changes handled safely
* no destructive production migration without justification

Never manually edit production data through application startup.

---

# 48. SEED DATA

If the repository has a seed system, extend it where useful.

Seed only deterministic development/test data.

Never seed:

* real credentials
* real customer information
* production secrets
* fake external provider credentials

---

# 49. OPENAPI

Document all new endpoints.

OpenAPI must describe:

* authentication
* parameters
* request bodies
* response schemas
* pagination
* errors
* authorization expectations
* relevant enums

Do not leave the API undocumented.

---

# 50. PERFORMANCE

Review queries must remain efficient at marketplace scale.

Inspect query plans where appropriate.

Avoid:

* N+1 queries
* loading all reviews into memory
* unbounded queries
* unnecessary joins
* repeated aggregate calculations
* inefficient pagination
* synchronous external calls inside critical review transactions

Use appropriate:

* indexes
* pagination
* projections
* batching
* caching where justified

---

# 51. FAILURE BEHAVIOR

Define behavior when:

* database temporarily fails
* Redis fails
* media processing fails
* event publishing is delayed
* search is unavailable
* queue workers are unavailable

Core review persistence should remain correct even when noncritical infrastructure is unavailable.

Do not silently lose review events.

Do not falsely report successful asynchronous processing when it failed.

---

# 52. BACKGROUND JOBS

If review-related asynchronous processing is required, use the existing BullMQ infrastructure.

Potential jobs:

* review moderation processing
* media processing coordination
* aggregate reconciliation
* abandoned media cleanup
* report escalation
* review consistency reconciliation

Each job must define:

* purpose
* input
* idempotency key
* retry behavior
* timeout
* backoff
* concurrency
* failure handling
* DLQ behavior if supported
* observability

Do not create jobs without a real operational purpose.

---

# 53. RECONCILIATION

Where aggregates or projections can drift, implement a safe reconciliation mechanism.

For example:

* recompute product rating summary from authoritative reviews
* detect aggregate mismatch
* repair projection
* audit the repair

Reconciliation must not silently overwrite valid data without clear rules.

---

# 54. ADMINISTRATION

Integrate review moderation with the existing administration system.

Provide authorized administrative functionality for:

* reviewing reports
* searching reviews
* filtering by moderation state
* inspecting review metadata
* changing moderation state
* recording reasons
* viewing audit history

Do not expose these APIs to normal customers.

Use least privilege.

---

# 55. SELLER EXPERIENCE

Where seller-facing review functionality is supported, implement only legitimate seller capabilities.

Sellers may potentially:

* view reviews for their products/offers
* inspect aggregated ratings
* access allowed review metadata
* respond to reviews only if the platform explicitly supports seller responses

Do not automatically add seller responses if that feature is not part of the existing product requirements.

Sellers must not:

* edit reviews
* delete reviews
* manipulate ratings
* access unrelated customer information

---

# 56. API RESPONSE DESIGN

Public review responses should contain only appropriate information.

A review response may include:

* review ID
* reviewer display information
* rating
* title
* body
* verified-purchase indicator
* media references
* created date
* edited indicator
* publication information appropriate for public consumers

Do not expose:

* internal moderation notes
* internal audit IDs
* private customer identifiers
* fraud scores
* internal seller information
* database implementation details

---

# 57. DATA RETENTION

Define retention behavior for:

* reviews
* reports
* moderation records
* audit events
* media

Respect the repository's privacy/deletion architecture.

Do not use hard deletion where it would violate required auditability.

Do not retain unnecessary personal data indefinitely.

---

# 58. DOMAIN EVENTS AND FUTURE INTEGRATION

The implementation should establish clean integration points for later:

* Search
* Notifications
* Analytics
* Recommendations
* Seller analytics
* Trust and safety systems

Do not implement those entire domains here.

Events must be sufficient for future consumers without creating tight synchronous coupling.

---

# 59. FILE ORGANIZATION

Follow the repository's existing organization.

Where a new Reviews module is required, maintain clear separation between:

* domain
* application/use cases
* infrastructure
* persistence
* controllers
* DTOs
* guards/policies
* repositories
* event handlers
* jobs
* tests

Do not force a directory structure if the repository already follows a different but coherent architecture.

Consistency with the existing project is more important than arbitrary folder naming.

---

# 60. QUALITY REQUIREMENTS

The resulting implementation must be:

* production-ready
* type-safe
* testable
* secure
* observable
* maintainable
* horizontally scalable
* transactionally correct
* backward-compatible
* documented

Do not leave incomplete methods.

Do not leave placeholder implementations.

Do not leave fake integrations.

Do not create duplicate domain systems.

---

# 61. VALIDATION

After implementation, run the repository's appropriate:

* dependency checks
* formatting
* linting
* TypeScript compilation
* Prisma validation
* Prisma generation
* migrations
* unit tests
* integration tests
* API tests
* security tests
* relevant end-to-end tests

Fix real errors before considering the volume complete.

If an external dependency cannot be tested because credentials or infrastructure are unavailable, report that limitation accurately rather than fabricating successful results.

---

# 62. BACKWARD COMPATIBILITY

Before changing existing models or APIs:

1. Inspect existing consumers.
2. Preserve existing contracts where possible.
3. Use additive migrations when possible.
4. Avoid breaking existing frontend/mobile clients.
5. Preserve existing authentication and authorization behavior.
6. Preserve existing event compatibility.

If a breaking change is genuinely required, document:

* why
* affected contracts
* migration strategy
* compatibility strategy

---

# 63. IMPLEMENTATION BOUNDARY

This volume should implement:

* Reviews
* Ratings
* Review eligibility
* Verified purchases
* Review lifecycle
* Review editing/removal
* Review media integration
* Review reporting
* Moderation
* Rating aggregation
* Customer review APIs
* Seller review access where appropriate
* Administrative moderation APIs
* Review events
* Review jobs where justified
* Audit
* Security
* Observability
* Testing
* Documentation

Do NOT turn this volume into a separate implementation of:

* Search
* Recommendations
* Notifications
* Analytics
* Seller payouts
* Advanced warehouse management
* Tax remittance
* Full carrier integrations

Those systems should integrate through the existing architecture and may be implemented in later backend units.

---

# 64. NON-NEGOTIABLE RULES

Never:

* trust client-provided customer identity
* trust client-provided verified-purchase state
* trust client-provided seller ownership
* trust client-provided order relationships
* allow cross-customer review modification
* allow cross-seller access
* allow arbitrary moderation
* allow duplicate reviews when prohibited
* allow invalid ratings
* allow unauthorized media attachment
* expose private customer data
* store secrets in source code
* use Redis as authoritative review storage
* silently lose events
* create fake provider integrations
* bypass database constraints when correctness requires them
* create TODO implementations
* create placeholder endpoints
* create mock production behavior
* claim tests passed when they did not
* claim implementation exists when it does not

---

# 65. FINAL IMPLEMENTATION REPORT

At the end, provide a factual implementation report based only on the repository after your changes.

Include:

## Implemented

Exact functionality actually implemented.

## Files Added

List actual files added.

## Files Modified

List actual files modified.

## Database Changes

List actual migrations/models/indexes/constraints.

## APIs Added or Changed

List actual endpoints and contracts.

## Events Added

List actual events.

## Jobs Added

List actual background jobs.

## Security Controls

List actual controls implemented.

## Tests

List actual tests created or modified and actual validation results.

## Validation

Report actual:

* build result
* typecheck result
* lint result
* migration result
* test result

## Limitations

Clearly identify anything that could not be completed and why.

Do not describe planned work as implemented work.

---

# 66. FINAL INSTRUCTION

Inspect the actual repository first.

Then implement the complete **Reviews, Ratings, Review Media, Verification, Reporting, Moderation, and Rating Aggregation backend capability** described above as a production-grade extension of the existing ecommerce marketplace.

Make real repository changes.

Reuse existing architecture and contracts.

Do not create a competing implementation.

Do not stop at an outline.

Do not provide pseudo-code instead of implementation.

Do not leave placeholders.

Validate the implementation.

Report only facts about the actual resulting repository.

This prompt is a standalone implementation unit of one coherent ecommerce marketplace system, and the resulting code must remain compatible with the rest of the marketplace as it exists in the repository.
