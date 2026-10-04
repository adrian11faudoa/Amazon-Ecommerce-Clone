import { ApiProperty } from '@nestjs/swagger';

export class ProductAttributeValueResponseDto {
  @ApiProperty()
  attributeDefinitionId: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: unknown;
}

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty({ nullable: true })
  categoryId: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  brand: string | null;

  @ApiProperty()
  status: string;

  @ApiProperty({ nullable: true })
  publishedAt: Date | null;

  @ApiProperty({ nullable: true })
  archivedAt: Date | null;

  @ApiProperty({ type: [ProductAttributeValueResponseDto] })
  attributeValues: ProductAttributeValueResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
