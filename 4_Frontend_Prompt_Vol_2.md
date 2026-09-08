# Amazon Ecommerce Marketplace — Frontend Prompt — Volume 2

## Checkout, Payments, Orders, Fulfillment, Returns, Reviews, Notifications, Account, and Production Hardening

You are implementing the second production-grade frontend implementation unit for an original Amazon-style enterprise ecommerce marketplace.

This is a **standalone implementation prompt**. It must contain everything necessary to execute this phase without relying on any previous prompt, architecture document, conversation, generated artifact, or remembered decision.

The actual repository is the only source of truth for the current implementation state.

Do not assume that any previous implementation phase was completed successfully. Inspect the repository and integrate with what actually exists.

This phase is part of **one coherent ecommerce marketplace web application**, not a separate application.

---

# 1. Mission

Implement the remaining major customer-facing web experience using the existing:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand

Integrate with the actual backend capabilities present in the repository.

This phase covers:

* Customer account
* Addresses
* Checkout
* Checkout validation
* Shipping selection
* Tax presentation
* Promotions/coupons
* Payment UI
* Stripe integration where actually configured
* Order creation
* Order history
* Order details
* Order status
* Shipment tracking
* Returns
* Refund status
* Reviews
* Review media
* Notifications
* Notification preferences
* Production-grade error handling
* Security hardening
* Accessibility hardening
* SEO completion
* Performance optimization
* Analytics integration
* End-to-end customer-flow testing

Do not invent backend functionality that does not exist.

Where a backend capability is missing, integrate only with the actual available contract and report the dependency accurately.

---

# 2. Repository-First Execution

Before changing anything:

1. Inspect the repository.
2. Inspect the current web frontend.
3. Inspect all existing routes.
4. Inspect components.
5. Inspect TanStack Query configuration.
6. Inspect Zustand stores.
7. Inspect API clients.
8. Inspect authentication/session handling.
9. Inspect checkout APIs.
10. Inspect payment APIs.
11. Inspect order APIs.
12. Inspect fulfillment/shipment APIs.
13. Inspect return APIs.
14. Inspect review APIs.
15. Inspect notification APIs.
16. Inspect customer/address APIs.
17. Inspect backend DTOs/contracts.
18. Inspect OpenAPI/generated API types if present.
19. Inspect tests.
20. Inspect environment configuration.
21. Inspect analytics/telemetry.
22. Inspect existing design system.

The repository is authoritative.

Do not replace working architecture merely to match this prompt.

Do not create duplicate:

* API clients
* Query clients
* Authentication
* State stores
* Payment systems
* Form systems
* UI libraries
* Analytics systems

---

# 3. Application Architecture

Maintain a clear separation between:

* Route/page composition
* Feature components
* UI components
* API clients
* Server state
* Client state
* Forms
* Validation
* Authentication
* Payment integration
* Analytics
* Error handling

Do not place large amounts of business logic inside page components.

Do not duplicate backend business rules.

The backend remains authoritative for:

* Price
* Inventory
* Tax
* Discounts
* Shipping cost
* Payment status
* Order state
* Refund status
* Return eligibility
* Review eligibility

---

# 4. Customer Account

Implement the customer account area.

Support, where backend contracts exist:

* Profile
* Account information
* Addresses
* Preferences
* Security/session information where appropriate
* Orders
* Returns
* Reviews
* Notifications

Use protected routes.

Never expose private account data to unauthenticated users.

---

# 5. Account Navigation

Create a clear responsive account navigation.

Possible sections:

* Account overview
* Profile
* Addresses
* Orders
* Returns
* Reviews
* Notifications
* Preferences
* Security

Use the actual backend capabilities.

Do not expose navigation entries for nonexistent functionality.

---

# 6. Customer Profile

Implement profile viewing/editing.

Support actual backend fields such as:

* Name
* Contact information
* Preferences
* Other supported customer-profile fields

Requirements:

* Client validation
* Server validation
* Loading state
* Save state
* Error state
* Success feedback
* Accessible forms

Do not allow client-side modification of server-controlled fields.

---

# 7. Address Management

Implement customer address management.

Support:

* Address list
* Create address
* Edit address
* Delete address where supported
* Default address
* Shipping address selection
* Billing address selection if supported

Use the actual backend address model.

Do not assume a specific country-specific address format.

Support internationalization where the backend supports multiple countries.

---

# 8. Address Security

Never trust client-provided address ownership.

The backend must authorize every address operation.

Frontend behavior must gracefully handle:

* Address deleted elsewhere
* Address no longer valid
* Address unavailable during checkout
* Authorization failure

Do not expose internal customer identifiers unnecessarily.

---

# 9. Checkout Architecture

Implement a production-grade checkout experience.

The checkout should guide the customer through appropriate stages such as:

```text
Cart
 ↓
Customer information
 ↓
Shipping address
 ↓
Shipping method
 ↓
Promotion/coupon
 ↓
Order review
 ↓
Payment
 ↓
Order confirmation
```

Use the actual backend checkout-session lifecycle.

Do not assume the checkout state machine.

---

# 10. Checkout Session

Create frontend state around the backend checkout session.

Support:

* Session creation
* Session restoration
* Session validation
* Session expiration
* Session cancellation
* Checkout completion
* Checkout failure

The backend checkout session is authoritative.

Do not store authoritative checkout totals in Zustand.

---

# 11. Checkout Validation

Before payment/order completion, display server validation results.

Possible failures:

* Product unavailable
* Inventory insufficient
* Price changed
* Seller offer changed
* Coupon expired
* Coupon invalid
* Address invalid
* Shipping unavailable
* Tax calculation failure
* Checkout expired

Clearly communicate each issue.

Provide recovery actions.

Never silently modify the customer's order.

---

# 12. Checkout Pricing

Display:

* Items subtotal
* Discounts
* Promotion savings
* Coupon discount
* Shipping
* Tax
* Total
* Currency

Use backend-provided authoritative values.

Do not recalculate authoritative totals using JavaScript floating-point arithmetic.

If values change, refresh from the server.

---

# 13. Promotion and Coupon UI

Implement coupon/promotion interactions where supported.

Support:

* Coupon input
* Apply
* Remove
* Validation errors
* Applied state
* Discount display
* Expiration/invalid state

Do not expose internal promotion rules unnecessarily.

Do not claim a coupon is valid based only on client-side validation.

---

# 14. Shipping Selection

Implement shipping-method selection against the actual backend.

Display:

* Shipping method
* Estimated delivery information where provided
* Shipping cost
* Availability
* Selected state

Do not invent carrier promises.

Do not calculate shipping cost independently if the backend provides authoritative values.

---

# 15. Tax Display

Display tax values returned by the backend.

If tax is unavailable or estimated, communicate that accurately.

Do not invent tax calculations.

Do not implement tax-remittance logic in the frontend.

---

# 16. Checkout Review

Implement a final review screen.

Show:

* Items
* Seller information where appropriate
* Quantities
* Prices
* Discounts
* Shipping address
* Shipping method
* Taxes
* Total
* Payment method summary
* Terms/consent where required

Allow editing previous sections without losing valid checkout state unnecessarily.

---

# 17. Payment UI

Integrate with the actual payment backend.

If Stripe is configured and the backend exposes Stripe PaymentIntent/client-secret flow, use the official Stripe client integration appropriate to the repository.

Never expose:

* Stripe secret key
* Backend credentials
* Provider secrets

The frontend may receive only client-safe payment information.

---

# 18. Stripe Integration

Where Stripe is actually configured:

* Use the backend-created PaymentIntent/payment session.
* Use the client-side Stripe SDK only for client-safe operations.
* Follow the backend's payment state.
* Handle required customer actions.
* Handle payment failure.
* Handle payment cancellation.
* Handle retry.
* Prevent duplicate payment submissions.

Never create authoritative payment amounts solely in the browser.

The backend determines the payment amount.

---

# 19. Payment State

Clearly distinguish:

* Payment requires action
* Processing
* Authorized
* Captured
* Failed
* Cancelled

Do not assume that clicking "Pay" means payment succeeded.

Display the actual backend/payment state.

---

# 20. Payment Failure Recovery

Handle:

* Card/payment failure
* Authentication-required payment
* Network failure
* Session expiration
* Duplicate submission
* Provider error
* Backend error

Do not automatically create duplicate payment attempts.

Allow safe retry where the backend indicates retry is appropriate.

---

# 21. Order Creation

Order creation must occur through the backend checkout/order contract.

The frontend must never:

* Construct authoritative order totals
* Set order status
* Set payment status
* Assign inventory
* Assign sellers
* Bypass checkout validation

After successful order creation, refresh authoritative order data.

---

# 22. Order Confirmation

Create a production-quality confirmation page.

Show:

* Order number
* Order date
* Items
* Seller information where appropriate
* Shipping information
* Payment summary
* Total
* Delivery estimate where provided
* Order status
* Next actions

Do not expose internal database IDs unless intentionally part of the public contract.

---

# 23. Order History

Implement:

* Order list
* Pagination
* Filtering where supported
* Sorting where supported
* Order status
* Date
* Total
* Item summary

Use server-side pagination.

Do not request the customer's entire order history in one unbounded request.

---

# 24. Order Details

Implement a detailed order page.

Support:

* Order number
* Order status
* Items
* Seller
* Product
* Quantity
* Price snapshot
* Discounts
* Shipping
* Tax
* Total
* Payment state
* Fulfillment state
* Shipments
* Tracking
* Returns
* Refund status

Use authoritative backend data.

---

# 25. Order State Display

Map backend order states into human-readable UI labels.

Do not hardcode assumptions about state transitions.

If the backend introduces an unknown state, provide a safe fallback rather than breaking rendering.

Do not let the client mutate state.

---

# 26. Shipment Tracking

Implement customer-facing shipment tracking.

Display:

* Shipment
* Carrier name where provided
* Tracking reference where safe
* Shipment state
* Tracking timeline
* Estimated delivery where available

Use immutable tracking history supplied by the backend.

Do not fabricate carrier events.

---

# 27. Shipment Timeline

Create an accessible timeline showing:

```text
Shipment created
      ↓
Label created
      ↓
Ready to ship
      ↓
Shipped
      ↓
In transit
      ↓
Out for delivery
      ↓
Delivered
```

Only display states/events actually returned by the backend.

Handle partial shipments correctly.

An order may contain multiple shipments.

---

# 28. Multi-Seller Orders

The UI must support orders containing products from multiple sellers.

Clearly distinguish:

* Seller
* Items
* Fulfillment groups
* Shipments
* Delivery status

Do not assume one order always maps to one shipment or one seller.

---

# 29. Order Cancellation

Where the backend supports cancellation:

* Display cancellation only when authorized by backend state.
* Confirm user intent.
* Submit mutation.
* Show loading state.
* Refresh order.
* Display actual result.

Do not determine cancellation eligibility exclusively on the frontend.

---

# 30. Returns

Implement customer-facing return workflows.

Support:

* Eligible order items
* Return request
* Return reason
* Quantity
* Description where supported
* Submission
* Return status
* Return timeline
* Refund status

The backend determines eligibility.

Do not allow arbitrary item/quantity selection without backend validation.

---

# 31. Return Eligibility

If the backend exposes eligibility information, display it.

Handle:

* Eligible
* Ineligible
* Partially eligible
* Expired return window
* Previously returned quantity
* Invalid state

Do not invent return-window rules.

---

# 32. Return Submission

Implement a secure return form.

Support:

* Item selection
* Quantity
* Reason
* Optional details
* Media where supported
* Confirmation

Validate:

* Quantity
* Required fields
* Allowed reasons

The backend remains authoritative.

---

# 33. Return Tracking

Display:

* Requested
* Approved
* Label pending
* In transit
* Received
* Inspecting
* Approved for refund
* Refunded
* Rejected/cancelled
* Closed

Use the actual backend state values.

Do not assume every return reaches every state.

---

# 34. Refund Status

Display refund information linked to the return/order.

Support:

* Pending
* Processing
* Completed
* Failed
* Partial refund
* Full refund

Do not expose sensitive payment-provider information.

---

# 35. Review Experience

Implement customer review functionality.

Support:

* Review eligibility
* Review creation
* Rating
* Text
* Media where supported
* Review editing
* Review removal where supported
* Review status
* Review submission feedback

The backend determines verified purchase eligibility.

Do not allow users to review arbitrary products without backend authorization.

---

# 36. Rating UI

Build accessible rating components.

Support:

* 1–5 rating
* Visual stars
* Textual rating representation
* Keyboard operation
* Screen-reader labels

Do not communicate rating solely through color.

---

# 37. Review Media

If the backend supports review media:

* Use existing media-upload infrastructure.
* Validate file types client-side for UX.
* Respect server-side validation.
* Show upload progress where supported.
* Allow removal before submission.
* Handle failed uploads.
* Prevent exposing private object URLs.

Client-side validation is not a security boundary.

---

# 38. Review Editing and Removal

Support existing backend capabilities.

Display:

* Current review
* Review state
* Edit
* Remove
* Moderation status where appropriate

Do not allow editing a review merely because a UI button exists.

The backend determines authorization.

---

# 39. Notification Center

Implement customer-facing in-app notifications.

Support:

* Notification list
* Unread count
* Read/unread state
* Mark read
* Mark all read
* Pagination
* Notification categories
* Navigation to relevant resources

Use the actual notification contracts.

---

# 40. Real-Time Notifications

If the backend supports SSE:

* Establish authenticated SSE connection appropriately.
* Handle connection failures.
* Reconnect safely.
* Avoid duplicate notifications.
* Refresh through REST when necessary.

REST remains the recovery mechanism.

Do not make the UI dependent exclusively on SSE.

---

# 41. Notification Preferences

Implement notification preferences where supported.

Allow customers to control appropriate categories/channels.

Examples:

* Orders
* Shipping
* Returns
* Reviews
* Marketing

Respect mandatory transactional/security notifications.

Do not allow users to disable notifications that the backend defines as mandatory.

---

# 42. Account Security UX

If backend security/session APIs exist, expose appropriate account-security functionality.

Examples:

* Active sessions/devices
* Sign out of session
* Sign out everywhere
* Recent security activity

Never display:

* Session secrets
* Refresh tokens
* Password hashes

---

# 43. Password Changes

If supported by the backend:

* Current password
* New password
* Confirmation
* Validation
* Server error handling
* Success state

Never log or persist passwords in client state beyond the immediate form lifecycle.

Clear sensitive form state after submission where appropriate.

---

# 44. Session Expiration

The application must handle expired sessions gracefully.

Possible behavior:

* Preserve safe navigation context.
* Prompt for authentication.
* Redirect to login.
* Refresh public data.
* Prevent unauthorized mutations.

Do not enter infinite retry/redirect loops.

---

# 45. Deep Links

Support direct navigation to:

* Product
* Category
* Search
* Cart
* Checkout
* Order
* Return
* Account

Protected deep links must require authentication.

After successful authentication, restore the intended destination safely.

Prevent open redirects.

---

# 46. Navigation Security

Any redirect destination supplied by:

* Query parameters
* Backend metadata
* Notification payloads

must be validated.

Do not navigate blindly to arbitrary external URLs.

---

# 47. Accessibility Hardening

Review the entire web application for:

* Keyboard navigation
* Focus management
* Semantic landmarks
* Heading hierarchy
* Form labels
* Error announcements
* Dialog accessibility
* Drawer accessibility
* Autocomplete accessibility
* Table accessibility
* Timeline accessibility
* Rating accessibility
* Toast accessibility

Ensure important information is available without relying on color, hover, or animation.

---

# 48. Responsive UX

Validate all major flows on:

* Mobile
* Tablet
* Desktop

Pay particular attention to:

* Checkout
* Payment
* Order details
* Tracking
* Returns
* Product pages
* Cart
* Account

Avoid horizontally scrolling forms or tables unless intentionally designed.

---

# 49. Loading and Error UX

Every asynchronous operation must have:

* Loading state
* Success state where relevant
* Error state
* Retry/recovery behavior

Critical flows must not leave the user uncertain about whether an operation succeeded.

Especially protect:

* Payment
* Order creation
* Refund/return submission
* Account mutations

---

# 50. Duplicate Submission Protection

Prevent accidental duplicate mutations.

Especially:

* Pay
* Place order
* Apply coupon
* Create return
* Submit review
* Update address
* Update profile

Use:

* Disabled submit state
* Mutation state
* Backend idempotency where required
* Safe recovery after network failures

Do not rely solely on disabled buttons for financial idempotency.

---

# 51. Query Cache Management

Use TanStack Query consistently.

Invalidate or update only affected queries after mutations.

Examples:

### Cart

Refresh:

* Cart
* Cart count

### Order creation

Refresh:

* Cart
* Checkout session
* Order detail

### Return

Refresh:

* Order
* Return
* Refund

### Review

Refresh:

* Review
* Product rating summary

### Notification

Refresh:

* Notification list
* Unread count

Avoid global cache invalidation.

---

# 52. Optimistic Updates

Use optimistic updates only when rollback is reliable.

Suitable examples:

* Mark notification read
* UI preferences

Be conservative with:

* Payment
* Order
* Refund
* Return
* Inventory-sensitive actions

Use authoritative server responses for financially important operations.

---

# 53. Frontend Analytics

Integrate with the existing analytics architecture.

Potential events:

* Product viewed
* Search submitted
* Add to cart
* Checkout started
* Checkout completed
* Payment UI failure
* Order confirmation viewed
* Return started
* Review submitted

Do not treat frontend analytics as authoritative.

Do not emit:

* Passwords
* Payment credentials
* Full addresses
* Sensitive personal data
* Authentication tokens

Backend business events remain authoritative for financial/order analytics.

---

# 54. Performance Hardening

Optimize:

* Initial page load
* Product page rendering
* Search
* Cart
* Checkout
* Account
* Order pages

Use:

* Server rendering where appropriate
* Streaming where beneficial
* Code splitting
* Image optimization
* Lazy loading
* Query caching
* Request cancellation

Avoid unnecessary client components.

---

# 55. Checkout Performance

The checkout flow should minimize unnecessary requests.

Avoid:

```text
Address request
→ shipping request
→ pricing request
→ coupon request
→ inventory request
→ tax request
→ payment request
```

when the backend already provides an appropriate aggregated checkout contract.

Use the existing backend checkout orchestration rather than recreating orchestration in the browser.

---

# 56. SEO Completion

Complete SEO for public pages.

Implement where appropriate:

* Product metadata
* Category metadata
* Canonical URLs
* Open Graph
* Structured data
* Breadcrumb schema
* Sitemap integration
* Robots rules

Do not index:

* Cart
* Checkout
* Account
* Orders
* Returns
* Private notifications
* Seller/private administrative pages

---

# 57. Structured Product Data

Where appropriate, expose schema.org product information based only on authoritative backend data.

Do not generate structured data containing:

* Fake prices
* Fake availability
* Fake ratings
* Fake reviews

If structured data cannot be accurately produced, omit the unsupported field.

---

# 58. Error Boundaries

Implement route/feature-level error boundaries.

Critical application shell functionality should remain available when a noncritical component fails.

Provide:

* Human-readable error
* Retry
* Return/navigation option

Do not expose stack traces.

---

# 59. Security Review

Review the entire frontend for:

* XSS
* Unsafe HTML
* Open redirects
* URL injection
* Token leakage
* Sensitive data exposure
* Insecure local storage
* Third-party script risks
* CSRF assumptions
* Clickjacking
* Dependency vulnerabilities

Never assume frontend security replaces backend authorization.

---

# 60. Content Security

If the application renders user-generated content:

* Escape by default.
* Sanitize explicitly where rich content is required.
* Do not execute arbitrary HTML/scripts.
* Prevent dangerous URL schemes.

Review:

* Product descriptions
* Reviews
* Seller-provided content
* Notification content

---

# 61. Third-Party Scripts

Audit third-party scripts.

Any third-party analytics/payment/script integration must:

* Be necessary
* Be documented
* Avoid unnecessary data collection
* Load securely
* Not receive secrets
* Respect privacy requirements

Do not add arbitrary tracking scripts.

---

# 62. Environment Security

Audit all environment variables.

Client-exposed variables must contain only safe public values.

Never expose:

* Database URLs
* AWS secrets
* Stripe secret keys
* Redis credentials
* Kafka credentials
* Internal API credentials

---

# 63. API Failure Handling

Handle backend dependency failures gracefully.

Examples:

### Catalog unavailable

Show retryable catalog error.

### Search unavailable

Show search-specific error.

### Cart unavailable

Prevent checkout until authoritative cart state is available.

### Checkout unavailable

Explain that checkout cannot currently proceed.

### Payment unavailable

Do not claim order success.

### Notifications unavailable

Do not block core commerce.

---

# 64. Offline/Network Resilience

Where useful, detect temporary network failures.

Do not pretend an operation succeeded because the request was interrupted.

For critical operations:

* Reconcile with backend state.
* Refresh the relevant resource.
* Show actual status.

This is especially important for:

* Payments
* Orders
* Returns

---

# 65. Payment Reconciliation UX

If payment submission times out but the result is unknown:

Do not immediately create another payment.

Instead:

1. Re-query the checkout/payment/order state.
2. Determine whether payment succeeded.
3. Display the authoritative result.
4. Allow retry only when safe.

---

# 66. Order Reconciliation UX

If order creation times out:

Do not automatically submit another order.

Instead:

1. Query the checkout/order state.
2. Determine whether an order was created.
3. Show the existing order if available.
4. Allow retry only when the backend confirms it is safe.

---

# 67. Testing Strategy

Implement or extend:

* Unit tests
* Component tests
* Integration tests
* API integration tests
* Accessibility tests
* E2E tests

Prioritize complete customer journeys.

---

# 68. Authentication E2E

Test:

```text
Register
 ↓
Login
 ↓
Browse catalog
 ↓
Add product
 ↓
View cart
 ↓
Checkout
 ↓
Payment
 ↓
Order confirmation
```

Where payment test infrastructure is available, use safe test-mode credentials/configuration.

Never use real production credentials in tests.

---

# 69. Checkout E2E

Test:

* Valid checkout
* Invalid address
* Shipping selection
* Coupon
* Price change
* Inventory change
* Session expiration
* Payment failure
* Payment requires action
* Successful order

---

# 70. Order E2E

Test:

* Order history
* Order detail
* Multiple sellers
* Multiple shipments
* Tracking
* Cancellation where supported
* Return initiation
* Refund status

---

# 71. Review E2E

Test:

* Eligible review
* Ineligible review
* Rating
* Text
* Media
* Edit
* Remove
* Moderation status

---

# 72. Notification E2E

Test:

* Notification loading
* Unread count
* Mark read
* Mark all read
* Navigation
* SSE delivery if available
* Reconnection
* REST recovery

---

# 73. Accessibility Testing

Test complete critical flows with keyboard interaction.

Verify:

* Login
* Search
* Product selection
* Cart
* Checkout
* Payment
* Orders
* Returns
* Reviews

Use the existing accessibility tooling.

---

# 74. Responsive Testing

Validate critical flows at representative:

* Mobile
* Tablet
* Desktop

Ensure no important control becomes inaccessible.

---

# 75. Browser Testing

Run the repository's supported browser test matrix.

At minimum validate the major customer flow in the browsers officially supported by the project.

Do not claim unsupported browsers were tested.

---

# 76. Visual Regression

If the repository has visual regression testing, update and validate relevant snapshots.

If it does not, do not introduce an unnecessarily large visual-regression framework solely for this phase.

---

# 77. Frontend Observability

Instrument important user-flow failures.

Capture:

* Route errors
* API failures
* Query failures
* Payment UI errors
* Checkout errors
* Order-flow errors
* Return-flow errors
* Review-flow errors

Never record sensitive payment or authentication data.

---

# 78. Logging

Avoid production `console.log` statements containing:

* User information
* Tokens
* Payment information
* Internal identifiers unnecessarily
* Backend payloads containing sensitive data

Use the existing logging/telemetry mechanism.

---

# 79. Internationalization Boundary

Structure customer-visible strings so internationalization can be introduced cleanly.

Do not hardcode locale-sensitive:

* Dates
* Currency
* Numbers

Use appropriate formatting utilities.

Do not invent translations unless the repository supports them.

---

# 80. Currency and Dates

Display monetary values using:

* Backend currency
* Correct precision
* Locale-aware formatting

Display dates using consistent timezone semantics.

Do not use browser-local time to reinterpret backend timestamps incorrectly.

---

# 81. Final Integration Review

After implementation, verify that:

* Product browsing works.
* Search works.
* Cart works.
* Authentication works.
* Checkout works against actual backend contracts.
* Payment works where configured.
* Orders work.
* Shipment tracking works.
* Returns work.
* Reviews work.
* Notifications work.
* Account management works.
* SEO works.
* Accessibility works.
* Responsive behavior works.
* Errors are handled.
* No fake commerce data remains.
* No secrets are exposed.
* No duplicate frontend architecture exists.

---

# 82. Backward Compatibility

Do not break:

* Existing routes
* Existing APIs
* Existing query keys
* Existing state
* Authentication
* Product pages
* Search
* Cart
* Existing design system

If a breaking change is necessary:

* Assess actual repository impact.
* Migrate safely.
* Update consumers.
* Update tests.
* Document the change.

---

# 83. What This Volume Must NOT Implement

Do not expand beyond the customer-facing web application into:

* Seller portal
* Administrative portal
* Full analytics dashboard
* Recommendation engine
* Advertising platform
* Warehouse management UI
* Tax-remittance UI
* Seller payout/settlement UI
* Internal operations dashboard

Those are separate concerns unless already implemented in the repository.

---

# 84. Production Validation

Before completion:

1. Run frontend build.
2. Run TypeScript validation.
3. Run lint.
4. Run unit tests.
5. Run component tests.
6. Run integration tests.
7. Run accessibility tests.
8. Run E2E tests.
9. Validate authentication.
10. Validate checkout.
11. Validate payment.
12. Validate order creation.
13. Validate returns.
14. Validate reviews.
15. Validate notifications.
16. Validate SEO.
17. Validate responsive behavior.
18. Inspect browser console.
19. Inspect network requests.
20. Verify no sensitive values are exposed.
21. Run existing regression tests.

Fix actual failures.

Do not mark untested behavior as validated.

---

# 85. Final Repository Inspection

Inspect the final repository state and verify:

* No duplicate API clients.
* No duplicate state-management systems.
* No duplicate authentication implementation.
* No duplicate payment integration.
* No fake production data.
* No exposed secrets.
* No insecure redirects.
* No client-only authorization.
* No broken backend contracts.
* No inaccessible critical controls.
* No major responsive regressions.
* No broken SEO behavior.
* No critical-flow error handling gaps.

---

# 86. Final Implementation Report

Provide a factual report based only on the actual repository.

Include:

### Implemented

Actual functionality implemented.

### Routes

Actual pages/routes created or modified.

### Account

Actual customer-account functionality.

### Checkout

Actual checkout flow.

### Payments

Actual payment integration and behavior.

### Orders

Actual order-history/detail functionality.

### Fulfillment

Actual shipment/tracking functionality.

### Returns

Actual return functionality.

### Reviews

Actual review functionality.

### Notifications

Actual notification functionality.

### API Integration

Actual backend endpoints consumed.

### State Management

Actual TanStack Query/Zustand changes.

### Security

Actual security improvements.

### Accessibility

Actual accessibility implementation and tests.

### SEO

Actual SEO implementation.

### Performance

Actual performance improvements.

### Testing

Actual tests and commands/results.

### Remaining Work

Only genuinely incomplete functionality discovered in the repository.

Never claim functionality that was not actually implemented and validated.

---

# 87. Non-Negotiable Rules

* Inspect the repository first.
* The actual repository is the source of truth.
* This prompt is standalone.
* This is one implementation unit of one coherent ecommerce marketplace.
* Integrate with the existing frontend and backend.
* Do not create competing implementations.
* Do not regenerate unchanged files.
* Do not invent backend endpoints.
* Do not invent provider capabilities.
* Do not use fake production commerce data.
* Never trust the frontend as the authorization boundary.
* Never expose secrets.
* Never expose payment credentials.
* Never put tokens or secrets in URLs.
* Never use floating-point arithmetic for authoritative monetary values.
* Never assume payment succeeded merely because the user clicked Pay.
* Never create duplicate orders after an ambiguous network failure.
* Never create duplicate payment attempts unnecessarily.
* Never bypass backend checkout validation.
* Never bypass inventory, order, payment, return, or review rules.
* Do not expose private customer or seller information.
* Do not render unsafe user-generated HTML.
* Do not sacrifice accessibility for visual appearance.
* Do not sacrifice performance through unnecessary client-side rendering.
* Do not use TODOs or placeholders as substitutes for implementation.
* Do not falsely claim completion.
* Implement real production-grade functionality.
* Add real tests.
* Validate the actual repository.

Now inspect the repository and implement this entire **Checkout, Payments, Orders, Fulfillment, Returns, Reviews, Notifications, Customer Account, and Production Hardening frontend implementation unit** as a production-grade extension of the existing Amazon-style ecommerce marketplace.
