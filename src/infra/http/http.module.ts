import { GetSharedItemsAssociatedBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-shared-items-associated-business-point';
import { UpdateSharedItemsBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/shared-items/update-shared-items-business-point';
import { SharedItemsAssociatedBusinessPointController } from './controllers/shared-items/get-shared-items-associated-business-point.controller';
import { VerifyBusinessPointOwnershipUseCase } from 'src/domain/our-city/application/use-cases/business-point/verify-business-point-owner-ship';
import { GetBusinessPointsForMappingUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-points-for-mapping';
import { GetBusinessPointPreviewUserUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-preview-user';
import { GetBusinessPointCategoriesUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-categories';
import { DeleteBusinessPointImageUseCase } from 'src/domain/our-city/application/use-cases/business-point/delete-business-point-image';
import { GetBusinessPointOverviewUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-overview';
import { SaveImagesBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/save-images-business-point';
import { UpdateSharedItemsBusinessPointController } from './controllers/shared-items/update-shared-items-business-point.controller';
import { GetBusinessPointImagesUseCase } from 'src/domain/our-city/application/use-cases/business-point/get-business-point-images';
import { RegisterProductWithImagesUseCase } from 'src/domain/our-city/application/use-cases/product/register-product-with-images';
import { GetBusinessPointPreviewUserController } from './controllers/business-point/get-business-points-preview-user.controller';
import { RegisterBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/register-business-point';
import { ValidateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/validate-business-point';
import { GetBusinessPointsForMappingController } from './controllers/business-point/get-business-points-for-mapping.controller';
import { ResendConfirmationEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/resend-confirmation-email';
import { SearchBusinessPointsUseCase } from 'src/domain/our-city/application/use-cases/business-point/search-business-points';
import { CheckBusinessPointImageQuotaUseCase } from 'src/domain/our-city/application/use-cases/upload/check-user-image-quota';
import { GetBusinessPointCategoriesController } from './controllers/business-point/get-business-point-categories.controller';
import { RegisterUserWithOAuthUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user-with-oauth';
import { UpdateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/update-business-point';
import { CheckProductImageQuotaUseCase } from 'src/domain/our-city/application/use-cases/product/check-product-image-quota';
import { GetBusinessPointOverviewController } from './controllers/business-point/get-business-point-overview.controller';
import { DeleteBusinessPointImageController } from './controllers/business-point/delete-business-point-image.controller';
import { PromoteUserToMerchantUseCase } from 'src/domain/our-city/application/use-cases/staff/promote-user-to-merchant';
import { UploadImageToBusinessPointController } from './controllers/uploads/upload-image-to-business-point.controller';
import { UpdateUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/update-user-password';
import { ForgotUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/forgot-user-password';
import { GetBusinessPointImagesController } from './controllers/business-point/get-business-point-images.controller';
import { RegisterProductWithImagesController } from './controllers/product/register-product-with-images.controller';
import { ResetUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/reset-user-password';
import { DeleteProductImageUseCase } from 'src/domain/our-city/application/use-cases/product/delete-product-image';
import { RegisterBusinessPointController } from './controllers/business-point/register-business-point.controller';
import { ResendConfirmationEmailController } from './controllers/user/auth/resend-confirmation-email.controller';
import { SaveImagesProductUseCase } from 'src/domain/our-city/application/use-cases/product/save-images-product';
import { AuthenticateUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/authenticate-user';
import { SearchBusinessPointsController } from './controllers/business-point/search-business-points.controller';
import { GetSharedItemsUseCase } from 'src/domain/our-city/application/use-cases/shared-items/get-shared-items';
import { AuthenticateWidthOAuthController } from './controllers/user/auth/authenticate-with-oauth.controller';
import { UpdateBusinessPointController } from './controllers/business-point/update-business-point.controller';
import { RegisterProductUseCase } from 'src/domain/our-city/application/use-cases/product/register-product';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { RefreshTokenUseCase } from 'src/domain/our-city/application/use-cases/user/auth/refresh-token';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { ConfirmEmailUseCase } from 'src/domain/our-city/application/use-cases/user/auth/confirm-email';
import { WakeUpDatabaseUseCase } from 'src/domain/our-city/application/use-cases/user/wake-up-database';
import { DeleteProductUseCase } from 'src/domain/our-city/application/use-cases/product/delete-product';
import { ForgotUserPasswordController } from './controllers/user/auth/forgot-user-password.controller';
import { UpdateUserPasswordController } from './controllers/user/auth/update-user-password.controller';
import { ResetUserPasswordController } from './controllers/user/auth/reset-user-password.controller';
import { DeleteProductImageController } from './controllers/product/delete-product-image.controller';
import { GetProductsUseCase } from 'src/domain/our-city/application/use-cases/product/get-products';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';
import { AuthenticateUserController } from './controllers/user/auth/authenticate-user.controller';
import { SharedItemsController } from './controllers/shared-items/get-shared-items.controller';
import { GetUserProfileController } from './controllers/user/get-user-profile.controller';
import { RegisterUserController } from './controllers/user/auth/register-user.controller';
import { ConfirmEmailController } from './controllers/user/auth/confirm-email.controller';
import { RefreshTokenController } from './controllers/user/auth/refresh-token.controller';
import { DeleteProductController } from './controllers/product/delete-product.controller';
import { GetProductsController } from './controllers/product/get-products.controller';
import { WakeUpApiController } from './controllers/wake-up-api.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { ServiceModule } from '../services/service.module';
import { EnvModule } from '../env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CryptographyModule,
    DatabaseModule,
    ServiceModule,
    AuthModule,
    EnvModule,
  ],
  controllers: [
    SharedItemsAssociatedBusinessPointController,
    UpdateSharedItemsBusinessPointController,
    GetBusinessPointsForMappingController,
    GetBusinessPointPreviewUserController,
    GetBusinessPointCategoriesController,
    UploadImageToBusinessPointController,
    RegisterProductWithImagesController,
    GetBusinessPointOverviewController,
    DeleteBusinessPointImageController,
    ResendConfirmationEmailController,
    AuthenticateWidthOAuthController,
    GetBusinessPointImagesController,
    RegisterBusinessPointController,
    SearchBusinessPointsController,
    UpdateBusinessPointController,
    UpdateUserPasswordController,
    ForgotUserPasswordController,
    DeleteProductImageController,
    ResetUserPasswordController,
    AuthenticateUserController,
    GetUserProfileController,
    DeleteProductController,
    RegisterUserController,
    ConfirmEmailController,
    RefreshTokenController,
    SharedItemsController,
    GetProductsController,
    WakeUpApiController,
  ],
  providers: [
    GetSharedItemsAssociatedBusinessPointUseCase,
    UpdateSharedItemsBusinessPointUseCase,
    SaveImagesBusinessPointUseCase,
    CheckBusinessPointImageQuotaUseCase,
    VerifyBusinessPointOwnershipUseCase,
    GetBusinessPointsForMappingUseCase,
    GetBusinessPointPreviewUserUseCase,
    GetBusinessPointCategoriesUseCase,
    RegisterProductWithImagesUseCase,
    GetBusinessPointOverviewUseCase,
    DeleteBusinessPointImageUseCase,
    ResendConfirmationEmailUseCase,
    CheckProductImageQuotaUseCase,
    GetBusinessPointImagesUseCase,
    RegisterUserWithOAuthUseCase,
    RegisterBusinessPointUseCase,
    ValidateBusinessPointUseCase,
    PromoteUserToMerchantUseCase,
    SearchBusinessPointsUseCase,
    UpdateBusinessPointUseCase,
    UpdateUserPasswordUseCase,
    ForgotUserPasswordUseCase,
    DeleteProductImageUseCase,
    SaveImagesProductUseCase,
    ResetUserPasswordUseCase,
    AuthenticateUserUseCase,
    RegisterProductUseCase,
    GetUserProfileUseCase,
    GetSharedItemsUseCase,
    WakeUpDatabaseUseCase,
    DeleteProductUseCase,
    RefreshTokenUseCase,
    RegisterUserUseCase,
    ConfirmEmailUseCase,
    RefreshTokenUseCase,
    GetProductsUseCase,
    UploadImageUseCase,
  ],
})
export class HttpModule {}
