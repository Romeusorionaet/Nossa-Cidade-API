import { AuthEmailServiceRepository } from 'src/domain/our-city/application/repositories/services/email/auth-email-service.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { JwtEncrypt } from 'src/infra/cryptography/jwt-encrypt.cryptography';
import { AuthEmailService } from './auth-email-service';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { EnvModule } from 'src/infra/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    EmailService,
    {
      provide: AuthEmailServiceRepository,
      useClass: AuthEmailService,
    },
    {
      provide: EncryptRepository,
      useClass: JwtEncrypt,
    },
  ],
  exports: [AuthEmailServiceRepository, EncryptRepository, EmailService],
})
export class EmailModule {}
