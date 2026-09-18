# Amazon-Style Ecommerce Marketplace — Mobile Prompt — Volume 1

# ROLE

You are the Staff Mobile Engineering team responsible for implementing the first bounded React Native / Expo mobile-application milestone of a production-grade, globally scalable ecommerce marketplace.

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

* React Native
* Expo
* TypeScript
* project-selected navigation library compatible with Expo
* TanStack Query or the project's selected server-state solution
* secure platform storage for sensitive session information
* the project's shared backend REST/OpenAPI contracts

The mobile application must consume backend APIs and must never become an independent source of truth for commerce state.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* mobile application structure;
* Expo configuration;
* navigation;
* authentication;
* API client;
* shared types;
* TanStack Query or equivalent;
* secure storage;
* push-notification setup;
* deep linking;
* shared design tokens where available;
* existing screens;
* backend API contracts;
* tests;
* environment configuration.

The repository is authoritative for what actually exists.

Do not assume earlier backend, web, or mobile prompts were executed.

Do not invent backend APIs that are not available or contractually defined.

Where compatible implementation already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate systems;
* maintain established contracts.

If a required backend capability is unavailable, create only the bounded integration surface appropriate to this milestone and report the dependency accurately.

# CURRENT EXECUTION SCOPE

Implement the mobile application foundation and customer storefront foundation.

This milestone includes:

* Expo application foundation;
* navigation architecture;
* application shell;
* design-system foundation;
* API client;
* secure authentication/session integration;
* protected navigation;
* customer account foundation;
* product browsing;
* category browsing;
* search;
* product detail;
* variant selection;
* image/media presentation;
* server-state management;
* local UI state;
* loading/error/empty states;
* connectivity handling;
* deep-link foundation;
* accessibility;
* mobile performance foundation;
* analytics abstraction;
* crash/error reporting foundation where configured;
* testing infrastructure.

This milestone creates the reusable mobile foundation for later cart, checkout, orders, notifications, reviews, and other customer workflows.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete cart;
* checkout;
* payment UI;
* order history;
* returns/refunds;
* seller portal;
* administration;
* moderation;
* complete push-notification workflows;
* full offline commerce synchronization;
* production cloud infrastructure;
* backend implementation.

This prompt may establish reusable infrastructure needed by those later mobile areas, but must not implement their complete product functionality.

# MOBILE ARCHITECTURE

Establish a maintainable application structure separating:

* navigation;
* screens;
* feature modules;
* shared components;
* API client;
* server state;
* local state;
* authentication;
* secure storage;
* analytics;
* error handling;
* platform services.

Do not put all application logic inside screen components.

# NAVIGATION

Implement navigation architecture appropriate for:

* public storefront;
* authenticated account;
* future cart;
* future checkout;
* future orders;
* future notifications.

Only implement current-scope routes.

Use typed navigation parameters where supported.

Do not pass large server objects through navigation state when an ID plus server query is safer.

# DEEP LINKS

Establish a secure deep-link architecture for public resources such as:

* product;
* category;
* search;
* account routes where supported.

Deep links must validate resource access through backend requests.

Do not trust deep-link data as authorization.

Do not implement arbitrary URL execution from push/deep-link payloads.

# APPLICATION SHELL

Implement:

* safe-area handling;
* app-level navigation;
* loading/bootstrap behavior;
* global error boundary;
* consistent header/navigation patterns;
* keyboard behavior;
* theme foundation.

The shell must work across supported iOS and Android environments.

# DESIGN SYSTEM

Create reusable mobile UI primitives for:

* buttons;
* inputs;
* cards;
* list rows;
* badges;
* dialogs;
* sheets;
* menus;
* tabs;
* skeletons;
* alerts;
* empty states;
* loading indicators;
* form errors.

Use native/platform-appropriate behavior where necessary.

Do not create multiple competing component systems.

# PLATFORM BEHAVIOR

Respect iOS and Android conventions where appropriate.

Handle:

* safe areas;
* keyboard avoidance;
* status/navigation bars;
* touch feedback;
* back behavior;
* modal behavior;
* platform-specific permissions.

Do not implement platform behavior by assuming iOS and Android are identical.

# API CLIENT

Implement a centralized typed API client.

It must support:

* base URL;
* authentication;
* serialization;
* error mapping;
* request cancellation;
* request IDs/correlation where supported;
* network-error classification;
* consistent timeout behavior.

Do not duplicate API configuration across screens.

# AUTHENTICATION

Integrate the verified backend authentication contract.

Support:

* registration;
* login;
* logout;
* session restoration;
* refresh;
* current-user retrieval;
* email verification;
* password reset where included in the mobile API contract.

Do not create a separate mobile identity model.

# SECURE TOKEN STORAGE

Sensitive credentials must use secure platform storage.

Do not store:

* access tokens;
* refresh tokens;
* passwords;

in ordinary AsyncStorage or equivalent insecure persistence.

Use Expo-compatible secure storage or the project's approved secure mechanism.

# TOKEN REFRESH

Implement a coordinated token-refresh flow.

Handle:

* expired access token;
* concurrent requests during refresh;
* refresh failure;
* session revocation;
* logout after unrecoverable authentication failure.

Prevent multiple concurrent refresh operations from creating inconsistent session state.

# AUTHENTICATION STATE

The authentication bootstrap must distinguish:

* initializing;
* authenticated;
* unauthenticated;
* authentication failure.

Do not render protected routes before authentication state is deterministically resolved.

# PROTECTED NAVIGATION

Protected screens must require authenticated state.

When a session expires:

* preserve safe navigation context where possible;
* refresh if permitted;
* otherwise redirect to authentication;
* avoid losing unrelated user state.

Backend authorization remains authoritative.

# ACCOUNT FOUNDATION

Implement customer account foundation.

Support:

* profile summary;
* account information;
* security settings entry;
* navigation to future orders/notifications where appropriate.

Do not implement complete account-management functionality outside current scope.

# PRODUCT BROWSING

Implement mobile product browsing.

Support:

* product lists;
* pagination/infinite loading according to backend contract;
* product cards;
* image loading;
* price;
* rating;
* seller where public;
* availability summary.

Do not load unbounded product collections.

# CATEGORY BROWSING

Implement category discovery.

Support:

* category navigation;
* hierarchy;
* product listing;
* filtering where supported;
* loading;
* empty;
* error.

Do not hardcode the category taxonomy.

# SEARCH

Implement mobile search experience.

Support:

* search entry;
* query;
* search results;
* filters;
* sorting;
* pagination/infinite loading;
* empty state;
* error state;
* autocomplete where supported by backend.

# SEARCH INPUT

Search input must:

* be accessible;
* limit excessive query length;
* handle keyboard submit;
* debounce autocomplete safely;
* cancel stale requests;
* avoid unnecessary network calls.

Do not debounce the final search submission in a way that harms user control.

# SEARCH FILTERS

Support backend-defined filters such as:

* category;
* price;
* rating;
* seller;
* attributes.

Use typed query parameters.

Do not submit arbitrary filter structures.

# SEARCH PAGINATION

Implement the backend pagination contract.

For cursor pagination:

* retain cursors safely;
* prevent duplicate page loads;
* handle end-of-list;
* reset pagination when search criteria change;
* recover from stale cursors.

# PRODUCT DETAIL

Implement product-detail mobile UI.

Support:

* title;
* images;
* description;
* attributes;
* variants;
* seller/offer information;
* price;
* rating;
* review summary;
* availability summary;
* category context.

Do not implement authoritative pricing or inventory calculations locally.

# PRODUCT MEDIA

Use optimized image handling.

Support:

* responsive sizing;
* progressive loading where appropriate;
* placeholders;
* image failure;
* accessible descriptions;
* thumbnail/preview behavior.

Avoid loading all original-resolution assets at once.

# VARIANT SELECTION

Implement variant selection based on backend-provided options.

Support:

* valid combinations;
* unavailable variants;
* selection state;
* clear selected state;
* price/metadata refresh when variant changes where required.

Do not independently determine actual stock availability.

# PRICE DISPLAY

Use a centralized currency formatter.

Respect:

* currency;
* locale;
* precision.

Do not use floating-point arithmetic for authoritative totals.

# SERVER STATE

Use TanStack Query or the project's verified server-state layer for:

* products;
* categories;
* search;
* seller/public offer information;
* customer account.

Do not duplicate server entities into a global Zustand store.

# LOCAL STATE

Local state may manage:

* selected variant;
* search input;
* modal visibility;
* filter-sheet state;
* transient UI state.

Do not use local state as the persistent source of truth for products or account data.

# CACHING

Use bounded cache settings.

Consider:

* stale time;
* cache lifetime;
* refetch on focus/foreground;
* memory pressure;
* invalidation.

Do not create unbounded persistent caches.

# NETWORK RESILIENCE

Mobile networks are unreliable.

Handle:

* offline state;
* connection loss;
* slow responses;
* timeout;
* request cancellation;
* retryable failure.

Do not automatically retry unsafe mutations.

For read operations, use bounded and user-visible retry behavior.

# OFFLINE FOUNDATION

Establish the foundation required for future offline behavior without implementing the complete offline-commerce system.

Support:

* connectivity detection;
* safe read-cache usage;
* offline banners;
* retry controls.

Do not allow stale cached data to masquerade as authoritative inventory, pricing, or checkout state.

# FOREGROUND/BACKGROUND

Handle application lifecycle transitions.

When returning to foreground:

* refresh stale critical data;
* reconcile authentication;
* avoid request storms.

Do not start uncontrolled background polling.

# ERROR BOUNDARY

Implement a global error boundary.

It should:

* prevent full application crashes where possible;
* show safe recovery UI;
* record sanitized diagnostics;
* allow retry/restart navigation.

Never include secrets in crash reports.

# LOADING STATES

Use:

* skeletons;
* progressive content;
* inline loading;
* list footers.

Avoid a single blocking spinner for the entire application except during unavoidable bootstrap work.

# EMPTY STATES

Provide meaningful empty states for:

* search;
* category;
* product lists;
* account sections.

Do not show blank screens.

# ERROR STATES

Provide clear recovery actions:

* retry;
* go back;
* refresh;
* sign in;
* return to home.

Do not expose raw API errors.

# ACCESSIBILITY

Support:

* screen readers;
* accessible labels;
* semantic grouping;
* sufficient touch targets;
* focus behavior;
* dynamic text scaling where appropriate;
* contrast;
* reduced motion;
* accessible state announcements.

Do not rely exclusively on visual icons.

# TOUCH TARGETS

Interactive controls must be appropriately sized for touch use.

Avoid tiny icon-only controls without sufficient accessible labels and touch area.

# KEYBOARD HANDLING

Forms and search must handle:

* keyboard dismissal;
* submit;
* focus;
* scrolling into view;
* keyboard avoidance.

Do not allow the keyboard to obscure critical form controls.

# ANALYTICS

Implement a mobile analytics abstraction.

Support safe events such as:

* screen viewed;
* product viewed;
* search performed;
* search result selected;
* category viewed;
* account action.

Analytics must be asynchronous and must not block critical interactions.

# ANALYTICS PRIVACY

Never send:

* passwords;
* access tokens;
* refresh tokens;
* payment credentials;
* full addresses;
* private notification contents;
* arbitrary form contents.

Use approved event fields only.

# PUSH FOUNDATION

Where the mobile architecture includes push notifications, establish the registration foundation only as needed for this milestone.

Support:

* permission state;
* device/app registration;
* backend token registration;
* token refresh/revocation.

Do not implement the complete notification center in this milestone.

# PUSH SECURITY

Device tokens must be associated with the authenticated user through the backend.

Never treat a client-provided user ID as proof of ownership.

# PUSH PERMISSIONS

Gracefully handle:

* permission granted;
* denied;
* provisional/limited states where applicable;
* revoked permission;
* unsupported device state.

Do not repeatedly prompt users without a meaningful reason.

# LOCALIZATION FOUNDATION

Centralize:

* date formatting;
* number formatting;
* currency;
* user-facing strings.

Do not hardcode locale assumptions into individual screens.

# APP CONFIGURATION

Separate:

* public runtime/configuration;
* server-only configuration, which must never enter the mobile bundle;
* environment-specific endpoints.

Do not embed secrets into Expo public configuration.

# SECURITY

Protect against:

* insecure token storage;
* deep-link abuse;
* local data leakage;
* unsafe WebView use;
* arbitrary URL handling;
* accidental logging of credentials;
* unauthorized resource access.

If WebViews are used later, they must have explicit origin and navigation controls.

# DEVICE SECURITY

Do not assume a device is trusted.

Sensitive actions must rely on backend authentication/authorization.

Where local biometric protection is required by the product, integrate it through secure platform primitives rather than custom cryptography.

# DEEP-LINK SECURITY

Only support known routes and validated parameter structures.

A deep link must never bypass:

* authentication;
* authorization;
* resource access checks.

Do not process arbitrary schemes.

# PERFORMANCE

Optimize for:

* startup time;
* bundle size;
* image loading;
* list virtualization;
* rendering efficiency;
* network efficiency;
* memory.

Use virtualized lists for large product/search collections.

Do not render large product grids using unbounded ordinary mapping.

# IMAGE PERFORMANCE

Use:

* appropriate image dimensions;
* caching;
* placeholders;
* lazy/on-demand loading;
* thumbnails.

Avoid downloading high-resolution assets for small cards.

# LIST PERFORMANCE

Product/search/category lists must use:

* FlatList;
* FlashList;
* or another appropriate virtualized list.

Do not load thousands of rows into the JS tree.

# ANIMATION

Use animation selectively.

Animations must:

* respect reduced motion;
* avoid blocking interaction;
* minimize unnecessary re-rendering.

Do not add animation to every screen.

# MOBILE ERROR REPORTING

Where an error-monitoring service is configured:

* sanitize breadcrumbs;
* omit credentials;
* omit private user data;
* capture crash context appropriate to debugging.

Do not send full API request bodies to telemetry.

# API ERROR MAPPING

Map backend errors to safe mobile UI states.

Handle:

* validation;
* unauthorized;
* forbidden;
* not found;
* conflict;
* rate limit;
* unavailable;
* network;
* unknown.

Do not expose raw server error bodies.

# AUTHENTICATION TESTS

Test:

* registration;
* login;
* session restoration;
* token refresh;
* logout;
* invalid session;
* protected-route behavior;
* concurrent refresh handling.

# SEARCH TESTS

Test:

* query;
* debounce;
* submit;
* filtering;
* pagination;
* empty;
* error;
* offline;
* stale cursor.

# PRODUCT TESTS

Test:

* list;
* detail;
* image loading;
* variant selection;
* unavailable variant;
* API failure.

# ACCESSIBILITY TESTS

Test:

* screen-reader labels;
* touch target semantics;
* form labels;
* focus;
* dynamic state announcements;
* scalable text where supported.

# DEEP-LINK TESTS

Test:

* product deep link;
* category deep link;
* authenticated-route deep link;
* invalid route;
* unauthorized resource;
* malformed parameters.

# NETWORK TESTS

Test:

* offline;
* timeout;
* retry;
* cancellation;
* app foreground refresh.

# DEVICE/PUSH TESTS

Where push foundation is implemented, test:

* permission handling;
* token registration;
* token refresh;
* logout/revocation;
* backend registration failure.

# E2E TESTS

Where mobile E2E infrastructure exists, establish scenarios for:

* launch;
* login;
* browse category;
* search;
* product detail;
* deep link;
* logout.

Do not implement complete checkout/payment E2E in this milestone.

# DOCUMENTATION

Update mobile documentation covering:

* Expo setup;
* environment configuration;
* navigation;
* authentication;
* secure storage;
* API client;
* deep links;
* testing;
* accessibility;
* analytics;
* push foundation;
* local development.

Documentation must reflect actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake API responses;
* fake authentication;
* fake catalog persistence;
* hardcoded production data;
* placeholder business logic;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use verified backend contracts.

Where backend functionality is not available, report the integration dependency instead of creating false success states.

# NO HARDCODED SECRETS

Never hardcode:

* API keys;
* payment secrets;
* backend credentials;
* signing keys;
* push-provider secrets;
* private keys.

Never include server-only secrets in the mobile bundle.

# VALIDATION

Before completion, run applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit tests;
* component tests;
* accessibility checks;
* mobile E2E tests where configured;
* Expo/React Native build validation appropriate to the repository.

Where device-specific tooling is unavailable:

* execute all available validation;
* report limitations accurately;
* do not claim physical-device validation that was not performed.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* Expo configuration;
* navigation changes;
* application shell;
* design-system changes;
* API client;
* authentication;
* secure storage;
* account foundation;
* search;
* categories;
* product detail;
* variant handling;
* media handling;
* offline/connectivity foundation;
* deep-link configuration;
* analytics;
* push foundation;
* accessibility;
* tests created;
* tests executed;
* validation performed;
* backend dependencies;
* platform-specific considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* the Expo application foundation is operational;
* navigation is established;
* public and protected navigation boundaries are implemented;
* authentication/session handling is secure;
* secure token storage is implemented;
* API client is centralized;
* storefront browsing is implemented;
* category browsing is implemented;
* search is implemented;
* product detail is implemented;
* variant selection is implemented where applicable;
* media loading is optimized;
* loading/error/empty states are implemented;
* connectivity handling is implemented;
* deep links are implemented safely;
* accessibility foundations are implemented;
* analytics abstraction is implemented;
* push-registration foundation is implemented where applicable;
* tests cover critical flows;
* available build/type/test validation passes;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the mobile application and customer-storefront foundation defined by this prompt.

Do not implement mobile checkout, payments, orders, returns, refunds, seller applications, administration, or production infrastructure.

The backend remains authoritative for authentication, authorization, catalog, pricing, inventory, and all commerce state.

Never fabricate backend behavior or persistent commerce data.

Store sensitive credentials only through approved secure platform storage.

Do not hardcode secrets or expose server-only configuration in the mobile bundle.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
