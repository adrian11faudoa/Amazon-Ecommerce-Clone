import { Permission } from './permission.enum';
import { PlatformRoleName, SellerMembershipRoleName } from './role.enum';

/**
 * Every user implicitly has the baseline "self" permissions regardless of
 * role — reading/updating their own profile does not require an explicit
 * role grant.
 */
export const BASELINE_PERMISSIONS: Permission[] = [
  Permission.PROFILE_READ_SELF,
  Permission.PROFILE_UPDATE_SELF,
];

export const PLATFORM_ROLE_PERMISSIONS: Record<PlatformRoleName, Permission[]> = {
  [PlatformRoleName.CUSTOMER]: [],
  [PlatformRoleName.SUPPORT_AGENT]: [Permission.SUPPORT_USER_READ],
  [PlatformRoleName.MODERATOR]: [Permission.SUPPORT_USER_READ, Permission.MODERATION_ACT],
  [PlatformRoleName.PLATFORM_ADMIN]: [
    Permission.PLATFORM_ADMIN_FULL_ACCESS,
    Permission.PLATFORM_ADMIN_AUDIT_READ,
    Permission.SUPPORT_USER_READ,
    Permission.MODERATION_ACT,
    // Category/attribute taxonomy is a shared, platform-wide resource
    // (not seller-scoped), so it is managed under platform-admin
    // authority rather than seller-organization membership.
    Permission.CATALOG_CATEGORY_MANAGE,
    Permission.CATALOG_ATTRIBUTE_MANAGE,
  ],
};

export const SELLER_MEMBERSHIP_ROLE_PERMISSIONS: Record<SellerMembershipRoleName, Permission[]> = {
  [SellerMembershipRoleName.SELLER_STAFF]: [
    Permission.SELLER_ORGANIZATION_READ,
    // Day-to-day catalog upkeep: staff can create/edit listings and
    // media, but not the financially sensitive lifecycle actions below.
    Permission.CATALOG_PRODUCT_READ,
    Permission.CATALOG_PRODUCT_MANAGE,
    Permission.CATALOG_MEDIA_MANAGE,
    Permission.INVENTORY_READ,
  ],
  [SellerMembershipRoleName.SELLER_ADMIN]: [
    Permission.SELLER_ORGANIZATION_READ,
    Permission.SELLER_ORGANIZATION_MANAGE,
    Permission.SELLER_MEMBERSHIP_MANAGE,
    Permission.CATALOG_PRODUCT_READ,
    Permission.CATALOG_PRODUCT_MANAGE,
    Permission.CATALOG_PRODUCT_PUBLISH,
    Permission.CATALOG_OFFER_MANAGE,
    Permission.CATALOG_PRICE_MANAGE,
    Permission.CATALOG_PROMOTION_MANAGE,
    Permission.CATALOG_MEDIA_MANAGE,
    Permission.INVENTORY_READ,
    Permission.INVENTORY_MANAGE,
    Permission.INVENTORY_RECONCILE,
    Permission.INVENTORY_RESERVATION_RELEASE,
  ],
};

export function permissionsForPlatformRoles(roles: PlatformRoleName[]): Set<Permission> {
  const permissions = new Set<Permission>(BASELINE_PERMISSIONS);
  for (const role of roles) {
    for (const permission of PLATFORM_ROLE_PERMISSIONS[role] ?? []) {
      permissions.add(permission);
    }
  }
  return permissions;
}

export function permissionsForSellerRole(role: SellerMembershipRoleName): Set<Permission> {
  return new Set(SELLER_MEMBERSHIP_ROLE_PERMISSIONS[role] ?? []);
}
