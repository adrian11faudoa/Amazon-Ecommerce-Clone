# AMAZON ECOMMERCE PLATFORM — INFRASTRUCTURE VOLUME 4 IMPLEMENTATION PROMPT

# ROLE

Act as a complete senior infrastructure, platform, reliability, security, observability, release-engineering, and production-readiness organization responsible for final infrastructure hardening of a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Staff Platform Engineer
* Kubernetes Engineer
* AWS Infrastructure Engineer
* Infrastructure-as-Code Engineer
* Site Reliability Engineer
* Security Engineer
* Network Engineer
* Database Infrastructure Engineer
* Observability Engineer
* CI/CD Engineer
* Disaster Recovery Engineer
* Performance Engineer
* Reliability Engineer
* Incident Response Engineer
* Release Engineering Engineer
* Production Readiness Engineer

Do not act as a teacher, consultant, or tutorial writer.

Implement the required infrastructure directly in the repository.

The objective is to complete infrastructure productionization, remove operational inconsistencies, harden deployment and recovery paths, validate the entire platform, and establish a final production-ready operating standard.

---

# PROJECT

Build and operate a globally scalable Amazon-style ecommerce marketplace supporting:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume browsing and search
* Multi-seller checkout
* Inventory reservation
* Payments and refunds
* Shipping and fulfillment
* Returns
* Reviews and ratings
* Promotions and coupons
* Notifications
* Seller payouts
* Administrative operations
* Media processing and delivery
* Background processing
* Event-driven workflows
* Analytics
* Auditing

The infrastructure must support sustained production operation, continuous delivery, security, resilience, observability, disaster recovery, and controlled growth.

---

# PRIMARY USERS

Infrastructure supports:

* Customers
* Sellers
* Administrators
* Operations teams
* Support teams
* Engineering teams
* Security teams
* SRE teams
* Data and analytics teams

Customer-facing transactional systems have the highest availability and reliability priority.

---

# TECHNOLOGY DIRECTION

Use the repository's established infrastructure where compatible.

Primary platform:

* AWS
* Terraform
* Docker
* Kubernetes
* Amazon EKS
* Helm
* GitHub Actions
* PostgreSQL
* Redis
* Elasticsearch/OpenSearch
* S3
* CloudFront
* BullMQ
* Kafka or equivalent durable event infrastructure where required
* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* CloudWatch
* AWS Secrets Manager / Parameter Store
* AWS WAF
* AWS Shield where justified
* CloudTrail
* GuardDuty
* Security Hub
* AWS Config where appropriate

Do not introduce infrastructure technology without a concrete operational reason.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before modifying anything:

1. Inspect the complete repository.
2. Inspect every infrastructure directory.
3. Inspect Terraform modules and environments.
4. Inspect Kubernetes configuration.
5. Inspect Helm charts.
6. Inspect Dockerfiles.
7. Inspect GitHub Actions.
8. Inspect application deployment configuration.
9. Inspect worker deployments.
10. Inspect scheduled jobs.
11. Inspect database infrastructure.
12. Inspect Redis infrastructure.
13. Inspect search infrastructure.
14. Inspect object storage.
15. Inspect CDN and edge infrastructure.
16. Inspect queue/event infrastructure.
17. Inspect observability.
18. Inspect security configuration.
19. Inspect backups and disaster recovery.
20. Inspect infrastructure documentation.
21. Identify inconsistencies, duplication, unsafe defaults, missing validation, and production-readiness gaps.

Do not rebuild correct infrastructure merely to change its style.

---

# IMPLEMENTATION SCOPE

Perform the final infrastructure productionization and consistency pass.

Cover:

1. Infrastructure consistency
2. Environment consistency
3. Terraform quality
4. Kubernetes quality
5. Helm quality
6. Docker hardening
7. CI/CD hardening
8. Release safety
9. Configuration consistency
10. Secrets consistency
11. IAM consistency
12. Network consistency
13. Security hardening
14. Observability consistency
15. Alert quality
16. SLO/SLI validation
17. Scaling consistency
18. Database protection
19. Redis protection
20. Search protection
21. Queue protection
22. Media infrastructure hardening
23. Backup validation
24. Disaster recovery validation
25. Failure testing
26. Deployment testing
27. Performance validation
28. Cost governance
29. Operational documentation
30. Production readiness
31. Final infrastructure validation

---

# INFRASTRUCTURE CONSISTENCY

Review the complete infrastructure implementation.

Ensure consistent:

* Naming
* Labels
* Tags
* Environment identifiers
* Regions
* Availability-zone assumptions
* Resource ownership
* Module boundaries
* Provider configuration
* State management
* Secret references
* Logging configuration
* Monitoring configuration
* Security controls
* Deployment conventions

Remove unnecessary duplication.

Do not introduce incompatible conventions between environments.

---

# ENVIRONMENT CONSISTENCY

Verify:

* Local
* Development
* Test
* Staging
* Production
* Disaster Recovery

are clearly separated.

Ensure:

* Production credentials cannot be used from development.
* Development cannot accidentally modify production resources.
* Test cannot access production data.
* Staging remains production-like.
* DR configuration is recoverable.
* Environment variables are correctly scoped.
* Environment-specific resource sizing is intentional.

---

# TERRAFORM HARDENING

Review Terraform for:

* Unsafe defaults
* Unencrypted resources
* Public exposure
* Excessive IAM
* Missing lifecycle protections
* Missing validation
* Unclear dependencies
* Duplicated resources
* Hardcoded environment values
* Hardcoded credentials
* Unmanaged resources
* State risks

Ensure:

* Formatting is consistent.
* Modules have clear interfaces.
* Variables are validated.
* Outputs are intentional.
* Providers are controlled.
* Versions are pinned appropriately.
* State is remote and protected.
* Destructive operations are appropriately guarded.

---

# TERRAFORM SAFETY

Production Terraform must support safe change management.

Where appropriate:

* Protect critical resources from accidental destruction.
* Require explicit review for destructive changes.
* Generate plans before apply.
* Preserve state locking.
* Validate plans in CI.
* Detect drift.
* Restrict production apply permissions.

Do not make Terraform impossible to operate through excessive safeguards.

---

# KUBERNETES HARDENING

Review all production workloads.

Verify:

* Security contexts
* Non-root execution
* Resource requests
* Resource limits
* Probes
* Pod disruption budgets
* Topology spread
* Anti-affinity
* Service accounts
* Network policies
* Namespace boundaries
* RBAC
* Autoscaling
* Graceful shutdown
* Termination behavior

Remove unnecessary privileged access.

---

# HELM HARDENING

Review charts for:

* Unsafe defaults
* Secret leakage
* Missing values validation
* Inconsistent labels
* Missing probes
* Missing resources
* Missing security contexts
* Missing disruption controls
* Incorrect environment overrides

Ensure values remain understandable and environment-specific behavior is explicit.

---

# DOCKER HARDENING

Review every production image.

Ensure:

* Minimal runtime image
* Multi-stage builds
* Non-root execution
* No unnecessary tools
* No development dependencies where inappropriate
* No secrets
* Deterministic builds
* Vulnerability scanning
* Image provenance
* Immutable production references

Remove avoidable attack surface.

---

# CI/CD HARDENING

Review all GitHub Actions workflows.

Ensure:

* Minimal workflow permissions
* OIDC authentication where supported
* No long-lived cloud credentials
* Dependency pinning where appropriate
* Secure action versions
* Secret isolation
* Build validation
* Security scanning
* Artifact integrity
* Environment protection
* Production approvals
* Deployment verification

Avoid workflows capable of deploying arbitrary unreviewed code to production without appropriate controls.

---

# RELEASE ENGINEERING

Ensure production releases are:

* Immutable
* Traceable
* Reproducible
* Reversible where technically possible
* Observable
* Verified

Each release should identify:

* Commit
* Build
* Image digest
* Environment
* Deployment time
* Configuration version

---

# DATABASE DEPLOYMENT SAFETY

Review application deployment and database migration integration.

Ensure:

* Migrations are version-controlled.
* Migrations run exactly when intended.
* Migration concurrency is controlled.
* Backward compatibility is maintained during rolling deployment.
* Destructive migrations require explicit handling.
* Failed migrations are detectable.
* Database backups exist before high-risk changes where appropriate.

Do not automatically roll back database changes that cannot safely be reversed.

---

# DATABASE CAPACITY PROTECTION

Verify protection against application scaling overwhelming PostgreSQL.

Review:

* Connection pools
* Worker concurrency
* Autoscaling limits
* Query timeouts
* Connection limits
* Database CPU
* Storage
* Read replicas where applicable
* Connection proxies where justified

Application scaling must remain bounded by database capacity.

---

# REDIS PRODUCTION HARDENING

Review Redis usage.

Verify:

* Memory limits
* Eviction behavior
* High availability
* Encryption
* Authentication
* Network isolation
* Connection management
* Queue workload isolation
* Monitoring

Ensure cache failure does not corrupt authoritative transactional state.

---

# SEARCH PRODUCTION HARDENING

Review search infrastructure.

Verify:

* Capacity
* Index lifecycle
* Shard strategy
* Replica strategy
* Encryption
* Access control
* Backups/snapshots
* Monitoring
* Recovery
* Reindexing procedures

Ensure indexing failures cannot silently leave the catalog permanently inconsistent.

---

# QUEUE AND EVENT HARDENING

Review asynchronous infrastructure.

Verify:

* Queue isolation
* Retry policies
* Dead-letter behavior
* Consumer concurrency
* Idempotency
* Backpressure
* Monitoring
* Recovery
* Replay procedures
* Duplicate handling

Critical financial and inventory workflows must remain safe under retries and replay.

---

# MEDIA INFRASTRUCTURE HARDENING

Review:

* S3
* CloudFront
* Upload paths
* Signed URLs
* Object lifecycle
* Encryption
* Access control
* Media-processing workers
* Upload limits
* Failure handling

Ensure malicious or malformed uploads cannot compromise infrastructure.

---

# SECRETS HARDENING

Perform a complete secret-management review.

Verify no sensitive values are present in:

* Git
* Docker images
* Terraform variables
* Helm values
* Kubernetes manifests
* CI logs
* Application logs
* Build artifacts

Use secure runtime references.

Verify secret rotation procedures.

---

# IAM FINAL REVIEW

Perform a least-privilege review.

Identify and remove:

* Unused roles
* Excessive permissions
* Wildcard permissions
* Unnecessary administrative access
* Unused trust relationships
* Long-lived credentials

Ensure service-specific identities are isolated.

---

# NETWORK FINAL REVIEW

Review all externally reachable resources.

Identify:

* Public databases
* Public Redis
* Public search
* Public Kubernetes services
* Unnecessary ports
* Broad security groups
* Unrestricted administrative access
* Unnecessary outbound access

Correct unsafe exposure.

---

# EDGE SECURITY

Review:

* CloudFront
* WAF
* Shield
* Load balancers
* TLS
* DNS
* Origin access

Ensure public traffic is protected against common web attacks and excessive traffic.

---

# OBSERVABILITY FINAL REVIEW

Verify complete telemetry coverage.

Every critical workload should provide:

* Metrics
* Logs
* Traces
* Health status

Telemetry must include:

* Service
* Version
* Environment
* Region
* Instance/pod
* Correlation ID
* Trace ID

Do not log secrets or unnecessary sensitive information.

---

# DASHBOARD QUALITY

Review dashboards for operational usefulness.

Critical dashboards should allow engineers to answer:

* Is the service available?
* Is latency increasing?
* Are errors increasing?
* Are replicas healthy?
* Is capacity sufficient?
* Is a deployment responsible?
* Is a dependency failing?
* Is a queue backing up?
* Is the database saturated?
* Is the region healthy?

Remove meaningless metrics or improve them.

---

# ALERT QUALITY

Review alerts for:

* False positives
* Missing severity
* Missing ownership
* Missing context
* Duplicate alerts
* Non-actionable alerts
* Missing customer-impact alerts

Every paging alert should correspond to an actionable operational condition.

---

# SLO VALIDATION

Validate that SLOs can actually be measured.

For each important SLO:

* Define source metrics.
* Define measurement window.
* Define threshold.
* Define alerting relationship.
* Define ownership.

Do not create SLOs that cannot be reliably measured.

---

# SCALING HARDENING

Review:

* HPA
* Cluster autoscaling
* Queue-based scaling
* Node capacity
* Pod limits
* Database limits
* Redis limits
* Search limits

Ensure scaling is:

* Bounded
* Predictable
* Observable
* Downstream-aware

Avoid autoscaling loops.

---

# FAILURE TESTING

Execute controlled failure tests where practical.

Test:

* Pod failure
* Node failure
* Worker failure
* Queue failure
* Database failover
* Redis failover
* Search failure
* Dependency timeout
* Deployment failure
* Rollback
* Availability-zone failure in a safe environment

Record actual behavior.

Fix failures discovered within scope.

---

# DISASTER RECOVERY FINAL VALIDATION

Perform final recovery validation.

Verify:

* PostgreSQL recovery
* Object recovery
* Search reconstruction
* Redis recovery
* Queue recovery
* Kubernetes reconstruction
* Terraform reconstruction
* Secret references
* DNS recovery
* CDN recovery

Validate that recovery procedures match actual infrastructure.

---

# REGIONAL RECOVERY

Where multi-region architecture exists, validate:

* Regional health detection
* Traffic transition
* Application startup
* Database recovery
* Queue/event behavior
* Object availability
* Search availability
* Secret availability
* Observability
* DNS behavior

Do not claim active-active behavior unless the infrastructure actually supports it.

---

# DATA INTEGRITY DURING RECOVERY

Validate recovery of:

* Orders
* Payments
* Refunds
* Inventory
* Seller balances
* Payouts
* Returns

Check for:

* Duplicate processing
* Lost processing
* Stale state
* Inconsistent balances
* Missing events

Use reconciliation mechanisms where appropriate.

---

# BACKUP VALIDATION

Verify:

* Backup success
* Retention
* Encryption
* Access controls
* Restore capability
* Recovery-point visibility

A backup is considered operationally useful only if recovery has been validated.

---

# PERFORMANCE VALIDATION

Run or integrate infrastructure performance tests.

Measure:

* API latency
* Search latency
* Database latency
* Redis latency
* Queue throughput
* Worker throughput
* Autoscaling response
* Deployment impact
* Recovery performance

Identify infrastructure bottlenecks.

---

# CAPACITY VALIDATION

Compare expected workloads against actual capacity.

Review:

* CPU
* Memory
* Storage
* Network
* Database connections
* Redis memory
* Search capacity
* Queue throughput
* CDN traffic
* Kubernetes node capacity

Establish clear scaling thresholds.

---

# COST VALIDATION

Review infrastructure cost risks.

Identify:

* Unused resources
* Excessive NAT traffic
* Oversized instances
* Excessive log retention
* Unbounded storage
* Unbounded metrics
* Unbounded traces
* Unnecessary replicas

Reduce waste without compromising reliability.

---

# OPERATIONAL RUNBOOKS

Ensure runbooks exist and match actual implementation.

At minimum include procedures for:

* Deployment
* Rollback
* Database migration
* Database recovery
* Redis recovery
* Search recovery
* Queue recovery
* Kubernetes recovery
* Secret rotation
* Certificate issues
* Incident response
* Regional failover
* Regional failback
* Infrastructure drift
* Security incident

Runbooks must be executable by qualified operators.

---

# PRODUCTION READINESS CHECKLIST

Create a final production-readiness checklist covering:

## SECURITY

* IAM
* Network
* Secrets
* Encryption
* Containers
* Kubernetes
* CI/CD
* Edge protection

## RELIABILITY

* Multi-AZ
* Health checks
* Autoscaling
* Graceful shutdown
* Backups
* Recovery
* Failover

## OBSERVABILITY

* Logs
* Metrics
* Traces
* Dashboards
* Alerts
* SLOs

## DEPLOYMENT

* CI
* CD
* Artifact immutability
* Rollback
* Migration safety
* Verification

## DATA

* PostgreSQL
* Redis
* Search
* S3
* Queues
* Events

## OPERATIONS

* Runbooks
* Ownership
* Incident response
* Capacity
* Cost
* Recovery

---

# DOCUMENTATION FINALIZATION

Ensure infrastructure documentation accurately describes:

* Architecture
* Environments
* Deployment
* Scaling
* Security
* Observability
* Backups
* Disaster recovery
* Incident response
* Operations
* Troubleshooting

Remove obsolete documentation.

Do not leave contradictory instructions.

---

# IMPLEMENTATION BOUNDARIES

This volume is the final infrastructure hardening and production-readiness pass.

Do not redesign business domains.

Do not redesign frontend or mobile applications.

Do not replace valid infrastructure merely for stylistic reasons.

Do not create infrastructure that the platform does not need.

Do not claim infrastructure capabilities that are not implemented.

Do not create theoretical validation reports.

Validation must reflect actual execution.

---

# ABSOLUTE IMPLEMENTATION RULES

1. Inspect the repository first.
2. Treat repository state as authoritative.
3. Preserve correct existing infrastructure.
4. Implement complete production hardening.
5. Do not use pseudo-code.
6. Do not use placeholders.
7. Do not leave TODO/FIXME gaps.
8. Do not hardcode credentials.
9. Do not commit secrets.
10. Do not expose private resources publicly.
11. Do not weaken security for convenience.
12. Do not create unsupported availability claims.
13. Do not create unsupported recovery claims.
14. Do not fabricate test results.
15. Do not fabricate performance results.
16. Do not fabricate disaster-recovery validation.
17. Do not create unsafe destructive automation.
18. Do not ignore transactional integrity.
19. Do not ignore financial correctness.
20. Do not create meaningless monitoring.
21. Do not create noisy alerting.
22. Do not introduce unnecessary services.
23. Maintain backward compatibility.
24. Preserve working application behavior.
25. Validate every relevant infrastructure change.
26. Update documentation.
27. Keep infrastructure reproducible.
28. Keep deployments traceable.
29. Keep recovery executable.
30. Leave the infrastructure operationally maintainable.

---

# PRODUCTION EXPECTATIONS

The infrastructure must be suitable for:

* Large-scale production traffic
* Continuous deployment
* Multi-AZ operation
* Regional recovery
* Secure operations
* Automated provisioning
* Automated validation
* Controlled releases
* Incident response
* Disaster recovery
* Performance growth
* Capacity expansion
* Security monitoring
* Operational auditing

The final infrastructure must not resemble a prototype or development-only deployment.

---

# VALIDATION AND COMPLETION

Before declaring this volume complete:

1. Inspect every modified file.
2. Validate Terraform.
3. Validate Terraform plans.
4. Validate Helm.
5. Validate Kubernetes manifests.
6. Build relevant Docker images.
7. Run security scans.
8. Validate CI/CD workflows.
9. Validate IAM.
10. Validate network exposure.
11. Validate encryption.
12. Validate secrets handling.
13. Validate database infrastructure.
14. Validate Redis.
15. Validate search.
16. Validate object storage.
17. Validate queues and events.
18. Validate autoscaling.
19. Validate observability.
20. Validate alerts.
21. Validate SLO/SLI instrumentation.
22. Validate backup configuration.
23. Validate restore procedures.
24. Validate disaster recovery.
25. Execute controlled resilience tests where safe.
26. Validate deployment and rollback.
27. Validate migration safety.
28. Validate production-readiness checklist.
29. Verify documentation.
30. Verify no secrets or unsafe artifacts remain in the repository.

Fix all issues that can safely be fixed within this scope.

Do not report a known fixable infrastructure defect as merely a future concern.

Do not fabricate successful validation when a required test could not be executed.

---

# IMPLEMENTATION REPORT

At completion, provide:

## FILES CREATED

List every newly created file.

## FILES MODIFIED

List every modified file.

## FINAL INFRASTRUCTURE STATE

Summarize the complete production infrastructure state relevant to this volume.

## SECURITY

Summarize final security hardening.

## RELIABILITY

Summarize availability, scaling, fault isolation, and recovery capabilities.

## DISASTER RECOVERY

Summarize actual backup, restore, failover, and recovery validation.

## OBSERVABILITY

Summarize logs, metrics, traces, dashboards, alerts, and SLO/SLI coverage.

## CI/CD

Summarize build, security, deployment, promotion, verification, and rollback controls.

## PERFORMANCE

Summarize performance and capacity validation.

## OPERATIONS

Summarize runbooks, incident response, ownership, and operational tooling.

## VALIDATION

List the actual commands, tests, scans, deployment checks, resilience tests, and recovery validations executed, including their results.

## REMAINING ISSUES

Report only genuine unresolved issues that cannot safely be resolved within this scope.

Do not invent remaining issues.

---

# FINAL DIRECTIVE

Implement this infrastructure volume directly in the repository.

Inspect first.

Understand the entire infrastructure state.

Harden existing systems rather than unnecessarily replacing them.

Make production security enforceable.

Make deployments safe.

Make infrastructure reproducible.

Make scaling bounded and observable.

Make failures isolated.

Make recovery executable.

Make backups recoverable.

Make disaster recovery testable.

Make observability actionable.

Make incidents diagnosable.

Make capacity measurable.

Make operational procedures accurate.

Validate the actual implementation.

Do not fabricate validation results.

Do not leave known fixable production-readiness defects unresolved.

Update all relevant documentation.

Leave the repository in a coherent, secure, resilient, observable, maintainable, and production-ready infrastructure state for the scope covered by this volume.
