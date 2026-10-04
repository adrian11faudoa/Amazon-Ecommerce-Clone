import { ApiProperty } from '@nestjs/swagger';

export class AttributeDefinitionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ type: [String], nullable: true })
  allowedValues: string[] | null;

  @ApiProperty()
  isVariantAttribute: boolean;
}
