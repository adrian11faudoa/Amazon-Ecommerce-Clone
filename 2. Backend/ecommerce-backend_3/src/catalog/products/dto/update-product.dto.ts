import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator';
import { AttributeValueInputDto } from './attribute-value-input.dto';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 20000)
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 150)
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    required: false,
    type: [AttributeValueInputDto],
    description: 'Replaces the full set of product-level attribute values when provided.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueInputDto)
  attributeValues?: AttributeValueInputDto[];
}
