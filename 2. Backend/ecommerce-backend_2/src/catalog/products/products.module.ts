import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PublicProductsController } from './public-products.controller';
import { ProductsService } from './products.service';
import { AttributeDefinitionsModule } from '../attributes/attribute-definitions.module';

@Module({
  imports: [AttributeDefinitionsModule],
  controllers: [ProductsController, PublicProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
