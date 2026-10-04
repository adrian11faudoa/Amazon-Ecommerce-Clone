import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { ProductsService } from './products.service';
import { PublicProductResponseDto } from './dto/public-product-response.dto';

/**
 * Public, unauthenticated catalog read surface — separate controller and
 * separate response DTO from ProductsController (seller admin), per the
 * CUSTOMER-FACING READ API BOUNDARY requirement. Only ACTIVE products are
 * visible here (see ProductsService.getPublicById).
 */
@ApiTags('public-catalog')
@Public()
@Controller('catalog/products')
export class PublicProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':productId')
  async getById(@Param('productId') productId: string): Promise<PublicProductResponseDto> {
    const product = await this.productsService.getPublicById(productId);
    return {
      id: product.id,
      categoryId: product.categoryId,
      title: product.title,
      slug: product.slug,
      description: product.description,
      brand: product.brand,
      attributes: product.attributeValues.map(
        (v: { attributeDefinition: { key: string }; value: unknown }) => ({
          key: v.attributeDefinition.key,
          value: v.value,
        }),
      ),
    };
  }
}
