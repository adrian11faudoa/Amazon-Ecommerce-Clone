import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsString()
  @Length(2, 200)
  legalName: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  displayName: string;
}
