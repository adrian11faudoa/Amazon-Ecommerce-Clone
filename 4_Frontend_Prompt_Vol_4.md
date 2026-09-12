# AMAZON ECOMMERCE PLATFORM — FRONTEND VOLUME 4 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, UI/UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, QA Engineer, Reliability Engineer, and Technical Writer working together as a senior production engineering organization.

Your responsibility is to complete, harden, and productionize the web frontend of a large-scale global ecommerce marketplace.

Do not behave as a teacher or provide a tutorial. Inspect the repository, understand its actual implementation state, implement the required scope, integrate it with the existing application, validate it thoroughly, fix discovered problems, and leave the repository in a coherent production-ready state.

---

# PROJECT

Build and productionize the web platform for a global Amazon-style ecommerce marketplace supporting:

* Millions of customers.
* Thousands of sellers and seller users.
* Millions of products and variants.
* High-volume catalog browsing and search.
* Multi-seller carts and orders.
* Payments and refunds.
* Shipping and fulfillment.
* Returns.
* Reviews and moderation.
* Seller operations.
* Seller payouts.
* Disputes.
* Notifications.
* Administration.
* Analytics.
* Auditability.
* High availability and continuous deployment.

The web application contains multiple experiences:

* Public storefront.
* Authenticated customer application.
* Seller application.
* Administrative application.
* Moderation and operational interfaces.

The frontend must operate as one coherent application architecture while maintaining strict boundaries between public, customer, seller, and administrative capabilities.

Backend systems remain authoritative for all transactional, financial, authorization, and operational state.

---

# TECHNOLOGY DIRECTION

Use the repository's compatible implementation of:

* Next.js 15+
* React 19+
* TypeScript with strict type checking
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod
* date-fns
* Recharts
* Framer Motion
* REST/OpenAPI-compatible APIs
* WebSockets/SSE where justified
* Existing frontend testing tooling
* Existing observability tooling

Do not introduce competing frameworks without a concrete architectural requirement.

Do not replace working libraries merely for preference.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before implementation:

1. Inspect the entire web frontend.
2. Inspect public storefront routes.
3. Inspect customer account routes.
4. Inspect cart and checkout.
5. Inspect order and fulfillment interfaces.
6. Inspect seller interfaces.
7. Inspect administration interfaces.
8. Inspect authentication and session handling.
9. Inspect authorization presentation.
10. Inspect API clients and generated types.
11. Inspect TanStack Query configuration.
12. Inspect Zustand stores.
13. Inspect shared UI primitives.
14. Inspect forms and validation.
15. Inspect testing configuration.
16. Inspect telemetry and error handling.
17. Inspect build and deployment configuration relevant to the frontend.
18. Inspect environment-variable handling.
19. Inspect documentation.
20. Identify duplicated, inconsistent, insecure, or incomplete frontend patterns.

Reuse compatible implementations.

Do not create parallel systems merely because existing code could be reorganized.

---

# IMPLEMENTATION SCOPE

Complete the web frontend platform by implementing a comprehensive hardening and production-readiness layer covering:

1. Global frontend architecture consistency.
2. Navigation and route consistency.
3. Authentication/session hardening.
4. Authorization-aware UI architecture.
5. API-client hardening.
6. Query/cache consistency.
7. Error-boundary architecture.
8. Global loading and degraded-state behavior.
9. Offline/intermittent-network handling where appropriate.
10. Form and validation consistency.
11. Design-system consistency.
12. Accessibility hardening.
13. Responsive-layout hardening.
14. Performance optimization.
15. SEO hardening.
16. Security hardening.
17. Observability integration.
18. Analytics instrumentation.
19. Error reporting.
20. Real-time connection resilience.
21. File/media-upload resilience.
22. Data-table and large-data performance.
23. Client-state cleanup.
24. Browser persistence review.
25. Cross-route state consistency.
26. Cache invalidation hardening.
27. User feedback consistency.
28. Internationalization-ready foundations where appropriate.
29. Currency/date/number presentation consistency.
30. Production build hardening.
31. Testing expansion.
32. End-to-end critical-flow coverage.
33. Frontend documentation.
34. Developer-experience improvements.

This scope is about completing and hardening the web application, not creating another independent feature area.

---

# GLOBAL ARCHITECTURE HARDENING

Review the entire frontend for architectural inconsistencies.

Identify and correct:

* Duplicate API clients.
* Duplicate query providers.
* Conflicting authentication implementations.
* Conflicting state stores.
* Inconsistent route protection.
* Repeated error parsing.
* Repeated loading implementations.
* Inconsistent form conventions.
* Inconsistent API error handling.
* Inconsistent date formatting.
* Inconsistent currency formatting.
* Inconsistent responsive patterns.
* Unnecessary client components.
* Excessive prop drilling.
* Circular dependencies.
* Domain-boundary violations.
* Components with multiple unrelated responsibilities.

Do not perform broad rewrites without necessity.

Refactor only where the change materially improves maintainability, correctness, security, performance, or consistency.

---

# AUTHENTICATION AND SESSION HARDENING

Review all authenticated workflows.

Ensure:

* Session initialization is deterministic.
* Session expiration is handled consistently.
* Token/session renewal does not create infinite loops.
* Concurrent requests do not trigger uncontrolled duplicate refresh operations.
* Logout clears appropriate client state.
* Sensitive cached data is invalidated after logout.
* Protected routes behave correctly during session initialization.
* Unauthorized API responses are handled consistently.
* Redirect behavior does not create loops.
* Public routes remain accessible without authentication.
* Authenticated users are not accidentally redirected away from valid public pages.

Never expose authentication secrets through logs, browser-visible environment variables, or persistent storage unnecessarily.

---

# AUTHORIZATION PRESENTATION

Create consistent frontend authorization patterns.

Support:

* Permission-aware navigation.
* Permission-aware actions.
* Forbidden states.
* Role-specific dashboards.
* Role-specific menus.
* Resource-specific access where backend contracts provide it.

Client-side checks exist only for presentation and usability.

The backend remains authoritative.

Do not hide security vulnerabilities behind UI restrictions.

A user manipulating the browser must not gain additional privileges.

---

# API CLIENT HARDENING

Review and harden the API layer.

Ensure:

* Requests use consistent configuration.
* Abort signals are supported.
* Timeouts are handled appropriately.
* Errors have a consistent representation.
* Validation errors can be consumed by forms.
* Authentication failures are handled consistently.
* Rate-limit responses are recognized.
* Retry behavior is intentional.
* Retry behavior does not repeat unsafe financial mutations.
* Request identifiers are preserved when useful.
* API responses are not unnecessarily transformed.
* Sensitive headers are never logged.
* Backend errors do not leak implementation details to customers.

Ensure GET/query operations and mutation operations have appropriately different retry policies.

---

# QUERY AND CACHE HARDENING

Review TanStack Query usage across the entire application.

Establish consistent conventions for:

* Query keys.
* Mutation keys where useful.
* Stale times.
* Garbage collection.
* Retry policies.
* Query invalidation.
* Dependent queries.
* Prefetching.
* Optimistic updates.
* Cancellation.
* Error recovery.

Pay particular attention to:

* Cart.
* Checkout.
* Inventory.
* Orders.
* Payment state.
* Seller operations.
* Administrative actions.

Never allow stale cached financial or authorization state to create misleading UI.

Invalidate sensitive customer state after:

* Logout.
* Account changes.
* Permission changes.
* Order mutations.
* Cart mutations.
* Checkout completion.

---

# CLIENT STATE REVIEW

Review all Zustand stores and other client-side state.

For every store, determine whether the state is:

* Server-owned.
* Client-owned.
* Derived.
* Temporary.
* Persisted.

Move server-owned state toward TanStack Query where appropriate.

Remove duplicated state that can become inconsistent.

Do not persist sensitive information unnecessarily.

Review browser storage for:

* Tokens.
* User information.
* Cart data.
* Checkout state.
* Preferences.
* Temporary UI state.

Remove unsafe persistence patterns.

---

# ERROR BOUNDARIES

Implement a coherent error-boundary strategy.

Provide appropriate boundaries for:

* Global application errors.
* Route-level failures.
* Customer storefront.
* Account.
* Checkout.
* Seller application.
* Administration.

Error pages must:

* Be accessible.
* Avoid exposing implementation details.
* Provide recovery actions.
* Preserve useful navigation.
* Report diagnostics through secure telemetry.
* Avoid infinite retry loops.

Distinguish recoverable errors from unrecoverable rendering failures.

---

# LOADING AND SUSPENSE ARCHITECTURE

Review loading behavior across the application.

Establish consistent patterns for:

* Route loading.
* Data loading.
* Mutation loading.
* Background refresh.
* Streaming.
* Skeletons.
* Progress indicators.

Avoid:

* Blank screens.
* Layout jumps.
* Global spinners blocking unrelated UI.
* Duplicate loading indicators.
* Misleading progress.

Use Next.js and React rendering capabilities appropriately.

---

# DEGRADED AND NETWORK FAILURE HANDLING

Improve behavior during:

* Slow connections.
* Temporary backend outages.
* Connection drops.
* API timeouts.
* Rate limiting.
* Real-time disconnections.

Where appropriate:

* Preserve safe user input.
* Provide retry controls.
* Explain temporary failures.
* Revalidate stale data.
* Avoid destructive automatic retries.
* Fall back from real-time to polling/request refresh.

Do not create false offline guarantees.

---

# REAL-TIME RESILIENCE

Harden WebSocket/SSE integrations.

Implement:

* Connection lifecycle.
* Authentication.
* Authorization.
* Reconnection.
* Exponential backoff.
* Connection-state presentation where useful.
* Duplicate-event protection.
* Cache invalidation.
* Event version handling where supported.
* Graceful fallback.

Real-time connections must not become a single point of failure for customer workflows.

The application must remain usable if real-time services are unavailable.

---

# FILE AND MEDIA UPLOAD HARDENING

Review all upload workflows.

Ensure:

* Uploads use secure backend-authorized mechanisms.
* Signed URLs are handled correctly.
* Expired upload URLs recover safely.
* Progress is shown.
* Cancellation is supported where appropriate.
* Failed uploads can be retried.
* Processing states are represented.
* Rejected files are clearly communicated.
* Browser-side validation improves UX without replacing backend validation.
* Object-storage credentials are never exposed.

Review uploads for:

* Product media.
* Seller documents where applicable.
* Review attachments where supported.
* Dispute evidence.
* Other marketplace media.

Do not expose private files through predictable public URLs.

---

# DESIGN SYSTEM CONSISTENCY

Audit the application for visual and interaction inconsistencies.

Standardize where appropriate:

* Typography.
* Buttons.
* Inputs.
* Forms.
* Dialogs.
* Toasts.
* Alerts.
* Tables.
* Cards.
* Badges.
* Tabs.
* Dropdowns.
* Pagination.
* Skeletons.
* Error states.
* Empty states.
* Confirmation dialogs.

Do not redesign the product unnecessarily.

Prioritize consistency, accessibility, and usability.

---

# INTERNATIONALIZATION-READY FOUNDATIONS

Prepare the frontend for global marketplace operation where practical.

Ensure the architecture does not assume:

* One language.
* One currency.
* One date format.
* One number format.
* One address format.
* One timezone.

Use locale-aware formatting mechanisms.

Centralize:

* Currency formatting.
* Number formatting.
* Date formatting.
* Relative-time formatting.

Do not hardcode currency symbols into generic components.

Do not assume all addresses share one structure.

If full localization is not yet implemented, establish clean extension points without creating incomplete fake translations.

---

# CURRENCY AND FINANCIAL DISPLAY

Standardize financial presentation.

Ensure:

* Currency is explicit.
* Decimal precision follows backend values and currency rules.
* Negative amounts are displayed consistently.
* Refunds are distinguishable from charges.
* Discounts are clearly represented.
* Historical order values use historical backend snapshots.
* Seller settlement values use backend-authoritative values.

Do not perform authoritative financial calculations in UI components.

Avoid JavaScript floating-point calculations for financial presentation logic when exact arithmetic is required.

---

# DATE AND TIME HANDLING

Standardize date/time presentation using date-fns or the repository's established compatible utilities.

Handle:

* Time zones.
* User-local presentation.
* Backend timestamps.
* Order dates.
* Delivery estimates.
* Promotion windows.
* Seller reporting periods.
* Audit logs.

Do not silently reinterpret timestamps.

Clearly distinguish dates from date-times.

---

# SEO HARDENING

Review public storefront SEO.

Ensure:

* Metadata is generated consistently.
* Canonical URLs are correct.
* Public product pages are indexable when intended.
* Private account pages are not indexed.
* Seller/admin pages are not publicly indexable.
* Duplicate query/filter URLs are handled appropriately.
* Product structured data uses authoritative values.
* Missing/invalid products generate appropriate metadata behavior.

Avoid exposing private information through metadata.

---

# ACCESSIBILITY AUDIT

Perform a comprehensive accessibility review.

Check:

* Keyboard navigation.
* Focus visibility.
* Focus restoration.
* Dialog focus trapping.
* Heading hierarchy.
* Labels.
* Error messages.
* Status announcements.
* ARIA usage.
* Form semantics.
* Table semantics.
* Color contrast.
* Touch targets.
* Reduced motion.
* Screen-reader compatibility.

Fix accessibility defects discovered during implementation.

Do not simply document known violations without fixing them when practical.

---

# PERFORMANCE AUDIT

Perform a production-oriented frontend performance review.

Inspect:

* Bundle size.
* Client component usage.
* Hydration cost.
* Render frequency.
* Large dependency imports.
* Image behavior.
* Font loading.
* Data prefetching.
* Query waterfalls.
* Expensive charts.
* Large tables.
* Unnecessary serialization.
* Excessive browser storage.
* Repeated API requests.

Optimize high-impact problems.

Avoid unnecessary micro-optimizations.

---

# CORE WEB VITALS

Where measurable in the repository's tooling, improve:

* Largest Contentful Paint.
* Interaction to Next Paint.
* Cumulative Layout Shift.

Pay particular attention to:

* Product images.
* Fonts.
* Header/search rendering.
* Product listing.
* Product detail.
* Checkout.
* Large tables.
* Client hydration.

Do not sacrifice accessibility or correctness merely to optimize a metric.

---

# FRONTEND SECURITY HARDENING

Perform a systematic frontend security review.

Check for:

* XSS.
* Unsafe HTML.
* Unsafe URL handling.
* Open redirects.
* Token leakage.
* Sensitive browser storage.
* Insecure postMessage handling where present.
* Third-party script exposure.
* Dependency risks.
* Client-side authorization assumptions.
* Sensitive error leakage.
* Untrusted content rendering.
* Upload vulnerabilities.
* Query-parameter injection.

Use secure defaults.

Remove insecure patterns discovered during implementation.

---

# OBSERVABILITY AND ERROR REPORTING

Establish consistent frontend observability.

Capture appropriate:

* Runtime exceptions.
* Route errors.
* API failures.
* Critical mutation failures.
* Checkout failures.
* Payment failures.
* Authentication failures.
* Real-time connection failures.
* Upload failures.

Include useful diagnostic context such as:

* Route.
* Operation.
* Request/correlation identifier.
* Safe user/session context where appropriate.
* Application version.

Never collect secrets or unnecessary sensitive information.

---

# ANALYTICS INSTRUMENTATION

Implement consistent business-event instrumentation where the repository supports analytics.

Potential events include:

* Product viewed.
* Search performed.
* Filter applied.
* Add to cart.
* Checkout started.
* Payment attempted.
* Order completed.
* Return initiated.
* Review submitted.
* Seller product updated.
* Seller order processed.

Ensure events:

* Have stable names.
* Have versionable payloads.
* Avoid sensitive information.
* Avoid duplicate emission.
* Do not block user interactions.
* Fail gracefully if analytics services are unavailable.

Do not allow analytics failures to break core application functionality.

---

# TESTING STRATEGY

Expand frontend testing into a production-grade validation system.

Implement or improve:

* Unit tests.
* Component tests.
* Integration tests.
* API-client tests.
* Query/cache tests.
* Authentication tests.
* Accessibility tests.
* Security-focused tests.
* End-to-end tests.
* Critical-path regression tests.

Critical end-to-end flows should include, where supported:

* Browse.
* Search.
* Product detail.
* Add to cart.
* Checkout.
* Payment.
* Order confirmation.
* Order tracking.
* Return.
* Customer account.
* Seller product management.
* Seller order management.
* Administrative moderation.

Test both success and failure paths.

---

# CROSS-BROWSER AND RESPONSIVE VALIDATION

Validate important workflows across supported browser targets.

Pay particular attention to:

* Chromium-based browsers.
* Firefox where supported.
* Safari/WebKit where supported.
* Mobile browser behavior.

Validate:

* Navigation.
* Forms.
* Dialogs.
* Checkout.
* Payment flows.
* Uploads.
* Tables.
* Responsive layouts.

Do not introduce browser-specific behavior without a clear reason.

---

# PRODUCTION BUILD HARDENING

Ensure the frontend production build is robust.

Validate:

* TypeScript.
* Linting.
* Build.
* Route generation.
* Environment configuration.
* Server/client boundaries.
* Dynamic routes.
* Static assets.
* Image handling.
* Error pages.
* Metadata.
* Security headers/configuration where owned by the frontend application.

Remove development-only behavior from production paths.

Ensure environment variables are correctly classified between server-only and browser-exposed configuration.

---

# DEVELOPER EXPERIENCE

Improve frontend development consistency where useful.

Provide:

* Clear scripts.
* Predictable folder conventions.
* Reusable testing utilities.
* Shared mocks/fixtures where appropriate.
* Consistent linting.
* Consistent formatting.
* Type-safe API helpers.
* Clear documentation.

Do not add unnecessary tooling.

Avoid configuration duplication.

---

# DOCUMENTATION

Update frontend documentation to describe:

* Application architecture.
* Route boundaries.
* Server/client component strategy.
* API architecture.
* Authentication.
* Authorization presentation.
* State management.
* Query/cache conventions.
* Error boundaries.
* Upload architecture.
* Real-time architecture.
* Accessibility standards.
* Performance standards.
* Testing strategy.
* Observability.
* Analytics.
* Environment configuration.
* Production build process.

Document actual implementation.

---

# IMPLEMENTATION BOUNDARIES

Do not redesign backend domains.

Do not redesign database schemas.

Do not move business authority into the browser.

Do not create client-side payment authority.

Do not create client-side authorization authority.

Do not replace existing compatible architecture without justification.

Do not add unrelated product features.

Do not introduce fake services.

Do not hide unresolved production defects merely to make validation pass.

---

# ABSOLUTE IMPLEMENTATION RULES

The implementation must contain:

* No pseudo-code.
* No placeholders.
* No TODO comments.
* No FIXME comments.
* No fake APIs.
* No fake production data.
* No hardcoded secrets.
* No credentials in source control.
* No incomplete implementations.
* No intentionally broken routes.
* No knowingly broken TypeScript.
* No knowingly broken production build.
* No insecure authentication storage.
* No client-only authorization assumptions.
* No sensitive telemetry.
* No “implement similarly.”
* No “remaining code omitted.”
* No “left as an exercise.”
* No “for brevity.”

Every changed area must be production-quality.

Every critical user workflow must have deliberate loading, error, recovery, and success behavior.

---

# REPOSITORY COMPATIBILITY

Integrate all hardening work into the existing frontend.

Preserve compatible:

* Route structure.
* API contracts.
* Authentication.
* Query architecture.
* State architecture.
* UI system.
* Testing.
* Observability.
* Deployment configuration.

Do not create parallel implementations of existing capabilities.

When refactoring, preserve external behavior unless the existing behavior is incorrect or insecure.

Maintain backward compatibility with valid API contracts.

---

# VALIDATION AND COMPLETION

Before completion:

* Run formatting.
* Run linting.
* Run TypeScript checks.
* Run unit tests.
* Run integration tests.
* Run accessibility tests where available.
* Run security-focused frontend tests where available.
* Run end-to-end tests.
* Run production build.
* Validate authentication.
* Validate authorization presentation.
* Validate API error handling.
* Validate cache behavior.
* Validate logout state cleanup.
* Validate critical customer flows.
* Validate seller workflows.
* Validate administrative workflows.
* Validate upload behavior.
* Validate real-time recovery.
* Validate responsive layouts.
* Validate accessibility.
* Validate production environment configuration.
* Check for leaked secrets.
* Check for incomplete implementation markers.
* Check for duplicated architecture.
* Verify documentation.

Fix discovered issues before declaring completion.

Do not claim validation passed unless the corresponding checks were actually performed.

---

# IMPLEMENTATION REPORT

After implementation, provide:

1. Frontend architecture improvements.
2. Authentication/session hardening.
3. API/query/cache improvements.
4. Security improvements.
5. Accessibility improvements.
6. Performance improvements.
7. Error-handling improvements.
8. Real-time/upload resilience improvements.
9. Analytics and observability improvements.
10. Testing improvements.
11. Production-build improvements.
12. Files created.
13. Files modified.
14. Validation commands executed.
15. Tests executed and their results.
16. Genuine remaining repository constraints.

Report only actual implementation results.

---

# FINAL DIRECTIVE

Inspect the repository first.

Then complete and harden the entire web frontend into a production-grade marketplace application.

Ensure the public storefront, customer experience, seller portal, and administrative interfaces operate as one coherent architecture while maintaining strict security and domain boundaries.

Prioritize correctness, maintainability, scalability, accessibility, security, performance, reliability, observability, and testability.

Do not stop at recommendations or analysis.

Implement the actual code, integrate it with the repository, validate it thoroughly, fix discovered issues, update documentation, and leave the frontend in a production-ready state.
