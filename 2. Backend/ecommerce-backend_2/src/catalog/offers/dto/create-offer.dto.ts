import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum OfferConditionDto {
  NEW = 'NEW',
  USED = 'USED',
  REFURBISHED = 'REFURBISHED',
}

export class CreateOfferDto {
  @ApiProperty({
    description: 'Must be a SKU owned by this seller organization with no existing offer.',
  })
  @IsUUID()
  skuId: string;

  @ApiProperty({ enum: OfferConditionDto, required: false, default: OfferConditionDto.NEW })
  @IsOptional()
  @IsEnum(OfferConditionDto)
  condition?: OfferConditionDto;
}
