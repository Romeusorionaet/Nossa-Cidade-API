import { ConfirmationTokenStrategy } from './confirmation-token-strategy';
import { AccessTokenStrategy } from './access-token-strategy';
import { EnvService } from '../../../env/env.service';
import { PermissionGuard } from './permission-guard';
import { EnvModule } from '../../../env/env.module';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthGuard } from './jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';
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
    AccessTokenStrategy,
    ConfirmationTokenStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AuthModule {}
