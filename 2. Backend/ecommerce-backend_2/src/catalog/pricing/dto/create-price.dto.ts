import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({
    description:
      'Exact integer minor units (e.g. cents) as a string, to avoid float precision loss over JSON.',
    example: '1999',
  })
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'amountMinorUnits must be a non-negative integer string' })
  amountMinorUnits: string;

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ required: false, description: 'Defaults to now.' })
  @IsOptional()
  @IsISO8601()
  effectiveFrom?: string;
}
