import { Module } from '@nestjs/common';
import { SellerOffersController } from './seller-offers.controller';
import { SellerOffersService } from './seller-offers.service';

@Module({
  controllers: [SellerOffersController],
  providers: [SellerOffersService],
  exports: [SellerOffersService],
})
export class SellerOffersModule {}
