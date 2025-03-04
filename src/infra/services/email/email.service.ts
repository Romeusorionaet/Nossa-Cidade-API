import { EnvService } from 'src/infra/env/env.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private envService: EnvService) {}

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: this.envService.get('NODE_MAILER_EMAIL'),
        pass: this.envService.get('NODE_MAILER_PASS'),
      },
    });

    const mailOptions = {
      from: this.envService.get('NODE_MAILER_EMAIL'),
      to,
      subject,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);

      return true;
    } catch (err) {
      console.error('Erro ao enviar o email:', err);

      throw new Error(
        'Falha ao enviar e-mail. Por favor, tente novamente mais tarde.',
      );
    }
  }
}
