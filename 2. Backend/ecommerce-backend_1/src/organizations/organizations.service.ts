import { Injectable } from '@nestjs/common';
import { MembershipRole, MembershipStatus, OrganizationStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { AuditService } from '../audit/audit.service';
import { OrganizationResponseDto } from './dto/organization-response.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Creates a seller organization and grants the creating user a
   * SELLER_ADMIN membership in the same transaction, so an organization
   * can never exist with zero administrators.
   */
  async createOrganization(
    creatorUserId: string,
    params: { legalName: string; displayName: string },
  ) {
    const organization = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const org = await tx.sellerOrganization.create({
        data: {
          legalName: params.legalName,
          displayName: params.displayName,
          status: OrganizationStatus.PENDING,
        },
      });

      await tx.sellerMembership.create({
        data: {
          userId: creatorUserId,
          organizationId: org.id,
          role: MembershipRole.SELLER_ADMIN,
          status: MembershipStatus.ACTIVE,
        },
      });

      return org;
    });

    await this.auditService.record({
      actorUserId: creatorUserId,
      action: 'seller_organization.created',
      targetType: 'SellerOrganization',
      targetId: organization.id,
      outcome: 'SUCCESS',
    });

    return organization;
  }

  async requireById(organizationId: string) {
    const organization = await this.prisma.sellerOrganization.findUnique({
      where: { id: organizationId },
    });
    if (!organization) {
      throw AppException.notFound('Seller organization not found.');
    }
    return organization;
  }

  async listForUser(userId: string) {
    const memberships = await this.prisma.sellerMembership.findMany({
      where: { userId, status: MembershipStatus.ACTIVE },
      include: { organization: true },
    });
    return memberships.map(
      (m: {
        organization: {
          id: string;
          legalName: string;
          displayName: string;
          status: string;
          createdAt: Date;
        };
      }) => m.organization,
    );
  }

  toResponseDto(organization: {
    id: string;
    legalName: string;
    displayName: string;
    status: string;
    createdAt: Date;
  }): OrganizationResponseDto {
    return {
      id: organization.id,
      legalName: organization.legalName,
      displayName: organization.displayName,
      status: organization.status,
      createdAt: organization.createdAt,
    };
  }
}
