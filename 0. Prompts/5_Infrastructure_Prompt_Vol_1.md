# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 1

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the infrastructure foundation of a production-grade, globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Staff Platform Engineer
* Site Reliability Engineer
* Security Engineer
* Infrastructure-as-Code Engineer
* Kubernetes Engineer
* Network Engineer
* FinOps Engineer
* Reliability/Disaster-Recovery Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the infrastructure foundation required for the ecommerce platform to run reliably across isolated environments, with secure cloud networking, infrastructure-as-code, secrets management, IAM boundaries, DNS/TLS, edge protection, and the foundational AWS platform required by the application.

This is an incremental implementation task.

Do not attempt to implement infrastructure work outside the scope defined in this prompt.

---

# PROJECT

Build the production infrastructure foundation for an original Amazon-style ecommerce marketplace serving:

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

The system uses the following locked technology direction:

### Web

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* Zustand
* React Hook Form
* Zod
* date-fns
* Recharts
* Framer Motion

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
* background workers

### Data and infrastructure services

* PostgreSQL
* Prisma
* Redis
* Elasticsearch/OpenSearch
* S3-compatible object storage
* BullMQ
* Stripe or equivalent payment-provider abstraction

### Cloud direction

* AWS
* Docker
* Kubernetes where appropriate
* Helm where appropriate
* Terraform or an equivalent declarative IaC solution
* GitHub Actions or an equivalent CI/CD platform

### Observability direction

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent distributed tracing backend

The repository is the source of truth for the current implementation state.

---

# PRIMARY OBJECTIVE

Implement the infrastructure-as-code foundation for the marketplace's AWS environments.

The result must establish a secure, repeatable, reviewable, production-oriented cloud foundation that later infrastructure prompts can build upon without redesigning these fundamentals.

The implementation must support:

* isolated environments
* reproducible infrastructure
* secure network boundaries
* least-privilege IAM
* encrypted resources
* centralized secrets management
* secure DNS and TLS
* edge protection
* controlled administrative access
* infrastructure drift detection
* environment-specific configuration
* auditable infrastructure changes
* cost-aware resource configuration
* disaster-recovery preparation
* future Kubernetes/application deployment

Do not claim that cloud resources were successfully provisioned unless you actually provision and verify them.

Where real credentials, cloud accounts, certificates, domains, or provider access are unavailable, implement the complete deployable infrastructure configuration and validation tooling without fabricating successful external execution.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* current repository structure
* existing infrastructure directories
* existing Terraform or IaC configuration
* existing Docker configuration
* existing Kubernetes configuration
* existing Helm configuration
* existing environment/configuration files
* existing CI/CD configuration
* existing scripts
* existing documentation
* existing application service names
* existing ports
* existing environment variables
* existing infrastructure assumptions
* existing cloud-provider references
* existing secrets/configuration conventions

Do not delete or replace working infrastructure merely because you prefer another structure.

Extend compatible infrastructure where possible.

If infrastructure already exists, reconcile the implementation with the requirements of this prompt and make only the changes required to establish a correct, maintainable foundation.

Do not duplicate resources or competing infrastructure definitions.

Do not create two systems that perform the same infrastructure responsibility.

---

# CURRENT SCOPE

Implement the following infrastructure foundation in this prompt.

## 1. Infrastructure Repository Structure

Create or standardize a maintainable infrastructure repository structure that supports multiple environments without copy-pasting entire stacks.

The structure must make clear separation between:

* reusable infrastructure modules
* environment composition
* shared configuration
* provider configuration
* state management
* validation
* operational scripts
* documentation

Use a structure that allows environment-specific changes without duplicating shared infrastructure definitions.

A reasonable structure may include concepts such as:

```text
infra/
  terraform/
    modules/
    environments/
      local/
      dev/
      test/
      staging/
      production/
      dr/
    global/
    policies/
    scripts/
    docs/
```

Do not blindly copy this structure.

Adapt it to the repository's actual organization.

The final structure must be coherent and easy for another engineer to understand.

---

# 2. Environment Model

Define infrastructure boundaries for:

* local
* development
* test
* staging
* production
* disaster recovery

These environments must not accidentally share mutable production resources.

Production data and credentials must never be reused in lower environments.

Define environment-specific configuration through declarative inputs rather than hardcoded environment checks scattered throughout modules.

Document:

* environment purpose
* deployment authority
* resource isolation
* expected availability
* data sensitivity
* backup expectations
* domain strategy
* secret strategy
* scaling expectations

Lower environments may intentionally use smaller resource profiles, but their topology and security boundaries must remain representative enough to validate production behavior.

---

# 3. Terraform / Infrastructure-as-Code Foundation

Implement the infrastructure-as-code foundation using the repository's selected IaC technology, with Terraform as the default direction where no compatible IaC system already exists.

Requirements:

* deterministic configuration
* reusable modules
* explicit inputs
* explicit outputs
* typed variables
* sensible defaults
* validation rules
* environment-specific composition
* provider pinning
* module version discipline
* formatting
* linting
* validation
* plan generation support
* safe state handling

Do not hardcode credentials.

Do not place cloud access keys inside source files.

Do not commit Terraform state containing secrets.

Do not use opaque local-only state for production infrastructure.

---

# 4. Infrastructure State Management

Implement a secure remote-state architecture appropriate for the selected AWS deployment model.

The production design should support:

* remote state
* state locking
* encryption at rest
* controlled access
* versioning
* auditability
* recovery from accidental deletion
* separation between environment states

Where AWS Terraform state is used, prefer a secure remote backend based on AWS-managed services appropriate to the repository's final design.

Define the bootstrap problem explicitly.

If a bootstrap stack is required to create the resources needed by later Terraform stacks, implement it as a clearly isolated bootstrap layer.

Do not create circular dependencies in the infrastructure bootstrap process.

Document the expected initialization sequence.

---

# 5. AWS Account and Environment Boundaries

Implement an infrastructure model that can support separation between environments and, where appropriate, separate AWS accounts.

The design must make clear how the following are isolated:

* production
* staging
* non-production environments
* disaster recovery
* shared/global resources

Do not force every environment into a single shared mutable account if the architecture can avoid it.

Where the actual repository/account arrangement prevents immediate multi-account deployment, create an extensible design that can support account separation later without redesigning application modules.

Define:

* account/environment identifiers
* region configuration
* allowed deployment environments
* provider aliases where needed
* resource naming conventions
* tagging conventions

---

# 6. AWS Region Strategy

Define the AWS region strategy explicitly.

Support:

* primary production region
* disaster-recovery region
* environment-specific region configuration
* future multi-region expansion

Do not invent specific regions without repository evidence.

Use configuration variables or documented deployment parameters.

Infrastructure must not accidentally embed a production region into reusable modules.

---

# 7. Naming and Tagging Standards

Create centralized naming conventions for infrastructure resources.

Names must be deterministic and encode relevant context such as:

* project
* environment
* service/domain
* region where appropriate
* resource purpose

Implement consistent resource tags for supported AWS resources.

At minimum, support tags such as:

* project
* environment
* owner
* service
* managed-by
* cost-center where applicable
* data-classification where applicable
* criticality where applicable

Avoid arbitrary resource names scattered across modules.

---

# 8. AWS Provider and Security Baseline

Implement the provider foundation with secure defaults.

Requirements include:

* explicit AWS provider version constraints
* deterministic provider configuration
* default encryption requirements where supported
* region configuration through controlled inputs
* mandatory tagging where practical
* no static credentials committed to the repository
* no secrets in variables files committed to source control
* controlled provider permissions
* clear separation between bootstrap and workload permissions

Do not give infrastructure deployment roles unrestricted administrative permissions merely for convenience.

Where elevated permissions are unavoidable for bootstrap operations, isolate and document them.

---

# 9. VPC and Network Foundation

Implement the foundational AWS networking layer.

The design must include appropriately separated:

* VPC
* public subnets
* private application subnets
* private data subnets
* route tables
* internet gateway
* NAT strategy
* network ACL strategy where appropriate
* security groups

The network must be designed for:

* high availability
* multiple availability zones
* private application workloads
* private databases
* private caches
* private search resources where appropriate
* controlled outbound access
* controlled inbound access

Do not place databases or other sensitive data services directly in public subnets.

Application workloads should not require public IP addresses merely to function.

---

# 10. Availability Zones

Design production-capable networking across multiple Availability Zones.

The infrastructure must support:

* multi-AZ application workloads
* multi-AZ database architecture
* resilient ingress
* resilient NAT/outbound networking
* failure of an individual AZ without total platform loss

Where lower environments use fewer resources for cost reasons, keep the production topology configurable rather than baking single-AZ assumptions into reusable modules.

---

# 11. Subnet Architecture

Define dedicated subnet categories with clear security intent.

At minimum distinguish between:

### Public

Resources that genuinely require direct internet-facing connectivity.

Examples may include:

* load balancers
* edge-facing infrastructure where required

### Private Application

Resources such as:

* application workloads
* workers
* Kubernetes nodes
* internal services

### Private Data

Resources such as:

* PostgreSQL
* Redis
* OpenSearch
* other sensitive stateful services

Document allowed traffic directions between subnet classes.

Avoid unnecessarily permissive east-west network access.

---

# 12. Security Groups

Implement security-group design around service-to-service intent.

Do not create one globally permissive security group for the entire VPC.

Security groups must represent actual communication paths.

Examples include:

* load balancer ingress
* application ingress
* application egress
* database access
* Redis access
* search access
* worker access
* administrative access where required

Allow only required ports and sources.

Do not use `0.0.0.0/0` for internal data services.

---

# 13. Egress Strategy

Implement controlled outbound networking.

The platform must support outbound access for legitimate workloads such as:

* package/image retrieval
* external APIs
* payment providers
* email/SMS providers
* webhook delivery
* cloud service APIs
* observability endpoints where required

At the same time, avoid unrestricted outbound access for sensitive systems wherever practical.

Document which workload classes require outbound internet access.

Do not expose private services merely because outbound connectivity is inconvenient.

---

# 14. Administrative Access

Do not design production operations around permanently exposed SSH ports.

Prefer identity-based, audited administrative access.

Use AWS-native mechanisms where appropriate, such as:

* IAM
* SSM
* short-lived credentials
* controlled bastion alternatives only when genuinely required

Do not require public SSH access to private workloads as part of the normal architecture.

Any exceptional administrative ingress must be explicitly documented and tightly restricted.

---

# 15. IAM Foundation

Implement least-privilege IAM foundations.

Define distinct roles/policies for responsibilities such as:

* infrastructure deployment
* read-only infrastructure inspection
* application workloads
* CI/CD deployment
* administrative operations
* monitoring
* backup/recovery
* security automation

Do not use the AWS root account for operational workloads.

Do not embed long-lived credentials in:

* source code
* Terraform variables
* Dockerfiles
* Kubernetes manifests
* `.env` files
* CI configuration
* documentation

Where workload identity is available, prefer it over static application credentials.

---

# 16. IAM Policy Design

IAM policies must be narrowly scoped.

Avoid:

```text
Action = "*"
Resource = "*"
```

unless the permission is genuinely required for a controlled bootstrap operation.

Separate:

* human access
* CI/CD access
* workload access
* infrastructure provisioning access

Implement policy boundaries that reduce blast radius.

Document high-privilege policies.

---

# 17. Encryption and KMS

Define encryption strategy for infrastructure-managed data.

Use AWS Key Management Service or equivalent managed encryption primitives where appropriate.

Address encryption for:

* object storage
* databases
* Redis
* search
* Terraform state
* logs
* backups
* secrets
* disks/volumes
* relevant queues or messaging systems

Implement:

* key ownership
* key aliases
* rotation strategy
* access policy boundaries
* service permissions

Do not place encryption keys or key material in source control.

Do not build custom cryptographic key management when AWS-managed KMS satisfies the requirement.

---

# 18. Secrets Management Foundation

Implement centralized secrets management.

Use AWS Secrets Manager, SSM Parameter Store, or an appropriate combination.

Secrets may include:

* database credentials
* payment-provider secrets
* webhook signing secrets
* third-party API credentials
* email provider credentials
* internal signing keys
* integration credentials

Define naming conventions and access boundaries.

Applications must retrieve secrets through controlled runtime mechanisms rather than storing plaintext credentials in repositories.

Do not commit:

```text
.env
.env.production
credentials
private keys
API secrets
JWT signing secrets
Stripe secrets
database passwords
```

unless the file contains only explicitly documented placeholders with no usable credentials.

---

# 19. Secret Rotation

Design the foundation so secrets can be rotated without requiring source-code changes.

Where practical support:

* automatic rotation
* staged rotation
* secret versioning
* controlled rollout
* application restart/reload strategy
* audit trails

Document which secrets are automatically rotatable and which require manual provider coordination.

---

# 20. DNS Strategy

Implement the foundation for managed DNS.

Use Route 53 or the repository's equivalent AWS DNS strategy.

Define:

* environment domains
* subdomains
* internal versus public DNS
* hosted zones
* record management
* health-aware routing where later required

Do not hardcode production domain names when the repository does not define them.

Use variables or explicit environment configuration.

Provide a documented domain model that later infrastructure prompts can extend.

---

# 21. TLS / Certificate Foundation

Implement managed TLS certificate infrastructure.

Use ACM or the appropriate managed AWS certificate system.

The design must support:

* public HTTPS
* environment separation
* certificate validation
* automated renewal
* secure TLS termination
* future CDN integration
* internal TLS where appropriate

Never disable TLS verification as a production shortcut.

Do not commit certificates or private keys to the repository.

---

# 22. Web Application Firewall Foundation

Implement the foundation for AWS WAF or an equivalent managed edge firewall.

The design must support protection against common application-layer threats, including:

* abusive request patterns
* common injection attempts
* known malicious traffic patterns
* automated abuse
* excessive request rates

Do not create a collection of arbitrary WAF rules with no operational rationale.

Use a maintainable rule structure.

Where managed AWS rule groups are used, document:

* why they exist
* expected false-positive handling
* logging requirements
* environment differences

Do not use the WAF as a substitute for application authorization.

---

# 23. Edge and Ingress Preparation

Establish infrastructure interfaces needed by later infrastructure prompts for:

* CloudFront
* public load balancing
* TLS termination
* WAF attachment
* API ingress
* web application ingress

Do not fully implement the complete application deployment layer in this prompt.

Create clean outputs/interfaces that later application infrastructure can consume.

Avoid coupling infrastructure modules directly to implementation details that do not yet exist.

---

# 24. S3 Foundation

Create the foundational object-storage architecture required by the marketplace.

Support distinct buckets or clearly isolated storage areas for appropriate categories such as:

* application media
* seller-uploaded media
* product images
* review media
* generated assets
* operational artifacts
* logs where appropriate
* backups where appropriate

Do not place unrelated data into a single unrestricted bucket merely for simplicity.

Buckets must use:

* encryption
* versioning where appropriate
* blocked public access by default
* lifecycle rules where justified
* explicit ownership settings
* controlled IAM access
* audit/logging integration where required

Do not expose private media directly through public bucket ACLs.

---

# 25. S3 Access Model

Design storage around application-mediated access.

Where clients need direct upload/download:

* use controlled pre-signed operations
* restrict object keys
* restrict content types where possible
* restrict expiration
* validate authorization server-side
* prevent seller/customer cross-tenant access

Do not rely solely on frontend-generated object paths for tenant isolation.

---

# 26. S3 Lifecycle Foundations

Create lifecycle configuration where the repository's expected object categories justify it.

Consider:

* incomplete uploads
* temporary processing objects
* obsolete versions
* generated derivatives
* long-lived product media
* archival data
* operational logs

Do not delete important data merely to reduce cost.

Lifecycle policies must be explicit and documented.

---

# 27. Cloud Cost Controls

Infrastructure must be production-grade without creating uncontrolled cloud spending.

Implement foundational cost controls such as:

* mandatory cost tags
* environment-specific sizing variables
* configurable scaling parameters
* lifecycle policies
* log retention controls
* non-production shutdown guidance where appropriate
* resource naming for cost allocation

Do not optimize costs by compromising required production availability or security.

---

# 28. Guardrails Against Accidental Production Destruction

Implement infrastructure safety controls.

Where appropriate:

* deletion protection
* prevent-destroy lifecycle rules
* explicit production approval gates
* restricted state access
* separate deployment roles
* environment confirmation variables
* protected production state
* backup-aware destruction policies

Do not make infrastructure impossible to evolve.

The goal is to prevent accidental destructive operations, not legitimate controlled changes.

---

# 29. Repository Secret and Artifact Hygiene

Audit the repository for infrastructure-related secret leakage introduced by this work.

Ensure generated infrastructure does not introduce:

* credentials
* tokens
* certificates
* private keys
* state files
* cloud account secrets
* provider secrets
* real payment secrets

Update `.gitignore` or equivalent ignore rules where necessary.

Do not use `.gitignore` as a substitute for removing an already committed secret.

---

# 30. Infrastructure Validation Tooling

Create executable validation tooling for the infrastructure code.

At minimum support appropriate equivalents of:

* formatting validation
* syntax validation
* IaC validation
* linting
* module validation
* static security analysis
* configuration consistency checks

Use repository-compatible tools.

Do not invent validation commands that do not exist.

Document the commands.

---

# 31. CI-Compatible Infrastructure Checks

Prepare the infrastructure layer so CI can later execute safe checks for:

* formatting
* validation
* linting
* security scanning
* Terraform plan generation where credentials are available
* policy checks

This prompt does not require full CI/CD deployment pipelines.

Do not create a fake CI pipeline simply to claim infrastructure automation.

Build the infrastructure so later CI/CD work can consume it cleanly.

---

# 32. Infrastructure Documentation

Document the infrastructure foundation.

Include:

* infrastructure directory structure
* environment model
* AWS resource boundaries
* VPC layout
* subnet strategy
* security-group strategy
* IAM strategy
* secret strategy
* KMS strategy
* DNS strategy
* TLS strategy
* WAF strategy
* S3 strategy
* remote state
* bootstrap requirements
* naming and tagging
* validation commands
* deployment prerequisites
* operational warnings
* production safety rules

Documentation must describe the actual implemented infrastructure.

Do not document planned features as though they already exist.

---

# 33. Outputs and Module Contracts

Create clean module outputs for infrastructure that later layers will consume.

Examples may include:

* VPC ID
* subnet IDs
* security group IDs
* hosted zone IDs
* certificate ARNs
* KMS key ARNs
* bucket names/ARNs
* IAM role ARNs
* region/environment identifiers

Outputs must be typed and documented.

Avoid exposing sensitive values unnecessarily.

Do not output secret material.

---

# 34. Configuration Rules

Infrastructure configuration must distinguish between:

### Safe configuration

Examples:

* environment
* region
* desired capacity
* CIDR ranges
* resource sizing
* retention periods
* feature flags for infrastructure behavior

### Sensitive configuration

Examples:

* credentials
* secret values
* private keys
* signing keys
* webhook secrets

Sensitive configuration must never be committed as plaintext.

---

# 35. Production Safety

Production infrastructure must default toward safe behavior.

Examples:

* private database networking
* encryption enabled
* public bucket access blocked
* restricted IAM
* TLS required
* controlled ingress
* deletion protection where appropriate
* explicit environment names
* audited changes
* protected state

Do not create insecure defaults and rely on operators to manually fix them later.

---

# 36. Reliability Requirements

The infrastructure foundation must support:

* multi-AZ operation
* controlled failure domains
* secure recovery
* infrastructure reproducibility
* deterministic deployments
* clear state ownership
* operational visibility
* controlled change management

Do not optimize for a minimal demo environment at the expense of the production architecture.

---

# 37. Disaster Recovery Preparation

This prompt establishes the foundation for future disaster recovery implementation.

Create configuration boundaries and documentation for:

* primary region
* DR region
* replicated global resources where applicable
* environment-specific DNS
* infrastructure replication strategy
* state recovery
* backup ownership

Do not claim complete application-level disaster recovery yet.

Do not implement the complete DR failover system in this prompt unless required to make this foundation functional.

---

# 38. Security Requirements

All infrastructure changes must follow these requirements:

* least privilege
* deny-by-default where practical
* private data services
* encrypted data
* encrypted transport
* centralized secret storage
* audited administrative access
* no committed credentials
* no public database endpoints
* no unrestricted internal security groups
* no unnecessary public IPs
* no hardcoded cloud secrets
* no fake security controls

Any security tradeoff must be documented.

---

# 39. Observability Hooks

This prompt does not require the full observability stack.

However, the infrastructure foundation must expose clean integration points for future:

* metrics
* logs
* traces
* audit events
* infrastructure monitoring
* alerting

Do not create monitoring resources that cannot actually collect useful signals.

Where infrastructure logs are already naturally available, configure the appropriate destination and retention strategy.

---

# 40. Testing

Test the infrastructure changes using all applicable repository-compatible mechanisms.

At minimum validate:

### IaC syntax

All infrastructure code parses correctly.

### Formatting

Infrastructure files conform to the repository's formatting rules.

### Static validation

Variables, resources, modules, and providers validate successfully.

### Security

Run applicable IaC/security scanners.

### Plan safety

Generate plans where credentials and environment access make this possible.

### Structural correctness

Verify:

* private database networking
* encryption
* expected subnet separation
* security-group restrictions
* IAM boundaries
* secret references
* bucket public-access blocks
* environment separation

### Documentation correctness

Verify that documented commands and paths match the actual repository.

Do not report tests that were not actually run.

---

# 41. Out of Scope

Do not implement the following in this prompt except where a tiny dependency is required for the infrastructure foundation itself:

* complete Kubernetes workload deployment
* complete Helm application charts
* complete application deployment pipelines
* full backend deployment
* full frontend deployment
* full mobile deployment
* PostgreSQL production tuning
* complete Redis production topology
* complete OpenSearch deployment
* complete BullMQ worker deployment
* complete observability platform
* complete centralized logging platform
* complete disaster-recovery failover automation
* application-level autoscaling
* full CI/CD promotion workflow
* application secrets values
* real production credentials
* real customer data
* fake cloud resources
* mock production infrastructure presented as complete infrastructure

Later implementation work must remain possible without redesigning the foundations created here.

---

# 42. Compatibility Requirements

Preserve compatibility with the marketplace architecture.

Infrastructure must not silently change:

* public API contracts
* domain ownership
* database schemas
* event contracts
* queue payloads
* authorization semantics
* storage object ownership rules
* seller isolation
* customer isolation
* payment-provider abstraction
* search architecture

Infrastructure configuration must support the applications already present in the repository.

If an existing implementation conflicts with the infrastructure architecture, make the smallest safe infrastructure adjustment necessary and document it.

---

# 43. Required Deliverables

Implement the actual infrastructure changes.

Expected deliverables include, where applicable:

* IaC modules
* environment configuration
* provider configuration
* state/backend configuration
* VPC/network definitions
* subnet definitions
* routing
* security groups
* IAM roles/policies
* KMS configuration
* Secrets Manager/Parameter Store configuration
* Route 53 configuration
* ACM configuration
* WAF foundation
* S3 infrastructure
* infrastructure validation tooling
* infrastructure documentation
* ignore rules
* operational scripts where required

Do not create meaningless placeholder files just to satisfy a directory layout.

Every created file must have a concrete purpose.

---

# 44. Implementation Quality Rules

Do not produce:

* pseudo-code
* TODO markers
* FIXME markers
* fake Terraform resources
* fake cloud outputs
* hardcoded credentials
* hardcoded secrets
* dead modules
* duplicate infrastructure systems
* unexplained magic values
* abandoned configuration
* commented-out production resources used as placeholders
* “implement later” infrastructure
* incomplete security policies
* broken references
* unsupported provider configuration

All infrastructure code must be syntactically valid and internally coherent.

---

# 45. Repository-First Incremental Implementation

Before changing anything:

1. inspect the repository
2. understand existing infrastructure
3. identify conflicting resources
4. identify already-established naming conventions
5. identify deployment assumptions
6. identify application integration points
7. determine the smallest compatible change set

Then implement the infrastructure foundation.

Do not rewrite the repository simply to match an imagined greenfield architecture.

---

# 46. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Infrastructure

* infrastructure code exists in a maintainable structure
* environment separation is explicit
* AWS provider configuration is correct
* remote-state strategy exists
* network foundation exists
* multi-AZ production topology is supported
* subnet architecture is explicit
* security groups are least-privilege oriented
* IAM boundaries exist
* encryption strategy exists
* secret management foundation exists
* DNS foundation exists
* TLS foundation exists
* WAF foundation exists
* S3 foundation exists
* naming/tagging standards exist
* production destruction guardrails exist

### Security

* no credentials are committed
* no secrets are hardcoded
* data services are not publicly exposed
* public storage access is blocked by default
* IAM is not globally permissive
* administrative access is identity-based
* encryption is enabled where appropriate

### Validation

* infrastructure formatting passes
* infrastructure validation passes
* applicable security scanning passes
* repository-compatible tests pass
* plans/configuration are validated where execution access exists

### Documentation

* environment architecture documented
* network model documented
* IAM documented
* secrets documented
* infrastructure validation documented
* bootstrap requirements documented
* operational prerequisites documented

### Engineering Quality

* no pseudo-code
* no TODO/FIXME implementation gaps
* no fake infrastructure
* no broken references
* no unnecessary duplication
* all created files have concrete purpose
* existing functionality remains compatible

---

# 47. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Infrastructure Implemented

Summarize the infrastructure resources and modules implemented.

## AWS Resources

List the resource categories implemented or configured.

## Network Changes

Summarize:

* VPC
* subnets
* routing
* security groups
* ingress/egress

## Security Changes

Summarize:

* IAM
* KMS
* secrets
* TLS
* WAF
* storage security
* administrative access

## Environment Changes

Document environment-specific infrastructure behavior.

## State Management

Document the Terraform/IaC state architecture and bootstrap requirements.

## Validation Performed

List every validation/test/security command actually run and whether it passed.

Do not claim commands were run if they were not run.

## Compatibility Notes

Document any compatibility issues or infrastructure assumptions discovered.

## Remaining Explicitly Out of Scope

List infrastructure capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the infrastructure foundation described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not generate an architecture redesign.

Do not implement application features.

Do not invent cloud credentials, domains, account IDs, certificates, or successful external provisioning.

Do not merely describe what should be built.

Actually create and modify the required repository files so the infrastructure foundation is executable, maintainable, secure, testable, and ready for later deployment infrastructure work.

When complete, provide the required Completion Report.
