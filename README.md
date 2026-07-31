Using the Master Prompt above:

Build a complete production-ready enterprise ecommerce marketplace suitable for a venture-funded startup capable of scaling to millions of users.

The platform must be modular, scalable, cloud-native, secure, multi-region capable, and maintainable over many years.

# Primary Tech Stack

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

# Marketplace Roles

Implement complete role separation for:

- Guest
- Customer
- Seller
- Seller Staff
- Support Agent
- Moderator
- Administrator
- Super Administrator
- System Services

Implement full RBAC.

# Authentication

Support:

- Email/Password
- Google Login
- Apple Login
- Magic Links
- MFA
- Password Reset
- Email Verification
- Device Sessions
- Remember Me
- Refresh Tokens
- Session Revocation
- Account Lockout
- Suspicious Login Detection

# Customer Features

Implement:

- User Profiles
- Addresses
- Wishlist
- Shopping Cart
- Saved Carts
- Buy Again
- Order History
- Order Tracking
- Invoices
- Returns
- Refund Requests
- Product Questions
- Reviews
- Ratings
- Follow Sellers
- Recently Viewed
- Personalized Recommendations
- Loyalty Points
- Store Credit
- Gift Cards
- Saved Payment Methods
- Notification Center

# Seller Features

Implement Seller Dashboard including:

- Sales Analytics
- Revenue
- Orders
- Inventory
- Customers
- Promotions
- Coupons
- Product Management
- Variant Management
- Bulk Import
- CSV Import
- Inventory Forecasting
- Return Management
- Customer Messages
- Advertising Dashboard
- Financial Reports
- Settlement Reports
- Payout History
- Tax Reports

# Product Catalog

Support:

- Unlimited Categories
- Nested Categories
- Brands
- Tags
- Attributes
- Variants
- Images
- Videos
- Digital Products
- Physical Products
- Bundles
- Kits
- Subscriptions
- Downloadable Files
- Related Products
- Cross-Sells
- Upsells
- Frequently Bought Together

# Inventory

Support:

- Multiple Warehouses
- Reserved Stock
- Low Stock Alerts
- Batch Tracking
- SKU Management
- Barcode Support
- Inventory Transfers
- Purchase Orders
- Automatic Restocking
- Stock History

# Orders

Support:

- Split Orders
- Partial Fulfillment
- Partial Refunds
- Exchanges
- Returns
- Cancellations
- Order Notes
- Order Timeline
- Shipment Tracking
- Invoice Generation

# Shipping

Support:

- Multiple Carriers
- Shipping Zones
- Shipping Rules
- Free Shipping
- Local Pickup
- Scheduled Delivery
- International Shipping
- Shipping Insurance
- Label Generation
- Tracking Synchronization

# Payments

Support Stripe including:

- Cards
- Apple Pay
- Google Pay
- Link
- Refunds
- Partial Refunds
- Payment Intents
- Webhooks
- Marketplace Split Payments
- Seller Payouts
- Escrow Workflow

# Promotions

Support:

- Coupons
- Discount Codes
- Flash Sales
- Bulk Discounts
- Buy X Get Y
- Free Shipping Coupons
- Referral Program
- Loyalty Rewards
- Gift Cards
- Seasonal Campaigns

# Search

Implement Elasticsearch with:

- Full Text Search
- Autocomplete
- Typo Tolerance
- Synonyms
- Faceted Search
- Filtering
- Sorting
- Personalized Ranking
- Popular Searches
- Search Analytics

# Recommendation Engine

Implement:

- Similar Products
- Trending Products
- Frequently Bought Together
- Recently Viewed
- AI Recommendations
- Personalized Homepage
- Personalized Search Ranking

# Reviews

Implement:

- Verified Purchase Reviews
- Images
- Videos
- Review Voting
- Review Moderation
- Review Reports
- Seller Responses

# Messaging

Implement:

- Customer ↔ Seller Chat
- Support Chat
- Order Conversations
- Attachments
- Notifications

# Notifications

Support:

- Email
- Push Notifications
- In-App Notifications

Trigger notifications for:

- Orders
- Shipping
- Payments
- Promotions
- Returns
- Messages

# Admin Panel

Implement:

- Dashboard
- User Management
- Seller Management
- Product Moderation
- Orders
- Reports
- Revenue Analytics
- Fraud Detection
- Audit Logs
- CMS
- Feature Flags
- System Settings
- Queue Monitoring
- Health Monitoring

# Analytics

Implement dashboards for:

- Sales
- Conversion Rate
- Traffic
- Revenue
- Inventory
- Customer Lifetime Value (CLV)
- Seller Performance
- Product Performance
- Funnel Analysis
- Cohort Analysis

# AI Features

Implement AI-ready architecture supporting:

- Product Description Generation
- SEO Metadata Generation
- Product Tagging
- Image Auto Tagging
- Recommendation Engine
- Smart Search
- Fraud Detection
- Customer Support Assistant
- Seller Performance Insights
- Demand Forecasting

# Internationalization

Support:

- Multiple Languages
- Multiple Currencies
- Multiple Tax Systems
- Time Zones
- Regional Pricing
- Localization

# CMS

Implement:

- Landing Pages
- Home Page Builder
- Promotional Banners
- Blog
- FAQ
- Static Pages
- Navigation Management

# Security

Implement:

- JWT
- Refresh Tokens
- RBAC
- MFA
- CSRF Protection
- XSS Protection
- SQL Injection Protection
- Rate Limiting
- Secure Headers
- Secrets Management
- Audit Logging
- Encryption at Rest
- Encryption in Transit
- OWASP Top 10 Compliance

# Performance

Optimize for:

- CDN
- Image Optimization
- Lazy Loading
- Caching
- Incremental Static Regeneration (ISR)
- Background Jobs
- Queue Processing
- Horizontal Scaling
- Read Replicas
- Database Partitioning

# DevOps

Generate:

- Docker
- Docker Compose
- Kubernetes
- Helm Charts
- GitHub Actions
- Terraform
- Prometheus
- Grafana
- Loki
- OpenTelemetry
- Distributed Tracing
- Centralized Logging
- Health Checks
- Automatic Backups

# Testing

Generate:

- Unit Tests
- Integration Tests
- End-to-End Tests
- API Contract Tests
- Load Tests
- Performance Tests
- Security Tests

# Documentation

Generate:

- Architecture Documentation
- Architecture Decision Records (ADRs)
- Entity Relationship Diagram (ERD)
- OpenAPI Documentation
- Deployment Guide
- Developer Setup Guide
- CI/CD Documentation
- Security Documentation
- Operational Runbooks
- Disaster Recovery Guide

# Quality Requirements

The entire project must be:

- Production Ready
- Enterprise Grade
- Horizontally Scalable
- Cloud Native
- Multi-Region Ready
- Event Driven where appropriate
- Clean Architecture
- Fully Typed
- SOLID Compliant
- Domain Driven Design (DDD)
- CQRS where beneficial
- Modular
- Testable
- Observable
- Maintainable
- Zero-Downtime Deployable

Generate the application incrementally according to the Master Prompt phases, ensuring every milestone compiles successfully before continuing.
