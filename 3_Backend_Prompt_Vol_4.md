# AMAZON ECOMMERCE PLATFORM — BACKEND VOLUME 4 IMPLEMENTATION PROMPT

## ROLE

Act as the complete **Backend Engineering Team** responsible for completing the production-grade backend platform for the Amazon Ecommerce Platform.

Operate as a Principal Backend Architect, Staff Backend Engineers, Database Architect, Distributed Systems Engineer, Security Engineer, Performance Engineer, Reliability Engineer, QA Engineer, and DevOps-aware Backend Engineer working as one engineering organization.

Do not teach the implementation process. Perform the engineering work directly in the repository.

The objective is to implement the remaining cross-domain backend capabilities required for a production-grade global ecommerce marketplace, including administration, moderation, analytics foundations, advanced operational controls, privacy workflows, reconciliation, resilience, performance hardening, and backend-wide production readiness.

---

# PROJECT

Build the backend for a global, multi-seller ecommerce marketplace comparable in breadth and operational complexity to Amazon Marketplace.

The platform supports:

* Millions of customers.
* Thousands of sellers.
* Millions of products and variants.
* High-volume product search.
* Multi-seller commerce.
* Payments and refunds.
* Seller fulfillment.
* Returns.
* Reviews.
* Notifications.
* Seller payouts.
* Disputes.
* Administration.
* Moderation.
* Auditability.
* Analytics.
* Background processing.
* High availability.
* Horizontal scaling.
* Disaster recovery.

The backend must operate as a coherent platform rather than a collection of isolated modules.

---

# TECHNOLOGY DIRECTION

Use the following technology direction unless the repository already contains a compatible production-grade implementation that should be preserved.

## Backend

* NestJS.
* TypeScript.
* REST.
* Swagger/OpenAPI.
* Webhooks.
* WebSockets or SSE only where justified.

## Database

* PostgreSQL.
* Prisma.

## Cache and Coordination

* Redis.

## Search

* Elasticsearch or OpenSearch.

## Background Processing

* BullMQ.

## Storage

* S3-compatible object storage.
* CloudFront or equivalent CDN.

## Payments

* Stripe or an existing provider abstraction.

## Observability

* OpenTelemetry.
* Prometheus.
* Grafana.
* Loki and/or equivalent centralized logging.
* Tempo and/or equivalent tracing.

---

# SOURCE OF TRUTH

The repository is the source of truth.

Before implementation:

1. Inspect the complete repository.
2. Inspect all backend modules.
3. Inspect Prisma schema and migrations.
4. Inspect authentication and authorization.
5. Inspect catalog and inventory.
6. Inspect commerce workflows.
7. Inspect fulfillment.
8. Inspect payments and refunds.
9. Inspect seller payouts.
10. Inspect reviews and moderation.
11. Inspect notifications.
12. Inspect search.
13. Inspect event and queue infrastructure.
14. Inspect administration capabilities.
15. Inspect audit logging.
16. Inspect analytics functionality.
17. Inspect observability.
18. Inspect tests.
19. Inspect environment configuration.
20. Identify missing cross-domain capabilities and implementation gaps.

Do not assume another prompt was executed.

Do not rely on conversation history.

Do not recreate existing compatible infrastructure.

---

# BACKEND IMPLEMENTATION SCOPE

Implement and harden the backend platform across the following areas:

* Administrative operations.
* Moderation.
* Platform configuration.
* Feature/configuration controls.
* Analytics foundations.
* Operational reporting.
* Audit and compliance capabilities.
* Privacy workflows.
* Data export.
* Account deletion/deactivation workflows.
* Data retention foundations.
* Fraud/abuse protection foundations.
* Reconciliation.
* Backend-wide idempotency.
* Distributed locking where justified.
* Rate-limit hardening.
* API consistency.
* Performance hardening.
* Reliability hardening.
* Graceful degradation.
* Recovery workflows.
* Disaster-recovery support.
* Production health and readiness.
* Backend-wide security hardening.
* Backend-wide testing improvements.

Do not implement web or mobile UI.

---

# ADMINISTRATION DOMAIN

Implement production-grade administrative capabilities.

Administrative operations must support controlled management of:

* Customers.
* Sellers.
* Seller users.
* Products.
* Categories.
* Brands.
* Inventory.
* Orders.
* Payments.
* Refunds.
* Returns.
* Shipments.
* Reviews.
* Notifications.
* Promotions.
* Coupons.
* Payouts.
* Disputes.
* Search/indexing operations.
* Platform configuration.

Administrative APIs must be explicitly authorized.

Never rely on hidden routes or frontend restrictions for administrative security.

---

# ADMINISTRATIVE ROLES

Implement explicit administrative authorization.

Support appropriate roles/permissions for:

* Platform administrators.
* Operations administrators.
* Customer-support administrators.
* Catalog administrators.
* Seller-operations administrators.
* Finance administrators.
* Moderators.
* Security/operations personnel.

Use the repository's existing role/permission architecture when compatible.

Avoid granting every administrator unrestricted access when narrower permissions are appropriate.

---

# ADMINISTRATIVE ACTIONS

Administrative mutations must:

* Validate authorization.
* Validate business state.
* Record audit information.
* Preserve transactional integrity.
* Avoid direct uncontrolled database mutation.
* Produce relevant domain events where appropriate.

Do not allow generic arbitrary field mutation endpoints for sensitive resources.

---

# PLATFORM CONFIGURATION

Implement secure platform configuration foundations.

Configuration may include:

* Feature flags.
* Marketplace limits.
* Operational thresholds.
* Notification settings.
* Search configuration.
* Promotion limits.
* Rate-limit policies.
* Maintenance settings.
* Business policy values.

Configuration must not become an uncontrolled collection of arbitrary JSON.

Use explicit schemas and validation.

Sensitive secrets must remain in secure secret-management infrastructure rather than ordinary business configuration.

---

# FEATURE FLAGS

Implement feature-flag foundations where useful.

Support:

* Enable/disable state.
* Environment scope.
* Rollout configuration where required.
* Audit history.
* Safe defaults.

Feature flags must fail safely.

Do not make critical transactional correctness dependent on an unavailable feature-flag service.

---

# MODERATION

Implement moderation workflows for marketplace content.

Moderation may cover:

* Products.
* Product media.
* Reviews.
* Seller content.
* Customer-generated content.

Support:

* Pending moderation.
* Approved.
* Rejected.
* Hidden.
* Removed.
* Moderation reason.
* Moderator identity.
* Moderation timestamps.

Moderation actions must be auditable.

---

# ABUSE PREVENTION

Implement backend foundations for abuse prevention.

Protect against:

* Account abuse.
* Credential stuffing.
* Coupon abuse.
* Promotion abuse.
* Review manipulation.
* Automated scraping.
* Excessive API usage.
* Seller abuse.
* Inventory manipulation.
* Refund abuse.
* Repeated failed payment attempts.

Use:

* Rate limiting.
* Request throttling.
* Account/device/IP signals where appropriate.
* Idempotency.
* Audit records.
* Risk signals.

Do not build unsafe automated blocking that can silently lock legitimate users without operational recovery mechanisms.

---

# FRAUD/RISK FOUNDATION

Implement a provider-neutral risk evaluation foundation.

The system should support risk signals derived from legitimate platform activity, such as:

* Repeated failed payments.
* Abnormal refund behavior.
* Excessive coupon use.
* Unusual account activity.
* Seller anomalies.
* Repeated chargebacks.
* High-frequency suspicious operations.

Risk decisions must be explainable internally and auditable.

Do not expose sensitive fraud heuristics to untrusted clients.

Do not automatically take irreversible financial action without explicit business rules.

---

# ANALYTICS FOUNDATION

Implement backend analytics foundations without placing heavy analytical workloads on the transactional database.

Support event-driven collection of business metrics such as:

* Product views.
* Search activity.
* Cart activity.
* Checkout attempts.
* Orders.
* Payments.
* Refunds.
* Returns.
* Shipments.
* Reviews.
* Seller activity.
* Payouts.

Analytics events must be designed separately from transactional domain events where appropriate.

Do not overload PostgreSQL with unbounded analytical queries.

---

# ANALYTICS EVENT MODEL

Analytics events should contain appropriate metadata such as:

* Event ID.
* Event type.
* Timestamp.
* Entity ID where appropriate.
* Actor/customer context where permitted.
* Session context where permitted.
* Correlation ID.
* Source.
* Version.

Do not place unnecessary sensitive personal data into analytics events.

Support deduplication where duplicate analytics events would materially distort metrics.

---

# OPERATIONAL REPORTING

Implement backend reporting foundations for authorized users.

Reports may include:

* Orders.
* Revenue.
* Refunds.
* Returns.
* Seller performance.
* Product performance.
* Inventory.
* Fulfillment.
* Search.
* Promotions.
* Payouts.

Large reports must use asynchronous generation where appropriate.

Do not execute expensive unrestricted reporting queries synchronously against transactional tables.

---

# REPORT GENERATION

For asynchronous reports:

* Create a durable report request.
* Validate authorization.
* Validate requested scope.
* Queue the generation job.
* Track status.
* Store generated output securely.
* Provide controlled retrieval.
* Expire generated files according to policy.

Implement:

* Pending.
* Processing.
* Completed.
* Failed.
* Expired.

Report generation must be idempotent where appropriate.

---

# PRIVACY

Implement production-grade privacy foundations.

Support appropriate workflows for:

* Account deactivation.
* Account deletion requests.
* Personal-data export.
* Personal-data access.
* Data retention.
* Data minimization.
* Privacy auditability.

Do not delete records required for:

* Financial reconciliation.
* Legal obligations.
* Fraud investigation.
* Audit requirements.

Instead, apply appropriate anonymization or retention rules where required.

---

# DATA EXPORT

Implement customer data-export foundations.

Exports should include only information the authenticated customer is entitled to receive.

Potential categories include:

* Profile.
* Addresses.
* Orders.
* Reviews.
* Wishlist.
* Notification preferences.

Export generation should be asynchronous for large datasets.

Protect generated files with:

* Authorization.
* Expiration.
* Signed URLs or equivalent controlled access.
* Secure storage.

Do not expose another customer's data through export jobs.

---

# ACCOUNT DELETION

Implement controlled account deletion/deactivation workflows.

The system must distinguish between:

* Immediate account deactivation.
* Scheduled deletion.
* Anonymization.
* Data that must be retained.

Deletion must not break historical financial records.

Where records must remain for legal or operational reasons, remove or anonymize unnecessary personal information according to the applicable retention policy.

Deletion operations must be idempotent.

---

# DATA RETENTION

Implement explicit retention foundations.

Define retention handling for appropriate categories such as:

* Audit records.
* Logs.
* Notifications.
* Analytics events.
* Report files.
* Temporary uploads.
* Sessions.
* Queue records.
* Search indexes.

Retention jobs must be safe and observable.

Do not delete authoritative financial records merely because they are old.

---

# AUDIT SYSTEM

Harden the audit system across the platform.

Audit important actions involving:

* Authentication.
* Authorization changes.
* Seller administration.
* Catalog moderation.
* Inventory changes.
* Pricing changes.
* Promotions.
* Orders.
* Payments.
* Refunds.
* Returns.
* Payouts.
* Disputes.
* Administrative actions.
* Privacy operations.

Audit records must be append-oriented.

Ordinary application users must not be able to delete audit history.

---

# RECONCILIATION FRAMEWORK

Implement a reusable reconciliation framework.

The framework must support reconciliation between authoritative internal state and external/derived systems such as:

* Payment providers.
* Shipping providers.
* Payout providers.
* Search indexes.
* Notification providers.
* Object storage.
* Queues/outbox processing.

A reconciliation process must:

1. Identify scope.
2. Retrieve authoritative state.
3. Retrieve external/derived state.
4. Compare state.
5. Classify mismatches.
6. Record the mismatch.
7. Apply only safe automated remediation.
8. Escalate unresolved issues.
9. Record the result.

Never silently overwrite authoritative state.

---

# IDEMPOTENCY FRAMEWORK

Harden idempotency across the backend.

Provide consistent mechanisms for operations involving:

* Orders.
* Payments.
* Refunds.
* Inventory reservations.
* Coupon redemption.
* Payouts.
* Webhooks.
* Queue jobs.
* Report generation.
* Privacy operations.

Idempotency records must have:

* Scope.
* Key.
* Request identity where appropriate.
* Status.
* Result reference where appropriate.
* Created timestamp.
* Expiration/retention behavior.

Do not use one global idempotency namespace that creates accidental collisions.

---

# DISTRIBUTED LOCKING

Where distributed locking is genuinely required, implement it safely.

Potential uses include:

* Reconciliation.
* Scheduled jobs.
* Singleton maintenance operations.
* Index rebuild coordination.
* Resource-specific workflows.

Locks must have:

* Ownership.
* Expiration.
* Safe acquisition.
* Safe release.
* Failure recovery.

Do not use distributed locks as a substitute for database transactions.

Do not create indefinite locks.

---

# RATE LIMITING HARDENING

Review all rate-limited endpoints.

Ensure limits are appropriate for:

* Authentication.
* Password operations.
* Search.
* Cart operations.
* Checkout.
* Payments.
* Refunds.
* Reviews.
* Seller APIs.
* Admin APIs.
* Webhooks.

Rate limiting must work across multiple backend instances.

Do not accidentally rate-limit trusted internal workflows in a way that causes operational failure.

---

# API CONSISTENCY

Perform a backend-wide API consistency review.

Standardize where appropriate:

* Error structure.
* Pagination.
* Sorting.
* Filtering.
* Resource naming.
* Status codes.
* Validation responses.
* Correlation IDs.
* Idempotency headers.
* Authentication requirements.
* Authorization behavior.

Do not make unnecessary breaking changes.

Where an existing contract is already consumed by clients, preserve compatibility whenever practical.

---

# PERFORMANCE HARDENING

Perform backend-wide performance analysis.

Identify:

* N+1 database queries.
* Missing indexes.
* Unbounded queries.
* Excessive joins.
* Repeated external requests.
* Inefficient serialization.
* Cache misuse.
* Queue bottlenecks.
* Expensive synchronous workflows.

Optimize only after understanding actual behavior.

Use:

* Appropriate indexes.
* Cursor pagination.
* Batching.
* Caching.
* Connection pooling.
* Asynchronous processing.
* Efficient serialization.
* Query optimization.

Do not sacrifice correctness for performance.

---

# DATABASE PERFORMANCE

Review PostgreSQL access patterns.

Ensure:

* High-volume queries have appropriate indexes.
* Composite indexes match real query patterns.
* Foreign-key access paths are efficient.
* Pagination avoids large offsets where cursor pagination is more appropriate.
* Transactions remain appropriately scoped.
* Connection pools are configured safely.
* Long-running queries are observable.
* Lock contention is observable.

Do not create indexes blindly.

Remove clearly redundant indexes only when repository evidence supports doing so.

---

# REDIS PERFORMANCE

Review Redis usage.

Ensure:

* Keys have predictable namespaces.
* TTLs are appropriate.
* Memory growth is bounded.
* Large values are avoided.
* Cache invalidation is explicit.
* Distributed operations are safe.
* Redis failure does not corrupt authoritative data.

---

# QUEUE HARDENING

Review BullMQ workloads.

Ensure:

* Worker concurrency is controlled.
* Retries are bounded.
* Backoff is configured.
* Failed jobs are observable.
* Poison messages are recoverable.
* Jobs are idempotent.
* Queue growth is observable.
* Graceful shutdown works.
* Duplicate jobs do not create duplicate financial or transactional effects.

---

# GRACEFUL DEGRADATION

Implement graceful degradation for non-authoritative dependencies.

Examples:

* Search unavailable → transactional catalog and commerce remain operational where possible.
* Notification provider unavailable → notification jobs retry without blocking orders.
* Analytics unavailable → core commerce remains operational.
* Recommendation service unavailable → product browsing remains functional.
* Redis cache unavailable → authoritative database remains usable where safe.

Never degrade by bypassing:

* Authentication.
* Authorization.
* Payment verification.
* Inventory integrity.
* Financial controls.

---

# HEALTH AND READINESS

Implement production-grade health endpoints.

Distinguish:

* Liveness.
* Readiness.
* Startup health where applicable.

Health checks should verify critical dependencies appropriately without creating excessive load.

Do not mark an instance unhealthy merely because an optional dependency is temporarily unavailable.

Readiness must prevent traffic from reaching an instance that cannot safely serve required functionality.

---

# GRACEFUL SHUTDOWN

Implement graceful shutdown for:

* HTTP servers.
* Database connections.
* Redis connections.
* Queue workers.
* Event publishers.
* WebSocket/SSE connections where applicable.

Workers must stop accepting new jobs before shutting down.

In-flight work must receive an appropriate opportunity to complete or safely retry.

---

# SECURITY HARDENING

Perform a backend-wide security review.

Verify protection against:

* Broken authentication.
* Broken authorization.
* IDOR.
* Injection.
* SSRF.
* XSS.
* CSRF where applicable.
* Command injection.
* Malicious uploads.
* Webhook forgery.
* Replay attacks.
* Credential stuffing.
* Rate-limit bypass.
* Secret leakage.
* Sensitive-data exposure.
* Privilege escalation.
* Mass assignment.
* Unsafe deserialization.
* Insecure direct object access.

Review:

* Guards.
* Interceptors.
* Pipes.
* DTOs.
* Controllers.
* Services.
* External integrations.
* File processing.
* Webhooks.
* Queue consumers.

---

# SECRET MANAGEMENT

Verify that secrets are never embedded in source code.

Review:

* Environment variables.
* Configuration files.
* Logs.
* Error responses.
* Audit records.
* Queue payloads.
* Events.
* Test fixtures.

Test repositories and generated files for accidental secret leakage.

Use secure secret-management mechanisms appropriate to deployment.

---

# OBSERVABILITY HARDENING

Perform a backend-wide observability review.

Ensure trace propagation across:

* HTTP.
* PostgreSQL.
* Redis.
* BullMQ.
* Domain events.
* External APIs.
* Webhooks.

Metrics should cover:

* Request rate.
* Error rate.
* Latency.
* Database health.
* Redis health.
* Queue depth.
* Queue failures.
* Search health.
* Payment failures.
* Shipment failures.
* Refund failures.
* Payout failures.
* Reconciliation mismatches.

Logs must be:

* Structured.
* Correlated.
* Searchable.
* Redacted.

---

# DISASTER RECOVERY

Implement backend foundations supporting disaster recovery.

Ensure the architecture supports:

* PostgreSQL backups.
* Point-in-time recovery.
* Migration recovery.
* Object-storage durability.
* Search reconstruction.
* Redis recovery.
* Queue recovery.
* Event replay where supported.
* Outbox recovery.
* Reconciliation after restoration.

Define appropriate RPO/RTO assumptions in documentation.

Do not treat Redis as irreplaceable durable business state.

Search indexes must be reconstructable from authoritative data.

---

# BACKUP AND RESTORE VALIDATION

Implement or document operational mechanisms for:

* Database backup verification.
* Restore testing.
* Object-storage recovery.
* Search index reconstruction.
* Queue recovery.
* Outbox replay.
* Post-restore reconciliation.

A backup that has never been restore-tested must not be treated as fully validated.

---

# PERFORMANCE AND LOAD TEST FOUNDATIONS

Implement backend test foundations suitable for:

* API load tests.
* Search load tests.
* Checkout load tests.
* Inventory contention tests.
* Queue throughput tests.
* Database performance tests.
* Webhook burst tests.

Tests must focus on measurable system behavior.

Do not introduce unrealistic benchmarks that provide no operational value.

---

# CONTRACT TESTING

Implement contract tests where multiple backend components or external providers interact.

Cover:

* Payment providers.
* Shipping providers.
* Payout providers.
* Search indexing.
* Event consumers.
* Webhook payloads.

Contract tests must detect incompatible changes before deployment.

---

# MIGRATION SAFETY

Review all database migrations for production safety.

Identify:

* Long-running operations.
* Table locks.
* Destructive changes.
* Backfills.
* Index creation.
* Nullable-to-non-null transitions.
* Data transformations.

Use safe migration strategies for large production tables.

Do not destroy historical data during schema evolution without an explicit retention requirement.

---

# BACKWARD COMPATIBILITY

Review API and event compatibility.

Ensure:

* Existing API consumers are not broken unnecessarily.
* Event consumers can tolerate supported schema evolution.
* Database migrations support rolling deployments where applicable.
* New fields do not invalidate older consumers.
* Deprecated behavior is documented before removal.

---

# TESTING

Implement comprehensive backend-wide validation.

## Unit Tests

Cover:

* Administrative authorization.
* Moderation.
* Privacy.
* Retention.
* Risk decisions.
* Reconciliation.
* Idempotency.
* Rate limiting.
* Configuration.
* Analytics transformations.

## Integration Tests

Cover:

* Database workflows.
* Redis.
* Queues.
* Events.
* Search.
* External-provider abstractions.
* Privacy workflows.
* Report generation.
* Reconciliation.

## Security Tests

Cover:

* Administrative privilege boundaries.
* Seller/customer isolation.
* IDOR.
* Secret leakage.
* Rate-limit enforcement.
* Webhook authentication.
* Sensitive-data redaction.
* Unauthorized configuration changes.

## Performance Tests

Cover:

* High-volume API access.
* Search.
* Checkout.
* Inventory contention.
* Queue throughput.
* Database-heavy endpoints.

## Recovery Tests

Cover:

* Database restore.
* Search reconstruction.
* Queue recovery.
* Outbox recovery.
* Dependency outage.
* Worker restart.
* Application restart.

---

# DOCUMENTATION

Update backend documentation for:

* Administrative APIs.
* Moderation.
* Feature flags.
* Configuration.
* Analytics.
* Reporting.
* Privacy.
* Data retention.
* Reconciliation.
* Disaster recovery.
* Operational recovery.
* Rate limits.
* Idempotency.
* Security.
* Performance requirements.

Document operational runbooks where appropriate.

Documentation must describe actual implemented behavior.

---

# IMPLEMENTATION BOUNDARIES

This volume is backend-only.

Do not implement:

* Web UI.
* Mobile UI.
* React components.
* React Native screens.
* Tailwind styling.
* Frontend state management.

Do not replace the existing architecture unnecessarily.

Do not introduce speculative infrastructure.

Do not rewrite working modules merely for stylistic preference.

---

# ABSOLUTE IMPLEMENTATION RULES

You must not:

* Generate pseudo-code.
* Leave placeholder implementations.
* Leave required TODO/FIXME gaps.
* Disable security to make tests pass.
* Trust client-provided administrative permissions.
* Trust client-provided risk decisions.
* Expose internal fraud rules.
* Store secrets in source code.
* Store secrets in logs.
* Bypass transactions to simplify implementation.
* Ignore migration safety.
* Ignore recovery behavior.
* Ignore idempotency.
* Ignore concurrency.
* Use “implement similarly.”
* Use “remaining code omitted.”
* Use “left as an exercise.”
* Use “for brevity.”

Every required implementation must be complete, executable, tested, integrated, and production-oriented.

---

# REPOSITORY COMPATIBILITY

Follow existing repository conventions for:

* NestJS modules.
* TypeScript.
* Prisma.
* API design.
* Authentication.
* Authorization.
* Events.
* Queues.
* Search.
* Storage.
* Logging.
* Observability.
* Testing.

Extend compatible implementations.

Do not create parallel implementations for capabilities that already exist.

Maintain backward compatibility whenever practical.

---

# VALIDATION AND COMPLETION

Before considering this volume complete:

1. Inspect the repository.
2. Implement administrative capabilities.
3. Implement moderation.
4. Implement configuration/feature controls.
5. Implement analytics foundations.
6. Implement reporting foundations.
7. Implement privacy workflows.
8. Implement retention foundations.
9. Implement reconciliation.
10. Harden idempotency.
11. Harden rate limiting.
12. Harden API consistency.
13. Harden performance.
14. Harden security.
15. Harden observability.
16. Validate graceful shutdown.
17. Validate health/readiness.
18. Validate recovery behavior.
19. Validate migrations.
20. Compile/typecheck.
21. Run linting.
22. Run unit tests.
23. Run integration tests.
24. Run security tests.
25. Run performance tests where available.
26. Run recovery tests where available.
27. Verify no secrets were introduced.
28. Verify documentation.
29. Verify existing functionality remains operational.

Fix implementation-caused failures before reporting completion.

---

# IMPLEMENTATION REPORT

At completion, provide a concise engineering report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file and summarize the change.

## Administration

Describe administrative roles, permissions, APIs, and auditing.

## Moderation

Describe moderation workflows and authorization.

## Analytics

Describe event collection and reporting architecture.

## Privacy

Describe export, deletion, anonymization, and retention behavior.

## Reconciliation

Describe reconciliation workflows and recovery behavior.

## Reliability

Describe health checks, graceful shutdown, degradation, retry, and recovery behavior.

## Security

Describe backend-wide security hardening.

## Performance

Describe important performance improvements and database/query optimizations.

## Observability

Describe metrics, logs, traces, and alerts/instrumentation added.

## Disaster Recovery

Describe backup, restore, reconstruction, and recovery foundations.

## Tests

List tests added and executed.

## Validation Results

Report:

* Typecheck/compile.
* Lint.
* Unit tests.
* Integration tests.
* Security tests.
* Performance tests.
* Recovery tests.
* Migration validation.

Clearly identify any unavailable validation and its exact reason.

## Operational Notes

Document configuration, deployment, monitoring, backup, recovery, and external-service requirements.

---

# FINAL DIRECTIVE

Implement this backend hardening and platform-completion volume directly in the repository.

Inspect the actual repository before modifying it.

Complete the administrative, moderation, analytics, privacy, reconciliation, reliability, security, performance, observability, and recovery capabilities required for a production-grade ecommerce backend.

Preserve transactional correctness.

Preserve customer and seller isolation.

Protect financial operations.

Make derived systems recoverable.

Make external integrations observable and reconcilable.

Make database migrations production-safe.

Make asynchronous workflows idempotent.

Make the backend resilient to partial failures.

Do not stop at scaffolding.

Do not provide pseudo-code.

Do not leave required functionality incomplete.

Compile, test, validate, integrate, and provide the implementation report.
