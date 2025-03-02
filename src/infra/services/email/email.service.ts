import type { EnvService } from "src/infra/env/env.service";
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
	constructor(private envService: EnvService) {}

	async sendEmail(to: string, subject: string, html: string): Promise<void> {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			port: 587,
			auth: {
				user: this.envService.get("NODE_MAILER_EMAIL"),
				pass: this.envService.get("NODE_MAILER_PASS"),
			},
		});

		const mailOptions = {
			from: this.envService.get("NODE_MAILER_EMAIL"),
			to,
			subject,
			html,
		};

		await transporter.sendMail(mailOptions);
	}
}
