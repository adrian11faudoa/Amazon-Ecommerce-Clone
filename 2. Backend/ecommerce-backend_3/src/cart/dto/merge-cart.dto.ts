import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MergeCartDto {
  @ApiProperty({
    description: 'The anonymous cart token to merge into the authenticated customer cart.',
  })
  @IsString()
  anonymousToken: string;
}
