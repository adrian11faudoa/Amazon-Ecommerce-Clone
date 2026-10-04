import { ApiProperty } from '@nestjs/swagger';

export class OfferResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  skuId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  condition: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
