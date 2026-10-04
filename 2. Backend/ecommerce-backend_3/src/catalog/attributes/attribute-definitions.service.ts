import { Injectable } from '@nestjs/common';
import { AttributeType, Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { CreateAttributeDefinitionDto } from './dto/create-attribute-definition.dto';
import { AttributeDefinitionResponseDto } from './dto/attribute-definition-response.dto';

/**
 * Attribute definitions are the typed vocabulary catalog products/variants
 * draw values from — this is what keeps AttributeValue.value from being an
 * unvalidated free-for-all JSON blob (see PRODUCT ATTRIBUTES requirement).
 */
@Injectable()
export class AttributeDefinitionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(actorUserId: string, dto: CreateAttributeDefinitionDto) {
    if (dto.type === 'SELECT' && (!dto.allowedValues || dto.allowedValues.length === 0)) {
      throw AppException.validationFailed('allowedValues is required when type is SELECT.');
    }
    if (dto.type !== 'SELECT' && dto.allowedValues && dto.allowedValues.length > 0) {
      throw AppException.validationFailed('allowedValues is only valid when type is SELECT.');
    }

    try {
      const definition = await this.prisma.attributeDefinition.create({
        data: {
          key: dto.key,
          label: dto.label,
          type: dto.type as AttributeType,
          allowedValues: dto.allowedValues ?? undefined,
          isVariantAttribute: dto.isVariantAttribute ?? false,
        },
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.attribute_definition.created',
        targetType: 'AttributeDefinition',
        targetId: definition.id,
        outcome: 'SUCCESS',
      });

      return definition;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('An attribute definition with this key already exists.');
      }
      throw error;
    }
  }

  async list() {
    return this.prisma.attributeDefinition.findMany({ orderBy: { label: 'asc' } });
  }

  async requireById(attributeDefinitionId: string) {
    const definition = await this.prisma.attributeDefinition.findUnique({
      where: { id: attributeDefinitionId },
    });
    if (!definition) {
      throw AppException.notFound('Attribute definition not found.');
    }
    return definition;
  }

  async requireByIds(attributeDefinitionIds: string[]) {
    const definitions = await this.prisma.attributeDefinition.findMany({
      where: { id: { in: attributeDefinitionIds } },
    });
    if (definitions.length !== new Set(attributeDefinitionIds).size) {
      throw AppException.notFound('One or more attribute definitions were not found.');
    }
    return definitions;
  }

  /**
   * Validates a single attribute value against its definition's type and
   * (for SELECT) allowed-values list. Throws VALIDATION_FAILED with a
   * specific reason rather than accepting anything JSON-shaped.
   */
  validateValue(
    definition: { key: string; type: string; allowedValues: unknown },
    value: unknown,
  ): void {
    switch (definition.type) {
      case 'TEXT':
        if (typeof value !== 'string' || value.length === 0 || value.length > 500) {
          throw AppException.validationFailed(
            `Attribute "${definition.key}" must be a non-empty string up to 500 characters.`,
          );
        }
        break;
      case 'NUMBER':
        if (typeof value !== 'number' || !Number.isFinite(value)) {
          throw AppException.validationFailed(`Attribute "${definition.key}" must be a number.`);
        }
        break;
      case 'BOOLEAN':
        if (typeof value !== 'boolean') {
          throw AppException.validationFailed(`Attribute "${definition.key}" must be a boolean.`);
        }
        break;
      case 'SELECT': {
        const allowed = Array.isArray(definition.allowedValues)
          ? (definition.allowedValues as string[])
          : [];
        if (typeof value !== 'string' || !allowed.includes(value)) {
          throw AppException.validationFailed(
            `Attribute "${definition.key}" must be one of: ${allowed.join(', ')}.`,
          );
        }
        break;
      }
      default:
        throw AppException.validationFailed(`Unknown attribute type for "${definition.key}".`);
    }
  }

  toResponseDto(definition: {
    id: string;
    key: string;
    label: string;
    type: string;
    allowedValues: unknown;
    isVariantAttribute: boolean;
  }): AttributeDefinitionResponseDto {
    return {
      id: definition.id,
      key: definition.key,
      label: definition.label,
      type: definition.type,
      allowedValues: Array.isArray(definition.allowedValues)
        ? (definition.allowedValues as string[])
        : null,
      isVariantAttribute: definition.isVariantAttribute,
    };
  }
}
