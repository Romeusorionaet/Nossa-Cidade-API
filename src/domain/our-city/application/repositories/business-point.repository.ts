import {
  BusinessPointProps,
  BusinessPoint,
} from '../../enterprise/entities/business-point';
import { BusinessPointForMappingType } from 'src/core/@types/business-point-for-mapping-type';
import { GeometryPoint } from 'src/core/@types/geometry';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPointProps): Promise<void>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
  abstract findAllForMapping(): Promise<BusinessPointForMappingType[]>;
}
