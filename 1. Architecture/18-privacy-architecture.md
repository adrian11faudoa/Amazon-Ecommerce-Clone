# Privacy Architecture

## 1. Data Classification

| Category | Examples | Owning Domain(s) |
|---|---|---|
| Identity data | Email, password hash, MFA factors | Identity & Access |
| Contact data | Phone number, notification contact info | Customer, Notification |
| Address data | Shipping/billing addresses | Customer (live), Order (snapshot) |
| Order history | Order/OrderItem content | Order |
| Payment references | Provider payment/refund IDs (never card data) | Payment |
| Seller business data | Legal name, tax ID, bank/Connect linkage | Seller |
| Administrative data | Role assignments, audit entries | Administration |
| Audit information | Action logs referencing other entities by ID | Administration |

## 2. Minimization

- No domain duplicates another domain's PII wholesale; cross-domain references use IDs (e.g., `Order` references `customerId`, not a copy of the full profile) except where an immutable business/legal snapshot is required (`OrderItem`/`Order` address snapshot, `Payment` amount) — snapshots are justified by the requirement that historical financial/shipping records must not change if the customer later edits their profile.
- Analytics ingestion (`27-analytics-architecture.md`) receives aggregated or pseudonymized fields wherever the reporting need does not require row-level PII.

## 3. Retention & Deletion

| Data | Retention | Deletion Path |
|---|---|---|
| Account credentials/profile | Life of account | On verified deletion request: credentials removed, profile PII nulled/anonymized; underlying `User.id` retained as a reference stub for financial record integrity |
| Orders/Payments/Refunds | Minimum statutory financial retention (commonly 7 years, jurisdiction-dependent — confirmed during compliance review, not asserted here as legal advice) | Not deleted within the retention window; PII fields (address text) anonymized after the window while numeric/financial facts remain for aggregate reporting |
| Notification logs | 90–180 days, then rolled up into aggregate delivery-rate stats and the row-level log purged | Scheduled cleanup job |
| Audit logs | 3–7 years (compliance-driven) | Cold-storage archive after active window, not deleted within the compliance window |
| Media assets | While referenced by an active owner entity | Deleted (metadata + S3 object) on owner deletion after grace period, or immediately on explicit removal |
| Search index | N/A (derived) | Freely deletable/rebuildable |

## 4. Access Controls

Every read of Customer PII (address, contact info) by a non-owning actor (Support/Admin) is itself an audited action (`25-administration-architecture.md`). Sellers never receive a customer's full address until an order requiring fulfillment exists, and only the subset needed for shipping (never billing address, never full account profile).

## 5. Export & Consent

- Customers can request a data export (all `Customer`/`Order`/`Review` records they own) — implemented as an async job producing a downloadable, signed-URL-delivered archive, not a synchronous endpoint (data volume can be large).
- Marketing-category notifications require opt-in consent (`NotificationPreference` defaults to disabled for `marketing`), distinct from mandatory transactional categories.

## 6. Logging & Event Restrictions

- Logs never contain passwords, tokens, full card data (never stored at all), or full address/contact strings — structured logging includes IDs, not PII values (`19-observability-architecture.md` §5).
- Events (`09-event-architecture.md`) carry only the PII fields the specific consumer genuinely needs (e.g., `order.created.v1` includes shipping-relevant address fields for Notification/Fulfillment, not full customer profile).
- Search index documents never include PII — search operates purely on public catalog data.

## 7. Encryption

- Data in transit: TLS 1.2+ everywhere (client↔API, API↔providers, API↔internal data stores where the network fabric doesn't already guarantee an encrypted private link).
- Data at rest: managed encryption at rest for PostgreSQL, Redis (where supported), and S3 (SSE-KMS).
