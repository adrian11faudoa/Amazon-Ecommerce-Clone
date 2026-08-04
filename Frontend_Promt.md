Using the approved Architecture Blueprint and the Master Prompt above:

Begin frontend implementation ONLY.

Do NOT generate backend code.

Do NOT generate infrastructure code.

Do NOT redesign APIs.

Do NOT redesign the database.

Assume the backend implementation already exists and consume its published API contracts exactly as documented in the Architecture Blueprint.

All frontend code must be production-ready, accessible, responsive, performant, and maintainable.

Generate code incrementally following the Master Prompt milestone strategy.

──────────────────────────────────────

MISSION

Build the complete production-ready web frontend for the enterprise ecommerce marketplace.

The frontend must be comparable in quality to:

- Amazon
- Shopify
- Mercado Libre
- Etsy

The application must prioritize performance, accessibility, responsiveness, scalability, and exceptional user experience.

──────────────────────────────────────

TECH STACK

Framework

- Next.js 15
- React 19
- TypeScript

Styling

- Tailwind CSS
- shadcn/ui
- CSS Variables

State Management

- Zustand

Server State

- TanStack Query

Forms

- React Hook Form
- Zod

Authentication

- JWT
- Refresh Tokens

Utilities

- date-fns

Charts

- Recharts

Animations

- Framer Motion

Icons

- Lucide Icons

──────────────────────────────────────

ARCHITECTURE

Follow:

- Feature-first organization
- Atomic component design where appropriate
- Reusable UI components
- Clean Architecture
- SOLID principles
- Strict TypeScript
- Modular features
- Dependency inversion where appropriate

Never mix business logic into presentation components.

──────────────────────────────────────

APPLICATIONS

Generate:

Customer Marketplace

Seller Dashboard

Admin Dashboard

Shared UI Library

Shared Component Library

Shared API Client

Shared Design System

──────────────────────────────────────

FOLDER STRUCTURE

Generate a scalable feature-first organization including:

app/

features/

components/

layouts/

hooks/

providers/

services/

stores/

lib/

styles/

types/

utils/

config/

assets/

──────────────────────────────────────

ROUTING

Generate App Router architecture.

Support:

Public Routes

Protected Routes

Seller Routes

Admin Routes

Authentication Routes

Error Routes

Loading Routes

Dynamic Routes

Nested Routes

Middleware

──────────────────────────────────────

AUTHENTICATION

Implement:

Registration

Login

Logout

Forgot Password

Reset Password

Email Verification

Session Management

Protected Routes

Token Refresh

Remember Me

Role-based Navigation

──────────────────────────────────────

CUSTOMER FEATURES

Generate complete UI for:

Home

Categories

Brands

Search

Product Details

Product Gallery

Product Variants

Wishlist

Shopping Cart

Checkout

Orders

Returns

Addresses

Notifications

Messages

Coupons

Account Settings

User Profile

Recently Viewed

Recommendations

Reviews

Ratings

──────────────────────────────────────

SELLER DASHBOARD

Generate:

Dashboard

Products

Inventory

Orders

Customers

Coupons

Analytics

Revenue

Messages

Reviews

Store Settings

Media Library

Financial Reports

──────────────────────────────────────

ADMIN DASHBOARD

Generate:

Overview

Users

Sellers

Products

Categories

Orders

Payments

Refunds

Reports

Analytics

CMS

Feature Flags

System Settings

Audit Logs

Moderation

──────────────────────────────────────

DESIGN SYSTEM

Generate reusable UI components including:

Buttons

Inputs

Cards

Tables

Dialogs

Drawers

Dropdowns

Menus

Tabs

Accordions

Badges

Tags

Breadcrumbs

Pagination

Forms

Checkboxes

Radio Buttons

Switches

Selects

Date Pickers

Skeletons

Progress Bars

Charts

Alerts

Toast Notifications

Empty States

Loading Indicators

Error States

──────────────────────────────────────

PRODUCT EXPERIENCE

Generate interfaces for:

Product Images

Zoom

Gallery

Variants

Inventory Status

Recommendations

Reviews

Questions

Related Products

Cross-Sells

Upsells

──────────────────────────────────────

SHOPPING EXPERIENCE

Generate:

Cart Drawer

Cart Page

Checkout Flow

Shipping Selection

Payment Selection

Order Confirmation

Invoice View

Order Tracking

──────────────────────────────────────

SEARCH EXPERIENCE

Implement:

Instant Search

Autocomplete

Filters

Sorting

Faceted Navigation

Recent Searches

Trending Searches

Search Suggestions

──────────────────────────────────────

STATE MANAGEMENT

Implement Zustand stores for:

Authentication

Cart

Wishlist

Notifications

Theme

Search

User Preferences

Checkout

──────────────────────────────────────

SERVER STATE

Implement TanStack Query.

Support:

Caching

Pagination

Optimistic Updates

Infinite Queries

Background Refetching

Cache Invalidation

Retries

──────────────────────────────────────

API CLIENT

Generate:

Typed API Client

Authentication Interceptors

Error Handling

Retry Logic

Request Cancellation

Pagination Helpers

File Upload Helpers

──────────────────────────────────────

FORMS

Generate production-ready forms with:

React Hook Form

Zod Validation

Inline Validation

Async Validation

File Upload

Error Handling

Loading States

──────────────────────────────────────

FILE UPLOADS

Support:

Images

Videos

Documents

Drag & Drop

Progress Indicators

Validation

Preview

Retry

──────────────────────────────────────

PERFORMANCE

Optimize:

Server Components

Client Components

Streaming

Suspense

Image Optimization

Code Splitting

Lazy Loading

Virtualization

Prefetching

Memoization

Caching

──────────────────────────────────────

ACCESSIBILITY

Implement:

WCAG 2.2 AA Compliance

Keyboard Navigation

Screen Reader Support

ARIA Labels

Focus Management

High Contrast Support

Reduced Motion Support

──────────────────────────────────────

RESPONSIVE DESIGN

Support:

Desktop

Tablet

Mobile

Ultra-wide Displays

Landscape Mode

──────────────────────────────────────

THEMING

Support:

Light Theme

Dark Theme

System Theme

Theme Persistence

──────────────────────────────────────

INTERNATIONALIZATION

Design support for:

Multiple Languages

RTL Layouts

Currency Formatting

Date Formatting

Localization

──────────────────────────────────────

ERROR HANDLING

Generate:

Error Boundaries

404 Pages

500 Pages

Offline Pages

Retry Components

Network Error Handling

──────────────────────────────────────

NOTIFICATIONS

Implement:

Toast Notifications

In-App Notifications

Notification Center

Unread Counts

──────────────────────────────────────

ANIMATIONS

Use Framer Motion for:

Page Transitions

Shared Element Transitions

Dialogs

Drawers

Dropdowns

Lists

Loading States

Micro-interactions

──────────────────────────────────────

TESTING

Generate:

Unit Tests

Component Tests

Integration Tests

Accessibility Tests

Visual Regression Test Architecture

──────────────────────────────────────

DOCUMENTATION

Generate:

Component Documentation

Design System Documentation

Folder Structure Documentation

Frontend Standards

Coding Standards

State Management Standards

API Usage Guide

──────────────────────────────────────

PROJECT ORGANIZATION

Maintain throughout development:

Current Milestone

Generated Components

Generated Pages

Shared Components

Remaining Features

API Integrations

Dependencies

──────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never generate placeholders.

Never generate pseudo-code.

Never omit implementations.

Never regenerate unchanged files.

Only modify files when required.

──────────────────────────────────────

STOP CONDITIONS

Generate the frontend incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

- Verify the frontend compiles.
- Update the project index.
- List completed features.
- Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
