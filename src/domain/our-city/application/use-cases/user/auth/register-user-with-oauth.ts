import type { UsersRepository } from "../../../repositories/users.repository";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { User } from "src/domain/our-city/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

interface RegisterUserWithOAuthUseCaseRequest {
	email: string;
	username: string;
	avatar: string;
}

type RegisterUserWithOAuthUseCaseResponse = {
	user: User;
};

@Injectable()
export class RegisterUserWithOAuthUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		username,
		avatar,
	}: RegisterUserWithOAuthUseCaseRequest): Promise<RegisterUserWithOAuthUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			const randomPassword = Math.random();

			const user = User.create({
				email,
				username,
				passwordHash: await hash(randomPassword.toString(), 8),
				avatar,
				emailVerified: true,
				publicId: new UniqueEntityID(),
			});

			await this.usersRepository.create(user);

			return { user };
		}

		return { user };
	}
}
