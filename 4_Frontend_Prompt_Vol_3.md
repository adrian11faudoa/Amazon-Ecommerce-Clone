# AMAZON ECOMMERCE PLATFORM — FRONTEND VOLUME 3 IMPLEMENTATION PROMPT

## ROLE

Act as a Principal Frontend Architect, Staff Frontend Engineer, UI/UX Engineer, Accessibility Engineer, Performance Engineer, Security Engineer, QA Engineer, and Technical Writer working together as a senior production engineering organization.

Your responsibility is to implement the seller, marketplace operations, administration, moderation, analytics, and advanced customer-facing frontend capabilities defined in this prompt as complete production-grade functionality inside the existing repository.

Do not behave as a teacher or provide a tutorial. Inspect the repository, understand its actual implementation state, implement the required functionality, integrate it with the existing application, validate it, and leave the repository in a coherent production-ready state.

---

# PROJECT

Build the advanced web application capabilities for a large-scale global Amazon-style ecommerce marketplace.

The platform supports:

* Millions of customers.
* Thousands of sellers and seller users.
* Millions of products and variants.
* Seller-managed catalogs.
* Inventory management.
* Pricing.
* Promotions.
* Orders.
* Fulfillment.
* Seller payouts.
* Customer reviews.
* Returns and refunds.
* Disputes.
* Moderation.
* Notifications.
* Platform administration.
* Operational analytics.
* Auditability.
* High-volume marketplace operations.

The frontend must provide separate, secure, role-aware experiences for:

* Customers.
* Sellers.
* Seller staff.
* Marketplace operators.
* Administrators.
* Moderators.
* Other explicitly authorized operational users.

The frontend must never rely on client-side role checks as the ultimate authorization mechanism.

The backend remains authoritative for:

* Identity.
* Roles.
* Permissions.
* Seller ownership.
* Catalog state.
* Inventory.
* Pricing.
* Orders.
* Payments.
* Payouts.
* Disputes.
* Moderation decisions.
* Platform configuration.
* Audit records.
* Analytics data.

---

# TECHNOLOGY DIRECTION

Use:

* Next.js 15+
* React 19+
* TypeScript with strict type safety
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand where client-owned state is appropriate
* React Hook Form
* Zod
* date-fns
* Recharts
* Framer Motion where appropriate
* REST/OpenAPI-compatible API integration
* WebSockets or SSE where justified by actual backend contracts

Reuse existing dependencies and application conventions whenever possible.

Do not introduce unnecessary frontend frameworks or competing state-management systems.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before implementation:

1. Inspect the complete existing web application.
2. Inspect customer-facing routes.
3. Inspect account functionality.
4. Inspect checkout and order functionality.
5. Inspect authentication/session infrastructure.
6. Inspect role and permission handling.
7. Inspect API clients and generated types.
8. Inspect existing shared components.
9. Inspect existing tables, forms, dialogs, charts, and data-display components.
10. Inspect TanStack Query configuration.
11. Inspect Zustand stores.
12. Inspect existing seller/admin routes if present.
13. Inspect existing testing infrastructure.
14. Inspect environment configuration without exposing secrets.
15. Inspect documentation.
16. Determine which seller, administration, moderation, analytics, and operational capabilities already exist.
17. Reuse compatible functionality rather than creating parallel systems.

Do not assume that functionality is absent merely because it is not visible from the top-level routing structure.

---

# IMPLEMENTATION SCOPE

Implement the advanced marketplace web platform covering:

1. Seller portal foundation.
2. Seller dashboard.
3. Seller profile and business information.
4. Seller user/team management.
5. Seller onboarding status.
6. Seller catalog management.
7. Product creation/editing.
8. Product variants.
9. Product media management.
10. Inventory management.
11. Pricing management.
12. Promotions management where supported.
13. Seller order management.
14. Seller fulfillment workflow.
15. Seller returns handling.
16. Seller payout and settlement views.
17. Seller disputes.
18. Seller notifications.
19. Seller operational analytics.
20. Administration portal foundation.
21. Role-aware administration.
22. User management.
23. Seller management.
24. Catalog moderation.
25. Review moderation.
26. Dispute management.
27. Platform configuration interfaces where supported.
28. Feature-flag interfaces where supported.
29. Operational dashboards.
30. Audit-log presentation.
31. Marketplace analytics.
32. Moderation and abuse-management interfaces.
33. Responsive and accessible operational UI.
34. Security hardening.
35. Performance optimization.
36. Testing.
37. Documentation.

Do not expose administrative capabilities to ordinary customers.

Do not expose one seller's private operational information to another seller.

---

# ROLE-AWARE APPLICATION ARCHITECTURE

Create a scalable route and navigation architecture for multiple marketplace roles.

Separate experiences logically for:

* Customer.
* Seller.
* Seller staff.
* Moderator.
* Administrator.

Implement reusable mechanisms for:

* Current-user context.
* Role information.
* Permission information.
* Navigation visibility.
* Protected routes.
* Unauthorized states.
* Session expiration.
* Role switching where explicitly supported.

Client-side route protection is a usability layer only.

Every sensitive operation must remain protected by backend authorization.

Do not duplicate authorization logic throughout individual components.

Centralize presentation-level permission checks while preserving backend enforcement.

---

# SELLER APPLICATION SHELL

Implement a professional seller portal shell.

Provide:

* Seller navigation.
* Dashboard.
* Catalog.
* Inventory.
* Orders.
* Returns.
* Payouts.
* Disputes.
* Analytics.
* Notifications.
* Seller settings.
* Team/user management where supported.

The seller application must have a different information architecture from the customer storefront.

Use responsive navigation appropriate for operational workflows.

Support:

* Desktop-first data management.
* Tablet usability.
* Mobile access for important operational actions.

Do not make complex seller tables unusable on smaller screens.

---

# SELLER DASHBOARD

Implement a seller dashboard that displays authoritative operational information.

Possible dashboard metrics include:

* Orders.
* Revenue.
* Sales volume.
* Pending fulfillment.
* Low-stock products.
* Returns.
* Payout status.
* Disputes.
* Product performance.
* Recent activity.

All values must originate from backend analytics or operational APIs.

Clearly identify:

* Time range.
* Currency.
* Data freshness.
* Loading state.
* Empty state.

Do not calculate financial metrics independently from authoritative backend data.

---

# SELLER ONBOARDING

Implement seller onboarding status and workflows supported by the backend.

Support appropriate presentation of:

* Seller application status.
* Required information.
* Verification status.
* Business information.
* Payout configuration status.
* Required compliance steps.
* Pending actions.
* Rejected actions.
* Completed steps.

Do not collect sensitive financial credentials unless the backend explicitly requires a secure provider-hosted flow.

Use secure external-provider redirects or hosted components where appropriate.

Never expose secrets through frontend state.

---

# SELLER PROFILE AND BUSINESS INFORMATION

Implement seller profile management.

Support:

* Business name.
* Public seller information.
* Contact information where authorized.
* Business address where supported.
* Seller policies.
* Storefront information.
* Other backend-defined seller metadata.

Separate public seller information from private operational information.

Use forms with React Hook Form and Zod.

Handle server-side validation and conflicts correctly.

---

# SELLER USER AND TEAM MANAGEMENT

Where supported, implement seller team management.

Support:

* Seller users.
* Invitations.
* Roles.
* Permission summaries.
* User status.
* Removing/deactivating users.
* Resending invitations.
* Appropriate confirmation dialogs.

Do not allow the frontend to grant permissions that the backend does not authorize.

Display role information supplied by the backend.

Prevent destructive operations from occurring accidentally.

---

# SELLER CATALOG MANAGEMENT

Implement production-grade seller catalog management.

Support:

* Product list.
* Product search.
* Filtering.
* Sorting.
* Pagination/cursor pagination.
* Product creation.
* Product editing.
* Product status.
* Product variants.
* Category assignment.
* Brand.
* Attributes.
* Media.
* Availability.
* Validation errors.

Use scalable data-table patterns.

Do not load millions of products into the browser.

Use backend filtering, sorting, and pagination.

---

# PRODUCT CREATION AND EDITING

Build robust product forms.

Support backend-defined catalog fields such as:

* Product title.
* Description.
* Category.
* Brand.
* Attributes.
* Variants.
* SKU.
* Product media.
* Seller-specific information.

Use dynamic forms when category attributes differ.

Use Zod for client-side validation where practical.

Backend validation remains authoritative.

Preserve unsaved changes where appropriate.

Warn users before navigating away from significant unsaved edits.

---

# PRODUCT VARIANTS

Implement variant-management UI.

Support:

* Variant creation.
* Variant editing.
* Variant attributes.
* SKU.
* Price.
* Inventory reference where applicable.
* Media association.
* Variant activation/deactivation.

Do not treat client-side variant combinations as authoritative inventory.

Avoid generating invalid combinations when the backend defines valid variant structures.

Use accessible dynamic form controls.

---

# SELLER MEDIA MANAGEMENT

Implement secure product-media workflows.

Support:

* Media selection.
* Upload initiation.
* Upload progress.
* Upload failure.
* Retry.
* Ordering.
* Primary-media selection.
* Removal.
* Processing state.
* Validation errors.

Use signed upload flows supplied by the backend.

Do not send large media files through application APIs when the architecture provides direct object-storage upload.

Treat all uploaded media as untrusted.

Never expose storage credentials.

Handle asynchronous processing states such as:

* Uploading.
* Processing.
* Ready.
* Failed.
* Rejected.

---

# INVENTORY MANAGEMENT

Implement seller inventory interfaces.

Support:

* Inventory listing.
* Search.
* Filtering.
* SKU.
* Available quantity.
* Reserved quantity where exposed.
* Available-to-sell quantity where exposed.
* Low-stock state.
* Out-of-stock state.
* Inventory adjustments.
* Bulk operations where supported.

Do not allow the UI to assume an inventory mutation succeeded before backend confirmation.

Display concurrency/conflict errors clearly.

Do not derive authoritative available inventory entirely in the browser.

---

# PRICING MANAGEMENT

Implement seller pricing interfaces.

Support backend-authorized capabilities such as:

* Current price.
* Previous price.
* Currency.
* Variant-specific pricing.
* Scheduled pricing where supported.
* Price status.
* Bulk price updates where supported.

Use exact values supplied by the backend.

Do not use floating-point arithmetic for financial calculations where the browser must perform presentation-level calculations.

Clearly display currency.

Prevent accidental price changes through confirmation where appropriate.

---

# PROMOTIONS MANAGEMENT

Where seller promotions are supported, implement:

* Promotion listing.
* Creation.
* Editing.
* Activation/deactivation.
* Eligibility summary.
* Start/end dates.
* Product/category scope.
* Discount presentation.
* Usage limits where applicable.
* Validation errors.

Do not duplicate promotion-engine rules.

The backend determines eligibility and final discount behavior.

---

# SELLER ORDER MANAGEMENT

Implement seller-facing order management.

Support:

* Order list.
* Search.
* Filtering.
* Sorting.
* Status.
* Date range.
* Customer-safe information.
* Seller order grouping.
* Order details.
* Items.
* Quantities.
* Fulfillment state.
* Shipping information.
* Actions authorized for the seller.

Do not expose unrelated sellers' order information.

Use cursor/paginated APIs.

Do not load an unbounded order history.

---

# SELLER FULFILLMENT

Implement seller fulfillment workflows according to backend capabilities.

Support:

* Orders requiring fulfillment.
* Fulfillment status.
* Shipment creation where supported.
* Carrier selection.
* Tracking information.
* Shipment confirmation.
* Failed fulfillment.
* Cancellation interactions.
* Return interactions.

Do not mark an order fulfilled solely because a frontend action was clicked.

Refresh authoritative backend state after mutations.

---

# SELLER RETURNS

Implement seller return-management interfaces.

Support:

* Return requests.
* Return reason.
* Order/item information.
* Return status.
* Seller-authorized actions.
* Return decisions where permitted.
* Refund-related status.
* Customer communication where supported.

Do not allow sellers to access returns belonging to another seller.

Do not expose unnecessary customer personal information.

---

# SELLER PAYOUTS AND SETTLEMENTS

Implement seller-facing payout and financial reporting views.

Support backend-provided information such as:

* Gross sales.
* Platform fees.
* Discounts.
* Refunds.
* Chargebacks/disputes.
* Shipping.
* Taxes where applicable.
* Net seller amount.
* Payout status.
* Payout dates.
* Provider references where safe to expose.

Financial records must be displayed as authoritative backend values.

Do not reconstruct payout calculations independently in the browser.

Provide appropriate currency and date formatting.

Historical financial values must remain tied to backend settlement snapshots.

---

# SELLER DISPUTES

Implement seller dispute-management UI where supported.

Support:

* Dispute list.
* Dispute details.
* Status.
* Related order.
* Related item.
* Evidence submission where authorized.
* Communication/status history where supported.
* Resolution information.

Treat uploaded evidence as untrusted content.

Use secure upload mechanisms.

Do not expose confidential internal moderation information unless authorized.

---

# SELLER ANALYTICS

Implement operational seller analytics using backend-provided data.

Support charts and summaries for metrics such as:

* Sales.
* Orders.
* Revenue.
* Product performance.
* Conversion-related metrics where available.
* Inventory trends.
* Returns.
* Payouts.

Use Recharts where appropriate.

Charts must:

* Have accessible labels.
* Have useful empty states.
* Display loading states.
* Handle large date ranges.
* Avoid unnecessary client-side aggregation of large datasets.
* Clearly display currency and units.

Prefer backend aggregation for large datasets.

---

# ADMINISTRATION APPLICATION

Implement the foundation of the administration portal.

Support appropriate areas for:

* Dashboard.
* Users.
* Sellers.
* Catalog.
* Moderation.
* Reviews.
* Disputes.
* Orders.
* Platform configuration.
* Feature flags.
* Audit logs.
* Analytics.
* Operational health.

All admin routes must be strongly protected by backend authorization.

Do not expose administration links merely because a user has a matching string in client state.

---

# ADMIN USER MANAGEMENT

Implement authorized administrative user management.

Support backend-defined capabilities such as:

* User search.
* User status.
* Account state.
* Roles.
* Relevant activity.
* Account restrictions where authorized.
* Administrative actions.

Use confirmation dialogs for destructive operations.

Display audit-relevant consequences clearly.

Never expose authentication secrets.

---

# SELLER ADMINISTRATION

Implement administrative seller management.

Support:

* Seller search.
* Seller status.
* Onboarding state.
* Verification state.
* Catalog status.
* Operational health.
* Dispute status.
* Payout state where authorized.
* Administrative actions.

Separate seller public information from sensitive internal information.

Use pagination and server-side filtering.

---

# MODERATION

Implement marketplace moderation interfaces.

Support appropriate moderation workflows for:

* Products.
* Reviews.
* User-generated content.
* Seller content.
* Reports.
* Abuse cases.

Display:

* Content.
* Reporter information where authorized.
* Current status.
* Moderation history where authorized.
* Available actions.
* Action confirmation.
* Result.

Treat all user-generated content as untrusted.

Do not render arbitrary HTML without secure sanitization.

---

# ABUSE AND RISK INTERFACES

Where backend risk/abuse systems expose frontend capabilities, provide operational interfaces for:

* Risk flags.
* Suspicious activity.
* Account restrictions.
* Review abuse.
* Coupon abuse.
* Payment-risk status where appropriate.
* Investigation state.

Do not expose internal risk algorithms or sensitive scoring information to unauthorized users.

Use backend-provided classifications.

---

# DISPUTE ADMINISTRATION

Implement administrative dispute management.

Support:

* Dispute queue.
* Filtering.
* Status.
* Priority.
* Related customer/seller/order.
* Evidence.
* Timeline.
* Resolution.
* Administrative notes where supported.
* Audit history.

Do not permit unauthorized modifications.

Ensure destructive or consequential actions require deliberate confirmation.

---

# PLATFORM CONFIGURATION

Where supported by the backend, implement administrative configuration interfaces for platform-controlled settings.

Potential capabilities include:

* Feature flags.
* Marketplace settings.
* Notification settings.
* Operational configuration.
* Catalog configuration.
* Promotion configuration.

Configuration interfaces must:

* Clearly display current values.
* Validate changes.
* Show effective state.
* Handle concurrent changes.
* Require appropriate permissions.
* Confirm consequential modifications.

Do not expose infrastructure secrets or credentials.

---

# FEATURE FLAGS

Implement administrative feature-flag interfaces where supported.

Display:

* Flag name.
* Description.
* Current state.
* Scope.
* Environment where relevant.
* Rollout information where supported.

Require confirmation for changes with broad impact.

Never hardcode production feature-flag values in the frontend.

---

# AUDIT LOGS

Implement an administrative audit-log viewer.

Support:

* Event type.
* Actor.
* Timestamp.
* Resource.
* Action.
* Outcome.
* Correlation identifier where exposed.
* Relevant metadata.

Use server-side pagination and filtering.

Do not allow the frontend to fabricate or modify audit records.

Protect sensitive metadata.

---

# OPERATIONAL DASHBOARDS

Implement administrative operational dashboards using backend-provided metrics.

Possible metrics include:

* Orders.
* Payments.
* Failed operations.
* Queue activity.
* Seller activity.
* Customer activity.
* Search health.
* Catalog health.
* Returns.
* Disputes.
* System error trends.

Clearly distinguish:

* Business metrics.
* Operational metrics.
* Data freshness.

Do not present stale data as real-time.

---

# ANALYTICS ARCHITECTURE

Integrate frontend analytics with backend-generated analytics APIs.

Support:

* Time-range selection.
* Filtering.
* Charts.
* Tables.
* Export actions where supported.
* Loading.
* Empty states.
* Error handling.

Do not download massive datasets merely to aggregate them in the browser.

Prefer backend aggregation.

Do not expose analytics outside the user's authorization boundary.

---

# TABLE AND DATA-DENSE UI

Establish reusable production-grade data-table patterns.

Tables must support where appropriate:

* Server-side pagination.
* Sorting.
* Filtering.
* Column visibility.
* Responsive presentation.
* Row actions.
* Bulk actions.
* Selection.
* Loading.
* Empty states.
* Error states.

Avoid rendering thousands of complex rows unnecessarily.

Use virtualization when genuinely necessary and compatible with interaction requirements.

Ensure tables remain accessible.

---

# BULK OPERATIONS

Where backend contracts support bulk operations, implement safe bulk workflows.

Support:

* Selection.
* Select-all semantics.
* Backend-defined limits.
* Progress.
* Partial success.
* Failure reporting.
* Retry where safe.

Never assume a bulk operation is atomic unless the backend contract explicitly guarantees it.

Clearly communicate partial success.

---

# SECURITY

Apply strict role-aware frontend security.

Protect against:

* Unauthorized route access.
* Privilege escalation through client manipulation.
* IDOR.
* Sensitive data exposure.
* XSS through marketplace content.
* Unsafe file handling.
* Open redirects.
* Token leakage.
* Sensitive local storage.
* Malicious query parameters.

Never trust client-side role information.

Never expose:

* Secrets.
* Provider credentials.
* Private customer information outside authorization.
* Internal security mechanisms.
* Unnecessary payment information.

All sensitive actions must be backed by server-side authorization.

---

# PERFORMANCE

Optimize operational interfaces for large datasets.

Use:

* Server-side pagination.
* Server-side filtering.
* Server-side aggregation.
* Efficient query caching.
* Targeted invalidation.
* Code splitting.
* Lazy-loaded administrative areas.
* Efficient tables.
* Controlled chart rendering.
* Memoization only where useful.

Do not render large datasets unnecessarily.

Do not preload entire seller/admin applications for ordinary customers.

Keep public storefront performance isolated from heavy operational functionality.

---

# ACCESSIBILITY

All seller and administrative interfaces must be accessible.

Ensure:

* Keyboard navigation.
* Focus management.
* Accessible tables.
* Accessible filters.
* Accessible dialogs.
* Accessible forms.
* Accessible charts or equivalent tabular summaries.
* Accessible status messages.
* Proper heading hierarchy.
* Reduced motion.
* Screen-reader-friendly bulk actions.

Do not rely exclusively on color for status.

---

# RESPONSIVE DESIGN

Seller and administrative applications must remain usable on smaller screens.

Prioritize responsive support for:

* Dashboard summaries.
* Orders.
* Inventory.
* Product editing.
* Notifications.
* Important administrative actions.

Where extremely data-dense interfaces cannot reasonably fit on mobile, provide an intentional responsive transformation rather than simply overflowing the viewport.

---

# OBSERVABILITY

Instrument important frontend operational failures.

Track appropriate events such as:

* Seller API failures.
* Product-save failures.
* Inventory-update failures.
* Order-management failures.
* Payout-view failures.
* Administrative action failures.
* Moderation failures.
* Permission failures.
* Route failures.

Never send secrets or sensitive customer data to telemetry.

Use correlation identifiers where available.

---

# TESTING

Implement comprehensive testing for:

* Role-aware routing.
* Permission presentation.
* Seller dashboard.
* Seller product management.
* Product editing.
* Media management.
* Inventory management.
* Pricing.
* Orders.
* Fulfillment.
* Returns.
* Payout presentation.
* Disputes.
* Seller analytics.
* Administration.
* Moderation.
* Audit logs.
* Feature flags.
* Operational dashboards.
* Bulk operations.
* Error states.
* Accessibility-critical workflows.

Include integration and end-to-end tests for critical seller and administrative workflows where supported.

Test unauthorized and forbidden scenarios explicitly.

---

# DOCUMENTATION

Update documentation covering:

* Seller application architecture.
* Administrative application architecture.
* Role-aware routing.
* Permission presentation.
* Data-table conventions.
* Bulk-operation conventions.
* Media-upload architecture.
* Analytics conventions.
* Moderation architecture.
* Audit-log handling.
* Testing strategy.
* Security boundaries.
* Local development and testing.

Document actual behavior only.

---

# IMPLEMENTATION BOUNDARIES

Do not redesign backend authorization.

Do not create client-only roles.

Do not create fake analytics data.

Do not calculate authoritative financial metrics independently.

Do not create fake seller operations.

Do not bypass backend moderation.

Do not expose administrative capabilities through client-only checks.

Do not store secrets in frontend code.

Do not create a competing API architecture.

Do not introduce an alternative state-management architecture merely for seller/admin screens.

---

# ABSOLUTE IMPLEMENTATION RULES

The implementation must contain:

* No pseudo-code.
* No placeholders.
* No TODO comments.
* No FIXME comments.
* No fake APIs.
* No fake analytics.
* No hardcoded secrets.
* No hardcoded credentials.
* No incomplete workflows.
* No omitted implementations.
* No knowingly broken TypeScript.
* No knowingly broken builds.
* No unauthorized data exposure.
* No duplicate competing implementations.
* No insecure permission assumptions.
* No “implement similarly.”
* No “remaining code omitted.”
* No “left as an exercise.”
* No “for brevity.”

Every implemented workflow must have complete success, loading, failure, and recovery behavior.

Every sensitive action must be treated as backend-authorized.

Every large dataset must use appropriate server-side data access patterns.

---

# REPOSITORY COMPATIBILITY

Integrate with the existing repository.

Preserve compatible:

* Routing.
* Authentication.
* Authorization presentation.
* API clients.
* Query infrastructure.
* UI components.
* Forms.
* Tables.
* Charts.
* Testing.
* Observability.

Do not create competing seller or administration shells if compatible implementations already exist.

Do not rewrite unrelated customer functionality.

Ensure the customer, seller, and administrative experiences remain one coherent application architecture.

---

# VALIDATION AND COMPLETION

Before completion:

* Run formatting.
* Run linting.
* Run TypeScript checks.
* Run unit tests.
* Run integration tests.
* Run end-to-end tests where available.
* Validate role-aware routing.
* Validate seller access boundaries.
* Validate administrative access boundaries.
* Validate product management.
* Validate inventory.
* Validate pricing.
* Validate seller orders.
* Validate fulfillment.
* Validate returns.
* Validate payouts.
* Validate disputes.
* Validate moderation.
* Validate audit logs.
* Validate feature flags.
* Validate analytics.
* Validate bulk operations.
* Validate responsive layouts.
* Validate accessibility-critical workflows.
* Validate production build.
* Confirm no secrets were introduced.
* Confirm no incomplete markers remain.
* Confirm documentation matches implementation.

Fix discovered problems before declaring completion.

---

# IMPLEMENTATION REPORT

After implementation, provide:

1. Seller portal functionality implemented.
2. Catalog and inventory functionality implemented.
3. Seller order and fulfillment functionality implemented.
4. Seller financial/dispute functionality implemented.
5. Administrative functionality implemented.
6. Moderation functionality implemented.
7. Analytics and operational functionality implemented.
8. Files created.
9. Files modified.
10. API contracts consumed.
11. Role/permission integration.
12. Tests executed.
13. Validation commands executed.
14. Genuine repository constraints.

Report only actual implementation results.

---

# FINAL DIRECTIVE

Inspect the repository first.

Then implement the complete production-grade seller, marketplace operations, administration, moderation, analytics, and operational frontend scope defined by this prompt.

Build these experiences as secure, role-aware, scalable parts of one coherent ecommerce application.

Use backend APIs as the authority for permissions, business state, financial information, inventory, orders, moderation, and analytics.

Do not stop at scaffolding.

Do not provide a conceptual proposal instead of implementation.

Implement the actual code, integrate it with the existing repository, validate it thoroughly, fix discovered issues, update documentation, and leave the application in a working production-grade state.
