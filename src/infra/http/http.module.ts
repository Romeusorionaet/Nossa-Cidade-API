import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { RegisterWidthOAuthController } from './controllers/user/auth/register-user-with-oauth.controller';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { GetUserProfileController } from './controllers/user/get-user-profile.controller';
import { RegisterUserController } from './controllers/user/auth/register-user.controller';
import { ConfirmEmailController } from './controllers/user/auth/confirm-email.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { ValidationEmail } from '../services/email/validation-email';
import { EmailModule } from '../services/email/email.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { EnvModule } from '../env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
    EnvModule,
    CryptographyModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [
    GetUserProfileController,
    RegisterWidthOAuthController,
    RegisterUserController,
    ConfirmEmailController,
  ],
  providers: [
    GetUserProfileUseCase,
    RegisterUserWithOAuthUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase,
    ValidationEmail,
    ConfirmEmailUseCase,
  ],
})
export class HttpModule {}
