import { ApiProperty } from '@nestjs/swagger';

export class UploadIntentResponseDto {
  @ApiProperty()
  mediaAssetId: string;

  @ApiProperty()
  uploadUrl: string;

  @ApiProperty()
  uploadMethod: string;

  @ApiProperty()
  expiresAt: Date;
}
