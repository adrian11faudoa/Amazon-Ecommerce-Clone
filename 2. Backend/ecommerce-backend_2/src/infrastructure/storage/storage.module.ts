import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalStubStorageProvider } from './local-stub.storage-provider';
import { S3StorageProvider } from './s3.storage-provider';
import { STORAGE_PROVIDER } from './storage-provider.interface';

@Module({
  providers: [
    LocalStubStorageProvider,
    S3StorageProvider,
    {
      provide: STORAGE_PROVIDER,
      inject: [ConfigService, LocalStubStorageProvider, S3StorageProvider],
      useFactory: (
        configService: ConfigService,
        localStub: LocalStubStorageProvider,
        s3: S3StorageProvider,
      ) => (configService.get<string>('storage.provider') === 's3' ? s3 : localStub),
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
