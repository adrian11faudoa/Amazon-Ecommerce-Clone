import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { Permission } from '../authorization/permission.enum';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationResponseDto } from './dto/organization-response.dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('seller-organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.createOrganization(user.userId, dto);
    return this.organizationsService.toResponseDto(organization);
  }

  @Get('mine')
  async listMine(@CurrentUser() user: AuthenticatedUser): Promise<OrganizationResponseDto[]> {
    const organizations = await this.organizationsService.listForUser(user.userId);
    return organizations.map(
      (org: {
        id: string;
        legalName: string;
        displayName: string;
        status: string;
        createdAt: Date;
      }) => this.organizationsService.toResponseDto(org),
    );
  }

  /**
   * `:organizationId` in the path is what makes PermissionsGuard resolve
   * org-scoped permissions (see PermissionsGuard) instead of platform ones.
   */
  @Get(':organizationId')
  @RequirePermissions(Permission.SELLER_ORGANIZATION_READ)
  async getById(@Param('organizationId') organizationId: string): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.requireById(organizationId);
    return this.organizationsService.toResponseDto(organization);
  }
}
