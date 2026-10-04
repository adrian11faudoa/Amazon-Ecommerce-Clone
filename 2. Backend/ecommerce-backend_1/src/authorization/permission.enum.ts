/**
 * Stable permission identifiers for this milestone's foundation.
 *
 * Future domains (catalog, orders, payments, ...) add their own
 * permissions here without needing to redesign the authorization
 * subsystem — PermissionsGuard and role→permission mapping are generic.
 */
export enum Permission {
  // Self-service profile
  PROFILE_READ_SELF = 'profile:read:self',
  PROFILE_UPDATE_SELF = 'profile:update:self',

  // Seller organization
  SELLER_ORGANIZATION_READ = 'seller_organization:read',
  SELLER_ORGANIZATION_MANAGE = 'seller_organization:manage',
  SELLER_MEMBERSHIP_MANAGE = 'seller_membership:manage',

  // Support / moderation
  SUPPORT_USER_READ = 'support:user:read',
  MODERATION_ACT = 'moderation:act',

  // Platform administration
  PLATFORM_ADMIN_FULL_ACCESS = 'platform_admin:full_access',
  PLATFORM_ADMIN_AUDIT_READ = 'platform_admin:audit:read',
}
