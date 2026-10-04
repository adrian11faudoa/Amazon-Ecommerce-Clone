-- NOTE ON PROVENANCE — see prisma/migrations/20260101000000_init/migration.sql
-- for the full explanation. Hand-authored for the same reason
-- (binaries.prisma.sh blocked in the authoring sandbox). Diff against a
-- real `prisma migrate dev` run before trusting it in production.

-- Enums
CREATE TYPE "InventoryAdjustmentType" AS ENUM ('INITIAL_STOCK', 'MANUAL_CORRECTION', 'DAMAGED', 'FOUND', 'RECONCILIATION');
CREATE TYPE "ReservationState" AS ENUM ('ACTIVE', 'EXPIRED', 'RELEASED', 'CONSUMED', 'FAILED');
CREATE TYPE "CartStatus" AS ENUM ('ACTIVE', 'MERGED', 'CONVERTED', 'ABANDONED');
CREATE TYPE "CheckoutStatus" AS ENUM ('CREATED', 'VALIDATING', 'RESERVED', 'AWAITING_PAYMENT', 'FAILED', 'EXPIRED', 'CANCELLED', 'COMPLETED');

-- inventory_items
CREATE TABLE "inventory_items" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "sellerOfferId" TEXT NOT NULL,
    "onHandQuantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "inventory_items_sellerOfferId_key" ON "inventory_items"("sellerOfferId");
CREATE INDEX "inventory_items_organizationId_idx" ON "inventory_items"("organizationId");

-- Defense in depth alongside application-level atomic guards in
-- InventoryService: quantities can never be negative, and reserved can
-- never exceed on-hand.
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_onHandQuantity_nonnegative"
    CHECK ("onHandQuantity" >= 0);
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_reservedQuantity_nonnegative"
    CHECK ("reservedQuantity" >= 0);
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_reserved_not_exceeding_onhand"
    CHECK ("reservedQuantity" <= "onHandQuantity");

ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_sellerOfferId_fkey"
    FOREIGN KEY ("sellerOfferId") REFERENCES "seller_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- inventory_adjustments
CREATE TABLE "inventory_adjustments" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "quantityDelta" INTEGER NOT NULL,
    "type" "InventoryAdjustmentType" NOT NULL,
    "reason" TEXT NOT NULL,
    "actorUserId" TEXT,
    "correlationId" TEXT,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_adjustments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "inventory_adjustments_inventoryItemId_createdAt_idx" ON "inventory_adjustments"("inventoryItemId", "createdAt");

ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "inventory_adjustments_inventoryItemId_fkey"
    FOREIGN KEY ("inventoryItemId") REFERENCES "inventory_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- carts (created before checkouts/inventory_reservations, which reference it/each other)
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "anonymousToken" TEXT,
    "status" "CartStatus" NOT NULL DEFAULT 'ACTIVE',
    "revision" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "carts_anonymousToken_key" ON "carts"("anonymousToken");
CREATE INDEX "carts_customerId_status_idx" ON "carts"("customerId", "status");
CREATE INDEX "carts_status_expiresAt_idx" ON "carts"("status", "expiresAt");

-- checkouts (references carts; inventory_reservations references checkouts)
CREATE TABLE "checkouts" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "cartRevisionAtCreation" INTEGER NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "status" "CheckoutStatus" NOT NULL DEFAULT 'CREATED',
    "currency" TEXT NOT NULL,
    "subtotalMinorUnits" BIGINT NOT NULL DEFAULT 0,
    "discountMinorUnits" BIGINT NOT NULL DEFAULT 0,
    "totalMinorUnits" BIGINT NOT NULL DEFAULT 0,
    "failureReason" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "checkouts_customerId_idempotencyKey_key" ON "checkouts"("customerId", "idempotencyKey");
CREATE INDEX "checkouts_customerId_status_idx" ON "checkouts"("customerId", "status");
CREATE INDEX "checkouts_status_expiresAt_idx" ON "checkouts"("status", "expiresAt");
CREATE INDEX "checkouts_cartId_idx" ON "checkouts"("cartId");

ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_cartId_fkey"
    FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- inventory_reservations (references both inventory_items and checkouts)
CREATE TABLE "inventory_reservations" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "state" "ReservationState" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_reservations_pkey" PRIMARY KEY ("id")
);

-- The idempotency key for "reserve this offer's inventory for this
-- checkout" — see InventoryService.reserveForCheckout.
CREATE UNIQUE INDEX "inventory_reservations_checkoutId_inventoryItemId_key" ON "inventory_reservations"("checkoutId", "inventoryItemId");
CREATE INDEX "inventory_reservations_state_expiresAt_idx" ON "inventory_reservations"("state", "expiresAt");
CREATE INDEX "inventory_reservations_inventoryItemId_state_idx" ON "inventory_reservations"("inventoryItemId", "state");

ALTER TABLE "inventory_reservations" ADD CONSTRAINT "inventory_reservations_inventoryItemId_fkey"
    FOREIGN KEY ("inventoryItemId") REFERENCES "inventory_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "inventory_reservations" ADD CONSTRAINT "inventory_reservations_checkoutId_fkey"
    FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- cart_items
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "sellerOfferId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cart_items_cartId_sellerOfferId_key" ON "cart_items"("cartId", "sellerOfferId");

ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey"
    FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_sellerOfferId_fkey"
    FOREIGN KEY ("sellerOfferId") REFERENCES "seller_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- checkout_items
CREATE TABLE "checkout_items" (
    "id" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "sellerOfferId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPriceMinorUnits" BIGINT NOT NULL,
    "discountMinorUnits" BIGINT NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,
    "inventoryReservationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "checkout_items_inventoryReservationId_key" ON "checkout_items"("inventoryReservationId");
CREATE UNIQUE INDEX "checkout_items_checkoutId_sellerOfferId_key" ON "checkout_items"("checkoutId", "sellerOfferId");

ALTER TABLE "checkout_items" ADD CONSTRAINT "checkout_items_checkoutId_fkey"
    FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "checkout_items" ADD CONSTRAINT "checkout_items_sellerOfferId_fkey"
    FOREIGN KEY ("sellerOfferId") REFERENCES "seller_offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "checkout_items" ADD CONSTRAINT "checkout_items_inventoryReservationId_fkey"
    FOREIGN KEY ("inventoryReservationId") REFERENCES "inventory_reservations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
