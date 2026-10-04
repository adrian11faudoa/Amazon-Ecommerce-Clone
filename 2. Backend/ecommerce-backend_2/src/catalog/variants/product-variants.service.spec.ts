import { Prisma } from '@prisma/client';
import { ProductVariantsService } from './product-variants.service';
import { ProductsService } from '../products/products.service';
import { AttributeDefinitionsService } from '../attributes/attribute-definitions.service';
import { OutboxService } from '../events/outbox.service';
import { AuditService } from '../../audit/audit.service';

const FakePrismaError = Prisma.PrismaClientKnownRequestError as unknown as new (
  message: string,
  code: string,
  meta?: Record<string, unknown>,
) => Error & { code: string; meta?: Record<string, unknown> };

function buildDeps() {
  const prisma: any = {
    productVariant: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };
  prisma.$transaction = jest.fn(async (fn: (tx: unknown) => unknown) => fn(prisma));

  const productsService = { requireOwned: jest.fn().mockResolvedValue({ id: 'prod-1' }) };
  const attributeDefinitionsService = {
    requireByIds: jest.fn(),
    validateValue: jest.fn(),
  };
  const outboxService = { record: jest.fn() };
  const auditService = { record: jest.fn() };

  const service = new ProductVariantsService(
    prisma,
    productsService as unknown as ProductsService,
    attributeDefinitionsService as unknown as AttributeDefinitionsService,
    outboxService as unknown as OutboxService,
    auditService as unknown as AuditService,
  );

  return { service, prisma, productsService, attributeDefinitionsService, outboxService };
}

describe('ProductVariantsService.create', () => {
  const colorDefinition = {
    id: 'attr-color',
    key: 'color',
    isVariantAttribute: true,
    type: 'SELECT',
    allowedValues: ['red', 'blue'],
  };

  it('checks product ownership before creating a variant', async () => {
    const { service, prisma, productsService, attributeDefinitionsService } = buildDeps();
    attributeDefinitionsService.requireByIds.mockResolvedValue([colorDefinition]);
    prisma.productVariant.create.mockResolvedValue({
      id: 'variant-1',
      attributeValues: [],
      sku: null,
    });

    await service.create('user-1', 'org-A', 'prod-1', {
      attributeValues: [{ attributeDefinitionId: 'attr-color', value: 'red' }],
      skuCode: 'SKU-1',
    });

    expect(productsService.requireOwned).toHaveBeenCalledWith('org-A', 'prod-1');
  });

  it('rejects an attribute not marked isVariantAttribute', async () => {
    const { service, attributeDefinitionsService } = buildDeps();
    attributeDefinitionsService.requireByIds.mockResolvedValue([
      { id: 'attr-desc', key: 'description', isVariantAttribute: false, type: 'TEXT' },
    ]);

    await expect(
      service.create('user-1', 'org-A', 'prod-1', {
        attributeValues: [{ attributeDefinitionId: 'attr-desc', value: 'x' }],
        skuCode: 'SKU-1',
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('maps a P2002 on the SKU unique constraint to DUPLICATE_SKU', async () => {
    const { service, prisma, attributeDefinitionsService } = buildDeps();
    attributeDefinitionsService.requireByIds.mockResolvedValue([colorDefinition]);
    prisma.productVariant.create.mockRejectedValue(
      new FakePrismaError('constraint violation', 'P2002', { target: ['organizationId', 'code'] }),
    );

    await expect(
      service.create('user-1', 'org-A', 'prod-1', {
        attributeValues: [{ attributeDefinitionId: 'attr-color', value: 'red' }],
        skuCode: 'DUPLICATE-CODE',
      }),
    ).rejects.toMatchObject({ code: 'DUPLICATE_SKU' });
  });

  it('maps a P2002 on the attribute-signature unique constraint to DUPLICATE_VARIANT', async () => {
    const { service, prisma, attributeDefinitionsService } = buildDeps();
    attributeDefinitionsService.requireByIds.mockResolvedValue([colorDefinition]);
    prisma.productVariant.create.mockRejectedValue(
      new FakePrismaError('constraint violation', 'P2002', {
        target: ['productId', 'attributeSignature'],
      }),
    );

    await expect(
      service.create('user-1', 'org-A', 'prod-1', {
        attributeValues: [{ attributeDefinitionId: 'attr-color', value: 'red' }],
        skuCode: 'SKU-2',
      }),
    ).rejects.toMatchObject({ code: 'DUPLICATE_VARIANT' });
  });

  it('requireOwned throws 404 when the variant belongs to a different product', async () => {
    const { service, prisma } = buildDeps();
    prisma.productVariant.findUnique.mockResolvedValue({ id: 'variant-1', productId: 'prod-A' });

    await expect(service.requireOwned('prod-B', 'variant-1')).rejects.toMatchObject({
      code: 'RESOURCE_NOT_FOUND',
    });
  });
});
