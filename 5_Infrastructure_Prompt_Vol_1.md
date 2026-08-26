You are operating in Senior Engineering Team Mode.

Build the production-ready infrastructure foundation for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The infrastructure must support the established backend, web frontend, mobile applications, search, payments, inventory, fulfillment, notifications, analytics, and administrative systems.

Do not redesign the application architecture.

Do not implement backend business logic.

Do not implement frontend code.

Do not implement mobile code.

Do not generate application business logic.

This volume establishes the foundational cloud, networking, container, Kubernetes, Terraform, storage, database, cache, event-streaming, and deployment infrastructure.

────────────────────────────────────────

MISSION

Build production-grade cloud infrastructure supporting:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High search traffic
• High inventory throughput
• Large media traffic
• Large analytics workloads
• Marketplace payments
• Seller payouts
• Multi-region deployment
• High availability
• Horizontal scaling
• Zero-downtime deployments
• Disaster recovery
• Secure operations

Support environments for:

• Local Development
• Development
• Testing
• Staging
• Production
• Disaster Recovery

────────────────────────────────────────

PRIMARY TECHNOLOGY STACK

Cloud:

• AWS

Containers:

• Docker

Orchestration:

• Kubernetes
• Amazon EKS

Package Management:

• Helm

Infrastructure as Code:

• Terraform

CI/CD:

• GitHub Actions

Container Registry:

• Amazon ECR

Database:

• PostgreSQL
• Amazon RDS or Aurora PostgreSQL where justified

Cache:

• Redis
• Amazon ElastiCache where appropriate

Event Streaming:

• Kafka or Redpanda
• Managed AWS alternative where justified

Search:

• Elasticsearch/OpenSearch

Object Storage:

• Amazon S3

CDN:

• Amazon CloudFront

DNS:

• Amazon Route 53

TLS:

• AWS Certificate Manager

Secrets:

• AWS Secrets Manager
• Kubernetes secret integration
• Approved cloud-native secret management

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
• Pod Security controls

────────────────────────────────────────

INFRASTRUCTURE ARCHITECTURE

Design infrastructure across multiple Availability Zones.

Support:

• Public edge
• Private application workloads
• Private data workloads
• Internal service communication
• Management access
• Observability infrastructure

Do not expose:

• PostgreSQL
• Redis
• Kafka
• Search clusters
• Kubernetes control-plane infrastructure

directly to the public internet.

────────────────────────────────────────

AWS ACCOUNT STRATEGY

Define an AWS account strategy suitable for enterprise operations.

Consider separation for:

• Security
• Shared services
• Development
• Staging
• Production
• Disaster recovery

Define:

• Account boundaries
• IAM boundaries
• Network boundaries
• Billing boundaries
• Logging boundaries

Do not reuse production credentials in lower environments.

────────────────────────────────────────

ENVIRONMENT STRATEGY

Design separate infrastructure configurations for:

LOCAL

• Docker Compose
• Local PostgreSQL
• Local Redis
• Local Kafka/Redpanda
• Local search

DEVELOPMENT

• Shared development AWS environment

TESTING

• Isolated automated-test infrastructure where appropriate

STAGING

• Production-like architecture

PRODUCTION

• High availability
• Multi-AZ
• Multi-region readiness

DISASTER RECOVERY

• Recovery infrastructure
• Backup storage
• Recovery validation

────────────────────────────────────────

TERRAFORM ARCHITECTURE

Create a scalable Terraform organization.

Use reusable modules for:

• Networking
• VPC
• Subnets
• Routing
• Security groups
• IAM
• EKS
• Node groups
• PostgreSQL
• Redis
• Kafka
• OpenSearch
• S3
• CloudFront
• Route 53
• ACM
• ECR
• KMS
• Secrets
• WAF
• Monitoring
• Logging
• Backups

Define environment layers separately from reusable modules.

Support:

• Remote state
• State locking
• Provider configuration
• Variable validation
• Outputs
• Tags
• Naming conventions
• Region configuration

Never place secrets in Terraform code or state intentionally.

────────────────────────────────────────

TERRAFORM STATE

Implement secure remote state.

Support:

• Encrypted state storage
• State locking
• Restricted access
• Versioning
• Recovery

Separate state appropriately for:

• Shared infrastructure
• Development
• Staging
• Production
• Disaster recovery

────────────────────────────────────────

NETWORKING

Design AWS networking.

Include:

• VPC
• Public subnets
• Private application subnets
• Private data subnets
• Internet Gateway
• NAT Gateways
• Route tables
• Security groups
• Network ACLs
• VPC endpoints

Use multiple Availability Zones.

Define network flows between:

• Internet
• CloudFront
• WAF
• Load balancers
• EKS
• PostgreSQL
• Redis
• Kafka
• Search
• S3

Apply least-privilege networking.

────────────────────────────────────────

NETWORK SEGMENTATION

Separate:

• Edge traffic
• Application traffic
• Worker traffic
• Database traffic
• Management traffic
• Observability traffic

Do not allow unrestricted east-west traffic inside the environment.

────────────────────────────────────────

IAM

Implement least-privilege IAM architecture.

Create roles for:

• Terraform
• EKS
• Application workloads
• Worker workloads
• Media processing
• Search workers
• CI/CD
• Monitoring
• Backup systems
• Disaster recovery

Prefer short-lived credentials and workload identity.

Use:

• OIDC federation
• IAM Roles for Service Accounts
• GitHub Actions OIDC

Avoid long-lived access keys.

────────────────────────────────────────

KMS

Define KMS architecture for:

• S3
• PostgreSQL
• Redis
• EBS
• Secrets
• Logs
• Backups

Define:

• Key ownership
• Rotation
• Access policies
• Environment separation

────────────────────────────────────────

EKS FOUNDATION

Create the production Kubernetes foundation.

Support:

• Amazon EKS
• Multi-AZ node groups
• Cluster autoscaling
• IAM integration
• Kubernetes RBAC
• NetworkPolicies
• Pod security

Separate workload categories:

• API services
• Web workloads
• Background workers
• Media workers
• Search workers
• Notification workers
• Analytics workers
• Administration

────────────────────────────────────────

KUBERNETES NAMESPACES

Define namespaces appropriate for the platform.

Examples may include:

• ingress
• applications
• workers
• search
• observability
• security

Do not create unnecessary namespaces.

Define ownership and isolation clearly.

────────────────────────────────────────

NODE GROUPS

Design workload-specific node groups.

Support:

• General application workloads
• Memory-intensive workloads
• CPU-intensive workloads
• Media-processing workloads
• Analytics workloads
• Observability workloads

Define:

• Node labels
• Taints
• Tolerations
• Affinity
• Anti-affinity
• Availability zones
• Autoscaling policies

────────────────────────────────────────

KUBERNETES RESOURCE GOVERNANCE

Define foundations for:

• Resource requests
• Resource limits
• ResourceQuota
• LimitRange
• PodDisruptionBudget
• NetworkPolicy
• ServiceAccount
• RBAC

Prevent noisy-neighbor issues.

────────────────────────────────────────

CONTAINERIZATION

Create production Docker strategy.

Support:

• Multi-stage builds
• Minimal runtime images
• Non-root execution
• Dependency caching
• Immutable versions
• Health checks
• Graceful shutdown
• Security scanning compatibility

Create patterns for:

• Backend services
• Workers
• Web application
• Mobile build tooling where necessary

Do not include secrets inside images.

────────────────────────────────────────

DOCKER COMPOSE

Create local infrastructure with Docker Compose.

Support:

• PostgreSQL
• Redis
• Kafka/Redpanda
• Elasticsearch/OpenSearch where appropriate
• Supporting services

The local environment must support backend development and integration testing without requiring AWS.

────────────────────────────────────────

ECR

Configure Amazon ECR.

Support:

• Repository management
• Image lifecycle policies
• Image scanning
• Immutable tags where appropriate
• Access control
• Retention

Define tagging using:

• Git SHA
• Semantic version
• Release tag
• Environment

────────────────────────────────────────

LOAD BALANCING

Design load balancing for:

• Web application
• Public APIs
• Seller APIs
• Admin APIs
• Webhook endpoints

Support:

• TLS
• Health checks
• Connection timeouts
• Load balancing across AZs
• Horizontal scaling

Do not route large media downloads through application services when CloudFront/S3 can deliver them directly.

────────────────────────────────────────

INGRESS

Design Kubernetes ingress.

Support:

• TLS
• Routing
• API routing
• Web routing
• Webhook routing
• Health checks
• Security integration
• Rate limiting where appropriate

Keep internal services private.

────────────────────────────────────────

POSTGRESQL INFRASTRUCTURE

Configure production PostgreSQL.

Support:

• Multi-AZ
• Automated backups
• Point-in-time recovery
• Read replicas
• Encryption
• Monitoring
• Failover
• Maintenance
• Connection pooling
• Parameter configuration

Define:

• Storage scaling
• Connection limits
• Backup retention
• Replica strategy
• Monitoring thresholds

Do not expose PostgreSQL publicly.

────────────────────────────────────────

REDIS INFRASTRUCTURE

Configure production Redis.

Support:

• Multi-AZ
• Replication
• Automatic failover
• Encryption at rest
• Encryption in transit
• Authentication
• Monitoring
• Persistence where appropriate

Support platform use cases:

• Cache
• Rate limiting
• Idempotency
• Distributed locks
• Cart acceleration
• Queue infrastructure

Redis must never be the authoritative store for:

• Orders
• Payments
• Inventory
• Seller balances
• Refunds

────────────────────────────────────────

KAFKA / REDPANDA INFRASTRUCTURE

Define event-streaming infrastructure.

Support:

• Multi-broker cluster
• Multi-AZ distribution
• Persistent storage
• Replication
• Authentication
• TLS
• Monitoring
• Topic management
• Retention

Design for:

• Product events
• Inventory events
• Order events
• Payment events
• Notification events
• Analytics events
• Seller events

────────────────────────────────────────

OPENSEARCH / ELASTICSEARCH

Configure production search infrastructure.

Support:

• Multi-node
• Multi-AZ
• Replicas
• Shards
• Snapshots
• Encryption
• Access control
• Monitoring
• Scaling

Search remains a derived system.

Provide recovery from search loss through reindexing from authoritative data.

────────────────────────────────────────

S3

Configure storage architecture for:

• Product media
• Seller media
• Store assets
• Review media
• Documents
• Reports
• Backups
• Temporary uploads

Support:

• Versioning
• Encryption
• Lifecycle rules
• Private access
• IAM policies
• Replication
• Cleanup

Keep private objects private.

────────────────────────────────────────

CLOUDFRONT

Configure CDN architecture.

Support:

• S3 origins
• Static assets
• Product media
• Review media
• Protected content
• TLS
• Cache policies
• Signed URLs where required
• Origin protection

Optimize cache behavior for:

• Immutable media
• Public assets
• Short-lived content

────────────────────────────────────────

ROUTE 53

Configure:

• Public DNS
• Private DNS where appropriate
• Health checks
• Failover routing
• Latency-based routing
• Weighted routing where appropriate

Prepare for multi-region application routing.

────────────────────────────────────────

ACM

Configure certificate management.

Support:

• Public certificates
• CloudFront
• Load balancers
• Automatic renewal
• Region-specific certificates where required

Avoid manual certificate management.

────────────────────────────────────────

SECRETS

Implement secret-management infrastructure.

Manage:

• Database credentials
• Redis credentials
• Kafka credentials
• Stripe secrets
• Stripe webhook secrets
• OAuth secrets
• S3-related credentials where required
• Email provider credentials
• Push-provider credentials

Support:

• Environment separation
• Rotation
• IAM access control
• Audit

Never commit secrets.

────────────────────────────────────────

BACKUPS

Design backup infrastructure for:

• PostgreSQL
• S3
• Redis where supported
• Kafka configuration
• Search snapshots
• Terraform state
• Critical configuration

Define:

• Retention
• Encryption
• Cross-region replication
• Restore verification

────────────────────────────────────────

OBSERVABILITY FOUNDATION

Deploy infrastructure for:

• Prometheus
• Grafana
• Loki
• Tempo
• OpenTelemetry

Monitor:

• EKS
• Nodes
• Pods
• API services
• Workers
• PostgreSQL
• Redis
• Kafka
• OpenSearch
• S3
• CloudFront
• Load balancers

────────────────────────────────────────

LOGGING FOUNDATION

Implement centralized logging.

Support:

• Structured JSON
• Loki
• Trace IDs
• Correlation IDs
• Request IDs
• Retention
• Sensitive-data filtering

Never store:

• Passwords
• API keys
• Payment credentials
• Private keys
• Tokens
• Secrets

────────────────────────────────────────

ALERTING FOUNDATION

Create alerts for:

• CPU
• Memory
• Disk
• Node failure
• Pod failure
• API latency
• API error rates
• Database health
• Redis health
• Kafka health
• Search health
• Queue backlog
• Backup failures
• Certificate expiration
• Storage failures

Define:

• Warning
• Critical
• Emergency

────────────────────────────────────────

WAF

Create WAF-ready architecture.

Support:

• Rate limiting
• IP filtering
• Bot protection
• OWASP protections
• Request-size restrictions
• DDoS integration

Application-level authentication and authorization remain mandatory.

────────────────────────────────────────

DISASTER RECOVERY FOUNDATION

Prepare infrastructure for:

• Availability-zone failure
• Database failure
• Redis failure
• Kafka failure
• Search failure
• Kubernetes failure
• Region failure
• S3 failure

Define:

• Recovery process
• Backup dependency
• Infrastructure reconstruction
• Regional recovery

────────────────────────────────────────

COST OPTIMIZATION FOUNDATION

Design:

• Autoscaling
• Right-sizing
• Reserved capacity strategy
• Savings Plans
• Spot strategy for safe batch workloads
• S3 lifecycle
• CDN caching
• Log retention
• Search sizing
• Database sizing

Do not sacrifice critical reliability for cost savings.

────────────────────────────────────────

INFRASTRUCTURE TESTING

Define and implement infrastructure tests for:

• Terraform formatting
• Terraform validation
• Terraform plan
• Module tests where appropriate
• Helm validation
• Kubernetes validation
• Docker image scanning
• IAM validation
• Network validation
• Backup validation
• Smoke tests

────────────────────────────────────────

DOCUMENTATION

Generate:

• AWS infrastructure architecture
• Account strategy
• Environment strategy
• Network architecture
• Terraform organization
• Kubernetes foundation
• Docker development guide
• ECR guide
• PostgreSQL infrastructure guide
• Redis guide
• Kafka guide
• Search infrastructure guide
• S3 guide
• CloudFront guide
• DNS guide
• Secrets guide
• Backup guide
• Monitoring guide
• Disaster recovery foundation

────────────────────────────────────────

PROJECT INDEX

Maintain the infrastructure Project Index.

Track:

• AWS accounts
• Regions
• VPCs
• Subnets
• Security groups
• IAM roles
• KMS keys
• EKS clusters
• Node groups
• Namespaces
• Terraform modules
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
• Secrets
• Monitoring
• Logging
• Backups
• Generated files
• Remaining work
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

INFRASTRUCTURE MILESTONE 1

Terraform foundation, providers, remote state, environments, naming, tagging, and shared modules.

INFRASTRUCTURE MILESTONE 2

AWS networking, VPC, subnets, routing, NAT, security groups, NACLs, and VPC endpoints.

INFRASTRUCTURE MILESTONE 3

IAM, OIDC, workload identity, KMS, ECR, and secrets foundations.

INFRASTRUCTURE MILESTONE 4

EKS cluster, node groups, namespaces, RBAC, autoscaling, resource governance, and NetworkPolicies.

INFRASTRUCTURE MILESTONE 5

PostgreSQL production infrastructure and connection/backup architecture.

INFRASTRUCTURE MILESTONE 6

Redis, Kafka/Redpanda, and OpenSearch infrastructure.

INFRASTRUCTURE MILESTONE 7

S3, CloudFront, Route 53, ACM, WAF, and media/static-delivery infrastructure.

INFRASTRUCTURE MILESTONE 8

Dockerfiles, Docker Compose, local development infrastructure, and container-security foundation.

INFRASTRUCTURE MILESTONE 9

Prometheus, Grafana, Loki, Tempo, OpenTelemetry, logging, and alerting foundation.

INFRASTRUCTURE MILESTONE 10

Backup, disaster-recovery foundation, infrastructure testing, documentation, and production-readiness foundation.

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

This volume covers infrastructure foundations:

• AWS
• Terraform
• Networking
• IAM
• KMS
• EKS
• Kubernetes foundations
• Docker
• ECR
• PostgreSQL infrastructure
• Redis infrastructure
• Kafka/Redpanda infrastructure
• OpenSearch infrastructure
• S3
• CloudFront
• Route 53
• ACM
• WAF foundations
• Secrets management
• Monitoring foundation
• Logging foundation
• Backups
• Disaster-recovery foundation
• Local development infrastructure

Do not implement:

• Backend business logic
• Frontend code
• Mobile code
• Application-level APIs
• Application-level domain logic

────────────────────────────────────────

QUALITY BAR

Treat the infrastructure as the foundation for a globally distributed enterprise ecommerce marketplace.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• High checkout traffic
• High inventory throughput
• Large search workloads
• Large media traffic
• Large analytics workloads
• Multi-region deployment
• High availability
• Zero-downtime operations
• Strict security requirements

Prioritize:

• Security
• Availability
• Scalability
• Reliability
• Observability
• Recoverability
• Cost efficiency
• Operational simplicity
• Production readiness
