import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RateLimitScope } from '../security/rate-limit/rate-limit.decorator';
import { RateLimitGuard } from '../security/rate-limit/rate-limit.guard';
import { AuthenticatedUser } from './authenticated-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthSessionResponseDto } from './dto/auth-session-response.dto';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { SessionMetadata } from './sessions/sessions.service';

function metadataFromRequest(request: Request): SessionMetadata {
  return {
    userAgent: request.header('user-agent'),
    ipAddress: request.ip,
  };
}

@ApiTags('auth')
@UseGuards(RateLimitGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @RateLimitScope('register')
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() request: Request,
  ): Promise<AuthSessionResponseDto> {
    return this.authService.register({ ...dto, metadata: metadataFromRequest(request) });
  }

  @Public()
  @RateLimitScope('login')
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() request: Request): Promise<AuthSessionResponseDto> {
    return this.authService.login({ ...dto, metadata: metadataFromRequest(request) });
  }

  @Public()
  @RateLimitScope('tokenRefresh')
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto, @Req() request: Request) {
    return this.authService.refresh(dto.refreshToken, metadataFromRequest(request));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(
    @Body() dto: RefreshTokenDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    await this.authService.logout(dto.refreshToken, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async me(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    const record = await this.usersService.requireById(user.userId);
    return this.usersService.toResponseDto(record);
  }

  @Public()
  @RateLimitScope('emailVerification')
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<void> {
    await this.authService.verifyEmail(dto.token);
  }

  @Public()
  @RateLimitScope('emailVerification')
  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendVerification(@Body() dto: ResendVerificationDto): Promise<void> {
    await this.authService.resendVerification(dto.email);
  }

  @Public()
  @RateLimitScope('passwordReset')
  @Post('password-reset/request')
  @HttpCode(HttpStatus.NO_CONTENT)
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto): Promise<void> {
    await this.authService.requestPasswordReset(dto.email);
  }

  @Public()
  @RateLimitScope('passwordReset')
  @Post('password-reset/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async completePasswordReset(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
