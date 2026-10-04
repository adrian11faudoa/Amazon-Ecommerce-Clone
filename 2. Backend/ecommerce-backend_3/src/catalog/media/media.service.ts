import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { MediaAssetStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuditService } from '../../audit/audit.service';
import { OutboxService } from '../events/outbox.service';
import { CatalogEventType } from '../events/catalog-event-types';
import {
  STORAGE_PROVIDER,
  StorageProvider,
} from '../../infrastructure/storage/storage-provider.interface';
import { CreateUploadIntentDto } from './dto/create-upload-intent.dto';
import { UploadIntentResponseDto } from './dto/upload-intent-response.dto';
import { MediaAssetResponseDto } from './dto/media-asset-response.dto';

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
};

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject(STORAGE_PROVIDER) private readonly storageProvider: StorageProvider,
    private readonly outboxService: OutboxService,
    private readonly auditService: AuditService,
  ) {}

  async createUploadIntent(
    actorUserId: string,
    organizationId: string,
    dto: CreateUploadIntentDto,
  ): Promise<UploadIntentResponseDto> {
    await this.assertEntityOwnership(organizationId, dto.entityType, dto.entityId);

    const allowedTypes = this.configService.get<string[]>('storage.allowedContentTypes') ?? [];
    if (!allowedTypes.includes(dto.mimeType)) {
      throw AppException.validationFailed(
        `Content type "${dto.mimeType}" is not allowed. Allowed: ${allowedTypes.join(', ')}.`,
      );
    }

    const maxBytes = this.configService.get<number>('storage.maxUploadBytes') ?? 20_000_000;
    if (dto.sizeBytes > maxBytes) {
      throw AppException.validationFailed(
        `File exceeds the maximum allowed size of ${maxBytes} bytes.`,
      );
    }

    const ttlSeconds = this.configService.get<number>('storage.uploadTtlSeconds') ?? 900;
    // Server-generated key only — the client never chooses its own
    // storage path (see UPLOAD SECURITY: "do not trust a client-provided
    // storage path").
    const extension = EXTENSION_BY_MIME[dto.mimeType] ?? 'bin';
    const storageKey = `catalog/${organizationId}/${dto.entityType.toLowerCase()}/${dto.entityId}/${randomUUID()}.${extension}`;
    const uploadExpiresAt = new Date(Date.now() + ttlSeconds * 1000);

    const asset = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const created = await tx.mediaAsset.create({
        data: {
          organizationId,
          productId: dto.entityType === 'PRODUCT' ? dto.entityId : undefined,
          variantId: dto.entityType === 'VARIANT' ? dto.entityId : undefined,
          assetType: dto.assetType,
          storageKey,
          mimeType: dto.mimeType,
          sizeBytes: dto.sizeBytes,
          status: MediaAssetStatus.PENDING_UPLOAD,
          uploadExpiresAt,
        },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.MEDIA_ASSET_CREATED,
        aggregateType: 'MediaAsset',
        aggregateId: created.id,
        payload: { mediaAssetId: created.id, organizationId, status: created.status },
      });

      return created;
    });

    // The external storage call happens AFTER the transaction commits —
    // never hold a DB transaction open across a network call.
    const presigned = await this.storageProvider.createPresignedUploadUrl({
      key: storageKey,
      contentType: dto.mimeType,
      expiresInSeconds: ttlSeconds,
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.media_asset.upload_intent_created',
      targetType: 'MediaAsset',
      targetId: asset.id,
      outcome: 'SUCCESS',
      metadata: { organizationId, entityType: dto.entityType, entityId: dto.entityId },
    });

    return {
      mediaAssetId: asset.id,
      uploadUrl: presigned.url,
      uploadMethod: presigned.method,
      expiresAt: presigned.expiresAt,
    };
  }

  /**
   * Idempotent: finalizing an already-READY asset is a no-op success
   * (repeated finalization requests are expected — see MEDIA
   * FINALIZATION / IDEMPOTENCY). Never marks an asset READY without a
   * storage-provider-confirmed headObject — see StorageProvider's
   * contract.
   */
  async finalize(actorUserId: string, organizationId: string, mediaAssetId: string) {
    const asset = await this.requireOwned(organizationId, mediaAssetId);

    if (asset.status === MediaAssetStatus.READY) {
      return asset; // idempotent
    }
    if (asset.status === MediaAssetStatus.DELETED || asset.status === MediaAssetStatus.FAILED) {
      throw AppException.mediaUploadConflict(`Cannot finalize an asset in status ${asset.status}.`);
    }
    if (asset.uploadExpiresAt && asset.uploadExpiresAt.getTime() < Date.now()) {
      throw AppException.mediaUploadConflict('The upload window for this asset has expired.');
    }

    const objectMetadata = await this.storageProvider.headObject(asset.storageKey);
    if (!objectMetadata.exists) {
      throw AppException.mediaUploadConflict(
        'The object was not found in storage. Ensure the upload completed before finalizing.',
      );
    }

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.mediaAsset.update({
        where: { id: mediaAssetId },
        data: {
          status: MediaAssetStatus.READY,
          sizeBytes: objectMetadata.sizeBytes ?? asset.sizeBytes,
        },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.MEDIA_ASSET_READY,
        aggregateType: 'MediaAsset',
        aggregateId: result.id,
        payload: { mediaAssetId: result.id, organizationId, status: result.status },
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.media_asset.finalized',
      targetType: 'MediaAsset',
      targetId: mediaAssetId,
      outcome: 'SUCCESS',
      metadata: { organizationId },
    });

    return updated;
  }

  /** Idempotent deletion: deleting an already-DELETED asset is a no-op success. */
  async delete(actorUserId: string, organizationId: string, mediaAssetId: string) {
    const asset = await this.requireOwned(organizationId, mediaAssetId);
    if (asset.status === MediaAssetStatus.DELETED) {
      return asset;
    }

    // External call happens before the DB write commits the DELETED
    // state, so a provider failure leaves the asset retryable rather
    // than falsely marked deleted.
    await this.storageProvider.deleteObject(asset.storageKey);

    const updated = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const result = await tx.mediaAsset.update({
        where: { id: mediaAssetId },
        data: { status: MediaAssetStatus.DELETED },
      });

      await this.outboxService.record(tx, {
        eventType: CatalogEventType.MEDIA_ASSET_REMOVED,
        aggregateType: 'MediaAsset',
        aggregateId: result.id,
        payload: { mediaAssetId: result.id, organizationId },
      });

      return result;
    });

    await this.auditService.record({
      actorUserId,
      action: 'catalog.media_asset.deleted',
      targetType: 'MediaAsset',
      targetId: mediaAssetId,
      outcome: 'SUCCESS',
      metadata: { organizationId },
    });

    return updated;
  }

  /**
   * Bounded, idempotent cleanup of abandoned upload intents — see MEDIA
   * CLEANUP. Only ever touches PENDING_UPLOAD rows past their expiry, so
   * it can never delete an object still referenced by an active (READY)
   * asset.
   */
  async cleanupExpiredUploadIntents(batchSize = 100): Promise<number> {
    const expired = await this.prisma.mediaAsset.findMany({
      where: { status: MediaAssetStatus.PENDING_UPLOAD, uploadExpiresAt: { lt: new Date() } },
      take: batchSize,
    });

    if (expired.length === 0) {
      return 0;
    }

    await this.prisma.mediaAsset.updateMany({
      where: { id: { in: expired.map((a: { id: string }) => a.id) } },
      data: { status: MediaAssetStatus.FAILED },
    });

    this.logger.log(`Marked ${expired.length} expired upload intent(s) as FAILED.`);
    return expired.length;
  }

  async requireOwned(organizationId: string, mediaAssetId: string) {
    const asset = await this.prisma.mediaAsset.findUnique({ where: { id: mediaAssetId } });
    if (!asset || asset.organizationId !== organizationId) {
      throw AppException.notFound('Media asset not found.');
    }
    return asset;
  }

  private async assertEntityOwnership(
    organizationId: string,
    entityType: 'PRODUCT' | 'VARIANT',
    entityId: string,
  ): Promise<void> {
    if (entityType === 'PRODUCT') {
      const product = await this.prisma.product.findUnique({ where: { id: entityId } });
      if (!product || product.organizationId !== organizationId) {
        throw AppException.notFound('Product not found.');
      }
      return;
    }

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: entityId },
      include: { product: true },
    });
    if (!variant || variant.product.organizationId !== organizationId) {
      throw AppException.notFound('Product variant not found.');
    }
  }

  toResponseDto(asset: {
    id: string;
    organizationId: string;
    productId: string | null;
    variantId: string | null;
    assetType: string;
    mimeType: string;
    sizeBytes: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): MediaAssetResponseDto {
    return { ...asset };
  }
}
