import { EnvService } from 'src/infra/env/env.service';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EnvService, EmailService],
  exports: [EnvService, EmailService],
})
export class EmailModule {}
