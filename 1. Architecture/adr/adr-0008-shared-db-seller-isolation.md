# ADR-0008: Shared Database, Row-Level Seller Ownership (over Schema/Database-per-Tenant)

## Status
Accepted

## Context
The marketplace must maintain strict separation of seller-owned data across (eventually) thousands of sellers, while also supporting cross-seller platform operations (search indexing, platform analytics, fraud detection).

## Decision
Use a single shared PostgreSQL database with an explicit `sellerOrgId` column on every seller-scoped table, isolation enforced entirely at the application/authorization layer (`../contracts/21-multi-tenancy-and-seller-isolation.md`) — not schema-per-tenant, not database-per-tenant.

## Rationale
- Schema-per-tenant or database-per-tenant does not scale operationally to thousands-plus sellers (independent migration, backup, and monitoring burden per tenant).
- Cross-seller platform queries (search, analytics, fraud pattern detection) are naturally expressed against a shared schema; tenant-per-schema/database would require a federation layer for exactly the queries the platform needs most.
- Consistent with ADR-0001 (modular monolith) and ADR-0002 (PostgreSQL as sole authority) — per-tenant physical separation would work against both by fragmenting the single authoritative store.

## Alternatives Considered
- **Schema-per-seller:** rejected — migration/operational burden scales linearly (or worse) with seller count; cross-seller queries become cross-schema queries, adding complexity without a corresponding isolation benefit beyond what row-level `sellerOrgId` filtering already provides.
- **Database-per-seller:** rejected — same operational burden, more severe; connection-pooling and cross-seller analytics become substantially harder.
- **Postgres Row-Level Security (RLS) policies as the enforcement mechanism instead of application-layer guards:** considered as a defense-in-depth addition, not a replacement — RLS could be layered on top of the application-layer authorization in a later hardening pass without contradicting this decision, but is not adopted as the *sole* mechanism now because it would require every internal service connection (including platform-level admin/search-indexing paths) to correctly set a session-level tenant context on every query, which is an additional operational discipline the initial architecture does not yet require given the application-layer guard is already comprehensive per `21-multi-tenancy-and-seller-isolation.md` §3.

## Consequences
- Every seller-scoped repository method requires `sellerOrgId` at the type level (`21-multi-tenancy-and-seller-isolation.md` §3).
- Seller-isolation tests (`20-architecture-test-contract.md`) are a mandatory, first-class test category precisely because the isolation boundary is enforced in application code rather than by the database engine itself.
- Revisiting toward RLS as an added defense-in-depth layer is a natural future ADR if a security review identifies value in a second enforcement layer; it does not require restructuring the shared-database decision itself.
