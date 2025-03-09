import { BusinessPointCustomTagType } from 'src/core/@types/business-point-custom-tag-type';

export abstract class BusinessPointCustomTagRepository {
  abstract create({
    customTags,
    businessPointId,
  }: BusinessPointCustomTagType): Promise<void>;
}
