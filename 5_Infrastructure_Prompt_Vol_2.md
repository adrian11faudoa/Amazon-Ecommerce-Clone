You are operating in Senior Engineering Team Mode.

Complete the remaining production-ready infrastructure, DevOps, deployment automation, multi-region architecture, observability, security operations, disaster recovery, scalability, cost optimization, infrastructure testing, and operational tooling for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The infrastructure must integrate with the established backend, web frontend, mobile applications, databases, search, payments, inventory, order processing, seller systems, notifications, messaging, analytics, and administration systems.

Do not redesign the application architecture.

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

Do not generate application business logic.

────────────────────────────────────────

MISSION

Complete the production infrastructure required for:

• Multi-region deployment
• Global traffic routing
• Zero-downtime deployments
• Rolling deployments
• Canary deployments
• Blue-green deployments where appropriate
• Automatic rollback
• Kubernetes production operations
• Seller and customer application deployment
• Background worker deployment
• Inventory worker autoscaling
• Search operations
• Payment infrastructure integration
• Notification infrastructure integration
• Media processing
• CI/CD
• Security automation
• Image security
• Secret rotation
• Monitoring
• Alerting
• Distributed tracing
• Centralized logging
• Backup verification
• Disaster recovery
• Incident response
• Operational runbooks
• Capacity planning
• Cost optimization
• Infrastructure testing
• Production readiness

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Cloud:

• AWS

Orchestration:

• Amazon EKS
• Kubernetes

Packaging:

• Helm

Infrastructure as Code:

• Terraform

Containers:

• Docker
• Amazon ECR

CI/CD:

• GitHub Actions

Database:

• PostgreSQL

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda

Search:

• OpenSearch or Elasticsearch

Object Storage:

• Amazon S3

CDN:

• Amazon CloudFront

DNS:

• Amazon Route 53

Certificates:

• AWS Certificate Manager

Secrets:

• AWS Secrets Manager
• Kubernetes secret integration
• Approved cloud-native secret-management architecture

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Security:

• IAM
• KMS
• WAF
• NetworkPolicies
• Kubernetes RBAC
• Pod security controls
• Container scanning
• Image signing where appropriate

────────────────────────────────────────

MULTI-REGION ARCHITECTURE

Complete the global production architecture.

Support:

• Multiple AWS regions
• Regional EKS clusters
• Regional application workloads
• Regional background workers
• Regional search workloads where appropriate
• Regional monitoring
• Global DNS routing
• Regional health checks
• Automatic or operator-controlled failover

Use:

• Route 53 latency-based routing
• Route 53 failover routing
• Weighted routing where useful
• Health checks

Avoid unnecessary cross-region synchronous application dependencies.

────────────────────────────────────────

REGIONAL WORKLOAD DISTRIBUTION

Define regional deployment for:

• Customer APIs
• Seller APIs
• Admin APIs
• Web applications
• Background workers
• Search workers
• Notification workers
• Media processing
• Analytics workloads

Identify workloads that should remain:

• Regional
• Centralized
• Multi-region
• Rebuildable

────────────────────────────────────────

MULTI-REGION DATA STRATEGY

Complete the infrastructure support for:

PostgreSQL:

• Primary region
• Replica/recovery region
• Backup replication
• Point-in-time recovery

S3:

• Cross-region replication
• Versioning
• Lifecycle

Redis:

• Regional isolation
• Failover

Kafka/Redpanda:

• Replication/recovery strategy where appropriate

Search:

• Snapshot
• Cross-region recovery
• Rebuild from authoritative catalog data

Define which systems require active-active operation and which are better handled through active-passive recovery.

────────────────────────────────────────

GLOBAL TRAFFIC

Implement global routing architecture for:

• Web traffic
• API traffic
• Seller applications
• Administrative applications

Support:

• Geographic/latency routing
• Health-aware failover
• Regional draining
• DNS TTL strategy

Do not route users to unhealthy regions.

────────────────────────────────────────

KUBERNETES PRODUCTION TOPOLOGY

Complete the production Kubernetes topology.

Support workload classes:

• Web
• API
• Workers
• Inventory workers
• Order workers
• Search workers
• Notification workers
• Analytics workers
• Media workers
• Administrative services

Implement:

• Namespaces
• ServiceAccounts
• RBAC
• ResourceQuota
• LimitRange
• NetworkPolicy
• PodDisruptionBudget
• HorizontalPodAutoscaler
• Cluster autoscaling
• Pod topology spread
• Node affinity
• Anti-affinity
• Taints
• Tolerations
• Readiness probes
• Liveness probes
• Startup probes

────────────────────────────────────────

HELM

Create production Helm architecture.

Support:

• Reusable charts
• Application templates
• Worker templates
• Environment values
• Production overrides
• Resource configuration
• Autoscaling
• Secrets references
• ConfigMaps
• Services
• Ingress
• NetworkPolicies
• ServiceAccounts
• PDBs
• Health probes

Separate:

• Development
• Testing
• Staging
• Production

values.

────────────────────────────────────────

APPLICATION DEPLOYMENT

Create deployment architecture for:

• Customer web application
• API gateway
• Backend services
• Background workers
• Search workers
• Analytics workers
• Notification workers
• Media workers
• Administration application

Support:

• Rolling updates
• Health verification
• Graceful shutdown
• Connection draining
• Automatic rollback

────────────────────────────────────────

ZERO-DOWNTIME DEPLOYMENT

Implement deployment safety.

Support:

• Readiness gates
• Startup probes
• Graceful termination
• PodDisruptionBudgets
• Pre-deployment validation
• Post-deployment smoke tests
• Backward-compatible migrations
• Automatic rollback

Ensure database changes are compatible with old and new application versions during rolling deployments.

────────────────────────────────────────

CANARY DEPLOYMENT

Design canary support where appropriate.

Support:

• Small percentage rollout
• Metrics verification
• Error-rate monitoring
• Latency monitoring
• Automatic promotion
• Automatic rollback

Use canaries particularly for:

• API services
• Checkout-related services
• Payment-related services
• Inventory services

Avoid unnecessary canaries for simple internal jobs.

────────────────────────────────────────

BLUE-GREEN DEPLOYMENT

Support blue-green deployments where operationally valuable.

Evaluate use for:

• Web frontend
• High-risk APIs
• Administrative applications

Define:

• Traffic switching
• Health verification
• Rollback
• Old-environment retention

────────────────────────────────────────

DATABASE DEPLOYMENT

Implement a safe database migration pipeline.

Support:

• Schema validation
• Migration generation
• Migration testing
• Staging migration
• Production migration
• Expand-and-contract strategy
• Compatibility checks
• Rollback/recovery strategy

Never assume every schema migration can be safely reversed.

────────────────────────────────────────

POSTGRESQL OPERATIONS

Complete production operations.

Monitor:

• CPU
• Memory
• Connections
• Storage
• Query latency
• Lock contention
• Replica lag
• Transaction rate
• Deadlocks
• Failed connections

Configure:

• Automated backups
• PITR
• Maintenance
• Failover
• Parameter configuration
• Read replicas
• Connection pooling

────────────────────────────────────────

REDIS OPERATIONS

Complete:

• High availability
• Failover
• Encryption
• Authentication
• Monitoring
• Memory management
• Eviction monitoring
• Connection monitoring

Monitor:

• Memory
• Commands
• Latency
• Evictions
• Connections
• Replication
• Failover

────────────────────────────────────────

KAFKA / REDPANDA OPERATIONS

Complete production event infrastructure.

Support:

• Multi-broker
• Multi-AZ
• Replication
• Persistent storage
• Authentication
• TLS
• Topic lifecycle
• Retention
• Consumer groups
• Monitoring

Monitor:

• Consumer lag
• Broker health
• Disk utilization
• Partition distribution
• Throughput
• Rebalances

────────────────────────────────────────

SEARCH OPERATIONS

Complete OpenSearch/Elasticsearch production infrastructure.

Support:

• Multi-node
• Multi-AZ
• Shard strategy
• Replica strategy
• Index aliases
• Index versioning
• Snapshots
• Restore
• Monitoring
• Autoscaling

Define recovery if:

• Cluster loses quorum
• Index corruption occurs
• Search becomes unavailable
• Storage becomes saturated

Search must remain rebuildable from authoritative catalog data.

────────────────────────────────────────

MEDIA INFRASTRUCTURE

Support:

• Product-image processing
• Review-media processing
• Seller media
• Report generation

Use dedicated worker pools where appropriate.

Support:

• CPU-intensive jobs
• Temporary storage
• Queue-driven scaling
• Retry
• Failure isolation
• Lifecycle cleanup

Do not route large media through application servers unnecessarily.

────────────────────────────────────────

BACKGROUND WORKER AUTOSCALING

Create autoscaling strategies for:

• Inventory workers
• Notification workers
• Search index workers
• Media workers
• Analytics workers
• Report workers

Scale based on:

• CPU
• Memory
• Queue depth
• Job latency
• Consumer lag

Avoid scaling solely by CPU when queue depth is the actual bottleneck.

────────────────────────────────────────

CI/CD

Implement complete GitHub Actions pipelines.

Pull requests:

• Formatting
• Linting
• Type checking
• Unit tests
• Integration tests
• Contract tests
• Security scans
• Dependency scans
• Secret scans
• Terraform validation
• Helm validation

Build:

• Docker
• ECR publishing
• SBOM generation
• Image scanning
• Image signing where appropriate

Deploy:

• Development
• Staging
• Production

────────────────────────────────────────

CI/CD SECURITY

Use secure GitHub Actions authentication.

Prefer:

• OIDC
• Short-lived AWS credentials
• Protected environments
• Required approvals
• Branch protections

Separate:

• Development deploy permissions
• Staging deploy permissions
• Production deploy permissions

Never store long-lived production AWS credentials in GitHub secrets when OIDC can be used.

────────────────────────────────────────

RELEASE MANAGEMENT

Implement:

• Versioning
• Git tags
• Release notes
• Artifact retention
• Environment promotion
• Deployment metadata
• Rollback

Every production release must be traceable to:

• Git commit
• Build artifact
• Container image
• Deployment
• Configuration version

────────────────────────────────────────

CONTAINER SECURITY

Implement:

• Minimal base images
• Non-root execution
• Read-only filesystems where appropriate
• Dependency scanning
• Image scanning
• SBOM
• Image signing
• Immutable images
• Registry lifecycle management

Block deployment according to defined critical-severity security policy.

────────────────────────────────────────

SECRETS ROTATION

Automate or document rotation for:

• Database credentials
• Redis credentials
• Kafka credentials
• Stripe secrets
• Webhook secrets
• OAuth secrets
• Notification-provider credentials

Support:

• Rotation
• Revocation
• Audit
• Emergency rotation

Applications must support secret updates without requiring unnecessary infrastructure downtime.

────────────────────────────────────────

WAF AND EDGE SECURITY

Complete WAF deployment.

Protect:

• Customer storefront
• Public APIs
• Seller APIs
• Admin endpoints

Implement controls for:

• Common OWASP attacks
• Rate limiting
• Bot abuse
• Request-size limits
• IP filtering
• DDoS integration

High-risk administrative endpoints should receive stricter policies.

────────────────────────────────────────

OBSERVABILITY

Complete production observability.

Use:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Create dashboards for:

APPLICATION

• Request rate
• Error rate
• Latency
• Saturation

COMMERCE

• Product requests
• Search
• Cart
• Checkout
• Orders
• Payment success/failure
• Refunds
• Returns

INVENTORY

• Reservation rate
• Reservation failures
• Oversell-prevention conflicts
• Stock adjustments

SELLER

• Seller API latency
• Seller operations
• Payout failures

INFRASTRUCTURE

• Nodes
• Pods
• CPU
• Memory
• Disk
• Network

────────────────────────────────────────

ALERTING

Create alerts for:

• API error rate
• API latency
• Checkout failures
• Payment failures
• Inventory reservation failures
• Order creation failures
• Search failures
• Queue backlog
• Kafka lag
• Redis memory pressure
• PostgreSQL health
• Replica lag
• Storage failures
• Certificate expiration
• WAF anomalies
• Deployment failures
• Backup failures
• Region failures

Define severity:

• Warning
• Critical
• Emergency

────────────────────────────────────────

SLO / SLI

Define production SLOs and SLIs for:

• API availability
• Product-page availability
• Search latency
• Checkout latency
• Order creation
• Payment processing
• Inventory reservation
• Search indexing freshness
• Notification delivery
• Seller payout processing

Track error budgets.

────────────────────────────────────────

CENTRALIZED LOGGING

Complete logging.

Use:

• Structured JSON
• Loki
• Correlation IDs
• Trace IDs
• Request IDs

Implement:

• Retention
• Access control
• Sensitive-data filtering
• Log sampling where appropriate

Never log:

• Passwords
• API tokens
• Payment credentials
• Database passwords
• Secrets
• Private keys
• Full sensitive customer addresses unnecessarily

────────────────────────────────────────

BACKUP OPERATIONS

Complete:

• Automated backup scheduling
• Retention
• Encryption
• Cross-region replication
• Restore validation
• Backup monitoring

Test backups for:

• PostgreSQL
• S3
• Search snapshots
• Terraform state
• Critical configuration

────────────────────────────────────────

DISASTER RECOVERY

Design and implement recovery procedures for:

• Availability-zone failure
• Region failure
• Database failure
• Redis failure
• Kafka failure
• Search failure
• S3 failure
• EKS failure
• CI/CD failure
• Terraform state failure

Define:

• Detection
• Failover
• Recovery
• Validation
• Reconciliation
• Rollback
• Communication

────────────────────────────────────────

RTO / RPO

Define target RTO/RPO for:

• Customer-facing APIs
• Checkout
• Orders
• Payments
• Inventory
• Seller financials
• Search
• Analytics
• CMS

Distinguish between:

• Transactional systems
• Derived systems
• Ephemeral systems

────────────────────────────────────────

DISASTER RECOVERY TESTING

Automate or document controlled tests for:

• PostgreSQL recovery
• Point-in-time recovery
• Regional recovery
• S3 recovery
• Search restoration
• Infrastructure reconstruction
• Kubernetes cluster recovery
• Terraform recovery

Measure actual recovery time and compare to target RTO.

────────────────────────────────────────

CAPACITY PLANNING

Design capacity models for:

• Customer traffic
• Seller traffic
• Product reads
• Search
• Cart
• Checkout
• Inventory writes
• Orders
• Payment traffic
• Notifications
• Media processing
• Analytics

Define:

• Baseline
• Peak
• Burst
• Safety margin
• Scaling trigger
• Expansion process

────────────────────────────────────────

COST OPTIMIZATION

Implement cost-management foundations.

Evaluate:

• Compute right-sizing
• EKS node utilization
• Reserved capacity
• Savings Plans
• Spot for safe workloads
• Database sizing
• Redis sizing
• Search shard sizing
• S3 lifecycle
• CloudFront caching
• NAT costs
• Data transfer
• Log retention

Never reduce critical redundancy merely to lower cost.

────────────────────────────────────────

SECURITY OPERATIONS

Complete:

• IAM reviews
• Access reviews
• Secret rotation
• KMS rotation
• Security-group reviews
• NetworkPolicy validation
• Container scanning
• Dependency scanning
• Image signing
• Runtime security
• Audit logging

Prepare for:

• SOC 2
• ISO 27001
• GDPR
• PCI DSS scope reduction through Stripe architecture

Do not claim certification without formal assessment.

────────────────────────────────────────

INFRASTRUCTURE TESTING

Implement tests for:

• Terraform
• Helm
• Kubernetes
• Docker
• IAM
• Security groups
• NetworkPolicies
• WAF
• Backup
• Restore
• Autoscaling
• Deployment
• Rollback
• Health checks

Support:

• Static validation
• Integration tests
• Staging tests
• Production smoke tests

────────────────────────────────────────

PRODUCTION SMOKE TESTING

After each production deployment validate:

• Application health
• API health
• Authentication
• Product retrieval
• Search
• Cart
• Checkout readiness
• Payment-provider connectivity where safe
• Order APIs
• Seller APIs
• Admin APIs
• Database
• Redis
• Kafka
• Search
• Object storage

Do not run destructive operations against production.

────────────────────────────────────────

OPERATIONAL RUNBOOKS

Create runbooks for:

• API outage
• Checkout outage
• Payment outage
• Inventory outage
• Search outage
• Database outage
• Redis outage
• Kafka outage
• Worker backlog
• Media backlog
• Region outage
• Deployment failure
• Rollback
• Certificate failure
• Secret compromise
• Backup failure

Each runbook must include:

• Detection
• Diagnosis
• Mitigation
• Recovery
• Validation
• Escalation
• Post-incident actions

────────────────────────────────────────

INCIDENT RESPONSE

Define:

• Severity levels
• Incident ownership
• On-call
• Escalation
• Communication
• Containment
• Recovery
• Postmortem
• Corrective actions

Support auditability.

────────────────────────────────────────

PRODUCTION HARDENING

Perform infrastructure hardening for:

• EKS
• Kubernetes
• Docker
• IAM
• Network
• Secrets
• PostgreSQL
• Redis
• Kafka
• OpenSearch
• S3
• CloudFront
• WAF
• GitHub Actions
• Monitoring

Validate:

• Least privilege
• Encryption
• Availability
• Recovery
• Observability
• Security

────────────────────────────────────────

DOCUMENTATION

Generate:

• Production deployment guide
• Multi-region guide
• EKS operations guide
• Helm guide
• Terraform guide
• CI/CD guide
• Secret-management guide
• Database operations guide
• Redis operations guide
• Kafka operations guide
• Search operations guide
• S3/CloudFront guide
• Backup guide
• Disaster-recovery guide
• Monitoring guide
• Security operations guide
• Cost-management guide
• Incident-response guide
• Operational runbooks

────────────────────────────────────────

PROJECT INDEX

Maintain the infrastructure Project Index.

Track:

• AWS regions
• AWS accounts
• VPCs
• EKS clusters
• Node groups
• Namespaces
• Terraform modules
• Helm charts
• Docker images
• ECR repositories
• PostgreSQL
• Redis
• Kafka/Redpanda
• OpenSearch
• S3
• CloudFront
• Route 53
• ACM
• WAF
• IAM
• KMS
• Secrets
• CI/CD
• Monitoring
• Logging
• Alerts
• SLOs
• Backups
• Disaster recovery
• Runbooks
• Infrastructure tests
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

INFRASTRUCTURE MILESTONE 11

Production Helm charts, environment values, application deployments, worker deployments, and operational policies.

INFRASTRUCTURE MILESTONE 12

Autoscaling, workload-specific node pools, inventory workers, media workers, search workers, and queue-driven scaling.

INFRASTRUCTURE MILESTONE 13

Production ingress, load balancing, WAF, TLS, Route 53, CloudFront, and global traffic management.

INFRASTRUCTURE MILESTONE 14

CI/CD pipelines, GitHub Actions OIDC, image scanning, SBOM, image signing, release management, and rollback.

INFRASTRUCTURE MILESTONE 15

Multi-region deployment, regional failover, global routing, backup replication, and recovery infrastructure.

INFRASTRUCTURE MILESTONE 16

Complete Prometheus, Grafana, Loki, Tempo, OpenTelemetry, dashboards, SLOs, and alerts.

INFRASTRUCTURE MILESTONE 17

Database operations, Redis operations, Kafka operations, OpenSearch operations, backup automation, and reconciliation tooling.

INFRASTRUCTURE MILESTONE 18

Security hardening, secret rotation, IAM review, WAF policies, container security, and compliance preparation.

INFRASTRUCTURE MILESTONE 19

Disaster-recovery testing, restore testing, chaos/resilience testing, capacity planning, cost optimization, and operational runbooks.

INFRASTRUCTURE MILESTONE 20

Final production-readiness review, deployment certification, smoke testing, incident-response validation, and complete infrastructure Project Index.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must be validated before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate files.

Never summarize files instead of generating them.

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO implementations.

When modifying an existing file:

1. Provide the exact file path.
2. State why it must change.
3. Provide the complete updated file.

Never regenerate unchanged files.

────────────────────────────────────────

SCOPE RESTRICTION

This volume completes:

• Production Kubernetes
• Helm
• Application deployments
• Worker deployments
• Autoscaling
• Ingress
• Load balancing
• WAF
• TLS
• CloudFront
• Route 53
• Multi-region deployment
• CI/CD
• GitHub Actions
• Security automation
• Database operations
• Redis operations
• Kafka operations
• Search operations
• Backups
• Disaster recovery
• Monitoring
• Logging
• Alerting
• SLO/SLI
• Capacity planning
• Cost optimization
• Incident response
• Operational runbooks
• Infrastructure testing
• Production readiness

Do not implement:

• Backend business logic
• Frontend code
• Mobile code

────────────────────────────────────────

QUALITY BAR

Treat this as infrastructure for a globally distributed enterprise ecommerce marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large search traffic
• Large media traffic
• High payment activity
• Multi-region deployment
• Zero-downtime operations
• Strict security requirements
• Regulatory requirements
• Disaster recovery requirements

Prioritize:

• Availability
• Security
• Scalability
• Reliability
• Recoverability
• Observability
• Cost efficiency
• Operational simplicity
• Zero-downtime deployment
• Production readiness
