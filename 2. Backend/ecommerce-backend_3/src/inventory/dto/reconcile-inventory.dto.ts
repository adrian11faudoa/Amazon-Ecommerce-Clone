import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class ReconcileInventoryDto {
  @ApiProperty({
    description: 'The authoritative on-hand quantity determined by a physical/external count.',
  })
  @IsInt()
  @Min(0)
  authoritativeOnHandQuantity: number;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  reason: string;
}
