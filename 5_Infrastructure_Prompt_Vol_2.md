# Amazon Ecommerce Marketplace — Infrastructure Prompt — Volume 2

## Production Operations, Observability, Scaling, Security Hardening, Disaster Recovery, Resilience, Cost Controls, and Final Infrastructure Readiness

You are implementing the production operations and infrastructure-hardening layer for an original, production-grade Amazon-style ecommerce marketplace.

This prompt is fully standalone. It must be executable without requiring any other prompt, architecture document, previous conversation, or previously generated document to be present.

The actual repository is the source of truth for existing application and infrastructure implementation.

Your responsibility is to take the existing infrastructure and make the marketplace operationally ready for reliable production use at meaningful scale.

Do not create a competing infrastructure architecture. Extend and harden the infrastructure that actually exists in the repository.

---

# 1. Mission

Implement the production operations layer covering:

* Observability
* Metrics
* Logs
* Distributed tracing
* Dashboards
* Alerting
* Application monitoring
* Infrastructure monitoring
* Database monitoring
* Redis monitoring
* Search monitoring
* Queue monitoring
* Event-system monitoring
* Autoscaling
* Capacity management
* WAF
* DDoS protection strategy
* Network hardening
* IAM hardening
* Secret rotation
* Backup verification
* Disaster recovery
* Recovery procedures
* Resilience
* Failure isolation
* Deployment safety
* Rollback
* Incident response
* Operational runbooks
* Cost controls
* Security hardening
* Production readiness validation

The result must be a production-operable ecommerce platform rather than infrastructure that merely deploys successfully.

---

# 2. Repository-First Audit

Before making changes:

1. Inspect the complete repository.
2. Inspect the infrastructure already implemented.
3. Inspect:

   * Terraform/OpenTofu
   * Docker
   * Kubernetes/ECS configuration
   * CI/CD
   * AWS configuration
   * application configuration
   * logging
   * OpenTelemetry
   * metrics
   * health checks
   * worker infrastructure
   * database configuration
   * Redis configuration
   * search configuration
   * queue configuration
   * event infrastructure
   * S3/CloudFront
   * secrets
   * DNS
   * certificates
4. Determine what is actually deployed versus merely configured.
5. Reuse existing components.
6. Remove or consolidate unnecessary duplication.
7. Preserve working infrastructure.
8. Make safe incremental changes.

Never assume that a resource exists merely because a configuration file references it.

---

# 3. Production Operations Principles

Infrastructure must be designed around:

* Observability before scaling.
* Measurable SLOs.
* Automated recovery where safe.
* Human intervention where necessary.
* Least privilege.
* Defense in depth.
* Explicit failure boundaries.
* Controlled blast radius.
* Reproducible infrastructure.
* Tested backups.
* Tested restoration.
* Safe deployments.
* Graceful degradation.
* Clear incident ownership.
* Cost visibility.

Do not optimize for theoretical scale at the expense of operational correctness.

---

# 4. Service Inventory

Create or maintain an authoritative infrastructure inventory covering actual deployed/configured components.

At minimum identify:

* Web application
* Mobile application
* API
* Background workers
* PostgreSQL
* Redis
* Search
* Object storage
* CDN
* Queues
* Event infrastructure
* Notification infrastructure
* Payment integration
* External APIs
* DNS
* TLS
* Secrets
* CI/CD
* Monitoring

For every service identify:

* purpose
* owner
* dependencies
* criticality
* scaling model
* failure impact
* backup/recovery expectations
* monitoring requirements

Do not list nonexistent services as deployed.

---

# 5. Reliability Objectives

Define practical reliability objectives for critical user journeys.

At minimum consider:

* Authentication
* Product browsing
* Search
* Product detail
* Cart
* Checkout
* Payment
* Order creation
* Order retrieval
* Shipment tracking
* Returns
* Notifications
* Seller operations where applicable

Define appropriate:

* availability targets
* latency targets
* error-rate targets
* recovery expectations

Do not invent unrealistic SLOs merely to produce impressive documentation.

Tie alerts and dashboards to meaningful operational signals.

---

# 6. Observability Architecture

Implement or complete observability using the repository's existing stack.

Where appropriate support:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* CloudWatch
* AWS managed observability services

Do not create duplicate monitoring systems without justification.

Observability must cover:

* API
* workers
* database
* Redis
* search
* queues
* event infrastructure
* external providers
* infrastructure
* deployment health

---

# 7. Distributed Tracing

Implement distributed tracing where the application architecture supports it.

Trace:

* HTTP requests
* database operations where appropriate
* Redis operations where appropriate
* queue jobs
* event consumers
* external API calls
* payment operations
* search operations
* media processing

Propagate:

* trace ID
* span context
* correlation ID

Across asynchronous boundaries where technically supported.

Do not create high-cardinality or sensitive span attributes unnecessarily.

---

# 8. Logging

Implement centralized structured logging.

Logs should include useful fields such as:

* timestamp
* environment
* service
* severity
* request ID
* correlation ID
* trace ID
* operation
* outcome
* duration

Never log:

* passwords
* access tokens
* refresh tokens
* Stripe secrets
* AWS credentials
* database passwords
* full payment card information
* unnecessary private customer data
* sensitive authentication material

---

# 9. Log Retention

Define environment-appropriate log retention.

Consider:

* development
* staging
* production
* security logs
* audit logs
* application logs
* infrastructure logs

Avoid retaining unnecessary sensitive information indefinitely.

Use lifecycle policies where supported.

---

# 10. Metrics

Implement meaningful metrics.

### API

Monitor:

* request rate
* latency
* error rate
* status-code distribution
* authentication failures
* rate limiting
* dependency failures

### Database

Monitor:

* connections
* connection saturation
* CPU
* memory
* storage
* IOPS
* latency
* replication/failover status
* slow queries where available

### Redis

Monitor:

* memory
* evictions
* connections
* command latency
* CPU
* failover
* errors

### Search

Monitor:

* query latency
* indexing latency
* cluster health
* shard health
* rejected requests
* storage
* indexing failures

### Queues

Monitor:

* queue depth
* job age
* processing rate
* failures
* retries
* dead-letter volume
* worker saturation

---

# 11. Business-Critical Metrics

Operational observability must include business signals where appropriate.

Examples:

* checkout failures
* payment failures
* order creation failures
* inventory reservation failures
* cart failures
* refund failures
* return failures
* search indexing lag
* notification delivery failures

These metrics must not contain sensitive customer information.

---

# 12. Dashboards

Create useful dashboards for:

### Platform

* overall health
* request volume
* latency
* error rates
* resource saturation

### API

* endpoint health
* dependency failures
* throughput
* latency

### Database

* connection usage
* CPU
* storage
* query health

### Redis

* memory
* latency
* connections
* evictions

### Search

* search latency
* indexing
* cluster health

### Workers

* queue depth
* job age
* failures
* throughput

### Payments

* payment success/failure
* webhook failures
* reconciliation backlog

### Commerce

* checkout failures
* order failures
* inventory failures

Dashboards must help an operator diagnose problems rather than merely display many graphs.

---

# 13. Alerting

Implement actionable alerts.

Avoid alerting on every minor fluctuation.

Alert on conditions such as:

* API availability degradation
* sustained high error rate
* high latency
* database saturation
* Redis failure
* search cluster failure
* queue backlog
* payment webhook failure
* reconciliation backlog
* failed deployments
* certificate expiration
* storage exhaustion
* backup failures
* unusual authentication abuse

Alerts should include:

* severity
* affected service
* condition
* probable impact
* useful diagnostic information
* runbook reference where available

---

# 14. Alert Severity

Define practical severity levels such as:

* critical
* high
* medium
* low

Critical alerts should represent conditions requiring immediate attention.

Do not classify routine warnings as critical.

---

# 15. WAF

Implement AWS WAF where appropriate.

Protect public endpoints against:

* common web attacks
* malicious request patterns
* excessive request rates
* abusive clients
* known attack signatures

Use managed rule groups where appropriate.

Avoid overly aggressive rules that break legitimate ecommerce traffic.

Monitor false positives.

---

# 16. Rate Limiting

Infrastructure and application-level rate limiting must work together.

Protect:

* login
* registration
* password operations
* search
* cart mutations
* checkout
* payment initiation
* review submission
* notification endpoints
* administrative APIs

Do not rely solely on WAF for business-sensitive rate limiting.

---

# 17. DDoS Protection

Implement an appropriate AWS DDoS protection strategy.

Use AWS-native capabilities where justified.

Document:

* baseline protection
* escalation path
* traffic anomaly response
* operational responsibilities

Do not claim advanced protection is enabled unless it is actually configured.

---

# 18. Network Hardening

Review:

* public subnets
* private subnets
* security groups
* routing
* NAT
* egress
* ingress
* VPC endpoints

Minimize unnecessary public exposure.

Where appropriate use private connectivity to AWS services through VPC endpoints.

Restrict outbound traffic where practical without breaking legitimate provider integrations.

---

# 19. IAM Hardening

Perform a complete IAM review.

Check:

* wildcard permissions
* administrator policies
* unused permissions
* CI/CD permissions
* application roles
* worker roles
* infrastructure deployment roles

Remove unnecessary privileges.

Use separate roles for separate responsibilities.

Do not allow runtime services to modify infrastructure unless explicitly required.

---

# 20. Secrets Rotation

Implement a practical secret-rotation strategy.

Consider:

* database credentials
* Redis credentials
* JWT signing secrets
* Stripe credentials
* webhook secrets
* email provider credentials
* push provider credentials
* search credentials

Rotation must not cause uncontrolled downtime.

Where automatic rotation is appropriate, implement it.

Where manual rotation is required, document the exact operational procedure.

---

# 21. Encryption

Verify encryption:

### At rest

* PostgreSQL
* Redis where supported
* search
* S3
* backups
* logs where appropriate
* infrastructure state

### In transit

* HTTPS
* database TLS
* Redis TLS
* search TLS
* event infrastructure encryption
* internal service communication where required

Do not disable TLS verification merely to simplify development or deployment.

---

# 22. Backup Strategy

Verify backups for:

* PostgreSQL
* search where required
* S3
* infrastructure state
* critical operational data

Define:

* retention
* frequency
* encryption
* ownership
* restoration process

Do not assume backup existence means recoverability.

---

# 23. Backup Verification

Where environments and credentials permit, perform actual restoration testing.

For PostgreSQL:

1. Restore to isolated environment.
2. Verify schema.
3. Verify data integrity.
4. Verify Prisma compatibility.
5. Verify application connectivity.
6. Verify critical tables and relationships.

For S3:

* verify versioning where enabled
* verify recoverability
* verify lifecycle configuration

Record actual results.

Do not claim recovery was tested if it was not.

---

# 24. Disaster Recovery

Define a production disaster-recovery architecture.

Cover:

* database failure
* Availability Zone failure
* Redis failure
* search failure
* queue failure
* worker failure
* application failure
* storage failure
* deployment failure
* AWS service failure

Define:

* RTO
* RPO
* recovery sequence
* dependencies
* responsible operator/team
* validation steps

Use realistic targets based on actual architecture.

---

# 25. Recovery Runbooks

Create operational runbooks for:

* API outage
* database outage
* Redis outage
* search outage
* queue backlog
* failed deployment
* payment webhook outage
* payment reconciliation backlog
* certificate issue
* secret rotation
* high error rate
* traffic spike
* compromised credential
* storage incident

Each runbook should contain:

1. Detection.
2. Immediate containment.
3. Diagnosis.
4. Recovery.
5. Validation.
6. Rollback if necessary.
7. Follow-up.

---

# 26. Graceful Degradation

Verify that noncritical dependencies do not unnecessarily take down critical commerce functionality.

Examples:

### Search unavailable

Product/catalog access may continue through appropriate fallback behavior.

### Notification provider unavailable

Orders should still complete.

### Analytics unavailable

Commerce operations should continue.

### Recommendation system unavailable

Product pages should continue.

### Cache unavailable

Authoritative database-backed operations should remain available where feasible.

Do not degrade security or financial correctness merely to preserve availability.

---

# 27. Dependency Failure Matrix

Create or update a failure matrix covering:

* PostgreSQL
* Redis
* Search
* Kafka/Redpanda
* BullMQ
* S3
* CloudFront
* Stripe
* Email provider
* Push provider
* DNS
* AWS compute

For each dependency define:

* failure symptoms
* affected operations
* safe fallback
* retry strategy
* alert
* recovery process

---

# 28. Queue Resilience

Review every production queue.

Verify:

* retry policy
* backoff
* timeout
* concurrency
* dead-letter handling
* idempotency
* poison-job handling
* queue retention
* monitoring
* graceful shutdown

Prevent infinite retry loops.

Prevent one poisoned message from blocking unrelated work.

---

# 29. Event-System Resilience

For Kafka/Redpanda or other event infrastructure actually used:

Verify:

* consumer lag monitoring
* retry behavior
* DLQ/recovery
* duplicate handling
* replay procedure
* partition strategy
* schema compatibility
* event ordering assumptions

The event system must tolerate at-least-once delivery.

---

# 30. Search Resilience

Verify that search failures cannot corrupt authoritative commerce state.

Support:

* index health monitoring
* indexing backlog monitoring
* failed-index job recovery
* full reindex procedure
* alias rollback
* projection reconciliation

Search data must always be rebuildable from PostgreSQL.

---

# 31. Payment Operations

Implement operational monitoring for:

* payment failures
* webhook failures
* webhook backlog
* payment/order mismatches
* reconciliation jobs
* refund failures

Ensure payment reconciliation can recover from:

* missing webhook
* duplicate webhook
* delayed webhook
* provider outage
* application outage

Do not manually mutate payment state without appropriate audit and authorization.

---

# 32. Inventory Operations

Monitor:

* reservation failures
* reservation expiration
* stuck reservations
* negative-inventory protection failures
* inventory adjustment failures
* inventory reconciliation

Inventory remains authoritative in PostgreSQL.

Never use monitoring or cache data as inventory authority.

---

# 33. Database Operational Hardening

Review:

* indexes
* connection limits
* slow queries
* locks
* deadlocks
* transaction duration
* storage growth
* backup health

Identify high-risk queries.

Do not make speculative schema changes without validating application impact.

---

# 34. Scaling

Implement production autoscaling based on meaningful signals.

API scaling may use:

* CPU
* memory
* request volume
* latency

Worker scaling may use:

* queue depth
* job age
* throughput
* concurrency

Search/database scaling must consider actual service constraints.

Do not blindly scale databases horizontally if the underlying service does not support it.

---

# 35. Capacity Planning

Define capacity considerations for:

* API
* workers
* PostgreSQL
* Redis
* search
* storage
* queues
* bandwidth
* CDN

Document likely bottlenecks.

Use actual metrics where available.

Do not make unsupported claims about maximum throughput.

---

# 36. Cost Management

Implement cost visibility.

Track major costs:

* compute
* database
* Redis
* search
* S3
* CloudFront
* NAT
* observability
* data transfer
* queues/events

Use:

* tagging
* budgets
* alerts
* lifecycle policies
* rightsizing
* autoscaling

Do not reduce costs by disabling essential backups, security, or observability.

---

# 37. Resource Lifecycle

Review:

* unused resources
* old container images
* old search indexes
* stale snapshots
* unused volumes
* obsolete logs
* temporary media
* abandoned queues

Implement safe cleanup policies.

Never automatically delete authoritative business data merely because it is old.

---

# 38. CI/CD Hardening

Secure deployment pipelines.

Use:

* short-lived credentials where possible
* OIDC for GitHub Actions where appropriate
* least privilege
* protected production environments
* required approvals
* immutable deployment artifacts
* rollback capability

Do not store long-lived AWS access keys in CI/CD secrets if a safer federated mechanism is available.

---

# 39. Supply-Chain Security

Review:

* dependency installation
* lockfiles
* container images
* package vulnerabilities
* image vulnerabilities
* dependency updates
* build provenance where available

Do not automatically upgrade dependencies in ways that can break production.

Use controlled dependency-update procedures.

---

# 40. Container Security

Review production images for:

* non-root execution
* minimal base image
* unnecessary packages
* exposed secrets
* writable filesystem requirements
* privileged mode
* capabilities
* image vulnerabilities

Use resource limits.

Do not run privileged containers without explicit justification.

---

# 41. Kubernetes Security

If Kubernetes/EKS is actually used, review:

* RBAC
* service accounts
* pod security
* network policies
* resource requests/limits
* secrets integration
* ingress
* node security
* autoscaling
* disruption budgets

Do not add Kubernetes-specific infrastructure if the actual repository does not use Kubernetes.

---

# 42. Production Deployment Safety

Implement or verify:

* pre-deployment validation
* migration compatibility checks
* health checks
* readiness checks
* rolling/blue-green behavior
* smoke tests
* rollback
* deployment monitoring

Database migrations must be compatible with the deployment sequence.

Avoid deployments that require simultaneous downtime across all application instances.

---

# 43. Rollback Strategy

Define rollback procedures for:

* application release
* worker release
* infrastructure release
* configuration change
* database migration where rollback is safe

Do not blindly roll back destructive database migrations.

Prefer forward-compatible database migrations.

---

# 44. Incident Response

Create a production incident process.

Document:

* severity
* detection
* escalation
* containment
* communication
* recovery
* post-incident review

Critical incidents should have a clear escalation path.

Do not expose private customer information during incident handling.

---

# 45. Security Incident Response

Define procedures for:

* compromised credentials
* leaked secret
* suspicious authentication activity
* malicious upload
* unauthorized API access
* suspicious payment activity
* compromised CI/CD credentials

Include:

* containment
* credential rotation
* session revocation where appropriate
* evidence preservation
* recovery
* audit

Do not destroy useful evidence prematurely.

---

# 46. Operational Access

Production access must be:

* authenticated
* authorized
* auditable
* least privilege
* temporary where possible

Avoid shared administrator accounts.

Protect administrative endpoints.

---

# 47. Auditability

Ensure important operational actions are auditable.

Examples:

* infrastructure changes
* privileged administrative operations
* inventory adjustments
* payment administrative actions
* refunds
* seller suspension
* customer account security actions
* production configuration changes

Do not log sensitive secrets as audit data.

---

# 48. Privacy

Review infrastructure data flows.

Ensure privacy boundaries across:

* application logs
* tracing
* metrics
* backups
* S3
* search
* caches
* queues
* analytics
* notification systems

Do not replicate sensitive customer information unnecessarily.

Define retention and deletion behavior where required by the application.

---

# 49. Production Readiness Checklist

Perform a final production-readiness review covering:

### Application

* startup
* health checks
* graceful shutdown
* configuration
* error handling

### Database

* backups
* recovery
* migrations
* connection capacity

### Redis

* encryption
* failover
* monitoring

### Search

* cluster health
* index recovery
* reindex procedure

### Storage

* S3 security
* CloudFront
* lifecycle

### Queues

* retry
* DLQ
* monitoring

### Events

* lag
* replay
* recovery

### Security

* IAM
* WAF
* secrets
* TLS
* network isolation

### CI/CD

* protected deployment
* artifact integrity
* rollback

### Observability

* metrics
* logs
* traces
* dashboards
* alerts

### Disaster Recovery

* backups
* restore
* RTO/RPO
* runbooks

---

# 50. Validation

Run actual validation wherever access permits.

Validate:

* Terraform/OpenTofu
* infrastructure plans
* Kubernetes manifests if used
* Docker builds
* application builds
* health checks
* monitoring configuration
* alert configuration
* backup configuration
* restoration tests where possible
* security configuration
* CI/CD workflows

If a cloud operation cannot be executed because credentials or environment access are unavailable:

* do not fake the result
* validate everything possible locally
* explicitly report the limitation

---

# 51. Final Operational Documentation

Update documentation with:

* production architecture
* SLOs
* monitoring
* dashboards
* alerts
* escalation
* deployment
* rollback
* backup
* restore
* disaster recovery
* incident response
* security incident response
* secret rotation
* capacity management
* cost management
* operational runbooks

Documentation must match actual implementation.

---

# 52. Explicit Scope Boundaries

Do not invent enterprise compliance certifications or claim compliance with:

* PCI DSS
* SOC 2
* ISO 27001
* GDPR
* HIPAA

unless the repository and actual operational controls genuinely support the claim and the necessary assessment has been performed.

Implement technical controls where appropriate, but do not claim formal certification.

Do not create unsupported multi-region architecture merely for appearance.

Do not claim zero-downtime deployment unless the actual architecture supports it.

Do not claim disaster recovery is tested unless restoration has actually been tested.

---

# 53. Non-Negotiable Rules

You must:

* Inspect the actual repository.
* Extend existing infrastructure.
* Use infrastructure as code.
* Monitor critical services.
* Protect production.
* Use least privilege.
* Keep secrets secure.
* Configure actionable alerts.
* Configure meaningful dashboards.
* Protect public endpoints.
* Maintain backups.
* Define recovery procedures.
* Test recovery where possible.
* Support safe deployments.
* Support rollback.
* Document incidents and recovery.
* Monitor queues and events.
* Monitor payment/inventory reliability.
* Maintain search rebuildability.
* Control infrastructure costs.
* Validate actual configuration.
* Report only verified results.

You must NOT:

* Invent deployed resources.
* Claim backups are restorable without testing.
* Claim an alert works without validating it.
* Claim high availability without configuring it.
* Claim disaster recovery without a real recovery process.
* Claim compliance certification.
* Store secrets in source control.
* Use broad administrator permissions unnecessarily.
* Expose private data through observability.
* Disable TLS.
* Disable security controls to make deployments easier.
* Create duplicate monitoring systems without justification.
* Create unsupported multi-region architecture.
* Hide infrastructure failures.
* Suppress validation errors.
* Leave TODO/FIXME infrastructure placeholders.
* Claim production readiness without performing the required review.

---

# 54. Final Infrastructure Operations Report

After implementation, provide a factual report based only on actual repository and infrastructure state.

Include:

1. Files created.
2. Files modified.
3. AWS resources actually configured.
4. Resources actually provisioned, if provisioning was performed.
5. Observability implemented.
6. Metrics implemented.
7. Logging implemented.
8. Tracing implemented.
9. Dashboards created.
10. Alerts created.
11. WAF/security controls.
12. IAM hardening.
13. Network hardening.
14. Secrets management/rotation.
15. Autoscaling.
16. Queue/event monitoring.
17. Payment operational monitoring.
18. Inventory operational monitoring.
19. Search operational monitoring.
20. Backup configuration.
21. Restore tests actually performed.
22. Disaster recovery procedures.
23. Incident-response runbooks.
24. CI/CD hardening.
25. Container security.
26. Cost controls.
27. Production-readiness validation.
28. Commands/tests executed and actual results.
29. Cloud operations that could not be performed due to environment/access limitations.
30. Remaining genuine production risks.

Do not claim anything was deployed, tested, restored, monitored, or validated unless it actually was.

The final result must be an operationally mature, secure, observable, recoverable, and production-ready infrastructure foundation for the ecommerce marketplace.
