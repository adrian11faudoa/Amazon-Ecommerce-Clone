import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('seller-products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async list(
    @Param('organizationId') organizationId: string,
    @Query() query: ListProductsQueryDto,
  ) {
    const result = await this.productsService.list(organizationId, query);
    return {
      items: result.items.map((p) => this.productsService.toResponseDto(p)),
      nextCursor: result.nextCursor,
    };
  }

  @Get(':productId')
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async getById(
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.requireOwned(organizationId, productId);
    return this.productsService.toResponseDto(product);
  }

  @Post()
  @RequirePermissions(Permission.CATALOG_PRODUCT_MANAGE)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.create(user.userId, organizationId, dto);
    return this.productsService.toResponseDto(product);
  }

  @Patch(':productId')
  @RequirePermissions(Permission.CATALOG_PRODUCT_MANAGE)
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.update(user.userId, organizationId, productId, dto);
    return this.productsService.toResponseDto(product);
  }

  @Post(':productId/publish')
  @RequirePermissions(Permission.CATALOG_PRODUCT_PUBLISH)
  async publish(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.transitionStatus(
      user.userId,
      organizationId,
      productId,
      ProductStatus.ACTIVE,
    );
    return this.productsService.toResponseDto(product);
  }

  @Post(':productId/unpublish')
  @RequirePermissions(Permission.CATALOG_PRODUCT_PUBLISH)
  async unpublish(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.transitionStatus(
      user.userId,
      organizationId,
      productId,
      ProductStatus.PAUSED,
    );
    return this.productsService.toResponseDto(product);
  }

  @Post(':productId/archive')
  @RequirePermissions(Permission.CATALOG_PRODUCT_PUBLISH)
  async archive(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
  ): Promise<ProductResponseDto> {
    const product = await this.productsService.transitionStatus(
      user.userId,
      organizationId,
      productId,
      ProductStatus.ARCHIVED,
    );
    return this.productsService.toResponseDto(product);
  }
}
