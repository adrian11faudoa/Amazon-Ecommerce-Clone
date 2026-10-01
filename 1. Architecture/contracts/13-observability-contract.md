# Observability Contract (Detail)

Extends `../19-observability-architecture.md` with the canonical log-field list, metric-naming/cardinality rules, and the health/readiness/startup/shutdown contract.

## 1. Canonical Log Fields (Every Structured Log Line)

| Field | Required | Notes |
|---|---|---|
| `timestamp` | Yes | UTC, ISO-8601 |
| `level` | Yes | `debug \| info \| warn \| error \| fatal` |
| `correlationId` | Yes (when in a request/job context) | Per `../28-cross-cutting-contracts.md` §6 |
| `service` | Yes | The NestJS module name (`../28-cross-cutting-contracts.md` §10 naming) |
| `operation` | Yes | Command/query/job name, e.g., `CreateOrder`, `search.index-product` |
| `outcome` | Yes for operation-completion logs | `success \| failure` |
| `durationMs` | Yes for operation-completion logs | — |
| `actorId` / `actorType` | Where applicable | Never the actor's raw PII — ID only |
| `environment` | Yes | `local \| development \| test \| staging \| production` |
| `region` | Yes once multi-region is active (`../22-multi-region.md`); omitted in the single-region initial deployment | — |
| `message` | Yes | Human-readable, never contains PII values (`../18-privacy-architecture.md` §6) |
| Domain-specific fields | As needed | Entity IDs, never full entity dumps |

## 2. Standard Dimensions (Metrics & Traces)

Every metric and trace span carries, as labels/attributes: `service`, `environment`, `region` (once applicable), `domain` (bounded context name), `operation`, `outcome`. This is the fixed dimension set referenced by `../19-observability-architecture.md` §3.

## 3. Metric Naming & Cardinality Rules

- Naming: `snake_case`, `{domain}_{noun}_{unit}` where a unit suffix applies (`_total`, `_seconds`, `_bytes`, `_count`), per `../28-cross-cutting-contracts.md` §14.
- **Cardinality rule (binding):** a label's value set must be bounded and known in advance (e.g., `outcome ∈ {success, failure}`, `queueName ∈ {the fixed queue list in 05-events-and-queues.md §5}`). **Never** use an unbounded value as a label — no `userId`, `orderId`, `sellerOrgId`, or free-text error message as a label value (these belong in logs/traces, not metric labels) — this is what keeps Prometheus stable under production cardinality.
- Example compliant metric: `checkout_completed_total{outcome="success"}`. Example **non-compliant** (forbidden) metric: `checkout_completed_total{customerId="..."}`.

## 4. Health & Readiness Contract

| Endpoint | Checks | Used For |
|---|---|---|
| `/health/live` | Process responsive, no dependency checks | Kubernetes liveness probe — a failing liveness check triggers a pod restart; it must **not** depend on Postgres/Redis/OpenSearch reachability, or a database blip would cause a restart storm across every replica simultaneously |
| `/health/ready` | Postgres reachable (lightweight `SELECT 1`), Redis reachable (`PING`) | Kubernetes readiness probe — a failing readiness check removes the pod from load-balancer rotation without killing it, which is the correct response to "I can't currently serve requests well" |

## 5. Startup Behavior

- On process start, the application validates its full configuration schema (`10-configuration-contract.md` §5) before opening any listener — a missing required environment variable is a fast, clear startup failure (non-zero exit, descriptive log line), never a runtime `undefined` error discovered mid-request.
- Database migrations are **not** run automatically on application startup in any environment above `local`/`development` (Master Prompt "MIGRATION ARCHITECTURE" implications, detailed in `17-migration-and-database-operations.md` §1) — the application starts against whatever schema is currently deployed and expects a separate, explicit migration step to have already run as part of the deployment pipeline (`18-deployment-and-environments.md` §3).
- Worker processes additionally verify BullMQ/Redis connectivity before beginning to consume — a worker that cannot reach Redis fails its own readiness-equivalent check (workers use the same `/health/ready` pattern on an internal port for Kubernetes probing) rather than looping on connection errors indefinitely without backoff.

## 6. Graceful Shutdown

- On `SIGTERM`: the API stops accepting new connections, finishes in-flight requests up to a bounded grace period (default 30s), then exits.
- Workers: per-queue shutdown behavior is defined in `05-events-and-queues.md` §5's "Shutdown Behavior" column — the general rule is "finish what's safely finishable within the grace period, let anything else be picked up by another replica via the queue's own redelivery mechanism," never a hard kill of an in-flight, non-idempotent operation without checking whether it's safe to interrupt.

## 7. Migration Safety (Cross-Reference)

Full migration strategy lives in `17-migration-and-database-operations.md` §1 — this document only asserts the *startup-time* rule above (migrations are not run implicitly at boot) as an observability/operational-safety concern, since an implicit migration-on-boot is a common source of the exact kind of surprising, hard-to-diagnose incident this contract exists to prevent.
