import {
  BusinessPointProps,
  BusinessPoint,
} from '../../enterprise/entities/business-point';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { GetBusinessPointDetailsType } from 'src/core/@types/get-business-point-details-type';
import { BusinessPointDetailsType } from 'src/core/@types/business-point-details-type';
import { BusinessPointCategoriesInsertType } from 'src/infra/database/schemas';
import { GeometryPoint } from 'src/core/@types/geometry';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPointProps): Promise<void>;
  abstract addDetails(
    businessPointDetails: BusinessPointDetailsType,
  ): Promise<void>;
  abstract findDetailsById(id: string): Promise<GetBusinessPointDetailsType>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
  abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
  abstract findByQuery(query: string): Promise<BusinessPointForMappingType[]>;
  abstract findAllCategories(): Promise<BusinessPointCategoriesInsertType[]>;
  abstract findById(id: string): Promise<BusinessPointProps>;
  abstract findBusinessPointsByUser(
    userId: string,
  ): Promise<BusinessPointPreviewType[]>;
}
