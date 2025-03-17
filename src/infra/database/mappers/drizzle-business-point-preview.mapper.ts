import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { BusinessPointInsertType } from '../schemas';

export class DrizzleBusinessPointPreviewMapper {
  static toDomain(raw: BusinessPointInsertType): BusinessPointPreviewType {
    const status: BusinessPointStatus = raw.status as BusinessPointStatus;

    return {
      id: raw.id,
      name: raw.name,
      status,
      awaitingApproval: raw.awaitingApproval || null,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    };
  }
}
