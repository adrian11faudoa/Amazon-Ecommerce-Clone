import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { CART_ITEM_MAX_QUANTITY } from './add-cart-item.dto';

export class UpdateCartItemDto {
  @ApiProperty({ minimum: 1, maximum: CART_ITEM_MAX_QUANTITY })
  @IsInt()
  @Min(1)
  @Max(CART_ITEM_MAX_QUANTITY)
  quantity: number;
}
