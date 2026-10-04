import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { PricingService } from './pricing.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { PriceResponseDto } from './dto/price-response.dto';

@ApiTags('seller-pricing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/offers/:offerId/prices')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async history(
    @Param('organizationId') organizationId: string,
    @Param('offerId') offerId: string,
  ): Promise<PriceResponseDto[]> {
    const prices = await this.pricingService.history(organizationId, offerId);
    return prices.map(
      (p: {
        id: string;
        sellerOfferId: string;
        amountMinorUnits: bigint;
        currency: string;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        isActive: boolean;
        createdAt: Date;
      }) => this.pricingService.toResponseDto(p),
    );
  }

  @Post()
  @RequirePermissions(Permission.CATALOG_PRICE_MANAGE)
  async activate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('offerId') offerId: string,
    @Body() dto: CreatePriceDto,
  ): Promise<PriceResponseDto> {
    const price = await this.pricingService.activatePrice(
      user.userId,
      organizationId,
      offerId,
      dto,
    );
    return this.pricingService.toResponseDto(price);
  }
}
