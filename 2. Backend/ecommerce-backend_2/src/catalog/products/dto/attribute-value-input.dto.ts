import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AttributeValueInputDto {
  @ApiProperty()
  @IsUUID()
  attributeDefinitionId: string;

  @ApiProperty({ description: 'Type is validated against the attribute definition.' })
  value: unknown;
}
