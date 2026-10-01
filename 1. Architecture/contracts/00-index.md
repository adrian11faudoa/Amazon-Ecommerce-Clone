# Architecture Volume 2 — Contract Package Index

**Relationship to Volume 1:** This package (`/contracts`) is the detailed implementation-contract layer built on top of the foundational architecture in `/architecture` (Volume 1 — spanning `../00-overview.md` through `../28-cross-cutting-contracts.md`, plus `../adr/`, `../openapi/`, `../schemas/`). Volume 1 established *what exists and who owns it*; Volume 2 makes *exact, implementable behavior* explicit — canonical IDs, state machines, per-operation authorization, per-queue job contracts, and operational/deployment contracts — so independent backend, frontend, mobile, infrastructure, and QA implementation agents can build without inferring anything.

This package is self-contained together with Volume 1: every cross-reference below is a real file path within `/architecture`, never "as discussed earlier" or "see the previous prompt."

## Document Index

| # | Document | Extends / Supersedes (Volume 1) | Covers |
|---|---|---|---|
| 01 | `01-entity-and-identifier-catalog.md` | `../05-data-architecture.md` | Canonical entity names, ID generation strategy, exposure rules, mutability, soft-delete, audit/privacy classification |
| 02 | `02-state-machines.md` | `../06-transaction-boundaries.md` | Explicit state machines for 11 critical business objects |
| 03 | `03-order-lifecycle-and-financial-boundaries.md` | `../03-domain-architecture.md` §2.9–2.11 | Independent order/payment/fulfillment/shipment/return lifecycle relationship, cancellation/refund matrix, financial data boundaries |
| 04 | `04-api-contract.md` | `../07-api-architecture.md` | HTTP conventions, pagination detail, idempotency contract, webhook contract |
| 05 | `05-events-and-queues.md` | `../09-event-architecture.md`, `../10-outbox-architecture.md`, `../11-queue-architecture.md` | Event envelope refinement, event versioning rules, full event catalog, queue/job catalog |
| 06 | `06-redis-namespace-catalog.md` | `../12-cache-architecture.md` | Canonical Redis key patterns, ownership, TTL, failure behavior |
| 07 | `07-search-contracts.md` | `../13-search-architecture.md` | Concrete search-document schemas, sync/rebuild contract |
| 08 | `08-storage-and-media-contract.md` | `../14-media-architecture.md` | Object-storage bucket/prefix conventions, media job contracts |
| 09 | `09-notification-contract.md` | `../15-notification-architecture.md` | Notification domain model detail, quiet hours, provider-failure isolation |
| 10 | `10-configuration-contract.md` | `../28-cross-cutting-contracts.md` §9 | Full environment-variable/secret/feature-flag catalog conventions |
| 11 | `11-security-and-authorization-matrix.md` | `../08-auth-architecture.md`, `../17-security-architecture.md` | Per-operation security policy matrix + role/resource authorization matrix |
| 12 | `12-audit-contract.md` | `../25-administration-architecture.md` | What must be audited, by whom, with what fields |
| 13 | `13-observability-contract.md` | `../19-observability-architecture.md` | Canonical log fields, metric names, label-cardinality rules |
| 14 | `14-reliability-contracts.md` | `../20-reliability-architecture.md` | Failure classification, retry, timeout, circuit-breaking contracts |
| 15 | `15-rate-limit-and-anti-abuse.md` | `../26-fraud-abuse-architecture.md` | Full rate-limit category table, anti-abuse controls |
| 16 | `16-data-retention-and-privacy.md` | `../18-privacy-architecture.md` | Retention classification and deletion/anonymization contract per data category |
| 17 | `17-migration-and-database-operations.md` | `../05-data-architecture.md`, ADR-0002 | Migration strategy, connection pools, replicas, partitioning/sharding evaluation |
| 18 | `18-deployment-and-environments.md` | `../02-component-architecture.md` | Environment architecture, deployment topology contract |
| 19 | `19-rollout-and-disaster-recovery.md` | `../23-disaster-recovery.md` | Rollout/rollback contract, per-system DR contract detail |
| 20 | `20-architecture-test-contract.md` | `../` (all) | What must be verified by implementation teams, by category |
| 21 | `21-multi-tenancy-and-seller-isolation.md` | `../04-domain-ownership-matrix.md`, `../08-auth-architecture.md` §7 | Isolation model decision, enforcement, support/admin override boundaries |
| 22 | `22-fulfillment-return-refund-review-contracts.md` | `../03-domain-architecture.md` §2.11–2.12 | Detailed fulfillment, return, refund, review contracts |
| 23 | `23-recommendation-and-analytics-boundary.md` | `../27-analytics-architecture.md` | Recommendation-engine boundary, analytics event boundary |
| 24 | `24-capacity-planning-model.md` | `../21-scalability-architecture.md` | Capacity-planning framework and scaling indicators (no fabricated numbers) |
| 25 | `25-integration-and-readiness-audit.md` | All of Volume 1 + Volume 2 | Cross-artifact consistency audit and implementation-readiness audit |
| — | `schemas/` | `../schemas/` | Additional machine-readable JSON Schemas (search documents, updated event catalog) |
| — | `validate_contracts.py` | `../validation/validate_architecture.py` | Machine validation specific to this package, chained after the Volume 1 validator |

## How to Use

1. Volume 1 documents remain authoritative for domain ownership, component responsibilities, and high-level architecture decisions.
2. This package never restates a Volume 1 decision differently — where a Volume 2 document adds detail to a Volume 1 concept, it says so explicitly and cites the Volume 1 file; it does not introduce a second naming system.
3. Run `python3 validate_contracts.py` from `/architecture/contracts` after `python3 validation/validate_architecture.py` from `/architecture` — both must pass.
