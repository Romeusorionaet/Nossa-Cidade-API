import { DatabaseModule } from '../database/database.module';
import { Profile } from './controllers/auth/profile';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [Profile],
  providers: [],
})
export class HttpModule {}
