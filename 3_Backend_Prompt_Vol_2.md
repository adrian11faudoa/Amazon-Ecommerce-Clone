# Amazon Ecommerce Marketplace

## Backend Implementation Prompt — Volume 2

### Catalog, Products, Variants, SKUs, Categories, Brands, Sellers, Offers, Pricing, Promotions, and Marketplace Foundations

---

# ROLE

You are the senior backend engineering team responsible for implementing the next production-grade commerce domain layer of an original ecommerce marketplace.

The platform is an **Amazon-style ecommerce marketplace**, not proprietary Amazon software.

You are responsible for implementing real production functionality in the actual repository.

Act as:

* Principal Software Architect
* Staff Backend Engineer
* Database Architect
* Domain-Driven Design Engineer
* Security Engineer
* Distributed Systems Engineer
* QA Engineer

Do not act as a teacher.

Implement the system.

---

# 1. STANDALONE EXECUTION REQUIREMENT

This prompt is completely standalone.

Do not assume:

* another prompt exists
* another conversation exists
* a previous architecture document is available
* Claude remembers previous instructions
* another implementation phase was completed

The actual repository is the only source of implementation state.

Inspect it first.

If functionality already exists:

* preserve it
* reuse it
* extend it
* repair it where necessary
* avoid duplicate implementations

This prompt describes one implementation unit of one coherent ecommerce marketplace.

It must integrate with the repository's actual existing contracts.

---

# 2. PROJECT CONTEXT

Implement the marketplace domains required to establish a production catalog and seller commerce foundation.

This volume covers:

* products
* product variants
* SKUs
* categories
* brands
* attributes
* product media references
* sellers
* seller users
* seller roles
* seller offers
* pricing
* price history
* promotions
* coupons
* seller/catalog authorization
* catalog visibility
* marketplace ownership boundaries

These domains will later support:

* inventory
* cart
* checkout
* orders
* fulfillment
* reviews
* search
* recommendations

Do not implement those future domains unless required to integrate with existing repository functionality.

---

# 3. TECHNOLOGY BASELINE

Use the repository's actual stack when compatible.

Baseline:

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch where already required
* AWS S3 for media storage where already integrated
* REST
* OpenAPI/Swagger
* BullMQ for asynchronous work
* Kafka/Redpanda where justified

Do not introduce alternative technologies without a clear repository-specific reason.

---

# 4. FIRST ACTION — REPOSITORY AUDIT

Before changing anything, inspect:

* backend structure
* existing modules
* Prisma schema
* Prisma migrations
* authentication
* authorization
* user model
* customer model
* address model
* database utilities
* API conventions
* DTO conventions
* error handling
* pagination
* logging
* event infrastructure
* Redis infrastructure
* queue infrastructure
* media infrastructure
* search infrastructure
* tests

Determine whether any catalog/seller/pricing functionality already exists.

Do not overwrite existing work.

Identify compatibility requirements before implementation.

---

# 5. DOMAIN MODULES

Establish clear modules for:

* Catalog
* Category
* Brand
* Product
* Pricing
* Seller
* Offer
* Promotion
* Coupon

Separate infrastructure from domain logic.

Do not create a single giant `ProductsService` responsible for unrelated marketplace behavior.

---

# 6. CATALOG DOMAIN

Implement the catalog as the authoritative product information system.

The catalog must distinguish:

* Product
* ProductVariant
* SKU
* SellerOffer

Do not collapse these entities into one model.

The catalog controls product identity and customer-facing product information.

Seller offers control seller-specific commercial availability.

---

# 7. PRODUCT MODEL

Implement Product.

At minimum support:

* ID
* title
* slug
* description
* brand relationship
* category relationship
* product type
* status
* metadata where justified
* createdAt
* updatedAt
* publishedAt
* archivedAt where appropriate

Define proper constraints.

Product title and slug behavior must be explicitly validated.

---

# 8. PRODUCT STATUS

Implement controlled product lifecycle states.

At minimum support:

* DRAFT
* PENDING_REVIEW
* ACTIVE
* SUSPENDED
* ARCHIVED

Enforce valid transitions.

Do not permit arbitrary status updates from ordinary seller/customer endpoints.

Define who can perform each transition.

---

# 9. PRODUCT SLUG

Implement stable public product slugs.

Requirements:

* human-readable
* unique
* normalized
* safe for URLs
* deterministic where possible

If a title changes, do not automatically break existing URLs without an explicit strategy.

Define redirect/history behavior if the repository supports SEO-friendly URL history.

---

# 10. PRODUCT DESCRIPTION

Support structured product information where appropriate.

Do not blindly permit arbitrary HTML.

Protect against:

* stored XSS
* malicious embedded content
* unsafe URLs
* scripts
* dangerous markup

Sanitize rich content server-side if rich text is supported.

---

# 11. PRODUCT VARIANTS

Implement ProductVariant.

A variant represents a customer-visible configuration such as:

* color
* size
* storage
* capacity
* configuration

A product may have:

* zero variants
* one variant
* multiple variants

Define how simple products map to sellable SKUs.

Do not duplicate product-level information unnecessarily.

---

# 12. PRODUCT ATTRIBUTES

Implement structured attributes.

Support:

* attribute definitions
* attribute values
* variant-specific values
* product-level values where appropriate
* ordering
* display labels
* normalized values

Examples:

* Color
* Size
* Material
* Storage
* Capacity

Define validation so a variant cannot contain invalid attribute combinations.

---

# 13. SKU MODEL

Implement SKU as the inventory-identifiable sellable unit.

A SKU must have:

* unique identifier
* product relationship
* variant relationship where applicable
* merchant/internal SKU code where applicable
* status
* metadata where justified
* timestamps

Define uniqueness rules.

The SKU must be suitable for later inventory reservation.

---

# 14. SKU LIFECYCLE

Define states such as:

* ACTIVE
* INACTIVE
* DISCONTINUED

Do not delete SKUs that are referenced by historical commerce records.

Historical references must remain valid.

---

# 15. SKU UNIQUENESS

Enforce uniqueness at the correct ownership boundary.

If sellers can define seller-specific SKU codes, do not globally require those codes to be unique unless the business model requires it.

Distinguish:

* platform SKU
* seller SKU
* offer identifier

---

# 16. CATEGORY DOMAIN

Implement hierarchical categories.

Support:

* category name
* slug
* parent category
* status
* display order
* metadata
* timestamps

Define:

* maximum depth if applicable
* circular-reference prevention
* parent validation
* deletion behavior

A category cannot become its own descendant.

---

# 17. CATEGORY TREE OPERATIONS

Implement safe operations for:

* create
* update
* move
* activate
* suspend
* archive

Moving a category must validate that it does not create a cycle.

Define behavior for products assigned to archived categories.

---

# 18. CATEGORY PATH

Provide a reliable category hierarchy representation for:

* product pages
* breadcrumbs
* search
* navigation
* SEO

Avoid repeatedly calculating expensive recursive relationships at request time if a materialized path or equivalent strategy is justified.

Choose the simplest strategy compatible with expected scale.

---

# 19. BRAND DOMAIN

Implement Brand.

Support:

* name
* normalized name
* slug
* status
* description where applicable
* media reference where applicable
* timestamps

Prevent duplicate brands caused by trivial case/format variations where appropriate.

---

# 20. BRAND OWNERSHIP

Define who may:

* create brands
* modify brands
* associate products
* suspend brands
* archive brands

Do not allow sellers to arbitrarily create authoritative platform brands unless the repository's business model explicitly supports seller-created brands.

---

# 21. PRODUCT MEDIA REFERENCES

Integrate Product with the existing media infrastructure.

A product media association must support:

* media ID
* product ID
* variant association where applicable
* display order
* primary image designation
* media role
* visibility

Do not duplicate S3 object storage logic inside the catalog domain.

Use the existing media abstraction if available.

---

# 22. CATALOG OWNERSHIP

Define product ownership.

The architecture must support the distinction between:

* platform-owned catalog content
* seller-managed content
* seller offer content

Do not allow one seller to modify another seller's product information merely because they sell the same SKU.

Define which catalog fields are:

* platform controlled
* seller editable
* administrator editable

---

# 23. SELLER DOMAIN

Implement Seller.

At minimum support:

* seller ID
* legal/business name where appropriate
* display name
* slug
* status
* contact information
* timestamps
* onboarding state where appropriate

Avoid storing unnecessary regulated financial information in the seller profile.

---

# 24. SELLER STATUS

Implement controlled states such as:

* PENDING
* ACTIVE
* SUSPENDED
* REJECTED
* CLOSED

Define legal transitions.

A suspended seller must not be able to create new offers or perform restricted commerce actions.

Existing historical orders must remain accessible according to authorization rules.

---

# 25. SELLER USERS

Implement seller membership.

A seller may have multiple users.

Support:

* seller-user relationship
* role
* status
* invitation state where applicable
* timestamps

Enforce seller ownership on every seller-scoped query.

---

# 26. SELLER ROLES

Support appropriate seller roles such as:

* SELLER_OWNER
* SELLER_ADMIN
* SELLER_OPERATOR
* SELLER_VIEWER

Define permissions explicitly.

Do not rely solely on role names inside controllers.

Use a reusable authorization mechanism.

---

# 27. SELLER ISOLATION

This is a mandatory security boundary.

Every seller-scoped operation must enforce:

* authenticated identity
* seller membership
* seller role
* target seller ownership

Test attempts to access another seller's:

* profile
* users
* offers
* prices
* catalog data where restricted
* seller inventory references
* analytics references

Return safe authorization failures.

Do not leak whether another seller's private resource exists when the security model requires indistinguishable behavior.

---

# 28. SELLER OFFER DOMAIN

Implement SellerOffer.

An offer connects:

**Seller → SKU → commercial terms**

An offer should support:

* offer ID
* seller ID
* SKU ID
* price relationship
* condition
* fulfillment method
* status
* seller SKU where appropriate
* seller-specific metadata
* timestamps

---

# 29. OFFER STATUS

Implement controlled states such as:

* DRAFT
* ACTIVE
* PAUSED
* SUSPENDED
* ENDED

Define transitions.

A suspended seller must not have active public offers.

Offer visibility must be evaluated server-side.

---

# 30. OFFER UNIQUENESS

Define whether a seller can have multiple active offers for the same SKU.

Unless there is a justified reason otherwise:

* one seller should have one canonical active offer per SKU/condition/fulfillment combination

Enforce appropriate uniqueness constraints.

Do not rely exclusively on application checks.

---

# 31. CONDITION MODEL

If marketplace conditions are supported, use explicit values such as:

* NEW
* USED
* REFURBISHED
* OPEN_BOX

Do not store arbitrary condition strings when the business logic requires controlled behavior.

Define which conditions are permitted for each product/seller configuration.

---

# 32. PRICING DOMAIN

Implement pricing as a dedicated domain.

Do not place all price logic inside Product or SellerOffer.

Support:

* current price
* compare-at/reference price where applicable
* currency
* effective period
* price history

Money must use exact representation.

---

# 33. PRICE MODEL

Implement a canonical price representation.

At minimum:

* amount in minor currency units
* ISO currency code
* effectiveAt
* expiresAt where applicable
* seller/offer relationship
* status where necessary

Never use JavaScript floating-point values as authoritative monetary storage.

---

# 34. PRICE HISTORY

Maintain price history where required.

Record:

* previous amount
* new amount
* currency
* actor/source
* effective timestamp
* offer ID
* reason where appropriate

Historical price records must not be silently rewritten.

---

# 35. PRICE UPDATE

Implement secure seller price updates.

Validate:

* seller ownership
* offer status
* currency
* amount
* maximum/minimum business limits
* effective dates

A seller must not be able to modify another seller's offer price.

---

# 36. PRICE CONSISTENCY

The API must never present a price as guaranteed for checkout merely because it was returned by an earlier product request.

The later checkout domain will revalidate authoritative pricing.

Do not treat cached product responses as transactional pricing authority.

---

# 37. PROMOTION DOMAIN

Implement foundational promotions.

Support appropriate promotion types such as:

* percentage discount
* fixed amount discount
* product-specific discount
* category discount
* seller-specific promotion
* minimum-order promotion

Define applicability rules.

---

# 38. PROMOTION LIFECYCLE

Implement states:

* DRAFT
* SCHEDULED
* ACTIVE
* PAUSED
* EXPIRED
* CANCELLED

Define transition rules.

Promotions must not become active outside their configured validity period.

---

# 39. PROMOTION OWNERSHIP

Define whether a promotion belongs to:

* platform
* seller

Seller promotions must be seller-scoped.

A seller must not be able to create or modify platform promotions.

---

# 40. PROMOTION PRIORITY AND STACKING

Define:

* priority
* stacking
* exclusivity
* maximum discounts
* order-level vs item-level discounts

Do not allow ambiguous discount application.

Create deterministic rules for multiple eligible promotions.

---

# 41. COUPON DOMAIN

Implement coupons.

Support:

* coupon code
* normalized code
* promotion relationship
* seller/platform ownership
* validity period
* usage limit
* per-customer usage limit
* minimum order requirement
* status

Coupon codes must be treated case-insensitively if that is the selected business rule.

---

# 42. COUPON SECURITY

Protect against:

* brute-force coupon discovery
* enumeration
* repeated redemption
* concurrent redemption
* unauthorized seller use
* expired coupon reuse

Rate-limit coupon validation where appropriate.

Do not reveal excessive information about invalid coupons.

---

# 43. COUPON REDEMPTION FOUNDATION

Create the persistent redemption model needed for future checkout.

It must support:

* coupon
* customer
* order/checkout reference where appropriate
* redemption timestamp
* status

Design unique constraints to prevent duplicate redemption where business rules require it.

Future checkout implementation must be able to make redemption concurrency-safe.

---

# 44. PRODUCT API

Implement REST endpoints appropriate to the repository for:

* create product
* retrieve product
* update product
* list products
* publish product
* suspend product
* archive product

Separate customer/public endpoints from administrative/seller endpoints.

Do not expose internal management fields to public clients.

---

# 45. PRODUCT QUERY

Public product retrieval must return only publicly visible information.

Respect:

* product status
* seller/offer visibility
* media visibility
* category visibility
* brand visibility

Do not expose:

* internal moderation notes
* internal seller metadata
* audit metadata
* private operational fields

---

# 46. PRODUCT LISTING

Implement scalable product listing.

Support appropriate:

* cursor pagination
* category filtering
* brand filtering
* status filtering for authorized users
* sorting

Do not load unbounded collections.

Use indexes aligned with actual queries.

---

# 47. CATEGORY API

Implement appropriate endpoints for:

* category retrieval
* category listing
* category tree
* administrative creation/update
* status changes

Customer-facing category responses must only expose active/public categories.

---

# 48. BRAND API

Implement:

* public brand retrieval/listing
* authorized brand management

Respect brand status.

Avoid exposing administrative metadata publicly.

---

# 49. SELLER API

Implement appropriate endpoints for:

* seller onboarding
* seller profile
* seller status management
* seller users
* seller membership

Public seller information must be separated from private seller information.

---

# 50. SELLER OFFER API

Implement:

* create offer
* retrieve offer
* update offer
* activate offer
* pause offer
* list seller offers

Every seller mutation must enforce seller ownership.

---

# 51. PRICING API

Implement:

* retrieve offer price
* update price
* retrieve price history where authorized

Do not allow public clients to mutate prices.

---

# 52. PROMOTION API

Implement appropriate management endpoints for:

* create promotion
* update promotion
* activate
* pause
* cancel
* retrieve
* list

Enforce platform/seller ownership boundaries.

---

# 53. COUPON API

Implement appropriate endpoints for:

* create coupon
* update coupon
* retrieve coupon
* list coupons
* validate coupon where appropriate

Do not expose coupon usage information to unauthorized sellers.

---

# 54. DTO ARCHITECTURE

Create clear request/response DTOs.

Do not reuse Prisma models directly as public API contracts.

DTOs must:

* validate input
* control output
* prevent accidental field exposure
* remain stable independently from persistence

---

# 55. AUTHORIZATION

Every management endpoint must enforce authorization.

Examples:

A customer cannot:

* create products
* modify sellers
* modify prices
* create promotions

A seller cannot:

* modify another seller's offer
* change platform-owned product fields
* modify platform promotions
* modify another seller's coupons

An administrator may have elevated permissions according to the repository's role model.

---

# 56. DATABASE CONSTRAINTS

Implement database-level constraints for critical invariants.

Examples:

* unique product slug
* unique category slug
* valid seller membership uniqueness
* offer ownership relationships
* coupon uniqueness
* valid foreign keys
* appropriate unique price relationships

Application validation remains necessary, but database constraints must protect critical integrity.

---

# 57. TRANSACTIONAL OPERATIONS

Use transactions where multiple records must change atomically.

Examples:

### Product publication

Product state + related publication metadata where applicable.

### Seller onboarding

Seller + initial owner membership.

### Offer creation

Offer + initial price where appropriate.

### Promotion creation

Promotion + rules where atomicity is required.

Do not keep transactions open across unnecessary external network calls.

---

# 58. CONCURRENCY

Explicitly handle concurrency for:

* offer creation
* price updates
* coupon creation
* coupon redemption preparation
* category movement
* seller status changes
* product publication

Use:

* database constraints
* transactions
* row locking
* optimistic concurrency
* version fields

where appropriate.

---

# 59. EVENT EMISSION

Emit domain events for meaningful changes.

At minimum establish events such as:

* ProductCreated
* ProductUpdated
* ProductPublished
* ProductSuspended
* ProductArchived
* CategoryChanged
* BrandChanged
* SellerCreated
* SellerActivated
* SellerSuspended
* OfferCreated
* OfferUpdated
* OfferActivated
* OfferPaused
* PriceChanged
* PromotionActivated
* PromotionExpired
* CouponCreated

Use the repository's established event infrastructure.

Events must contain:

* event ID
* event type
* version
* aggregate ID
* producer
* occurredAt
* correlation ID
* causation ID where available
* payload

---

# 60. OUTBOX

For domain mutations that produce durable events, use the transactional outbox where the repository's event architecture supports it.

The database transaction should atomically persist:

* domain change
* outbox event

Do not publish an event first and then hope the database transaction succeeds.

---

# 61. SEARCH INTEGRATION

If search infrastructure already exists, integrate catalog changes into it.

If it does not yet exist, establish the correct event contract needed for the later search implementation without creating a fake search system.

Catalog changes that affect public search should eventually produce sufficient events for:

* indexing
* updating
* removal

Search must remain a projection, not the source of truth.

---

# 62. CACHE INTEGRATION

If Redis caching is implemented for catalog resources, use explicit namespaces.

Examples conceptually:

* product
* category
* brand
* seller
* offer

Every cache entry must have:

* purpose
* TTL
* invalidation event
* stale behavior

Never cache seller-private information under shared public keys.

---

# 63. CACHE INVALIDATION

Invalidate appropriate cached data when:

* product changes
* category changes
* brand changes
* seller status changes
* offer changes
* price changes
* promotion state changes

Do not rely on TTL alone for critical freshness requirements.

---

# 64. PUBLIC CATALOG CONSISTENCY

Public product retrieval must correctly account for:

* product status
* category status
* brand status
* seller status
* offer status

A public product must not accidentally expose suspended or invalid commercial offers.

---

# 65. PRICE EXPOSURE

Public price responses must clearly distinguish:

* current authoritative price
* compare-at/reference price
* currency
* seller offer

Do not imply inventory availability unless inventory is actually integrated and authoritative.

Do not expose stale cached prices as guaranteed checkout prices.

---

# 66. MEDIA SECURITY

When attaching media:

* validate ownership
* validate media status
* validate allowed media type
* prevent unauthorized attachment of another user's media
* respect moderation status
* respect visibility

Do not trust a client-provided media ID without verifying ownership/permission.

---

# 67. INPUT SECURITY

Protect catalog APIs against:

* XSS
* injection
* oversized payloads
* malicious strings
* invalid identifiers
* dangerous URLs
* unexpected JSON structures
* abuse through extremely large attribute collections

Set reasonable limits.

---

# 68. RATE LIMITING

Apply appropriate rate limits to:

* seller product creation
* product updates
* offer creation
* price updates
* promotion creation
* coupon validation
* seller management
* public catalog listing/search-adjacent APIs

Do not make public product retrieval unusably restrictive.

---

# 69. AUDIT LOGGING

Audit sensitive operations.

At minimum:

* seller status changes
* seller membership changes
* product moderation
* product publication
* offer activation/suspension
* price changes
* promotion activation
* coupon changes
* administrative catalog changes

Do not log secrets or unnecessary personal data.

---

# 70. OBSERVABILITY

Instrument:

* catalog API latency
* seller API latency
* offer mutation failures
* price update failures
* promotion failures
* database query latency
* Redis failures
* event publication failures
* outbox backlog

Use structured logs and request/correlation IDs.

---

# 71. TESTING — UNIT

Add unit tests for:

* product lifecycle
* category lifecycle
* category cycle prevention
* seller lifecycle
* seller authorization
* offer lifecycle
* price validation
* promotion eligibility rules
* coupon validation
* DTO validation
* slug normalization

Test edge cases.

---

# 72. TESTING — DATABASE

Add integration tests for:

* uniqueness
* foreign keys
* seller ownership
* offer uniqueness
* category relationships
* product relationships
* promotion ownership
* coupon uniqueness
* transaction rollback
* concurrent constraint behavior

---

# 73. TESTING — API

Test:

* public product retrieval
* authorized product management
* seller offer management
* cross-seller access attempts
* category management
* brand management
* pricing
* promotions
* coupons
* validation errors
* authentication failures
* authorization failures
* pagination

---

# 74. SECURITY TESTING

Explicitly test:

### IDOR

Seller A cannot access seller B's private offer.

### Privilege escalation

Seller operator cannot perform owner-only operations.

### Catalog abuse

Unauthorized users cannot publish/suspend products.

### Price manipulation

Unauthorized users cannot modify prices.

### Coupon abuse

Unauthorized users cannot modify seller/platform coupons.

### Media ownership

A seller cannot attach another user's private media.

---

# 75. PERFORMANCE

Optimize common catalog queries.

Ensure appropriate indexes exist for:

* slug
* status
* category
* brand
* seller
* offer
* price
* timestamps

Avoid:

* N+1 relationships
* unbounded queries
* unnecessary joins
* repeated recursive category queries

Use Prisma query selection deliberately.

---

# 76. API DOCUMENTATION

Update OpenAPI documentation for all implemented endpoints.

Document:

* authentication
* authorization
* request DTOs
* response DTOs
* pagination
* error codes
* status codes

Documentation must match actual behavior.

---

# 77. BACKWARD COMPATIBILITY

If the repository already contains product/seller/pricing APIs:

* preserve compatible behavior
* avoid breaking clients
* migrate incrementally
* document incompatible changes
* maintain API versioning where required

Do not duplicate endpoints merely because naming differs.

---

# 78. MIGRATIONS

Create safe Prisma migrations for all required database changes.

Follow:

* expand/contract principles
* non-destructive migration
* appropriate indexes
* safe uniqueness migration
* production deployment compatibility

Do not delete existing production data.

---

# 79. SEED DATA

If the repository already uses development seed data, update it carefully.

Development seed data may include:

* categories
* brands
* example products
* sellers
* offers

Never seed fake credentials or production secrets.

Clearly distinguish development seed data from production data.

---

# 80. FINAL VALIDATION

Run the actual repository validation commands.

At minimum where applicable:

* Prisma validation
* migration validation
* TypeScript type checking
* linting
* unit tests
* integration tests
* API tests
* production build

Fix real errors.

Do not suppress failures merely to obtain a successful build.

---

# 81. IMPLEMENTATION BOUNDARY

Do not fully implement the following domains in this volume unless they already exist and require integration:

* inventory engine
* cart
* checkout
* order processing
* Stripe payment processing
* fulfillment
* returns
* reviews
* notifications
* analytics

This volume must establish the contracts those domains will consume.

---

# 82. FINAL REPOSITORY REVIEW

Before finishing, verify:

### Catalog

* Product works
* Variant works
* SKU works
* Category works
* Brand works
* Media associations are secure

### Seller

* Seller lifecycle works
* Seller users work
* Seller roles work
* seller isolation works

### Offers

* Offer lifecycle works
* Offer ownership works
* uniqueness works

### Pricing

* exact money representation
* price updates work
* history is preserved

### Promotions

* lifecycle works
* ownership works
* eligibility rules are deterministic

### Coupons

* uniqueness works
* ownership works
* validation is secure
* redemption foundation exists

### Infrastructure

* events work where implemented
* outbox works where required
* caching is safe
* logging is safe
* authorization is enforced

---

# 83. FINAL IMPLEMENTATION REPORT

At the end report factually:

1. repository state discovered
2. existing catalog/seller/pricing functionality reused
3. files created
4. files modified
5. database models added/changed
6. migrations added
7. API endpoints implemented
8. authorization rules implemented
9. event contracts implemented
10. cache behavior implemented
11. tests added
12. validation commands executed
13. validation results
14. unresolved issues
15. integration requirements for later backend volumes

Never claim something was implemented unless it exists in the repository.

Never claim a test passes unless it was actually executed.

Never claim a migration is safe without validating it.

---

# 84. ENGINEERING STANDARD

The resulting implementation must be:

* production-grade
* secure
* transactional where required
* concurrency-safe
* observable
* testable
* maintainable
* backwards-compatible where practical
* scalable
* consistent with the existing repository

The implementation must establish a reliable foundation for:

**inventory → cart → checkout → payments → orders → fulfillment → reviews → search → notifications → administration → analytics**

without creating competing domain models.

---

# 85. FINAL INSTRUCTION

Inspect the actual repository first.

Then implement this entire backend volume.

Make real repository changes.

Reuse compatible existing work.

Create complete implementations.

Run validation.

Fix errors.

Do not stop at a design explanation.

Do not generate pseudo-code.

Do not create fake functionality.

Finish with a factual implementation report based only on the repository state actually inspected and modifie

You are operating in Senior Engineering Team Mode.

Build the production-ready backend for identity, customer accounts, authentication, profiles, addresses, seller onboarding, seller accounts, seller staff, stores, authorization, and access control for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, API conventions, security model, event architecture, and payment architecture.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend domains for:

• Identity
• Users
• Customer accounts
• Authentication
• Authorization
• Profiles
• Addresses
• Sessions
• Devices
• Seller accounts
• Seller onboarding
• Seller verification
• Seller staff
• Stores
• Seller permissions
• Account security
• Privacy
• Audit logging related to identity and seller administration

The implementation must support:

• Millions of customers
• Hundreds of thousands of sellers
• Multiple staff members per seller
• Multiple addresses per customer
• Multiple sessions and devices
• Global deployment
• High availability
• Horizontal scaling
• Strong security
• Seller isolation

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Events:

• Kafka or Redpanda

Background Jobs:

• BullMQ

Authentication:

• JWT and/or secure session architecture according to the established design

Testing:

• Jest
• Supertest
• Integration testing tools

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "left as an exercise"
- "for brevity"
- "remaining code omitted"

Every generated file must be complete.

Every generated file must compile.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Keep controllers thin.

Keep business rules outside controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized errors.

Use structured logging.

Use the existing observability infrastructure.

────────────────────────────────────────

DOMAIN OWNERSHIP

Keep clear boundaries between:

Identity

Customers

Accounts

Authentication

Authorization

Profiles

Addresses

Sessions

Devices

Seller Management

Seller Verification

Seller Staff

Stores

Privacy

Security

Audit

Do not combine all identity and seller logic into one uncontrolled module.

────────────────────────────────────────

CUSTOMER IDENTITY

Implement:

• User creation
• User retrieval
• User status
• Identity lifecycle
• Account association
• Account activation
• Account suspension
• Account deactivation
• Account deletion workflow

Support explicit states such as:

• Pending
• Active
• Suspended
• Disabled
• Deactivated
• Deleted

Use stable public identifiers.

Do not expose internal database identifiers unnecessarily.

────────────────────────────────────────

CUSTOMER ACCOUNT

Implement:

• Account creation
• Account settings
• Account status
• Account security settings
• Account deletion request
• Account deletion processing
• Account recovery
• Account suspension
• Account reactivation where permitted

Separate:

• Identity
• Account
• Profile
• Address
• Session
• Device

Account-level operations must be auditable.

────────────────────────────────────────

PROFILE

Implement:

• Profile creation
• Profile retrieval
• Profile updates
• Display name
• Avatar reference
• Contact information
• Preferences

Do not store large binary images inside PostgreSQL.

Use media/object-storage references.

Return only information appropriate to the requesting user.

────────────────────────────────────────

ADDRESSES

Implement customer address management.

Support:

• Create address
• Update address
• Delete address
• List addresses
• Default billing address
• Default shipping address

Address fields must support internationalization where appropriate:

• Full name
• Organization
• Address lines
• City
• State/province
• Postal code
• Country
• Phone
• Delivery instructions where appropriate

Validate country and region combinations.

Do not allow deleted addresses to be silently used by future orders.

Historical orders must preserve the appropriate address snapshot.

────────────────────────────────────────

AUTHENTICATION

Implement:

• Registration
• Login
• Logout
• Refresh
• Session creation
• Session revocation
• Email verification
• Password reset
• Password change

Prepare architecture for:

• MFA
• OAuth
• Passkeys
• Social authentication

Do not implement unsupported providers as fake placeholders.

────────────────────────────────────────

PASSWORD SECURITY

Implement:

• Industry-standard password hashing
• Password verification
• Password change
• Password reset
• Reset-token expiration
• Single-use reset tokens
• Login-attempt protection
• Password reuse protection where justified

Never:

• Store plaintext passwords
• Log passwords
• Return password hashes
• Include passwords in events

────────────────────────────────────────

EMAIL VERIFICATION

Implement:

• Verification token generation
• Verification token expiration
• Single-use verification
• Resend limits
• Verification state
• Replay prevention

Integrate with the established notification infrastructure.

────────────────────────────────────────

SESSION MANAGEMENT

Implement:

• Session creation
• Session listing
• Session retrieval
• Session refresh
• Session expiration
• Session revocation
• Logout
• Logout-all-sessions

Track appropriate metadata:

• Device
• Platform
• Application version
• IP metadata where justified
• Created timestamp
• Last activity
• Expiration
• Revocation state

Do not store sensitive secrets unnecessarily.

────────────────────────────────────────

DEVICE MANAGEMENT

Implement:

• Device registration
• Device identification
• Platform
• Application version
• Device metadata
• Push token association
• Session association
• Device revocation
• Remote logout

Do not collect unnecessary device information.

────────────────────────────────────────

CUSTOMER AUTHORIZATION

Implement RBAC and permission infrastructure.

Roles should support:

• Customer
• Support Agent
• Moderator
• Administrator
• Super Administrator
• System Service

Permissions must cover:

• Account
• Profile
• Addresses
• Orders
• Reviews
• Messaging
• Returns
• Administrative operations

Implement:

• Guards
• Permission decorators
• Policy checks
• Resource ownership

────────────────────────────────────────

SELLER DOMAIN

Implement the seller account foundation.

Support:

• Seller registration
• Seller account
• Legal/business information
• Store association
• Seller status
• Seller verification
• Seller staff
• Seller permissions

Seller states:

• Pending
• Verification Required
• Under Review
• Approved
• Suspended
• Rejected
• Terminated

Define valid transitions.

────────────────────────────────────────

SELLER ONBOARDING

Implement the onboarding workflow.

Support:

• Seller registration
• Business information
• Identity information where required
• Legal entity information
• Tax information
• Payout setup boundary
• Store creation
• Document references
• Verification submission
• Review state

Do not store unnecessary sensitive legal information.

For payment/payout data, use provider references where possible.

────────────────────────────────────────

SELLER VERIFICATION

Implement verification workflows.

Support:

• Verification submission
• Verification status
• Review
• Approval
• Rejection
• Resubmission
• Suspension

Define:

• Required documents
• Verification requirements
• State transitions
• Audit events
• Administrative permissions

Keep third-party verification providers behind an abstraction.

────────────────────────────────────────

STORE DOMAIN

Implement:

• Store creation
• Store profile
• Store name
• Store description
• Store logo reference
• Store status
• Store settings
• Store visibility

Store states may include:

• Draft
• Pending Approval
• Active
• Suspended
• Closed

A seller may have multiple stores only if the established architecture permits it.

────────────────────────────────────────

SELLER STAFF

Implement:

• Staff invitation
• Staff acceptance
• Staff removal
• Staff status
• Staff roles
• Staff permissions
• Staff suspension

Define seller-scoped permissions.

Staff must never be able to access:

• Another seller's products
• Another seller's customers
• Another seller's orders
• Another seller's inventory
• Another seller's financial information

unless explicitly authorized by platform administration.

────────────────────────────────────────

SELLER PERMISSIONS

Implement role/permission categories for:

• Store management
• Catalog
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Reviews
• Messaging
• Promotions
• Coupons
• Analytics
• Financials
• Payouts

Create explicit seller-scoped authorization policies.

Never trust seller-provided seller IDs.

Always derive seller scope from authenticated identity and authorized resources.

────────────────────────────────────────

SELLER ISOLATION

Implement strong tenant-style seller isolation.

Every seller-owned resource must enforce ownership.

This applies to:

• Stores
• Products
• Seller offers
• Inventory
• Orders
• Fulfillment
• Reviews
• Messages
• Promotions
• Coupons
• Analytics
• Financial data

Prevent:

• Horizontal privilege escalation
• Cross-seller data access
• IDOR vulnerabilities
• Unauthorized seller impersonation

────────────────────────────────────────

PRIVACY

Implement customer privacy controls appropriate to the platform.

Support:

• Profile visibility
• Contact information visibility
• Address privacy
• Notification preferences
• Communication preferences

Seller users must only receive customer information necessary to fulfill legitimate business operations.

────────────────────────────────────────

SECURITY EVENTS

Implement events such as:

• UserRegistered
• UserVerified
• UserLoggedIn
• LoginFailed
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• PasswordChanged
• PasswordResetRequested
• PasswordResetCompleted
• AccountSuspended
• SellerRegistered
• SellerVerificationSubmitted
• SellerApproved
• SellerRejected
• SellerSuspended
• SellerStaffInvited
• SellerStaffRemoved
• RoleAssigned
• RoleRevoked

Events must contain only required information.

Never include passwords, access tokens, refresh tokens, payment secrets, or sensitive verification documents.

────────────────────────────────────────

AUDIT LOGGING

Audit sensitive identity and seller actions.

Track:

• Actor
• Action
• Resource
• Resource ID
• Timestamp
• Request ID
• Correlation ID
• Result
• Safe metadata

Audit:

• Login
• Logout
• Password changes
• Account suspension
• Seller approval
• Seller rejection
• Seller suspension
• Staff role changes
• Permission changes
• Administrative actions

────────────────────────────────────────

RATE LIMITING

Apply rate limits to:

• Registration
• Login
• Password reset
• Verification
• Session refresh
• Device registration
• Seller registration
• Seller verification submission
• Staff invitations

Support limits by:

• IP
• Account
• Device
• Identifier
• Operation

Protect against automated abuse.

────────────────────────────────────────

ACCOUNT RECOVERY

Implement:

• Password reset
• Credential recovery
• Session invalidation after recovery
• Device/session review
• Security notification

Recovery must invalidate compromised authentication state where appropriate.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for this volume.

Include appropriate models such as:

• User
• Account
• Profile
• Address
• Session
• Device
• VerificationToken
• PasswordResetToken
• Role
• Permission
• RolePermission
• UserRole
• Seller
• SellerVerification
• SellerDocumentReference
• SellerStaff
• SellerStaffRole
• Store
• StoreSettings
• AuditLog
• SecurityEvent where appropriate

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Check constraints
• Created timestamps
• Updated timestamps
• Soft deletion where justified

Do not store raw payment-card information.

Do not create full product/order/inventory schemas in this volume.

────────────────────────────────────────

API

Implement production-ready REST APIs.

AUTHENTICATION

• Register
• Login
• Logout
• Refresh
• Verify
• Password reset
• Password change

ACCOUNT

• Get account
• Update account
• Delete account
• Security settings

PROFILE

• Get profile
• Update profile

ADDRESSES

• Create
• List
• Update
• Delete
• Set default billing
• Set default shipping

SESSIONS

• List sessions
• Revoke session
• Revoke all sessions

DEVICES

• Register device
• List devices
• Update device
• Revoke device

SELLER

• Register seller
• Get seller
• Update seller
• Submit verification
• Get verification status

STORE

• Create store
• Get store
• Update store
• Store status

SELLER STAFF

• Invite
• Accept invitation
• List staff
• Update staff
• Remove staff

ADMINISTRATION

• Approve seller
• Reject seller
• Suspend seller
• Manage roles
• Manage permissions
• View audit logs

Every endpoint must include:

• Authentication
• Authorization
• DTO validation
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Idempotency where appropriate

────────────────────────────────────────

EVENTS

Publish events using the established event infrastructure.

Use transactional outbox where database transactions require event publication.

Events include:

• UserRegistered
• UserVerified
• UserLoggedIn
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• PasswordChanged
• AccountSuspended
• SellerRegistered
• SellerVerificationSubmitted
• SellerApproved
• SellerRejected
• SellerSuspended
• StoreCreated
• StoreUpdated
• SellerStaffInvited
• SellerStaffAdded
• SellerStaffRemoved
• RoleAssigned
• RoleRevoked
• AddressCreated
• AddressUpdated
• AddressDeleted

Consumers must be idempotent.

────────────────────────────────────────

BACKGROUND JOBS

Implement appropriate jobs for:

• Verification cleanup
• Password-reset cleanup
• Session cleanup
• Device cleanup
• Seller verification processing
• Seller invitation expiration
• Account deletion processing
• Audit retention

Every job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter handling
• Monitoring

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Registration
• Login
• Authentication failures
• Session operations
• Device operations
• Seller onboarding
• Seller verification
• Staff invitations
• Permission checks
• Administrative operations

Measure:

• Authentication latency
• Registration failures
• Login failure rate
• Rate-limit events
• Seller verification latency
• Authorization failures

Never log:

• Passwords
• Tokens
• Payment credentials
• Sensitive verification documents

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Authentication services
• Password handling
• Session policies
• Authorization
• Seller isolation
• Seller verification rules
• Staff permissions
• Address validation
• Privacy rules

INTEGRATION TESTS

Test:

• Registration
• Login
• Refresh
• Logout
• Password reset
• Session revocation
• Device registration
• Address operations
• Seller registration
• Seller verification
• Store creation
• Staff management
• Role management

SECURITY TESTS

Test:

• Brute-force protection
• Token replay
• Session invalidation
• Authorization bypass
• Seller isolation
• IDOR
• Privilege escalation
• User enumeration
• Rate-limit bypass

API TESTS

Test all endpoints generated in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate:

• Identity architecture
• Authentication flows
• Session lifecycle
• Device lifecycle
• Authorization model
• Customer account model
• Address model
• Seller onboarding
• Seller verification
• Seller isolation
• Seller staff roles
• Permission model
• Security events
• Audit logging
• API documentation
• Database documentation
• Testing documentation

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Identity modules
• Customer modules
• Authentication modules
• Profile modules
• Address modules
• Session modules
• Device modules
• Authorization modules
• Seller modules
• Store modules
• Seller staff modules
• Security modules
• Audit modules
• Database objects
• Migrations
• API endpoints
• Events
• Background jobs
• Tests
• Generated files
• Remaining work
• Dependencies
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Customer identity, users, accounts, profiles, addresses, and database models.

BACKEND MILESTONE 2

Authentication, password handling, verification, sessions, devices, and security.

BACKEND MILESTONE 3

Authorization, RBAC, permissions, policies, and administrative roles.

BACKEND MILESTONE 4

Seller registration, seller verification, seller lifecycle, and store management.

BACKEND MILESTONE 5

Seller staff, seller-scoped permissions, seller isolation, and administrative workflows.

BACKEND MILESTONE 6

Security events, audit logging, recovery workflows, cleanup jobs, and notifications integration.

BACKEND MILESTONE 7

API completion, integration testing, security testing, observability, and production hardening.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize source code instead of generating it.

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume covers:

• Identity
• Users
• Customer accounts
• Authentication
• Authorization
• Profiles
• Addresses
• Sessions
• Devices
• Seller onboarding
• Seller verification
• Seller accounts
• Stores
• Seller staff
• Seller permissions
• Seller isolation
• Security events
• Audit foundations

Do not implement complete:

• Catalog
• Products
• Variants
• Pricing
• Promotions
• Coupons
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• CMS
• Moderation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat customer identity and seller access as critical production infrastructure.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Multiple seller staff members
• Large login volume
• Automated attacks
• Seller fraud attempts
• Privilege escalation attempts
• Global deployment
• Strict privacy requirements
• Strict security requirements

Prioritize:

• Security
• Seller isolation
• Correct authorization
• Auditability
• Reliability
• Scalability
• Maintainability
• Observability
• Production readiness
