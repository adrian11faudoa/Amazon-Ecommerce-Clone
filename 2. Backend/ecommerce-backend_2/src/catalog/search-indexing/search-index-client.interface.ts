export interface SearchIndexPayload {
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  document: Record<string, unknown>;
}

/**
 * Search backend boundary. Catalog services never talk to
 * Elasticsearch/OpenSearch directly (see SEARCH INDEXING FOUNDATION) —
 * only through this interface, via the outbox relay + queue worker.
 */
export interface SearchIndexClient {
  indexDocument(payload: SearchIndexPayload): Promise<void>;
}

export const SEARCH_INDEX_CLIENT = 'SEARCH_INDEX_CLIENT';
