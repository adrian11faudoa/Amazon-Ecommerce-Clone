# External Integration Architecture

## 1. Principle

Every external provider is accessed through a local, domain-defined **port interface** (e.g., `PaymentProviderPort`, `ShippingProviderPort`) implemented by a provider-specific **adapter**. Core business logic depends only on the port; swapping providers means writing a new adapter, never touching domain logic. This is enforced as a module boundary in the backend, not a convention left to discipline alone.

## 2. Payments — Stripe (+ Stripe Connect)

See ADR-0007 for the decision to standardize on Stripe/Stripe Connect behind a local port.

| Aspect | Decision |
|---|---|
| Local abstraction | `PaymentProviderPort`: `createIntent`, `confirmIntent`, `refund`, `verifyWebhookSignature` |
| Authentication | Backend-held secret API key (server-side only, never exposed to clients); client uses Stripe's publishable key + client-side Stripe.js for card entry (card data never transits the backend) |
| Secret handling | Stored in the platform secret manager (see `21`/infra direction), injected via environment variable at runtime, never committed or logged |
| Webhook behavior | Signature verified (`Stripe-Signature` header) before any processing; unverified webhooks rejected with 400 and alerted |
| Retry | Stripe's own webhook retry handles transient delivery failure; local processing failures are retried via the standard webhook-ingestion queue, deduplicated on Stripe `event.id` |
| Timeout | Synchronous Stripe API calls (intent creation) bounded to a short timeout (e.g., 8s) with a typed failure surfaced to Checkout |
| Circuit breaking | A rolling error-rate breaker trips checkout's payment step to a "temporarily unavailable" fast-fail after sustained Stripe error rates, rather than queuing customers behind a hung dependency |
| Data mapping | Local `Payment.providerRef` = Stripe PaymentIntent ID; `SellerOrganization.stripeConnectAccountId` = Connect account ID; no other Stripe object IDs persisted unless needed for support/reconciliation |
| Failure behavior | Checkout payment step fails typed and fast; existing orders/payments are unaffected by a provider outage |
| Reconciliation | Scheduled job compares local `Payment`/`Refund` status against a periodic Stripe API poll for anything not confirmed within an SLA window |

## 3. Shipping Provider (aggregator, e.g., EasyPost/Shippo-class)

| Aspect | Decision |
|---|---|
| Local abstraction | `ShippingProviderPort`: `getRates`, `purchaseLabel`, `getTracking`, `verifyWebhookSignature` |
| Authentication | API key |
| Webhook behavior | Signature/HMAC verified before tracking-status updates are applied |
| Retry/timeout | Rate lookups bounded (e.g., 5s) with fallback to flat-rate/estimated shipping on timeout so checkout is never blocked on a slow carrier API |
| Failure behavior | Checkout proceeds with an estimated rate flagged for reconciliation; fulfillment queues affected shipments for manual label purchase if the provider is down at fulfillment time |
| Data mapping | Local `Shipment.trackingNumber`/`carrier`; no PII beyond what's already in `Address` is newly created |

## 4. Tax Provider

| Aspect | Decision |
|---|---|
| Local abstraction | `TaxProviderPort`: `calculateTax` |
| Retry/timeout | Bounded (e.g., 5s); on timeout/failure, falls back to a configured static tax-rate table by jurisdiction, flagged for later reconciliation/adjustment rather than blocking checkout |
| Data mapping | Tax amounts stored per `OrderItem`; no address data duplicated beyond the `Address` snapshot already taken for the order |

## 5. Email / SMS / Push Providers

| Aspect | Decision |
|---|---|
| Local abstraction | `NotificationChannelPort` per channel |
| Failure behavior | Non-blocking to any transactional workflow (§ Notification Architecture); retried independently |
| Secret handling | API keys/certs in secret manager |

## 6. Fraud/Risk Provider (optional, e.g., Stripe Radar or dedicated vendor)

| Aspect | Decision |
|---|---|
| Local abstraction | `RiskScoringPort`: `scoreOrder`, `scoreAccount` |
| Timeout | Bounded (e.g., 2–3s) synchronous check at the checkout gate; on timeout, falls back to a conservative internal heuristic rule set rather than blocking checkout indefinitely |
| Data mapping | Only order/account attributes needed for scoring are sent — no unrelated PII forwarded |

## 7. Analytics/BI Sink

| Aspect | Decision |
|---|---|
| Local abstraction | `AnalyticsSinkPort`: `ingestBatch` |
| Delivery | Async, batched, non-blocking; failures retried independently and never affect transactional paths |

## 8. General Resilience Pattern Applied to All Providers

Timeout → Retry (only if provider-idempotent) → Circuit breaker (for high-volume synchronous calls: Payment, Shipping rates, Tax, Fraud) → documented fallback behavior → reconciliation job where the fallback creates a temporary approximation (tax, shipping cost) that must later be corrected against the provider's authoritative record.
