import { InvalidCredentialsError } from "../../errors/invalid-credentials-errors";
import type { AuthRepository } from "../../../repositories/auth.repository";
import { type Either, left, right } from "src/core/either";
import { Injectable } from "@nestjs/common";

interface ConfirmEmailUseCaseRequest {
	email: string;
}

type ConfirmEmailUseCaseResponse = Either<InvalidCredentialsError, object>;

@Injectable()
export class ConfirmEmailUseCase {
	constructor(private authRepository: AuthRepository) {}

	async execute({
		email,
	}: ConfirmEmailUseCaseRequest): Promise<ConfirmEmailUseCaseResponse> {
		const result = await this.authRepository.confirmEmail(email);

		if (!result) {
			return left(new InvalidCredentialsError());
		}

		return right({});
	}
}
