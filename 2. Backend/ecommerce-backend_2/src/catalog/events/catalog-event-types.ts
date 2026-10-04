/**
 * Stable catalog domain event type identifiers (transactional outbox).
 * Add new types here; never rename existing ones — they are a durable
 * integration contract for search indexing and future consumers.
 */
export enum CatalogEventType {
  PRODUCT_CREATED = 'catalog.product.created',
  PRODUCT_UPDATED = 'catalog.product.updated',
  PRODUCT_PUBLISHED = 'catalog.product.published',
  PRODUCT_UNPUBLISHED = 'catalog.product.unpublished',
  PRODUCT_ARCHIVED = 'catalog.product.archived',
  PRODUCT_VARIANT_CREATED = 'catalog.product_variant.created',
  PRODUCT_VARIANT_UPDATED = 'catalog.product_variant.updated',
  OFFER_CREATED = 'catalog.offer.created',
  OFFER_UPDATED = 'catalog.offer.updated',
  PRICE_CHANGED = 'catalog.price.changed',
  PROMOTION_ACTIVATED = 'catalog.promotion.activated',
  PROMOTION_DEACTIVATED = 'catalog.promotion.deactivated',
  MEDIA_ASSET_CREATED = 'catalog.media_asset.created',
  MEDIA_ASSET_READY = 'catalog.media_asset.ready',
  MEDIA_ASSET_REMOVED = 'catalog.media_asset.removed',
  CATEGORY_CHANGED = 'catalog.category.changed',
}

export const CATALOG_EVENT_SCHEMA_VERSION = 1;
