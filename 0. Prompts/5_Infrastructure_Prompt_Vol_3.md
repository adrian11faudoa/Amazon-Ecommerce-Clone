# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 3

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the production data-platform, managed-stateful-services, backup, retention, and resilience infrastructure for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff Database Engineer
* Staff DevOps Engineer
* Staff Platform Engineer
* Site Reliability Engineer
* Security Engineer
* Storage Engineer
* Performance Engineer
* Reliability Engineer
* Disaster-Recovery Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the managed data-service infrastructure required by the application, including PostgreSQL, Redis, search, object storage, backups, encryption, lifecycle management, resilience, monitoring hooks, recovery mechanisms, and environment isolation.

This is an incremental implementation task.

Do not implement infrastructure outside the scope defined in this prompt.

---

# PROJECT

Build the production data infrastructure for an original Amazon-style ecommerce marketplace serving:

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

The repository is the source of truth for actual application contracts, schemas, runtime configuration, service names, data ownership, and implemented features.

Do not redesign application-domain schemas in this prompt.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction:

### Backend

* NestJS
* TypeScript
* REST
* OpenAPI
* WebSockets and/or SSE where justified
* webhooks

### Database

* PostgreSQL
* Prisma

### Cache and Queues

* Redis
* BullMQ

### Search

* Elasticsearch/OpenSearch

### Object Storage

* Amazon S3 or compatible object storage

### Payments

* Stripe or equivalent provider abstraction

### Cloud

* AWS

### Infrastructure

* Terraform or repository-compatible IaC
* Docker
* Kubernetes/EKS
* Helm

### Observability Direction

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

---

# PRIMARY OBJECTIVE

Implement the production managed-stateful-service infrastructure required by the marketplace.

The resulting infrastructure must provide:

* highly available PostgreSQL
* secure Redis
* scalable search infrastructure
* durable object storage
* encrypted backups
* environment isolation
* controlled retention
* recovery mechanisms
* data lifecycle controls
* network isolation
* connection management
* operational safety
* capacity configuration
* recovery documentation

The infrastructure must integrate cleanly with the workloads and network foundation already represented in the repository.

Do not create competing versions of stateful infrastructure.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing PostgreSQL modules
* existing Prisma configuration
* database connection strings
* migration strategy
* Redis configuration
* BullMQ queues
* search configuration
* search index naming
* S3 buckets
* object-key conventions
* media lifecycle requirements
* backup configuration
* environment separation
* existing monitoring configuration
* existing data retention configuration
* application connection-pool configuration
* infrastructure state
* current AWS regions
* current security groups
* current encryption keys

Do not replace working managed-service infrastructure without repository evidence.

Do not create duplicate databases, caches, search domains, or buckets.

---

# CURRENT SCOPE

Implement the managed-stateful-service infrastructure and its resilience foundation.

---

# 1. PostgreSQL Architecture

Implement the AWS-managed PostgreSQL infrastructure required by the marketplace.

Prefer Amazon RDS for PostgreSQL or Amazon Aurora PostgreSQL when the repository and workload architecture justify it.

The selected service must support:

* high availability
* automated backups
* encryption
* private networking
* controlled scaling
* monitoring
* maintenance
* recovery

Do not deploy PostgreSQL directly inside Kubernetes unless the repository has a documented reason that requires it.

---

# 2. PostgreSQL Environment Isolation

Create separate database infrastructure for the appropriate environments.

At minimum prevent shared mutable production data between:

* development
* test
* staging
* production
* disaster recovery

Do not reuse production credentials in lower environments.

Do not point non-production applications at production databases.

---

# 3. PostgreSQL Network Security

Database infrastructure must be private.

Configure:

* private subnets
* database security groups
* controlled inbound access
* controlled outbound behavior
* TLS
* no public database endpoint

Only application workloads and explicitly approved operational systems may access the database.

Do not allow unrestricted VPC-wide database access.

---

# 4. PostgreSQL High Availability

Production PostgreSQL must support failure of a database instance or Availability Zone without requiring a manual rebuild from scratch.

Use the selected AWS PostgreSQL service's appropriate HA architecture.

Configure:

* Multi-AZ
* automatic failover
* appropriately sized standby capacity
* maintenance behavior
* failover-aware application configuration

Do not claim zero downtime.

Document realistic failover behavior and dependencies.

---

# 5. PostgreSQL Storage

Configure production database storage with appropriate:

* encrypted volumes
* autoscaling where supported
* IOPS configuration where justified
* storage thresholds
* monitoring
* capacity alerts

Do not choose arbitrary oversized production storage.

Make sizing environment-configurable.

---

# 6. PostgreSQL Parameter Management

Create an explicit database parameter strategy.

Where custom parameters are required, manage them as infrastructure code.

Avoid arbitrary tuning values without workload justification.

Document:

* connection-related settings
* logging settings
* performance parameters
* extensions
* locale/timezone assumptions

Do not change application schema behavior through hidden infrastructure parameters.

---

# 7. PostgreSQL Extensions

Inspect the repository for actual PostgreSQL extension requirements.

Only enable required extensions.

Do not enable arbitrary extensions “for future use.”

Document every required extension and its purpose.

---

# 8. PostgreSQL Connection Management

The marketplace can have many application pods and worker processes.

Infrastructure must account for connection pressure.

Implement configuration that supports:

* bounded connection pools
* environment-specific connection limits
* worker/API allocation
* scaling-aware connection planning

Where a connection pooler is appropriate, design its integration.

Do not add PgBouncer merely because it is popular if the current architecture does not need it.

---

# 9. Database Credentials

Database credentials must be centrally managed.

Use:

* AWS Secrets Manager
* or approved repository-compatible secret infrastructure

Do not hardcode:

* usernames
* passwords
* connection strings containing credentials

Support credential rotation where practical.

---

# 10. PostgreSQL Encryption

Use KMS-backed encryption for:

* database storage
* automated backups
* snapshots
* replicas where applicable

Ensure applications use encrypted connections.

Do not disable certificate verification to simplify local development in production configuration.

---

# 11. PostgreSQL Backups

Implement automated production backups.

Configure:

* backup retention
* backup window
* maintenance window
* point-in-time recovery
* snapshot retention where required

Backup retention must be environment configurable.

Do not rely exclusively on manually created snapshots.

---

# 12. Backup Protection

Protect production backups from accidental deletion.

Where appropriate use:

* separate backup storage
* retention controls
* KMS encryption
* cross-region backup copies
* deletion protection

Do not place all disaster-recovery assumptions on the primary database.

---

# 13. Cross-Region Database Recovery

Prepare the infrastructure for recovery in a secondary AWS region.

Where the selected PostgreSQL service supports it, configure or prepare:

* cross-region automated backups
* read replica
* global database capability
* snapshot replication
* recovery infrastructure

Choose the mechanism according to the actual application RPO/RTO requirements and AWS service capabilities.

Do not claim active-active database behavior unless it is genuinely implemented.

---

# 14. Database Restore Validation

Infrastructure must make database restore testing possible.

Provide:

* documented restore procedure
* recovery environment configuration
* snapshot/PITR recovery path
* validation expectations
* post-restore application checks

A backup that has never been tested should not be treated as fully validated recovery capability.

---

# 15. Redis Architecture

Implement managed Redis infrastructure using Amazon ElastiCache for Redis/Valkey or the repository-compatible AWS managed Redis service.

Redis must support the actual application use cases:

* cache
* session/ephemeral state where applicable
* BullMQ
* rate-limiting
* temporary coordination
* idempotency
* transient locks where appropriate

Do not assume Redis is the authoritative source of business data.

---

# 16. Redis Environment Isolation

Create separate Redis infrastructure for production and lower environments.

Do not share a production Redis cluster with staging or development.

Environment-specific sizing must be configurable.

---

# 17. Redis Network Security

Redis must remain private.

Configure:

* private subnets
* security-group restrictions
* encrypted transport
* authentication where supported
* no public endpoint

Only authorized workloads may connect.

---

# 18. Redis High Availability

Production Redis infrastructure must support failure of individual nodes.

Where workload semantics permit, configure:

* replication
* automatic failover
* multi-AZ placement
* appropriate node classes

Do not treat cache high availability and BullMQ durability as identical requirements.

---

# 19. Redis Persistence Strategy

Determine persistence requirements based on actual repository usage.

For:

* disposable cache entries
* temporary locks
* ephemeral state

do not invent durability requirements.

For Redis-backed queue workloads where job loss is unacceptable, use the managed service's appropriate durability settings and recovery strategy.

Document the durability expectations.

---

# 20. Redis Memory Management

Configure:

* eviction behavior
* memory thresholds
* reserved capacity where appropriate
* monitoring
* alerting hooks

Eviction policy must be selected according to actual data semantics.

Do not allow Redis to silently evict critical queue data because of an arbitrary cache-oriented policy.

---

# 21. Redis TLS and Authentication

Require secure Redis connections in production.

Applications must use the correct encrypted endpoint and authentication model.

Do not expose Redis credentials in Helm values or source code.

---

# 22. Search Architecture

Implement the managed search infrastructure required by the marketplace.

Use Amazon OpenSearch Service or the repository's selected Elasticsearch-compatible managed architecture.

Search infrastructure must support:

* product discovery
* category search
* autocomplete
* faceting
* filters
* sorting
* derived catalog documents
* indexing pipelines
* rebuilds
* aliases or equivalent cutover mechanisms

Do not redesign application search APIs in this prompt.

---

# 23. Search Environment Isolation

Separate search infrastructure by environment.

Production search must never share mutable index state with non-production environments.

Use environment-specific resource sizing.

---

# 24. Search Security

Search clusters/domains must be private.

Implement:

* network isolation
* encryption at rest
* encryption in transit
* authentication
* authorization
* controlled access from workloads

Do not expose the search domain publicly merely to simplify development.

---

# 25. Search Encryption

Enable encryption using managed AWS mechanisms.

Where supported configure:

* encryption at rest
* node-to-node encryption
* TLS
* KMS integration

Ensure encryption settings are managed declaratively.

---

# 26. Search Capacity

Configure search capacity according to environment needs.

Make configurable:

* node count
* node class
* storage
* shard-related capacity assumptions
* replica expectations

Do not lock production to arbitrary development-sized infrastructure.

---

# 27. Search Availability

Production search must tolerate individual node failure.

Use appropriate:

* replica configuration
* multi-AZ architecture
* zone awareness where supported

Do not create a single-node production search cluster unless there is a documented and explicitly accepted limitation.

---

# 28. Search Snapshot Strategy

Configure automated snapshot/recovery mechanisms where supported.

Search should be treated as a derived data system, but rebuilding a large catalog from scratch may be operationally expensive.

Implement an appropriate compromise between:

* reproducibility
* backup cost
* recovery speed

Document the strategy.

---

# 29. Search Recovery

Document and automate, where practical:

* domain recovery
* snapshot restoration
* index reconstruction
* alias restoration
* reindex initiation
* post-recovery verification

Do not claim search recovery is complete if only backups exist without restoration procedures.

---

# 30. S3 Architecture

Implement the durable object-storage layer required by the marketplace.

Create or reconcile buckets for appropriate data classes, including where applicable:

* product media
* seller media
* customer review media
* generated derivatives
* exports
* operational artifacts
* backups
* logs

Do not automatically create a new bucket for every object type if the existing architecture already has a sound isolation model.

---

# 31. S3 Security Baseline

Every managed application bucket must use:

* block public access
* encryption
* versioning where appropriate
* object ownership controls
* lifecycle configuration
* explicit IAM policies
* access logging/auditing where required

Avoid ACL-based public access.

---

# 32. S3 Bucket Policies

Bucket policies must be narrowly scoped.

Use explicit principals and prefixes where appropriate.

Prevent unauthorized cross-environment access.

Prevent seller/customer media leakage through overly broad bucket permissions.

---

# 33. S3 Object Ownership

Use bucket-owner-enforced ownership or the current AWS recommended object ownership model.

Do not depend on legacy object ACLs for application authorization.

---

# 34. S3 Lifecycle Management

Implement lifecycle policies based on actual object categories.

Potential lifecycle behaviors include:

* incomplete upload cleanup
* temporary derivative cleanup
* archival transition
* obsolete object expiration
* old version expiration
* operational artifact retention

Do not delete customer or seller content without a defined retention rule.

---

# 35. S3 Versioning

Enable versioning for object classes where accidental overwrite or deletion recovery matters.

Where versioning creates excessive cost, implement explicit expiration rules for non-current versions.

Do not enable versioning blindly for every bucket without lifecycle management.

---

# 36. S3 Replication and Disaster Recovery

Where business requirements justify it, implement or prepare:

* cross-region replication
* replication IAM
* KMS replication support
* destination buckets
* replication monitoring

Prioritize data categories according to their recoverability requirements.

Do not replicate transient files unnecessarily.

---

# 37. S3 Recovery

Document and validate:

* object restoration
* bucket recovery
* replication behavior
* lifecycle interaction
* KMS dependency recovery

Recovery procedures must not rely on manually reconstructing large object trees.

---

# 38. Backup Architecture

Establish a coherent backup policy across:

* PostgreSQL
* Redis where durability matters
* search
* S3
* infrastructure state
* critical configuration

Classify backup requirements by data criticality.

Do not treat every data source identically.

---

# 39. Backup Retention Classes

Define configurable retention classes such as:

* short-term operational recovery
* medium-term recovery
* long-term compliance/business recovery

The exact retention periods must come from repository/project requirements or configurable infrastructure values.

Do not hardcode arbitrary regulatory retention periods.

---

# 40. Backup Encryption

All backups containing sensitive data must use encryption.

Use:

* KMS
* managed service encryption
* access-controlled backup repositories

Do not create unencrypted production backup copies as a convenience.

---

# 41. Backup Access Control

Separate backup administration from ordinary application permissions.

Application pods must not receive broad permission to:

* delete production backups
* modify retention settings
* restore arbitrary databases
* destroy recovery points

Backup operations require elevated, controlled permissions.

---

# 42. Recovery Environments

Provide infrastructure definitions that can create recovery environments without modifying the primary production stack in place.

A recovery environment should be able to restore:

* database
* required object storage
* search
* application configuration

as appropriate to the project's RTO/RPO model.

---

# 43. Data Retention

Infrastructure retention must align with application requirements.

Consider:

* operational logs
* media
* database backups
* search snapshots
* temporary objects
* exports
* reports

Do not use infrastructure lifecycle rules to bypass application-level retention, legal-hold, or deletion behavior.

---

# 44. Privacy and Deletion Compatibility

Infrastructure must preserve application-level privacy requirements.

Do not create backups or replicas that make application deletion semantics impossible without a documented recovery/retention policy.

Where immutable backups exist, document the relationship between:

* active data deletion
* backup retention
* legal/operational recovery
* eventual backup expiration

---

# 45. Database Monitoring Hooks

Configure managed-service monitoring hooks for:

* CPU
* memory where available
* storage
* connections
* replication
* I/O
* latency
* failover events
* backup status

Use appropriate enhanced monitoring/performance insights where justified.

Do not enable expensive observability features in every low-cost environment without configuration.

---

# 46. Redis Monitoring Hooks

Monitor:

* memory
* CPU
* connections
* evictions
* replication
* failover
* cache hit/miss behavior where available
* command latency
* queue-related pressure where relevant

Do not rely solely on Kubernetes pod metrics for managed Redis.

---

# 47. Search Monitoring Hooks

Monitor:

* cluster health
* CPU
* storage
* JVM/memory pressure where available
* indexing failures
* search latency
* rejected requests
* shard health
* replication health

Search alerts must distinguish temporary load from actual degradation.

---

# 48. S3 Monitoring Hooks

Where appropriate monitor:

* storage growth
* request errors
* replication failures
* lifecycle failures
* access anomalies
* bucket configuration drift

Do not create excessive per-object monitoring for large media datasets.

---

# 49. Managed-Service Security Monitoring

Where supported, integrate managed services with:

* CloudTrail
* AWS Config
* security findings
* audit logs
* access logging

Do not leave privileged data-plane operations unaudited.

---

# 50. Capacity Planning

Create configurable infrastructure parameters for:

* PostgreSQL compute
* PostgreSQL storage
* PostgreSQL connections
* Redis memory
* Redis nodes
* search capacity
* search storage
* S3 lifecycle
* backup retention

Document the intended relationship between application scale and managed-service capacity.

Do not claim exact production capacity unless it is backed by workload measurements.

---

# 51. Scaling Boundaries

Infrastructure must make clear which systems scale:

### Horizontally

* application pods
* workers
* search nodes where supported

### Vertically

* database instances
* Redis node size
* search node size where appropriate

### Through managed storage scaling

* PostgreSQL storage
* object storage
* search storage where supported

Do not create a scaling strategy that ignores the bottleneck characteristics of each system.

---

# 52. Maintenance Windows

Configure maintenance windows so managed-service changes occur predictably.

Define:

* backup windows
* maintenance windows
* environment-specific scheduling
* production disruption expectations

Do not schedule maintenance blindly during known peak marketplace periods.

Where no business calendar exists in the repository, expose configurable values.

---

# 53. Deletion Protection

Production managed services must use deletion protection where appropriate.

Protect:

* production databases
* production search domains
* critical S3 buckets
* backup repositories
* critical infrastructure

Do not prevent legitimate controlled destroy operations forever.

Use explicit mechanisms to override protection when authorized.

---

# 54. Parameter and Configuration Consistency

All managed-service configuration must be environment-aware.

Do not hardcode:

* production instance classes
* database names
* DNS names
* regions
* passwords
* arbitrary retention values

Use typed configuration.

Validate invalid combinations.

---

# 55. Integration With Kubernetes Workloads

Ensure the runtime infrastructure created previously can securely reach:

* PostgreSQL
* Redis
* OpenSearch
* S3

Verify:

* security-group rules
* IAM roles
* DNS
* TLS
* secret references
* environment variables
* service endpoints

Do not grant access broader than the workload requires.

---

# 56. Failure Scenarios

Test or structurally validate behavior for:

* PostgreSQL failover
* database storage pressure
* Redis node failure
* Redis memory pressure
* search node failure
* search storage pressure
* S3 replication failure
* expired credentials
* inaccessible KMS key
* unavailable Availability Zone
* backup restoration

Where live cloud testing is unavailable, validate infrastructure configuration and document the exact unexecuted failure test.

Do not falsely claim successful failover tests.

---

# 57. Security Requirements

All managed data services must follow:

* encryption at rest
* encryption in transit
* private networking
* least privilege
* centralized secret management
* environment isolation
* auditability
* deletion protection
* controlled backup access

Do not expose managed databases or search systems publicly.

---

# 58. Out of Scope

Do not implement:

* application schema redesign
* Prisma model redesign
* business-logic changes
* search API redesign
* catalog/indexing redesign
* payment implementation
* frontend changes
* mobile changes
* complete CI/CD pipelines
* complete observability platform
* complete DR failover orchestration
* application feature work
* fake cloud provisioning
* production credentials

Do not modify application behavior unless required to make the managed-service integration operational.

---

# 59. Required Deliverables

Implement the actual repository changes required for this infrastructure layer, including where applicable:

* PostgreSQL/RDS/Aurora infrastructure
* database subnet/security-group integration
* database parameter configuration
* backup policies
* cross-region recovery configuration
* Redis/ElastiCache infrastructure
* Redis parameter configuration
* OpenSearch infrastructure
* OpenSearch security/configuration
* S3 buckets
* S3 policies
* S3 lifecycle rules
* S3 replication where required
* KMS integration
* backup infrastructure
* retention configuration
* monitoring hooks
* recovery documentation
* validation tooling
* operational scripts where concretely required

Every created file must have a concrete purpose.

---

# 60. Implementation Quality Rules

Do not produce:

* pseudo-code
* placeholders
* TODO markers
* FIXME markers
* fake databases
* fake buckets
* fake search clusters
* hardcoded production credentials
* unrestricted data-service access
* public databases
* public Redis
* public search clusters
* unencrypted backups
* duplicate stateful infrastructure
* undocumented destructive lifecycle rules
* undocumented recovery assumptions
* “implement later” recovery paths

All infrastructure must be internally coherent.

---

# 61. Repository-First Incremental Implementation

Before implementation:

1. inspect existing managed-service infrastructure
2. identify actual data-service dependencies
3. identify current environment boundaries
4. identify data ownership
5. identify backup requirements already encoded in the repository
6. identify current KMS/secrets/network resources
7. identify application connection requirements
8. identify current observability integrations
9. implement only the required compatible changes

Do not redesign the architecture merely because another AWS service is available.

---

# 62. Testing

Run every applicable repository-compatible validation.

At minimum validate:

### IaC

* formatting
* syntax
* validation
* dependency resolution
* plan generation where credentials exist

### Security

* IaC security scan
* secret scan
* policy validation

### PostgreSQL

Validate:

* network reachability configuration
* encryption
* backup configuration
* failover settings
* parameter references
* secret references

### Redis

Validate:

* network isolation
* encryption
* authentication
* topology
* memory policy

### Search

Validate:

* domain security
* encryption
* node topology
* access policies
* snapshot configuration

### S3

Validate:

* public-access block
* encryption
* lifecycle
* ownership
* bucket policy
* replication where configured

### Recovery

Validate:

* recovery configuration
* backup references
* restore documentation
* cross-region dependencies

Do not claim live recovery or failover testing unless it actually occurred.

---

# 63. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### PostgreSQL

* production PostgreSQL infrastructure exists
* production database is private
* encryption is enabled
* Multi-AZ/high availability is configured
* automated backups exist
* point-in-time recovery is supported
* deletion protection exists
* database credentials are externally managed
* recovery configuration is documented

### Redis

* production Redis infrastructure exists
* private connectivity exists
* encryption is enabled
* authentication is configured
* high availability is configured where appropriate
* memory behavior is explicitly configured
* environment isolation exists

### Search

* managed OpenSearch/Elasticsearch infrastructure exists
* private networking exists
* encryption is enabled
* authentication/authorization exists
* production redundancy exists
* snapshots/recovery strategy exists

### S3

* required buckets exist
* public access is blocked
* encryption is enabled
* ownership is controlled
* lifecycle policies exist
* IAM access is scoped
* replication exists where required

### Backups

* backup policy exists
* retention exists
* encryption exists
* backup access is restricted
* recovery paths are documented
* cross-region recovery is prepared where required

### Reliability

* failure domains are documented
* managed-service maintenance is configured
* deletion protection exists
* capacity is configurable
* recovery dependencies are known

### Security

* no secrets are committed
* no public database/Redis/search endpoints exist
* IAM is least privilege oriented
* data services are encrypted
* private networking is enforced

### Validation

* applicable IaC checks pass
* security checks pass
* configuration references resolve
* repository-compatible tests pass
* no unsupported resources remain

---

# 64. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## PostgreSQL Infrastructure

Summarize:

* service choice
* topology
* encryption
* backups
* recovery
* monitoring
* capacity

## Redis Infrastructure

Summarize:

* service choice
* topology
* security
* persistence
* memory policy
* monitoring

## Search Infrastructure

Summarize:

* service choice
* topology
* encryption
* access control
* snapshots
* recovery

## S3 Infrastructure

Summarize:

* buckets
* policies
* lifecycle
* versioning
* replication
* encryption

## Backup and Recovery

Summarize:

* backup systems
* retention
* cross-region recovery
* restore procedures

## Security Changes

Summarize:

* network
* IAM
* KMS
* secrets
* encryption
* deletion protection

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Recovery Testing Status

Clearly distinguish:

* actually tested
* statically validated
* documented but not executed

## Compatibility Notes

Document any application/runtime compatibility issues discovered.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the managed data-service and resilience infrastructure described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not redesign application data models.

Do not invent production credentials, cloud resources, or successful recovery tests.

Do not merely describe how PostgreSQL, Redis, OpenSearch, or S3 should work.

Actually create and modify the required repository files so the managed data infrastructure is executable, secure, scalable, recoverable, observable through the existing platform, and compatible with the marketplace application.

When complete, provide the required Completion Report.
