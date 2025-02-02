import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { EnvService } from 'src/infra/env/env.service';
import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationEmail {
  constructor(
    private emailService: EmailService,
    private envService: EnvService,
    private encrypt: EncryptRepository,
  ) {}

  async sendValidationEmail({ email }: { email: string }): Promise<void> {
    const token = await this.encrypt.encryptValidationEmailToken({ email });

    const validationLinkUrl = `${this.envService.get('CONFIRM_EMAIL_NOSSA_CIDADE_HOST')}?token=${token}`;
    const html = `<p>Clique no link a seguir para verificar seu email:</p><a href="${validationLinkUrl}">Verificar Email</a>`;

    await this.emailService.sendEmail(email, 'Verificação de Email', html);
  }
}
