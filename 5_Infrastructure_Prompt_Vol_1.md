# Amazon Ecommerce Marketplace — Infrastructure Prompt — Volume 1

## Production AWS Foundation, Networking, Data Services, Storage, Messaging, Containers, Secrets, and Deployment

You are implementing the production infrastructure foundation for an original, production-grade Amazon-style ecommerce marketplace.

This prompt is fully standalone. It must be executable without requiring any other prompt, architecture document, previous conversation, or previously generated document to be present.

The actual repository is the source of truth for the existing application, infrastructure, contracts, configuration, deployment structure, and implementation state.

Your responsibility is to build the infrastructure required to run the marketplace reliably in development, staging, and production environments.

Do not create a separate platform or competing infrastructure architecture.

---

# 1. Mission

Implement the production cloud foundation using AWS and infrastructure-as-code.

The infrastructure must support:

* Next.js web application
* React Native/Expo mobile application
* NestJS backend
* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* S3
* CloudFront
* BullMQ
* Kafka/Redpanda where actually required
* REST APIs
* Webhooks
* SSE
* background workers
* scheduled jobs
* Stripe integration
* notifications
* search indexing
* media processing
* CI/CD
* secrets management
* secure networking
* production deployments

Preferred infrastructure technologies:

* AWS
* Terraform or OpenTofu
* Docker
* Kubernetes/EKS where justified by the repository's architecture and operational requirements
* GitHub Actions or the repository's existing CI/CD system

Do not introduce Kubernetes merely for complexity. If the existing architecture can be deployed more safely with managed AWS services, evaluate that approach and use the most appropriate production architecture.

---

# 2. Repository-First Audit

Before creating or modifying infrastructure:

1. Inspect the entire repository.
2. Identify existing:

   * Dockerfiles
   * Docker Compose files
   * Terraform/OpenTofu
   * Kubernetes manifests
   * Helm charts
   * CI/CD workflows
   * environment files
   * deployment scripts
   * package scripts
   * database migration scripts
   * backend configuration
   * frontend configuration
   * worker configuration
   * search configuration
   * Redis configuration
   * storage configuration
   * observability configuration
3. Determine what infrastructure already exists.
4. Determine which components are already deployable.
5. Reuse compatible infrastructure.
6. Do not create duplicate resources or competing deployment mechanisms.
7. Preserve backward compatibility.
8. Make the smallest safe infrastructure changes necessary.

The repository is the source of truth for current infrastructure state.

---

# 3. Infrastructure Principles

Implement infrastructure according to these principles:

* Infrastructure as code.
* Immutable and reproducible deployments.
* Environment isolation.
* Least privilege.
* Secure defaults.
* Private networking for internal services.
* Managed AWS services where operationally appropriate.
* Encryption at rest and in transit.
* Secrets never committed to source control.
* No hardcoded production credentials.
* Explicit dependencies.
* Safe migrations.
* Repeatable deployments.
* Controlled blast radius.
* Horizontal scalability.
* Health-based deployment.
* Graceful shutdown.
* Observability-ready infrastructure.
* Disaster recovery readiness.

---

# 4. Environment Strategy

Support clear environment separation.

At minimum establish a strategy for:

* development
* staging
* production

Each environment must have isolated:

* databases
* Redis
* search indexes/clusters where appropriate
* storage paths/buckets
* secrets
* queues
* event infrastructure
* application configuration

Do not accidentally allow staging applications to access production data.

Do not reuse production credentials in development.

---

# 5. AWS Account and Region Strategy

Define infrastructure assumptions for:

* AWS account boundaries
* region
* availability zones
* environment separation
* resource naming
* tagging
* ownership
* cost allocation

Use variables rather than hardcoding environment-specific values.

Resources should have consistent tags such as:

* project
* environment
* service
* owner
* managed-by
* cost-center where applicable

Do not hardcode assumptions that prevent future multi-region expansion.

---

# 6. Terraform/OpenTofu Structure

Implement a maintainable infrastructure-as-code structure.

Separate reusable components/modules for appropriate resources such as:

* networking
* IAM
* compute
* database
* Redis
* search
* S3
* CloudFront
* queues
* event infrastructure
* secrets
* monitoring foundations
* DNS
* certificates

Separate environment configuration from reusable modules.

Avoid enormous monolithic infrastructure files.

Avoid copy-pasting entire environments.

Use variables, locals, modules, outputs, and dependency relationships appropriately.

---

# 7. State Management

Configure secure infrastructure state management.

Where applicable use:

* encrypted remote state
* state locking
* restricted access
* versioning
* backups/recovery

Do not store infrastructure state in an unsafe shared local file for production.

Do not expose secrets through state unnecessarily.

Review Terraform/OpenTofu resource attributes that could place sensitive values into state.

---

# 8. VPC Architecture

Implement a production VPC.

Use multiple Availability Zones.

Define appropriate:

* VPC CIDR
* public subnets
* private application subnets
* private data subnets
* route tables
* internet gateway
* NAT strategy
* security groups
* network ACL strategy where justified

Internal application and data services should not be publicly exposed unnecessarily.

Prefer private connectivity for:

* PostgreSQL
* Redis
* OpenSearch
* Kafka/Redpanda
* internal workers

---

# 9. Network Security

Implement least-privilege network access.

Security groups must permit only required communication.

Examples:

* Load balancer → backend
* Backend → PostgreSQL
* Backend → Redis
* Backend → OpenSearch
* Workers → required data services
* Backend/workers → S3
* Backend → external providers through controlled egress

Do not use broad:

* `0.0.0.0/0`
* all ports
* unrestricted internal access

unless genuinely required and explicitly justified.

---

# 10. DNS and TLS

Where the repository uses a production domain:

Implement infrastructure for:

* Route 53
* DNS records
* ACM certificates
* HTTPS
* certificate validation
* domain routing

All production customer-facing traffic must use TLS.

Redirect insecure HTTP where appropriate.

Do not disable certificate validation.

---

# 11. Edge and Load Balancing

Implement appropriate AWS edge/load-balancing architecture.

For backend APIs, use an appropriate managed load balancer/API gateway strategy.

Support:

* TLS termination
* health checks
* connection management
* routing
* request limits where appropriate
* multiple backend instances
* graceful deployment behavior

For web applications, use the deployment model compatible with the actual Next.js application.

Do not force static hosting if the application requires server-side rendering.

---

# 12. Backend Containerization

Create or improve production-grade Docker configuration for the NestJS backend.

Requirements:

* multi-stage builds
* minimal runtime image
* non-root execution where compatible
* deterministic dependency installation
* production-only dependencies where appropriate
* health check strategy
* graceful shutdown
* environment-based configuration
* no secrets in image layers

Do not copy:

* `.env` secrets
* credentials
* local development artifacts
* unnecessary source files

into production images.

---

# 13. Worker Containerization

Support separate worker deployment for workloads such as:

* BullMQ
* media processing
* search indexing
* notifications
* reconciliation
* scheduled jobs

Workers must be independently scalable where justified.

Do not run heavy background workloads inside the API process if the repository architecture separates workers.

Workers must support:

* graceful shutdown
* concurrency configuration
* health checks
* retry behavior
* structured logging
* resource limits

---

# 14. Compute Platform

Evaluate the repository's actual requirements and deploy backend/worker workloads using the most appropriate AWS compute architecture.

Potential options include:

* ECS/Fargate
* EKS
* EC2
* Lambda for narrowly suitable workloads

If Kubernetes/EKS is used:

Implement production-grade:

* namespaces
* deployments
* services
* ingress/load balancing
* resource requests/limits
* readiness probes
* liveness probes
* pod disruption strategy
* autoscaling foundations
* secrets integration
* rolling deployments
* graceful termination

Do not introduce Kubernetes complexity without operational justification.

---

# 15. PostgreSQL

Implement production PostgreSQL infrastructure.

Preferred AWS service:

* Amazon RDS PostgreSQL or Aurora PostgreSQL when justified.

Support:

* Multi-AZ where appropriate
* encryption at rest
* encryption in transit
* backups
* automated backup retention
* maintenance windows
* parameter configuration
* monitoring
* private networking
* security groups
* deletion protection for production

Do not expose PostgreSQL publicly.

---

# 16. Database Connectivity

Configure the backend for reliable PostgreSQL connectivity.

Support:

* connection pooling
* connection limits
* timeouts
* retry strategy where appropriate
* graceful shutdown
* migration execution strategy

Do not run destructive database migrations automatically as an unsafe side effect of every application startup.

Production migrations must have controlled deployment behavior.

---

# 17. Prisma Migrations

Infrastructure must support safe Prisma migration deployment.

Ensure:

* migration files are version-controlled
* migration execution is deterministic
* production migration runs exactly once
* migrations happen before application versions requiring them
* failed migrations stop unsafe deployment progression
* backward-compatible migration patterns are possible

Do not use `prisma db push` as the production schema-management strategy.

---

# 18. Redis

Implement managed Redis using an appropriate AWS service such as ElastiCache/Valkey where compatible with the repository.

Redis must support the application's actual uses:

* caching
* rate limiting
* ephemeral state
* counters
* coordination
* presence
* BullMQ

Support:

* private networking
* encryption
* authentication
* backups where appropriate
* monitoring
* failover/high availability where required

Redis must not become the authoritative source for durable commerce data.

---

# 19. Redis Reliability

Infrastructure must account for Redis failure.

The application must be able to distinguish:

* critical database failure
* cache failure
* queue failure
* temporary Redis unavailability

Do not make nonessential caching failures take down core commerce functionality unless the specific operation genuinely depends on Redis.

BullMQ workloads must have appropriate recovery behavior.

---

# 20. Search Infrastructure

Implement Elasticsearch/OpenSearch infrastructure according to the actual repository implementation.

Support:

* private networking
* encryption at rest
* encryption in transit
* access control
* appropriate node sizing
* monitoring
* index lifecycle strategy
* backup strategy where appropriate

Search remains a projection.

PostgreSQL remains authoritative.

Do not make checkout or order creation depend on search availability.

---

# 21. Search Index Deployment

Infrastructure must support:

* versioned indexes
* aliases
* zero-downtime index migration
* reindex jobs
* worker access
* administrative reindex operations

Do not destroy the active search index simply because a new deployment is being applied.

---

# 22. Object Storage

Implement secure S3 infrastructure for:

* product media
* review media
* processed media
* thumbnails
* exports where actually required
* operational artifacts where justified

Use:

* encryption
* private buckets
* versioning where appropriate
* lifecycle policies
* access logging where justified
* least-privilege IAM

Do not make product/media buckets publicly writable.

---

# 23. S3 Security

Applications should access S3 through:

* IAM roles
* controlled presigned URLs
* appropriate CloudFront mechanisms

Never embed AWS access keys in:

* mobile application
* web application
* Docker images
* Git repository

Uploaded content must be treated as untrusted.

---

# 24. CloudFront

Configure CloudFront where appropriate for:

* product media
* processed media
* public web assets
* static content

Support:

* HTTPS
* caching
* cache invalidation strategy
* origin protection
* secure headers where appropriate
* controlled access to private content

Do not expose private S3 objects directly if CloudFront is intended to be the controlled distribution layer.

---

# 25. Media Processing

Infrastructure must support background media processing where the application requires it.

Potential workloads include:

* image resizing
* thumbnail generation
* format conversion
* validation
* metadata extraction

If FFmpeg or other processing tools exist in the repository, provide appropriate worker/container infrastructure.

Do not process arbitrary uploaded media inside the API request path when asynchronous processing is more appropriate.

---

# 26. BullMQ

Provide production infrastructure for BullMQ.

Support queues required by the actual repository, potentially including:

* media processing
* search indexing
* notifications
* payment reconciliation
* inventory expiration
* checkout expiration
* fulfillment
* returns

Each queue must have:

* controlled concurrency
* retry configuration
* backoff
* timeout
* dead-letter strategy where implemented
* monitoring
* idempotency

Do not create queues for functionality that does not exist.

---

# 27. Kafka/Redpanda

If the actual repository uses Kafka/Redpanda for domain events, provide production infrastructure for it.

Use a managed AWS-compatible option where appropriate, or deploy the existing technology using a justified architecture.

Support:

* authentication
* encryption
* topic provisioning
* partitions
* replication
* retention
* consumer access
* monitoring

Do not create Kafka merely because it is listed as a possible technology if the current implementation does not require it.

---

# 28. Event Infrastructure

Infrastructure must support the application's event architecture.

Ensure:

* durable event delivery
* at-least-once semantics
* consumer retry
* dead-letter/recovery behavior
* replay where supported
* monitoring
* controlled access

Transactional outbox events must not be lost because application deployment occurs.

---

# 29. Secrets Management

Use AWS Secrets Manager and/or AWS Systems Manager Parameter Store as appropriate.

Store sensitive values such as:

* database credentials
* Redis credentials
* JWT signing secrets
* Stripe secret keys
* webhook secrets
* email provider credentials
* push provider credentials
* search credentials

Never store secrets in:

* Git
* Dockerfiles
* Terraform source
* frontend bundles
* mobile builds
* Kubernetes manifests committed with plaintext secrets

Infrastructure code should reference secret locations rather than embed values.

---

# 30. IAM

Implement least-privilege IAM.

Separate roles for:

* backend
* workers
* CI/CD
* media processing
* search workers
* notification workers
* infrastructure deployment

Examples:

Backend should not automatically have unrestricted:

* S3 access
* Secrets Manager access
* database administration
* infrastructure modification

Grant only required permissions.

---

# 31. CI/CD Foundation

Implement or improve CI/CD.

Pipeline stages should include appropriate:

1. Dependency installation.
2. Lint.
3. Type checking.
4. Unit tests.
5. Integration tests where practical.
6. Build.
7. Container image creation.
8. Image vulnerability/security scanning where configured.
9. Infrastructure validation.
10. Deployment.
11. Health validation.
12. Rollback strategy.

Do not deploy if required quality gates fail.

---

# 32. Container Registry

Use Amazon ECR or the repository's existing registry.

Support:

* immutable or controlled image tags
* vulnerability scanning where available
* lifecycle policies
* least-privilege access
* retention strategy

Avoid using `latest` as the only production deployment identifier.

Prefer immutable commit/version identifiers.

---

# 33. Deployment Strategy

Implement safe deployment behavior.

Depending on the compute platform, support:

* rolling deployments
* blue/green deployments
* canary where justified

Deployments must verify:

* health
* readiness
* application startup
* database compatibility
* critical dependencies

Do not immediately terminate the previous version before the new version is healthy.

---

# 34. Environment Configuration

Separate:

* build-time configuration
* runtime configuration
* public client configuration
* private server configuration

Web/mobile public configuration must never contain secrets.

Backend/worker secrets must be injected at runtime.

Do not commit production `.env` files.

---

# 35. Health Checks

Implement infrastructure health checks for:

* API
* workers where appropriate
* database connectivity
* Redis connectivity
* search connectivity
* queue dependencies

Distinguish:

* liveness
* readiness

A service should not receive traffic if it cannot safely process requests.

Avoid health checks that perform expensive operations.

---

# 36. Graceful Shutdown

Infrastructure must support graceful application shutdown.

Backend:

* stop accepting new requests
* finish safe in-flight work
* close connections
* close Redis
* close queue consumers
* close database
* terminate cleanly

Workers:

* stop accepting new jobs
* finish or safely release current jobs
* close queue connections
* terminate cleanly

Configure appropriate termination grace periods.

---

# 37. Autoscaling Foundation

Prepare the platform for horizontal scaling.

Scale based on appropriate signals such as:

* CPU
* memory
* request count
* queue depth
* latency
* worker concurrency

Do not scale solely on CPU when queue depth is the actual bottleneck.

Ensure application instances remain stateless where appropriate.

---

# 38. Background Worker Scaling

Workers should scale independently from API servers where workloads require it.

Examples:

* Search indexing spikes → scale search workers.
* Media uploads spike → scale media workers.
* Notification spikes → scale notification workers.
* Checkout expiration jobs spike → scale appropriate workers.

Avoid running all workloads through a single worker deployment.

---

# 39. Database Backup Foundation

Configure:

* automated backups
* retention
* point-in-time recovery where supported
* snapshot strategy
* deletion protection

Production database recovery must be tested later as part of disaster recovery work.

Do not assume backups are valid merely because AWS reports them as enabled.

---

# 40. Infrastructure Security

Perform a security review of infrastructure.

Check for:

* public databases
* public Redis
* unrestricted security groups
* exposed secrets
* overly broad IAM
* public S3 write permissions
* missing encryption
* missing TLS
* weak CI/CD permissions
* production/staging cross-access
* insecure container execution
* privileged containers
* unnecessary public endpoints

Fix discovered issues.

---

# 41. Cost Awareness

Infrastructure must be production-capable without blindly provisioning excessive resources.

Use:

* environment-specific sizing
* autoscaling
* lifecycle policies
* log retention
* storage lifecycle
* appropriate managed-service tiers

Do not compromise critical reliability merely to reduce cost.

Document major cost drivers.

---

# 42. Infrastructure Documentation

Create/update infrastructure documentation covering:

* AWS architecture
* environment structure
* network topology
* data services
* storage
* compute
* queues/events
* secrets
* CI/CD
* deployment process
* rollback
* database migrations
* local development
* staging
* production
* required AWS permissions
* disaster-recovery prerequisites

Documentation must reflect actual infrastructure.

---

# 43. Validation

Before considering this infrastructure unit complete, validate:

### Infrastructure

* Terraform/OpenTofu formatting
* validation
* module consistency
* dependency graph
* plan where credentials/environment permit

### Containers

* Docker build
* runtime startup
* health checks

### Backend

* production build
* migration compatibility
* environment validation

### CI/CD

* workflow syntax
* build steps
* deployment configuration

### Security

* IAM review
* network exposure review
* secret review
* container review

Do not claim successful cloud deployment unless it was actually performed.

---

# 44. Local Development

Maintain a practical local-development environment.

Where appropriate support:

* PostgreSQL
* Redis
* OpenSearch/Elasticsearch
* Kafka/Redpanda
* application backend
* workers

Use Docker Compose or the repository's existing local infrastructure.

Do not require developers to provision production AWS infrastructure merely to run basic development.

---

# 45. Production vs Local Infrastructure

Clearly distinguish:

### Local

* disposable services
* development credentials
* local containers
* debug tooling

### Staging

* production-like configuration
* isolated data
* controlled secrets
* realistic deployment

### Production

* secure networking
* managed services
* backups
* encryption
* high availability
* least privilege
* monitoring
* controlled deployments

Never allow local development configuration to silently target production.

---

# 46. Non-Functional Requirements

Infrastructure must support:

* horizontal scaling
* fault isolation
* secure networking
* high availability where justified
* deployment without unnecessary downtime
* observability integration
* controlled failure
* recoverability
* safe migrations
* secret rotation
* operational maintenance

---

# 47. Explicit Scope Boundaries

This infrastructure unit establishes the foundation.

Do not pretend to complete advanced operational infrastructure that belongs in the next infrastructure unit, including:

* complete observability platform
* comprehensive Prometheus/Grafana/Loki/Tempo deployment
* advanced alerting
* full disaster recovery exercises
* multi-region active-active deployment
* advanced WAF rules
* complete incident-response automation
* sophisticated autoscaling policies
* advanced cost optimization
* chaos engineering
* complete production runbooks
* final security/compliance hardening

Implement the foundation necessary for those capabilities without falsely claiming they are complete.

---

# 48. Non-Negotiable Rules

You must:

* Inspect the repository first.
* Reuse existing infrastructure.
* Use infrastructure as code.
* Protect production resources.
* Separate environments.
* Use least-privilege IAM.
* Keep databases private.
* Encrypt sensitive data.
* Use TLS.
* Keep secrets outside source control.
* Build reproducible containers.
* Support safe deployments.
* Support graceful shutdown.
* Support database migrations safely.
* Provide backups.
* Validate infrastructure configuration.
* Document actual infrastructure.
* Report only verified implementation state.

You must NOT:

* Hardcode production credentials.
* Commit secrets.
* Create public databases.
* Create unrestricted security groups.
* Give applications administrator permissions unnecessarily.
* Expose private S3 buckets.
* Put AWS credentials in mobile/web applications.
* Use `prisma db push` for production migrations.
* Deploy unversioned production images as the only strategy.
* Destroy active production resources during normal deployment.
* Create duplicate infrastructure architectures.
* Invent AWS capabilities.
* Claim a deployment succeeded without actually deploying.
* Claim infrastructure is highly available without configuring the required resources.
* Leave TODO/FIXME infrastructure placeholders.
* Suppress infrastructure validation failures.

---

# 49. Final Infrastructure Report

After implementation, provide a factual report based only on actual repository state.

Include:

1. Infrastructure files created.
2. Infrastructure files modified.
3. AWS architecture implemented.
4. Environment strategy.
5. VPC/networking.
6. DNS/TLS.
7. Compute platform.
8. Backend deployment.
9. Worker deployment.
10. PostgreSQL infrastructure.
11. Redis infrastructure.
12. Search infrastructure.
13. S3/CloudFront.
14. BullMQ infrastructure.
15. Kafka/Redpanda infrastructure if actually used.
16. IAM roles and permissions.
17. Secrets management.
18. Container registry.
19. CI/CD.
20. Database migration strategy.
21. Backup configuration.
22. Local-development infrastructure.
23. Security controls implemented.
24. Validation commands executed and actual results.
25. Cloud resources actually provisioned, if deployment was performed.
26. Infrastructure that remains intentionally incomplete for the next operational-hardening phase.
27. Any environment-dependent limitations.

Do not claim cloud resources were created unless they were actually provisioned.

The final repository must contain a coherent, reproducible, secure production infrastructure foundation for the ecommerce marketplace.
