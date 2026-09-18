# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 6

# ROLE

You are the Staff Backend Engineering team responsible for implementing the administration, seller operations, moderation, fraud and abuse controls, operational analytics, reporting, and platform-management backend foundations of a production-grade, globally scalable ecommerce marketplace.

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
* notifications;
* seller operations;
* administration;
* moderation;
* fraud and abuse prevention;
* analytics;
* reporting;
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
* Elasticsearch or OpenSearch
* S3-compatible object storage
* Stripe or equivalent payment-provider abstraction
* OpenTelemetry-compatible observability

Do not assume any earlier prompt was executed. Inspect the repository and use only actual implemented functionality as an existing dependency.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the current state of:

* authentication;
* authorization;
* customers;
* seller organizations;
* catalog;
* inventory;
* cart;
* checkout;
* orders;
* payments;
* fulfillment;
* shipping;
* returns;
* refunds;
* reviews;
* notifications;
* event/outbox infrastructure;
* queues;
* Redis;
* database schema;
* migrations;
* audit infrastructure;
* observability;
* API conventions;
* administrative modules;
* analytics/reporting modules;
* moderation infrastructure;
* fraud/abuse controls.

The repository is authoritative for actual implementation state.

The current prompt defines the required scope.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplication;
* maintain established contracts.

Do not fabricate implementation state.

# CURRENT EXECUTION SCOPE

Implement the backend platform-management layer for:

* seller administration;
* seller onboarding administration;
* seller verification workflow foundation;
* seller status and restriction controls;
* customer account administration;
* administrative catalog controls;
* moderation operations;
* review/content moderation controls;
* user reports;
* abuse reporting;
* blocking and restriction controls where applicable;
* rate-limit administration;
* fraud/risk signal capture;
* administrative audit logs;
* platform operational dashboards data APIs;
* marketplace reporting foundations;
* seller analytics foundations;
* customer/order operational reporting;
* administrative search/filtering endpoints;
* asynchronous reporting jobs where required;
* operational exports where appropriate;
* platform configuration boundaries;
* administrative events;
* tests and validation.

This milestone must provide backend capabilities that later web/admin clients can consume.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete web administration UI;
* complete mobile administration UI;
* machine-learning fraud detection;
* a full data warehouse;
* an enterprise BI platform;
* production Kubernetes;
* production AWS provisioning;
* unrelated recommendation systems;
* unrelated catalog/search redesign;
* payment-provider redesign;
* complete customer-support ticketing;
* a generalized rule engine unless specifically required by an implemented abuse-control boundary.

The current milestone may create stable APIs, data models, queues, event contracts, and policy boundaries needed by future administrative and analytics clients.

# ENGINEERING REQUIREMENTS

Administrative systems are security-sensitive.

Prioritize:

* least privilege;
* explicit permissions;
* server-side authorization;
* comprehensive auditability;
* safe destructive operations;
* data minimization;
* seller isolation;
* operational observability;
* idempotency;
* bounded administrative queries;
* protected bulk operations.

Do not create a universal administrative bypass.

Do not make administrative permissions equivalent to unrestricted database access.

# ADMINISTRATIVE DOMAIN

Create or extend an administrative domain boundary.

It must support, as applicable:

* administrator identity context;
* administrative roles;
* permissions;
* operational scope;
* audit context;
* secure actions;
* administrative session behavior through the existing authentication model.

Do not create a second authentication system solely for administration unless the repository architecture explicitly requires it.

# ADMINISTRATIVE ROLE MODEL

Use explicit administrative roles/permissions appropriate to the platform.

At minimum evaluate:

* platform administrator;
* marketplace operations;
* seller operations;
* customer support;
* moderator;
* fraud/risk operator;
* finance/returns operator;
* reporting/analytics operator.

Separate permissions according to least privilege.

Examples may include:

* manage sellers;
* verify sellers;
* suspend sellers;
* manage customers;
* moderate content;
* investigate reports;
* intervene in orders;
* authorize refunds;
* investigate fraud;
* access reporting;
* export operational data.

Do not grant every administrative role every permission.

# ADMINISTRATIVE AUTHORIZATION

Every administrative operation must verify:

* authenticated administrative identity;
* role/permission;
* resource ownership or administrative scope;
* high-risk-action requirements;
* auditability requirements.

Do not rely on frontend route protection.

Do not treat a role name from a request body as authorization.

# HIGH-RISK ADMINISTRATIVE ACTIONS

Identify operations that require stronger controls.

Examples include:

* seller suspension;
* seller verification override;
* customer restriction;
* manual refund;
* order intervention;
* large-scale data export;
* permission changes;
* moderation removal;
* fraud-related restrictions.

For these actions:

* require explicit permission;
* record actor;
* record target;
* record reason;
* record outcome;
* record timestamp;
* preserve correlation/request identifiers.

Where the existing architecture supports step-up authentication or approval workflows, integrate with the existing mechanism rather than creating a parallel system.

# SELLER ADMINISTRATION

Implement seller administrative management.

Support operations such as:

* seller discovery;
* seller detail retrieval;
* seller verification state;
* seller status;
* seller restrictions;
* seller suspension;
* seller reactivation;
* seller organization metadata;
* seller administrative notes where appropriate;
* seller audit history.

Do not expose confidential seller information to operators without the required permission.

# SELLER VERIFICATION

Implement a seller verification workflow foundation.

Support:

* verification state;
* submitted information;
* verification status;
* reviewer;
* decision;
* decision reason;
* timestamps;
* audit events.

Potential states may include:

* pending;
* under_review;
* approved;
* rejected;
* suspended;

using the project's canonical terminology.

Do not implement a complete KYC/AML provider integration unless it already exists in the repository and is explicitly part of the current scope.

# SELLER RESTRICTIONS

Implement explicit seller restriction mechanisms.

Support restriction categories such as:

* active;
* limited;
* suspended;
* banned;

only where justified by the project contract.

Restrictions must have:

* reason;
* actor;
* timestamp;
* optional expiration;
* audit record.

Do not encode restrictions as undocumented boolean flags scattered throughout the codebase.

# CUSTOMER ADMINISTRATION

Implement administrative customer controls.

Support, where applicable:

* customer lookup;
* account status;
* temporary restriction;
* suspension;
* account restoration;
* security-event inspection;
* authorized operational metadata.

Do not expose passwords, tokens, or other credentials to administrators.

# CUSTOMER PRIVACY

Administrative customer views must expose only the minimum information required for the operator's role.

Do not create unrestricted "view everything" endpoints.

Protect:

* authentication data;
* sensitive personal information;
* payment references;
* security metadata;
* private notification content.

# MODERATION DOMAIN

Implement a platform moderation boundary.

The current scope must support moderation of content types already present in the backend, including as applicable:

* product listings;
* reviews;
* seller-submitted media;
* reports;
* abusive content.

The moderation layer must not duplicate the authoritative business object.

Instead, it should own:

* moderation state;
* moderation action;
* reviewer/operator;
* reason;
* decision;
* timestamps;
* audit information.

# MODERATION CASES

Implement a moderation-case representation where appropriate.

A case should identify:

* report source;
* target resource;
* target type;
* reported reason;
* current state;
* priority;
* assigned moderator;
* decision;
* timestamps.

Do not store entire business objects inside moderation cases unless necessary.

# MODERATION STATES

Use explicit moderation states such as:

* open;
* queued;
* under_review;
* actioned;
* dismissed;
* escalated;
* closed;

using the canonical project terminology.

Do not allow arbitrary state mutation.

# REPORTING

Implement abuse/report submission and operational handling.

Reports may concern:

* reviews;
* products;
* sellers;
* accounts;
* media;
* orders or transactions where appropriate.

Reports must include:

* reporter or system source;
* target;
* reason;
* optional safe description;
* state;
* timestamps.

Prevent uncontrolled duplicate report creation where abuse controls require it.

# MODERATION ACTIONS

Actions may include:

* hide content;
* reject content;
* restore content;
* restrict account;
* suspend seller;
* remove media;
* escalate case.

Each action must:

* verify authorization;
* update authoritative moderation state;
* produce the required domain event;
* create an audit record.

Do not directly mutate unrelated business data without going through its domain contract.

# FRAUD AND ABUSE FOUNDATION

Implement a deterministic fraud/abuse signal foundation.

Support collection of signals such as:

* repeated failed authentication;
* suspicious checkout behavior;
* excessive refund requests;
* repeated payment failures;
* unusual account creation patterns;
* abusive review/report behavior;
* excessive API activity;
* suspicious seller activity.

The system may record signals and risk states without claiming to determine fraud automatically.

# RISK SIGNAL MODEL

Create a risk-signal model with:

* signal type;
* source;
* subject;
* severity;
* confidence if applicable;
* timestamp;
* correlation ID;
* resolution state;
* associated case where applicable.

Do not create arbitrary free-form security records without a predictable schema.

# RISK DECISIONS

Where deterministic controls are required, support decisions such as:

* allow;
* rate-limit;
* challenge;
* review;
* restrict;
* block.

These decisions must be owned by explicit policy/control mechanisms.

Do not build a hidden scoring system that cannot be explained or audited.

# BLOCKING

Where customer/seller blocking is part of the project requirements, implement explicit blocking relationships.

Support:

* blocker;
* blocked subject;
* type;
* state;
* timestamps.

Use blocking only where it has a defined product effect.

Do not use blocking as an undocumented authorization bypass.

# ADMINISTRATIVE SEARCH

Implement server-side search/filtering capabilities for administrative operations.

Support bounded filtering by fields such as:

* account state;
* seller state;
* verification state;
* moderation state;
* risk state;
* date range;
* assigned operator;
* target type.

Use indexed access patterns.

Do not expose arbitrary query languages directly to administrators.

# BULK OPERATIONS

Administrative bulk actions are high risk.

Where bulk operations are required:

* constrain batch size;
* validate permission;
* validate every target;
* record the operation;
* make the operation idempotent;
* provide per-item success/failure where appropriate;
* use asynchronous jobs when processing is large;
* prevent accidental all-record operations.

Do not allow unbounded bulk mutation through a single request.

# BULK JOBS

Large administrative operations should use queues where appropriate.

Examples include:

* bulk moderation;
* bulk seller status changes;
* large exports;
* mass notification preparation.

Jobs must define:

* payload;
* authorization context;
* actor;
* batch size;
* retry policy;
* idempotency;
* progress;
* failure reporting;
* observability.

Never allow a background job to execute without preserving the initiating actor and authorization context.

# ADMINISTRATIVE AUDIT LOG

Implement a durable administrative audit system.

Audit records should capture:

* actor;
* role/permission context;
* action;
* target;
* target type;
* timestamp;
* outcome;
* reason;
* request/correlation ID;
* relevant safe metadata.

High-risk financial and account actions require particularly strong auditability.

# AUDIT IMMUTABILITY

Audit records must not be casually mutable or deletable by ordinary administrative users.

Where legal retention or deletion requires changes:

* use controlled archival/anonymization;
* preserve audit integrity;
* record the administrative action itself.

# AUDIT SEARCH

Implement bounded administrative audit querying.

Support filters such as:

* actor;
* action;
* target;
* target type;
* time range;
* outcome;
* correlation ID.

Use cursor pagination.

Do not allow unrestricted full audit-table scans for ordinary requests.

# REPORTING DOMAIN

Implement backend reporting foundations for operational and marketplace metrics.

Reports may cover:

* sales;
* orders;
* refunds;
* returns;
* seller activity;
* catalog activity;
* inventory events;
* customer activity;
* reviews;
* moderation;
* notifications.

Do not build a complete data warehouse in this milestone.

# REPORTING DATA MODEL

Clearly separate:

* transactional source data;
* derived reporting aggregates;
* cached reports.

Reporting output must be traceable to authoritative sources.

Do not allow reporting tables to become the source of truth for orders or financial state.

# REPORT GENERATION

For small reports:

* use bounded queries;
* paginate;
* use appropriate database indexes.

For large reports:

* use asynchronous jobs;
* persist job state;
* provide status;
* generate output into controlled object storage;
* enforce authorization;
* support expiration.

Do not generate huge CSV/JSON responses synchronously.

# REPORT EXPORT SECURITY

Exports may contain sensitive information.

Implement:

* explicit permissions;
* export audit events;
* scoped data access;
* bounded expiration;
* secure download mechanism;
* object-storage access control.

Do not expose permanent public URLs.

# SELLER ANALYTICS FOUNDATION

Provide APIs/data structures for seller metrics such as:

* sales;
* orders;
* units sold;
* refunds;
* returns;
* ratings;
* inventory indicators where available.

Seller analytics must be filtered to the seller's own data.

Do not expose platform-wide metrics to ordinary sellers.

# ADMINISTRATIVE ANALYTICS

Provide operational metrics for platform operators such as:

* active sellers;
* order volume;
* payment outcomes;
* refund volume;
* return volume;
* moderation volume;
* notification delivery;
* inventory anomalies;
* API failures.

Use derived data where appropriate.

Do not perform expensive raw-table aggregation on every dashboard request when a safe aggregate path is available.

# FINANCIAL REPORTING BOUNDARY

Financial reporting must be derived from authoritative:

* orders;
* payments;
* refunds;
* seller financial records where implemented.

Do not recompute historical financial totals from mutable catalog or pricing data.

Clearly distinguish:

* gross order value;
* discounts;
* refunds;
* fees;
* net amounts.

Do not create unsupported accounting claims.

# REPORTING TIME SEMANTICS

Define:

* UTC/internal timestamps;
* requested reporting timezone;
* date-boundary behavior;
* inclusive/exclusive ranges.

Avoid inconsistent daily totals caused by mixed time zones.

# CONFIGURATION MANAGEMENT

Where platform configuration is administratively editable:

* define configuration keys;
* define value types;
* define allowed ranges;
* define authorization;
* define audit behavior;
* define rollout behavior.

Do not store arbitrary unvalidated configuration blobs for critical behavior.

# FEATURE FLAGS

Where feature flags are required:

* use explicit ownership;
* define default behavior;
* define environment scope;
* audit high-risk changes;
* avoid security-critical decisions depending on uncontrolled client flags.

Do not build a general feature-flag platform if the current product only needs a small controlled configuration mechanism.

# OPERATIONAL CONTROLS

Provide backend controls for operational incidents where appropriate.

Examples may include:

* temporarily disabling a problematic notification channel;
* pausing a queue consumer;
* restricting a compromised seller;
* disabling unsafe catalog publication;
* limiting a known abusive endpoint.

Operational controls must be:

* authorized;
* auditable;
* observable;
* reversible where safe.

# ADMIN API

Implement REST APIs for authorized administration.

Organize endpoints around:

* sellers;
* customers;
* moderation;
* reports;
* risk signals;
* audit;
* operational controls;
* reporting.

Do not create one unrestricted `/admin/*` endpoint that bypasses domain authorization.

# ADMIN API SECURITY

Administrative API requests must enforce:

* authentication;
* permission;
* resource scope;
* rate limiting where appropriate;
* audit;
* safe serialization.

Do not return database entities directly.

# PAGINATION

All administrative list endpoints must use bounded pagination.

Prefer cursor pagination for large datasets.

Never allow:

* unlimited page sizes;
* unrestricted offset scans on massive tables;
* arbitrary sort fields that lack indexes.

# DATABASE SCHEMA

Implement schema changes for:

* administrative roles/permissions where missing;
* seller verification state;
* seller restrictions;
* moderation cases;
* reports;
* risk signals;
* administrative audit;
* operational controls;
* report jobs;
* report metadata;
* export records;
* blocking relationships where applicable;
* configuration records where applicable.

Do not duplicate authorization entities that already exist.

# DATABASE INDEXING

Index actual operational access patterns including:

* seller verification state;
* seller restriction state;
* report state;
* target;
* moderation state;
* risk severity;
* risk subject;
* audit actor;
* audit target;
* audit timestamp;
* report job state;
* export expiration.

Avoid indexing unlimited free-form fields.

# TRANSACTIONS

Use transactions for:

* moderation action + audit + domain-event creation;
* seller restriction + audit;
* customer restriction + audit;
* permission changes + audit;
* configuration changes + audit.

Do not hold transactions over long-running report generation or external object storage.

# EVENT ARCHITECTURE

Emit appropriate administrative events such as:

* SellerVerificationApproved
* SellerVerificationRejected
* SellerSuspended
* SellerReactivated
* CustomerRestricted
* CustomerRestored
* ModerationCaseCreated
* ModerationActionApplied
* RiskSignalCreated
* RiskRestrictionApplied
* AdministrativeConfigurationChanged
* ReportGenerated
* ExportCreated

Use the project's canonical event envelope.

Administrative event payloads must not expose unnecessary sensitive information.

# EVENT SECURITY

Administrative events may contain highly sensitive context.

Limit event payloads to the minimum required.

Use opaque IDs and references where detailed data can be fetched through authorized systems.

# QUEUES

Implement asynchronous jobs where necessary for:

* report generation;
* bulk moderation;
* bulk restrictions;
* export generation;
* risk-signal aggregation;
* cleanup;
* operational reconciliation.

Each job must preserve:

* initiating actor;
* authorization scope;
* job identity;
* target scope;
* idempotency.

# REPORT JOB LIFECYCLE

Implement explicit report-job states such as:

* queued;
* running;
* completed;
* failed;
* expired;
* cancelled.

Do not leave abandoned jobs permanently in a running state.

# EXPORT LIFECYCLE

Export records should track:

* requester;
* scope;
* requested time;
* status;
* object-storage key;
* expiration;
* download count where appropriate;
* completion metadata.

Use short-lived controlled access.

# REDIS

Use Redis only for justified operational capabilities such as:

* administrative rate limiting;
* short-lived locks;
* job coordination;
* caching of safe dashboard data where necessary.

Do not use Redis as the authoritative source for audit, moderation, seller restrictions, or financial reports.

# SECURITY

Protect against:

* privilege escalation;
* admin IDOR;
* cross-seller access;
* report tampering;
* audit manipulation;
* unauthorized exports;
* bulk-operation abuse;
* administrative API brute force;
* configuration abuse;
* risk-control bypass.

Use:

* least privilege;
* explicit scopes;
* server-side authorization;
* immutable/auditable actions;
* rate limiting;
* secure serialization.

# SENSITIVE DATA

Administrative and reporting systems must apply data minimization.

Do not expose unnecessarily:

* passwords;
* access tokens;
* refresh tokens;
* secret keys;
* complete payment credentials;
* private customer content;
* sensitive seller verification data.

Use role-specific DTOs.

# OPERATIONAL SECURITY

Every high-risk administrative action must produce sufficient telemetry to investigate:

* who;
* what;
* when;
* which resource;
* why;
* result.

Do not rely solely on application logs.

# OBSERVABILITY

Instrument:

* administrative requests;
* permission denials;
* seller restrictions;
* moderation throughput;
* risk signals;
* report generation;
* export jobs;
* administrative configuration changes;
* audit writes;
* bulk-operation failures.

Use:

* structured logs;
* metrics;
* traces;
* correlation IDs.

Never log secrets or unnecessary sensitive data.

# METRICS

Track:

* administrative request volume;
* authorization failures;
* moderation queue depth;
* report volume;
* report processing latency;
* seller verification backlog;
* seller suspension/reactivation counts;
* bulk-job throughput;
* export failures;
* report-generation duration;
* fraud/risk signal volume.

Avoid high-cardinality dimensions.

# RELIABILITY

Administrative workflows must tolerate:

* duplicate requests;
* worker restart;
* database transient failure;
* duplicate jobs;
* event replay;
* long-running report generation;
* object-storage failure;
* authorization configuration changes.

A failed report generation must not corrupt source transactional data.

# BULK OPERATION SAFETY

For every bulk operation:

* constrain input size;
* validate actor permissions;
* validate every target;
* create a durable job;
* preserve partial results;
* support retry;
* prevent duplicate application;
* expose failure details securely.

Do not wrap thousands of records in one long transaction.

# MODERATION SAFETY

Moderation must preserve the distinction between:

* report;
* case;
* decision;
* action;
* underlying resource.

Do not delete source business records merely because content is moderated unless the authoritative domain explicitly supports permanent removal.

# CUSTOMER/SELLER RESTRICTION SAFETY

Restrictions must be reversible where policy allows.

Every restriction should record:

* reason;
* actor;
* applied time;
* expiration where applicable;
* current state.

Avoid boolean fields such as `isBlocked` as the only representation of complex restrictions.

# ANALYTICS CONSISTENCY

Operational analytics must use explicit metric definitions.

For each important metric document:

* source data;
* calculation;
* time semantics;
* inclusion/exclusion;
* update behavior.

Do not create conflicting definitions of "sales", "orders", "refunds", or "active sellers".

# REPORTING PERFORMANCE

Use:

* indexed queries;
* aggregate tables where justified;
* asynchronous processing;
* bounded date ranges.

Do not perform unbounded full-table scans during ordinary administrative requests.

# CACHE POLICY

If dashboard/report results are cached:

* define TTL;
* define invalidation;
* define source of truth;
* define stale tolerance.

Never cache sensitive administrative data without explicit authorization and isolation.

# API DOCUMENTATION

Document all administrative, moderation, reporting, seller-operations, and operational-control APIs.

Documentation must include:

* authorization requirements;
* input;
* output;
* pagination;
* error behavior;
* high-risk operation semantics.

Do not document endpoints that do not exist.

# TESTING

Create meaningful tests.

## Seller Administration

Test:

* seller lookup;
* verification workflow;
* suspension;
* reactivation;
* permission boundaries;
* cross-seller access denial.

## Customer Administration

Test:

* customer lookup;
* restriction;
* restoration;
* authorization;
* sensitive-field exclusion.

## Moderation

Test:

* report creation;
* case creation;
* moderation transitions;
* action authorization;
* duplicate reports;
* audit creation;
* domain-event generation.

## Risk/Abuse

Test:

* signal creation;
* restriction decisions;
* authorization;
* duplicate handling;
* rate limiting.

## Audit

Test:

* high-risk action logging;
* actor attribution;
* target attribution;
* immutability protections;
* query authorization.

## Reporting

Test:

* metric calculations;
* date boundaries;
* seller isolation;
* report-job lifecycle;
* export authorization;
* expiration;
* failed jobs.

## Bulk Operations

Test:

* batch limits;
* authorization;
* duplicate jobs;
* partial failures;
* retry;
* actor propagation.

## Security

Test:

* administrative IDOR;
* privilege escalation;
* unauthorized exports;
* cross-seller data access;
* unsafe configuration changes.

Tests must validate actual authorization and state behavior.

# MIGRATIONS

Create deterministic migrations for the current administrative scope.

Preserve existing security and domain data.

Do not introduce destructive changes unrelated to this milestone.

# PERFORMANCE

Administrative APIs must use bounded queries.

Avoid:

* unrestricted audit queries;
* unbounded report generation;
* full-table listing of users or sellers;
* N+1 permission checks.

Use:

* pagination;
* indexed filtering;
* precomputed aggregates where useful;
* asynchronous processing for heavy tasks.

# DOCUMENTATION

Update documentation for:

* administrative roles;
* permissions;
* seller verification;
* restrictions;
* moderation;
* reports;
* risk signals;
* audit;
* report jobs;
* exports;
* configuration controls;
* APIs;
* operational procedures.

Documentation must reflect the actual repository implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake reporting data;
* fake moderation state;
* fake administrative authorization;
* placeholder fraud logic;
* fake export generation;
* TODO implementation gaps;
* pseudo-code;
* omitted business logic;
* "implement later".

Complete all functionality within the current scope.

# NO HARDCODED SECRETS

Never hardcode:

* administrator credentials;
* API keys;
* provider secrets;
* database credentials;
* signing keys;
* cloud credentials.

Use secure configuration.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* type checking;
* unit tests;
* integration tests;
* migrations;
* API/OpenAPI validation;
* authorization tests;
* job tests;
* build validation.

Where external systems are unavailable:

* perform all local validation;
* document exact external limitations;
* do not claim external provisioning or live execution.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* administrative modules;
* seller-operation changes;
* verification changes;
* moderation changes;
* report changes;
* risk/abuse changes;
* audit changes;
* configuration changes;
* database schema changes;
* migrations;
* API endpoints;
* events;
* queues/jobs;
* Redis changes;
* authorization/security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* compatibility considerations;
* unresolved issues;
* external dependencies.

Do not claim that a complete analytics warehouse, ML fraud engine, or production infrastructure was implemented unless it actually belongs to and was completed within this prompt.

# DEFINITION OF DONE

This milestone is complete only when:

* administrative permissions are explicit;
* seller administration is implemented;
* seller verification workflow foundation is implemented;
* seller restrictions are implemented;
* customer administration is implemented;
* moderation cases and actions are implemented;
* reporting/abuse submission is implemented;
* deterministic risk/abuse signals are implemented;
* high-risk actions are auditable;
* administrative audit is implemented;
* reporting APIs are implemented;
* asynchronous report/export jobs are implemented where required;
* administrative search/filtering is bounded;
* seller analytics foundations are implemented;
* operational analytics foundations are implemented;
* bulk operations are safely bounded;
* authorization is enforced;
* privacy is enforced;
* observability is present;
* migrations are valid;
* critical security and authorization behavior is tested;
* validation passes where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the administration, seller operations, moderation, abuse-control, audit, reporting, and operational analytics backend scope defined by this prompt.

Do not implement complete web or mobile administration clients.

Do not implement a machine-learning fraud system or a full analytics warehouse.

Preserve compatible existing functionality.

Enforce least privilege and explicit administrative authorization.

Treat audit records and operational state as security-sensitive data.

Do not hardcode secrets.

Do not fabricate analytics, moderation, exports, or external infrastructure.

Do not leave intentional placeholders, TODO implementation gaps, fake authorization, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
