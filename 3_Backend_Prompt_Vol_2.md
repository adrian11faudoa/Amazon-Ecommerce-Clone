You are operating in Senior Engineering Team Mode.

Build the production-ready backend for identity, customer accounts, authentication, profiles, addresses, seller onboarding, seller accounts, seller staff, stores, authorization, and access control for an enterprise-scale global ecommerce marketplace comparable in architectural scope to Amazon Marketplace.

The platform is an original implementation.

Do not copy proprietary source code, internal architecture, branding, confidential implementation details, or proprietary designs from Amazon or any other company.

This prompt is completely independent and may be executed in a separate conversation.

The backend must follow the established ecommerce architecture, database ownership model, API conventions, security model, event architecture, and payment architecture.

Do not redesign the architecture.

Do not generate frontend code.

Do not generate mobile code.

Do not generate Kubernetes manifests.

Do not generate Terraform.

Do not generate infrastructure implementation code.

Do not generate CI/CD workflows.

────────────────────────────────────────

MISSION

Implement the production-ready backend domains for:

• Identity
• Users
• Customer accounts
• Authentication
• Authorization
• Profiles
• Addresses
• Sessions
• Devices
• Seller accounts
• Seller onboarding
• Seller verification
• Seller staff
• Stores
• Seller permissions
• Account security
• Privacy
• Audit logging related to identity and seller administration

The implementation must support:

• Millions of customers
• Hundreds of thousands of sellers
• Multiple staff members per seller
• Multiple addresses per customer
• Multiple sessions and devices
• Global deployment
• High availability
• Horizontal scaling
• Strong security
• Seller isolation

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

Events:

• Kafka or Redpanda

Background Jobs:

• BullMQ

Authentication:

• JWT and/or secure session architecture according to the established design

Testing:

• Jest
• Supertest
• Integration testing tools

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

Use centralized errors.

Use structured logging.

Use the existing observability infrastructure.

────────────────────────────────────────

DOMAIN OWNERSHIP

Keep clear boundaries between:

Identity

Customers

Accounts

Authentication

Authorization

Profiles

Addresses

Sessions

Devices

Seller Management

Seller Verification

Seller Staff

Stores

Privacy

Security

Audit

Do not combine all identity and seller logic into one uncontrolled module.

────────────────────────────────────────

CUSTOMER IDENTITY

Implement:

• User creation
• User retrieval
• User status
• Identity lifecycle
• Account association
• Account activation
• Account suspension
• Account deactivation
• Account deletion workflow

Support explicit states such as:

• Pending
• Active
• Suspended
• Disabled
• Deactivated
• Deleted

Use stable public identifiers.

Do not expose internal database identifiers unnecessarily.

────────────────────────────────────────

CUSTOMER ACCOUNT

Implement:

• Account creation
• Account settings
• Account status
• Account security settings
• Account deletion request
• Account deletion processing
• Account recovery
• Account suspension
• Account reactivation where permitted

Separate:

• Identity
• Account
• Profile
• Address
• Session
• Device

Account-level operations must be auditable.

────────────────────────────────────────

PROFILE

Implement:

• Profile creation
• Profile retrieval
• Profile updates
• Display name
• Avatar reference
• Contact information
• Preferences

Do not store large binary images inside PostgreSQL.

Use media/object-storage references.

Return only information appropriate to the requesting user.

────────────────────────────────────────

ADDRESSES

Implement customer address management.

Support:

• Create address
• Update address
• Delete address
• List addresses
• Default billing address
• Default shipping address

Address fields must support internationalization where appropriate:

• Full name
• Organization
• Address lines
• City
• State/province
• Postal code
• Country
• Phone
• Delivery instructions where appropriate

Validate country and region combinations.

Do not allow deleted addresses to be silently used by future orders.

Historical orders must preserve the appropriate address snapshot.

────────────────────────────────────────

AUTHENTICATION

Implement:

• Registration
• Login
• Logout
• Refresh
• Session creation
• Session revocation
• Email verification
• Password reset
• Password change

Prepare architecture for:

• MFA
• OAuth
• Passkeys
• Social authentication

Do not implement unsupported providers as fake placeholders.

────────────────────────────────────────

PASSWORD SECURITY

Implement:

• Industry-standard password hashing
• Password verification
• Password change
• Password reset
• Reset-token expiration
• Single-use reset tokens
• Login-attempt protection
• Password reuse protection where justified

Never:

• Store plaintext passwords
• Log passwords
• Return password hashes
• Include passwords in events

────────────────────────────────────────

EMAIL VERIFICATION

Implement:

• Verification token generation
• Verification token expiration
• Single-use verification
• Resend limits
• Verification state
• Replay prevention

Integrate with the established notification infrastructure.

────────────────────────────────────────

SESSION MANAGEMENT

Implement:

• Session creation
• Session listing
• Session retrieval
• Session refresh
• Session expiration
• Session revocation
• Logout
• Logout-all-sessions

Track appropriate metadata:

• Device
• Platform
• Application version
• IP metadata where justified
• Created timestamp
• Last activity
• Expiration
• Revocation state

Do not store sensitive secrets unnecessarily.

────────────────────────────────────────

DEVICE MANAGEMENT

Implement:

• Device registration
• Device identification
• Platform
• Application version
• Device metadata
• Push token association
• Session association
• Device revocation
• Remote logout

Do not collect unnecessary device information.

────────────────────────────────────────

CUSTOMER AUTHORIZATION

Implement RBAC and permission infrastructure.

Roles should support:

• Customer
• Support Agent
• Moderator
• Administrator
• Super Administrator
• System Service

Permissions must cover:

• Account
• Profile
• Addresses
• Orders
• Reviews
• Messaging
• Returns
• Administrative operations

Implement:

• Guards
• Permission decorators
• Policy checks
• Resource ownership

────────────────────────────────────────

SELLER DOMAIN

Implement the seller account foundation.

Support:

• Seller registration
• Seller account
• Legal/business information
• Store association
• Seller status
• Seller verification
• Seller staff
• Seller permissions

Seller states:

• Pending
• Verification Required
• Under Review
• Approved
• Suspended
• Rejected
• Terminated

Define valid transitions.

────────────────────────────────────────

SELLER ONBOARDING

Implement the onboarding workflow.

Support:

• Seller registration
• Business information
• Identity information where required
• Legal entity information
• Tax information
• Payout setup boundary
• Store creation
• Document references
• Verification submission
• Review state

Do not store unnecessary sensitive legal information.

For payment/payout data, use provider references where possible.

────────────────────────────────────────

SELLER VERIFICATION

Implement verification workflows.

Support:

• Verification submission
• Verification status
• Review
• Approval
• Rejection
• Resubmission
• Suspension

Define:

• Required documents
• Verification requirements
• State transitions
• Audit events
• Administrative permissions

Keep third-party verification providers behind an abstraction.

────────────────────────────────────────

STORE DOMAIN

Implement:

• Store creation
• Store profile
• Store name
• Store description
• Store logo reference
• Store status
• Store settings
• Store visibility

Store states may include:

• Draft
• Pending Approval
• Active
• Suspended
• Closed

A seller may have multiple stores only if the established architecture permits it.

────────────────────────────────────────

SELLER STAFF

Implement:

• Staff invitation
• Staff acceptance
• Staff removal
• Staff status
• Staff roles
• Staff permissions
• Staff suspension

Define seller-scoped permissions.

Staff must never be able to access:

• Another seller's products
• Another seller's customers
• Another seller's orders
• Another seller's inventory
• Another seller's financial information

unless explicitly authorized by platform administration.

────────────────────────────────────────

SELLER PERMISSIONS

Implement role/permission categories for:

• Store management
• Catalog
• Products
• Inventory
• Orders
• Fulfillment
• Shipping
• Reviews
• Messaging
• Promotions
• Coupons
• Analytics
• Financials
• Payouts

Create explicit seller-scoped authorization policies.

Never trust seller-provided seller IDs.

Always derive seller scope from authenticated identity and authorized resources.

────────────────────────────────────────

SELLER ISOLATION

Implement strong tenant-style seller isolation.

Every seller-owned resource must enforce ownership.

This applies to:

• Stores
• Products
• Seller offers
• Inventory
• Orders
• Fulfillment
• Reviews
• Messages
• Promotions
• Coupons
• Analytics
• Financial data

Prevent:

• Horizontal privilege escalation
• Cross-seller data access
• IDOR vulnerabilities
• Unauthorized seller impersonation

────────────────────────────────────────

PRIVACY

Implement customer privacy controls appropriate to the platform.

Support:

• Profile visibility
• Contact information visibility
• Address privacy
• Notification preferences
• Communication preferences

Seller users must only receive customer information necessary to fulfill legitimate business operations.

────────────────────────────────────────

SECURITY EVENTS

Implement events such as:

• UserRegistered
• UserVerified
• UserLoggedIn
• LoginFailed
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• PasswordChanged
• PasswordResetRequested
• PasswordResetCompleted
• AccountSuspended
• SellerRegistered
• SellerVerificationSubmitted
• SellerApproved
• SellerRejected
• SellerSuspended
• SellerStaffInvited
• SellerStaffRemoved
• RoleAssigned
• RoleRevoked

Events must contain only required information.

Never include passwords, access tokens, refresh tokens, payment secrets, or sensitive verification documents.

────────────────────────────────────────

AUDIT LOGGING

Audit sensitive identity and seller actions.

Track:

• Actor
• Action
• Resource
• Resource ID
• Timestamp
• Request ID
• Correlation ID
• Result
• Safe metadata

Audit:

• Login
• Logout
• Password changes
• Account suspension
• Seller approval
• Seller rejection
• Seller suspension
• Staff role changes
• Permission changes
• Administrative actions

────────────────────────────────────────

RATE LIMITING

Apply rate limits to:

• Registration
• Login
• Password reset
• Verification
• Session refresh
• Device registration
• Seller registration
• Seller verification submission
• Staff invitations

Support limits by:

• IP
• Account
• Device
• Identifier
• Operation

Protect against automated abuse.

────────────────────────────────────────

ACCOUNT RECOVERY

Implement:

• Password reset
• Credential recovery
• Session invalidation after recovery
• Device/session review
• Security notification

Recovery must invalidate compromised authentication state where appropriate.

────────────────────────────────────────

DATABASE

Implement Prisma models and migrations for this volume.

Include appropriate models such as:

• User
• Account
• Profile
• Address
• Session
• Device
• VerificationToken
• PasswordResetToken
• Role
• Permission
• RolePermission
• UserRole
• Seller
• SellerVerification
• SellerDocumentReference
• SellerStaff
• SellerStaffRole
• Store
• StoreSettings
• AuditLog
• SecurityEvent where appropriate

Use:

• Primary keys
• Foreign keys
• Unique constraints
• Composite indexes
• Check constraints
• Created timestamps
• Updated timestamps
• Soft deletion where justified

Do not store raw payment-card information.

Do not create full product/order/inventory schemas in this volume.

────────────────────────────────────────

API

Implement production-ready REST APIs.

AUTHENTICATION

• Register
• Login
• Logout
• Refresh
• Verify
• Password reset
• Password change

ACCOUNT

• Get account
• Update account
• Delete account
• Security settings

PROFILE

• Get profile
• Update profile

ADDRESSES

• Create
• List
• Update
• Delete
• Set default billing
• Set default shipping

SESSIONS

• List sessions
• Revoke session
• Revoke all sessions

DEVICES

• Register device
• List devices
• Update device
• Revoke device

SELLER

• Register seller
• Get seller
• Update seller
• Submit verification
• Get verification status

STORE

• Create store
• Get store
• Update store
• Store status

SELLER STAFF

• Invite
• Accept invitation
• List staff
• Update staff
• Remove staff

ADMINISTRATION

• Approve seller
• Reject seller
• Suspend seller
• Manage roles
• Manage permissions
• View audit logs

Every endpoint must include:

• Authentication
• Authorization
• DTO validation
• Rate limiting
• OpenAPI documentation
• Consistent errors
• Idempotency where appropriate

────────────────────────────────────────

EVENTS

Publish events using the established event infrastructure.

Use transactional outbox where database transactions require event publication.

Events include:

• UserRegistered
• UserVerified
• UserLoggedIn
• SessionCreated
• SessionRevoked
• DeviceRegistered
• DeviceRevoked
• PasswordChanged
• AccountSuspended
• SellerRegistered
• SellerVerificationSubmitted
• SellerApproved
• SellerRejected
• SellerSuspended
• StoreCreated
• StoreUpdated
• SellerStaffInvited
• SellerStaffAdded
• SellerStaffRemoved
• RoleAssigned
• RoleRevoked
• AddressCreated
• AddressUpdated
• AddressDeleted

Consumers must be idempotent.

────────────────────────────────────────

BACKGROUND JOBS

Implement appropriate jobs for:

• Verification cleanup
• Password-reset cleanup
• Session cleanup
• Device cleanup
• Seller verification processing
• Seller invitation expiration
• Account deletion processing
• Audit retention

Every job must support:

• Retry
• Backoff
• Timeout
• Idempotency
• Dead-letter handling
• Monitoring

────────────────────────────────────────

OBSERVABILITY

Instrument:

• Registration
• Login
• Authentication failures
• Session operations
• Device operations
• Seller onboarding
• Seller verification
• Staff invitations
• Permission checks
• Administrative operations

Measure:

• Authentication latency
• Registration failures
• Login failure rate
• Rate-limit events
• Seller verification latency
• Authorization failures

Never log:

• Passwords
• Tokens
• Payment credentials
• Sensitive verification documents

────────────────────────────────────────

TESTING

UNIT TESTS

Test:

• Authentication services
• Password handling
• Session policies
• Authorization
• Seller isolation
• Seller verification rules
• Staff permissions
• Address validation
• Privacy rules

INTEGRATION TESTS

Test:

• Registration
• Login
• Refresh
• Logout
• Password reset
• Session revocation
• Device registration
• Address operations
• Seller registration
• Seller verification
• Store creation
• Staff management
• Role management

SECURITY TESTS

Test:

• Brute-force protection
• Token replay
• Session invalidation
• Authorization bypass
• Seller isolation
• IDOR
• Privilege escalation
• User enumeration
• Rate-limit bypass

API TESTS

Test all endpoints generated in this volume.

────────────────────────────────────────

DOCUMENTATION

Generate:

• Identity architecture
• Authentication flows
• Session lifecycle
• Device lifecycle
• Authorization model
• Customer account model
• Address model
• Seller onboarding
• Seller verification
• Seller isolation
• Seller staff roles
• Permission model
• Security events
• Audit logging
• API documentation
• Database documentation
• Testing documentation

────────────────────────────────────────

PROJECT INDEX

Update the backend Project Index with:

• Identity modules
• Customer modules
• Authentication modules
• Profile modules
• Address modules
• Session modules
• Device modules
• Authorization modules
• Seller modules
• Store modules
• Seller staff modules
• Security modules
• Audit modules
• Database objects
• Migrations
• API endpoints
• Events
• Background jobs
• Tests
• Generated files
• Remaining work
• Dependencies
• Current milestone

────────────────────────────────────────

IMPLEMENTATION MILESTONES

BACKEND MILESTONE 1

Customer identity, users, accounts, profiles, addresses, and database models.

BACKEND MILESTONE 2

Authentication, password handling, verification, sessions, devices, and security.

BACKEND MILESTONE 3

Authorization, RBAC, permissions, policies, and administrative roles.

BACKEND MILESTONE 4

Seller registration, seller verification, seller lifecycle, and store management.

BACKEND MILESTONE 5

Seller staff, seller-scoped permissions, seller isolation, and administrative workflows.

BACKEND MILESTONE 6

Security events, audit logging, recovery workflows, cleanup jobs, and notifications integration.

BACKEND MILESTONE 7

API completion, integration testing, security testing, observability, and production hardening.

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

• Identity
• Users
• Customer accounts
• Authentication
• Authorization
• Profiles
• Addresses
• Sessions
• Devices
• Seller onboarding
• Seller verification
• Seller accounts
• Stores
• Seller staff
• Seller permissions
• Seller isolation
• Security events
• Audit foundations

Do not implement complete:

• Catalog
• Products
• Variants
• Pricing
• Promotions
• Coupons
• Inventory
• Cart
• Checkout
• Orders
• Payments
• Fulfillment
• Shipping
• Returns
• Reviews
• Search
• Recommendations
• Notifications
• Messaging
• Analytics
• CMS
• Moderation

Those belong to later backend implementation volumes.

────────────────────────────────────────

QUALITY BAR

Treat customer identity and seller access as critical production infrastructure.

Assume:

• Millions of customers
• Hundreds of thousands of sellers
• Multiple seller staff members
• Large login volume
• Automated attacks
• Seller fraud attempts
• Privilege escalation attempts
• Global deployment
• Strict privacy requirements
• Strict security requirements

Prioritize:

• Security
• Seller isolation
• Correct authorization
• Auditability
• Reliability
• Scalability
• Maintainability
• Observability
• Production readiness
