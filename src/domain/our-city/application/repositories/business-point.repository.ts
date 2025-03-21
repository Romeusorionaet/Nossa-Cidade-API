import {
  BusinessPointProps,
  BusinessPoint,
} from '../../enterprise/entities/business-point';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { BusinessPointImage } from '../../enterprise/entities/business-point-image';
import { SharedBusinessPointCategoriesType } from 'src/infra/database/schemas';
import { GeometryPoint } from 'src/core/@types/geometry';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPointProps): Promise<void>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
  abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
  abstract findByQuery(query: string): Promise<BusinessPointForMappingType[]>;
  abstract findAllCategories(): Promise<SharedBusinessPointCategoriesType[]>;
  abstract findById(id: string): Promise<BusinessPointProps>;
  abstract findBusinessPointsByUser(
    userId: string,
  ): Promise<BusinessPointPreviewType[]>;
  abstract saveImageUrls(
    businessPointImagesUrls: BusinessPointImage[],
  ): Promise<void>;
}
