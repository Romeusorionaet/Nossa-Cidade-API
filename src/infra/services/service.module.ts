import { AuthEmailServiceRepository } from 'src/domain/our-city/application/repositories/services/email/auth-email-service.repository';
import { UploadServiceRepository } from 'src/domain/our-city/application/repositories/services/upload/upload-service.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { JwtEncrypt } from 'src/infra/cryptography/jwt-encrypt.cryptography';
import { UploadThingService } from './uploadthing/uploadthing-service';
import { AuthEmailService } from './email/auth-email-service';
import { EnvModule } from 'src/infra/env/env.module';
import { EmailService } from './email/email.service';
import { Module } from '@nestjs/common';

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
    {
      provide: UploadServiceRepository,
      useClass: UploadThingService,
    },
  ],
  exports: [
    AuthEmailServiceRepository,
    UploadServiceRepository,
    EncryptRepository,
    EmailService,
  ],
})
export class ServiceModule {}
