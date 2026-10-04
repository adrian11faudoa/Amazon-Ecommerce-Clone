import { ApiProperty } from '@nestjs/swagger';

/**
 * Deliberately separate from ProductResponseDto: only fields safe for
 * unauthenticated storefront consumption. Never include organizationId
 * ownership internals, moderation state, or audit metadata here — see
 * CUSTOMER-FACING READ API BOUNDARY.
 */
export class PublicProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  categoryId: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  brand: string | null;

  @ApiProperty()
  attributes: { key: string; value: unknown }[];
}
