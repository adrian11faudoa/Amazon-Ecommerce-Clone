# Multi-Region Direction

## 1. Initial Deployment Topology

Single AWS region, multi-AZ: backend API and workers deployed across at least two Availability Zones behind a regional load balancer; PostgreSQL Multi-AZ (managed HA, synchronous standby); Redis with cross-AZ replica; OpenSearch cluster nodes spread across AZs; S3 (regional, natively multi-AZ durable); CDN is inherently global at the edge even in this topology.

## 2. Target Multi-Region Topology (Long-Term)

| Concern | Target Direction |
|---|---|
| Traffic routing | Latency-based DNS routing (e.g., Route 53) to the nearest healthy regional deployment |
| Application deployment | Active-active API/worker deployments per region, stateless so any region can serve any authenticated request |
| Database topology | Single-writer-region-per-shard-of-customers initially (e.g., a customer's home region owns their transactional writes), with cross-region read replicas for lower-latency reads elsewhere — full multi-writer active-active Postgres is not planned given the added conflict-resolution complexity for financial data |
| Read/write authority | Writes always routed to the customer's/order's home region; reads may be served from the nearest replica |
| Replication | Postgres cross-region read replica streaming; Redis is region-local cache only (not replicated — cache misses are cheap, re-derivable) |
| Object storage replication | S3 cross-region replication for durability and regional read locality |
| Search replication | Per-region OpenSearch cluster, rebuilt from the region's authoritative catalog subset rather than cross-region-replicated at the index layer |
| Event replication | Cross-region event replication only for data that must be globally consistent (e.g., a global catalog visible to all regions); order-region-local events stay region-local |
| Failover | Regional health-check-driven DNS failover; a region outage redirects new traffic, with a defined (and tested) RTO for the affected region's in-flight write traffic |
| DNS | Health-checked latency-based routing as above |
| Disaster recovery | See `23-disaster-recovery.md` |
| Regional isolation | A region's customer/order data is not required by another region's normal operation — regions are failure-isolated for their local customer base |

## 3. Explicit Distinction

The **initial deployment** (§1) is what this architecture volume authorizes for near-term implementation. The **target topology** (§2) is directional and is not implemented now — it is documented so that early decisions (statelessness, UTC timestamps, explicit currency/locale fields, region-agnostic IDs) do not have to be revisited later to make multi-region achievable.

## 4. Multi-Region Is Not Required Now

No current product, traffic, or regulatory-residency requirement mandates multi-region active-active deployment at this stage. It becomes a concrete implementation task only when a specific signal appears (e.g., a measured latency SLA violation for a distant customer population, or a data-residency legal requirement for a specific jurisdiction).
