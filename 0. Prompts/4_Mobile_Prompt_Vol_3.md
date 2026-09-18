# Amazon-Style Ecommerce Marketplace — Mobile Prompt — Volume 3

# ROLE

You are the Staff Mobile Engineering team responsible for implementing the authenticated customer post-purchase, account, reviews, notifications, returns, refunds, and customer-engagement mobile experience of a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Mobile Engineer
* Mobile UI/UX Engineer
* Performance Engineer
* Accessibility Engineer
* Security Engineer
* QA Engineer
* Technical Documentation Engineer

This is a bounded mobile implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future mobile domains merely because they belong to the completed ecommerce platform.

Do not implement backend, web, infrastructure, or unrelated QA-platform work outside the mobile testing required by this milestone.

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

The mobile application technology direction is:

* React Native;
* Expo;
* TypeScript;
* the repository's established navigation system;
* the repository's established server-state solution;
* secure platform credential storage;
* the verified backend REST/OpenAPI contracts;
* native/provider-supported APIs for push notifications and other device functionality where applicable.

The backend remains authoritative for:

* account state;
* orders;
* payment state;
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

* mobile application structure;
* authentication;
* API client;
* secure storage;
* product/storefront screens;
* cart;
* checkout;
* payment flow;
* account foundation;
* deep links;
* push foundation;
* connectivity handling;
* order APIs;
* shipment APIs;
* return/refund APIs;
* review APIs;
* notification APIs;
* notification preferences;
* shared components;
* state management;
* tests;
* environment configuration.

The repository is authoritative for actual implementation state.

Do not assume previous mobile or backend prompts were executed.

Do not invent APIs or mobile behavior that is not supported by verified contracts.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate implementations;
* maintain established contracts.

If a required backend capability does not exist, do not fabricate successful behavior. Implement only the available contract boundary and report the dependency.

# CURRENT EXECUTION SCOPE

Implement the authenticated customer post-purchase and engagement mobile experience.

This milestone includes:

* account dashboard;
* account/profile management where supported;
* order history;
* order filtering and pagination;
* order detail;
* order timeline;
* shipment/tracking;
* cancellation;
* returns;
* refunds;
* reorder where supported;
* review eligibility;
* review creation;
* review editing;
* review deletion where supported;
* review reporting;
* seller responses;
* review media integration where supported;
* notification center;
* unread notification state;
* notification preferences;
* push-notification handling;
* push deep-link handling;
* security/account settings where supported;
* connectivity-aware refresh;
* foreground/background reconciliation;
* accessibility;
* mobile performance;
* analytics;
* comprehensive automated testing.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* seller mobile portal;
* administration mobile application;
* moderation-operator application;
* fraud-operator application;
* backend implementation;
* production infrastructure;
* a separate messaging/support platform;
* a machine-learning recommendation system;
* a second notification backend.

Do not duplicate the business logic already enforced by backend domains.

# ACCOUNT DASHBOARD

Implement a customer account dashboard.

Display backend-derived information such as:

* recent orders;
* pending deliveries;
* unread notifications;
* review opportunities where available;
* security/account status where appropriate;
* saved account information.

Do not fabricate customer activity.

# ACCOUNT NAVIGATION

Create a mobile account section supporting navigation to:

* profile;
* orders;
* notifications;
* reviews;
* security;
* preferences.

Only expose sections supported by the backend/application.

Navigation must be accessible and consistent with the app shell.

# PROFILE MANAGEMENT

Where profile APIs support it, implement:

* view profile;
* edit profile;
* save;
* field validation;
* server-error mapping;
* loading;
* success;
* failure.

Do not store authoritative profile data only in local state.

# PROFILE SECURITY

Do not expose:

* password hashes;
* tokens;
* security secrets;
* private administrative metadata.

Sensitive credential changes must use dedicated backend flows.

# ORDER HISTORY

Implement a production-grade mobile order-history screen.

Support:

* pagination/infinite loading;
* order number;
* creation date;
* customer-facing status;
* total;
* seller summary where relevant;
* delivery summary;
* navigation to detail.

Use virtualized lists.

Do not load the customer's complete order history into memory.

# ORDER FILTERING

Where backend filtering is available, support bounded filters such as:

* order status;
* date range;
* delivery/shipment state.

Do not implement arbitrary client-side filtering over the complete historical dataset.

# ORDER SEARCH

If customer order search exists in the verified API, integrate it.

Do not expose:

* other customers' orders;
* internal order identifiers not intended for customers;
* private seller information.

# ORDER DETAIL

Implement a mobile order-detail screen.

Display, as authorized:

* order number;
* order date;
* status;
* seller grouping;
* item list;
* historical item price;
* discounts;
* taxes;
* shipping;
* total;
* payment status;
* delivery address;
* shipment information;
* cancellation state;
* return state;
* refund state;
* review eligibility.

Historical values must come from the backend's order snapshots.

Do not reconstruct historical prices or totals from current catalog data.

# ORDER ITEMS

Use virtualized or appropriately bounded rendering when an order contains many items.

Display:

* product image;
* title;
* variant/SKU information where customer-visible;
* quantity;
* price;
* seller;
* item state.

Do not expose internal operational fields.

# MULTI-SELLER ORDER DISPLAY

When an order contains multiple sellers:

* separate seller groups clearly;
* show seller-specific fulfillment/shipment information only where authorized;
* avoid implying seller control over unrelated items.

# ORDER TIMELINE

Display a customer-safe timeline.

Possible states/events include:

* order placed;
* payment confirmed;
* processing;
* shipped;
* out for delivery;
* delivered;
* cancelled;
* return initiated;
* refund completed.

Use backend-provided timestamps.

Do not invent intermediate events.

# SHIPMENT TRACKING

Implement shipment/tracking presentation.

Support:

* carrier;
* tracking number;
* shipment status;
* delivery estimate where available;
* shipment timeline;
* multiple shipments;
* partial fulfillment.

Do not query carrier APIs directly from the mobile client unless explicitly supported by the backend architecture.

# TRACKING DEEP LINKS

Where carrier tracking URLs are returned by the backend:

* validate they match expected supported schemes/domains where required;
* use safe external-link handling;
* do not execute arbitrary URL schemes.

# CANCELLATION

Implement customer cancellation flow where supported.

The UI must:

* display server-authorized cancellability;
* identify affected order/item;
* request confirmation;
* submit mutation;
* display progress;
* refresh authoritative state.

Do not infer cancellation eligibility exclusively from local order status.

# CANCELLATION SECURITY

Cancellation must require:

* authenticated customer;
* correct order ownership;
* backend authorization.

The mobile client must not trust a customer-provided order ID as proof of access.

# CANCELLATION FAILURE

Handle:

* cancellation no longer available;
* order state changed;
* fulfillment already started;
* payment state changed;
* network failure;
* rate limit.

Refresh authoritative order data after uncertain mutations.

# RETURNS

Implement customer return-request flows supported by the backend.

Support:

* eligible item display;
* quantity selection;
* reason;
* description where supported;
* submission;
* confirmation;
* return state;
* next-step information.

Do not calculate return eligibility solely on the device.

# RETURN ELIGIBILITY

Use backend eligibility.

Handle:

* ineligible items;
* expired return window;
* previously returned quantity;
* restricted product;
* already refunded quantity.

Do not expose internal fraud/risk rules.

# RETURN STATUS

Display canonical states such as:

* requested;
* approved;
* received;
* inspected/processing;
* completed;
* rejected;
* cancelled.

Do not invent unsupported states.

# REFUNDS

Display refund information associated with an order/return.

Support:

* status;
* amount;
* currency;
* timestamp;
* affected items where available.

Do not mark a refund successful until backend state confirms it.

# PARTIAL REFUNDS

Clearly distinguish:

* original order total;
* refunded amount;
* remaining/refundable amount where returned by backend.

Do not recompute financial totals independently.

# REORDER

Where the backend provides reorder support:

* display eligible historical items;
* initiate reorder;
* route to cart;
* handle discontinued products;
* handle changed pricing;
* handle unavailable offers.

Do not assume every historical product remains purchasable.

# REVIEW ELIGIBILITY

Display review actions only when backend data indicates eligibility.

Do not infer eligibility based solely on delivery status shown in the UI.

# REVIEW CREATION

Implement a mobile review form supporting:

* rating;
* title where supported;
* body;
* media attachments where supported;
* submission;
* validation;
* moderation-pending state;
* errors.

Use accessible native/mobile controls.

# RATING CONTROL

The rating control must:

* support screen readers;
* expose the numeric value;
* support touch interaction;
* show selected/unselected state without relying solely on color.

# REVIEW EDITING

Where supported:

* load current review;
* edit fields;
* submit;
* refresh;
* explain moderation implications if applicable.

Do not permit unsupported edits to moderated/removed reviews.

# REVIEW DELETION

Where supported:

* require confirmation;
* submit through backend;
* refresh state;
* safely handle already-deleted reviews.

# REVIEW MEDIA

Where review media is supported:

* use the backend's secure upload flow;
* allow camera/gallery selection where appropriate;
* request only required permissions;
* validate size/type for user feedback;
* show upload progress;
* handle processing status;
* allow retry/removal.

Never expose object-storage credentials.

# DEVICE PERMISSIONS

For camera/photo-library functionality:

* request permissions only when needed;
* explain permission purpose;
* handle denied permission;
* provide safe fallback.

Do not repeatedly request permissions without user action.

# REVIEW DISPLAY

Display customer reviews on supported product screens.

Show:

* rating;
* text;
* date;
* verified-purchase indicator where returned;
* media;
* seller response;
* safe moderation state.

Do not expose moderation notes or reports.

# REVIEW REPORTING

Provide report functionality where supported.

Support:

* reason selection;
* submission;
* duplicate-report handling;
* success;
* rate limiting;
* failure.

Do not expose internal moderation workflow.

# SELLER RESPONSE

Display seller response in a visually distinct, accessible manner.

Do not allow customers to edit seller content.

# NOTIFICATION CENTER

Implement a persistent customer notification center.

Support:

* list;
* unread/read state;
* notification type;
* timestamp;
* deep-link action;
* pagination/infinite loading.

Use backend state as authoritative.

# UNREAD COUNT

Synchronize unread count across:

* account area;
* navigation/badges;
* notification center.

Avoid independent counters that drift from backend truth.

# NOTIFICATION READ STATE

Implement:

* mark read;
* mark unread where supported;
* mark all read.

Handle mutation races by reconciling with server state.

# NOTIFICATION DEEP LINKS

Notifications may route to:

* order;
* shipment;
* review;
* account/security;
* other authorized resources.

Validate:

* notification type;
* destination route;
* resource identifier.

Never open arbitrary URLs from untrusted notification data.

# PUSH NOTIFICATIONS

Complete the mobile push-notification experience.

Support:

* permission flow;
* device-token registration;
* token refresh;
* token invalidation;
* foreground notifications;
* background notifications;
* notification-tap routing;
* logout cleanup.

The backend owns recipient targeting and notification authorization.

# PUSH TOKEN SECURITY

Associate device tokens with the authenticated user through the backend.

Do not trust a client-provided user ID.

When the user signs out:

* follow backend token/session policy;
* deactivate or unregister the device token where required.

# PUSH PERMISSION STATES

Handle:

* granted;
* denied;
* restricted;
* unavailable;
* revoked;
* provider registration failure.

Do not block the entire application because push permission is denied.

# FOREGROUND NOTIFICATION BEHAVIOR

When a notification arrives while the application is foregrounded:

* present an appropriate in-app UI;
* avoid duplicate navigation;
* preserve the user's current work;
* synchronize notification state.

Do not automatically navigate away from critical interactions without user intent.

# BACKGROUND/TAP BEHAVIOR

When a user taps a push notification:

1. determine the notification type;
2. validate its destination;
3. establish authentication state;
4. navigate to the appropriate authorized screen;
5. refresh authoritative resource data.

Do not assume push payload state is current.

# NOTIFICATION PREFERENCES

Implement notification preferences where backend APIs support them.

Support:

* channel;
* notification category/type;
* enabled state;
* save/update;
* error handling.

Security-critical communication should respect backend-enforced restrictions.

# SECURITY SETTINGS

Implement supported account-security screens.

Potential functionality includes:

* change password;
* session list;
* session revocation;
* email verification;
* security notifications;
* authentication settings where supported.

Do not display credential secrets.

# ACTIVE SESSIONS

Where the backend exposes safe session metadata:

* display device/session label;
* last activity;
* creation date;
* current-session indicator;
* revoke action.

Do not expose refresh-token values.

# ACCOUNT DELETION/PRIVACY

Where supported by the backend:

* provide an explicit account-deletion workflow;
* explain consequences;
* require confirmation;
* submit to backend;
* handle asynchronous completion states.

Do not delete local/backend data directly from the device.

# ACCOUNT EXPORT

Where supported:

* request export;
* display processing state;
* handle completion;
* open secure download only through backend-authorized mechanisms.

Do not create local exports of private backend data outside the approved workflow.

# CONNECTIVITY AND RECONCILIATION

Post-purchase data can change asynchronously.

On network restoration/foreground resume:

* refresh stale orders;
* refresh notifications;
* refresh shipment status;
* refresh review status;
* reconcile authentication.

Avoid request storms.

# OFFLINE READ EXPERIENCE

Where cached data exists:

* clearly mark stale state when useful;
* allow safe browsing of cached information;
* never present stale payment/order state as current without indication where freshness matters.

Do not permit offline order cancellation, return submission, refund actions, or review submission unless the backend contract explicitly supports offline queued mutations.

# MUTATION SAFETY

For destructive or financial actions:

* prevent duplicate taps;
* use backend idempotency;
* reconcile uncertain outcomes;
* never blindly retry after timeout.

# ANALYTICS

Track mobile customer events such as:

* order viewed;
* shipment viewed;
* cancellation initiated;
* return initiated;
* refund viewed;
* review opened;
* review submitted;
* notification received;
* notification opened;
* notification preference changed;
* security setting changed.

Do not include:

* payment credentials;
* passwords;
* authentication tokens;
* full addresses;
* private notification contents.

# ANALYTICS PRIVACY

Analytics events must use approved fields only.

Do not automatically serialize screen state, form data, or network payloads into analytics.

# PERFORMANCE

Optimize post-purchase mobile screens for:

* large order histories;
* notification lists;
* review lists;
* efficient image loading;
* virtualized lists;
* minimal rerendering;
* bounded network requests.

# VIRTUALIZATION

Use virtualized lists for:

* orders;
* notifications;
* reviews;
* order items where needed.

Do not render thousands of historical records in the JS tree.

# ACCESSIBILITY

Support:

* screen readers;
* labels;
* meaningful headings;
* accessible status messages;
* touch target sizing;
* focus management;
* dynamic text size;
* sufficient contrast;
* reduced motion.

# ANIMATIONS

Use animation sparingly in post-purchase flows.

Do not animate critical status changes in ways that delay understanding.

Respect reduced-motion preferences.

# ERROR HANDLING

Map backend errors into mobile-safe states:

* unauthorized;
* forbidden;
* not found;
* conflict;
* stale state;
* rate limit;
* network failure;
* unavailable service;
* unknown.

Provide clear recovery actions.

Do not display raw backend stack traces.

# TESTING

Create meaningful automated tests.

## Account

Test:

* profile access;
* authentication state;
* security settings;
* session revocation.

## Orders

Test:

* list;
* pagination;
* filtering;
* detail;
* seller grouping;
* timeline;
* shipment display.

## Cancellation

Test:

* eligible cancellation;
* confirmation;
* success;
* no-longer-eligible response;
* duplicate submission.

## Returns

Test:

* eligible items;
* reason;
* quantity;
* submission;
* status;
* invalid state.

## Refunds

Test:

* pending;
* completed;
* failed;
* partial refund display.

## Reviews

Test:

* eligibility;
* create;
* edit;
* delete;
* rating control;
* media selection/upload boundary;
* reporting;
* seller response.

## Notifications

Test:

* list;
* unread count;
* mark read;
* mark all read;
* pagination;
* preferences;
* deep links.

## Push

Test:

* permission;
* token registration;
* token refresh;
* foreground handling;
* background/tap navigation;
* logout/token revocation.

## Security

Test:

* cross-customer IDOR;
* unauthorized cancellation;
* unauthorized return/refund actions;
* notification ownership;
* invalid deep links;
* credential leakage prevention.

## Connectivity

Test:

* offline view;
* reconnect;
* foreground refresh;
* uncertain mutation outcome.

# E2E TESTS

Where mobile E2E infrastructure exists, cover:

* login;
* account dashboard;
* order list;
* order detail;
* shipment tracking;
* cancellation;
* return request;
* review creation;
* notification opening;
* push-to-resource deep link.

Use real backend/test contracts or controlled test environments.

Do not fabricate final financial state.

# DOCUMENTATION

Update mobile documentation for:

* account architecture;
* order flows;
* shipment tracking;
* returns/refunds;
* review UI;
* push notifications;
* deep links;
* security settings;
* privacy;
* testing;
* accessibility.

Documentation must describe actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake order data;
* fake tracking;
* fake refunds;
* fake review persistence;
* fake notifications;
* fake push delivery;
* placeholder APIs;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use verified backend contracts.

Where backend capabilities are unavailable, report the exact dependency instead of simulating success.

# NO HARDCODED SECRETS

Never hardcode:

* push-provider credentials;
* API keys;
* backend secrets;
* signing keys;
* database credentials;
* payment-provider secrets.

Keep sensitive credentials in secure platform or server-side mechanisms appropriate to their purpose.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit tests;
* component tests;
* mobile E2E tests;
* accessibility checks;
* Expo build validation.

Where physical-device testing or external push infrastructure is unavailable:

* execute all available local validation;
* use official test/sandbox infrastructure where available;
* report exact limitations;
* do not claim unperformed validation.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* account/profile changes;
* order-history changes;
* order-detail changes;
* shipment/tracking changes;
* cancellation changes;
* return changes;
* refund changes;
* review changes;
* review-media changes;
* notification-center changes;
* push-notification changes;
* notification-preference changes;
* security-setting changes;
* deep-link changes;
* analytics changes;
* accessibility changes;
* tests created;
* tests executed;
* validation performed;
* backend dependencies;
* device/platform-specific considerations;
* external push/provider dependencies;
* compatibility considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* the customer account area is functional;
* order history is implemented with bounded pagination;
* order details are implemented;
* historical order information is rendered from authoritative backend data;
* shipment/tracking is implemented;
* cancellation is implemented where supported;
* return requests are implemented;
* refund status is implemented;
* reorder is implemented where supported;
* review eligibility is respected;
* review creation/edit/delete is implemented where supported;
* review media integration is secure where supported;
* review reporting is implemented;
* seller responses are displayed;
* notification center is implemented;
* unread/read state is synchronized;
* notification preferences are implemented;
* push notifications are implemented where supported;
* push deep-link routing is secure;
* security settings are implemented where supported;
* connectivity/foreground reconciliation is implemented;
* accessibility requirements are met;
* analytics is privacy-safe;
* critical automated tests pass;
* available build/type/test validation passes;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the mobile customer account, post-purchase, review, notification, push, and engagement experience defined by this prompt.

Do not implement seller mobile applications, administration, backend functionality, production infrastructure, or unrelated mobile domains.

The backend remains authoritative for order state, shipment state, return eligibility, refunds, review eligibility, notification state, authorization, and all financial information.

Never fabricate orders, refunds, delivery updates, review persistence, notification delivery, or security state.

Use secure platform storage for sensitive credentials.

Validate push/deep-link destinations before navigation.

Do not hardcode secrets.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
