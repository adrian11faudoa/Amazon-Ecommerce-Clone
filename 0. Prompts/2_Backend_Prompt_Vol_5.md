# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 5

# ROLE

You are the Staff Backend Engineering team responsible for implementing the customer engagement, review, notification, and post-purchase communication foundations of a production-grade, globally scalable ecommerce marketplace.

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
* customer reviews;
* customer notifications;
* seller notifications;
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
* Elasticsearch or OpenSearch where applicable
* S3-compatible object storage where applicable
* Stripe or equivalent payment-provider abstraction
* OpenTelemetry-compatible observability

Do not assume earlier prompts were executed. Inspect the repository and integrate only with functionality that actually exists.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* customer identity;
* seller organizations;
* catalog;
* product and offer models;
* inventory;
* carts;
* checkout;
* orders;
* payments;
* fulfillment;
* returns;
* refunds;
* notification infrastructure;
* event/outbox infrastructure;
* queues;
* Redis;
* authentication;
* authorization;
* database schema;
* migrations;
* observability;
* API conventions;
* tests.

The repository is authoritative for actual implementation state.

The current prompt defines the required scope.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve existing behavior;
* avoid duplicate implementations;
* maintain existing contracts.

Do not fabricate repository state or assume an earlier AI response created files that are not present.

# CURRENT EXECUTION SCOPE

Implement the backend foundations for:

* verified-purchase customer reviews;
* ratings;
* review media metadata where appropriate;
* review moderation states;
* review reporting;
* seller responses where applicable;
* review aggregation;
* notification domain;
* notification preferences;
* in-app notifications;
* email notification orchestration;
* push-notification orchestration where applicable;
* notification templates;
* notification delivery state;
* notification retries;
* notification deduplication;
* notification rate limits;
* notification event consumption;
* customer/seller notification targeting;
* asynchronous delivery workers;
* notification auditability;
* review and notification APIs;
* related events and queues;
* tests and validation.

This milestone must establish reusable engagement and communication infrastructure for later web, mobile, administration, and analytics implementation.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete web UI;
* complete mobile UI;
* production Kubernetes;
* production AWS provisioning;
* full recommendation infrastructure;
* complete analytics warehouse;
* machine-learning moderation;
* advanced fraud scoring;
* complete support/ticketing functionality;
* unrelated catalog/search functionality;
* unrelated financial functionality.

Where moderation is necessary for review lifecycle correctness, implement only the review moderation boundary required by this prompt.

# ENGINEERING REQUIREMENTS

Reviews and notifications must be:

* secure;
* authorization-aware;
* idempotent;
* observable;
* resilient;
* retry-safe;
* privacy-conscious;
* horizontally scalable;
* compatible with asynchronous processing.

Do not make notification-provider availability a prerequisite for successful critical business transactions.

Do not allow unverified customers to create arbitrary product reviews unless the project contract explicitly permits it.

# DOMAIN BOUNDARIES

Maintain distinct ownership between:

* Review;
* ReviewModeration;
* Notification;
* NotificationPreference;
* NotificationDelivery;
* NotificationTemplate;
* NotificationProvider.

Do not make notification provider SDK models part of the core notification domain.

Do not store notification state only in a third-party provider.

# REVIEW ELIGIBILITY

Reviews must be tied to legitimate customer purchase history when verified-purchase reviews are part of the platform.

Eligibility must verify:

* authenticated customer;
* relevant order;
* order item;
* delivered/eligible state;
* customer ownership;
* item quantity where applicable;
* previous review eligibility;
* return/refund implications where relevant.

Do not trust client-provided order or item ownership.

# REVIEW DATA MODEL

Implement the review model with appropriate support for:

* review ID;
* customer;
* product;
* seller offer where applicable;
* order item;
* rating;
* title;
* body;
* media references;
* verification state;
* moderation state;
* timestamps;
* update history or audit metadata where required.

Do not duplicate product data unnecessarily.

Historical review display must remain stable enough for moderation and audit requirements.

# REVIEW RATING

Ratings must be bounded by a canonical scale established by the product contract.

Validate:

* integer or permitted rating representation;
* minimum;
* maximum;
* required fields.

Do not accept arbitrary client-provided rating values outside the defined domain.

# REVIEW UNIQUENESS

Define whether a customer may:

* create one review per order item;
* update a review;
* create multiple reviews for repeated purchases.

Enforce the selected business rule with database constraints and business logic.

Do not rely on a frontend check to prevent duplicates.

# REVIEW LIFECYCLE

Implement explicit review states appropriate to the project, such as:

* pending;
* published;
* hidden;
* rejected;
* removed.

Define valid transitions and the actor responsible for them.

Customer requests must not directly set moderation states.

# REVIEW MODERATION BOUNDARY

Implement only the moderation state machine needed for review integrity.

Support:

* moderation state;
* reason/code where appropriate;
* moderator identity where applicable;
* timestamps;
* audit information;
* publication effects.

Do not implement a complete platform-wide moderation system in this milestone.

# REVIEW REPORTING

Implement customer-facing review reporting where applicable.

A report must include:

* review;
* reporting customer;
* reason;
* timestamp;
* state.

Prevent:

* unauthorized reporting;
* duplicate spam reports;
* reporting deleted/nonexistent reviews;
* disclosure of private moderation information.

# SELLER REVIEW RESPONSES

If seller responses are part of the project scope, implement the seller response boundary.

A seller may respond only to reviews associated with:

* that seller's offer;
* that seller's organization;
* an authorized seller membership.

Responses must be subject to appropriate authorization and moderation rules.

Do not let sellers modify customer review content.

# REVIEW EDITING

Where customer editing is supported:

* authorize the review owner;
* preserve update timestamps;
* prevent editing after restricted moderation states where appropriate;
* ensure edited content re-enters moderation when policy requires it.

Do not allow an edit to bypass moderation controls.

# REVIEW DELETION

Define deletion behavior.

Customer deletion, administrative removal, and moderation removal must be distinguishable when required for auditability.

Avoid physically deleting information required to investigate abuse unless policy explicitly allows it.

# REVIEW MEDIA

If review media is supported:

* reference existing media infrastructure;
* authorize upload ownership;
* validate media state;
* prevent arbitrary object-key access;
* avoid storing binary media in PostgreSQL;
* preserve media processing state.

Do not build a second media-storage system.

# REVIEW AGGREGATES

Implement derived product-level review aggregates as appropriate.

Support:

* average rating;
* rating distribution;
* review count;
* verified review count where appropriate.

Aggregates must be treated as derived data.

They must be rebuildable from authoritative reviews.

# AGGREGATE UPDATE STRATEGY

When a review changes state:

* update derived aggregates consistently;
* tolerate retries;
* prevent duplicate counting;
* handle removal/unpublication;
* handle rating changes.

Do not increment counters blindly on repeated events.

# REVIEW EVENTS

Emit appropriate events such as:

* ReviewCreated
* ReviewPublished
* ReviewUpdated
* ReviewHidden
* ReviewRemoved
* ReviewReported
* SellerReviewResponded
* ReviewAggregateChanged

Use the project's canonical event envelope.

Avoid unnecessary PII in events.

# REVIEW EVENT IDEMPOTENCY

Consumers of review events must tolerate:

* duplicate delivery;
* delayed delivery;
* replay.

Derived aggregates and downstream notification behavior must remain deterministic.

# NOTIFICATION DOMAIN

Implement a provider-neutral notification domain.

A notification must distinguish:

* logical notification;
* delivery attempt;
* provider;
* channel;
* template;
* recipient;
* delivery state.

Do not combine notification definition with provider transport details.

# NOTIFICATION CHANNELS

Support the channels required by the project, as applicable:

* in-app;
* email;
* push notification;
* SMS through a provider abstraction where explicitly required.

Implement only channels actually required for the current scope.

# NOTIFICATION TYPES

Define a notification taxonomy for events such as:

* account/security events;
* seller events;
* order confirmation;
* payment updates;
* shipment updates;
* delivery;
* cancellation;
* return;
* refund;
* promotion;
* review events.

Do not hardcode provider-specific notification names throughout business modules.

# NOTIFICATION PREFERENCES

Implement customer notification preferences.

Preferences should support, as appropriate:

* channel;
* notification type;
* enabled/disabled;
* default behavior;
* updated timestamp.

Security-critical or legally required communications may not be suppressible.

Define those exceptions explicitly.

# SELLER NOTIFICATION PREFERENCES

Where applicable, support seller notification preferences separately from customer preferences.

Seller notification policy must not accidentally use customer preferences.

# NOTIFICATION TARGETING

Notification targeting must be derived server-side.

Support targets based on:

* user identity;
* seller organization;
* role;
* relevant resource ownership.

Never allow a client to submit an arbitrary recipient for a privileged business notification.

# IN-APP NOTIFICATIONS

Implement persistent in-app notifications where required.

Support:

* notification ID;
* recipient;
* type;
* title;
* body;
* structured metadata;
* read state;
* created timestamp;
* expiration where applicable.

Use explicit response DTOs.

Do not expose internal provider state.

# NOTIFICATION READ STATE

Implement read/unread behavior safely.

Operations such as:

* mark read;
* mark unread where allowed;
* mark all read;

must require recipient ownership.

Prevent one customer from manipulating another customer's notification state.

# NOTIFICATION EXPIRATION

Where notifications have lifecycle or retention limits:

* define expiration;
* clean them asynchronously;
* preserve records needed for audit or operational purposes;
* avoid unbounded growth.

# NOTIFICATION TEMPLATES

Create a template abstraction.

Templates should support:

* stable template identifier;
* version;
* channel;
* locale where applicable;
* structured variables;
* rendering validation.

Do not construct large provider-specific message bodies throughout business services.

# TEMPLATE SECURITY

Template variables must be safely escaped according to output channel.

Do not allow user-controlled HTML or markup to become executable content without appropriate sanitization.

Never include secrets in templates.

# LOCALIZATION BOUNDARY

Where localization is required:

* define locale selection;
* define fallback;
* keep business events independent from rendered text;
* allow channel-specific rendering.

Do not duplicate business logic for every language.

# NOTIFICATION DELIVERY

Implement asynchronous notification delivery.

Critical business operations should enqueue notification work rather than waiting synchronously for provider delivery.

The queue payload should identify:

* notification;
* channel;
* template;
* recipient;
* attempt metadata;
* correlation ID.

# DELIVERY STATE MACHINE

Model delivery states such as:

* queued;
* processing;
* sent;
* delivered where provider feedback exists;
* failed;
* suppressed;
* cancelled.

Do not equate "provider accepted request" with guaranteed delivery.

# NOTIFICATION RETRIES

Implement bounded retries with:

* exponential backoff;
* jitter where appropriate;
* maximum attempts;
* retryable/non-retryable classification;
* dead-letter handling.

Do not retry permanent validation failures indefinitely.

# NOTIFICATION IDEMPOTENCY

Prevent duplicate sends for the same logical notification.

Use a deterministic idempotency identity based on:

* notification type;
* recipient;
* business resource;
* event identity;
* channel;

where appropriate.

Do not assume a provider will prevent duplicate messages.

# NOTIFICATION DEDUPLICATION

Where many equivalent events can arrive:

* collapse duplicate work;
* define a deduplication window where appropriate;
* preserve critical communications;
* avoid losing legitimately distinct notifications.

# PROVIDER ABSTRACTION

Create provider-neutral abstractions for each notification channel.

For example, email delivery should not expose provider SDK types to domain services.

Provider implementations must support:

* send;
* status/result classification;
* provider error translation;
* timeout;
* retryability.

# EMAIL PROVIDER

If an email provider is already configured in the repository:

* use the existing abstraction;
* preserve configuration;
* handle provider failures;
* implement safe retries.

If no provider is available:

* implement the provider boundary;
* provide configuration requirements;
* validate message construction;
* do not claim external delivery success.

# PUSH PROVIDER

Where push notifications are included:

* support device-token registration;
* secure token ownership;
* token lifecycle;
* invalid-token handling;
* provider errors;
* device revocation.

Do not expose raw provider credentials to clients.

# DEVICE TOKEN MANAGEMENT

For push notifications, model:

* device token;
* user;
* platform;
* application version where useful;
* registration timestamp;
* last-seen timestamp;
* active state.

Do not allow one user to register arbitrary tokens for another user.

# SMS BOUNDARY

If SMS is part of the current architecture:

* use a provider abstraction;
* enforce rate limits;
* prevent abuse;
* protect phone numbers;
* avoid storing provider credentials in business tables.

Do not add SMS merely because it is theoretically useful if it was not included in the project scope.

# NOTIFICATION EVENTS

Consume relevant domain events from:

* identity;
* order;
* payment;
* fulfillment;
* shipment;
* returns;
* refunds;
* seller workflows;
* reviews.

Notification consumers must remain loosely coupled to producers.

# NOTIFICATION EVENT MAPPING

Create an explicit mapping between:

* domain event;
* notification type;
* recipients;
* eligible channels;
* template;
* preference rule;
* priority.

Do not scatter this mapping across unrelated modules.

# SECURITY NOTIFICATIONS

Certain events should be treated as security-critical.

Examples may include:

* password reset;
* email change;
* suspicious authentication;
* account lockout/security change.

These notifications must follow stronger delivery guarantees and preference rules appropriate to security events.

# NOTIFICATION RATE LIMITING

Protect channels against abuse.

Apply rate limits for:

* email;
* SMS;
* push;
* verification-related notifications;
* reset-related notifications.

Do not let malicious requests generate unlimited provider costs.

# COST CONTROL

Provider usage must be observable.

Track:

* delivery attempts;
* successful provider submissions;
* failures;
* retries;
* suppressed messages;
* provider cost metrics where available.

Do not retry aggressively in a way that multiplies provider costs during outages.

# QUEUES

Implement queue families required for notification delivery.

At minimum define appropriate jobs for:

* email delivery;
* push delivery;
* SMS where applicable;
* notification cleanup;
* retry processing.

Each job must define:

* payload;
* timeout;
* retry policy;
* backoff;
* concurrency;
* idempotency;
* failure behavior;
* observability.

# NOTIFICATION QUEUE FAILURE

If the notification provider is unavailable:

* queue work safely;
* retry only retryable failures;
* dead-letter permanently failing work;
* preserve the logical notification;
* expose operational metrics.

A provider outage must not corrupt order or review transactions.

# NOTIFICATION TRANSACTIONAL OUTBOX

Where a domain event must reliably produce a notification:

* persist the domain event/outbox atomically with the business state;
* let asynchronous processing create notification work;
* tolerate duplicate processing.

Do not send external messages directly inside critical domain transactions.

# REVIEW-TO-NOTIFICATION INTEGRATION

Where appropriate, review events may trigger notifications such as:

* seller notified of a new review;
* customer notified of seller response;
* moderation outcome.

These notifications must use the notification domain rather than provider-specific calls from the review module.

# ORDER-TO-NOTIFICATION INTEGRATION

Integrate with existing order events for notifications such as:

* order confirmation;
* payment status;
* shipment creation;
* out-for-delivery;
* delivery;
* cancellation;
* return;
* refund.

Do not duplicate order state logic inside notifications.

# API DESIGN

Implement APIs appropriate to this scope.

## Reviews

Support, as applicable:

* create review;
* retrieve review;
* update own review;
* delete own review where supported;
* list product reviews;
* report review;
* seller response;
* authorized moderation actions.

## Notifications

Support:

* list notifications;
* retrieve notification;
* mark read;
* mark unread where allowed;
* mark all read;
* retrieve/update preferences;
* register/unregister device token where push is supported.

Do not expose administrative notification controls through ordinary customer endpoints.

# REVIEW PAGINATION

Product review listings must use bounded pagination.

Use cursor pagination for large review collections where appropriate.

Support stable sorting such as:

* newest;
* rating;
* verified purchase;
* helpfulness when later implemented.

Do not allow unrestricted user-controlled database sorting.

# NOTIFICATION PAGINATION

Notification listings must use bounded pagination.

Prefer cursor pagination where appropriate.

Support filtering by:

* unread;
* notification type;
* channel where useful.

Never return a user's entire notification history without bounds.

# AUTHORIZATION

Enforce:

* customer owns review;
* customer owns notification;
* seller owns seller response;
* administrator/moderator permissions for review moderation;
* device token belongs to current user;
* notification preferences belong to current user or seller organization as appropriate.

Every identifier-based lookup must enforce ownership.

# REVIEW ANTI-ABUSE

Protect reviews from:

* duplicate submissions;
* review spam;
* mass reporting;
* unauthorized seller manipulation;
* rating manipulation.

Implement deterministic controls within this scope.

Do not implement an advanced ML abuse engine here.

# REVIEW CONTENT SECURITY

Treat review text and media as untrusted content.

Apply:

* input limits;
* safe serialization;
* sanitization where HTML/markup is allowed;
* media validation through existing media infrastructure.

Do not trust client-provided rendered markup.

# NOTIFICATION PRIVACY

Notifications may contain sensitive information.

Protect:

* order information;
* shipping details;
* security information;
* seller-private information.

Do not expose sensitive content through push payloads when the platform's privacy model requires minimal notification text.

# NOTIFICATION PAYLOAD MINIMIZATION

When possible, notifications should contain:

* stable resource reference;
* generic summary;
* safe metadata.

The client can fetch authorized detailed information from the backend.

Do not place complete private order data into push notifications unnecessarily.

# REVIEW EVENTS AND AGGREGATES

Review state changes that affect aggregates must create deterministic update events.

Aggregate computation must tolerate:

* duplicate events;
* review edits;
* moderation removal;
* re-publication.

Do not double-count ratings.

# DATABASE SCHEMA

Implement schema changes for:

* reviews;
* review reports;
* seller responses where applicable;
* review moderation state;
* review aggregate support where persisted;
* notifications;
* notification recipients;
* notification preferences;
* notification deliveries;
* notification templates;
* device tokens where applicable;
* deduplication/idempotency records where required.

Do not duplicate existing user/order structures.

# DATABASE CONSTRAINTS

Use constraints for:

* review uniqueness;
* valid customer/order-item relationships;
* seller ownership;
* notification ownership;
* unique device registration where appropriate;
* notification deduplication identities.

Use application validation for business rules that cannot be expressed cleanly as database constraints.

# INDEXING

Create indexes for:

## Reviews

* product;
* seller;
* customer;
* publication/moderation state;
* created time;
* order item.

## Notifications

* recipient;
* unread state;
* created time;
* notification type;
* delivery state.

## Device Tokens

* user;
* active state;
* platform;
* token uniqueness where appropriate.

Avoid unnecessary indexes.

# TRANSACTIONS

Use transactions where review/notification state changes require atomic local consistency.

Examples:

* create review plus required audit/outbox;
* moderation state transition plus aggregate-affecting outbox event;
* notification creation plus deduplication;
* device-token replacement.

Do not hold transactions open during provider calls.

# OBSERVABILITY

Instrument:

* review creation;
* review moderation;
* review reporting;
* aggregate updates;
* notification creation;
* notification queue processing;
* provider calls;
* retries;
* failures;
* suppression;
* rate limits.

Include:

* request ID;
* correlation ID;
* event ID;
* notification ID where applicable.

Never log:

* passwords;
* tokens;
* secrets;
* full private notification bodies unnecessarily;
* provider credentials.

# METRICS

Track:

* review creation rate;
* review rejection rate;
* review report volume;
* aggregate-update failures;
* notification queue depth;
* notification delivery success;
* notification delivery failure;
* retry count;
* provider error rate;
* notification suppression;
* push token invalidation;
* email/SMS volume.

Avoid high-cardinality metric labels.

# RELIABILITY

The notification system must tolerate:

* duplicate events;
* provider timeouts;
* provider outages;
* worker restarts;
* queue duplication;
* invalid device tokens;
* delayed delivery;
* temporary database failures.

The review system must tolerate:

* duplicate requests;
* concurrent edits;
* duplicate moderation events;
* event replay.

# FAILURE CLASSIFICATION

Classify notification failures into:

* validation;
* invalid recipient;
* invalid template;
* provider rejected;
* transient provider failure;
* permanent provider failure;
* internal error.

Only retry retryable failures.

# DELIVERY RECONCILIATION

Where providers expose delivery status:

* process status callbacks asynchronously;
* deduplicate provider events;
* update local delivery state;
* preserve provider identifiers;
* reconcile missing callbacks when necessary.

Do not claim delivery merely because a request was submitted.

# RETENTION

Define retention for:

* reviews;
* reports;
* notification history;
* delivery attempts;
* provider metadata;
* device tokens;
* templates.

Avoid unbounded notification-delivery history.

# PRIVACY AND DELETION

Support appropriate privacy workflows.

When a user account is deleted or anonymized:

* follow the project's data-retention rules;
* protect historical order-review requirements;
* anonymize where necessary;
* remove or deactivate device tokens;
* prevent future notification delivery.

Do not accidentally delete required financial or audit records.

# DOCUMENTATION

Update documentation for:

* review lifecycle;
* moderation states;
* review eligibility;
* aggregate behavior;
* notification taxonomy;
* preference rules;
* provider configuration;
* notification queues;
* retry behavior;
* device-token lifecycle;
* API endpoints;
* event mappings;
* retention;
* privacy behavior.

Documentation must describe actual implementation.

# TESTING

Create meaningful tests.

## Reviews

Test:

* verified-purchase eligibility;
* ownership;
* duplicate review prevention;
* rating validation;
* review creation;
* edit;
* delete;
* moderation transitions;
* reporting;
* seller response authorization;
* aggregate updates;
* duplicate event handling.

## Notifications

Test:

* notification creation;
* recipient ownership;
* preferences;
* in-app delivery;
* read/unread behavior;
* pagination;
* duplicate suppression;
* channel selection;
* template rendering;
* retryable provider failure;
* permanent provider failure;
* queue retry;
* deduplication.

## Push

Where implemented, test:

* token registration;
* ownership;
* invalid token handling;
* deactivation;
* duplicate token handling.

## Security

Test:

* review IDOR;
* notification IDOR;
* seller cross-access;
* moderation authorization;
* arbitrary-recipient notification attempts;
* notification abuse/rate limiting.

## Reliability

Test:

* duplicate event;
* duplicate job;
* provider timeout;
* provider outage;
* worker retry;
* dead-letter behavior.

Tests must validate real domain behavior.

# MIGRATIONS

Create deterministic migrations for this milestone.

Preserve existing user/order/catalog relationships.

Do not perform destructive unrelated migrations.

# PERFORMANCE

Review listing and notification retrieval must remain bounded.

Avoid:

* loading all reviews;
* loading all notifications;
* N+1 notification recipient lookups;
* synchronous provider delivery during API requests;
* repeated aggregate scans on every read.

Use:

* pagination;
* indexes;
* asynchronous processing;
* incremental aggregates where justified.

# NO FAKE COMPLETENESS

Do not use:

* fake notification delivery;
* fake provider success;
* placeholder review persistence;
* TODO implementation gaps;
* pseudo-code;
* omitted business logic;
* "implement later."

Complete all functionality in the current scope.

# NO HARDCODED SECRETS

Never hardcode:

* email API keys;
* SMS credentials;
* push credentials;
* provider secrets;
* database credentials;
* Redis credentials;
* signing keys.

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
* OpenAPI validation;
* queue/job tests;
* event-schema validation.

Where live provider validation is unavailable:

* validate provider adapters locally;
* use controlled test fixtures;
* report external limitations accurately;
* do not claim actual delivery.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* review modules;
* moderation-state changes;
* review aggregate changes;
* notification modules;
* notification preferences;
* provider adapters;
* queue/jobs;
* device-token changes;
* database schema changes;
* migrations;
* API endpoints;
* events;
* outbox changes;
* Redis changes;
* authorization changes;
* privacy/security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* compatibility considerations;
* unresolved issues;
* external provider configuration requirements.

Do not claim live provider delivery unless it was actually verified.

# DEFINITION OF DONE

This milestone is complete only when:

* review eligibility is enforced;
* reviews are persisted authoritatively;
* review state transitions are enforced;
* review reporting is implemented;
* seller responses are authorized where supported;
* review aggregates are correct and idempotent;
* review events are implemented;
* notification domain models are implemented;
* notification preferences are implemented;
* in-app notifications are implemented;
* notification delivery is asynchronous;
* notification providers are abstracted;
* retries and deduplication are implemented;
* notification rate limiting is implemented where required;
* push-device management is implemented where applicable;
* relevant domain events produce notification workflows;
* authorization is enforced;
* privacy requirements are enforced;
* observability is present;
* migrations are valid;
* critical behavior is tested;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the review, notification, delivery, and communication backend scope defined by this prompt.

Do not implement unrelated frontend, mobile, infrastructure, analytics, recommendation, or advanced fraud systems.

Preserve compatible existing functionality.

Treat notification providers as external dependencies and isolate them behind provider-neutral abstractions.

Treat reviews as authoritative transactional data and notification delivery as an asynchronous derived workflow.

Do not hardcode secrets.

Do not fabricate external message delivery.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
