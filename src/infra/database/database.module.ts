import { DatabaseService } from './databse.service';
import { DatabaseClient } from './database.client';
import { EnvService } from '../env/env.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [DatabaseService, DatabaseClient, EnvService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
