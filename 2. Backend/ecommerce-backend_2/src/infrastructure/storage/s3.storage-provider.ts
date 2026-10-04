import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppException } from '../../common/errors/app-exception';
import { ObjectMetadata, PresignedUpload, StorageProvider } from './storage-provider.interface';

/**
 * Real S3 (or S3-compatible) provider. Credentials are never read from
 * config directly — the AWS SDK's standard credential chain (env vars,
 * shared config file, instance/task role) supplies them, so nothing here
 * ever hardcodes or logs a secret.
 *
 * Presigning (createPresignedUploadUrl) is a local cryptographic
 * operation — it does not make a network call, so it works even in
 * network-restricted environments as long as credentials are configured.
 * headObject/deleteObject DO make real calls to the provider and will
 * fail if the network can't reach it; those failures are translated to
 * AppException.externalStorageFailure rather than leaking provider
 * internals.
 */
@Injectable()
export class S3StorageProvider implements StorageProvider {
  private readonly logger = new Logger('StorageProvider(s3)');
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('storage.region');
    const endpoint = this.configService.get<string>('storage.endpoint');
    this.bucket = this.configService.get<string>('storage.bucket') ?? '';

    this.client = new S3Client({
      region,
      endpoint,
      // forcePathStyle supports S3-compatible providers (MinIO, R2, etc.)
      // that don't support virtual-hosted-style addressing.
      forcePathStyle: Boolean(endpoint),
    });
  }

  async createPresignedUploadUrl(params: {
    key: string;
    contentType: string;
    expiresInSeconds: number;
  }): Promise<PresignedUpload> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: params.key,
      ContentType: params.contentType,
    });

    try {
      const url = await getSignedUrl(this.client, command, {
        expiresIn: params.expiresInSeconds,
      });
      return {
        url,
        method: 'PUT',
        expiresAt: new Date(Date.now() + params.expiresInSeconds * 1000),
      };
    } catch (error) {
      this.logger.error('Failed to presign S3 upload URL.');
      throw AppException.externalStorageFailure();
    }
  }

  async headObject(key: string): Promise<ObjectMetadata> {
    try {
      const result = await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      return {
        exists: true,
        sizeBytes: result.ContentLength,
        contentType: result.ContentType,
      };
    } catch (error) {
      if (error instanceof NotFound) {
        return { exists: false };
      }
      this.logger.error(`Failed to head S3 object key=${key}.`);
      throw AppException.externalStorageFailure();
    }
  }

  async deleteObject(key: string): Promise<void> {
    try {
      await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    } catch (error) {
      this.logger.error(`Failed to delete S3 object key=${key}.`);
      throw AppException.externalStorageFailure();
    }
  }
}
