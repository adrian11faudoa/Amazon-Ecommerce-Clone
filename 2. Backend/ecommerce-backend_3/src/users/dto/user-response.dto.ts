import { ApiProperty } from '@nestjs/swagger';

/**
 * Explicit response shape for user identity.
 *
 * Never return the Prisma User model directly from a controller — this
 * DTO is the only representation of a user that crosses the API
 * boundary, and it deliberately omits passwordHash and other internal
 * fields.
 */
export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  platformRoles: string[];

  @ApiProperty()
  createdAt: Date;
}
