You are operating in Senior Engineering Team Mode.

Build the production-ready backend for search, recommendations, reviews, ratings, notifications, customer/seller messaging, analytics, reporting, and related marketplace intelligence for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, seller-isolation rules, catalog architecture, pricing architecture, inventory architecture, checkout architecture, order architecture, payment architecture, API conventions, event architecture, queue architecture, and security model.

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

• Product search
• Category search
• Brand search
• Seller/store search
• Autocomplete
• Search suggestions
• Faceted search
• Search filters
• Search ranking
• Search analytics
• Search indexing
• Recommendations
• Personalization
• Recently viewed products
• Similar products
• Related products
• Frequently bought together
• Trending products
• Cross-sells
• Upsells
• Reviews
• Ratings
• Verified-purchase reviews
• Review moderation
• Seller responses
• Customer notifications
• Seller notifications
• In-app notifications
• Email notifications
• Push notifications
• Customer-seller messaging
• Order-related messaging
• Analytics events
• Aggregated marketplace analytics
• Reporting foundations

The implementation must support:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of search requests
• Large review volumes
• Large notification volumes
• Large analytics event volumes
• High recommendation traffic
• Multi-region deployment
• Horizontal scaling
• High availability

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

Event Streaming:

• Kafka or Redpanda where justified

Background Processing:

• BullMQ

Object Storage:

• AWS S3-compatible object storage where review/media assets require it

CDN:

• CloudFront or equivalent

Notifications:

• Email provider abstraction
• Firebase Cloud Messaging
• Apple Push Notification Service

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools

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

Use centralized error handling.

Use structured logging.

Use the established observability infrastructure.

────────────────────────────────────────

DOMAIN OWNERSHIP

Maintain clear boundaries between:

Search

Search Indexing

Search Analytics

Recommendations

Personalization

Reviews

Ratings

Notifications

Customer Messaging

Seller Messaging

Analytics

Reporting

Do not use search as the transactional source of truth.

Do not store recommendation state exclusively in Redis.

Do not mix analytics workloads into transactional order tables without explicit justification.

Do not expose unrestricted customer data to sellers through messaging.

────────────────────────────────────────

SEARCH ARCHITECTURE

Implement the production-ready product search backend.

Support:

• Product search
• Category search
• Brand search
• Seller/store search
• Autocomplete
• Suggestions
• Typo tolerance
• Synonyms
• Filters
• Facets
• Sorting
• Price ranges
• Ratings
• Availability
• Category
• Brand
• Seller
• Regional availability
• Ranking
• Pagination

Use Elasticsearch or OpenSearch as the derived search system.

PostgreSQL remains authoritative for transactional catalog data.

────────────────────────────────────────

SEARCH INDEXES

Create appropriate indexes for:

• Products
• Categories
• Brands
• Sellers/stores

Define:

• Mapping strategy
• Analyzer strategy
• Language support
• Synonyms
• Search fields
• Sort fields
• Facet fields
• Ranking fields
• Versioning

Use aliases to support safe index migrations.

────────────────────────────────────────

SEARCH INDEXING

Implement indexing based on domain events.

Support:

• Product indexing
• Product updates
• Product publication
• Product suspension
• Product archival
• Category updates
• Brand updates
• Seller/store changes
• Price changes
• Availability changes where appropriate

Indexing must be:

• Idempotent
• Retryable
• Observable

────────────────────────────────────────

SEARCH REINDEXING

Implement safe reindexing.

Support:

• Full reindex
• Incremental reindex
• Versioned indexes
• Alias switching
• Bulk indexing
• Reindex monitoring
• Failed-document retry
• Partial failure handling

Do not block transactional catalog operations while reindexing.

────────────────────────────────────────

SEARCH AUTHORIZATION

Search results must respect:

• Product publication state
• Seller state
• Product moderation state
• Regional availability
• Catalog visibility
• Seller restrictions

Never expose unpublished or suspended products to unauthorized customers.

────────────────────────────────────────

SEARCH ANALYTICS

Track:

• Search queries
• Search result counts
• Click-through
• Add-to-cart after search
• Conversion after search
• Zero-result queries
• Popular searches
• Search abandonment

Do not store unnecessary personal information in search analytics.

────────────────────────────────────────

SEARCH CACHE

Use Redis only where beneficial.

Cache:

• Popular searches
• Autocomplete results where appropriate
• Stable category queries
• Frequently repeated public searches

Define:

• Key pattern
• TTL
• Invalidation
• Cache warming
• Failure behavior

Do not cache highly personalized results without appropriate user-scoped keys.

────────────────────────────────────────

RECOMMENDATION DOMAIN

Implement the initial recommendation architecture.

Support:

• Personalized recommendations
• Recently viewed
• Similar products
• Related products
• Frequently bought together
• Trending
• Popular products
• Category recommendations
• Seller recommendations
• Cross-sells
• Upsells

The first implementation may use deterministic and heuristic ranking.

The architecture must allow future ML systems without redesigning the API contract.

────────────────────────────────────────

RECOMMENDATION PIPELINE

Define:

• Candidate generation
• Candidate filtering
• Ranking
• Personalization
• Business rules
• Eligibility
• Fallback

Fallbacks must exist when:

• Personalization data is unavailable
• Recommendation service is unavailable
• User has insufficient history
• Search is unavailable

────────────────────────────────────────

PERSONALIZATION

Support customer-level signals such as:

• Viewed products
• Added to cart
• Purchased products
• Search behavior
• Categories
• Brands
• Seller interactions
• Price preferences

Do not expose private behavioral data to sellers unless explicitly permitted.

────────────────────────────────────────

RECOMMENDATION EVENTS

Consume events such as:

• ProductViewed
• SearchPerformed
• ProductAddedToCart
• ProductPurchased
• WishlistItemAdded
• ReviewCreated
• ProductRated

Define appropriate retention and privacy policies.

────────────────────────────────────────

RECOMMENDATION CACHE

Use Redis for:

• Personalized feed cache
• Similar-product cache
• Trending cache
• Frequently-bought-together cache

Define:

• Key format
• TTL
• Invalidation
• Regeneration
• Failure fallback

Recommendations must never block core checkout functionality.

────────────────────────────────────────

REVIEWS DOMAIN

Implement:

• Review creation
• Review retrieval
• Review update where allowed
• Review deletion where policy permits
• Verified purchase validation
• Review media references
• Seller responses
• Review reports
• Moderation status

Support review states:

• Pending
• Published
• Hidden
• Rejected
• Removed

────────────────────────────────────────

REVIEW ELIGIBILITY

Only allow reviews when appropriate.

Validate:

• Customer identity
• Order ownership
• Product ownership
• Purchase status
• Delivered/eligible order state
• Review policy
• Duplicate-review rules

Never trust the client to claim a verified purchase.

────────────────────────────────────────

RATINGS

Implement:

• Rating submission
• Rating updates where permitted
• Rating aggregation
• Product rating summary
• Seller rating summary where applicable

Use appropriate strategies for large-scale aggregation.

Avoid recalculating millions of review records synchronously for every new rating.

────────────────────────────────────────

REVIEW MODERATION

Support:

• Automatic checks
• Report review
• Manual moderation
• Hide/reject
• Appeal
• Audit trail

Define policy boundaries for:

• Spam
• Abuse
• Manipulation
• Malicious content
• Personal information

────────────────────────────────────────

SELLER RESPONSES

Allow authorized sellers to:

• Respond to reviews
• Edit response where permitted
• Delete response where permitted

Seller responses must be scoped to the seller's own products.

────────────────────────────────────────

REVIEW MEDIA

Support review attachments:

• Images
• Videos where supported

Use:

• Direct upload
• Signed URLs
• Media validation
• Processing
• CDN delivery
• Cleanup

Do not store binary assets in PostgreSQL.

────────────────────────────────────────

NOTIFICATION DOMAIN

Implement notification orchestration.

Support:

• Push
• Email
• In-app
• SMS-ready architecture where appropriate

Notification types:

• Order created
• Payment succeeded
• Payment failed
• Shipment created
• Shipment delivered
• Return update
• Refund issued
• Seller order received
• Low inventory
• Seller verification
• Security event
• Promotion
• Recommendation

────────────────────────────────────────

NOTIFICATION PREFERENCES

Implement:

• Global notification settings
• Per-channel settings
• Per-category settings
• Promotional settings
• Security notification rules
• Seller notification settings

Security-critical notifications must not be silently disabled by ordinary marketing preferences.

────────────────────────────────────────

PUSH NOTIFICATIONS

Implement:

• Device token registration
• FCM integration
• APNS integration
• Token rotation
• Invalid-token cleanup
• Retry
• Backoff
• Provider failures
• Deduplication

Support multiple devices per customer.

Avoid duplicate notifications when deterministic deduplication is possible.

────────────────────────────────────────

EMAIL NOTIFICATIONS

Implement an email provider abstraction.

Support:

• Templates
• Localization
• Retry
• Delivery status
• Failure
• Bounce handling where supported
• Rate limits

Do not hard-code a single email vendor into the domain layer.

────────────────────────────────────────

IN-APP NOTIFICATIONS

Implement:

• Notification creation
• Notification list
• Read/unread
• Bulk mark as read
• Notification categories
• Deep-link targets

Persist notification state in PostgreSQL.

Use Redis only for acceleration where appropriate.

────────────────────────────────────────

NOTIFICATION QUEUES

Use BullMQ for:

• Push delivery
• Email delivery
• Notification retries
• Notification cleanup
• Promotional notification scheduling

Every worker must implement:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter handling
• Metrics

────────────────────────────────────────

CUSTOMER/SELLER MESSAGING

Implement secure marketplace messaging.

Support:

• Customer-to-seller conversation
• Seller-to-customer conversation
• Order-linked conversations
• Message creation
• Message retrieval
• Read state
• Unread counts
• Attachments
• Seller staff participation

Do not expose unrelated customer information.

────────────────────────────────────────

MESSAGING AUTHORIZATION

Messaging access must verify:

• Customer identity
• Seller ownership
• Store ownership
• Relevant order relationship
• Conversation membership
• Seller staff permission
• Account status

A seller must not access conversations belonging to another seller.

────────────────────────────────────────

MESSAGE MEDIA

Support:

• Images
• Documents
• Attachments

Use direct S3 upload where appropriate.

Validate:

• File type
• File size
• Ownership
• Access scope

Use signed URLs for private media.

────────────────────────────────────────

MESSAGE RETENTION

Define retention strategy for marketplace messaging.

Support:

• Retention periods
• Archival where appropriate
• Deletion
• Legal/administrative holds where required
• Audit requirements

Do not retain message content indefinitely without a justified policy.

────────────────────────────────────────

ANALYTICS DOMAIN

Implement marketplace analytics foundations.

Track:

CUSTOMER

• Product views
• Search behavior
• Add-to-cart
• Checkout
• Purchases
• Wishlist
• Returns

PRODUCT

• Views
• Add-to-cart
• Conversion
• Revenue
• Returns
• Ratings

SELLER

• Orders
• Revenue
• Conversion
• Inventory turnover
• Cancellation
• Return rate
• Reviews

MARKETPLACE

• GMV
• Revenue
• Take rate
• AOV
• Orders
• Conversion
• Search success
• Fulfillment performance

────────────────────────────────────────

ANALYTICS INGESTION

Use Kafka or equivalent event infrastructure.

Support:

• Event ingestion
• Validation
• Aggregation
• Stream processing where appropriate
• Batch aggregation
• Data retention

Do not run large analytical aggregations directly against production transaction tables.

────────────────────────────────────────

ANALYTICS PRIVACY

Minimize personal information.

Define:

• Data retention
• Aggregation
• Access control
• Anonymization/pseudonymization where appropriate
• Seller-visible metrics
• Platform-only metrics

Seller analytics must not expose other sellers' confidential business data.

────────────────────────────────────────

REPORTING

Implement reporting foundations.

Support:

• Sales reports
• Order reports
• Inventory reports
• Seller reports
• Customer reports where authorized
• Financial reports
• Product reports
• Promotion reports

Reports may be generated asynchronously.

Use BullMQ for long-running report generation.

────────────────────────────────────────

REPORT GENERATION

Support:

• Report definition
• Parameters
• Generation status
• Progress
• Completion
• Failure
• Download authorization
• Expiration

Generated report files should use secure object storage.

────────────────────────────────────────

EVENTS

Publish/consume appropriate events.

SEARCH:

• SearchPerformed
• SearchIndexed
• SearchIndexFailed

RECOMMENDATIONS:

• RecommendationGenerated
• RecommendationServed
• RecommendationClicked

REVIEWS:

• ReviewCreated
• ReviewUpdated
• ReviewApproved
• ReviewRejected
• ReviewReported

NOTIFICATIONS:

• NotificationCreated
• NotificationQueued
• NotificationDelivered
• NotificationFailed
• NotificationRead

MESSAGING:

• ConversationCreated
• MessageCreated
• MessageRead

ANALYTICS:

• AnalyticsEventRecorded
• AnalyticsAggregationCompleted

REPORTING:

• ReportCreated
• ReportCompleted
• ReportFailed

Use the established event envelope.

Never duplicate complete database records unnecessarily.

────────────────────────────────────────

BACKGROUND JOBS

Implement BullMQ jobs for:

• Search indexing
• Bulk reindexing
• Recommendation refresh
• Trending calculation
• Rating aggregation
• Review moderation
• Push notification delivery
• Email delivery
• Notification cleanup
• Analytics aggregation
• Report generation
• Report cleanup
• Message retention
• Search cache invalidation

Every job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter behavior
• Metrics
• Structured logging

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for appropriate entities.

Include:

• Search query analytics references where required
• RecommendationCache metadata where appropriate
• RecommendationEvent references where appropriate
• Review
• ReviewMedia
• ReviewResponse
• ReviewReport
• ProductRatingAggregate
• Notification
• NotificationPreference
• NotificationDelivery
• PushToken
• Conversation
• ConversationParticipant
• Message
• MessageAttachment
• Report
• AnalyticsReference
• ReportJob

Do not store search indexes inside PostgreSQL.

Do not store large analytics event streams in transactional tables.

Do not create unnecessary database entities for derived data.

────────────────────────────────────────

API

Implement production-ready APIs.

SEARCH

• Search products
• Search categories
• Search brands
• Search sellers
• Autocomplete
• Search suggestions
• Search filters
• Search facets

RECOMMENDATIONS

• Home recommendations
• Similar products
• Related products
• Frequently bought together
• Trending
• Recently viewed

REVIEWS

• Create review
• Get reviews
• Update review where allowed
• Report review
• Respond to review
• Rating summary

NOTIFICATIONS

• List notifications
• Read notification
• Mark all read
• Notification preferences
• Register push token

MESSAGING

• Create conversation
• List conversations
• Get messages
• Send message
• Mark read
• Upload attachment

ANALYTICS

• Seller analytics
• Product analytics
• Order analytics
• Inventory analytics
• Financial summaries where authorized

REPORTING

• Create report
• Get report status
• Download report

Every endpoint must include:

• Authentication
• Authorization
• Validation
• Rate limiting
• Pagination
• Cursor pagination where appropriate
• OpenAPI documentation
• Consistent errors
• Idempotency where appropriate

────────────────────────────────────────

SELLER ISOLATION

Seller-scoped features must enforce isolation for:

• Reviews
• Seller analytics
• Seller reports
• Seller messaging
• Notifications
• Product analytics
• Order analytics
• Inventory analytics

Never allow a seller to query another seller's private data.

────────────────────────────────────────

SECURITY

Protect against:

• Search enumeration
• Review manipulation
• Notification abuse
• Messaging abuse
• Report abuse
• Analytics data leakage
• Seller cross-tenant access
• Unauthorized report downloads
• Unauthorized notification access
• Attachment access bypass

Use:

• Authentication
• Authorization
• Rate limiting
• Object ownership checks
• Signed URLs
• Secure report downloads
• Audit logging

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Search requests
• Search latency
• Search index lag
• Recommendation latency
• Recommendation cache hit rate
• Review creation
• Notification delivery
• Push failures
• Email failures
• Messaging latency
• Report generation
• Analytics processing

Track:

• Search success rate
• Zero-result rate
• Recommendation latency
• Notification delivery rate
• Queue depth
• Message delivery latency
• Report generation duration

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Search query construction
• Ranking logic
• Recommendation rules
• Review eligibility
• Rating aggregation
• Notification routing
• Messaging authorization
• Report authorization
• Analytics aggregation

INTEGRATION TESTS

Test:

• Elasticsearch/OpenSearch
• PostgreSQL
• Redis
• Kafka
• BullMQ
• S3
• FCM/APNS abstractions
• Email provider abstraction

SEARCH TESTS

Test:

• Autocomplete
• Filters
• Facets
• Sorting
• Typo tolerance
• Index updates
• Reindexing
• Authorization

RECOMMENDATION TESTS

Test:

• Candidate generation
• Ranking
• Fallbacks
• Cache behavior
• Personalization boundaries

REVIEW TESTS

Test:

• Verified purchase
• Duplicate review
• Rating aggregation
• Seller response
• Moderation

NOTIFICATION TESTS

Test:

• Preferences
• Deduplication
• Retry
• Provider failures
• Multi-device delivery

MESSAGING TESTS

Test:

• Conversation authorization
• Seller isolation
• Message persistence
• Attachment authorization
• Read state

ANALYTICS TESTS

Test:

• Event ingestion
• Aggregation
• Seller isolation
• Report generation

────────────────────────────────────────

DOCUMENTATION

Generate:

• Search architecture
• Index mappings
• Reindex strategy
• Recommendation architecture
• Personalization
• Review model
• Rating aggregation
• Notification architecture
• Messaging architecture
• Analytics architecture
• Reporting architecture
• Privacy model
• Seller isolation
• API contracts
• Event contracts
• Queue architecture
• Database schema
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Search modules
• Recommendation modules
• Review modules
• Rating modules
• Notification modules
• Messaging modules
• Analytics modules
• Reporting modules
• Database objects
• Search indexes
• Kafka topics
• BullMQ queues
• Workers
• API endpoints
• Events
• Tests
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Search domain, Elasticsearch/OpenSearch client, indexes, mappings, and query infrastructure.

BACKEND MILESTONE 2

Search indexing, autocomplete, filters, facets, ranking, aliases, and reindexing.

BACKEND MILESTONE 3

Recommendation domain, deterministic ranking, personalization signals, and caching.

BACKEND MILESTONE 4

Reviews, verified purchase validation, ratings, aggregation, and moderation.

BACKEND MILESTONE 5

Notifications, preferences, push tokens, FCM/APNS integration, and email abstraction.

BACKEND MILESTONE 6

Customer-seller messaging, conversations, messages, attachments, and authorization.

BACKEND MILESTONE 7

Analytics events, aggregation, seller analytics, marketplace analytics, and retention.

BACKEND MILESTONE 8

Reporting jobs, secure report generation, downloads, and expiration.

BACKEND MILESTONE 9

Cross-domain events, queues, observability, cache strategies, and operational hardening.

BACKEND MILESTONE 10

Integration, performance, security, privacy, and production-readiness testing.

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

• Search
• Search indexing
• Search analytics
• Recommendations
• Personalization
• Reviews
• Ratings
• Review moderation
• Notifications
• Push notifications
• Email notifications
• Customer-seller messaging
• Analytics
• Reporting

Do not implement:

• Infrastructure
• Kubernetes
• Terraform
• CI/CD
• Frontend
• Mobile

Do not redesign existing catalog, inventory, checkout, order, payment, or seller architectures.

────────────────────────────────────────

QUALITY BAR

Treat search, recommendations, reviews, notifications, messaging, and analytics as high-scale production systems.

Assume:

• Millions of search requests
• Millions of products
• Large recommendation traffic
• Large review volumes
• Large notification volumes
• High messaging traffic
• Large analytics event volumes
• Hundreds of thousands of sellers
• Global operations

Prioritize:

• Search relevance
• Low latency
• Data privacy
• Seller isolation
• Recommendation resilience
• Notification reliability
• Messaging authorization
• Analytics correctness
• Horizontal scaling
• Observability
• Fault tolerance
• Maintainability
• Production readiness
