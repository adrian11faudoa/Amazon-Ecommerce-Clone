import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ description: 'Minimum 10 characters.' })
  @IsString()
  @Length(10, 128)
  newPassword: string;
}
