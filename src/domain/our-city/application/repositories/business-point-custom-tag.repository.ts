export abstract class BusinessPointCustomTagRepository {
  abstract create({
    customTags,
    businessPointId,
  }: BusinessPointCustomTagType): Promise<void>;
}
