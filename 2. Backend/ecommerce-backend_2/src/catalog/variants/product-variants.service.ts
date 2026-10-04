import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import { AttributeDefinitionsService } from '../attributes/attribute-definitions.service';
import { ProductsService } from '../products/products.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { VariantResponseDto } from './dto/variant-response.dto';

type VariantWithRelations = Prisma.ProductVariantGetPayload<{
  include: { attributeValues: { include: { attributeDefinition: true } }; sku: true };
}>;

@Injectable()
export class ProductVariantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly attributeDefinitionsService: AttributeDefinitionsService,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  async create(
    actorUserId: string,
    organizationId: string,
    productId: string,
    dto: CreateVariantDto,
  ) {
    await this.productsService.requireOwned(organizationId, productId);

    const definitions = await this.attributeDefinitionsService.requireByIds(
      dto.attributeValues.map((v) => v.attributeDefinitionId),
    );
    for (const input of dto.attributeValues) {
      const definition = definitions.find(
        (d: { id: string }) => d.id === input.attributeDefinitionId,
      )!;
      if (!definition.isVariantAttribute) {
        throw AppException.validationFailed(
          `Attribute "${definition.key}" is not marked as a variant-differentiating attribute.`,
        );
      }
      this.attributeDefinitionsService.validateValue(definition, input.value);
    }

    const attributeSignature = this.computeAttributeSignature(dto.attributeValues, definitions);

    try {
      const variant = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const created = await tx.productVariant.create({
          data: {
            productId,
            attributeSignature,
            attributeValues: {
              create: dto.attributeValues.map((v) => ({
                attributeDefinitionId: v.attributeDefinitionId,
                value: v.value as Prisma.InputJsonValue,
              })),
            },
            sku: {
              create: {
                organizationId,
                code: dto.skuCode,
              },
            },
          },
          include: { attributeValues: { include: { attributeDefinition: true } }, sku: true },
        });

        await this.outboxService.record(tx, {
          eventType: CatalogEventType.PRODUCT_VARIANT_CREATED,
          aggregateType: 'ProductVariant',
          aggregateId: created.id,
          payload: this.buildSearchPayload(created),
        });

        return created;
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.product_variant.created',
        targetType: 'ProductVariant',
        targetId: variant.id,
        outcome: 'SUCCESS',
        metadata: { organizationId, productId, skuCode: dto.skuCode },
      });

      return variant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const target = (error.meta?.target as string[] | undefined)?.join(',') ?? '';
        if (target.includes('code')) {
          throw AppException.duplicateSku();
        }
        throw AppException.duplicateVariant();
      }
      throw error;
    }
  }

  async setActive(
    actorUserId: string,
    organizationId: string,
    productId: string,
    variantId: string,
    isActive: boolean,
  ) {
    await this.productsService.requireOwned(organizationId, productId);
    const variant = await this.requireOwned(productId, variantId);

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.productVariant.update({
        where: { id: variantId },
        data: { isActive, archivedAt: isActive ? null : (variant.archivedAt ?? new Date()) },
        include: { attributeValues: { include: { attributeDefinition: true } }, sku: true },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.PRODUCT_VARIANT_UPDATED,
        aggregateType: 'ProductVariant',
        aggregateId: result.id,
        payload: this.buildSearchPayload(result),
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.product_variant.updated',
      targetType: 'ProductVariant',
      targetId: variantId,
      outcome: 'SUCCESS',
      metadata: { organizationId, isActive },
    });

    return updated;
  }

  async list(productId: string) {
    return this.prisma.productVariant.findMany({
      where: { productId },
      include: { attributeValues: { include: { attributeDefinition: true } }, sku: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async requireOwned(productId: string, variantId: string): Promise<VariantWithRelations> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { attributeValues: { include: { attributeDefinition: true } }, sku: true },
    });
    if (!variant || variant.productId !== productId) {
      throw AppException.notFound('Product variant not found.');
    }
    return variant;
  }

  /**
   * Deterministic signature over the sorted (attributeDefinitionId,
   * value) pairs. Enforced unique per product at the database level
   * (ProductVariant.@@unique([productId, attributeSignature])) so two
   * active variants can never unintentionally represent the same
   * combination — see PRODUCT VARIANT MODEL.
   */
  private computeAttributeSignature(
    values: { attributeDefinitionId: string; value: unknown }[],
    definitions: { id: string; key: string }[],
  ): string {
    const normalized = values
      .map((v) => {
        const key = definitions.find(
          (d: { id: string; key: string }) => d.id === v.attributeDefinitionId,
        )!.key;
        return [key, JSON.stringify(v.value)] as const;
      })
      .sort(([a], [b]) => a.localeCompare(b));
    return createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
  }

  buildSearchPayload(variant: VariantWithRelations): Record<string, unknown> {
    return {
      variantId: variant.id,
      productId: variant.productId,
      isActive: variant.isActive,
      skuCode: variant.sku?.code ?? null,
      attributes: variant.attributeValues.map(
        (v: { attributeDefinition: { key: string }; value: unknown }) => ({
          key: v.attributeDefinition.key,
          value: v.value,
        }),
      ),
    };
  }

  toResponseDto(variant: VariantWithRelations): VariantResponseDto {
    return {
      id: variant.id,
      productId: variant.productId,
      isActive: variant.isActive,
      attributeValues: variant.attributeValues.map(
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
      skuId: variant.sku?.id ?? null,
      skuCode: variant.sku?.code ?? null,
      createdAt: variant.createdAt,
      updatedAt: variant.updatedAt,
    };
  }
}
