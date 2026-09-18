# Amazon-Style Ecommerce Marketplace — Infrastructure Prompt — Volume 5

## ROLE

Act as the complete senior infrastructure engineering organization responsible for implementing the production CI/CD, release-management, infrastructure-change automation, artifact promotion, deployment safety, and supply-chain security platform for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal Cloud Architect
* Staff DevOps Engineer
* Staff Platform Engineer
* Site Reliability Engineer
* Security Engineer
* Release Engineer
* Platform Security Engineer
* Performance Engineer
* Reliability Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the automated software delivery platform required to build, validate, secure, package, promote, deploy, and roll back the marketplace applications and infrastructure.

This is an incremental implementation task.

Do not implement infrastructure work outside the scope defined in this prompt.

---

# PROJECT

Build the production delivery platform for an original Amazon-style ecommerce marketplace serving:

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

* application package structure
* services
* Dockerfiles
* build commands
* tests
* deployment manifests
* Helm charts
* Terraform/IaC
* environment configuration
* versioning
* runtime dependencies
* current CI/CD behavior

Do not invent a delivery architecture that conflicts with the repository.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction.

### Applications

* Next.js 15
* React 19
* TypeScript
* React Native
* Expo
* NestJS

### Backend and Data

* REST
* OpenAPI
* PostgreSQL
* Prisma
* Redis
* BullMQ
* Elasticsearch/OpenSearch
* S3-compatible object storage
* Stripe or equivalent payment abstraction

### Infrastructure

* AWS
* Docker
* Kubernetes/EKS
* Helm
* Terraform or repository-compatible IaC

### CI/CD Direction

* GitHub Actions or the repository's established CI/CD provider

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

---

# PRIMARY OBJECTIVE

Implement a secure, reproducible CI/CD and release-management platform that supports:

* pull-request validation
* application builds
* container image builds
* security scanning
* dependency validation
* IaC validation
* artifact publishing
* immutable artifact promotion
* environment deployment
* controlled production promotion
* rollback
* deployment auditability
* release metadata
* change traceability
* branch/environment protection

The system must reduce manual deployment steps without sacrificing production controls.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing CI/CD workflows
* package manager
* monorepo/workspace structure
* build commands
* test commands
* lint commands
* type-check commands
* Dockerfiles
* container registry configuration
* Helm charts
* Terraform/IaC
* deployment scripts
* environment naming
* branch strategy
* versioning strategy
* release conventions
* mobile build tooling
* secrets integration
* observability deployment hooks
* current rollback capabilities

Do not create a second CI/CD system if one already exists.

Do not delete working workflows without understanding their purpose.

---

# CURRENT SCOPE

Implement the CI/CD, software supply-chain security, artifact promotion, deployment automation, release controls, rollback framework, and infrastructure-change automation foundation.

---

# 1. CI/CD Architecture

Create a clear separation between:

* pull-request validation
* continuous integration
* artifact creation
* artifact security validation
* environment deployment
* production promotion
* rollback

Do not collapse every responsibility into one giant workflow.

Prefer small, composable workflows with explicit dependencies and permissions.

---

# 2. Pull Request Validation

Implement automated validation for pull requests.

The validation pipeline must execute applicable checks such as:

* formatting
* linting
* type checking
* unit tests
* integration tests
* build validation
* dependency validation
* container validation
* IaC validation

The exact checks must reflect the actual repository.

Do not add commands that do not exist.

---

# 3. Change-Scoped Validation

Where practical, optimize CI execution based on changed components without sacrificing repository-wide correctness.

Examples:

* backend-only changes need not rebuild unrelated mobile assets
* infrastructure-only changes need not execute unrelated frontend tests
* documentation-only changes may use a lightweight workflow

However, changes affecting shared packages or global configuration must trigger all relevant downstream validation.

Do not optimize CI by skipping safety-critical checks.

---

# 4. Monorepo and Workspace Support

If the repository contains multiple applications/packages, define explicit dependency-aware CI behavior.

Correctly account for:

* shared packages
* backend packages
* frontend packages
* mobile packages
* infrastructure packages
* generated artifacts

Do not assume all packages are independent.

---

# 5. Dependency Installation

CI must use deterministic dependency installation.

Prefer lockfile-enforced installation.

Do not allow CI to silently regenerate dependency lockfiles.

Use caching where safe and beneficial.

Caches must never be treated as authoritative build artifacts.

---

# 6. Dependency Security

Implement automated dependency security checks.

Support:

* vulnerability scanning
* lockfile inspection
* outdated dependency visibility
* license checks where appropriate
* transitive dependency risk detection

Security findings must have a defined policy for:

* blocking builds
* warning
* documenting exceptions

Do not automatically block every low-severity development-only vulnerability unless project policy explicitly requires it.

---

# 7. Secret Scanning

Implement repository secret scanning.

Detect accidental commits containing:

* cloud credentials
* API keys
* payment secrets
* JWT/signing secrets
* private keys
* database credentials
* webhook secrets

CI must fail on confirmed high-confidence secret exposure.

Do not upload repository secrets to third-party scanning systems without an explicit configured integration.

---

# 8. Static Application Security Testing

Integrate appropriate SAST/security scanning for:

* TypeScript
* backend source
* frontend source
* infrastructure code
* configuration files

Use repository-compatible tools.

Do not create a security pipeline that produces only cosmetic results.

---

# 9. Container Security Scanning

Every production container image must be scanned before promotion.

Scan for:

* OS vulnerabilities
* dependency vulnerabilities
* malicious packages where supported
* insecure configuration
* secret leakage
* dangerous privileges where supported

Configure severity thresholds.

Do not deploy an image that fails a mandatory production security gate.

---

# 10. Infrastructure Security Scanning

Terraform/IaC must be scanned for:

* public databases
* unrestricted security groups
* public storage
* overly permissive IAM
* disabled encryption
* unsafe network configuration
* missing deletion protection where policy requires it

Use a repository-compatible IaC security scanner.

Do not rely only on human review for obvious infrastructure security errors.

---

# 11. Artifact Immutability

Production artifacts must be immutable.

For container images:

* use commit SHA
* release version
* or immutable digest

For infrastructure artifacts:

* retain exact source revision
* lock provider/module versions
* preserve deployment metadata

Do not permit mutable tags to become production identity.

---

# 12. Container Build Pipeline

Implement reproducible container builds.

Requirements:

* deterministic base images where practical
* multi-stage builds where appropriate
* non-root runtime where compatible
* minimal runtime layers
* no development secrets
* metadata labels
* source revision labels
* build timestamp where operationally useful
* software version metadata

Do not bake environment-specific secrets into images.

---

# 13. Container Registry Promotion

Use ECR or the repository's selected registry.

The production deployment system should promote the exact artifact built and validated in CI.

Do not rebuild the same source separately for staging and production unless reproducibility requirements explicitly justify it.

Prefer:

```text
build once → validate once → promote the same artifact
```

---

# 14. Artifact Metadata

Attach useful metadata to production artifacts.

Where supported include:

* repository
* commit SHA
* application name
* version
* build workflow
* build timestamp
* source revision
* dependency/build metadata

This metadata must help operators correlate a deployed artifact with source code and CI execution.

---

# 15. Software Bill of Materials

Generate an SBOM for production artifacts where practical.

The SBOM should identify:

* direct dependencies
* transitive dependencies
* package versions
* operating-system components where available

Store artifacts according to the repository's security/artifact-retention policy.

Do not include secrets in SBOM output.

---

# 16. Artifact Signing

Implement artifact-signing capability where the repository and AWS architecture support it.

Prefer cryptographically verifiable provenance/signatures for production artifacts.

The deployment system should be able to verify artifact integrity before production deployment.

Do not invent signing keys or commit private signing material.

---

# 17. Build Provenance

Capture provenance describing:

* source commit
* build system
* workflow
* artifact
* dependencies
* build timestamp

Where supported use a standardized provenance format.

Do not claim cryptographic provenance if the tooling only records plain text metadata.

---

# 18. Branch Protection

Define CI expectations for protected branches.

Production branches must require appropriate checks before merge.

Where repository ownership allows configuration, require:

* successful CI
* required reviews
* security checks
* infrastructure validation
* no unresolved failing checks

Do not disable branch protections merely to simplify deployment.

---

# 19. Environment Promotion

Implement an explicit progression between environments where appropriate:

```text
development
    ↓
test
    ↓
staging
    ↓
production
```

Do not automatically promote every development commit into production.

Production promotion must be an explicit controlled action.

---

# 20. Environment Protection

Use deployment environments with distinct access controls.

At minimum separate:

* non-production
* staging
* production

Production deployment credentials must not be available to arbitrary pull-request workflows.

---

# 21. GitHub Actions Security

If GitHub Actions is used:

* pin critical third-party actions appropriately
* minimize workflow permissions
* use job-level permissions
* avoid unrestricted `write` permissions
* use OIDC for AWS authentication
* avoid long-lived AWS access keys

Do not store permanent AWS credentials in GitHub repository secrets when OIDC can be used.

---

# 22. AWS OIDC

Implement GitHub-to-AWS federation using OIDC where supported.

Create separate deployment roles for:

* non-production
* staging
* production
* infrastructure changes

Use repository/branch/environment conditions to restrict role assumption.

Do not allow arbitrary forks or pull requests to assume production roles.

---

# 23. CI IAM Permissions

CI/CD IAM permissions must follow least privilege.

Separate:

* artifact publishing
* infrastructure planning
* infrastructure deployment
* Kubernetes deployment
* production promotion

Do not grant every workflow full AWS administrative access.

---

# 24. Terraform Plan Workflow

Implement automated Terraform validation and plan generation.

Support:

* formatting
* validation
* static security scan
* plan
* plan artifact retention

Production infrastructure changes must expose the exact intended plan before application.

Do not automatically apply production Terraform changes from arbitrary pull requests.

---

# 25. Terraform Apply Workflow

Implement controlled infrastructure deployment.

Production apply should require:

* protected environment
* authorized workflow
* validated plan
* explicit approval where appropriate
* exact source revision

Avoid race conditions between multiple simultaneous infrastructure deployments.

Use state locking.

---

# 26. Terraform Plan Consistency

The production apply process must not silently regenerate an unrelated plan after approval.

Where practical:

1. create plan
2. validate plan
3. store exact plan artifact
4. approve
5. apply the reviewed plan

This prevents infrastructure changes from drifting between review and deployment.

---

# 27. Kubernetes Deployment Automation

Implement deployment automation for:

* backend
* workers
* web application
* other actual Kubernetes workloads

Use Helm or the repository's existing declarative deployment system.

Do not rely on ad-hoc `kubectl edit` operations as the normal deployment mechanism.

---

# 28. Deployment Configuration

Deployment workflows must explicitly select:

* environment
* artifact
* chart version
* values
* namespace

Do not infer production deployment from an arbitrary branch name without an explicit protection model.

---

# 29. Helm Validation in CI

Before deployment:

* lint Helm charts
* render manifests
* validate Kubernetes resources
* validate image references
* validate environment configuration
* validate required secrets/configuration references

Do not allow obviously invalid manifests to reach the deployment cluster.

---

# 30. Deployment Ordering

Where dependencies require ordering, implement explicit deployment stages.

For example:

* infrastructure prerequisites
* configuration
* database-compatible migrations
* backend
* workers
* web
* auxiliary services

Do not create race conditions between migrations and application startup.

---

# 31. Database Migration Pipeline

Implement safe Prisma/database migration execution.

Migration workflows must:

* use the exact application revision intended for deployment
* execute against the intended environment
* prevent accidental production execution from non-production workflows
* expose migration output
* fail deployment on migration failure

Do not automatically reset production databases.

Do not use development migration commands against production.

---

# 32. Migration Compatibility

Deployment strategy must support backward-compatible database evolution.

Where practical support:

* additive schema changes
* expand/contract migration patterns
* compatibility during rolling deployment
* delayed destructive changes

Do not require all old application instances to disappear before a schema transition can function.

---

# 33. Migration Locking

Prevent concurrent production migration jobs from running at the same time.

Use an appropriate locking or single-executor mechanism.

Do not assume pipeline-level serialization is sufficient if multiple deployment systems could exist.

---

# 34. Deployment Health Gates

After deployment, verify:

* rollout completion
* desired replica count
* readiness
* error rate
* health endpoints
* critical dependency connectivity
* basic application availability

A deployment must not be considered successful merely because Kubernetes accepted the manifests.

---

# 35. Progressive Deployment Foundation

Prepare the delivery architecture to support safer rollout mechanisms such as:

* canary
* blue/green
* percentage-based rollout
* automated rollback

Implement only the mechanisms that fit the actual repository.

Do not add unnecessary complexity solely to create more infrastructure.

---

# 36. Automated Rollback

Define rollback behavior for failed deployments.

Rollback triggers may include:

* rollout failure
* readiness failure
* severe error-rate increase
* severe latency regression
* application startup failure

Rollback must restore the prior known-good artifact.

Do not automatically roll back on ordinary transient monitoring noise.

---

# 37. Rollback Safety

Application rollback and database rollback must be treated separately.

Do not automatically reverse destructive database migrations during application rollback.

Use forward-compatible database migration patterns.

---

# 38. Release Versioning

Implement a deterministic release versioning strategy.

A release must identify:

* application version
* source commit
* build artifact
* deployment environment
* deployment timestamp

Do not create versions that cannot be traced to source.

---

# 39. Release Manifest

Generate a machine-readable release manifest where useful.

It may contain:

* application versions
* image digests
* chart versions
* source revisions
* migration state
* infrastructure revision
* deployment metadata

Do not store secrets in release manifests.

---

# 40. Deployment Audit Trail

Capture deployment events into the existing operational observability platform.

A deployment record should allow engineers to answer:

* what changed
* who/what initiated it
* when it happened
* which commit was deployed
* which artifact was deployed
* which environment changed
* whether rollout succeeded

Do not expose credentials in deployment logs.

---

# 41. Concurrency Controls

Prevent conflicting deployments.

Control concurrent:

* production releases
* infrastructure applies
* database migrations
* environment promotions

Do not let two production deployments race against each other.

---

# 42. Scheduled Automation

Where maintenance workflows are required, support controlled scheduled jobs for:

* dependency updates where appropriate
* security scanning
* infrastructure drift checks
* backup validation
* certificate checks
* stale artifact cleanup

Do not automatically modify production from an unreviewed scheduled job unless the behavior is explicitly safe and required.

---

# 43. Infrastructure Drift Detection

Implement periodic infrastructure drift detection.

Detect:

* out-of-band resource changes
* configuration drift
* unexpected public access
* policy differences
* Kubernetes drift where appropriate

Do not silently overwrite drift.

Create an alert/reporting mechanism so operators can investigate.

---

# 44. Kubernetes Drift

Where GitOps is not used, detect differences between:

* desired manifests
* deployed resources

Do not treat emergency incident changes as permanent desired state.

Document the expected reconciliation process.

---

# 45. Supply-Chain Security

Secure the path from source code to deployed workload.

Protect:

* source
* dependencies
* build environment
* container registry
* deployment identities
* infrastructure credentials
* signing systems

Use least privilege throughout the chain.

---

# 46. Third-Party Action Security

Review CI/CD dependencies such as:

* GitHub Actions
* Terraform providers
* Helm plugins
* build tools
* security scanners

Pin versions appropriately.

Avoid untrusted dynamic script execution.

Do not use shell interpolation that allows untrusted pull-request data to become executable commands.

---

# 47. Pull Request Security Boundary

Treat pull requests from untrusted sources as potentially malicious.

Never expose:

* production credentials
* deployment credentials
* signing keys
* private secrets

to untrusted pull-request workflows.

Use separate workflows for privileged operations.

---

# 48. Cache Security

CI caches must not allow untrusted branches to poison privileged release jobs.

Avoid sharing sensitive caches across trust boundaries.

Never place secrets inside reusable caches.

---

# 49. Artifact Retention

Define retention for:

* container images
* build artifacts
* SBOMs
* provenance
* Terraform plans
* test reports
* deployment manifests

Retention should balance auditability and cost.

Do not automatically delete artifacts still required for rollback or incident investigation.

---

# 50. Mobile CI/CD Boundary

Inspect the repository's mobile implementation.

Where React Native/Expo applications exist, establish CI support for:

* dependency validation
* tests
* lint/type checks
* Expo/EAS configuration validation
* development builds
* production build workflows where repository access permits

Do not invent mobile signing credentials.

Do not expose mobile signing secrets in pull-request workflows.

---

# 51. Mobile Release Security

Where production mobile builds are supported:

* protect signing credentials
* use environment-specific credentials
* require protected deployment workflows
* record release versions
* retain build metadata

Do not make app-store publication automatic unless the repository already has an intentional protected release process.

---

# 52. Frontend Build Security

For Next.js builds:

* distinguish public environment variables from server-only secrets
* prevent secrets from entering browser bundles
* validate production build configuration
* preserve source/release metadata
* produce reproducible artifacts where practical

Do not place database credentials or private provider secrets in public `NEXT_PUBLIC_*` values.

---

# 53. Backend Build Security

For NestJS services:

* build from clean dependency installation
* validate environment configuration
* run production tests
* build immutable images
* scan resulting images
* publish only validated artifacts

---

# 54. Environment Configuration Validation

CI must verify required configuration keys exist for each deployment environment.

Do not validate actual secret values in pull-request logs.

Use secret-presence and schema validation without printing secret contents.

---

# 55. Deployment Notifications

Publish controlled release notifications containing:

* environment
* application
* version
* commit
* status
* deployment timestamp

Do not include secrets or sensitive customer data.

---

# 56. Incident Integration

Deployment failures should integrate with the existing observability system.

Support:

* deployment events
* failed deployment alerts
* rollback events
* release annotations on dashboards

Make deployments visible during incidents.

---

# 57. Disaster-Recovery Deployment Support

The delivery system must be capable of deploying the application to the configured DR environment without depending on the primary region remaining healthy.

Support:

* DR environment selection
* artifact availability
* infrastructure source availability
* configuration availability
* secrets retrieval
* deployment workflow

Do not implement full traffic failover orchestration in this prompt.

---

# 58. Production Access Controls

Production release workflows must be protected by:

* environment approval
* restricted workflow triggers
* restricted IAM roles
* branch protection
* controlled secrets
* auditable deployment identity

Do not let any repository contributor arbitrarily deploy to production.

---

# 59. CI/CD Observability

Monitor the delivery platform itself.

Track:

* workflow success/failure
* build duration
* deployment duration
* deployment failure rate
* rollback frequency
* queue delays
* artifact publication failures
* infrastructure plan/apply failures

Use the existing observability system where practical.

---

# 60. Out of Scope

Do not implement:

* application business features
* database schema redesign
* payment logic
* search redesign
* frontend feature development
* mobile feature development beyond CI/CD integration
* full DR failover orchestration
* fake credentials
* fake successful deployments
* manual production resource creation outside IaC
* arbitrary replacement of existing CI/CD without repository analysis

---

# 61. Required Deliverables

Implement the actual repository changes required for this delivery layer, including where applicable:

* CI workflows
* pull-request validation workflows
* build workflows
* security scanning workflows
* container build workflows
* ECR integration
* artifact promotion
* SBOM generation
* provenance/signing support
* AWS OIDC configuration
* deployment environments
* Helm deployment workflows
* Terraform plan/apply workflows
* migration workflows
* rollback workflows
* release metadata
* drift detection
* deployment notifications
* mobile CI workflows where applicable
* CI/CD documentation
* operational runbooks

Every created file must have a concrete purpose.

---

# 62. Implementation Quality Rules

Do not produce:

* pseudo-code
* placeholder workflows
* TODO/FIXME implementation gaps
* fake deployment success
* fake artifact publication
* hardcoded credentials
* long-lived cloud keys where OIDC is available
* unrestricted CI permissions
* production secrets exposed to pull requests
* mutable production deployment identities
* destructive automatic rollback logic
* unsafe migration workflows
* duplicate CI/CD systems
* unverified action references
* undocumented privileged workflows

Every workflow must be internally coherent and executable.

---

# 63. Repository-First Incremental Implementation

Before implementation:

1. inspect current CI/CD
2. inspect package/build commands
3. inspect Dockerfiles
4. inspect Helm/Kubernetes
5. inspect Terraform/IaC
6. inspect deployment environments
7. inspect mobile build tooling
8. inspect release/versioning conventions
9. inspect existing security scans
10. implement only the required compatible changes

Preserve working delivery infrastructure wherever possible.

---

# 64. Testing

Run all applicable validation.

At minimum validate:

### CI configuration

* workflow syntax
* YAML correctness
* action references
* permissions
* environment references

### Application

* lint
* type checks
* unit tests
* integration tests
* builds

### Containers

* image build
* vulnerability scanning
* metadata verification

### Infrastructure

* Terraform formatting
* Terraform validation
* security scanning
* plan generation where credentials exist

### Kubernetes

* Helm lint
* manifest rendering
* deployment validation

### Security

* secret scan
* dependency scan
* SAST
* container scan
* IaC scan

### Release

Verify release artifacts can be traced to source.

Do not claim CI execution succeeded unless the commands actually ran.

---

# 65. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### CI

* pull-request validation exists
* builds are deterministic
* tests are automated
* security scans exist
* artifacts are immutable
* artifact metadata exists

### CD

* environment deployment workflows exist
* production requires protected authorization
* deployment artifacts are promoted rather than rebuilt
* rollout health is verified
* rollback capability exists
* deployment concurrency is controlled

### Infrastructure Delivery

* Terraform validation exists
* plan workflow exists
* production apply is protected
* reviewed plans can be applied deterministically
* drift detection exists

### Security

* OIDC is used where supported
* long-lived cloud credentials are avoided
* workflow permissions are minimized
* pull-request trust boundaries are enforced
* dependency/container/IaC/secret security checks exist
* artifact integrity is supported

### Database Delivery

* migration execution is controlled
* migrations are environment-aware
* concurrent migrations are prevented
* rollback does not assume destructive database reversal

### Observability

* deployment events are emitted
* failed deployments are visible
* release metadata is traceable

### Reliability

* production rollback exists
* DR deployment path exists
* artifacts required for recovery are retained

### Validation

* workflow configuration validates
* applicable application tests pass
* container scans pass required thresholds
* IaC checks pass
* deployment manifests validate

---

# 66. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## CI/CD Workflows

List every workflow created or modified and its purpose.

## Security Controls

Summarize:

* OIDC
* IAM
* secret scanning
* SAST
* dependency scanning
* container scanning
* artifact security
* supply-chain controls

## Artifact Pipeline

Describe:

* image builds
* registry publication
* SBOM
* provenance/signing
* artifact promotion

## Deployment Pipeline

Describe:

* environments
* approvals
* rollout
* health gates
* rollback

## Infrastructure Pipeline

Describe:

* Terraform validation
* plans
* approvals
* apply controls
* drift detection

## Database Pipeline

Describe migration execution and safety controls.

## Mobile Delivery

Describe mobile CI/CD changes where applicable.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Access/Secret Limitations

Clearly identify controls that could not be externally verified because provider access or credentials were unavailable.

## Compatibility Notes

Document any existing CI/CD behavior that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left for later implementation.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the production CI/CD, release-management, software-supply-chain security, artifact-promotion, deployment, rollback, and infrastructure-change automation described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future infrastructure volumes.

Do not redesign application behavior.

Do not invent credentials, successful deployments, or external provider configuration.

Do not merely describe CI/CD architecture.

Actually create and modify the required repository files so the delivery platform is executable, secure, auditable, reproducible, rollback-capable, and compatible with the marketplace application.

When complete, provide the required Completion Report.
