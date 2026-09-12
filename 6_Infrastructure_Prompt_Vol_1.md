# AMAZON ECOMMERCE PLATFORM — INFRASTRUCTURE VOLUME 1 IMPLEMENTATION PROMPT

# ROLE

Act as a complete senior infrastructure and platform engineering organization responsible for implementing the production infrastructure for a large-scale, globally distributed Amazon-style ecommerce marketplace.

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

Do not act as a teacher, consultant, or tutorial writer.

Implement the infrastructure directly in the repository.

The objective is to produce production-grade, secure, scalable, observable, highly available, automated infrastructure suitable for a funded startup operating a global ecommerce marketplace at large scale.

---

# PROJECT

Build and productionize the infrastructure for an Amazon-scale ecommerce marketplace supporting:

* Millions of customers
* Thousands of sellers
* Millions of products and variants
* High-volume catalog traffic
* High-volume search traffic
* High-volume checkout and order processing
* Seller inventory management
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
* Search indexing
* Analytics
* Auditing
* Real-time operational updates

The infrastructure must support customer-facing web applications, mobile applications, backend services, asynchronous workers, scheduled jobs, databases, search infrastructure, object storage, CDN delivery, observability, CI/CD, security controls, backups, disaster recovery, and operational tooling.

The resulting infrastructure must be suitable for continuous deployment and long-term operation.

---

# PRIMARY USERS

The platform serves:

* Customers
* Sellers
* Seller staff
* Administrators
* Moderators
* Operations teams
* Support teams
* Engineering teams
* Security teams
* Site reliability teams
* Data and analytics teams

Infrastructure must enforce strong separation of application responsibilities, environments, credentials, permissions, and operational access.

---

# TECHNOLOGY DIRECTION

Use the following infrastructure direction unless the repository already contains a compatible implementation that should be preserved.

## CLOUD

Primary cloud:

* AWS

Use managed AWS services where they materially improve reliability, security, scalability, operational simplicity, or disaster recovery.

Design infrastructure so that provider-specific services are isolated behind clear infrastructure modules where practical.

## CONTAINERIZATION

Use:

* Docker
* Multi-stage builds
* Minimal production images
* Non-root containers
* Deterministic dependency installation
* Health checks
* Explicit runtime configuration
* Secure image construction
* Image vulnerability scanning

## ORCHESTRATION

Use:

* Kubernetes
* Helm
* Kubernetes-native deployment primitives
* Horizontal Pod Autoscaling
* Pod disruption controls
* Readiness probes
* Liveness probes
* Startup probes
* Resource requests and limits
* ConfigMaps where appropriate
* Secrets through secure secret-management integration
* Network policies where supported
* Service accounts with least privilege

Use Amazon EKS or the repository's established compatible Kubernetes platform when appropriate.

## INFRASTRUCTURE AS CODE

Use:

* Terraform

Infrastructure must be reproducible and version-controlled.

Avoid manual infrastructure configuration wherever practical.

## CI/CD

Use:

* GitHub Actions

CI/CD must support:

* Validation
* Testing
* Static analysis
* Security scanning
* Container image building
* Image scanning
* Artifact management
* Terraform validation
* Terraform plan
* Controlled Terraform apply
* Helm validation
* Kubernetes manifest validation
* Deployment automation
* Environment promotion
* Deployment verification

## DATABASE

Primary transactional database:

* PostgreSQL
* Managed PostgreSQL where appropriate, such as Amazon RDS or Aurora PostgreSQL

Database infrastructure must support:

* High availability
* Automated backups
* Point-in-time recovery
* Encryption
* Monitoring
* Connection management
* Maintenance planning
* Scaling strategy
* Disaster recovery

## CACHE AND EPHEMERAL DATA

Use:

* Redis
* Managed Redis-compatible infrastructure where appropriate, such as Amazon ElastiCache

Redis must never become the authoritative source for durable transactional business data.

## SEARCH

Use:

* Elasticsearch or OpenSearch
* Managed OpenSearch where appropriate

Search infrastructure is derived infrastructure and must be reconstructable from authoritative application data.

## OBJECT STORAGE

Use:

* Amazon S3

Store:

* Product media
* Seller media
* Customer-uploaded media
* Generated media variants
* Catalog import files
* Export files
* Operational artifacts where appropriate
* Backup-related objects where appropriate

Use secure bucket policies, encryption, lifecycle policies, controlled access, and signed URLs.

## CDN

Use:

* CloudFront

Support secure and highly cacheable delivery of public and authorized media where appropriate.

## ASYNCHRONOUS PROCESSING

Use:

* BullMQ
* Redis
* Kafka or an equivalent durable event infrastructure where required by the repository architecture

Infrastructure must support:

* Background workers
* Scheduled jobs
* Retries
* Dead-letter handling
* Concurrency control
* Recovery
* Monitoring
* Horizontal scaling

## OBSERVABILITY

Use:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* CloudWatch

Support:

* Metrics
* Logs
* Distributed traces
* Application telemetry
* Infrastructure telemetry
* Kubernetes telemetry
* Database telemetry
* Queue telemetry
* Search telemetry
* Alerting

## SECRETS

Use:

* AWS Secrets Manager
* AWS Systems Manager Parameter Store where appropriate
* Vault if the repository architecture already requires it

Never commit secrets to source control.

---

# SOURCE OF TRUTH

The repository is the authoritative source of truth for the current implementation state.

Before modifying anything:

1. Inspect the repository.
2. Determine the actual repository structure.
3. Identify existing applications and services.
4. Identify existing infrastructure.
5. Identify Terraform modules.
6. Identify Kubernetes manifests.
7. Identify Helm charts.
8. Identify Dockerfiles.
9. Identify CI/CD workflows.
10. Identify environment configuration.
11. Identify existing deployment conventions.
12. Identify existing observability configuration.
13. Identify existing database infrastructure.
14. Identify existing Redis infrastructure.
15. Identify existing search infrastructure.
16. Identify existing object-storage configuration.
17. Identify existing secrets management.
18. Identify existing scripts and developer tooling.
19. Identify existing documentation.
20. Identify infrastructure that is already correct and reusable.

Do not replace functioning infrastructure merely to introduce a different style.

Preserve compatible existing implementation.

Repository state takes precedence over assumptions.

---

# IMPLEMENTATION SCOPE

Implement the foundational cloud and platform infrastructure required for the Amazon Ecommerce platform.

This volume establishes the infrastructure foundation required to run the platform reliably across isolated environments.

Implement the following major areas:

1. Cloud environment architecture
2. AWS account and environment topology
3. Terraform architecture
4. Remote Terraform state
5. Networking
6. VPC architecture
7. Availability zones
8. Public and private subnets
9. Routing
10. NAT strategy
11. Internet gateways
12. VPC endpoints where appropriate
13. Security groups
14. Network-level security
15. IAM architecture
16. Workload identities
17. Kubernetes/EKS foundation
18. Kubernetes namespaces
19. Cluster networking
20. Node architecture
21. Workload scheduling foundations
22. Container registry
23. Docker productionization
24. Helm foundations
25. Ingress/load balancing
26. TLS foundations
27. Service discovery
28. Autoscaling foundations
29. PostgreSQL infrastructure
30. Redis infrastructure
31. Search infrastructure
32. S3 infrastructure
33. CloudFront foundation
34. Queue/event infrastructure foundations
35. Secrets management
36. Configuration management
37. Observability foundation
38. Logging
39. Metrics
40. Distributed tracing
41. Basic alerting
42. CI/CD foundation
43. Environment isolation
44. Backup foundations
45. Security baseline
46. Infrastructure testing
47. Infrastructure documentation

---

# ENVIRONMENT ARCHITECTURE

Support clearly separated environments:

* Local
* Development
* Test
* Staging
* Production
* Disaster Recovery

Define environment-specific configuration without duplicating infrastructure logic unnecessarily.

Use reusable Terraform modules and environment-specific composition.

Development infrastructure must not accidentally gain production credentials or production data access.

Test environments must remain isolated from production.

Staging must provide a production-like environment suitable for deployment validation.

Production must use hardened security, availability, monitoring, backup, and operational controls.

Disaster recovery infrastructure must be designed for controlled recovery rather than being an undocumented secondary environment.

---

# AWS ACCOUNT AND RESOURCE ORGANIZATION

Design an account structure appropriate for a serious production platform.

Separate security-sensitive responsibilities where appropriate.

Consider dedicated accounts or clearly isolated environments for:

* Production
* Non-production
* Security
* Logging/observability
* Disaster recovery
* Shared infrastructure

Do not create unnecessary account complexity if the repository's current structure makes a different topology more appropriate.

Document:

* Account responsibilities
* Trust relationships
* Cross-account access
* Administrative access
* Deployment access
* Logging access
* Security boundaries
* Resource ownership
* Environment ownership

---

# TERRAFORM ARCHITECTURE

Create a maintainable Terraform architecture.

Use:

* Reusable modules
* Environment composition
* Provider configuration
* Explicit variables
* Explicit outputs
* Strong typing
* Validation
* Sensible defaults
* Resource tagging
* Lifecycle controls
* Dependency management
* Safe state handling

Avoid:

* Giant monolithic Terraform files
* Copy-pasted environments
* Hidden dependencies
* Hardcoded credentials
* Hardcoded environment-specific secrets
* Uncontrolled destructive behavior
* Unclear resource ownership

Use consistent naming and tagging.

Include tags such as:

* Application
* Environment
* ManagedBy
* Owner
* Component
* CostCenter where applicable
* DataClassification where applicable

---

# TERRAFORM STATE

Implement secure remote state management.

Support:

* Remote state storage
* State locking
* Encryption
* Restricted access
* Environment separation
* Recovery procedures

Do not store production Terraform state only on developer machines.

Document state recovery and operational procedures.

---

# NETWORK ARCHITECTURE

Implement a production-grade VPC architecture.

Support:

* Multiple availability zones
* Public subnets where required
* Private application subnets
* Private data subnets
* Route tables
* Internet gateway
* NAT strategy
* VPC endpoints where beneficial
* DNS
* Internal service communication
* Controlled outbound access

Keep databases and other sensitive data services private.

Do not expose PostgreSQL or Redis directly to the public internet.

Do not expose internal Kubernetes services unnecessarily.

---

# NETWORK SECURITY

Implement layered network controls.

Use:

* Security groups
* Network policies
* Private subnets
* Restricted ingress
* Restricted egress where practical
* Least-privilege connectivity
* Controlled administrative access

Explicitly define which components may communicate.

Examples include:

* Load balancers → application services
* Application services → PostgreSQL
* Application services → Redis
* Application services → search
* Workers → queues
* Workers → PostgreSQL
* Workers → object storage
* Applications → external payment providers
* Applications → external shipping providers

Avoid broad `0.0.0.0/0` access except where genuinely required.

---

# IAM ARCHITECTURE

Implement least-privilege IAM.

Separate:

* Human administrative access
* CI/CD access
* Kubernetes workload access
* Application service access
* Worker access
* Database administration
* Observability access
* Security access
* Backup access

Use workload identity mechanisms rather than long-lived AWS credentials inside containers.

Do not embed AWS access keys in:

* Docker images
* Kubernetes manifests
* Source code
* CI artifacts
* Terraform variables
* Repository configuration

Use short-lived credentials where supported.

---

# CONTAINER REGISTRY

Implement secure container image storage using Amazon ECR or the repository's established equivalent.

Support:

* Immutable tags where appropriate
* Vulnerability scanning
* Lifecycle policies
* Image retention
* Repository permissions
* Environment separation
* Secure CI authentication

Do not rely on mutable `latest` tags for production deployments.

Production deployment artifacts must be traceable to an immutable version or digest.

---

# DOCKER PRODUCTIONIZATION

Review and harden all relevant Dockerfiles.

Implement:

* Multi-stage builds
* Minimal runtime images
* Non-root execution
* Deterministic installs
* Production-only dependencies where appropriate
* Explicit entrypoints
* Health checks where useful
* Signal handling
* Secure filesystem behavior
* No secrets baked into images
* No unnecessary packages
* Reproducible builds

Ensure backend services and workers can run correctly under container orchestration.

---

# KUBERNETES / EKS FOUNDATION

Implement the Kubernetes platform foundation.

Support:

* EKS or repository-compatible Kubernetes infrastructure
* Multiple availability zones
* Private worker networking
* Cluster access controls
* Node groups or equivalent capacity architecture
* Pod scheduling
* Workload identities
* Namespace isolation
* Resource quotas where appropriate
* Limit ranges where appropriate
* Pod security controls
* Network policies where practical
* Cluster autoscaling
* Node lifecycle management

Avoid creating a cluster architecture that cannot scale with the application's workload.

---

# KUBERNETES NAMESPACES

Create clear namespace boundaries where appropriate.

Separate infrastructure components from application workloads.

Examples:

* ingress
* observability
* platform
* backend
* workers
* jobs

Do not create excessive namespaces without operational justification.

Document namespace ownership and deployment boundaries.

---

# HELM

Establish production-grade Helm structure.

Support:

* Reusable charts
* Environment values
* Secure defaults
* Resource configuration
* Probes
* Autoscaling
* Pod disruption budgets
* Service configuration
* Ingress configuration
* ConfigMap integration
* Secret references
* Service accounts
* Security contexts

Avoid embedding secrets directly into Helm values.

---

# INGRESS AND LOAD BALANCING

Implement secure ingress.

Support:

* AWS load balancing
* TLS termination
* HTTPS-only production traffic
* HTTP → HTTPS redirection where appropriate
* Domain routing
* Health checks
* Connection handling
* Rate limiting where appropriate
* Secure headers where applicable
* Controlled exposure of services

Only expose services that are intentionally public.

---

# TLS AND CERTIFICATES

Implement automated certificate management using AWS Certificate Manager or an appropriate equivalent.

Support:

* Production certificates
* Staging certificates
* Certificate renewal
* Secure TLS configuration
* Appropriate TLS versions
* Domain validation
* Controlled certificate access

Avoid manual certificate replacement procedures.

---

# SERVICE DISCOVERY

Implement reliable internal service discovery.

Support Kubernetes service discovery and internal DNS.

Services must communicate using stable internal service identities rather than hardcoded pod addresses.

---

# AUTOSCALING FOUNDATION

Establish scaling foundations for:

* API services
* Worker services
* Queue consumers
* Search-related workloads
* Background jobs

Use:

* Horizontal Pod Autoscaler
* Cluster autoscaling
* Resource requests/limits
* Queue-depth-driven scaling where justified
* CPU/memory scaling where appropriate
* Custom metrics where necessary

Avoid scaling solely based on CPU when workload characteristics require queue depth, request rate, latency, or business metrics.

---

# POSTGRESQL INFRASTRUCTURE

Implement managed PostgreSQL infrastructure.

Support:

* Multi-AZ high availability
* Encryption at rest
* Encryption in transit
* Automated backups
* Point-in-time recovery
* Parameter configuration
* Monitoring
* Maintenance windows
* Controlled access
* Private networking
* Connection limits
* Appropriate instance sizing
* Storage scaling strategy

Production database access must be private.

Do not expose database ports publicly.

Implement infrastructure that supports safe migrations and application deployment.

---

# REDIS INFRASTRUCTURE

Implement managed Redis-compatible infrastructure.

Support:

* High availability
* Multi-AZ where appropriate
* Encryption
* Authentication
* Private networking
* Monitoring
* Appropriate eviction policy
* Capacity planning
* Failure recovery

Redis must remain appropriate for:

* Cache
* Sessions where explicitly designed
* Rate limiting
* Distributed coordination
* BullMQ
* Ephemeral state

Never use Redis as the only durable copy of critical orders, payments, inventory, seller balances, or other authoritative transactional data.

---

# SEARCH INFRASTRUCTURE

Implement managed Elasticsearch/OpenSearch infrastructure where appropriate.

Support:

* Private networking
* Encryption
* Access control
* Appropriate node architecture
* Capacity planning
* Monitoring
* Snapshot/recovery foundations
* Index lifecycle considerations
* Secure application access

Treat search indexes as reconstructable derived data.

Document how search can be rebuilt from PostgreSQL and other authoritative sources.

---

# OBJECT STORAGE

Implement secure S3 infrastructure.

Create appropriate bucket boundaries for:

* Product media
* User-generated media
* Catalog imports
* Generated assets
* Export files
* Operational artifacts
* Backup-related data where applicable

Support:

* Encryption
* Versioning where appropriate
* Lifecycle policies
* Block public access by default
* Least-privilege bucket policies
* Access logging where required
* Retention policies
* Object ownership controls

Never make sensitive customer or seller files publicly accessible by default.

---

# MEDIA DELIVERY

Implement CloudFront foundations for media delivery.

Support:

* CDN caching
* Origin configuration
* HTTPS
* Appropriate cache policies
* Secure access to protected objects
* Signed URLs or signed cookies where required
* Cache invalidation strategy
* Origin access controls

Separate publicly cacheable assets from private assets.

---

# QUEUE AND EVENT INFRASTRUCTURE

Establish infrastructure for asynchronous processing.

Support BullMQ and Redis-based workers.

Where durable event streaming is required by the architecture, support Kafka, Amazon MSK, or an equivalent durable event infrastructure.

Infrastructure must support:

* Worker deployment
* Queue isolation
* Retry behavior
* Dead-letter handling
* Monitoring
* Queue depth metrics
* Consumer scaling
* Failure recovery

Do not allow queue failures to silently disappear.

---

# SECRETS AND CONFIGURATION

Implement secure runtime configuration.

Separate:

* Non-sensitive configuration
* Sensitive secrets
* Environment-specific configuration
* Deployment configuration

Sensitive values must be supplied through secure secret-management systems.

Never commit:

* API keys
* Database passwords
* JWT signing secrets
* Stripe secrets
* Webhook signing secrets
* AWS credentials
* Encryption keys
* Private certificates
* OAuth client secrets

Ensure secrets are excluded from logs and diagnostic output.

---

# OBSERVABILITY FOUNDATION

Implement infrastructure observability.

Support:

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo
* CloudWatch

Collect infrastructure telemetry for:

* Kubernetes
* Nodes
* Pods
* Containers
* Load balancers
* PostgreSQL
* Redis
* Search
* S3
* CloudFront
* Queues
* Event infrastructure
* CI/CD deployments
* Application services

---

# LOGGING

Implement centralized structured logging.

Logs must contain useful metadata such as:

* Timestamp
* Environment
* Service
* Component
* Severity
* Request ID
* Correlation ID
* Trace ID
* Deployment version

Never log:

* Passwords
* Access tokens
* Refresh tokens
* API keys
* Secrets
* Payment credentials
* Sensitive personal information unnecessarily

Implement appropriate retention policies.

---

# METRICS

Establish infrastructure and application-facing metrics.

At minimum support monitoring for:

* Request volume
* Error rates
* Latency
* CPU
* Memory
* Disk
* Network
* Pod restarts
* Deployment failures
* Database connections
* Database CPU
* Database storage
* Redis memory
* Redis connections
* Queue depth
* Queue failures
* Search cluster health
* Search latency
* Load balancer health
* CDN behavior
* Worker throughput

Business-critical infrastructure should have actionable alerting.

---

# DISTRIBUTED TRACING

Implement OpenTelemetry-compatible tracing foundations.

Trace propagation must work across:

* HTTP requests
* Backend services
* Database calls
* Redis calls
* Queue jobs
* Event processing
* External providers
* Worker processes

Support correlation across asynchronous workflows.

---

# ALERTING FOUNDATION

Create actionable alerts for conditions such as:

* Service unavailability
* Elevated 5xx rates
* Severe latency degradation
* Database exhaustion
* Redis exhaustion
* Queue backlog
* Queue failure
* Search degradation
* Node capacity exhaustion
* Pod crash loops
* Deployment failures
* Certificate expiration risk
* Backup failures
* Security anomalies where available

Avoid noisy alerts that cannot lead to an operational action.

---

# CI/CD FOUNDATION

Implement GitHub Actions workflows appropriate for the repository.

CI must validate:

* Formatting
* Linting
* Type checking
* Unit tests
* Integration tests where available
* Build correctness
* Docker builds
* Terraform formatting
* Terraform validation
* Terraform plan
* Helm validation
* Kubernetes manifests
* Security scans

CD must support controlled deployment into:

* Development
* Test
* Staging
* Production

Production deployment must include appropriate approval and verification controls.

---

# DEPLOYMENT SAFETY

Production deployments must support:

* Immutable artifacts
* Versioned releases
* Health verification
* Readiness checks
* Rollout monitoring
* Failure detection
* Rollback strategy
* Database migration safety
* Backward-compatible deployment sequencing

Do not design deployments that require prolonged downtime.

---

# ENVIRONMENT CONFIGURATION

Ensure configuration is environment-aware without duplicating entire infrastructure definitions.

Use clear configuration boundaries for:

* Domains
* Database endpoints
* Redis endpoints
* Search endpoints
* Bucket names
* CDN distributions
* Secrets references
* Scaling parameters
* Resource sizing
* Observability configuration
* Feature flags

Production configuration must never accidentally point at development infrastructure.

---

# BACKUP FOUNDATION

Implement backup infrastructure for critical services.

Support:

* PostgreSQL automated backups
* Point-in-time recovery
* S3 durability/versioning where applicable
* Search snapshots where appropriate
* Terraform state recovery
* Configuration recovery
* Operational documentation

Backups must be protected against accidental deletion and unauthorized access.

---

# DISASTER RECOVERY FOUNDATION

Establish the initial disaster recovery infrastructure strategy.

Document:

* Recovery boundaries
* Critical dependencies
* Recovery order
* RPO targets
* RTO targets
* Database recovery
* Object-storage recovery
* Search reconstruction
* Redis recovery
* Queue/event recovery
* Kubernetes recovery
* DNS recovery
* Secret recovery

The infrastructure must not assume that every system has the same recovery characteristics.

---

# SECURITY BASELINE

Apply infrastructure security best practices.

Implement:

* Encryption at rest
* Encryption in transit
* Least-privilege IAM
* Private data services
* Secure Kubernetes workloads
* Container scanning
* Dependency scanning
* Terraform security scanning
* Secret scanning
* Network segmentation
* Audit logging
* Restricted administrative access
* Secure CI/CD credentials
* Immutable deployment artifacts
* Secure defaults

Consider AWS-native security services where appropriate, such as:

* CloudTrail
* GuardDuty
* Security Hub
* AWS Config
* IAM Access Analyzer

Use only services that materially fit the repository and deployment architecture.

---

# COST AND RESOURCE GOVERNANCE

Implement sensible infrastructure cost controls.

Use:

* Resource tagging
* Environment separation
* Autoscaling
* Lifecycle policies
* Storage lifecycle management
* Log retention
* Appropriate instance sizing
* Non-production scaling policies

Do not sacrifice production reliability merely to minimize infrastructure cost.

---

# INFRASTRUCTURE TESTING

Implement automated validation for infrastructure.

Include where appropriate:

* Terraform formatting checks
* Terraform validation
* Terraform plan validation
* Static security analysis
* Terraform policy validation
* Docker image scanning
* Helm linting
* Kubernetes manifest validation
* Kubernetes security validation
* CI workflow validation
* Infrastructure integration tests
* Deployment smoke tests

Tests must detect configuration errors before production deployment.

---

# REPOSITORY INTEGRATION

Infrastructure must integrate with the existing repository.

Respect existing:

* Monorepo structure
* Package management
* Backend applications
* Frontend applications
* Mobile applications
* Worker services
* Shared packages
* Scripts
* Environment conventions
* Documentation
* CI/CD conventions

Do not redesign application code unless an infrastructure integration requirement makes a narrowly scoped change necessary.

When infrastructure changes require application changes, make only the minimum compatible changes necessary and document them.

---

# DOCUMENTATION

Create or update infrastructure documentation covering:

* Architecture
* Environment topology
* AWS resources
* Terraform structure
* State management
* Networking
* IAM
* Kubernetes
* Helm
* Docker
* CI/CD
* Secrets
* PostgreSQL
* Redis
* Search
* S3
* CloudFront
* Queues/events
* Observability
* Backups
* Disaster recovery
* Deployment
* Rollback
* Troubleshooting
* Local development
* Operational responsibilities

Documentation must describe the actual implemented infrastructure.

Do not document infrastructure that does not exist.

---

# IMPLEMENTATION BOUNDARIES

This volume is responsible for the foundational infrastructure platform.

Do not replace application business logic with infrastructure-specific implementations.

Do not redesign:

* Product domain logic
* Checkout business logic
* Order business logic
* Payment business rules
* Seller business rules
* Frontend UX
* Mobile UX

Infrastructure must provide the platform required for those systems to run.

Do not invent undocumented business requirements.

Do not introduce unnecessary services merely because they are available in AWS.

Every infrastructure component must have a clear operational purpose.

---

# ABSOLUTE IMPLEMENTATION RULES

The implementation must follow all of these rules:

1. Inspect the repository before making changes.
2. Treat the repository as the source of truth.
3. Reuse compatible infrastructure.
4. Do not overwrite functioning infrastructure without justification.
5. Do not create duplicate infrastructure systems unnecessarily.
6. Do not commit secrets.
7. Do not hardcode credentials.
8. Do not expose private data services publicly.
9. Do not use pseudo-code.
10. Do not use placeholders.
11. Do not add TODO or FIXME gaps.
12. Do not omit required implementations.
13. Do not say “implement similarly.”
14. Do not say “remaining configuration omitted.”
15. Do not leave unfinished infrastructure.
16. Do not create fake deployment configurations.
17. Do not create fake monitoring.
18. Do not create fake backups.
19. Do not create fake disaster recovery.
20. Do not assume infrastructure exists when it does not.
21. Make every configuration internally consistent.
22. Keep Terraform modules reusable.
23. Keep environment configuration isolated.
24. Maintain backward compatibility.
25. Preserve existing working behavior.
26. Validate all infrastructure changes.
27. Update documentation.
28. Ensure infrastructure can actually be deployed.
29. Ensure security controls are enforceable.
30. Ensure observability is operationally useful.

---

# PRODUCTION EXPECTATIONS

The infrastructure must be designed for:

* High availability
* Horizontal scalability
* Multi-AZ operation
* Zero or minimal downtime deployments
* Secure operations
* Automated deployments
* Automated infrastructure provisioning
* Controlled rollbacks
* Failure recovery
* Observability
* Disaster recovery
* Continuous operation under partial failure
* Large-scale traffic
* Large background workloads
* Operational maintainability

Do not build a development-only infrastructure disguised as production infrastructure.

---

# VALIDATION AND COMPLETION

Before declaring the implementation complete:

1. Inspect all modified files.
2. Validate Terraform formatting.
3. Validate Terraform configuration.
4. Validate Terraform plans where possible.
5. Validate Helm charts.
6. Validate Kubernetes manifests.
7. Validate Docker builds.
8. Validate CI/CD workflows.
9. Run available infrastructure security scans.
10. Run relevant automated tests.
11. Verify environment boundaries.
12. Verify secrets are not committed.
13. Verify database networking.
14. Verify Redis networking.
15. Verify search networking.
16. Verify S3 access controls.
17. Verify CDN configuration.
18. Verify IAM permissions.
19. Verify Kubernetes workload identities.
20. Verify health checks.
21. Verify observability configuration.
22. Verify backup configuration.
23. Verify recovery documentation.
24. Verify deployment workflows.
25. Verify rollback mechanisms.
26. Verify documentation accuracy.

Fix discovered issues rather than merely reporting them.

Do not declare success while known implementation-breaking problems remain.

---

# IMPLEMENTATION REPORT

At completion, provide a concise but complete implementation report containing:

## FILES CREATED

List every newly created file.

## FILES MODIFIED

List every modified file.

## INFRASTRUCTURE IMPLEMENTED

Summarize the infrastructure components actually implemented.

## ENVIRONMENTS

Describe the environment topology implemented.

## SECURITY

Summarize the infrastructure security controls implemented.

## OBSERVABILITY

Summarize logging, metrics, tracing, and alerting implemented.

## CI/CD

Summarize the implemented CI/CD workflows.

## BACKUPS AND RECOVERY

Summarize backup and disaster-recovery foundations.

## VALIDATION

List the commands, checks, tests, scans, and deployment validations executed and their results.

## REMAINING ISSUES

Only report genuinely remaining issues that cannot be safely resolved within this scope.

Do not manufacture unresolved issues.

---

# FINAL DIRECTIVE

Implement this infrastructure volume directly in the repository as production-grade infrastructure.

Inspect first.

Plan carefully.

Reuse compatible existing implementation.

Implement complete infrastructure rather than examples.

Maintain compatibility with the existing Amazon Ecommerce platform.

Keep all environments isolated.

Apply security by default.

Make infrastructure reproducible.

Make deployments automated and safe.

Make systems observable.

Make failures recoverable.

Make infrastructure scalable.

Make disaster recovery practical.

Validate everything that can be validated.

Leave the repository in a coherent, deployable, production-ready infrastructure state for the scope covered by this volume.
