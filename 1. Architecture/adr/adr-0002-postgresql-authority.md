# ADR-0002: PostgreSQL as Sole Transactional Authority

## Status
Accepted

## Context
The platform requires strong consistency for money and inventory (`06-transaction-boundaries.md`) alongside high read volume for catalog/search.

## Decision
PostgreSQL (via Prisma) is the sole authoritative transactional datastore for all business-critical entities. Redis and OpenSearch are explicitly non-authoritative and must remain reconstructable from Postgres (`04-domain-ownership-matrix.md`).

## Rationale
- Mature ACID transaction support, row-level locking, and constraint enforcement (unique/check constraints) directly support the inventory/checkout/payment invariants in `06-transaction-boundaries.md`.
- A single authoritative store avoids the reconciliation complexity of multiple systems each claiming partial authority over the same fact.

## Alternatives Considered
- **NoSQL primary store (e.g., DynamoDB/MongoDB):** rejected — weaker native support for the multi-entity transactional invariants (inventory reservation, checkout saga steps) central to this domain; would require re-implementing transactional guarantees at the application layer.
- **Polyglot persistence per domain from day one:** rejected — adds operational complexity without a demonstrated per-domain requirement; a domain may adopt a specialized store later via a new ADR if a specific need arises (none identified currently).

## Consequences
- Read scaling relies on caching (Redis) and read replicas, not on distributing authoritative writes across multiple stores.
- Every derived store (Search, analytics) must have a defined, monitored path back to Postgres for rebuild (`13-search-architecture.md`, `27-analytics-architecture.md`).
