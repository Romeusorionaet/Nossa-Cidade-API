import { BusinessPointPreviewType } from 'src/core/@types/business-point-preview-type';
import { BusinessPointStatus } from 'src/domain/our-city/enterprise/entities/enums/business-point-status';
import { businessPoints } from '../schemas';
import { InferSelectModel } from 'drizzle-orm';

type BusinessPointSelect = InferSelectModel<typeof businessPoints>;
type BusinessPointWithDraftFlag = BusinessPointSelect & {
  hasPendingDraft: Boolean;
};

export class DrizzleBusinessPointPreviewMapper {
  static toDomain(raw: BusinessPointWithDraftFlag): BusinessPointPreviewType {
    const status: BusinessPointStatus = raw.status as BusinessPointStatus;

    return {
      id: raw.id,
      name: raw.name,
      status,
      awaitingApproval: raw.awaitingApproval || null,
      hasPendingDraft: raw.hasPendingDraft,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    };
  }
}
