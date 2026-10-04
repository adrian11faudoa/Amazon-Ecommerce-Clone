import { AsyncLocalStorage } from 'async_hooks';

/**
 * Immutable per-request context.
 *
 * Deliberately excludes tokens, credentials, or secrets — this object is
 * attached to logs, traces, and audit metadata, so it must stay safe to
 * serialize anywhere.
 */
export interface RequestContextData {
  requestId: string;
  correlationId: string;
  userId?: string;
  organizationId?: string;
  ipAddress?: string;
  userAgent?: string;
}

const storage = new AsyncLocalStorage<RequestContextData>();

export class RequestContext {
  static run<T>(data: RequestContextData, fn: () => T): T {
    return storage.run(data, fn);
  }

  static current(): RequestContextData | undefined {
    return storage.getStore();
  }

  static requireCurrent(): RequestContextData {
    const ctx = storage.getStore();
    if (!ctx) {
      throw new Error('RequestContext accessed outside of an active request scope');
    }
    return ctx;
  }

  /** Merges additional fields (e.g. authenticated userId) into the active context. */
  static set(partial: Partial<RequestContextData>): void {
    const ctx = storage.getStore();
    if (ctx) {
      Object.assign(ctx, partial);
    }
  }
}
