import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('catalog-categories')
@Controller('catalog/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Public read surface: categories are shared taxonomy, safe to expose
  // to unauthenticated storefront browsing.
  @Public()
  @Get()
  async listChildren(@Query('parentId') parentId?: string): Promise<CategoryResponseDto[]> {
    const categories = await this.categoriesService.listChildren(parentId ?? null);
    return categories.map(
      (c: {
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
        isActive: boolean;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
      }) => this.categoriesService.toResponseDto(c),
    );
  }

  @Public()
  @Get(':categoryId')
  async getById(@Param('categoryId') categoryId: string): Promise<CategoryResponseDto> {
    const category = await this.categoriesService.requireById(categoryId);
    return this.categoriesService.toResponseDto(category);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CATALOG_CATEGORY_MANAGE)
  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoriesService.create(user.userId, dto);
    return this.categoriesService.toResponseDto(category);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CATALOG_CATEGORY_MANAGE)
  @ApiBearerAuth()
  @Patch(':categoryId')
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoriesService.update(user.userId, categoryId, dto);
    return this.categoriesService.toResponseDto(category);
  }
}
