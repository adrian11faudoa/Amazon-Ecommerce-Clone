import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';

export const PRODUCT_LIST_MAX_PAGE_SIZE = 100;
export const PRODUCT_LIST_DEFAULT_PAGE_SIZE = 20;

export class ListProductsQueryDto {
  @ApiProperty({ required: false, description: 'Opaque cursor from a previous page.' })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiProperty({ required: false, default: PRODUCT_LIST_DEFAULT_PAGE_SIZE })
  @IsOptional()
  pageSize?: number;

  @ApiProperty({
    required: false,
    enum: ['DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'PAUSED', 'ARCHIVED'],
  })
  @IsOptional()
  @IsIn(['DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'PAUSED', 'ARCHIVED'])
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  categoryId?: string;
}
