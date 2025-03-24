import { BusinessPointImageType } from 'src/core/@types/business-point-image-type';

export abstract class ImageBusinessPointRepository {
  abstract checkQuotaById(businessPointId: string): Promise<number>;
  abstract findImageUrlsByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointImageType[]>;
  abstract existsByUrlId(urlId: string): Promise<boolean>;
  abstract deleteByUrlId(urlId: string): Promise<void>;
}
