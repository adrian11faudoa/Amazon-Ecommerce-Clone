-- NOTE ON PROVENANCE — see prisma/migrations/20260101000000_init/migration.sql
-- for the full explanation. This migration was hand-authored for the same
-- reason (binaries.prisma.sh blocked in the authoring sandbox). Diff it
-- against a real `prisma migrate dev` run before trusting it in production.

-- Enums
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE "AttributeType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'SELECT');
CREATE TYPE "OfferStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');
CREATE TYPE "OfferCondition" AS ENUM ('NEW', 'USED', 'REFURBISHED');
CREATE TYPE "PromotionDiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
CREATE TYPE "MediaAssetType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');
CREATE TYPE "MediaAssetStatus" AS ENUM ('PENDING_UPLOAD', 'PROCESSING', 'READY', 'FAILED', 'DELETED');
CREATE TYPE "OutboxEventStatus" AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- categories
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");
CREATE INDEX "categories_isActive_idx" ON "categories"("isActive");

ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey"
    FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- attribute_definitions
CREATE TABLE "attribute_definitions" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "AttributeType" NOT NULL,
    "allowedValues" JSONB,
    "isVariantAttribute" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attribute_definitions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "attribute_definitions_key_key" ON "attribute_definitions"("key");
CREATE INDEX "attribute_definitions_isVariantAttribute_idx" ON "attribute_definitions"("isVariantAttribute");

-- category_attributes
CREATE TABLE "category_attributes" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "attributeDefinitionId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_attributes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "category_attributes_categoryId_attributeDefinitionId_key" ON "category_attributes"("categoryId", "attributeDefinitionId");

ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_attributeDefinitionId_fkey"
    FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- products
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "categoryId" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "products_organizationId_slug_key" ON "products"("organizationId", "slug");
CREATE INDEX "products_organizationId_status_idx" ON "products"("organizationId", "status");
CREATE INDEX "products_categoryId_status_idx" ON "products"("categoryId", "status");

ALTER TABLE "products" ADD CONSTRAINT "products_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "seller_organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- product_attribute_values
CREATE TABLE "product_attribute_values" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeDefinitionId" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_attribute_values_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "product_attribute_values_productId_attributeDefinitionId_key" ON "product_attribute_values"("productId", "attributeDefinitionId");

ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey"
    FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- product_variants
CREATE TABLE "product_variants" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributeSignature" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "product_variants_productId_attributeSignature_key" ON "product_variants"("productId", "attributeSignature");
CREATE INDEX "product_variants_productId_isActive_idx" ON "product_variants"("productId", "isActive");

ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- variant_attribute_values
CREATE TABLE "variant_attribute_values" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "attributeDefinitionId" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "variant_attribute_values_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "variant_attribute_values_variantId_attributeDefinitionId_key" ON "variant_attribute_values"("variantId", "attributeDefinitionId");

ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_variantId_fkey"
    FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey"
    FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- skus
CREATE TABLE "skus" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skus_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "skus_variantId_key" ON "skus"("variantId");
CREATE UNIQUE INDEX "skus_organizationId_code_key" ON "skus"("organizationId", "code");
CREATE INDEX "skus_organizationId_isActive_idx" ON "skus"("organizationId", "isActive");

ALTER TABLE "skus" ADD CONSTRAINT "skus_variantId_fkey"
    FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- seller_offers
CREATE TABLE "seller_offers" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'DRAFT',
    "condition" "OfferCondition" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seller_offers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "seller_offers_skuId_key" ON "seller_offers"("skuId");
CREATE INDEX "seller_offers_organizationId_status_idx" ON "seller_offers"("organizationId", "status");

ALTER TABLE "seller_offers" ADD CONSTRAINT "seller_offers_skuId_fkey"
    FOREIGN KEY ("skuId") REFERENCES "skus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- prices
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "sellerOfferId" TEXT NOT NULL,
    "amountMinorUnits" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "prices_sellerOfferId_isActive_idx" ON "prices"("sellerOfferId", "isActive");
CREATE INDEX "prices_sellerOfferId_effectiveFrom_idx" ON "prices"("sellerOfferId", "effectiveFrom");

-- Defense in depth alongside the application-level transaction in
-- PricingService.activatePrice: at most one row per offer can have
-- (isActive = true AND effectiveTo IS NULL) at a time.
CREATE UNIQUE INDEX "prices_one_active_per_offer"
    ON "prices"("sellerOfferId")
    WHERE "isActive" = true AND "effectiveTo" IS NULL;

ALTER TABLE "prices" ADD CONSTRAINT "prices_sellerOfferId_fkey"
    FOREIGN KEY ("sellerOfferId") REFERENCES "seller_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- promotions
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discountType" "PromotionDiscountType" NOT NULL,
    "discountValue" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "usageLimit" INTEGER,
    "timesUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "promotions_organizationId_isActive_idx" ON "promotions"("organizationId", "isActive");
CREATE INDEX "promotions_startAt_endAt_idx" ON "promotions"("startAt", "endAt");

-- promotion_offers
CREATE TABLE "promotion_offers" (
    "promotionId" TEXT NOT NULL,
    "sellerOfferId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotion_offers_pkey" PRIMARY KEY ("promotionId", "sellerOfferId")
);

CREATE INDEX "promotion_offers_sellerOfferId_idx" ON "promotion_offers"("sellerOfferId");

ALTER TABLE "promotion_offers" ADD CONSTRAINT "promotion_offers_promotionId_fkey"
    FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "promotion_offers" ADD CONSTRAINT "promotion_offers_sellerOfferId_fkey"
    FOREIGN KEY ("sellerOfferId") REFERENCES "seller_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- media_assets
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "assetType" "MediaAssetType" NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT,
    "status" "MediaAssetStatus" NOT NULL DEFAULT 'PENDING_UPLOAD',
    "uploadExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "media_assets_storageKey_key" ON "media_assets"("storageKey");
CREATE INDEX "media_assets_organizationId_status_idx" ON "media_assets"("organizationId", "status");
CREATE INDEX "media_assets_productId_idx" ON "media_assets"("productId");
CREATE INDEX "media_assets_variantId_idx" ON "media_assets"("variantId");
CREATE INDEX "media_assets_uploadExpiresAt_idx" ON "media_assets"("uploadExpiresAt");

ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_variantId_fkey"
    FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- outbox_events
CREATE TABLE "outbox_events" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventVersion" INTEGER NOT NULL DEFAULT 1,
    "aggregateType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "correlationId" TEXT,
    "status" "OutboxEventStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "producedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "outbox_events_status_producedAt_idx" ON "outbox_events"("status", "producedAt");
CREATE INDEX "outbox_events_aggregateType_aggregateId_idx" ON "outbox_events"("aggregateType", "aggregateId");

-- SellerOrganization.products back-relation requires no DDL of its own
-- (the FK lives on products.organizationId, added above).
