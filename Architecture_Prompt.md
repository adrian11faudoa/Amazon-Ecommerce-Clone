Using the approved Master Prompt above:

DO NOT begin implementation.

Your only task in this phase is to produce the complete engineering blueprint for the platform.

This architecture document will become the single source of truth for every future implementation phase.

All Backend, Frontend, Mobile, Infrastructure, DevOps and Testing implementations must strictly follow this blueprint.

Do not generate any source code.

Do not generate placeholder implementations.

Produce only architecture, specifications, contracts and engineering decisions.

──────────────────────────────────────

PROJECT

Build a production-ready enterprise ecommerce marketplace capable of supporting millions of users, thousands of sellers and global operations.

Comparable architecture:

- Amazon Marketplace
- Shopify Marketplace
- Etsy
- Mercado Libre

The platform must be cloud-native, horizontally scalable, modular and maintainable.

──────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand

Mobile

- React Native
- Expo
- TypeScript

Backend

- Node.js
- NestJS
- TypeScript

Database

- PostgreSQL
- Prisma ORM
- Redis
- Elasticsearch

Storage

- AWS S3

Payments

- Stripe

Infrastructure

- Docker
- Kubernetes
- GitHub Actions

Monitoring

- Prometheus
- Grafana
- Loki
- OpenTelemetry

──────────────────────────────────────

SYSTEM REQUIREMENTS

Design for:

- 10M+ registered users
- 1M+ daily active users
- 100K+ sellers
- Millions of products
- Millions of orders
- Multi-region deployment
- Zero downtime deployments
- Horizontal scaling
- Event-driven communication

──────────────────────────────────────

APPLICATIONS

Design complete architecture for:

- Customer Web
- Customer Mobile
- Seller Dashboard
- Admin Dashboard
- Public API
- Internal APIs

──────────────────────────────────────

ROLES

Design complete RBAC model for:

- Guest
- Customer
- Seller
- Seller Staff
- Support Agent
- Moderator
- Administrator
- Super Administrator
- System Services

Include permissions matrix.

──────────────────────────────────────

MODULES

Design domain boundaries for:

Identity

Users

Authentication

Authorization

Profiles

Addresses

Catalog

Categories

Brands

Products

Variants

Media

Inventory

Warehouses

Pricing

Promotions

Coupons

Wishlist

Shopping Cart

Checkout

Orders

Payments

Refunds

Returns

Shipping

Notifications

Messaging

Reviews

Ratings

Recommendations

Analytics

CMS

Search

Reporting

Audit

Administration

Feature Flags

System Configuration

──────────────────────────────────────

MICROSERVICE DECISION

Determine whether the platform should initially be:

- Modular Monolith
- Service-Oriented
- Microservices

Justify the decision.

Describe migration strategy for future scaling.

──────────────────────────────────────

C4 ARCHITECTURE

Generate:

Context Diagram

Container Diagram

Component Diagram

Deployment Diagram

Describe responsibilities of every component.

──────────────────────────────────────

DOMAIN DRIVEN DESIGN

Define:

Bounded Contexts

Aggregates

Entities

Value Objects

Repositories

Domain Events

Application Services

Factories

Specifications

Policies

──────────────────────────────────────

DATABASE

Generate complete database design including:

ER Diagram

Normalization strategy

Schemas

Tables

Indexes

Foreign Keys

Unique Constraints

Check Constraints

Partitioning Strategy

Read Replica Strategy

Backup Strategy

Archival Strategy

Soft Delete Strategy

Audit Tables

──────────────────────────────────────

PRISMA

Design complete Prisma model organization.

Include module separation.

──────────────────────────────────────

API DESIGN

Define:

REST endpoints

Versioning strategy

Naming conventions

Authentication strategy

Authorization strategy

Pagination

Filtering

Sorting

Cursor Pagination

Error format

Validation strategy

Idempotency strategy

Rate limiting strategy

OpenAPI organization

──────────────────────────────────────

EVENT ARCHITECTURE

Define all domain events.

Examples:

UserRegistered

SellerApproved

ProductCreated

InventoryUpdated

OrderCreated

OrderPaid

PaymentSucceeded

ShipmentCreated

RefundIssued

ReviewCreated

CouponApplied

NotificationQueued

Describe producers and consumers.

──────────────────────────────────────

ASYNC PROCESSING

Identify every background job.

Examples:

Email sending

Inventory synchronization

Image processing

Recommendation updates

Search indexing

Analytics aggregation

Cache invalidation

Coupon expiration

Scheduled cleanup

──────────────────────────────────────

SEARCH ARCHITECTURE

Design Elasticsearch architecture.

Include:

Indexes

Mappings

Synonyms

Autocomplete

Ranking

Filters

Search pipeline

Reindex strategy

──────────────────────────────────────

CACHE STRATEGY

Design Redis usage.

Include:

Sessions

Rate limits

Product cache

Category cache

Search cache

Checkout cache

Recommendations

Distributed locks

──────────────────────────────────────

PAYMENT ARCHITECTURE

Design Stripe integration.

Include:

Checkout

Payment Intents

Webhooks

Refunds

Seller payouts

Marketplace commissions

Settlement flow

Failure recovery

──────────────────────────────────────

MEDIA ARCHITECTURE

Design S3 storage strategy.

Include:

Images

Videos

Documents

Variants

Optimization

CDN

Lifecycle policies

──────────────────────────────────────

SECURITY

Design:

Authentication

Authorization

RBAC

JWT

Refresh Tokens

Secrets

Encryption

Audit Logs

OWASP protections

Fraud prevention

──────────────────────────────────────

OBSERVABILITY

Design:

Structured Logging

Metrics

Tracing

Dashboards

Alerts

Health Checks

Readiness Checks

Liveness Checks

──────────────────────────────────────

RESILIENCY

Design:

Retry Policies

Circuit Breakers

Timeouts

Dead Letter Queues

Idempotency

Graceful Shutdown

Failure Recovery

──────────────────────────────────────

AI ARCHITECTURE

Design architecture supporting:

Recommendation Engine

Semantic Search

Product Tagging

SEO Generation

Demand Forecasting

Fraud Detection

Customer Support Assistant

Future LLM integrations

──────────────────────────────────────

FRONTEND ARCHITECTURE

Define:

Feature-first folder structure

Component hierarchy

Layouts

State management

API client

Authentication flow

Route protection

Caching strategy

Forms

Accessibility

Responsive design

Offline support

Error boundaries

──────────────────────────────────────

MOBILE ARCHITECTURE

Define:

Navigation

Offline synchronization

Push notifications

Background tasks

Deep linking

Secure storage

Caching

Synchronization

──────────────────────────────────────

DEVOPS ARCHITECTURE

Design:

CI/CD pipeline

Branch strategy

Deployment environments

Secrets management

Container strategy

Infrastructure organization

Monitoring

Rollback strategy

Disaster recovery

──────────────────────────────────────

TESTING STRATEGY

Design:

Unit testing

Integration testing

End-to-End testing

Contract testing

Load testing

Performance testing

Security testing

Coverage requirements

──────────────────────────────────────

DOCUMENTATION

Generate complete engineering documentation including:

Architecture Overview

Technology Decisions

Architecture Decision Records (ADRs)

Folder Structure

Coding Standards

Naming Conventions

API Standards

Database Standards

Security Standards

Deployment Standards

Operational Runbooks

Disaster Recovery Plan

Maintenance Strategy

──────────────────────────────────────

DELIVERABLE

Produce a complete enterprise engineering blueprint.

This document must be sufficiently detailed that independent engineering teams can implement:

- Backend
- Frontend
- Mobile
- Infrastructure
- DevOps
- QA

without making additional architectural decisions.

STOP after the architecture blueprint is complete.

Wait for approval before implementation begins.
