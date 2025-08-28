import { PaginationParams } from 'src/core/repositories/pagination-params';
import { BusinessPointDraft } from '../../enterprise/entities/business-point-draft';

export abstract class BusinessPointDraftRepository {
  abstract create(businessPointDraft: BusinessPointDraft): Promise<void>;
  abstract findByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointDraft | null>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(page: PaginationParams): Promise<BusinessPointDraft[]>;
}
