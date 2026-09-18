# Amazon-Style Ecommerce Marketplace — Frontend Prompt — Volume 3

# ROLE

You are the Staff Frontend Engineering team responsible for implementing the authenticated customer post-purchase, account, review, notification, and customer-service web experience of a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Frontend Engineer
* UI/UX Engineer
* Performance Engineer
* Accessibility Engineer
* Security Engineer
* QA Engineer
* Technical Documentation Engineer

This is a bounded frontend implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future frontend domains merely because they belong to the completed ecommerce platform.

Do not implement backend, mobile, production infrastructure, or unrelated QA-platform work outside the frontend testing required by this milestone.

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
* reviews;
* notifications;
* seller operations;
* administration;
* moderation;
* fraud and abuse prevention;
* search and discovery;
* recommendations;
* analytics;
* high traffic;
* asynchronous processing;
* large media volumes;
* high availability;
* horizontal scalability;
* disaster recovery.

The web application technology direction is:

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

The backend remains authoritative for:

* account state;
* orders;
* payment state;
* fulfillment;
* shipment state;
* return eligibility;
* refunds;
* review eligibility;
* review moderation;
* notification state;
* authorization.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* web application shell;
* authentication;
* customer account;
* API client;
* TanStack Query;
* shared UI;
* product/catalog pages;
* cart;
* checkout;
* payment integration;
* existing account pages;
* orders;
* shipments;
* returns;
* refunds;
* reviews;
* notifications;
* analytics;
* tests;
* routing;
* environment configuration.

The repository is authoritative for what actually exists.

Do not assume earlier frontend or backend prompts were executed.

Do not invent APIs that are not present or contractually defined.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate implementations;
* maintain established contracts.

If an expected backend capability is unavailable, integrate only with the verified contract and accurately report the dependency rather than creating fake behavior.

# CURRENT EXECUTION SCOPE

Implement the authenticated customer post-purchase and engagement experience.

This milestone includes:

* account dashboard enhancements;
* order-history page;
* order-list filtering and pagination;
* order-detail page;
* order status/timeline presentation;
* shipment/tracking presentation;
* cancellation UI;
* return-request UI;
* refund-status presentation;
* reorder foundation where supported by backend contracts;
* review eligibility UI;
* review creation;
* review editing;
* review deletion where supported;
* review media selection/upload integration where supported;
* review reporting;
* seller-review-response display;
* customer notification center;
* unread notification state;
* notification preferences;
* push-device management UI where applicable;
* account/security settings integration;
* customer support entry points where the backend supports them;
* accessibility;
* responsive behavior;
* analytics;
* comprehensive tests.

The backend remains authoritative for all business decisions.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* seller portal;
* seller analytics;
* platform administration;
* moderation dashboard;
* fraud operator UI;
* warehouse management;
* complete customer-support ticketing if no backend contract exists;
* mobile React Native application;
* production infrastructure;
* backend implementation;
* independent order/payment engines.

Do not implement business rules in the browser merely because they appear convenient to the UI.

# CUSTOMER ACCOUNT ARCHITECTURE

Extend the account area into a coherent authenticated experience.

Support navigation for:

* profile;
* security;
* orders;
* notifications;
* preferences;
* reviews;
* other customer-owned areas that are actually supported by the backend.

Use a consistent account layout.

Do not create a separate authentication mechanism for each section.

# ACCOUNT DASHBOARD

Implement a useful customer account overview.

It may display:

* recent orders;
* pending deliveries;
* unread notifications;
* saved account information;
* review opportunities where supported;
* security alerts.

Use backend data.

Do not fabricate account activity.

# ACCOUNT NAVIGATION

Create a responsive accessible account navigation.

Support:

* desktop navigation;
* mobile navigation;
* current-section indication;
* keyboard navigation;
* appropriate focus behavior.

Do not allow account-navigation components to expose protected content before authentication is established.

# ORDER HISTORY

Implement a production-grade order-history page.

Support:

* paginated order list;
* order number;
* creation date;
* order state;
* payment state where appropriate;
* total;
* seller information appropriate to the customer;
* item summary;
* delivery/shipment summary;
* navigation to order detail.

Use server-side pagination.

Do not load the customer's complete order history into the browser.

# ORDER FILTERING

Support backend-defined filters such as:

* order state;
* date range;
* shipment state where supported.

Do not invent arbitrary filtering fields.

Filtering must use the backend contract and produce bounded requests.

# ORDER SEARCH

Where the backend supports customer order search, integrate it.

Search should not expose:

* other customer orders;
* seller-private order information;
* internal administrative fields.

# ORDER DETAIL

Implement a detailed order page.

Display, as applicable:

* order number;
* order date;
* customer-facing order state;
* seller grouping;
* items;
* quantities;
* historical prices;
* discounts;
* taxes;
* shipping cost;
* total;
* payment status;
* shipping address where authorized;
* shipment information;
* tracking;
* cancellation state;
* return state;
* refund state.

Historical order information must come from the backend's immutable order snapshot.

Do not reconstruct historical prices from the current catalog.

# ORDER DETAIL DATA SECTIONS

Organize the order page into reusable sections such as:

* order summary;
* item list;
* seller/fulfillment grouping;
* payment summary;
* shipping address;
* delivery/tracking;
* cancellation;
* returns/refunds;
* review opportunities.

Each section must gracefully handle absent or pending data.

# ORDER TIMELINE

Display a customer-safe order timeline.

Possible events include:

* order placed;
* payment confirmed;
* preparing;
* shipped;
* out for delivery;
* delivered;
* cancelled;
* return requested;
* refund completed.

Use backend-provided timestamps and states.

Do not fabricate transitions.

# MULTI-SELLER ORDER DISPLAY

When an order contains multiple sellers:

* clearly separate seller groups;
* show applicable fulfillment/shipment state per seller;
* avoid implying that one seller controls another seller's fulfillment.

Customer-facing aggregation must remain understandable without exposing private seller data.

# SHIPMENT TRACKING

Implement shipment/tracking presentation.

Support:

* carrier;
* tracking number;
* current status;
* shipment timeline;
* estimated delivery where available;
* multiple shipments;
* partial fulfillment.

Do not invent tracking updates.

Do not fetch carrier APIs directly from the browser unless explicitly required by the backend/client architecture.

# TRACKING LINKS

Where carrier tracking links are provided by the backend:

* use verified URLs;
* open safely;
* avoid accepting arbitrary client-generated provider URLs.

Do not hardcode carrier-specific tracking URL construction if the backend already provides the canonical destination.

# CANCELLATION UI

Implement customer cancellation flows where the backend allows them.

The UI must:

* determine available action state from the server;
* explain cancellation eligibility;
* request confirmation;
* submit cancellation;
* show pending state;
* handle conflicts;
* refresh order state.

Do not decide cancellation eligibility solely from a locally inferred order status.

# CANCELLATION CONFIRMATION

For destructive actions:

* use an accessible confirmation dialog;
* clearly identify the affected order/item;
* explain consequences;
* prevent accidental duplicate submissions.

Do not hide important financial consequences.

# CANCELLATION FAILURE

Handle:

* cancellation no longer permitted;
* order state changed;
* payment state changed;
* fulfillment already started;
* network failure;
* rate limiting.

Refresh authoritative order data after an uncertain mutation.

# RETURN UI

Implement customer return-request flows supported by the backend.

Support:

* eligible-item selection;
* quantity;
* reason;
* optional explanation;
* submission;
* return status;
* next-step messaging.

Do not allow the client to bypass backend return eligibility.

# RETURN ELIGIBILITY

Display backend-provided eligibility.

If an item is not eligible:

* explain the user-facing reason where available;
* do not expose internal fraud or policy details unnecessarily.

Do not calculate the return window exclusively in JavaScript.

# RETURN STATUS

Display return states such as:

* requested;
* approved;
* received;
* processing;
* completed;
* rejected;

using the canonical backend state.

Do not invent intermediate states.

# REFUND UI

Display refund information when available.

Support:

* refund status;
* amount;
* currency;
* associated order/return;
* relevant timestamps.

Do not imply refund completion until the backend confirms the state.

# REFUND MULTI-ITEM DISPLAY

For partial refunds:

* identify affected items where the API provides that information;
* show refunded amount;
* preserve clear distinction between original order total and refunded amount.

Do not recompute authoritative refund totals independently.

# REORDER

Where the backend exposes a reorder capability, integrate it through the existing contract.

Support:

* selecting an eligible previous order;
* attempting to add eligible items to cart;
* handling unavailable products;
* handling changed pricing;
* handling seller-offer changes.

Do not assume historical products are still purchasable.

If reorder is not supported by the backend, do not create client-only reorder behavior.

# REVIEW ELIGIBILITY

On order/product surfaces, display review actions only when the backend indicates eligibility.

Eligibility may depend on:

* delivery;
* customer ownership;
* previous review;
* return state;
* moderation rules.

Do not infer eligibility solely from order status.

# REVIEW CREATION

Implement a customer review form.

Support:

* rating;
* title where applicable;
* text;
* media where supported;
* submission;
* validation;
* pending moderation state;
* errors.

Use React Hook Form and Zod for client-side validation where appropriate.

The backend remains authoritative.

# REVIEW FORM ACCESSIBILITY

Provide:

* accessible rating controls;
* labels;
* field descriptions;
* character guidance;
* error association;
* keyboard support;
* upload status.

Do not rely on star icons alone to communicate rating values.

# REVIEW EDITING

Where supported:

* load the current review;
* preserve server state;
* allow valid edits;
* display moderation re-review behavior when applicable.

Do not allow editing of reviews in backend-forbidden states.

# REVIEW DELETION

Where supported:

* require explicit confirmation;
* explain consequences;
* submit through backend;
* refresh review state;
* handle already-removed states safely.

# REVIEW MEDIA

Where backend media upload contracts exist:

* integrate signed upload flow;
* display upload progress;
* validate client-side for immediate feedback;
* send finalization to backend;
* handle failed processing;
* remove failed or abandoned client references.

Never upload directly with permanent storage credentials.

# REVIEW MEDIA SECURITY

Do not:

* expose storage credentials;
* trust arbitrary object keys;
* render untrusted HTML;
* send private media URLs to analytics.

Use backend-generated upload/session information.

# REVIEW DISPLAY

Implement customer-facing review display components on supported pages.

Support:

* rating;
* review text;
* verified-purchase indicator where provided;
* date;
* media;
* seller response;
* moderation-safe states.

Do not expose moderator notes or internal review reports.

# REVIEW REPORTING

Provide a report action where supported.

The UI must:

* show report reasons;
* prevent duplicate submission while in flight;
* handle successful report;
* handle rate limit;
* avoid revealing internal moderation state.

# SELLER RESPONSES

Display seller responses clearly and distinguish them from customer-generated review content.

Do not allow customers to edit seller responses.

# NOTIFICATION CENTER

Implement a customer notification center.

Support:

* notification list;
* unread count;
* unread/read state;
* notification type;
* timestamp;
* relevant action/deep link.

Use TanStack Query for server state.

# NOTIFICATION LIST

Implement bounded pagination.

Support:

* unread filter;
* notification type filter where available;
* date ordering.

Do not load the entire notification history.

# NOTIFICATION READ STATE

Implement:

* mark read;
* mark unread where supported;
* mark all read.

After mutation, synchronize the canonical server state.

Prevent duplicate mutation races from producing stale counts.

# UNREAD BADGE

Display unread count in navigation.

The count must come from the backend or the canonical query cache.

Do not maintain a permanently independent unread counter.

# NOTIFICATION DEEP LINKS

Notifications may point to:

* order;
* shipment;
* review;
* account/security;
* seller-related customer actions.

Deep links must be validated.

Do not navigate to an arbitrary URL supplied by an untrusted notification payload.

# NOTIFICATION PREFERENCES

Implement customer notification preferences.

Support the channels/types returned by the backend.

Display:

* current state;
* preference grouping;
* save/update behavior;
* loading;
* error.

Security-critical notification types should display appropriately restricted controls.

# DEVICE/PUSH SETTINGS

Where push notification management is part of the web application's responsibility:

* display supported device/session settings;
* allow safe registration/removal as supported;
* handle permission states.

Do not assume browser push support where the deployment or backend does not provide it.

# SECURITY SETTINGS

Integrate account-security settings supported by the backend.

This may include:

* change password;
* active sessions;
* revoke session;
* email verification;
* security-event history;
* authentication method management where supported.

Do not expose sensitive token values.

# ACTIVE SESSIONS

Where session management is exposed:

* list safe session metadata;
* identify current session;
* allow revocation;
* handle current-session logout correctly.

Never display refresh tokens.

# SECURITY EVENT DISPLAY

If security events are exposed to customers, display only safe metadata such as:

* event type;
* timestamp;
* approximate device/location information if the backend intentionally exposes it.

Do not expose internal security controls or hidden risk signals.

# CUSTOMER SUPPORT ENTRY POINTS

Where backend support functionality exists:

* provide clear entry points;
* associate support requests with the relevant resource;
* preserve order context where appropriate.

Do not build a fake support-ticket system if there is no backend support contract.

# CUSTOMER DATA EXPORT/PRIVACY

Where the backend supports customer data export or deletion:

* provide safe entry points;
* clearly communicate pending state;
* require backend authorization;
* never generate the data independently in the browser.

Do not expose raw internal data.

# UX CONSISTENCY

Reuse the project's design system established by earlier frontend work.

Use consistent:

* buttons;
* dialogs;
* forms;
* cards;
* status badges;
* typography;
* spacing;
* empty states;
* error states;
* skeletons.

Do not introduce a second visual system.

# RESPONSIVE DESIGN

The account and post-purchase experience must work on:

* desktop;
* tablet;
* mobile web.

Order tables or dense structures must transform into readable mobile layouts rather than simply overflowing horizontally.

# ACCESSIBILITY

All account, order, review, notification, and security flows must support:

* semantic landmarks;
* accessible headings;
* keyboard navigation;
* focus management;
* accessible dialogs;
* proper labels;
* error association;
* status announcements;
* adequate contrast;
* reduced motion.

# PERFORMANCE

Optimize post-purchase pages for:

* bounded requests;
* pagination;
* efficient images;
* minimal JavaScript;
* cache reuse;
* route-level loading;
* selective prefetching.

Do not prefetch massive order histories or notification archives.

# SERVER/CLIENT BOUNDARIES

Use Server Components where appropriate for initial read-heavy rendering.

Use Client Components for:

* forms;
* mutation controls;
* interactive filters;
* dialogs;
* rating controls;
* notification actions.

Do not turn the entire account system into a Client Component tree without reason.

# API STATE MANAGEMENT

Use TanStack Query for:

* orders;
* order detail;
* shipments;
* returns;
* refunds;
* reviews;
* notifications;
* preferences;
* security settings.

Use invalidation/refetch patterns after mutations.

Do not duplicate these resources in Zustand.

# STALE DATA

Post-purchase data may change asynchronously.

Support refresh/revalidation after:

* payment updates;
* shipment updates;
* refund completion;
* return status changes;
* review moderation.

Where appropriate, provide manual refresh behavior without causing request storms.

# REAL-TIME UPDATES

If backend realtime contracts exist:

* integrate shipment/order/notification updates appropriately;
* handle connection loss;
* reconcile with authoritative HTTP queries;
* avoid treating realtime messages as permanent authority without persistence.

Do not invent WebSocket/SSE contracts that do not exist.

# ERROR HANDLING

Handle:

* unauthorized;
* forbidden;
* not found;
* stale state;
* conflict;
* rate limit;
* temporary network failure;
* backend dependency failure.

Provide meaningful recovery paths.

Do not show raw backend stack traces.

# ANALYTICS

Instrument appropriate customer events:

* order viewed;
* shipment viewed;
* cancellation initiated;
* return initiated;
* review opened;
* review submitted;
* notification opened;
* preference changed;
* security setting changed.

Do not capture:

* passwords;
* tokens;
* complete addresses;
* payment credentials;
* full private notification payloads.

# ANALYTICS PRIVACY

Use only the minimum event context necessary.

Where an order/product/user identifier is required, use the project's approved event identifier strategy.

Do not send unrestricted page/form contents.

# SEO

Authenticated account, order, review-submission, and notification pages must not be publicly indexed.

Use appropriate route metadata and indexing controls.

Public product review displays may remain indexable only where the public product route and backend visibility rules allow it.

# TESTING

Create meaningful automated tests.

## Account

Test:

* authentication guard behavior;
* account navigation;
* security settings;
* session revocation.

## Orders

Test:

* order list;
* pagination;
* filters;
* order detail;
* seller grouping;
* timeline;
* shipment section;
* cancellation eligibility;
* cancellation confirmation;
* mutation error handling.

## Returns

Test:

* eligible item display;
* invalid item handling;
* return submission;
* confirmation;
* status updates.

## Refunds

Test:

* pending refund;
* completed refund;
* failed/refused state;
* partial refund display.

## Reviews

Test:

* eligibility;
* create;
* edit;
* delete;
* media upload boundary;
* reporting;
* seller response display.

## Notifications

Test:

* list;
* unread count;
* mark read;
* mark all read;
* pagination;
* preferences;
* deep-link validation.

## Accessibility

Test:

* keyboard navigation;
* form semantics;
* dialogs;
* focus;
* rating controls;
* notification/status announcements.

# END-TO-END TESTS

Where browser E2E infrastructure exists, cover:

* authenticated account access;
* order-history navigation;
* order detail;
* cancellation flow;
* return request;
* review submission;
* notification read state.

Tests must use realistic backend/test environments.

Do not fake final order/refund outcomes in E2E tests unless the test environment intentionally uses provider-supported test fixtures.

# SECURITY TESTS

Verify:

* customer cannot access another customer's order;
* customer cannot access another customer's notifications;
* customer cannot modify another customer's review;
* customer cannot trigger unauthorized seller actions;
* private order data is not included in client logs;
* payment/refund secrets are absent from browser bundles;
* deep links cannot be turned into arbitrary open redirects.

# DOCUMENTATION

Update frontend documentation covering:

* account architecture;
* order pages;
* return/refund flows;
* review UI;
* notification center;
* preferences;
* security settings;
* API integration;
* analytics;
* testing;
* accessibility.

Documentation must reflect the actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake orders;
* fake shipment tracking;
* fake refunds;
* fake review persistence;
* fake notifications;
* placeholder APIs;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use real backend contracts.

Where a backend feature is absent, report the exact dependency instead of creating a fake successful workflow.

# NO HARDCODED SECRETS

Never hardcode:

* API secrets;
* payment credentials;
* provider credentials;
* database credentials;
* signing keys.

Never expose server-only environment variables to the browser.

# VALIDATION

Before completion, run applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit/component tests;
* accessibility checks;
* browser E2E;
* production build;
* route validation;
* API integration validation.

Where external provider testing is unavailable:

* use provider-supported test fixtures;
* validate frontend state transitions;
* accurately report external limitations.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* account changes;
* order pages;
* shipment/tracking components;
* cancellation flows;
* return flows;
* refund presentation;
* review features;
* notification center;
* preference/security settings;
* API-client changes;
* state-management changes;
* analytics changes;
* accessibility changes;
* tests created;
* tests executed;
* validation performed;
* backend contract dependencies;
* unresolved issues;
* compatibility considerations.

# DEFINITION OF DONE

This milestone is complete only when:

* the authenticated customer account experience is coherent;
* order history is implemented with bounded pagination;
* order detail is implemented;
* historical order values are rendered from backend snapshots;
* shipment/tracking information is displayed;
* cancellation UI is implemented where supported;
* return-request UI is implemented where supported;
* refund status is presented correctly;
* review eligibility is respected;
* review creation/edit/delete behavior is implemented where supported;
* review media integration is secure where supported;
* review reporting is implemented;
* seller responses are displayed;
* notification center is implemented;
* unread/read state is synchronized;
* notification preferences are implemented;
* security settings are implemented where supported;
* responsive behavior is implemented;
* accessibility requirements are met;
* analytics is integrated without sensitive data;
* automated tests cover critical flows;
* production build succeeds where dependencies are available;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the authenticated customer post-purchase, review, notification, and account-management web experience defined by this prompt.

Do not implement seller administration, platform administration, mobile, backend, production infrastructure, or unrelated analytics systems.

The backend remains authoritative for order state, payment state, shipment state, return eligibility, refund state, review eligibility, moderation, notification state, and authorization.

Never fabricate orders, refunds, delivery updates, reviews, notifications, or support actions.

Protect all customer data and credentials.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
