import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

/**
 * Categories are a shared, platform-wide taxonomy (see PLATFORM_ADMIN-only
 * authorization in the controller), not a seller-scoped resource.
 */
@Injectable()
export class CategoriesService {
  // Bounds ordinary hierarchical operations (see CATEGORY HIERARCHY
  // requirement to avoid unbounded recursive behavior). A real deep
  // taxonomy rarely exceeds this in practice; if the business genuinely
  // needs more, raise this constant deliberately rather than removing
  // the bound.
  private static readonly MAX_DEPTH = 6;
  // Safety bound on ancestor-chain walks, independent of MAX_DEPTH, so a
  // corrupted/legacy row can never cause an unbounded loop even if the
  // depth invariant was somehow violated.
  private static readonly MAX_ANCESTOR_WALK = 50;

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(actorUserId: string, dto: CreateCategoryDto) {
    if (dto.parentId) {
      const parent = await this.requireById(dto.parentId);
      const depth = await this.computeDepth(parent.id);
      if (depth + 1 >= CategoriesService.MAX_DEPTH) {
        throw AppException.invalidCategory(
          `Category hierarchy cannot exceed ${CategoriesService.MAX_DEPTH} levels.`,
        );
      }
    }

    try {
      const category = await this.prisma.category.create({
        data: {
          name: dto.name,
          slug: dto.slug,
          parentId: dto.parentId,
          isActive: dto.isActive ?? true,
          sortOrder: dto.sortOrder ?? 0,
        },
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.category.created',
        targetType: 'Category',
        targetId: category.id,
        outcome: 'SUCCESS',
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('A category with this slug already exists.');
      }
      throw error;
    }
  }

  async update(actorUserId: string, categoryId: string, dto: UpdateCategoryDto) {
    await this.requireById(categoryId);

    if (dto.parentId !== undefined && dto.parentId !== null) {
      if (dto.parentId === categoryId) {
        throw AppException.invalidCategory('A category cannot be its own parent.');
      }
      await this.requireById(dto.parentId);
      const isDescendant = await this.isDescendantOf(dto.parentId, categoryId);
      if (isDescendant) {
        throw AppException.invalidCategory(
          'This move would create a cycle: the target parent is a descendant of this category.',
        );
      }
      const parentDepth = await this.computeDepth(dto.parentId);
      if (parentDepth + 1 >= CategoriesService.MAX_DEPTH) {
        throw AppException.invalidCategory(
          `Category hierarchy cannot exceed ${CategoriesService.MAX_DEPTH} levels.`,
        );
      }
    }

    try {
      const category = await this.prisma.category.update({
        where: { id: categoryId },
        data: {
          name: dto.name,
          slug: dto.slug,
          parentId: dto.parentId === undefined ? undefined : dto.parentId,
          isActive: dto.isActive,
          sortOrder: dto.sortOrder,
        },
      });

      await this.auditService.record({
        actorUserId,
        action: 'catalog.category.updated',
        targetType: 'Category',
        targetId: category.id,
        outcome: 'SUCCESS',
        metadata: { changes: dto },
      });

      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('A category with this slug already exists.');
      }
      throw error;
    }
  }

  async requireById(categoryId: string) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw AppException.notFound('Category not found.');
    }
    return category;
  }

  async listChildren(parentId: string | null) {
    return this.prisma.category.findMany({
      where: { parentId },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  /** Walks parentId pointers upward, counting depth from the root (root = 0). */
  private async computeDepth(categoryId: string): Promise<number> {
    let currentId: string | null = categoryId;
    let depth = 0;
    for (let i = 0; i < CategoriesService.MAX_ANCESTOR_WALK; i++) {
      const current: { parentId: string | null } | null = await this.prisma.category.findUnique({
        where: { id: currentId as string },
        select: { parentId: true },
      });
      if (!current || !current.parentId) {
        return depth;
      }
      currentId = current.parentId;
      depth += 1;
    }
    // Should be unreachable given MAX_DEPTH enforcement on write, but
    // fail safe rather than loop forever if data was altered out of band.
    throw AppException.invalidCategory('Category hierarchy depth could not be determined.');
  }

  /** True if `candidateAncestorId` appears anywhere in `startId`'s ancestor chain. */
  private async isDescendantOf(startId: string, candidateAncestorId: string): Promise<boolean> {
    let currentId: string | null = startId;
    for (let i = 0; i < CategoriesService.MAX_ANCESTOR_WALK; i++) {
      if (currentId === candidateAncestorId) {
        return true;
      }
      const current: { parentId: string | null } | null = await this.prisma.category.findUnique({
        where: { id: currentId as string },
        select: { parentId: true },
      });
      if (!current || !current.parentId) {
        return false;
      }
      currentId = current.parentId;
    }
    return false;
  }

  toResponseDto(category: {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
  }): CategoryResponseDto {
    return { ...category };
  }
}
