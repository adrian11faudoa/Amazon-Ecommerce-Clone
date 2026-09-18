# Amazon-Style Ecommerce Marketplace — Frontend Prompt — Volume 4

# ROLE

You are the Staff Frontend Engineering team responsible for implementing the seller marketplace portal and seller operations web experience of a production-grade, globally scalable ecommerce marketplace.

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

* seller identity;
* organization membership;
* catalog;
* inventory;
* pricing;
* promotions;
* orders;
* fulfillment;
* shipments;
* returns;
* refunds;
* seller permissions;
* analytics;
* financial data.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* web application shell;
* authentication;
* account system;
* seller organization APIs;
* authorization;
* seller catalog;
* products;
* variants;
* SKUs;
* offers;
* pricing;
* promotions;
* inventory;
* orders;
* fulfillment;
* shipments;
* reviews;
* notifications;
* analytics;
* shared design system;
* API client;
* TanStack Query;
* Zustand;
* routing;
* tests;
* environment configuration.

The repository is authoritative for actual implementation state.

Do not assume an earlier backend or frontend prompt was executed.

Do not invent endpoints that do not exist or are not supported by verified contracts.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate implementations;
* maintain established contracts.

# CURRENT EXECUTION SCOPE

Implement the seller-facing marketplace portal.

This milestone includes:

* seller portal route architecture;
* seller dashboard;
* seller organization context;
* seller profile/settings foundation;
* seller staff/member management UI;
* seller onboarding/verification status presentation;
* product catalog management;
* product creation;
* product editing;
* product variants;
* SKU management;
* categories;
* attributes;
* seller offers;
* pricing;
* promotions;
* product media management;
* inventory management;
* inventory adjustment UI;
* reservation/inventory visibility where exposed by backend;
* seller order management;
* seller fulfillment workflow;
* shipment creation/status where supported;
* seller return/refund visibility;
* seller review/response management;
* seller notifications;
* seller analytics;
* seller operational reporting;
* responsive behavior;
* accessibility;
* analytics instrumentation;
* tests.

The frontend must consume backend contracts and must not reproduce authoritative seller/business logic locally.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* platform administrator UI;
* moderation-operator UI;
* fraud-operator UI;
* finance-operator UI beyond seller-facing financial information explicitly provided by the backend;
* customer storefront redesign;
* customer checkout redesign;
* mobile React Native application;
* backend implementation;
* production cloud infrastructure;
* a seller-side accounting system;
* a separate seller search engine.

# SELLER APPLICATION ARCHITECTURE

Establish a dedicated seller-portal architecture within the existing Next.js application unless the repository explicitly uses a separate web application.

The seller portal must have clear boundaries for:

* dashboard;
* catalog;
* inventory;
* orders;
* fulfillment;
* returns;
* reviews;
* analytics;
* notifications;
* organization settings.

Do not create duplicated global authentication or API clients.

# SELLER CONTEXT

The application must establish the active seller organization context from backend-authorized data.

Where a user belongs to multiple organizations:

* allow explicit organization selection;
* persist only safe client preference;
* always validate organization access server-side;
* include the correct organization context in backend requests according to the API contract.

Never trust an organization ID from the browser as proof of access.

# SELLER AUTHORIZATION

The UI must respect seller roles and permissions.

Examples may include:

* seller member;
* seller administrator.

Only display sensitive management capabilities when the backend says the user is authorized.

The backend remains the security boundary.

When a backend returns forbidden:

* show an appropriate state;
* do not silently retry;
* do not attempt client-side privilege escalation.

# SELLER DASHBOARD

Implement the seller dashboard foundation.

Display backend-derived information such as:

* sales summary;
* order summary;
* pending fulfillment;
* low-stock indicators;
* active listings;
* review summary;
* notification summary;
* selected performance metrics.

Use bounded API queries.

Do not calculate authoritative financial metrics from raw frontend state.

# DASHBOARD CARDS

Create reusable metric cards for:

* value;
* label;
* comparison where available;
* time period;
* loading;
* error;
* empty state.

Avoid exposing misleading metrics when the backend has not provided enough data.

# DASHBOARD CHARTS

Use Recharts where charting is justified.

Support:

* sales over time;
* orders over time;
* units sold;
* ratings;
* inventory trends.

Charts must:

* remain readable on small screens;
* have accessible alternatives;
* not rely solely on color;
* handle missing data;
* handle loading/error states.

Do not fabricate data to fill empty charts.

# SELLER ONBOARDING STATUS

Display seller verification/onboarding status returned by the backend.

Support states such as:

* pending;
* under review;
* approved;
* rejected;
* suspended.

Use the canonical backend state.

Do not infer approval from the presence of seller data.

# SELLER SETTINGS

Implement seller organization settings supported by the backend.

Potential areas include:

* organization profile;
* storefront information;
* contact information;
* notification preferences;
* staff/member management;
* seller operational settings.

Do not expose private verification information to ordinary seller members.

# STAFF/MEMBER MANAGEMENT

Where backend contracts support it, implement:

* member list;
* invitations;
* role assignment;
* role changes;
* member removal;
* membership status.

Enforce UI-level permission visibility while retaining server-side authorization.

High-risk role changes should require explicit confirmation.

# SELLER CATALOG

Implement seller product catalog management.

Support:

* product list;
* search/filter;
* create;
* edit;
* draft state;
* publication state;
* archive;
* duplicate prevention feedback;
* pagination.

Use backend pagination and filtering.

Do not load the entire seller catalog into browser memory.

# PRODUCT CREATION

Implement a production-grade product form.

Support fields required by the backend, including as applicable:

* title;
* description;
* category;
* attributes;
* variants;
* SKU;
* seller offer;
* price;
* media.

Use React Hook Form and Zod for client-side validation.

Client validation must mirror safe backend constraints where useful, but backend validation remains authoritative.

# PRODUCT EDITING

Editing must distinguish:

* editable fields;
* immutable identity;
* publication changes;
* pricing changes;
* variant changes.

Do not allow a generic form to silently mutate unrelated state.

# DRAFTS

Support draft workflow where the backend provides it.

Draft forms must:

* preserve server state;
* support save;
* surface validation issues;
* support resume;
* handle stale data.

Do not persist authoritative drafts solely in browser storage.

# PRODUCT PUBLICATION

Provide explicit publish/unpublish actions.

Before submission:

* display relevant validation status;
* identify blocking issues returned by the backend;
* require confirmation where publication has meaningful consequences.

Do not allow the frontend to declare a product published without backend confirmation.

# VARIANTS

Implement variant management.

Support:

* attribute selection;
* valid combinations;
* SKU;
* price where applicable;
* media association;
* active/inactive state.

Prevent obvious duplicate combinations client-side while still relying on backend constraints.

# SKU MANAGEMENT

Display and edit SKU data according to backend permissions.

Support:

* SKU creation;
* uniqueness feedback;
* status;
* variant relation.

Never assume SKU uniqueness based solely on local state.

# CATEGORY SELECTION

Use backend category hierarchy.

Provide:

* searchable selection where appropriate;
* breadcrumb/parent context;
* validation;
* disabled inactive categories.

Do not hardcode the catalog category tree.

# ATTRIBUTE MANAGEMENT

Render category/product attributes dynamically where the backend provides schemas.

Support:

* text;
* numeric;
* boolean;
* enum;
* multi-value;

according to the actual API contract.

Do not create arbitrary client-only attributes that the backend cannot persist.

# SELLER OFFERS

Implement offer management where seller-specific commercial data is distinct from shared product data.

Display:

* offer status;
* SKU;
* price;
* currency;
* availability indicators;
* seller-specific attributes returned by the backend.

Do not expose other sellers' offers in seller-management screens.

# PRICING

Implement seller pricing UI.

Support:

* current price;
* currency;
* effective dates;
* price updates;
* validation;
* applicable promotions.

Display historical/active price information only as provided by the backend.

Do not calculate authoritative pricing rules in the client.

# PRICE CHANGE UX

Price changes should:

* require confirmation where appropriate;
* display currency;
* explain effective timing;
* surface backend conflicts;
* refresh authoritative state after mutation.

Do not optimistically claim a new price is active until the backend confirms it.

# PROMOTIONS

Implement seller promotion management where backend contracts exist.

Support:

* list;
* create;
* edit;
* activate;
* deactivate;
* schedule;
* scope;
* discount value;
* validation.

Do not implement the checkout promotion engine in the seller frontend.

# PROMOTION VALIDATION

Display backend validation such as:

* invalid date range;
* invalid discount;
* product/category scope conflict;
* inactive product;
* seller restriction;
* usage limit.

Do not reveal hidden fraud rules or internal moderation logic.

# MEDIA MANAGEMENT

Implement seller catalog-media management using the backend's secure upload flow.

Support:

* upload intent;
* file selection;
* client validation;
* upload progress;
* processing state;
* preview;
* ordering;
* removal;
* retry.

Never expose permanent object-storage credentials.

# MEDIA SECURITY

Validate client-side for immediate UX but rely on backend/storage processing for authoritative safety.

Do not trust:

* file extension alone;
* MIME type supplied by browser;
* object key;
* upload destination.

# INVENTORY DASHBOARD

Implement seller inventory views.

Support:

* SKU;
* product;
* on-hand;
* reserved;
* available;
* status;
* low-stock indicators where backend provides thresholds.

Do not calculate available stock independently when the backend returns an authoritative value.

# INVENTORY ADJUSTMENT

Implement authorized inventory-adjustment forms.

Support:

* quantity/change;
* reason;
* reference;
* confirmation.

Require explicit confirmation for potentially destructive inventory changes.

Do not let the frontend directly set raw database quantity without the backend inventory operation.

# INVENTORY HISTORY

Display inventory adjustment/history where supported.

Use:

* pagination;
* filtering;
* timestamps;
* actor;
* reason.

Do not expose internal operational data to unauthorized seller members.

# ORDER MANAGEMENT

Implement seller order management.

Support:

* order list;
* filters;
* order detail;
* seller-owned order items;
* customer information required for fulfillment;
* payment state where permitted;
* fulfillment state;
* shipment state;
* cancellation state.

Never expose other sellers' order items in a seller-scoped view.

# SELLER ORDER FILTERS

Use backend-supported filters such as:

* fulfillment state;
* order date;
* shipment status;
* cancellation state;
* return state.

Do not construct arbitrary backend queries.

# ORDER DETAIL FOR SELLERS

Seller order detail should display only seller-authorized information.

Potential information includes:

* order number;
* relevant items;
* quantities;
* shipping information required for fulfillment;
* customer information required for fulfillment;
* fulfillment status;
* shipment status;
* relevant return/refund state.

Hide platform-private financial or customer-security information.

# FULFILLMENT WORKFLOW

Implement seller fulfillment controls supported by backend.

Actions may include:

* start processing;
* mark packed;
* create shipment;
* mark handoff;
* update fulfillment status.

The frontend must display only valid actions returned by the server contract.

Do not infer valid transitions solely from local state.

# SHIPMENT CREATION

Where supported:

* collect shipment details;
* select carrier/service;
* submit;
* display provider errors;
* show pending state;
* refresh shipment state.

Do not call carrier APIs directly from the browser unless explicitly defined by the architecture.

# SHIPMENT TRACKING

Display seller shipment state and tracking information.

Support:

* tracking number;
* carrier;
* state;
* timestamps;
* shipment items.

Do not expose tracking data belonging to another seller.

# RETURNS AND REFUNDS

Implement seller-facing return/refund visibility and actions permitted by backend.

Support:

* return requests;
* return status;
* item-level quantities;
* reason;
* allowed seller actions;
* refund status.

Do not let a seller independently create arbitrary refunds.

Use backend-provided authorization and refundable amounts.

# SELLER REVIEWS

Implement seller review management.

Support:

* review list;
* rating;
* text;
* verification indicator where public;
* seller response;
* report/moderation status only where appropriate.

Do not expose private moderation notes.

# SELLER REVIEW RESPONSE

Where supported:

* provide a response form;
* validate input;
* submit;
* update the review query;
* prevent duplicate submissions.

Do not permit sellers to modify customer review content.

# SELLER NOTIFICATIONS

Implement seller-facing notification center.

Support:

* notification list;
* unread state;
* mark read;
* notification preferences;
* relevant seller deep links.

Use server state.

Do not reuse customer notification state without enforcing seller organization context.

# SELLER ANALYTICS

Implement seller analytics pages using backend-provided metrics.

Support, where available:

* sales;
* order volume;
* units sold;
* average order value;
* returns;
* refunds;
* ratings;
* inventory indicators.

Use date-range filters supported by the backend.

Do not make unsupported financial calculations in the browser.

# ANALYTICS DATE RANGES

Provide controlled selections such as:

* today;
* last 7 days;
* last 30 days;
* current month;
* previous month;
* custom range where supported.

Do not submit arbitrary unbounded ranges.

# REPORTING

Where seller reports are available:

* list reports;
* request report generation;
* display job status;
* provide secure download;
* handle expiration.

Do not generate huge report payloads in the browser.

# EXPORT SECURITY

Seller exports may contain sensitive business data.

Use backend-generated secure URLs or download mechanisms.

Do not place long-lived public object URLs in the UI.

# SELLER DASHBOARD PERFORMANCE

Avoid loading every widget independently with duplicate queries.

Use:

* consolidated backend endpoints where provided;
* parallel safe queries;
* TanStack Query caching;
* selective rendering.

Do not turn the dashboard into a request storm.

# SERVER/CLIENT BOUNDARIES

Use Server Components for read-heavy seller pages where practical.

Use Client Components for:

* forms;
* tables with interactive filters;
* dialogs;
* editors;
* uploads;
* charts.

Do not make every seller page a fully client-rendered application.

# STATE MANAGEMENT

Use TanStack Query for server state:

* products;
* inventory;
* orders;
* returns;
* reviews;
* notifications;
* analytics;
* seller profile.

Use Zustand only for local seller-portal UI state that genuinely benefits from shared client state.

Do not store authoritative inventory or order state in Zustand.

# FORMS

Use React Hook Form and Zod.

Forms must support:

* server validation errors;
* field errors;
* submission state;
* dirty-state handling;
* confirmation for destructive actions;
* keyboard accessibility.

# TABLES

Seller operations contain dense data.

Create reusable accessible table/data-grid patterns supporting:

* pagination;
* sorting;
* filtering;
* column visibility where useful;
* responsive alternatives;
* loading;
* empty;
* error;
* row actions.

Do not render massive datasets in the browser.

# MOBILE RESPONSIVENESS

Seller operations must remain usable on smaller screens.

For dense tables:

* adapt to cards;
* allow horizontal scrolling only when necessary;
* preserve critical actions;
* avoid inaccessible tiny controls.

# ACCESSIBILITY

All seller operations must support:

* keyboard navigation;
* semantic forms;
* table headers;
* accessible menus;
* dialogs;
* labels;
* focus management;
* error association;
* status announcements;
* sufficient contrast;
* reduced motion.

# SECURITY

Protect seller data against:

* organization-ID manipulation;
* resource-ID manipulation;
* unauthorized staff actions;
* role escalation;
* export abuse;
* dangerous bulk operations.

The browser must never be trusted as an authorization boundary.

# SENSITIVE DATA

Seller pages may contain:

* customer information;
* order details;
* addresses;
* financial information;
* business data.

Display only what the backend contract authorizes.

Do not expose sensitive data in:

* URLs;
* analytics;
* logs;
* client-side error reports.

# BULK OPERATIONS

Where seller bulk operations are supported:

* bound the selection;
* show scope;
* require confirmation;
* use backend job APIs where appropriate;
* show progress/results;
* handle partial failures.

Do not submit thousands of individual browser mutations without backend support.

# ANALYTICS

Track meaningful seller events such as:

* product created;
* product published;
* inventory adjusted;
* order viewed;
* fulfillment action;
* report generated;
* seller dashboard viewed.

Do not capture:

* customer passwords;
* tokens;
* full addresses unnecessarily;
* private verification documents;
* payment credentials.

# ERROR HANDLING

Handle:

* unauthorized;
* forbidden;
* validation errors;
* conflicts;
* stale state;
* rate limits;
* provider failures;
* network errors.

For mutations, refresh authoritative state after uncertain outcomes.

# CONCURRENCY

Seller pages may be open in multiple tabs/users.

Handle:

* stale product edits;
* concurrent inventory adjustments;
* simultaneous order updates;
* role changes;
* notification changes.

Prefer backend version/conflict mechanisms where available.

Do not silently overwrite newer state.

# DESTRUCTIVE ACTIONS

Require confirmation for:

* product archival;
* inventory reductions;
* seller-member removal;
* promotion deactivation where financially relevant;
* order cancellation;
* destructive media deletion.

Confirmation must identify the affected resource.

# SEO

Seller portal routes must not be publicly indexed.

Use appropriate route metadata/robots controls.

# TESTING

Create meaningful tests.

## Seller Authorization

Test:

* organization context;
* allowed/forbidden actions;
* cross-seller IDOR;
* role-based visibility.

## Catalog

Test:

* create;
* edit;
* publish;
* archive;
* variant changes;
* SKU validation;
* media upload boundaries.

## Inventory

Test:

* display;
* adjustment;
* confirmation;
* conflict handling;
* history pagination.

## Orders

Test:

* list;
* filters;
* seller isolation;
* detail;
* fulfillment transitions;
* shipment creation.

## Returns/Refunds

Test:

* eligibility;
* status;
* permitted seller actions;
* unauthorized refund behavior.

## Reviews

Test:

* list;
* response;
* authorization.

## Analytics

Test:

* date-range behavior;
* metric display;
* empty data;
* error states.

## Accessibility

Test:

* forms;
* tables;
* dialogs;
* filters;
* charts;
* keyboard navigation.

# END-TO-END TESTS

Where browser E2E infrastructure exists, cover:

* seller login;
* seller dashboard;
* product creation;
* product publication;
* inventory adjustment;
* seller order workflow;
* fulfillment action;
* review response.

Do not fabricate backend success in end-to-end tests.

# PERFORMANCE

Optimize seller pages for:

* large product catalogs;
* large order lists;
* large inventory lists;
* efficient data fetching;
* pagination;
* minimal JavaScript;
* chart rendering.

Do not render thousands of rows simultaneously.

# DOCUMENTATION

Update documentation covering:

* seller portal routes;
* organization context;
* permissions;
* product forms;
* media uploads;
* inventory;
* order operations;
* fulfillment;
* reviews;
* analytics;
* exports;
* testing;
* accessibility.

Documentation must describe actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake seller data;
* fake order states;
* fake inventory;
* fake analytics;
* fake product persistence;
* placeholder APIs;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use verified backend contracts.

# NO HARDCODED SECRETS

Never hardcode:

* API keys;
* payment secrets;
* storage credentials;
* database credentials;
* provider secrets.

Keep server-only secrets out of client bundles.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit/component tests;
* accessibility tests;
* browser E2E;
* production build;
* route validation;
* API integration validation.

Where backend functionality is unavailable:

* validate the frontend contract layer;
* do not fabricate successful responses;
* report the exact dependency.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* seller portal routes;
* dashboard changes;
* organization/member management;
* product/catalog changes;
* variant/SKU changes;
* pricing/promotions;
* media management;
* inventory changes;
* order/fulfillment changes;
* shipment changes;
* returns/refunds;
* review management;
* seller notifications;
* seller analytics;
* reporting/export changes;
* API-client/state-management changes;
* analytics;
* accessibility;
* tests created;
* tests executed;
* validation performed;
* backend contract dependencies;
* compatibility considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* seller portal architecture is established;
* seller organization context is secure;
* seller permissions are respected;
* dashboard is implemented;
* seller settings are implemented where supported;
* member management is implemented where supported;
* seller verification state is displayed;
* product catalog management works;
* product creation/editing works;
* variants and SKUs work;
* categories/attributes work;
* seller offers work;
* pricing works through backend contracts;
* promotions work through backend contracts;
* media upload management is secure;
* inventory views/adjustments work;
* seller order management works;
* fulfillment UI works where supported;
* shipment UI works where supported;
* returns/refunds are represented correctly;
* seller review management works;
* seller notifications work;
* seller analytics/reporting work where backend-supported;
* authorization and seller isolation are enforced;
* responsive/accessibility requirements are met;
* tests cover critical workflows;
* production build succeeds where dependencies are available;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the seller portal and seller-operations web experience defined by this prompt.

Do not implement platform administration, moderation-operator interfaces, mobile, backend, or production infrastructure.

The backend remains authoritative for seller permissions, inventory, pricing, orders, fulfillment, refunds, reviews, and analytics.

Never fabricate seller data, inventory state, order state, financial information, or successful mutations.

Protect customer and seller-sensitive information.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
