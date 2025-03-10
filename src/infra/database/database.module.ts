import { BusinessPointCustomTagRepository } from 'src/domain/our-city/application/repositories/business-point-custom-tag.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { BusinessPointRepository } from 'src/domain/our-city/application/repositories/business-point.repository';
import { DrizzleBusinessPointCustomTagRepository } from './repositories/drizzle-business-point-custom-tag';
import { SharedItemRepository } from 'src/domain/our-city/application/repositories/shared-item.repository';
import { DrizzleBusinessPointRepository } from './repositories/drizzle-business-point.repository';
import { UsersRepository } from 'src/domain/our-city/application/repositories/users.repository';
import { StaffRepository } from 'src/domain/our-city/application/repositories/staff.repository';
import { AuthRepository } from 'src/domain/our-city/application/repositories/auth.repository';
import { DrizzleSharedItemRepository } from './repositories/drizzle-shared-item.repository';
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
      provide: SharedItemRepository,
      useClass: DrizzleSharedItemRepository,
    },
  ],
  exports: [
    BusinessPointCustomTagRepository,
    BusinessPointRepository,
    SharedItemRepository,
    EncryptRepository,
    DatabaseClient,
    DatabaseService,
    UsersRepository,
    StaffRepository,
    AuthRepository,
  ],
})
export class DatabaseModule {}
