# AMAZON ECOMMERCE PLATFORM — MOBILE VOLUME 4 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Mobile Architect, Staff React Native Engineer, Security Engineer, Performance Engineer, Reliability Engineer, QA Engineer, UI/UX Engineer, DevOps Engineer, and Technical Writer working together as a senior production engineering organization.

Implement the final mobile production-hardening scope for the Amazon-style ecommerce marketplace described in this prompt.

Do not act as a teacher or provide a tutorial. Inspect the repository first, understand the actual mobile implementation state, and implement the required production hardening directly.

Prioritize correctness, maintainability, scalability, security, reliability, accessibility, performance, observability, testability, and production readiness over brevity.

## PROJECT

Build and productionize a global customer-facing ecommerce mobile application comparable in breadth and complexity to Amazon Marketplace.

The mobile application must operate as a secure, reliable, high-performance client for:

* Millions of customers.
* Large product catalogs.
* Thousands of sellers.
* Multi-seller commerce.
* Search and discovery.
* Cart and checkout.
* Payments.
* Orders.
* Fulfillment.
* Returns and refunds.
* Reviews.
* Notifications.
* Customer accounts.
* Personalized experiences.
* Privacy workflows.

The mobile application must be suitable for production release and long-term maintenance.

## PRIMARY USERS

The primary users are customers using supported iOS and Android devices.

The final mobile platform must provide:

* Secure authentication.
* Reliable customer shopping.
* Account management.
* Product discovery.
* Search.
* Cart.
* Checkout.
* Orders.
* Shipment tracking.
* Returns.
* Reviews.
* Notifications.
* Privacy controls.
* Resilient network behavior.
* Accessible interfaces.

## TECHNOLOGY DIRECTION

Use the repository's existing compatible mobile technology:

* React Native.
* Expo.
* TypeScript.
* React Navigation or equivalent.
* TanStack Query.
* Zustand.
* React Hook Form.
* Zod.
* Secure platform storage.
* Existing API clients.
* Existing authentication infrastructure.
* Existing observability.
* Existing analytics.
* Existing notification/deep-link infrastructure.

Do not replace working technologies merely for stylistic reasons.

Do not introduce unnecessary dependencies.

## SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before modifying anything:

1. Inspect the mobile repository.
2. Inspect all mobile packages and applications.
3. Inspect package manifests and lockfiles.
4. Inspect Expo configuration.
5. Inspect TypeScript configuration.
6. Inspect navigation.
7. Inspect authentication.
8. Inspect API clients.
9. Inspect TanStack Query configuration.
10. Inspect Zustand stores.
11. Inspect secure storage.
12. Inspect notifications.
13. Inspect deep linking.
14. Inspect analytics.
15. Inspect error reporting.
16. Inspect environment configuration.
17. Inspect tests.
18. Inspect build configuration.
19. Inspect CI/CD configuration affecting mobile.
20. Inspect mobile documentation.

Reuse existing compatible implementations.

Do not create duplicate infrastructure.

## IMPLEMENTATION SCOPE

Perform comprehensive mobile production hardening across:

* Application architecture.
* Navigation.
* Authentication.
* Authorization-aware UI.
* API communication.
* Query/cache behavior.
* Client state.
* Forms.
* Error handling.
* Offline behavior.
* Real-time connections.
* Push notifications.
* Deep links.
* Secure storage.
* Privacy.
* Accessibility.
* Internationalization readiness.
* Localization infrastructure.
* Performance.
* Memory management.
* Battery efficiency.
* Analytics.
* Observability.
* Security.
* Testing.
* Build configuration.
* Release configuration.
* Developer experience.
* Documentation.
* Operational readiness.

## ARCHITECTURE CONSISTENCY

Review the entire mobile application for architectural consistency.

Ensure:

* Screens do not contain unnecessary business logic.
* API calls are centralized.
* Query state is handled consistently.
* Client state has clear ownership.
* Forms use consistent validation.
* Navigation follows consistent patterns.
* Shared components are actually reusable.
* Feature modules have clear boundaries.
* Utilities are not duplicated.
* Platform-specific code has explicit boundaries.
* Error handling follows consistent contracts.

Refactor duplicated or contradictory implementations where necessary.

Do not perform large-scale refactoring without a concrete correctness or maintainability benefit.

## NAVIGATION HARDENING

Review all navigation paths.

Verify:

* Public routes.
* Authentication routes.
* Protected routes.
* Modal routes.
* Deep links.
* Push notification destinations.
* Back navigation.
* Android back handling.
* Logout transitions.
* Session expiration transitions.
* Account deletion transitions.

Prevent:

* Unauthorized protected routes.
* Navigation loops.
* Duplicate screens.
* Broken back stacks.
* Invalid deep-link destinations.
* Navigation after unmounted screens.
* Race conditions during authentication changes.

Ensure navigation remains predictable after app restart.

## AUTHENTICATION HARDENING

Review authentication end-to-end.

Verify:

* Secure token storage.
* Session restoration.
* Access-token expiration.
* Refresh-token rotation where supported.
* Concurrent refresh handling.
* Logout.
* Session revocation.
* Account deletion.
* Account switching if supported.
* Unauthorized API responses.
* Protected cache cleanup.

Ensure only one authoritative authentication state exists.

Prevent stale customer data from surviving account changes.

Do not expose authentication material through logs, analytics, crash reports, URLs, or ordinary persistent storage.

## API CLIENT HARDENING

Review the complete API communication layer.

Ensure:

* Requests have appropriate timeouts.
* Cancellation is supported where appropriate.
* Errors are normalized.
* Authentication headers are applied consistently.
* Token refresh is coordinated.
* Retries are bounded.
* Mutations are not blindly retried.
* Network failures are distinguishable from server failures.
* Rate limiting is handled appropriately.
* Correlation IDs are preserved where supported.
* Response validation exists where appropriate for high-risk boundaries.

Do not hide API contract failures.

## QUERY AND CACHE HARDENING

Review TanStack Query configuration.

Ensure:

* Query keys are deterministic.
* Sensitive data is cleared on logout.
* Account changes invalidate protected data.
* Mutations invalidate affected queries.
* Retry policies distinguish safe reads from dangerous mutations.
* Cache sizes remain bounded.
* Stale times are intentional.
* Refetch-on-focus behavior is appropriate for mobile.
* Offline behavior is deliberate.
* Background refetching does not waste resources.

Avoid globally aggressive refetching.

## CLIENT STATE HARDENING

Review Zustand usage.

Remove unnecessary server-state duplication.

Ensure stores:

* Have explicit ownership.
* Avoid sensitive persistence.
* Have predictable initialization.
* Reset correctly on logout.
* Do not become hidden business-logic repositories.
* Do not create circular dependencies.

Prevent stale state from previous accounts from appearing after authentication changes.

## FORM AND VALIDATION CONSISTENCY

Review all customer-facing forms.

Ensure:

* React Hook Form usage is consistent.
* Zod validation is appropriate.
* Server validation errors map correctly.
* Errors are accessible.
* Submission state is deterministic.
* Duplicate submissions are prevented.
* Keyboard behavior is correct.
* Form state is not accidentally persisted.

Financial and identity-sensitive forms require especially careful handling.

## GLOBAL ERROR HANDLING

Implement consistent application-level error handling.

Support:

* Recoverable errors.
* Unrecoverable errors.
* Network errors.
* Authentication errors.
* Rate limits.
* Backend failures.
* Unexpected exceptions.

Provide:

* Safe user-facing messaging.
* Recovery actions.
* Retry behavior where appropriate.
* Error telemetry.
* Graceful degradation.

Do not display raw backend exceptions.

Do not let optional functionality crash the application.

## ERROR BOUNDARIES

Ensure feature-level failures do not unnecessarily crash the entire application.

Critical boundaries should exist around appropriate high-risk or independently failing areas such as:

* Recommendations.
* Search.
* Product media.
* Notifications.
* Analytics.
* Optional personalization.

Unexpected errors must be reported through the existing telemetry system without sensitive data leakage.

## OFFLINE AND DEGRADED NETWORK HARDENING

Review network behavior across the entire application.

Ensure:

* Cached read-only content can remain useful where appropriate.
* Offline state is visible when necessary.
* Mutations do not falsely appear successful.
* Financial operations are never blindly replayed.
* Pending operations have clear semantics.
* Network recovery does not generate request storms.
* Retry behavior uses bounded backoff.
* Query refetching is controlled.

Do not implement a fake offline mode that provides false transactional guarantees.

## REAL-TIME HARDENING

Review WebSocket/SSE or equivalent real-time infrastructure.

Ensure:

* Authentication is required.
* Authorization is enforced server-side.
* Connections are lifecycle-aware.
* Background connections are minimized.
* Reconnection is bounded.
* Exponential backoff and jitter are used where appropriate.
* Duplicate subscriptions are prevented.
* Duplicate events are handled.
* Stale events do not overwrite newer state.
* Connection errors do not crash the application.

When state becomes uncertain, perform an authoritative server refresh.

## PUSH NOTIFICATION HARDENING

Review push-notification implementation.

Ensure:

* Permission handling is correct.
* Device tokens are registered securely.
* Token refresh is handled.
* Logout deregistration is handled where required.
* Notification payloads are validated.
* Deep links are validated.
* Sensitive information is not unnecessarily exposed in notifications.
* Duplicate notification handling is safe.
* Invalid tokens do not cause repeated failed registration loops.

Do not treat push notifications as authoritative business state.

## DEEP-LINK HARDENING

Review every supported deep link.

Validate:

* Scheme.
* Domain.
* Path.
* Resource identifiers.
* Query parameters.
* Authentication requirements.
* Ownership.

Protect against:

* Open redirects.
* Unauthorized resource access.
* Malformed identifiers.
* Unsupported routes.
* Arbitrary URL execution.

Deep links must never bypass backend authorization.

## SECURE STORAGE REVIEW

Audit every persistent storage mechanism.

Classify stored data.

Move sensitive data into secure platform storage where appropriate.

Remove unnecessary persistence.

Verify cleanup during:

* Logout.
* Account switching.
* Session revocation.
* Account deletion.
* Authentication failure.

Do not store:

* Raw passwords.
* Payment credentials.
* Private API secrets.
* Backend credentials.
* Long-lived sensitive tokens in ordinary storage.

## SECURITY HARDENING

Perform a mobile security review covering:

* Authentication.
* Authorization.
* Local storage.
* Logging.
* Crash reporting.
* Analytics.
* Deep links.
* External URLs.
* WebViews.
* Push notifications.
* Media uploads.
* Network communication.
* Configuration.
* Debug behavior.
* Build artifacts.
* Dependency exposure.

Apply least privilege.

Remove unnecessary permissions.

Do not weaken production security for development convenience.

## DEPENDENCY SECURITY

Review mobile dependencies.

Identify:

* Unused dependencies.
* Duplicated dependencies.
* Known insecure configurations.
* Unnecessary native modules.
* Packages incompatible with the Expo/runtime version.
* Packages introducing excessive permissions.

Do not blindly upgrade every dependency.

Only perform upgrades that are compatible with the repository and materially improve correctness, security, or maintainability.

Ensure lockfiles remain consistent.

## PERMISSIONS

Audit requested device permissions.

Request permissions only when necessary.

Provide appropriate user context before requesting sensitive permissions.

Handle:

* Permission granted.
* Permission denied.
* Permission revoked.
* Restricted state.
* Re-request behavior.

Do not request unrelated device permissions.

## ACCESSIBILITY HARDENING

Perform a full accessibility review.

Verify:

* Screen-reader navigation.
* Labels.
* Roles.
* States.
* Focus.
* Dynamic content announcements.
* Error announcements.
* Touch targets.
* Dynamic text scaling.
* Contrast.
* Reduced motion.
* Keyboard behavior where applicable.

Critical customer workflows must remain usable without relying solely on visual interaction.

## RESPONSIVE AND DEVICE COMPATIBILITY

Validate across realistic mobile configurations.

Consider:

* Small phones.
* Large phones.
* Different aspect ratios.
* Safe-area variations.
* Notches.
* Dynamic islands/cutouts.
* Android navigation modes.
* Large accessibility text.
* Keyboard visibility.
* Landscape behavior where supported.

Do not rely on one device size.

## INTERNATIONALIZATION AND LOCALIZATION

Strengthen the localization-ready architecture.

Ensure user-visible strings can be translated.

Handle:

* Locale-aware dates.
* Locale-aware numbers.
* Currency codes.
* Pluralization-ready strings.
* Long translated text.
* Right-to-left layouts where practical.

Do not hardcode English strings into reusable infrastructure when the architecture supports localization.

Do not translate backend business values incorrectly.

## CURRENCY AND FINANCIAL DISPLAY

Audit financial displays.

Ensure:

* Currency code is respected.
* Decimal precision is respected.
* Backend totals are authoritative.
* Formatting is locale-aware.
* Negative values are represented correctly.
* Discounts are displayed consistently.
* Refunds are represented accurately.

Never use client floating-point calculations as the source of truth for financial transactions.

## PERFORMANCE HARDENING

Optimize the application based on actual implementation.

Review:

* Startup.
* Navigation.
* Lists.
* Images.
* Search.
* Checkout.
* Orders.
* Notifications.
* Memory.
* Re-renders.
* Network requests.
* Background processing.

Use appropriate profiling tools.

Fix measurable bottlenecks.

Do not introduce premature complexity.

## MEMORY MANAGEMENT

Audit:

* Image caches.
* Large query caches.
* Event listeners.
* Timers.
* Subscriptions.
* Navigation listeners.
* Real-time connections.
* Background tasks.

Ensure resources are released when screens or application contexts are no longer active.

Prevent retained references and memory leaks.

## BATTERY EFFICIENCY

Review mobile background behavior.

Avoid:

* Continuous polling.
* Unnecessary background network requests.
* Persistent real-time connections when not needed.
* High-frequency analytics.
* Repeated image downloads.
* Unnecessary device capability access.

Use lifecycle-aware synchronization.

## LIST AND MEDIA PERFORMANCE

Ensure large datasets use efficient rendering.

Audit:

* Product lists.
* Search results.
* Orders.
* Notifications.
* Reviews.
* Search history.

Use appropriate virtualization.

Optimize image dimensions and loading.

Avoid rendering large datasets synchronously.

## ANALYTICS HARDENING

Ensure analytics cannot block critical application functionality.

Analytics must:

* Respect consent.
* Fail gracefully.
* Avoid sensitive data.
* Avoid excessive network usage.
* Avoid unbounded event queues.
* Avoid blocking startup unnecessarily.

Verify event naming consistency.

Avoid duplicate events caused by navigation rerenders or lifecycle transitions.

## OBSERVABILITY HARDENING

Review:

* Error reporting.
* Performance telemetry.
* API failure telemetry.
* Authentication telemetry.
* Critical commerce telemetry.
* Crash reporting.

Ensure telemetry includes enough context to diagnose production failures while excluding:

* Passwords.
* Tokens.
* Payment credentials.
* Secrets.
* Unnecessary personal data.

Use correlation IDs where available.

## RELEASE CONFIGURATION

Review production mobile configuration.

Ensure:

* Development endpoints are not used in production.
* Debug flags are disabled appropriately.
* Production logging is safe.
* Secrets are not embedded.
* Environment configuration is explicit.
* App identifiers are correct.
* Build configuration is deterministic.
* Required native capabilities are declared correctly.

Do not fabricate production signing credentials.

Do not commit certificates or private signing keys.

## BUILD AND CI VALIDATION

Inspect existing mobile build and CI/CD configuration.

Verify:

* Dependency installation.
* Type checking.
* Linting.
* Tests.
* Expo configuration.
* Native configuration where applicable.
* Production build configuration.
* Environment handling.

If repository automation supports mobile builds, ensure the implementation remains compatible.

Do not disable CI validation merely to bypass failures.

## TESTING

Expand automated test coverage across the complete mobile application.

Include:

* Unit tests.
* Component tests.
* Hook tests.
* Store tests.
* Navigation tests.
* Authentication tests.
* API-client tests.
* Query/cache tests.
* Form tests.
* Accessibility tests.
* Error-state tests.
* Offline tests.
* Deep-link tests.
* Notification tests.
* Real-time tests.
* Critical commerce-flow tests.

## END-TO-END TESTING

Where E2E infrastructure exists, validate critical customer journeys:

1. Launch application.
2. Authenticate.
3. Browse products.
4. Search.
5. Open product.
6. Select variant.
7. Add to cart.
8. Open cart.
9. Start checkout.
10. Select address.
11. Select shipping.
12. Apply promotion where applicable.
13. Complete payment using test infrastructure.
14. Verify order confirmation.
15. View order.
16. View shipment.
17. Initiate return where supported.
18. View notification.
19. Logout.
20. Restore session.

Do not use real payment credentials.

## REGRESSION TESTING

Verify that production hardening does not regress:

* Authentication.
* Product discovery.
* Search.
* Cart.
* Checkout.
* Payment.
* Orders.
* Returns.
* Reviews.
* Notifications.
* Account management.

## ACCESSIBILITY TESTING

Test representative critical workflows using supported accessibility tooling.

Verify:

* Labels.
* Roles.
* Focus.
* Text scaling.
* Error messages.
* Dynamic updates.
* Navigation.

Fix actual accessibility defects rather than merely documenting them.

## SECURITY TESTING

Validate:

* Storage.
* Logging.
* Deep links.
* WebViews.
* Notifications.
* Authentication.
* Authorization assumptions.
* Session cleanup.
* Account switching.
* Account deletion.
* External URL handling.
* Dependency configuration.

No secrets should appear in source, logs, test output, or production configuration.

## PERFORMANCE VALIDATION

Where measurement tools are available, validate:

* Startup.
* Navigation.
* List scrolling.
* Memory.
* Image loading.
* Search responsiveness.
* Checkout responsiveness.

Report measured results only.

Do not fabricate benchmarks.

## DOCUMENTATION

Update documentation covering:

* Mobile architecture.
* Environment setup.
* Development workflow.
* Expo workflow.
* Authentication.
* Navigation.
* State management.
* API integration.
* Notifications.
* Deep links.
* Real-time behavior.
* Offline behavior.
* Security.
* Privacy.
* Testing.
* Build/release configuration.
* Troubleshooting.
* Observability.

Documentation must describe actual implementation.

## IMPLEMENTATION BOUNDARIES

This prompt covers comprehensive mobile hardening and productionization.

Do not redesign backend services.

Do not create unsupported APIs.

Do not implement unrelated seller/admin applications.

Do not replace working architecture without justification.

Do not make broad unrelated repository changes.

Make the minimum safe cross-platform changes required to achieve the defined production standard.

## ABSOLUTE IMPLEMENTATION RULES

Never:

* Generate pseudo-code.
* Add placeholders.
* Add TODO/FIXME comments.
* Leave stubs.
* Invent APIs.
* Invent backend behavior.
* Hardcode secrets.
* Commit signing credentials.
* Store payment credentials.
* Log sensitive authentication data.
* Disable security controls.
* Disable tests.
* Disable type checking.
* Remove failing tests simply to produce a passing result.
* Claim unmeasured performance improvements.
* Claim builds succeeded when they did not.
* Silently ignore production failures.
* Say “implement similarly.”
* Say “remaining code omitted.”
* Say “left as an exercise.”
* Say “for brevity.”

Every required implementation must be complete.

## REPOSITORY COMPATIBILITY

Preserve compatibility with the actual repository.

Before completion:

* Resolve implementation-introduced TypeScript errors.
* Resolve implementation-introduced lint failures.
* Resolve implementation-introduced test failures.
* Preserve API compatibility.
* Preserve navigation compatibility.
* Preserve authentication behavior.
* Preserve existing working customer flows.
* Preserve compatible native configuration.
* Preserve dependency consistency.

If an existing defect directly blocks this scope, make the smallest safe correction and document it.

## VALIDATION AND COMPLETION

Before declaring completion:

1. Inspect every modified file.
2. Verify TypeScript.
3. Verify linting.
4. Verify tests.
5. Verify navigation.
6. Verify authentication.
7. Verify API behavior.
8. Verify cache behavior.
9. Verify secure storage.
10. Verify notifications.
11. Verify deep links.
12. Verify real-time behavior.
13. Verify offline behavior.
14. Verify accessibility.
15. Verify privacy behavior.
16. Verify production configuration.
17. Verify dependency consistency.
18. Verify mobile build configuration.
19. Verify no secrets are exposed.
20. Verify no placeholders remain.
21. Verify documentation.
22. Verify unrelated functionality was not unnecessarily changed.

If a validation command cannot execute because of a genuine environment limitation, report the exact limitation.

## IMPLEMENTATION REPORT

At completion, report:

* Architecture hardening.
* Navigation hardening.
* Authentication hardening.
* API-client hardening.
* Query/cache hardening.
* State-management hardening.
* Error handling.
* Offline/network resilience.
* Real-time hardening.
* Push-notification hardening.
* Deep-link hardening.
* Secure-storage changes.
* Security improvements.
* Accessibility improvements.
* Internationalization/localization improvements.
* Performance improvements.
* Memory/battery improvements.
* Analytics/observability improvements.
* Release/build configuration changes.
* Dependency changes.
* Files created.
* Files modified.
* Tests added or updated.
* Validation commands executed.
* Validation results.
* Genuine remaining blockers.

Do not describe unverified or hypothetical work as completed.

## FINAL DIRECTIVE

Inspect the repository first.

Complete the mobile application's production hardening and release-readiness implementation defined by this prompt.

Ensure the entire customer mobile experience is secure, resilient, accessible, performant, observable, testable, and maintainable.

Preserve all existing compatible functionality.

Use real production-grade implementations.

Do not leave placeholders.

Do not invent unsupported behavior.

Do not hide validation failures.

Validate the application rigorously and document the actual implementation.

Complete the entire defined scope and provide an accurate implementation report.
