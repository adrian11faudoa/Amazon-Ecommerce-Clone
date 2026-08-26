You are operating in Senior Engineering Team Mode.

Build the production-ready backend for the catalog, product, seller-offer, pricing, promotions, coupons, product media, and catalog administration domains for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, API conventions, seller-isolation rules, security model, event architecture, search architecture, and media architecture.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Categories
• Category hierarchies
• Brands
• Brand management
• Products
• Product variants
• Product attributes
• Product specifications
• Product media
• Seller offers
• Product conditions
• Pricing
• Regional pricing
• Currency handling
• Promotions
• Coupons
• Product publishing
• Catalog moderation
• Product lifecycle
• Catalog search integration
• Product recommendations integration
• Product administration

The implementation must support:

• Millions of products
• Hundreds of thousands of sellers
• Multiple seller offers for the same product
• Large catalog reads
• High search traffic
• High catalog-update traffic
• Global operations
• Multiple currencies
• Multiple languages
• Regional availability
• High availability
• Horizontal scaling

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

Search:

• Elasticsearch or OpenSearch

Object Storage:

• AWS S3-compatible object storage

CDN:

• CloudFront or equivalent CDN

Event Streaming:

• Kafka or Redpanda where justified

Background Jobs:

• BullMQ

Testing:

• Jest
• Supertest
• Integration and contract testing tools where appropriate

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

Keep domain rules outside controllers.

Use repositories for persistence.

Use DTOs for APIs.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use the existing observability infrastructure.

────────────────────────────────────────

DOMAIN OWNERSHIP

Keep clear boundaries between:

• Catalog
• Categories
• Brands
• Products
• Variants
• Attributes
• Product media
• Seller offers
• Pricing
• Promotions
• Coupons
• Catalog moderation
• Publishing

Do not combine catalog data, inventory state, and order state into the same domain.

Product information is not inventory.

Product information is not an order.

Seller pricing is not payment state.

────────────────────────────────────────

CATALOG DOMAIN

Implement:

• Catalog structure
• Category tree
• Category metadata
• Category status
• Category hierarchy
• Category attributes
• Brand records
• Brand metadata
• Brand status
• Product catalog
• Catalog versioning where appropriate

Support:

• Draft
• Submitted
• Approved
• Published
• Suspended
• Archived

Define lifecycle transitions.

────────────────────────────────────────

CATEGORY DOMAIN

Implement:

• Category creation
• Category update
• Category deletion/deactivation
• Category hierarchy
• Parent/child relationships
• Category ordering
• Category metadata
• Category attributes
• Category status

Support efficient tree queries.

Prevent:

• Cyclic category relationships
• Invalid parent assignment
• Deleting categories with active products without appropriate handling

Define rules for moving a category within the hierarchy.

────────────────────────────────────────

BRAND DOMAIN

Implement:

• Brand creation
• Brand update
• Brand metadata
• Brand logo reference
• Brand status
• Brand approval
• Brand moderation

Support:

• Active
• Pending
• Suspended
• Archived

Define brand ownership and administrative permissions.

────────────────────────────────────────

PRODUCT DOMAIN

Implement:

• Product creation
• Product update
• Product retrieval
• Product lifecycle
• Product publishing
• Product suspension
• Product archival

Support:

• Title
• Description
• Brand
• Category
• Attributes
• Specifications
• Product identifiers
• Tax classification
• Media references
• Search metadata
• SEO metadata

Do not store large binary media directly in PostgreSQL.

────────────────────────────────────────

PRODUCT VARIANTS

Implement variants for products requiring options such as:

• Size
• Color
• Capacity
• Material
• Style
• Pack size

Support:

• Variant creation
• Variant update
• Variant activation
• Variant deactivation
• Variant attributes
• Variant identifiers

Every variant must belong to exactly one product.

Define unique variant constraints.

Prevent duplicate variant combinations.

────────────────────────────────────────

PRODUCT ATTRIBUTES

Support structured product attributes.

Define:

• Attribute definitions
• Attribute types
• Allowed values
• Category-specific attributes
• Required attributes
• Optional attributes
• Variant-defining attributes

Support types such as:

• String
• Integer
• Decimal
• Boolean
• Enumeration
• Date
• Measurement

Avoid storing every attribute as unstructured JSON when relational querying is required.

Use JSON selectively for flexible metadata.

────────────────────────────────────────

PRODUCT IDENTIFIERS

Support appropriate identifiers such as:

• SKU
• Seller SKU
• UPC where applicable
• EAN where applicable
• ISBN where applicable
• Manufacturer part number

Define uniqueness scopes.

Seller-specific identifiers must not conflict unnecessarily with identifiers owned by other sellers.

────────────────────────────────────────

SELLER OFFER DOMAIN

Implement the distinction between:

• Canonical product
• Seller offer
• Seller price
• Seller condition
• Seller inventory reference
• Seller fulfillment method
• Seller shipping eligibility

A product may have multiple seller offers.

Each seller offer must be owned by a specific seller/store.

Support:

• New
• Used
• Refurbished
• Other approved conditions

────────────────────────────────────────

SELLER OFFER LIFECYCLE

Support:

• Draft
• Submitted
• Approved
• Active
• Paused
• Suspended
• Archived

Define transitions.

An offer cannot be active when:

• Seller is suspended
• Product is unpublished where publication is required
• Required compliance information is missing

────────────────────────────────────────

PRODUCT/PUBLISHING WORKFLOW

Implement:

Draft
→ Submitted
→ Validation
→ Moderation
→ Approved
→ Scheduled
→ Published
→ Suspended
→ Archived

Define:

• State ownership
• Transition permissions
• Validation rules
• Moderation rules
• Scheduling
• Audit trail
• Event generation

Product publication must not automatically guarantee inventory availability.

────────────────────────────────────────

CATALOG MODERATION

Implement moderation foundations for:

• Products
• Product descriptions
• Product media
• Brands
• Categories
• Seller offers

Support:

• Automated validation
• Manual review
• Approval
• Rejection
• Suspension
• Appeals
• Audit history
• Policy versioning

Do not implement frontend moderation UI.

────────────────────────────────────────

SEO METADATA

Support product SEO information:

• Slug
• Meta title
• Meta description
• Canonical identifier
• Search keywords
• Structured metadata references

Define slug uniqueness.

Handle slug changes without breaking existing references.

────────────────────────────────────────

LOCALIZED CATALOG

Support localized:

• Product titles
• Descriptions
• Brand names
• Category names
• Attribute labels
• SEO metadata

Support language fallback behavior.

Do not require all translations to exist before a product can be published unless explicitly configured.

────────────────────────────────────────

PRODUCT MEDIA

Implement product media metadata.

Support:

• Images
• Videos
• Documents
• 360-degree media where appropriate
• Thumbnails

Store:

• Object key
• Media type
• MIME type
• Size
• Dimensions
• Duration where relevant
• Processing status
• Sort order
• Alt text
• Accessibility metadata

────────────────────────────────────────

MEDIA UPLOADS

Implement signed-upload authorization.

Support:

• Upload initialization
• Signed URLs
• Multipart uploads where appropriate
• Completion
• Validation
• Ownership
• Expiration

Validate uploaded objects.

Do not trust client-provided MIME types.

────────────────────────────────────────

MEDIA PROCESSING

Use BullMQ for:

• Image optimization
• Thumbnail generation
• Video metadata extraction
• Video processing
• Multiple image sizes
• Media validation

Each job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Failure state
• Dead-letter handling
• Monitoring

────────────────────────────────────────

MEDIA ACCESS

Implement authorization for product media.

Support:

• Public product media
• Seller-private media
• Draft product media
• Admin-only media

Use signed access where appropriate.

────────────────────────────────────────

PRICING DOMAIN

Implement:

• Base price
• Sale price
• Currency
• Regional price
• Seller price
• Effective dates
• Price history

Use exact monetary types.

Do not use floating point for money.

────────────────────────────────────────

PRICE VALIDATION

Validate:

• Positive values
• Currency
• Effective dates
• Seller ownership
• Product/offer ownership

Prevent:

• Overlapping incompatible pricing periods
• Invalid currencies
• Negative prices
• Unauthorized price changes

Define how current price is determined when multiple pricing rules exist.

────────────────────────────────────────

REGIONAL PRICING

Support:

• Country
• Region
• Currency
• Price
• Effective period

Define priority when multiple regional rules match.

Historical orders must store price snapshots and must not depend on current catalog price.

────────────────────────────────────────

PRICE HISTORY

Store price changes for:

• Audit
• Analytics
• Administrative investigation

Track:

• Previous price
• New price
• Currency
• Seller
• Product/offer
• Actor
• Timestamp
• Reason where appropriate

────────────────────────────────────────

PROMOTION ENGINE

Implement:

• Promotion creation
• Promotion update
• Activation
• Expiration
• Eligibility
• Discount rules
• Promotion stacking rules

Support promotion scopes:

• Product
• Variant
• Category
• Seller
• Store
• Marketplace

Support:

• Percentage discounts
• Fixed discounts
• Quantity discounts
• Buy-one-get-one where appropriate
• Minimum spend
• Maximum discount

────────────────────────────────────────

PROMOTION PRIORITY

Define deterministic promotion precedence.

When multiple promotions apply, determine:

• Which promotion wins
• Whether stacking is allowed
• Maximum discount
• Excluded combinations

Prevent inconsistent pricing across requests.

────────────────────────────────────────

COUPON DOMAIN

Implement:

• Coupon creation
• Activation
• Expiration
• Redemption
• Usage tracking
• Eligibility
• Customer restrictions
• Seller restrictions
• Product/category restrictions

Support:

• Percentage discount
• Fixed discount
• Free-shipping discount where appropriate

────────────────────────────────────────

COUPON CONCURRENCY

Prevent:

• Double redemption
• Over-redemption
• Replay
• Race conditions
• Usage-count corruption

Use:

• Transactions
• Unique constraints
• Idempotency
• Appropriate locking where required

────────────────────────────────────────

CATALOG CACHE

Use Redis for appropriate caching.

Cache:

• Categories
• Public product metadata
• Brand metadata
• Published catalog state
• Selected pricing views where appropriate

Define:

• Key pattern
• TTL
• Invalidation
• Warm-up
• Failure behavior

Cache must not become the source of truth.

────────────────────────────────────────

SEARCH INDEX INTEGRATION

Implement the backend integration needed to publish catalog changes to the search system.

Support events for:

• Product created
• Product updated
• Product published
• Product unpublished
• Product suspended
• Product archived
• Category changed
• Brand changed
• Offer price changed

Use transactional outbox where appropriate.

Search indexing must be idempotent.

────────────────────────────────────────

EVENTS

Publish events including:

Catalog:

• CategoryCreated
• CategoryUpdated
• CategoryArchived
• BrandCreated
• BrandUpdated
• BrandApproved
• ProductCreated
• ProductUpdated
• ProductSubmitted
• ProductApproved
• ProductPublished
• ProductUnpublished
• ProductSuspended
• ProductArchived
• VariantCreated
• VariantUpdated

Offer:

• OfferCreated
• OfferApproved
• OfferActivated
• OfferPaused
• OfferSuspended
• OfferArchived

Pricing:

• PriceCreated
• PriceChanged
• PriceScheduled
• PriceExpired

Promotions:

• PromotionCreated
• PromotionActivated
• PromotionExpired
• CouponCreated
• CouponRedeemed
• CouponExpired

Media:

• ProductMediaUploaded
• ProductMediaProcessed
• ProductMediaProcessingFailed

Events must contain only information required by consumers.

────────────────────────────────────────

BACKGROUND JOBS

Implement appropriate jobs for:

• Media processing
• Product indexing
• Bulk indexing
• Search reindexing
• Promotion activation
• Promotion expiration
• Coupon expiration
• Catalog cleanup
• Scheduled product publication
• Scheduled unpublishing
• Cache invalidation

Each job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Failure handling
• Dead-letter behavior
• Monitoring

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for domains covered by this volume.

Include appropriate models for:

• Category
• Brand
• Product
• ProductVariant
• ProductAttributeDefinition
• ProductAttributeValue
• ProductIdentifier
• SellerOffer
• OfferCondition
• ProductMedia
• Price
• PriceHistory
• Promotion
• PromotionRule
• Coupon
• CouponRedemption
• CatalogReview or moderation reference
• ProductLocalization
• CategoryLocalization
• BrandLocalization

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Check constraints
• Appropriate status fields
• Effective date fields
• Audit timestamps

────────────────────────────────────────

CATALOG CONSTRAINTS

Enforce constraints for:

• Unique product identifiers where required
• Unique category paths where appropriate
• Unique brand names within applicable scope
• Unique SKU scope
• Unique seller offer ownership
• Unique variant combinations
• Coupon code uniqueness
• Price validity

Do not rely solely on application checks for uniqueness.

────────────────────────────────────────

API

Implement production-ready APIs.

CATEGORIES

• Create
• Get
• List
• Update
• Reorder
• Move
• Archive

BRANDS

• Create
• Get
• List
• Update
• Approve
• Suspend

PRODUCTS

• Create
• Get
• List
• Update
• Submit
• Publish
• Unpublish
• Suspend
• Archive

VARIANTS

• Create
• Get
• Update
• Activate
• Deactivate

ATTRIBUTES

• Definitions
• Values
• Category-specific configuration

OFFERS

• Create
• Get
• List
• Update
• Activate
• Pause
• Archive

MEDIA

• Upload authorization
• Upload completion
• Metadata
• Delete

PRICING

• Get current price
• Create price
• Schedule price
• Price history

PROMOTIONS

• Create
• Update
• Activate
• Pause
• Archive

COUPONS

• Create
• Update
• Validate
• Redeem
• Disable

Every endpoint must implement:

• Authentication
• Authorization
• Validation
• Seller isolation
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Idempotency where appropriate

────────────────────────────────────────

SELLER ISOLATION

Every seller-owned resource must enforce seller ownership.

Apply isolation to:

• Seller offers
• Seller-specific pricing
• Seller promotions
• Seller coupons
• Product ownership where applicable
• Product media
• Seller store assets

Never trust a seller ID supplied by the client.

Derive seller scope from authenticated identity and authorized store context.

────────────────────────────────────────

ADMINISTRATION

Implement administrative permissions for:

• Category administration
• Brand administration
• Product moderation
• Product suspension
• Offer suspension
• Promotion administration
• Coupon administration
• Media moderation

High-risk administrative actions must be audited.

────────────────────────────────────────

SECURITY

Implement:

• Authentication
• Authorization
• Seller isolation
• Input validation
• Rate limiting
• Secure media access
• Audit logging
• Secure upload flow
• File validation
• MIME validation
• Secret protection

Prevent:

• IDOR
• Seller data leakage
• Unauthorized price modification
• Unauthorized publication
• Coupon manipulation
• Media access bypass

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Product creation
• Product updates
• Publication
• Seller offer changes
• Price changes
• Promotion activation
• Coupon redemption
• Media uploads
• Media processing
• Search indexing

Measure:

• API latency
• Catalog write throughput
• Indexing delay
• Media-processing latency
• Coupon redemption failures
• Promotion evaluation failures

Never log secrets or sensitive customer data.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Product validation
• Variant uniqueness
• Category hierarchy
• Promotion rules
• Coupon rules
• Pricing rules
• Seller isolation
• Publication workflow
• Moderation transitions

INTEGRATION TESTS

Test:

• PostgreSQL
• Prisma
• Redis
• Kafka
• BullMQ
• S3
• Elasticsearch/OpenSearch

API TESTS

Test:

• Product endpoints
• Category endpoints
• Brand endpoints
• Offer endpoints
• Pricing endpoints
• Promotion endpoints
• Coupon endpoints
• Media endpoints

SECURITY TESTS

Test:

• Cross-seller access
• Unauthorized publication
• Price tampering
• Coupon abuse
• Media access bypass
• IDOR
• Role escalation

PERFORMANCE TESTS

Test:

• Product reads
• Category traversal
• Catalog writes
• Search indexing
• Coupon validation
• Promotion evaluation

────────────────────────────────────────

DOCUMENTATION

Generate:

• Catalog model
• Category hierarchy
• Brand model
• Product model
• Variant model
• Offer model
• Pricing model
• Promotion engine
• Coupon engine
• Media architecture
• Publication workflow
• Moderation rules
• Search-index integration
• API contracts
• Event contracts
• Database objects
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Catalog modules
• Category modules
• Brand modules
• Product modules
• Variant modules
• Attribute modules
• Offer modules
• Pricing modules
• Promotion modules
• Coupon modules
• Media modules
• Moderation modules
• Database objects
• Migrations
• API endpoints
• Events
• Queues
• Workers
• Search integration
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Categories, category hierarchy, brands, and database foundations.

BACKEND MILESTONE 2

Products, product lifecycle, validation, and publication workflow.

BACKEND MILESTONE 3

Product variants, attributes, identifiers, and localized metadata.

BACKEND MILESTONE 4

Seller offers, seller isolation, offer lifecycle, and conditions.

BACKEND MILESTONE 5

Pricing, regional pricing, price history, and scheduling.

BACKEND MILESTONE 6

Promotions, coupon engine, eligibility, and redemption.

BACKEND MILESTONE 7

Product media, signed uploads, media metadata, processing jobs, and S3 integration.

BACKEND MILESTONE 8

Search indexing integration, events, queues, cache invalidation, and observability.

BACKEND MILESTONE 9

Administration, moderation integration, security hardening, and audit.

BACKEND MILESTONE 10

Integration testing, performance testing, security testing, and production hardening.

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

This volume covers only:

• Categories
• Brands
• Products
• Variants
• Attributes
• Identifiers
• Seller offers
• Product media
• Pricing
• Regional pricing
• Promotions
• Coupons
• Catalog moderation
• Product publishing
• Search indexing integration

Do not implement complete:

• Inventory
• Shopping cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Seller payouts
• Reviews
• Recommendations
• Notifications
• Messaging
• Analytics
• CMS
• Infrastructure

Those belong to later implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat the catalog as critical marketplace infrastructure.

Assume:

• Millions of products
• Hundreds of thousands of sellers
• Multiple offers per product
• High read traffic
• High search traffic
• High catalog-update traffic
• Multiple currencies
• Multiple languages
• Regional operations

Prioritize:

• Catalog correctness
• Seller isolation
• Pricing correctness
• Publication integrity
• Search consistency
• Media reliability
• Security
• Scalability
• Observability
• Maintainability
• Production readiness
