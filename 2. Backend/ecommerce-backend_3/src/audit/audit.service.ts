import { Injectable, Logger } from '@nestjs/common';
import { AuditOutcome } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { RequestContext } from '../common/context/request-context';

export interface RecordAuditEventInput {
  actorUserId?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  outcome: AuditOutcome;
  metadata?: Record<string, unknown>;
}

/**
 * Records security/audit events for sensitive actions (auth, session,
 * membership, permission changes, admin actions).
 *
 * Never pass passwords, tokens, or secrets in `metadata` — this service
 * does not scrub input, so callers are responsible for only including
 * safe, already-redacted fields.
 */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async record(input: RecordAuditEventInput): Promise<void> {
    const ctx = RequestContext.current();

    try {
      await this.prisma.auditEvent.create({
        data: {
          actorUserId: input.actorUserId,
          action: input.action,
          targetType: input.targetType,
          targetId: input.targetId,
          outcome: input.outcome,
          metadata: input.metadata as any,
          requestId: ctx?.requestId,
          correlationId: ctx?.correlationId,
        },
      });
    } catch (error) {
      // Audit logging must never take down the primary operation, but a
      // failure here is itself operationally significant.
      this.logger.error(`Failed to persist audit event for action=${input.action}`);
    }
  }
}
