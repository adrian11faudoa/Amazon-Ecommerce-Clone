# AMAZON ECOMMERCE PLATFORM — INFRASTRUCTURE VOLUME 3 IMPLEMENTATION PROMPT

# ROLE

Act as a complete senior infrastructure, platform, reliability, security, observability, and disaster-recovery engineering organization responsible for hardening a large-scale Amazon-style ecommerce marketplace for sustained production operation.

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

Do not act as a teacher, consultant, or tutorial writer.

Implement the required infrastructure directly in the repository.

The objective is to harden the platform for high availability, disaster recovery, security, observability, large-scale traffic, operational resilience, capacity growth, controlled releases, and failure recovery.

---

# PROJECT

Build and operate a globally scalable Amazon-style ecommerce marketplace supporting:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume catalog traffic
* High-volume search
* High-volume checkout
* Multi-seller orders
* Inventory reservation
* Payments and refunds
* Shipping and fulfillment
* Returns
* Reviews and ratings
* Promotions and coupons
* Notifications
* Seller payouts
* Administrative operations
* Media storage and delivery
* Background processing
* Event-driven workflows
* Analytics
* Auditing

The infrastructure must remain available during normal failures and must provide practical recovery mechanisms for major infrastructure incidents.

---

# PRIMARY USERS

The infrastructure supports:

* Customers
* Sellers
* Administrators
* Support teams
* Operations teams
* Engineering teams
* Security teams
* SRE teams
* Data and analytics teams

Customer-facing reliability and transactional integrity take priority over non-critical workloads.

---

# TECHNOLOGY DIRECTION

Use the infrastructure already established in the repository where compatible.

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

Use managed services when they improve operational reliability.

Do not introduce unnecessary infrastructure.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth.

Before implementing anything:

1. Inspect the complete repository.
2. Inspect all existing Terraform modules.
3. Inspect environment configurations.
4. Inspect EKS/Kubernetes configuration.
5. Inspect Helm charts.
6. Inspect Dockerfiles.
7. Inspect CI/CD workflows.
8. Inspect deployment strategies.
9. Inspect PostgreSQL infrastructure.
10. Inspect Redis infrastructure.
11. Inspect search infrastructure.
12. Inspect S3 and CloudFront configuration.
13. Inspect event and queue infrastructure.
14. Inspect observability configuration.
15. Inspect backup configuration.
16. Inspect disaster-recovery configuration.
17. Inspect security controls.
18. Inspect operational documentation.
19. Identify existing reliability controls.
20. Identify missing hardening.
21. Reuse compatible implementation.

Do not replace functioning infrastructure without a concrete technical reason.

---

# IMPLEMENTATION SCOPE

Implement the production reliability, security, disaster-recovery, capacity, and operational-hardening layer.

Cover:

1. High availability hardening
2. Multi-AZ resilience
3. Multi-region strategy
4. Disaster recovery
5. RPO/RTO implementation
6. Database recovery
7. Search recovery
8. Redis recovery
9. Queue/event recovery
10. Object-storage recovery
11. Kubernetes recovery
12. DNS recovery
13. Secrets recovery
14. Backup validation
15. Restore testing
16. Failover procedures
17. Regional failure strategy
18. Infrastructure drift detection
19. Infrastructure security hardening
20. Runtime security
21. Supply-chain security
22. WAF
23. DDoS protection
24. Network hardening
25. IAM hardening
26. Auditability
27. Capacity planning
28. Load testing infrastructure
29. Performance monitoring
30. SLO/SLI implementation
31. Alerting hardening
32. Incident response foundations
33. Operational runbooks
34. Chaos/resilience testing foundations
35. Cost governance
36. Production readiness validation

---

# HIGH AVAILABILITY

Review every critical infrastructure component for single points of failure.

Critical systems include:

* Kubernetes control plane
* Kubernetes worker capacity
* API services
* Worker services
* PostgreSQL
* Redis
* Search
* Object storage
* CDN
* Load balancers
* Queue infrastructure
* Event infrastructure
* DNS
* Secrets
* Observability

Implement multi-AZ architecture wherever supported.

Ensure critical workloads can continue operating after:

* Pod failure
* Node failure
* Availability-zone failure
* Load-balancer target failure
* Worker failure
* Single dependency failure

---

# MULTI-AZ RESILIENCE

Verify that critical resources span multiple availability zones.

Ensure:

* Kubernetes nodes are distributed
* Critical pods are distributed
* Database replicas are distributed
* Redis nodes are distributed
* Search nodes are distributed
* Load balancers are multi-AZ
* Application workloads do not depend on a single AZ

Use topology spread constraints and anti-affinity where appropriate.

Do not create a configuration where all replicas can accidentally land in one failure domain.

---

# MULTI-REGION STRATEGY

Establish a practical multi-region strategy.

The design must distinguish between:

* Active-active systems
* Active-passive systems
* Regional failover systems
* Reconstructable systems
* Region-independent services

Do not force every service into active-active operation.

Define regional responsibilities for:

* Application workloads
* PostgreSQL
* Redis
* Search
* S3
* CloudFront
* Queues
* Events
* Secrets
* DNS
* Observability

The strategy must prioritize transactional correctness.

---

# DISASTER RECOVERY

Implement a complete disaster-recovery foundation.

Define:

* Recovery Point Objective
* Recovery Time Objective
* Recovery sequence
* Recovery dependencies
* Recovery ownership
* Failover mechanism
* Data recovery procedure
* Validation procedure
* Failback procedure

The recovery process must be executable by an operations team.

Do not provide documentation that depends on undocumented manual steps.

---

# RPO/RTO

Define realistic RPO/RTO targets for major platform components.

At minimum classify:

* Customer identity
* Catalog
* Inventory
* Cart
* Orders
* Payments
* Refunds
* Seller balances
* Payouts
* Reviews
* Notifications
* Search
* Analytics
* Media

Critical financial and transactional data requires stronger recovery guarantees than derived data.

---

# POSTGRESQL DISASTER RECOVERY

Harden PostgreSQL recovery.

Support:

* Automated backups
* Point-in-time recovery
* Multi-AZ high availability
* Cross-region backup or replication strategy where appropriate
* Backup retention
* Encryption
* Restore validation
* Recovery automation where practical

Document and automate:

* Restore
* Point-in-time recovery
* Failover
* Post-recovery verification
* Application reconnection
* DNS/endpoint transition
* Recovery testing

Do not assume a successful snapshot automatically means successful recovery.

---

# DATABASE RESTORE TESTING

Implement repeatable restore testing.

A restore test must verify:

* Database can be restored
* Application can connect
* Required schema exists
* Required migrations are compatible
* Critical queries work
* Data integrity checks succeed
* Recovery timestamps are correct
* Applications can resume operation

Record restore-test results.

---

# SEARCH DISASTER RECOVERY

Search indexes are derived data.

Implement a recovery strategy capable of:

1. Recreating search infrastructure.
2. Restoring required index configuration.
3. Rebuilding indexes from authoritative data.
4. Processing indexing jobs safely.
5. Monitoring rebuild progress.
6. Detecting incomplete indexing.
7. Validating search correctness.

Do not treat search snapshots as the only recovery mechanism.

---

# REDIS RECOVERY

Redis is not authoritative transactional storage.

Implement recovery appropriate for:

* Cache
* BullMQ
* Rate limiting
* Ephemeral coordination
* Sessions where applicable

Document which Redis data can be discarded and which workloads require controlled recovery.

Queue recovery must prevent loss of critical business processing where the architecture requires durable event persistence elsewhere.

---

# QUEUE AND EVENT RECOVERY

Implement recovery mechanisms for:

* BullMQ
* Kafka or equivalent event infrastructure
* Dead-letter queues
* Failed jobs
* Consumer offsets
* Event replay
* Duplicate processing

Critical consumers must be idempotent.

Recovery procedures must preserve:

* Orders
* Payments
* Inventory
* Seller settlement
* Notifications where appropriate

Avoid creating duplicate financial transactions during replay.

---

# OBJECT STORAGE RECOVERY

Harden S3 recovery.

Support:

* Versioning where appropriate
* Lifecycle policies
* Encryption
* Cross-region replication where required
* Controlled deletion
* Recovery procedures

Identify which buckets contain:

* Critical customer content
* Seller content
* Product media
* Catalog imports
* Export data
* Generated assets
* Operational data

---

# CLOUDFRONT AND DNS RECOVERY

Implement recovery for edge infrastructure.

Support:

* DNS failover where appropriate
* Regional origin failover where justified
* Health checks
* TLS certificate continuity
* CDN configuration recovery
* WAF configuration recovery

Document propagation and failover characteristics.

Do not assume DNS changes are instantaneous.

---

# KUBERNETES RECOVERY

Infrastructure must be reproducible.

A lost Kubernetes cluster should be reconstructable from:

* Terraform
* Helm
* Version-controlled configuration
* Container images
* Secrets-management references
* Required persistent storage definitions

Document recovery order.

Do not depend on manually created Kubernetes resources that are absent from source control.

---

# SECRETS RECOVERY

Secrets must be recoverable without exposing them to source control.

Document:

* Secret ownership
* Backup strategy where applicable
* Rotation strategy
* Recovery procedures
* Access-control requirements
* Break-glass access

Do not store raw secrets in Terraform state unless unavoidable and properly protected.

---

# INFRASTRUCTURE DRIFT

Implement infrastructure drift detection.

Detect:

* Manual AWS changes
* Terraform drift
* Kubernetes drift
* Unauthorized configuration changes
* Security-group changes
* IAM changes
* Public exposure
* Configuration divergence

Integrate drift detection into operational workflows.

Do not automatically destroy manually created resources merely because drift exists.

Review and reconcile safely.

---

# SECURITY HARDENING

Implement defense in depth.

Harden:

* AWS accounts
* IAM
* EKS
* Kubernetes
* Containers
* Networks
* CI/CD
* Terraform
* Secrets
* S3
* CloudFront
* PostgreSQL
* Redis
* Search
* Monitoring

Apply least privilege everywhere.

---

# AWS SECURITY BASELINE

Where appropriate, configure:

* CloudTrail
* GuardDuty
* Security Hub
* AWS Config
* IAM Access Analyzer
* Centralized security findings
* Audit logging
* Organization-level controls

Use repository-compatible architecture rather than blindly enabling every service.

---

# IAM HARDENING

Review IAM for:

* Excessive permissions
* Wildcard resources
* Wildcard actions
* Long-lived credentials
* Unnecessary administrative access
* Cross-account trust
* CI/CD permissions
* Kubernetes workload permissions

Reduce permissions to the minimum required.

---

# KUBERNETES SECURITY HARDENING

Harden Kubernetes against:

* Privilege escalation
* Host access
* Container escape
* Unauthorized service access
* Secret exposure
* Excessive service-account privileges
* Network lateral movement

Use:

* Pod security controls
* Security contexts
* Network policies
* RBAC
* Admission controls where justified
* Image policies
* Secure namespaces

---

# SUPPLY-CHAIN SECURITY

Secure the software delivery chain.

Implement where practical:

* Dependency scanning
* Container image scanning
* Secret scanning
* SBOM generation
* Image signing
* Artifact provenance
* Immutable artifacts
* Restricted CI permissions

Production should only consume trusted artifacts.

---

# WAF AND EDGE PROTECTION

Implement AWS WAF where justified.

Protect public endpoints against:

* Common web attacks
* Injection attempts
* Malicious automation
* Excessive request rates
* Known malicious IPs
* Suspicious traffic

Rules must be carefully tuned to avoid blocking legitimate ecommerce traffic.

---

# DDOS PROTECTION

Use AWS Shield and related AWS protections where appropriate.

Ensure protection strategy covers:

* CloudFront
* Public load balancers
* Public APIs
* DNS

Document escalation and incident procedures.

---

# NETWORK HARDENING

Review:

* Security groups
* Network ACLs where appropriate
* Route tables
* VPC endpoints
* Private subnets
* Public subnets
* Egress
* Administrative access

Minimize unnecessary outbound and inbound connectivity.

---

# DATA PROTECTION

Ensure encryption:

* At rest
* In transit
* Between application and database
* Between application and Redis
* Between application and search
* Between workloads and AWS services
* For object storage
* For backups

Use managed encryption keys or KMS appropriately.

---

# AUDITABILITY

Infrastructure changes must be attributable.

Track:

* Who changed infrastructure
* What changed
* When it changed
* Which environment changed
* Which deployment caused the change

Integrate:

* CloudTrail
* GitHub Actions logs
* Terraform history
* Kubernetes audit mechanisms where appropriate

---

# SLO AND SLI IMPLEMENTATION

Implement measurable service indicators.

For critical services include:

* Availability
* Latency
* Error rate
* Throughput
* Queue processing latency
* Deployment success
* Database availability
* Search availability

Connect SLOs to operational dashboards and alerting.

Avoid paging on every SLO fluctuation.

Use error budgets where operationally useful.

---

# ALERTING HARDENING

Review existing alerts for:

* Accuracy
* Severity
* Actionability
* Duplication
* Missing coverage
* False positives

Prioritize alerts around customer and business impact.

Critical alerts should include sufficient context to begin investigation.

---

# INCIDENT RESPONSE FOUNDATION

Implement infrastructure support for incident response.

Provide:

* Incident dashboards
* Centralized logs
* Trace correlation
* Deployment history
* Infrastructure change history
* Service ownership metadata
* Runbooks
* Escalation paths
* Recovery procedures

Document operational actions for common incidents.

---

# INCIDENT RUNBOOKS

Create runbooks for scenarios including:

* API outage
* Kubernetes node failure
* Availability-zone failure
* PostgreSQL outage
* Redis outage
* Search outage
* Queue backlog
* Payment-provider outage
* Deployment failure
* Bad release
* Secret compromise
* Certificate issue
* S3 access failure
* CloudFront outage
* Regional outage

Runbooks must contain executable operational steps.

---

# CHAOS AND RESILIENCE TESTING

Establish controlled resilience testing.

Test failure scenarios such as:

* Pod termination
* Node termination
* Worker failure
* Queue consumer failure
* Database failover
* Redis failover
* Search node failure
* Availability-zone impairment
* Dependency timeout
* Network interruption

Tests must be controlled and must not endanger production data.

Prefer dedicated resilience environments for destructive testing.

---

# LOAD TESTING INFRASTRUCTURE

Establish infrastructure for realistic load tests.

Support:

* API load
* Search load
* Checkout load
* Authentication load
* Worker load
* Queue throughput
* Media delivery
* Concurrent users

Load testing must measure downstream systems too.

---

# PERFORMANCE BASELINES

Create measurable infrastructure baselines for:

* API latency
* Database latency
* Redis latency
* Search latency
* Queue throughput
* Worker processing time
* Deployment time
* Autoscaling response
* Recovery time

Use observed measurements rather than unsupported assumptions.

---

# CAPACITY MANAGEMENT

Establish capacity thresholds for:

* Kubernetes nodes
* PostgreSQL
* Redis
* OpenSearch
* S3
* CloudFront
* Queue infrastructure
* Event infrastructure
* Network bandwidth

Define escalation thresholds.

Capacity alerts should occur before exhaustion.

---

# COST GOVERNANCE

Implement operational cost visibility.

Track major infrastructure cost drivers:

* EKS
* EC2
* RDS/Aurora
* ElastiCache
* OpenSearch
* S3
* CloudFront
* NAT
* Load balancers
* Observability
* Data transfer

Use tagging and environment allocation.

Do not reduce reliability-critical capacity merely to reduce cost.

---

# RESOURCE LIFECYCLE

Implement lifecycle policies for:

* Container images
* S3 objects
* Logs
* Metrics
* Traces
* Snapshots
* Backups
* Temporary files
* Catalog imports
* Export artifacts

Retention must satisfy operational and business requirements.

---

# PRODUCTION SECURITY VALIDATION

Perform infrastructure security validation.

Check for:

* Public databases
* Public Redis
* Public search
* Public S3 buckets
* Excessive IAM
* Long-lived CI credentials
* Missing encryption
* Missing TLS
* Privileged containers
* Host networking
* Host mounts
* Missing network policies
* Unrestricted ingress
* Unrestricted egress
* Exposed administrative endpoints
* Secrets in repository
* Secrets in images
* Unsafe Terraform configuration

Fix findings that are within scope.

---

# INFRASTRUCTURE RECOVERY AUTOMATION

Automate recovery where safe.

Prefer automation for:

* Infrastructure recreation
* Database restore
* Search reconstruction
* Kubernetes recreation
* DNS configuration
* Environment bootstrap
* Secret references
* Deployment restoration

Human approval may remain necessary for destructive or financially sensitive actions.

---

# FAILOVER VALIDATION

Do not merely document failover.

Validate that failover procedures actually work in controlled environments.

Verify:

* Traffic transition
* Database availability
* Application configuration
* Secrets
* Queue processing
* Event consumption
* Search availability
* Media availability
* Monitoring
* DNS behavior

---

# FAILBACK

Implement safe failback procedures.

After regional or infrastructure recovery:

1. Validate recovered environment.
2. Verify data consistency.
3. Verify application health.
4. Verify queues and events.
5. Verify financial reconciliation.
6. Restore traffic gradually.
7. Monitor.
8. Confirm stability.

Do not immediately switch all traffic back without verification.

---

# DATA CONSISTENCY DURING RECOVERY

Financial and transactional systems require special attention.

Verify recovery procedures do not create:

* Duplicate orders
* Duplicate payments
* Duplicate refunds
* Duplicate inventory reservations
* Duplicate seller payouts
* Lost seller balances

Use idempotency and reconciliation mechanisms where necessary.

---

# OPERATIONAL OWNERSHIP

Infrastructure documentation must identify ownership for:

* Cloud infrastructure
* Kubernetes
* Databases
* Search
* Redis
* CI/CD
* Observability
* Security
* Disaster recovery

Avoid systems where nobody is clearly responsible for operation.

---

# IMPLEMENTATION BOUNDARIES

This volume focuses on production hardening, resilience, security, recovery, and operational maturity.

Do not redesign application business logic.

Do not redesign customer or seller interfaces.

Do not replace valid backend domain architecture.

Do not introduce infrastructure that has no operational justification.

Do not create theoretical disaster recovery without executable procedures.

Do not create fake resilience tests.

Do not create fake security controls.

---

# ABSOLUTE IMPLEMENTATION RULES

1. Inspect the repository first.
2. Treat repository state as authoritative.
3. Preserve compatible infrastructure.
4. Implement complete infrastructure.
5. Do not use pseudo-code.
6. Do not use placeholders.
7. Do not leave TODO/FIXME implementation gaps.
8. Do not hardcode credentials.
9. Do not commit secrets.
10. Do not expose private services publicly.
11. Do not weaken existing security controls without justification.
12. Do not create unsupported availability claims.
13. Do not create unsupported RPO/RTO claims.
14. Do not claim recovery capability that has not been implemented or tested.
15. Do not create destructive recovery automation without safeguards.
16. Do not ignore data consistency.
17. Do not ignore financial reconciliation during recovery.
18. Do not create noisy alerts.
19. Do not create meaningless dashboards.
20. Do not create resilience tests that can damage production.
21. Do not introduce unnecessary infrastructure.
22. Maintain backward compatibility.
23. Preserve working deployments.
24. Validate all changed infrastructure.
25. Update documentation.
26. Make infrastructure reproducible.
27. Make recovery practical.
28. Make security enforceable.
29. Make failures observable.
30. Make production operation sustainable.

---

# PRODUCTION EXPECTATIONS

The completed infrastructure must support:

* High availability
* Multi-AZ resilience
* Regional recovery
* Disaster recovery
* Secure operations
* Controlled deployments
* Infrastructure reproducibility
* Backup verification
* Restore testing
* Capacity planning
* Performance validation
* Incident response
* Security monitoring
* Supply-chain security
* Fault isolation
* Graceful degradation
* Operational observability

The infrastructure must be suitable for a serious globally operated ecommerce platform.

---

# VALIDATION AND COMPLETION

Before declaring the implementation complete:

1. Inspect all modified files.
2. Validate Terraform formatting.
3. Validate Terraform configuration.
4. Validate Terraform plans.
5. Validate Helm.
6. Validate Kubernetes manifests.
7. Validate Docker configuration.
8. Validate CI/CD workflows.
9. Run infrastructure security scans.
10. Verify IAM policies.
11. Verify network exposure.
12. Verify encryption.
13. Verify backup configuration.
14. Verify restore procedures.
15. Verify database recovery.
16. Verify search recovery.
17. Verify Redis recovery.
18. Verify queue/event recovery.
19. Verify object-storage recovery.
20. Verify Kubernetes recovery.
21. Verify monitoring.
22. Verify alerting.
23. Verify SLO/SLI dashboards.
24. Verify failover procedures.
25. Verify runbooks.
26. Verify resilience testing foundations.
27. Verify capacity monitoring.
28. Verify cost governance.
29. Verify no secrets are committed.
30. Run all relevant automated tests.

Fix issues that can safely be resolved within this scope.

Do not declare completion while known infrastructure-breaking issues remain.

---

# IMPLEMENTATION REPORT

At completion, provide:

## FILES CREATED

List every newly created file.

## FILES MODIFIED

List every modified file.

## HIGH AVAILABILITY

Summarize HA and multi-AZ improvements.

## DISASTER RECOVERY

Summarize RPO/RTO strategy, backups, restore testing, failover, and recovery automation.

## SECURITY

Summarize AWS, Kubernetes, network, IAM, supply-chain, WAF, and secret-management hardening.

## OBSERVABILITY

Summarize dashboards, SLOs, SLIs, alerts, logs, metrics, and traces.

## RESILIENCE

Summarize failure isolation, chaos/resilience testing, graceful degradation, and failover validation.

## CAPACITY AND PERFORMANCE

Summarize load-testing infrastructure, capacity monitoring, scaling thresholds, and performance baselines.

## INCIDENT RESPONSE

Summarize runbooks, operational procedures, and incident-response tooling.

## VALIDATION

List all executed tests, scans, recovery validations, infrastructure checks, and their results.

## REMAINING ISSUES

Report only genuinely unresolved issues that cannot safely be addressed within this scope.

---

# FINAL DIRECTIVE

Implement this infrastructure volume directly in the repository.

Inspect first.

Understand the existing infrastructure.

Harden what already works.

Do not replace working systems without justification.

Make high availability real.

Make disaster recovery executable.

Make backups recoverable.

Make security enforceable.

Make infrastructure observable.

Make capacity measurable.

Make incidents diagnosable.

Make failure recovery practical.

Protect transactional and financial correctness during outages.

Validate recovery rather than merely documenting it.

Keep all infrastructure reproducible and version-controlled.

Update documentation to reflect the actual implementation.

Leave the repository in a hardened, resilient, secure, observable, and production-ready state for the scope covered by this volume.
