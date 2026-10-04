import { ApiProperty } from '@nestjs/swagger';

export class InventoryAdjustmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  inventoryItemId: string;

  @ApiProperty()
  quantityDelta: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  reason: string;

  @ApiProperty({ nullable: true })
  actorUserId: string | null;

  @ApiProperty({ nullable: true })
  referenceType: string | null;

  @ApiProperty({ nullable: true })
  referenceId: string | null;

  @ApiProperty()
  createdAt: Date;
}
