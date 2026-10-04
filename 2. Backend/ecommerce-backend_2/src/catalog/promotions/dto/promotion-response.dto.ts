import { ApiProperty } from '@nestjs/swagger';

export class PromotionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  discountType: string;

  @ApiProperty()
  discountValue: number;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ nullable: true })
  usageLimit: number | null;

  @ApiProperty()
  timesUsed: number;

  @ApiProperty({ type: [String] })
  offerIds: string[];
}
