# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 4

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the production observability, monitoring, alerting, logging, tracing, operational telemetry, and reliability-monitoring foundation for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Site Reliability Engineer
* Staff Observability Engineer
* Platform Engineer
* Security Engineer
* Performance Engineer
* Reliability Engineer
* Incident-Response Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the observability and operational-telemetry platform required to monitor the marketplace across application, infrastructure, database, cache, search, queue, storage, security, and deployment layers.

This is an incremental implementation task.

Do not implement infrastructure work outside the scope defined in this prompt.

---

# PROJECT

Build the production observability platform for an original Amazon-style ecommerce marketplace serving:

* millions of customers
* thousands of sellers
* large product catalogs
* high request volumes
* large media volumes
* asynchronous workflows
* customer and seller web applications
* customer mobile applications
* backend APIs and workers
* search infrastructure
* payments
* notifications
* analytics
* administrative operations
* high availability requirements
* horizontal scalability
* disaster recovery requirements
* strict security and tenant-isolation requirements

The repository is the source of truth for:

* service names
* application boundaries
* telemetry endpoints
* runtime configuration
* log formats
* OpenTelemetry instrumentation
* infrastructure resources
* queue names
* database integrations
* deployment structure

Do not invent telemetry interfaces that the repository does not support without implementing the corresponding required infrastructure integration.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction.

### Application

* Next.js 15
* React 19
* TypeScript
* React Native
* Expo
* NestJS
* REST
* OpenAPI
* WebSockets/SSE where justified
* webhooks

### Data

* PostgreSQL
* Redis
* BullMQ
* Elasticsearch/OpenSearch
* S3-compatible object storage

### Infrastructure

* AWS
* Docker
* Kubernetes/EKS
* Helm
* Terraform or repository-compatible IaC

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent tracing backend

Use managed AWS observability capabilities where they provide a clear operational benefit, but preserve the project's vendor-neutral OpenTelemetry instrumentation model.

---

# PRIMARY OBJECTIVE

Implement a coherent production observability platform that provides:

* metrics
* logs
* traces
* dashboards
* alerting
* service health
* infrastructure health
* queue monitoring
* database monitoring
* cache monitoring
* search monitoring
* object-storage monitoring
* deployment visibility
* security telemetry
* audit telemetry
* SLO-oriented measurement
* operational troubleshooting

The resulting platform must make production failures diagnosable without requiring engineers to log directly into individual containers and inspect ad-hoc state.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing OpenTelemetry instrumentation
* service names
* metrics endpoints
* Prometheus configuration
* Grafana dashboards
* Loki configuration
* Tempo/tracing configuration
* logging libraries
* structured-log conventions
* correlation-ID implementation
* health endpoints
* readiness endpoints
* queue names
* database metrics
* Redis metrics
* search metrics
* cloud monitoring
* existing alerts
* existing dashboards
* existing alert-routing configuration
* deployment metadata
* infrastructure modules
* existing CI/CD telemetry

Do not create a competing observability stack.

Extend existing infrastructure where compatible.

If a component already exists, improve it rather than creating a duplicate implementation.

---

# CURRENT SCOPE

Implement the production observability platform and operational monitoring layer.

---

# 1. Observability Architecture

Establish a unified architecture for:

* metrics
* logs
* traces
* events
* alerts
* dashboards

Define clear ownership between:

* application telemetry
* infrastructure telemetry
* managed-service telemetry
* security telemetry
* audit telemetry

Do not mix business analytics with operational observability.

Business analytics belongs to the application's analytics architecture.

---

# 2. OpenTelemetry Foundation

Standardize OpenTelemetry resource metadata.

At minimum support:

* service name
* service version
* deployment environment
* cloud provider
* cloud region
* Kubernetes namespace
* Kubernetes workload
* instance/pod identity where useful

Telemetry must identify the originating service and environment.

Do not hardcode production-only resource metadata.

---

# 3. Trace Propagation

Ensure distributed trace context propagates correctly across:

* browser requests where applicable
* mobile requests where applicable
* API requests
* internal service calls
* background jobs
* queue processing
* asynchronous workflows
* webhooks where technically appropriate

Do not create a separate tracing context for every queue hop without linking it to the originating operation.

---

# 4. HTTP Tracing

Backend HTTP telemetry must capture useful operational dimensions such as:

* request duration
* response status
* route
* method
* service
* environment

Avoid storing raw URLs containing sensitive identifiers when route templates are available.

Do not record authorization tokens.

Do not record raw request bodies by default.

---

# 5. Database Tracing

Where supported, trace application interactions with PostgreSQL.

Telemetry should make it possible to identify:

* slow queries
* excessive database latency
* connection pressure
* failing operations
* transaction issues

Do not capture complete SQL statements when they may contain sensitive values.

Use parameterized or normalized query representations where appropriate.

---

# 6. Redis Tracing

Instrument Redis operations where practical.

Support visibility into:

* latency
* errors
* connection failures
* overloaded behavior
* queue-related operations

Avoid excessive per-command telemetry that creates unmanageable observability volume.

---

# 7. Search Tracing

Instrument search interactions where practical.

Capture:

* operation type
* latency
* errors
* index
* environment
* result size metadata where useful

Do not log customer-sensitive search content unnecessarily.

---

# 8. Queue Tracing

Instrument BullMQ workflows and other actual queue consumers.

Telemetry should allow operators to understand:

* enqueue latency
* job execution duration
* retries
* failures
* stalled jobs
* queue backlog
* worker availability

Correlate asynchronous work with originating request/operation context where supported.

---

# 9. Webhook Tracing

Provide visibility into inbound and outbound webhooks.

Capture:

* provider/integration
* endpoint
* response status
* processing duration
* retry behavior
* correlation identifier
* deduplication behavior

Do not log webhook secrets or sensitive payment payloads.

---

# 10. Metrics Architecture

Implement a standardized metrics model.

Separate:

### Infrastructure metrics

Examples:

* CPU
* memory
* storage
* network
* node health

### Application metrics

Examples:

* request rate
* latency
* errors
* queue depth
* job duration

### Dependency metrics

Examples:

* PostgreSQL
* Redis
* search
* external providers

### Business-operational metrics

Examples:

* checkout failures
* payment failures
* order-processing backlog
* inventory reservation failures

Business-operational metrics are acceptable when they are used for system operations rather than product analytics.

---

# 11. Prometheus Foundation

Implement Prometheus-compatible metrics collection.

Support:

* Kubernetes workload discovery
* service discovery
* application scraping
* infrastructure scraping
* managed-service metrics ingestion where appropriate

Use appropriate scrape intervals and retention.

Do not configure every target to be scraped at unnecessarily aggressive intervals.

---

# 12. Metrics Naming

Create consistent naming conventions.

Metrics must:

* use stable names
* have documented units
* avoid high-cardinality labels
* use environment/service dimensions consistently
* distinguish counters/gauges/histograms correctly

Do not include:

* user IDs
* order IDs
* email addresses
* phone numbers
* payment IDs
* arbitrary request IDs

as Prometheus labels.

---

# 13. Cardinality Management

Protect the metrics system against uncontrolled cardinality.

Review labels for:

* user identifiers
* seller identifiers
* product identifiers
* request IDs
* trace IDs
* arbitrary URL values

Do not permit unbounded labels on high-volume metrics.

Use logs and traces for high-cardinality investigation.

---

# 14. RED Metrics

Implement operational metrics for major request-serving workloads:

* Rate
* Errors
* Duration

For APIs and critical internal services, dashboards must make these dimensions visible.

---

# 15. USE Metrics

For major infrastructure components, expose:

* Utilization
* Saturation
* Errors

Apply this to:

* Kubernetes nodes
* application workloads
* PostgreSQL
* Redis
* search
* relevant AWS resources

---

# 16. Service-Level Indicators

Define SLI infrastructure for critical services.

Examples:

* API availability
* API latency
* checkout success
* payment processing success
* order-processing completion
* notification delivery
* search availability

Do not invent numerical SLO targets without project requirements.

Create configurable SLO thresholds.

---

# 17. SLO Configuration

Create an explicit configuration model for SLOs.

Support:

* target availability
* target latency
* measurement window
* burn-rate thresholds
* alert severity
* service ownership

Keep SLO definitions version-controlled.

Do not hide SLO thresholds inside dashboard JSON without a maintainable source of truth.

---

# 18. Error Budgets

Provide the infrastructure foundation for error-budget tracking.

Where practical calculate:

* budget remaining
* budget consumed
* short-window burn
* long-window burn

Do not turn error budgets into business analytics.

---

# 19. Golden Signals Dashboards

Create dashboards for major services exposing:

* traffic
* latency
* errors
* saturation

Dashboards must be usable during incidents without requiring engineers to construct queries manually.

---

# 20. Service Dashboards

Create dashboards for actual major workloads.

At minimum cover applicable:

* backend API
* worker workloads
* web application
* database
* Redis
* search
* ingress
* Kubernetes

Do not create dashboards for imaginary services.

---

# 21. PostgreSQL Monitoring

Integrate managed PostgreSQL monitoring.

Expose operational visibility into:

* CPU
* storage
* connections
* latency
* I/O
* replication
* failover
* backup status
* locks where available
* long-running transactions where available

Highlight conditions that threaten application availability.

---

# 22. Redis Monitoring

Expose:

* memory utilization
* evictions
* connections
* CPU
* replication
* failover
* latency
* errors
* cache behavior
* queue-related pressure where available

Do not page on transient cache misses that do not affect availability.

---

# 23. Search Monitoring

Expose:

* cluster health
* storage
* CPU
* memory pressure
* shard health
* indexing errors
* search latency
* rejected requests
* replication

Create alerts for conditions likely to affect customer-facing search.

---

# 24. S3 Monitoring

Monitor:

* request failures
* object operations
* storage growth
* replication failures
* configuration drift where supported

Do not generate alerts for every normal S3 request failure.

Use meaningful aggregation.

---

# 25. Kubernetes Monitoring

Monitor:

* nodes
* namespaces
* pods
* deployments
* replicas
* restarts
* scheduling failures
* CPU
* memory
* network
* disk
* HPA activity
* PDB constraints

Create dashboards that support both platform-level and workload-level diagnosis.

---

# 26. Container Health Monitoring

Monitor:

* crash loops
* OOM kills
* readiness failures
* liveness failures
* startup failures
* unexpected restarts
* unscheduled replicas

Distinguish infrastructure capacity issues from application health issues.

---

# 27. Ingress Monitoring

Monitor:

* request volume
* status codes
* latency
* target health
* TLS errors
* connection failures
* 4xx/5xx trends

Provide dashboards capable of correlating ingress failures with backend services.

---

# 28. Queue Monitoring

Create dashboards for actual BullMQ queues.

Monitor:

* waiting jobs
* active jobs
* completed jobs
* failed jobs
* delayed jobs
* stalled jobs
* oldest waiting job
* processing latency
* retry rate

Queue monitoring must make backlog accumulation obvious.

---

# 29. Queue Alerting

Create alerts for operationally significant queue conditions such as:

* sustained backlog growth
* excessive oldest-job age
* worker starvation
* repeated failure spikes
* stalled-job accumulation

Do not page immediately on every isolated job failure.

Use duration and threshold conditions.

---

# 30. Application Error Monitoring

Create structured error telemetry.

Errors should include enough context to identify:

* service
* environment
* operation
* route/job
* dependency
* trace ID
* correlation ID
* normalized error code

Do not expose sensitive request data.

---

# 31. Structured Logging

Standardize production log structure.

Logs should support fields such as:

* timestamp
* level
* service
* environment
* version
* trace ID
* span ID where available
* correlation ID
* operation
* error code
* message

Use machine-readable structured logs.

Do not rely on free-form strings for primary operational fields.

---

# 32. PII and Sensitive-Data Redaction

Implement explicit log-redaction rules.

Do not log sensitive values such as:

* passwords
* access tokens
* refresh tokens
* authorization headers
* session secrets
* payment card data
* payment secrets
* private keys
* full authentication credentials

Minimize unnecessary logging of:

* email addresses
* phone numbers
* addresses
* customer identifiers
* seller identifiers

Where identifiers are required operationally, use safe internal identifiers or controlled masking.

---

# 33. Loki Logging Foundation

Where Loki is the selected log backend, implement:

* log collection
* labels
* retention
* query access
* environment separation

Do not use high-cardinality log labels such as request IDs.

Prefer structured fields inside log entries.

---

# 34. Log Retention

Define configurable retention classes for:

* development
* test
* staging
* production
* security/audit logs

Production operational logs must remain available long enough to support incident investigation.

Do not retain sensitive logs indefinitely without an actual requirement.

---

# 35. Trace Storage

Where Tempo or an equivalent tracing backend is used, configure:

* ingestion
* retention
* query access
* sampling
* resource metadata
* environment separation

Tracing retention may be shorter than audit-log retention.

Make sampling configurable.

---

# 36. Trace Sampling

Implement a sampling strategy appropriate for high-traffic production systems.

Support:

* useful baseline sampling
* increased sampling for errors
* targeted diagnostic sampling
* environment-specific rates

Do not sample 100% of all production traffic without a capacity justification.

---

# 37. Tail-Based/Adaptive Sampling

Where the selected tracing architecture supports it, prepare for adaptive sampling.

Prefer retention of:

* errors
* slow requests
* unusual failures
* important business operations

over indiscriminate retention of every normal trace.

---

# 38. Alerting Architecture

Implement centralized alert evaluation and routing.

Alerts must have:

* name
* description
* severity
* condition
* duration
* service
* environment
* runbook reference
* ownership

Do not create anonymous alerts with no operational action.

---

# 39. Alert Severity

Use a consistent severity model such as:

* critical
* high
* warning
* informational

Severity must represent operational impact, not developer preference.

Do not make every alert critical.

---

# 40. Alert Routing

Support routing by:

* service
* environment
* severity
* operational domain

Examples:

* platform
* backend
* payments
* search
* data
* security

Do not hardcode personal phone numbers or private contact details in infrastructure code.

Use configurable notification integrations.

---

# 41. Alert Notification Channels

Prepare integrations for appropriate channels supported by the repository, such as:

* email
* Slack
* PagerDuty
* incident-management systems
* webhook endpoints

Do not invent credentials.

Where provider access is unavailable, configure the integration interface and document required secrets.

---

# 42. Alert Deduplication

Alerts must avoid notification storms.

Use:

* grouping
* deduplication
* inhibition
* cooldown periods
* dependency-aware suppression

Do not allow a single database failure to generate hundreds of identical downstream alerts.

---

# 43. Dependency-Aware Alerts

Where practical distinguish:

* root-cause alerts
* symptom alerts

For example, if PostgreSQL becomes unavailable, downstream API error alerts should not overwhelm operators with duplicate paging.

---

# 44. Alert Testing

Provide a way to validate:

* alert expressions
* routing
* notification configuration
* dashboard links
* runbook references

Do not trigger destructive production incidents merely to prove alerting works.

Use controlled validation mechanisms.

---

# 45. Runbooks

Create operational runbooks for major alert classes.

At minimum cover applicable:

* API outage
* elevated latency
* database failure
* Redis pressure
* search degradation
* queue backlog
* pod crash loops
* node capacity exhaustion
* ingress failure
* certificate problems
* deployment rollback
* backup failure

Runbooks must describe diagnosis and recovery steps based on actual infrastructure.

---

# 46. Incident Context

Telemetry should allow an engineer to correlate:

* request
* trace
* log
* deployment version
* pod
* node
* dependency
* database operation
* queue job

Use shared correlation mechanisms.

---

# 47. Deployment Observability

Expose deployment events in operational dashboards.

Operators should be able to correlate incidents with:

* application releases
* infrastructure changes
* Helm upgrades
* node upgrades
* configuration changes

Do not require manually checking unrelated systems during incidents.

---

# 48. Change Tracking

Where the AWS/Kubernetes infrastructure supports it, capture operational changes such as:

* configuration changes
* scaling events
* deployment events
* infrastructure updates
* security changes

Use existing audit services rather than inventing a custom duplicate audit log.

---

# 49. AWS Cloud Monitoring

Integrate CloudWatch or appropriate AWS telemetry for managed services and platform resources.

Capture relevant signals from:

* EKS
* RDS/Aurora
* ElastiCache
* OpenSearch
* ALB
* WAF
* S3
* CloudFront
* NAT/Network components

Avoid duplicating every metric into every backend.

Define the authoritative source for each major metric family.

---

# 50. Security Telemetry

Provide infrastructure hooks for security monitoring.

Where applicable integrate:

* CloudTrail
* GuardDuty
* AWS Config
* WAF logs
* IAM events
* suspicious access events

Security telemetry must remain distinguishable from ordinary application telemetry.

---

# 51. Audit Logging

Maintain infrastructure-level audit visibility for sensitive operations.

Include events such as:

* privilege changes
* secret changes
* production infrastructure changes
* backup deletions
* policy changes
* access changes

Do not log sensitive secret values.

---

# 52. Dashboard Organization

Organize dashboards by operational purpose.

Suggested categories:

* Executive System Health
* Customer Experience
* API Platform
* Workers and Queues
* Data Platform
* Search
* Kubernetes
* AWS Infrastructure
* Security
* SLO/Error Budgets

Use the actual services in the repository.

---

# 53. Operational Overview Dashboard

Create a top-level production dashboard that provides:

* overall service health
* critical SLO status
* API error rate
* API latency
* queue backlog
* database health
* Redis health
* search health
* active incidents/alerts where available
* recent deployments

The dashboard must help an operator determine where to investigate next.

---

# 54. Customer-Impact Signals

Define operational metrics representing customer-facing degradation.

Examples:

* checkout failures
* payment failures
* search failure rate
* order-processing delays
* login failures
* notification backlog

Avoid exposing customer-specific data in dashboards.

---

# 55. Seller-Impact Signals

Where applicable provide operational visibility into:

* seller catalog failures
* offer publication failures
* inventory synchronization failures
* seller-order processing backlog
* seller notification failures

Do not expose individual seller confidential data in shared dashboards.

---

# 56. Performance Monitoring

Create telemetry capable of identifying:

* slow endpoints
* slow jobs
* slow database operations
* slow search requests
* high cache latency
* resource saturation

Do not optimize based solely on averages.

Use:

* p50
* p95
* p99

where appropriate.

---

# 57. SLO Burn-Rate Alerts

Where SLOs exist, implement multi-window burn-rate alerting where appropriate.

Avoid simplistic single-threshold alerts for high-volume services when a burn-rate model better represents customer impact.

Keep alert thresholds configurable.

---

# 58. Capacity Alerts

Create alerts for sustained capacity pressure such as:

* CPU saturation
* memory pressure
* database storage
* Redis memory
* search storage
* Kubernetes pending pods
* queue growth

Avoid paging on every brief utilization spike.

---

# 59. Monitoring Retention

Define retention policies for:

* metrics
* logs
* traces
* alerts
* dashboards
* audit telemetry

Retain enough data for:

* incident investigation
* trend analysis
* capacity planning
* compliance requirements where applicable

Do not assume identical retention for all telemetry types.

---

# 60. Cost Control for Observability

Observability must remain economically sustainable at marketplace scale.

Control:

* metric cardinality
* log volume
* trace sampling
* high-frequency scraping
* dashboard query cost
* long retention

Do not sacrifice critical diagnostic telemetry merely to reduce cost.

---

# 61. Privacy Requirements

Observability infrastructure must respect customer and seller privacy.

Do not expose sensitive information in:

* logs
* metrics
* traces
* dashboards
* alerts
* notification payloads

Telemetry access must follow appropriate authorization boundaries.

---

# 62. Access Control

Implement role-based access for observability systems.

Separate:

* administrators
* platform engineers
* developers
* support/read-only users
* security operators

Do not give every application developer unrestricted access to sensitive production logs.

---

# 63. Environment Isolation

Separate observability data appropriately across:

* development
* test
* staging
* production

Do not accidentally ingest development telemetry into production dashboards or vice versa.

---

# 64. Out of Scope

Do not implement:

* business analytics dashboards unrelated to system operations
* customer-facing analytics products
* marketing analytics
* recommendation analytics
* full product data warehouse
* application feature changes
* payment feature changes
* mobile feature changes
* database schema redesign
* search API redesign
* complete CI/CD implementation
* complete disaster-recovery orchestration
* fake monitoring integrations
* invented credentials

---

# 65. Required Deliverables

Implement the actual repository changes required for this observability layer, including where applicable:

* OpenTelemetry infrastructure
* Prometheus configuration
* Grafana configuration
* Loki configuration
* Tempo configuration
* dashboards
* recording rules
* alert rules
* alert routing
* service monitors
* log collection
* trace collection
* AWS monitoring integrations
* Kubernetes monitoring
* managed-service dashboards
* SLO configuration
* runbooks
* observability documentation
* validation scripts

Every created file must have a concrete operational purpose.

---

# 66. Implementation Quality Rules

Do not produce:

* fake dashboards
* alerts referencing nonexistent metrics
* nonexistent service names
* arbitrary high-cardinality metrics
* plaintext secrets
* hardcoded notification credentials
* meaningless telemetry
* duplicate monitoring backends
* untested alert expressions presented as working
* TODO/FIXME implementation gaps
* pseudo-code
* “implement later” observability

Every dashboard query, alert expression, service reference, and telemetry path must correspond to the repository's actual infrastructure.

---

# 67. Repository-First Incremental Implementation

Before implementation:

1. inspect existing telemetry
2. identify existing observability infrastructure
3. identify actual services
4. identify available metrics
5. identify logging format
6. identify tracing integration
7. identify AWS managed-service telemetry
8. identify existing alerts and dashboards
9. identify infrastructure naming conventions
10. implement only compatible observability changes

Do not build an entirely new telemetry ecosystem if the repository already has one.

---

# 68. Testing

Run all applicable validation.

At minimum validate:

### Configuration

* telemetry configuration syntax
* Prometheus configuration
* Grafana provisioning
* Loki configuration
* Tempo configuration
* alert-rule syntax

### Kubernetes

* manifests render correctly
* ServiceMonitors reference real services
* dashboards reference available metrics

### Metrics

Verify referenced metrics actually exist where the repository can expose them.

### Alerts

Validate expressions and label selectors.

### Security

Run applicable secret and configuration scans.

### Logs

Validate structured-log output where executable.

### Tracing

Validate OpenTelemetry configuration and exporter references.

Do not claim an alert or dashboard is functional if its underlying metric or service does not exist.

---

# 69. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Telemetry

* OpenTelemetry resource metadata is consistent
* trace propagation is configured
* application metrics are available
* infrastructure metrics are available
* logs are structured
* traces are collected
* queue telemetry exists
* managed-service telemetry exists

### Dashboards

* production overview dashboard exists
* API dashboard exists
* worker/queue dashboard exists
* database dashboard exists
* Redis dashboard exists
* search dashboard exists
* Kubernetes dashboard exists
* AWS infrastructure dashboard exists
* applicable security dashboard exists

### Alerting

* critical operational alerts exist
* alert severity is defined
* alert routing exists
* deduplication exists
* runbook references exist
* dependency-aware alerting exists where practical

### Reliability

* SLI definitions exist
* SLO configuration exists
* error-budget/burn-rate foundation exists
* capacity alerts exist
* performance telemetry exists

### Security and Privacy

* sensitive information is redacted
* observability access is controlled
* no secrets are committed
* production telemetry is appropriately isolated

### Validation

* telemetry configuration validates
* alert rules validate
* dashboards render/configure correctly
* referenced services and metrics exist
* applicable security checks pass

---

# 70. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Observability Platform

Summarize:

* metrics
* logs
* traces
* collection
* storage
* retention

## Dashboards

List every actual dashboard created.

## Alerts

List alert groups and important conditions created.

## SLOs

Summarize the configured SLIs/SLOs and measurement model.

## Security

Summarize:

* redaction
* access control
* audit telemetry
* security integrations

## AWS Monitoring

Summarize managed-service telemetry integrations.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Telemetry Limitations

Clearly identify any signals that could not be live-tested because external systems or credentials were unavailable.

## Compatibility Notes

Document any existing telemetry implementation that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the production observability and monitoring infrastructure described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not redesign application behavior.

Do not invent metrics, services, credentials, dashboards, or successful monitoring integrations.

Do not merely describe observability architecture.

Actually create and modify the required repository files so the platform has executable metrics, logs, traces, dashboards, alerts, SLO measurement, operational visibility, and security-aware telemetry.

When complete, provide the required Completion Report.
