import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AppException } from '../../common/errors/app-exception';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';

/**
 * Reusable ownership check for services that operate on seller-scoped
 * resources outside the HTTP guard path (e.g. background jobs, internal
 * service calls). Controllers should still rely on PermissionsGuard for
 * the HTTP boundary; this policy exists so the same rule isn't
 * re-implemented ad hoc in every service.
 */
@Injectable()
export class SellerOrganizationPolicy {
  constructor(private readonly prisma: PrismaService) {}

  async assertActiveMember(user: AuthenticatedUser, organizationId: string): Promise<void> {
    const membership = await this.prisma.sellerMembership.findUnique({
      where: { userId_organizationId: { userId: user.userId, organizationId } },
    });

    if (!membership || membership.status !== 'ACTIVE') {
      throw AppException.organizationAccessDenied();
    }
  }
}
