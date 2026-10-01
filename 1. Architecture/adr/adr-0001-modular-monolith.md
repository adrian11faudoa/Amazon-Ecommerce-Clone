# ADR-0001: Modular Monolith over Service-Oriented Decomposition (Initial Architecture)

## Status
Accepted

## Context
The platform must support millions of users, thousands of sellers, and high transaction volume, which could argue for microservices. However, the project is greenfield, with no existing team-ownership boundaries and no proven per-domain scaling divergence yet.

## Decision
Begin with a **modular monolith**: a single deployable NestJS backend application, internally decomposed into strictly bounded, independently-testable domain modules (see `03-domain-architecture.md`, `28-cross-cutting-contracts.md` §10) that communicate only through defined service interfaces and events — never shared tables. Background workers are a separately deployable process sharing the same domain layer and module boundaries.

## Rationale
- Strong transactional consistency is required for checkout/inventory/payment (`06-transaction-boundaries.md`); a modular monolith keeps these in local Postgres transactions without distributed-transaction complexity.
- No current signal (team size, deployment cadence divergence, proven scaling bottleneck) justifies the operational cost of running dozens of independently deployed services from day one.
- Module boundaries enforced in code (no cross-module repository imports) preserve the *option* to extract any domain into a standalone service later with a bounded migration (the module already speaks only through its public interface and events).

## Alternatives Considered
- **Full microservices from the start:** rejected — premature operational complexity, distributed-transaction risk for checkout/inventory, and no team-ownership signal requiring it yet.
- **Unstructured monolith (no module boundaries):** rejected — would erode domain ownership (`04-domain-ownership-matrix.md`) and make any future extraction a rewrite rather than a boundary lift.

## Consequences
- All domains deploy and scale together as one API tier and one worker tier initially (scaling is per-tier, not per-domain — see `21-scalability-architecture.md`).
- Extraction of a specific domain (e.g., Search or Notification, already the most event-driven and loosely coupled) into a standalone service is the anticipated first extraction if/when a concrete signal (independent scaling need, independent team ownership) appears.

## Migration Implications
Extracting a module later requires: replacing its in-process service calls with network calls (REST or a message broker) behind the same interface, introducing service-to-service authentication, and moving its owned tables to a dedicated schema/database — the module's *external* contract (its public interface and emitted events) does not need to change for consumers.
