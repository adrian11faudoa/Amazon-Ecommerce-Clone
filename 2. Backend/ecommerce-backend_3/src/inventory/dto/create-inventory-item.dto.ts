import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @ApiProperty({ description: 'Must be a SellerOffer owned by this seller organization.' })
  @IsUUID()
  sellerOfferId: string;

  @ApiProperty({ description: 'Initial on-hand quantity.', minimum: 0 })
  @IsInt()
  @Min(0)
  initialQuantity: number;
}
