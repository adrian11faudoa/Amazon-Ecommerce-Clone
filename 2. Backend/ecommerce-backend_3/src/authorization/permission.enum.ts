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

  // Catalog (Volume 2)
  CATALOG_PRODUCT_READ = 'catalog:product:read',
  CATALOG_PRODUCT_MANAGE = 'catalog:product:manage',
  CATALOG_PRODUCT_PUBLISH = 'catalog:product:publish',
  CATALOG_OFFER_MANAGE = 'catalog:offer:manage',
  CATALOG_PRICE_MANAGE = 'catalog:price:manage',
  CATALOG_PROMOTION_MANAGE = 'catalog:promotion:manage',
  CATALOG_MEDIA_MANAGE = 'catalog:media:manage',
  CATALOG_CATEGORY_MANAGE = 'catalog:category:manage',
  CATALOG_ATTRIBUTE_MANAGE = 'catalog:attribute:manage',

  // Inventory (Volume 3)
  INVENTORY_READ = 'inventory:read',
  INVENTORY_MANAGE = 'inventory:manage',
  INVENTORY_RECONCILE = 'inventory:reconcile',
  INVENTORY_RESERVATION_RELEASE = 'inventory:reservation:release',
}
