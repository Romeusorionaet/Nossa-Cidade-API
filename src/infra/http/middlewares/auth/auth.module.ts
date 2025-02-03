import { ForgotPasswordTokenStrategy } from './strategies/forgot-password-token.strategy';
import { ConfirmationTokenStrategy } from './strategies/confirmation-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { PermissionGuard } from './guards/permission.guard';
import { EnvService } from '../../../env/env.service';
import { EnvModule } from '../../../env/env.module';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY');
        const publicKey = env.get('JWT_PUBLIC_KEY');

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  providers: [
    ForgotPasswordTokenStrategy,
    ConfirmationTokenStrategy,
    AccessTokenStrategy,
    PermissionGuard,
    EnvService,
  ],
})
export class AuthModule {}
