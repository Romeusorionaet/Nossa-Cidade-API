import { BusinessPointCustomTagRepository } from 'src/domain/our-city/application/repositories/business-point-custom-tag.repository';
import { ImageBusinessPointRepository } from 'src/domain/our-city/application/repositories/image-business-point.repository';
import { BusinessPointDraftRepository } from 'src/domain/our-city/application/repositories/business-point-draft.repository';
import { SharedAssociationRepository } from 'src/domain/our-city/application/repositories/shared-association.repository';
import { ProductCustomTagRepository } from 'src/domain/our-city/application/repositories/product-custom-tag.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { ImageProductRepository } from 'src/domain/our-city/application/repositories/image-product.repository';
import { DrizzleImageBusinessPointRepository } from './repositories/drizzle-image-business-point.repository';
import { DrizzleBusinessPointDraftRepository } from './repositories/drizzle-business-point-draft.repository';
import { DrizzleBusinessPointCustomTagRepository } from './repositories/drizzle-business-point-custom-tag';
import { DrizzleSharedAssociationRepository } from './repositories/drizzle-shared-association.repository';
import { DrizzleProductCustomTagRepository } from './repositories/drizzle-product-custom-tag.repository';
import { ProductRepository } from 'src/domain/our-city/application/repositories/product.repository';
import { DrizzleBusinessPointRepository } from './repositories/drizzle-business-point.repository';
import { UsersRepository } from 'src/domain/our-city/application/repositories/users.repository';
import { StaffRepository } from 'src/domain/our-city/application/repositories/staff.repository';
import { DrizzleImageProductRepository } from './repositories/drizzle-image-product.repository';
import { AuthRepository } from 'src/domain/our-city/application/repositories/auth.repository';
import { DrizzleProductRepository } from './repositories/drizzle-product.repository';
import { DrizzleStaffRepository } from './repositories/drizzle-staff.repository';
import { DrizzleUserRepository } from './repositories/drizzle-user.repository';
import { DrizzleAuthRepository } from './repositories/drizzle-auth.repository';
import { JwtEncrypt } from '../cryptography/jwt-encrypt.cryptography';
import { DatabaseService } from './database.service';
import { DatabaseClient } from './database.client';
import { EnvModule } from '../env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EnvModule],
  providers: [
    DatabaseClient,
    DatabaseService,
    {
      provide: UsersRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: StaffRepository,
      useClass: DrizzleStaffRepository,
    },
    {
      provide: EncryptRepository,
      useClass: JwtEncrypt,
    },
    {
      provide: AuthRepository,
      useClass: DrizzleAuthRepository,
    },
    {
      provide: BusinessPointRepository,
      useClass: DrizzleBusinessPointRepository,
    },
    {
      provide: BusinessPointCustomTagRepository,
      useClass: DrizzleBusinessPointCustomTagRepository,
    },
    {
      provide: SharedAssociationRepository,
      useClass: DrizzleSharedAssociationRepository,
    },
    {
      provide: ImageBusinessPointRepository,
      useClass: DrizzleImageBusinessPointRepository,
    },
    {
      provide: BusinessPointDraftRepository,
      useClass: DrizzleBusinessPointDraftRepository,
    },
    {
      provide: ProductRepository,
      useClass: DrizzleProductRepository,
    },
    {
      provide: ProductCustomTagRepository,
      useClass: DrizzleProductCustomTagRepository,
    },
    {
      provide: ImageProductRepository,
      useClass: DrizzleImageProductRepository,
    },
  ],
  exports: [
    BusinessPointCustomTagRepository,
    ImageBusinessPointRepository,
    BusinessPointDraftRepository,
    SharedAssociationRepository,
    ProductCustomTagRepository,
    BusinessPointRepository,
    ImageProductRepository,
    EncryptRepository,
    ProductRepository,
    DatabaseClient,
    DatabaseService,
    UsersRepository,
    StaffRepository,
    AuthRepository,
  ],
})
export class DatabaseModule {}
