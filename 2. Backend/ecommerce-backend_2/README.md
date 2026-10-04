# Marketplace Backend

Backend for the ecommerce marketplace project, built incrementally:

- **Volume 1 — Identity & Access Foundation**: application bootstrap,
  configuration, database/Redis integration, authentication, sessions,
  email verification, password reset, authorization (RBAC +
  seller-organization isolation), rate limiting, audit logging,
  observability.
- **Volume 2 — Catalog & Seller Commerce**: categories, typed product
  attributes, products, variants, SKUs, seller offers, exact-money
  pricing with history, promotions, secure media upload orchestration,
  a transactional outbox, and BullMQ-based search-index relay. Full
  detail in `docs/CATALOG.md`.

**Out of scope so far** (see the prompts): inventory reservation, carts,
checkout, orders, payments, shipping, returns, review submission,
complete search querying, complete seller settlement, moderation,
analytics, production infrastructure provisioning.

## Stack

NestJS · TypeScript · PostgreSQL (Prisma) · Redis (ioredis) · BullMQ ·
S3-compatible object storage (AWS SDK v3) · JWT access tokens + rotating
opaque refresh tokens · argon2id password hashing · pino structured
logging · OpenTelemetry (optional) · Jest.

## Getting started

```bash
cp .env.example .env       # then set a real JWT_ACCESS_SECRET
docker compose up -d       # starts local Postgres + Redis
npm install
npx prisma generate
npx prisma migrate dev     # applies both migrations under prisma/migrations/
npm run start:dev
```

API docs (non-production only): `http://localhost:3000/docs`
Health: `GET /health/live`, `GET /health/ready`

## Environment variables

See `.env.example` for the full list with defaults. Startup fails fast
(see `src/config/env.validation.ts`) if required variables are missing,
malformed, or — in production — if `JWT_ACCESS_SECRET` is left as the
placeholder value.

## Authentication & session model

- Access tokens: short-lived JWTs (`JWT_ACCESS_TTL_SECONDS`, default 15m),
  signed with `JWT_ACCESS_SECRET`, carrying the user's platform roles.
- Refresh tokens: opaque, high-entropy, **rotate on every use**. Only the
  SHA-256 hash is ever persisted (`sessions.refreshTokenHash`). Presenting
  an already-rotated refresh token is treated as a replay/compromise
  signal and revokes the user's entire session family
  (`SessionsService.rotate`).
- Password hashing: argon2id via the `argon2` library, OWASP-recommended
  work factors (`PasswordService`).
- Password reset / email verification: opaque one-time tokens, hashed at
  rest, with explicit expiry and single-use consumption.
- Anti-enumeration: login always performs a password-hash comparison
  (against a static dummy hash when no account exists) before returning a
  single generic `INVALID_CREDENTIALS` error; registration-adjacent flows
  (`resend-verification`, `password-reset/request`) always return `204`
  regardless of whether the account exists.

## Authorization model

- Platform roles (`CUSTOMER`, `SUPPORT_AGENT`, `MODERATOR`,
  `PLATFORM_ADMIN`) map to permissions via
  `src/authorization/role-permissions.map.ts` — the single source of
  truth for what each role grants (least privilege; add new
  permissions there, don't hardcode role checks elsewhere).
- Seller-organization roles (`SELLER_ADMIN`, `SELLER_STAFF`) are
  **re-derived from the database on every request** that targets a
  `:organizationId` route param — see `PermissionsGuard` and
  `AuthorizationService.requireSellerOrganizationAccess`. A client can
  never gain access to another seller's data by supplying a different
  organization ID; the guard always checks the caller's *own* membership
  row for that exact ID.
- `PLATFORM_ADMIN` can act across organizations (support/ops); every such
  action should be paired with an `AuditService.record` call at the
  service layer (already done for the endpoints implemented here).

## Catalog & seller commerce (Volume 2)

Full detail in `docs/CATALOG.md`. Highlights:

- **Seller isolation**: every write re-derives ownership from the
  database (never trusts a client-supplied org/resource ID) and returns
  404 (not 403) on cross-tenant access, matching the auth model above.
- **Product lifecycle**: `DRAFT → ACTIVE ⇄ PAUSED → ARCHIVED`, with
  publish-time validation (category + at least one active, priced,
  orderable variant) — see `ProductsService.transitionStatus`.
- **Duplicate prevention as database constraints**: unique SKU per
  seller, unique variant-attribute-combination per product (via a
  SHA-256 signature hash), not just application checks.
- **Pricing**: exact integer minor units (BigInt, never floats), full
  history, and a transactional "deactivate-then-activate" pattern backed
  by a partial unique index so at most one price is ever active per
  offer.
- **Media**: server-generated storage keys (never client-supplied),
  transactional-outbox-then-external-call ordering, and a finalize step
  that can *never* mark an asset ready without the storage provider
  confirming the object exists — see `LocalStubStorageProvider`, which
  is honest about not having a real backing store.
- **Events**: every catalog mutation writes a transactional `OutboxEvent`
  row, relayed to a BullMQ search-index queue by a repeatable job, with
  bounded retries and a `FAILED` terminal state for operator visibility.

## Rate limiting

Redis-backed fixed window (`RateLimitService`), applied via
`@RateLimitScope('login' | 'register' | 'passwordReset' |
'emailVerification' | 'tokenRefresh')` on `AuthController` routes.
**Fails closed**: if Redis is unreachable, sensitive auth endpoints are
treated as rate-limited rather than silently unprotected.

## Observability

- Structured JSON logs via `nestjs-pino`, with `requestId`/`correlationId`
  attached to every line (see `RequestContext` +
  `RequestContextMiddleware`), and secrets/tokens redacted.
- `GET /health/live` (liveness — process only) and `GET /health/ready`
  (readiness — checks Postgres + Redis) via `@nestjs/terminus`.
- Optional OpenTelemetry tracing: set `OTEL_ENABLED=true` and install
  `@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations-node`,
  and `@opentelemetry/exporter-trace-otlp-http` (not installed by default
  — see "Known environment caveats" below).

## Testing

```bash
npm test          # unit tests
npm run test:cov  # with coverage
npm run test:e2e  # end-to-end (requires Postgres + Redis running)
```

51 unit tests from Volume 1 plus 61 from Volume 2 (112 total) cover:
password hashing/policy, secure token generation/hashing, email
normalization, Redis-backed rate limiting (including fail-closed
behavior), refresh-token rotation and replay detection, the full auth
service (register/login/verify/reset, including anti-enumeration and
account-status checks), authorization/permission resolution and
seller-organization isolation, the permissions guard, the global
exception filter's error-shape/no-leakage guarantees, category
hierarchy cycle/depth prevention, typed attribute-value validation,
product lifecycle transitions and publish-readiness validation,
variant duplicate-combination/duplicate-SKU handling, offer and price
no-overlap logic, promotion date/discount/ownership validation, and
media upload ownership + honest (never-fabricated) finalization.

## Known environment caveats (read before assuming CI is broken)

This project was authored in a sandboxed environment whose network
egress allowlist does **not** include `binaries.prisma.sh`. Two
consequences, both resolved automatically once run somewhere with normal
network access:

1. **`npx prisma generate` could not be run here.** `@prisma/client`
   therefore doesn't yet export the generated model types/enums in this
   environment. Unit tests route around this via a hand-written test
   double (`test/prisma-client.mock.ts`, wired through Jest's
   `moduleNameMapper`) that mirrors `schema.prisma`'s enum values exactly
   — see the comment at the top of that file for the two-step cleanup
   once you've run `prisma generate` for real. `npx tsc --noEmit` in this
   environment reports "not exported" errors for `UserStatus`,
   `AuditOutcome`, `Session`, etc. for the same reason; run
   `npx prisma generate` first and they disappear.
2. **Both `prisma/migrations/*/migration.sql` files were hand-authored**
   (`20260101000000_init` from Volume 1 and `20260201000000_catalog_v2`
   from this milestone), not generated by `prisma migrate dev`, for the
   same reason. Each is a careful transcription of the corresponding
   `schema.prisma` state, but you should run
   `prisma migrate dev --name <name>` against an empty database once you
   have normal network access and diff the result against these files
   before trusting them in a real environment. Every migration after
   this one should be generated normally.
3. OpenTelemetry packages are **not** in `package.json` by design — see
   `src/observability/tracing/tracing.ts`. Tracing is fully wired but
   dynamically imports its three packages only when `OTEL_ENABLED=true`,
   so environments that don't use tracing don't carry the dependency.
   `npx tsc --noEmit` reports "cannot find module" for those three
   imports until you `npm install` them, which is expected.
4. **No real object storage or search cluster was reachable in this
   sandbox either.** `STORAGE_PROVIDER=local` (the default) uses
   `LocalStubStorageProvider`, which is honest that it has no real
   backing store (`headObject` always returns `exists: false`, so
   `MediaService.finalize` correctly refuses to mark anything `READY`
   under it — see `docs/CATALOG.md`). Configure `STORAGE_PROVIDER=s3`
   with real AWS credentials and a real bucket for working uploads — no
   code changes needed, only config. Likewise, `ConsoleSearchIndexClient`
   is the only search-index client implemented; it logs what it would
   index rather than connecting to a fabricated Elasticsearch/OpenSearch
   cluster (see `SEARCH_INDEX_CLIENT` in `search-indexing.module.ts` for
   where to swap in a real one).
5. **BullMQ's queue connection and the maintenance/search-index workers
   were not live-tested against a running Redis** in this sandbox (same
   `docker compose` dependency as Volume 1's Redis-backed rate limiter —
   there's simply no Redis process running here). The code is structured
   and unit-tested (`OutboxRelayService`, idempotent jobId-based
   enqueueing) but the actual queue/worker wiring should be smoke-tested
   against `docker compose up -d` before relying on it in production.

Everything else — `npm install` (see `package-lock.json`), `npx eslint`
(0 errors across both milestones), and `npm test` (112/112 passing) —
has been run and verified in this repository as delivered.
