# ADR-0007: Stripe (+ Stripe Connect) as the Sole Payment Provider, Behind a Local Port

## Status
Accepted

## Context
The platform requires payment capture from customers and payout distribution to many independent sellers (marketplace split-payment model), with PCI-conscious handling of cardholder data.

## Decision
Use Stripe for payment capture and Stripe Connect for seller payout/settlement, accessed exclusively through a local `PaymentProviderPort` interface (`16-external-integrations.md` §2) — no card data is ever received or stored by the platform's own backend.

## Rationale
- Stripe Connect natively models the marketplace split-payment/payout relationship (platform ↔ multiple seller accounts) required by `03-domain-architecture.md` §2.10's Payment domain, avoiding a custom ledger/payout engine.
- Client-side card tokenization (Stripe.js/Elements) keeps raw cardholder data out of the platform's PCI scope entirely, directly satisfying the Master Prompt's "do not store unnecessary cardholder data" requirement.
- The port/adapter boundary (`16-external-integrations.md` §1) means a future multi-provider or provider-switch requirement is a new adapter, not a domain-logic rewrite.

## Alternatives Considered
- **Building a custom payment/payout ledger without a PSP:** rejected — infeasible PCI/compliance burden and regulatory complexity for a project of this scope.
- **Multiple payment providers from day one:** rejected — no current requirement for provider redundancy or region-specific provider selection; the port interface makes this addable later without a domain change.

## Consequences
- All payment state transitions are driven by verified Stripe API responses/webhooks (`06-transaction-boundaries.md` §2.6); the platform never asserts a payment status without provider confirmation.
- Seller payout timing/logic is bounded by Stripe Connect's own payout capabilities and constraints.
