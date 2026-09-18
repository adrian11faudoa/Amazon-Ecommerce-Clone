# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 6

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the production disaster-recovery, multi-region resilience, capacity-management, performance-engineering, business-continuity, and infrastructure hardening platform for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Site Reliability Engineer
* Disaster-Recovery Engineer
* Reliability Engineer
* Performance Engineer
* Capacity Planning Engineer
* Security Engineer
* Cloud FinOps Engineer
* Incident-Response Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the production resilience layer that allows the marketplace to survive infrastructure failures, regional failures, capacity exhaustion, deployment incidents, dependency failures, and other major operational events while preserving clearly defined recovery objectives.

This is an incremental implementation task.

Do not implement infrastructure work outside the scope defined in this prompt.

---

# PROJECT

Build the production resilience and disaster-recovery infrastructure for an original Amazon-style ecommerce marketplace serving:

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

* existing infrastructure
* actual application workloads
* deployment topology
* data services
* backup configuration
* environment structure
* application state
* runtime assumptions
* observability
* CI/CD
* operational scripts
* recovery tooling

Do not invent capabilities that cannot be supported by the existing architecture.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction:

### Applications

* Next.js 15
* React 19
* TypeScript
* React Native
* Expo
* NestJS

### Data

* PostgreSQL
* Prisma
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

### Delivery

* GitHub Actions or repository-compatible CI/CD

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

---

# PRIMARY OBJECTIVE

Implement the resilience and disaster-recovery platform required to support:

* defined RPO/RTO targets
* regional recovery
* infrastructure recovery
* database recovery
* object-storage recovery
* search recovery
* application redeployment
* DNS/traffic recovery
* backup verification
* capacity recovery
* incident response
* infrastructure failure testing
* controlled emergency operations

The infrastructure must make recovery repeatable.

A recovery plan that depends on undocumented manual actions is not sufficient.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* primary region
* DR region configuration
* environment structure
* current backup systems
* database recovery configuration
* object-storage replication
* search snapshots
* Terraform state
* Kubernetes cluster configuration
* container registry
* DNS
* certificates
* WAF
* CI/CD
* secrets management
* monitoring
* current autoscaling
* current capacity limits
* current recovery scripts
* current runbooks
* existing disaster-recovery documentation

Do not create a second disaster-recovery implementation.

Extend existing resilience infrastructure where possible.

Do not claim a recovery path is operational unless it has actually been implemented and validated.

---

# CURRENT SCOPE

Implement the production disaster-recovery, business-continuity, capacity, performance, and resilience-hardening layer.

---

# 1. Recovery Objectives

Establish a version-controlled configuration model for:

* Recovery Point Objective
* Recovery Time Objective
* criticality tier
* recovery priority
* dependency priority

Classify major systems such as:

* customer authentication
* catalog
* search
* cart
* checkout
* payment
* order management
* inventory
* notifications
* seller operations
* media
* analytics

Do not invent arbitrary business-criticality rankings without documenting the basis.

Make targets configurable where actual business requirements are unavailable.

---

# 2. Recovery Priority Model

Define recovery tiers.

For example:

### Tier 0

Infrastructure required to begin recovery.

### Tier 1

Core customer and transaction systems.

### Tier 2

Operational and seller systems.

### Tier 3

Non-critical analytical and auxiliary systems.

Use the repository's actual architecture.

Do not allow low-priority workloads to block recovery of critical transaction paths.

---

# 3. Disaster-Recovery Architecture

Implement the DR architecture using the AWS environment strategy established by the repository.

The DR environment must be capable of restoring or recreating:

* application infrastructure
* Kubernetes runtime
* required IAM roles
* secrets access
* PostgreSQL
* Redis where required
* search
* S3 data
* ingress
* DNS
* certificates
* WAF
* observability dependencies

Do not duplicate every production resource blindly.

DR should be recovery-oriented and cost-aware while remaining operationally viable.

---

# 4. DR Infrastructure as Code

Ensure DR infrastructure is fully represented in IaC.

Do not rely on:

* manually created clusters
* manually created databases
* undocumented console settings
* operator-specific machine configuration

The disaster-recovery environment must be reproducible from version-controlled infrastructure.

---

# 5. DR Region Isolation

Ensure the DR region has:

* separate regional resources
* isolated secrets where required
* separate cluster/control plane
* separate stateful services where required
* controlled IAM
* independent failure boundaries

Do not create cross-region dependencies that prevent recovery when the primary region is unavailable.

---

# 6. Global and Regional Resources

Classify infrastructure as:

### Global

Examples may include:

* some IAM components
* DNS configuration
* global certificates/resources where applicable

### Regional

Examples include:

* EKS
* RDS/Aurora
* Redis
* OpenSearch
* regional S3 replication targets
* regional load balancers

Document recovery implications for each category.

---

# 7. Database Disaster Recovery

Implement the selected PostgreSQL DR architecture.

Support an appropriate mechanism such as:

* cross-region replica
* automated backup replication
* global database
* snapshot restoration

The actual mechanism must match the selected AWS PostgreSQL service.

Recovery must preserve:

* encryption
* credentials
* schema
* migration compatibility
* application connectivity

---

# 8. Database Promotion

Where a cross-region database replica is used, create controlled promotion tooling.

Promotion must:

* require authorization
* produce an audit event
* validate replica health
* prevent accidental promotion
* update application connectivity appropriately
* preserve security controls

Do not make promotion an unaudited shell command.

---

# 9. Database RPO Validation

Provide a way to determine the effective database recovery point.

Track:

* last successful backup
* replica lag
* replication status
* restore-point availability

Do not claim the configured RPO equals actual RPO without measurement.

---

# 10. Database Restore Automation

Implement reproducible restore workflows.

A restore workflow must support:

1. selecting recovery source
2. creating recovery database
3. applying appropriate security configuration
4. validating connectivity
5. validating schema compatibility
6. validating application access
7. recording recovery metadata

Do not overwrite primary production automatically during ordinary recovery testing.

---

# 11. Search Disaster Recovery

Search is a derived system but may be expensive to reconstruct.

Implement recovery support using:

* snapshots
* replicated data where appropriate
* rebuild tooling
* infrastructure recreation
* index recreation
* alias restoration

Recovery must be executable without manually rebuilding dozens of resources.

---

# 12. Search Rebuild Strategy

Document the authoritative data source for search recovery.

The recovery architecture must be able to:

* recreate indexes
* reprocess catalog data
* rebuild aliases
* validate document counts
* validate representative queries

Do not treat search snapshots as the only possible recovery path if the application can rebuild from PostgreSQL.

---

# 13. Redis Disaster Recovery

Determine Redis recovery requirements by actual usage.

Differentiate:

* disposable cache
* sessions
* distributed locks
* queue state
* idempotency state
* temporary coordination

Where Redis data is reconstructable, prefer rebuilding it rather than creating unnecessary cross-region complexity.

Where data loss would materially affect business recovery, implement the appropriate recovery mechanism.

---

# 14. BullMQ Recovery

Define queue recovery semantics.

For each critical queue determine:

* whether jobs are replayable
* whether jobs are idempotent
* acceptable job loss
* recovery source
* duplicate handling
* delayed-job behavior
* failed-job handling

Do not blindly replicate transient queue state between regions without understanding its semantics.

---

# 15. S3 Disaster Recovery

Implement the appropriate regional recovery model for durable media and operational objects.

Where required configure:

* cross-region replication
* replication roles
* KMS permissions
* replication monitoring
* recovery bucket policies
* lifecycle consistency

Recovery must preserve object ownership and security.

---

# 16. S3 Replication Validation

Provide operational validation for replication.

Verify:

* replication configuration exists
* replication destination exists
* permissions are correct
* encryption compatibility exists
* replicated objects arrive successfully
* replication failures become visible

Do not mark S3 replication healthy merely because Terraform applied successfully.

---

# 17. Secrets Disaster Recovery

Production recovery must not depend on secrets stored only in the failed region.

Ensure the DR environment can obtain required:

* application secrets
* database credentials
* provider credentials
* webhook secrets
* encryption references
* signing configuration

Do not copy plaintext secret values into DR infrastructure.

---

# 18. KMS Recovery

Ensure DR workloads can access the encryption keys required for:

* database restoration
* S3 replication
* backups
* secrets
* application data

Where region-specific KMS keys are required, define them as IaC-managed resources.

Document key dependencies.

---

# 19. DNS Failover

Implement controlled DNS recovery.

Support the ability to redirect traffic from primary to DR where the service architecture supports it.

Use:

* Route 53
* health checks
* failover records
* weighted/latency routing where appropriate

Do not enable automatic global failover without validating application readiness in the DR environment.

---

# 20. DNS Recovery Safety

DNS failover must not route traffic to an unhealthy DR environment merely because the primary region is unavailable.

The recovery process must verify:

* API health
* database health
* application readiness
* critical dependency availability
* certificate validity

before declaring DR ready for customer traffic.

---

# 21. DR Ingress

Ensure the DR region has equivalent public ingress capability.

Support:

* TLS
* WAF
* load balancing
* application routing
* health checks

Do not assume the primary region's load balancer can serve as the permanent DR ingress.

---

# 22. DR Kubernetes Platform

Implement the DR EKS/Kubernetes environment with enough capability to recover critical services.

Support:

* node capacity
* workload identity
* ingress
* namespaces
* RBAC
* NetworkPolicies
* autoscaling
* observability
* secret access

DR capacity may be smaller than production when supported by the defined RTO and scaling plan.

Do not make the DR cluster so undersized that it cannot recover critical workloads.

---

# 23. DR Artifact Availability

Ensure the DR environment can obtain the exact application artifacts required for recovery.

Artifacts must include:

* container images
* Helm charts
* configuration
* infrastructure source
* migrations
* release metadata

Do not depend on ephemeral CI workspaces.

---

# 24. DR Deployment Workflow

Provide a protected workflow for DR deployment.

It must support:

* infrastructure provisioning
* stateful-service recovery
* workload deployment
* configuration
* validation
* DNS readiness
* recovery reporting

Production traffic must not be switched until the required health checks pass.

---

# 25. DR Environment Lifecycle

Where the project chooses a warm, pilot-light, or restore-on-demand DR strategy, encode that strategy in the infrastructure.

Clearly distinguish:

* always-running resources
* periodically refreshed resources
* created during recovery

Do not present an undeployed DR design as a functioning environment.

---

# 26. Recovery Runbook Automation

Automate repetitive recovery steps where safe.

Examples:

* infrastructure provisioning
* database restoration
* secret preparation
* application deployment
* smoke tests
* DNS readiness
* recovery validation

Manual approvals may remain around irreversible or customer-impacting decisions.

---

# 27. Recovery Checkpoints

A recovery process must have explicit checkpoints.

Examples:

### Infrastructure Ready

Required cloud resources exist.

### Data Ready

Required database/search/object data is recoverable.

### Application Ready

Critical workloads are healthy.

### Traffic Ready

Ingress and DNS are ready.

### Customer Ready

Critical user flows pass validation.

Do not move to the next checkpoint if required health conditions fail.

---

# 28. Recovery Validation Tests

Create automated smoke tests for the recovery environment.

At minimum validate applicable:

* authentication
* product retrieval
* search
* cart
* checkout
* payment integration reachability
* order retrieval
* seller operations
* media retrieval

Do not execute real customer payments during routine DR testing.

Use safe provider test mechanisms where available.

---

# 29. Game-Day / Disaster-Recovery Testing

Create infrastructure and procedures for controlled DR exercises.

Support scenarios such as:

* complete primary-region outage
* database failure
* Kubernetes control-plane failure
* application deployment failure
* object-storage replication failure
* search failure
* Redis failure

Do not destroy production systems as part of ordinary validation.

Use isolated or controlled exercises.

---

# 30. Failback

Implement a controlled return-to-primary strategy.

Failback must address:

* data divergence
* database synchronization
* object replication
* search consistency
* application deployment
* DNS
* queued work
* in-flight operations

Do not make failback an automatic DNS flip.

---

# 31. Data Divergence Management

During regional recovery, define how to handle writes occurring in DR.

Where the architecture is not active-active:

* explicitly identify the write authority
* prevent accidental dual-write
* define synchronization before failback
* preserve transaction consistency

Do not assume two independently writable databases can be merged safely.

---

# 32. Incident Modes

Define operational modes such as:

* normal
* degraded
* recovery
* DR active
* failback

Where appropriate expose the current operational mode to deployment and runbook tooling.

Do not hardcode emergency behavior into application binaries.

---

# 33. Read-Only Recovery Mode

Where business continuity permits, prepare a controlled read-only operating mode for partial failures.

Potentially useful for:

* catalog browsing
* search
* account viewing
* order history

Do not claim the marketplace supports read-only checkout unless the application actually implements that behavior.

---

# 34. External Dependency Failure

Define recovery behavior for failures of:

* payment provider
* shipping provider
* email provider
* SMS provider
* push provider
* external tax/service providers
* search provider where external

Infrastructure should make dependency health visible.

Do not bypass external security controls merely to make the application appear healthy.

---

# 35. Capacity Planning

Implement capacity models for major infrastructure systems.

Track:

* CPU
* memory
* storage
* network
* database connections
* Redis memory
* search capacity
* Kubernetes pods
* queue throughput

Use actual infrastructure metrics where available.

---

# 36. Capacity Thresholds

Create configurable thresholds for:

* warning
* high utilization
* saturation
* emergency capacity

Avoid paging on ordinary brief peaks.

Use sustained conditions.

---

# 37. Load Testing Infrastructure

Provide a controlled load-testing environment or configuration.

Support:

* API load generation
* checkout load
* search load
* queue workload
* media-related load where practical

Do not run high-volume load tests against production without an explicit controlled exercise.

---

# 38. Performance Baselines

Create a mechanism to record performance baselines for critical paths.

Track, where measurable:

* p50
* p95
* p99
* throughput
* error rate
* resource consumption

Critical paths may include:

* login
* catalog retrieval
* search
* cart
* checkout
* order retrieval

Do not invent baseline numbers.

---

# 39. Autoscaling Validation

Validate configured autoscaling behavior.

Test or simulate:

* scale-out
* scale-in
* worker scaling
* queue-driven scaling where implemented
* cluster capacity expansion

Do not treat configured HPA values as proof that scaling works.

---

# 40. Cost and Capacity Controls

Create cost-aware infrastructure controls.

Support:

* environment-specific sizing
* maximum node counts
* storage alerts
* backup retention
* log/trace retention
* non-production scaling controls

Do not sacrifice production availability to minimize cost.

---

# 41. Infrastructure Quotas

Identify important AWS and Kubernetes quotas affecting the platform.

Document or monitor limits for:

* EC2 capacity
* EBS
* load balancers
* IP addresses
* NAT gateways
* RDS connections
* Redis capacity
* OpenSearch
* S3 request patterns where relevant
* Kubernetes pods/nodes

Create capacity-alert hooks where quota exhaustion could cause incidents.

---

# 42. Rate-Limit Infrastructure Protection

Infrastructure must preserve application rate limiting during high-load events.

Ensure:

* WAF/rate-limit layers
* ingress limits where appropriate
* application limits
* provider limits
* queue backpressure

Do not rely on unlimited downstream capacity.

---

# 43. Backpressure

Validate infrastructure support for backpressure.

Systems that may require it include:

* checkout
* payment
* notifications
* search indexing
* media processing
* report generation

Do not simply increase concurrency when downstream systems are saturated.

---

# 44. Failure Isolation

Implement or validate isolation between:

* customer-facing APIs
* background workers
* administrative jobs
* search indexing
* reports
* notifications
* media processing

A bulk background workload must not be able to consume the entire application capacity.

---

# 45. Noisy-Neighbor Controls

Use:

* resource quotas
* resource requests/limits
* namespaces
* priority classes where justified
* queue-specific workers
* autoscaling bounds

Prevent one subsystem from exhausting cluster resources.

---

# 46. Emergency Scaling

Create controlled emergency scaling procedures.

These procedures must specify:

* who can execute them
* maximum safe scale
* monitoring requirements
* rollback/scale-down procedure
* cost implications

Do not require engineers to edit production manifests manually during incidents.

---

# 47. Infrastructure Runbooks

Create detailed runbooks for:

* regional outage
* database failover
* database restore
* Redis failure
* search recovery
* S3 replication failure
* Kubernetes capacity exhaustion
* certificate failure
* DNS failure
* bad deployment
* infrastructure drift
* high traffic event

Runbooks must match implemented infrastructure.

---

# 48. Business-Continuity Documentation

Document:

* recovery objectives
* recovery priorities
* dependencies
* recovery workflow
* decision points
* failover criteria
* failback criteria
* data-consistency considerations
* validation checks

Do not document capabilities that are not implemented.

---

# 49. Security During Recovery

Recovery processes must preserve:

* IAM
* secrets
* encryption
* network isolation
* audit logging
* tenant isolation
* payment security
* administrative access controls

Do not weaken security during a disaster unless an explicitly documented emergency procedure requires it.

Any emergency exception must be auditable and temporary.

---

# 50. Recovery Access Controls

Restrict disaster-recovery actions.

Separate roles for:

* recovery observation
* recovery execution
* DNS failover
* database promotion
* infrastructure provisioning

Do not give a single generic emergency role unlimited irreversible powers unless technically unavoidable and explicitly justified.

---

# 51. Recovery Audit Trail

Every major recovery action must be auditable.

Capture:

* operator/workflow identity
* action
* environment
* timestamp
* resource
* result
* correlation identifier

Do not log secret values.

---

# 52. Recovery Notifications

Provide controlled notifications for:

* DR activation
* database promotion
* DNS failover
* recovery completion
* failback
* failed recovery

Use configured notification providers rather than hardcoded recipients.

---

# 53. Recovery Cost Controls

DR infrastructure must have an explicit cost model.

Document which resources are:

* always running
* scaled down
* restored on demand
* replicated continuously

Do not accidentally create a second full production environment without an intentional business reason.

---

# 54. Multi-Region Security

Ensure regional resources follow equivalent security standards.

Do not make the DR region weaker than production.

The DR environment must preserve:

* encryption
* private networking
* IAM
* WAF
* logging
* monitoring
* access controls

---

# 55. Out of Scope

Do not implement:

* application business features
* database schema redesign
* multi-master database architecture
* unsupported active-active behavior
* fake disaster tests
* fake successful failover
* arbitrary global routing
* manual production resources outside IaC
* full analytics/data warehouse
* marketing analytics
* frontend feature development
* mobile feature development
* payment logic redesign

Do not claim a lower RTO/RPO than the architecture can actually support.

---

# 56. Required Deliverables

Implement the actual repository changes required for this resilience layer, including where applicable:

* DR IaC
* recovery-region infrastructure
* database recovery configuration
* search recovery configuration
* S3 replication
* secret recovery
* KMS recovery
* DNS failover configuration
* DR deployment workflows
* recovery scripts
* smoke tests
* failback tooling
* capacity tooling
* load-test configuration
* performance baselines
* quota monitoring
* emergency-scaling tooling
* disaster-recovery runbooks
* business-continuity documentation
* recovery audit/notification hooks

Every created file must have a concrete purpose.

---

# 57. Implementation Quality Rules

Do not produce:

* pseudo-code
* placeholders
* TODO markers
* FIXME markers
* fake failover logic
* fake recovery success
* hardcoded emergency credentials
* global unrestricted emergency roles
* undocumented destructive actions
* unsupported active-active architecture
* manual-only recovery procedures when automation is practical
* recovery scripts that cannot be validated
* duplicate DR architectures

All recovery automation must be internally coherent and compatible with the existing infrastructure.

---

# 58. Repository-First Incremental Implementation

Before implementation:

1. inspect current production infrastructure
2. inspect existing DR resources
3. inspect backup and replication configuration
4. inspect DNS
5. inspect deployment workflows
6. inspect observability
7. inspect current capacity controls
8. inspect recovery documentation
9. identify actual gaps
10. implement only the missing resilience capabilities

Do not rewrite working infrastructure without evidence.

---

# 59. Testing

Run every applicable validation.

At minimum validate:

### IaC

* formatting
* syntax
* validation
* security scanning
* dependency resolution

### Recovery configuration

Verify:

* DR resources
* backup references
* replication
* DNS
* certificates
* secrets access
* KMS access

### Kubernetes

Validate:

* DR manifests
* workloads
* ingress
* service accounts
* autoscaling
* capacity

### Recovery workflows

Execute safe non-destructive validation where possible.

For actions that cannot be safely executed in the current environment, perform static validation and clearly report that live testing was not executed.

### Performance

Validate load-test configuration and baseline collection.

### Security

Run secret, IAM, network, and IaC security checks.

Do not claim a regional failover succeeded unless the environment actually performed it.

---

# 60. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Disaster Recovery

* RPO/RTO configuration exists
* recovery priorities are defined
* DR infrastructure is represented in IaC
* critical application infrastructure can be recreated
* database recovery exists
* search recovery exists
* S3 recovery exists
* secrets recovery exists
* KMS recovery exists
* DNS recovery exists
* DR deployment exists
* recovery validation exists
* failback strategy exists

### Reliability

* critical failure scenarios are documented
* capacity controls exist
* quota awareness exists
* autoscaling behavior can be validated
* noisy-neighbor controls exist
* emergency scaling procedure exists

### Performance

* load-testing capability exists
* performance baselines can be recorded
* saturation metrics exist
* critical path performance can be measured

### Security

* DR preserves production security
* recovery roles are controlled
* recovery actions are audited
* secrets are not exposed
* encryption remains active

### Operations

* recovery runbooks exist
* business-continuity documentation exists
* notifications exist
* audit trail exists

### Validation

* applicable IaC checks pass
* recovery configuration validates
* smoke tests validate
* security checks pass
* performance/load-test configuration validates

---

# 61. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Disaster-Recovery Infrastructure

Summarize:

* DR region
* recovery services
* database recovery
* search recovery
* S3 recovery
* secrets/KMS
* DNS failover

## Recovery Workflows

Describe:

* activation
* checkpoints
* validation
* failback

## Capacity and Performance

Summarize:

* capacity controls
* quota monitoring
* autoscaling validation
* load testing
* performance baselines

## Security

Summarize recovery access controls, IAM, encryption, secrets, and audit logging.

## Runbooks

List operational recovery runbooks created or modified.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Live Recovery Testing

Clearly distinguish:

* actually exercised
* statically validated
* documented but not executed

## Compatibility Notes

Document existing infrastructure constraints or assumptions discovered.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the disaster-recovery, business-continuity, resilience, capacity-management, and performance infrastructure described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not redesign application behavior.

Do not invent recovery credentials, successful failovers, or external cloud operations.

Do not merely describe disaster recovery.

Actually create and modify the required repository files so the marketplace has a reproducible, secure, auditable, capacity-aware, performance-aware, and operationally executable recovery architecture.

When complete, provide the required Completion Report.
