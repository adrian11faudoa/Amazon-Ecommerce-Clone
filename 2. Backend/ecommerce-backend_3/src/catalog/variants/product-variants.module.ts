import { Module } from '@nestjs/common';
import { ProductVariantsController } from './product-variants.controller';
import { ProductVariantsService } from './product-variants.service';
import { ProductsModule } from '../products/products.module';
import { AttributeDefinitionsModule } from '../attributes/attribute-definitions.module';

@Module({
  imports: [ProductsModule, AttributeDefinitionsModule],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
