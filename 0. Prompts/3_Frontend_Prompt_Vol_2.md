# Amazon-Style Ecommerce Marketplace — Frontend Prompt — Volume 2

# ROLE

You are the Staff Frontend Engineering team responsible for implementing the customer shopping journey from cart through checkout and payment initiation for a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Frontend Engineer
* UI/UX Engineer
* Performance Engineer
* Accessibility Engineer
* Security Engineer
* QA Engineer
* Technical Documentation Engineer

This is a bounded frontend implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future frontend domains merely because they belong to the completed ecommerce platform.

Do not implement backend, mobile, production infrastructure, or unrelated QA-platform work outside the frontend testing required by this milestone.

# PROJECT

The project is an original production-grade ecommerce marketplace intended to support:

* millions of customers;
* thousands of sellers;
* large product catalogs;
* seller organizations and seller staff;
* products;
* product variants and SKUs;
* seller offers;
* inventory;
* pricing;
* promotions;
* shopping carts;
* checkout;
* payments;
* orders;
* fulfillment;
* shipping;
* returns;
* refunds;
* reviews;
* notifications;
* seller operations;
* administration;
* moderation;
* fraud and abuse prevention;
* search and discovery;
* recommendations;
* analytics;
* high traffic;
* asynchronous processing;
* large media volumes;
* high availability;
* horizontal scalability;
* disaster recovery.

The web application technology direction is:

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod
* date-fns
* Recharts
* Framer Motion

The backend remains authoritative for:

* cart ownership;
* inventory;
* pricing;
* promotions;
* checkout state;
* payment state;
* authorization;
* order creation.

The frontend must never treat client-side state as the authoritative source for these values.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* storefront shell;
* authentication;
* API client;
* shared UI;
* TanStack Query;
* Zustand;
* customer account;
* product pages;
* search;
* category pages;
* cart functionality;
* checkout functionality;
* existing payment integration;
* route structure;
* shared types;
* API contracts;
* tests;
* environment configuration.

The repository is authoritative for what actually exists.

Do not assume an earlier frontend or backend prompt was executed.

Do not invent API endpoints that are not present or contractually defined.

Where the repository contains compatible functionality:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate implementations;
* maintain existing behavior.

# CURRENT EXECUTION SCOPE

Implement the complete customer shopping-cart and checkout web experience.

This milestone includes:

* product-to-cart interaction;
* cart drawer/page;
* cart item management;
* quantity controls;
* seller grouping;
* cart validation states;
* stale-price handling;
* unavailable-item handling;
* cart persistence;
* anonymous cart behavior where supported;
* authenticated cart synchronization;
* cart merge behavior;
* checkout route;
* checkout step architecture;
* address selection/management required by checkout;
* shipping-method presentation;
* promotion entry;
* tax/shipping/discount summary presentation;
* authoritative checkout recalculation;
* inventory-reservation state presentation;
* checkout failure handling;
* payment initiation UI;
* secure payment-provider client integration where required;
* checkout confirmation boundary;
* responsive/mobile-web checkout;
* accessibility;
* analytics;
* error and recovery behavior;
* tests.

The backend remains responsible for the authoritative checkout, inventory, pricing, promotion, and payment logic.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete order-history/account-order UI;
* complete returns/refunds UI;
* seller portal;
* platform administration;
* review management;
* recommendation dashboards;
* mobile React Native application;
* production infrastructure;
* backend order/payment implementation;
* direct database access from the frontend.

Do not build a parallel checkout engine in the browser.

# SHOPPING FLOW ARCHITECTURE

The shopping journey must support:

```text
Product
  ↓
Cart
  ↓
Cart validation
  ↓
Checkout
  ↓
Address
  ↓
Shipping
  ↓
Promotion
  ↓
Price/tax/total validation
  ↓
Payment initiation
  ↓
Checkout result
```

The exact steps may vary according to the verified backend contract.

Do not create unnecessary steps solely for visual completeness.

# CART ARCHITECTURE

Use TanStack Query for server-owned cart state.

Use local component/state primitives only for transient UI state such as:

* drawer open/closed;
* quantity-input editing;
* temporary confirmation;
* local interaction state.

Do not maintain a second authoritative cart in Zustand.

# CART API INTEGRATION

Integrate with the verified backend cart contracts.

Support operations equivalent to:

* get cart;
* add item;
* update quantity;
* remove item;
* clear cart where supported.

The frontend must:

* send stable product/offer identifiers;
* send requested quantities;
* handle server validation;
* invalidate/update cached cart data after mutation;
* handle concurrency conflicts.

Do not send client-calculated prices as authoritative values.

# ADD-TO-CART

Implement add-to-cart behavior from product surfaces.

Support:

* variant selection where required;
* quantity selection;
* mutation loading state;
* success feedback;
* API errors;
* unavailable-item errors;
* authentication requirements where applicable.

Do not show a successful add-to-cart result until the backend confirms success.

# CART FEEDBACK

After a successful mutation, provide clear feedback through the established UI system.

Possible presentation includes:

* cart drawer update;
* toast;
* inline confirmation.

Do not create a separate notification framework solely for cart operations.

# CART DRAWER

Implement a responsive cart drawer when the application's navigation model supports it.

The drawer should provide:

* current cart contents;
* quantities;
* prices;
* subtotal;
* item removal;
* link to full cart;
* checkout entry point.

Do not load the entire checkout inside the drawer.

# CART PAGE

Implement the full cart page.

Include:

* seller grouping where the backend returns seller boundaries;
* product image;
* title;
* variant;
* seller;
* quantity;
* current price;
* line subtotal;
* availability state;
* stale-price state;
* removal;
* subtotal;
* discount summary where available;
* checkout action.

Do not calculate authoritative totals independently when the backend provides them.

# SELLER GROUPING

For marketplace carts containing multiple sellers:

* visually separate seller groups;
* preserve backend ownership boundaries;
* avoid implying one seller fulfills another seller's items;
* handle seller-specific fulfillment/shipping messaging where returned by the API.

Do not invent seller capabilities not represented by backend data.

# CART QUANTITY CONTROL

Quantity controls must:

* validate locally for obvious input errors;
* remain bounded;
* use accessible buttons/labels;
* handle pending mutation state;
* reconcile with the server response.

Do not allow rapid user interaction to create overlapping mutations that can produce stale client state.

Use mutation serialization or cancellation/reconciliation patterns where needed.

# CART CONFLICT HANDLING

Handle backend conflicts such as:

* stale cart revision;
* item no longer available;
* quantity no longer permitted;
* seller offer unavailable.

Display a clear recovery state.

Refresh authoritative cart data before allowing the customer to continue.

Do not silently overwrite a newer server state.

# CART STALE DATA

The cart may contain:

* price changes;
* unavailable products;
* changed variants;
* unavailable sellers.

Show these clearly.

The customer must be able to understand what changed before proceeding to checkout.

Do not silently charge a previously displayed price.

# ANONYMOUS CARTS

If the backend supports anonymous carts:

* use the backend-issued cart/session identity;
* persist only the minimum client state needed;
* do not store sensitive authorization tokens insecurely;
* reconcile the anonymous cart after login.

If anonymous carts are not supported by the backend:

* follow the backend contract;
* do not invent client-only persistence that pretends to be server-backed.

# CART MERGE AFTER LOGIN

Where supported, implement the anonymous-to-authenticated cart merge.

The UI must correctly handle:

* duplicate items;
* quantity conflicts;
* unavailable items;
* server rejection;
* updated totals.

After merge, invalidate/refetch the canonical authenticated cart.

Do not attempt to reproduce backend merge logic on the client.

# CART PERSISTENCE

Use TanStack Query cache for short-lived view persistence.

Persistent anonymous-cart support must follow the backend contract.

Do not store sensitive checkout state or payment credentials in localStorage.

# CHECKOUT ROUTE

Create a dedicated checkout route using the application's established routing architecture.

The route must:

* load the current checkout/cart state;
* prevent unauthorized access;
* handle empty cart;
* handle expired checkout;
* handle unavailable items;
* handle server validation;
* preserve safe progress where possible.

# CHECKOUT STATE

Model checkout UI state separately from authoritative checkout state.

Server state may include:

* checkout ID;
* cart snapshot;
* pricing;
* discounts;
* shipping;
* taxes;
* total;
* expiration;
* current step/state;
* payment state.

Local UI state may include:

* selected presentation tab;
* open address selector;
* local form editing;
* confirmation dialogs.

Do not duplicate server state into an unrelated client store.

# CHECKOUT STEP ARCHITECTURE

Create a modular checkout composition.

Possible steps include:

1. customer/address;
2. shipping;
3. promotions;
4. order summary;
5. payment;
6. review/confirmation.

The exact sequence must match the verified backend contract.

Do not force every transaction through unnecessary multi-page navigation.

# CHECKOUT CONTINUITY

If a checkout is refreshed:

* restore it from the backend;
* do not reconstruct authoritative checkout state from browser memory;
* handle expiration clearly.

Do not persist payment credentials in local storage or application state beyond what the payment provider explicitly permits.

# ADDRESS MANAGEMENT

Implement the address selection/management required by checkout.

Support, as applicable:

* saved addresses;
* selecting an existing address;
* adding an address;
* editing an address;
* deleting an address where the backend permits it;
* validation;
* default-address behavior.

Do not implement an independent address database in the browser.

# ADDRESS FORM

Use React Hook Form and Zod for local validation where appropriate.

Validate:

* required fields;
* field lengths;
* postal/region formats where appropriate;
* country;
* phone where required.

The backend remains authoritative.

Map backend field-level errors into the form.

# ADDRESS PRIVACY

Do not expose addresses unnecessarily in:

* analytics;
* logs;
* error reports;
* URL parameters;
* browser storage.

Never include full addresses in analytics events unless the project's privacy architecture explicitly requires a minimized form.

# SHIPPING OPTIONS

Display shipping methods returned by the backend.

Show, where available:

* service name;
* delivery estimate;
* price;
* availability;
* restrictions.

Do not calculate authoritative shipping price in the frontend.

Do not hardcode carrier behavior.

# SHIPPING SELECTION

When the customer selects shipping:

* submit the selection to the backend;
* display pending state;
* update checkout state;
* refresh authoritative totals.

Do not update the order total solely through local arithmetic.

# SHIPPING FAILURE

Handle:

* unavailable shipping method;
* rate expiration;
* provider failure;
* changed shipping cost;
* invalid address.

Require the customer to choose a valid alternative when necessary.

# PROMOTION UI

Implement checkout promotion entry where supported.

Support:

* code entry;
* apply;
* remove;
* loading;
* invalid-code state;
* expired promotion state;
* ineligible-product state;
* usage-limit state.

Do not calculate promotion eligibility in the client.

# PROMOTION FEEDBACK

Display backend-provided promotion results clearly.

Do not expose internal promotion rules or fraud controls.

Do not reveal sensitive eligibility logic unnecessarily.

# AUTHORITATIVE CHECKOUT TOTALS

The summary must display totals from the backend.

Where useful, display:

* subtotal;
* discounts;
* shipping;
* taxes;
* total;
* currency.

Do not calculate an independent "final" total on the client.

Local arithmetic may be used only for presentation helpers where it cannot change the authoritative result.

# MONEY FORMATTING

Use centralized currency formatting.

Respect:

* ISO currency code;
* locale;
* precision;
* negative/refund values where displayed.

Do not use floating-point arithmetic to produce authoritative values.

# CHECKOUT REVALIDATION

The frontend must expect the backend to revalidate:

* price;
* promotion;
* inventory;
* shipping;
* taxes.

If the backend returns a changed total:

* explain the change;
* refresh relevant UI;
* require customer acknowledgement where appropriate.

Do not silently proceed using stale values.

# INVENTORY RESERVATION STATE

Where the backend exposes inventory-reservation state:

* show appropriate progress;
* distinguish waiting from failure;
* handle expiration;
* avoid promising permanent stock availability.

Do not display "guaranteed" inventory merely because the cart previously showed availability.

# CHECKOUT EXPIRATION

Handle expired checkout state.

Provide a clear path to:

* refresh checkout;
* rebuild checkout;
* return to cart.

Do not allow the payment step to continue using expired checkout state.

# CHECKOUT CONCURRENCY

If checkout can become stale due to another browser/device session:

* handle conflict responses;
* reload authoritative state;
* inform the user.

Do not overwrite newer server data.

# PAYMENT INTEGRATION

Integrate with the verified payment contract.

Where a provider such as Stripe is used, use its supported browser/client primitives.

Never expose:

* secret API keys;
* webhook secrets;
* private signing keys.

Only publish client-safe provider configuration intended for browser use.

# PAYMENT FLOW

The browser must not directly decide payment success.

The typical flow should resemble:

```text
Checkout
  ↓
Backend creates/updates payment intent
  ↓
Frontend invokes secure provider UI/SDK
  ↓
Provider result
  ↓
Backend remains authoritative
  ↓
Frontend refreshes checkout/payment state
```

The exact flow must match the actual backend contract.

# PAYMENT FAILURE HANDLING

Handle:

* declined payment;
* authentication-required flow;
* expired payment intent;
* network failure;
* provider error;
* duplicate submission;
* checkout expiration.

Do not blindly retry payment creation.

Use the backend's idempotency strategy.

# PAYMENT AUTHENTICATION

Where additional customer authentication is required by the payment provider:

* use the provider's supported secure client flow;
* preserve accessibility;
* display clear progress;
* prevent duplicate submissions.

Do not implement custom payment authentication.

# PAYMENT DATA SECURITY

Never store:

* card numbers;
* CVV;
* payment-provider secret keys;
* raw payment credentials;

in application state, localStorage, cookies not controlled by the provider, analytics, or logs.

Use hosted/provider-secure UI where appropriate.

# PAYMENT RESULT

After payment interaction:

* refresh authoritative checkout/payment state;
* display pending status if asynchronous;
* display failure only when definitively reported;
* navigate to the correct result state.

Do not assume client callback success means the order is confirmed.

# SUBMISSION GUARDING

The payment/checkout submit action must prevent accidental duplicate submissions.

Use:

* disabled button while in-flight;
* submission state;
* backend idempotency;
* reconciliation after timeout.

Do not rely solely on button disabling.

# CHECKOUT ERROR CLASSIFICATION

Handle errors such as:

* unauthorized;
* cart changed;
* stale price;
* unavailable inventory;
* shipping unavailable;
* invalid promotion;
* expired checkout;
* payment failure;
* rate limit;
* provider unavailable;
* unexpected failure.

Each should have an appropriate recovery path.

# RECOVERY UX

When a checkout operation fails:

* preserve safe user input where possible;
* do not lose the cart unnecessarily;
* allow retry only when safe;
* refetch authoritative state;
* clearly explain what changed.

Avoid forcing users to restart an entire checkout for recoverable errors.

# ACCESSIBILITY

Checkout must meet strong accessibility expectations.

Support:

* proper heading hierarchy;
* form labels;
* error association;
* keyboard navigation;
* focus management;
* accessible progress/step state;
* screen-reader feedback;
* sufficient contrast;
* reduced motion.

Critical errors must be announced appropriately.

# RESPONSIVE CHECKOUT

Checkout must be usable on mobile web as well as desktop.

Ensure:

* accessible controls;
* readable totals;
* sticky summary behavior only where it does not obscure content;
* usable payment UI;
* touch targets;
* no horizontal overflow.

# PERFORMANCE

Optimize checkout for reliability over decorative complexity.

Avoid:

* unnecessary client-side JavaScript;
* large bundles;
* duplicate data fetching;
* repeated checkout queries;
* excessive animations.

Critical checkout actions should remain responsive under slow networks.

# NETWORK RESILIENCE

Handle temporary network failures.

The client should:

* detect request failure;
* avoid destructive automatic retries;
* provide safe retry;
* refetch authoritative state after uncertain mutations.

For payment operations, use backend idempotency/reconciliation rather than blind browser retries.

# STATE INVALIDATION

After cart or checkout mutations:

* invalidate affected queries;
* update dependent cached state;
* prevent stale summaries.

Do not manually patch multiple independent caches when refetching the authoritative resource is safer.

# NAVIGATION GUARDING

Prevent accidental navigation away from an in-progress checkout where appropriate.

Do not create aggressive browser dialogs that unnecessarily disrupt users.

Do not block navigation when the checkout is already safely persisted and there is no risk.

# CHECKOUT ANALYTICS

Instrument appropriate events such as:

* cart viewed;
* add-to-cart;
* cart item updated;
* checkout started;
* address selected;
* shipping selected;
* promotion applied;
* payment initiated;
* payment result;
* checkout completed/failed.

Do not include:

* card data;
* security tokens;
* full addresses;
* arbitrary form contents.

Use stable anonymous/user references according to the project's privacy model.

# CUSTOMER NOTIFICATIONS IN CHECKOUT

Do not send notifications directly from the frontend.

The frontend may trigger business actions through the backend.

The backend owns notification events and delivery.

# ERROR REPORTING

Frontend error monitoring must exclude:

* payment credentials;
* access tokens;
* refresh tokens;
* full address data;
* sensitive form fields.

Use sanitized context.

# TESTING

Create meaningful tests.

## Cart

Test:

* add item;
* update quantity;
* remove item;
* seller grouping;
* unavailable item;
* stale price;
* server conflict;
* anonymous cart behavior where supported;
* cart merge after login.

## Checkout

Test:

* route protection;
* checkout initialization;
* empty cart;
* address selection;
* shipping selection;
* promotion application;
* total refresh;
* inventory failure;
* checkout expiration;
* stale checkout;
* retry behavior.

## Payment

Test:

* payment initiation;
* provider-client integration boundary;
* duplicate submission prevention;
* payment-required authentication flow where supported;
* provider failure;
* pending payment;
* authoritative result refresh.

Do not test payment success merely by mocking a local flag if the important behavior is backend state reconciliation.

## Accessibility

Test:

* keyboard checkout;
* labels;
* focus;
* error association;
* dialogs;
* progress state.

## Responsive Behavior

Test critical flows at representative desktop and mobile-web dimensions.

# END-TO-END TESTS

Where the repository supports browser E2E testing, implement flows for:

* product → cart;
* cart mutation;
* cart → checkout;
* checkout address;
* checkout shipping;
* checkout promotion;
* payment initiation boundary;
* error recovery.

Do not fabricate live payment success if external provider credentials are unavailable.

Use provider-supported test environments where available.

# SECURITY TESTS

Verify:

* cart ownership;
* checkout ownership;
* unauthorized API responses;
* no secrets in browser bundles;
* no sensitive values in URLs;
* no payment credentials in telemetry;
* no client-side authorization bypass.

# SEO

Transactional pages such as checkout generally should not be indexed.

Use appropriate:

* robots directives;
* metadata;
* route controls.

Public catalog pages should retain the SEO behavior established by the first frontend volume.

# DOCUMENTATION

Update documentation for:

* cart state management;
* checkout architecture;
* API integration;
* payment-client integration;
* environment variables;
* provider-safe configuration;
* testing;
* E2E setup;
* accessibility behavior;
* analytics events.

Documentation must accurately describe the actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake cart persistence;
* fake checkout totals;
* fake inventory availability;
* fake payment success;
* static shipping rates;
* fake promotion validation;
* placeholder APIs;
* TODO implementation gaps;
* pseudo-code;
* "implement later".

Use actual backend contracts.

Where a required backend capability is unavailable, report the integration dependency rather than fabricating success.

# NO HARDCODED SECRETS

Never put:

* payment secret keys;
* backend private credentials;
* JWT signing secrets;
* webhook secrets;
* database credentials;

into client-accessible configuration.

Never embed secrets in source code.

# VALIDATION

Before completion, run applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit/component tests;
* accessibility tests;
* browser E2E;
* production build;
* route validation;
* API integration tests where possible.

Where payment-provider live testing is unavailable:

* use official test-mode/client behavior where available;
* validate the frontend integration boundary;
* report external limitations.

Do not claim a real payment transaction occurred without evidence.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* cart components;
* checkout routes;
* address components;
* shipping components;
* promotion UI;
* payment integration;
* state-management changes;
* API-client changes;
* analytics changes;
* accessibility changes;
* tests created;
* tests executed;
* validation performed;
* backend contract dependencies;
* payment-provider dependencies;
* compatibility considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* product-to-cart interaction works;
* cart drawer/page works;
* quantity mutations work;
* seller grouping works where applicable;
* stale/unavailable cart states are handled;
* anonymous/authenticated cart behavior follows the backend contract;
* checkout route is implemented;
* address selection works;
* shipping selection works;
* promotions work through the backend contract;
* authoritative checkout totals are displayed;
* inventory/checkout conflicts are handled;
* checkout expiration is handled;
* payment initiation is securely integrated;
* duplicate payment submissions are protected;
* checkout recovery paths work;
* responsive checkout works;
* accessibility requirements are implemented;
* analytics is integrated without sensitive data;
* automated tests cover critical flows;
* production build succeeds where dependencies are available;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the customer cart, checkout, shipping-selection, promotion, and payment-initiation web experience defined by this prompt.

Do not implement order-history UI, seller portals, administration, mobile, backend domains, or production infrastructure.

The backend remains authoritative for inventory, prices, promotions, checkout state, payments, and authorization.

Never fabricate successful payment, inventory, shipping, or checkout operations.

Never place secrets or sensitive payment information in the client.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, fake payment behavior, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
