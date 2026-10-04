import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionResponseDto } from './dto/promotion-response.dto';

@ApiTags('seller-promotions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async list(@Param('organizationId') organizationId: string): Promise<PromotionResponseDto[]> {
    const promotions = await this.promotionsService.listForOrganization(organizationId);
    return promotions.map(
      (p: {
        id: string;
        organizationId: string;
        name: string;
        discountType: string;
        discountValue: number;
        startAt: Date;
        endAt: Date;
        isActive: boolean;
        usageLimit: number | null;
        timesUsed: number;
        offers: { sellerOfferId: string }[];
      }) => this.promotionsService.toResponseDto(p),
    );
  }

  @Post()
  @RequirePermissions(Permission.CATALOG_PROMOTION_MANAGE)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: CreatePromotionDto,
  ): Promise<PromotionResponseDto> {
    const promotion = await this.promotionsService.create(user.userId, organizationId, dto);
    return this.promotionsService.toResponseDto(promotion);
  }

  @Patch(':promotionId/activate')
  @RequirePermissions(Permission.CATALOG_PROMOTION_MANAGE)
  async activate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('promotionId') promotionId: string,
  ): Promise<PromotionResponseDto> {
    const promotion = await this.promotionsService.setActive(
      user.userId,
      organizationId,
      promotionId,
      true,
    );
    return this.promotionsService.toResponseDto(promotion);
  }

  @Patch(':promotionId/deactivate')
  @RequirePermissions(Permission.CATALOG_PROMOTION_MANAGE)
  async deactivate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('promotionId') promotionId: string,
  ): Promise<PromotionResponseDto> {
    const promotion = await this.promotionsService.setActive(
      user.userId,
      organizationId,
      promotionId,
      false,
    );
    return this.promotionsService.toResponseDto(promotion);
  }
}
