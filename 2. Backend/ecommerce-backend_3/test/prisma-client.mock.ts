/**
 * TEST-ONLY STUB.
 *
 * This file exists solely because the sandbox this project was first
 * written in cannot reach https://binaries.prisma.sh (blocked by the
 * environment's egress allowlist), so `prisma generate` cannot download
 * the query/schema engine there. Without a generated client,
 * `@prisma/client` exports no model types or enum values, which would
 * make it impossible to unit-test business logic in that sandbox at all.
 *
 * This stub mirrors the enum values declared in prisma/schema.prisma
 * exactly, and provides a minimal PrismaClientKnownRequestError shape
 * for the two call sites that narrow on it (P2002 unique-constraint
 * handling in UsersService/MembershipsService).
 *
 * Action required once you have normal network access:
 *   1. Run `npx prisma generate`.
 *   2. Delete this file and the `moduleNameMapper` entry for
 *      '^@prisma/client$' in package.json's jest config.
 *   3. Remove `isolatedModules: true` from the ts-jest config in the
 *      same block, so tests regain full type-checking against the real
 *      generated client.
 *
 * Nothing in src/ imports this file directly — only the test runner's
 * module resolution redirects here.
 */

export const UserStatus = {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DEACTIVATED: 'DEACTIVATED',
} as const;

export const PlatformRole = {
  CUSTOMER: 'CUSTOMER',
  SUPPORT_AGENT: 'SUPPORT_AGENT',
  MODERATOR: 'MODERATOR',
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
} as const;

export const OrganizationStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED',
} as const;

export const MembershipRole = {
  SELLER_ADMIN: 'SELLER_ADMIN',
  SELLER_STAFF: 'SELLER_STAFF',
} as const;

export const MembershipStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REMOVED: 'REMOVED',
} as const;

export const AuditOutcome = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

// --- Catalog enums (Volume 2) ---

export const ProductStatus = {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const AttributeType = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  SELECT: 'SELECT',
} as const;

export const OfferStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const OfferCondition = {
  NEW: 'NEW',
  USED: 'USED',
  REFURBISHED: 'REFURBISHED',
} as const;

export const PromotionDiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
} as const;

export const MediaAssetType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
} as const;

export const MediaAssetStatus = {
  PENDING_UPLOAD: 'PENDING_UPLOAD',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  FAILED: 'FAILED',
  DELETED: 'DELETED',
} as const;

export const OutboxEventStatus = {
  PENDING: 'PENDING',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED',
} as const;

// --- Inventory / cart / checkout enums (Volume 3) ---

export const InventoryAdjustmentType = {
  INITIAL_STOCK: 'INITIAL_STOCK',
  MANUAL_CORRECTION: 'MANUAL_CORRECTION',
  DAMAGED: 'DAMAGED',
  FOUND: 'FOUND',
  RECONCILIATION: 'RECONCILIATION',
} as const;

export const ReservationState = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  RELEASED: 'RELEASED',
  CONSUMED: 'CONSUMED',
  FAILED: 'FAILED',
} as const;

export const CartStatus = {
  ACTIVE: 'ACTIVE',
  MERGED: 'MERGED',
  CONVERTED: 'CONVERTED',
  ABANDONED: 'ABANDONED',
} as const;

export const CheckoutStatus = {
  CREATED: 'CREATED',
  VALIDATING: 'VALIDATING',
  RESERVED: 'RESERVED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export class PrismaClientKnownRequestError extends Error {
  code: string;
  meta?: Record<string, unknown>;

  constructor(message: string, code: string, meta?: Record<string, unknown>) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

export const Prisma = {
  PrismaClientKnownRequestError,
};

export class PrismaClient {
  $connect() {
    return Promise.resolve();
  }
  $disconnect() {
    return Promise.resolve();
  }
  $queryRaw() {
    return Promise.resolve([]);
  }
  $transaction(arg: unknown) {
    if (typeof arg === 'function') {
      return (arg as (tx: unknown) => unknown)(this);
    }
    return Promise.resolve(arg);
  }
  $on() {
    // no-op in the stub
  }
}
