# Scalability Architecture

## 1. Scaling Axes

| Component | Scaling Mechanism | Trigger Signal |
|---|---|---|
| Backend API | Horizontal (stateless replicas behind a load balancer, Kubernetes HPA on CPU/RPS) | Sustained CPU > 60–70% or p99 latency SLO breach |
| Background workers | Horizontal, per queue family (`11-queue-architecture.md`), independent replica counts | Queue depth / lag exceeding threshold per queue |
| PostgreSQL | Vertical scaling first; read replicas for read-heavy paths (catalog browse, order history) once replica lag budget allows; partitioning for very large append-mostly tables (`AuditLogEntry`, historical `Price`, `NotificationLog`) once table size crosses a defined threshold (e.g., 100M+ rows or multi-TB) | Query latency degradation, table size threshold |
| Redis | Single-node until memory/throughput ceiling approached; cluster mode (sharded) beyond that | Memory usage or ops/sec approaching provider limits |
| OpenSearch | Multi-node cluster with replica shards from the start (search is inherently horizontally partitionable); shard count planned for projected catalog size | Query latency, indexing throughput |
| Object storage / CDN | Effectively unlimited, provider-managed | N/A |
| Queue transport (Redis-backed BullMQ) | Scales with Redis; migration to a dedicated broker (Kafka/Redpanda) considered only if throughput/replay requirements exceed Redis-backed queue capacity (see ADR-0005) | Sustained queue throughput approaching Redis capacity, or a genuine need for long-retention replay |

## 2. Statelessness

The backend API and workers hold no in-process business state between requests/jobs — every unit of work reads what it needs from Postgres/Redis and writes results back before completing, which is what allows horizontal scaling without sticky sessions or shared-memory coordination.

## 3. Read Scaling

Catalog browse, product detail, and order-history reads are the highest-volume read paths. They are scaled via: (1) Redis caching (`12-cache-architecture.md`), (2) OpenSearch for search/browse (already horizontally distributed), (3) Postgres read replicas for authenticated, cache-miss reads once replica infrastructure is justified by load — writes always go to the primary.

## 4. Write Scaling / Partitioning

- Inventory reservation is the primary write-contention hotspot during traffic spikes (flash sales); mitigated by row-level locking scoped to a single `InventoryItem` (never a table-level lock) plus Redis-based request throttling per hot Sku to smooth burst pressure before it reaches Postgres.
- Sharding/partitioning of core transactional tables (`Order`, `Payment`) is **not** required at initial or near-term scale; it becomes a candidate only if a single Postgres primary's write throughput becomes the binding constraint after replica scaling and query optimization are exhausted — this is a future ADR trigger, not a current decision.

## 5. Queue-Based Workload Isolation

Each queue family scales independently (`11-queue-architecture.md`), so a burst in, e.g., media processing never starves notification delivery or search indexing capacity.

## 6. Regional Expansion Readiness

The architecture avoids region-specific assumptions in application code (all timestamps UTC, all currency/locale explicit fields, no hardcoded timezone logic) so that the initial single-region deployment can extend toward the multi-region direction in `22-multi-region.md` without an application rewrite — only infrastructure topology changes.

## 7. Traffic Bursts

- Autoscaling policies scale the API tier ahead of a known event (e.g., a promoted sale) via scheduled scale-up in addition to reactive HPA, since HPA reaction time can lag a very sharp spike.
- Idempotency keys and inventory reservation locking are the two mechanisms that specifically make burst traffic safe rather than merely fast (correctness under load, not just throughput under load).

## 8. Explicit Non-Premature-Complexity Statement

The following are explicitly **not** implemented at this stage, with the signal that would justify revisiting each: microservice extraction from the modular monolith (signal: a specific domain's team-ownership or deployment-cadence needs diverge sharply from the rest — see ADR-0001); database sharding (signal: single-primary write throughput becomes the binding bottleneck after replicas/caching); a dedicated event broker replacing Redis-backed queues (signal: throughput or replay-retention needs exceed Redis-backed BullMQ capacity — see ADR-0005); multi-region active-active (signal: a specific latency or regulatory-residency requirement, see `22-multi-region.md`).
