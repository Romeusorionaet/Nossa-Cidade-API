import { AuthEmailServiceRepository } from "src/domain/our-city/application/repositories/services/email/auth-email-service.repository";
import { EncryptRepository } from "src/domain/our-city/application/repositories/cryptography/encrypt.repository";
import { JwtEncrypt } from "src/infra/cryptography/jwt-encrypt.cryptography";
import { AuthEmailService } from "./auth-email-service";
import { EnvService } from "src/infra/env/env.service";
import { EmailService } from "./email.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [
		EmailService,
		EnvService,
		{
			provide: AuthEmailServiceRepository,
			useClass: AuthEmailService,
		},
		{
			provide: EncryptRepository,
			useClass: JwtEncrypt,
		},
	],
	exports: [
		AuthEmailServiceRepository,
		EncryptRepository,
		EmailService,
		EnvService,
	],
})
export class EmailModule {}
