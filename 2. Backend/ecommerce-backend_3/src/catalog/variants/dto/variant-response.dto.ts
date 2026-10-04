import { ApiProperty } from '@nestjs/swagger';

export class VariantResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  attributeValues: { attributeDefinitionId: string; key: string; value: unknown }[];

  @ApiProperty({ nullable: true })
  skuId: string | null;

  @ApiProperty({ nullable: true })
  skuCode: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
