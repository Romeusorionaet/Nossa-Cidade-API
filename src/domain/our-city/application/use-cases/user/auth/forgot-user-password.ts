import type { AuthEmailServiceRepository } from "../../../repositories/services/email/auth-email-service.repository";
import { type Either, right } from "src/core/either";
import { Injectable } from "@nestjs/common";

interface ForgotUserPasswordUseCaseRequest {
	email: string;
}

type ForgotUserPasswordUseCaseResponse = Either<null, object>;

@Injectable()
export class ForgotUserPasswordUseCase {
	constructor(private authEmailServiceRepository: AuthEmailServiceRepository) {}

	async execute({
		email,
	}: ForgotUserPasswordUseCaseRequest): Promise<ForgotUserPasswordUseCaseResponse> {
		await this.authEmailServiceRepository.sendForgotPassword({
			email,
		});

		return right({});
	}
}
