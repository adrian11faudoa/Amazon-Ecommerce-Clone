import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RateLimitGuard } from '../security/rate-limit/rate-limit.guard';
import { RateLimitScope } from '../security/rate-limit/rate-limit.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { CartService } from './cart.service';
import { CartOwner } from './cart-owner';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { MergeCartDto } from './dto/merge-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';

const CART_TOKEN_HEADER = 'x-cart-token';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Resolves cart ownership for this request and, for a brand-new
   * anonymous visitor, mints a fresh opaque token and echoes it back on
   * the response header so the client can persist and resend it. Never
   * derives ownership from anything in the request body.
   */
  private resolveOwner(request: Request, response: Response): CartOwner {
    if (request.user) {
      return { customerId: (request.user as AuthenticatedUser).userId };
    }

    const existingToken = request.header(CART_TOKEN_HEADER);
    const anonymousToken = existingToken ?? CartService.generateAnonymousToken();
    response.setHeader(CART_TOKEN_HEADER, anonymousToken);
    return { anonymousToken };
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  async getCart(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CartResponseDto> {
    const owner = this.resolveOwner(request, response);
    const cart = await this.cartService.getOrCreateActiveCart(owner);
    return this.cartService.toResponseDto(cart);
  }

  @UseGuards(OptionalJwtAuthGuard, RateLimitGuard)
  @RateLimitScope('cartMutation')
  @Post('items')
  async addItem(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AddCartItemDto,
  ): Promise<CartResponseDto> {
    const owner = this.resolveOwner(request, response);
    const cart = await this.cartService.getOrCreateActiveCart(owner);
    const updated = await this.cartService.addItem(owner, cart.id, dto);
    return this.cartService.toResponseDto(updated);
  }

  @UseGuards(OptionalJwtAuthGuard, RateLimitGuard)
  @RateLimitScope('cartMutation')
  @Patch('items/:cartItemId')
  async updateItem(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('cartItemId') cartItemId: string,
    @Body() dto: UpdateCartItemDto,
  ): Promise<CartResponseDto> {
    const owner = this.resolveOwner(request, response);
    const cart = await this.cartService.getOrCreateActiveCart(owner);
    const updated = await this.cartService.updateItemQuantity(owner, cart.id, cartItemId, dto);
    return this.cartService.toResponseDto(updated);
  }

  @UseGuards(OptionalJwtAuthGuard, RateLimitGuard)
  @RateLimitScope('cartMutation')
  @Delete('items/:cartItemId')
  async removeItem(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Param('cartItemId') cartItemId: string,
  ): Promise<CartResponseDto> {
    const owner = this.resolveOwner(request, response);
    const cart = await this.cartService.getOrCreateActiveCart(owner);
    const updated = await this.cartService.removeItem(owner, cart.id, cartItemId);
    return this.cartService.toResponseDto(updated);
  }

  @UseGuards(OptionalJwtAuthGuard, RateLimitGuard)
  @RateLimitScope('cartMutation')
  @Delete()
  async clearCart(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CartResponseDto> {
    const owner = this.resolveOwner(request, response);
    const cart = await this.cartService.getOrCreateActiveCart(owner);
    const updated = await this.cartService.clear(owner, cart.id);
    return this.cartService.toResponseDto(updated);
  }

  /** Requires real authentication — merging is only meaningful once logged in. */
  @UseGuards(JwtAuthGuard)
  @Post('merge')
  async merge(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: MergeCartDto,
  ): Promise<CartResponseDto> {
    const merged = await this.cartService.mergeAnonymousIntoCustomerCart(
      user.userId,
      dto.anonymousToken,
    );
    return this.cartService.toResponseDto(merged);
  }
}
