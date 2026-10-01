# Administration Architecture

## 1. Roles

PlatformAdmin, Moderator, Support (defined in `08-auth-architecture.md` §6). Administrative roles are assigned to a `User` via an explicit `AdminUser` role record, distinct from any Customer/SellerUser role the same person might separately hold — a platform employee's admin authority is never inferred from any other account attribute.

## 2. Capabilities by Role

| Capability | PlatformAdmin | Moderator | Support |
|---|---|---|---|
| Seller verification approval/rejection | Yes | No | No |
| Force-unpublish listing/review | Yes | Yes | No |
| Refund initiation | Yes | No | No (may escalate/request, not execute) |
| Order status view (any order) | Yes | No | Yes (ticket-scoped, audited) |
| Role assignment (grant/revoke admin roles) | Yes | No | No |
| Fraud/abuse case review | Yes | Partial (content-abuse only) | No |
| Platform-level promotion creation | Yes | No | No |
| Audit log read | Yes | Scoped (own actions + moderation cases) | Scoped (own actions) |
| Configuration/feature-flag management | Yes | No | No |

## 3. Audit Logging Requirement

Every administrative action writes an `AuditLogEntry` **within the same transaction** as the action itself (co-transactional, per `04-domain-ownership-matrix.md`), recording: `actorId`, `actorType`, `action`, `targetType`/`targetId`, `resultStatus`, `occurredAt`, and non-sensitive `metadata` (e.g., "refund amount: 4500 minor units", never a full card/account number). This is enforced via a shared audit-logging service call embedded in the command handler for every admin-capable action — not an optional afterthought left to each handler's discretion.

## 4. Strong Authentication for Administrative Operations

MFA is mandatory for all `AdminUser` roles (§ per `08-auth-architecture.md` §1). High-risk actions (refund issuance above a configurable threshold, role grants) may additionally require step-up re-authentication within the current session (re-prompt for MFA) before execution.

## 5. Operational Tooling

- Admin Web surfaces: seller directory + verification queue, catalog moderation queue, order lookup/intervention, refund workflow, fraud/abuse case queue, audit log viewer, configuration/feature-flag panel.
- Operational dashboards (Grafana) are linked from, not embedded inside, the Admin Web — observability data and business-administration data remain architecturally separate systems (`19-observability-architecture.md`).

## 6. Non-Reuse of Customer Authorization Assumptions

Administrative routes are guarded by a distinct `AdminRolesGuard`, never the same ownership-check guard used for Customer/Seller routes — an admin viewing "any order" is an explicitly different authorization path from a customer viewing "my order," even though both ultimately call the same underlying `Order` read service, to avoid a shared-guard bug accidentally granting broad access.
