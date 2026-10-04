import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { ProductVariantsService } from './product-variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { VariantResponseDto } from './dto/variant-response.dto';

@ApiTags('seller-product-variants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/products/:productId/variants')
export class ProductVariantsController {
  constructor(private readonly variantsService: ProductVariantsService) {}

  @Get()
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async list(@Param('productId') productId: string): Promise<VariantResponseDto[]> {
    const variants = await this.variantsService.list(productId);
    return variants.map(
      (v: {
        id: string;
        productId: string;
        isActive: boolean;
        attributeValues: {
          attributeDefinitionId: string;
          attributeDefinition: { key: string };
          value: unknown;
        }[];
        sku: { id: string; code: string } | null;
        createdAt: Date;
        updatedAt: Date;
      }) => this.variantsService.toResponseDto(v),
    );
  }

  @Post()
  @RequirePermissions(Permission.CATALOG_PRODUCT_MANAGE)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
    @Body() dto: CreateVariantDto,
  ): Promise<VariantResponseDto> {
    const variant = await this.variantsService.create(user.userId, organizationId, productId, dto);
    return this.variantsService.toResponseDto(variant);
  }

  @Patch(':variantId/activate')
  @RequirePermissions(Permission.CATALOG_PRODUCT_MANAGE)
  async activate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ): Promise<VariantResponseDto> {
    const variant = await this.variantsService.setActive(
      user.userId,
      organizationId,
      productId,
      variantId,
      true,
    );
    return this.variantsService.toResponseDto(variant);
  }

  @Patch(':variantId/deactivate')
  @RequirePermissions(Permission.CATALOG_PRODUCT_MANAGE)
  async deactivate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ): Promise<VariantResponseDto> {
    const variant = await this.variantsService.setActive(
      user.userId,
      organizationId,
      productId,
      variantId,
      false,
    );
    return this.variantsService.toResponseDto(variant);
  }
}
