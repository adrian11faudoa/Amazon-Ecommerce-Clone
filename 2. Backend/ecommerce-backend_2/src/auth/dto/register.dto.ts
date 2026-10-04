import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Minimum 10 characters.' })
  @IsString()
  @Length(10, 128)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  displayName: string;
}
