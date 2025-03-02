import type {
	BusinessPointProps,
	BusinessPoint,
} from "../../enterprise/entities/business-point";
import type { BusinessPointForMappingType } from "src/core/@types/business-point-for-mapping-type";
import type { BusinessPointCategoriesInsertType } from "src/infra/database/schemas";
import type { GeometryPoint } from "src/core/@types/geometry";

export abstract class BusinessPointRepository {
	abstract create(businessPoint: BusinessPointProps): Promise<void>;
	abstract findByCoordinate(
		location: GeometryPoint,
	): Promise<BusinessPoint | null>;
	abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
	abstract findByQuery(query: string): Promise<BusinessPointForMappingType[]>;
	abstract findAllCategories(): Promise<BusinessPointCategoriesInsertType[]>;
	abstract findById(id: string): Promise<BusinessPointProps>;
}
