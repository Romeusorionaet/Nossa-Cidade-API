import { GetBusinessPointsForMappingUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-points-for-mapping';
import { GetBusinessPointCategoriesUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-categories';
import { GetBusinessPointDetailsUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-details';
import { RegisterBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/register-business-point';
import { ValidateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/validate-business-point';
import { GetBusinessPointsForMappingController } from './controllers/business-point/get-business-points-for-mapping.controller';
import { ResendConfirmationEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/resend-confirmation-email';
import { SearchBusinessPointsUseCase } from 'src/domain/our-city/application/use-cases/business-point/search-business-points';
import { GetBusinessPointCategoriesController } from './controllers/business-point/get-business-point-categories.controller';
import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { PromoteUserToMerchantUseCase } from 'src/domain/our-city/application/use-cases/staff/promote-user-to-merchant';
import { GetBusinessPointDetailsController } from './controllers/business-point/get-business-point-details.controller';
import { UpdateUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/update-user-password';
import { ForgotUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/forgot-user-password';
import { ResetUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/reset-user-password';
import { RegisterBusinessPointController } from './controllers/business-point/register-business-point.controller';
import { ResendConfirmationEmailController } from './controllers/user/auth/resend-confirmation-email.controller';
import { AuthenticateUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/authenticate-user';
import { SearchBusinessPointsController } from './controllers/business-point/search-business-points.controller';
import { AuthenticateWidthOAuthController } from './controllers/user/auth/authenticate-with-oauth.controller';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { ForgotUserPasswordController } from './controllers/user/auth/forgot-user-password.controller';
import { UpdateUserPasswordController } from './controllers/user/auth/update-user-password.controller';
import { ResetUserPasswordController } from './controllers/user/auth/reset-user-password.controller';
import { AuthenticateUserController } from './controllers/user/auth/authenticate-user.controller';
import { GetUserProfileController } from './controllers/user/get-user-profile.controller';
import { RegisterUserController } from './controllers/user/auth/register-user.controller';
import { ConfirmEmailController } from './controllers/user/auth/confirm-email.controller';
import { RefreshTokenController } from './controllers/user/auth/refresh-token.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
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
    GetBusinessPointsForMappingController,
    GetBusinessPointCategoriesController,
    GetBusinessPointDetailsController,
    ResendConfirmationEmailController,
    AuthenticateWidthOAuthController,
    RegisterBusinessPointController,
    SearchBusinessPointsController,
    UpdateUserPasswordController,
    ForgotUserPasswordController,
    ResetUserPasswordController,
    AuthenticateUserController,
    GetUserProfileController,
    RegisterUserController,
    ConfirmEmailController,
    RefreshTokenController,
  ],
  providers: [
    GetBusinessPointsForMappingUseCase,
    GetBusinessPointCategoriesUseCase,
    GetBusinessPointDetailsUseCase,
    ResendConfirmationEmailUseCase,
    RegisterUserWithOAuthUseCase,
    RegisterBusinessPointUseCase,
    ValidateBusinessPointUseCase,
    PromoteUserToMerchantUseCase,
    SearchBusinessPointsUseCase,
    UpdateUserPasswordUseCase,
    ForgotUserPasswordUseCase,
    ResetUserPasswordUseCase,
    AuthenticateUserUseCase,
    GetUserProfileUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase,
    ConfirmEmailUseCase,
    RefreshTokenUseCase,
  ],
})
export class HttpModule {}
