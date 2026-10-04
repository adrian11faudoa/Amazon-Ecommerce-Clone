import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export enum PromotionDiscountTypeDto {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export class CreatePromotionDto {
  @ApiProperty()
  @IsString()
  @Length(1, 150)
  name: string;

  @ApiProperty({ enum: PromotionDiscountTypeDto })
  @IsEnum(PromotionDiscountTypeDto)
  discountType: PromotionDiscountTypeDto;

  @ApiProperty({
    description:
      'For PERCENTAGE: an integer 1-100. For FIXED_AMOUNT: integer minor units (e.g. cents), positive.',
  })
  @IsInt()
  @IsPositive()
  discountValue: number;

  @ApiProperty()
  @IsISO8601()
  startAt: string;

  @ApiProperty()
  @IsISO8601()
  endAt: string;

  @ApiProperty({
    type: [String],
    description: 'SellerOffer IDs this promotion applies to; must be owned by this seller.',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  offerIds: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  usageLimit?: number;
}
