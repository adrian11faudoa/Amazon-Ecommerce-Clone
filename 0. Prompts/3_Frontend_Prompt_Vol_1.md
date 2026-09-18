# Amazon-Style Ecommerce Marketplace — Frontend Prompt — Volume 1

# ROLE

You are the Staff Frontend Engineering team responsible for implementing the first bounded web-application milestone of a production-grade, globally scalable ecommerce marketplace.

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

The application must consume the backend's authoritative APIs rather than reproducing business logic independently.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* Next.js configuration;
* routing;
* layouts;
* global styles;
* Tailwind configuration;
* shadcn/ui components;
* authentication;
* API client;
* TanStack Query;
* Zustand stores;
* shared types;
* OpenAPI-generated or manually maintained API contracts;
* error handling;
* environment configuration;
* analytics;
* accessibility configuration;
* tests;
* existing pages and components.

The repository is authoritative for what actually exists.

Do not assume earlier backend prompts were executed.

Do not assume an API exists merely because an architectural document describes it.

Inspect actual available backend contracts and implementation before wiring the client.

If an expected API is absent:

* do not invent an incompatible endpoint;
* use the closest verified contract;
* create a clearly bounded integration abstraction where appropriate;
* report the discrepancy.

# CURRENT EXECUTION SCOPE

Implement the web application foundation and customer storefront foundation.

This milestone includes:

* Next.js application foundation;
* route architecture;
* shared layouts;
* design-system foundation;
* theme and global styling;
* API client foundation;
* typed API integration patterns;
* authentication/session integration;
* protected-route behavior;
* customer account foundation;
* navigation;
* responsive shell;
* reusable loading/error/empty states;
* product listing foundation;
* product detail foundation;
* category browsing foundation;
* search UI foundation;
* server/client state management;
* form validation foundation;
* accessibility foundation;
* analytics instrumentation foundation;
* frontend testing foundation.

The milestone must establish a reusable storefront foundation for later cart, checkout, order, seller, notification, and administrative client work.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete cart UX;
* complete checkout UX;
* payment UI;
* order-management UI;
* returns UI;
* seller dashboard;
* seller onboarding;
* seller administration;
* platform administration;
* moderation UI;
* advanced analytics dashboards;
* complete mobile application;
* production cloud infrastructure;
* backend API implementation.

This prompt may create the client contracts and shared components required for those future frontend areas, but must not implement their full functionality.

# FRONTEND ENGINEERING REQUIREMENTS

The web application must be:

* production-grade;
* responsive;
* accessible;
* strongly typed;
* maintainable;
* performant;
* secure;
* testable;
* observable;
* resilient to API failures.

Do not build static mock screens that pretend to be connected to the backend.

Use real API integration wherever the required backend contract exists.

# APPLICATION ARCHITECTURE

Establish a clean separation between:

* app routing;
* layouts;
* page-level composition;
* feature modules;
* reusable UI components;
* API client;
* server state;
* local client state;
* validation;
* authentication;
* analytics;
* utilities.

Do not place business-domain API calls directly throughout arbitrary components.

Use consistent feature boundaries.

# ROUTING

Establish a scalable App Router architecture.

The route structure must support future areas such as:

* storefront;
* authentication;
* account;
* cart;
* checkout;
* orders;
* seller portal;
* administration.

This milestone only implements the routes necessary for the current scope.

Use route-level loading and error behavior.

Do not create empty placeholder routes merely to claim future coverage.

# GLOBAL APPLICATION SHELL

Implement the shared storefront shell.

Include:

* header;
* primary navigation;
* search entry point;
* account entry point;
* cart entry point placeholder where necessary;
* main content region;
* responsive navigation behavior;
* footer;
* global feedback mechanisms.

The shell must remain compatible with later authenticated and transactional flows.

# RESPONSIVE DESIGN

The application must support:

* desktop;
* tablet;
* mobile web.

Use responsive layouts rather than separate duplicated page implementations.

Avoid fixed-width layouts that fail at common viewport sizes.

# DESIGN SYSTEM

Establish reusable UI primitives using the selected design system.

At minimum provide consistent implementations for:

* buttons;
* inputs;
* selects;
* checkboxes;
* radio controls;
* dialogs;
* dropdowns;
* menus;
* cards;
* badges;
* tabs;
* alerts;
* tooltips;
* skeletons;
* pagination;
* breadcrumbs;
* drawers/sheets;
* form field errors.

Use shadcn/ui where appropriate, while keeping the visual system coherent.

Do not create multiple competing button/input systems.

# VISUAL CONSISTENCY

Establish:

* typography hierarchy;
* spacing conventions;
* border/radius conventions;
* focus states;
* interaction states;
* responsive breakpoints;
* semantic colors;
* icon conventions.

Use design tokens or shared configuration rather than arbitrary values throughout components.

# ACCESSIBILITY

Implement accessibility from the beginning.

Address:

* semantic HTML;
* keyboard navigation;
* visible focus;
* accessible labels;
* form error association;
* dialog focus management;
* screen-reader announcements where appropriate;
* color contrast;
* reduced motion;
* alt text;
* accessible navigation.

Do not rely exclusively on visual indicators.

# REDUCED MOTION

Respect user preferences for reduced motion.

Framer Motion animations must:

* be purposeful;
* be lightweight;
* degrade appropriately;
* respect reduced-motion settings.

Do not animate essential information in a way that harms accessibility.

# API CLIENT

Implement a centralized typed API client.

It must handle:

* base URL;
* credentials/token transport;
* request headers;
* request IDs where applicable;
* error translation;
* serialization;
* cancellation/abort signals;
* timeout behavior where appropriate.

Do not duplicate fetch configuration across components.

# API ERROR MODEL

Map backend error responses into a stable frontend error representation.

The UI must distinguish, where applicable:

* validation;
* authentication;
* authorization;
* not found;
* conflict;
* rate limit;
* dependency failure;
* unexpected failure.

Do not expose raw backend stack traces.

# SERVER VS CLIENT STATE

Use TanStack Query for server-owned state.

Use Zustand only for genuine client-owned state such as:

* temporary UI state;
* local preferences;
* transient interactions;
* state that does not belong to the server.

Do not duplicate server data unnecessarily in Zustand.

# QUERY CONFIGURATION

Establish consistent defaults for:

* stale time;
* retry;
* refetch behavior;
* query cancellation;
* mutation invalidation;
* error handling.

Do not blindly retry authentication failures or non-idempotent mutations.

# AUTHENTICATION

Integrate the existing backend authentication model.

Support, as applicable:

* registration;
* login;
* logout;
* refresh;
* current-user state;
* email verification;
* password reset.

Do not implement a separate frontend authentication authority.

The backend remains authoritative for identity and authorization.

# TOKEN/SESSION SECURITY

Use the backend's defined token transport.

If secure cookies are used:

* avoid unnecessarily exposing credentials to JavaScript;
* handle authenticated requests correctly;
* implement CSRF protection according to the backend contract.

If an authorization-header model is used:

* never persist tokens in insecure browser storage unless the architecture explicitly requires it;
* avoid exposing tokens to unrelated code;
* never place access tokens in URLs;
* never log tokens.

Do not invent authentication behavior inconsistent with the backend.

# AUTHENTICATION UX

Implement production-grade flows for the current scope:

* registration;
* login;
* logout;
* session restoration;
* verification;
* reset password.

Provide:

* validation;
* loading;
* success;
* error;
* expired-token;
* rate-limit;
* retry states.

Do not disclose whether an account exists where the backend intentionally uses account-enumeration-safe behavior.

# PROTECTED ROUTES

Create reusable route protection behavior.

Protected views must:

* verify authentication state;
* show appropriate loading behavior;
* redirect unauthenticated users where appropriate;
* preserve intended destination when safe.

Do not use client-side route protection as the backend authorization boundary.

# AUTHORIZATION-AWARE UI

Hide or disable actions the current user cannot use where appropriate for UX.

However:

* never treat hidden UI as security;
* handle authorization failures returned by the backend;
* render graceful forbidden states.

# CUSTOMER ACCOUNT FOUNDATION

Implement the customer account foundation.

Support, as appropriate:

* account overview;
* profile information;
* account status;
* security settings entry;
* address management foundation if the existing API supports it.

Do not implement the complete order/account history area in this milestone.

# NAVIGATION

Implement reusable navigation that supports:

* storefront;
* categories;
* search;
* account;
* future cart;
* future order access.

Navigation must remain responsive and keyboard-accessible.

# SEARCH ENTRY UI

Implement the storefront search entry.

Support:

* query input;
* validation;
* submission;
* responsive layout;
* accessible labeling;
* navigation to the search route;
* loading/disabled behavior.

Do not implement an entirely separate search engine on the frontend.

# SEARCH PAGE FOUNDATION

Implement the search-results page consuming the backend search API.

Support:

* query;
* product results;
* pagination;
* filters;
* sorting;
* empty results;
* error state;
* loading state.

Use TanStack Query for server data.

# SEARCH FILTERS

Support backend-defined filters such as:

* category;
* price;
* rating;
* seller;
* attributes.

Do not send arbitrary client-generated filter structures to the backend.

Use typed query parameters.

# SEARCH SORTING

Provide controlled sorting options based on backend-supported modes.

Examples may include:

* relevance;
* newest;
* price low to high;
* price high to low;
* rating.

Do not allow unsupported sort values into API requests.

# SEARCH PAGINATION

Implement pagination consistent with the backend contract.

If cursor pagination is used:

* preserve cursor state;
* handle forward navigation correctly;
* avoid constructing cursors on the client;
* invalidate pagination when query/filter state changes.

Do not use client-generated page offsets when the backend contract uses cursors.

# PRODUCT CARD

Create a reusable product-card component.

It should support, as available:

* image;
* title;
* rating;
* review count;
* price;
* discount;
* seller;
* availability summary;
* badges;
* navigation.

The card must gracefully handle missing optional information.

Do not expose internal seller/private fields.

# PRODUCT DETAIL PAGE

Implement the product-detail foundation.

Support:

* title;
* description;
* images;
* product variants;
* attributes;
* seller/offer information where public;
* price;
* rating;
* review summary;
* availability summary;
* breadcrumbs;
* responsive layout.

Do not implement full cart/checkout interaction in this milestone.

Buttons that belong to future functionality must not pretend that the operation succeeded.

# PRODUCT MEDIA

Use optimized image rendering according to Next.js capabilities.

Address:

* responsive images;
* appropriate sizing;
* lazy loading;
* alt text;
* image failure behavior;
* placeholders;
* aspect-ratio stability.

Do not load full-resolution media unnecessarily.

# CATEGORY PAGE

Implement category browsing.

Support:

* category title;
* description where available;
* breadcrumb hierarchy;
* product listing;
* filters;
* sorting;
* pagination;
* empty state;
* loading state;
* error state.

Do not hardcode categories that should come from the backend.

# CATEGORY NAVIGATION

Provide accessible category navigation.

Use backend hierarchy data.

Avoid requiring the client to recursively fetch the entire category tree when a bounded API exists.

# PRODUCT VARIANT UI

Where product variants are available:

* render selectable variant attributes;
* reflect unavailable variants;
* maintain valid combinations;
* preserve URL state where appropriate;
* prevent invalid selections.

Do not independently calculate authoritative inventory.

Variant availability shown in the client is informational unless confirmed by the backend.

# PRICING DISPLAY

Format prices consistently.

Respect:

* currency;
* locale;
* decimal precision;
* discount presentation.

Do not perform authoritative pricing calculations in JavaScript.

Do not invent discounts.

# DATE/TIME DISPLAY

Use date-fns or the project-selected date utilities.

Distinguish:

* server timestamps;
* localized display;
* relative time;
* absolute business dates.

Do not reinterpret business timestamps using the browser timezone when the product requires a specific timezone.

# FORMS

Use React Hook Form and Zod where applicable.

Forms must support:

* typed validation;
* server error mapping;
* field errors;
* submission states;
* reset behavior;
* accessibility;
* keyboard use.

Do not duplicate validation rules arbitrarily when the backend exposes authoritative constraints.

Client validation is for UX; backend validation remains authoritative.

# LOADING STATES

Every data-driven screen must provide appropriate loading states.

Use:

* route-level loading;
* skeletons;
* disabled action states;
* progress feedback where appropriate.

Avoid full-page spinners for every small request.

# EMPTY STATES

Implement useful empty states for:

* search;
* category;
* account sections;
* review sections where applicable.

Do not show blank pages.

# ERROR STATES

Provide clear recoverable error states.

Where appropriate:

* retry;
* navigate back;
* return to safe location;
* preserve user input.

Do not show raw stack traces or provider errors.

# NOT FOUND

Implement a production-grade not-found experience for:

* missing products;
* missing categories;
* unknown routes.

Do not treat every backend error as a not-found condition.

# CLIENT-SIDE CACHING

Use TanStack Query caching appropriately.

Do not create large unbounded browser caches.

Invalidate data after relevant mutations.

Do not cache sensitive account data in shared client state unnecessarily.

# OPTIMISTIC UPDATES

Use optimistic updates only for operations where the UX benefit outweighs consistency risk.

Do not optimistically claim:

* successful payment;
* successful order creation;
* inventory availability;
* irreversible account changes.

For transactional workflows, prefer authoritative server responses.

# API RETRIES

Only retry safe/idempotent requests automatically.

Do not automatically retry:

* payment creation;
* order creation;
* destructive mutations;

unless the API contract includes an explicit idempotency strategy.

# RATE-LIMIT UI

Handle backend rate-limit responses gracefully.

Provide:

* useful user feedback;
* retry timing where available;
* disabled states;
* no aggressive client retry loops.

# SECURITY

Frontend security requirements include:

* avoid XSS through untrusted HTML;
* sanitize rendered rich content where required;
* avoid unsafe `dangerouslySetInnerHTML`;
* validate client-side but trust only server validation;
* protect tokens;
* secure third-party integrations;
* avoid leaking secrets into client bundles.

Never place server-side secrets in `NEXT_PUBLIC_*` variables.

# ENVIRONMENT CONFIGURATION

Separate:

* public client configuration;
* server-only configuration.

Never expose:

* database credentials;
* Redis credentials;
* payment secret keys;
* signing secrets;
* private API credentials;

to the browser.

# ANALYTICS FOUNDATION

Implement a frontend analytics abstraction.

The abstraction should support events such as:

* page viewed;
* product viewed;
* search performed;
* search result selected;
* category viewed;
* product interaction.

Analytics calls must not block navigation or critical user actions.

# ANALYTICS PRIVACY

Do not automatically capture:

* passwords;
* authentication tokens;
* payment credentials;
* arbitrary form contents;
* sensitive personal information.

Only send events explicitly defined by the project.

# ACCESSIBILITY TESTING

Add automated accessibility checks where appropriate.

Validate:

* labels;
* landmarks;
* keyboard interaction;
* heading hierarchy;
* focus behavior;
* dialog semantics;
* image alternatives.

Automated checks do not replace manual accessibility validation.

# FRONTEND TESTING

Establish testing infrastructure for this milestone.

Use the repository's selected testing tools or introduce an appropriate production-grade stack if absent.

Test:

## Components

* render;
* interactions;
* validation;
* accessibility semantics;
* error states.

## Authentication

* login flow;
* registration;
* protected route;
* logout;
* session restoration;
* unauthorized response.

## Search

* query submission;
* filters;
* sorting;
* pagination;
* empty state;
* error state.

## Product

* detail rendering;
* variant selection;
* media behavior;
* unavailable state.

## Category

* hierarchy;
* listing;
* filtering;
* pagination.

Tests must validate meaningful user behavior rather than implementation details alone.

# END-TO-END FOUNDATION

Where the repository can support browser E2E testing, establish foundational scenarios for:

* public storefront load;
* search;
* product detail;
* login;
* protected-route access.

Do not implement full checkout/order E2E flows in this milestone.

# PERFORMANCE

Optimize the storefront foundation for:

* fast initial rendering;
* stable layout;
* efficient data fetching;
* reduced JavaScript;
* responsive images;
* code splitting;
* route-level caching where appropriate.

Use server rendering where it provides real benefit.

Do not push all rendering into the client unnecessarily.

# NEXT.JS SERVER/CLIENT BOUNDARIES

Use Server Components by default where appropriate.

Use Client Components only where interactivity requires them.

Avoid making the entire application a Client Component tree.

Keep browser-only dependencies out of server modules.

# SEO

Implement foundational SEO for public catalog pages.

Support:

* metadata;
* canonical URLs;
* meaningful titles/descriptions;
* Open Graph metadata where appropriate;
* structured data where justified.

Do not expose private seller/customer information in metadata.

# URL DESIGN

Use stable, readable URLs for:

* categories;
* products;
* search.

Internal database IDs need not be the only visible URL identifier.

If slugs are used:

* treat backend slugs as canonical;
* handle missing/changed slugs gracefully;
* avoid duplicating slug-generation logic with different semantics.

# ROUTE ERROR BOUNDARIES

Provide route-specific error handling.

An error in one storefront area should not unnecessarily destroy unrelated application state.

Use Next.js error boundaries appropriately.

# STATE OWNERSHIP

Clearly define:

* server-owned state → TanStack Query/backend;
* temporary UI state → React/local state;
* persistent client preference → Zustand or appropriate storage;
* authentication state → backend session plus appropriate client representation.

Do not maintain multiple conflicting copies of server truth.

# COMPONENT ARCHITECTURE

Organize reusable components by meaningful responsibility.

Avoid:

* a giant universal component;
* copy-pasted page structures;
* business logic hidden inside visual components;
* page-specific API clients.

Feature-specific components may compose shared primitives.

# FRONTEND OBSERVABILITY

Add frontend observability hooks where the project supports them.

Capture:

* runtime errors;
* route failures;
* API error classes;
* critical performance measurements;
* correlation identifiers where supported.

Do not capture sensitive form data.

# ERROR REPORTING PRIVACY

Do not send:

* passwords;
* access tokens;
* refresh tokens;
* card information;
* secret configuration;

to error-tracking systems.

# INTERNATIONALIZATION FOUNDATION

If the project targets multiple markets, establish a structure that can support localization without making every component hard-coded.

At minimum centralize:

* currency display;
* date formatting;
* number formatting;
* user-facing message organization.

Do not implement a complete translation platform if it is not part of this milestone.

# DOCUMENTATION

Update frontend documentation covering:

* application structure;
* routes;
* API client;
* authentication;
* state management;
* environment variables;
* design system;
* testing;
* accessibility;
* local development.

Documentation must reflect actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* static fake API responses;
* fake authentication;
* fake search data;
* fake product data;
* hardcoded catalog results;
* placeholder implementations;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use real backend contracts where available.

Where a backend dependency genuinely does not exist yet, create only an explicit, bounded integration boundary and report the dependency. Do not fabricate production behavior.

# NO HARDCODED SECRETS

Never hardcode:

* API secrets;
* payment keys;
* backend private credentials;
* analytics secrets;
* signing keys.

Use environment configuration and keep server-only values outside client bundles.

# VALIDATION

Before completion, run applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit/component tests;
* accessibility tests;
* E2E tests where configured;
* production build;
* route validation;
* API integration validation.

Where a backend endpoint required by this prompt does not exist:

* validate the integration layer without inventing a false successful backend response;
* report the exact missing dependency.

Do not claim live API integration succeeded if it could not be executed.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* route changes;
* application-shell changes;
* design-system changes;
* API-client changes;
* authentication changes;
* account changes;
* search UI changes;
* category UI changes;
* product-detail changes;
* state-management changes;
* analytics changes;
* accessibility changes;
* SEO changes;
* tests created;
* tests executed;
* validation performed;
* backend integration dependencies;
* compatibility considerations;
* unresolved issues.

Do not claim that cart, checkout, order, seller, mobile, or administration interfaces were implemented unless they genuinely belong to this prompt and were completed.

# DEFINITION OF DONE

This milestone is complete only when:

* the Next.js application foundation is established;
* route architecture is coherent;
* global storefront shell is implemented;
* design-system primitives are reusable;
* API client is centralized and typed;
* authentication integration is functional;
* protected routes are implemented;
* customer account foundation exists;
* search UI is integrated with the backend contract;
* category browsing is implemented;
* product detail foundation is implemented;
* variant selection works where applicable;
* loading/empty/error states are implemented;
* responsive behavior is implemented;
* accessibility foundations are implemented;
* analytics abstraction is implemented;
* SEO foundations are implemented;
* testing infrastructure is operational;
* production build succeeds where dependencies are available;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the storefront and web-application foundation defined by this prompt.

Do not implement cart, checkout, orders, seller portals, administration, mobile, backend, or production infrastructure outside the bounded support required for this frontend milestone.

Use verified backend contracts.

Do not invent APIs or fake successful backend operations.

Keep authoritative business logic on the server.

Protect secrets from client bundles.

Maintain accessibility, responsiveness, security, performance, and testability.

Do not leave intentional placeholders, TODO implementation gaps, fake authentication, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
