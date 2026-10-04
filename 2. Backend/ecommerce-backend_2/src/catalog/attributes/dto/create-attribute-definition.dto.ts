import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';

export enum AttributeTypeDto {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
}

export class CreateAttributeDefinitionDto {
  @ApiProperty({ description: 'Stable machine key, e.g. "color".' })
  @IsString()
  @Matches(/^[a-z][a-z0-9_]*$/, {
    message: 'key must be lowercase snake_case starting with a letter',
  })
  @Length(1, 100)
  key: string;

  @ApiProperty()
  @IsString()
  @Length(1, 150)
  label: string;

  @ApiProperty({ enum: AttributeTypeDto })
  @IsEnum(AttributeTypeDto)
  type: AttributeTypeDto;

  @ApiProperty({
    required: false,
    description: 'Required and only meaningful when type is SELECT.',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedValues?: string[];

  @ApiProperty({
    required: false,
    default: false,
    description: 'True if this attribute differentiates variants (e.g. color, size).',
  })
  @IsOptional()
  @IsBoolean()
  isVariantAttribute?: boolean;
}
