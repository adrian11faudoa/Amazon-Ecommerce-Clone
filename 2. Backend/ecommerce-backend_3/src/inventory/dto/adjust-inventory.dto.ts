import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length, NotEquals } from 'class-validator';

export enum InventoryAdjustmentTypeDto {
  INITIAL_STOCK = 'INITIAL_STOCK',
  MANUAL_CORRECTION = 'MANUAL_CORRECTION',
  DAMAGED = 'DAMAGED',
  FOUND = 'FOUND',
  RECONCILIATION = 'RECONCILIATION',
}

export class AdjustInventoryDto {
  @ApiProperty({ description: 'Signed delta applied to on-hand quantity (e.g. -5 or 10).' })
  @IsInt()
  @NotEquals(0)
  quantityDelta: number;

  @ApiProperty({ enum: InventoryAdjustmentTypeDto })
  @IsEnum(InventoryAdjustmentTypeDto)
  type: InventoryAdjustmentTypeDto;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  reason: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referenceType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referenceId?: string;
}
