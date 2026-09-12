# AMAZON ECOMMERCE PLATFORM — MOBILE VOLUME 3 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Mobile Architect, Staff React Native Engineer, Staff Backend Integration Engineer, Security Engineer, Performance Engineer, Reliability Engineer, QA Engineer, UI/UX Engineer, and Technical Writer working together as a senior production engineering organization.

Implement the advanced mobile marketplace, customer experience hardening, real-time capabilities, media workflows, personalization foundations, privacy controls, and production-readiness improvements described in this prompt.

Do not act as a teacher or provide a tutorial. Inspect the repository first, understand its actual implementation state, and implement the required functionality directly.

Prioritize correctness, maintainability, scalability, security, accessibility, reliability, performance, observability, and production readiness over brevity.

## PROJECT

Build a production-grade mobile application for a global multi-seller ecommerce marketplace comparable in breadth and complexity to Amazon Marketplace.

The mobile platform must operate reliably across:

* Large product catalogs.
* Millions of customers.
* Multiple sellers.
* Multi-seller orders.
* High-volume search.
* Product media.
* Personalized storefront content.
* Customer notifications.
* Order and fulfillment updates.
* Reviews and ratings.
* Returns and refunds.
* Customer account workflows.

The mobile application must remain a secure client of authoritative backend services.

## PRIMARY MOBILE USERS

This scope primarily serves customers.

Customer capabilities include:

* Personalized storefront experiences where supported.
* Product discovery.
* Search.
* Product media.
* Recommendations where supported.
* Reviews.
* Notifications.
* Order updates.
* Wishlist.
* Account privacy controls.
* Data export/deletion workflows where supported.
* Device/session management where supported.

The implementation must also harden the shared mobile platform used by all customer workflows.

## TECHNOLOGY DIRECTION

Use the repository's actual compatible configuration while maintaining the intended mobile technology direction:

* React Native.
* Expo.
* TypeScript.
* React Navigation or equivalent.
* TanStack Query.
* Zustand.
* React Hook Form.
* Zod.
* Secure device storage.
* Existing API contracts.
* Existing authentication infrastructure.
* Existing observability and analytics infrastructure.
* Existing media infrastructure.

Do not replace established technologies without a repository-level technical reason.

## SOURCE OF TRUTH

The repository is authoritative.

Before implementation:

1. Inspect the complete mobile application structure.
2. Inspect existing customer screens and workflows.
3. Inspect navigation.
4. Inspect API clients and contracts.
5. Inspect authentication and session management.
6. Inspect query/cache architecture.
7. Inspect client state.
8. Inspect notification infrastructure.
9. Inspect deep-link infrastructure.
10. Inspect media handling.
11. Inspect analytics and telemetry.
12. Inspect existing privacy/account controls.
13. Inspect tests.
14. Inspect build configuration.
15. Inspect environment configuration.
16. Inspect mobile documentation.

Reuse compatible implementations.

Do not duplicate functionality already present.

Do not invent backend contracts.

## IMPLEMENTATION SCOPE

Implement and harden:

* Personalized storefront foundations.
* Recommendations integration where supported.
* Recently viewed products.
* Recently searched products.
* Search-history management.
* Product comparison foundations where supported.
* Product media hardening.
* Customer notification and real-time hardening.
* Device/session management where supported.
* Privacy controls.
* Account data export/delete workflows where supported.
* Consent-aware analytics foundations.
* Secure local data lifecycle.
* Deep-link hardening.
* Universal/app-link handling where supported.
* App lifecycle resilience.
* Background/foreground synchronization.
* Network resilience.
* Cache lifecycle management.
* Performance hardening.
* Accessibility hardening.
* Mobile security hardening.
* Error reporting.
* Analytics reliability.
* Comprehensive testing.
* Production build hardening.
* Documentation.

## PERSONALIZED STOREFRONT

Where backend contracts support personalization, implement customer-facing personalized content such as:

* Recommended products.
* Recently viewed products.
* Recently purchased products where appropriate.
* Personalized categories.
* Personalized collections.
* Promotional recommendations.

Personalized content must be modular.

A failed personalization request must not prevent the core storefront from functioning.

Do not create recommendation logic inside the mobile application.

The backend remains responsible for recommendation decisions.

## RECOMMENDATIONS

Integrate recommendation APIs where available.

Support:

* Loading states.
* Empty recommendations.
* Recommendation errors.
* Refresh behavior.
* Product navigation.
* Product availability changes.
* Analytics events where appropriate.

Do not assume recommendations are authoritative inventory or pricing data.

Refresh authoritative product information where required.

Do not expose recommendation-service internals.

## RECENTLY VIEWED PRODUCTS

Implement recently viewed products where supported.

Handle:

* Local history.
* Server synchronization where supported.
* Deduplication.
* Maximum history size.
* Expired products.
* Removed products.
* Logout behavior.
* Privacy requirements.

Do not persist unnecessary product metadata indefinitely.

Do not retain customer activity after account deletion where privacy requirements prohibit it.

## SEARCH HISTORY

Implement customer search-history functionality where supported.

Support:

* Recent searches.
* Search history display.
* Individual deletion.
* Clear-all.
* Server synchronization where applicable.
* Privacy-aware persistence.

Avoid storing sensitive search content unnecessarily.

Respect logout and account deletion semantics.

## PRODUCT COMPARISON

If product comparison is supported by the backend:

* Implement comparison selection.
* Display comparable attributes.
* Handle unavailable products.
* Handle incompatible attribute sets.
* Support removal.
* Provide accessible comparison views.

Do not invent comparison APIs.

If no backend comparison contract exists, implement only compatible shared UI infrastructure required by existing repository functionality.

## PRODUCT MEDIA HARDENING

Harden media handling across the application.

Support:

* Efficient image loading.
* Appropriate image dimensions.
* Memory-aware caching.
* Placeholder states.
* Failed image recovery.
* CDN media.
* Signed URLs.
* Secure upload workflows where supported.
* Video playback where supported.
* Media cancellation.
* Background/foreground transitions.

Prevent excessive memory usage.

Avoid loading full-resolution assets when smaller variants are available.

Do not expose storage credentials.

## MEDIA UPLOADS

Where customer media uploads exist, such as reviews or support workflows:

* Validate file type.
* Validate size.
* Validate metadata.
* Use signed upload mechanisms.
* Show upload progress.
* Support cancellation.
* Handle failed uploads.
* Handle retries safely.
* Remove abandoned temporary references where backend functionality supports it.

Treat all uploaded media as untrusted.

Never execute or render untrusted content in privileged contexts.

## NOTIFICATION HARDENING

Harden the notification architecture.

Support:

* Push notification registration.
* Token lifecycle.
* Multiple device sessions where supported.
* Notification synchronization.
* Read/unread state.
* Deep links.
* Notification deduplication.
* Foreground handling.
* Background handling.
* Reconnection.
* Token refresh.
* Logout cleanup.

Do not assume a notification delivered to a device means the corresponding business operation succeeded.

Use authoritative backend state for transactional information.

## REAL-TIME CONNECTION MANAGEMENT

Harden real-time customer connections.

Support:

* Authentication.
* Authorization.
* Connection lifecycle.
* Reconnection.
* Exponential backoff.
* Jitter.
* Network awareness.
* App lifecycle.
* Duplicate event handling.
* Event ordering where required.
* Stale-event rejection.
* Subscription cleanup.

Avoid maintaining unnecessary connections while the application is backgrounded.

Do not create duplicate subscriptions after repeated foreground/resume cycles.

## REAL-TIME EVENT PROCESSING

Handle real-time events such as:

* Order status changes.
* Shipment updates.
* Delivery updates.
* Return updates.
* Refund updates.
* Notification events.
* Inventory changes affecting customer-visible state.

Real-time events must not blindly overwrite newer server state.

When event ordering cannot be guaranteed, use authoritative refetch behavior.

Events must be treated as hints or state transitions according to the actual backend contract.

## APP LIFECYCLE

Handle:

* Cold launch.
* Warm launch.
* Background.
* Foreground.
* Suspended state.
* Termination.
* Reopening through a notification.
* Reopening through a deep link.
* Network changes during lifecycle transitions.

Refresh only what is necessary.

Avoid expensive full-application synchronization every time the app becomes active.

Preserve safe user context without persisting sensitive data unnecessarily.

## CACHE LIFECYCLE

Define consistent cache behavior for:

* Authentication changes.
* Logout.
* Account switching.
* Backgrounding.
* Foregrounding.
* Network recovery.
* Mutation success.
* Mutation failure.
* Product changes.
* Order changes.

Prevent stale protected data from remaining available after logout.

Prevent unbounded cache growth.

Avoid invalidating the entire application cache when a targeted invalidation is sufficient.

## DEVICE AND SESSION MANAGEMENT

Where backend support exists, implement customer device/session management.

Support:

* Active session/device listing.
* Session identification.
* Device metadata appropriate for customer display.
* Session revocation.
* Current-session identification.
* Revocation confirmation.
* Authentication refresh after revocation.

Do not expose sensitive device identifiers unnecessarily.

Never allow one customer to inspect or revoke another customer's sessions.

## ACCOUNT PRIVACY

Implement customer-facing privacy controls supported by the backend.

Potential capabilities include:

* Privacy settings.
* Analytics preferences.
* Marketing preferences.
* Notification preferences.
* Personalization controls.
* Data export request.
* Account deletion request.
* Consent management.

The mobile client must clearly distinguish:

* Local preference changes.
* Server-confirmed preference changes.
* Pending operations.
* Failed operations.

## DATA EXPORT

Where supported, implement a customer data-export workflow.

Support:

* Request creation.
* Request status.
* Processing state.
* Completion state.
* Secure download where applicable.
* Expiration handling.
* Error handling.

Never expose export files to unauthorized users.

Use signed, time-limited downloads when supported.

Do not cache private export files indefinitely on the device.

## ACCOUNT DELETION

Where supported, implement account deletion initiation.

Support:

* Eligibility checks.
* Confirmation.
* Required verification.
* Explanation of consequences.
* Request submission.
* Pending deletion state.
* Session termination where required.

Do not imply immediate deletion when the backend performs asynchronous deletion.

Do not retain protected customer data locally after the account has been successfully deleted.

## CONSENT-AWARE ANALYTICS

Integrate analytics with the repository's privacy and consent model.

Respect:

* Analytics opt-out.
* Marketing opt-out.
* Personalization preferences.
* Regional privacy requirements supported by the platform.

Do not initialize optional analytics services before the required consent state is known when the platform's privacy architecture requires consent.

Do not send sensitive customer data.

## SECURITY HARDENING

Review the mobile application for:

* Insecure storage.
* Excessive persistence.
* Token exposure.
* Logging leakage.
* Deep-link authorization bypass.
* Insecure redirects.
* Unsafe WebViews.
* Untrusted URL handling.
* Sensitive clipboard operations.
* Notification data leakage.
* Improper session cleanup.
* Debug configuration leaking into production.
* Insecure development endpoints.
* Weak certificate/network configuration where applicable.
* Excessive device permissions.

Apply the smallest secure production-grade solution appropriate to the repository and target platforms.

## URL AND DEEP-LINK SECURITY

Treat all incoming URLs as untrusted input.

Validate:

* Scheme.
* Host.
* Path.
* Parameters.
* Authentication requirements.
* Resource ownership.
* Supported destinations.

Never execute arbitrary URL actions based solely on a deep-link parameter.

Do not allow deep links to bypass authorization.

External URLs must use safe handling appropriate to the platform.

## WEBVIEW SECURITY

If WebViews are used:

* Minimize their use.
* Restrict navigation.
* Restrict origins.
* Prevent arbitrary JavaScript injection.
* Validate external destinations.
* Avoid exposing native capabilities unnecessarily.
* Do not place secrets into WebView URLs.
* Do not store sensitive credentials in WebView storage unless explicitly required by a trusted provider architecture.

## LOCAL DATA SECURITY

Review all locally persisted data.

Classify data as:

* Public.
* Non-sensitive.
* Customer-private.
* Authentication-sensitive.
* Financially sensitive.

Use appropriate storage mechanisms.

Securely remove sensitive data during:

* Logout.
* Account switching.
* Session revocation.
* Account deletion.
* Authentication failure.

Do not use ordinary persisted state for secrets when secure storage is available.

## ACCESSIBILITY HARDENING

Review the complete mobile application for accessibility consistency.

Ensure:

* Interactive elements have accessible labels.
* Images have appropriate accessibility behavior.
* Decorative images are excluded from accessibility where appropriate.
* Forms expose labels and errors.
* Loading states are communicated.
* Dynamic content changes are announced appropriately.
* Touch targets are sufficiently large.
* Text scales appropriately.
* Navigation remains understandable with screen readers.
* Modals trap and restore focus appropriately.

Do not solve accessibility by simply adding generic labels without communicating meaningful context.

## INTERNATIONALIZATION-READY FOUNDATIONS

Prepare mobile architecture for internationalization without unnecessarily implementing unsupported translations.

Ensure:

* User-visible strings are centralized appropriately.
* Date formatting is locale-aware.
* Number formatting is locale-aware.
* Currency display uses backend-provided currency information.
* Text does not assume English word lengths.
* Layouts can accommodate longer translations.
* Right-to-left compatibility is not structurally blocked where practical.

Do not hardcode currency symbols when the backend provides currency metadata.

Do not use device locale as the authoritative transaction currency.

## DATE AND CURRENCY CONSISTENCY

Use consistent formatting utilities.

Respect:

* ISO timestamps from APIs.
* Time zones.
* Locale.
* Currency codes.
* Decimal precision.
* Server-provided financial values.

Never use floating-point arithmetic to calculate authoritative financial amounts.

The mobile client should primarily display backend-provided monetary values.

## PERFORMANCE HARDENING

Measure and optimize:

* Startup.
* Navigation.
* Product lists.
* Search.
* Image rendering.
* Notifications.
* Order lists.
* Review lists.
* Checkout.
* Account screens.
* Background/foreground transitions.

Avoid:

* Unnecessary renders.
* Unbounded lists.
* Excessive network requests.
* Large synchronous startup work.
* Memory-heavy image handling.
* Duplicate query subscriptions.
* Unnecessary global state.

Use profiling tools where available.

Do not introduce complex optimization mechanisms without a measurable benefit.

## ERROR BOUNDARIES

Implement appropriate application-level and feature-level error handling.

A failure in:

* Recommendations.
* Analytics.
* Notification synchronization.
* Optional personalization.

must not crash the entire application.

Critical transaction failures must present actionable recovery paths.

Capture unexpected errors through the existing error-reporting system without leaking sensitive information.

## RESILIENCE

Design the mobile application to tolerate:

* Backend outages.
* Partial API failures.
* Slow networks.
* Intermittent connectivity.
* Rate limiting.
* Expired authentication.
* Real-time disconnections.
* Push registration failures.
* Media failures.
* Stale cached data.

Use bounded retries with appropriate backoff.

Do not retry irreversible financial operations blindly.

## ANALYTICS RELIABILITY

Analytics failures must never block core customer functionality.

Analytics requests must:

* Fail gracefully.
* Avoid unbounded queues.
* Respect privacy settings.
* Avoid excessive battery/network consumption.
* Avoid leaking sensitive information.

Do not make checkout, authentication, or order workflows depend on successful analytics delivery.

## TESTING

Implement comprehensive tests for:

* Personalized storefront modules.
* Recommendation failure.
* Recently viewed state.
* Search history.
* Cache lifecycle.
* Logout cleanup.
* Device/session management.
* Privacy controls.
* Data export.
* Account deletion.
* Notification registration.
* Notification deduplication.
* Real-time reconnect.
* Real-time duplicate events.
* Deep-link security.
* URL validation.
* Media failures.
* Upload failures.
* Offline behavior.
* App lifecycle transitions.
* Accessibility.
* Internationalization-ready formatting.

## SECURITY TESTING

Test:

* Unauthorized deep links.
* Cross-account cached data.
* Logout cache leakage.
* Session revocation.
* Invalid tokens.
* Malicious URL parameters.
* Unsafe external URLs.
* WebView navigation.
* Sensitive logging.
* Notification privacy.
* Local-storage exposure.
* Account deletion cleanup.
* Data-export authorization.

## PERFORMANCE TESTING

Where tooling exists, validate:

* Startup performance.
* Large-list scrolling.
* Image-heavy screens.
* Search responsiveness.
* Notification list performance.
* Order-history performance.
* Memory usage.
* Navigation transitions.

Do not claim numerical performance improvements unless measured.

## DOCUMENTATION

Update documentation for:

* Mobile architecture.
* Personalization.
* Recommendations.
* Search history.
* Recently viewed data.
* Notifications.
* Real-time connections.
* Deep links.
* Privacy.
* Consent.
* Device/session management.
* Data export.
* Account deletion.
* Security.
* Performance.
* Testing.
* Troubleshooting.

Documentation must match the actual implementation.

## IMPLEMENTATION BOUNDARIES

This prompt covers advanced customer mobile capabilities and production hardening.

Do not redesign backend services.

Do not create unsupported APIs.

Do not implement seller/admin mobile portals.

Do not duplicate business logic that belongs to backend services.

Do not replace working infrastructure unnecessarily.

Do not modify unrelated web or backend functionality.

Make only the cross-platform changes necessary for correct mobile integration.

## ABSOLUTE IMPLEMENTATION RULES

Never:

* Generate pseudo-code.
* Add placeholders.
* Add TODO/FIXME comments.
* Leave stubs.
* Invent APIs.
* Invent backend behavior.
* Hardcode secrets.
* Persist sensitive data insecurely.
* Log tokens or credentials.
* Trust client-side authorization.
* Trust client-side financial calculations.
* Allow optional services to become critical application dependencies.
* Blindly retry irreversible operations.
* Disable security controls to make tests pass.
* Remove tests to conceal defects.
* Disable type checking or linting to hide errors.
* Say “implement similarly.”
* Say “remaining code omitted.”
* Say “left as an exercise.”
* Say “for brevity.”

Every implemented feature must be complete and integrated.

## REPOSITORY COMPATIBILITY

Preserve the repository's existing architecture and conventions.

Verify:

* Navigation.
* Authentication.
* API contracts.
* Query caching.
* State management.
* Secure storage.
* Notifications.
* Deep links.
* Analytics.
* Error reporting.
* Build configuration.
* Tests.

When an existing implementation is compatible, extend it instead of creating a parallel system.

If a defect directly blocks this scope, fix it with the smallest safe change and document it.

## VALIDATION AND COMPLETION

Before declaring completion:

1. Inspect every modified file.
2. Verify TypeScript.
3. Verify navigation.
4. Verify authentication.
5. Verify cache lifecycle.
6. Verify secure local storage.
7. Verify deep-link handling.
8. Verify notification lifecycle.
9. Verify real-time lifecycle.
10. Verify privacy controls.
11. Verify account deletion/export behavior.
12. Verify media behavior.
13. Verify accessibility.
14. Run unit/component tests.
15. Run linting.
16. Run type checking.
17. Run applicable mobile build/validation commands.
18. Verify no secrets are exposed.
19. Verify no placeholders remain.
20. Verify documentation.
21. Verify unrelated functionality was not unnecessarily modified.

If a validation command cannot execute because of an environmental limitation, report the exact limitation.

## IMPLEMENTATION REPORT

At completion, report:

* Personalized storefront functionality.
* Recommendation integration.
* Recently viewed/search functionality.
* Media improvements.
* Notification hardening.
* Real-time improvements.
* Deep-link improvements.
* Device/session functionality.
* Privacy controls.
* Data export/delete workflows.
* Analytics/consent changes.
* Security improvements.
* Accessibility improvements.
* Performance improvements.
* Files created.
* Files modified.
* Tests added or modified.
* Validation commands executed.
* Validation results.
* Genuine remaining blockers.

Do not report hypothetical functionality as implemented.

## FINAL DIRECTIVE

Inspect the repository first.

Implement the complete advanced customer mobile functionality and production hardening defined by this prompt.

Build real production-grade React Native and Expo functionality.

Maintain compatibility with existing backend contracts.

Protect customer privacy and security.

Ensure real-time, notification, cache, lifecycle, and deep-link behavior is resilient.

Validate the implementation rigorously.

Update documentation.

Do not stop at scaffolding.

Do not leave placeholders.

Do not invent unsupported behavior.

Complete the defined scope and provide an accurate implementation report.
