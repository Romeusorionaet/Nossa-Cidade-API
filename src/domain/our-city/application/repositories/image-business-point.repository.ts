import { BusinessPointImageType } from 'src/core/@types/business-point-image-type';

export abstract class ImageBusinessPointRepository {
  abstract checkQuotaById(businessPointId: string): Promise<number>;
  abstract findImageUrlsById(
    businessPointId: string,
  ): Promise<BusinessPointImageType[] | null>;
}
