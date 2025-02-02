import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { UsersRepository } from 'src/domain/our-city/application/repositories/users.repository';
import { StaffRepository } from 'src/domain/our-city/application/repositories/staff.repository';
import { AuthRepository } from 'src/domain/our-city/application/repositories/auth.repository';
import { DrizzleStaffRepository } from './repositories/drizzle-staff.repository';
import { DrizzleUserRepository } from './repositories/drizzle-user.repository';
import { DrizzleAuthRepository } from './repositories/drizzle-auth.repository';
import { JwtEncrypt } from '../cryptography/jwt-encrypt.cryptography';
import { DatabaseService } from './database.service';
import { DatabaseClient } from './database.client';
import { EnvService } from '../env/env.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    DatabaseService,
    DatabaseClient,
    EnvService,
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
  ],
  exports: [
    EncryptRepository,
    DatabaseService,
    UsersRepository,
    StaffRepository,
    AuthRepository,
  ],
})
export class DatabaseModule {}
