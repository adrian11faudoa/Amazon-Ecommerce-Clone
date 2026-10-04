import { Injectable } from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import { AttributeDefinitionsService } from '../attributes/attribute-definitions.service';
import { slugify } from '../common/slugify.util';
import {
  clampPageSize,
  decodeCursor,
  encodeCursor,
  PagedResult,
} from '../common/cursor-pagination.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ListProductsQueryDto,
  PRODUCT_LIST_DEFAULT_PAGE_SIZE,
  PRODUCT_LIST_MAX_PAGE_SIZE,
} from './dto/list-products-query.dto';
import { ProductResponseDto } from './dto/product-response.dto';

// Explicit, closed lifecycle transition graph — see PRODUCT LIFECYCLE.
// PENDING_REVIEW is reserved for a future moderation milestone; nothing
// in this milestone transitions into or out of it.
const ALLOWED_TRANSITIONS: Record<ProductStatus, ProductStatus[]> = {
  DRAFT: [ProductStatus.ACTIVE, ProductStatus.ARCHIVED],
  PENDING_REVIEW: [ProductStatus.ACTIVE, ProductStatus.ARCHIVED],
  ACTIVE: [ProductStatus.PAUSED, ProductStatus.ARCHIVED],
  PAUSED: [ProductStatus.ACTIVE, ProductStatus.ARCHIVED],
  ARCHIVED: [],
};

type ProductWithAttributes = Prisma.ProductGetPayload<{
  include: { attributeValues: { include: { attributeDefinition: true } } };
}>;

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly attributeDefinitionsService: AttributeDefinitionsService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  async create(actorUserId: string, organizationId: string, dto: CreateProductDto) {
    const slug = dto.slug ?? slugify(dto.title);
    if (!slug) {
      throw AppException.validationFailed('Could not derive a valid slug from the title.');
    }

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) {
        throw AppException.invalidCategory('categoryId does not reference an existing category.');
      }
    }

    const attributeValues = dto.attributeValues ?? [];
    const definitions = attributeValues.length
      ? await this.attributeDefinitionsService.requireByIds(
          attributeValues.map((v) => v.attributeDefinitionId),
        )
      : [];
    for (const input of attributeValues) {
      const definition = definitions.find(
        (d: { id: string }) => d.id === input.attributeDefinitionId,
      )!;
      this.attributeDefinitionsService.validateValue(definition, input.value);
    }

    try {
      const product = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const created = await tx.product.create({
          data: {
            organizationId,
            categoryId: dto.categoryId,
            title: dto.title,
            slug,
            description: dto.description,
            brand: dto.brand,
            status: ProductStatus.DRAFT,
            attributeValues: {
              create: attributeValues.map((v) => ({
                attributeDefinitionId: v.attributeDefinitionId,
                value: v.value as Prisma.InputJsonValue,
              })),
            },
          },
          include: { attributeValues: { include: { attributeDefinition: true } } },
        });

        await this.outboxService.record(tx, {
          eventType: CatalogEventType.PRODUCT_CREATED,
          aggregateType: 'Product',
          aggregateId: created.id,
          payload: this.buildSearchPayload(created),
        });

        return created;
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.product.created',
        targetType: 'Product',
        targetId: product.id,
        outcome: 'SUCCESS',
        metadata: { organizationId },
      });

      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('A product with this slug already exists for this seller.');
      }
      throw error;
    }
  }

  async update(
    actorUserId: string,
    organizationId: string,
    productId: string,
    dto: UpdateProductDto,
  ) {
    await this.requireOwned(organizationId, productId);

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) {
        throw AppException.invalidCategory('categoryId does not reference an existing category.');
      }
    }

    let definitions: { id: string; key: string; type: string; allowedValues: unknown }[] = [];
    if (dto.attributeValues) {
      definitions = dto.attributeValues.length
        ? await this.attributeDefinitionsService.requireByIds(
            dto.attributeValues.map((v) => v.attributeDefinitionId),
          )
        : [];
      for (const input of dto.attributeValues) {
        const definition = definitions.find(
          (d: { id: string }) => d.id === input.attributeDefinitionId,
        )!;
        this.attributeDefinitionsService.validateValue(definition, input.value);
      }
    }

    const product = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (dto.attributeValues) {
        await tx.productAttributeValue.deleteMany({ where: { productId } });
      }

      const updated = await tx.product.update({
        where: { id: productId },
        data: {
          title: dto.title,
          description: dto.description,
          brand: dto.brand,
          categoryId: dto.categoryId,
          attributeValues: dto.attributeValues
            ? {
                create: dto.attributeValues.map((v) => ({
                  attributeDefinitionId: v.attributeDefinitionId,
                  value: v.value as Prisma.InputJsonValue,
                })),
              }
            : undefined,
        },
        include: { attributeValues: { include: { attributeDefinition: true } } },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.PRODUCT_UPDATED,
        aggregateType: 'Product',
        aggregateId: updated.id,
        payload: this.buildSearchPayload(updated),
      });

      return updated;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.product.updated',
      targetType: 'Product',
      targetId: product.id,
      outcome: 'SUCCESS',
      metadata: { organizationId, changedFields: Object.keys(dto) },
    });

    return product;
  }

  /**
   * Validates and applies a publication-state transition. Publishing
   * specifically also validates the product has what it needs to be sold
   * (category, at least one active, priced, orderable variant) — see
   * PRODUCT PUBLICATION.
   */
  async transitionStatus(
    actorUserId: string,
    organizationId: string,
    productId: string,
    targetStatus: ProductStatus,
  ) {
    const product = await this.requireOwned(organizationId, productId);
    const allowed = ALLOWED_TRANSITIONS[product.status] ?? [];
    if (!allowed.includes(targetStatus)) {
      throw AppException.invalidStateTransition(
        `Cannot transition product from ${product.status} to ${targetStatus}.`,
        { from: product.status, to: targetStatus },
      );
    }

    if (targetStatus === ProductStatus.ACTIVE) {
      await this.validateReadyForPublication(product);
    }

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.product.update({
        where: { id: productId },
        data: {
          status: targetStatus,
          publishedAt: targetStatus === ProductStatus.ACTIVE ? new Date() : undefined,
          archivedAt: targetStatus === ProductStatus.ARCHIVED ? new Date() : undefined,
        },
        include: { attributeValues: { include: { attributeDefinition: true } } },
      });

      const eventType = {
        [ProductStatus.ACTIVE]: CatalogEventType.PRODUCT_PUBLISHED,
        [ProductStatus.PAUSED]: CatalogEventType.PRODUCT_UNPUBLISHED,
        [ProductStatus.ARCHIVED]: CatalogEventType.PRODUCT_ARCHIVED,
        [ProductStatus.DRAFT]: CatalogEventType.PRODUCT_UPDATED,
        [ProductStatus.PENDING_REVIEW]: CatalogEventType.PRODUCT_UPDATED,
      }[targetStatus];

      await this.outboxService.record(tx, {
        eventType,
        aggregateType: 'Product',
        aggregateId: result.id,
        payload: this.buildSearchPayload(result),
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: `catalog.product.status_changed`,
      targetType: 'Product',
      targetId: productId,
      outcome: 'SUCCESS',
      metadata: { organizationId, from: product.status, to: targetStatus },
    });

    return updated;
  }

  private async validateReadyForPublication(product: { id: string; categoryId: string | null }) {
    if (!product.categoryId) {
      throw AppException.invalidStateTransition(
        'A product must have a category before it can be published.',
      );
    }

    const orderableVariantCount = await this.prisma.productVariant.count({
      where: {
        productId: product.id,
        isActive: true,
        sku: {
          isActive: true,
          offer: {
            status: 'ACTIVE',
            prices: { some: { isActive: true, effectiveTo: null } },
          },
        },
      },
    });

    if (orderableVariantCount === 0) {
      throw AppException.invalidStateTransition(
        'A product must have at least one active variant with an active SKU, an active offer, and an active price before it can be published.',
      );
    }
  }

  /** Ownership check: 404s rather than 403s on cross-tenant access, so a probing seller cannot even confirm the resource exists. */
  async requireOwned(organizationId: string, productId: string): Promise<ProductWithAttributes> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { attributeValues: { include: { attributeDefinition: true } } },
    });
    if (!product || product.organizationId !== organizationId) {
      throw AppException.notFound('Product not found.');
    }
    return product;
  }

  async getPublicById(productId: string): Promise<ProductWithAttributes> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { attributeValues: { include: { attributeDefinition: true } } },
    });
    if (!product || product.status !== ProductStatus.ACTIVE) {
      throw AppException.notFound('Product not found.');
    }
    return product;
  }

  async list(
    organizationId: string,
    query: ListProductsQueryDto,
  ): Promise<PagedResult<ProductWithAttributes>> {
    const pageSize = clampPageSize(
      query.pageSize,
      PRODUCT_LIST_DEFAULT_PAGE_SIZE,
      PRODUCT_LIST_MAX_PAGE_SIZE,
    );

    const where: Prisma.ProductWhereInput = {
      organizationId,
      status: query.status as ProductStatus | undefined,
      categoryId: query.categoryId,
    };

    if (query.cursor) {
      const position = decodeCursor(query.cursor);
      where.OR = [
        { createdAt: { lt: new Date(position.createdAt) } },
        { createdAt: new Date(position.createdAt), id: { lt: position.id } },
      ];
    }

    const items = await this.prisma.product.findMany({
      where,
      include: { attributeValues: { include: { attributeDefinition: true } } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: pageSize + 1,
    });

    const hasMore = items.length > pageSize;
    const page = hasMore ? items.slice(0, pageSize) : items;
    const last = page[page.length - 1];

    return {
      items: page,
      nextCursor:
        hasMore && last
          ? encodeCursor({ createdAt: last.createdAt.toISOString(), id: last.id })
          : null,
    };
  }

  /**
   * Search documents must be rebuildable from authoritative catalog data
   * (see SEARCH PAYLOAD) — this is the single place that builds the
   * denormalized representation, used both for the outbox event payload
   * and (transitively, by re-running this) for reconciliation.
   */
  buildSearchPayload(product: ProductWithAttributes): Record<string, unknown> {
    return {
      productId: product.id,
      organizationId: product.organizationId,
      categoryId: product.categoryId,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      status: product.status,
      attributes: product.attributeValues.map(
        (v: { attributeDefinition: { key: string }; value: unknown }) => ({
          key: v.attributeDefinition.key,
          value: v.value,
        }),
      ),
      updatedAt: product.updatedAt.toISOString(),
    };
  }

  toResponseDto(product: ProductWithAttributes): ProductResponseDto {
    return {
      id: product.id,
      organizationId: product.organizationId,
      categoryId: product.categoryId,
      title: product.title,
      slug: product.slug,
      description: product.description,
      brand: product.brand,
      status: product.status,
      publishedAt: product.publishedAt,
      archivedAt: product.archivedAt,
      attributeValues: product.attributeValues.map(
        (v: {
          attributeDefinitionId: string;
          attributeDefinition: { key: string };
          value: unknown;
        }) => ({
          attributeDefinitionId: v.attributeDefinitionId,
          key: v.attributeDefinition.key,
          value: v.value,
        }),
      ),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
