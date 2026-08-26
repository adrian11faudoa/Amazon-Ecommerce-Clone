You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready web frontend for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The frontend must consume the established backend API contracts, authentication model, authorization model, catalog architecture, inventory architecture, checkout architecture, order architecture, payment architecture, seller architecture, search architecture, recommendation architecture, notification architecture, messaging architecture, administration architecture, and security model.

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

Complete the production-ready web applications for:

• Advanced customer shopping experience
• Advanced search
• Product discovery
• Product comparison
• Recommendations
• Shopping cart
• Checkout
• Payments
• Orders
• Returns
• Refunds
• Reviews
• Customer/seller messaging
• Notifications
• Seller management
• Seller catalog management
• Seller inventory management
• Seller orders
• Seller fulfillment
• Seller shipping
• Seller promotions
• Seller coupons
• Seller analytics
• Seller revenue
• Seller payouts
• Administration
• Moderation
• CMS
• Feature flags
• System configuration
• Audit
• Reports

The frontend must remain consistent with the established backend contracts.

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

State:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

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

ADVANCED PRODUCT EXPERIENCE

Complete the customer product experience.

Support:

• Product gallery
• Image zoom
• Product video
• Variant selection
• Seller offer selection
• Pricing
• Promotions
• Coupons
• Availability
• Shipping estimates
• Taxes
• Reviews
• Ratings
• Product specifications
• Product attributes
• Related products
• Similar products
• Frequently bought together
• Cross-sells
• Upsells
• Recently viewed

Product information must always reflect server state.

────────────────────────────────────────

SELLER OFFER EXPERIENCE

For products with multiple sellers, support:

• Seller list
• Seller comparison
• Price comparison
• Condition
• Shipping
• Seller rating
• Delivery estimate
• Availability

Allow customers to select a specific offer.

Clearly distinguish:

• Product
• Seller
• Offer
• Price
• Fulfillment

────────────────────────────────────────

ADVANCED SEARCH

Complete:

• Search input
• Autocomplete
• Search suggestions
• Recent searches
• Trending searches
• Search history
• Product results
• Seller results
• Category results
• Faceted filtering
• Price range
• Rating
• Brand
• Seller
• Availability
• Sorting

Support URL-synchronized search state.

Implement:

• Loading
• Empty state
• No-results suggestions
• Error
• Retry

Use debouncing appropriately.

────────────────────────────────────────

SEARCH PERFORMANCE

Optimize:

• Search requests
• Autocomplete
• Result rendering
• Infinite scrolling where appropriate
• Pagination
• Image loading
• Query caching
• Prefetching

Do not send unnecessary duplicate search requests.

────────────────────────────────────────

PRODUCT COMPARISON

Implement a product-comparison experience where appropriate.

Support:

• Select products
• Compare attributes
• Compare pricing
• Compare ratings
• Compare seller offers
• Compare availability

Ensure comparison works for compatible product structures.

────────────────────────────────────────

RECOMMENDATIONS

Implement UI for:

• Recently viewed
• Similar products
• Related products
• Frequently bought together
• Trending products
• Personalized recommendations
• Cross-sells
• Upsells

Recommendation failures must not break the product page.

Use graceful fallback states.

────────────────────────────────────────

WISHLIST

Complete:

• Wishlist page
• Add/remove
• Move to cart
• Availability changes
• Price changes
• Empty state
• Optimistic updates
• Error recovery

Synchronize with backend state.

────────────────────────────────────────

SHOPPING CART

Complete:

• Cart page
• Cart drawer
• Seller grouping
• Quantity editing
• Remove
• Save for later where supported
• Promotions
• Coupons
• Tax estimates
• Shipping estimates
• Cart totals
• Inventory warnings
• Price-change warnings
• Seller availability warnings

Client totals are informational only.

The backend remains authoritative.

────────────────────────────────────────

CHECKOUT

Complete the checkout flow.

Support:

• Address selection
• New address
• Shipping method
• Delivery estimate
• Tax
• Coupon
• Promotions
• Order summary
• Payment
• Payment state
• Confirmation

Support multi-seller checkout.

Show seller-specific shipping groups when required.

────────────────────────────────────────

CHECKOUT FAILURE STATES

Handle:

• Inventory unavailable
• Price changed
• Coupon expired
• Promotion invalid
• Shipping unavailable
• Tax calculation failure
• Payment failure
• Checkout expiration
• Network interruption

Provide useful recovery actions.

Never silently lose the checkout state.

────────────────────────────────────────

PAYMENT UX

Implement payment UI using approved Stripe contracts.

Support:

• Payment method selection
• Payment confirmation
• Authentication/3DS flows where required
• Processing
• Success
• Failure
• Retry

Never handle raw payment-card data outside approved Stripe components/integration.

────────────────────────────────────────

ORDER EXPERIENCE

Implement:

• Orders page
• Order detail
• Seller order grouping
• Order timeline
• Payment status
• Shipment status
• Tracking
• Delivery estimate
• Invoice access where available
• Cancel order
• Return item
• Refund status

Support partial fulfillment and split orders.

────────────────────────────────────────

ORDER TIMELINE

Display:

• Order placed
• Payment confirmed
• Processing
• Shipment created
• In transit
• Out for delivery
• Delivered
• Return requested
• Refund issued

Use backend state as authoritative.

────────────────────────────────────────

RETURNS

Implement:

• Return eligibility
• Return request
• Item selection
• Return reason
• Return method
• Return shipping
• Return status
• Refund status
• Exchange request

Support item-level returns for multi-item orders.

────────────────────────────────────────

EXCHANGES

Support:

• Exchange eligibility
• Select replacement
• Variant selection
• Shipping
• Status
• Replacement tracking

Handle unavailable replacement inventory gracefully.

────────────────────────────────────────

REVIEWS

Complete:

• Write review
• Rating
• Review text
• Review media
• Verified purchase indicator
• Edit where allowed
• Delete where allowed
• Seller response
• Report review

Display:

• Rating summary
• Rating distribution
• Review sorting
• Review filtering

────────────────────────────────────────

CUSTOMER/SELLER MESSAGING

Complete marketplace messaging UI.

Support:

• Conversation list
• Conversation details
• Message history
• Message composer
• Attachments
• Unread counts
• Read state
• Order context
• Seller staff participation

Support:

• Loading
• Empty
• Error
• Retry
• Pagination

Do not expose conversations belonging to another seller.

────────────────────────────────────────

NOTIFICATIONS

Complete:

• Notification center
• Unread count
• Read/unread
• Notification preferences
• Deep-link navigation

Support:

• Orders
• Payments
• Shipments
• Returns
• Refunds
• Seller notifications
• Security
• Promotions

────────────────────────────────────────

SELLER DASHBOARD

Complete seller navigation and workflows.

Support:

• Dashboard
• Store
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Promotions
• Coupons
• Reviews
• Messages
• Analytics
• Revenue
• Payouts
• Settings

Use seller-scoped route protection.

────────────────────────────────────────

SELLER OVERVIEW

Dashboard metrics may include:

• Sales
• Orders
• Revenue
• Average order value
• Conversion
• Inventory alerts
• Pending fulfillment
• Returns
• Reviews
• Payout status

Use Recharts where appropriate.

Show:

• Loading
• Empty
• Error
• Date range
• Comparison period where supported

────────────────────────────────────────

SELLER PRODUCTS

Implement:

• Product list
• Search
• Filters
• Sort
• Create product
• Edit product
• Variants
• Attributes
• Media
• Publication status
• Moderation status
• Seller offers

Support bulk operations where backend APIs allow them.

────────────────────────────────────────

SELLER PRODUCT FORM

Implement production-ready forms for:

• Product title
• Description
• Category
• Brand
• Attributes
• Variants
• Identifiers
• Media
• SEO metadata
• Offer information

Use React Hook Form and Zod.

Support autosave/draft where appropriate and authorized by the backend.

────────────────────────────────────────

SELLER MEDIA LIBRARY

Implement:

• Media list
• Upload
• Drag and drop
• Preview
• Processing status
• Retry
• Delete
• Search
• Filtering

Use signed-upload workflows.

Do not upload large media through unnecessary application API routes.

────────────────────────────────────────

SELLER INVENTORY

Implement:

• Inventory list
• Warehouse filter
• Product filter
• SKU
• Available quantity
• Reserved quantity
• In-transit quantity
• Low-stock state
• Adjust inventory where permitted
• Inventory history

Support controlled administrative actions.

────────────────────────────────────────

SELLER ORDERS

Implement:

• Order list
• Filters
• Search
• Order detail
• Seller order detail
• Customer information authorized for fulfillment
• Fulfillment state
• Shipment state
• Tracking
• Cancellation where permitted
• Returns

Never expose unauthorized customer data.

────────────────────────────────────────

SELLER FULFILLMENT

Support:

• Fulfillment queue
• Order preparation
• Shipment creation
• Carrier selection
• Tracking
• Fulfillment status
• Bulk operations where supported

Show clear failure states.

────────────────────────────────────────

SELLER SHIPPING

Implement interfaces for:

• Shipping methods
• Shipping settings
• Shipping zones
• Shipping rates
• Delivery estimates
• Carrier configuration where supported

Do not expose provider secrets.

────────────────────────────────────────

SELLER PROMOTIONS

Implement:

• Promotion list
• Create
• Edit
• Activate
• Pause
• Expire
• Product targeting
• Category targeting
• Seller/store scope
• Discount rules

Validate forms client-side while relying on backend validation.

────────────────────────────────────────

SELLER COUPONS

Support:

• Coupon creation
• Code
• Discount
• Usage limit
• Customer limit
• Expiration
• Eligibility
• Activation/deactivation

Show conflicts and validation errors clearly.

────────────────────────────────────────

SELLER REVIEWS

Implement:

• Review list
• Filters
• Rating
• Verified purchase
• Response
• Report
• Moderation status where appropriate

Sellers must only see reviews associated with their own products.

────────────────────────────────────────

SELLER ANALYTICS

Implement dashboards for:

• Sales
• Revenue
• Orders
• Product performance
• Conversion
• Inventory turnover
• Returns
• Reviews
• Customer trends

Support:

• Date filters
• Comparison periods
• Charts
• Tables
• Export where supported

Do not expose another seller's metrics.

────────────────────────────────────────

SELLER FINANCIALS

Implement:

• Revenue overview
• Commission
• Pending balance
• Available balance
• Payouts
• Payout history
• Settlement information
• Refund adjustments

Clearly distinguish:

• Revenue
• Balance
• Payout
• Commission
• Refund

Do not present these as interchangeable values.

────────────────────────────────────────

SELLER ONBOARDING

Implement:

• Registration
• Business information
• Verification
• Document upload
• Store setup
• Payout setup
• Review state
• Approval
• Rejection
• Resubmission

Support:

• Draft
• Pending
• Under review
• Approved
• Rejected
• Suspended

Sensitive data must be handled securely.

────────────────────────────────────────

ADMIN DASHBOARD

Complete administration interface.

Support:

• Dashboard
• Customers
• Sellers
• Catalog
• Products
• Categories
• Brands
• Orders
• Payments
• Refunds
• Returns
• Reviews
• Moderation
• Reports
• CMS
• Feature flags
• Audit
• System configuration

Use permission-aware navigation.

────────────────────────────────────────

ADMIN CUSTOMER MANAGEMENT

Support:

• Search
• Customer detail
• Account state
• Security overview
• Orders
• Returns
• Reports
• Sessions/devices where authorized
• Suspend/reactivate

Sensitive fields must be role-restricted.

────────────────────────────────────────

ADMIN SELLER MANAGEMENT

Support:

• Seller search
• Seller detail
• Verification
• Store
• Products
• Orders
• Performance
• Risk
• Payout status
• Suspend/reactivate
• Staff

Sensitive financial data must require explicit permissions.

────────────────────────────────────────

ADMIN CATALOG MANAGEMENT

Support:

• Categories
• Brands
• Products
• Product moderation
• Seller offers
• Product media
• Publication
• Suspension
• Archival

Use bulk-action UX only where corresponding backend APIs are available.

────────────────────────────────────────

ADMIN ORDERS AND PAYMENTS

Support investigation for:

• Orders
• Payments
• Refunds
• Returns
• Payouts

Provide read-only views by default.

Destructive/financial actions require:

• Explicit confirmation
• Reason
• Appropriate permission
• Audit visibility

────────────────────────────────────────

MODERATION UI

Support:

• Report queue
• Moderation queue
• Case detail
• Evidence
• Policy reference
• Action
• Appeal
• Resolution
• Audit trail

Do not display restricted evidence unless the backend authorizes it.

────────────────────────────────────────

CMS UI

Implement:

• Page list
• Drafts
• Versions
• Content editing
• Preview
• Scheduling
• Publishing
• Unpublishing
• Archiving

Support:

• Draft
• Review
• Approved
• Scheduled
• Published
• Archived

────────────────────────────────────────

FEATURE FLAGS UI

Implement:

• Feature list
• Create
• Edit
• Targeting
• Percentage rollout
• Region targeting
• Seller targeting
• Customer targeting
• Device/app targeting
• Kill switch
• Rollback
• Audit history

Sensitive feature flags must use backend authorization.

────────────────────────────────────────

SYSTEM CONFIGURATION UI

Implement:

• Configuration list
• Search
• Value editing
• Validation
• Version history
• Approval
• Activation
• Rollback

Never expose secrets.

Mask sensitive configuration fields.

────────────────────────────────────────

AUDIT UI

Implement:

• Audit log search
• Filters
• Actor
• Action
• Resource
• Time range
• Result
• Detail view

Support large datasets using server-side pagination and filtering.

────────────────────────────────────────

REPORTING UI

Support:

• Report creation
• Report type
• Date range
• Filters
• Generation status
• Download
• Expiration

Reports must be securely downloaded.

────────────────────────────────────────

INTERNATIONALIZATION

Complete frontend localization.

Support:

• Multiple languages
• Locale persistence
• Currency formatting
• Date/time
• Relative dates
• Number formatting
• RTL
• Localized validation
• Localized notifications

Customer-facing and seller-facing locales may have different defaults.

────────────────────────────────────────

ACCESSIBILITY

Complete WCAG 2.2 AA support.

Validate:

• Keyboard navigation
• Screen-reader semantics
• Focus management
• Dialogs
• Tables
• Forms
• Product controls
• Checkout
• Seller dashboards
• Admin dashboards
• Charts
• Notifications

Provide accessible alternatives for charts and visual analytics.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Product pages
• Search
• Category pages
• Large tables
• Seller dashboards
• Admin dashboards
• Reports
• Charts
• Media
• Query caching
• Virtualization
• Code splitting
• Dynamic imports

Use server rendering where appropriate.

────────────────────────────────────────

SECURITY

Implement:

• Protected routes
• Permission-aware UI
• Secure forms
• Safe URL handling
• Secure file-upload flows
• XSS-safe rendering
• Content Security Policy compatibility
• Sensitive-field masking
• Safe error messages

Never expose:

• Secrets
• Payment credentials
• Password hashes
• Private provider credentials

Frontend authorization is not the final security boundary.

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Validation
• Utilities
• Formatting
• State logic
• Permission-aware UI

COMPONENT TESTS

• Product
• Cart
• Checkout
• Seller forms
• Admin forms
• Tables
• Charts
• Notifications
• Messaging

INTEGRATION TESTS

• API client
• Authentication
• Search
• Checkout
• Seller dashboard
• Admin dashboard
• File upload

END-TO-END TESTS

Customer:

• Registration
• Search
• Product
• Cart
• Checkout
• Order
• Return
• Review

Seller:

• Registration
• Verification
• Product creation
• Inventory
• Order
• Fulfillment
• Promotion
• Payout

Admin:

• Login
• Customer management
• Seller management
• Catalog moderation
• Order investigation
• CMS
• Feature flags
• Audit

ACCESSIBILITY TESTS

• Keyboard
• Screen readers
• Forms
• Tables
• Checkout
• Dashboards

PERFORMANCE TESTS

• Search
• Product pages
• Large tables
• Seller dashboards
• Admin dashboards

────────────────────────────────────────

DOCUMENTATION

Generate:

• Frontend architecture
• Customer experience guide
• Seller dashboard guide
• Admin dashboard guide
• Design system
• Component standards
• State-management standards
• API client standards
• Search UX standards
• Checkout UX standards
• Accessibility standards
• Internationalization standards
• SEO standards
• Performance standards
• Testing standards

────────────────────────────────────────

PROJECT INDEX

Update the frontend Project Index with:

• Customer pages
• Seller pages
• Admin pages
• Components
• Layouts
• Hooks
• Stores
• Queries
• API integrations
• Forms
• Search
• Checkout
• Seller workflows
• Admin workflows
• Tests
• Dependencies
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

FRONTEND MILESTONE 11

Advanced product discovery, search, comparison, recommendations, and product offers.

FRONTEND MILESTONE 12

Cart, advanced checkout, payments, order confirmation, and failure recovery.

FRONTEND MILESTONE 13

Orders, fulfillment tracking, returns, refunds, exchanges, and reviews.

FRONTEND MILESTONE 14

Customer-seller messaging and advanced notifications.

FRONTEND MILESTONE 15

Seller onboarding, verification, store management, and seller products.

FRONTEND MILESTONE 16

Seller inventory, orders, fulfillment, shipping, promotions, coupons, and reviews.

FRONTEND MILESTONE 17

Seller analytics, revenue, settlements, and payouts.

FRONTEND MILESTONE 18

Admin customer, seller, catalog, order, payment, and moderation workflows.

FRONTEND MILESTONE 19

CMS, feature flags, system configuration, audit, reports, and administrative controls.

FRONTEND MILESTONE 20

Internationalization, accessibility, performance optimization, security testing, E2E testing, and production hardening.

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

This volume completes the web frontend.

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

Treat the frontend as a globally used enterprise marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• High search traffic
• High checkout traffic
• Large seller datasets
• Large administration datasets
• Multiple currencies
• Multiple languages
• Strong security requirements
• Strict accessibility requirements

Prioritize:

• Performance
• Accessibility
• SEO
• Security
• Correct state synchronization
• Excellent ecommerce UX
• Seller isolation in UI
• Maintainability
• Scalability
• Production readiness
