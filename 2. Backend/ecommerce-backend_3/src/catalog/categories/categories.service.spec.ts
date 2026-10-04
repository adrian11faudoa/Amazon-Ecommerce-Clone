import { CategoriesService } from './categories.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

function buildPrismaMock(categoriesById: Record<string, { id: string; parentId: string | null }>) {
  return {
    category: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn((args: { where: { id: string }; select?: unknown }) => {
        const found = categoriesById[args.where.id];
        return Promise.resolve(found ?? null);
      }),
      findMany: jest.fn(),
    },
  };
}

describe('CategoriesService', () => {
  const auditService = { record: jest.fn() } as unknown as AuditService;

  it('rejects a category being set as its own parent', async () => {
    const prisma = buildPrismaMock({ 'cat-1': { id: 'cat-1', parentId: null } });
    const service = new CategoriesService(prisma as unknown as PrismaService, auditService);

    await expect(service.update('user-1', 'cat-1', { parentId: 'cat-1' })).rejects.toMatchObject({
      code: 'INVALID_CATEGORY',
    });
  });

  it('rejects moving a category under one of its own descendants (cycle prevention)', async () => {
    // Tree: root -> child -> grandchild. Attempting to set root's parent
    // to grandchild would create a cycle.
    const prisma = buildPrismaMock({
      root: { id: 'root', parentId: null },
      child: { id: 'child', parentId: 'root' },
      grandchild: { id: 'grandchild', parentId: 'child' },
    });
    const service = new CategoriesService(prisma as unknown as PrismaService, auditService);

    await expect(
      service.update('user-1', 'root', { parentId: 'grandchild' }),
    ).rejects.toMatchObject({ code: 'INVALID_CATEGORY' });
  });

  it('allows moving a category to an unrelated valid parent', async () => {
    const prisma = buildPrismaMock({
      a: { id: 'a', parentId: null },
      b: { id: 'b', parentId: null },
    });
    prisma.category.update.mockResolvedValue({ id: 'a', parentId: 'b' });
    const service = new CategoriesService(prisma as unknown as PrismaService, auditService);

    await expect(service.update('user-1', 'a', { parentId: 'b' })).resolves.toBeDefined();
  });

  it('rejects creating a category whose parent does not exist', async () => {
    const prisma = buildPrismaMock({});
    const service = new CategoriesService(prisma as unknown as PrismaService, auditService);

    await expect(
      service.create('user-1', { name: 'X', slug: 'x', parentId: 'missing' }),
    ).rejects.toMatchObject({ code: 'RESOURCE_NOT_FOUND' });
  });

  it('rejects exceeding the maximum hierarchy depth', async () => {
    // Build a chain deep enough to hit MAX_DEPTH (6) when adding one more level.
    const categoriesById: Record<string, { id: string; parentId: string | null }> = {
      l0: { id: 'l0', parentId: null },
    };
    for (let i = 1; i <= 5; i++) {
      categoriesById[`l${i}`] = { id: `l${i}`, parentId: `l${i - 1}` };
    }
    const prisma = buildPrismaMock(categoriesById);
    const service = new CategoriesService(prisma as unknown as PrismaService, auditService);

    await expect(
      service.create('user-1', { name: 'Too deep', slug: 'too-deep', parentId: 'l5' }),
    ).rejects.toMatchObject({ code: 'INVALID_CATEGORY' });
  });
});
