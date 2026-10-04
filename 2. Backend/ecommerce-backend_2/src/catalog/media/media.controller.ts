import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { MediaService } from './media.service';
import { CreateUploadIntentDto } from './dto/create-upload-intent.dto';
import { UploadIntentResponseDto } from './dto/upload-intent-response.dto';
import { MediaAssetResponseDto } from './dto/media-asset-response.dto';

@ApiTags('seller-media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload-intent')
  @RequirePermissions(Permission.CATALOG_MEDIA_MANAGE)
  async createUploadIntent(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: CreateUploadIntentDto,
  ): Promise<UploadIntentResponseDto> {
    return this.mediaService.createUploadIntent(user.userId, organizationId, dto);
  }

  @Post(':mediaAssetId/finalize')
  @RequirePermissions(Permission.CATALOG_MEDIA_MANAGE)
  async finalize(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('mediaAssetId') mediaAssetId: string,
  ): Promise<MediaAssetResponseDto> {
    const asset = await this.mediaService.finalize(user.userId, organizationId, mediaAssetId);
    return this.mediaService.toResponseDto(asset);
  }

  @Delete(':mediaAssetId')
  @RequirePermissions(Permission.CATALOG_MEDIA_MANAGE)
  async delete(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('mediaAssetId') mediaAssetId: string,
  ): Promise<MediaAssetResponseDto> {
    const asset = await this.mediaService.delete(user.userId, organizationId, mediaAssetId);
    return this.mediaService.toResponseDto(asset);
  }
}
