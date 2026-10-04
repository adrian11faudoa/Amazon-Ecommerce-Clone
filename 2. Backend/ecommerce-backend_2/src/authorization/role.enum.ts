/** Platform-level roles. Mirrors the Prisma `PlatformRole` enum. */
export enum PlatformRoleName {
  CUSTOMER = 'CUSTOMER',
  SUPPORT_AGENT = 'SUPPORT_AGENT',
  MODERATOR = 'MODERATOR',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
}

/** Organization-scoped roles. Mirrors the Prisma `MembershipRole` enum. */
export enum SellerMembershipRoleName {
  SELLER_ADMIN = 'SELLER_ADMIN',
  SELLER_STAFF = 'SELLER_STAFF',
}
