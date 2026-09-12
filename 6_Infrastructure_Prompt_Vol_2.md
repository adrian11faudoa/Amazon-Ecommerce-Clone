# AMAZON ECOMMERCE PLATFORM — INFRASTRUCTURE VOLUME 2 IMPLEMENTATION PROMPT

# ROLE

Act as a complete senior infrastructure and platform engineering organization responsible for implementing the next production-grade infrastructure layer for a large-scale Amazon-style ecommerce marketplace.

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
* Release Engineering Engineer
* Performance Engineer

Do not act as a teacher, consultant, or tutorial writer.

Implement the infrastructure directly in the repository.

The objective is to establish production-grade application deployment, service orchestration, scaling, release automation, observability, reliability, and operational controls for the Amazon Ecommerce platform.

---

# PROJECT

Build and productionize the infrastructure for a globally scalable Amazon-style ecommerce marketplace supporting:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume product browsing
* High-volume search
* High-volume checkout
* Multi-seller orders
* Inventory management
* Payments and refunds
* Shipping and fulfillment
* Returns
* Reviews and ratings
* Promotions and coupons
* Notifications
* Seller payouts
* Administrative operations
* Media processing and delivery
* Background jobs
* Event-driven workflows
* Analytics
* Auditing

The infrastructure must support continuous deployment, horizontal scaling, fault isolation, operational visibility, controlled releases, and recovery from infrastructure and application failures.

---

# PRIMARY USERS

Infrastructure serves:

* Customers
* Sellers
* Administrators
* Operations teams
* Support teams
* Engineering teams
* Security teams
* SRE teams
* Data and analytics teams

Infrastructure must remain invisible to customers while providing predictable availability, performance, and recovery.

---

# TECHNOLOGY DIRECTION

Use the repository's established infrastructure where compatible.

Primary technologies include:

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
* Vault where already required

Use managed services when they improve operational reliability.

Do not introduce infrastructure technology solely for novelty.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before implementing anything:

1. Inspect the complete repository structure.
2. Inspect infrastructure created by the existing implementation.
3. Inspect Terraform modules and environment composition.
4. Inspect Dockerfiles.
5. Inspect Helm charts.
6. Inspect Kubernetes manifests.
7. Inspect application deployment requirements.
8. Inspect backend services.
9. Inspect worker services.
10. Inspect scheduled jobs.
11. Inspect CI/CD workflows.
12. Inspect environment configuration.
13. Inspect observability configuration.
14. Inspect current health/readiness endpoints.
15. Inspect resource requirements.
16. Inspect existing deployment scripts.
17. Inspect existing infrastructure documentation.
18. Identify what is already production-ready.
19. Identify missing deployment and operations capabilities.
20. Reuse compatible infrastructure instead of replacing it.

Do not assume the repository matches an ideal architecture.

Repository state takes precedence over assumptions.

---

# IMPLEMENTATION SCOPE

Implement the application deployment and production operations layer.

This volume must establish the infrastructure required to deploy and operate the application's actual services reliably.

Cover:

1. Production Kubernetes workload architecture
2. Backend API deployment
3. Worker deployment
4. Scheduled jobs
5. Service discovery
6. ConfigMap and secret integration
7. Service accounts
8. Resource management
9. Health checks
10. Pod disruption budgets
11. Horizontal autoscaling
12. Cluster autoscaling integration
13. Ingress routing
14. TLS integration
15. Application load balancing
16. Deployment strategies
17. Rolling deployments
18. Canary or progressive deployment foundations where justified
19. Rollback
20. Database migration deployment strategy
21. CI/CD application pipelines
22. Image promotion
23. Environment promotion
24. Deployment verification
25. Release metadata
26. Observability integration
27. Application dashboards
28. Infrastructure dashboards
29. Alerting
30. Queue monitoring
31. Worker scaling
32. Scheduled-job reliability
33. Graceful shutdown
34. Graceful termination
35. Pod startup behavior
36. Fault isolation
37. Security hardening
38. Runtime policies
39. Production configuration
40. Operational runbooks
41. Deployment testing
42. Production readiness validation

---

# APPLICATION DEPLOYMENT ARCHITECTURE

Deploy the application's independently scalable workloads according to actual repository structure.

Support separate workloads for components such as:

* Public API
* Internal API where applicable
* Background workers
* Notification workers
* Search indexing workers
* Media-processing workers
* Catalog-import workers
* Payment/reconciliation workers
* Order-processing workers
* Analytics workers
* Scheduled jobs

Do not deploy every workload using identical resource or scaling policies.

Workload behavior must determine:

* CPU requirements
* Memory requirements
* Replicas
* Concurrency
* Autoscaling
* Timeouts
* Graceful termination
* Retry strategy

---

# KUBERNETES WORKLOAD SECURITY

Every workload must use secure Kubernetes defaults.

Configure:

* Non-root execution
* Read-only root filesystem where compatible
* Dropped Linux capabilities
* Explicit security contexts
* Seccomp profiles where supported
* Service-account isolation
* Least-privilege IAM
* Network policies
* Resource limits
* Resource requests
* Restricted host access
* No privileged containers unless strictly necessary

Do not grant workloads cluster-admin privileges.

Do not mount host filesystems unless absolutely required and justified.

---

# RESOURCE MANAGEMENT

Define production resource requirements based on actual service characteristics.

Use:

* CPU requests
* Memory requests
* CPU limits where appropriate
* Memory limits
* Ephemeral-storage limits where appropriate
* Pod quotas
* Namespace quotas where justified

Avoid arbitrary resource values.

Use load testing and runtime observations to refine resource sizing.

Prevent one workload from exhausting node capacity.

---

# HEALTH CHECKS

Every deployable workload must have appropriate:

* Startup probes
* Readiness probes
* Liveness probes

Probe behavior must reflect actual application lifecycle.

Readiness must prevent traffic from reaching unhealthy instances.

Liveness must not restart services merely because of temporary dependency degradation.

Startup probes must allow realistic initialization time.

---

# GRACEFUL SHUTDOWN

Implement graceful termination.

Applications and workers must:

* Stop accepting new work
* Finish safe in-flight work where possible
* Acknowledge or release queue work appropriately
* Close database connections
* Close Redis connections
* Close event consumers
* Flush telemetry
* Stop accepting traffic before termination
* Respect termination grace periods

Do not allow deployments to cause unnecessary order, payment, inventory, or queue-processing failures.

---

# POD DISRUPTION PROTECTION

Implement PodDisruptionBudgets where appropriate.

Protect critical services from voluntary disruption.

Ensure disruption policies do not prevent legitimate cluster maintenance indefinitely.

Balance availability against operational flexibility.

---

# SCHEDULING AND FAULT ISOLATION

Use Kubernetes scheduling controls where appropriate:

* Pod anti-affinity
* Topology spread constraints
* Node affinity
* Taints and tolerations
* Dedicated node groups where justified

Critical replicas should not unintentionally land on a single failure domain.

Distribute replicas across availability zones where possible.

---

# HORIZONTAL AUTOSCALING

Configure workload autoscaling based on actual workload behavior.

Use:

* CPU
* Memory
* Request rate
* Latency
* Queue depth
* Worker utilization
* Custom metrics

where appropriate.

API workloads should scale according to request demand.

Workers should scale according to queue workload and processing capacity.

Avoid uncontrolled scaling that can overload:

* PostgreSQL
* Redis
* OpenSearch
* External payment APIs
* External shipping APIs

Scaling must respect downstream capacity.

---

# CLUSTER AUTOSCALING

Integrate workloads with cluster-level capacity management.

Support:

* Node autoscaling
* Appropriate node groups
* Multiple availability zones
* Workload scheduling compatibility
* Safe node draining
* Pod disruption awareness

Avoid autoscaling configurations that create capacity oscillation.

---

# DATABASE CONNECTION MANAGEMENT

Infrastructure must protect PostgreSQL from connection exhaustion.

Configure application and worker deployments with appropriate connection-pool behavior.

Consider:

* Maximum connections
* Pool sizing
* Replica counts
* Autoscaling
* PgBouncer where justified
* Worker concurrency

Scaling application replicas must not blindly multiply database connections beyond safe capacity.

---

# REDIS CONNECTION MANAGEMENT

Configure workloads to avoid excessive Redis connections.

Consider:

* Connection pooling
* Worker concurrency
* Queue workers
* Rate-limit traffic
* Cache traffic
* Reconnection behavior
* Redis failover behavior

Applications must degrade safely when Redis is temporarily unavailable where the affected feature permits it.

Critical transactional operations must not incorrectly treat Redis availability as authoritative business state.

---

# SEARCH CONNECTION MANAGEMENT

Configure search clients and workloads with:

* Connection limits
* Timeouts
* Retry behavior
* Backoff
* Circuit-breaking where appropriate
* Bulk indexing controls

Prevent application autoscaling from overwhelming OpenSearch/Elasticsearch.

---

# INGRESS ROUTING

Implement production routing for actual applications.

Support:

* Public domains
* API domains
* Administrative domains where applicable
* Seller portal routing where applicable
* Environment-specific domains
* TLS
* Health checks
* Request-size controls
* Timeouts
* Secure headers
* Controlled CORS integration where required

Do not expose internal services through public ingress.

---

# LOAD BALANCING

Configure application load balancing for:

* High availability
* Multi-AZ operation
* Health-aware routing
* Connection draining
* TLS
* Appropriate idle timeouts
* Access logging
* Monitoring

Ensure load balancers do not route traffic to unhealthy workloads.

---

# DEPLOYMENT STRATEGY

Implement safe deployment mechanisms.

At minimum support:

* Rolling deployments
* Controlled rollout
* Readiness validation
* Automatic rollout failure detection
* Rollback

Where the repository and operational complexity justify it, establish foundations for:

* Canary releases
* Blue/green deployment
* Progressive delivery

Do not introduce a complicated progressive-delivery system without a real operational benefit.

---

# RELEASE SAFETY

Every deployment must be traceable.

Release metadata should identify:

* Application
* Environment
* Git commit
* Image digest
* Build number
* Deployment timestamp
* Configuration version

Never rely only on mutable image tags.

Production workloads should reference immutable image versions or digests.

---

# DATABASE MIGRATIONS

Implement a production-safe database migration strategy.

Migrations must account for rolling deployments where old and new application versions may temporarily coexist.

Prefer backward-compatible migration sequences:

1. Add compatible schema structures.
2. Deploy compatible application code.
3. Migrate data where required.
4. Remove obsolete structures only after they are no longer used.

Do not automatically destroy production database structures during deployment.

Migration failures must prevent unsafe application promotion.

---

# CI/CD APPLICATION PIPELINES

Implement GitHub Actions pipelines that support:

* Source validation
* Unit tests
* Integration tests
* Type checking
* Linting
* Security scans
* Docker build
* Container scan
* Image publication
* Helm validation
* Deployment
* Deployment verification
* Rollback

Separate CI from deployment concerns where appropriate.

---

# IMAGE PROMOTION

Use immutable container artifacts.

Build once and promote the same artifact across environments.

Avoid rebuilding different images for:

* Development
* Test
* Staging
* Production

Environment-specific behavior should come from configuration, not different application binaries.

---

# ENVIRONMENT PROMOTION

Define a controlled promotion path:

Development → Test → Staging → Production

Do not automatically promote unverified builds into production.

Production promotion must have appropriate controls.

Ensure staging deployment validates the same artifact intended for production.

---

# DEPLOYMENT VERIFICATION

After deployment, automatically verify:

* Pods become ready
* Services respond
* Health endpoints succeed
* Critical API endpoints function
* Database connectivity works
* Redis connectivity works
* Search connectivity works where required
* Queue workers consume work
* Metrics are available
* Logs are flowing
* Traces are flowing
* Error rates remain within expected bounds

Deployment should fail when critical verification fails.

---

# AUTOMATED ROLLBACK

Implement rollback mechanisms.

A rollback must be possible when:

* Deployment fails
* Health checks fail
* Error rates spike
* Critical latency increases
* Application startup fails
* Dependency compatibility fails

Document rollback limitations for irreversible database migrations and data changes.

---

# OBSERVABILITY INTEGRATION

Connect application deployments to the existing observability platform.

Every service should emit:

* Metrics
* Structured logs
* Distributed traces

Include:

* Service name
* Environment
* Version
* Instance/pod
* Trace ID
* Correlation ID

Telemetry must support identifying which deployment introduced a problem.

---

# APPLICATION DASHBOARDS

Create dashboards for critical services.

At minimum monitor:

* Request rate
* Error rate
* Latency
* Saturation
* Replica count
* Restart count
* CPU
* Memory
* Queue depth
* Worker throughput
* Database connections
* Redis usage
* Search latency

Use service-level dashboards for critical customer-facing and transactional components.

---

# SERVICE LEVEL OBJECTIVES

Establish infrastructure-ready SLO definitions for critical platform capabilities.

Examples:

* API availability
* Checkout availability
* Order submission reliability
* Payment processing reliability
* Search availability
* Queue processing latency
* Notification processing latency

Define appropriate:

* SLI
* SLO
* Measurement source
* Alert threshold

Do not invent unrealistic targets merely to produce documentation.

---

# ALERTING

Implement alerts based on meaningful operational conditions.

Include:

* High error rates
* High latency
* Unavailable replicas
* Crash loops
* Failed deployments
* Queue backlog
* Worker failures
* Database exhaustion
* Redis saturation
* Search degradation
* Node capacity pressure
* Certificate problems
* Backup failures
* Infrastructure failures

Use severity levels appropriate to operational impact.

Avoid alerting on every transient event.

---

# QUEUE WORKER OPERATIONS

Deploy BullMQ workers as independently scalable workloads.

Support:

* Queue-specific deployments where justified
* Worker concurrency
* Autoscaling
* Graceful shutdown
* Retry handling
* Failed job visibility
* Dead-letter handling
* Queue metrics
* Operational dashboards

Protect critical queues from noisy or low-priority workloads.

---

# SCHEDULED JOBS

Deploy scheduled jobs using reliable mechanisms.

Support tasks such as:

* Cleanup
* Reconciliation
* Catalog processing
* Search synchronization
* Notification processing
* Financial reconciliation
* Expiration workflows
* Data maintenance

Scheduled jobs must be:

* Idempotent
* Observable
* Retryable where appropriate
* Protected against accidental duplicate execution

---

# CRONJOB SAFETY

Kubernetes CronJobs or equivalent scheduling mechanisms must include:

* Concurrency policy
* Job history limits
* Resource limits
* Timeout behavior
* Retry limits
* Failure monitoring

Do not allow overlapping executions to corrupt business state.

---

# EXTERNAL SERVICE RELIABILITY

Infrastructure must account for dependencies such as:

* Payment providers
* Shipping providers
* Email providers
* SMS providers
* Push notification services
* Tax providers
* Fraud/risk services

Configure reasonable:

* Timeouts
* Retry boundaries
* Connection limits
* Circuit-breaking where appropriate
* Observability

Never allow infrastructure-level retries to multiply unsafe payment or order operations.

---

# SECURITY HARDENING

Harden production deployment pipelines and runtime environments.

Implement:

* Image scanning
* Dependency scanning
* Kubernetes security policies
* IAM least privilege
* Network policies
* Secret isolation
* Audit logs
* Secure CI credentials
* OIDC-based GitHub Actions authentication where supported
* Restricted production access

Do not use long-lived cloud credentials in GitHub Actions when short-lived federation is available.

---

# CI/CD CREDENTIAL SECURITY

Use secure GitHub Actions authentication.

Prefer:

* OIDC federation
* Short-lived AWS credentials
* Environment protection
* Deployment approvals
* Restricted workflow permissions

Do not store permanent AWS access keys in repository secrets if OIDC can be used.

---

# PRODUCTION ACCESS

Production administrative access must be controlled.

Support:

* Least privilege
* MFA-compatible access
* Auditing
* Temporary credentials
* Restricted roles
* Break-glass procedures where necessary

Document who can:

* Deploy
* Roll back
* Modify infrastructure
* Access logs
* Access metrics
* Access production databases
* Access secrets

---

# NETWORK POLICIES

Implement Kubernetes network policies where supported and practical.

Restrict:

* Namespace-to-namespace communication
* Worker access
* Database access
* Search access
* Redis access
* Administrative interfaces

Allow only necessary traffic.

---

# RATE LIMITING AND ABUSE PROTECTION

Coordinate infrastructure with application-level rate limiting.

Use AWS and Kubernetes capabilities where appropriate for:

* Edge protection
* Request throttling
* Bot mitigation
* DDoS protection
* Suspicious traffic detection

Consider AWS WAF and AWS Shield where justified.

Do not rely exclusively on application code for large-scale edge abuse protection.

---

# CDN AND EDGE HARDENING

Harden CloudFront and edge infrastructure.

Support:

* TLS
* Secure origin access
* Appropriate caching
* Compression
* Cache-control behavior
* Signed access where required
* WAF integration where appropriate
* Logging
* Monitoring

Avoid caching private customer-specific responses.

---

# BACKUP MONITORING

Backups must not merely exist; they must be monitored.

Alert on:

* Failed backups
* Missing backups
* Backup retention violations
* Snapshot failures
* Replication failures

Document how backup health is verified.

---

# RECOVERY TESTING FOUNDATIONS

Establish automated or repeatable procedures for testing:

* Database restore
* Object recovery
* Search reconstruction
* Infrastructure recreation
* Kubernetes recovery
* Configuration recovery

Recovery testing must verify actual usability rather than merely confirming that a snapshot exists.

---

# PERFORMANCE ENGINEERING

Infrastructure must support performance testing.

Provide the ability to measure:

* API throughput
* Latency
* Concurrent users
* Database utilization
* Redis utilization
* Search utilization
* Queue throughput
* Worker throughput
* Kubernetes scaling behavior

Identify infrastructure bottlenecks before production traffic exposes them.

---

# CAPACITY PLANNING

Document capacity assumptions for:

* API requests
* Worker jobs
* PostgreSQL connections
* PostgreSQL storage
* Redis memory
* Search storage
* Search queries
* S3 traffic
* CDN traffic
* Queue depth
* Kubernetes nodes

Include scaling triggers and operational thresholds.

Do not make capacity claims unsupported by testing or documented assumptions.

---

# FAILURE ISOLATION

Infrastructure must limit blast radius.

A failure in:

* Search
* Redis
* One worker
* One availability zone
* One application service
* One external provider

must not automatically bring down unrelated transactional systems.

Use:

* Independent deployments
* Resource quotas
* Network boundaries
* Separate worker pools
* Appropriate queue isolation
* Autoscaling boundaries

---

# GRACEFUL DEGRADATION

Infrastructure must support degraded operation.

Examples:

* Search unavailable → core catalog remains available where application design supports fallback
* Recommendation service unavailable → normal catalog remains functional
* Notification provider unavailable → notifications queue for later delivery
* Analytics unavailable → transactional operations continue
* Non-critical worker failure → checkout and order APIs remain available

Do not make every optional dependency a platform-wide single point of failure.

---

# DEPLOYMENT DOCUMENTATION

Document:

* Build process
* Image creation
* Deployment process
* Promotion process
* Rollback
* Database migration procedure
* Emergency deployment
* Emergency rollback
* Worker scaling
* Queue recovery
* Incident response
* Production access
* Troubleshooting
* Common failure modes

Documentation must reflect actual automation.

---

# IMPLEMENTATION BOUNDARIES

This volume is responsible for application deployment and operational orchestration.

Do not redesign:

* Business-domain models
* Checkout logic
* Payment business rules
* Seller logic
* Customer UX
* Mobile UX

Do not replace already-correct foundational infrastructure without a concrete reason.

Do not introduce unnecessary cloud services.

Do not implement fake deployment systems.

Do not document workflows that are not actually automated or operational.

---

# ABSOLUTE IMPLEMENTATION RULES

1. Inspect the repository first.
2. Treat repository state as authoritative.
3. Reuse compatible infrastructure.
4. Implement complete production infrastructure.
5. Do not use pseudo-code.
6. Do not use placeholders.
7. Do not create TODO/FIXME implementation gaps.
8. Do not omit required configuration.
9. Do not hardcode credentials.
10. Do not commit secrets.
11. Do not expose internal services unnecessarily.
12. Do not use mutable production image references.
13. Do not create unsafe deployment automation.
14. Do not perform destructive migrations automatically.
15. Do not create uncontrolled autoscaling.
16. Do not ignore downstream capacity.
17. Do not silently swallow deployment failures.
18. Do not declare deployment success without verification.
19. Do not create monitoring that provides no actionable signal.
20. Do not create backups without recovery procedures.
21. Do not introduce infrastructure unrelated to this scope.
22. Preserve backward compatibility.
23. Preserve working behavior.
24. Validate every changed infrastructure component.
25. Update documentation.
26. Keep infrastructure reproducible.
27. Keep production environments isolated.
28. Keep credentials short-lived whenever possible.
29. Make failures observable.
30. Make recovery operationally practical.

---

# PRODUCTION EXPECTATIONS

The implementation must support:

* Multi-AZ deployment
* Horizontal scaling
* Safe rolling deployments
* Controlled releases
* Automated verification
* Rollback
* Graceful shutdown
* Queue resilience
* Database protection
* Search protection
* Redis protection
* Secure workload identities
* Strong observability
* Fault isolation
* Production security
* Capacity management
* Operational recovery

The infrastructure must be suitable for continuous production operation.

---

# VALIDATION AND COMPLETION

Before declaring this volume complete:

1. Inspect all modified files.
2. Validate Terraform.
3. Validate Helm.
4. Validate Kubernetes manifests.
5. Build all relevant Docker images.
6. Run image security scans.
7. Validate GitHub Actions workflows.
8. Validate deployment configuration.
9. Validate health probes.
10. Validate resource configuration.
11. Validate autoscaling configuration.
12. Validate workload identities.
13. Validate network policies.
14. Validate ingress and TLS configuration.
15. Validate database connectivity.
16. Validate Redis connectivity.
17. Validate search connectivity.
18. Validate queue workers.
19. Validate scheduled jobs.
20. Validate observability.
21. Validate deployment verification.
22. Validate rollback procedures.
23. Validate backup monitoring.
24. Validate recovery procedures.
25. Run relevant automated tests.
26. Verify no secrets are committed.
27. Verify no unsafe public exposure exists.
28. Verify documentation matches implementation.

Fix implementation-breaking problems discovered during validation.

Do not merely report errors that can be safely corrected within scope.

---

# IMPLEMENTATION REPORT

At completion, provide:

## FILES CREATED

List every newly created file.

## FILES MODIFIED

List every modified file.

## DEPLOYMENT ARCHITECTURE

Summarize application, worker, and scheduled-job deployment architecture.

## SCALING

Summarize workload and cluster autoscaling.

## RELEASE ENGINEERING

Summarize CI/CD, artifact promotion, deployment verification, and rollback.

## SECURITY

Summarize runtime, IAM, network, container, and CI/CD security controls.

## OBSERVABILITY

Summarize metrics, logs, traces, dashboards, and alerts.

## RELIABILITY

Summarize graceful shutdown, fault isolation, degradation, queue resilience, and recovery mechanisms.

## BACKUPS AND RECOVERY

Summarize implemented backup monitoring and recovery-testing foundations.

## VALIDATION

List executed validation commands, tests, scans, and deployment checks with results.

## REMAINING ISSUES

Report only genuinely unresolved issues that cannot safely be addressed within this scope.

---

# FINAL DIRECTIVE

Implement this infrastructure volume directly in the repository.

Inspect first.

Understand the existing infrastructure.

Reuse what is correct.

Implement complete application deployment and operational orchestration.

Make services independently deployable and scalable.

Make deployments safe and reversible.

Make infrastructure secure by default.

Protect databases, queues, search, and external dependencies from uncontrolled scaling.

Make failures observable.

Make degraded operation possible.

Make recovery practical.

Validate every relevant infrastructure component.

Update documentation.

Leave the repository in a coherent, production-ready operational state for the scope covered by this volume.
