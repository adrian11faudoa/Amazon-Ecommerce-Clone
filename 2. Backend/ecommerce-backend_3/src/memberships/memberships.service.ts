import { Injectable } from '@nestjs/common';
import { MembershipStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { AuditService } from '../audit/audit.service';
import { MembershipResponseDto } from './dto/membership-response.dto';

@Injectable()
export class MembershipsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async listForOrganization(organizationId: string) {
    return this.prisma.sellerMembership.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async addMember(
    actorUserId: string,
    organizationId: string,
    params: { userId: string; role: string },
  ) {
    try {
      const membership = await this.prisma.sellerMembership.create({
        data: {
          userId: params.userId,
          organizationId,
          role: params.role as any,
          status: MembershipStatus.ACTIVE,
        },
      });

      await this.auditService.record({
        actorUserId,
        action: 'seller_membership.added',
        targetType: 'SellerMembership',
        targetId: membership.id,
        outcome: 'SUCCESS',
        metadata: { organizationId, subjectUserId: params.userId, role: params.role },
      });

      return membership;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('This user is already a member of the organization.');
      }
      throw error;
    }
  }

  async updateMember(
    actorUserId: string,
    organizationId: string,
    membershipId: string,
    params: { role?: string; status?: MembershipStatus },
  ) {
    const existing = await this.prisma.sellerMembership.findFirst({
      where: { id: membershipId, organizationId },
    });
    if (!existing) {
      throw AppException.notFound('Membership not found.');
    }

    const membership = await this.prisma.sellerMembership.update({
      where: { id: membershipId },
      data: {
        role: (params.role as any) ?? undefined,
        status: params.status ?? undefined,
      },
    });

    await this.auditService.record({
      actorUserId,
      action: 'seller_membership.updated',
      targetType: 'SellerMembership',
      targetId: membership.id,
      outcome: 'SUCCESS',
      metadata: { organizationId, changes: params },
    });

    return membership;
  }

  toResponseDto(membership: {
    id: string;
    userId: string;
    organizationId: string;
    role: string;
    status: string;
    createdAt: Date;
  }): MembershipResponseDto {
    return {
      id: membership.id,
      userId: membership.userId,
      organizationId: membership.organizationId,
      role: membership.role,
      status: membership.status,
      createdAt: membership.createdAt,
    };
  }
}
