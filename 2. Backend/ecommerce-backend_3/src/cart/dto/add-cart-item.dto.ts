import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';

export const CART_ITEM_MAX_QUANTITY = 100;

export class AddCartItemDto {
  @ApiProperty()
  @IsUUID()
  sellerOfferId: string;

  @ApiProperty({ minimum: 1, maximum: CART_ITEM_MAX_QUANTITY })
  @IsInt()
  @Min(1)
  @Max(CART_ITEM_MAX_QUANTITY)
  quantity: number;
}
