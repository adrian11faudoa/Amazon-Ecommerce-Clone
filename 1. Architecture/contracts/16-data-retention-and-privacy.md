# Data Retention & Privacy Contract (Detail)

Extends `../18-privacy-architecture.md` with the full retention/deletion table per data category, including queue dead-letters and event retention (not covered by Volume 1).

## 1. Retention Classification (Complete)

| Data Category | Classification | Retention | Deletion/Anonymization Path |
|---|---|---|---|
| Active customer account/profile | Authoritative | Life of account | Verified-deletion request → credentials removed, profile PII nulled; `User.id` retained as a reference stub (`01-entity-and-identifier-catalog.md` §2) |
| Orders/Payments/Refunds | Authoritative | Minimum statutory financial retention (jurisdiction-dependent; confirmed during compliance review, not asserted as legal advice here) | Not deleted within the window; address/PII fields anonymized after the window, financial facts retained for aggregate reporting |
| Audit logs | Authoritative (is the audit mechanism) | 3–7 years (compliance-driven) | Cold-storage archive after active window |
| Notification logs | Derived/operational | 90–180 days | Rolled up into aggregate delivery-rate stats, row-level log purged by `cleanup.rollup-notification-log` (`05-events-and-queues.md` §5) |
| Media assets | Authoritative (bytes) | While referenced by an active owner entity | Deleted (metadata + S3 object) on owner deletion after grace period, or immediately on explicit removal (`08-storage-and-media-contract.md` §7) |
| Search index | Derived | N/A | Freely deletable/rebuildable |
| **Outbox messages** (dispatched) | Delivery mechanism, not a permanent log | 14 days active retention (`../10-outbox-architecture.md` §6) | Purged by scheduled job |
| **Queue dead-letters** | Operational/diagnostic | 30 days (long enough for incident investigation, short enough to bound storage) | Purged by `cleanup` job family; a dead-letter containing sensitive payload fields is redacted at write time per §3's PII rule, not just at eventual deletion |
| **Analytics events (raw, pre-aggregation)** | Reconstructable (from transactional source + retained raw events within window) | 90 days raw, indefinite for aggregated/rolled-up metrics that contain no row-level PII | Raw events purged after window; aggregates retained |
| **WebhookReceipt raw payloads** | Operational/diagnostic (needed for signature-audit and replay-protection window) | 30 days for raw payload; the receipt's existence-and-outcome record is retained longer (matches the domain event's own retention, e.g., `Payment`'s retention) with payload truncated after 30 days | Raw payload field nulled after window, receipt row retained |
| **Session/RefreshToken rows** | Operational | 30–90 days (per `../08-auth-architecture.md` §2) | Purged by cleanup job past expiry |

## 2. Deletion Behavior by Entity (Restated, Binding)

| Entity | Deletion Behavior |
|---|---|
| Customer account | Anonymize PII fields (name, email → tombstone value, phone removed); retain `Order` history with anonymized `Address` snapshot fields; retain `Review`s (disassociate display name, keep content unless independently requested for removal) |
| Seller account | Catalog unpublished first (state machine §1 in `02-state-machines.md`), then archived; financial records retained per §1 above; `SellerUser` roles removed |
| Personal addresses | Live `Address` row deletable immediately by the owner; historical `Order`/`Shipment` snapshots of that address are **not** retroactively deleted (they are immutable financial/shipping records, per `../05-data-architecture.md` §2 note) — this is disclosed to the customer in the deletion-request flow so there is no false expectation of full erasure of historical shipping data |
| Sessions | Deleted/expired per §1 |
| Media | Per `08-storage-and-media-contract.md` §7 |
| Reviews | Customer-initiated deletion within the edit window removes content and marks `REMOVED`; the customer's overall purchase/review-count history is not separately purged (it's derived, not a stored PII record) |
| Notification records | Rolled up/purged per §1 — no explicit customer-initiated action needed since these are bounded-retention by default |

## 3. PII/Sensitive Data Exclusion in Diagnostic/Operational Stores

Restates and extends `../18-privacy-architecture.md` §6 to explicitly cover the two operational stores Volume 1 didn't enumerate:

- **Queue dead-letter payloads:** any job payload field classified sensitive (per `../18-privacy-architecture.md` §1) is redacted (replaced with a `[REDACTED]` marker retaining the field's presence for debugging shape, not its value) before the payload is written to the dead-letter queue's persisted record — a stuck/failed job is a diagnostic artifact, not a place sensitive data should accumulate indefinitely.
- **Webhook raw payloads:** stored for the 30-day audit/replay-protection window (§1) with provider-side cardholder data never present in the first place (Stripe webhooks reference payment intents by ID, never raw card data) — no additional redaction needed for Payment webhooks specifically, but shipping-provider webhooks containing address data follow the same 30-day truncation rule as any other PII-bearing operational record.

## 4. Export & Consent (Restated, Binding)

Per `../18-privacy-architecture.md` §5: async job producing a signed-URL-delivered archive covering all `Customer`/`Order`/`Review` records the requester owns. This document adds: the export explicitly **excludes** `AuditLogEntry` rows referencing the customer (those are the platform's own operational record, not the customer's personal data export, and remain internal), and explicitly **includes** the customer's own `NotificationPreference` settings and any still-retained `NotificationLog` entries within their retention window.
