# Cross-Cutting Architecture Contracts

Binding for every later implementation prompt (backend, web, mobile, infra, QA). Deviating from any convention here requires a superseding ADR.

## 1. Identifiers

- All primary keys: **UUIDv7** (time-orderable UUID), stored as Postgres `uuid` type, serialized over the API as the standard `8-4-4-4-12` hyphenated string form.
- IDs are generated at the application layer (not DB `gen_random_uuid()`, which produces UUIDv4) so that time-ordering is preserved for index locality and debugging.
- IDs are never reused, never sequential integers, and stable across database, API, events, queues, logs, clients, and third-party integrations.

## 2. Timestamps

- Storage: Postgres `timestamptz`, always written/read in UTC.
- API serialization: ISO-8601 with `Z` suffix, e.g. `2026-09-16T14:32:00Z`. Never a naive local-time string, never a Unix epoch integer in API responses (Unix epoch is acceptable internally in metrics/logs only).
- No business event that requires exact ordering relies on wall-clock timestamp alone if two events could share a timestamp at the precision stored — use the per-aggregate `sequence` mechanism (`09-event-architecture.md` §4) where ordering is genuinely load-bearing.

## 3. Errors

Canonical shape defined in `07-api-architecture.md` §6. `code` values are a closed, documented enum per endpoint in the OpenAPI contract — never invented ad hoc by a client or silently changed by the backend without a version-aware migration note.

## 4. Pagination

Cursor-based, canonical shape defined in `07-api-architecture.md` §4. Every collection endpoint uses this shape — no endpoint invents its own pagination envelope.

## 5. Authentication & Authorization

- Access token: JWT, RS256/EdDSA signed, 15-minute lifetime, claims `sub`, `roles`, `sellerOrgId?`, `sessionId`, `iat`, `exp`.
- Refresh token: opaque, rotated-on-use, stored hashed.
- Every backend route declares its required role(s)/permission(s) explicitly (no implicit-public routes) — see `08-auth-architecture.md`.

## 6. Correlation IDs

- Header name: `X-Correlation-Id`. If absent on an inbound request, the backend generates one and returns it on the response. Propagated into every log line, event envelope (`correlationId` field), and job payload originating from that request.

## 7. Event Envelope

Canonical shape defined in `09-event-architecture.md` §2. `eventType` format: `domain.pastTenseAction.vN`.

## 8. Job Payload Conventions

- Every BullMQ job payload includes: the domain identifiers needed to re-derive current state (never a full denormalized snapshot the handler blindly trusts), a `correlationId`, and — where the job is triggered by an event — the originating `eventId` for dedup.
- Job names: `domain.action` (e.g., `search.index-product`, `notification.send-email`), matching the queue-family naming in `11-queue-architecture.md`.

## 9. Configuration & Environment Variable Naming

- Format: `MODULE_KEY` upper snake case, e.g. `STRIPE_SECRET_KEY`, `DATABASE_URL`, `REDIS_URL`, `OPENSEARCH_URL`, `S3_BUCKET_MEDIA`, `JWT_SIGNING_KEY`.
- Per-environment values are never hardcoded in source; local development defaults (non-secret only) may ship in a `.env.example` template, never a populated `.env`.

## 10. Service / Module Naming

- Backend NestJS modules named after their bounded context in PascalCase + `Module` suffix: `IdentityModule`, `CatalogModule`, `InventoryModule`, `CartModule`, `CheckoutModule`, `OrderModule`, `PaymentModule`, `FulfillmentModule`, `ReturnModule` (co-located with `FulfillmentModule` or split per team decision, but never ambiguously merged with `OrderModule`), `ReviewModule`, `NotificationModule`, `MediaModule`, `SearchModule`, `AdministrationModule`, `ModerationModule`, `FraudModule`, `AnalyticsModule`.
- Domain naming matches exactly across code, database table names (snake_case of the same noun, e.g. `inventory_item`), events (`inventory.*`), and documentation — no synonym drift (never "stock" in one place and "inventory" in another for the same concept).

## 11. Enum Naming

- API-facing enum values: UPPER_SNAKE_CASE strings (`PUBLISHED`, `PENDING`, `AUTHORIZED`).
- Database-level: Postgres native enum types or check-constrained text columns matching the same string values, so no translation layer is needed between DB and API.

## 12. Money

- Always represented as an integer amount in minor currency units (e.g., cents) plus an explicit ISO 4217 currency code field — never a floating-point decimal, never an implicit "USD assumed" default.

## 13. Logging Field Names

- Standard fields on every structured log line: `timestamp`, `level`, `correlationId`, `service` (module name), `message`, plus event-specific fields. No PII values in field values per `18-privacy-architecture.md` §6.

## 14. Metric Naming

- Prometheus metric names: `snake_case`, prefixed by domain/component, e.g. `checkout_completed_total`, `inventory_reservation_duration_seconds`, `outbox_pending_count`, `search_indexing_lag_seconds` — consistent with the metric names referenced throughout this package so dashboards and alerts can be built directly from these documents without renaming.
