Using the approved Architecture Blueprint and the Master Prompt above:

Begin infrastructure implementation ONLY.

Do NOT generate backend business logic.

Do NOT generate frontend code.

Do NOT redesign the architecture.

Assume the Architecture Blueprint has been approved and the Backend and Frontend implementations will follow it exactly.

Your responsibility is to build the complete production infrastructure, DevOps platform, cloud architecture, deployment automation, monitoring, security, and operational tooling.

Generate code incrementally following the Master Prompt milestone strategy.

──────────────────────────────────────

MISSION

Build a complete enterprise-grade cloud infrastructure for the ecommerce marketplace.

The infrastructure must support:

- Millions of users
- Multi-region deployment
- Zero-downtime deployments
- Horizontal auto-scaling
- High availability
- Disaster recovery
- Secure production operations

Comparable quality to:

- Amazon
- Shopify
- Mercado Libre
- Stripe
- Netflix engineering practices

──────────────────────────────────────

TARGET ENVIRONMENTS

Generate infrastructure for:

- Local Development
- Development
- Testing
- Staging
- Production
- Disaster Recovery

──────────────────────────────────────

CLOUD ARCHITECTURE

Design infrastructure for AWS including:

Networking

- VPC
- Public Subnets
- Private Subnets
- NAT Gateways
- Internet Gateway
- Route Tables
- Security Groups
- Network ACLs

Compute

- Kubernetes Cluster
- Node Groups
- Auto Scaling
- Load Balancers

Storage

- S3
- EBS
- EFS

Database

- PostgreSQL
- Read Replicas
- Automated Backups

Caching

- Redis

Search

- Elasticsearch / OpenSearch

CDN

- CloudFront

DNS

- Route53

Certificates

- ACM

Secrets

- AWS Secrets Manager

Container Registry

- Amazon ECR

──────────────────────────────────────

CONTAINERIZATION

Generate:

Dockerfiles

Development Dockerfiles

Production Dockerfiles

Multi-stage Builds

Docker Compose

Local Development Stack

Container Optimization

Image Scanning

Container Security

──────────────────────────────────────

KUBERNETES

Generate complete manifests including:

Namespaces

Deployments

StatefulSets

DaemonSets

Jobs

CronJobs

Services

Ingress

ConfigMaps

Secrets

Persistent Volumes

Persistent Volume Claims

Horizontal Pod Autoscalers

Vertical Pod Autoscalers

Pod Disruption Budgets

Resource Quotas

Limit Ranges

Network Policies

Service Accounts

RBAC

Pod Security Standards

──────────────────────────────────────

HELM

Generate:

Helm Charts

Reusable Templates

Environment Overrides

Values Files

Secrets Integration

Chart Documentation

──────────────────────────────────────

INFRASTRUCTURE AS CODE

Generate Terraform modules for:

Networking

Kubernetes

IAM

Databases

Redis

Storage

Load Balancers

DNS

Certificates

CloudFront

Secrets

Monitoring

Logging

Backups

Disaster Recovery

──────────────────────────────────────

CI/CD

Generate GitHub Actions workflows for:

Linting

Formatting

Unit Tests

Integration Tests

Security Scans

Dependency Scans

Container Builds

Container Scanning

Artifact Publishing

Preview Environments

Staging Deployment

Production Deployment

Rollback

Release Tagging

Versioning

──────────────────────────────────────

DEPLOYMENT STRATEGIES

Implement support for:

Rolling Deployments

Blue-Green Deployments

Canary Deployments

Feature Flags

Automatic Rollback

Health Verification

Zero-Downtime Releases

──────────────────────────────────────

DATABASE OPERATIONS

Generate:

Migration Pipelines

Rollback Strategy

Seed Pipelines

Backup Automation

Point-in-Time Recovery

Read Replica Configuration

Partitioning Support

Connection Pooling

──────────────────────────────────────

REDIS

Configure:

High Availability

Replication

Persistence

Sentinel-ready Architecture

Monitoring

Failover

──────────────────────────────────────

SEARCH INFRASTRUCTURE

Configure:

Elasticsearch Cluster

Index Templates

Snapshots

Backup

Recovery

Monitoring

Scaling

──────────────────────────────────────

OBJECT STORAGE

Configure:

S3 Buckets

Lifecycle Rules

Versioning

Encryption

Signed URLs

Replication

CloudFront Integration

──────────────────────────────────────

OBSERVABILITY

Generate:

Prometheus

Grafana

Loki

OpenTelemetry

Distributed Tracing

Structured Logging

Metrics Collection

Application Dashboards

Infrastructure Dashboards

Business Dashboards

──────────────────────────────────────

ALERTING

Generate alerts for:

CPU

Memory

Disk

Latency

Error Rate

Database Health

Redis Health

Queue Health

Kubernetes Health

Application Health

SSL Expiration

Backup Failures

──────────────────────────────────────

LOGGING

Generate centralized logging using:

Loki

Structured JSON Logs

Correlation IDs

Trace IDs

Log Retention Policies

──────────────────────────────────────

HEALTH CHECKS

Implement:

Liveness Probes

Readiness Probes

Startup Probes

Dependency Health Checks

Database Health

Redis Health

Search Health

Storage Health

──────────────────────────────────────

SECURITY

Implement:

TLS Everywhere

Secrets Management

Kubernetes RBAC

IAM Roles

Least Privilege

Image Signing

Container Scanning

Runtime Security

WAF-ready Architecture

DDoS-ready Architecture

Network Policies

Encryption at Rest

Encryption in Transit

OWASP Best Practices

──────────────────────────────────────

BACKUPS

Generate:

Automated Database Backups

Redis Backups

S3 Replication

Snapshot Policies

Retention Policies

Restore Procedures

Backup Verification

──────────────────────────────────────

DISASTER RECOVERY

Design:

Recovery Time Objective (RTO)

Recovery Point Objective (RPO)

Multi-Region Failover

Traffic Failover

Database Recovery

Application Recovery

Operational Runbooks

──────────────────────────────────────

PERFORMANCE

Optimize:

Autoscaling

Node Scaling

Resource Requests

Resource Limits

Connection Pooling

Caching

CDN

Image Optimization

Compression

Load Balancing

──────────────────────────────────────

COST OPTIMIZATION

Design:

Autoscaling Policies

Reserved Capacity Strategy

Storage Tiering

Lifecycle Policies

Spot Instance Strategy

Resource Optimization

Monitoring of Cloud Costs

──────────────────────────────────────

COMPLIANCE

Prepare infrastructure for:

SOC 2

ISO 27001

PCI DSS (Stripe Integration)

GDPR

Audit Logging

──────────────────────────────────────

TESTING

Generate infrastructure testing for:

Terraform Validation

Helm Validation

Kubernetes Validation

Disaster Recovery Testing

Backup Restoration Testing

Load Testing Environment

Smoke Tests

──────────────────────────────────────

DOCUMENTATION

Generate:

Infrastructure Overview

Deployment Guide

Environment Guide

Secrets Management Guide

CI/CD Documentation

Monitoring Guide

Incident Response Guide

Runbooks

Disaster Recovery Guide

Maintenance Guide

──────────────────────────────────────

PROJECT ORGANIZATION

Maintain throughout development:

Current Milestone

Generated Infrastructure Files

Terraform Modules

Helm Charts

Docker Images

GitHub Actions

Monitoring Components

Remaining Work

──────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never generate placeholders.

Never generate pseudo-code.

Never omit implementations.

Never regenerate unchanged files.

Only modify files when required.

──────────────────────────────────────

STOP CONDITIONS

Generate the infrastructure incrementally according to the Master Prompt.

Each milestone should contain approximately 20–40 files.

At the end of every milestone:

- Verify the infrastructure is deployable.
- Update the project index.
- List completed infrastructure components.
- Identify the next file to generate.

STOP and wait for approval before generating the next milestone.
