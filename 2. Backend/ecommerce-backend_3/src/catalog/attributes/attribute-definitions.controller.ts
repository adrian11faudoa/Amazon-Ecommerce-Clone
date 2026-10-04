import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { AuthenticatedUser } from '../../auth/authenticated-user.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permission } from '../../authorization/permission.enum';
import { AttributeDefinitionsService } from './attribute-definitions.service';
import { CreateAttributeDefinitionDto } from './dto/create-attribute-definition.dto';
import { AttributeDefinitionResponseDto } from './dto/attribute-definition-response.dto';

@ApiTags('catalog-attributes')
@Controller('catalog/attribute-definitions')
export class AttributeDefinitionsController {
  constructor(private readonly attributeDefinitionsService: AttributeDefinitionsService) {}

  // Public: sellers and storefront clients both need this vocabulary to
  // build valid product/variant payloads and render filters.
  @Public()
  @Get()
  async list(): Promise<AttributeDefinitionResponseDto[]> {
    const definitions = await this.attributeDefinitionsService.list();
    return definitions.map(
      (d: {
        id: string;
        key: string;
        label: string;
        type: string;
        allowedValues: unknown;
        isVariantAttribute: boolean;
      }) => this.attributeDefinitionsService.toResponseDto(d),
    );
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CATALOG_ATTRIBUTE_MANAGE)
  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateAttributeDefinitionDto,
  ): Promise<AttributeDefinitionResponseDto> {
    const definition = await this.attributeDefinitionsService.create(user.userId, dto);
    return this.attributeDefinitionsService.toResponseDto(definition);
  }
}
