import { Injectable } from '@nestjs/common';
import { Prisma, User, UserStatus } from '@prisma/client';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AppException } from '../common/errors/app-exception';
import { normalizeEmail } from '../common/utils/email.util';
import { UserResponseDto } from './dto/user-response.dto';

export type UserWithRoles = User & { platformRoles: { role: string }[] };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByNormalizedEmail(email: string): Promise<UserWithRoles | null> {
    return this.prisma.user.findUnique({
      where: { normalizedEmail: normalizeEmail(email) },
      include: { platformRoles: true },
    });
  }

  async findById(userId: string): Promise<UserWithRoles | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { platformRoles: true },
    });
  }

  async requireById(userId: string): Promise<UserWithRoles> {
    const user = await this.findById(userId);
    if (!user) {
      throw AppException.notFound('User not found.');
    }
    return user;
  }

  /**
   * Creates a new account with its customer profile and baseline CUSTOMER
   * role, inside one transaction so partial account creation can never
   * be observed.
   *
   * Relies on the unique constraint on `normalizedEmail` as the final
   * authority against duplicate accounts (in addition to the service's
   * own pre-check), because pre-check + insert is inherently racy under
   * concurrency.
   */
  async createCustomerAccount(params: {
    email: string;
    passwordHash: string;
    displayName: string;
  }): Promise<UserWithRoles> {
    const normalizedEmail = normalizeEmail(params.email);

    try {
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const user = await tx.user.create({
          data: {
            email: params.email.trim(),
            normalizedEmail,
            passwordHash: params.passwordHash,
            status: UserStatus.PENDING_VERIFICATION,
            platformRoles: {
              create: [{ role: 'CUSTOMER' }],
            },
            customerProfile: {
              create: { displayName: params.displayName },
            },
          },
          include: { platformRoles: true },
        });
        return user;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw AppException.conflict('An account with this email already exists.');
      }
      throw error;
    }
  }

  async markEmailVerified(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { emailVerifiedAt: new Date(), status: UserStatus.ACTIVE },
    });
  }

  async updatePasswordHash(userId: string, passwordHash: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash, passwordChangedAt: new Date() },
    });
  }

  toResponseDto(user: UserWithRoles): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      status: user.status,
      emailVerified: user.emailVerifiedAt !== null,
      platformRoles: user.platformRoles.map((r: { role: string }) => r.role),
      createdAt: user.createdAt,
    };
  }
}
