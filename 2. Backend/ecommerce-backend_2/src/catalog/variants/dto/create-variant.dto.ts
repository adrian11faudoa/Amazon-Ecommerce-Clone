import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { AttributeValueInputDto } from '../../products/dto/attribute-value-input.dto';

export class CreateVariantDto {
  @ApiProperty({
    type: [AttributeValueInputDto],
    description: 'Must reference attribute definitions marked isVariantAttribute=true.',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AttributeValueInputDto)
  attributeValues: AttributeValueInputDto[];

  @ApiProperty({ description: 'Business SKU code, unique within the seller organization.' })
  @IsString()
  @Matches(/^[A-Za-z0-9._-]+$/, {
    message: 'skuCode may only contain letters, numbers, dots, underscores, and hyphens',
  })
  @Length(1, 64)
  skuCode: string;
}
