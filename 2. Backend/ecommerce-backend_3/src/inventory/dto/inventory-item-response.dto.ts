import { ApiProperty } from '@nestjs/swagger';

export class InventoryItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  sellerOfferId: string;

  @ApiProperty()
  onHandQuantity: number;

  @ApiProperty()
  reservedQuantity: number;

  @ApiProperty({ description: 'Derived: onHandQuantity - reservedQuantity. Never stored.' })
  availableQuantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
