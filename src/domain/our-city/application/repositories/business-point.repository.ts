import {
  BusinessPointProps,
  BusinessPoint,
} from '../../enterprise/entities/business-point';
import { GeometryPoint } from 'src/core/@types/geometry';

export abstract class BusinessPointRepository {
  abstract create(businessPoint: BusinessPointProps): Promise<void>;
  abstract findByCoordinate(
    location: GeometryPoint,
  ): Promise<BusinessPoint | null>;
}
