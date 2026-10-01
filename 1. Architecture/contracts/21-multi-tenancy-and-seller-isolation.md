# Multi-Tenancy & Seller Isolation Contract

Extends `../04-domain-ownership-matrix.md` and `../08-auth-architecture.md` §7 with the explicit isolation-model decision the Volume 2 prompt requires (Volume 1 asserted the *rule*; this document records the *decision and rationale* among the alternatives named in the prompt).

## 1. Isolation Model Decision

**Shared database, seller-owned rows, enforced by application-layer authorization** (not schema-level separation, not separate databases, not a hybrid). Every seller-scoped table (`Product`, `ProductVariant`, `Sku`, `Price`, `InventoryItem`, `Storefront`, `SellerUser`, the `OrderItem` subset relevant to a seller) carries an explicit `sellerOrgId` column, indexed, and every query touching these tables is scoped by it.

## 2. Rationale (ADR-Level, Recorded Here and Cross-Referenced from `../adr/`)

- **Shared database with row-level ownership** was chosen over schema-per-seller or database-per-seller because: (a) the platform has thousands, eventually potentially far more, sellers — schema/database-per-tenant does not scale operationally at that count (thousands of schemas/databases to migrate, back up, and monitor independently); (b) cross-seller platform-level queries (search indexing, platform analytics, fraud pattern detection across sellers) are naturally expressed against a shared schema, whereas schema/database-per-tenant would require a federation layer for exactly the queries the platform needs most; (c) this is consistent with ADR-0002 (PostgreSQL as sole transactional authority) and ADR-0001 (modular monolith) — introducing per-tenant schema/database separation would work against both.
- **This decision is recorded as ADR-0008** (see `../adr/adr-0008-shared-db-seller-isolation.md`, added alongside this document).

## 3. Enforcement (Restated, Made Concrete)

- Every repository method that reads/writes a seller-scoped table requires a `sellerOrgId` parameter **at the type level** (the repository's TypeScript method signature has no overload that omits it) — there is no code path that can query, e.g., `Product` without a `sellerOrgId` filter except the small, explicitly named set of platform-level admin/search-indexing paths, each of which uses a distinct, separately-authorized code path (never the same method a seller-facing request handler calls).
- The `sellerOrgId` used in every such query is **always** derived from the authenticated actor's token claim (`../08-auth-architecture.md` §7), never from a client-supplied path/body parameter for non-admin actors — a mismatch is a `403`, not a filtered/empty result (an empty result would leak the *existence* of another seller's resource by its absence-vs-403 distinction; returning `403` uniformly avoids this).

## 4. Support/Administrator Override Boundary

- PlatformAdmin and (narrowly) Support may cross seller boundaries for legitimate operational reasons (§ per `11-security-and-authorization-matrix.md` §2) — this is **not** a bypass of the isolation model, it is a distinct, separately-authorized, always-audited code path (`AdminOrderReadService` vs. `SellerOrderReadService`, e.g.) that happens to query the same underlying tables.
- No seller-facing endpoint accepts an "admin override" flag or header — admin access always goes through dedicated admin routes (`11-security-and-authorization-matrix.md` §1's `admin-*` rate-limit categories), never a parameter on a seller route that could be probed/guessed.

## 5. Audit Implications

Every cross-seller read/write by Support/Admin produces an `AuditLogEntry` per `12-audit-contract.md` §1's "Support access to customer/order/payment data" row — this is the mechanism that makes the isolation model's necessary exceptions accountable rather than an unmonitored back door.

## 6. Query-Level Requirement (Binding)

No query against a seller-scoped table may filter by `sellerOrgId` **after** fetching (e.g., `fetchAll().filter(row => row.sellerOrgId === callerOrgId)`) — the filter must be part of the database query itself (`WHERE sellerOrgId = :callerOrgId`), both for correctness under pagination and to avoid ever materializing another seller's row into application memory even transiently.
