import { BusinessPointImage } from '../../enterprise/entities/business-point-image';

export abstract class ImageBusinessPointRepository {
  abstract checkQuotaById(businessPointId: string): Promise<number>;
  abstract findImageUrlsByBusinessPointId(
    businessPointId: string,
  ): Promise<BusinessPointImageType[]>;
  abstract existsByUrlId(urlId: string): Promise<boolean>;
  abstract deleteByUrlId(urlId: string): Promise<void>;
  abstract saveImageUrls(
    businessPointImagesUrls: BusinessPointImage[],
  ): Promise<void>;
}
