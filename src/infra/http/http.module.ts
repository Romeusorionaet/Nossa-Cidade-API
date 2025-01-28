import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { RegisterWidthOAuthController } from './controllers/user/auth/register-user-with-oauth.controller';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { GetUserProfileController } from './controllers/user/get-user-profile.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { EnvModule } from '../env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, EnvModule, CryptographyModule, AuthModule],
  controllers: [GetUserProfileController, RegisterWidthOAuthController],
  providers: [
    GetUserProfileUseCase,
    RegisterUserWithOAuthUseCase,
    RefreshTokenUseCase,
  ],
})
export class HttpModule {}
