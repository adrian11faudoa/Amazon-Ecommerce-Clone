import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export const ADJUSTMENT_LIST_DEFAULT_PAGE_SIZE = 25;
export const ADJUSTMENT_LIST_MAX_PAGE_SIZE = 100;

export class ListAdjustmentsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiProperty({ required: false, default: ADJUSTMENT_LIST_DEFAULT_PAGE_SIZE })
  @IsOptional()
  pageSize?: number;
}
