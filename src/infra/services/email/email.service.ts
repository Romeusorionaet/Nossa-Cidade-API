import { EnvService } from 'src/infra/env/env.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  constructor(private envService: EnvService) {}

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'email',
      port: 587,
      secure: false,
      auth: {
        user: this.envService.get('NODE_MAILER_EMAIL'),
        pass: this.envService.get('NODE_MAILER_PASS'),
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: this.envService.get('NODE_MAILER_EMAIL'),
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }
}
