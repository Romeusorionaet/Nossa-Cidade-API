import {
  BusinessPointProps,
  BusinessPoint,
} from '../../enterprise/entities/business-point';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointCategoriesInsertType } from 'src/infra/database/schemas';
import { GeometryPoint } from 'src/core/@types/geometry';
import { BusinessPointDetailsType } from 'src/core/@types/business-point-details-type';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPointProps): Promise<void>;
  abstract addDetails(
    businessPointDetails: BusinessPointDetailsType,
  ): Promise<void>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
  abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
  abstract findByQuery(query: string): Promise<BusinessPointForMappingType[]>;
  abstract findAllCategories(): Promise<BusinessPointCategoriesInsertType[]>;
  abstract findById(id: string): Promise<BusinessPointProps>;
}
