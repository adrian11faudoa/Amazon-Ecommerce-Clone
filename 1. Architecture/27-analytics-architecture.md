# Analytics Architecture

## 1. Boundary

| Layer | Purpose | Data |
|---|---|---|
| Operational transactional data | Runs the business (Postgres domain tables) | Fully identified, authoritative |
| Analytics events | Append-only record of business/product events for reporting | Aggregated/pseudonymized where feasible, derived from domain events |
| Reporting/BI | Dashboards and scheduled reports for platform operators and sellers | Aggregated views, no raw PII exposed beyond what the viewing role is otherwise entitled to (a seller's own sales dashboard, not other sellers') |
| Product analytics | Funnel/behavioral analysis (page views, conversion) | Client-captured events, session-scoped, not merged with financial PII beyond an internal join key needed for funnel analysis |
| Platform analytics | Aggregate cross-seller/cross-customer metrics (GMV, order volume trends) | Fully aggregated, no row-level customer identity in the reporting layer itself |

## 2. Data Flow

Domain events (`09-event-architecture.md`) are consumed by the Analytics domain via the `analytics-ingest` queue (`11-queue-architecture.md`), transformed into analytics-schema records, and batched to the downstream BI sink (`16-external-integrations.md` §7). Client-side product-analytics events (page views, funnel steps) are ingested via a dedicated, lower-guarantee endpoint (no outbox requirement — occasional loss acceptable, per `10-outbox-architecture.md` §3).

## 3. Privacy Considerations

- Analytics records reference customers/sellers by ID, not by duplicated contact/address PII — any join back to identity requires the same authorization path as the operational system, not a separate unrestricted analytics-store lookup.
- Aggregation thresholds (e.g., minimum cohort size before displaying a metric) are applied wherever a metric could otherwise re-identify a small group (e.g., "average order value for sellers in a niche category with only 2 sellers").
- Data the analytics layer should **not** duplicate: raw addresses, payment provider references, credentials, MFA factors, and any field classified High sensitivity in `18-privacy-architecture.md` §1 beyond what's strictly needed for a specific, justified reporting need (documented per report, not assumed by default).

## 4. Reconstructability

The analytics store holds no authoritative fact — it can be fully rebuilt by replaying the transactional source tables and/or reprocessing retained raw events within their retention window, consistent with `04-domain-ownership-matrix.md`'s classification of Analytics as purely derived.
