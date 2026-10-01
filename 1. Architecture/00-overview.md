# Architecture Overview — Amazon-Style Ecommerce Marketplace

**Volume:** Architecture Volume 1 (Foundational Architecture)
**Status:** Foundational — authoritative for all later implementation work
**Audience:** Independent backend, frontend, mobile, infrastructure, and QA implementation agents working in separate conversations/repositories. This package is self-contained and must not require access to any prior conversation.

## 1. Purpose

This package defines the foundational architecture for an original, production-grade ecommerce marketplace comparable in capability class to Amazon Marketplace, Shopify, Etsy, and Mercado Libre. It is **not** an implementation. It is the binding technical contract that all later implementation prompts (backend, web, mobile, infrastructure, QA) must conform to.

## 2. How to Use This Package

1. Read `01-system-context.md` and `03-domain-architecture.md` first — they establish the vocabulary used everywhere else.
2. Treat `04-domain-ownership-matrix.md` as law: no module may write data it does not own.
3. Treat `28-cross-cutting-contracts.md` as the shared dictionary (IDs, timestamps, errors, pagination, envelopes) — every other document assumes these conventions.
4. `adr/` contains the rationale for irreversible or high-cost decisions. Do not silently deviate from an accepted ADR; propose a new ADR that supersedes it instead.
5. `openapi/marketplace-architecture.yaml` is a representative (not exhaustive) contract skeleton showing conventions, not a request to implement every endpoint now.

## 3. Document Index

| # | Document | Covers |
|---|---|---|
| 01 | 01-system-context.md | Actors, external systems, trust boundaries |
| 02 | 02-component-architecture.md | Executable/logical components, responsibilities |
| 03 | 03-domain-architecture.md | Bounded contexts, per-domain detail |
| 04 | 04-domain-ownership-matrix.md | Authoritative owner per data category |
| 05 | 05-data-architecture.md | Aggregates, entities, relationships |
| 06 | 06-transaction-boundaries.md | Concurrency, idempotency, consistency per critical operation |
| 07 | 07-api-architecture.md | REST conventions, versioning, representative contract |
| 08 | 08-auth-architecture.md | Authentication + authorization model |
| 09 | 09-event-architecture.md | Event envelope, catalog, delivery semantics |
| 10 | 10-outbox-architecture.md | Transactional outbox pattern and scope |
| 11 | 11-queue-architecture.md | BullMQ queue families, job contracts |
| 12 | 12-cache-architecture.md | Redis responsibility matrix |
| 13 | 13-search-architecture.md | Indexing pipeline, OpenSearch conventions |
| 14 | 14-media-architecture.md | Upload, storage, CDN, lifecycle |
| 15 | 15-notification-architecture.md | Channels, templates, delivery |
| 16 | 16-external-integrations.md | Payments, shipping, tax, email/SMS, fraud |
| 17 | 17-security-architecture.md | Threats and mitigations by boundary |
| 18 | 18-privacy-architecture.md | Data classification, retention, minimization |
| 19 | 19-observability-architecture.md | Logs, metrics, traces, correlation |
| 20 | 20-reliability-architecture.md | Timeouts, retries, circuit breaking, degradation |
| 21 | 21-scalability-architecture.md | Horizontal scaling per component, thresholds |
| 22 | 22-multi-region.md | Initial vs. target topology |
| 23 | 23-disaster-recovery.md | Backups, RTO/RPO, rebuild strategy |
| 24 | 24-client-architecture.md | Web/mobile/admin client responsibilities |
| 25 | 25-administration-architecture.md | Admin roles, audit, tooling boundary |
| 26 | 26-fraud-abuse-architecture.md | Rate limiting, abuse controls |
| 27 | 27-analytics-architecture.md | Operational vs. analytics data boundary |
| 28 | 28-cross-cutting-contracts.md | IDs, timestamps, errors, naming, config |
| 29 | adr/ (folder) | Architecture Decision Records |
| 30 | validation/architecture-validation-report.md | Consistency validation results |

## 4. Architectural Principles (Summary)

Full principle list is normative across every document below; summarized here for orientation:

- **Single responsibility per domain** — one authoritative owner per data category (see doc 04).
- **Explicit contracts over implicit coupling** — cross-domain access only via REST API, published events, or a queue job — never direct database access across domain boundaries.
- **Local transactions over distributed transactions** — no two-phase commit across services; cross-aggregate consistency is achieved via saga-style compensating workflows and the transactional outbox.
- **Idempotency by default** for anything that can be retried (API writes, webhook handlers, queue jobs, event consumers).
- **Stateless application tier** — all session/business state lives in PostgreSQL or Redis, never in process memory, so API instances scale horizontally without sticky sessions.
- **Search, cache, and analytics are derived, never authoritative.**
- **Secure and observable by default**, not bolted on later.
- **Modular monolith first** (see ADR-0001) — service boundaries are enforced in code/module structure now, with extraction to standalone services deferred until a concrete scaling or ownership signal requires it.

## 5. Technology Direction (Binding)

| Layer | Technology |
|---|---|
| Web | Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, date-fns, Recharts, Framer Motion |
| Mobile | React Native, Expo, TypeScript |
| Backend | NestJS, TypeScript, REST, WebSockets/SSE (selectively), Webhooks, OpenAPI/Swagger |
| Transactional DB | PostgreSQL 16+, Prisma ORM |
| Cache/ephemeral state | Redis 7+ |
| Search | OpenSearch (Elasticsearch-API-compatible; see ADR-0004) |
| Object storage | S3-compatible (AWS S3) |
| Payments | Stripe (Stripe Connect for seller payouts) |
| Background jobs | BullMQ on Redis |
| Infra | AWS, Docker, Kubernetes (EKS) where justified, Helm, Terraform, GitHub Actions |
| Observability | OpenTelemetry, Prometheus, Grafana, Loki, Tempo |

Deviating from this table requires a superseding ADR, not an ad hoc implementation choice.

## 6. Repository State

No repository was available in the execution environment at the time this package was produced (the working directory contained no marketplace source, configuration, schema, or prior documentation). Accordingly, this package is written to be **portable and implementation-independent**: it makes no claims about existing code and defines the target architecture from first principles. When a real repository exists, the first action of any later implementation prompt must be to inspect it and reconcile actual state against this package, recording discrepancies as new ADRs or amendments rather than silently overriding either source.

## 7. What This Volume Does Not Do

Per the governing prompt, this volume does not implement backend modules, frontend/mobile UI, CI/CD pipelines, or provisioned cloud infrastructure. Where concrete schemas, interfaces, or configuration are shown, they exist to make the architecture unambiguous for later implementers — they are not a claim that corresponding running code exists.
