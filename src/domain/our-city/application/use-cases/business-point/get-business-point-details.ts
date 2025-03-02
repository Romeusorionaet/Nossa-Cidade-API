import type { BusinessPointProps } from "src/domain/our-city/enterprise/entities/business-point";
import type { BusinessPointRepository } from "../../repositories/business-point.repository";
import { type Either, right } from "src/core/either";
import { Injectable } from "@nestjs/common";

interface GetBusinessPointDetailsUseCaseRequest {
	id: string;
}

type GetBusinessPointsForMappingUseCaseResponse = Either<
	null,
	{
		businessPoint: BusinessPointProps;
	}
>;

@Injectable()
export class GetBusinessPointDetailsUseCase {
	constructor(private businessPointRepository: BusinessPointRepository) {}

	async execute({
		id,
	}: GetBusinessPointDetailsUseCaseRequest): Promise<GetBusinessPointsForMappingUseCaseResponse> {
		const businessPoint = await this.businessPointRepository.findById(id);

		return right({ businessPoint });
	}
}
