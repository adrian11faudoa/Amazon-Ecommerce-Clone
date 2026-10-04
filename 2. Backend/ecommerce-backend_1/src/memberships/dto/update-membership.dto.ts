import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SellerMembershipRoleName } from '../../authorization/role.enum';
import { MembershipStatus } from '@prisma/client';

export class UpdateMembershipDto {
  @ApiProperty({ enum: SellerMembershipRoleName, required: false })
  @IsOptional()
  @IsEnum(SellerMembershipRoleName)
  role?: SellerMembershipRoleName;

  @ApiProperty({ enum: MembershipStatus, required: false })
  @IsOptional()
  @IsEnum(MembershipStatus)
  status?: MembershipStatus;
}
