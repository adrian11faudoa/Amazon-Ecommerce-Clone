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
