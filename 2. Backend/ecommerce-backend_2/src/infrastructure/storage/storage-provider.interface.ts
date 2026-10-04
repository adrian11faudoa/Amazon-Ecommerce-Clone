export interface PresignedUpload {
  url: string;
  method: 'PUT';
  expiresAt: Date;
}

export interface ObjectMetadata {
  exists: boolean;
  sizeBytes?: number;
  contentType?: string;
}

/**
 * Storage provider boundary — catalog services depend on this interface,
 * never on a provider SDK directly (see MEDIA STORAGE INTEGRATION).
 *
 * Every method's honesty is load-bearing:
 *  - createPresignedUploadUrl must never hand out a credential, only a
 *    short-lived, server-key-scoped URL.
 *  - headObject must return exists:false (not fabricate success) if the
 *    provider cannot confirm the object — see MediaService.finalize,
 *    which refuses to mark an asset READY without a confirmed headObject.
 */
export interface StorageProvider {
  createPresignedUploadUrl(params: {
    key: string;
    contentType: string;
    expiresInSeconds: number;
  }): Promise<PresignedUpload>;

  headObject(key: string): Promise<ObjectMetadata>;

  deleteObject(key: string): Promise<void>;
}

export const STORAGE_PROVIDER = 'STORAGE_PROVIDER';
