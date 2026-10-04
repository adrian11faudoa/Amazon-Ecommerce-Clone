import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OfferStatus } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { SellerOffersService } from './seller-offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferResponseDto } from './dto/offer-response.dto';

@ApiTags('seller-offers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/offers')
export class SellerOffersController {
  constructor(private readonly offersService: SellerOffersService) {}

  @Get()
  @RequirePermissions(Permission.CATALOG_PRODUCT_READ)
  async list(@Param('organizationId') organizationId: string): Promise<OfferResponseDto[]> {
    const offers = await this.offersService.listForOrganization(organizationId);
    return offers.map(
      (o: {
        id: string;
        organizationId: string;
        skuId: string;
        status: string;
        condition: string;
        createdAt: Date;
        updatedAt: Date;
      }) => this.offersService.toResponseDto(o),
    );
  }

  @Post()
  @RequirePermissions(Permission.CATALOG_OFFER_MANAGE)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: CreateOfferDto,
  ): Promise<OfferResponseDto> {
    const offer = await this.offersService.create(user.userId, organizationId, dto);
    return this.offersService.toResponseDto(offer);
  }

  @Patch(':offerId/activate')
  @RequirePermissions(Permission.CATALOG_OFFER_MANAGE)
  async activate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('offerId') offerId: string,
  ): Promise<OfferResponseDto> {
    const offer = await this.offersService.transitionStatus(
      user.userId,
      organizationId,
      offerId,
      OfferStatus.ACTIVE,
    );
    return this.offersService.toResponseDto(offer);
  }

  @Patch(':offerId/pause')
  @RequirePermissions(Permission.CATALOG_OFFER_MANAGE)
  async pause(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('offerId') offerId: string,
  ): Promise<OfferResponseDto> {
    const offer = await this.offersService.transitionStatus(
      user.userId,
      organizationId,
      offerId,
      OfferStatus.PAUSED,
    );
    return this.offersService.toResponseDto(offer);
  }

  @Patch(':offerId/archive')
  @RequirePermissions(Permission.CATALOG_OFFER_MANAGE)
  async archive(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('offerId') offerId: string,
  ): Promise<OfferResponseDto> {
    const offer = await this.offersService.transitionStatus(
      user.userId,
      organizationId,
      offerId,
      OfferStatus.ARCHIVED,
    );
    return this.offersService.toResponseDto(offer);
  }
}
