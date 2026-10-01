# Environment Architecture & Deployment Contract

Extends `../02-component-architecture.md` with explicit environment responsibilities and the deployment topology contract the Volume 2 prompt requires.

## 1. Environment Responsibilities

| Environment | Purpose | Expected Scale | Data Policy | Secrets | External Integrations | Observability | Access Restrictions |
|---|---|---|---|---|---|---|---|
| Local | Individual developer iteration | Single developer, minimal | Synthetic/seed data only, never production data | Local-only placeholder values (`.env` from `.env.example`), never real provider keys | Provider sandbox/test-mode keys where a real call is needed, otherwise mocked at the adapter boundary | Console/local logs only | Developer's own machine |
| Development | Shared integration environment for in-progress work | Small team, low traffic | Synthetic/seed data, refreshed regularly | Sandbox secrets, shared secret manager (dev-scoped) | Sandbox/test-mode for all providers | Full stack (OTel/Prometheus/Grafana/Loki/Tempo), dev-scoped | Team-wide, VPN/internal-network only |
| Testing (CI) | Automated test execution (unit/integration/contract per `20-architecture-test-contract.md`) | Ephemeral, spun up per CI run | Ephemeral synthetic data, destroyed after run | CI-scoped placeholder/sandbox secrets injected via CI secret store | Mocked/sandbox | Test-run logs only, retained briefly for CI debugging | CI runner only |
| Staging | Pre-production validation, production-like configuration | Production-like topology, low real traffic (internal/QA users) | Synthetic data resembling production shape — **never** a copy of real production data without an approved anonymization/privacy-preserving process (Master Prompt requirement, restated here as binding) | Staging-scoped secrets, separate from production, sandbox provider keys where the provider supports a staging-equivalent mode | Sandbox/test-mode preferred; a staging environment that must validate real provider webhook behavior uses the provider's own staging/test webhook tooling, not live production webhooks | Full stack, staging-scoped dashboards | Internal team + QA only |
| Production | Live customer/seller traffic | Full target scale per `24-capacity-planning-model.md` | Real customer/seller data, full privacy/retention contract (`16-data-retention-and-privacy.md`) applies | Production secret manager, strictest access control, rotated per security policy | Live provider credentials | Full stack, production dashboards, paged alerting | Least-privilege operator access, MFA-enforced, all admin actions audited (`12-audit-contract.md`) |
| Disaster Recovery | Standby/restore target for a regional or catastrophic failure | Matches production topology (provisioned via the same Terraform, `../23-disaster-recovery.md` §7) | Restored from production backups per the restore process | Mirrors production secret manager (replicated or independently provisioned per DR runbook) | Live provider credentials (a DR failover is still serving real traffic) | Full stack, activated on failover | Same access model as production once activated |

**Production data in lower environments:** never copied wholesale. If a specific investigation genuinely requires production-shaped data in staging, it goes through a documented anonymization pipeline (structurally similar to the export/anonymization mechanism in `16-data-retention-and-privacy.md` §2) reviewed and approved per the security/privacy policy in force at implementation time — this is a process requirement, not a currently-built pipeline (no such pipeline is claimed to exist yet).

## 2. Deployment Topology

| Component | Deployment Unit | Repository Artifact | Infra-as-Code | Externally Provisioned |
|---|---|---|---|---|
| Web application | Container image, deployed to a CDN-fronted hosting target (e.g., Vercel-equivalent or containerized behind the platform's own ingress) | Next.js build output + Dockerfile | Terraform module defining the hosting target/CDN distribution | The actual CDN distribution, DNS records |
| Mobile applications | App store binaries (not a "deployment" in the backend sense) | Expo build artifacts | N/A (app-store submission pipeline, not Terraform) | App Store Connect / Google Play Console listings |
| Backend API | Container image, Kubernetes Deployment | Dockerfile + NestJS build output | Helm chart + Terraform (EKS cluster, node groups) | The EKS cluster itself, load balancer, DNS |
| Background workers | Container image, Kubernetes Deployment (separate from API, per-queue-family replica counts per `../21-scalability-architecture.md`) | Same repository, different entrypoint/Dockerfile stage | Helm chart | Same cluster |
| Scheduled jobs | Kubernetes CronJob | Same repository | Helm chart | Same cluster |
| Ingress/load balancing | AWS ALB (or equivalent), Kubernetes Ingress resource | — | Terraform + Helm | The ALB itself, TLS certificates (ACM) |
| CDN | CloudFront (or equivalent) | — | Terraform | The distribution |
| PostgreSQL | Managed RDS instance | — | Terraform | The RDS instance, Multi-AZ standby |
| Redis | Managed ElastiCache (or equivalent) | — | Terraform | The cluster |
| Search | Managed OpenSearch Service | — | Terraform | The domain/cluster |
| Object storage | S3 buckets | — | Terraform | The buckets (per `08-storage-and-media-contract.md` §1) |
| Observability | Prometheus/Grafana/Loki/Tempo, self-hosted-in-cluster or managed equivalents | Helm charts for self-hosted option | Terraform (if managed) + Helm | Managed service endpoints, if used |

**Clear distinction (binding):** "Infra-as-Code" defines what Terraform/Helm *declares*; "Externally Provisioned" is the actual running resource — this document, like Volume 1, never claims the externally-provisioned column exists merely because the infra-as-code column is documented (Master Prompt "Infrastructure-as-code does not imply that external infrastructure has actually been provisioned").

## 3. Deployment Pipeline Stages (Contract, Not Implementation)

1. Build (compile, type-check, lint) → 2. Unit + integration tests → 3. Security/dependency scan → 4. Container build → 5. **Database migration (expand phase only, gated, per `17-migration-and-database-operations.md` §1)** → 6. Deploy new version (rolling, health-gated per §4 below) → 7. Smoke tests against the newly deployed version → 8. (Separately scheduled, not part of every deploy) Contract-phase migration, only after bake-in.

This is the contract every CI/CD implementation (GitHub Actions or equivalent, per the Master Prompt's technology direction) must satisfy — the actual pipeline YAML is produced during infrastructure implementation, not fabricated here.

## 4. Health Gates & Rolling Deployment

- A new replica must pass `/health/ready` (`13-observability-contract.md` §4) before the load balancer routes traffic to it.
- Rolling deployment proceeds one batch of replicas at a time (e.g., 25% at a time), pausing if the new batch's error rate exceeds a threshold relative to the previous batch's baseline — this is the concrete trigger for an automatic rollback (§ below).
- Backward compatibility requirement (restated from `17-migration-and-database-operations.md` §1): the previous application version must function correctly for the duration of the rolling window, since old and new code run simultaneously against the same (post-expand) schema and the same event/queue contracts (which is why event/queue changes follow the same additive-first discipline, `05-events-and-queues.md` §3).
