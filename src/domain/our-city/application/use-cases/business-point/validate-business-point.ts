import { BusinessPointAlreadyExistsError } from "../errors/business-point-already-exists-error";
import type { BusinessPointRepository } from "../../repositories/business-point.repository";
import type { GeometryPoint } from "src/core/@types/geometry";
import { type Either, left, right } from "src/core/either";
import { Injectable } from "@nestjs/common";

interface ValidateBusinessPointUseCaseRequest {
	location: GeometryPoint;
}

type ValidateBusinessPointUseCaseResponse = Either<
	BusinessPointAlreadyExistsError,
	object
>;

@Injectable()
export class ValidateBusinessPointUseCase {
	constructor(private businessPointRepository: BusinessPointRepository) {}

	async execute({
		location,
	}: ValidateBusinessPointUseCaseRequest): Promise<ValidateBusinessPointUseCaseResponse> {
		const existBusinessPoint =
			await this.businessPointRepository.findByCoordinate(location);

		if (existBusinessPoint) {
			return left(new BusinessPointAlreadyExistsError());
		}

		return right({});
	}
}
