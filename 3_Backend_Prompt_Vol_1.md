You are operating in Senior Engineering Team Mode.

Build the production-ready backend foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, domain boundaries, database ownership, API contracts, payment architecture, inventory architecture, seller architecture, event architecture, and security model.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

This volume establishes the backend foundation and shared platform infrastructure.

────────────────────────────────────────

MISSION

Build the production-ready backend foundation required for the ecommerce marketplace.

The backend will eventually support:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Seller payouts
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• Moderation
• CMS
• Multi-region deployment

This volume establishes the shared backend foundation required by all later backend domains.

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

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

Payments:

• Stripe
• Stripe Connect or approved marketplace-payment architecture

Object Storage:

• AWS S3-compatible object storage

Background Jobs:

• BullMQ

Event Streaming:

• Kafka or Redpanda where justified

API:

• REST
• Webhooks
• Server-Sent Events where appropriate
• WebSockets where appropriate

Documentation:

• OpenAPI / Swagger

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools where appropriate

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

Keep business logic out of controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use graceful shutdown.

Use production-safe configuration.

────────────────────────────────────────

BACKEND ARCHITECTURE

Use:

• Clean Architecture
• Domain-Driven Design
• SOLID
• Repository Pattern
• Service Layer
• Dependency Injection
• Feature-first organization
• Explicit domain boundaries
• CQRS where justified
• Event-driven architecture where appropriate
• Transactional Outbox where appropriate
• Idempotent consumers

The architecture must allow future extraction of independently deployable services without requiring a complete rewrite.

────────────────────────────────────────

MONOREPO FOUNDATION

Create the production-ready backend structure.

Support appropriate areas for:

apps/

• API Gateway

workers/

• Background workers
• Scheduled workers
• Event consumers

packages/

• Configuration
• Logging
• Error handling
• Validation
• Database
• Redis
• Events
• Queues
• Observability
• API contracts
• Shared types
• Testing utilities

services/

Create service boundaries only when the approved architecture requires them.

Do not create unnecessary empty services.

────────────────────────────────────────

APPLICATION BOOTSTRAP

Implement the NestJS application foundation.

Support:

• Application initialization
• Environment loading
• Configuration initialization
• Global validation
• Global exception handling
• Structured logging
• Request IDs
• Correlation IDs
• Secure headers
• CORS
• Request size limits
• API versioning
• Graceful shutdown
• Health endpoints

Use production-safe defaults.

────────────────────────────────────────

CONFIGURATION

Implement centralized strongly typed configuration.

Support:

Application:

• Environment
• Service name
• Version
• Host
• Port

PostgreSQL:

• Host
• Port
• Database
• Username
• Password
• SSL/TLS
• Connection pool

Redis:

• Host
• Port
• Username
• Password
• TLS

Kafka/Redpanda:

• Brokers
• Client ID
• Authentication
• TLS
• Consumer groups

BullMQ:

• Redis connection
• Queue defaults
• Retry defaults

Stripe:

• API configuration
• Webhook configuration

S3:

• Region
• Bucket
• Endpoint where required

Elasticsearch/OpenSearch:

• Endpoint
• Authentication
• TLS

Observability:

• Log level
• OpenTelemetry endpoint
• Metrics configuration

Never hard-code secrets.

Never access environment variables directly throughout business modules.

Validate configuration during startup.

Fail fast when required configuration is invalid.

────────────────────────────────────────

REQUEST CONTEXT

Implement request-context infrastructure supporting:

• Request ID
• Correlation ID
• Trace ID where available
• Service name
• User ID when authenticated
• Seller ID when authenticated as a seller

Propagate request context to:

• Logs
• Metrics
• Traces
• Domain events
• Kafka events
• Background jobs
• External provider calls

────────────────────────────────────────

LOGGING

Implement structured JSON logging.

Log appropriate:

• Timestamp
• Service
• Environment
• Level
• Request ID
• Correlation ID
• Trace ID
• Operation
• Duration
• Result
• Safe error details

Never log:

• Passwords
• Access tokens
• Refresh tokens
• Payment secrets
• Stripe secrets
• Database passwords
• Private keys
• Sensitive customer information unnecessarily

────────────────────────────────────────

ERROR HANDLING

Implement centralized error handling.

Define consistent errors for:

• Validation
• Authentication
• Authorization
• Not found
• Conflict
• Rate limit
• Dependency failure
• Payment provider failure
• Inventory conflict
• External-provider failure
• Infrastructure failure
• Internal failure

Use a consistent API error format containing:

• Error code
• Safe public message
• Request ID
• Correlation ID where appropriate
• Validation details where appropriate

Never expose internal stack traces in production.

────────────────────────────────────────

VALIDATION

Implement centralized validation for:

• Request body
• Query parameters
• Path parameters
• Headers where required
• Configuration
• Event payloads
• Queue payloads
• Webhook payloads

Reject invalid input before business logic executes.

Use strict schemas.

────────────────────────────────────────

SECURITY FOUNDATION

Implement:

• Secure headers
• CORS
• Rate limiting foundation
• Input validation
• Secure cookie architecture where applicable
• Authentication guard foundation
• Authorization guard foundation
• RBAC foundation
• Permission foundation
• Secrets handling
• Audit hooks

Never trust frontend authorization.

Never store plaintext passwords.

Never store production secrets in source control.

────────────────────────────────────────

API FOUNDATION

Implement the REST API foundation.

Support:

• API versioning
• Request validation
• Response conventions
• Error conventions
• Cursor pagination
• Pagination helpers
• Filtering conventions
• Sorting conventions
• Correlation IDs
• Authentication guards
• Authorization guards
• Rate limiting
• OpenAPI / Swagger

Implement reusable infrastructure for:

• Idempotency
• Request cancellation
• Timeouts
• Safe retries

Do not implement all business endpoints yet.

────────────────────────────────────────

DATABASE FOUNDATION

Implement PostgreSQL integration using Prisma.

Create:

• Prisma configuration
• Database module
• Prisma service
• Connection lifecycle
• Graceful shutdown
• Health checks
• Transaction support
• Query logging
• Migration structure

Define conventions for:

• IDs
• Created timestamps
• Updated timestamps
• Soft deletion
• Optimistic concurrency
• Foreign keys
• Constraints
• Indexes
• Monetary fields
• Decimal precision

Use exact decimal types for monetary values.

Do not use floating-point values for money.

Do not create the entire ecommerce schema in this volume.

Only create structures required by the foundation.

────────────────────────────────────────

PRISMA FOUNDATION

Implement:

• Schema organization
• Client lifecycle
• Migration workflow
• Transaction helpers
• Error translation
• Query logging
• Connection pooling
• Repository boundaries

Prepare support for domain-owned schemas or service-specific Prisma clients where required.

Prevent unrestricted direct database access from unrelated modules.

────────────────────────────────────────

REDIS FOUNDATION

Implement Redis infrastructure.

Support:

• Connection management
• Health checks
• Graceful shutdown
• Namespaced keys
• Serialization
• TTL
• Cache abstraction
• Distributed lock abstraction
• Idempotency support

Define conventions for:

• Key naming
• TTL
• Serialization
• Invalidations
• Error behavior

Redis must never become authoritative for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

KAFKA / REDPANDA FOUNDATION

Implement reusable event infrastructure.

Support:

• Producer connection
• Consumer connection
• Topic configuration
• Consumer groups
• Serialization
• Event metadata
• Event IDs
• Event versioning
• Correlation IDs
• Retry handling
• Dead-letter handling
• Graceful shutdown

Define an event envelope containing:

• Event ID
• Event type
• Event version
• Aggregate ID
• Timestamp
• Correlation ID
• Causation ID where appropriate
• Producer
• Payload

Do not implement the complete ecommerce event catalog yet.

────────────────────────────────────────

TRANSACTIONAL OUTBOX

Implement reusable transactional outbox infrastructure.

Define:

• Outbox ID
• Event type
• Event version
• Aggregate type
• Aggregate ID
• Payload
• Status
• Retry count
• Next retry timestamp
• Published timestamp
• Error information
• Created timestamp

Define how business transactions and event publication remain consistent.

Prevent event loss when:

• Database transaction succeeds
• Event publication fails

Implement safe retry and processing behavior.

────────────────────────────────────────

BULLMQ FOUNDATION

Implement background job infrastructure.

Support:

• Queue registration
• Queue configuration
• Producers
• Workers
• Job IDs
• Retry
• Exponential backoff
• Timeout
• Concurrency
• Failure handling
• Dead-letter behavior
• Graceful shutdown
• Queue metrics

Prepare reusable infrastructure for later:

• Payment jobs
• Search indexing
• Media processing
• Inventory jobs
• Notifications
• Reports
• Cleanup

Do not implement complete business jobs in this volume.

────────────────────────────────────────

HEALTH CHECKS

Implement:

• Liveness
• Readiness
• Startup checks where appropriate

Support dependency checks for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• BullMQ infrastructure
• Elasticsearch/OpenSearch where required

Differentiate:

• Application alive
• Application ready

Do not automatically restart the service indefinitely because a recoverable dependency is temporarily unavailable.

────────────────────────────────────────

GRACEFUL SHUTDOWN

Implement graceful shutdown for:

• HTTP server
• NestJS modules
• PostgreSQL
• Redis
• Kafka producers
• Kafka consumers
• BullMQ workers

Define safe shutdown ordering.

Stop accepting new work before terminating dependencies.

Allow in-flight operations to complete or fail safely.

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Implement:

• Structured logging
• Metrics
• OpenTelemetry tracing
• Correlation IDs
• Request duration metrics
• Error metrics
• Database metrics
• Redis metrics
• Kafka metrics
• Queue metrics
• Health metrics

Use:

• OpenTelemetry
• Prometheus-compatible metrics
• Grafana-compatible dashboards

Define reusable observability utilities.

────────────────────────────────────────

TESTING FOUNDATION

Implement:

• Unit testing
• Integration testing
• API testing
• Database testing
• Redis testing
• Kafka testing
• BullMQ testing
• Configuration testing
• Health-check testing

Configure:

• Jest
• Test environment
• Test database strategy
• Factories
• Fixtures
• Test helpers
• Coverage reporting

Tests must be deterministic.

────────────────────────────────────────

LOCAL DEVELOPMENT

Provide local development infrastructure for:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where required

Use Docker Compose where appropriate.

The local stack must be sufficient for backend development without requiring AWS for every operation.

Do not create production Kubernetes infrastructure in this volume.

Do not create Terraform infrastructure in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate backend foundation documentation for:

• Backend structure
• Local development
• Environment variables
• Database workflow
• Prisma workflow
• Redis conventions
• Kafka conventions
• BullMQ conventions
• Logging conventions
• Error conventions
• API conventions
• Observability conventions
• Testing workflow

Documentation must reflect the actual generated implementation.

────────────────────────────────────────

PROJECT INDEX

Maintain the backend Project Index.

Track:

• Current milestone
• Generated files
• Modified files
• Backend modules
• Database objects
• Shared packages
• API infrastructure
• Redis infrastructure
• Kafka infrastructure
• BullMQ infrastructure
• Observability
• Testing
• Remaining work
• Dependencies
• Next milestone

Do not claim functionality that has not been implemented.

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Monorepo/backend structure and application bootstrap.

BACKEND MILESTONE 2

Configuration, request context, logging, errors, validation, security foundation, and API foundation.

BACKEND MILESTONE 3

PostgreSQL and Prisma foundation.

BACKEND MILESTONE 4

Redis foundation.

BACKEND MILESTONE 5

Kafka/Redpanda and event infrastructure.

BACKEND MILESTONE 6

BullMQ and background-job infrastructure.

BACKEND MILESTONE 7

Transactional outbox.

BACKEND MILESTONE 8

Health checks, graceful shutdown, and observability.

BACKEND MILESTONE 9

Testing infrastructure and integration test foundation.

BACKEND MILESTONE 10

Local development, documentation, and Project Index.

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

This volume covers only:

• Backend foundation
• Configuration
• Security foundation
• API foundation
• PostgreSQL
• Prisma
• Redis
• Kafka/Redpanda
• BullMQ
• Transactional outbox
• Observability
• Health checks
• Testing foundation
• Local development
• Backend documentation

Do not implement complete:

• Identity
• Customer accounts
• Seller onboarding
• Catalog
• Products
• Pricing
• Promotions
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• Administration
• CMS
• Moderation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat this backend foundation as critical infrastructure for a globally distributed ecommerce marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large payment volumes
• Multi-region deployment
• High availability
• Zero-downtime deployment
• Strict security requirements

Prioritize:

• Correctness
• Reliability
• Security
• Observability
• Scalability
• Testability
• Maintainability
• Clear ownership
• Future service extraction
• Production readine

Using the approved Architecture Blueprint and the Master Prompt above:

Begin backend implementation ONLY.

Do NOT generate frontend code.

Do NOT generate mobile code.

Do NOT generate infrastructure code unless required for backend execution.

All implementation must strictly follow the approved Architecture Blueprint.

Never redesign architecture.

Never change API contracts.

Never modify database structure unless explicitly requested.

──────────────────────────────────────

MISSION

Build the complete production-ready backend for the enterprise ecommerce marketplace.

The backend must be scalable, secure, modular, cloud-native, observable and production-ready.

Every implementation must compile successfully before continuing.

Generate code incrementally following the Master Prompt milestone strategy.

──────────────────────────────────────

TECH STACK

Language

- TypeScript

Framework

- NestJS

Runtime

- Node.js

Database

- PostgreSQL
- Prisma ORM

Cache

- Redis

Search

- Elasticsearch

Storage

- AWS S3

Payments

- Stripe

Queue

- BullMQ

Communication

- REST API
- Webhooks
- Server-Sent Events (where appropriate)

Documentation

- OpenAPI / Swagger

──────────────────────────────────────

ARCHITECTURE

Follow:

- Clean Architecture
- Domain Driven Design
- SOLID
- Repository Pattern
- Service Layer
- Dependency Injection
- CQRS where appropriate
- Event-Driven Architecture
- Feature-first organization

Never violate architectural boundaries.

──────────────────────────────────────

IMPLEMENT THE FOLLOWING DOMAINS

Identity

Authentication

Authorization

Users

Profiles

Addresses

Seller Management

Catalog

Categories

Brands

Products

Variants

Media

Inventory

Warehouses

Pricing

Coupons

Promotions

Shopping Cart

Wishlist

Checkout

Orders

Payments

Refunds

Returns

Shipping

Reviews

Ratings

Recommendations

Search

Notifications

Messaging

Analytics

CMS

Administration

Audit

Feature Flags

System Configuration

──────────────────────────────────────

AUTHENTICATION

Implement:

- Registration
- Login
- Logout
- Email Verification
- Password Reset
- Refresh Tokens
- JWT
- MFA-ready architecture
- Google OAuth architecture
- Apple OAuth architecture
- Session Management
- Device Management
- Token Revocation

──────────────────────────────────────

AUTHORIZATION

Implement complete RBAC.

Support:

Guest

Customer

Seller

Seller Staff

Moderator

Support

Administrator

Super Administrator

System Services

Generate permission guards.

Policy system.

Permission decorators.

──────────────────────────────────────

DATABASE

Generate:

Prisma Schema

Prisma Modules

Repositories

Migrations

Indexes

Constraints

Optimized Queries

Transactions

Read Models

Database Seeders

──────────────────────────────────────

API

Generate production-ready REST APIs.

Every endpoint must include:

Validation

Authentication

Authorization

OpenAPI Documentation

Rate Limiting

Pagination

Filtering

Sorting

Cursor Pagination

Consistent Error Responses

Idempotency

Request Validation

Response DTOs

──────────────────────────────────────

SEARCH

Implement Elasticsearch.

Generate:

Indexes

Mappings

Autocomplete

Faceted Search

Synonyms

Search Ranking

Product Search

Category Search

Seller Search

Recommendation Search

Search Analytics

──────────────────────────────────────

MEDIA

Implement:

AWS S3 Uploads

Image Optimization

Multiple Image Sizes

File Validation

Signed URLs

Media Metadata

Media Cleanup

──────────────────────────────────────

PAYMENTS

Implement Stripe.

Support:

Payment Intents

Checkout

Marketplace Payments

Seller Payouts

Refunds

Partial Refunds

Webhook Processing

Idempotency

Payment Recovery

──────────────────────────────────────

CHECKOUT

Implement:

Shopping Cart

Coupons

Taxes

Shipping Calculation

Payment Authorization

Order Creation

Inventory Reservation

Order Confirmation

Receipt Generation

──────────────────────────────────────

INVENTORY

Support:

Warehouse Inventory

Reservations

Stock Transfers

Low Stock Alerts

Purchase Orders

Inventory History

Inventory Adjustments

──────────────────────────────────────

ORDERS

Implement:

Order Creation

Order Updates

Order Tracking

Split Orders

Partial Fulfillment

Returns

Exchanges

Refunds

Invoices

Timeline Events

──────────────────────────────────────

REVIEWS

Support:

Verified Reviews

Ratings

Images

Seller Responses

Reports

Moderation

──────────────────────────────────────

NOTIFICATIONS

Generate services for:

Email

Push

In-App

SMS-ready architecture

Queue-based processing

Retry Policies

──────────────────────────────────────

MESSAGING

Implement:

Customer ↔ Seller Conversations

Attachments

Message History

Unread Counts

Read Receipts

──────────────────────────────────────

ANALYTICS

Generate services for:

Sales Analytics

Product Analytics

Customer Analytics

Seller Analytics

Inventory Analytics

Revenue Analytics

Operational Metrics

──────────────────────────────────────

BACKGROUND JOBS

Implement BullMQ workers for:

Emails

Notifications

Search Indexing

Recommendation Updates

Image Processing

Media Cleanup

Inventory Synchronization

Coupon Expiration

Analytics Aggregation

Report Generation

Cache Invalidation

Scheduled Maintenance

──────────────────────────────────────

EVENT BUS

Generate complete event-driven architecture.

Implement events including:

UserRegistered

SellerApproved

ProductCreated

ProductUpdated

InventoryChanged

CouponCreated

OrderCreated

OrderPaid

PaymentSucceeded

ShipmentCreated

RefundIssued

ReviewCreated

NotificationQueued

SearchIndexed

AnalyticsUpdated

Define publishers and subscribers.

──────────────────────────────────────

CACHE

Implement Redis for:

Sessions

Product Cache

Category Cache

Checkout Cache

Recommendation Cache

Rate Limiting

Distributed Locks

Search Cache

──────────────────────────────────────

SECURITY

Implement:

JWT

Refresh Tokens

RBAC

Rate Limiting

Secure Headers

Input Validation

SQL Injection Protection

XSS Protection

CSRF Protection (where applicable)

Secrets Management

Audit Logging

Encryption at Rest

Encryption in Transit

OWASP Top 10 Compliance

──────────────────────────────────────

OBSERVABILITY

Generate:

Structured Logging

Metrics

Tracing

Health Checks

Readiness Checks

Liveness Checks

Error Monitoring

Performance Monitoring

──────────────────────────────────────

RESILIENCY

Implement:

Retry Policies

Timeouts

Circuit Breakers

Graceful Shutdown

Dead Letter Queues

Failure Recovery

Idempotency

──────────────────────────────────────

TESTING

Generate:

Unit Tests

Integration Tests

API Contract Tests

Performance Tests

Security Tests

Repository Tests

Service Tests

Controller Tests

──────────────────────────────────────

PROJECT ORGANIZATION

Maintain throughout development:

Current Milestone

Generated Files

Completed Modules

Remaining Modules

Dependencies

Database Objects

API Endpoints

Background Jobs

Events

──────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never omit implementations.

Never generate pseudo-code.

Never generate placeholders.

Never truncate files.

Never regenerate unchanged files.

Only modify files when required.

──────────────────────────────────────

STOP CONDITIONS

Generate backend incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

- Verify the backend compiles.
- Update the project index.
- List completed modules.
- Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
