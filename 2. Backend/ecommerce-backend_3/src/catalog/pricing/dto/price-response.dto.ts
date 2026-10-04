import { ApiProperty } from '@nestjs/swagger';

export class PriceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sellerOfferId: string;

  @ApiProperty({ description: 'Integer minor units as a string.' })
  amountMinorUnits: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  effectiveFrom: Date;

  @ApiProperty({ nullable: true })
  effectiveTo: Date | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;
}
