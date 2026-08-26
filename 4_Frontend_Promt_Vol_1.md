You are operating in Senior Engineering Team Mode.

Build the production-ready web frontend foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend API contracts, authentication model, authorization model, catalog model, seller model, cart model, checkout model, order model, search model, notification model, and security model.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement mobile code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Build the production-ready web frontend foundation for the ecommerce marketplace.

The web platform must support:

• Customer marketplace
• Seller dashboard
• Admin dashboard
• Product discovery
• Search
• Product details
• Shopping cart
• Checkout
• Orders
• Returns
• Reviews
• Notifications
• Customer account
• Seller management
• Administration
• Responsive layouts
• Accessibility
• Internationalization
• Error handling
• Performance optimization

The frontend must be:

• Fast
• Responsive
• Accessible
• Secure
• Maintainable
• Scalable
• Observable
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• Next.js
• React
• TypeScript

Styling:

• Tailwind CSS
• shadcn/ui
• CSS variables

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Utilities:

• date-fns

Charts:

• Recharts

Animation:

• Framer Motion

Icons:

• Lucide React

Testing:

• Jest
• React Testing Library
• Playwright
• Accessibility testing tools

────────────────────────────────────────

FRONTEND ARCHITECTURE

Use:

• Feature-first organization
• Strict TypeScript
• Reusable components
• Clean Architecture principles where appropriate
• Separation of presentation and business logic
• Dependency inversion where appropriate
• Shared design system
• Typed API contracts

Do not place business logic directly inside presentation components.

Do not duplicate backend authorization logic.

Do not use Zustand as a replacement for server-state management.

────────────────────────────────────────

APPLICATIONS

Build:

CUSTOMER MARKETPLACE

• Public storefront
• Authenticated customer marketplace
• Product discovery
• Product pages
• Search
• Cart
• Checkout
• Orders
• Returns
• Reviews
• Account

SELLER DASHBOARD

• Seller dashboard
• Store
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Analytics
• Revenue
• Payouts
• Reviews
• Messages

ADMIN DASHBOARD

• Overview
• Customers
• Sellers
• Products
• Categories
• Orders
• Payments
• Refunds
• Returns
• Reports
• Moderation
• CMS
• Feature flags
• Audit
• System configuration

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable feature-first structure including:

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

public/

assets/

tests/

Use Next.js App Router.

Keep customer, seller, and administration features logically isolated.

Shared components must remain domain-neutral.

────────────────────────────────────────

NEXT.JS ARCHITECTURE

Implement:

• App Router
• Route groups
• Layouts
• Loading states
• Error boundaries
• Not-found pages
• Suspense
• Server Components where appropriate
• Client Components where required
• Middleware
• Metadata
• SEO foundations
• Open Graph metadata
• Structured metadata foundations

Do not make the entire application a Client Component.

Use Server Components for appropriate product/catalog/public content.

Use Client Components for interactive features.

────────────────────────────────────────

DESIGN SYSTEM

Build a reusable design system using:

• shadcn/ui
• Tailwind CSS
• CSS variables

Include:

• Button
• Input
• Textarea
• Select
• Checkbox
• Radio
• Switch
• Dialog
• Drawer
• Popover
• Dropdown
• Tooltip
• Tabs
• Accordion
• Card
• Badge
• Avatar
• Breadcrumb
• Table
• Pagination
• Skeleton
• Alert
• Toast
• Progress
• Calendar
• Date picker
• Command menu
• Empty state
• Error state
• Loading state

Components must support:

• Keyboard navigation
• Focus management
• Dark mode
• Responsive behavior
• Accessible semantics

────────────────────────────────────────

THEMING

Support:

• Light theme
• Dark theme
• System theme
• Theme persistence

Respect:

• Reduced motion
• High contrast
• User accessibility preferences

Use centralized design tokens.

────────────────────────────────────────

API CLIENT

Implement a typed API client.

Support:

• Base URL
• Authentication
• Request IDs
• Correlation IDs
• Error normalization
• Retries
• Cancellation
• Timeouts
• Pagination
• Cursor pagination
• Multipart uploads
• Signed upload flows

Use backend contracts exactly.

Do not recreate server-side business logic.

────────────────────────────────────────

SERVER STATE

Use TanStack Query.

Support:

• Queries
• Mutations
• Infinite queries
• Cursor pagination
• Caching
• Background refetching
• Cache invalidation
• Optimistic updates
• Retry
• Error handling

Define consistent query-key conventions.

Do not duplicate server state unnecessarily in Zustand.

────────────────────────────────────────

CLIENT STATE

Use Zustand for client-owned state such as:

• UI preferences
• Theme
• Navigation state
• Cart drawer state
• Search UI state
• Checkout UI state
• Notification UI state
• Seller dashboard UI state
• Admin UI state

Use TanStack Query for authoritative server state.

────────────────────────────────────────

AUTHENTICATION

Implement:

• Registration
• Login
• Logout
• Email verification
• Password reset
• Password change
• Session restoration
• Session expiration
• Refresh handling
• Protected routes

Support role-aware navigation.

Do not expose sensitive authentication credentials unnecessarily to client-side JavaScript.

────────────────────────────────────────

ROUTING

Implement routes for:

PUBLIC

• Home
• Categories
• Brands
• Search
• Products
• Stores
• Authentication

CUSTOMER

• Account
• Profile
• Addresses
• Wishlist
• Cart
• Checkout
• Orders
• Returns
• Reviews
• Notifications
• Messages
• Settings

SELLER

• Dashboard
• Store
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Analytics
• Revenue
• Payouts
• Reviews
• Messages
• Settings

ADMIN

• Dashboard
• Users
• Sellers
• Products
• Catalog
• Orders
• Payments
• Refunds
• Returns
• Reports
• Moderation
• CMS
• Feature Flags
• Audit
• System Configuration

Implement protected layouts and route groups.

Backend authorization remains the final security boundary.

────────────────────────────────────────

CUSTOMER HOME EXPERIENCE

Implement:

• Header
• Navigation
• Search
• Category navigation
• Promotional areas
• Featured products
• Trending products
• Recommendations
• Recently viewed
• Seller/store discovery
• Footer

Support:

• Loading states
• Skeletons
• Empty states
• Error recovery

Optimize public content using Server Components and caching where appropriate.

────────────────────────────────────────

PRODUCT DISCOVERY

Implement:

• Category pages
• Brand pages
• Search pages
• Product grids
• Filters
• Sorting
• Pagination
• Infinite scrolling where appropriate
• Faceted navigation

Support:

• Price filters
• Rating filters
• Brand filters
• Category filters
• Seller filters
• Availability
• Promotions

Use URL query parameters for shareable search/filter state.

────────────────────────────────────────

PRODUCT CARD

Create reusable product-card interfaces containing:

• Product image
• Product title
• Rating
• Review count
• Price
• Previous price
• Discount
• Seller
• Availability
• Promotional badge
• Wishlist action
• Add-to-cart action

Product cards must support loading and unavailable states.

────────────────────────────────────────

PRODUCT DETAILS

Implement:

• Product title
• Product gallery
• Product video where available
• Description
• Attributes
• Specifications
• Variants
• Seller offers
• Pricing
• Availability
• Shipping estimate
• Reviews
• Ratings
• Related products
• Frequently bought together
• Cross-sells
• Upsells
• Wishlist
• Add to cart

Support large product media efficiently.

────────────────────────────────────────

PRODUCT GALLERY

Implement:

• Image gallery
• Thumbnail navigation
• Zoom
• Fullscreen
• Video playback
• Loading states
• Error states
• Responsive behavior

Use Next.js image optimization where appropriate.

────────────────────────────────────────

VARIANT SELECTION

Support:

• Color
• Size
• Capacity
• Material
• Style
• Other configured attributes

Variant changes must update:

• Price
• Availability
• SKU
• Images
• Shipping information
• Seller offer

Do not assume every product has identical variant structures.

────────────────────────────────────────

SELLER OFFERS

Support products with multiple sellers.

Display:

• Seller name
• Seller rating
• Condition
• Price
• Shipping
• Availability
• Delivery estimate

Clearly distinguish the selected seller offer from other offers.

────────────────────────────────────────

WISHLIST

Implement:

• Add
• Remove
• List
• Move to cart
• Loading
• Empty state
• Optimistic updates where safe

Keep wishlist state synchronized with backend state.

────────────────────────────────────────

SHOPPING CART

Implement:

• Cart drawer
• Cart page
• Product items
• Seller grouping
• Quantity controls
• Remove
• Save for later where supported
• Discounts
• Estimated shipping
• Estimated taxes
• Cart totals

Support:

• Loading
• Empty state
• Out-of-stock state
• Price-changed state
• Seller-unavailable state

Never trust client-side totals as authoritative.

────────────────────────────────────────

CHECKOUT FOUNDATION

Implement checkout UI architecture for:

• Address selection
• Shipping method
• Delivery estimate
• Coupon
• Promotions
• Tax display
• Order summary
• Payment selection
• Confirmation

Support:

• Step validation
• Loading states
• Error states
• Expired checkout
• Inventory conflicts
• Price changes
• Coupon failures

────────────────────────────────────────

FORMS

Use:

• React Hook Form
• Zod

Support:

• Client validation
• Server validation
• Inline errors
• Loading
• Disabled state
• Error summary
• Accessible messages

Use appropriate schemas for:

• Registration
• Login
• Addresses
• Seller forms
• Products
• Promotions
• Coupons
• Checkout

────────────────────────────────────────

ERROR HANDLING

Implement:

• Global error boundary
• Route error boundaries
• 404
• 500
• Network errors
• Authorization errors
• Validation errors
• Payment errors
• Checkout errors
• Search errors

Provide recovery actions.

Never expose internal stack traces.

────────────────────────────────────────

LOADING AND EMPTY STATES

Every major asynchronous UI must include:

• Loading state
• Skeleton state where appropriate
• Empty state
• Error state
• Retry

Avoid blank screens.

────────────────────────────────────────

ACCESSIBILITY

Target WCAG 2.2 AA.

Implement:

• Semantic HTML
• Keyboard navigation
• Screen reader support
• ARIA labels
• Focus management
• Focus restoration
• Accessible forms
• Accessible tables
• Accessible dialogs
• Accessible menus
• Accessible product controls
• High contrast
• Reduced motion

Do not communicate information through color alone.

────────────────────────────────────────

RESPONSIVE DESIGN

Support:

• Desktop
• Tablet
• Mobile browser
• Large displays
• Ultra-wide displays

Customer storefront, seller dashboard, and admin dashboard should use layouts optimized for their respective workflows.

────────────────────────────────────────

INTERNATIONALIZATION

Design for:

• Multiple languages
• Currency formatting
• Date/time formatting
• Regional number formats
• RTL layouts
• Localized validation messages
• Localized product metadata

Do not hard-code user-visible text inside business logic.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Server Components
• Client Components
• Streaming
• Suspense
• Image optimization
• Code splitting
• Lazy loading
• Virtualization
• Prefetching
• Query caching
• Memoization

Use appropriate caching for public catalog content.

Avoid unnecessary JavaScript on public product pages.

────────────────────────────────────────

SEO

Implement:

• Metadata
• Canonical URLs
• Structured data foundations
• Product metadata
• Breadcrumb metadata
• Category metadata
• Open Graph
• Robots strategy
• Sitemap architecture

Public catalog pages should be crawlable.

Authenticated/private pages should not be indexed.

────────────────────────────────────────

SELLER DASHBOARD FOUNDATION

Implement reusable seller-dashboard layout.

Support:

• Sidebar
• Header
• Seller/store switcher where applicable
• Notifications
• Profile
• Breadcrumbs
• Responsive navigation

Create dashboard foundations for:

• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Analytics
• Revenue
• Payouts
• Reviews
• Messages

────────────────────────────────────────

ADMIN DASHBOARD FOUNDATION

Create reusable admin-dashboard layout.

Support:

• Navigation
• Role-aware menus
• Search
• Notifications
• Breadcrumbs
• Audit indicators
• Responsive layout

Create foundations for:

• Customers
• Sellers
• Catalog
• Orders
• Payments
• Refunds
• Returns
• Reports
• Moderation
• CMS
• Feature flags
• Audit
• System configuration

────────────────────────────────────────

ADMIN SECURITY UX

Sensitive admin actions must require appropriate confirmation.

Support UI patterns for:

• Destructive confirmation
• Reason capture
• Re-authentication where required
• Permission-denied state
• Audit notification

Frontend controls must never be the final security enforcement.

────────────────────────────────────────

CUSTOMER ACCOUNT

Implement:

• Profile
• Addresses
• Security
• Sessions
• Devices where supported
• Notification preferences
• Privacy
• Orders
• Returns

Use accessible account-navigation patterns.

────────────────────────────────────────

NOTIFICATIONS

Implement frontend foundations for:

• Notification center
• Unread counts
• Toasts
• Notification preferences
• Deep linking

Support:

• Order notifications
• Payment notifications
• Shipment notifications
• Return notifications
• Security notifications
• Seller notifications
• Promotional notifications

────────────────────────────────────────

MESSAGING FOUNDATION

Implement web UI foundation for:

• Customer-seller conversations
• Conversation list
• Message history
• Composer
• Attachments
• Unread counts
• Read state

Use the approved backend messaging contracts.

Do not implement a custom messaging backend.

────────────────────────────────────────

ANIMATIONS

Use Framer Motion where it improves UX.

Support:

• Page transitions
• Drawers
• Dialogs
• Product-card interactions
• Cart transitions
• Notifications
• Micro-interactions

Respect reduced-motion preferences.

Avoid excessive animation.

────────────────────────────────────────

SECURITY

Implement:

• Protected routes
• Safe rendering
• Input sanitization where appropriate
• Secure URL handling
• Content Security Policy compatibility
• Safe file upload flows
• Secure authentication handling
• CSRF-safe patterns where applicable

Never place secrets in browser bundles.

Never trust client-side role checks.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Utilities
• Validation
• Formatting
• State logic

COMPONENT TESTS

• Product cards
• Product gallery
• Cart
• Checkout forms
• Navigation
• Dialogs
• Tables
• Seller components
• Admin components

INTEGRATION TESTS

• API client
• Authentication
• TanStack Query
• Forms
• Checkout state

END-TO-END TESTS

• Registration
• Login
• Product discovery
• Search
• Product page
• Add to cart
• Checkout
• Order
• Seller login
• Seller product management
• Admin login

ACCESSIBILITY TESTS

• Navigation
• Forms
• Dialogs
• Tables
• Product controls
• Checkout

PERFORMANCE TESTS

• Product pages
• Search
• Category pages
• Large tables
• Seller dashboards

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture
• Folder structure
• Design system
• Component standards
• API client
• State-management standards
• Routing standards
• Accessibility standards
• SEO standards
• Performance standards
• Testing standards
• Seller-dashboard standards
• Admin-dashboard standards

────────────────────────────────────────

PROJECT INDEX

Maintain the frontend Project Index.

Track:

• Applications
• Pages
• Layouts
• Components
• Features
• Hooks
• Zustand stores
• TanStack Query integrations
• API integrations
• Forms
• Tests
• Dependencies
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

FRONTEND MILESTONE 1

Next.js foundation, routing, global providers, design system, API client, error handling, and configuration.

FRONTEND MILESTONE 2

Authentication, account, profile, address management, and protected routing.

FRONTEND MILESTONE 3

Home page, categories, brands, search, product listing, filtering, and product cards.

FRONTEND MILESTONE 4

Product detail pages, variants, seller offers, media gallery, reviews, and recommendations.

FRONTEND MILESTONE 5

Wishlist, shopping cart, cart drawer, and cart synchronization.

FRONTEND MILESTONE 6

Checkout, addresses, shipping, promotions, taxes, payment UI, and confirmation.

FRONTEND MILESTONE 7

Customer orders, returns, refunds, notifications, and messaging foundation.

FRONTEND MILESTONE 8

Seller dashboard foundation and seller workflows.

FRONTEND MILESTONE 9

Admin dashboard foundation and administrative workflows.

FRONTEND MILESTONE 10

Accessibility, SEO, internationalization, performance, testing, and production hardening.

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

This volume covers the web frontend foundation and core marketplace experience.

Do not implement:

• Backend code
• Mobile code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the web application as a production marketplace serving millions of customers and hundreds of thousands of sellers.

Assume:

• High catalog traffic
• High search traffic
• Large product catalogs
• High checkout traffic
• Large seller dashboards
• Large administrative datasets
• Multiple currencies
• Multiple languages
• Strict security requirements

Prioritize:

• Performance
• Accessibility
• SEO
• Security
• Responsive design
• Excellent ecommerce UX
• Correct server-state synchronization
• Maintainability
• Scalability
• Production readiness
