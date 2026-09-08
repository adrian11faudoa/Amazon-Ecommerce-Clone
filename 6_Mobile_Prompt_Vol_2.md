# Amazon Ecommerce Marketplace — Mobile Prompt — Volume 2

## Checkout, Payments, Orders, Fulfillment, Returns, Reviews, Notifications, Account Features, and Production Hardening

You are implementing the second major production-grade mobile customer application implementation unit for an original Amazon-style ecommerce marketplace.

This prompt is fully standalone. It must be executable without requiring another prompt, architecture document, previous conversation, or previously generated document to be present.

The actual repository is the source of truth for existing implementation, contracts, schemas, APIs, navigation, authentication, design system, and infrastructure integrations.

This implementation must extend the existing mobile application into one coherent production-grade customer experience. Do not create a separate application, duplicate architecture, competing API contracts, or parallel business logic.

---

# 1. Mission

Implement the remaining major customer-facing mobile functionality using:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query
* Zustand

The implementation must cover:

* Customer account completion
* Address management
* Checkout
* Checkout validation
* Shipping selection
* Tax presentation
* Promotions/coupons
* Payment UI
* Stripe integration where actually configured
* Payment state handling
* Order creation
* Order confirmation
* Order history
* Order details
* Multi-seller orders
* Multi-shipment orders
* Shipment tracking
* Returns
* Refund status
* Reviews
* Review media
* Notifications
* Notification preferences
* Session/security management
* Deep-link completion
* Accessibility hardening
* Performance hardening
* Security hardening
* Analytics integration
* Production-grade error recovery
* End-to-end customer-flow testing

The mobile application must consume the actual backend contracts.

Never invent backend behavior to make the mobile application appear complete.

---

# 2. Repository-First Implementation

Before changing anything:

1. Inspect the entire repository relevant to the mobile application.
2. Inspect the existing backend contracts.
3. Inspect existing web implementation where useful for understanding API behavior.
4. Inspect existing mobile implementation.
5. Identify:

   * API clients
   * authentication/session handling
   * navigation
   * query configuration
   * Zustand stores
   * design system
   * checkout contracts
   * payment contracts
   * order APIs
   * fulfillment APIs
   * return APIs
   * review APIs
   * notification APIs
   * SSE infrastructure
   * media handling
   * deep-link configuration
   * analytics
   * tests
6. Reuse compatible code and abstractions.
7. Do not duplicate existing systems.
8. Preserve backward compatibility.
9. Make the smallest safe architectural changes required.

If the actual repository differs from the requirements, adapt to the actual implementation while preserving the intended production behavior.

---

# 3. Customer Account

Complete the customer account experience.

Support actual backend capabilities for:

* Customer profile
* Profile editing
* Addresses
* Default address
* Address creation
* Address editing
* Address deletion
* Address selection
* Customer preferences
* Session/security management
* Logout
* Account navigation

All account mutations must use server-side authorization.

Never trust a customer ID supplied by the client to determine ownership.

Handle:

* validation errors
* conflicts
* expired sessions
* deleted addresses
* unavailable addresses
* network failures

---

# 4. Address Management

Implement production-grade mobile address management.

Support:

* Address list
* Add address
* Edit address
* Delete address
* Default address
* Checkout address selection

Use the actual backend address schema.

Do not invent unsupported address fields.

Validate user input client-side for UX, but always rely on backend validation for authority.

Prevent:

* unauthorized address access
* duplicate submissions
* stale updates
* deleting an address currently required by an active operation without appropriate backend handling

Never expose another customer's addresses.

---

# 5. Checkout

Implement the mobile checkout flow using the actual checkout API.

The flow should support the backend's authoritative state machine and may include:

1. Cart
2. Customer information
3. Shipping address
4. Shipping method
5. Promotion/coupon
6. Order review
7. Payment
8. Confirmation

Do not assume the backend uses these exact stages if its actual contract differs.

The backend checkout state is authoritative.

---

# 6. Checkout Validation

Before allowing a customer to proceed, display server-provided validation failures clearly.

Handle:

* Product unavailable
* Quantity unavailable
* Price changed
* Seller offer changed
* Cart changed
* Coupon invalid
* Coupon expired
* Coupon no longer applicable
* Address invalid
* Shipping unavailable
* Tax calculation failure
* Checkout session expired
* Authentication expiration
* Server error

Never silently overwrite the customer's cart or checkout selections.

Provide recovery actions such as:

* Refresh cart
* Update quantity
* Remove unavailable item
* Re-select address
* Re-select shipping
* Remove invalid promotion
* Restart expired checkout

---

# 7. Authoritative Pricing

The mobile client must never calculate authoritative checkout totals.

Display backend-provided:

* Subtotal
* Discounts
* Promotions
* Shipping
* Taxes
* Final total
* Currency

Client-side calculations may be used only for presentation and must never be submitted as authoritative totals.

Use exact currency formatting.

Never use floating-point arithmetic as the source of truth for money.

---

# 8. Promotions and Coupons

Integrate with actual promotion/coupon APIs.

Support where available:

* Coupon entry
* Coupon application
* Coupon removal
* Promotion display
* Discount display
* Validation errors

Handle:

* expired coupon
* invalid coupon
* minimum order failure
* seller restriction
* product restriction
* usage limit
* customer eligibility failure
* checkout expiration

Never claim a coupon is valid based solely on client-side logic.

---

# 9. Shipping Selection

Display available shipping methods from the backend.

Support:

* Shipping method list
* Estimated delivery information where provided
* Shipping price
* Seller-specific or fulfillment-specific methods where supported
* Selection
* Re-selection after cart/address changes

Do not invent delivery estimates.

Do not fabricate carrier names or tracking information.

---

# 10. Tax Presentation

Display tax information returned by the backend.

The mobile client must not become the tax authority.

Do not implement tax calculation rules in the mobile application.

Handle tax calculation failures explicitly.

If tax data is unavailable, display an appropriate state rather than guessing.

---

# 11. Payment UI

Integrate payment functionality according to the actual backend payment contract.

If Stripe is configured and the repository contains the required client-safe integration:

* use the appropriate Stripe mobile SDK
* use client-safe publishable configuration only
* obtain payment information from the backend
* respect backend-created payment state
* handle required customer actions
* handle payment processing
* handle success
* handle failure

Never embed:

* Stripe secret keys
* backend secrets
* webhook secrets
* provider credentials

Never create a second payment architecture.

---

# 12. Payment State Handling

Correctly handle backend payment states such as:

* requires payment
* requires action
* processing
* authorized
* captured
* failed
* cancelled

Do not assume that returning from a payment UI means payment succeeded.

After payment interaction:

1. Query the backend.
2. Reconcile payment/order state.
3. Display the authoritative result.

If the network fails after payment interaction, do not blindly submit another payment.

Avoid duplicate charges.

---

# 13. Ambiguous Payment Failures

Treat ambiguous payment states as a first-class failure mode.

Examples:

* Payment UI completed but response was lost.
* Network disconnected after confirmation.
* App was backgrounded during payment.
* App was killed.
* Payment provider returned an uncertain result.
* Backend request timed out.

The application must recover by querying the authoritative backend state.

Do not create duplicate PaymentIntent operations merely because the client lost a response.

---

# 14. Order Creation

Integrate with the actual checkout/order APIs.

Prevent duplicate order creation.

Use backend idempotency mechanisms where supported.

Never create a second order simply because the customer:

* double taps
* retries after timeout
* returns to the screen
* relaunches the app
* loses network connectivity

After order submission, reconcile against backend state.

---

# 15. Order Confirmation

Implement a production-grade confirmation experience.

Display actual backend data such as:

* Order number
* Order date
* Items
* Sellers
* Total
* Payment status
* Shipping information
* Expected delivery information where available

Provide navigation to order details.

Do not fabricate confirmation details.

---

# 16. Order History

Implement customer order history.

Support:

* Pagination/infinite scrolling
* Order status
* Order number
* Date
* Total
* Item preview
* Seller information where appropriate
* Shipment summary where available

Handle:

* no orders
* loading
* network failure
* authentication expiration
* pagination errors

Only return the authenticated customer's orders.

---

# 17. Order Details

Implement complete customer order details using actual backend APIs.

Support where available:

* Order summary
* Items
* Product information
* Seller information
* Pricing snapshot
* Payment status
* Fulfillment status
* Shipments
* Tracking
* Return eligibility
* Refund status
* Relevant actions

Do not attempt to reconstruct immutable order information from the current product catalog.

Use the backend order snapshot.

---

# 18. Multi-Seller Orders

The marketplace can contain multiple sellers in one customer order.

The UI must correctly represent:

* seller grouping
* seller-specific fulfillment
* seller-specific shipments
* seller-specific status
* seller-specific return eligibility where applicable

Do not assume one order equals one seller.

Do not expose seller-internal information.

---

# 19. Shipment Tracking

Implement shipment tracking using actual fulfillment/tracking APIs.

Support:

* Shipment list
* Shipment detail
* Tracking number where authorized
* Tracking status
* Tracking timeline
* Estimated delivery where actually provided
* Seller/fulfillment grouping

Possible states may include:

* Created
* Label pending
* Label created
* Ready to ship
* Shipped
* In transit
* Out for delivery
* Delivered
* Delivery failed
* Returned
* Cancelled

Use the actual backend states rather than assuming these exact values.

Never generate fake tracking events.

---

# 20. Tracking Refresh

Support appropriate tracking refresh behavior.

Use:

* TanStack Query
* polling only where justified
* SSE where an actual backend contract exists
* manual refresh

Avoid aggressive polling that wastes battery and network resources.

If live updates are unavailable, REST polling/manual refresh remains acceptable.

---

# 21. Returns

Implement customer return functionality using the actual return API.

Support where backend functionality exists:

* Return eligibility
* Return request creation
* Return item selection
* Return quantities
* Return reason
* Return submission
* Return status
* Return details
* Return tracking
* Return cancellation where supported

Do not allow customers to return:

* unauthorized items
* quantities exceeding purchased quantities
* items already returned beyond allowable quantity
* items outside backend eligibility rules

The backend remains authoritative.

---

# 22. Return State

Display the backend's return lifecycle.

Possible states include:

* Requested
* Approved
* Rejected
* Label pending
* In transit
* Received
* Inspecting
* Approved for refund
* Refunded
* Cancelled
* Closed

Do not hardcode unsupported states.

Handle state transitions gracefully.

---

# 23. Refund Status

Display actual refund information.

Support:

* Refund amount
* Refund status
* Refund date where available
* Associated order
* Associated return
* Payment method information where safely exposed

Do not display sensitive payment information.

Never assume a return automatically means a refund has completed.

Use backend refund state.

---

# 24. Reviews

Implement customer review functionality using actual review APIs.

Support:

* Review eligibility
* Verified purchase indication
* Rating
* Review text
* Review media
* Create review
* Edit review
* Remove review where supported
* Review submission errors
* Review list
* Rating summary

The backend determines:

* eligibility
* verified purchase
* ownership
* moderation status

Do not trust the client to mark a review as verified.

---

# 25. Review UX

Implement a polished review composer.

Support:

* Rating selection
* Text input
* Media attachment where supported
* Upload progress
* Validation
* Submission state
* Duplicate submission prevention
* Success
* Failure/retry

Validate text length and media constraints before upload where possible.

The backend remains authoritative for final validation.

---

# 26. Review Media

Use the existing media architecture.

Do not create a second upload system.

Respect:

* secure upload flow
* media ownership
* file validation
* size limits
* MIME validation
* processing states
* thumbnails/optimized variants
* upload failures

Never expose private storage credentials.

Do not upload arbitrary content directly to infrastructure without the repository's intended authorization flow.

---

# 27. Notifications

Implement the customer notification center using actual backend contracts.

Support:

* Notification list
* Pagination
* Unread state
* Read state
* Mark read
* Mark all read
* Unread count
* Notification detail/action
* Safe navigation to related resources

Support notification categories where provided.

Do not invent notifications that the backend never produces.

---

# 28. Real-Time Notifications

If the backend provides SSE or another supported real-time notification channel:

* connect securely
* authenticate appropriately
* handle reconnect
* avoid duplicate events
* update TanStack Query state
* recover through REST after disconnect
* avoid battery/network abuse

Real-time delivery is supplemental.

The REST API remains the recovery path and authoritative notification state.

---

# 29. Notification Preferences

Implement notification preferences where the backend supports them.

Allow customers to control appropriate:

* categories
* channels
* marketing preferences

Do not allow customers to disable mandatory security or transactional notifications if the backend marks them mandatory.

Always respect server-side preference rules.

---

# 30. Push Notification Foundation

If push infrastructure is already configured:

* register device tokens securely
* associate tokens with the authenticated account through backend APIs
* handle token rotation
* handle logout/device removal
* process notification taps
* validate deep-link destinations

Do not implement fake FCM/APNS delivery.

Do not expose device tokens unnecessarily.

If provider configuration does not exist, implement only the client architecture necessary to integrate with the actual repository without pretending delivery is operational.

---

# 31. Deep Links and Notification Actions

Support secure navigation from:

* product links
* category links
* search links
* order links
* shipment links
* return links
* notification actions

Validate all route parameters.

Do not trust a notification or deep link as proof of authorization.

After navigation, fetch the resource through the authenticated backend.

Prevent open redirects.

---

# 32. Account Security

Complete mobile account security UX supported by the backend.

Support where available:

* Password change
* Session management
* Device/session visibility
* Logout
* Logout other sessions
* Re-authentication for sensitive actions

Do not expose:

* session tokens
* refresh tokens
* internal authentication metadata

Sensitive operations should require appropriate backend authorization.

---

# 33. TanStack Query Consistency

Ensure correct cache behavior across the entire customer journey.

Important invalidation/update boundaries include:

### Authentication

On logout:

* clear customer queries
* clear private order queries
* clear private notification queries
* clear private cart state
* clear sensitive cached data

### Cart

After cart mutation:

* update/invalidate cart
* update cart count
* invalidate dependent checkout data

### Checkout

After checkout changes:

* invalidate relevant checkout state
* refresh authoritative totals

### Order

After successful order creation:

* invalidate cart
* invalidate customer orders
* fetch authoritative order
* invalidate relevant payment state

### Returns

After return creation:

* invalidate order detail
* invalidate return list
* refresh eligibility/status

### Reviews

After review creation/edit/removal:

* invalidate product reviews
* invalidate rating summaries
* update the customer's review state

### Notifications

After marking read:

* update notification list
* update unread count

Do not blindly invalidate the entire query cache after every mutation.

---

# 34. Offline and Recovery Behavior

Mobile users may lose connectivity at any point.

Handle:

* checkout network loss
* payment network loss
* order submission timeout
* order detail offline viewing where cached safely
* notification synchronization
* tracking refresh failure
* return submission failure
* review submission failure

Do not claim success until backend confirmation exists.

For mutations with uncertain results:

1. Stop duplicate submission.
2. Reconnect.
3. Query authoritative state.
4. Reconcile.
5. Resume only when safe.

---

# 35. Accessibility Hardening

Review all implemented screens for:

* screen-reader labels
* roles
* hints
* focus order
* dynamic text
* touch targets
* accessible dialogs
* accessible forms
* error announcements
* loading announcements
* meaningful status messages

Checkout, payment, return, and review flows must be usable with accessibility technologies.

---

# 36. Performance Hardening

Optimize the completed mobile application.

Review:

* startup time
* navigation transitions
* list rendering
* image loading
* product galleries
* order history
* notifications
* query caching
* unnecessary rerenders
* memory usage
* large datasets
* pagination
* background behavior

Avoid:

* rendering huge lists without virtualization
* unnecessary polling
* duplicated API requests
* storing large server datasets in Zustand
* unnecessary global state

---

# 37. Security Hardening

Perform a complete mobile security review.

Check for:

* insecure storage
* sensitive logs
* token exposure
* open redirects
* malicious deep links
* unauthorized account data
* IDOR assumptions
* unsafe media handling
* unsafe external URLs
* WebView vulnerabilities if WebView exists
* insecure debugging configuration
* production logging
* leaked environment secrets

The application must assume the client can be manipulated.

All authorization must remain server-side.

---

# 38. Analytics

Integrate with the existing analytics architecture.

Track appropriate customer events such as:

* checkout started
* shipping selected
* coupon applied
* payment interaction
* order created
* order viewed
* shipment viewed
* return started
* return submitted
* review started
* review submitted
* notification opened

Do not send:

* passwords
* payment credentials
* tokens
* private addresses
* unnecessary personal information
* sensitive payment data

Analytics must never control commerce behavior.

---

# 39. Error UX

Every major customer operation must distinguish:

* validation errors
* authorization errors
* authentication errors
* network errors
* timeout
* conflict
* rate limiting
* server errors
* provider failures
* ambiguous state

Provide actionable recovery.

Examples:

* Retry
* Refresh
* Return to cart
* Re-select address
* Re-select shipping
* View order
* Check payment status
* Contact support where the actual product supports it

Never display raw backend exceptions.

---

# 40. End-to-End Customer Journey

Create or extend mobile E2E coverage for the complete customer lifecycle where the environment supports it:

1. Launch application.
2. Authenticate.
3. Browse catalog.
4. Search.
5. Open product.
6. Select variant/offer.
7. Add to cart.
8. Open cart.
9. Start checkout.
10. Select address.
11. Select shipping.
12. Apply promotion if available.
13. Review authoritative totals.
14. Complete payment using test configuration where available.
15. Reconcile payment/order state.
16. View order confirmation.
17. Open order history.
18. Open order details.
19. View shipment.
20. View tracking.
21. Request return where eligible.
22. Check return/refund state.
23. Submit eligible review.
24. Open notifications.
25. Mark notification read.

Tests must use actual backend behavior or properly isolated test infrastructure.

Never create fake production APIs merely to satisfy tests.

---

# 41. Production Build

Validate the mobile application using the repository's actual build system.

Where configured, validate:

* development build
* staging build
* production build
* Expo configuration
* native configuration
* environment configuration
* deep links
* assets
* app identifiers
* permissions

Do not claim a production build works if it was not actually built.

---

# 42. Testing

Implement or extend tests covering:

### Checkout

* session creation
* cart validation
* address selection
* shipping selection
* promotion
* total refresh
* expiration
* validation failures

### Payments

* successful payment
* required action
* processing
* failure
* ambiguous network result
* duplicate submission prevention

### Orders

* order creation
* confirmation
* history
* details
* multi-seller order
* multi-shipment order

### Fulfillment

* shipment display
* tracking
* tracking refresh
* delivery states

### Returns

* eligibility
* item selection
* quantity validation
* submission
* status
* refund state

### Reviews

* eligibility
* rating
* review creation
* media
* edit/remove
* duplicate prevention

### Notifications

* list
* unread count
* read
* read all
* real-time update
* reconnect
* deep-link action

### Account

* profile
* addresses
* default address
* logout
* session security

### Security

* protected routes
* unauthorized access
* deep-link manipulation
* sensitive-data exposure
* token handling

### Accessibility

Test critical accessibility behavior throughout checkout and account flows.

---

# 43. Documentation

Update relevant mobile documentation.

Document:

* customer flows
* authentication
* secure storage
* checkout
* payment configuration
* deep links
* push notifications
* environment variables
* builds
* testing
* troubleshooting

Documentation must describe only actual repository capabilities.

---

# 44. Final Integration Review

After implementation, inspect the entire mobile application as one system.

Verify consistency across:

* authentication
* customer
* addresses
* catalog
* search
* cart
* checkout
* payment
* orders
* fulfillment
* returns
* reviews
* notifications
* navigation
* deep links
* query cache
* Zustand
* API client
* secure storage
* analytics
* observability

Check for:

* duplicate abstractions
* inconsistent API models
* stale query data
* navigation loops
* authentication leaks
* duplicated payment submissions
* duplicated order submissions
* unauthorized customer data
* inconsistent money formatting
* unsafe deep links
* fake provider behavior
* broken offline recovery

Fix issues found.

---

# 45. Validation

Run the appropriate repository commands for:

* TypeScript
* lint
* formatting
* unit tests
* integration tests
* mobile tests
* E2E tests
* Expo validation
* native builds
* production builds where configured

Do not suppress errors merely to achieve a passing result.

Do not skip failing tests without understanding and documenting the reason.

---

# 46. Scope Boundaries

Do not create unrelated systems.

Unless the repository already requires them, do not implement:

* Seller portal
* Seller payout UI
* Settlement dashboards
* Administration portal
* Advanced WMS
* Advertising platform
* Recommendation engine
* Advanced marketing automation
* Tax-remittance platform
* Carrier-specific systems without actual providers
* Analytics data warehouse/dashboard platform

The mobile application should remain focused on the customer experience.

---

# 47. Non-Negotiable Rules

You must:

* Inspect the repository first.
* Integrate with actual existing code.
* Preserve compatible architecture.
* Use actual backend contracts.
* Keep all business authority server-side.
* Protect authentication and customer data.
* Prevent duplicate payments.
* Prevent duplicate orders.
* Handle ambiguous payment states safely.
* Handle network failures.
* Use authoritative backend totals.
* Respect inventory and seller boundaries.
* Use secure media handling.
* Use existing notification architecture.
* Use existing fulfillment/tracking architecture.
* Add meaningful tests.
* Validate actual builds and tests.
* Document actual behavior.
* Report only verified repository state.

You must NOT:

* Invent endpoints.
* Invent payment provider behavior.
* Invent shipment tracking.
* Invent order status.
* Invent return eligibility.
* Invent review verification.
* Fabricate notification events.
* Store secrets in the application.
* Store passwords insecurely.
* Trust client-side authorization.
* Use floating-point money as an authority.
* Duplicate backend business rules unnecessarily.
* Create competing API clients.
* Create competing state-management systems.
* Leave TODO/FIXME placeholders.
* Hide TypeScript/lint/test failures.
* Claim completion without implementation.
* Claim tests passed without running them.
* Claim builds succeeded without validating them.

---

# 48. Final Implementation Report

After implementation, provide a factual report containing:

1. Files/modules created.
2. Files/modules modified.
3. Account functionality implemented.
4. Address functionality implemented.
5. Checkout functionality implemented.
6. Promotion/coupon functionality implemented.
7. Shipping functionality implemented.
8. Payment functionality implemented.
9. Order functionality implemented.
10. Fulfillment/tracking functionality implemented.
11. Return/refund functionality implemented.
12. Review functionality implemented.
13. Notification functionality implemented.
14. Deep-link functionality implemented.
15. Security hardening performed.
16. Accessibility work performed.
17. Performance work performed.
18. Analytics/observability integration.
19. Tests added or modified.
20. Validation commands executed and actual results.
21. Build validation results.
22. Documentation updated.
23. Genuine limitations or environment-dependent functionality that could not be validated.

Do not claim anything that was not actually implemented and verified.

The final result must be one coherent production-grade mobile ecommerce application integrated with the existing marketplace repositor

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
