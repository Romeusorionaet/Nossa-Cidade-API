import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt-repository';
import { UsersRepository } from 'src/domain/our-city/application/repositories/users-repository';
import { StaffRepository } from 'src/domain/our-city/application/repositories/staff-repository';
import { DrizzleStaffRepository } from './repositories/drizzle-staff-repository';
import { DrizzleUserRepository } from './repositories/drizzle-user-repository';
import { JwtEncrypt } from '../cryptography/jwt-encrypt';
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
  ],
  exports: [
    DatabaseService,
    UsersRepository,
    StaffRepository,
    EncryptRepository,
  ],
})
export class DatabaseModule {}
