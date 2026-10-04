import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { SellerMembershipRoleName } from '../../authorization/role.enum';

export class AddMembershipDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: SellerMembershipRoleName })
  @IsEnum(SellerMembershipRoleName)
  role: SellerMembershipRoleName;
}
