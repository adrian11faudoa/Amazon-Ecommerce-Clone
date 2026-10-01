# Configuration Contract

Extends `../28-cross-cutting-contracts.md` §9 with the full environment-variable catalog structure and the non-sensitive/secret separation rule.

## 1. Naming Convention (Restated, Binding)

`MODULE_KEY`, upper snake case. `MODULE` is the owning domain/infrastructure area (`DATABASE`, `REDIS`, `STRIPE`, `S3`, `OPENSEARCH`, `JWT`, `SMTP`/`SMS`/`PUSH`, `OTEL`, `APP`).

## 2. Catalog (Representative, by Module)

| Variable | Module | Sensitive? | Notes |
|---|---|---|---|
| `DATABASE_URL` | Database | Yes (contains credentials) | Postgres connection string |
| `DATABASE_POOL_MIN` / `DATABASE_POOL_MAX` | Database | No | Connection pool sizing (`17-migration-and-database-operations.md` §3) |
| `DATABASE_STATEMENT_TIMEOUT_MS` | Database | No | Per-query timeout ceiling |
| `REDIS_URL` | Redis | Yes | Connection string |
| `REDIS_CACHE_DB_INDEX` / `REDIS_QUEUE_DB_INDEX` | Redis | No | Logical DB separation (`06-redis-namespace-catalog.md` §"Rules" item 4) |
| `OPENSEARCH_URL` | Search | No (endpoint, not a credential, if using IAM-based auth) | — |
| `OPENSEARCH_INDEX_ALIAS_PRODUCTS` | Search | No | Defaults to `products` |
| `S3_BUCKET_MEDIA` / `S3_BUCKET_DOCUMENTS` / `S3_BUCKET_BACKUPS` | Storage | No (bucket names, not credentials — access is via IAM role, not embedded keys) | — |
| `STRIPE_SECRET_KEY` | Payment | **Yes** | Never logged, never in a client bundle |
| `STRIPE_WEBHOOK_SIGNING_SECRET` | Payment | **Yes** | — |
| `STRIPE_PUBLISHABLE_KEY` | Payment | No (designed to be public, used client-side) | — |
| `JWT_SIGNING_KEY` / `JWT_SIGNING_KEY_ID` | Identity & Access | **Yes** | Asymmetric private key; public key distributed for verification only |
| `JWT_ACCESS_TOKEN_TTL_SECONDS` | Identity & Access | No | Default `900` (15 min, `../08-auth-architecture.md` §2) |
| `SMTP_API_KEY` / `SMS_PROVIDER_API_KEY` / `PUSH_PROVIDER_CREDENTIALS` | Notification | **Yes** | — |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Observability | No | — |
| `APP_ENV` | App | No | `local \| development \| test \| staging \| production` (`18-deployment-and-environments.md`) |
| `APP_BASE_URL` | App | No | Used for constructing links in notifications, signed-URL callback references |
| `RATE_LIMIT_DEFAULT_WINDOW_SECONDS` | Shared middleware | No | Overridable per endpoint class in code, this is the fallback default |
| `FEATURE_FLAG_*` | Feature flags | No | See §4 |

This table is representative, not exhaustive — the full catalog grows as backend implementation proceeds; every new variable follows the naming convention and is classified sensitive/non-sensitive at the time it's introduced, recorded in the codebase's own `.env.example` (non-sensitive defaults only, per the Master Prompt's "NO HARDCODED SECRETS" rule).

## 3. Sensitive vs. Non-Sensitive Separation (Enforcement)

- Sensitive values live only in the platform secret manager (AWS Secrets Manager or equivalent), injected as environment variables at container start — never committed, never in `.env` files beyond local development stubs with placeholder values, never in CI logs (CI secret-scanning enforces this, `../17-security-architecture.md` §5).
- Non-sensitive configuration may ship a real default in `.env.example` and in Helm chart `values.yaml` defaults.
- A variable's sensitivity classification is fixed at introduction and reviewed in code review — reclassifying a variable from non-sensitive to sensitive (discovering it was more sensitive than thought) is itself a security-relevant change requiring immediate secret rotation if it had been in a non-secret location.

## 4. Feature Flags

- Stored in Postgres (`FeatureFlag` table: `key`, `enabled`, `rolloutPercentage`, `scope` [global/per-seller/per-cohort]), cached in Redis (`config:{flagKey}`, per `06-redis-namespace-catalog.md`), never environment-variable-only (environment variables are process-restart-bound; flags need runtime toggling without a deploy).
- An `FEATURE_FLAG_*` environment variable, where present, is a **deployment-time override/kill-switch** for a specific environment (e.g., forcibly disabling a flag in production regardless of its DB value) — not the primary flag storage mechanism.

## 5. Per-Environment Values

Never hardcoded into business logic (Master Prompt "ENVIRONMENT MANAGEMENT" requirement). Every environment-specific value (a provider's sandbox vs. live API base URL, a feature flag's default) is injected via configuration, validated at application startup (a Zod/class-validator config schema fails fast on missing required variables, per `13-observability-contract.md` §"Startup Behavior" in the health/readiness detail) — never discovered at request time as a `undefined` value causing a confusing downstream error.
