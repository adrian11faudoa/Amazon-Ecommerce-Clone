import { Module } from '@nestjs/common';
import { QueueModule } from '../infrastructure/queue/queue.module';
import { SearchIndexingModule } from '../catalog/search-indexing/search-indexing.module';
import { MediaModule } from '../catalog/media/media.module';
import { InventoryModule } from '../inventory/inventory.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { MaintenanceProcessor } from './maintenance.processor';
import { MaintenanceSchedulerService } from './maintenance-scheduler.service';

@Module({
  imports: [QueueModule, SearchIndexingModule, MediaModule, InventoryModule, CheckoutModule],
  providers: [MaintenanceProcessor, MaintenanceSchedulerService],
})
export class MaintenanceModule {}
