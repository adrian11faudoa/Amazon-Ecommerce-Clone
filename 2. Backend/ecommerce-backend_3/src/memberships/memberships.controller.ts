import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { Permission } from '../authorization/permission.enum';
import { AddMembershipDto } from './dto/add-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipResponseDto } from './dto/membership-response.dto';
import { MembershipsService } from './memberships.service';

@ApiTags('seller-memberships')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  @RequirePermissions(Permission.SELLER_ORGANIZATION_READ)
  async list(@Param('organizationId') organizationId: string): Promise<MembershipResponseDto[]> {
    const memberships = await this.membershipsService.listForOrganization(organizationId);
    return memberships.map(
      (m: {
        id: string;
        userId: string;
        organizationId: string;
        role: string;
        status: string;
        createdAt: Date;
      }) => this.membershipsService.toResponseDto(m),
    );
  }

  @Post()
  @RequirePermissions(Permission.SELLER_MEMBERSHIP_MANAGE)
  async add(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: AddMembershipDto,
  ): Promise<MembershipResponseDto> {
    const membership = await this.membershipsService.addMember(user.userId, organizationId, dto);
    return this.membershipsService.toResponseDto(membership);
  }

  @Patch(':membershipId')
  @RequirePermissions(Permission.SELLER_MEMBERSHIP_MANAGE)
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('membershipId') membershipId: string,
    @Body() dto: UpdateMembershipDto,
  ): Promise<MembershipResponseDto> {
    const membership = await this.membershipsService.updateMember(
      user.userId,
      organizationId,
      membershipId,
      dto,
    );
    return this.membershipsService.toResponseDto(membership);
  }
}
