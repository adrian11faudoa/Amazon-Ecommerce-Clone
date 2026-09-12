# AMAZON ECOMMERCE PLATFORM — FRONTEND VOLUME 2 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, UI/UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, QA Engineer, and Technical Writer working together as a senior production engineering organization.

Your responsibility is to implement the frontend scope defined in this prompt as a complete, production-grade web application inside the existing repository.

Do not behave as a teacher or provide a tutorial. Inspect the repository, understand its actual implementation state, implement the required functionality, integrate it with the existing application, validate it, and leave the repository in a coherent production-ready state.

---

# PROJECT

Build the customer account, purchasing, checkout, order, payment, fulfillment, and post-purchase web experience for a large-scale global Amazon-style ecommerce marketplace.

The application supports:

* Millions of customers.
* Thousands of sellers.
* Millions of products and variants.
* Multi-seller carts and orders.
* Server-authoritative pricing and inventory.
* Checkout.
* Payments.
* Shipping and fulfillment.
* Returns and refunds.
* Customer reviews.
* Notifications.
* Account management.
* Addresses.
* Wishlists.
* Promotions and coupons.
* Order tracking.
* High-volume transactional activity.

The web frontend must provide a secure, accessible, responsive, and production-grade customer experience for these workflows.

The backend remains authoritative for all transactional and financial state.

The frontend must consume actual backend contracts and must never become the authoritative source for:

* Inventory.
* Prices.
* Taxes.
* Discounts.
* Promotions.
* Payment status.
* Order status.
* Shipment status.
* Refund status.
* Return eligibility.
* Customer authorization.
* Seller financial information.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless the repository already contains a compatible implementation that should be preserved:

* Next.js 15+
* React 19+
* TypeScript with strict type safety
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod
* date-fns
* Recharts where appropriate
* Framer Motion where appropriate
* REST/OpenAPI-compatible backend integration
* WebSockets or SSE where justified by actual backend contracts

Reuse existing compatible packages and conventions.

Do not introduce dependencies unnecessarily.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before implementing anything:

1. Inspect the existing Next.js application.
2. Inspect route structure.
3. Inspect shared layouts and components.
4. Inspect API clients.
5. Inspect generated API types where available.
6. Inspect authentication/session handling.
7. Inspect TanStack Query configuration.
8. Inspect Zustand stores.
9. Inspect form infrastructure.
10. Inspect existing customer storefront functionality.
11. Inspect existing cart functionality.
12. Inspect existing testing infrastructure.
13. Inspect environment configuration without exposing secrets.
14. Inspect documentation.
15. Determine which account, checkout, order, payment, or fulfillment functionality already exists.
16. Reuse compatible functionality instead of creating parallel implementations.

Do not assume missing functionality merely because a route does not exist.

Do not rewrite stable existing functionality without a concrete reason.

---

# IMPLEMENTATION SCOPE

Implement the production-grade customer purchasing and account experience, including:

1. Customer account foundation.
2. Account profile management.
3. Address management.
4. Authentication-aware account navigation.
5. Wishlist functionality.
6. Saved customer preferences where supported.
7. Checkout architecture.
8. Multi-seller checkout presentation.
9. Checkout address selection.
10. Shipping method selection.
11. Order summary.
12. Promotions and coupon presentation.
13. Payment integration UI.
14. Payment failure and recovery states.
15. Order placement.
16. Order confirmation.
17. Order history.
18. Order detail pages.
19. Shipment tracking presentation.
20. Cancellation flows where supported.
21. Return request flows.
22. Refund status presentation.
23. Customer reviews and ratings.
24. Notification center foundations.
25. Real-time order/notification updates where supported.
26. Customer-facing transactional error handling.
27. Accessibility and responsive behavior.
28. Security hardening.
29. Testing.
30. Documentation.

Do not implement seller-admin functionality or internal administrative tooling as part of this scope unless required by existing shared contracts.

---

# CUSTOMER ACCOUNT ARCHITECTURE

Implement a scalable account area.

Support appropriate routes and interfaces for:

* Account overview.
* Profile.
* Addresses.
* Orders.
* Wishlist.
* Notifications.
* Preferences where supported.

The account area must clearly distinguish:

* Public storefront.
* Authenticated customer experience.
* Sensitive account operations.

Do not expose private account data before authentication is confirmed.

Account pages must handle:

* Loading.
* Unauthorized access.
* Session expiration.
* API failures.
* Empty states.
* Successful mutations.

Use reusable account navigation components.

Maintain consistent responsive behavior across desktop and mobile web.

---

# PROFILE MANAGEMENT

Implement customer profile management according to the backend contract.

Support appropriate fields such as:

* Display name.
* Contact information where supported.
* Profile preferences.
* Other non-sensitive customer attributes exposed by the backend.

Use React Hook Form and Zod.

Handle:

* Client validation.
* Server validation.
* Dirty state.
* Submission state.
* Success feedback.
* Failure feedback.
* Concurrent update conflicts where supported.

Never assume that a client-side profile value was successfully persisted until the backend confirms it.

Refresh authoritative customer state after successful updates when appropriate.

---

# ADDRESS MANAGEMENT

Implement a production-grade address management interface.

Support:

* Address list.
* Add address.
* Edit address.
* Delete address where permitted.
* Default address selection.
* Address validation.
* Shipping-address selection during checkout.

The interface must correctly distinguish:

* Billing address.
* Shipping address.
* Default address.
* Address associated with an existing order.

Do not allow an address mutation to silently alter historical order data.

Historical orders must display the appropriate order-specific address snapshot supplied by the backend.

Handle address mutations with appropriate confirmation and error states.

---

# WISHLIST

Implement the customer wishlist experience where supported.

Support:

* Wishlist listing.
* Product presentation.
* Remove item.
* Move/add item to cart where supported.
* Product availability.
* Price information.
* Empty wishlist.
* Loading and error states.

Do not assume wishlist items remain purchasable.

If an item is unavailable, clearly communicate the backend-provided state.

Use server state through TanStack Query.

Do not duplicate the entire wishlist into a persistent Zustand store.

---

# CHECKOUT ARCHITECTURE

Implement a production-grade checkout experience.

The checkout UI must support the backend's authoritative checkout model.

A checkout may contain products from multiple sellers.

The frontend must therefore support clear presentation of:

* Customer order.
* Seller groupings.
* Order items.
* Seller-specific fulfillment/shipping information.
* Payment information.
* Discounts.
* Taxes where provided.
* Shipping charges.
* Final total.

Do not imply that a multi-seller purchase is necessarily one physical shipment.

Clearly represent seller and shipment boundaries when supplied by the backend.

---

# CHECKOUT STATE

Implement checkout as an explicit multi-step experience where appropriate.

Potential stages include:

1. Cart validation.
2. Customer/address selection.
3. Shipping method selection.
4. Promotion/coupon application.
5. Payment method.
6. Order review.
7. Order submission.
8. Confirmation.

Use the backend as the authority for the current valid checkout state.

Do not store a complete checkout transaction as an uncontrolled client-side object.

Ensure refreshing the browser does not produce an invalid or misleading checkout state.

Support recovery from:

* Expired checkout.
* Changed inventory.
* Changed price.
* Removed product.
* Invalid promotion.
* Shipping-method failure.
* Payment failure.
* Backend validation failure.

---

# CHECKOUT PRICE AND INVENTORY INTEGRITY

Never calculate the final order total as an authoritative frontend value.

The UI may display derived values for presentation, but the backend response remains authoritative.

When the backend reports:

* Price changes.
* Inventory changes.
* Quantity changes.
* Promotion changes.
* Shipping changes.
* Tax changes.
* Seller changes.

Refresh the relevant checkout state and clearly communicate the change to the customer.

Do not allow stale client state to produce a misleading final purchase confirmation.

---

# PROMOTIONS AND COUPONS

Implement customer-facing promotion and coupon interfaces according to backend capabilities.

Support:

* Coupon entry.
* Apply coupon.
* Remove coupon.
* Promotion summaries.
* Discount presentation.
* Invalid coupon states.
* Expired coupon states.
* Usage-limit failures.
* Minimum-order failures.
* Seller/product-specific restrictions where supplied.

Do not reproduce complex promotion eligibility rules in the browser.

The backend determines eligibility and final discount amounts.

---

# SHIPPING METHODS

Implement shipping-method selection.

Support:

* Available methods.
* Delivery estimates.
* Shipping costs.
* Seller-specific shipping options where applicable.
* Shipment grouping where applicable.
* Selection state.
* Invalid/expired shipping methods.
* Recalculation states.

Dates and times must be formatted consistently using the application's date utilities.

Do not hardcode delivery estimates.

Do not assume a selected shipping method remains valid until order placement.

---

# PAYMENT EXPERIENCE

Implement the customer-facing payment workflow around the repository's actual payment-provider abstraction.

Support the appropriate payment lifecycle:

* Payment method selection.
* Payment initialization.
* Payment confirmation.
* Processing state.
* Success.
* Failure.
* Retry.
* Cancellation.
* Authentication/verification flows when required by the provider.
* Backend-confirmed payment status.

Never store raw payment credentials in application state.

Never log sensitive payment information.

Do not treat a frontend payment callback alone as proof that an order was paid.

The backend remains authoritative for payment status.

---

# PAYMENT FAILURE AND RECOVERY

Implement robust recovery for payment failures.

Handle:

* Declined payment.
* Provider timeout.
* Authentication failure.
* Invalid payment state.
* Duplicate submission.
* Network interruption.
* Backend failure.
* Payment requiring additional customer action.

Prevent accidental duplicate order submission.

Disable or otherwise protect critical submission controls while an operation is in progress.

Ensure retry behavior is safe and consistent with backend idempotency.

Do not automatically repeat financial operations without an explicit safe contract.

---

# ORDER PLACEMENT

Implement the customer-facing order submission workflow.

Before submission:

* Validate the current checkout state.
* Ensure required selections are present.
* Display authoritative totals.
* Display seller/shipment grouping.
* Display selected shipping information.
* Display payment information without exposing sensitive credentials.

During submission:

* Provide clear progress state.
* Prevent accidental duplicate submissions.
* Handle network interruption.
* Handle backend validation failures.
* Preserve recoverable checkout information.

After submission:

* Use the backend response as the authoritative result.
* Navigate to an order confirmation experience.
* Display order identifiers supplied by the backend.
* Display payment/order status.
* Display seller and shipment information.
* Avoid claiming fulfillment that has not been confirmed.

---

# ORDER CONFIRMATION

Create a production-grade confirmation experience.

Display appropriate:

* Order information.
* Order identifier.
* Order date.
* Customer information relevant to the order.
* Seller grouping.
* Order items.
* Payment status.
* Shipping information.
* Estimated delivery information where available.
* Total.
* Next actions.

Provide useful navigation to:

* Order details.
* Continue shopping.
* Account.
* Support/help where supported.

Do not expose information belonging to other customers or sellers.

---

# ORDER HISTORY

Implement a scalable order-history interface.

Support:

* Paginated or cursor-based order retrieval.
* Order status.
* Order date.
* Total.
* Seller information.
* Shipment summary.
* Item summary.
* Search/filtering where supported.
* Empty state.
* Loading state.
* Error state.

Use URL state for filters when appropriate.

Do not fetch an unbounded order history into the browser.

Use backend pagination contracts.

---

# ORDER DETAILS

Implement detailed customer order pages.

Display:

* Order metadata.
* Items.
* Product information.
* Seller.
* Quantities.
* Prices.
* Discounts.
* Shipping.
* Taxes where provided.
* Payment status.
* Shipment status.
* Tracking information.
* Delivery estimate.
* Cancellation state.
* Return eligibility/state.
* Refund information where available.

Historical information must be treated as immutable snapshots supplied by the backend.

Do not re-query current product prices and substitute them for historical order prices.

---

# ORDER CANCELLATION

Implement cancellation UX where supported.

Before cancellation:

* Display whether cancellation is currently available.
* Display appropriate confirmation.
* Communicate potential consequences.

After cancellation:

* Refresh order state.
* Display backend-confirmed cancellation status.
* Display refund information only when actually supplied.
* Handle cancellation race conditions.

If cancellation is rejected because fulfillment progressed or another state transition occurred, display the authoritative backend response rather than assuming success.

---

# SHIPMENT TRACKING

Implement customer-facing shipment tracking.

Support:

* Shipment grouping.
* Carrier.
* Tracking identifier where appropriate.
* Current shipment state.
* Delivery estimate.
* Tracking events.
* Delivered state.
* Failed delivery state.
* Returned-to-sender state where supported.

Provide clear visual state progression without inventing shipment events.

Format timestamps consistently.

Where real-time updates are supported, integrate them without making the UI dependent on a persistent connection.

The page must remain functional through normal request-based refreshes.

---

# REAL-TIME CUSTOMER UPDATES

Integrate WebSocket or SSE functionality only where actual backend contracts support it.

Appropriate customer-facing uses include:

* Order status updates.
* Shipment updates.
* Notifications.
* Payment status changes where appropriate.

Implement:

* Authentication.
* Authorization.
* Connection lifecycle.
* Reconnection.
* Duplicate event handling.
* Event ordering considerations.
* Cache invalidation.
* Graceful fallback to normal queries.
* Backoff.

Do not assume that real-time delivery is guaranteed.

The UI must remain correct when events are delayed, duplicated, lost, or unavailable.

---

# RETURNS

Implement the customer-facing return request flow according to backend capabilities.

Support:

* Eligible order items.
* Return reason.
* Quantity.
* Optional customer-provided explanation.
* Required information.
* Return-method selection where supported.
* Review before submission.
* Submission.
* Confirmation.
* Return status.

Do not determine eligibility solely in the browser.

Use backend-provided eligibility and constraints.

Prevent returning quantities that exceed the backend-authorized amount.

---

# REFUNDS

Implement customer-facing refund status presentation.

Display:

* Refund status.
* Amount.
* Associated order/item.
* Relevant dates.
* Payment destination where safely exposed.
* Failure or pending states.

Never expose sensitive payment information.

Do not state that money has been returned merely because a refund request was submitted.

Use backend-confirmed refund status.

---

# CUSTOMER REVIEWS AND RATINGS

Implement customer review functionality where supported.

Support:

* Rating submission.
* Review text.
* Product association.
* Existing review display.
* Edit/delete where permitted.
* Submission state.
* Moderation/pending state.
* Validation errors.
* Abuse/report controls where supported.

Clearly distinguish:

* Published review.
* Pending moderation.
* Rejected review.
* Deleted review.

Do not present unmoderated content as permanently published unless the backend explicitly defines that behavior.

Treat user-generated content as untrusted.

---

# NOTIFICATION CENTER

Implement a reusable customer notification experience.

Support:

* Notification list.
* Read/unread state.
* Mark as read.
* Mark all as read where supported.
* Notification categories.
* Navigation targets.
* Empty state.
* Loading state.
* Error state.

Where real-time notifications exist, integrate them through the established event mechanism.

Do not create duplicate notifications when the same event arrives through both real-time delivery and polling.

---

# ERROR HANDLING

Create consistent customer-facing handling for:

* Validation errors.
* Authentication errors.
* Authorization errors.
* Not found.
* Conflict.
* Rate limiting.
* Payment failures.
* Inventory conflicts.
* Checkout expiration.
* Network failures.
* Backend unavailability.
* Unexpected server errors.

Map backend errors into safe, understandable user messages.

Never expose internal stack traces, database errors, provider credentials, or implementation details.

Preserve diagnostic information only through secure observability mechanisms.

---

# SECURITY

Treat all client-side state as untrusted.

Protect against:

* XSS.
* Unsafe HTML.
* Open redirects.
* Token leakage.
* Sensitive browser persistence.
* Unauthorized route access.
* IDOR through client-controlled identifiers.
* Malicious query parameters.
* Manipulated checkout values.
* Price manipulation.
* Coupon manipulation.
* Payment manipulation.
* Duplicate submission.
* CSRF where applicable to the authentication architecture.

Never trust:

* Client-calculated totals.
* Client-selected authorization roles.
* Client-provided seller identifiers.
* Client-provided payment status.
* Client-provided order ownership.

The backend must enforce all security-sensitive decisions.

---

# PERFORMANCE

Optimize account, checkout, and order workflows for real production usage.

Use:

* Server rendering where appropriate.
* Client components only where required.
* Efficient query caching.
* Targeted cache invalidation.
* Lazy loading for expensive interfaces.
* Code splitting.
* Optimized images.
* Avoidance of unnecessary rerenders.
* Efficient large order/item rendering.
* Proper loading boundaries.

Do not prefetch sensitive customer information unnecessarily.

Do not preload expensive private pages merely because navigation exists.

---

# ACCESSIBILITY

All implemented customer workflows must meet strong accessibility standards.

Ensure:

* Keyboard navigation.
* Focus management.
* Accessible dialogs.
* Accessible form errors.
* Screen-reader announcements for important state changes.
* Accessible progress indicators.
* Proper labels.
* Semantic headings.
* Logical navigation.
* Accessible tables or list structures where used.
* Accessible status indicators.
* Reduced-motion support.

Particular attention must be paid to:

* Checkout steps.
* Payment failures.
* Address dialogs.
* Coupon errors.
* Order status changes.
* Return forms.
* Confirmation messages.

---

# RESPONSIVE EXPERIENCE

All account and purchasing workflows must work on:

* Desktop.
* Tablet.
* Mobile web.

Pay particular attention to:

* Checkout on narrow screens.
* Sticky summaries.
* Address selection.
* Payment controls.
* Order timelines.
* Tracking information.
* Tables that may contain many fields.
* Modal dialogs.
* Form layouts.

Do not rely on horizontal scrolling for critical checkout actions.

---

# TESTING

Implement comprehensive tests for the introduced functionality.

Cover:

* Authentication-aware account routes.
* Profile editing.
* Address management.
* Wishlist behavior.
* Checkout state.
* Multi-seller presentation.
* Coupon behavior.
* Shipping selection.
* Payment states.
* Duplicate-submission protection.
* Order placement.
* Order history.
* Order details.
* Cancellation.
* Shipment tracking.
* Return submission.
* Refund display.
* Review submission.
* Notification behavior.
* Real-time update handling.
* Error states.
* Accessibility-critical interactions.

Include integration and end-to-end coverage for critical purchase flows where the repository supports it.

Prioritize tests around failure and concurrency-sensitive behavior rather than only successful paths.

---

# OBSERVABILITY

Integrate appropriate frontend telemetry for:

* Checkout failures.
* Payment failures.
* Order submission failures.
* API errors.
* Authentication failures.
* Route errors.
* Return submission failures.
* Critical customer workflow failures.

Never record:

* Passwords.
* Access tokens.
* Session secrets.
* Payment credentials.
* Full sensitive personal information.
* Sensitive financial details.

Use correlation identifiers where available.

---

# DOCUMENTATION

Update documentation for:

* Account routing.
* Checkout architecture.
* Customer state management.
* Payment integration boundaries.
* Order data handling.
* Real-time update behavior.
* Error handling.
* Testing strategy.
* Environment requirements.
* Local development.
* Important security assumptions.

Document actual implementation only.

---

# IMPLEMENTATION BOUNDARIES

Do not redesign backend contracts.

Do not modify database ownership merely to simplify frontend implementation.

Do not create fake payment integrations.

Do not make frontend calculations authoritative.

Do not expose internal seller or administrative information.

Do not create client-side authorization as a substitute for backend authorization.

Do not implement unsupported backend capabilities through mocked production behavior.

Do not create a second competing checkout architecture.

Do not duplicate order or payment state into unrelated client stores.

---

# ABSOLUTE IMPLEMENTATION RULES

The implementation must contain:

* No pseudo-code.
* No placeholders.
* No TODO comments.
* No FIXME comments.
* No fake APIs.
* No hardcoded secrets.
* No hardcoded payment credentials.
* No incomplete workflows.
* No intentionally broken routes.
* No omitted required implementation.
* No “implement similarly.”
* No “remaining code omitted.”
* No “left as an exercise.”
* No “for brevity.”
* No knowingly broken TypeScript.
* No knowingly broken builds.
* No duplicate competing state systems.
* No insecure storage of sensitive credentials.

Every implemented workflow must handle success, loading, failure, and recovery states.

Every mutation must protect against accidental duplicate submission where relevant.

Every financial or transactional value displayed as authoritative must originate from backend responses.

---

# REPOSITORY COMPATIBILITY

Integrate all functionality with the repository's existing frontend architecture.

Preserve:

* Existing routing conventions.
* Existing design system.
* Existing authentication mechanisms.
* Existing API client.
* Existing TanStack Query configuration.
* Existing state-management conventions.
* Existing form infrastructure.
* Existing testing tools.
* Existing observability integrations.

If existing functionality conflicts with the requirements, determine the safest production-grade integration strategy before changing it.

Avoid unnecessary rewrites.

Do not create parallel implementations merely because a different approach appears cleaner.

---

# VALIDATION AND COMPLETION

Before completion:

* Run formatting checks.
* Run linting.
* Run TypeScript checks.
* Run unit tests.
* Run integration tests where available.
* Run end-to-end tests for critical workflows where available.
* Validate authenticated and unauthenticated routing.
* Validate account management.
* Validate address management.
* Validate wishlist.
* Validate checkout.
* Validate multi-seller presentation.
* Validate payment success and failure states.
* Validate order placement.
* Validate order history/details.
* Validate shipment tracking.
* Validate cancellation.
* Validate returns.
* Validate refund presentation.
* Validate notifications.
* Validate responsive layouts.
* Validate accessibility-critical behavior.
* Validate production build.
* Confirm no secrets were introduced.
* Confirm no incomplete implementation markers remain.
* Confirm documentation is synchronized.

Fix discovered implementation problems before reporting completion.

Do not claim successful validation if a required check was not actually executed.

---

# IMPLEMENTATION REPORT

After implementation, provide:

1. Summary of completed customer account functionality.
2. Summary of checkout functionality.
3. Summary of payment integration.
4. Summary of order and fulfillment functionality.
5. Summary of returns/refunds functionality.
6. Summary of reviews and notifications.
7. Files created.
8. Files modified.
9. API contracts consumed.
10. Authentication/session behavior.
11. Real-time behavior.
12. Tests executed.
13. Validation commands executed.
14. Genuine limitations or repository constraints.

Report only actual implementation results.

---

# FINAL DIRECTIVE

Inspect the repository first.

Then implement the complete production-grade customer account, checkout, payment, order, fulfillment, return, refund, review, and notification frontend scope defined by this prompt.

Build these capabilities as one coherent customer experience.

Use the backend as the authoritative source for all transactional state.

Protect customers against stale state, duplicate submissions, payment failures, inventory conflicts, checkout expiration, and network failures.

Maintain strong accessibility, responsive behavior, security, performance, observability, and test coverage.

Do not stop at scaffolding.

Do not provide a conceptual proposal instead of implementation.

Implement the actual code, integrate it with the existing repository, validate it thoroughly, fix discovered issues, update documentation, and leave the application in a working production-grade state.
