# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 2

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the application-runtime platform for a production-grade, globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Staff Platform Engineer
* Kubernetes Engineer
* Site Reliability Engineer
* Security Engineer
* Deployment Engineer
* Networking Engineer
* Performance Engineer
* Reliability Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the production application-runtime infrastructure required to deploy, scale, update, observe, and recover the marketplace's backend services, workers, web application, and supporting runtime components.

This is an incremental implementation task.

Do not attempt to implement infrastructure work outside the scope defined in this prompt.

---

# PROJECT

Build the production infrastructure for an original Amazon-style ecommerce marketplace serving:

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

The infrastructure must support the existing application architecture and repository state.

The repository is the source of truth for actual implemented services, ports, commands, environment variables, Docker images, and runtime assumptions.

---

# TECHNOLOGY DIRECTION

Use the existing project technology direction.

### Web

* Next.js 15
* React 19
* TypeScript

### Mobile

* React Native
* Expo
* TypeScript

### Backend

* NestJS
* TypeScript
* REST
* OpenAPI
* WebSockets and/or SSE where justified
* webhooks

### Data

* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* S3-compatible object storage
* BullMQ
* Stripe or equivalent payment-provider abstraction

### Runtime

* Docker
* Kubernetes where appropriate
* Helm where appropriate
* AWS
* Terraform or equivalent IaC

### CI/CD direction

* GitHub Actions or repository-compatible CI/CD platform

### Observability direction

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent tracing backend

Do not introduce a competing runtime platform without a concrete repository-driven reason.

---

# PRIMARY OBJECTIVE

Implement the application-runtime infrastructure layer on top of the AWS foundation already represented by the repository.

This prompt must establish a production-capable deployment platform for:

* backend APIs
* background workers
* scheduled jobs
* web applications
* internal platform services
* application configuration
* runtime secrets
* ingress
* autoscaling
* health management
* rolling deployments
* workload isolation
* resource governance

The resulting infrastructure must provide deterministic deployment behavior while preserving the architecture and contracts of the application.

Do not rebuild the network foundation unless an actual repository defect requires it.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing Dockerfiles
* existing container build commands
* package-manager configuration
* service boundaries
* application entrypoints
* backend processes
* worker processes
* scheduled jobs
* Next.js runtime requirements
* existing Kubernetes resources
* existing Helm charts
* existing deployment manifests
* existing health endpoints
* existing readiness endpoints
* existing liveness endpoints
* existing metrics endpoints
* existing OpenTelemetry configuration
* existing environment-variable conventions
* existing container ports
* existing CPU/memory assumptions
* existing scaling assumptions
* existing infrastructure modules

Do not duplicate an existing deployment system.

Do not create a second Kubernetes topology that conflicts with the repository.

Where working infrastructure already exists, improve and extend it rather than blindly replacing it.

---

# CURRENT SCOPE

Implement the application-runtime and Kubernetes platform foundation.

---

# 1. Kubernetes Platform Architecture

Establish a maintainable Kubernetes architecture for the marketplace.

The design must support separate runtime workloads for at least:

* public backend API
* background workers
* scheduled/maintenance jobs
* web application
* internal services where the repository contains them

The exact workload list must be derived from the repository.

Do not invent services that do not exist.

---

# 2. Cluster Architecture

Implement the infrastructure required for a production-capable Kubernetes cluster using the project's AWS direction.

Where EKS is the repository's selected platform, use Amazon EKS.

The cluster architecture must support:

* multiple Availability Zones
* private worker networking
* controlled ingress
* IAM-based workload identity
* autoscaling
* rolling updates
* resource isolation
* disruption controls
* secure secret access
* observability integration

Do not put ordinary application workloads on publicly addressed worker nodes unless the architecture explicitly requires it.

---

# 3. EKS Foundation

Where EKS is used, implement:

* cluster definition
* cluster IAM
* control-plane logging configuration
* node groups or equivalent compute capacity
* workload identity integration
* cluster security configuration
* endpoint-access strategy
* add-on management

Use managed AWS capabilities where they materially reduce operational risk.

Keep the cluster configuration declarative and reproducible.

---

# 4. EKS API Endpoint Security

Configure Kubernetes API access according to the repository's environment model.

Production should prefer controlled API endpoint access.

Support:

* private endpoint access where appropriate
* restricted public access where required
* administrative access through approved identity mechanisms
* no unrestricted public control-plane access merely for convenience

Document how operators authenticate to the cluster.

Do not commit kubeconfig files containing credentials.

---

# 5. Kubernetes Node Strategy

Implement a maintainable node strategy.

Support:

* general application workloads
* worker-intensive workloads where justified
* system workloads
* horizontal capacity growth
* controlled upgrades

Use node labels, taints, tolerations, and affinity rules only where justified by actual workload requirements.

Avoid unnecessary fragmentation into dozens of node groups.

---

# 6. Cluster Autoscaling Foundation

Implement the infrastructure required for Kubernetes capacity to scale automatically.

Use an appropriate AWS/Kubernetes autoscaling mechanism compatible with the selected EKS architecture.

Support:

* scale-out when workloads cannot schedule
* scale-in when capacity is unused
* protection of critical workloads
* sensible minimum capacity
* sensible maximum capacity
* environment-specific sizing

Do not configure autoscaling with unlimited capacity.

Use explicit upper bounds.

---

# 7. Kubernetes Namespaces

Create clear namespace boundaries.

At minimum distinguish workload classes appropriately, such as:

* application workloads
* platform/observability workloads
* ingress
* jobs
* system components

Do not create a namespace for every individual service unless there is a concrete security or operational reason.

Production namespace boundaries must support access-control policies.

---

# 8. Service Accounts and Workload Identity

Implement dedicated Kubernetes service accounts for workloads that require AWS access.

Use IAM Roles for Service Accounts or the current EKS-native equivalent rather than static AWS keys.

Workload permissions must be service-specific.

Examples may include:

* S3 access
* Secrets Manager access
* SQS access if used
* CloudWatch access
* observability access
* other AWS APIs actually required by the application

Do not allow every application pod to assume the same broad AWS role.

---

# 9. Kubernetes RBAC

Implement Kubernetes RBAC.

Separate:

* cluster administration
* platform administration
* deployment automation
* observability access
* application service accounts
* read-only operations

Avoid wildcard permissions where not required.

Do not bind broad cluster-admin privileges to normal application identities.

---

# 10. Container Registry

Implement AWS container registry infrastructure using ECR or the repository-compatible equivalent.

Provide repositories for actual containerized workloads.

The design must support:

* immutable image references
* vulnerability scanning
* encryption
* lifecycle policies
* repository access control
* image retention
* automated cleanup of obsolete artifacts

Do not use mutable `latest` tags as the production deployment identity.

---

# 11. Docker Image Requirements

Inspect and improve application Dockerfiles where infrastructure compatibility requires it.

Images must be:

* reproducible
* minimal
* production-oriented
* non-root where practical
* free from development-only tooling unless required
* explicit about runtime dependencies

Use multi-stage builds where appropriate.

Do not copy development secrets into images.

Do not bake environment-specific configuration into application images.

---

# 12. Image Versioning

Production deployments must identify immutable application artifacts.

Prefer:

* commit SHA
* immutable digest
* release identifier

Do not use an environment such as `production:latest` as the deployment source of truth.

Ensure rollback can select a previous immutable artifact.

---

# 13. Helm Architecture

Where Helm is used, establish a maintainable chart architecture.

Support:

* reusable base templates
* environment-specific values
* workload-specific configuration
* safe defaults
* schema validation where practical
* secret references
* resource requirements
* probes
* autoscaling
* ingress
* service configuration

Do not duplicate entire Helm charts for each environment.

---

# 14. Helm Values Design

Environment-specific differences must be explicit.

Configuration may include:

* replica counts
* resource requests
* resource limits
* autoscaling boundaries
* domains
* feature flags
* external service endpoints
* retention
* logging levels
* runtime settings

Do not store secret values directly in committed Helm values files.

---

# 15. Backend API Deployment

Create the runtime deployment configuration for the NestJS backend services present in the repository.

Support:

* multiple replicas
* rolling updates
* readiness checks
* liveness checks
* startup checks where needed
* graceful shutdown
* controlled resource consumption
* autoscaling
* service discovery
* secure environment configuration

Do not assume a single backend process if the repository already separates services.

---

# 16. Worker Deployment

Deploy background workers separately from synchronous API workloads.

Workers must support:

* independent scaling
* graceful shutdown
* queue visibility
* job completion safety
* resource isolation
* retry-aware behavior
* controlled concurrency

Do not combine API and worker processes into a single deployment merely for convenience.

---

# 17. Scheduled Jobs

Where the repository contains scheduled tasks, implement them as Kubernetes Jobs/CronJobs or the project's appropriate managed execution mechanism.

Tasks may include:

* cleanup
* reconciliation
* cache maintenance
* search maintenance
* report generation
* notification processing
* operational maintenance

Do not duplicate scheduling between application code and infrastructure.

Ensure scheduled jobs cannot accidentally execute concurrently when the job is not concurrency-safe.

---

# 18. Web Application Deployment

Create the infrastructure required to deploy the Next.js application.

Support:

* production build output
* environment configuration
* health behavior
* graceful termination
* autoscaling where appropriate
* CDN/edge integration hooks
* secure backend endpoint configuration

Do not place server-only secrets into browser-visible configuration.

Distinguish clearly between:

* server runtime variables
* public browser configuration

---

# 19. Service Discovery

Use Kubernetes service discovery for internal application communication where appropriate.

Service names must be:

* deterministic
* environment-aware
* documented
* consistent with application configuration

Do not hardcode Pod IP addresses.

Do not rely on ephemeral pod hostnames.

---

# 20. Ingress Architecture

Implement production ingress for the web application and APIs using the repository's selected AWS/Kubernetes ingress architecture.

Where applicable integrate:

* Application Load Balancer
* HTTPS
* ACM
* WAF
* health checks
* routing rules
* path-based routing where justified
* host-based routing where justified

Do not expose internal services directly to the internet.

---

# 21. TLS at Ingress

Require TLS for production public traffic.

Support:

* certificate references
* automated certificate renewal
* secure listeners
* HTTP-to-HTTPS redirection
* modern TLS policies

Do not terminate TLS and then expose sensitive internal traffic without an explicit trusted-network design.

---

# 22. Network Policies

Implement Kubernetes NetworkPolicies where supported by the selected cluster networking model.

Use them to restrict unnecessary pod-to-pod communication.

At minimum establish logical boundaries between:

* public-facing workloads
* internal services
* workers
* observability components
* stateful service clients

Do not block required application communication.

Test network-policy behavior against actual service dependencies.

---

# 23. Pod Security

Implement a production-appropriate pod security baseline.

Where supported, enforce controls such as:

* non-root execution
* restricted privilege escalation
* read-only filesystems where compatible
* dropped Linux capabilities
* seccomp
* controlled host access
* no privileged containers unless strictly required

Document any workload that genuinely cannot comply.

Do not weaken security globally to accommodate a single application.

---

# 24. Resource Requests and Limits

Define CPU and memory requests and limits for every production workload.

Do not leave critical production workloads unbounded.

Resource values must be based on:

* workload type
* observed requirements where available
* expected traffic
* environment size

Use configurable values rather than embedding production assumptions into reusable templates.

---

# 25. Horizontal Pod Autoscaling

Implement HPA where workload behavior justifies it.

Support scaling based on:

* CPU
* memory
* application metrics where appropriate

Do not enable autoscaling solely because it exists.

For queue workers, use queue depth or other meaningful workload signals where the architecture supports it.

Scaling policies must avoid oscillation and runaway capacity.

---

# 26. Pod Disruption Budgets

Define PodDisruptionBudgets for critical highly available workloads.

Ensure voluntary disruptions do not unnecessarily remove all available replicas.

Do not use PDB values that make legitimate node upgrades impossible.

---

# 27. Deployment Strategy

Production deployment strategy must support:

* rolling deployments
* readiness-gated traffic
* graceful termination
* controlled replacement
* rollback

Where risk justifies it, structure the deployment architecture so later infrastructure can support:

* canary
* blue/green
* progressive delivery

Do not implement complex traffic-shifting systems without a concrete application requirement.

---

# 28. Graceful Shutdown

Ensure application workloads receive sufficient termination time.

Support:

* SIGTERM handling
* connection draining
* worker shutdown
* in-progress request completion
* in-progress job handling
* queue consumer shutdown
* readiness removal before termination

Do not kill worker processes immediately during deployments.

---

# 29. Health Probes

Configure health probes according to actual application behavior.

Distinguish:

### Startup

Whether the process has successfully initialized.

### Readiness

Whether the instance can safely receive work.

### Liveness

Whether the process is irrecoverably unhealthy.

Do not make liveness checks depend on external services whose temporary failure should not restart the entire application.

Do not use a database-heavy liveness probe.

---

# 30. Configuration Delivery

Implement secure runtime configuration delivery.

Configuration should be delivered through:

* ConfigMaps for non-sensitive configuration
* Secrets Manager/SSM integrations for sensitive configuration
* Kubernetes Secrets only when appropriately sourced and protected

Applications must not require committed `.env.production` files.

---

# 31. Secret Injection

Where AWS Secrets Manager or Parameter Store is used, integrate Kubernetes workloads with an approved secret-access mechanism.

Avoid storing long-lived plaintext secrets directly in Git-managed manifests.

Support secret rotation without rebuilding container images.

Document how a rotated secret reaches workloads.

---

# 32. Pod Identity and AWS Access

AWS access from workloads must use temporary credentials.

Do not configure:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

as permanent Kubernetes deployment values.

Use the repository's chosen workload-identity mechanism.

---

# 33. Persistent Storage

Inspect the repository for workloads that genuinely require persistent filesystem storage.

Prefer managed AWS services for durable application state where architecture permits.

Do not introduce shared writable filesystem storage merely because a container writes files locally.

If persistent Kubernetes volumes are actually required, implement:

* StorageClass
* volume lifecycle
* encryption
* backup considerations
* access modes
* recovery expectations

---

# 34. External Stateful Services

The application architecture uses stateful systems including:

* PostgreSQL
* Redis
* search
* S3

Do not automatically deploy duplicate stateful databases inside Kubernetes.

Prefer managed AWS services when the architecture and repository support them.

Provide clean runtime configuration and network access for those services.

---

# 35. PostgreSQL Runtime Integration

Create application infrastructure integration for the managed PostgreSQL layer.

Support:

* private connectivity
* security-group access
* secret retrieval
* TLS where supported
* connection limits
* environment isolation

Do not expose PostgreSQL publicly.

Do not store database credentials in Helm values.

Do not implement application schema changes in this infrastructure prompt.

---

# 36. Redis Runtime Integration

Create application integration for the managed Redis layer.

Support:

* private connectivity
* security-group access
* TLS/authentication where supported
* separate environment resources
* worker/API connectivity

Do not expose Redis publicly.

Do not assume all Redis data is durable.

---

# 37. Search Runtime Integration

Create the infrastructure interfaces required for OpenSearch/Elasticsearch connectivity.

Support:

* private networking
* authentication
* encrypted transport
* environment separation
* runtime configuration
* access restrictions

Do not redesign search indexes or application-level indexing contracts here.

---

# 38. S3 Runtime Integration

Application workloads must access S3 using workload identity or appropriately scoped credentials.

Support separate permissions for:

* product media
* seller media
* review media
* generated assets
* operational artifacts

Do not give the entire backend unrestricted access to every bucket and prefix.

---

# 39. Queue Worker Runtime

BullMQ workers must be deployable independently.

Infrastructure must support:

* queue-specific worker replicas where justified
* configurable concurrency
* graceful job shutdown
* controlled memory
* autoscaling integration
* queue observability hooks

Do not modify the queue contract in this prompt.

---

# 40. Observability Integration Hooks

Integrate workloads with the existing observability direction.

Support:

* OpenTelemetry configuration
* metrics scraping
* structured logs
* trace export
* correlation identifiers
* Kubernetes metadata

Do not implement the entire observability platform in this prompt if it belongs to a later infrastructure volume.

Establish the correct workload-level interfaces.

---

# 41. Logging

Containers must write structured application logs in a form that the centralized logging system can ingest.

Avoid requiring application logs to persist inside container filesystems.

Do not log:

* passwords
* access tokens
* payment secrets
* raw authorization headers
* private keys
* sensitive personal data unnecessarily

---

# 42. Metrics

Where services expose metrics, make them discoverable by the infrastructure observability layer.

Support:

* service metrics
* Kubernetes workload metrics
* autoscaling metrics
* HTTP metrics
* worker metrics

Do not invent metrics endpoints that the applications do not implement.

---

# 43. Distributed Tracing

Prepare workloads for distributed tracing.

Where OpenTelemetry is already present:

* preserve service names
* preserve environment/resource metadata
* propagate trace context
* expose exporter configuration through environment/runtime configuration

Do not hardcode a single observability backend into application code.

---

# 44. Availability and Fault Isolation

Deployment topology must support failure of:

* individual pods
* individual nodes
* individual availability zones

Critical application workloads must not depend on a single pod.

Do not configure a production service to run one replica unless the workload is intentionally single-instance and the tradeoff is documented.

---

# 45. Security Context and Runtime Hardening

Production containers should use:

* minimal privileges
* non-root execution
* controlled filesystem access
* restricted capabilities
* explicit user/group IDs where practical
* no host networking unless required
* no host PID
* no host filesystem mounts unless required

Every exception must have a concrete technical justification.

---

# 46. Operational Access

Provide controlled operational access for engineers.

Support:

* authenticated Kubernetes access
* role-based permissions
* auditable access
* read-only troubleshooting
* controlled privileged operations

Do not require engineers to manually edit production pods or mutate production resources with ad-hoc shell commands.

---

# 47. Upgrade Strategy

Infrastructure must support controlled upgrades of:

* EKS
* node groups
* Kubernetes add-ons
* ingress components
* Helm releases

Do not pin critical components to obsolete versions merely to avoid maintenance.

Use explicit versions and a documented upgrade strategy.

---

# 48. Environment Profiles

Create environment profiles for:

### Development

Optimized for developer feedback while maintaining production-like architecture.

### Test

Optimized for repeatable integration and automated testing.

### Staging

Production-like topology for release validation.

### Production

High availability, strong security, autoscaling, protected deployment.

### Disaster Recovery

Recovery-oriented infrastructure compatible with the primary runtime architecture.

Do not copy production credentials into lower environments.

---

# 49. Deployment Configuration Validation

Validate:

* Helm templates
* Kubernetes manifests
* schema validity
* resource references
* service names
* ports
* ingress configuration
* environment variables
* secret references
* workload identity
* RBAC
* probes
* resource requests/limits

Use actual repository-compatible validation tools.

---

# 50. Infrastructure and Application Contract Validation

Verify that runtime configuration matches the applications.

Check:

* container ports
* startup commands
* health endpoints
* service names
* environment variables
* Redis URLs
* PostgreSQL URLs
* search endpoints
* S3 configuration
* object-storage permissions
* API base URLs
* webhook endpoints where infrastructure-owned
* OpenTelemetry configuration

Do not silently invent environment variables.

---

# 51. Out of Scope

Do not implement the following except where a small dependency is unavoidable:

* full CI/CD promotion pipelines
* complete observability platform
* complete centralized logging backend
* complete tracing backend
* full disaster-recovery failover automation
* application code redesign
* frontend feature development
* mobile feature development
* database schema redesign
* search schema redesign
* application business logic
* payment logic changes
* seller/customer authorization redesign
* fake cloud provisioning
* production credentials
* manually generated cloud resources that bypass IaC

---

# 52. Compatibility Requirements

Preserve compatibility with:

* backend APIs
* web application
* mobile clients
* PostgreSQL schema
* Prisma configuration
* Redis contracts
* BullMQ queues
* search contracts
* S3 object conventions
* authentication
* authorization
* seller isolation
* payment integrations
* webhook contracts
* event contracts

Infrastructure changes must not silently change application semantics.

---

# 53. Required Deliverables

Implement the actual repository changes required for this infrastructure layer, including where applicable:

* EKS/IaC configuration
* node-group configuration
* cluster add-on configuration
* IAM workload roles
* ECR repositories
* Kubernetes namespaces
* Kubernetes RBAC
* NetworkPolicies
* PodSecurity configuration
* Helm charts
* Helm values
* deployment manifests
* services
* ingress
* HPA
* PDB
* probes
* ConfigMaps
* secret integrations
* service accounts
* runtime configuration
* container-image improvements
* deployment documentation
* validation tooling

Every created file must have a concrete purpose.

---

# 54. Implementation Quality Rules

Do not produce:

* pseudo-code
* placeholders
* TODO markers
* FIXME markers
* fake Kubernetes resources
* fake service endpoints
* hardcoded production secrets
* hardcoded cloud credentials
* mutable production image references
* globally privileged service accounts
* unrestricted ingress
* unrestricted pod-to-pod connectivity
* duplicated deployment systems
* dead manifests
* commented-out resources pretending to be implementation
* “implement later” deployment logic

Every workload must have a coherent runtime definition.

Every reference must resolve.

---

# 55. Repository-First Incremental Implementation

Before changing anything:

1. inspect the repository
2. identify all actual deployable workloads
3. identify current container/runtime definitions
4. identify existing Kubernetes/Helm infrastructure
5. identify application runtime requirements
6. identify existing cloud integration
7. identify existing monitoring hooks
8. determine compatibility boundaries
9. implement only the required runtime infrastructure

Do not build imaginary services.

Do not replace functioning infrastructure without evidence.

---

# 56. Testing

Perform all applicable repository-compatible tests.

At minimum validate:

### Container builds

Build applicable production images where tooling and dependencies are available.

### Helm

Lint and render charts.

### Kubernetes manifests

Validate generated manifests.

### IaC

Validate infrastructure configuration.

### Security

Run available infrastructure/container security scans.

### Configuration

Verify environment variables and secret references against actual application requirements.

### Deployment consistency

Verify:

* selectors
* labels
* ports
* services
* ingress
* probes
* autoscaling targets
* namespaces
* service accounts

### Runtime assumptions

Verify container entrypoints and startup commands actually correspond to the repository.

Do not claim a deployment succeeded without actually deploying and verifying it.

---

# 57. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Kubernetes Platform

* production-capable cluster architecture exists
* workload namespaces exist
* RBAC exists
* service accounts exist
* workload identity is configured
* network policies exist where applicable
* pod security controls exist
* node capacity is configurable
* autoscaling foundation exists

### Application Runtime

* backend workloads are deployable
* worker workloads are deployable
* scheduled workloads are deployable where applicable
* web application is deployable
* services are discoverable
* ingress is configured
* health probes are configured
* graceful shutdown is supported
* resource requests/limits exist
* PDBs exist for critical services
* autoscaling exists where justified

### Security

* application pods do not use static cloud credentials
* secrets are externally managed
* TLS is enforced for public production traffic
* internal services remain private
* RBAC is least privilege oriented
* workloads run with restricted privileges where possible
* mutable production image tags are not the source of deployment truth

### AWS Integration

* ECR exists
* EKS integration exists
* workload identity exists
* database connectivity exists
* Redis connectivity exists
* search connectivity exists
* S3 connectivity exists

### Validation

* Helm validation passes
* Kubernetes validation passes
* IaC validation passes
* image/build validation passes where applicable
* applicable security checks pass
* configuration contracts are verified

### Engineering Quality

* no pseudo-code
* no TODO/FIXME implementation gaps
* no fake resources
* no unresolved references
* no duplicate deployment architecture
* existing application contracts remain compatible

---

# 58. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Runtime Infrastructure Implemented

Summarize the Kubernetes, AWS, Docker, and Helm infrastructure implemented.

## Workloads

List every actual application workload configured.

## Kubernetes Changes

Summarize:

* namespaces
* service accounts
* RBAC
* deployments
* services
* ingress
* HPA
* PDB
* network policies
* configuration
* secret integration

## AWS Changes

Summarize:

* EKS
* ECR
* workload identity
* IAM
* networking integrations
* managed-service integrations

## Security Changes

Summarize runtime hardening, access controls, secret handling, TLS, and workload identity.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Compatibility Notes

Document any application/runtime mismatches discovered and how they were handled.

## Remaining Explicitly Out of Scope

List runtime/infrastructure capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the application-runtime infrastructure described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not redesign the application architecture.

Do not invent workloads that do not exist in the repository.

Do not invent credentials, domains, cloud account information, or successful external provisioning.

Do not merely describe Kubernetes or cloud resources.

Actually create and modify the required repository files so the runtime infrastructure is executable, secure, maintainable, testable, scalable, and compatible with the marketplace application.

When complete, provide the required Completion Report.
