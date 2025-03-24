import { BusinessPointImageType } from 'src/core/@types/business-point-image-type';

export abstract class ImageBusinessPointRepository {
  abstract checkQuotaById(businessPointId: string): Promise<number>;
  abstract findImageUrlsByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointImageType[] | null>;
  abstract deleteByUrlId(urlId: string): Promise<void>;
}
