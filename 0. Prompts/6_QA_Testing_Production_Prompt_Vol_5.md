# Amazon-Style Ecommerce Marketplace — QA Prompt — Volume 5

## ROLE

Act as the complete senior quality engineering organization responsible for implementing production-grade data-integrity validation, migration testing, privacy validation, recovery verification, observability validation, compliance-oriented controls, operational readiness testing, and continuous quality governance for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff Data QA Engineer
* Staff SDET
* Privacy and Security Test Engineer
* Database Reliability Test Engineer
* Disaster-Recovery Test Engineer
* Observability QA Engineer
* Release Quality Engineer
* Production Validation Engineer
* Compliance-Oriented QA Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement the remaining production-grade quality controls required to validate data integrity, privacy, recovery procedures, infrastructure observability, operational readiness, migrations, deployment safety, and continuous quality governance.

This is an incremental implementation task.

Do not implement QA work outside the scope defined in this prompt.

---

# PROJECT

Build and validate an original Amazon-style ecommerce marketplace serving:

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

* database schema
* migrations
* data retention behavior
* privacy functionality
* account deletion
* export functionality
* audit logging
* observability
* backups
* disaster recovery
* deployment configuration
* operational runbooks
* existing QA infrastructure
* actual compliance-relevant application behavior

Do not invent regulatory obligations that the project has not established.

---

# TECHNOLOGY DIRECTION

Use the locked project technology direction:

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
* WebSockets/SSE where justified
* webhooks

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

### Observability

* OpenTelemetry
* Prometheus
* Grafana
* Loki
* Tempo or equivalent

---

# PRIMARY OBJECTIVE

Implement automated quality validation for the areas that determine whether the marketplace is safe to operate in production after application, infrastructure, and deployment changes.

The resulting QA controls must validate:

* database migration safety
* data integrity
* reconciliation
* privacy and deletion behavior
* account/data export behavior
* audit logging
* backup verification
* recovery procedures
* observability correctness
* deployment readiness
* configuration correctness
* infrastructure drift
* operational runbooks
* release certification
* regression governance

The implementation must provide evidence that production-critical controls work rather than merely confirming that configuration files exist.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* current Prisma migrations
* database migration workflow
* data integrity rules
* reconciliation jobs
* privacy/account deletion implementation
* export implementation
* audit-log implementation
* backup configuration
* recovery scripts
* observability stack
* alert definitions
* dashboards
* release workflows
* environment configuration
* operational runbooks
* existing production readiness checks
* existing drift detection
* existing QA reporting

Do not create duplicate systems where equivalent controls already exist.

---

# CURRENT SCOPE

Implement production data-integrity, privacy, migration, recovery-validation, operational-readiness, and continuous quality-governance testing.

---

# 1. Migration Test Architecture

Create a repeatable migration-testing system.

It must validate migrations from:

* clean database
* representative previous schema
* current production-compatible schema state

where representative states can be safely maintained.

---

# 2. Fresh-Database Migration Testing

Validate that a new database can be created from migrations alone.

Test:

* migration ordering
* migration dependencies
* required extensions
* indexes
* constraints
* generated artifacts
* seed compatibility where applicable

Do not rely on an engineer manually modifying a test database before running migrations.

---

# 3. Upgrade Migration Testing

Test upgrading from representative earlier schema versions.

Verify:

* migration success
* existing data preservation
* new constraints
* indexes
* application compatibility
* rollback assumptions where supported

Do not claim every historical schema version is supported unless the repository explicitly maintains those versions.

---

# 4. Expand/Contract Migration Testing

For schema changes that affect rolling deployments, validate compatibility between:

* old application version
* transitional schema
* new application version

Test additive changes before destructive changes.

Verify that old application instances do not immediately fail when the deployment architecture requires overlap.

---

# 5. Destructive Migration Controls

Create quality gates for destructive schema changes.

Detect changes such as:

* column removal
* column type narrowing
* constraint changes that invalidate existing data
* index removal affecting critical queries
* destructive table changes

Require explicit review metadata or a repository-approved process before production execution.

Do not automatically block every schema change.

---

# 6. Migration Performance

Where migrations can be expensive, test or statically analyze:

* lock behavior
* table rewrites
* index creation
* large-data updates
* transaction duration

Identify migrations that could create production outages.

Do not perform unsafe large-scale migrations against production merely to benchmark them.

---

# 7. Data Integrity Framework

Implement automated integrity checks for important domain relationships.

Examples:

* order totals match order lines
* payment totals match financial records
* inventory balances match movement/reservation state
* seller offers belong to valid products/sellers
* review aggregates match underlying reviews
* notification status is consistent
* shipment state matches fulfillment state

Checks must reflect actual repository invariants.

---

# 8. Reconciliation Testing

Where reconciliation jobs exist, test them against deliberately inconsistent synthetic data.

Verify they can:

* detect inconsistency
* repair safe discrepancies
* avoid corrupting valid state
* generate audit records
* remain idempotent

Do not make reconciliation silently overwrite authoritative data without an explicit rule.

---

# 9. Reconciliation Safety

Test that reconciliation does not:

* create duplicate financial records
* over-correct inventory
* duplicate notifications
* change ownership
* bypass authorization
* erase legitimate data

High-risk reconciliation operations must be auditable.

---

# 10. Financial Consistency Testing

Create cross-system consistency tests covering:

* order amount
* payment amount
* refund amount
* promotion discount
* shipping charge
* tax where implemented

Verify:

* no negative invalid states
* no duplicate financial outcomes
* refund ceilings are respected
* totals reconcile

---

# 11. Inventory Consistency Testing

Validate relationships among:

* stock
* reservations
* consumption
* releases
* orders
* returns

Create synthetic inconsistencies and verify reconciliation/validation behavior.

Do not assume a single inventory table is sufficient evidence of consistency.

---

# 12. Seller-Financial Isolation

Where seller financial/reporting data exists, test that:

* seller A cannot access seller B's financial data
* admin/support visibility follows actual roles
* exported reports respect seller scope
* aggregate reports do not leak private details unintentionally

---

# 13. Privacy Test Architecture

Establish a dedicated privacy regression suite.

Cover:

* data minimization
* access isolation
* sensitive-field exposure
* export behavior
* deletion behavior
* retention behavior
* audit visibility

Do not treat privacy as only a frontend concern.

---

# 14. Sensitive-Field Exposure Tests

Test API, background-job, logs, and serialized-response boundaries for accidental exposure of:

* passwords
* password hashes
* session tokens
* refresh tokens
* payment secrets
* private provider data
* internal credentials
* unnecessary personal information

Use structural assertions where possible.

---

# 15. Account Export Testing

Where account export exists, test:

* authorization
* data completeness according to the documented contract
* format validity
* asynchronous job behavior where applicable
* secure delivery/access
* expiration
* audit trail

Do not include data belonging to another user.

---

# 16. Account Deletion Testing

Where account deletion exists, test:

* authorization
* confirmation
* state transition
* deletion/anonymization behavior
* dependent records
* active sessions
* notifications
* audit behavior
* asynchronous cleanup

Verify the actual repository policy rather than assuming every record must be physically deleted.

---

# 17. Deletion and Retention Testing

Validate lifecycle behavior for:

* customer data
* seller data
* media
* sessions
* notifications
* logs where application-controlled
* exports
* temporary files

Ensure infrastructure retention policies do not contradict application-level deletion rules without a documented reason.

---

# 18. Privacy Boundary Testing in Search

Verify deleted/restricted content does not remain unintentionally exposed through search.

Test:

* deleted products
* unpublished products
* restricted sellers
* private content
* removed reviews

Where search is eventually consistent, validate the documented propagation behavior.

---

# 19. Privacy Boundary Testing in Cache

Verify sensitive state is invalidated when:

* user logs out
* account changes
* permissions change
* resource becomes restricted
* data is deleted

A cached response must not remain accessible after authorization state changes beyond the defined consistency window.

---

# 20. Privacy Boundary Testing in Object Storage

Verify:

* deleted/private media is inaccessible
* presigned URLs expire
* seller isolation remains intact
* customer isolation remains intact
* deleted objects are not re-exposed through stale application metadata

---

# 21. Audit-Log Integrity

Test audit logging for security-sensitive operations.

Verify:

* actor
* action
* target
* timestamp
* result
* correlation information
* relevant context

are recorded according to the repository contract.

Do not record secrets or unnecessary sensitive values.

---

# 22. Audit Tamper Resistance

Where the architecture supports it, validate that ordinary application users cannot:

* edit audit entries
* delete audit entries
* impersonate audit actors
* modify historical timestamps

Do not claim immutable audit storage unless the infrastructure actually provides it.

---

# 23. Observability Validation

Create tests that verify critical services actually emit the telemetry expected by the platform.

Validate:

* metrics endpoint availability
* expected metric names
* OpenTelemetry resource attributes
* trace propagation
* structured-log fields
* correlation identifiers
* deployment annotations where applicable

Do not create tests that merely inspect configuration files.

---

# 24. Alert Validation

Validate important alerts against controlled synthetic conditions where possible.

Examples:

* API error-rate alert
* high latency
* queue backlog
* database connection pressure
* Redis memory pressure
* search degradation
* failed deployment

Verify:

* expression correctness
* labels
* severity
* routing
* deduplication

Do not trigger production paging during ordinary test execution.

---

# 25. Dashboard Validation

Validate that important production dashboards:

* load successfully
* reference existing metrics
* use valid variables
* do not contain broken queries
* show expected panels

Do not judge cosmetic dashboard design as a QA failure unless usability requirements define it.

---

# 26. Runbook Validation

Every critical operational alert/runbook pair must be checked for:

* alert reference
* diagnosis steps
* remediation steps
* escalation guidance
* rollback/recovery steps
* actual infrastructure commands
* security considerations

Do not allow runbooks to reference nonexistent resources or commands.

---

# 27. Backup Verification

Implement automated validation for backup health.

Verify:

* backups are being created
* retention configuration exists
* backup age is within acceptable limits
* encryption is enabled
* backup destination is available
* backup failures are visible

A successful infrastructure deployment is not evidence that backups are healthy.

---

# 28. Restore Verification

Where safely possible, periodically restore backups into an isolated environment.

Validate:

* database starts
* migrations are compatible
* application connectivity works
* expected data structures exist
* recovery metadata is recorded

For expensive restore operations, configure scheduled or controlled validation rather than every pull request.

---

# 29. Search Snapshot Verification

Where search snapshots are part of recovery, periodically validate:

* snapshot availability
* snapshot integrity
* restore capability
* index compatibility
* alias/index reconstruction

Do not merely verify that a snapshot object exists.

---

# 30. Object-Storage Recovery Verification

Where replication or backups exist, validate:

* replicated object availability
* encryption
* object metadata
* ownership
* access policies
* restoration path

Use synthetic test objects.

---

# 31. DR Deployment Verification

Validate that the documented DR deployment pipeline can:

* provision required infrastructure
* obtain artifacts
* retrieve required configuration
* deploy critical workloads
* expose health endpoints
* run recovery smoke tests

Do not redirect customer traffic during ordinary automated DR validation.

---

# 32. DR Data Validation

During recovery tests verify representative:

* customers
* catalog records
* orders
* inventory
* media references

are present according to the recovery model.

Do not import production customer data into an uncontrolled test environment.

---

# 33. DR Application Smoke Tests

Run the critical customer/seller/admin smoke tests against a recovered environment.

At minimum where implemented:

* authentication
* catalog
* search
* cart
* checkout test flow
* orders
* seller operations
* administration

Use safe provider/test modes.

---

# 34. Infrastructure Drift Validation

Create tests/checks for infrastructure drift.

Detect:

* resource changes outside IaC
* changed security groups
* changed public exposure
* changed encryption
* changed IAM
* changed Kubernetes resources

Drift findings must be visible without automatically overwriting emergency changes.

---

# 35. Configuration Drift

Validate runtime configuration across environments.

Detect:

* missing variables
* unexpected variables
* inconsistent defaults
* incompatible values
* incorrect endpoints
* invalid secret references

Do not print sensitive values in drift reports.

---

# 36. Certificate Validation

Automate checks for:

* certificate existence
* expiration
* hostname coverage
* renewal status
* incorrect environment association

Create warnings early enough for operators to act.

---

# 37. DNS Validation

Validate:

* required records exist
* records point to expected infrastructure
* TLS hostnames match
* DR records are configured correctly
* health checks reference real targets

Do not automatically mutate production DNS during tests.

---

# 38. IAM Regression Testing

Validate that critical workload roles still have:

* required permissions
* no newly introduced wildcard permissions
* no accidental privilege escalation

Compare actual policy behavior against repository-defined expectations where practical.

---

# 39. Kubernetes Policy Regression

Validate production workloads against required security policies.

Check for:

* privileged containers
* root execution
* missing resource limits
* missing probes
* unexpected host access
* missing network restrictions
* excessive service-account permissions

---

# 40. Release Readiness Checklist

Create an executable release-readiness validation that checks applicable:

* build success
* tests
* security
* database migrations
* artifact integrity
* infrastructure
* observability
* deployment health
* rollback capability
* backup health

The checklist must be machine-readable where practical.

---

# 41. Production Smoke Tests

Create a safe production smoke-test suite for non-destructive checks.

Examples:

* health
* authentication availability through a safe test account where permitted
* catalog retrieval
* search
* public product page
* non-mutating order lookup for a controlled test identity where explicitly supported

Do not create production tests that mutate customer orders or process real payments.

---

# 42. Post-Deployment Verification

After production deployment, automatically or through a controlled workflow validate:

* rollout
* health
* error rate
* latency
* critical dependencies
* smoke tests
* telemetry

A deployment should not be considered healthy solely because pods are ready.

---

# 43. Deployment Regression Detection

Compare post-deployment behavior against the pre-deployment baseline.

Look for significant regressions in:

* errors
* latency
* queue backlog
* CPU
* memory
* database load
* search load

Use configurable statistical or threshold-based gates.

---

# 44. Rollback Verification

Periodically validate that the documented rollback process still works.

Verify:

* previous artifact exists
* rollback workflow is authorized
* workload returns to healthy state
* observability reflects the rollback
* database compatibility remains intact

Do not automatically reverse destructive database migrations.

---

# 45. Operational Readiness Testing

Validate that production operators have:

* working dashboards
* working alerts
* runbooks
* deployment access
* rollback access
* recovery access
* audit visibility

Do not expose privileged capabilities simply because a readiness test needs them.

---

# 46. Access Review Testing

Where automated policy validation is practical, verify production access remains constrained.

Check:

* CI roles
* Kubernetes roles
* application workload identities
* administrative roles
* read-only operational roles

Detect unexpected privilege expansion.

---

# 47. Quality-Policy Enforcement

Encode project QA policies where practical.

Examples:

* no unresolved critical security findings
* no failing critical tests
* no broken migrations
* no invalid infrastructure
* no missing production health checks
* no secret exposure

Keep policy definitions version-controlled.

---

# 48. Quality Exceptions

Implement a documented exception mechanism for cases where a quality gate must be bypassed.

An exception should contain:

* rule
* reason
* owner
* approval
* expiration
* mitigation

Do not implement permanent invisible bypasses.

---

# 49. Test Result Traceability

Each quality run should be traceable to:

* source commit
* application version
* infrastructure revision
* test environment
* test suite version
* timestamp

This must make historical regression investigation possible.

---

# 50. Quality Artifact Retention

Retain useful QA artifacts according to their value:

* test reports
* performance baselines
* security reports
* migration reports
* recovery reports
* release records

Do not retain secrets or unnecessary personal data.

---

# 51. Production Quality Dashboard

Create an operational quality dashboard showing, where applicable:

* current release
* test status
* security gate status
* deployment health
* SLO status
* recent regressions
* backup health
* DR validation status
* infrastructure drift
* outstanding exceptions

Do not create a dashboard that merely duplicates CI status without operational value.

---

# 52. QA Governance

Document ownership for:

* test frameworks
* quality gates
* performance thresholds
* security thresholds
* recovery validation
* release certification
* exception handling

Avoid assigning responsibilities to unnamed imaginary teams.

Use repository/team configuration where available.

---

# 53. Continuous Regression Strategy

Define what runs:

### Pull Request

Fast, high-signal tests.

### Main Branch

Broader integration/regression validation.

### Release

Full critical-path and security gates.

### Scheduled

Performance, DR, backup, recovery, drift, and deep regression.

Do not put expensive recovery tests into every pull request.

---

# 54. Operational Quality Metrics

Track quality indicators such as:

* escaped defects
* flaky-test rate
* test duration
* deployment failure rate
* rollback rate
* performance regression count
* security finding count
* recovery-test success
* backup validation success

Use these to detect quality degradation over time.

---

# 55. Test Failure Triage

Create standard failure reporting that identifies:

* affected suite
* affected environment
* source revision
* failing test
* failure category
* relevant artifact
* likely owning service

Do not automatically assign blame to a team without evidence.

---

# 56. Environment Health Checks

Before executing expensive QA suites, validate environment prerequisites:

* database reachable
* Redis reachable
* search reachable
* object storage reachable
* queues available
* test identities available
* required secrets configured
* cluster healthy

Fail fast when prerequisites are missing.

---

# 57. Safe-Test Guardrails

Every destructive or high-impact QA workflow must validate:

* environment identity
* AWS account
* cluster identity
* namespace
* test-data ownership
* allowed resource scope

Do not rely on human memory to prevent destructive tests from reaching production.

---

# 58. Out of Scope

Do not implement:

* new application features
* business-logic redesign
* regulatory certification claims
* legal compliance conclusions
* production data copies
* uncontrolled DR failover
* destructive production tests
* real financial transactions
* arbitrary policy enforcement unsupported by project requirements
* manual certification statements unsupported by evidence

---

# 59. Required Deliverables

Implement the actual repository changes required for this quality-governance layer, including where applicable:

* migration validation
* data-integrity checks
* reconciliation tests
* privacy tests
* account export/deletion tests
* audit-log tests
* backup verification
* restore verification
* DR validation
* observability validation
* alert/dashboard validation
* infrastructure drift checks
* certificate/DNS validation
* IAM regression checks
* Kubernetes policy checks
* release-readiness checks
* production smoke tests
* post-deployment verification
* rollback verification
* quality dashboards
* quality-policy configuration
* QA governance documentation

Every created file must have a concrete quality or operational purpose.

---

# 60. Implementation Quality Rules

Do not produce:

* placeholder checks
* fake recovery tests
* fake backup success
* fake release certification
* hardcoded production credentials
* production data copied into tests
* invisible quality bypasses
* unsupported compliance claims
* arbitrary quality thresholds
* tests that only inspect configuration without validating behavior
* TODO/FIXME implementation gaps
* meaningless governance documentation

Every quality control must produce meaningful evidence.

---

# 61. Repository-First Incremental Implementation

Before implementation:

1. inspect current QA infrastructure
2. inspect migration workflow
3. inspect data-integrity mechanisms
4. inspect privacy functionality
5. inspect backup/recovery systems
6. inspect observability
7. inspect deployment verification
8. inspect drift detection
9. inspect release controls
10. identify remaining production-quality gaps
11. implement only the required controls within this scope

Preserve valuable existing controls.

---

# 62. Testing the New Quality Controls

Actually execute newly implemented checks wherever the environment permits.

Verify:

* migration checks run
* integrity tests run
* privacy tests run
* backup checks run
* observability validation runs
* release-readiness checks run
* production smoke-test configuration validates
* drift detection executes
* QA reports are generated

Where a check requires privileged cloud access or expensive recovery infrastructure unavailable in the current environment, perform all safe static validation and clearly report the unexecuted portion.

---

# 63. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Data Quality

* migration validation exists
* schema compatibility is tested
* integrity checks exist
* reconciliation is tested
* financial consistency is tested
* inventory consistency is tested

### Privacy

* sensitive-field exposure is tested
* account export is tested where implemented
* account deletion is tested where implemented
* retention/deletion interactions are tested
* cache/search/storage privacy boundaries are tested

### Recovery

* backup verification exists
* restore verification exists
* DR validation exists
* recovery smoke tests exist
* rollback verification exists

### Observability

* telemetry validation exists
* dashboards are checked
* alerts are checked
* runbooks are validated

### Infrastructure Security

* IAM regression exists
* Kubernetes security regression exists
* infrastructure drift checks exist
* certificate/DNS checks exist

### Production Quality

* release-readiness checks exist
* post-deployment verification exists
* safe production smoke testing exists
* quality policy is version-controlled
* controlled exception process exists

### Governance

* QA ownership is documented
* quality metrics exist
* traceability exists
* artifact retention exists
* continuous regression strategy exists

### Validation

* newly implemented controls actually execute
* unsupported checks are clearly identified
* no fake certification or test-success claims exist

---

# 64. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Data-Quality Validation

Summarize:

* migration validation
* integrity checks
* reconciliation
* financial consistency
* inventory consistency

## Privacy Validation

Summarize:

* sensitive-data exposure
* export
* deletion
* retention
* search/cache/storage privacy

## Recovery Validation

Summarize:

* backups
* restores
* DR
* recovery smoke tests
* rollback

## Observability Validation

Summarize:

* metrics
* traces
* logs
* alerts
* dashboards
* runbooks

## Infrastructure Security Validation

Summarize:

* IAM
* Kubernetes
* certificates
* DNS
* drift detection

## Release Quality

Summarize:

* readiness checks
* post-deployment verification
* production smoke tests
* quality gates
* exceptions

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Environmental Limitations

Clearly distinguish:

* fully executed
* statically validated
* unavailable due to missing infrastructure/access
* intentionally not executed for safety

## Compatibility Notes

Document existing QA or operational controls that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left outside this QA volume.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the data-integrity, privacy, migration, recovery-validation, observability-validation, infrastructure-regression, production-readiness, and quality-governance controls described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future QA volumes.

Do not implement application features.

Do not invent regulatory requirements, recovery results, backup success, or production certification.

Do not merely describe quality governance.

Actually create and modify the required repository files so the marketplace has executable production-quality controls that continuously validate its data integrity, privacy boundaries, recovery capabilities, infrastructure security, operational readiness, and release safety.

When complete, provide the required Completion Report.
