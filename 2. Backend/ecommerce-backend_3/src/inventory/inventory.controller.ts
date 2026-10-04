import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../authorization/permissions.guard';
import { Permission } from '../authorization/permission.enum';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { AdjustInventoryDto } from './dto/adjust-inventory.dto';
import { ReconcileInventoryDto } from './dto/reconcile-inventory.dto';
import { ListAdjustmentsQueryDto } from './dto/list-adjustments-query.dto';
import { InventoryItemResponseDto } from './dto/inventory-item-response.dto';

@ApiTags('seller-inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('seller-organizations/:organizationId/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @RequirePermissions(Permission.INVENTORY_READ)
  async list(@Param('organizationId') organizationId: string): Promise<InventoryItemResponseDto[]> {
    const items = await this.inventoryService.listForOrganization(organizationId);
    return items.map(
      (i: {
        id: string;
        organizationId: string;
        sellerOfferId: string;
        onHandQuantity: number;
        reservedQuantity: number;
        createdAt: Date;
        updatedAt: Date;
      }) => this.inventoryService.toResponseDto(i),
    );
  }

  @Get(':inventoryItemId')
  @RequirePermissions(Permission.INVENTORY_READ)
  async getById(
    @Param('organizationId') organizationId: string,
    @Param('inventoryItemId') inventoryItemId: string,
  ): Promise<InventoryItemResponseDto> {
    const item = await this.inventoryService.requireOwned(organizationId, inventoryItemId);
    return this.inventoryService.toResponseDto(item);
  }

  @Post()
  @RequirePermissions(Permission.INVENTORY_MANAGE)
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Body() dto: CreateInventoryItemDto,
  ): Promise<InventoryItemResponseDto> {
    const item = await this.inventoryService.create(user.userId, organizationId, dto);
    return this.inventoryService.toResponseDto(item);
  }

  @Post(':inventoryItemId/adjustments')
  @RequirePermissions(Permission.INVENTORY_MANAGE)
  async adjust(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('inventoryItemId') inventoryItemId: string,
    @Body() dto: AdjustInventoryDto,
  ): Promise<InventoryItemResponseDto> {
    const { item } = await this.inventoryService.adjust(
      user.userId,
      organizationId,
      inventoryItemId,
      dto,
    );
    return this.inventoryService.toResponseDto(item);
  }

  @Get(':inventoryItemId/adjustments')
  @RequirePermissions(Permission.INVENTORY_READ)
  async listAdjustments(
    @Param('organizationId') organizationId: string,
    @Param('inventoryItemId') inventoryItemId: string,
    @Query() query: ListAdjustmentsQueryDto,
  ) {
    return this.inventoryService.listAdjustments(organizationId, inventoryItemId, query);
  }

  @Post(':inventoryItemId/reconcile')
  @RequirePermissions(Permission.INVENTORY_RECONCILE)
  async reconcile(
    @CurrentUser() user: AuthenticatedUser,
    @Param('organizationId') organizationId: string,
    @Param('inventoryItemId') inventoryItemId: string,
    @Body() dto: ReconcileInventoryDto,
  ) {
    const { item, discrepancy } = await this.inventoryService.reconcile(
      user.userId,
      organizationId,
      inventoryItemId,
      dto,
    );
    return { item: this.inventoryService.toResponseDto(item), discrepancy };
  }

  @Post('reservations/:reservationId/release')
  @RequirePermissions(Permission.INVENTORY_RESERVATION_RELEASE)
  async releaseReservation(
    @CurrentUser() user: AuthenticatedUser,
    @Param('reservationId') reservationId: string,
  ) {
    return this.inventoryService.releaseReservation(reservationId, user.userId);
  }
}
