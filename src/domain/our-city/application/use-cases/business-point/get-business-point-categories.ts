import type { BusinessPointRepository } from "../../repositories/business-point.repository";
import type { BusinessPointCategoriesInsertType } from "src/infra/database/schemas";
import { type Either, right } from "src/core/either";
import { Injectable } from "@nestjs/common";

type GetBusinessPointCategoriesUseCaseResponse = Either<
	null,
	{
		businessPointCategories: BusinessPointCategoriesInsertType[];
	}
>;

@Injectable()
export class GetBusinessPointCategoriesUseCase {
	constructor(private businessPointRepository: BusinessPointRepository) {}

	async execute(): Promise<GetBusinessPointCategoriesUseCaseResponse> {
		const businessPointCategories =
			await this.businessPointRepository.findAllCategories();

		return right({ businessPointCategories });
	}
}
