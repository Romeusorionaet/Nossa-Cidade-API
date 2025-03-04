import { AuthEmailServiceRepository } from 'src/domain/our-city/application/repositories/services/email/auth-email-service.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { TokenPurposeEnum } from 'src/domain/our-city/application/shared/enums/token-purpose.enum';
import { EnvService } from 'src/infra/env/env.service';
import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEmailService implements AuthEmailServiceRepository {
  constructor(
    private emailService: EmailService,
    private envService: EnvService,
    private encrypt: EncryptRepository,
  ) {}

  async sendValidationEmail({ email }: { email: string }): Promise<void> {
    const token = await this.encrypt.encryptValidationEmailToken({
      email,
      purpose: TokenPurposeEnum.CONFIRMATION_TOKEN,
    });

    const linkUrl = `${this.envService.get('CONFIRM_EMAIL_NOSSA_CIDADE_HOST')}?token=${token}`;
    const html = `<p>Clique no link a seguir para verificar seu email:</p><a href="${linkUrl}">Verificar Email.</a>`;

    await this.emailService.sendEmail(email, 'Verificação de Email.', html);
  }

  async sendForgotPassword({ email }: { email: string }): Promise<void> {
    const token = await this.encrypt.encryptForgotPasswordToken({
      email,
      purpose: TokenPurposeEnum.FORGOT_PASSWORD_TOKEN,
    });

    const linkUrl = `${this.envService.get('FORGOT_PASSWORD_NOSSA_CIDADE_HOST')}?token=${token}`;
    const html = `<p>Clique no link a seguir para trocar sua senha:</p><a href="${linkUrl}">Trocar senha.</a>`;

    await this.emailService.sendEmail(email, 'Recuperação de senha.', html);
  }
}
