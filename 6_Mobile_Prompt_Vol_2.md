You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready mobile application for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The mobile application must consume the established backend API contracts, authentication model, authorization model, catalog architecture, inventory architecture, checkout architecture, order architecture, payment architecture, seller architecture, notification architecture, messaging architecture, analytics architecture, and security model.

Do not redesign backend APIs.

Do not redesign the database.

Do not implement backend code.

Do not implement web frontend code.

Do not implement infrastructure implementation code.

Do not generate Terraform.

Do not generate Kubernetes manifests.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Complete the advanced production-ready Android and iOS applications.

Implement the remaining mobile experiences for:

• Advanced product discovery
• Advanced search
• Product comparison
• Recommendations
• Shopping cart
• Advanced checkout
• Payments
• Orders
• Shipment tracking
• Returns
• Refunds
• Exchanges
• Reviews
• Notifications
• Customer-seller messaging
• Account security
• Privacy
• Business/customer communication where supported
• Deep linking
• Offline-aware behavior
• Performance optimization
• Accessibility
• Localization
• Production hardening

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• React Native
• Expo
• TypeScript

Navigation:

• React Navigation

State:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Storage:

• Expo Secure Store
• SQLite or approved local persistence layer

Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service

Testing:

• Jest
• React Native Testing Library
• Detox or approved E2E framework

────────────────────────────────────────

ADVANCED PRODUCT EXPERIENCE

Complete the mobile product experience.

Support:

• Product gallery
• Zoom
• Video
• Specifications
• Attributes
• Variant selection
• Seller offers
• Price
• Discounts
• Promotions
• Coupons
• Availability
• Shipping estimates
• Ratings
• Reviews
• Recommendations
• Related products
• Similar products
• Frequently bought together
• Cross-sells
• Upsells
• Recently viewed

Product information must remain synchronized with backend state.

────────────────────────────────────────

PRODUCT COMPARISON

Implement a mobile product-comparison experience where supported.

Support:

• Select products
• Compare attributes
• Compare specifications
• Compare price
• Compare ratings
• Compare seller offers
• Compare availability

Handle products with different attribute structures gracefully.

────────────────────────────────────────

ADVANCED SEARCH

Complete mobile search.

Support:

• Autocomplete
• Suggestions
• Recent searches
• Trending searches
• Search history
• Filters
• Facets
• Sorting
• Price range
• Rating
• Brand
• Seller
• Category
• Availability
• Search result pagination/infinite loading

Support keyboard-aware search UX.

────────────────────────────────────────

SEARCH PERFORMANCE

Optimize:

• Debouncing
• Request cancellation
• Query caching
• Infinite lists
• Image loading
• Result virtualization
• Search state restoration

Avoid duplicate search requests.

────────────────────────────────────────

RECOMMENDATIONS

Complete recommendation interfaces for:

• Home feed
• Recently viewed
• Similar products
• Related products
• Frequently bought together
• Trending
• Personalized products
• Cross-sells
• Upsells

Recommendation failures must not block product discovery or checkout.

────────────────────────────────────────

SHOPPING CART

Complete cart behavior.

Support:

• Multi-seller grouping
• Quantity editing
• Product removal
• Save for later where supported
• Coupon entry
• Promotion display
• Shipping estimates
• Tax estimates
• Total
• Inventory warnings
• Price-change warnings
• Seller availability

Handle stale cart state correctly.

Always revalidate critical values on checkout.

────────────────────────────────────────

ADVANCED CHECKOUT

Complete checkout.

Support:

• Address selection
• Address creation
• Address editing
• Shipping options
• Delivery estimates
• Tax
• Coupons
• Promotions
• Seller shipping groups
• Multi-seller checkout
• Order summary
• Payment
• Confirmation

Support recovery from:

• Network failure
• Inventory conflict
• Price change
• Coupon expiration
• Shipping failure
• Tax failure
• Checkout expiration

────────────────────────────────────────

PAYMENT EXPERIENCE

Complete payment UX.

Support:

• Payment method selection
• Stripe/payment-provider integration
• Authentication/3DS where required
• Processing
• Success
• Failure
• Retry

Use only approved payment SDKs and provider contracts.

Never store raw card information in application storage.

────────────────────────────────────────

ORDER EXPERIENCE

Complete:

• Order history
• Order detail
• Seller order grouping
• Order timeline
• Payment status
• Fulfillment status
• Shipment status
• Tracking
• Delivery estimates
• Invoice access
• Cancellation

Support multiple sellers and shipments.

────────────────────────────────────────

SHIPMENT TRACKING

Implement:

• Shipment list
• Tracking timeline
• Carrier
• Tracking number
• Shipment status
• Delivery estimate
• Delayed state
• Delivered state

Deep-link to tracking where supported.

────────────────────────────────────────

RETURNS AND REFUNDS

Complete:

• Return eligibility
• Item selection
• Return reason
• Return request
• Return shipping
• Return status
• Refund status
• Refund details
• Exchange request
• Replacement selection

Support partial returns for multi-item orders.

────────────────────────────────────────

EXCHANGE EXPERIENCE

Support:

• Exchange eligibility
• Replacement selection
• Variant selection
• Inventory availability
• Exchange confirmation
• Replacement shipment
• Return tracking

Handle replacement inventory changes gracefully.

────────────────────────────────────────

REVIEWS

Complete:

• Rating selection
• Review text
• Review media
• Verified purchase state
• Review submission
• Review editing where allowed
• Review deletion where allowed
• Seller response
• Report review

Support:

• Rating distribution
• Sorting
• Filtering

────────────────────────────────────────

CUSTOMER-SELLER MESSAGING

Complete marketplace messaging.

Support:

• Conversation list
• Conversation detail
• Order context
• Messages
• Attachments
• Unread counts
• Read state
• Message composer
• Retry
• Pagination

Only expose authorized conversations.

────────────────────────────────────────

NOTIFICATIONS

Complete mobile notification behavior.

Support:

• FCM
• APNS
• Notification permissions
• Token registration
• Token refresh
• Foreground notification
• Background notification
• Terminated-app notification
• Badge counts
• Notification actions
• Deep links

Notification categories:

• Orders
• Payments
• Shipments
• Returns
• Refunds
• Reviews
• Messaging
• Security
• Promotions

────────────────────────────────────────

NOTIFICATION PREFERENCES

Implement:

• Global preferences
• Channel preferences
• Category preferences
• Promotional settings
• Security notification settings

Security-critical notifications must remain available according to backend rules.

────────────────────────────────────────

DEEP LINKING

Complete deep links for:

• Products
• Categories
• Search
• Stores
• Orders
• Shipments
• Returns
• Notifications
• Messages
• Authentication
• Promotions where appropriate

Never trust sensitive values encoded in deep links.

Validate authorization after navigation.

────────────────────────────────────────

OFFLINE-AWARE EXPERIENCE

Complete resilient mobile behavior during network loss.

Support:

• Cached product pages where appropriate
• Cached search state where useful
• Recently viewed cache
• Cart cache
• Address cache
• Notification cache
• Offline indicator
• Reconnect handling
• Query revalidation

Transactional actions must always verify current server state.

Do not claim full offline checkout capability.

────────────────────────────────────────

LOCAL CACHE

Implement safe cache management.

Support:

• Expiration
• Size limits
• Cleanup
• Stale-state detection
• Cache invalidation
• Storage-pressure handling

Do not persist sensitive data unnecessarily.

Do not store payment secrets.

────────────────────────────────────────

CONNECTIVITY

Handle:

• Online
• Offline
• Weak network
• Wi-Fi/cellular transitions
• Reconnection

When connectivity returns:

• Refresh stale queries
• Revalidate cart
• Refresh order state
• Refresh notifications
• Retry safe operations
• Restore pending UI state

Avoid aggressive retries.

────────────────────────────────────────

ACCOUNT SECURITY

Complete mobile security interfaces.

Support:

• Password change
• Password reset
• Session management
• Device management
• Security notifications
• MFA where supported
• Passkeys where supported
• Account recovery

Sensitive operations should require confirmation and appropriate server authorization.

────────────────────────────────────────

PRIVACY

Implement:

• Profile visibility
• Notification preferences
• Marketing preferences
• Data settings
• Session/device visibility
• Account deletion request
• Data export where supported

Do not display data not returned by the backend.

────────────────────────────────────────

SELLER MOBILE SUPPORT

Where the product architecture includes seller mobile functionality, implement the seller mobile foundation for:

• Seller dashboard
• Orders
• Products
• Inventory
• Notifications
• Messages
• Analytics
• Payout overview

Keep seller data strictly isolated from customer data.

Do not duplicate the full seller web dashboard unnecessarily.

Optimize workflows for quick mobile operational tasks.

────────────────────────────────────────

BUSINESS/SELLER MESSAGING

Support seller-side messaging where applicable.

Allow authorized seller users to:

• View conversations
• Respond
• Attach files
• View order context
• Mark messages read

Never expose unrelated customer data.

────────────────────────────────────────

LOCALIZATION

Complete:

• Language selection
• Locale persistence
• Currency formatting
• Date/time formatting
• Relative time
• Regional formatting
• RTL support
• Localized validation
• Localized notifications

Do not hard-code customer-facing strings.

────────────────────────────────────────

ACCESSIBILITY

Complete mobile accessibility.

Support:

• VoiceOver
• TalkBack
• Dynamic Type
• Larger text
• Screen readers
• Accessible labels
• Accessible actions
• Focus management
• Large touch targets
• Contrast
• Reduced motion

Test accessibility across major customer journeys.

────────────────────────────────────────

PERFORMANCE

Optimize:

• App startup
• Navigation
• Product lists
• Search
• Cart
• Checkout
• Image loading
• Video loading
• Cache access
• Memory
• List virtualization
• Query invalidation
• Background work

Avoid excessive React re-renders.

────────────────────────────────────────

BATTERY OPTIMIZATION

Minimize:

• Unnecessary polling
• Background refresh
• Duplicate requests
• Aggressive retries
• Unnecessary media downloads

Prefer:

• Push notifications
• Cached data
• Event-driven refresh
• Controlled background tasks

────────────────────────────────────────

DATA USAGE

Support appropriate data-conscious options for:

• Image quality
• Video quality
• Auto-download
• Background downloads
• Cellular usage

Do not compromise checkout correctness for bandwidth optimization.

────────────────────────────────────────

ERROR HANDLING

Provide recovery UI for:

• Login failure
• Network failure
• Search failure
• Cart failure
• Checkout failure
• Payment failure
• Order failure
• Return failure
• Review failure
• Upload failure
• Notification failure

Never silently lose user input.

────────────────────────────────────────

SECURITY HARDENING

Implement:

• Secure storage
• Safe deep links
• Secure URL handling
• Sensitive-data protection
• Safe clipboard behavior where appropriate
• Secure media handling
• Authentication-state protection
• Secure logout
• Device/session protection

Do not implement custom cryptography.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Validation
• State transitions
• Utilities
• Formatting
• Permission-aware UI

COMPONENT TESTS

Test:

• Product pages
• Search
• Cart
• Checkout
• Orders
• Returns
• Reviews
• Notifications
• Messaging
• Seller workflows

INTEGRATION TESTS

Test:

• API client
• Authentication
• Query management
• Payment integration
• Notifications
• Deep linking
• Offline cache

END-TO-END TESTS

Customer:

• Registration
• Login
• Search
• Product
• Cart
• Checkout
• Payment
• Order
• Return
• Review
• Messaging
• Notifications

Seller:

• Login
• Orders
• Product operations
• Inventory
• Messaging
• Notifications

ACCESSIBILITY TESTS

• VoiceOver
• TalkBack
• Dynamic text
• Navigation
• Forms
• Checkout

PERFORMANCE TESTS

• Startup
• Search
• Large product lists
• Cart
• Checkout
• Media

────────────────────────────────────────

DOCUMENTATION

Generate:

• Advanced mobile architecture
• Product experience
• Search
• Cart
• Checkout
• Orders
• Returns
• Reviews
• Messaging
• Notifications
• Deep linking
• Offline strategy
• Security
• Accessibility
• Localization
• Performance
• Testing

────────────────────────────────────────

PROJECT INDEX

Update the mobile Project Index with:

• Screens
• Features
• Components
• Navigation
• Hooks
• Stores
• Queries
• API integrations
• Payment integrations
• Notification integrations
• Deep links
• Local persistence
• Offline functionality
• Seller functionality
• Tests
• Dependencies
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

MOBILE MILESTONE 9

Advanced product discovery, search, comparison, recommendations, and seller offers.

MOBILE MILESTONE 10

Advanced cart, checkout, shipping, taxes, promotions, coupons, payments, and confirmation.

MOBILE MILESTONE 11

Orders, shipments, tracking, cancellations, returns, refunds, and exchanges.

MOBILE MILESTONE 12

Reviews, ratings, customer-seller messaging, and notifications.

MOBILE MILESTONE 13

Advanced account security, privacy, data settings, sessions, and devices.

MOBILE MILESTONE 14

Seller mobile foundation, seller orders, seller inventory, seller messaging, and seller analytics.

MOBILE MILESTONE 15

Offline-aware behavior, caching, synchronization, connectivity handling, and background optimization.

MOBILE MILESTONE 16

Accessibility, localization, data/battery optimization, and UX hardening.

MOBILE MILESTONE 17

Integration testing, E2E testing, security testing, performance testing, and production hardening.

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

This volume completes the advanced mobile application.

Do not implement:

• Backend code
• Web frontend code
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the mobile applications as production ecommerce clients serving a global customer base and operational seller users.

Assume:

• Millions of customers
• Large product catalogs
• High checkout traffic
• Multiple sellers per order
• Large order histories
• Unreliable mobile networks
• Android/iOS platform differences
• Multiple currencies
• Multiple languages
• Strong security requirements
• Strict accessibility requirements

Prioritize:

• Reliability
• Security
• Performance
• Excellent shopping UX
• Correct server-state synchronization
• Offline awareness
• Accessibility
• Battery efficiency
• Maintainability
• Production readiness
