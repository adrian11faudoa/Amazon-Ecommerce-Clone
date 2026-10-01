# Disaster Recovery Architecture

## 1. System Classification

| System | Classification | Rationale |
|---|---|---|
| PostgreSQL | Authoritative | Source of truth for all business-critical state |
| S3 (media originals, exports, backups) | Authoritative (for uploaded content) | Bytes cannot be regenerated once lost |
| Redis | Reconstructable | Pure cache/ephemeral/queue-transport; rebuildable from Postgres and in-flight retries; queue jobs referencing durable Postgres records are recoverable via reconciliation |
| OpenSearch | Derived/Reconstructable | Fully rebuildable from Postgres via the reindex job (`13-search-architecture.md`) |
| Media derived variants (thumbnails/transcodes) | Reconstructable | Regenerable from the retained original via the media-processing pipeline |
| Configuration (env vars, secrets) | Authoritative (must be independently backed up) | Not regenerable from application data |
| Observability data (logs/metrics/traces) | Best-effort, bounded retention | Not required for business-data recovery |

## 2. Backup Strategy

| System | Backup Method | Frequency | Verification |
|---|---|---|---|
| PostgreSQL | Automated managed snapshots + continuous WAL archiving (point-in-time recovery) | Continuous (WAL) + daily full snapshot | Scheduled automated restore-to-scratch-instance test, validated against row-count/checksum expectations |
| S3 | Versioning enabled + cross-region replication | Continuous | Periodic restore-sampling test |
| Configuration/secrets | Secret manager's own backup/versioning | Continuous (versioned) | Access-tested as part of DR drills |

## 3. Recovery Objectives

| System | RPO (Recovery Point Objective) | RTO (Recovery Time Objective) |
|---|---|---|
| PostgreSQL | Minutes (WAL-driven PITR) | Under 1 hour for single-AZ failure (automatic failover to standby); a documented, drilled target for full-region loss (longer, cross-region restore) |
| S3 | Near-zero (versioned + replicated) | Minutes (replication target already live) |
| Redis | N/A (reconstructable) — acceptable data loss is bounded by AOF persistence configuration | Minutes (fresh instance + reconciliation jobs repair any lost in-flight queue state) |
| OpenSearch | N/A (reconstructable) | Time to run the full reindex job against catalog size (bounded, monitored) |

These are architectural targets to be validated and refined with concrete SLAs during infrastructure implementation, not contractual guarantees asserted by this document alone.

## 4. Restore Process (Outline)

1. Identify failure scope (single-AZ, full-region, data-corruption event).
2. For PostgreSQL: promote standby (AZ failure) or restore from latest verified snapshot + WAL replay to the desired point in time (corruption/region loss).
3. For S3: fail over reads to the replicated region copy; no restore action needed for durability, only for routing.
4. For Redis: provision a fresh instance; run the reservation-sweep and outbox-health reconciliation jobs immediately to repair any state that was mid-flight at failure time.
5. For OpenSearch: run the full reindex job from the (now-restored) Postgres source of truth.
6. Validate via smoke tests (checkout path, payment webhook path, search path) before removing maintenance-mode banners.

## 5. Event Replay & Search Rebuild

Event replay for downstream consumers is bounded by the outbox's retention window (`10-outbox-architecture.md` §6); for recovery scenarios beyond that window, the authoritative source tables (not the event log) are the basis for rebuilding derived state (Search rebuild, notification-log reconstruction is explicitly *not* attempted — lost notification history is accepted as non-critical).

## 6. Regional Failure

Handled per the target multi-region direction (`22-multi-region.md` §2) once implemented; in the initial single-region topology, a full-region failure is a disaster-recovery event addressed by the restore process above executed into a standby region, with an RTO documented and drilled as part of operational readiness rather than assumed continuously available.

## 7. Configuration & Dependency Recovery

Infrastructure-as-code (Terraform) definitions are themselves stored in version control (not solely applied state) so that infrastructure can be reprovisioned from source in a new region/account if needed, independent of any single running environment's state.
