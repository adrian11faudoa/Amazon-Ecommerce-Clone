import { ApiProperty } from '@nestjs/swagger';

export class MediaAssetResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty({ nullable: true })
  productId: string | null;

  @ApiProperty({ nullable: true })
  variantId: string | null;

  @ApiProperty()
  assetType: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  sizeBytes: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
