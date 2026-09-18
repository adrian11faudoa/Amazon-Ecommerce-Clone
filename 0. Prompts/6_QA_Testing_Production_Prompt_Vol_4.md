# Amazon-Style Ecommerce Marketplace — QA Prompt — Volume 4

## ROLE

Act as the complete senior quality engineering organization responsible for implementing production-grade performance testing, load testing, scalability validation, resilience testing, security validation, chaos testing, and release-readiness quality gates for a globally scalable Amazon-style ecommerce marketplace.

Operate as:

* Principal QA Architect
* Staff Performance Engineer
* Staff SDET
* Load-Test Engineer
* Distributed Systems Test Engineer
* Security Test Engineer
* Reliability Test Engineer
* Chaos Engineer
* Capacity Validation Engineer
* Release Quality Engineer
* Technical Writer

Do not behave as a teacher, tutorial author, or proof-of-concept developer.

Your responsibility is to inspect the repository and implement automated quality validation for system performance, scalability, resilience, dependency failures, security boundaries, resource saturation, and production-readiness characteristics.

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

* actual services
* infrastructure
* application APIs
* database architecture
* queues
* event contracts
* deployment configuration
* observability
* existing performance tests
* existing security tests
* supported environments
* current resource limits
* current scaling behavior

Do not invent performance targets or security behavior that conflicts with the actual project architecture.

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

Use the repository's existing performance/security/chaos tooling where it is appropriate.

---

# PRIMARY OBJECTIVE

Implement a repeatable quality-validation system capable of answering:

* Can critical APIs handle expected load?
* Do latency and error rates remain controlled under concurrency?
* Does the platform scale correctly?
* Does queue throughput remain stable?
* Does the database remain within safe capacity?
* Does Redis remain healthy under pressure?
* Does search remain usable under concurrent traffic?
* What happens when dependencies become slow or unavailable?
* Do rate limits and security boundaries hold under abuse?
* Do resource limits prevent noisy-neighbor failures?
* Does the platform recover after failure?
* Are production release gates based on measurable evidence?

The implementation must produce actionable test results rather than synthetic benchmark numbers with no operational meaning.

---

# EXECUTION RULE

Inspect the repository before making changes.

Determine:

* existing performance tests
* existing load-test tooling
* existing benchmarks
* API endpoints
* critical user journeys
* queue workloads
* database access patterns
* Redis usage
* search operations
* existing security tests
* existing dependency-failure tests
* Kubernetes resource limits
* autoscaling configuration
* observability metrics
* current SLOs
* CI/CD integration
* supported non-production environments

Do not introduce another performance or security testing framework when a suitable one already exists.

---

# CURRENT SCOPE

Implement the performance, scalability, resilience, security-validation, chaos-testing, and release-quality foundation.

---

# 1. Performance-Test Architecture

Establish a dedicated performance-test architecture separate from ordinary unit/integration tests.

Support:

* baseline tests
* load tests
* stress tests
* spike tests
* soak tests
* concurrency tests
* dependency-failure tests
* capacity tests

Do not treat all performance testing as one workload.

---

# 2. Performance Environment

Performance tests must execute in an isolated environment.

The environment must not share mutable:

* production database
* production Redis
* production queues
* production search indexes
* production object storage
* production payment credentials

Use dedicated test infrastructure.

---

# 3. Test Data Scale

Create controlled test-data generation for realistic scale.

Where applicable generate synthetic:

* customers
* sellers
* products
* variants
* offers
* inventory
* orders
* reviews
* notifications

Data generation must be deterministic and parameterized.

Do not import production customer data.

---

# 4. Workload Modeling

Define representative workloads based on actual application flows.

At minimum consider:

### Read-heavy

* catalog browsing
* product details
* search
* category retrieval

### Transaction-heavy

* cart updates
* checkout
* order creation
* payment status

### Seller-heavy

* inventory
* catalog updates
* order operations

### Async-heavy

* notifications
* indexing
* reports
* media processing
* reconciliation

Do not invent precise traffic percentages without documenting their source or making them configurable.

---

# 5. API Load Testing

Implement load tests for critical backend endpoints.

Measure:

* throughput
* concurrency
* p50 latency
* p95 latency
* p99 latency
* error rate
* saturation

Prioritize:

* authentication
* catalog
* search
* cart
* checkout
* orders
* seller operations

---

# 6. Checkout Load Testing

Checkout is a critical business path.

Test realistic concurrent checkout traffic.

Measure:

* request latency
* database load
* Redis load
* inventory contention
* queue behavior
* payment-provider interaction
* transaction failures
* duplicate outcomes

Do not use real financial transactions.

Use test/sandbox provider behavior.

---

# 7. Inventory Contention Testing

Create load scenarios where many customers attempt to purchase limited inventory.

Validate:

* no overselling
* reservation behavior
* lock/contention behavior
* transaction duration
* failure rate
* retry behavior

Measure database and application saturation.

---

# 8. Search Load Testing

Test realistic search workloads.

Cover:

* keyword search
* autocomplete
* filters
* facets
* sorting
* category browsing
* concurrent queries

Measure:

* p50/p95/p99 latency
* throughput
* errors
* search-node saturation
* rejected operations

---

# 9. Catalog Load Testing

Test high-volume catalog reads and seller catalog mutations.

Cover:

* product detail
* category listing
* product search
* variant retrieval
* offer retrieval
* publication operations

Measure caching effectiveness where observability supports it.

---

# 10. Cart Load Testing

Test:

* concurrent cart reads
* additions
* quantity changes
* removals
* authenticated sessions
* guest sessions where implemented
* cart merges

Measure Redis pressure and API latency.

---

# 11. Order Read Load

Test high-volume:

* order history
* order detail
* shipment status
* tracking information

Verify that increasing read traffic does not destabilize transactional database workloads.

---

# 12. Seller Portal Load

Test realistic seller operational workloads:

* catalog management
* inventory updates
* order lists
* order fulfillment
* reports

Ensure seller workload does not monopolize shared infrastructure.

---

# 13. Background-Worker Load

Load test actual BullMQ worker classes.

Measure:

* jobs/sec
* queue latency
* oldest-job age
* processing duration
* retry rate
* failure rate
* memory consumption
* worker concurrency

Test both normal and burst workloads.

---

# 14. Queue Burst Testing

Generate controlled bursts of jobs.

Verify:

* producers remain responsive
* workers scale
* backlog drains
* no unbounded memory growth
* retry storms do not occur

---

# 15. Queue Backpressure

Test behavior when:

* workers are unavailable
* consumers are slow
* queue growth exceeds normal levels
* downstream dependencies are unavailable

The system must degrade predictably.

---

# 16. Database Performance Testing

Measure PostgreSQL behavior under realistic application load.

Capture:

* query latency
* connections
* CPU
* I/O
* locks
* transaction duration
* slow-query behavior
* storage impact

Identify bottlenecks through evidence.

Do not rewrite queries merely to improve a benchmark without validating production behavior.

---

# 17. Database Connection Pressure

Test increasing application concurrency against bounded database connection pools.

Verify:

* connections remain within limits
* requests queue appropriately
* application failures are controlled
* autoscaling does not create connection storms

---

# 18. Redis Performance Testing

Measure:

* command latency
* throughput
* memory usage
* evictions
* connections
* queue-related workload
* cache-hit behavior where available

Test behavior when Redis approaches configured capacity.

---

# 19. Cache Failure Testing

Temporarily simulate Redis unavailability in an isolated environment.

Verify actual application behavior:

* whether authoritative database fallback exists
* whether degraded operation is supported
* whether errors remain controlled
* whether recovery is clean

Do not assume every cache must have a fallback if architecture intentionally makes Redis mandatory.

Test the documented behavior.

---

# 20. Search Failure Testing

Simulate:

* search timeout
* search unavailable
* elevated search latency
* indexing failure

Verify customer-facing behavior and whether an appropriate fallback exists.

---

# 21. External Provider Failure Testing

Use controlled mocks/sandboxes to simulate:

* payment timeout
* payment rejection
* shipping provider timeout
* email failure
* SMS failure
* push failure

Measure recovery and user-visible behavior.

Do not use real external transactions.

---

# 22. Dependency Latency Injection

Inject controlled latency into selected dependencies.

Measure:

* timeout behavior
* request cancellation
* retry behavior
* worker backlog
* resource consumption
* cascading failure prevention

Do not allow infinite retries.

---

# 23. Circuit-Breaker Validation

Where circuit breakers or equivalent protection exist, verify:

* closed state
* open state
* half-open recovery
* threshold behavior
* reset behavior

Do not test internal implementation details when behavior is observable directly.

---

# 24. Retry-Storm Testing

Create scenarios where a dependency repeatedly fails.

Verify that retry behavior does not:

* multiply traffic uncontrollably
* exhaust worker capacity
* exhaust database connections
* overwhelm external providers

Test exponential backoff/jitter where implemented.

---

# 25. Rate-Limit Stress Testing

Test critical rate-limited endpoints under abusive traffic.

Verify:

* limit enforcement
* stable response behavior
* no state mutation after rejection
* isolation between identities where applicable
* recovery after rate-limit window

Test both authenticated and unauthenticated traffic where relevant.

---

# 26. WAF Validation

Where WAF rules are implemented, validate them using safe test requests in a non-production environment.

Test:

* obvious malicious patterns
* abnormal request volume
* oversized requests
* suspicious query parameters

Do not perform uncontrolled penetration testing.

---

# 27. Authentication Abuse Testing

Test:

* repeated failed login
* password-reset abuse
* registration abuse
* token replay
* session abuse

Verify rate limits, lockouts/challenges where implemented, and audit telemetry.

Do not test credential stuffing against production accounts.

---

# 28. Authorization Security Testing

Automate authorization-fuzzing scenarios around resource identifiers.

Test attempts to access:

* another customer
* another seller
* restricted admin resource
* private media
* private order
* private inventory

Verify consistent authorization enforcement.

---

# 29. Input-Fuzzing Foundation

Where practical create controlled fuzz tests for:

* JSON request bodies
* query parameters
* path parameters
* pagination cursors
* IDs
* monetary values
* quantities
* dates
* uploaded metadata

The application must reject malformed input safely.

Do not send uncontrolled fuzz traffic into shared environments.

---

# 30. API Security Regression Tests

Maintain automated regression tests for known security classes such as:

* broken object-level authorization
* broken function-level authorization
* injection
* sensitive-data exposure
* security misconfiguration
* unsafe file access
* webhook forgery

Focus tests on actual application behavior.

---

# 31. Dependency Vulnerability Validation

Ensure production dependencies are continuously scanned.

Validate policy behavior for:

* critical vulnerabilities
* high vulnerabilities
* vulnerable transitive packages
* malicious packages
* unsupported runtimes

Do not suppress findings without documented justification.

---

# 32. Container Security Validation

Validate production images for:

* known vulnerabilities
* unnecessary packages
* root execution
* writable filesystem where unnecessary
* exposed secrets
* dangerous capabilities

Use actual built images.

---

# 33. Kubernetes Security Validation

Test for:

* privileged containers
* host networking
* host filesystem mounts
* excessive capabilities
* missing resource limits
* weak security contexts
* broad service-account permissions
* unrestricted NetworkPolicies

---

# 34. Infrastructure Security Regression

Validate IaC continuously for regressions such as:

* public databases
* public Redis
* public search
* public S3
* unrestricted ingress
* wildcard IAM permissions
* disabled encryption
* missing backups

---

# 35. Chaos-Test Architecture

Establish a safe chaos-testing framework for isolated environments.

Chaos scenarios may include:

* pod termination
* worker termination
* node disruption
* dependency outage
* network latency
* network errors
* queue consumer failure
* database failover simulation where supported
* search-node disruption where safe

Do not perform uncontrolled chaos against production.

---

# 36. Pod-Failure Testing

Terminate individual application pods during representative traffic.

Verify:

* traffic shifts
* readiness removes unhealthy instances
* requests recover
* no persistent state is lost
* replicas remain healthy

---

# 37. Worker-Failure Testing

Terminate workers during active queue processing.

Verify:

* jobs are safely retried or recovered
* duplicate side effects remain controlled
* queue backlog drains after recovery

---

# 38. Node-Failure Testing

Where the environment supports safe simulation, remove a worker node or simulate node disruption.

Verify:

* pods reschedule
* critical workloads retain availability
* autoscaling reacts
* PDB policies behave correctly

---

# 39. Zone-Failure Testing

Where practical in a controlled environment, simulate loss of an Availability Zone's application capacity.

Verify the remaining zones can maintain the required service behavior.

Do not claim successful multi-AZ resilience from configuration alone.

---

# 40. Deployment-Failure Testing

Test:

* image startup failure
* readiness failure
* failed migration
* bad configuration
* insufficient resources
* failed Helm rollout

Verify:

* deployment fails visibly
* previous version remains healthy where appropriate
* rollback mechanism works
* customer impact is controlled

---

# 41. Recovery Testing

Validate recovery behavior for:

* application restart
* worker restart
* Redis recovery
* search recovery
* database failover/recovery where safe
* queue backlog recovery

Separate:

* actually tested
* simulated
* statically validated

Do not overstate results.

---

# 42. Soak Testing

Implement long-duration test capability for critical workloads.

Test for:

* memory leaks
* connection leaks
* queue buildup
* latency drift
* resource exhaustion
* log/metric growth

Make duration configurable.

Do not force excessively long soak tests into every CI run.

---

# 43. Spike Testing

Test sudden increases in traffic.

Scenarios may include:

* product launch
* flash sale
* promotional event
* notification burst
* seller bulk update

Measure:

* autoscaling response
* queue response
* database saturation
* search saturation
* error rates
* recovery after spike

---

# 44. Stress Testing

Increase load beyond expected capacity in a controlled environment to identify failure boundaries.

Determine:

* throughput limit
* latency degradation point
* queue saturation
* database bottleneck
* Redis bottleneck
* search bottleneck
* cluster capacity boundary

Do not present stress limits as guaranteed production limits.

---

# 45. Capacity Threshold Validation

Compare observed behavior with configured:

* HPA thresholds
* node maximum
* database limits
* Redis limits
* search limits
* queue concurrency
* request-rate limits

Identify mismatches.

---

# 46. Autoscaling Verification

Verify:

* scale-out triggers
* scale-out completion
* stabilization
* scale-in
* worker scaling
* cluster capacity expansion

Record timing.

Do not define unrealistic zero-delay scaling expectations.

---

# 47. Performance Regression Detection

Compare current performance against stored baselines.

Detect regressions in:

* p95
* p99
* throughput
* error rate
* CPU
* memory
* database latency
* queue latency

Do not fail builds based on tiny statistical noise.

Use configurable tolerance thresholds.

---

# 48. Frontend Performance Validation

For critical web pages, measure applicable performance indicators.

Examples:

* page load
* navigation
* JavaScript execution
* API wait
* rendering
* asset loading

Prioritize:

* home/storefront
* category
* product
* search
* cart
* checkout

Do not treat browser-lab scores as direct business guarantees.

---

# 49. Mobile Performance Validation

Measure where tooling permits:

* application startup
* screen navigation
* API wait
* list rendering
* image loading
* memory consumption
* battery-sensitive behavior

Use representative test devices/emulators.

---

# 50. Resource-Leak Testing

Test for leaks involving:

* database connections
* Redis connections
* worker jobs
* HTTP connections
* file descriptors
* memory
* event listeners

Soak tests should surface sustained growth.

---

# 51. Security and Performance Interaction

Validate that security controls do not create unacceptable bottlenecks.

Measure the cost of:

* authentication
* authorization
* WAF
* rate limiting
* encryption
* request logging
* tracing

Do not disable security controls merely to improve benchmarks.

---

# 52. Observability Under Load

During performance tests, ensure observability remains usable.

Verify:

* metrics remain available
* logs remain queryable
* traces remain sampled correctly
* alerting does not storm
* observability systems do not become the bottleneck

---

# 53. Test-Result Storage

Store performance and resilience test results in a repeatable format.

Include:

* test version
* source commit
* environment
* workload
* duration
* concurrency
* result metrics
* infrastructure size
* pass/fail criteria

Do not store secrets with test results.

---

# 54. Performance Threshold Configuration

Create a version-controlled configuration for performance gates.

Where actual product SLOs exist, use them.

Otherwise define thresholds as:

* baseline-relative
* environment-specific
* explicitly provisional

Do not silently turn a benchmark into a production SLO.

---

# 55. Security Severity Gates

Define release behavior for:

* critical findings
* high findings
* medium findings
* informational findings

Use repository/project policy.

Do not allow critical unresolved security findings into protected production releases.

---

# 56. Release Quality Gate

Create an integrated quality gate that can consider:

* functional tests
* security tests
* performance regression
* critical E2E journeys
* infrastructure validation
* container scanning

A release must fail when a required gate fails.

Do not require every non-critical experiment to block production.

---

# 57. Scheduled Quality Testing

Configure appropriate scheduled jobs for:

* performance regression
* soak testing
* dependency security scans
* infrastructure security
* chaos validation
* recovery validation

Long-running tests should not unnecessarily consume pull-request capacity.

---

# 58. Test Environment Protection

Ensure performance, security, and chaos tests cannot accidentally target production.

Use explicit:

* environment allowlists
* account IDs
* cluster identifiers
* deployment-environment checks
* confirmation gates for destructive scenarios

Never infer a safe environment solely from the Git branch name.

---

# 59. Data Safety

Performance, security, and resilience tests must use synthetic or sandbox data.

Do not generate:

* real payment transactions
* real customer notifications
* real customer personal information
* real seller financial activity

---

# 60. Out of Scope

Do not implement:

* uncontrolled penetration testing against production
* destructive production chaos
* real payment transactions
* real customer messaging
* production database corruption
* arbitrary vulnerability exploitation
* application feature changes
* database schema redesign
* unsupported performance targets
* meaningless synthetic benchmarks

---

# 61. Required Deliverables

Implement the actual repository changes required for this QA volume, including where applicable:

* load-testing configuration
* stress-testing configuration
* spike-testing configuration
* soak-testing configuration
* performance baselines
* performance gates
* security regression tests
* fuzzing utilities
* chaos-test configuration
* dependency-failure scenarios
* capacity validation
* autoscaling validation
* resource-leak tests
* security scans
* CI/scheduled-test integration
* test-result storage
* release-quality gates
* performance/security runbooks
* documentation

Every created test must exercise real implemented behavior or a real infrastructure boundary.

---

# 62. Implementation Quality Rules

Do not produce:

* fake benchmark results
* fake security findings
* placeholder load scripts
* arbitrary performance thresholds
* tests against production
* uncontrolled chaos
* real financial transactions
* real customer data
* fake failover claims
* infinite retries
* arbitrary sleeps
* TODO/FIXME test gaps
* meaningless security checks
* benchmark suites that do not measure actual system behavior

---

# 63. Repository-First Incremental Implementation

Before implementation:

1. inspect current performance tests
2. inspect security scans
3. inspect observability metrics
4. inspect infrastructure scaling
5. inspect resource limits
6. inspect existing load-test tools
7. inspect current CI
8. inspect existing chaos/recovery tooling
9. identify the highest-risk performance and resilience boundaries
10. implement only the required QA capabilities

Preserve valuable existing tests.

---

# 64. Testing the New Performance and Resilience Infrastructure

Actually execute the newly implemented validation wherever the environment supports it.

Verify:

* load scripts run
* metrics are collected
* thresholds evaluate correctly
* security scans execute
* chaos tests are safely scoped
* performance artifacts are generated
* failure handling works
* CI integration works

Where external cloud capacity or specialized environments are unavailable, execute everything safely possible and clearly report the unexecuted portions.

---

# 65. Definition of Done

This prompt is complete only when all applicable conditions below are satisfied.

### Performance

* load testing exists
* stress testing exists
* spike testing exists
* soak testing exists
* critical API workloads are measurable
* queue workloads are measurable
* database pressure is measurable
* search performance is measurable
* Redis performance is measurable

### Scalability

* autoscaling can be validated
* capacity thresholds exist
* resource saturation is measured
* performance regressions can be compared against baselines

### Resilience

* dependency failure tests exist
* pod/worker failure tests exist
* deployment-failure tests exist
* recovery behavior is testable
* queue recovery is tested
* controlled chaos framework exists

### Security

* API security regression tests exist
* authentication/abuse tests exist
* authorization regression exists
* fuzzing foundation exists
* container security is validated
* Kubernetes security is validated
* IaC security is validated
* dependency security is validated

### Release Quality

* integrated release-quality gates exist
* critical security failures can block release
* significant performance regressions can block release
* test results are reproducible

### Safety

* destructive tests are environment-protected
* production cannot be targeted accidentally
* no real financial/customer activity is used

---

# 66. Completion Report

At the end of execution, provide a concise but complete implementation report containing:

## Files Created

List every newly created file.

## Files Modified

List every modified file.

## Performance Testing

Summarize:

* load
* stress
* spike
* soak
* API
* checkout
* search
* database
* Redis
* queue

## Scalability Validation

Summarize:

* autoscaling
* capacity
* quotas
* resource saturation

## Resilience and Chaos

Summarize actual scenarios implemented and tested.

Clearly distinguish:

* executed
* simulated
* statically validated

## Security Testing

Summarize:

* authorization
* abuse
* fuzzing
* dependency
* container
* Kubernetes
* IaC

## Release Gates

Summarize the quality criteria integrated into CI/release workflows.

## Validation Performed

List every command actually executed and whether it passed.

Do not claim commands were run if they were not run.

## Environment/Test Limitations

Clearly identify tests that could not be executed because specialized infrastructure, cloud capacity, devices, or provider access were unavailable.

## Compatibility Notes

Document any existing performance/security/chaos infrastructure that required adaptation.

## Remaining Explicitly Out of Scope

List capabilities intentionally left outside this QA volume.

## Definition of Done Status

State whether every applicable Definition of Done item is satisfied.

---

# FINAL EXECUTION DIRECTIVE

Inspect the repository first.

Then implement the performance, scalability, resilience, security-validation, chaos-testing, capacity-validation, and release-quality infrastructure described by this prompt exactly within the defined scope.

Do not ask the user what to implement next.

Do not generate future QA volumes.

Do not implement application features.

Do not invent performance results, security findings, recovery results, or unsupported targets.

Do not merely describe a testing strategy.

Actually create and modify the required repository files so the marketplace has repeatable performance testing, measurable scalability validation, controlled resilience testing, meaningful security regression protection, and production-oriented quality gates.

When complete, provide the required Completion Report.
