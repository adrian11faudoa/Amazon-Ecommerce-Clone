import { ApiProperty } from '@nestjs/swagger';

export class OrganizationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  legalName: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;
}
