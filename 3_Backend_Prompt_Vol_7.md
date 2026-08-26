You are operating in Senior Engineering Team Mode.

Build the production-ready backend for administration, CMS, moderation, fraud prevention, feature flags, system configuration, audit, compliance, and platform operations for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, seller-isolation rules, catalog architecture, inventory architecture, checkout architecture, order architecture, payment architecture, search architecture, recommendation architecture, notification architecture, API conventions, event architecture, queue architecture, and security model.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend required for:

• Customer administration
• Seller administration
• Product administration
• Category administration
• Brand administration
• Order investigation
• Payment investigation
• Refund investigation
• Return investigation
• Seller verification administration
• Moderation
• Product moderation
• Review moderation
• Report management
• Fraud prevention
• Risk evaluation
• CMS
• Feature flags
• System configuration
• Audit logs
• Administrative workflows
• Compliance support
• Operational reporting

The implementation must support:

• Millions of customers
• Hundreds of thousands of sellers
• Millions of products
• Millions of orders
• Large administrative workloads
• Multiple administrator roles
• Strict privilege separation
• Complete auditability
• High availability
• Horizontal scaling
• Multi-region deployment

────────────────────────────────────────

TECHNOLOGY STACK

Backend:

• Node.js
• NestJS
• TypeScript

Database:

• PostgreSQL
• Prisma ORM

Cache:

• Redis

Event Streaming:

• Kafka or Redpanda where justified

Background Processing:

• BullMQ

Object Storage:

• AWS S3-compatible object storage where administrative documents require it

Search:

• Elasticsearch/OpenSearch where administrative search requires it

Observability:

• OpenTelemetry
• Prometheus
• Grafana
• Loki
• Tempo

Testing:

• Jest
• Supertest
• Integration and contract testing tools

────────────────────────────────────────

IMPLEMENTATION RULES

Never generate pseudo-code.

Never generate placeholders.

Never generate TODO comments.

Never omit implementations.

Never say:

- "implement similarly"
- "left as an exercise"
- "for brevity"
- "remaining code omitted"

Every generated file must be complete.

Every generated file must compile.

Never regenerate unchanged files.

Only modify existing files when required.

Use strict TypeScript.

Use dependency injection.

Keep controllers thin.

Keep business rules outside controllers.

Use repositories for persistence.

Use DTOs for external contracts.

Use centralized validation.

Use centralized error handling.

Use structured logging.

Use explicit authorization for every administrative operation.

────────────────────────────────────────

ADMINISTRATION ARCHITECTURE

Define and implement administrative modules for:

• Customers
• Sellers
• Seller staff
• Stores
• Products
• Categories
• Brands
• Orders
• Payments
• Refunds
• Returns
• Reviews
• Reports
• Promotions
• Coupons
• CMS
• Feature flags
• System configuration
• Audit logs

Administrative operations must never bypass the normal domain boundaries silently.

Administrative services should invoke controlled domain application services or explicit administrative workflows.

────────────────────────────────────────

ADMINISTRATIVE ROLES

Support a granular role model including:

• Support Agent
• Customer Operations
• Seller Operations
• Catalog Moderator
• Content Moderator
• Fraud Analyst
• Finance Operator
• Fulfillment Operator
• Marketing Operator
• Analyst
• Administrator
• Super Administrator
• System Service

Define permissions separately from roles.

Avoid one unrestricted administrator role for ordinary operations.

────────────────────────────────────────

ADMINISTRATIVE PERMISSIONS

Define permissions for:

• View customer
• Modify customer status
• Reset account access
• View seller
• Approve seller
• Suspend seller
• View product
• Moderate product
• Suspend product
• Manage category
• Manage brand
• View order
• Investigate payment
• Issue refund
• Approve return
• Investigate seller payout
• Moderate review
• Manage reports
• Manage CMS
• Manage feature flags
• Modify system configuration
• Access audit logs
• Perform financial adjustments

High-risk permissions must be explicitly separated.

────────────────────────────────────────

SENSITIVE ADMINISTRATIVE ACTIONS

Require stronger controls for:

• Full customer account suspension
• Seller suspension
• Seller termination
• Large refunds
• Financial adjustments
• Seller payout changes
• Feature-flag kill switches
• Security configuration changes
• Permission changes
• System configuration changes

Where appropriate support:

• Re-authentication
• Confirmation
• Reason capture
• Approval workflow
• Dual authorization
• Audit trail

────────────────────────────────────────

ADMINISTRATIVE SEARCH

Implement secure administrative search for:

• Customers
• Sellers
• Stores
• Products
• Orders
• Payments
• Refunds
• Returns
• Reports
• Audit records

Search must enforce administrator permissions.

Do not expose data fields that a given administrator role is not authorized to view.

────────────────────────────────────────

CUSTOMER ADMINISTRATION

Implement:

• Customer lookup
• Account state
• Account suspension
• Account reactivation
• Session investigation
• Device investigation
• Security events
• Order overview
• Report history
• Support notes where appropriate

Do not allow administrators to modify customer financial or security state without the required permission.

────────────────────────────────────────

SELLER ADMINISTRATION

Implement:

• Seller lookup
• Seller verification review
• Seller approval
• Seller rejection
• Seller suspension
• Seller reactivation
• Seller termination
• Store investigation
• Seller staff investigation
• Seller performance overview
• Seller risk status

Seller administrative actions must be audited.

────────────────────────────────────────

CATALOG ADMINISTRATION

Implement administrative operations for:

• Categories
• Brands
• Products
• Product variants
• Seller offers
• Product media

Support:

• Approval
• Rejection
• Suspension
• Unpublishing
• Archival
• Moderation notes
• Policy references

Do not allow an administrator to bypass catalog lifecycle rules without an explicit override operation.

────────────────────────────────────────

ORDER ADMINISTRATION

Implement controlled order investigation.

Support:

• Order lookup
• Seller-order lookup
• Fulfillment lookup
• Shipment lookup
• Order timeline
• Payment status
• Refund status
• Return status
• Cancellation investigation

Administrative order actions must use explicit workflows.

Do not allow silent direct database modifications.

────────────────────────────────────────

FINANCIAL ADMINISTRATION

Implement controlled access to:

• Payments
• Refunds
• Seller balances
• Settlements
• Payouts
• Commissions
• Financial transactions

Support:

• Investigation
• Reconciliation
• Manual adjustment where explicitly authorized
• Adjustment reasons
• Approval workflows
• Audit

Every financial adjustment must create an immutable financial record.

────────────────────────────────────────

MODERATION DOMAIN

Implement moderation workflows for:

• Products
• Product media
• Brands
• Reviews
• Stores
• Seller profiles
• Customer reports
• Marketplace content

Support:

• Report creation
• Case creation
• Assignment
• Investigation
• Action
• Appeal
• Resolution
• Reopening

────────────────────────────────────────

MODERATION CASE

Implement moderation case state.

Support:

• Open
• Assigned
• Investigating
• Action Required
• Action Taken
• Appealed
• Resolved
• Reopened
• Closed

Store:

• Case type
• Subject
• Priority
• Policy
• Evidence references
• Assigned reviewer
• Actions
• Timestamps

────────────────────────────────────────

MODERATION EVIDENCE

Implement secure evidence references.

Support evidence such as:

• Product metadata
• Review metadata
• Media references
• User reports
• Administrative history
• Event references

Do not expose internal evidence to unauthorized administrators.

Do not store unnecessary copies of sensitive data.

────────────────────────────────────────

APPEALS

Support:

• Appeal creation
• Appeal eligibility
• Appeal review
• Appeal decision
• Final resolution

Appeal decisions must be auditable.

────────────────────────────────────────

FRAUD PREVENTION

Implement a marketplace risk and fraud-prevention foundation.

Evaluate:

• Account risk
• Seller risk
• Payment risk
• Order risk
• Coupon risk
• Promotion risk
• Return risk
• Review risk
• Refund risk

Use signals such as:

• Account age
• Transaction history
• Device signals
• IP/network signals where appropriate
• Order patterns
• Payment outcomes
• Coupon usage
• Return patterns
• Seller performance
• Behavioral anomalies

Do not implement invasive collection beyond legitimate platform requirements.

────────────────────────────────────────

RISK ENGINE

Implement a configurable risk-evaluation architecture.

Support:

• Rules
• Risk scores
• Risk levels
• Signals
• Thresholds
• Actions

Possible outcomes:

• Allow
• Review
• Step-up verification
• Hold
• Reject
• Suspend

Risk rules must be versioned and auditable.

────────────────────────────────────────

FRAUD ACTIONS

Support:

• Transaction hold
• Account review
• Seller review
• Coupon restriction
• Promotion restriction
• Order review
• Refund review
• Return review
• Temporary suspension

High-impact automated actions should be configurable and auditable.

────────────────────────────────────────

CMS

Implement a production CMS foundation.

Support:

• Pages
• Sections
• Banners
• Campaign content
• Promotional content
• Navigation content
• Category editorial content
• SEO metadata
• Homepage configuration

Content lifecycle:

• Draft
• Review
• Approved
• Scheduled
• Published
• Unpublished
• Archived

────────────────────────────────────────

CMS VERSIONING

Support content versioning.

Track:

• Version
• Author
• Editor
• Created time
• Updated time
• Publication time
• Change summary

Published content must be immutable for historical reference.

────────────────────────────────────────

CMS SCHEDULING

Support:

• Scheduled publication
• Scheduled unpublication
• Start/end time
• Time-zone handling
• Failure handling

Use BullMQ or scheduled processing.

────────────────────────────────────────

FEATURE FLAGS

Implement feature flags.

Support:

• Global flags
• Environment flags
• Percentage rollout
• Customer targeting
• Seller targeting
• Region targeting
• Device targeting
• Application version targeting
• Kill switches
• Experiment assignment

Define:

• Flag owner
• Evaluation rules
• Cache
• Propagation
• Audit
• Expiration
• Cleanup

────────────────────────────────────────

FEATURE FLAG SAFETY

Support:

• Default-safe values
• Emergency kill switches
• Versioning
• Rollback
• Evaluation logging where appropriate

Feature flags must not be the only authorization mechanism.

Security-sensitive permissions must remain server-side.

────────────────────────────────────────

SYSTEM CONFIGURATION

Implement a controlled configuration system for dynamic business settings.

Examples:

• Order limits
• Coupon limits
• Return-window configuration
• Seller thresholds
• Review policy settings
• Notification limits
• Fraud thresholds
• Inventory thresholds
• Feature defaults

Configuration must be:

• Typed
• Validated
• Versioned
• Audited
• Environment-aware where appropriate
• Cached safely

Never allow arbitrary code execution through configuration.

────────────────────────────────────────

CONFIGURATION CHANGE WORKFLOW

High-risk configuration changes should support:

• Draft
• Review
• Approval
• Activation
• Rollback

Track:

• Actor
• Previous value
• New value
• Reason
• Timestamp
• Approval
• Rollback

────────────────────────────────────────

AUDIT DOMAIN

Implement a comprehensive immutable audit system.

Audit:

• Administrative actions
• Security actions
• Seller actions
• Financial actions
• Moderation actions
• CMS changes
• Feature-flag changes
• System-configuration changes
• Permission changes

Audit records must contain:

• Audit ID
• Actor
• Actor role
• Action
• Resource type
• Resource ID
• Before state reference where appropriate
• After state reference where appropriate
• Reason
• Request ID
• Correlation ID
• Timestamp
• Source
• Result

Do not store secrets or unnecessary sensitive information.

────────────────────────────────────────

AUDIT IMMUTABILITY

Audit logs must not be updated or deleted through ordinary application workflows.

Define retention and archival policies.

Administrative users must not be able to silently erase their own audit history.

────────────────────────────────────────

COMPLIANCE SUPPORT

Prepare the backend architecture for:

• SOC 2
• ISO 27001
• PCI DSS boundaries through payment-provider architecture
• GDPR
• Data retention policies
• Data deletion workflows
• Access logging
• Least privilege

Do not claim certification merely because controls exist.

────────────────────────────────────────

DATA RETENTION

Define configurable retention for:

• Audit logs
• Reports
• Moderation cases
• Security events
• Notifications
• Marketplace messages
• Analytics
• Administrative records

Do not automatically delete data required for legal or financial obligations.

Support legal/administrative retention holds where required.

────────────────────────────────────────

PRIVACY REQUESTS

Implement backend foundations for:

• Account data export
• Data access request
• Deletion request
• Data retention policy enforcement

Separate:

• Customer-owned data
• Operational data
• Financial records
• Audit records
• Legal-retention data

Do not delete mandatory financial records merely because an account deletion request is received.

────────────────────────────────────────

ADMIN EVENTS

Publish appropriate events:

• AdministrativeActionTaken
• SellerApproved
• SellerSuspended
• SellerRejected
• ProductModerated
• ReviewModerated
• ReportCreated
• ModerationCaseOpened
• ModerationActionTaken
• AppealSubmitted
• AppealResolved
• CMSContentPublished
• CMSContentUnpublished
• FeatureFlagCreated
• FeatureFlagChanged
• FeatureFlagDeleted
• SystemConfigurationChanged
• PermissionChanged
• AuditLogCreated
• RiskEvaluationCompleted
• FraudActionTaken

Use the established event envelope.

────────────────────────────────────────

BACKGROUND JOBS

Implement jobs for:

• Scheduled CMS publication
• Scheduled CMS unpublication
• Feature-flag cleanup
• Configuration propagation
• Audit archival
• Report cleanup
• Moderation reminders
• Risk recalculation
• Data-retention processing
• Data-export generation
• Data-deletion workflows

Every job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter handling
• Metrics

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for this volume.

Include appropriate entities such as:

• ModerationCase
• ModerationAction
• ModerationAssignment
• ModerationAppeal
• Report
• RiskRule
• RiskEvaluation
• FraudAction
• CMSPage
• CMSPageVersion
• CMSSection
• CMSPublication
• FeatureFlag
• FeatureFlagRule
• FeatureFlagTarget
• SystemConfiguration
• SystemConfigurationVersion
• AdministrativeAction
• AuditLog
• PrivacyRequest
• DataExportJob
• DataDeletionJob
• LegalHold where applicable

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Status constraints
• Version fields
• Timestamps

Audit and financial records must be immutable at the application level.

────────────────────────────────────────

API

Implement production-ready administrative APIs.

ADMIN USERS

• Search users
• Get account
• Suspend
• Reactivate
• Security investigation

SELLERS

• Search sellers
• Get seller
• Review verification
• Approve
• Reject
• Suspend
• Reactivate

CATALOG

• Review products
• Approve
• Reject
• Suspend
• Archive
• Manage categories
• Manage brands

ORDERS/FINANCE

• Investigate orders
• Investigate payments
• Investigate refunds
• Investigate returns
• Investigate payouts
• Create authorized financial adjustment

MODERATION

• Create report
• Get cases
• Assign case
• Take action
• Appeal
• Resolve

CMS

• Create content
• Update content
• Version content
• Schedule
• Publish
• Unpublish

FEATURE FLAGS

• Create
• Update
• Evaluate
• Roll out
• Roll back
• Disable

SYSTEM CONFIGURATION

• Create configuration
• Update
• Review
• Approve
• Activate
• Roll back

AUDIT

• Search audit records
• Get audit details
• Export audit data where authorized

PRIVACY

• Create data export
• Get export status
• Create deletion request
• Get deletion status

Every endpoint must include:

• Authentication
• Authorization
• Permission checks
• Validation
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Audit logging where appropriate

────────────────────────────────────────

ADMINISTRATIVE SEARCH

Search must be permission-aware.

Do not return sensitive fields such as:

• Password hashes
• Authentication secrets
• Payment credentials
• Internal security secrets

Redact or exclude restricted fields based on administrator role.

────────────────────────────────────────

SECURITY

Protect administrative APIs against:

• Privilege escalation
• IDOR
• Permission bypass
• Session hijacking
• CSRF where applicable
• Brute-force
• Malicious configuration
• Audit manipulation
• Financial abuse

Implement:

• Strong authentication
• Fine-grained authorization
• Rate limiting
• Re-authentication for sensitive actions
• Audit logging
• Secure session management

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Administrative access
• Permission denials
• Moderation
• Fraud decisions
• CMS publishing
• Feature-flag changes
• System configuration
• Privacy workflows
• Report generation

Measure:

• Administrative API latency
• Authorization failures
• Moderation backlog
• Fraud-review backlog
• CMS publishing failures
• Configuration propagation failures

Never log secrets.

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Permission policies
• Administrative policies
• Moderation workflows
• Fraud rules
• CMS state machine
• Feature flag evaluation
• Configuration validation
• Audit record creation
• Privacy workflows

INTEGRATION TESTS

Test:

• PostgreSQL
• Redis
• Kafka
• BullMQ
• S3
• Search where used

SECURITY TESTS

Test:

• Horizontal privilege escalation
• Vertical privilege escalation
• IDOR
• Admin session abuse
• Financial permission bypass
• Feature-flag bypass
• Configuration bypass
• Audit manipulation

ADMIN WORKFLOW TESTS

Test:

• Seller approval
• Seller suspension
• Product moderation
• Refund approval
• Report handling
• CMS publication
• Feature-flag rollout
• Configuration activation

PRIVACY TESTS

Test:

• Data export
• Data deletion
• Retention
• Legal holds

────────────────────────────────────────

DOCUMENTATION

Generate:

• Administration architecture
• Permission model
• Moderation model
• Fraud architecture
• Risk engine
• CMS architecture
• Feature-flag architecture
• System configuration
• Audit architecture
• Privacy workflows
• Compliance controls
• Administrative API documentation
• Event documentation
• Queue documentation
• Testing strategy

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Administration modules
• Moderation modules
• Fraud modules
• CMS modules
• Feature-flag modules
• System-configuration modules
• Audit modules
• Privacy modules
• Database objects
• Migrations
• APIs
• Events
• Queues
• Workers
• Tests
• Security controls
• Compliance controls
• Generated files
• Remaining work
• Current milestone
• Dependencies

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Administrative roles, permissions, policies, and administrative API foundation.

BACKEND MILESTONE 2

Customer and seller administration.

BACKEND MILESTONE 3

Catalog moderation, review moderation, reports, and moderation cases.

BACKEND MILESTONE 4

Fraud/risk rules, evaluations, and enforcement workflows.

BACKEND MILESTONE 5

CMS pages, content versions, scheduling, publication, and rollback.

BACKEND MILESTONE 6

Feature flags, targeting, rollout, caching, and audit history.

BACKEND MILESTONE 7

Dynamic system configuration, versioning, approval, activation, and rollback.

BACKEND MILESTONE 8

Audit infrastructure, retention, archival, privacy requests, and data-export workflows.

BACKEND MILESTONE 9

Cross-domain events, queues, observability, security hardening, and compliance preparation.

BACKEND MILESTONE 10

Integration testing, authorization testing, security testing, performance testing, and production-readiness review.

Each milestone should contain approximately 20–40 files where practical.

Every milestone must compile before proceeding.

────────────────────────────────────────

OUTPUT FORMAT

For every generated file provide:

1. Exact file path
2. Complete file contents

Never truncate code.

Never summarize source code instead of generating it.

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

This volume covers:

• Administration
• Administrative authorization
• Moderation
• Reporting
• Fraud prevention
• Risk evaluation
• CMS
• Feature flags
• System configuration
• Audit
• Privacy requests
• Compliance foundations

Do not implement:

• Frontend
• Mobile
• Infrastructure
• Kubernetes
• Terraform
• CI/CD

Do not redesign established catalog, inventory, checkout, order, payment, seller, search, notification, messaging, or analytics architectures.

────────────────────────────────────────

QUALITY BAR

Treat administration, financial controls, moderation, and security operations as high-risk enterprise systems.

Assume:

• Large administrator populations
• Multiple privilege levels
• Fraud attacks
• Seller abuse
• Financial abuse
• Regulatory requirements
• Audit requirements
• Sensitive customer information
• Sensitive seller information

Prioritize:

• Least privilege
• Strong authorization
• Auditability
• Security
• Data privacy
• Immutable financial records
• Safe configuration
• Controlled administrative actions
• Observability
• Reliability
• Production readiness
