import { BusinessPoint } from '../../enterprise/entities/business-point';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { SharedBusinessPointCategoriesSelectModelType } from 'src/infra/database/schemas';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPoint): Promise<void>;
  abstract update(businessPoint: BusinessPoint): Promise<void>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
  abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
  abstract findByQuery(query: string): Promise<BusinessPointForMappingType[]>;
  abstract findAllCategories(): Promise<
    SharedBusinessPointCategoriesSelectModelType[]
  >;
  abstract findById(id: string): Promise<BusinessPoint | null>;
  abstract findBusinessPointsByUser(
    userId: string,
  ): Promise<BusinessPointPreviewType[]>;
  abstract toggleActive(businessPoint: BusinessPoint): Promise<void>;
}
