import { Module } from '@nestjs/common';
import { QueueModule } from '../../infrastructure/queue/queue.module';
import { ConsoleSearchIndexClient } from './console-search-index.client';
import { SEARCH_INDEX_CLIENT } from './search-index-client.interface';
import { SearchIndexProcessor } from './search-index.processor';
import { OutboxRelayService } from './outbox-relay.service';

@Module({
  imports: [QueueModule],
  providers: [
    { provide: SEARCH_INDEX_CLIENT, useClass: ConsoleSearchIndexClient },
    SearchIndexProcessor,
    OutboxRelayService,
  ],
  exports: [OutboxRelayService],
})
export class SearchIndexingModule {}
