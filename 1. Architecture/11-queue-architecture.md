# Queue Architecture (BullMQ)

## 1. Queue Families

| Queue | Job Types | Payload Ownership | Concurrency | Priority | Retry Policy | Backoff | Timeout | Idempotency | Dead-Letter |
|---|---|---|---|---|---|---|---|---|---|
| `event-dispatch` | Outbox → event-bus fanout | Outbox message id + envelope | High (matches outbox throughput) | Normal | 5 attempts | Exponential, 2s base | 10s | Dispatcher checks `OutboxMessage.status` before publish | After 5 failures → `event-dispatch-dlq`, alert |
| `search-indexing` | Index/remove one product document | `{ productId, eventId }` | Medium, scaled with catalog write volume | Normal (bulk reindex = low priority) | 5 attempts | Exponential, 5s base | 30s | Upsert by `productId`, keyed by latest `eventId`/version — reprocessing is safe | After 5 failures → `search-indexing-dlq`, alert; periodic reconciliation job re-diffs Postgres vs. index |
| `media-processing` | Thumbnail/variant generation, malware scan | `{ mediaAssetId }` | Medium (CPU-bound, isolated pool) | Normal | 3 attempts | Exponential, 10s base | 120s | Reprocessing overwrites the same derived variant path — safe | After 3 failures → `media-processing-dlq`, asset flagged `status=failed`, seller notified |
| `notification-email` | Transactional email send | `{ notificationId, templateId, recipient }` | High | Normal; OTP/security emails = high priority sub-queue | 5 attempts | Exponential, 15s base | 30s | Dedup key `(eventId, channel)` recorded in `NotificationLog` before send | After 5 failures → `notification-email-dlq`, alert if volume spikes |
| `notification-sms` | Transactional SMS send | `{ notificationId, phone }` | Medium (cost-sensitive) | High for OTP | 3 attempts | Exponential, 15s base | 30s | Same dedup pattern | Same pattern |
| `notification-push` | Push send | `{ notificationId, deviceToken }` | High | Normal | 3 attempts | Exponential, 10s base | 20s | Same dedup pattern | Same pattern |
| `fulfillment-workflows` | Label purchase, tracking sync poll | `{ shipmentId }` | Medium | Normal | 5 attempts | Exponential, 30s base | 60s | Provider idempotency key reused | After 5 → `fulfillment-dlq`, seller/ops alerted |
| `reconciliation` | Payment↔Stripe reconciliation, inventory-reservation sweep, outbox health check | `{ jobType, windowStart, windowEnd }` | Low, scheduled | Low | 3 attempts | Fixed 60s | 300s | Reconciliation window is idempotent by construction (re-diff, not re-apply blindly) | After 3 → alert only (no user-facing impact) |
| `analytics-ingest` | Batch analytics event write to warehouse sink | `{ batchId }` | Low, scheduled/batched | Low | 3 attempts | Exponential, 60s base | 120s | Batch id dedup | After 3 → `analytics-dlq`, non-blocking alert |
| `scheduled-cleanup` | Expired cart purge, expired media orphan cleanup, notification-log rollup | `{ jobType }` | Low, cron-scheduled | Low | 2 attempts | Fixed 300s | 600s | Cleanup queries are naturally idempotent (delete-where-condition) | Alert only |
| `fraud-scoring` | Async risk scoring for completed orders/accounts | `{ subjectType, subjectId }` | Medium | Normal | 3 attempts | Exponential, 20s base | 60s | Upsert `RiskSignal` by `(subjectType, subjectId, ruleVersion)` | After 3 → `fraud-scoring-dlq`, falls back to "unscored" (does not block the order) |
| `seller-bulk-import` | Per-row catalog/inventory bulk import processing | `{ jobId, batchRowId }` | Medium, per-seller rate-limited | Normal | 3 attempts | Exponential, 10s base | 30s | `batchRowId` idempotency key | After 3 → row marked `failed` in job report, batch continues |

## 2. Cross-Cutting Queue Requirements

- **Graceful shutdown:** every worker drains in-flight jobs (BullMQ's `close()` with a grace period) before process exit during deploys; no job is force-killed mid-execution without a chance to complete or safely re-queue.
- **Observability:** every queue emits `jobs_waiting`, `jobs_active`, `jobs_completed_total`, `jobs_failed_total`, `queue_lag_seconds` to Prometheus; dead-letter queue depth is a paged alert, not just a dashboard metric.
- **Non-idempotent operations are never blindly retried** — e.g., a provider charge call is retried only if the provider's own idempotency key guarantees safety; otherwise the job fails fast and requires reconciliation rather than automatic retry.
- **Priority is a scheduling hint, not a correctness mechanism** — no queue design assumes strict FIFO ordering across priority levels.
