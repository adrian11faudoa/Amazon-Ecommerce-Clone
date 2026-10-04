import { ApiProperty } from '@nestjs/swagger';

export class CheckoutItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sellerOfferId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  unitPriceMinorUnits: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  discountMinorUnits: string;

  @ApiProperty()
  currency: string;

  @ApiProperty({ nullable: true })
  inventoryReservationId: string | null;
}

export class CheckoutResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  currency: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  subtotalMinorUnits: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  discountMinorUnits: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  totalMinorUnits: string;

  @ApiProperty({ nullable: true })
  failureReason: string | null;

  @ApiProperty({ type: [CheckoutItemResponseDto] })
  items: CheckoutItemResponseDto[];

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

/** The stable seam a future payment domain consumes — see EXTERNAL PAYMENT BOUNDARY. */
export class PaymentIntentContractDto {
  @ApiProperty()
  checkoutId: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  amountMinorUnits: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  idempotencyKey: string;

  @ApiProperty({ type: 'object' })
  metadata: Record<string, unknown>;
}
