# AMAZON ECOMMERCE PLATFORM — MOBILE VOLUME 1 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Mobile Architect, Staff React Native Engineer, Staff Backend Integration Engineer, Security Engineer, Performance Engineer, Reliability Engineer, QA Engineer, UI/UX Engineer, and Technical Writer working together as a senior production engineering organization.

Implement the mobile application described in this prompt as a complete production-grade component of a large-scale Amazon-style ecommerce marketplace.

Do not act as a teacher or provide a tutorial. Inspect the repository, determine its actual current implementation state, and implement the required mobile functionality directly.

Prioritize correctness, maintainability, scalability, security, accessibility, reliability, performance, observability, and production readiness over implementation brevity.

## PROJECT

Build the mobile application for a global, multi-seller ecommerce marketplace comparable in breadth and complexity to Amazon Marketplace.

The platform supports:

* Millions of customers.
* Thousands or more sellers.
* Millions of products and variants.
* Customer accounts.
* Seller-managed catalog and inventory.
* Product discovery and search.
* Shopping carts.
* Multi-seller checkout.
* Orders and fulfillment.
* Payments and refunds.
* Shipping and tracking.
* Returns.
* Reviews and ratings.
* Notifications.
* Seller operations.
* Administration.
* Promotions and coupons.
* Secure media.
* High availability and horizontal scalability.

The mobile application is a first-class production client of the marketplace platform.

The mobile implementation must integrate cleanly with the existing repository and all existing compatible platform contracts.

## PRIMARY MOBILE USERS

The mobile application must primarily support customer-facing workflows while establishing a reusable mobile architecture capable of supporting additional authenticated marketplace functionality.

Primary customer capabilities include:

* Registration.
* Login.
* Logout.
* Session restoration.
* Account management.
* Product discovery.
* Categories.
* Search.
* Filters.
* Sorting.
* Product details.
* Product variants.
* Product media.
* Pricing.
* Availability.
* Cart management.
* Wishlist foundations.
* Checkout foundations.
* Order access.
* Notifications.
* Reviews.
* Returns.
* Shipment tracking.

Do not implement seller or administrator mobile workflows in this scope unless the repository already contains mobile-specific infrastructure that requires a compatible shared foundation.

## TECHNOLOGY DIRECTION

Use the repository's actual compatible technology configuration as the source of truth while maintaining the intended mobile direction:

* React Native.
* Expo.
* TypeScript.
* React Navigation or an equivalent production-grade navigation solution.
* TanStack Query.
* Zustand.
* React Hook Form.
* Zod.
* Secure device storage appropriate for authentication/session material.
* Native platform capabilities only where justified.
* Existing backend REST/API contracts.
* Existing authentication mechanisms.
* Existing media/upload mechanisms where applicable.

Do not introduce an alternative mobile framework or replace the established stack without a concrete repository-level reason.

Do not duplicate backend business logic inside the mobile client.

## SOURCE OF TRUTH

The repository is the authoritative source of truth for the implementation.

Before modifying anything:

1. Inspect the complete repository structure relevant to mobile development.
2. Identify the existing mobile application and its package configuration.
3. Inspect TypeScript configuration.
4. Inspect Expo configuration.
5. Inspect navigation infrastructure.
6. Inspect API clients and generated API types if present.
7. Inspect authentication/session infrastructure.
8. Inspect TanStack Query configuration.
9. Inspect Zustand stores.
10. Inspect shared validation and types.
11. Inspect existing design-system components.
12. Inspect backend API contracts that are already represented in the repository.
13. Inspect existing tests.
14. Inspect environment configuration.
15. Inspect build and development scripts.
16. Inspect existing documentation.
17. Identify incomplete, duplicated, incompatible, or unsafe mobile implementations.

Reuse compatible existing infrastructure.

Do not unnecessarily rewrite working code.

Do not assume that a file exists merely because the architecture calls for it.

Do not recreate functionality that already exists and satisfies the requirements.

## IMPLEMENTATION SCOPE

Implement a production-grade mobile foundation and customer shopping experience covering:

* Mobile application architecture.
* Application bootstrap.
* Environment configuration.
* Navigation.
* Authentication.
* Secure session handling.
* API integration.
* TanStack Query integration.
* Zustand integration.
* Shared mobile UI foundations.
* Customer home/storefront.
* Categories.
* Product discovery.
* Search.
* Filters.
* Sorting.
* Product details.
* Product variants.
* Product media.
* Pricing display.
* Availability display.
* Cart foundations.
* Wishlist foundations where compatible.
* Loading states.
* Error states.
* Empty states.
* Offline and degraded-network behavior.
* Accessibility.
* Responsive/native layouts.
* Performance.
* Security.
* Observability.
* Testing.
* Documentation.

All implementation must be production-ready.

## MOBILE APPLICATION ARCHITECTURE

Establish a clear mobile architecture with explicit boundaries between:

* Application bootstrap.
* Navigation.
* Screens.
* Feature modules.
* Components.
* Domain models.
* API clients.
* Query hooks.
* Client state.
* Form state.
* Validation.
* Secure persistence.
* Device capabilities.
* Analytics/telemetry.
* Error handling.
* Shared utilities.

Avoid placing business logic directly inside presentation components.

Keep screens focused on composition and orchestration.

Keep API access centralized.

Keep server state managed through TanStack Query.

Use Zustand only for appropriate client-owned state such as:

* UI state.
* Session metadata that is safe to persist.
* Local preferences.
* Cart presentation state where appropriate.
* Temporary client workflows.
* Navigation-related state where justified.

Do not duplicate server truth in Zustand unnecessarily.

## APPLICATION BOOTSTRAP

Implement a deterministic application startup sequence.

The application must correctly handle:

* Environment initialization.
* Configuration validation.
* Dependency initialization.
* Secure storage initialization.
* Session restoration.
* API client initialization.
* Query client initialization.
* Global state initialization.
* Navigation readiness.
* Deep-link handling where supported.
* Push notification initialization where already supported by the repository.
* Error reporting initialization.
* Analytics initialization where supported.
* Loading and failure states.

Avoid rendering authenticated screens before authentication state has been resolved.

Avoid exposing partially initialized application state.

Handle startup failures gracefully.

## ENVIRONMENT CONFIGURATION

Implement environment configuration appropriate for:

* Local development.
* Development.
* Test.
* Staging.
* Production.

Never hardcode:

* API secrets.
* Private keys.
* Authentication secrets.
* Payment secrets.
* Provider credentials.
* Tokens.
* Internal service credentials.

Public mobile configuration must be treated as public.

Sensitive credentials must never be embedded into the application bundle.

Validate required configuration at startup.

Provide clear diagnostics for invalid non-secret configuration without exposing secret values.

## NAVIGATION ARCHITECTURE

Implement a production-grade navigation hierarchy.

Support appropriate separation between:

* Public routes.
* Authentication routes.
* Authenticated customer routes.
* Modal workflows.
* Product/detail navigation.
* Checkout-related navigation foundations.
* Account navigation.

Navigation must respond correctly to:

* Authenticated state.
* Unauthenticated state.
* Expired sessions.
* Logout.
* Deep links.
* Back navigation.
* Android back behavior.
* iOS navigation conventions.
* Modal dismissal.
* Interrupted workflows.

Prevent unauthorized screens from being reachable merely by manipulating navigation state.

Navigation guards must complement server-side authorization rather than replace it.

Avoid excessive nested navigators that create difficult state-management and deep-linking problems.

## AUTHENTICATION AND SESSION MANAGEMENT

Implement secure customer authentication integration using the actual repository API contracts.

Support, where available:

* Registration.
* Login.
* Logout.
* Access-token handling.
* Refresh-token handling.
* Session restoration.
* Session expiration.
* Token refresh.
* Invalid-session recovery.
* Account state changes.

Store sensitive authentication material using platform-appropriate secure storage.

Do not store access or refresh credentials in ordinary unencrypted application storage when secure storage is available.

Never log:

* Access tokens.
* Refresh tokens.
* Passwords.
* Authorization headers.
* Session secrets.
* Sensitive personal information.

Handle concurrent token refresh requests safely.

Prevent multiple simultaneous refresh operations from creating inconsistent session state.

When refresh fails permanently:

1. Clear invalid credentials securely.
2. Clear protected client state that must no longer remain accessible.
3. Transition the application to an unauthenticated state.
4. Preserve only safe navigation context where appropriate.
5. Avoid destructive loops between API errors and navigation.

## API CLIENT ARCHITECTURE

Implement a centralized, typed API client.

The API layer must provide:

* Base URL configuration.
* Authentication headers.
* Request serialization.
* Response parsing.
* Typed responses.
* Typed API errors.
* Timeout handling.
* Cancellation support where appropriate.
* Retry policy where appropriate.
* Token refresh.
* Request correlation identifiers where supported.
* Network failure classification.
* Consistent error normalization.

Do not create ad hoc fetch calls throughout screens.

Do not silently swallow API failures.

Respect backend API contracts already present in the repository.

Do not invent endpoints that are not supported by the actual backend contract.

If generated API clients or schemas exist, integrate with them rather than manually duplicating their definitions.

## API ERROR HANDLING

Normalize backend failures into a predictable mobile error model.

Support distinctions such as:

* Validation errors.
* Authentication errors.
* Authorization errors.
* Not found.
* Conflict.
* Rate limiting.
* Network failure.
* Timeout.
* Server failure.
* Maintenance/degraded service.
* Unknown failure.

Provide user-safe messages.

Do not expose internal stack traces, database errors, infrastructure details, or sensitive diagnostic information.

Preserve structured error metadata internally when useful for telemetry.

## TANSTACK QUERY

Configure TanStack Query as the authoritative client-side server-state layer.

Implement:

* Query client configuration.
* Query key conventions.
* Cache policies.
* Stale-time policies.
* Retry policies.
* Mutation handling.
* Query invalidation.
* Optimistic updates where safe.
* Request cancellation.
* Refetch behavior.
* Network-aware behavior.
* Authentication-aware cache clearing.

Prevent stale authenticated customer data from remaining accessible after logout.

Invalidate or clear affected queries after mutations.

Avoid excessive refetching.

Avoid global retry behavior for mutations where retries could duplicate business operations.

Respect backend idempotency semantics.

## ZUSTAND

Use Zustand only for client-owned state.

Appropriate state may include:

* UI preferences.
* Temporary checkout presentation state.
* Local filters where appropriate.
* Client-only feature state.
* Non-sensitive preferences.
* Navigation/UI state.

Do not use Zustand as a second server cache.

Do not persist sensitive information unless there is a documented security justification and secure storage mechanism.

Keep stores modular.

Avoid one monolithic global store.

## DESIGN SYSTEM AND MOBILE UI FOUNDATION

Establish reusable mobile components and tokens for:

* Typography.
* Spacing.
* Layout.
* Colors.
* Elevation.
* Borders.
* Buttons.
* Inputs.
* Cards.
* Lists.
* Product tiles.
* Price displays.
* Badges.
* Ratings.
* Navigation.
* Headers.
* Bottom sheets.
* Modals.
* Alerts.
* Skeleton loaders.
* Empty states.
* Error states.
* Loading indicators.

Use platform-appropriate interaction patterns.

Respect:

* iOS conventions.
* Android conventions.
* Safe areas.
* Touch targets.
* Keyboard behavior.
* Dynamic text sizing.
* Screen reader behavior.
* Reduced-motion preferences where supported.

Avoid implementing the same visual component multiple times.

## CUSTOMER STOREFRONT

Implement the mobile customer storefront foundation.

Support:

* Home/storefront screen.
* Product discovery.
* Category navigation.
* Featured content where supported.
* Product collections where supported.
* Personalized content only when corresponding backend contracts exist.

The storefront must remain usable when optional content fails.

A failed recommendation or promotional module must not prevent core shopping functionality from loading.

## PRODUCT LISTING

Implement production-grade product listing screens.

Support:

* Pagination.
* Cursor pagination where the API provides it.
* Infinite scrolling where appropriate.
* Pull-to-refresh.
* Loading states.
* Skeleton states.
* Empty results.
* Error recovery.
* Product image loading.
* Pricing.
* Availability.
* Ratings.
* Seller information where relevant.
* Sorting.
* Filtering.

Prevent duplicate products during pagination.

Handle repeated requests safely.

Respect API pagination contracts.

Do not load unbounded datasets into memory.

## SEARCH

Implement customer product search integration.

Support:

* Search input.
* Search submission.
* Search history where appropriate.
* Suggestions where supported.
* Result pagination.
* Filters.
* Facets.
* Sorting.
* Empty search results.
* Search errors.
* Query cancellation.
* Debounced suggestions where appropriate.

Do not execute unnecessary search requests for every keystroke.

Prevent stale responses from replacing newer search results.

Respect backend search relevance and filtering semantics.

## CATEGORIES

Implement category browsing using backend category contracts.

Support:

* Category navigation.
* Nested categories.
* Category product listings.
* Breadcrumb-equivalent mobile navigation where useful.
* Loading states.
* Empty states.
* Errors.
* Pagination.

Do not hardcode the category tree unless the repository explicitly defines static categories for presentation.

## PRODUCT DETAILS

Implement comprehensive product detail screens.

Support:

* Product title.
* Product media.
* Image gallery.
* Product description.
* Pricing.
* Discounts.
* Availability.
* Seller information.
* Ratings.
* Review summary.
* Product variants.
* Attributes.
* Quantity selection.
* Add-to-cart.
* Wishlist integration.
* Shipping information where available.

Variant selection must be deterministic.

Do not allow unavailable variants to be selected when the backend explicitly identifies them as unavailable.

Display price and availability from authoritative backend responses.

Never trust client-calculated prices for order creation.

## PRODUCT MEDIA

Implement secure and performant product media handling.

Support:

* Responsive image sizing.
* Caching.
* Progressive loading where supported.
* Placeholder states.
* Failed-image recovery.
* CDN-backed media.
* Signed media URLs where required.
* Video/media extensions only where supported by actual contracts.

Do not expose private object-storage credentials.

Do not construct privileged storage URLs on the client.

Do not download unnecessarily large media assets.

Respect device memory constraints.

## CART FOUNDATION

Implement mobile cart functionality compatible with the marketplace's multi-seller model.

Support:

* Cart retrieval.
* Cart item display.
* Quantity changes.
* Item removal.
* Availability updates.
* Price changes.
* Seller grouping where appropriate.
* Empty cart.
* Loading state.
* Error state.
* Retry.
* Navigation to checkout foundation.

The cart UI must clearly reflect that multiple sellers may participate in a single customer checkout.

Do not calculate authoritative totals independently from the backend.

Display server-provided totals and warnings.

Handle cart conflicts such as:

* Inventory becoming unavailable.
* Quantity limits.
* Price changes.
* Seller changes.
* Product deactivation.

## WISHLIST FOUNDATION

Where the backend contract supports wishlist functionality, implement:

* Wishlist loading.
* Add item.
* Remove item.
* Product availability handling.
* Authentication requirements.
* Optimistic updates only where rollback is reliable.
* Error recovery.

Do not silently lose wishlist changes when requests fail.

## FORMS AND VALIDATION

Use React Hook Form and Zod where forms are required.

Implement validation that is:

* Type-safe.
* Accessible.
* Consistent.
* Localized-ready.
* Synchronized with backend expectations where possible.

Client validation is not a replacement for server validation.

Handle server-side validation errors explicitly.

Do not display raw backend validation payloads to users.

## LOADING, EMPTY, ERROR, AND DEGRADED STATES

Every major mobile screen must have intentional states for:

* Initial loading.
* Background loading.
* Empty content.
* Recoverable error.
* Permanent error.
* Offline state.
* Slow network.
* Authentication expiration.
* Rate limiting.
* Service degradation.

Do not use blank screens as loading or failure states.

Provide recovery actions where appropriate.

Avoid destructive automatic retries that waste battery, bandwidth, or backend resources.

## OFFLINE AND NETWORK RESILIENCE

Implement appropriate mobile network awareness.

Distinguish:

* Connected.
* Offline.
* Intermittent connectivity.
* Request timeout.
* Backend unavailable.

Where safe, allow cached read-only experiences.

Do not pretend mutations succeeded while offline unless a durable offline mutation architecture exists and the backend supports the required idempotency semantics.

Clearly communicate pending or failed operations.

Do not duplicate orders, cart mutations, payments, or other financial operations due to client retries.

## DEVICE AND PLATFORM BEHAVIOR

Handle mobile-specific behavior correctly.

Support where relevant:

* Safe areas.
* Status bars.
* Navigation bars.
* Keyboard avoidance.
* Orientation constraints where appropriate.
* Hardware back button.
* App backgrounding.
* App foregrounding.
* Memory pressure.
* Network changes.
* Deep links.
* Notification opens.

Do not keep sensitive information unnecessarily in application memory.

Avoid background processing that consumes excessive battery.

## ACCESSIBILITY

Implement accessible mobile experiences.

Support:

* Screen readers.
* Accessible labels.
* Accessible roles.
* Accessible states.
* Sufficient touch target sizes.
* Logical focus behavior.
* Dynamic text sizing.
* Color-independent information.
* Meaningful error announcements.
* Accessible forms.
* Accessible navigation.

Do not rely exclusively on color, icons, animation, or visual position to communicate important information.

## PERFORMANCE

Optimize for production mobile devices rather than only development hardware.

Address:

* Startup time.
* JavaScript bundle size.
* Component rendering.
* List virtualization.
* Image memory usage.
* Network request volume.
* Query caching.
* Navigation performance.
* Animation performance.
* Memory leaks.
* Excessive subscriptions.
* Unnecessary re-renders.

Use virtualized lists for large product collections.

Do not render thousands of products simultaneously.

Avoid expensive synchronous operations during startup.

Measure before introducing complicated optimization mechanisms.

## SECURITY

Apply mobile-specific security controls.

Protect against:

* Token theft.
* Insecure local storage.
* Sensitive data leakage.
* Deep-link abuse.
* Authorization bypass.
* Malicious API responses.
* WebView risks where WebViews are used.
* Insecure redirects.
* Certificate/network interception concerns where applicable.
* Debug logging leakage.
* Clipboard leakage where sensitive data could be exposed.
* Screen capture risks where appropriate for sensitive workflows.

Never rely on mobile UI restrictions as the authoritative security boundary.

All authorization must ultimately be enforced by the backend.

## OBSERVABILITY

Integrate with the repository's observability architecture.

Capture useful mobile telemetry such as:

* Application startup failures.
* Navigation failures.
* API failures.
* Authentication failures.
* Query failures.
* Mutation failures.
* Critical business workflow failures.
* Crashes.
* Performance measurements.
* Network failures.

Do not collect unnecessary personal data.

Never log:

* Passwords.
* Tokens.
* Authorization headers.
* Payment credentials.
* Secrets.
* Sensitive personal information.

Use correlation identifiers when compatible with the platform architecture.

## ANALYTICS

Where analytics infrastructure exists, instrument meaningful customer events such as:

* App opened.
* Search performed.
* Product viewed.
* Product variant selected.
* Product added to cart.
* Product removed from cart.
* Wishlist changes.
* Checkout started.
* Authentication events.
* Order-related navigation.
* Errors affecting conversion-critical workflows.

Do not instrument arbitrary UI interactions without a business or operational purpose.

Do not send payment credentials or unnecessary personal data to analytics systems.

Respect privacy and consent requirements supported by the project.

## TESTING

Implement comprehensive automated tests appropriate to the mobile scope.

Include where applicable:

* Unit tests.
* Component tests.
* Hook tests.
* State-store tests.
* API-client tests.
* Authentication/session tests.
* Navigation tests.
* Query/mutation tests.
* Form validation tests.
* Product-list tests.
* Search tests.
* Product-detail tests.
* Cart tests.
* Offline/degraded-network tests.
* Accessibility tests.
* Error-state tests.

Test critical flows including:

1. Application startup.
2. Unauthenticated navigation.
3. Login.
4. Session restoration.
5. Token refresh.
6. Logout.
7. Product discovery.
8. Search.
9. Product details.
10. Variant selection.
11. Add-to-cart.
12. Cart updates.
13. Authentication expiration.
14. Network failure recovery.

Do not rely exclusively on snapshots.

## ERROR AND FAILURE TESTING

Explicitly test:

* Network unavailable.
* Request timeout.
* HTTP 401.
* HTTP 403.
* HTTP 404.
* HTTP 409.
* HTTP 429.
* HTTP 500+.
* Malformed responses.
* Expired sessions.
* Failed refresh.
* Pagination failure.
* Image failure.
* Empty datasets.
* Slow responses.
* Duplicate requests.
* App background/foreground transitions.

Ensure failure handling does not leave the application in an inconsistent state.

## DOCUMENTATION

Update mobile documentation to accurately describe:

* Mobile architecture.
* Application startup.
* Environment configuration.
* Navigation.
* Authentication.
* Secure storage.
* API integration.
* Query management.
* Client state.
* Testing.
* Local development.
* Expo workflows.
* Build requirements.
* Debugging.
* Observability.
* Common failure modes.

Documentation must describe the implementation that actually exists.

Do not create documentation for functionality that was not implemented.

## IMPLEMENTATION BOUNDARIES

This prompt covers the mobile application foundation and customer shopping experience.

Do not redesign the backend architecture.

Do not replace existing API contracts without a repository-level necessity.

Do not implement seller/admin mobile applications in this scope unless required by existing repository architecture.

Do not implement unrelated infrastructure changes.

Do not modify unrelated frontend functionality merely for stylistic preference.

If integration requires a small cross-platform compatibility change, make the minimum safe change necessary and document it.

## ABSOLUTE IMPLEMENTATION RULES

Never:

* Generate pseudo-code.
* Generate placeholders.
* Add TODO comments.
* Add FIXME comments.
* Leave fake implementations.
* Leave stub APIs.
* Leave incomplete functions.
* Hardcode secrets.
* Hardcode production credentials.
* Invent backend endpoints.
* Invent unsupported response shapes.
* Duplicate authoritative backend business logic.
* Silently ignore errors.
* Disable security controls to make tests pass.
* Disable type checking to bypass implementation problems.
* Disable linting to hide defects.
* Remove existing tests merely because they fail after implementation.
* Break working functionality without justification.
* Replace working infrastructure unnecessarily.
* Say “implement similarly.”
* Say “remaining code omitted.”
* Say “left as an exercise.”
* Say “for brevity.”
* Claim implementation is complete when required functionality remains unfinished.

Every implemented file must contain a complete, maintainable implementation.

## REPOSITORY COMPATIBILITY

Preserve compatibility with the existing repository.

Before completing the work:

* Resolve TypeScript errors introduced by the implementation.
* Resolve lint errors introduced by the implementation.
* Resolve test failures introduced by the implementation.
* Resolve navigation inconsistencies.
* Resolve API contract mismatches.
* Resolve state-management inconsistencies.
* Resolve environment configuration problems.
* Resolve build configuration problems caused by the implementation.

Do not conceal failures by weakening validation.

Use the repository's established conventions unless they are demonstrably unsafe or incompatible with the required mobile architecture.

## VALIDATION AND COMPLETION

Before declaring completion:

1. Inspect all modified files.
2. Verify imports and exports.
3. Verify TypeScript types.
4. Verify navigation configuration.
5. Verify authentication/session behavior.
6. Verify API integration.
7. Verify TanStack Query behavior.
8. Verify Zustand behavior.
9. Verify secure storage usage.
10. Verify loading/error/empty states.
11. Verify accessibility.
12. Verify mobile responsiveness and platform behavior.
13. Run relevant unit/component tests.
14. Run linting.
15. Run type checking.
16. Run the appropriate mobile build or validation commands available in the repository.
17. Verify that no secrets are exposed.
18. Verify that no TODO/FIXME placeholders remain in the implemented scope.
19. Verify that no unrelated functionality was unnecessarily changed.
20. Verify that documentation accurately reflects the implementation.

If a validation command cannot be executed because of a genuine repository or environment limitation, identify the exact limitation instead of claiming success.

## IMPLEMENTATION REPORT

At completion, provide a concise engineering report containing:

* Summary of implemented mobile functionality.
* Architecture and structural changes.
* Files created.
* Files modified.
* API integrations added or updated.
* Authentication/session changes.
* Navigation changes.
* State-management changes.
* Testing added.
* Security measures implemented.
* Performance measures implemented.
* Observability changes.
* Documentation changes.
* Validation commands executed.
* Validation results.
* Any remaining repository-level blockers that are genuinely outside this implementation scope.

Do not describe hypothetical work as completed.

## FINAL DIRECTIVE

Inspect the repository first.

Implement the complete mobile foundation and customer shopping experience defined by this prompt using the actual repository state and compatible production architecture.

Build real, integrated, tested, secure, maintainable React Native + Expo functionality.

Preserve existing working behavior.

Maintain compatibility with the marketplace's backend contracts and overall application architecture.

Do not stop at scaffolding.

Do not produce partial implementations.

Do not leave placeholders.

Do not invent unsupported APIs.

Complete every required implementation within scope, validate it rigorously, update the relevant documentation, and report exactly what was implemented and verified.
