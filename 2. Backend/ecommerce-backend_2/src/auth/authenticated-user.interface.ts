import { PlatformRoleName } from '../authorization/role.enum';

/**
 * Identity attached to `request.user` after JwtAuthGuard validates an
 * access token. This is the only trusted source of "who is calling" for
 * every downstream authorization decision — never trust client-supplied
 * user/organization IDs in the request body for authorization purposes.
 */
export interface AuthenticatedUser {
  userId: string;
  platformRoles: PlatformRoleName[];
}
