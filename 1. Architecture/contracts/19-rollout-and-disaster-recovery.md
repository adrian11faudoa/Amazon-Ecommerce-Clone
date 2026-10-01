# Rollout, Rollback & Disaster-Recovery Contract (Detail)

Extends `18-deployment-and-environments.md` §4 and `../23-disaster-recovery.md` with explicit rollback limitations and per-system DR detail the Volume 2 prompt requires beyond Volume 1's coverage.

## 1. Rollout Strategy

- **Rolling deployment** is the default strategy (§ `18-deployment-and-environments.md` §4).
- **Canary deployment** (a small percentage of traffic routed to the new version before a full rollout) is used for changes flagged as higher-risk at review time (e.g., a checkout-flow change) — the canary percentage and promotion/abort thresholds are configured per-deployment, not globally fixed, but the *requirement* that higher-risk changes get a canary stage is binding.
- **Feature flags** (`10-configuration-contract.md` §4) are the preferred mechanism for decoupling *code deployment* from *feature activation* — a risky feature ships dark (flag off) and is enabled progressively without requiring a new deployment for each rollout stage.

## 2. Rollback Contract

| Change Type | Rollback-Safe? | Mechanism |
|---|---|---|
| Application code (no schema/event change) | Yes, fully | Redeploy the previous container image |
| Database expand migration | Yes | Previous application version simply doesn't use the new column/table; no data is lost by rolling back application code |
| Database contract migration | **No** | Once a contract migration has dropped a column/table, rolling back application code does **not** restore the data — this is why contract migrations are gated behind a bake-in period and never bundled with the deploy that depends on their removal (`17-migration-and-database-operations.md` §1) |
| Event schema breaking change (new `.v{n+1}`) | Yes, during the dual-publish window | Consumers can be rolled back to `.v{n}` without data loss since the producer is still emitting both versions |
| Event schema breaking change (after dual-publish window ends) | No | Same rationale as contract migrations — the deprecation-log process (`05-events-and-queues.md` §3, `deprecation-log.md`) exists specifically to make this window's end a deliberate, tracked decision, not an accident |
| Feature-flag-gated feature | Yes, instantly | Flag flip, no redeploy needed |

**Explicit statement (binding, per Master Prompt "Never assume that all migrations can be instantly rolled back"):** any change classified "No" above requires a forward-fix (a new migration/event version correcting the issue) rather than a rollback — this is communicated in the deployment runbook so an on-call engineer never attempts an unsafe rollback under incident pressure without knowing which category they're in.

## 3. Disaster-Recovery Contract, Per System (Detail)

Extends `../23-disaster-recovery.md` §1–4 with the explicit recovery **order** and **reconciliation requirement** per system that Volume 1 described individually but did not sequence end-to-end.

| Order | System | Action | Data-Loss Risk | Reconciliation Requirement After Recovery |
|---|---|---|---|---|
| 1 | Networking/DNS/ingress | Reroute to standby region or restored infrastructure | None (routing only) | None |
| 2 | Secrets/configuration | Confirm secret manager availability in the target environment (already replicated/independently provisioned, `../23-disaster-recovery.md` §7) | None if properly replicated | Verify no secret drift between regions before proceeding |
| 3 | PostgreSQL | Promote standby (AZ failure) or restore from snapshot + WAL replay to desired point-in-time (region loss/corruption) | Bounded by RPO (`../23-disaster-recovery.md` §3) — up to the last successfully replicated WAL segment | Run the payment-reconciliation job (`../11-queue-architecture.md` `reconciliation` family) immediately after restore to catch any payment/order pairs left inconsistent by the failure window |
| 4 | Object storage (S3) | Fail over reads to the replicated region copy (near-zero RPO given versioning + cross-region replication) | Near-zero | Spot-check a sample of recently-uploaded media for replication completeness |
| 5 | Redis | Provision fresh instance (reconstructable, no restore needed) | Acceptable — bounded by whatever AOF/queue state was in flight | Run the inventory-reservation sweep and outbox-health check jobs immediately (`../23-disaster-recovery.md` §4 step 4) |
| 6 | OpenSearch | Run the full reindex job from the now-restored Postgres source of truth (`07-search-contracts.md` §3 "Index rebuild") | None (fully reconstructable) | Confirm document count matches the published-product count before repointing the alias |
| 7 | Backend API + Workers | Deploy/scale up in the target environment | None | Run smoke tests (checkout path, payment webhook path, search path — `../23-disaster-recovery.md` §4 step 6) before removing maintenance-mode |
| 8 | Notification backlog | Resume queue processing; accept that some notifications from the outage window may be delayed but not duplicated (dedup key still enforced, §"Deduplication" in `09-notification-contract.md`) | Delayed, not lost | None beyond normal queue-depth monitoring |

## 4. RPO/RTO — Explicit Caveat (Restated)

The figures in `../23-disaster-recovery.md` §3 remain the stated targets; this document does not invent more precise numbers than Volume 1 already committed to, consistent with the Master Prompt's prohibition on fabricating exact figures without a measured basis — these targets are to be validated against real infrastructure during implementation and DR drills, not treated as already-proven guarantees.
