# Amazon Ecommerce Marketplace — Mobile Prompt — Volume 1

## React Native + Expo Mobile Foundation, Authentication, Catalog, Search, Product Discovery, and Cart

You are implementing the mobile application for a production-grade, original Amazon-style ecommerce marketplace.

This prompt is a **standalone implementation unit**. It must contain everything necessary to perform this implementation without requiring another prompt, architecture document, previous conversation, or previously generated document to be present. The actual repository and its current implementation are the source of truth for existing project state and contracts.

The mobile application must become one coherent part of the same ecommerce system represented by the repository. Do not create a separate application architecture, duplicate backend, duplicate business rules, or competing contracts.

---

# 1. Mission

Implement the production-grade mobile customer application using:

* React Native
* Expo
* TypeScript
* React Navigation
* TanStack Query
* Zustand

The mobile application must provide a polished, production-ready customer experience for:

* Application startup
* Authentication
* Session restoration
* Customer account foundation
* Home/discovery
* Categories
* Product browsing
* Product details
* Product variants
* Seller offers
* Pricing
* Product media
* Search
* Search suggestions where supported
* Filters
* Sorting
* Pagination/infinite loading
* Cart
* Anonymous cart where supported
* Authenticated cart
* Cart persistence
* Anonymous-to-authenticated cart merge
* Network/offline resilience
* Deep linking
* Accessibility
* Secure session handling
* Production-grade loading/error/empty states
* Mobile performance
* Testing
* Observability foundations

Do not implement full checkout, payment, order management, fulfillment, returns, reviews, or the complete notification system in this implementation unit unless the existing repository already contains functionality that requires a minimal compatible integration.

Those capabilities belong to later mobile implementation work.

---

# 2. Repository-First Requirement

Before changing anything:

1. Inspect the complete repository structure relevant to the mobile application.
2. Determine whether a mobile application already exists.
3. Inspect:

   * package configuration
   * Expo configuration
   * TypeScript configuration
   * navigation
   * existing screens
   * components
   * hooks
   * services
   * API clients
   * authentication
   * state management
   * TanStack Query configuration
   * Zustand stores
   * secure storage
   * environment configuration
   * design system
   * assets
   * tests
   * linting
   * formatting
   * build configuration
   * backend API contracts
   * OpenAPI definitions where available
4. Reuse compatible existing implementation.
5. Do not replace working architecture merely for stylistic preference.
6. Do not create duplicate API clients, navigation systems, authentication systems, state stores, design systems, or query abstractions.
7. Preserve backward compatibility with working functionality.
8. If the repository differs from the requirements in this prompt, adapt the implementation to the actual repository while preserving the required behavior.

The repository is the source of truth for already-existing implementation.

---

# 3. Product Scope

Build the mobile customer-facing application for an ecommerce marketplace containing:

* Customers
* Products
* Categories
* Brands
* Product variants
* SKUs
* Sellers
* Seller offers
* Prices
* Promotions/coupons where already exposed by backend
* Inventory availability
* Shopping carts
* Search

The application must consume the existing backend APIs.

The mobile application must never become authoritative for:

* Prices
* Inventory
* Promotions
* Taxes
* Shipping costs
* Seller ownership
* Product availability
* Authorization
* Order state
* Payment state

All authoritative business decisions remain server-side.

---

# 4. Mobile Architecture

Implement a maintainable architecture appropriate for a production React Native application.

Use clear separation between:

* Application/navigation
* Screens
* Presentation components
* Feature components
* Hooks
* API/data access
* TanStack Query
* Zustand
* Domain-oriented types
* Secure storage
* Device/platform services
* Analytics/observability
* Validation
* Utilities

Avoid a monolithic `App.tsx`.

Avoid putting business logic directly into UI components.

Avoid excessive abstraction that provides no practical value.

Use feature-oriented organization where it improves maintainability.

---

# 5. TypeScript

Use strict TypeScript.

Do not use:

* `any` as an escape hatch
* unsafe type assertions without justification
* duplicated incompatible domain types
* untyped API responses

Prefer:

* generated API types when available
* shared contracts when the repository supports them
* explicit DTO types
* discriminated unions for state machines
* strongly typed navigation parameters
* typed query keys
* typed mutations
* typed errors

The mobile client must reflect the actual backend contract rather than inventing endpoints or fields.

---

# 6. API Client

Implement or integrate with the repository's existing typed API client.

The API layer must centralize:

* Base URL configuration
* Authentication headers
* Request IDs/correlation information where applicable
* Serialization
* Response parsing
* Error normalization
* Timeout behavior
* Network error handling
* Authentication failure handling

Do not make raw `fetch()` calls throughout screens.

Do not duplicate API logic inside components.

If the backend exposes standardized errors, preserve those error codes and metadata.

If the backend contract is unavailable for a requested capability, inspect the repository and implement only what can be supported by the actual contract. Do not invent fake endpoints.

---

# 7. Environment Configuration

Implement mobile environment configuration appropriate for Expo.

Support distinct environments where the repository requires them, such as:

* development
* staging
* production

Never embed:

* backend secrets
* Stripe secret keys
* AWS credentials
* database credentials
* private API keys
* provider secrets

Client configuration must contain only values intentionally safe for a mobile application.

Validate required configuration at startup.

Fail clearly when mandatory configuration is missing.

---

# 8. Navigation

Implement strongly typed React Navigation.

Provide an application navigation structure appropriate for the current repository.

At minimum, support logical navigation for:

* Authentication
* Home
* Categories
* Search
* Product details
* Cart
* Customer account

Use appropriate:

* stack navigation
* tab navigation
* modal presentation
* nested navigation

where justified.

Navigation must correctly handle:

* authenticated state
* unauthenticated state
* session restoration
* expired sessions
* protected screens
* deep links
* back navigation
* nested product/category/search routes

Do not duplicate navigation state in Zustand unless genuinely required.

---

# 9. Application Startup

Implement a production-grade startup flow.

Startup must correctly handle:

1. App initialization.
2. Configuration validation.
3. Secure credential/session restoration.
4. Query client initialization.
5. Authentication state restoration.
6. Navigation readiness.
7. Required persisted client state restoration.

Do not show protected application screens before authentication state has been resolved.

Avoid splash-screen races and navigation flashes.

If initialization fails, provide an actionable error state instead of an infinite loading screen.

---

# 10. Authentication

Integrate with the actual backend authentication contract.

Support where provided by the backend:

* Registration
* Login
* Logout
* Session restoration
* Session expiration
* Token refresh
* Authentication failure recovery

Never trust client-side authentication state as authorization.

The server remains authoritative.

Implement secure mobile credential/session storage using an appropriate platform-secure mechanism available to the Expo application.

Do not store sensitive credentials in ordinary unencrypted AsyncStorage.

Handle:

* expired access tokens
* refresh failures
* revoked sessions
* logout
* multiple authentication attempts
* network failure during restoration

Do not create authentication logic that conflicts with the existing backend.

---

# 11. Customer Account Foundation

Implement the customer account foundation required by this mobile volume.

Support, according to actual backend availability:

* Customer profile
* Basic profile display
* Account navigation
* Logout
* Session/security entry points
* Account loading/error states

Do not implement advanced account functionality that belongs to later mobile work unless already required by existing code.

---

# 12. Home / Discovery

Implement a production-quality mobile home/discovery experience using actual available backend data.

Where supported, include:

* Featured products
* Product sections
* Categories
* Brands
* Promotional content
* Recently relevant products
* Popular products

Do not invent product data in production code.

If the backend has no dedicated homepage API, compose the page from legitimate existing catalog/search endpoints without introducing fake APIs.

Use appropriate caching.

Avoid excessive network requests.

---

# 13. Categories

Implement category browsing.

Support:

* Root categories
* Nested categories
* Category navigation
* Category product listings
* Loading states
* Empty states
* Error states
* Pagination/infinite scrolling where appropriate

Respect the backend's category hierarchy.

Do not calculate authoritative category membership solely on the client.

---

# 14. Product Listing

Implement reusable product-listing functionality.

Product cards should support appropriate fields such as:

* Product title
* Primary image
* Price
* Currency
* Previous price where legitimately provided
* Rating
* Review count
* Seller/offer information where appropriate
* Availability
* Badges/promotions where actually provided

Never fabricate:

* ratings
* review counts
* discounts
* availability
* seller information
* prices

Use backend-provided data.

---

# 15. Product Detail

Implement a complete mobile product detail experience.

Support where available:

* Product title
* Description
* Product media gallery
* Images
* Variant selection
* SKU selection
* Attributes
* Brand
* Category
* Seller offers
* Price
* Availability
* Quantity selection
* Add to cart

Handle products with:

* no variants
* multiple variants
* multiple seller offers
* unavailable offers
* incomplete media
* changing inventory
* changing prices

The client must never assume that a displayed product remains available.

The backend validates cart operations and later checkout operations.

---

# 16. Product Media

Implement efficient mobile image/media rendering.

Use:

* correct aspect ratios
* lazy loading
* appropriate image sizing
* caching
* placeholders
* failure states

Avoid downloading unnecessarily large original assets when optimized variants are available.

Do not expose private media URLs or bypass backend authorization.

Respect existing S3/CloudFront/media contracts.

---

# 17. Search

Implement mobile product search using the actual backend search API.

Support where available:

* Search input
* Suggestions/autocomplete
* Recent searches
* Search results
* Filters
* Facets
* Sorting
* Pagination/infinite loading
* Empty results
* Error states

Search state that belongs in the URL on web should be represented appropriately in mobile navigation/query state.

Do not implement search by downloading the complete catalog and filtering locally.

---

# 18. Search UX

Implement a polished search experience.

Handle:

* keyboard behavior
* focus
* clear button
* debounced suggestions
* submission
* loading
* no results
* network errors
* retry
* pagination
* filters
* sorting

Prevent excessive API calls.

Cancel or ignore stale requests where appropriate.

Do not allow an older request to overwrite newer search results.

---

# 19. TanStack Query

Use TanStack Query as the server-state layer.

Define consistent query keys for:

* customer
* categories
* products
* product details
* offers
* search
* suggestions
* cart

Configure:

* stale times
* garbage collection
* retry behavior
* refetch behavior
* mutation behavior
* cache invalidation

Do not blindly retry authentication, validation, authorization, payment, or other non-transient failures.

Query configuration must account for mobile network conditions.

---

# 20. Zustand

Use Zustand only for client-owned state.

Appropriate examples include:

* UI state
* selected local preferences
* temporary client state
* search UI state where appropriate
* cart UI state that is not authoritative

Do not duplicate server state in Zustand.

Do not treat Zustand as the source of truth for:

* inventory
* prices
* customer authorization
* product catalog
* order state
* payment state

---

# 21. Cart

Implement the mobile shopping cart against the actual backend contract.

Support:

* Cart screen
* Cart items
* Quantity changes
* Item removal
* Cart totals
* Seller/offer information where appropriate
* Availability status
* Price changes
* Validation errors
* Empty cart
* Loading states
* Retry
* Add-to-cart
* Anonymous cart where backend supports it
* Authenticated cart
* Anonymous-to-authenticated merge where backend supports it

The server remains authoritative for:

* product identity
* seller offer
* price
* promotion
* availability
* quantity limits
* cart totals

Never calculate an authoritative final total only on the client.

---

# 22. Cart Mutation Safety

Prevent:

* duplicate add-to-cart requests
* duplicate quantity mutations
* accidental double taps
* stale cart overwrites
* race conditions
* cross-user cart access

Use mutation state to disable or otherwise guard repeated actions.

After mutations, invalidate or update the appropriate TanStack Query cache.

If a cart mutation fails because the server state changed, display an understandable recovery state and refresh the authoritative cart.

---

# 23. Offline and Network Resilience

Mobile connectivity is unreliable.

Implement appropriate handling for:

* offline startup
* connection loss
* slow requests
* request timeout
* reconnection
* stale cached data
* failed mutations
* retry

Do not pretend that a mutation succeeded while offline unless a fully reliable offline queue has actually been implemented.

Do not silently lose user actions.

Clearly distinguish:

* cached/stale data
* unavailable network
* server error
* authentication error
* validation error

Use platform-appropriate network detection where useful.

---

# 24. Deep Linking

Implement deep linking for supported routes.

Support links such as:

* Product
* Category
* Search
* Cart
* Account

Deep links must:

* validate parameters
* handle unavailable resources
* respect authentication
* avoid open redirects
* recover gracefully from invalid URLs
* work correctly after cold start

Do not trust deep-link parameters as authorization.

---

# 25. Accessibility

Build accessibility into every screen.

Support:

* accessible labels
* accessible roles
* appropriate hints
* screen-reader navigation
* logical focus order
* sufficient touch targets
* readable text
* dynamic text where compatible
* accessible loading/error states
* accessible forms

Do not use visual appearance as the only way to communicate important state.

---

# 26. Responsive Mobile UX

Design for common mobile screen sizes and orientations where applicable.

Handle:

* small screens
* large phones
* safe areas
* keyboard
* status bar
* navigation bars
* long product titles
* long descriptions
* large product images
* loading content
* empty lists
* errors

Avoid layouts that depend on a single device size.

---

# 27. Loading, Error, and Empty States

Every asynchronous feature must have deliberate:

* loading state
* success state
* empty state
* error state
* retry behavior where appropriate

Avoid indefinite spinners.

Use skeletons where they improve perceived performance.

Do not show misleading empty states when the network request actually failed.

---

# 28. Error Handling

Create or integrate a consistent mobile error model.

Errors should distinguish at minimum:

* Network failure
* Timeout
* Authentication failure
* Authorization failure
* Validation failure
* Not found
* Conflict
* Rate limit
* Server failure
* Unknown failure

Display user-friendly messages.

Do not expose:

* stack traces
* provider secrets
* internal database errors
* sensitive server information

Preserve structured error codes for debugging and analytics where appropriate.

---

# 29. Security

Perform a mobile security review while implementing.

Protect against:

* insecure credential storage
* token leakage
* logging sensitive data
* open redirects
* malicious deep links
* unsafe URL handling
* unauthorized resource access
* IDOR assumptions
* unsafe WebView usage
* untrusted HTML
* malicious media
* debug configuration leaking into production

Never:

* embed server secrets
* trust client-side authorization
* trust product/seller ownership
* trust price/tax/shipping totals
* log authentication tokens
* log payment secrets
* store passwords in plaintext

---

# 30. Performance

Optimize for real mobile devices.

Pay attention to:

* FlatList/FlashList usage where appropriate
* stable keys
* unnecessary re-renders
* memoization where justified
* image size
* image caching
* pagination
* query caching
* navigation performance
* bundle size
* startup time
* expensive selectors
* excessive state updates

Do not optimize prematurely with unnecessary abstractions.

Measure where possible.

---

# 31. Analytics Boundary

Integrate with the repository's analytics abstraction if one exists.

Potential events include:

* app opened
* login
* registration
* product viewed
* search performed
* category viewed
* product added to cart
* cart item changed
* cart item removed

Do not send sensitive personal information unnecessarily.

Do not send:

* passwords
* authentication tokens
* payment secrets
* private addresses
* unnecessary personal data

Analytics must never determine business correctness.

---

# 32. Observability

Integrate with the project's existing observability strategy.

Support where configured:

* structured client errors
* crash reporting
* performance measurements
* request correlation
* navigation diagnostics

Do not log sensitive data.

Do not create a completely separate observability platform if the repository already defines one.

---

# 33. Testing

Implement meaningful automated tests for the mobile application.

At minimum, cover:

### Authentication

* startup session restoration
* successful login
* failed login
* logout
* expired session
* refresh failure
* protected navigation

### Catalog

* category loading
* category navigation
* product listing
* product detail
* variant selection
* seller offer selection
* unavailable product behavior

### Search

* search submission
* suggestions
* filters
* sorting
* pagination
* empty results
* failed search
* stale request handling

### Cart

* add item
* change quantity
* remove item
* empty cart
* server validation failure
* price change
* availability change
* duplicate action prevention
* authentication/cart merge where supported

### Network

* offline behavior
* timeout
* retry
* reconnect

### Navigation

* protected routes
* deep links
* invalid routes
* back navigation

### Accessibility

Test critical accessibility semantics and interaction behavior.

Use the repository's established testing stack where one exists.

Do not introduce unnecessary competing test frameworks.

---

# 34. End-to-End Customer Flow

Where the repository supports mobile E2E testing, establish or extend a production-relevant flow:

1. Launch application.
2. Browse catalog.
3. Open category.
4. Open product.
5. Select variant/offer.
6. Add product to cart.
7. Open cart.
8. Modify quantity.
9. Remove/re-add item.
10. Authenticate if required.
11. Restore session.
12. Verify cart state.

Do not fabricate backend behavior merely to make E2E tests pass.

---

# 35. Design System

Use the existing design system if present.

If none exists, establish a small coherent mobile UI foundation for:

* typography
* spacing
* buttons
* inputs
* cards
* product cards
* headers
* navigation
* loading indicators
* skeletons
* errors
* empty states
* badges
* modals/sheets

Avoid duplicating components.

Maintain visual consistency across screens.

---

# 36. State Consistency

Ensure consistency between:

* Authentication
* Customer state
* Catalog queries
* Search queries
* Product details
* Cart queries
* Local UI state
* Navigation

Examples:

* Logging out must not leave protected customer data visible.
* Changing users must not expose the previous user's cart.
* Authentication changes must invalidate appropriate customer/cart queries.
* Cart mutations must update or invalidate cart-dependent UI.
* Product changes must not leave stale authoritative price assumptions in mutation payloads.

---

# 37. Security and Privacy Boundaries

The mobile application must assume that all client-side state can be inspected or manipulated by a malicious user.

Therefore:

* UI hiding is not authorization.
* Disabled buttons are not authorization.
* Navigation restrictions are not authorization.
* Local state is not authoritative.
* Client validation is not authoritative.

The backend must continue enforcing every permission and business invariant.

---

# 38. Documentation

Update mobile documentation where appropriate.

Document:

* local development
* environment variables
* Expo configuration
* supported platforms
* navigation structure
* authentication/session handling
* API configuration
* testing
* build commands
* development/staging/production differences

Do not create documentation that claims unsupported infrastructure or integrations exist.

---

# 39. Validation

Before considering this implementation unit complete, run the repository's appropriate:

* TypeScript checks
* linting
* formatting checks
* unit tests
* integration tests where applicable
* mobile tests
* E2E tests where configured
* Expo validation
* production build validation where available

Fix actual errors.

Do not hide errors with:

* `any`
* disabled lint rules
* ignored TypeScript errors
* skipped tests
* fake mocks in production paths
* empty catch blocks

---

# 40. Production Readiness Review

Perform a final review for:

* Authentication correctness
* Session security
* API contract correctness
* Navigation correctness
* Cart consistency
* Query cache consistency
* Mobile network resilience
* Deep-link security
* Accessibility
* Performance
* Error handling
* Privacy
* Observability
* Test coverage
* Build reliability

Correct issues found during the implementation.

---

# 41. Scope Boundaries

Do NOT create fake or placeholder implementations for functionality outside this mobile volume.

Unless existing repository functionality requires integration, defer:

* Full checkout
* Stripe payment UI
* Payment confirmation/reconciliation UI
* Order history/detail
* Shipment tracking
* Returns
* Refund UI
* Review creation/editing
* Review moderation
* Full notification center
* Push notification delivery
* Seller portal
* Administration portal
* Advanced analytics dashboards
* Recommendations
* Advertising
* Advanced warehouse management
* Seller payout/settlement UI
* Tax-remittance systems
* Carrier-specific integrations

Do not generate TODO placeholders for deferred functionality.

The application should remain a valid, working product after this implementation unit.

---

# 42. Non-Negotiable Rules

You must:

* Inspect the repository before implementation.
* Integrate with actual existing code.
* Preserve compatible existing functionality.
* Use production-grade TypeScript.
* Use the existing backend contracts.
* Keep server-side authority for business rules.
* Secure mobile authentication/session storage.
* Prevent unauthorized data exposure.
* Handle mobile network failures.
* Use TanStack Query for server state.
* Use Zustand only for appropriate client state.
* Use strongly typed navigation.
* Implement real loading/error/empty states.
* Add meaningful tests.
* Validate the implementation.
* Document real behavior.
* Report only what actually exists in the repository after implementation.

You must NOT:

* Generate pseudo-code.
* Generate fake APIs.
* Invent backend endpoints.
* Invent provider integrations.
* Invent product/catalog data for production behavior.
* Hardcode secrets.
* Store passwords insecurely.
* Trust client-side authorization.
* Use floating-point arithmetic for authoritative money calculations.
* Duplicate backend business logic unnecessarily.
* Duplicate existing mobile architecture.
* Replace working code without justification.
* Leave TODO/FIXME placeholders.
* Claim functionality is complete when it was not implemented.
* Claim tests passed when they were not run.
* Claim builds succeeded when they were not validated.

---

# 43. Final Implementation Report

After implementation, provide a factual report based only on the actual repository state.

Include:

1. Files/modules created.
2. Files/modules modified.
3. Mobile architecture implemented.
4. Navigation implemented.
5. Authentication/session functionality.
6. Customer account functionality.
7. Catalog functionality.
8. Product detail functionality.
9. Search functionality.
10. Cart functionality.
11. Deep linking.
12. Offline/network handling.
13. Accessibility work.
14. Security work.
15. Performance work.
16. Tests added or modified.
17. Validation commands executed and their actual results.
18. Documentation updated.
19. Any genuine limitations or environment-dependent integrations that could not be validated.

Do not claim anything that was not actually implemented and verified.

The final repository must contain a coherent production-grade mobile ecommerce application that integrates with the existing marketplace rather than becoming a separate system.
