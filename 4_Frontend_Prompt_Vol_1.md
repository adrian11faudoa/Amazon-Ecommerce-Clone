# Amazon Ecommerce Marketplace — Frontend Prompt — Volume 1

## Web Application Foundation, Authentication, Catalog, Search, Product Pages, Cart, and Core Customer Experience

You are implementing the first production-grade frontend implementation unit for an original Amazon-style enterprise ecommerce marketplace.

This is a **standalone implementation prompt**. It must contain everything necessary to execute this phase without relying on any previous prompt, architecture document, conversation, generated artifact, or remembered decision.

The actual repository is the only source of truth for the current implementation state.

Do not assume that any previous prompt was executed successfully. Inspect the repository and integrate with what actually exists.

This frontend is one coherent part of the same ecommerce marketplace system. It is not a separate application.

---

# 1. Mission

Implement the production-grade foundation of the **web customer application** using:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand

Use the actual versions and conventions already present in the repository.

This phase focuses on:

* Web application foundation
* Application shell
* Routing
* Authentication
* Customer session handling
* Customer account foundation
* Catalog browsing
* Categories
* Brands
* Product discovery
* Search
* Product detail pages
* Seller offers
* Pricing presentation
* Product media
* Cart
* Cart persistence
* Responsive ecommerce UX
* Loading/error/empty states
* Accessibility
* SEO foundations
* API integration
* Security
* Frontend observability
* Testing

Later frontend phases may extend this into checkout, orders, payments, fulfillment, returns, reviews, notifications, seller/admin interfaces, and advanced account functionality.

Do not implement those unrelated areas prematurely unless the existing repository already requires them for compatibility.

---

# 2. Repository-First Rule

Before writing code:

1. Inspect the repository.
2. Inspect the existing frontend structure.
3. Inspect package.json and lockfiles.
4. Inspect Next.js configuration.
5. Inspect TypeScript configuration.
6. Inspect Tailwind configuration.
7. Inspect shadcn/ui setup.
8. Inspect routing.
9. Inspect existing components.
10. Inspect TanStack Query configuration.
11. Inspect Zustand stores.
12. Inspect API clients.
13. Inspect authentication implementation.
14. Inspect environment configuration.
15. Inspect existing backend API contracts.
16. Inspect existing tests.
17. Inspect existing design system.
18. Inspect existing assets.

The actual repository takes precedence over assumptions in this prompt.

If compatible frontend functionality already exists, extend it.

Do not create duplicate:

* API clients
* authentication systems
* query clients
* state-management systems
* component libraries
* routing systems
* design systems
* session systems

Do not regenerate unchanged files.

---

# 3. Technology Requirements

Use:

### Framework

* Next.js
* React
* TypeScript

### Styling

* Tailwind CSS
* shadcn/ui

### Server State

* TanStack Query

### Client State

* Zustand only where client state is genuinely appropriate

### Validation

Use the repository's existing validation library where available.

### Testing

Use the repository's established frontend testing stack.

Do not introduce unnecessary libraries when the repository already provides an appropriate solution.

---

# 4. Frontend Architecture

Use a maintainable production architecture.

Separate:

* UI components
* Feature components
* Page composition
* API clients
* Domain types
* Query hooks
* Mutations
* Client state
* Form state
* Validation
* Authentication/session handling
* Error handling
* Analytics/telemetry
* Accessibility utilities

Avoid putting business logic directly inside large page components.

Prefer feature-oriented organization where compatible with the existing repository.

---

# 5. Application Shell

Implement the core ecommerce application shell.

The shell should support:

* Header
* Logo/brand area
* Search
* Account access
* Cart access
* Navigation
* Category navigation where appropriate
* Main content
* Footer
* Responsive mobile navigation

The shell must work across:

* Desktop
* Tablet
* Mobile web

Do not create a desktop-only layout.

---

# 6. Header

Build a production-grade ecommerce header.

Include appropriate:

* Brand/logo
* Search field
* Account menu
* Sign-in/register access
* Orders/account access
* Cart
* Navigation
* Category/menu access
* Mobile controls

Search must be accessible from keyboard.

Interactive elements must have appropriate accessible labels.

Do not depend exclusively on icons to communicate functionality.

---

# 7. Responsive Navigation

Implement responsive navigation.

Desktop may use:

* Primary navigation
* Category navigation
* Search
* Account/cart controls

Mobile should use an appropriate:

* Menu drawer
* Search interface
* Account access
* Cart access

Do not simply shrink the desktop navigation until it becomes unusable.

Maintain touch-friendly interaction targets.

---

# 8. Design System

Use the existing shadcn/ui and Tailwind setup.

Create reusable primitives where needed:

* Button
* Input
* Select
* Dialog
* Drawer
* Dropdown
* Tabs
* Card
* Badge
* Skeleton
* Alert
* Toast
* Pagination
* Breadcrumbs
* Tooltip

Do not duplicate shadcn/ui components unnecessarily.

Use consistent:

* Typography
* Spacing
* Borders
* Radius
* Focus states
* Responsive behavior
* Error states
* Disabled states

Do not hardcode arbitrary styling independently on every page.

---

# 9. Theme and Visual Consistency

Establish a coherent marketplace visual language.

Support the repository's configured light/dark behavior if one exists.

Ensure:

* Contrast
* Focus visibility
* Readability
* Consistent spacing
* Clear hierarchy
* Responsive layouts
* Accessible controls

Do not use visual effects that harm performance or usability.

---

# 10. API Client

Implement or complete a centralized typed API client.

Requirements:

* Base URL configuration
* HTTP methods
* Request serialization
* Response parsing
* Authentication/session handling
* Error normalization
* Request IDs
* Timeout behavior
* Abort/cancellation where appropriate

Do not make raw `fetch()` calls throughout individual components.

Use a consistent abstraction.

---

# 11. API Error Model

Normalize backend errors into a frontend-safe structure.

Support:

* HTTP status
* Error code
* Message
* Field validation errors
* Request ID
* Retryability where appropriate

Do not display internal backend stack traces.

Do not expose sensitive provider/database errors to users.

---

# 12. TanStack Query

Configure TanStack Query centrally.

Define sensible defaults for:

* staleTime
* cacheTime/gcTime according to installed version
* retries
* refetch behavior
* error handling

Do not blindly retry:

* Authentication failures
* Validation failures
* Authorization failures
* Non-retryable business errors

Use query keys consistently.

Avoid manually duplicating server state in Zustand.

---

# 13. Zustand

Use Zustand for genuinely client-owned state.

Appropriate examples:

* UI preferences
* Temporary UI state
* Search UI state where appropriate
* Mobile navigation state
* Local cart UI state if needed
* Drawer/modal state

Do not duplicate authoritative backend data unnecessarily.

Cart data from the backend should remain server state when authenticated.

---

# 14. Authentication

Implement the web authentication experience against the existing backend.

Support, where backend contracts exist:

* Registration
* Login
* Logout
* Session restoration
* Session expiration
* Authentication errors
* Account access

Do not invent backend endpoints.

Inspect actual API contracts and use them.

---

# 15. Authentication Security

Never store sensitive authentication credentials insecurely.

Follow the backend's actual session/token architecture.

If the backend uses secure cookies:

* Respect HttpOnly behavior.
* Do not attempt to read HttpOnly credentials from JavaScript.
* Handle session state through server/client-safe mechanisms.

If the backend uses another established mechanism, integrate with it securely.

Never expose:

* Passwords
* Refresh tokens
* Provider secrets
* Internal session secrets

in application state, logs, URLs, or analytics.

---

# 16. Registration

Implement a production-grade registration page.

Include:

* Required fields from actual API contract
* Client validation
* Server validation handling
* Loading state
* Error state
* Success state
* Accessible form labels
* Password requirements where applicable

Do not invent fields not required by the backend.

Avoid leaking whether sensitive accounts exist where the backend intentionally prevents enumeration.

---

# 17. Login

Implement:

* Email/identifier input
* Password input
* Submit state
* Validation
* Authentication errors
* Session restoration
* Redirect behavior
* Accessible error messaging

Prevent accidental duplicate submissions.

Provide appropriate links to registration and account recovery if the backend supports recovery.

---

# 18. Session Handling

Implement robust session synchronization.

Handle:

* Initial session loading
* Authenticated state
* Anonymous state
* Session expiration
* Logout
* Multiple tabs where appropriate
* Unauthorized API responses

Avoid infinite redirect loops.

Do not assume a user is authenticated merely because client state says so.

The server remains authoritative.

---

# 19. Route Protection

Protect authenticated routes appropriately.

Examples:

* Account
* Orders
* Addresses
* Saved customer information

Use server-side protection where Next.js architecture permits it.

Do not rely only on client-side redirects for authorization.

---

# 20. Home Page

Implement a production-quality ecommerce home page.

It should support repository-backed content such as:

* Featured categories
* Featured products
* Popular products
* Promotions
* Marketplace highlights
* Search entry
* Seller/marketplace information where appropriate

Do not fabricate dynamic commerce data.

If content APIs exist, consume them.

If a particular merchandising API does not exist, build the UI so it handles empty/absent content gracefully rather than inventing fake production data.

---

# 21. Category Navigation

Implement category browsing.

Support:

* Category hierarchy
* Breadcrumbs
* Category page
* Child categories
* Product results
* Pagination
* Filters where supported
* Empty states

Respect backend category visibility.

Do not assume every category is public.

---

# 22. Category Pages

Create responsive category result pages.

Include:

* Breadcrumbs
* Category title
* Description where available
* Product count where available
* Product grid/list
* Sorting
* Filters
* Pagination
* Loading skeletons
* Empty state
* Error state

Avoid layout shift.

Use responsive grid behavior.

---

# 23. Product Cards

Build a reusable product-card component.

It should support:

* Product image
* Product name
* Rating
* Review count
* Price
* Previous price where applicable
* Promotion badge
* Availability
* Seller/offer information where appropriate
* Condition where appropriate
* Wishlist/save action only if backend functionality exists

Do not display information that the backend did not authorize or provide.

---

# 24. Product Pricing Display

Money must be represented accurately.

Use:

* Currency code
* Correct decimal precision
* Locale-aware formatting

Do not perform financial calculations using floating-point values.

Do not calculate discounts independently from authoritative backend data when exact values are available.

If the backend provides:

* Base price
* Sale price
* Discount
* Currency

render the authoritative values.

---

# 25. Product Detail Page

Implement the complete product-detail foundation.

Support:

* Product title
* Product description
* Product media
* Product attributes
* Variants
* SKU selection
* Seller offers
* Pricing
* Availability
* Ratings summary
* Review count
* Category breadcrumbs
* Add-to-cart
* Quantity selection
* Seller information
* Condition

Only display data actually returned by the backend.

---

# 26. Product Media

Build an accessible media gallery.

Support:

* Primary image
* Thumbnail navigation
* Image zoom/lightbox where appropriate
* Keyboard navigation
* Alt text
* Loading states
* Broken-image fallback

Use existing S3/CloudFront URLs provided by the backend.

Do not expose private S3 credentials.

Do not construct unauthorized object URLs.

---

# 27. Variant Selection

Implement variant selection according to the actual product model.

Support:

* Variant attributes
* Selection state
* Availability
* Price updates
* SKU selection
* Disabled unavailable combinations

Do not assume all combinations are valid.

The backend remains authoritative.

---

# 28. Seller Offers

Where products have multiple offers, present seller offers clearly.

Show appropriate information such as:

* Seller
* Price
* Condition
* Availability
* Fulfillment information if provided
* Offer selection

Do not expose private seller information.

Never trust seller identifiers from the client when performing mutations.

---

# 29. Add to Cart

Implement the customer-facing add-to-cart flow.

Requirements:

* Product/variant/SKU selection
* Seller offer selection where necessary
* Quantity
* Validation
* Loading state
* Success feedback
* Error handling

Never assume the product is still available.

The backend must remain authoritative for:

* Price
* Inventory
* Seller
* SKU
* Availability

---

# 30. Cart Page

Implement a production-grade cart page.

Support:

* Cart items
* Product image
* Product name
* Seller
* Price
* Quantity
* Quantity controls
* Remove
* Subtotal
* Discounts where provided
* Estimated totals where provided
* Checkout CTA
* Empty cart

Do not calculate authoritative totals independently when the backend provides them.

---

# 31. Cart Validation

The UI must handle server-side cart validation.

Possible results:

* Price changed
* Item unavailable
* Quantity reduced
* Seller offer changed
* Product unavailable
* Promotion expired
* Cart item removed

Clearly communicate changes.

Never silently alter user expectations.

---

# 32. Cart Synchronization

Implement correct server/client synchronization.

Authenticated users:

* Backend cart is authoritative.

Anonymous users:

* Use the backend anonymous-cart mechanism if supported.
* Otherwise use a secure local representation consistent with the actual backend capabilities.

On authentication:

* Merge anonymous cart if the backend supports merging.
* Display conflicts clearly.
* Refresh authoritative cart state.

Do not create a second independent cart database in the browser.

---

# 33. Search

Implement the customer-facing search experience using the backend Search API.

Support:

* Search input
* Search submission
* Suggestions/autocomplete if available
* Search results
* Filters
* Facets
* Sorting
* Pagination
* Empty state
* No-results state
* Error state

Do not expose raw Elasticsearch/OpenSearch queries.

---

# 34. Search Suggestions

If the backend provides suggestions:

* Debounce requests.
* Cancel obsolete requests.
* Show keyboard-accessible suggestions.
* Support arrow-key navigation.
* Support Enter selection.
* Support Escape to close.

Do not send a request on every keystroke without appropriate debouncing.

Do not expose private search data.

---

# 35. Search Results

Implement reusable search-result components.

Support:

* Product cards
* Result count
* Filters
* Sort
* Pagination
* Search query
* Facets
* Loading states
* Empty states

Preserve query/filter state in URLs where appropriate.

URLs should remain shareable and understandable.

---

# 36. Search Filters

Support backend-provided filters such as:

* Category
* Brand
* Price
* Rating
* Seller
* Availability
* Condition
* Product attributes

Do not hardcode filter values that should come from the backend.

Handle dynamic attribute filters safely.

---

# 37. Search Sorting

Support only backend-supported sort modes.

Possible modes:

* Relevance
* Newest
* Price ascending
* Price descending
* Rating
* Popularity

Do not invent unsupported ranking values.

---

# 38. Pagination

Use the backend's actual pagination contract.

If the backend uses cursor pagination:

* Preserve cursors correctly.
* Do not fabricate page numbers.
* Handle stale cursors.

If the backend uses page-based pagination:

* Use the server's total/count information.

Do not request unbounded result sets.

---

# 39. URL State

Use URL parameters for shareable discovery state where appropriate.

Examples:

```text
/search?q=phone&brand=example&sort=price_asc
/category/electronics?page=2
```

Use safe serialization.

Do not put:

* Tokens
* Secrets
* Sensitive customer information

in URLs.

---

# 40. Breadcrumbs

Implement reusable breadcrumbs for:

* Categories
* Products
* Search where appropriate
* Account pages where useful

Use semantic navigation markup.

Support structured data where appropriate.

---

# 41. SEO Foundations

Implement strong ecommerce SEO foundations.

Support:

* Metadata
* Titles
* Descriptions
* Canonical URLs
* Open Graph metadata
* Product structured data where appropriate
* Breadcrumb structured data
* Robots directives
* Sitemap integration boundary

Do not expose private pages to search engines.

Account/cart/checkout/private administrative pages must not be indexed.

---

# 42. Server Rendering

Use Next.js server rendering appropriately.

Prefer server-rendered/static content for:

* Product pages
* Category pages
* Public catalog content

Use client components only where interactivity requires them.

Do not turn the entire application into a client-rendered SPA unnecessarily.

---

# 43. Loading States

Every async page/component must have an intentional loading state.

Use:

* Skeletons
* Progress indicators
* Disabled controls

Avoid blank screens.

Prevent layout shifts where possible.

---

# 44. Error States

Implement user-friendly error states for:

* API unavailable
* Product unavailable
* Search unavailable
* Cart update failure
* Authentication failure
* Session expiration
* Invalid product
* Invalid category

Provide useful recovery actions.

Do not expose stack traces.

---

# 45. Empty States

Implement clear empty states for:

* Empty cart
* No search results
* Empty category
* No suggestions
* Missing product media
* No available offers

Include useful next actions where appropriate.

---

# 46. Accessibility

Target strong WCAG-aligned accessibility.

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Screen-reader labels
* Proper form labels
* Accessible dialogs
* Accessible drawers
* Accessible menus
* Accessible autocomplete
* Color-independent status communication
* Appropriate heading hierarchy
* Sufficient contrast

Do not rely exclusively on color.

---

# 47. Forms

Use reusable form architecture.

Handle:

* Client validation
* Server validation
* Field errors
* Submit state
* Disabled state
* Accessibility
* Reset behavior

Prevent duplicate submissions.

Do not duplicate validation rules unnecessarily when backend validation is authoritative.

---

# 48. Authentication UX

Implement polished authentication states.

Support:

* Initial loading
* Authenticated
* Anonymous
* Logging in
* Logging out
* Session expired
* Unauthorized

Avoid flashing protected content to unauthenticated users.

---

# 49. Security

Protect the frontend against:

* XSS
* Unsafe HTML rendering
* URL injection
* Open redirects
* Token leakage
* Sensitive information in URLs
* Unsafe third-party content
* CSRF according to backend architecture

Never render arbitrary HTML without sanitization and explicit need.

Never place secrets in:

* Client bundles
* Public environment variables
* localStorage
* URLs
* analytics events

---

# 50. Image Security and Performance

Use Next.js image optimization where compatible.

Implement:

* Responsive images
* Appropriate dimensions
* Lazy loading
* Priority loading for primary content
* Alt text
* CDN URLs
* Placeholder/fallback behavior

Do not load massive original images when smaller variants exist.

---

# 51. Performance

Optimize for:

* Core Web Vitals
* Initial page load
* Time to interactive
* Image loading
* JavaScript bundle size
* Server rendering
* Query efficiency
* Search responsiveness

Avoid:

* Large unnecessary client bundles
* Excessive dependencies
* Waterfall API requests
* Unnecessary rerenders
* Global state for server data

---

# 52. Query Invalidation

Use TanStack Query invalidation correctly.

Examples:

After cart mutation:

* Invalidate/refetch cart.
* Update related cart-count state only if safe.

After authentication:

* Refresh session-dependent queries.

After product mutations where relevant:

* Invalidate affected product/catalog queries.

Do not indiscriminately invalidate the entire query cache.

---

# 53. Optimistic Updates

Use optimistic updates only when safe.

Appropriate examples may include:

* Cart quantity changes
* UI preferences

For financial or inventory-sensitive operations, prefer authoritative server responses.

Every optimistic update must support rollback.

---

# 54. Notifications and Toasts

Use accessible notifications for:

* Cart updates
* Errors
* Successful account operations
* Session events

Do not rely exclusively on transient toast messages for important information.

Critical errors must remain visible.

---

# 55. Analytics Integration Boundary

Integrate with the backend analytics/business-event architecture only through safe frontend events where appropriate.

Potential client interaction events:

* Product viewed
* Search submitted
* Search suggestion selected
* Product added to cart
* Product removed from cart

Do not emit sensitive data unnecessarily.

Do not treat frontend analytics events as authoritative commerce events.

Order/payment/revenue events must originate from the backend.

---

# 56. Frontend Observability

Integrate with the repository's observability solution.

Capture appropriate:

* Route performance
* API latency
* Client errors
* Query failures
* Authentication failures
* Important user-flow failures

Never log:

* Passwords
* Tokens
* Payment credentials
* Sensitive personal data

Use request/correlation IDs where available.

---

# 57. Error Boundaries

Implement appropriate React/Next.js error boundaries.

Handle:

* Route-level failures
* Component failures
* API failures

Provide recovery actions.

Do not allow one component failure to destroy the entire application shell unnecessarily.

---

# 58. Authentication Testing

Test:

* Registration
* Login
* Logout
* Session restoration
* Expired session
* Unauthorized access
* Protected routes
* Invalid credentials
* Validation errors

Do not test only the happy path.

---

# 59. Catalog Testing

Test:

* Category loading
* Product loading
* Product not found
* Product variants
* Seller offers
* Pricing display
* Media failures
* Empty category
* Pagination

---

# 60. Search Testing

Test:

* Search submission
* Suggestions
* Debouncing
* Keyboard navigation
* Filters
* Sorting
* Pagination
* Empty results
* API failure
* Stale requests
* URL synchronization

---

# 61. Cart Testing

Test:

* Add to cart
* Remove item
* Quantity update
* Empty cart
* Price changes
* Inventory changes
* Seller-offer changes
* Anonymous cart
* Authenticated cart
* Cart merge where supported
* Server validation failures
* Duplicate submissions

---

# 62. Accessibility Testing

Test:

* Keyboard navigation
* Focus management
* Dialogs
* Menus
* Search autocomplete
* Forms
* Error announcements
* Screen-reader labels

Use the repository's accessibility testing tools if available.

---

# 63. Responsive Testing

Verify:

* Mobile widths
* Tablet widths
* Desktop widths
* Large displays

Pay particular attention to:

* Header
* Search
* Product grid
* Product detail
* Cart
* Navigation
* Dialogs
* Drawers

---

# 64. Browser Compatibility

Support the browsers defined by the repository's actual deployment target.

Do not introduce browser-specific APIs without appropriate compatibility handling.

---

# 65. Environment Configuration

Public frontend environment variables must contain only values safe to expose to browsers.

Never expose:

* Stripe secret keys
* Database credentials
* AWS secret keys
* Internal API credentials
* Provider secrets

Use server-side environment variables for secrets.

---

# 66. Type Safety

Maintain strict TypeScript typing.

Do not:

* Use `any` to bypass contract issues.
* Duplicate backend DTO definitions unnecessarily.
* Cast arbitrary API responses without validation.
* Ignore TypeScript errors.

If generated API types exist, reuse them.

If not, create consistent frontend API types based on actual contracts.

---

# 67. Backend Contract Integration

The frontend must consume the actual backend contracts present in the repository.

For each integration verify:

* HTTP method
* URL
* Authentication
* Request DTO
* Response DTO
* Error format
* Pagination
* Query parameters
* Validation
* Authorization

Do not invent endpoints.

If an expected endpoint does not exist, implement the frontend in a way that does not fake the missing functionality and clearly report the backend dependency.

---

# 68. No Fake Data

Do not use fake production data as a substitute for backend integration.

Development fixtures may be used only if the repository already has an established fixture/mock architecture.

Do not ship fake:

* Prices
* Inventory
* Reviews
* Seller information
* Orders
* Payment status
* Search results

---

# 69. SEO and Accessibility Validation

Validate:

* Page titles
* Metadata
* Canonicals
* Heading structure
* Alt text
* Link semantics
* Keyboard navigation
* Focus states
* Robots behavior

Public catalog pages should be discoverable.

Private customer/admin pages should not be indexed.

---

# 70. Build and Validation

Before considering this phase complete:

1. Run frontend build.
2. Run TypeScript validation.
3. Run lint.
4. Run unit tests.
5. Run component tests.
6. Run integration tests.
7. Run accessibility tests.
8. Run relevant E2E tests.
9. Validate responsive behavior.
10. Validate API integration.
11. Validate authentication.
12. Validate cart synchronization.
13. Validate search behavior.
14. Validate SEO metadata.
15. Inspect browser console for unexpected errors.
16. Inspect network requests for accidental secrets.
17. Validate production environment configuration.

Fix real issues.

Do not falsely claim successful validation.

---

# 71. What This Volume Must NOT Implement

Do not prematurely implement the complete remaining ecommerce frontend.

Defer unless already required by the repository:

* Full checkout UI
* Payment UI
* Order-history workflows
* Shipment tracking UI
* Returns UI
* Review submission/moderation UI
* Seller portal
* Administrator portal
* Advanced notification center
* Advanced account management
* Personalized recommendation UI
* Advanced analytics dashboards

These can be implemented in later frontend/mobile phases.

---

# 72. Final Repository Inspection

After implementation verify:

* The web app builds.
* Routes are coherent.
* Authentication works against actual backend contracts.
* Catalog pages use actual APIs.
* Search uses actual search APIs.
* Product pages use authoritative backend data.
* Cart uses authoritative backend state.
* No fake commerce data remains in production paths.
* No duplicate API/client/state architecture was introduced.
* No secrets are exposed.
* SEO is implemented correctly.
* Accessibility requirements are addressed.
* Responsive behavior is functional.
* Error/loading/empty states exist.
* Tests pass to the extent actually validated.

---

# 73. Final Implementation Report

At the end provide a factual report based only on the actual repository.

Include:

### Implemented

Actual frontend functionality implemented.

### Routes

Actual routes/pages created or modified.

### Components

Important reusable components created or modified.

### API Integration

Actual backend endpoints consumed.

### State Management

Actual TanStack Query/Zustand usage.

### Authentication

Actual authentication/session behavior.

### Catalog

Actual catalog/product/category functionality.

### Search

Actual search functionality.

### Cart

Actual cart functionality.

### SEO

Actual SEO implementation.

### Accessibility

Actual accessibility improvements/tests.

### Security

Actual frontend security protections.

### Tests

Actual tests and commands/results.

### Build

Actual build/typecheck/lint results.

### Remaining Work

Only genuinely incomplete functionality discovered in the repository.

Never claim functionality that was not actually implemented and validated.

---

# 74. Non-Negotiable Rules

* Inspect the repository first.
* The actual repository is the source of truth.
* This prompt is standalone.
* This is one implementation unit of one coherent ecommerce marketplace.
* Integrate with the existing backend.
* Do not create competing frontend architectures.
* Do not regenerate unchanged files.
* Do not invent backend endpoints.
* Do not use fake production data.
* Do not expose secrets.
* Do not trust client-side authorization.
* Do not duplicate authoritative backend state unnecessarily.
* Do not use floating-point calculations for authoritative money.
* Do not expose sensitive customer or seller information.
* Do not render unsafe arbitrary HTML.
* Do not put tokens/secrets in URLs.
* Do not rely solely on client-side route protection.
* Do not sacrifice accessibility for visual appearance.
* Do not sacrifice SEO for unnecessary client-side rendering.
* Do not sacrifice performance through unnecessary JavaScript.
* Do not use TODOs or placeholders instead of implementation.
* Do not falsely claim completion.
* Implement real production-grade functionality.
* Add real tests.
* Validate the actual repository.

Now inspect the repository and implement this entire **Web Frontend Foundation, Authentication, Catalog, Search, Product Pages, and Cart implementation unit** as a production-grade extension of the existing Amazon-style ecommerce marketplace.
