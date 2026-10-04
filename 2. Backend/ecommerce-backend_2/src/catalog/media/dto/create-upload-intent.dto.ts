import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateUploadIntentDto {
  @ApiProperty({ enum: ['PRODUCT', 'VARIANT'] })
  @IsIn(['PRODUCT', 'VARIANT'])
  entityType: 'PRODUCT' | 'VARIANT';

  @ApiProperty()
  @IsUUID()
  entityId: string;

  @ApiProperty({ enum: ['IMAGE', 'VIDEO', 'DOCUMENT'] })
  @IsIn(['IMAGE', 'VIDEO', 'DOCUMENT'])
  assetType: 'IMAGE' | 'VIDEO' | 'DOCUMENT';

  @ApiProperty()
  @IsString()
  mimeType: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  sizeBytes: number;
}
