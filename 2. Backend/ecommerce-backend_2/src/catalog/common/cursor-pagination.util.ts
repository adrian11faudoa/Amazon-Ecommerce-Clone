import { AppException } from '../../common/errors/app-exception';

export interface CursorPosition {
  createdAt: string;
  id: string;
}

export interface PagedResult<T> {
  items: T[];
  nextCursor: string | null;
}

/**
 * Opaque cursor pagination for large, mutable catalogs — see API
 * PAGINATION requirement. The cursor encodes (createdAt, id) from the
 * last row of the previous page; ordering is always createdAt DESC, id
 * DESC to keep it total and stable even when createdAt collides.
 */
export function encodeCursor(position: CursorPosition): string {
  return Buffer.from(JSON.stringify(position), 'utf8').toString('base64url');
}

export function decodeCursor(cursor: string): CursorPosition {
  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
    if (typeof decoded?.createdAt !== 'string' || typeof decoded?.id !== 'string') {
      throw new Error('malformed');
    }
    return decoded;
  } catch {
    throw AppException.validationFailed('Invalid pagination cursor.');
  }
}

export function clampPageSize(
  requested: number | undefined,
  defaultSize: number,
  max: number,
): number {
  if (!requested || !Number.isFinite(requested) || requested < 1) {
    return defaultSize;
  }
  return Math.min(requested, max);
}
