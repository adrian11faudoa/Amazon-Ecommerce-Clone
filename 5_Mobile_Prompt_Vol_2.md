# AMAZON ECOMMERCE PLATFORM — MOBILE VOLUME 2 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Mobile Architect, Staff React Native Engineer, Staff Backend Integration Engineer, Security Engineer, Performance Engineer, Reliability Engineer, QA Engineer, UI/UX Engineer, and Technical Writer working together as a senior production engineering organization.

Implement the customer commerce, account, checkout, order, fulfillment, returns, reviews, and notification capabilities described in this prompt as a complete production-grade mobile application.

Do not act as a teacher or provide a tutorial. Inspect the repository first, understand its actual implementation state, and implement the required functionality directly.

Prioritize correctness, maintainability, scalability, security, accessibility, reliability, performance, observability, and production readiness over brevity.

## PROJECT

Build the mobile customer experience for a global, multi-seller ecommerce marketplace comparable in breadth and complexity to Amazon Marketplace.

The mobile application must provide a coherent customer journey from account management through shopping, checkout, payment, order tracking, returns, reviews, and notifications.

The platform supports:

* Millions of customers.
* Thousands or more sellers.
* Millions of products and variants.
* Multi-seller carts and checkout.
* Payments and refunds.
* Orders and fulfillment.
* Shipments and tracking.
* Returns.
* Reviews and ratings.
* Notifications.
* Promotions and coupons.
* Secure media.
* High availability and horizontally scalable backend services.

The mobile client is a production consumer of the platform APIs and must never become an alternative source of transactional truth.

## PRIMARY MOBILE USERS

This scope is focused on authenticated and guest customer experiences.

Customer functionality includes:

* Account management.
* Profile management.
* Address management.
* Wishlist.
* Cart.
* Checkout.
* Multi-seller checkout.
* Promotions and coupons.
* Shipping methods.
* Payment integration.
* Order placement.
* Order history.
* Order details.
* Order cancellation.
* Shipment tracking.
* Returns.
* Refund visibility.
* Reviews and ratings.
* Notification center.
* Customer preferences.

Seller and administrator mobile applications are outside this scope unless existing repository architecture requires shared infrastructure changes.

## TECHNOLOGY DIRECTION

Use the repository's actual compatible configuration while maintaining the intended mobile stack:

* React Native.
* Expo.
* TypeScript.
* React Navigation or equivalent production-grade navigation.
* TanStack Query.
* Zustand.
* React Hook Form.
* Zod.
* Platform-secure storage.
* Existing API clients and generated types.
* Existing authentication infrastructure.
* Existing design-system primitives.
* Existing observability and analytics infrastructure.

Do not replace established technology without a repository-level technical justification.

Do not create backend functionality inside the mobile application.

## SOURCE OF TRUTH

The repository is the authoritative implementation source.

Before modifying anything:

1. Inspect the mobile project structure.
2. Inspect the existing navigation hierarchy.
3. Inspect authentication/session management.
4. Inspect API clients.
5. Inspect generated types and API contracts.
6. Inspect TanStack Query configuration.
7. Inspect Zustand stores.
8. Inspect forms and validation infrastructure.
9. Inspect reusable UI components.
10. Inspect customer account functionality already implemented.
11. Inspect cart and product functionality already implemented.
12. Inspect backend contracts relevant to orders, payments, shipping, returns, reviews, and notifications.
13. Inspect tests.
14. Inspect environment configuration.
15. Inspect build configuration.
16. Inspect documentation.

Reuse compatible infrastructure.

Do not recreate existing functionality.

Do not assume an API exists merely because a business feature is conceptually required.

## IMPLEMENTATION SCOPE

Implement:

* Customer account.
* Customer profile.
* Address management.
* Wishlist completion.
* Cart-to-checkout transition.
* Checkout.
* Multi-seller checkout.
* Shipping method selection.
* Promotions.
* Coupons.
* Payment UI integration.
* Payment failure and recovery.
* Order placement.
* Order confirmation.
* Order history.
* Order details.
* Order cancellation.
* Shipment tracking.
* Returns.
* Refund status.
* Reviews.
* Ratings.
* Notification center.
* Notification preferences where supported.
* Real-time customer updates where supported.
* Security.
* Accessibility.
* Performance.
* Offline/degraded-network behavior.
* Testing.
* Observability.
* Documentation.

## CUSTOMER ACCOUNT

Implement a production-grade customer account experience.

Support:

* Profile display.
* Profile editing.
* Account information.
* Secure logout.
* Account state.
* Account-related navigation.
* Authentication-aware access.

Do not expose fields that the backend does not authorize the current customer to access.

Use server-provided authoritative account data.

Handle profile update conflicts and validation failures correctly.

## ADDRESS MANAGEMENT

Implement customer address management.

Support:

* Address list.
* Add address.
* Edit address.
* Delete address.
* Select default address where supported.
* Select checkout shipping address.
* Form validation.
* Server validation.
* Loading states.
* Empty states.
* Error states.
* Retry.

Address forms must use React Hook Form and Zod where appropriate.

Do not store sensitive address data in insecure global persistent state.

Handle concurrent updates safely.

Prevent stale address data from being used during checkout.

## WISHLIST

Complete the customer wishlist experience where supported by backend contracts.

Support:

* Wishlist list.
* Add product.
* Remove product.
* Navigate to product.
* Move/add item to cart where supported.
* Availability changes.
* Authentication requirements.
* Empty wishlist.
* Error recovery.

Optimistic updates may be used only where rollback behavior is deterministic.

Never report a wishlist mutation as successful when the server rejects it.

## CHECKOUT ARCHITECTURE

Implement a production-grade mobile checkout flow.

The checkout must support the marketplace's multi-seller model.

A single customer cart may contain items from multiple sellers.

The mobile application must represent:

* Customer checkout.
* Seller groups.
* Order grouping.
* Order items.
* Shipping selections.
* Payment information.
* Promotions.
* Taxes where supplied by the backend.
* Shipping charges.
* Discounts.
* Final totals.

Do not independently calculate authoritative totals.

The backend remains authoritative for:

* Product prices.
* Discounts.
* Taxes.
* Shipping costs.
* Inventory.
* Payment amounts.
* Order totals.

## CHECKOUT STATE

Implement explicit checkout states.

Support:

* Cart validation.
* Address selection.
* Shipping method selection.
* Promotion/coupon application.
* Payment method selection.
* Order review.
* Order submission.
* Payment processing.
* Confirmation.
* Failure recovery.

Do not allow users to submit an order from an incomplete or stale checkout state.

If backend checkout sessions exist, use them.

Do not invent a client-only checkout session model.

## CART VALIDATION BEFORE CHECKOUT

Before allowing final order submission, handle server-reported cart changes such as:

* Product removed.
* Product unavailable.
* Inventory reduced.
* Price changed.
* Seller unavailable.
* Quantity changed.
* Promotion invalidated.
* Shipping method unavailable.

Clearly communicate material changes.

Require customer confirmation when backend contracts require it.

Never silently alter a financially significant checkout state.

## SHIPPING ADDRESS SELECTION

Implement checkout-specific address selection.

Support:

* Existing addresses.
* New address where supported.
* Default address.
* Address validation.
* Address availability constraints.

Do not assume every shipping address is valid for every product or seller.

Respect backend shipping eligibility.

## SHIPPING METHODS

Implement shipping-method selection per applicable seller/order grouping.

Support:

* Available methods.
* Delivery estimates.
* Shipping cost.
* Restrictions.
* Selection state.
* Recalculation after selection.
* Loading.
* Failure.
* Unavailable method handling.

When changing shipping methods changes the order total, refresh authoritative totals from the backend.

## PROMOTIONS AND COUPONS

Implement customer-facing promotion functionality.

Support:

* Available promotions where provided.
* Coupon entry.
* Coupon application.
* Coupon removal.
* Validation errors.
* Expired coupons.
* Ineligible coupons.
* Minimum purchase requirements.
* Seller-specific promotions.
* Product/category restrictions where returned by the backend.

Do not calculate eligibility locally as authoritative logic.

Never expose internal promotion rules unnecessarily.

## PAYMENT UI

Integrate with the existing payment architecture.

Support payment workflows required by the actual backend contract, including:

* Payment method selection.
* Payment intent/session initialization.
* Secure provider UI where applicable.
* Payment confirmation.
* Payment failure.
* Retry.
* Cancellation.
* Authentication-required payment flows.
* Successful payment state.
* Pending payment state.

Never collect or store raw payment credentials in application storage.

Never log:

* Card numbers.
* Security codes.
* Payment tokens.
* Payment secrets.
* Provider credentials.

Use provider-approved secure payment components where applicable.

## PAYMENT FAILURE AND RECOVERY

Implement explicit recovery paths for:

* Declined payment.
* Authentication-required payment.
* Timeout.
* Network failure.
* Payment provider unavailable.
* Payment pending.
* Duplicate submission.
* Session expiration.

Never blindly retry a financial mutation.

Use backend idempotency semantics where supported.

If payment status is uncertain, retrieve authoritative backend state before allowing another payment attempt.

## ORDER SUBMISSION

Implement safe order placement.

Before submission:

* Ensure checkout data is current.
* Validate required selections.
* Confirm authoritative totals.
* Confirm applicable inventory state.
* Ensure authentication is valid.
* Use idempotency support where provided.
* Prevent accidental double submission.

Disable or otherwise protect the submit action while a submission is actively processing.

Do not rely solely on UI button disabling for duplicate prevention.

## ORDER CONFIRMATION

Implement a production-grade confirmation screen.

Display:

* Order identifier.
* Order groups where applicable.
* Purchased items.
* Seller information where appropriate.
* Payment status.
* Shipping information.
* Estimated delivery information where available.
* Totals.
* Next actions.

Do not expose internal payment or fulfillment implementation details.

Provide navigation to order details.

## ORDER HISTORY

Implement customer order history.

Support:

* Pagination.
* Filtering where supported.
* Order status.
* Date information.
* Total.
* Seller/order grouping.
* Pull-to-refresh.
* Loading.
* Empty state.
* Error recovery.

Use efficient list virtualization.

Do not load the customer's entire order history into memory.

## ORDER DETAILS

Implement comprehensive order details.

Display authoritative backend data for:

* Order status.
* Seller groups.
* Items.
* Quantities.
* Prices.
* Discounts.
* Shipping.
* Taxes.
* Payment status.
* Shipment status.
* Tracking information.
* Returns.
* Refunds.
* Available customer actions.

Do not infer financial status from client-side state.

## ORDER CANCELLATION

Implement cancellation where supported.

Support:

* Cancellation eligibility.
* Cancellation reason.
* Confirmation.
* Submission.
* Pending state.
* Success.
* Failure.
* Updated order state.

Never display cancellation as successful until authoritative backend state confirms it.

Handle race conditions where fulfillment begins while cancellation is being requested.

## SHIPMENT TRACKING

Implement shipment tracking.

Support:

* Shipment grouping.
* Carrier.
* Tracking number where customer-safe.
* Current status.
* Tracking events.
* Estimated delivery.
* Shipment items.
* Multiple shipments for one order.

Where real-time updates exist, integrate them safely.

Do not assume all order items share one shipment.

## REAL-TIME CUSTOMER ORDER UPDATES

Where backend real-time infrastructure exists, support customer-relevant updates such as:

* Order status changes.
* Shipment changes.
* Delivery updates.
* Return status changes.
* Refund status changes.
* Notification events.

Real-time channels must be:

* Authenticated.
* Authorized.
* Reconnectable.
* Duplicate-safe.
* Backpressure-aware.
* Lifecycle-aware.

Handle:

* App backgrounding.
* App foregrounding.
* Network loss.
* Reconnection.
* Stale events.
* Duplicate events.

Do not treat real-time events as the sole source of truth.

Refetch authoritative state when necessary.

## RETURNS

Implement customer return workflows supported by backend contracts.

Support:

* Return eligibility.
* Return initiation.
* Return reason.
* Item selection.
* Quantity selection.
* Optional customer notes where supported.
* Return submission.
* Return status.
* Return details.
* Error handling.

Do not permit return requests for items the backend identifies as ineligible.

Handle partial returns correctly.

A return must be associated with the appropriate order item and seller/fulfillment context.

## REFUNDS

Display refund information from authoritative backend state.

Support:

* Refund status.
* Refund amount.
* Refund date.
* Related order/return.
* Partial refunds.
* Multiple refunds where applicable.

Do not calculate refund amounts independently.

Do not claim that a refund has completed merely because a return was submitted.

## REVIEWS AND RATINGS

Implement customer review functionality.

Support:

* Review eligibility.
* Rating selection.
* Written review.
* Review submission.
* Review editing where supported.
* Review deletion where supported.
* Validation errors.
* Moderation status where appropriate.
* Existing reviews.
* Rating summary.

Use React Hook Form and Zod for review forms.

Do not expose moderation internals.

Do not allow client-side manipulation of review ownership or eligibility.

## REVIEW MEDIA

If backend contracts support review media:

* Use secure upload mechanisms.
* Validate supported media.
* Display upload progress where appropriate.
* Handle cancellation.
* Handle failed uploads.
* Avoid retaining temporary sensitive files unnecessarily.
* Use signed upload URLs where required.

Never embed storage credentials in the application.

## NOTIFICATION CENTER

Implement a customer notification center.

Support:

* Notification list.
* Pagination.
* Read/unread state.
* Mark as read.
* Mark all as read where supported.
* Notification detail.
* Deep-link destination where applicable.
* Empty state.
* Error recovery.

Prevent duplicate notifications.

Respect backend notification identifiers and timestamps.

## PUSH NOTIFICATIONS

Where push infrastructure exists, integrate it safely.

Support:

* Device registration.
* Permission state.
* Token registration.
* Token refresh.
* Logout/device deregistration.
* Notification open handling.
* Deep links.
* Foreground notification behavior.
* Background notification handling where platform rules permit.

Never treat a device token as a permanent credential.

Do not log push tokens unnecessarily.

## NOTIFICATION PREFERENCES

Where supported, implement customer notification preferences.

Support:

* Channel preferences.
* Category preferences.
* Enable/disable controls.
* Server synchronization.
* Loading state.
* Save state.
* Failure recovery.

Do not assume a local preference has successfully changed the server configuration.

## DEEP LINKING

Implement safe deep-link routing for supported customer workflows.

Potential destinations include:

* Products.
* Categories.
* Search.
* Cart.
* Orders.
* Order details.
* Shipments.
* Returns.
* Notifications.

Validate authorization before exposing protected content.

Do not trust identifiers embedded in deep links.

Retrieve authoritative data from the backend.

Handle malformed or expired links safely.

## OFFLINE AND DEGRADED NETWORK BEHAVIOR

Customer commerce workflows must remain safe under poor connectivity.

Support cached read-only data where appropriate.

Do not queue financial mutations locally unless the backend and repository explicitly provide a durable idempotent offline transaction architecture.

For uncertain mutations:

* Do not assume success.
* Query authoritative server state.
* Prevent accidental duplicate submission.
* Clearly communicate uncertainty.

Checkout and payment workflows require especially conservative retry behavior.

## SECURITY

Protect customer data and commerce workflows.

Address:

* Unauthorized order access.
* Unauthorized return access.
* Unauthorized profile modification.
* Token theft.
* Insecure local persistence.
* Deep-link authorization bypass.
* Payment-data leakage.
* Sensitive notification leakage.
* Debug logging leakage.
* Screenshot/privacy concerns where appropriate.
* Malicious API responses.
* Replay and duplicate submission.
* Session expiration.
* Device compromise assumptions.

The backend remains the authoritative authorization boundary.

Never rely on hidden UI elements as authorization.

## PRIVACY

Minimize collection and local retention of customer data.

Do not persist sensitive customer data without a clear functional requirement.

Do not send unnecessary personal information to analytics or telemetry systems.

Ensure logout removes or invalidates locally retained protected customer state as appropriate.

Do not expose private notifications or order information through insecure local notification previews when privacy settings require protection.

## ACCESSIBILITY

Ensure all customer workflows are accessible.

Support:

* Screen readers.
* Accessible form labels.
* Accessible validation messages.
* Logical focus.
* Touch targets.
* Dynamic text.
* Accessible loading states.
* Accessible error states.
* Accessible modals.
* Accessible checkout controls.
* Accessible notification state.

Critical information must never be communicated solely through color.

## PERFORMANCE

Optimize commerce workflows for real mobile devices.

Address:

* Checkout rendering.
* Large order histories.
* Product/review lists.
* Notification lists.
* Image memory.
* Query cache size.
* Navigation transitions.
* Form rendering.
* Re-renders.
* Network request volume.

Use virtualized lists.

Avoid unnecessary refetches.

Avoid retaining large datasets indefinitely.

Do not sacrifice transaction correctness for superficial performance gains.

## OBSERVABILITY

Integrate mobile telemetry for critical commerce workflows.

Track operationally useful failures such as:

* Checkout initialization failure.
* Address update failure.
* Coupon application failure.
* Payment initialization failure.
* Payment confirmation failure.
* Order submission failure.
* Order retrieval failure.
* Return submission failure.
* Review submission failure.
* Notification synchronization failure.
* Push registration failure.

Never record payment credentials, passwords, tokens, or unnecessary personal data.

Use correlation identifiers where compatible with backend tracing.

## ANALYTICS

Instrument meaningful customer events where the existing analytics architecture supports them.

Potential events include:

* Account viewed.
* Address added.
* Checkout started.
* Shipping method selected.
* Coupon applied.
* Payment flow started.
* Payment completed.
* Payment failed.
* Order submitted.
* Order viewed.
* Cancellation requested.
* Return initiated.
* Review submitted.
* Notification opened.

Do not record sensitive payment information.

Do not create analytics events that duplicate every low-level UI interaction.

Respect applicable privacy and consent mechanisms.

## TESTING

Implement comprehensive automated tests for the scope.

Include:

* Account tests.
* Address tests.
* Wishlist tests.
* Checkout tests.
* Multi-seller checkout tests.
* Coupon tests.
* Shipping selection tests.
* Payment tests.
* Payment failure tests.
* Order placement tests.
* Duplicate-submission tests.
* Order history tests.
* Order detail tests.
* Cancellation tests.
* Shipment tracking tests.
* Return tests.
* Refund-display tests.
* Review tests.
* Notification tests.
* Push/deep-link tests where infrastructure allows.
* Offline tests.
* Authentication-expiration tests.
* Accessibility tests.

## CRITICAL WORKFLOW TESTS

Verify at minimum:

1. Authenticated customer opens account.
2. Customer adds or edits an address.
3. Customer views wishlist.
4. Customer proceeds from cart to checkout.
5. Customer checks out with multiple sellers.
6. Customer selects shipping methods.
7. Customer applies a valid coupon.
8. Customer handles an invalid coupon.
9. Customer enters payment flow.
10. Payment fails safely.
11. Payment succeeds.
12. Customer submits an order.
13. Duplicate order submission is prevented.
14. Customer views the created order.
15. Customer views shipment status.
16. Customer requests cancellation when eligible.
17. Customer initiates a return.
18. Customer views refund status.
19. Customer submits a review.
20. Customer receives and opens a notification.
21. Authentication expires during a protected workflow.
22. Network connectivity is lost during a critical workflow.
23. App is backgrounded and resumed during order tracking.
24. Real-time updates reconnect after network loss.

## FAILURE TESTING

Explicitly test:

* HTTP 400.
* HTTP 401.
* HTTP 403.
* HTTP 404.
* HTTP 409.
* HTTP 422.
* HTTP 429.
* HTTP 500+.
* Timeout.
* Network disconnect.
* Stale checkout state.
* Inventory changes.
* Price changes.
* Coupon expiration.
* Shipping method removal.
* Payment timeout.
* Payment uncertainty.
* Duplicate submission.
* Expired authentication.
* Malformed API response.
* Push-token registration failure.
* Notification synchronization failure.

Ensure failures do not corrupt customer-visible state.

## DOCUMENTATION

Update documentation for:

* Account workflows.
* Address management.
* Checkout architecture.
* Payment integration.
* Multi-seller order handling.
* Order state handling.
* Shipment tracking.
* Returns.
* Refunds.
* Reviews.
* Notifications.
* Deep linking.
* Push notifications.
* Offline behavior.
* Testing.
* Troubleshooting.

Documentation must reflect the actual repository implementation.

## IMPLEMENTATION BOUNDARIES

This prompt covers customer account and post-cart commerce functionality in the mobile application.

Do not redesign backend services.

Do not create unsupported API endpoints.

Do not implement seller/admin mobile portals.

Do not replace existing mobile architecture unnecessarily.

Do not modify unrelated web or backend functionality.

Make only the cross-platform changes required for correct integration.

## ABSOLUTE IMPLEMENTATION RULES

Never:

* Generate pseudo-code.
* Add placeholders.
* Add TODO/FIXME comments.
* Leave stubs.
* Leave fake payment implementations.
* Invent API contracts.
* Invent unsupported backend behavior.
* Hardcode secrets.
* Store raw payment credentials.
* Trust client-side prices.
* Trust client-side authorization.
* Treat UI state as financial truth.
* Blindly retry financial mutations.
* Silently swallow errors.
* Disable tests or type checking to conceal defects.
* Remove existing tests merely to obtain a passing result.
* Claim success when backend confirmation has not occurred.
* Say “implement similarly.”
* Say “remaining code omitted.”
* Say “left as an exercise.”
* Say “for brevity.”

Every implementation must be complete, integrated, maintainable, and production-ready.

## REPOSITORY COMPATIBILITY

Preserve compatibility with the existing repository.

Verify:

* Navigation integration.
* Authentication integration.
* API contracts.
* Query/cache behavior.
* Client-state behavior.
* Secure storage.
* Forms.
* Validation.
* Existing mobile components.
* Environment configuration.
* Tests.
* Build configuration.

Do not duplicate existing account, cart, or product infrastructure when compatible implementations already exist.

When integration exposes an existing defect directly affecting this scope, fix it with the smallest safe change and document the correction.

## VALIDATION AND COMPLETION

Before declaring completion:

1. Inspect all changed files.
2. Verify TypeScript correctness.
3. Verify navigation.
4. Verify authentication.
5. Verify secure storage.
6. Verify API contracts.
7. Verify checkout state transitions.
8. Verify payment handling.
9. Verify order handling.
10. Verify return/refund behavior.
11. Verify notifications.
12. Verify deep links.
13. Verify accessibility.
14. Run unit/component tests.
15. Run linting.
16. Run type checking.
17. Run applicable mobile build/validation commands.
18. Verify no secrets are exposed.
19. Verify no placeholder implementations remain.
20. Verify documentation.
21. Verify unrelated functionality was not unnecessarily changed.

If a validation command cannot run because of an environmental limitation, report the exact limitation rather than claiming validation succeeded.

## IMPLEMENTATION REPORT

At completion, report:

* Customer account functionality implemented.
* Address functionality implemented.
* Wishlist functionality implemented.
* Checkout functionality implemented.
* Multi-seller checkout handling.
* Promotion/coupon functionality.
* Payment integration.
* Payment failure/recovery behavior.
* Order functionality.
* Shipment tracking.
* Cancellation functionality.
* Returns/refunds.
* Reviews/ratings.
* Notifications.
* Push/deep-link integration.
* Security improvements.
* Accessibility improvements.
* Performance improvements.
* Observability/analytics changes.
* Files created.
* Files modified.
* Tests added or updated.
* Validation commands executed.
* Validation results.
* Genuine remaining blockers, if any.

Do not report hypothetical functionality as completed.

## FINAL DIRECTIVE

Inspect the repository first.

Implement the complete customer account, checkout, payment, order, fulfillment, return, review, and notification mobile functionality defined by this prompt.

Use real production-grade React Native and Expo implementations.

Integrate with actual repository API contracts.

Preserve transactional correctness.

Treat backend state as authoritative.

Protect customer and payment information.

Implement robust failure handling.

Test critical commerce workflows.

Maintain accessibility, performance, observability, and reliability.

Do not stop at scaffolding.

Do not leave placeholders.

Do not invent unsupported behavior.

Complete the entire defined scope, validate the implementation rigorously, update documentation, and provide an accurate implementation report.
