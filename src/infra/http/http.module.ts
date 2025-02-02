import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { UpdateUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/update-user-password';
import { AuthenticateUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/authenticate-user';
import { AuthenticateWidthOAuthController } from './controllers/user/auth/authenticate-with-oauth.controller';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { UpdateUserPasswordController } from './controllers/user/auth/update-user-password.controller';
import { AuthenticateUserController } from './controllers/user/auth/authenticate-user.controller';
import { GetUserProfileController } from './controllers/user/get-user-profile.controller';
import { RegisterUserController } from './controllers/user/auth/register-user.controller';
import { ConfirmEmailController } from './controllers/user/auth/confirm-email.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { ValidationEmail } from '../services/email/validation.email';
import { EmailModule } from '../services/email/email.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { EnvModule } from '../env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CryptographyModule,
    DatabaseModule,
    EmailModule,
    AuthModule,
    EnvModule,
  ],
  controllers: [
    AuthenticateWidthOAuthController,
    UpdateUserPasswordController,
    AuthenticateUserController,
    GetUserProfileController,
    RegisterUserController,
    ConfirmEmailController,
  ],
  providers: [
    RegisterUserWithOAuthUseCase,
    UpdateUserPasswordUseCase,
    AuthenticateUserUseCase,
    GetUserProfileUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase,
    ConfirmEmailUseCase,
    ValidationEmail,
  ],
})
export class HttpModule {}
