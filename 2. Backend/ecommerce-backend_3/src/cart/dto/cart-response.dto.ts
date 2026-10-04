import { ApiProperty } from '@nestjs/swagger';

export class CartItemWarningDto {
  @ApiProperty()
  cartItemId: string;

  @ApiProperty({ enum: ['ITEM_UNAVAILABLE', 'INVALID_QUANTITY'] })
  code: string;

  @ApiProperty()
  message: string;
}

export class CartItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sellerOfferId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  addedAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CartResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  customerId: string | null;

  @ApiProperty({
    nullable: true,
    description:
      'Only present/relevant for anonymous carts; persist and send back as x-cart-token.',
  })
  anonymousToken: string | null;

  @ApiProperty()
  status: string;

  @ApiProperty({
    description: 'Increments on every mutation; used to detect stale checkout attempts.',
  })
  revision: number;

  @ApiProperty({ type: [CartItemResponseDto] })
  items: CartItemResponseDto[];

  @ApiProperty({ type: [CartItemWarningDto] })
  warnings: CartItemWarningDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
