# Audit Contract (Detail)

Extends `../25-administration-architecture.md` §3 with the complete list of audit-triggering actions and the exact field set.

## 1. Actions That Must Produce an `AuditLogEntry`

| Category | Actions |
|---|---|
| Authentication security events | Login success/failure, password reset requested/completed, MFA enrolled/removed, session revoked, refresh-token-reuse detected |
| Seller verification | Submission, approval, rejection, resubmission, suspension, reinstatement |
| Catalog | Product publish, unpublish, force-unpublish (moderation), suspension lift |
| Inventory | Every manual `InventoryAdjustment` (not routine checkout-driven reserve/commit/release — those are high-volume and covered by the domain's own append-only tables, not a second audit entry; "manual" here means a seller/admin-initiated adjustment outside the normal order flow) |
| Order administrative changes | `AdminCancelOrder`, any `forceOverride` cancellation (`03-order-lifecycle-and-financial-boundaries.md` §3) |
| Refunds | Every `InitiateRefund` regardless of outcome (pending/processed/failed) |
| Returns | `AuthorizeReturn`, `DenyReturn`, `InspectReturn` outcome |
| Permission changes | Any `SellerUser` role change, any `AdminUser` role grant/revoke |
| Administrative login | Every PlatformAdmin/Moderator/Support login (in addition to the general authentication event, tagged distinctly for compliance reporting) |
| Moderation actions | Case open/assign/resolve, content flag/removal |
| Seller suspension/restriction | `SuspendSeller`, `ReinstateSeller`, any account restriction short of suspension (e.g., temporary catalog-write freeze) |
| Support access to customer/order/payment data | Every read, per §2 "Support's audited-read pattern" in `11-security-and-authorization-matrix.md` |
| Configuration/feature-flag changes | Every create/update/delete of a `FeatureFlag` or platform configuration value |

## 2. Field Set (Binding, Extends `../25-administration-architecture.md` §3)

| Field | Rule |
|---|---|
| `actorId` | The `User.id` performing the action; for system-triggered actions (scheduled jobs, webhook-driven transitions), a reserved system actor ID per subsystem (e.g., `system:reconciliation-job`), never a null/blank actor |
| `actorType` | `CUSTOMER \| SELLER_USER \| MODERATOR \| SUPPORT \| PLATFORM_ADMIN \| SYSTEM` |
| `action` | Matches the command name from the relevant domain contract (`AdminCancelOrder`, `ApproveVerification`, etc.) — never a free-text description |
| `targetType` / `targetId` | The entity acted upon, using the canonical entity names from `01-entity-and-identifier-catalog.md` |
| `resultStatus` | `SUCCESS \| FAILURE` plus, on failure, a `failureReason` matching the failure-classification taxonomy (`14-reliability-contracts.md` §1) |
| `occurredAt` | UTC timestamp |
| `correlationId` | Threads back to the originating request/event per `../28-cross-cutting-contracts.md` §6 |
| `metadata` | A bounded, explicitly allowlisted set of non-sensitive fields relevant to the action (e.g., for a refund: `{ amountMinorUnits, currency, orderItemIds }` — never a full entity dump, and never any field classified sensitive in `../18-privacy-architecture.md` §1) |

## 3. Co-Transactionality (Restated, Binding)

The `AuditLogEntry` insert happens in the **same database transaction** as the audited mutation (`../25-administration-architecture.md` §3) — implemented as a shared `AuditLogService.record(...)` call invoked from within the command handler's existing transaction context, never a separate call that could commit independently and drift from the action it's supposed to describe. A command handler that mutates audited state without calling this service is a defect, caught by the `20-architecture-test-contract.md` authorization/audit test category.

## 4. What Is Never Stored

Per `../18-privacy-architecture.md` §6 and this document's `metadata` allowlist rule: no password, token, full card number, full address string, or verification-document content ever appears in `AuditLogEntry.metadata` — audit entries reference such things by ID (e.g., `addressId`, `mediaAssetId` for a verification document) so a reader with appropriate additional authorization can look up the current value, rather than the audit log becoming a second, harder-to-govern copy of sensitive data.

## 5. Retention

Per `../18-privacy-architecture.md` §3: 3–7 years (compliance-driven), cold-storage archive after the active window, never deleted within the compliance window.
