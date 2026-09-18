# Amazon-Style Ecommerce Marketplace — Frontend Prompt — Volume 5

# ROLE

You are the Staff Frontend Engineering team responsible for implementing the marketplace administration, moderation, seller-operations support, fraud-and-abuse operations, reporting, analytics, and platform-management web experience of a production-grade, globally scalable ecommerce marketplace.

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
* reporting;
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

* administrative authorization;
* seller/customer state;
* moderation;
* risk signals;
* audit records;
* reporting;
* analytics;
* operational controls;
* financial information;
* data exports.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* authentication;
* authorization;
* customer account;
* seller portal;
* catalog;
* inventory;
* orders;
* payments;
* returns;
* refunds;
* reviews;
* notifications;
* moderation APIs;
* seller-administration APIs;
* risk/fraud APIs;
* audit APIs;
* reporting APIs;
* analytics APIs;
* export APIs;
* shared design system;
* API client;
* TanStack Query;
* routing;
* tests;
* environment configuration.

The repository is authoritative for actual implementation state.

Do not assume an earlier backend or frontend prompt was executed.

Do not invent administrative APIs that do not exist or are not supported by a verified contract.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate implementations;
* maintain established contracts.

If a backend capability is absent, do not create a fake administrative workflow merely to make the interface appear complete.

# CURRENT EXECUTION SCOPE

Implement the web-based platform administration and operations portal.

This milestone includes:

* administration route architecture;
* role/permission-aware navigation;
* administrative dashboard;
* seller administration;
* seller verification;
* seller suspension/restriction workflows;
* customer administration;
* account-restriction workflows;
* moderation queue;
* report management;
* review/content moderation;
* product moderation controls;
* risk/fraud signal review;
* operational case management;
* administrative audit-log viewer;
* operational configuration UI where backend-supported;
* reporting dashboards;
* analytics dashboards;
* report-generation UI;
* secure data-export workflows;
* bulk-operation UI;
* operational notifications;
* responsive administration;
* accessibility;
* analytics instrumentation;
* comprehensive tests.

The backend remains the security and authorization boundary.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* backend administration APIs;
* a separate authentication system;
* a machine-learning fraud engine;
* a complete enterprise BI platform;
* a complete accounting system;
* production infrastructure;
* mobile administration application;
* customer storefront functionality;
* seller portal functionality already covered by the dedicated seller frontend scope.

Do not build client-side workarounds for missing backend permissions.

# ADMINISTRATION APPLICATION ARCHITECTURE

Establish a dedicated administration portal architecture inside the existing web application unless the repository explicitly uses a separate administrative application.

Separate administrative routes and components from ordinary customer and seller experiences.

The portal must have clear boundaries for:

* dashboard;
* sellers;
* customers;
* moderation;
* reports;
* risk/fraud;
* audit;
* operations;
* analytics;
* reporting;
* exports;
* configuration.

Do not duplicate the global API client, authentication, or design system.

# ADMINISTRATIVE AUTHENTICATION

Use the existing authentication/session model.

The UI must:

* require authenticated administrative access;
* handle session expiration;
* handle unauthorized state;
* handle forbidden state;
* never expose sensitive credentials.

Do not implement role checks solely in the browser.

# ADMINISTRATIVE AUTHORIZATION

Build permission-aware UI behavior around backend-defined permissions.

For every sensitive operation:

* hide or disable controls when the permission is clearly absent;
* still handle backend 403 responses;
* do not assume UI visibility is sufficient authorization.

Do not create client-side permission values that contradict backend responses.

# ROLE-AWARE NAVIGATION

Administrative navigation must be permission aware.

Possible areas include:

* Overview;
* Sellers;
* Customers;
* Moderation;
* Risk;
* Orders;
* Reports;
* Analytics;
* Audit;
* Operations;
* Configuration.

Only show sections that the current administrative user may access, where the permission model supports granular navigation.

# ADMIN DASHBOARD

Implement a production-grade operational dashboard.

Display backend-derived metrics such as:

* active sellers;
* pending seller verification;
* order volume;
* payment failures;
* refund volume;
* return volume;
* moderation backlog;
* abuse reports;
* risk signals;
* notification failures;
* system incidents where supported.

Do not fabricate metrics.

# DASHBOARD DATE RANGE

Provide controlled date-range selection using backend-supported ranges.

Use:

* today;
* yesterday;
* last 7 days;
* last 30 days;
* current month;
* previous month;
* custom range where supported.

Do not issue unbounded queries.

# DASHBOARD LOADING

Every dashboard section must support:

* loading;
* empty;
* partial failure;
* retry.

One failed metric must not necessarily render the entire dashboard unusable.

# ADMIN CHARTS

Use Recharts where appropriate.

Charts must:

* have accessible labels;
* provide useful empty states;
* handle sparse data;
* avoid visual-only meaning;
* remain readable on smaller screens.

Provide textual/summary information where the chart itself is not accessible enough.

# SELLER ADMINISTRATION

Implement seller-management UI.

Support:

* seller search;
* filtering;
* seller detail;
* verification status;
* seller status;
* restrictions;
* suspension;
* reactivation;
* operational notes where supported;
* audit/history where supported.

Use bounded pagination.

Do not load the entire seller catalog.

# SELLER SEARCH

Support backend-defined filters such as:

* status;
* verification state;
* created date;
* seller organization;
* restriction state.

Do not expose arbitrary database query fields.

# SELLER DETAIL

Display only data authorized for the administrative role.

Potential information includes:

* organization identity;
* verification state;
* operational state;
* seller activity;
* catalog summary;
* order summary;
* risk indicators where permitted;
* administrative history.

Do not expose secret credentials.

# SELLER VERIFICATION UI

Implement verification review screens.

Support:

* current state;
* submitted information;
* documents/metadata where backend explicitly exposes them;
* reviewer;
* decision;
* reason;
* timestamps;
* approve/reject actions where permitted.

Sensitive verification information must be shown only to authorized operators.

# SELLER VERIFICATION ACTIONS

For approve/reject operations:

* require explicit confirmation;
* display relevant target;
* collect reason where required;
* submit to backend;
* refresh authoritative state;
* display success/failure.

Do not optimistically mark a seller verified.

# SELLER SUSPENSION

Implement seller restriction/suspension workflows.

Support:

* restriction type;
* reason;
* optional expiration;
* confirmation;
* server response;
* current status.

Use a high-risk confirmation dialog.

# SELLER REACTIVATION

Allow authorized reactivation.

Show:

* current restriction;
* reason;
* confirmation;
* resulting state.

Do not hide important consequences.

# CUSTOMER ADMINISTRATION

Implement customer-management UI.

Support:

* customer search;
* detail;
* account status;
* restriction;
* restoration;
* relevant security state;
* authorized operational metadata.

Do not show passwords, tokens, or secret security values.

# CUSTOMER RESTRICTION

Implement customer restriction flows.

Actions must:

* require explicit permission;
* require reason where applicable;
* require confirmation;
* produce server-backed state;
* refresh data after mutation.

Do not allow arbitrary client-side account disabling.

# CUSTOMER PRIVACY

Use role-aware DTOs.

Do not unnecessarily expose:

* complete account history;
* internal authentication state;
* private notification content;
* sensitive addresses;
* financial credentials.

# MODERATION QUEUE

Implement a moderation queue UI.

Support:

* queue/list;
* status;
* priority;
* target type;
* target;
* reported reason;
* assigned operator;
* creation date.

Use cursor pagination where supported.

# MODERATION FILTERS

Support backend-defined filters:

* state;
* target type;
* priority;
* assigned operator;
* reason;
* date range.

Do not build arbitrary query languages.

# MODERATION CASE DETAIL

Display:

* report information;
* target resource;
* current moderation state;
* assignment;
* relevant safe context;
* decision history;
* available actions.

Do not expose internal data that the current operator is not authorized to view.

# MODERATION ACTIONS

Support actions such as:

* hide;
* reject;
* restore;
* suspend;
* escalate;
* dismiss;
* close.

The available action set must derive from backend authorization and state.

Do not infer valid moderation transitions entirely from client state.

# MODERATION CONFIRMATION

High-impact moderation actions must use explicit confirmation.

For destructive or externally visible actions:

* explain the consequence;
* require intentional submission;
* prevent duplicate submissions.

# REVIEW MODERATION

Provide moderation interfaces for customer reviews where backend support exists.

Display:

* review;
* rating;
* target product;
* seller;
* report reason;
* moderation state;
* available actions.

Do not expose hidden internal moderation notes to unauthorized users.

# PRODUCT MODERATION

Where backend moderation controls exist, support:

* product publication state;
* reported product;
* seller context;
* moderation history;
* hide/restore actions;
* escalation.

Do not mutate catalog state directly from the browser.

# REPORT MANAGEMENT

Implement abuse/report management.

Support:

* report list;
* report detail;
* target;
* reporter metadata appropriate to permissions;
* reason;
* status;
* assignment;
* resolution.

Use bounded pagination.

# REPORT ACTIONS

Where supported:

* assign;
* resolve;
* dismiss;
* escalate;
* link to moderation case.

Actions must update through the backend.

# RISK/FRAUD OPERATIONS

Implement the UI foundation for deterministic risk/fraud signals.

Display:

* subject;
* signal type;
* severity;
* timestamp;
* source;
* current resolution state.

Do not label a user or transaction fraudulent merely because a risk signal exists.

Use the terminology and state provided by the backend.

# RISK CASE DETAIL

Display relevant risk signals and operational context authorized for the operator.

Do not expose:

* hidden algorithms;
* secret scoring inputs;
* credentials;
* unnecessary sensitive personal data.

# RISK ACTIONS

Where backend contracts support action:

* challenge;
* review;
* restrict;
* unblock;
* escalate.

Require confirmation for high-impact actions.

# ADMINISTRATIVE ORDER OPERATIONS

Where the backend exposes administrative order controls, provide a bounded order-operations area.

Support:

* order lookup;
* detail;
* payment state;
* fulfillment state;
* shipment state;
* return/refund state;
* approved intervention actions.

Do not recreate the customer order UI or seller order portal.

# REFUND OPERATIONS

If administrative refund actions are supported:

* display refundable amount returned by backend;
* require explicit confirmation;
* collect reason;
* display idempotent submission state;
* show final state from backend.

Never calculate the refund amount solely on the client.

# AUDIT LOG VIEWER

Implement an administrative audit-log viewer.

Support:

* actor;
* action;
* target;
* target type;
* timestamp;
* outcome;
* correlation/request ID;
* safe metadata.

Use pagination and controlled filtering.

# AUDIT LOG PRIVACY

Do not expose:

* secrets;
* tokens;
* passwords;
* raw request headers;
* raw private data;

unless the backend explicitly provides a safe representation appropriate to the authorized role.

# AUDIT DETAILS

Provide a detail view that preserves audit context without exposing sensitive implementation internals.

Where a correlation ID is available, make it easy to copy.

# BULK OPERATIONS

Implement user-facing flows for backend-supported bulk operations.

Examples:

* bulk moderation;
* bulk seller status changes;
* bulk restriction;
* bulk export.

The UI must:

* limit selection size;
* preview scope;
* confirm;
* start backend job;
* display progress;
* display partial failures;
* refresh affected data.

Never fire thousands of independent browser requests when a backend bulk-job API exists.

# BULK OPERATION SAFETY

Before executing a bulk operation:

* display number of selected resources;
* show action;
* show consequence;
* display applicable limitations;
* require confirmation.

For irreversible actions, provide stronger confirmation.

# REPORTING UI

Implement reporting screens.

Support:

* report catalog;
* filters;
* date range;
* status;
* generation;
* progress;
* secure download;
* expiration.

Do not render huge report datasets directly in the browser.

# REPORT JOBS

Represent asynchronous report generation states such as:

* queued;
* running;
* completed;
* failed;
* expired;
* cancelled.

Refresh or subscribe according to the verified backend mechanism.

Do not assume a job completes immediately.

# EXPORTS

Implement secure export workflows.

Support:

* request;
* status;
* expiration;
* download.

The backend must control authorization and file access.

Do not expose long-lived public URLs.

# ANALYTICS UI

Implement platform analytics dashboards based on backend-derived metrics.

Potential areas include:

* sales;
* orders;
* conversion;
* refunds;
* returns;
* seller activity;
* customer activity;
* catalog activity;
* review activity;
* moderation;
* notification delivery.

Metrics must be accompanied by:

* date range;
* units;
* definitions where ambiguity could mislead.

# METRIC DEFINITIONS

Display the backend-provided metric definition or clear label when necessary.

Do not create frontend-specific definitions for terms such as:

* sales;
* active sellers;
* completed orders;
* refunds.

# OPERATIONAL TABLES

Create reusable admin data tables supporting:

* filtering;
* sorting;
* cursor pagination;
* selection where bulk actions are allowed;
* loading;
* empty;
* error;
* responsive behavior.

Do not render enormous lists in memory.

# FILTER STATE

For administrative filters:

* keep URL state where safe and useful;
* validate values;
* prevent stale filters from submitting unsupported backend values;
* reset dependent filters when their parent scope changes.

Do not put sensitive search terms or private data into URLs unnecessarily.

# ADMIN SEARCH UX

Search fields must:

* debounce where appropriate;
* bound input length;
* support loading state;
* handle errors;
* avoid issuing duplicate requests.

Do not debounce actions where it would delay intentional destructive operations.

# FORM ARCHITECTURE

Use React Hook Form and Zod where appropriate.

Forms must:

* validate;
* map backend errors;
* prevent duplicate submissions;
* support accessibility;
* support dirty state;
* provide clear success/error feedback.

# DESIGN SYSTEM

Reuse the project's existing design system.

Administrative pages should use shared:

* buttons;
* forms;
* tables;
* dialogs;
* badges;
* tabs;
* alerts;
* cards;
* charts;
* skeletons.

Do not create an unrelated admin design language.

# ADMIN COLOR/STATUS SYSTEM

Status colors must remain accessible.

Do not communicate state through color alone.

Use:

* text;
* icons;
* labels;
* accessible descriptions.

# RESPONSIVE ADMINISTRATION

The admin portal must remain usable on smaller screens where reasonable.

Complex data tables may:

* switch to cards;
* allow controlled horizontal scrolling;
* prioritize key columns.

Do not make high-risk actions inaccessible on mobile layouts merely because the desktop layout is dense.

# ACCESSIBILITY

Administrative applications must meet strong accessibility standards.

Support:

* keyboard navigation;
* accessible data tables;
* dialog semantics;
* focus management;
* form labels;
* error association;
* status announcements;
* sufficient contrast;
* reduced motion.

# SECURITY

Protect the administration UI against:

* privilege escalation;
* IDOR;
* open redirects;
* unsafe bulk operations;
* accidental public indexing;
* sensitive information leakage;
* XSS in moderation content;
* malicious report content.

Treat all user-generated content as untrusted.

# MODERATION CONTENT RENDERING

When displaying user-generated content:

* escape untrusted text;
* sanitize supported rich content;
* constrain media;
* do not execute arbitrary HTML or scripts.

Do not use unsafe HTML injection merely to preserve formatting.

# ADMIN ROUTE PROTECTION

Administrative routes must:

* require authentication;
* verify administrative authorization;
* gracefully handle expired sessions;
* never expose private page content before authorization.

Client route protection is UX only; backend authorization remains mandatory.

# ANALYTICS

Instrument administrative usage where appropriate:

* dashboard viewed;
* seller reviewed;
* moderation case opened;
* moderation action performed;
* report generated;
* export requested;
* operational control changed.

Do not capture:

* passwords;
* tokens;
* secret configuration;
* unnecessary private customer data.

High-risk administrative actions should already be recorded by the backend audit system; frontend analytics must not become the authoritative audit trail.

# ERROR REPORTING

Frontend monitoring must exclude:

* authentication credentials;
* tokens;
* payment credentials;
* sensitive verification documents;
* private moderation content unless explicitly sanitized.

# PERFORMANCE

Optimize the administration portal for:

* large tables;
* large datasets;
* many filters;
* multiple dashboard widgets;
* chart rendering;
* pagination;
* minimal unnecessary JavaScript.

Avoid:

* full-dataset client sorting;
* client-side filtering of massive lists;
* duplicate API requests;
* uncontrolled polling.

# DATA REFRESH

For operational data that can change asynchronously:

* use TanStack Query refetching;
* use safe polling where appropriate;
* integrate realtime if a verified contract exists;
* always reconcile with authoritative API state.

Do not poll aggressively.

# SERVER/CLIENT BOUNDARIES

Use Server Components for read-heavy initial data where practical.

Use Client Components for:

* filters;
* forms;
* tables;
* dialogs;
* charts;
* bulk-selection interfaces.

Do not make the entire administration application client-rendered without reason.

# STATE MANAGEMENT

Use TanStack Query for:

* sellers;
* customers;
* moderation;
* reports;
* audit;
* risk signals;
* analytics;
* configuration.

Use Zustand only for genuine local UI state.

Do not place authoritative administrative data in global client state unnecessarily.

# SEO AND INDEXING

Administrative routes must not be indexed publicly.

Use appropriate route and metadata controls.

Do not expose private admin pages through public metadata.

# TESTING

Create meaningful tests.

## Authorization

Test:

* role-based navigation;
* unauthorized route;
* forbidden action;
* seller/customer scope;
* high-risk permission boundaries.

## Seller Administration

Test:

* search;
* detail;
* verification;
* suspension;
* reactivation;
* confirmation dialogs.

## Customer Administration

Test:

* lookup;
* restriction;
* restoration;
* privacy-safe display.

## Moderation

Test:

* queue;
* filters;
* case detail;
* actions;
* confirmation;
* state refresh.

## Risk

Test:

* signal display;
* filtering;
* authorized actions;
* sensitive-data boundaries.

## Audit

Test:

* list;
* filters;
* detail;
* safe rendering.

## Reporting

Test:

* date filters;
* report generation;
* job states;
* secure downloads;
* expiration handling.

## Bulk Operations

Test:

* selection;
* limits;
* preview;
* confirmation;
* job submission;
* progress;
* failure display.

## Accessibility

Test:

* keyboard navigation;
* data tables;
* dialogs;
* status announcements;
* charts.

# END-TO-END TESTS

Where browser E2E infrastructure exists, implement scenarios for:

* admin authentication;
* dashboard;
* seller verification;
* seller suspension;
* moderation case;
* report generation;
* audit search;
* authorized versus unauthorized access.

Do not use fake successful backend operations in E2E environments unless explicitly configured as deterministic test fixtures.

# DOCUMENTATION

Update documentation covering:

* administration routes;
* permission-aware UI;
* seller management;
* customer management;
* moderation;
* risk;
* audit;
* reports;
* exports;
* analytics;
* configuration controls;
* testing;
* accessibility.

Documentation must describe actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake admin metrics;
* fake seller states;
* fake moderation outcomes;
* fake risk decisions;
* placeholder reports;
* fake exports;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use verified backend contracts.

# NO HARDCODED SECRETS

Never hardcode:

* admin credentials;
* API secrets;
* signing secrets;
* provider credentials;
* database credentials.

Keep all server-only secrets outside client bundles.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit/component tests;
* accessibility checks;
* E2E tests;
* production build;
* route validation;
* API integration validation.

Where a required backend API is unavailable:

* validate integration boundaries without fabricating success;
* report exact dependencies.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* administration routes;
* dashboard changes;
* seller administration;
* customer administration;
* moderation;
* reports;
* risk/fraud operations;
* audit UI;
* configuration UI;
* analytics dashboards;
* report/export flows;
* bulk-operation workflows;
* API-client/state-management changes;
* analytics changes;
* accessibility changes;
* tests created;
* tests executed;
* validation performed;
* backend dependencies;
* compatibility considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* administration route architecture is implemented;
* authentication and permission-aware navigation are implemented;
* administrative dashboard is functional;
* seller management is implemented;
* seller verification UI is implemented;
* seller restrictions are implemented;
* customer administration is implemented;
* moderation queue/cases are implemented;
* reporting and abuse workflows are implemented;
* review/product moderation controls are implemented where supported;
* deterministic risk/fraud-signal UI is implemented where supported;
* audit-log viewer is implemented;
* operational controls are implemented where supported;
* analytics dashboards are implemented;
* report/export workflows are implemented;
* bulk operations are safely bounded;
* sensitive information is protected;
* accessibility requirements are implemented;
* tests cover critical administrative workflows;
* production build succeeds where dependencies are available;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the administration, moderation, operational reporting, risk/fraud operations, audit, and platform-management web experience defined by this prompt.

Do not implement backend APIs, mobile administration, a full BI/data-warehouse system, or machine-learning fraud detection.

The backend remains authoritative for all administrative permissions, seller/customer state, moderation, risk decisions, audit records, reporting, and operational controls.

Never fabricate administrative data or privileged actions.

Protect all sensitive information and do not expose secrets to the browser.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
