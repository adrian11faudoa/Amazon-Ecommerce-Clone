import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { AttributeValueInputDto } from './attribute-value-input.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @Length(1, 200)
  title: string;

  @ApiProperty({
    required: false,
    description: 'URL-safe, unique per seller. Defaults to a slugified title.',
  })
  @IsOptional()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase letters, numbers, and hyphens only',
  })
  @Length(1, 150)
  slug?: string;

  @ApiProperty()
  @IsString()
  @Length(1, 20000)
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 150)
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ required: false, type: [AttributeValueInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueInputDto)
  attributeValues?: AttributeValueInputDto[];
}
