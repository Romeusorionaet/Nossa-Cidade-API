import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { GeometryPoint } from './geometry';

export type RegisterBusinessPointType = {
  categoryId: string;
  ownerId: string;
  name: string;
  location: GeometryPoint;
  status: BusinessPointStatus;
  openingHours: string;
  censorship: boolean;
};
