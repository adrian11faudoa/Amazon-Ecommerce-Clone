# Amazon-Style Ecommerce Marketplace — Mobile Prompt — Volume 2

# ROLE

You are the Staff Mobile Engineering team responsible for implementing the customer cart, checkout, payment, and purchasing experience of a production-grade, globally scalable ecommerce marketplace.

Operate with the responsibilities of:

* Staff Mobile Engineer
* Mobile UI/UX Engineer
* Performance Engineer
* Accessibility Engineer
* Security Engineer
* QA Engineer
* Technical Documentation Engineer

This is a bounded mobile implementation task.

Inspect the repository before making changes.

Implement only the scope defined in this prompt.

Do not implement unrelated future mobile domains merely because they belong to the completed ecommerce platform.

Do not implement backend, web, infrastructure, or unrelated QA-platform work outside the mobile testing required by this milestone.

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

The mobile application technology direction is:

* React Native;
* Expo;
* TypeScript;
* the repository's established navigation system;
* the repository's established server-state solution;
* secure platform credential storage;
* the verified backend REST/OpenAPI contracts;
* official provider SDKs for client-side payment functionality where applicable.

The backend remains authoritative for:

* cart contents;
* inventory;
* pricing;
* promotions;
* checkout state;
* payment state;
* authorization;
* order creation.

# SOURCE OF TRUTH

Inspect the repository before modifying anything.

Determine the actual current state of:

* navigation;
* authentication;
* API client;
* secure storage;
* product browsing;
* search;
* category browsing;
* account foundation;
* cart functionality;
* checkout functionality;
* payment integration;
* deep links;
* connectivity handling;
* shared components;
* state management;
* tests;
* environment configuration.

The repository is authoritative for what actually exists.

Do not assume previous backend or mobile prompts were executed.

Do not invent endpoints or request/response formats that are not present or contractually defined.

Where compatible functionality already exists:

* reuse it;
* extend it;
* preserve it;
* avoid duplicate systems;
* maintain established contracts.

# CURRENT EXECUTION SCOPE

Implement the mobile customer purchasing journey:

* cart;
* cart persistence according to backend contracts;
* anonymous/authenticated cart handling where supported;
* cart merge;
* cart item mutation;
* checkout creation;
* checkout state;
* address management;
* shipping selection;
* promotion application;
* authoritative totals;
* inventory/reservation state;
* payment initiation;
* secure provider payment UI integration;
* checkout expiration;
* checkout retry/recovery;
* purchase-result handling;
* purchase analytics;
* connectivity-aware recovery;
* accessibility;
* performance;
* automated testing.

This milestone must provide the complete mobile purchasing experience through the backend's checkout/payment contracts.

# EXPLICIT OUT-OF-SCOPE BOUNDARIES

Do NOT implement:

* complete order-history UI;
* return/refund UI;
* review UI;
* notification center;
* seller applications;
* administration;
* backend commerce logic;
* production infrastructure;
* client-side inventory authority;
* client-side payment authority.

Do not build a separate mobile checkout engine.

# CART ARCHITECTURE

Use server state for the authoritative cart.

The mobile application may maintain transient UI state for:

* quantity editing;
* confirmation dialogs;
* drawer/modal state;
* temporary form values.

Do not copy the authoritative cart into multiple independent local stores.

# CART API INTEGRATION

Integrate with verified backend cart APIs.

Support, as applicable:

* retrieve cart;
* add item;
* update quantity;
* remove item;
* clear cart.

Each mutation must:

* handle loading;
* handle validation errors;
* update/refetch authoritative cart state;
* handle conflicts;
* prevent accidental duplicate submissions.

# ADD-TO-CART

From product-detail screens:

* validate variant selection;
* send the correct product/offer/SKU identity;
* submit quantity;
* show progress;
* confirm success only after backend success.

Do not treat a local button animation as proof that the item was added.

# CART SCREEN

Implement a production mobile cart screen.

Display:

* item image;
* title;
* variant;
* seller;
* quantity;
* price;
* line subtotal;
* availability;
* stale-price state;
* subtotal;
* promotion summary where available;
* checkout action.

Use virtualized lists.

Do not render unbounded cart contents.

# CART ITEM MUTATIONS

Support:

* quantity increase;
* quantity decrease;
* direct quantity editing where appropriate;
* remove;
* clear.

Prevent overlapping requests from producing stale UI.

Where the backend supports cart versions, use them to handle concurrent edits.

# CART VALIDATION

Handle cart conditions such as:

* product removed;
* seller offer unavailable;
* price changed;
* quantity unavailable;
* item restricted.

Provide clear recovery.

Do not silently alter server cart state merely because the client detects a discrepancy.

# ANONYMOUS CART

Where supported by the backend:

* associate the anonymous cart with the backend-issued session/cart identity;
* persist only safe identifiers;
* never persist sensitive credentials insecurely.

If the backend does not support anonymous carts, follow the backend contract and do not fake persistent server-side behavior locally.

# CART MERGE

After authentication:

* invoke the backend merge operation where supported;
* reconcile duplicate items;
* handle unavailable products;
* refresh canonical cart state.

Do not implement independent quantity-merging business logic in the mobile application.

# CHECKOUT CREATION

Create checkout only through the backend.

The mobile client should submit the minimum required data, such as:

* cart identity;
* selected address;
* shipping method;
* promotion code;
* idempotency identity where required.

The backend determines authoritative pricing, inventory, taxes, promotions, and totals.

# CHECKOUT SCREEN

Implement a mobile checkout flow containing the project-supported sections:

* customer/address;
* shipping;
* promotion;
* order summary;
* payment;
* review/confirmation.

The exact sequence must match the verified API contract.

# CHECKOUT STATE

Represent server checkout state explicitly.

Distinguish:

* loading;
* ready;
* validating;
* reservation pending;
* awaiting payment;
* failed;
* expired;
* completed/cancelled.

Do not infer server state from local screen navigation.

# ADDRESS MANAGEMENT

Implement checkout address selection.

Support, where backed by APIs:

* list saved addresses;
* select address;
* add address;
* edit address;
* delete address;
* default address.

Use secure and accessible forms.

# ADDRESS FORM

Use a typed form and validation.

Support:

* required fields;
* country;
* region;
* postal code;
* city;
* address lines;
* recipient name;
* phone where required.

Backend validation remains authoritative.

# ADDRESS PRIVACY

Never place complete addresses in:

* analytics;
* logs;
* navigation parameters;
* crash reports.

Use safe internal references.

# SHIPPING SELECTION

Display backend-provided shipping choices.

Show:

* carrier/service name;
* estimated delivery;
* cost;
* availability;
* restrictions where applicable.

Do not calculate authoritative shipping prices locally.

# SHIPPING MUTATION

When shipping selection changes:

* submit through the backend;
* show pending state;
* refresh checkout;
* update totals.

Do not optimistically claim a method is committed.

# PROMOTIONS

Implement promotion-code entry.

Support:

* apply;
* remove;
* invalid;
* expired;
* ineligible;
* rate-limited;
* successful.

The backend evaluates eligibility.

# TOTALS

Display authoritative:

* subtotal;
* discounts;
* shipping;
* taxes;
* total;
* currency.

Never allow local arithmetic to override backend totals.

# PRICE CHANGE HANDLING

If checkout returns a changed price:

* clearly explain the update;
* refresh affected state;
* require user acknowledgement where appropriate;
* do not continue using stale totals.

# INVENTORY RESERVATION

Where the backend exposes reservation state:

* display progress;
* handle insufficient stock;
* handle expired reservation;
* handle retry.

Do not promise permanent availability merely because a reservation was once created.

# CHECKOUT EXPIRATION

When checkout expires:

* stop payment actions;
* show an actionable message;
* allow safe reconstruction/retry;
* preserve the cart when backend semantics permit.

Do not attempt to pay against an expired checkout.

# CHECKOUT CONFLICTS

Handle:

* stale cart;
* changed shipping;
* changed price;
* concurrent checkout;
* inventory failure;
* duplicated submission.

Refresh authoritative state rather than overwriting it.

# IDEMPOTENCY

Use the backend's idempotency contract for:

* checkout creation;
* payment creation;
* payment confirmation where applicable.

Do not generate a new logical operation identity on every automatic retry.

# PAYMENT PROVIDER INTEGRATION

Where the backend uses Stripe or another supported provider:

* use the provider's official React Native/Expo-compatible client SDK;
* never expose secret credentials;
* handle provider-required authentication;
* return control to backend-authoritative state.

Do not implement custom payment cryptography.

# PAYMENT FLOW

Use a flow equivalent to:

```text
Cart
  ↓
Backend checkout
  ↓
Backend payment intent/reference
  ↓
Mobile payment SDK
  ↓
Provider interaction
  ↓
Backend-authoritative payment state
  ↓
Purchase result
```

The exact implementation must follow the repository's actual backend contract.

# PAYMENT SECURITY

Never store:

* card numbers;
* CVV;
* payment secret keys;
* provider private credentials.

Use provider-secure UI/tokenization.

Do not send payment credentials to the project's own API unless the provider's documented architecture explicitly requires it.

# PAYMENT AUTHENTICATION

Handle provider flows requiring additional customer verification.

The UI must:

* show progress;
* preserve navigation state;
* handle cancellation;
* handle failure;
* reconcile final payment state through the backend.

# PAYMENT FAILURE

Handle:

* declined;
* cancelled;
* authentication required;
* expired intent;
* provider unavailable;
* network timeout;
* unknown result.

When the result is uncertain, query the backend rather than blindly creating another payment operation.

# DUPLICATE PAYMENT PROTECTION

Prevent duplicate taps with UI state, but rely on backend/provider idempotency for true correctness.

Do not assume disabling a button is sufficient.

# PURCHASE RESULT

After a payment flow:

* obtain authoritative checkout/order/payment state;
* handle asynchronous confirmation;
* show success only when the backend confirms the relevant state;
* show pending when appropriate;
* show failure only when definitive.

Do not equate provider UI completion with an order being confirmed.

# NETWORK RESILIENCE

During checkout:

* detect connectivity changes;
* distinguish local network failure from server rejection;
* avoid blind retries for payment operations;
* provide safe retry;
* refetch authoritative state after uncertain mutations.

# OFFLINE BEHAVIOR

The checkout must fail safe while offline.

Do not:

* allow payment creation offline;
* display cached inventory as guaranteed;
* submit stale totals as authoritative.

Preserve safe form input where possible.

# APP LIFECYCLE

Handle:

* backgrounding during payment;
* returning to foreground;
* process restart where feasible;
* interrupted provider flow.

On resume, reconcile checkout/payment state with the backend.

# NAVIGATION SAFETY

Protect against leaving checkout during important payment operations without unnecessarily blocking all navigation.

Do not rely solely on navigation state to represent transaction progress.

# PAYMENT DEEP-LINKS

If provider or authentication flows return through deep links:

* validate the route;
* validate operation identity;
* never trust arbitrary query parameters as proof of payment;
* reconcile with backend state.

# CHECKOUT ANALYTICS

Track appropriate events:

* cart viewed;
* item added;
* item updated;
* checkout started;
* address selected;
* shipping selected;
* promotion applied;
* payment initiated;
* payment result;
* checkout completed/failed.

Never include:

* payment credentials;
* full addresses;
* security tokens;
* private payment metadata.

# PUSH/NOTIFICATION INTERACTION

Do not send notifications directly from the mobile application.

The app only initiates backend business actions.

Backend notification events remain authoritative.

# ACCESSIBILITY

Checkout must support:

* screen readers;
* accessible form labels;
* clear error messages;
* touch targets;
* focus movement;
* dynamic status announcements;
* high-contrast compatible design;
* reduced motion.

# PERFORMANCE

Optimize checkout for:

* minimal JS work;
* efficient forms;
* small images;
* minimal rerenders;
* efficient query invalidation;
* low request duplication.

Avoid expensive UI animation during payment.

# LIST PERFORMANCE

Use virtualized lists for:

* cart items;
* addresses;
* shipping methods where large;
* product recommendations shown around checkout.

# STATE MANAGEMENT

Use server state for:

* cart;
* checkout;
* addresses;
* shipping;
* promotions;
* payment status.

Use local state only for:

* form drafts;
* UI controls;
* temporary selections before submission where appropriate.

Do not put checkout authority in Zustand or another local global store.

# ERROR PRESENTATION

Map backend errors into user-facing states:

* authentication;
* authorization;
* stale state;
* inventory;
* price;
* promotion;
* checkout expiration;
* payment;
* network;
* unavailable.

Do not expose internal error details.

# FORM RECOVERY

If validation fails:

* preserve safe fields;
* focus the relevant error;
* clearly identify the problem;
* do not reset the entire checkout.

# SECURITY TESTING

Verify:

* cart isolation;
* checkout isolation;
* no secret credentials in bundle;
* no payment information in logs;
* no arbitrary deep-link execution;
* no unauthorized address access;
* no authorization bypass.

# TESTING

Create meaningful tests.

## Cart

Test:

* add;
* update;
* remove;
* clear;
* conflicts;
* anonymous/authenticated merge.

## Checkout

Test:

* creation;
* address selection;
* shipping;
* promotion;
* price changes;
* inventory failures;
* expiration;
* concurrent changes;
* recovery.

## Payment

Test:

* intent integration boundary;
* provider UI invocation;
* duplicate submission prevention;
* authentication-required state;
* failure;
* uncertain network result;
* authoritative status reconciliation.

## Network/Lifecycle

Test:

* offline;
* timeout;
* background/resume;
* interrupted payment;
* deep-link return.

## Accessibility

Test:

* labels;
* focus;
* error announcements;
* touch targets.

# E2E TESTS

Where mobile E2E infrastructure exists, cover:

* product → cart;
* cart → checkout;
* address;
* shipping;
* promotion;
* payment test flow;
* successful authoritative completion;
* recoverable failure.

Use official provider test environments where required.

Do not fabricate live payment success.

# DOCUMENTATION

Update mobile documentation covering:

* cart;
* checkout;
* address flows;
* shipping;
* promotion;
* payment;
* idempotency;
* lifecycle recovery;
* secure storage;
* testing;
* provider configuration.

Documentation must describe actual implementation.

# NO FAKE COMPLETENESS

Do not use:

* fake checkout totals;
* fake inventory;
* fake payment success;
* fake persistence;
* placeholder APIs;
* TODO gaps;
* pseudo-code;
* "implement later".

Use verified backend contracts.

Where a backend dependency is unavailable, report it accurately.

# NO HARDCODED SECRETS

Never hardcode:

* payment secret keys;
* provider credentials;
* API keys;
* database credentials;
* signing keys.

Never place server-only secrets in Expo configuration intended for the application bundle.

# VALIDATION

Before completion, execute applicable:

* formatting;
* linting;
* TypeScript type checking;
* unit tests;
* component tests;
* E2E tests;
* accessibility checks;
* Expo build validation.

Where physical-device or provider validation cannot be performed:

* run all available local validation;
* report exact limitations;
* do not claim unperformed validation.

# IMPLEMENTATION REPORT

After completing the implementation, provide a completion report containing:

* files created;
* files modified;
* files deleted, if any;
* cart screens/components;
* checkout screens/components;
* address management;
* shipping selection;
* promotion flow;
* payment-provider integration;
* payment-result handling;
* navigation/lifecycle changes;
* state-management changes;
* analytics;
* accessibility;
* tests created;
* tests executed;
* validation performed;
* backend dependencies;
* provider dependencies;
* platform-specific considerations;
* unresolved issues.

# DEFINITION OF DONE

This milestone is complete only when:

* cart functionality is implemented;
* cart synchronization is correct;
* anonymous/authenticated merge follows backend contracts where supported;
* checkout creation is integrated;
* address selection/management works;
* shipping selection works;
* promotion application works;
* authoritative totals are displayed;
* inventory/reservation failures are handled;
* checkout expiration is handled;
* payment-provider client integration is secure;
* duplicate payment submission is protected;
* payment results are reconciled with backend state;
* interrupted/backgrounded payment flows recover safely;
* responsive and accessible checkout exists;
* analytics is privacy-safe;
* critical tests pass;
* available build/type/test validation passes;
* no intentional implementation gaps remain within this prompt's scope.

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Treat the repository as the source of truth for actual implementation state.

Implement only the mobile cart, checkout, payment-initiation, and purchasing experience defined by this prompt.

Do not implement mobile orders, reviews, notifications, seller operations, administration, backend functionality, or infrastructure.

The backend remains authoritative for cart, inventory, pricing, checkout, payment, and authorization.

Use official payment-provider primitives and secure platform storage.

Never fabricate payment success or authoritative commerce state.

Do not hardcode secrets.

Do not leave intentional placeholders, TODO implementation gaps, fake persistence, pseudo-code, or omitted implementation within the current scope.

Run applicable validation and accurately report the actual results.
