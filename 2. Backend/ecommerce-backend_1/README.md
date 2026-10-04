# Marketplace Backend — Identity & Access Foundation (Volume 1)

Backend foundation and identity/access milestone for the ecommerce
marketplace project: application bootstrap, configuration, database/Redis
integration, authentication, sessions, email verification, password reset,
authorization (RBAC + seller-organization isolation), rate limiting, audit
logging, and observability.

**Out of scope for this milestone** (see the prompt): catalog, inventory,
pricing, cart, checkout, orders, payments, shipping, reviews, search,
notification content, production infrastructure provisioning.

## Stack

NestJS · TypeScript · PostgreSQL (Prisma) · Redis (ioredis) · JWT access
tokens + rotating opaque refresh tokens · argon2id password hashing ·
pino structured logging · OpenTelemetry (optional) · Jest.

## Getting started

```bash
cp .env.example .env       # then set a real JWT_ACCESS_SECRET
docker compose up -d       # starts local Postgres + Redis
npm install
npx prisma generate
npx prisma migrate dev     # applies prisma/migrations/20260101000000_init
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

51 unit tests currently cover: password hashing/policy, secure token
generation/hashing, email normalization, Redis-backed rate limiting
(including fail-closed behavior), refresh-token rotation and replay
detection, the full auth service (register/login/verify/reset, including
anti-enumeration and account-status checks), authorization/permission
resolution and seller-organization isolation, the permissions guard, and
the global exception filter's error-shape/no-leakage guarantees.

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
2. **`prisma/migrations/20260101000000_init/migration.sql` was
   hand-authored**, not generated by `prisma migrate dev`, for the same
   reason. It's a careful transcription of `schema.prisma`, but you
   should run `prisma migrate dev --name init` against an empty database
   once you have normal network access and diff the result against this
   file before trusting it in a real environment. Every migration after
   this one should be generated normally.
3. OpenTelemetry packages are **not** in `package.json` by design — see
   `src/observability/tracing/tracing.ts`. Tracing is fully wired but
   dynamically imports its three packages only when `OTEL_ENABLED=true`,
   so environments that don't use tracing don't carry the dependency.
   `npx tsc --noEmit` reports "cannot find module" for those three
   imports until you `npm install` them, which is expected.

Everything else — `npm install` (796 packages), `npx eslint --fix`
(0 errors), and `npm test` (51/51 passing) — has been run and verified
in this repository as delivered.
