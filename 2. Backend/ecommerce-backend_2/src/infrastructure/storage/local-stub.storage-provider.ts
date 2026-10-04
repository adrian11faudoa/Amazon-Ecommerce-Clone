import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ObjectMetadata, PresignedUpload, StorageProvider } from './storage-provider.interface';

/**
 * Default provider when STORAGE_PROVIDER=local (the default). There is no
 * real backing object store here, so — honestly, per MEDIA FINALIZATION —
 * this provider can generate a plausible-looking upload target for local
 * development ergonomics, but headObject always reports exists:false: it
 * has no way to confirm anything was actually stored, so it must not
 * claim otherwise. MediaService's finalize step will therefore correctly
 * refuse to mark an asset READY under this provider. Configure
 * STORAGE_PROVIDER=s3 with real credentials to get working uploads.
 */
@Injectable()
export class LocalStubStorageProvider implements StorageProvider {
  private readonly logger = new Logger('StorageProvider(local-stub)');

  async createPresignedUploadUrl(params: {
    key: string;
    contentType: string;
    expiresInSeconds: number;
  }): Promise<PresignedUpload> {
    this.logger.warn(
      `[NOT A REAL UPLOAD TARGET — local-stub provider] key=${params.key} contentType=${params.contentType}`,
    );
    return {
      url: `local-stub://uploads/${params.key}?token=${randomUUID()}`,
      method: 'PUT',
      expiresAt: new Date(Date.now() + params.expiresInSeconds * 1000),
    };
  }

  async headObject(_key: string): Promise<ObjectMetadata> {
    // Honest answer: this provider has no backing store, so it can never
    // confirm an object exists. See class-level comment.
    return { exists: false };
  }

  async deleteObject(key: string): Promise<void> {
    this.logger.warn(`[NOT A REAL DELETE — local-stub provider] key=${key}`);
  }
}
