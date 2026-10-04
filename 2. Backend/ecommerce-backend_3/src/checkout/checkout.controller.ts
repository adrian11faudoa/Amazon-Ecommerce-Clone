import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RateLimitGuard } from '../security/rate-limit/rate-limit.guard';
import { RateLimitScope } from '../security/rate-limit/rate-limit.decorator';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CheckoutResponseDto, PaymentIntentContractDto } from './dto/checkout-response.dto';

@ApiTags('checkout')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(RateLimitGuard)
  @RateLimitScope('checkoutCreation')
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateCheckoutDto,
  ): Promise<CheckoutResponseDto> {
    const checkout = await this.checkoutService.create(user.userId, dto);
    return this.checkoutService.toResponseDto(checkout);
  }

  @Get(':checkoutId')
  async getById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('checkoutId') checkoutId: string,
  ): Promise<CheckoutResponseDto> {
    const checkout = await this.checkoutService.requireOwned(user.userId, checkoutId);
    return this.checkoutService.toResponseDto(checkout);
  }

  @Get(':checkoutId/payment-intent-contract')
  async getPaymentIntentContract(
    @CurrentUser() user: AuthenticatedUser,
    @Param('checkoutId') checkoutId: string,
  ): Promise<PaymentIntentContractDto> {
    const checkout = await this.checkoutService.requireOwned(user.userId, checkoutId);
    return this.checkoutService.buildPaymentIntentContract(checkout);
  }

  @Post(':checkoutId/cancel')
  async cancel(
    @CurrentUser() user: AuthenticatedUser,
    @Param('checkoutId') checkoutId: string,
  ): Promise<CheckoutResponseDto> {
    const checkout = await this.checkoutService.cancel(user.userId, checkoutId);
    return this.checkoutService.toResponseDto(checkout);
  }
}
