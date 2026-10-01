# Observability Architecture

## 1. Pillars

| Pillar | Stack | Purpose |
|---|---|---|
| Logs | OpenTelemetry → Loki | Structured, queryable event records |
| Metrics | OpenTelemetry → Prometheus → Grafana | Dashboards, SLOs, alerting |
| Traces | OpenTelemetry → Tempo | Per-request distributed tracing across API → workers → external calls |

## 2. Correlation

Every inbound HTTP request is assigned (or propagates, if provided) a `correlationId` (also the trace's root span ID), attached to: the response's error envelope (`07-api-architecture.md` §6), every log line emitted while handling the request, every event/job enqueued as a result (propagated in the event envelope's `correlationId` field, `09-event-architecture.md`), and every outbound call to an external provider (as a custom header where the provider supports it, e.g., `Idempotency-Key`-adjacent metadata).

## 3. Instrumentation Coverage

| Component | Instrumented Signals |
|---|---|
| HTTP requests | Duration, status code, route, actor role (metric); full request/response metadata minus PII (log); span per request (trace) |
| Database operations | Query duration, row counts, connection pool utilization (metric); slow-query log (log); span per query (trace) |
| Redis | Command latency, hit/miss ratio per namespace, memory usage (metric) |
| Queues (BullMQ) | `jobs_waiting/active/completed/failed`, `queue_lag_seconds` per queue (metric); job lifecycle events (log); span per job execution linked to the originating request trace via `correlationId` (trace) |
| Event processing | Consumer lag, dedup-hit rate, dead-letter counts (metric) |
| WebSockets/SSE | Connection count, message throughput (metric) |
| External providers | Call latency, error rate, circuit-breaker state per provider (metric); span per outbound call (trace) |
| Payments | Intent creation/confirmation latency, webhook processing latency, reconciliation drift count (metric) |
| Search | Query latency, indexing lag (metric) |
| Media processing | Processing duration, scan failure rate (metric) |
| Business workflows | Checkout funnel step completion/drop-off, order-to-payment latency (business metric) |

## 4. Health Checks

- `/health/live` — process is running (no dependency checks; used for restart decisions).
- `/health/ready` — dependency checks (Postgres, Redis reachable); used for load-balancer/traffic-admission decisions; a `not-ready` instance is removed from rotation but not killed.

## 5. Sensitive-Data Logging Restrictions

Never logged, under any configuration: passwords, access/refresh tokens, MFA secrets, private keys, provider API secrets, card data (never received by the backend at all), full payment credentials. Structured logs reference entities by ID; PII values (email, address, phone) are omitted or truncated/hashed in log lines, consistent with `18-privacy-architecture.md` §6.

## 6. Dashboards & Alerting

- **Golden signals** per component: latency, traffic, errors, saturation.
- **Business dashboards:** checkout conversion funnel, order volume, payment success rate, fulfillment SLA adherence.
- **Actionable alerts** (paged, not just logged) for: elevated 5xx rate, payment webhook signature failures, outbox oldest-pending age exceeding SLO, dead-letter queue growth, search indexing lag exceeding SLO, database connection saturation, reconciliation drift beyond threshold.
- Alerts link directly to the relevant Grafana dashboard and a runbook reference (see documentation package expectations in the Master Prompt) — no alert fires without an associated response procedure.
