# Migration Architecture & Database Operational Contract

Extends `../05-data-architecture.md` and ADR-0002 with the migration strategy and database operational expectations the Volume 2 prompt requires explicitly.

## 1. Migration Strategy: Expand/Contract

- **No migration ever combines a destructive change with the deploy that depends on it.** Every breaking schema change is split into an *expand* phase (add the new column/table/index, backward-compatible with the currently-running application version) and a *contract* phase (remove the old column/table once every application version reading it has been fully rolled out and confirmed).
- **Deployment ordering:** migrations run and complete **before** the new application version begins receiving traffic (never "migrate on boot," per `13-observability-contract.md` §5) — the deployment pipeline's migration step is a distinct, gated stage (`18-deployment-and-environments.md` §3).
- **Backward compatibility window:** the *previous* application version must still function correctly against the *post-expand* schema, since a rolling deployment briefly runs old and new code simultaneously — this is validated by the deployment-compatibility test category (`20-architecture-test-contract.md`).
- **Data backfills:** run as a separate, idempotent, resumable batch job (not inline in the migration transaction) for any column whose population requires processing existing rows — batched to avoid long-held locks on high-traffic tables (`Order`, `Product`), following the same per-row-idempotency pattern as bulk seller imports (`../06-transaction-boundaries.md` §2.10).
- **Rollback limitations (explicit):** an *expand* migration is safely rollback-able (the new column/table is simply unused by a rolled-back application version). A *contract* migration is **not** safely rollback-able once executed (the dropped column's data is gone) — contract migrations are therefore only ever run after a defined bake-in period (default: one full deployment cycle plus a manual sign-off) confirms the expand phase is stable, and are never bundled with the same deploy that introduces the code depending on their removal.
- **Long-running migration safety:** any migration expected to take longer than a few seconds against production data volume (e.g., adding a `NOT NULL` column with a default to a multi-million-row table) uses the Postgres-safe pattern: add the column nullable, backfill in batches, then add the `NOT NULL` constraint with `NOT VALID` followed by a separate `VALIDATE CONSTRAINT` — never a single blocking `ALTER TABLE ... ADD COLUMN ... NOT NULL DEFAULT ...` on a large table.
- **Index creation strategy:** new indexes on existing tables are created with `CREATE INDEX CONCURRENTLY` (Postgres) to avoid write-locking the table during creation — never a plain blocking `CREATE INDEX` on a live production table.
- **Event schema evolution:** governed by `05-events-and-queues.md` §3 — additive is free, breaking requires a version bump and dual-publish window, mirroring the expand/contract philosophy at the event layer.
- **Search reindexing:** a schema-affecting catalog change that also changes the search document shape triggers a full reindex-and-alias-swap (`07-search-contracts.md` §3), scheduled independently of the database migration itself (the two are decoupled — a database migration does not block on search reindex completion).

## 2. Prisma/ORM Discipline

- Prisma schema changes and their generated migration are committed together, reviewed as a single change; Prisma's own migration history table is the source of truth for "what has actually been applied to a given environment," cross-checked against `18-deployment-and-environments.md`'s environment definitions before promoting a migration further up the environment chain.
- ORM models are never treated as a substitute for the database-level constraints defined in `../05-data-architecture.md` (unique constraints, check constraints, foreign keys) — every invariant stated there is enforced at the database level, with the ORM layer as a convenience, not the sole guard (Master Prompt "DATABASE ENGINEERING" requirement).

## 3. Connection Pools, Timeouts, Replicas, Failover

| Concern | Contract |
|---|---|
| Connection pool | Sized per replica via `DATABASE_POOL_MIN`/`DATABASE_POOL_MAX` (`10-configuration-contract.md`); pool exhaustion surfaces as a `503` with a distinct error code (`DATABASE_POOL_EXHAUSTED`) rather than an indefinite hang |
| Query timeout | `DATABASE_STATEMENT_TIMEOUT_MS`, enforced at the Postgres session level (`SET statement_timeout`) so a runaway query cannot hold a connection indefinitely |
| Transaction timeout | Bounded per the transaction-boundary definitions in `../06-transaction-boundaries.md` — no transaction is held open across an external network call (e.g., never holding a Postgres transaction open while waiting on a Stripe API response) |
| Read replicas | Used only for read paths explicitly marked replica-safe (catalog browse, order history listing) — anything feeding a subsequent write decision in the same logical operation (e.g., reading current inventory before reserving) always reads the primary, never a replica, to avoid replica-lag-induced incorrect decisions |
| Failover | Managed HA (RDS Multi-AZ or equivalent) with automatic primary failover; the application's connection layer retries transient connection errors per `14-reliability-contracts.md` §2's "Database transient connection error" row rather than surfacing a hard failure on the brief failover window |
| Backups | Continuous WAL archiving + daily snapshot (`../23-disaster-recovery.md` §2); this document adds that backup verification (scheduled restore-to-scratch-instance test) is itself a scheduled job with its own alerting if it fails, not a manual, easily-forgotten process |
| Vacuum/statistics | Autovacuum tuned per table access pattern (high-write tables like `InventoryItem`/`Order` get more aggressive autovacuum settings than low-write reference tables like `Category`) — a specific tuning profile is an infrastructure-implementation detail, but the requirement that autovacuum settings are reviewed per table's write profile (not left at global defaults uniformly) is architectural |
| Slow-query monitoring | Every query exceeding a configured threshold (e.g., 500ms) is logged with its query plan reference and surfaces on the observability dashboard (`13-observability-contract.md` §2) — this is how "avoid unbounded queries" (Master Prompt) is made operationally enforceable rather than aspirational |

## 4. Partitioning & Sharding Evaluation

Per `../21-scalability-architecture.md` §1 and §8: **not required now.** This document adds the concrete growth indicators and candidate keys that would trigger a future decision:

| Table | Growth Indicator That Would Trigger Partitioning | Candidate Partition Key |
|---|---|---|
| `AuditLogEntry` | Row count exceeding ~100M or multi-TB table size, or query latency degradation on time-range queries | `occurredAt` (range partitioning by month/quarter) |
| `Price` (append-only history) | Similar row-count/size threshold, given every price change appends a row | `effectiveFrom` (range partitioning) |
| `NotificationLog` | Similar threshold, given high per-event fan-out | `sentAt` (range partitioning), mitigated first by the existing 90–180 day rollup-and-purge policy (§ Retention) before partitioning is even considered |
| `Order`/`OrderItem` | **Not partitioned even at large scale** unless a single Postgres primary's write throughput becomes the binding bottleneck after read-replica scaling and query optimization are exhausted (`../21-scalability-architecture.md` §4) — the migration strategy for this specific table, if ever triggered, would be a dedicated ADR, not a default assumption |

No sharding (horizontal split across multiple database instances) is introduced without an actual measured architectural need, per the Master Prompt's explicit prohibition — this section exists to make the *signal* concrete rather than leaving "when we need it" undefined.
