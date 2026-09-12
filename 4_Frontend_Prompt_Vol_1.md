# AMAZON ECOMMERCE PLATFORM — FRONTEND VOLUME 1 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, UI/UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, QA Engineer, and Technical Writer working together as a senior production engineering organization.

Your responsibility is to implement the frontend scope defined in this prompt as a complete, production-grade system inside the existing repository.

Do not behave as a teacher or provide a tutorial. Inspect the repository, understand its actual state, make the required implementation changes, integrate them with the existing project, validate the result, and leave the repository in a coherent production-ready state.

---

# PROJECT

Build the web frontend for a large-scale, global Amazon-style ecommerce marketplace supporting millions of customers, thousands of sellers, millions of products and variants, high-volume catalog browsing and search, carts, checkout, orders, seller operations, payments, fulfillment, reviews, notifications, administration, and other marketplace capabilities.

The web application must provide a polished customer-facing ecommerce experience while establishing the reusable frontend platform required for the broader marketplace.

The frontend must be designed for:

* Large product catalogs.
* High traffic.
* Responsive desktop, tablet, and mobile web experiences.
* Accessibility.
* Strong SEO where appropriate.
* Fast initial rendering.
* Efficient client-side data synchronization.
* Robust authentication/session handling.
* Clear loading, empty, error, and degraded states.
* Secure interaction with backend APIs.
* Maintainable feature/domain boundaries.
* Incremental expansion without architectural rewrites.

The frontend is not the system of record for business rules.

The backend remains authoritative for:

* Authentication.
* Authorization.
* Product/catalog truth.
* Inventory.
* Pricing.
* Promotions.
* Cart ownership.
* Checkout.
* Orders.
* Payments.
* Refunds.
* Shipping.
* Seller financial data.
* Reviews/moderation decisions.
* Notifications.
* Administrative permissions.
* Any other transactional business state.

The frontend must consume backend contracts rather than recreate authoritative business logic locally.

---

# TECHNOLOGY DIRECTION

Use the following frontend technology direction unless the repository already contains an established compatible implementation that should be preserved:

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
* Recharts where data visualization is required
* Framer Motion where animation materially improves the experience
* REST/OpenAPI-compatible backend integration
* WebSocket/SSE integration only where justified by backend capabilities
* Modern responsive CSS
* Automated frontend testing appropriate to the repository
* Accessible semantic HTML
* Production-grade error handling and observability integration

Use the repository's existing package versions and conventions when they are compatible with this technology direction.

Do not introduce unnecessary dependencies.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth for the implementation state.

Before changing anything:

1. Inspect the complete repository structure relevant to the web application.
2. Identify the existing Next.js application structure.
3. Inspect package configuration and scripts.
4. Inspect TypeScript configuration.
5. Inspect Tailwind configuration.
6. Inspect existing shadcn/ui components.
7. Inspect existing routing and layouts.
8. Inspect existing API clients and generated types.
9. Inspect authentication/session infrastructure.
10. Inspect existing TanStack Query configuration.
11. Inspect Zustand stores.
12. Inspect existing forms and validation.
13. Inspect existing tests.
14. Inspect environment-variable conventions without exposing secrets.
15. Inspect existing documentation.
16. Determine which functionality is already implemented and reusable.
17. Preserve compatible existing implementations instead of replacing them unnecessarily.

Do not assume that a clean repository means the architecture does not exist.

Do not assume that an existing implementation is correct merely because it exists.

Evaluate existing code before extending it.

---

# IMPLEMENTATION SCOPE

Implement the first major production-grade web frontend layer for the marketplace.

This scope includes:

1. Frontend application foundation.
2. Global application shell.
3. Routing architecture.
4. Shared UI/design system foundations.
5. API client foundation.
6. Authentication/session integration.
7. Customer-facing navigation.
8. Catalog browsing.
9. Category navigation.
10. Product listing pages.
11. Product detail pages.
12. Search UI foundations.
13. Filtering and sorting UI.
14. Product media presentation.
15. Product variant selection.
16. Cart foundation.
17. Shared forms and validation infrastructure.
18. Loading/error/empty states.
19. Responsive behavior.
20. Accessibility.
21. SEO foundations.
22. Client/server rendering boundaries.
23. Frontend state management.
24. Data fetching and caching.
25. Error handling.
26. Frontend testing foundations.
27. Performance foundations.
28. Security-conscious frontend behavior.
29. Documentation for the implemented frontend architecture.

Do not implement unrelated seller-admin, advanced checkout, payment management, fulfillment-management, or administrative interfaces unless they are already required by the repository's current architecture and are necessary to keep the implemented customer experience functional.

---

# FRONTEND APPLICATION ARCHITECTURE

Establish a clear and scalable frontend architecture.

Organize code around coherent responsibilities rather than creating a single monolithic component hierarchy.

Use appropriate boundaries for:

* Application shell.
* Route segments.
* Pages.
* Layouts.
* Feature modules.
* Domain-oriented UI.
* Shared components.
* API clients.
* Query definitions.
* Mutation definitions.
* Client-side state.
* Forms.
* Validation schemas.
* Types.
* Utilities.
* Hooks.
* Error handling.
* Accessibility primitives.
* Analytics/telemetry integration where appropriate.

Avoid excessive abstraction.

Do not create generic abstractions that make simple functionality harder to understand.

Create reusable components when they represent a stable visual or behavioral contract.

Ensure feature boundaries prevent unrelated functionality from becoming tightly coupled.

---

# APPLICATION SHELL AND ROUTING

Implement the application shell required for a production ecommerce experience.

Provide appropriate structures for:

* Global header.
* Marketplace branding area.
* Search interface.
* Account navigation.
* Cart navigation.
* Primary category/navigation access.
* Main content region.
* Footer.
* Responsive mobile navigation.
* Breadcrumbs where appropriate.
* Global notifications/toasts where appropriate.

Ensure layouts are composed correctly using Next.js routing conventions.

Use server components by default where they provide architectural or performance benefits.

Use client components only when interactivity, browser APIs, local state, event handlers, or client-side data synchronization require them.

Do not convert the entire application into client components unnecessarily.

Establish clear server/client boundaries.

Ensure route organization supports future expansion into:

* Account.
* Orders.
* Wishlist.
* Checkout.
* Seller areas.
* Administration.
* Notifications.
* Other marketplace domains.

Do not create fake pages merely to fill routes.

Every implemented route must have meaningful behavior.

---

# DESIGN SYSTEM AND SHARED UI

Establish a consistent production-grade design system using Tailwind CSS and shadcn/ui where appropriate.

Implement or improve reusable primitives for:

* Buttons.
* Inputs.
* Selects.
* Checkboxes.
* Radio controls.
* Dialogs.
* Dropdown menus.
* Tabs.
* Cards.
* Badges.
* Alerts.
* Tooltips.
* Breadcrumbs.
* Pagination controls where appropriate.
* Skeleton loaders.
* Spinners.
* Empty states.
* Error states.
* Toasts.
* Product cards.
* Price displays.
* Rating displays.
* Media galleries.
* Quantity controls.
* Form fields.

Maintain consistent:

* Typography.
* Spacing.
* Border treatment.
* Radius.
* Focus states.
* Hover states.
* Disabled states.
* Error states.
* Responsive behavior.

Do not introduce arbitrary one-off visual styles when an existing design-system primitive can be reused.

Ensure interactive elements have clear focus indicators.

---

# API CLIENT ARCHITECTURE

Implement a centralized and strongly typed frontend API integration layer.

The API layer must:

* Centralize HTTP configuration.
* Handle base URLs correctly.
* Support authentication/session credentials according to the repository architecture.
* Parse successful responses consistently.
* Normalize API errors into frontend-consumable structures.
* Preserve HTTP status information where useful.
* Support request cancellation.
* Support timeouts where appropriate.
* Avoid leaking sensitive information.
* Provide consistent handling of authentication failures.
* Avoid duplicating API logic throughout UI components.

If OpenAPI-generated types or clients already exist, use them when appropriate.

Do not manually duplicate backend contracts when reliable generated contracts are available.

Do not silently transform authoritative business data in ways that can create inconsistencies.

---

# AUTHENTICATION AND SESSION INTEGRATION

Implement secure frontend integration with the backend authentication system.

Support the repository's actual authentication mechanism, including the appropriate handling of:

* Authenticated sessions.
* Unauthenticated users.
* Session expiration.
* Access-token renewal where applicable.
* Authentication redirects.
* Protected routes.
* Public routes.
* Authentication loading states.
* Logout.
* Unauthorized responses.

Do not store sensitive authentication material insecurely merely for convenience.

Do not expose secrets to browser code.

Do not implement authentication authority exclusively in client-side state.

Frontend route guards must complement, never replace, backend authorization.

Ensure authentication failures do not create infinite refresh loops.

Handle concurrent requests during token/session refresh safely.

---

# TANSTACK QUERY DATA ARCHITECTURE

Establish a scalable TanStack Query architecture.

Define consistent conventions for:

* Query keys.
* Query functions.
* Mutations.
* Cache invalidation.
* Stale times.
* Garbage collection.
* Request cancellation.
* Retry behavior.
* Optimistic updates where safe.
* Error handling.
* Loading states.
* Refetching.
* Background synchronization.

Use server state through TanStack Query rather than duplicating server data into Zustand unnecessarily.

Do not create a global store containing the entire backend data model.

Ensure cache invalidation is based on actual resource relationships.

Avoid excessive refetching.

Avoid stale customer-visible information when the backend provides authoritative updates.

---

# ZUSTAND CLIENT STATE

Use Zustand only for genuinely client-owned state.

Appropriate examples include:

* UI preferences.
* Navigation state.
* Temporary interface state.
* Product-view preferences.
* Non-authoritative client interaction state.
* Persistable local preferences where appropriate.

Do not use Zustand as the authoritative source for:

* Inventory.
* Product prices.
* Orders.
* Payment status.
* Server-owned account state.
* Seller balances.
* Backend authorization.

If cart state is server-owned, synchronize it with the backend rather than treating a local cart as authoritative.

Keep persisted browser state minimal and secure.

---

# CUSTOMER STOREFRONT

Implement the customer-facing storefront foundation.

The storefront must support a polished experience for discovering and evaluating products.

Implement:

* Home/storefront composition where appropriate.
* Category navigation.
* Category landing pages.
* Product listing pages.
* Product cards.
* Product detail pages.
* Search interface.
* Search result presentation.
* Filters.
* Sorting.
* Pagination or cursor-based navigation according to backend contracts.
* Breadcrumbs.
* Product media.
* Product variants.
* Availability presentation.
* Pricing presentation.
* Ratings/reviews summary where available.
* Seller information where applicable.
* Add-to-cart interaction.

Do not fabricate backend data.

If a backend capability is unavailable, integrate against the repository's actual contract or provide a clearly defined integration boundary without creating fake production behavior.

---

# PRODUCT LISTING EXPERIENCE

Build reusable product listing infrastructure.

Product cards should support appropriate combinations of:

* Product image.
* Product title.
* Price.
* Previous price where supplied by the backend.
* Discount information where authoritative.
* Rating.
* Review count.
* Seller information where applicable.
* Availability.
* Badges supplied by backend/catalog configuration.
* Variant indicators where useful.
* Add-to-cart interaction where appropriate.

Implement responsive layouts for:

* Desktop.
* Tablet.
* Mobile.

Avoid layout shift caused by unpredictable media dimensions.

Use optimized image loading and responsive image sizing.

Ensure large result sets do not cause unnecessary rendering work.

---

# PRODUCT DETAIL EXPERIENCE

Implement a production-quality product detail foundation.

Support:

* Product title.
* Product media gallery.
* Primary image.
* Thumbnail navigation.
* Zoom behavior where appropriate.
* Product description.
* Pricing.
* Availability.
* Seller information.
* Ratings summary.
* Variant selection.
* Quantity selection.
* Add-to-cart.
* Breadcrumbs.
* Structured metadata where appropriate.
* Loading states.
* Error states.
* Out-of-stock states.
* Invalid-product states.

Variant selection must not invent availability or pricing.

When selecting a variant changes price, inventory, media, or other authoritative information, obtain that information from the backend data model.

Prevent users from accidentally submitting invalid variant selections.

---

# SEARCH EXPERIENCE

Implement the frontend foundation for marketplace search.

Support:

* Search input.
* Search submission.
* Search results.
* Query state.
* Sorting.
* Filters.
* Facets.
* Price filtering.
* Category filtering.
* Availability filtering.
* Rating filtering where supported.
* Seller filtering where supported.
* Search suggestions where supported.
* Empty search results.
* Search errors.
* Loading states.

Keep search state synchronized with URLs where appropriate so results can be:

* Shared.
* Reloaded.
* Bookmarked.
* Navigated with browser history.

Do not make the browser the source of search truth.

The backend search system remains authoritative.

---

# FILTERS AND SORTING

Implement reusable filtering and sorting controls.

Support backend-defined capabilities rather than inventing unsupported filters.

Ensure filters:

* Work on mobile.
* Work on desktop.
* Preserve selected state correctly.
* Can be cleared.
* Produce accessible controls.
* Synchronize with URL state where appropriate.
* Avoid unnecessary duplicate requests.
* Handle loading transitions cleanly.

Provide useful empty-state messaging when filters produce no results.

---

# CART FOUNDATION

Implement the customer cart frontend foundation.

The cart interface should support:

* Cart items.
* Product information.
* Variant information.
* Quantity.
* Price.
* Availability.
* Seller grouping where applicable.
* Remove item.
* Quantity changes.
* Empty cart state.
* Loading state.
* Error state.
* Server synchronization.

The frontend must treat the backend as authoritative for:

* Price.
* Inventory.
* Availability.
* Promotions.
* Seller information.
* Cart validity.

Do not calculate final checkout totals as authoritative client-side values.

If the backend returns updated cart information after a mutation, synchronize the UI with that response.

Handle stale carts and concurrent changes gracefully.

---

# FORMS AND VALIDATION

Establish reusable form infrastructure using React Hook Form and Zod.

Implement conventions for:

* Typed form values.
* Validation schemas.
* Field-level errors.
* Form-level errors.
* Server validation errors.
* Submission state.
* Disabled states.
* Accessible labels.
* Descriptions.
* Error announcements.
* Focus management.

Do not duplicate backend validation rules as if frontend validation were authoritative.

Frontend validation should improve user experience while backend validation remains authoritative.

Ensure server-side validation failures can be mapped cleanly back to the relevant form fields.

---

# LOADING, ERROR, EMPTY, AND DEGRADED STATES

Every asynchronous customer-facing feature must have intentional states for:

* Initial loading.
* Background refetching.
* Empty data.
* Invalid data.
* API failure.
* Permission failure.
* Authentication expiration.
* Temporary backend unavailability.
* Offline/intermittent connectivity where relevant.
* Mutation in progress.
* Mutation failure.
* Successful mutation.

Do not leave blank screens while requests are pending.

Do not show misleading success states when a backend operation failed.

Use skeletons where they improve perceived performance.

Use error boundaries where appropriate.

Provide recovery actions such as:

* Retry.
* Refresh.
* Return to a valid page.
* Re-authenticate.

---

# RESPONSIVE DESIGN

The storefront must be fully responsive.

Design and validate for:

* Large desktop displays.
* Standard desktop.
* Tablet landscape.
* Tablet portrait.
* Mobile web.

Do not merely shrink desktop layouts.

Mobile layouts must have deliberate interaction patterns.

Ensure:

* Touch targets are appropriate.
* Navigation remains usable.
* Product media remains legible.
* Filters are accessible.
* Cart interactions remain usable.
* Forms remain usable.
* Text does not overflow.
* Horizontal scrolling is intentional and controlled.
* Modals and dialogs fit smaller screens.

---

# ACCESSIBILITY

Implement accessibility as a first-class requirement.

Use semantic HTML wherever possible.

Ensure:

* Keyboard navigation.
* Visible focus.
* Correct labels.
* Accessible names.
* Proper heading hierarchy.
* Appropriate ARIA only where necessary.
* Screen-reader-friendly status messages.
* Accessible dialogs.
* Accessible dropdowns.
* Accessible forms.
* Accessible error messaging.
* Sufficient interaction target sizes.
* Logical tab order.
* Reduced-motion support.
* Meaningful alternative text for product media.

Do not use color alone to communicate state.

Respect user motion preferences.

Test the implemented interface with automated accessibility tooling where supported.

---

# SEO AND METADATA

Implement SEO foundations appropriate for public ecommerce pages.

Support:

* Page titles.
* Descriptions.
* Canonical URLs where appropriate.
* Open Graph metadata where useful.
* Product/category metadata where supported.
* Structured data where appropriate and based on authoritative backend data.
* Correct indexing behavior for public pages.
* Appropriate noindex behavior for private or non-canonical pages.

Do not expose private customer information through metadata.

Ensure dynamically generated metadata does not cause security or performance issues.

---

# PERFORMANCE

Optimize the frontend for real-world ecommerce performance.

Apply appropriate strategies for:

* Server rendering.
* Streaming where useful.
* Static generation where appropriate.
* Dynamic rendering where necessary.
* Image optimization.
* Code splitting.
* Lazy loading.
* Component boundaries.
* Bundle size.
* Query caching.
* Avoiding unnecessary rerenders.
* Virtualization for genuinely large client-rendered collections.
* Avoiding expensive browser computations.
* Reducing layout shifts.
* Fast interaction readiness.

Do not introduce premature optimization that makes the application harder to maintain.

Measure before applying complex optimizations where practical.

---

# SECURITY

Treat all browser input and backend responses as untrusted.

Protect against:

* XSS.
* Unsafe HTML rendering.
* Malicious URLs.
* Open redirects.
* Token leakage.
* Sensitive data exposure.
* Client-side privilege assumptions.
* Insecure local persistence.
* Injection through query parameters.
* Unsafe third-party content.
* Malicious product/catalog content.

Never:

* Hardcode secrets.
* Commit credentials.
* Expose private environment variables to browser code.
* Trust client-side authorization.
* Render untrusted HTML without appropriate sanitization and a justified design.
* Put sensitive payment credentials in browser storage.

Use secure browser and Next.js patterns.

---

# OBSERVABILITY

Integrate with the repository's observability architecture.

Where appropriate, instrument:

* Route rendering failures.
* API failures.
* Authentication failures.
* Query failures.
* Mutation failures.
* Critical customer actions.
* Frontend performance metrics.
* Error boundaries.

Do not log:

* Passwords.
* Authentication tokens.
* Session secrets.
* Payment credentials.
* Sensitive personal information.
* Private customer data unnecessarily.

Use correlation/request identifiers when the backend provides them.

Ensure frontend telemetry does not create excessive network or rendering overhead.

---

# TESTING

Implement meaningful automated frontend tests for the functionality introduced by this scope.

Include appropriate tests for:

* Shared components.
* Forms.
* Validation.
* API client behavior.
* Authentication handling.
* Query behavior.
* Error states.
* Product listing.
* Product detail.
* Variant selection.
* Search.
* Filters.
* Sorting.
* Cart interactions.
* Responsive-critical behavior where testable.
* Accessibility-critical behavior.
* Security-sensitive behavior.

Use integration and end-to-end testing where the repository supports it.

Do not write superficial tests that only verify implementation details.

Test observable behavior and important failure modes.

Ensure tests do not depend on brittle timing assumptions.

---

# DOCUMENTATION

Update the repository documentation needed to explain the implemented frontend architecture.

Document:

* Frontend directory structure.
* Routing conventions.
* API client usage.
* TanStack Query conventions.
* Zustand responsibilities.
* Form/validation conventions.
* Authentication integration.
* Shared component conventions.
* Environment variables required for frontend operation.
* Local development commands.
* Testing commands.
* Important architectural decisions.
* Integration assumptions.

Do not document functionality that does not exist.

Keep documentation synchronized with the implementation.

---

# IMPLEMENTATION BOUNDARIES

This implementation must focus on the web customer experience and reusable frontend foundations.

Do not redesign the backend architecture.

Do not redesign database schemas.

Do not replace backend business rules with frontend implementations.

Do not introduce an alternative API contract merely because it is more convenient for the UI.

Do not implement fake payment providers.

Do not fabricate inventory.

Do not fabricate seller balances.

Do not create fake order states.

Do not expose administrative capabilities to ordinary customers.

Do not add unrelated infrastructure.

If an existing backend contract has limitations, build the frontend around the actual contract and document legitimate integration constraints.

---

# ABSOLUTE IMPLEMENTATION RULES

The implementation must satisfy all of the following:

* No pseudo-code.
* No placeholders.
* No TODO comments.
* No FIXME comments.
* No intentionally incomplete implementations.
* No fake production APIs.
* No hardcoded secrets.
* No hardcoded credentials.
* No omitted required files.
* No “implement similarly.”
* No “remaining code omitted.”
* No “left as an exercise.”
* No “for brevity.”
* No knowingly broken TypeScript.
* No knowingly broken builds.
* No knowingly broken imports.
* No knowingly unreachable production routes.
* No duplicate competing implementations of the same responsibility.
* No unnecessary rewrites of working functionality.

Every changed file must contain complete production-quality implementation.

Every component must have a clear responsibility.

Every API integration must handle success and failure.

Every asynchronous operation must have appropriate loading and error behavior.

Every interactive control must be accessible.

Every customer-facing feature must work across supported responsive layouts.

---

# REPOSITORY COMPATIBILITY

Integrate with the repository's actual current state.

Before finalizing:

1. Detect existing frontend architecture.
2. Preserve compatible conventions.
3. Reuse existing shared components.
4. Reuse existing API infrastructure.
5. Reuse existing authentication infrastructure.
6. Reuse existing testing infrastructure.
7. Avoid duplicate dependencies.
8. Avoid duplicate providers.
9. Avoid conflicting routing systems.
10. Avoid conflicting state-management systems.
11. Avoid breaking existing backend integrations.
12. Preserve backward compatibility for working frontend functionality.

If an existing implementation partially satisfies this scope, improve it rather than creating a parallel implementation.

The final repository must contain one coherent frontend architecture.

---

# VALIDATION AND COMPLETION

Before declaring completion:

* Run the project's applicable formatting checks.
* Run linting.
* Run TypeScript type checking.
* Run applicable unit tests.
* Run applicable integration tests.
* Run applicable frontend/end-to-end tests.
* Validate production build behavior.
* Validate routing.
* Validate authentication flows.
* Validate API error handling.
* Validate product browsing.
* Validate product detail behavior.
* Validate search behavior.
* Validate filters and sorting.
* Validate cart interactions.
* Validate responsive behavior.
* Validate accessibility-critical interactions.
* Validate that no secrets were introduced.
* Validate that no broken imports remain.
* Validate that no incomplete implementation markers remain.
* Validate that documentation matches the implementation.

Fix issues discovered during validation rather than merely reporting them.

Do not declare success if the implementation does not compile or the affected functionality is materially broken.

---

# IMPLEMENTATION REPORT

After completing the implementation, provide a concise engineering report containing:

1. Summary of implemented functionality.
2. Files created.
3. Files modified.
4. Important architectural decisions.
5. API integrations introduced or changed.
6. Authentication/session behavior implemented.
7. State-management decisions.
8. Testing performed.
9. Validation commands executed.
10. Any genuine repository constraints that prevented full implementation.

Only report actual work performed.

Do not claim tests passed if they were not executed.

Do not claim functionality exists if it was not implemented.

---

# FINAL DIRECTIVE

Inspect the repository first.

Then implement the complete production-grade frontend scope defined by this prompt.

Treat the repository as the source of truth.

Preserve compatible existing work.

Build a coherent, maintainable, scalable Next.js ecommerce frontend with strong server/client boundaries, typed API integration, robust asynchronous state management, secure authentication handling, accessible UI, responsive design, strong loading/error states, and production-quality testing.

Do not stop at scaffolding.

Do not provide a conceptual proposal instead of implementation.

Do not leave incomplete functionality.

Implement the actual code, integrate it into the repository, validate it, fix discovered issues, update documentation, and leave the project in a working state.
