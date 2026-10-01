# Fraud & Abuse Architecture

## 1. Scope

Covers: fraudulent seller behavior, spam/deceptive listings, manipulated reviews, malicious uploads, payment abuse, account abuse, excessive automated requests (bot traffic), prohibited content.

## 2. Deterministic Controls (Available Now)

| Risk | Control |
|---|---|
| Credential stuffing / account takeover | Rate-limited login (`08-auth-architecture.md` §4), progressive lockout, MFA |
| API abuse / scraping / bot traffic | Redis-backed rate limiting per actor/IP, tiered by endpoint sensitivity (`07-api-architecture.md` §10); CAPTCHA-class challenge on anomalous unauthenticated traffic patterns for registration/checkout |
| Coupon abuse | Transactional redemption-count enforcement (`06-transaction-boundaries.md` §2.1 pattern applied to `Coupon.redemptionCount`) |
| Malicious uploads | Type/size validation + malware scanning (`14-media-architecture.md` §3) |
| Duplicate/spam listings | Moderation queue triggered by heuristic similarity/velocity rules (e.g., many near-identical listings from a new seller in a short window) |
| Review manipulation | Purchase-verification requirement for reviews (`03-domain-architecture.md` §2.12), rate limiting on review submission, anomaly flags (e.g., burst of 5-star reviews from accounts with no other activity) routed to Moderation |
| Payment abuse (stolen cards, chargebacks) | Stripe Radar (or equivalent) signal integration at the checkout gate (`16-external-integrations.md` §6), chargeback-rate monitoring per seller feeding into seller risk status |
| Seller abuse (non-delivery, counterfeit) | Support/Moderator case queue fed by customer disputes and return/refund-rate anomalies per seller |

## 3. Synchronous vs. Asynchronous Evaluation

- **Synchronous, bounded-timeout gate:** checkout-time risk scoring (order fraud) and account-creation risk scoring — both fail safe to a conservative internal heuristic if the external provider times out (`16-external-integrations.md` §6), never blocking the transaction indefinitely.
- **Asynchronous:** most abuse detection (review manipulation patterns, seller behavior trend analysis, listing-spam heuristics) runs via the `fraud-scoring` queue (`11-queue-architecture.md`) after the fact, producing `RiskSignal`/`AbuseCase` records routed to Moderation/Support rather than blocking the originating action.

## 4. Separation from Future ML/Heuristic Systems

The architecture defines the **case/signal data model** (`RiskSignal`, `AbuseCase`) and the **synchronous gate contract** (bounded-timeout `RiskScoringPort`) now. It does not implement a specific machine-learning scoring model — the port interface allows a future ML-based scorer to be substituted for (or added alongside) the current external-provider/heuristic implementation without changing any consumer of `RiskScoringPort`.

## 5. Rate Limiting Policy Tiers (Representative)

| Endpoint Class | Limit Basis | Tier |
|---|---|---|
| Login/registration | Per (account, IP) | Strict |
| Checkout initiation | Per authenticated customer | Moderate |
| Catalog read | Per IP (unauthenticated) / per actor (authenticated) | Lenient |
| Review submission | Per (customer, product) | Strict |
| Bulk import/admin operations | Per seller/admin actor | Moderate |

## 6. Never Client-Side-Only

All fraud/abuse controls enforce server-side (rate limit counters in Redis, verification checks in the backend); any client-side signal (e.g., a mobile device attestation token) is treated as an additional input to server-side scoring, never as the sole gate.
