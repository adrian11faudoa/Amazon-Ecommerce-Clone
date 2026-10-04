import { Injectable, Logger } from '@nestjs/common';
import { SearchIndexClient, SearchIndexPayload } from './search-index-client.interface';

/**
 * Default implementation: no Elasticsearch/OpenSearch cluster is
 * configured or reachable in this environment, so this client logs what
 * it WOULD index rather than fabricating a real search backend — per
 * "Do not fabricate external storage or search infrastructure." Swap in
 * a real OpenSearch/Elasticsearch client behind SEARCH_INDEX_CLIENT once
 * cluster credentials/endpoint are available; nothing else in the
 * codebase needs to change (see SearchIndexingModule).
 */
@Injectable()
export class ConsoleSearchIndexClient implements SearchIndexClient {
  private readonly logger = new Logger('SearchIndexClient(console)');

  async indexDocument(payload: SearchIndexPayload): Promise<void> {
    this.logger.log(
      `[NOT INDEXED IN A REAL SEARCH CLUSTER — console client] ${payload.aggregateType}:${payload.aggregateId} (${payload.eventType})`,
    );
  }
}
