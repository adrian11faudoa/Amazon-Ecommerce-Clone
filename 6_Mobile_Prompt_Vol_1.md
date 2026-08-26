You are operating in Senior Engineering Team Mode.

Build the production-ready mobile application foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The mobile application must consume the established backend API contracts, authentication model, authorization model, catalog architecture, cart architecture, checkout architecture, order architecture, payment architecture, notification architecture, seller/customer account architecture, and security model.

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

Build the production-ready React Native mobile customer application for:

• Android
• iOS

The application must support:

• Authentication
• Account management
• Product discovery
• Categories
• Brands
• Search
• Product details
• Product variants
• Seller offers
• Wishlist
• Shopping cart
• Checkout
• Payments
• Orders
• Shipment tracking
• Returns
• Refunds
• Exchanges
• Reviews
• Ratings
• Recommendations
• Notifications
• Customer-seller messaging
• Addresses
• Privacy
• Security
• Deep linking
• Push notifications
• Offline-aware browsing and shopping

The mobile application must be:

• Fast
• Secure
• Accessible
• Responsive
• Offline-aware
• Battery-conscious
• Maintainable
• Scalable
• Production-ready

────────────────────────────────────────

TECHNOLOGY STACK

Framework:

• React Native
• Expo
• TypeScript

Navigation:

• React Navigation

State Management:

• Zustand

Server State:

• TanStack Query

Forms:

• React Hook Form
• Zod

Networking:

• Typed API client
• HTTPS

Secure Storage:

• Expo Secure Store or approved secure platform storage

Local Persistence:

• SQLite or approved local persistence layer where appropriate

Notifications:

• Firebase Cloud Messaging
• Apple Push Notification Service through the approved notification architecture

Media:

• Expo media APIs
• Approved native integrations where required

Testing:

• Jest
• React Native Testing Library
• Detox or approved E2E mobile framework

────────────────────────────────────────

MOBILE ARCHITECTURE

Use:

• Feature-first architecture
• Strict TypeScript
• Reusable components
• Clear navigation boundaries
• Separation of UI and business logic
• Clean Architecture principles where appropriate
• Explicit server/local state separation
• Secure storage boundaries
• Dependency inversion where useful

Do not put business logic directly inside screen components.

Do not duplicate backend business rules.

Do not use Zustand as the authoritative server-state system.

────────────────────────────────────────

APPLICATION STRUCTURE

Organize the application around:

• Authentication
• Onboarding
• Home
• Categories
• Brands
• Search
• Products
• Wishlist
• Cart
• Checkout
• Orders
• Returns
• Reviews
• Notifications
• Messaging
• Profile
• Addresses
• Settings
• Privacy
• Security

Shared infrastructure must include:

• API client
• Authentication
• Secure storage
• Query management
• Navigation
• Push notifications
• Deep linking
• Connectivity detection
• Offline caching
• Error handling
• Logging
• Analytics abstraction

────────────────────────────────────────

FOLDER STRUCTURE

Create a scalable structure including:

src/

features/

components/

navigation/

screens/

layouts/

hooks/

providers/

services/

stores/

database/

storage/

notifications/

media/

lib/

config/

types/

utils/

assets/

tests/

Keep domain features isolated.

Do not create unnecessary abstraction layers.

────────────────────────────────────────

EXPO FOUNDATION

Implement:

• Expo application configuration
• Entry point
• Environment configuration
• App metadata
• Android configuration
• iOS configuration
• Build configuration
• Development configuration
• Production configuration

Support:

• Android
• iOS

Keep platform-specific code isolated.

────────────────────────────────────────

NAVIGATION

Implement React Navigation architecture.

Support:

• Authentication stack
• Onboarding
• Main application navigation
• Product navigation
• Search navigation
• Cart
• Checkout
• Orders
• Returns
• Account
• Settings
• Notifications
• Messaging

Support:

• Nested navigation
• Modal screens where appropriate
• Protected screens
• Deep links
• Tab navigation
• Stack navigation

Never rely on mobile navigation for authorization.

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
• Token refresh
• Device registration

Use secure storage for sensitive authentication state.

Do not store access or refresh tokens in unencrypted general-purpose storage.

────────────────────────────────────────

SECURE STORAGE

Implement secure storage for:

• Authentication credentials/tokens
• Device identifiers where appropriate
• Security preferences
• Other sensitive client data

Separate:

• Secure secrets
• Local cache
• User preferences
• Shopping data

Do not store passwords.

────────────────────────────────────────

CUSTOMER ACCOUNT

Implement:

• Profile
• Account settings
• Addresses
• Security settings
• Notification preferences
• Privacy settings
• Session/device management where supported

Use backend state as the source of truth.

────────────────────────────────────────

HOME EXPERIENCE

Implement:

• Home feed
• Search entry
• Categories
• Brands
• Promotional content
• Featured products
• Trending products
• Recommendations
• Recently viewed
• Personalized sections

Use skeletons and graceful loading states.

Recommendations must not block the main home experience.

────────────────────────────────────────

CATEGORY EXPERIENCE

Implement:

• Category browsing
• Subcategories
• Product grids
• Filters
• Sorting
• Pagination/infinite loading
• Empty state
• Error state

Support large result sets efficiently.

────────────────────────────────────────

SEARCH

Implement:

• Search input
• Autocomplete
• Search suggestions
• Recent searches
• Search history
• Filters
• Sorting
• Facets
• Search results
• Empty state
• No-results recovery
• Error state

Use debouncing appropriately.

Synchronize search state with navigation where useful.

────────────────────────────────────────

PRODUCT DETAILS

Implement:

• Product gallery
• Product images
• Video where supported
• Product title
• Description
• Specifications
• Attributes
• Variants
• Seller offers
• Price
• Discounts
• Availability
• Delivery estimate
• Reviews
• Ratings
• Recommendations
• Frequently bought together
• Similar products
• Cross-sells
• Upsells
• Wishlist
• Add to cart

Do not trust client-calculated prices.

────────────────────────────────────────

PRODUCT MEDIA

Support:

• Image loading
• Image caching
• Zoom
• Fullscreen
• Video playback
• Thumbnails
• Loading states
• Failure states

Optimize media for mobile bandwidth.

────────────────────────────────────────

VARIANTS

Support:

• Size
• Color
• Capacity
• Material
• Style
• Other backend-defined attributes

Variant changes must update:

• Price
• Availability
• SKU
• Product media
• Seller offer
• Delivery estimate

────────────────────────────────────────

SELLER OFFERS

Support displaying:

• Seller
• Seller rating
• Price
• Condition
• Availability
• Shipping
• Delivery estimate

Clearly distinguish product information from seller-specific offer information.

────────────────────────────────────────

WISHLIST

Implement:

• List wishlist
• Add item
• Remove item
• Move to cart
• Availability status
• Price-change status
• Empty state
• Optimistic updates where safe

Synchronize with backend state.

────────────────────────────────────────

SHOPPING CART

Implement:

• Cart screen
• Cart item
• Seller grouping
• Quantity controls
• Remove
• Save for later where supported
• Coupon entry
• Promotion display
• Estimated taxes
• Shipping estimate
• Total

Support:

• Out-of-stock items
• Price changes
• Seller changes
• Invalid items
• Network errors

Backend remains authoritative.

────────────────────────────────────────

CHECKOUT

Implement production-ready checkout UI.

Support:

• Address selection
• Address creation
• Shipping method
• Delivery estimate
• Tax
• Coupon
• Promotions
• Order summary
• Payment
• Confirmation

Support multi-seller orders.

Use a clear checkout state model.

────────────────────────────────────────

PAYMENT

Integrate the approved Stripe/payment-provider architecture.

Support:

• Payment method selection
• Payment confirmation
• Authentication/3DS where required
• Payment processing
• Success
• Failure
• Retry

Never process raw card data outside approved payment SDK boundaries.

────────────────────────────────────────

ORDERS

Implement:

• Order list
• Order detail
• Seller grouping
• Order timeline
• Payment status
• Shipment status
• Tracking
• Delivery estimate
• Invoice access where available
• Cancellation where allowed

Support multi-seller orders and multiple shipments.

────────────────────────────────────────

SHIPMENT TRACKING

Display:

• Shipment status
• Carrier
• Tracking number
• Tracking events
• Estimated delivery
• Delivery status

Handle delayed or unavailable tracking gracefully.

────────────────────────────────────────

RETURNS AND EXCHANGES

Implement:

• Return eligibility
• Return request
• Item selection
• Return reason
• Return status
• Refund status
• Exchange request
• Replacement selection
• Replacement tracking

Show backend-authoritative status.

────────────────────────────────────────

REVIEWS

Implement:

• Rating
• Review text
• Review media
• Verified purchase
• Edit where allowed
• Delete where allowed
• Seller response
• Report review

Support:

• Review list
• Rating summary
• Rating filters
• Sorting

────────────────────────────────────────

CUSTOMER-SELLER MESSAGING

Implement:

• Conversation list
• Conversation details
• Message history
• Message composer
• Attachments
• Order context
• Read state
• Unread count

Support:

• Loading
• Empty
• Error
• Retry
• Pagination

Only show conversations authorized for the customer.

────────────────────────────────────────

NOTIFICATIONS

Implement push and in-app notification handling.

Support:

• FCM
• APNS
• Device-token registration
• Token refresh
• Notification permissions
• Foreground handling
• Background handling
• Terminated-app handling
• Badge counts
• Deep-link navigation

Notification categories:

• Orders
• Payments
• Shipments
• Returns
• Refunds
• Security
• Messaging
• Promotions

────────────────────────────────────────

DEEP LINKING

Implement deep links for:

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

Validate authorization after navigation.

Never trust sensitive information included in a deep link.

────────────────────────────────────────

OFFLINE-AWARE EXPERIENCE

Implement mobile-friendly offline behavior.

Support:

• Cached product/category data where appropriate
• Cached recently viewed items
• Cached cart state
• Offline indicator
• Retry after reconnect
• Query persistence where appropriate

Do not claim full offline checkout or guaranteed offline transactions.

Transactional operations must require current backend state.

────────────────────────────────────────

CONNECTIVITY

Implement connectivity detection.

Handle:

• Online
• Offline
• Weak connection
• Wi-Fi/cellular transitions
• Reconnection

When connectivity returns:

• Refresh stale queries
• Retry appropriate non-destructive operations
• Restore notification state
• Refresh cart
• Revalidate checkout state

Avoid aggressive polling.

────────────────────────────────────────

STATE MANAGEMENT

Use TanStack Query for server state.

Use Zustand for:

• UI state
• Theme
• Search UI
• Cart UI
• Checkout UI
• Navigation/UI preferences

Use local persistence for:

• Non-sensitive cache
• Preferences
• Offline-aware state where justified

Do not duplicate authoritative server data unnecessarily.

────────────────────────────────────────

FORMS

Use:

• React Hook Form
• Zod

Implement forms for:

• Registration
• Login
• Profile
• Address
• Checkout
• Review
• Seller/customer messaging where appropriate
• Settings

Support:

• Client validation
• Server validation
• Inline errors
• Loading
• Disabled states
• Accessible feedback

────────────────────────────────────────

ACCESSIBILITY

Support:

• VoiceOver
• TalkBack
• Dynamic type
• Screen readers
• Accessible labels
• Accessible actions
• Focus management
• Sufficient contrast
• Reduced motion
• Large touch targets

Do not communicate important states through color alone.

────────────────────────────────────────

LOCALIZATION

Support:

• Multiple languages
• Locale persistence
• Currency formatting
• Date/time formatting
• Number formatting
• Relative time
• RTL layouts
• Localized validation messages
• Localized notifications

Do not hard-code customer-facing strings throughout feature modules.

────────────────────────────────────────

THEMING

Support:

• Light theme
• Dark theme
• System theme
• Theme persistence

Respect accessibility preferences.

────────────────────────────────────────

PERFORMANCE

Optimize:

• Product lists
• Search results
• Image loading
• Video loading
• Navigation
• Startup
• Memory
• Query caching
• List virtualization
• Background work

Use efficient mobile rendering patterns.

────────────────────────────────────────

BATTERY AND DATA USAGE

Optimize:

• Push notifications
• Query refetching
• Media loading
• Image sizes
• Background tasks
• Network retries

Support data-conscious behavior where appropriate.

────────────────────────────────────────

ERROR HANDLING

Provide recovery behavior for:

• Authentication failure
• Network failure
• Search failure
• Cart failure
• Checkout failure
• Payment failure
• Order failure
• Upload failure
• Notification failure

Never silently lose user-created data.

────────────────────────────────────────

SECURITY

Implement:

• Secure storage
• Protected navigation
• Safe deep links
• Secure URL handling
• Sensitive-data protection
• Safe media handling
• Secure file handling
• Authentication-state protection

Never store:

• Passwords
• Payment credentials
• API secrets

────────────────────────────────────────

TESTING

Generate:

UNIT TESTS

• Validation
• Formatting
• State logic
• Utilities

COMPONENT TESTS

• Product cards
• Product details
• Cart
• Checkout
• Orders
• Reviews
• Notifications
• Messaging

INTEGRATION TESTS

• API client
• Authentication
• TanStack Query
• Deep links
• Push notifications
• Offline behavior

END-TO-END TESTS

• Registration
• Login
• Search
• Product discovery
• Cart
• Checkout
• Payment
• Order
• Return
• Review
• Notifications
• Messaging

ACCESSIBILITY TESTS

• Navigation
• Forms
• Product controls
• Checkout
• Notifications

PERFORMANCE TESTS

• Product lists
• Search
• Large carts
• Startup
• Media loading

────────────────────────────────────────

DOCUMENTATION

Generate:

• Mobile architecture
• Navigation architecture
• API client documentation
• State management standards
• Offline strategy
• Push notification strategy
• Deep linking
• Secure storage
• Media handling
• Accessibility
• Localization
• Performance
• Testing

────────────────────────────────────────

PROJECT INDEX

Maintain the mobile Project Index.

Track:

• Screens
• Navigation
• Components
• Hooks
• Stores
• Queries
• API integrations
• Push notifications
• Deep links
• Local persistence
• Tests
• Dependencies
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

MOBILE MILESTONE 1

Expo foundation, configuration, navigation, theme, providers, API client, secure storage, and error handling.

MOBILE MILESTONE 2

Authentication, onboarding, account, profile, addresses, and device/session management.

MOBILE MILESTONE 3

Home, categories, brands, search, product discovery, product details, variants, seller offers, and recommendations.

MOBILE MILESTONE 4

Wishlist, cart, checkout, shipping, taxes, promotions, coupons, payment UI, and confirmation.

MOBILE MILESTONE 5

Orders, shipments, returns, refunds, exchanges, reviews, and ratings.

MOBILE MILESTONE 6

Notifications, customer-seller messaging, deep links, and notification preferences.

MOBILE MILESTONE 7

Offline-aware caching, connectivity handling, synchronization, accessibility, localization, and performance.

MOBILE MILESTONE 8

End-to-end testing, security testing, performance testing, production hardening, and release readiness.

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

This volume covers the production-ready customer mobile application foundation and core marketplace experience.

Do not implement:

• Backend code
• Web frontend code
• Seller web dashboard
• Admin web dashboard
• Kubernetes
• Terraform
• CI/CD infrastructure

Consume the established backend contracts exactly.

Do not redesign APIs or database structures.

────────────────────────────────────────

QUALITY BAR

Treat the mobile app as a production ecommerce application serving millions of customers.

Assume:

• Large product catalogs
• High search traffic
• Large carts
• High checkout activity
• Multi-seller orders
• Multiple currencies
• Multiple languages
• Unreliable mobile networks
• Android and iOS platform differences
• Strict security requirements
• Strict accessibility requirements

Prioritize:

• Performance
• Reliability
• Security
• Excellent shopping UX
• Correct server-state synchronization
• Offline awareness
• Accessibility
• Battery efficiency
• Maintainability
• Production readiness
