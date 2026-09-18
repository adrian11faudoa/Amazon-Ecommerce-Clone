# Amazon-Style Ecommerce Marketplace — Backend Prompt — Volume 1

# ROLE

You are the Staff Backend Engineering team responsible for implementing the first bounded backend milestone of a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Backend Engineer
* Database Engineer
* Distributed Systems Engineer
* Security Engineer
* Performance Engineer
* Reliability Engineer
* Observability Engineer
* QA Engineer

This is a backend implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future backend domains merely because they belong to the completed product.

Do not implement web, mobile, infrastructure, or QA-platform work outside the backend testing required by this milestone.

# PROJECT

The project is an original production-grade ecommerce marketplace platform intended to support:

* millions of customers;
* thousands of sellers;
* large product catalogs;
* seller organizations and seller staff;
* product variants and SKUs;
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
* BullMQ where asynchronous jobs are required
* Elasticsearch or OpenSearch for the eventual search subsystem
* S3-compatible object storage for media
* Stripe or equivalent payment-provider abstraction
* OpenTelemetry-compatible observability

This milestone focuses on the backend foundation and identity/access domain.

# SOURCE OF TRUTH

If a repository is available, inspect it first.

Determine:

* current backend structure;
* package configuration;
* NestJS configuration;
* module organization;
* Prisma configuration;
* database schema;
* migrations;
* environment configuration;
* authentication code;
* authorization code;
* shared utilities;
* validation;
* exception handling;
* logging;
* tests;
* API documentation;
* existing infrastructure assumptions.

The repository is authoritative for what currently exists.

Do not assume that earlier architecture prompts were executed.

Do not assume that an implementation exists merely because an architecture document describes it.

Use the architecture contracts represented in the repository where available, while keeping the concrete contracts in this prompt authoritative for this milestone.

If the repository contains incompatible implementation decisions, preserve working behavior where possible and make only the changes necessary to establish the current scope.

# CURRENT EXECUTION SCOPE

Implement the foundational backend platform required for secure identity, account access, session management, authorization, and common application infrastructure.

The scope includes:

* NestJS backend foundation;
* configuration system;
* structured application bootstrap;
* global validation;
* canonical API error handling;
* correlation/request identifiers;
* database integration foundation;
* Prisma integration;
* Redis integration foundation;
* common security middleware/guards;
* customer identity;
* seller organization identity;
* seller staff identity;
* authentication;
* session management;
* access and refresh-token lifecycle;
* password-based account access;
* email-verification foundation;
* password-reset foundation;
* authorization foundation;
* RBAC/permission model;
* seller isolation;
* audit foundation for security-sensitive actions;
* rate limiting foundation;
* health/readiness foundation;
* structured logging foundation;
* OpenTelemetry-compatible tracing hooks;
* unit/integration tests for this scope.

The milestone must establish reusable backend foundations for later domain implementation.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* product catalog functionality;
* product variants;
* SKU management;
* inventory management;
* pricing;
* promotions;
* carts;
* checkout;
* orders;
* payments;
* refunds;
* shipping;
* fulfillment;
* returns;
* reviews;
* search;
* media-processing pipelines;
* seller storefront functionality;
* customer-facing web UI;
* mobile UI;
* production Kubernetes infrastructure;
* production AWS provisioning;
* complete analytics;
* complete moderation systems.

Later milestones will build those domains on top of this backend foundation.

Do not create fake implementations for those domains simply to demonstrate extensibility.

# ENGINEERING REQUIREMENTS

The implementation must be:

* production-grade;
* strongly typed;
* modular;
* testable;
* secure by default;
* observable;
* horizontally scalable;
* compatible with future domain modules;
* migration-safe;
* operationally realistic.

Avoid unnecessary framework complexity.

Do not create abstractions solely for theoretical future use.

# BACKEND STRUCTURE

Establish a maintainable NestJS structure with clear separation between:

* application/bootstrap concerns;
* configuration;
* shared/common infrastructure;
* identity/access domain;
* persistence;
* authorization;
* observability;
* testing.

Use dependency direction that prevents domain code from becoming tightly coupled to transport or infrastructure details.

Where appropriate, establish boundaries for future modules without implementing those future modules.

# APPLICATION BOOTSTRAP

Implement a production-ready NestJS bootstrap process.

It must establish:

* environment loading;
* validated configuration;
* global validation;
* structured exception handling;
* request/correlation ID behavior;
* secure HTTP configuration;
* graceful shutdown;
* health/readiness registration;
* logging initialization;
* tracing initialization where appropriate;
* API versioning if used by the current project contract;
* OpenAPI initialization where appropriate.

The bootstrap must fail safely when required configuration is missing or invalid.

Do not silently fall back to insecure production values.

# CONFIGURATION SYSTEM

Implement typed and validated configuration.

Configuration must distinguish:

* application settings;
* database settings;
* Redis settings;
* authentication settings;
* token/session settings;
* rate limiting;
* observability;
* external URLs where required.

Sensitive values must be loaded through environment configuration or a supported secrets mechanism.

Never hardcode:

* JWT signing secrets;
* database passwords;
* Redis passwords;
* encryption keys;
* API keys;
* provider credentials.

Configuration validation must fail at startup when a required production setting is invalid.

Provide safe non-secret development defaults only where technically appropriate.

# DATABASE INTEGRATION

Implement the PostgreSQL/Prisma foundation.

Establish:

* Prisma service;
* connection lifecycle;
* startup validation;
* graceful shutdown;
* transaction support;
* configuration-driven database access;
* logging/observability hooks appropriate to the environment.

Avoid leaking raw database credentials into logs.

Database access must not be duplicated through uncontrolled client instantiation.

Use one appropriately managed Prisma client lifecycle per application process unless the architecture requires otherwise.

# INITIAL DATABASE DOMAIN

Implement the persistence model required by this milestone.

At minimum establish entities supporting:

* user/account identity;
* customer profile;
* seller organization;
* seller user membership;
* credentials;
* email verification;
* password reset;
* session or refresh-token state;
* roles/permissions as appropriate;
* audit/security events.

The exact schema must preserve clear domain ownership.

Avoid adding speculative tables for product, inventory, order, payment, or other future domains unless a minimal reference is structurally necessary.

# USER IDENTITY MODEL

Implement a canonical account identity model.

It must support:

* stable user ID;
* email identity;
* normalized email representation;
* account status;
* password credential metadata;
* email-verification state;
* created/updated timestamps;
* security-related timestamps where useful;
* soft deletion or deactivation semantics where architecturally required.

Do not treat email address casing or whitespace inconsistently.

Define the normalization rules centrally.

Prevent duplicate logical accounts under the canonical email identity.

# CUSTOMER PROFILE

Implement a customer-profile boundary separate from authentication credentials where appropriate.

Support:

* user ownership;
* display/profile fields appropriate to the current scope;
* lifecycle status;
* timestamps.

Do not add ecommerce-specific profile fields that belong to later domains.

# SELLER ORGANIZATION

Implement the initial seller organization model.

Support:

* stable organization ID;
* display/legal identity fields required by the current scope;
* lifecycle state;
* created/updated timestamps;
* organization ownership.

Do not implement complete seller onboarding, catalog, inventory, settlements, or storefront functionality in this milestone.

# SELLER MEMBERSHIP

Implement seller-user membership.

Support:

* user;
* seller organization;
* membership state;
* role or role assignment;
* timestamps;
* unique membership constraints.

A user may belong to multiple organizations only if the domain model permits it.

Authorization must always resolve the active organization context explicitly when a seller-scoped action is performed.

# AUTHENTICATION

Implement secure password-based authentication for the current backend foundation.

At minimum provide:

* account registration;
* sign-in;
* credential verification;
* authentication failure handling;
* session creation;
* access-token issuance;
* refresh-token lifecycle;
* logout;
* session revocation.

Use a modern password hashing algorithm supported by a maintained library.

Never store plaintext passwords.

Never return password hashes.

Do not log authentication credentials.

# EMAIL VERIFICATION

Implement the backend foundation for email verification.

Support:

* verification token creation;
* secure storage or hashed token representation;
* expiration;
* one-time consumption;
* verification state transition;
* resend behavior;
* rate limiting;
* audit logging where appropriate.

Do not send real production email unless the repository already contains a configured provider integration.

Provide the provider boundary and implementation needed for the current scope without fabricating external delivery success.

# PASSWORD RESET

Implement password-reset functionality.

Support:

* reset-request initiation;
* secure token generation;
* token expiration;
* one-time consumption;
* password replacement;
* session invalidation where appropriate;
* rate limiting;
* anti-enumeration behavior;
* audit/security events.

Do not reveal whether an email belongs to an account through observable API differences where doing so would create account-enumeration risk.

# SESSION MANAGEMENT

Implement robust session management.

Sessions must support:

* unique session identity;
* user association;
* issuance metadata;
* expiration;
* revocation;
* last-used tracking where appropriate;
* device metadata where appropriate without collecting unnecessary personal information;
* refresh-token rotation or equivalent replay-resistant behavior;
* logout;
* global revocation capability.

Refresh-token storage must use a design that prevents straightforward database disclosure from becoming bearer-token disclosure.

Consider storing hashed refresh-token identifiers or an equivalent secure representation.

# TOKEN ARCHITECTURE

Implement access and refresh tokens according to the project's security model.

Access tokens should be:

* short-lived;
* signed using a configured secret/key mechanism;
* validated server-side;
* rejected after expiration.

Refresh tokens must:

* have explicit expiration;
* be revocable;
* support rotation;
* be bound to the appropriate session;
* detect replay where appropriate.

Do not hardcode signing keys.

Do not use weak token secrets.

# AUTHENTICATION ENDPOINTS

Implement the REST endpoints required for this milestone.

The endpoint design must follow consistent conventions.

At minimum support operations equivalent to:

* register;
* login;
* refresh;
* logout;
* current authenticated user;
* verify email;
* resend verification;
* request password reset;
* complete password reset.

Use appropriate HTTP semantics.

Document:

* authentication requirements;
* request schema;
* response schema;
* error behavior;
* rate limits;
* idempotency where applicable.

# API VALIDATION

Use explicit DTO/request-schema validation.

Validate:

* email;
* password;
* token formats;
* IDs;
* organization identifiers;
* role/permission values;
* optional fields.

Reject invalid input before it reaches business logic.

Do not rely on database constraint errors as the primary API validation mechanism.

# CANONICAL ERROR HANDLING

Implement the project's structured API error behavior.

Errors must expose stable machine-readable codes.

Include a request/correlation identifier.

Support categories such as:

* validation failure;
* authentication failure;
* authorization failure;
* resource not found;
* conflict;
* rate limit;
* dependency failure;
* internal failure.

Do not expose:

* stack traces;
* SQL queries;
* database credentials;
* internal file paths;
* secrets;
* raw provider failures.

# AUTHORIZATION FOUNDATION

Implement server-side authorization infrastructure.

Support:

* roles;
* permissions;
* policy/guard enforcement;
* resource ownership checks;
* seller-organization isolation.

Do not rely only on controller decorators for authorization.

Authorization decisions must be capable of evaluating:

* authenticated identity;
* role;
* permission;
* organization membership;
* resource ownership;
* administrative scope.

# ROLE MODEL

Establish the initial role model for the project.

At minimum support the conceptual roles:

* customer;
* seller user;
* seller administrator;
* support agent;
* moderator;
* platform administrator.

Do not grant broad administrative permissions merely to simplify development.

Permissions should follow least privilege.

# PERMISSION MODEL

Define stable permission identifiers appropriate to the implemented foundation.

Examples may include permissions around:

* profile access;
* seller organization access;
* seller membership management;
* platform administration;
* moderation;
* support operations.

Do not invent permissions for future domains unless their presence is required to establish stable authorization architecture.

Future domains must be able to add permissions without redesigning the authorization subsystem.

# SELLER ISOLATION

Enforce strict organization-level data isolation.

A seller user must not be able to access another seller organization's data merely by changing an organization ID in a request.

Every seller-scoped resource lookup must enforce the authenticated user's membership and authorization.

Do not rely on client-supplied organization identifiers alone.

# ADMINISTRATIVE ACCESS

Administrative roles must have explicit authorization boundaries.

High-risk operations must be:

* authorized;
* auditable;
* observable.

Do not create universal superuser bypass logic that cannot be audited.

If a break-glass mechanism is architecturally necessary, keep it explicit and tightly controlled.

# RATE LIMITING

Implement backend rate limiting appropriate to this milestone.

At minimum cover:

* login;
* registration;
* password reset;
* email verification;
* token refresh;
* sensitive authentication endpoints.

Use Redis-backed rate limiting where that fits the selected architecture.

Define:

* key strategy;
* scope;
* window;
* burst behavior;
* response semantics.

Rate-limit identifiers must avoid trusting unvalidated client-provided identity data.

# SECURITY EVENTS AND AUDIT

Implement foundational security/audit records for important actions such as:

* account registration;
* authentication success/failure;
* password changes;
* password reset;
* email verification;
* session creation;
* session revocation;
* permission changes;
* seller membership changes;
* administrative authentication.

Audit records should capture appropriate:

* actor;
* action;
* target;
* timestamp;
* outcome;
* request/correlation ID;
* safe metadata.

Do not store passwords, tokens, or secrets.

# PASSWORD SECURITY

Enforce reasonable password policy and secure handling.

The backend must:

* hash using a modern password hashing algorithm;
* use configured work factors appropriate to the selected library;
* avoid exposing password-policy internals unnecessarily;
* prevent reuse of invalidated reset tokens;
* invalidate relevant sessions after credential compromise or reset.

Do not implement custom password cryptography.

# BRUTE-FORCE PROTECTION

Authentication endpoints must resist:

* brute-force attacks;
* credential stuffing;
* rapid reset attempts;
* verification-token abuse.

Use:

* rate limiting;
* generic authentication errors;
* session controls;
* security event logging;
* appropriate lockout/throttling strategy.

Do not build a permanent lockout mechanism that enables trivial account-denial attacks.

# EMAIL ENUMERATION PROTECTION

Registration, password reset, and verification flows must be designed so attackers cannot trivially discover account existence through response differences.

Use appropriate:

* generic responses;
* timing-conscious handling;
* rate limiting.

Where business requirements legitimately require a different UX, document the security tradeoff.

# REDIS INTEGRATION

Establish a reusable Redis integration layer.

This layer must support future:

* caching;
* rate limiting;
* locks;
* ephemeral workflows;
* session coordination.

For the current milestone, use Redis only for functionality actually implemented.

Define and namespace keys.

Do not create arbitrary keys throughout controllers and services.

# REDIS FAILURE BEHAVIOR

Authentication-critical Redis dependencies must have explicit failure behavior.

For example:

* rate limiting must fail safely rather than silently disabling protection;
* ephemeral session operations must fail predictably;
* the system must not accidentally treat a Redis outage as proof of authorization.

Document and test the selected behavior.

# OBSERVABILITY

Implement foundational observability for this backend milestone.

Include:

* structured logging;
* request/correlation IDs;
* authentication metrics;
* rate-limit metrics;
* database health metrics where practical;
* Redis health metrics where practical;
* tracing hooks;
* error instrumentation.

Sensitive authentication data must not appear in telemetry.

Never log:

* passwords;
* raw access tokens;
* raw refresh tokens;
* password-reset tokens;
* email-verification tokens;
* secrets.

# HEALTH AND READINESS

Implement health endpoints appropriate to the backend foundation.

Provide separate concepts for:

* process liveness;
* application readiness.

Readiness must verify the dependencies required for safe request processing.

Avoid making liveness fail merely because a recoverable external dependency is temporarily unavailable.

# GRACEFUL SHUTDOWN

Implement graceful shutdown.

Handle:

* HTTP connection draining;
* database disconnect;
* Redis disconnect;
* worker termination where relevant;
* in-flight request completion where practical.

Do not terminate processes in a way that corrupts active transactional work.

# API DOCUMENTATION

Document the current authentication and identity API surface using Swagger/OpenAPI or the project's established equivalent.

The documentation must accurately reflect:

* request schemas;
* response schemas;
* authentication;
* error responses;
* endpoint purpose.

Do not document endpoints that do not exist.

# TESTING

Create meaningful tests for the current scope.

At minimum cover:

## Authentication

* successful registration;
* duplicate account handling;
* invalid credentials;
* successful login;
* expired access token;
* invalid access token;
* refresh flow;
* refresh-token rotation;
* revoked session;
* logout;
* replayed refresh token where applicable.

## Verification

* successful verification;
* expired token;
* invalid token;
* reused token;
* resend rate limit.

## Password Reset

* reset request;
* generic account-enumeration-safe response;
* expired token;
* invalid token;
* reused token;
* successful password reset;
* relevant session invalidation.

## Authorization

* authenticated versus unauthenticated access;
* role enforcement;
* permission enforcement;
* seller organization isolation;
* administrative restrictions.

## Security

* rate limiting;
* malformed input;
* authorization bypass attempts;
* sensitive-data leakage prevention where testable.

## Persistence

* unique constraints;
* transaction behavior;
* session persistence;
* migration validity.

## Infrastructure

* configuration validation;
* database startup behavior;
* Redis behavior;
* readiness behavior;
* graceful shutdown behavior where testable.

Tests must verify actual behavior.

Do not create tests that merely mock the entire implementation and assert that mocks were called.

# DATABASE MIGRATIONS

Create the migrations required by this milestone.

Migrations must be:

* deterministic;
* repeatable in normal deployment workflows;
* safe for the current scope;
* appropriately indexed;
* constrained;
* compatible with the implementation.

Do not make destructive schema changes outside the current scope.

# INDEXING

Add database indexes required for actual access patterns.

At minimum evaluate indexes for:

* normalized email lookup;
* session lookup;
* session expiration;
* seller membership;
* organization membership;
* verification token lookup;
* password-reset lookup;
* audit filtering.

Do not blindly index every field.

# TRANSACTION REQUIREMENTS

Use explicit database transactions where multiple state changes must remain consistent.

Authentication examples include:

* session creation;
* refresh-token rotation;
* credential reset with session invalidation;
* seller membership updates.

Do not wrap unrelated operations into unnecessarily large transactions.

# CONCURRENCY

Account and session flows must remain correct under concurrent requests.

Handle cases such as:

* duplicate registration races;
* simultaneous refresh;
* repeated password reset;
* simultaneous session revocation;
* repeated verification requests.

Use database constraints and transactional logic rather than relying on application-level timing assumptions.

# IDEMPOTENCY

Apply idempotency where applicable.

Important examples include:

* refresh-token operations;
* logout;
* email verification;
* password reset completion;
* invitation or membership operations if implemented.

Do not force idempotency onto operations where it has no meaningful purpose.

# EXTERNAL EMAIL PROVIDER BOUNDARY

If the repository already has a configured email provider:

* integrate through its existing abstraction;
* validate provider errors;
* apply safe retries where appropriate;
* do not leak provider-specific details through domain APIs.

If no provider exists:

* implement a production-ready provider abstraction;
* implement the necessary message payloads;
* make delivery configuration-driven;
* do not fabricate successful external delivery;
* clearly report that live delivery depends on provider configuration.

# API SECURITY

Apply appropriate HTTP security controls including, where applicable:

* secure headers;
* body-size limits;
* input validation;
* trusted proxy configuration;
* CORS configuration;
* request limits;
* authentication guards;
* authorization guards.

Do not use a permissive production CORS policy simply to simplify local development.

# CORS

Make CORS configuration environment-aware.

Do not use unrestricted wildcard origins for authenticated production APIs.

Allowed origins must be configuration-driven.

# REQUEST CONTEXT

Establish a request context that can carry:

* request ID;
* correlation ID;
* authenticated user ID;
* organization ID where appropriate;
* trace context.

Do not place sensitive tokens or credentials in the context.

# SERVICE ERROR TRANSLATION

Infrastructure/provider errors must be translated into stable domain/API errors.

Do not allow:

* raw Prisma errors;
* raw Redis errors;
* raw provider exceptions;

to leak into public API responses.

Preserve the underlying failure in secure structured telemetry.

# LOGGING

Implement structured logs with consistent fields such as:

* timestamp;
* level;
* service;
* environment;
* request ID;
* correlation ID;
* operation;
* outcome.

Avoid high-cardinality data when it adds little operational value.

Never log secrets.

# SECURITY CONFIGURATION

Provide configuration for:

* token lifetime;
* refresh lifetime;
* session lifetime;
* password-reset token lifetime;
* verification token lifetime;
* rate limits;
* cookie security behavior if cookies are used;
* allowed origins;
* trusted proxies where relevant.

Do not silently choose insecure production settings.

# API AUTHENTICATION TRANSPORT

Use the project's selected token transport consistently.

If access and refresh tokens use cookies:

* configure HttpOnly where appropriate;
* configure Secure in production;
* apply SameSite behavior appropriate to the deployment;
* protect state-changing operations against CSRF where required.

If tokens use authorization headers:

* enforce secure storage expectations on clients;
* never place tokens in URLs;
* never log authorization headers.

The chosen model must be documented and applied consistently.

# CUSTOMER AND SELLER ACCOUNT SEPARATION

Do not create separate authentication systems for customers and sellers unless a justified architectural requirement exists.

Use one coherent identity model with:

* account identity;
* organization membership;
* roles;
* permissions.

The same user may have customer and seller relationships if the business model permits it.

Authorization must determine what the user may do in each context.

# DATA PRIVACY

Ensure this milestone protects:

* email;
* profile information;
* security metadata;
* session data;
* seller organization information.

Do not expose sensitive fields through generic serialization.

Use explicit response DTOs rather than returning database entities blindly.

# SERIALIZATION

Do not return Prisma models directly from controllers where that risks exposing:

* password hashes;
* internal identifiers;
* security metadata;
* audit data;
* internal timestamps not intended for clients.

Use explicit response schemas.

# API RESPONSE CONSISTENCY

Successful responses must follow the project's API conventions consistently.

Do not create unrelated response envelopes for each endpoint.

Choose the established response model from the project architecture and implement it consistently in this milestone.

# FUTURE-DOMAIN COMPATIBILITY

The foundation must support later implementation of:

* catalog;
* inventory;
* pricing;
* cart;
* checkout;
* orders;
* payments;
* shipping;
* returns;
* reviews;
* notifications;
* administration;
* moderation;
* analytics.

Do not create coupling that would require these future domains to access authentication internals directly.

Expose reusable authentication and authorization services/guards through stable internal contracts.

# MODULE BOUNDARIES

Keep identity/access responsibilities separated into logical modules such as:

* Auth
* Users
* Sessions
* Organizations
* Seller Memberships
* Authorization
* Audit
* Configuration
* Infrastructure
* Observability

The exact folder structure may vary according to the repository, but dependency direction must remain clear.

Avoid one giant AuthService containing every domain concern.

# CODE QUALITY

Require:

* strict TypeScript;
* explicit types;
* deterministic behavior;
* clear service boundaries;
* dependency injection;
* small cohesive modules;
* testability;
* meaningful abstractions.

Avoid:

* any-type escapes;
* duplicated authorization logic;
* hidden global state;
* hardcoded configuration;
* unnecessary static state;
* business logic inside controllers;
* database calls directly from controllers.

# PERFORMANCE

This milestone must remain efficient under concurrent authentication traffic.

Consider:

* indexed email lookups;
* password-hashing cost;
* session queries;
* Redis rate limiting;
* connection pools;
* efficient DTO validation;
* bounded request size.

Do not weaken password hashing merely to improve benchmark results without an explicit security/performance decision.

# RELIABILITY

Authentication is a critical platform dependency.

Design for:

* database transient failures;
* Redis failures;
* malformed requests;
* token replay;
* duplicate requests;
* provider failures;
* application restarts.

Critical security state must never become inconsistent because of partial operations.

# DOCUMENTATION

Update backend documentation as necessary.

Document:

* local configuration;
* required environment variables;
* authentication endpoints;
* token/session behavior;
* authorization model;
* database migration instructions;
* Redis requirements;
* testing commands;
* operational constraints.

Documentation must describe the implementation actually present in the repository.

# NO UNRELATED IMPLEMENTATION

Do not use this milestone as an opportunity to:

* refactor the whole repository;
* redesign the architecture;
* replace the project's ORM;
* introduce unrelated microservices;
* implement catalog;
* implement checkout;
* implement payments;
* rewrite frontend code;
* provision production infrastructure.

Only make supporting changes that are genuinely required by the current backend foundation.

# VALIDATION

Before completion, execute the repository's applicable validation commands.

At minimum perform, where supported:

* formatting validation;
* linting;
* TypeScript type checking;
* unit tests;
* integration tests for the affected backend scope;
* database migration validation;
* build validation.

If a validation step cannot be executed because of an external dependency:

* identify the exact dependency;
* do not claim the validation passed;
* perform every available local validation;
* report the limitation.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* backend modules created or changed;
* database schema changes;
* migrations created;
* API endpoints added or changed;
* authentication changes;
* authorization changes;
* Redis changes;
* configuration changes;
* security changes;
* observability changes;
* tests created;
* tests executed;
* validation performed;
* compatibility considerations;
* unresolved issues;
* external dependencies that still require configuration.

Do not claim functionality outside this prompt was implemented.

Do not claim external email delivery, cloud provisioning, or other external operations occurred unless they were actually verified.

# DEFINITION OF DONE

This backend milestone is complete only when:

* the NestJS backend foundation is operational;
* configuration is validated;
* PostgreSQL/Prisma integration is operational;
* Redis integration required by this scope is operational;
* identity models are implemented;
* authentication is implemented securely;
* sessions and refresh-token lifecycle are implemented;
* email verification foundation is implemented;
* password reset is implemented;
* authorization infrastructure is implemented;
* seller organization isolation is enforced;
* rate limiting is implemented for sensitive authentication endpoints;
* audit/security events are implemented for the defined scope;
* structured errors are implemented;
* health/readiness are implemented;
* structured observability is implemented;
* migrations are valid;
* tests cover the critical behavior;
* type checking, linting, tests, and build validation pass where executable;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the backend foundation and identity/access scope defined by this prompt.

Do not implement future ecommerce domains.

Do not implement frontend, mobile, or production infrastructure work outside changes strictly required to establish this backend foundation.

Preserve compatible existing functionality.

Use secure production-grade patterns.

Do not fabricate external service access or validation results.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, fake authentication, pseudo-code, or omitted implementation within the current scope.

Run the applicable validation commands.

Provide the required completion report accurately describing what was implemented and what remains externally dependent.
