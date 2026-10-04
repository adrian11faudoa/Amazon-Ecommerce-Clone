import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SessionsService } from './sessions/sessions.service';
import { TokenService } from './tokens/token.service';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';

// Global so JwtAuthGuard/TokenService are available to any feature module
// (e.g. OrganizationsController) without every module re-importing AuthModule.
@Global()
@Module({
  imports: [
    JwtModule.register({}), // secret/options are supplied per-call by TokenService from validated config
    UsersModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, SessionsService, JwtAuthGuard],
  exports: [AuthService, TokenService, SessionsService, JwtAuthGuard],
})
export class AuthModule {}
