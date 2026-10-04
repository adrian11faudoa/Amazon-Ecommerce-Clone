import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCheckoutDto {
  @ApiProperty({
    description:
      'Client-generated idempotency key; retrying with the same key returns the same checkout.',
  })
  @IsString()
  @Length(8, 128)
  idempotencyKey: string;
}
