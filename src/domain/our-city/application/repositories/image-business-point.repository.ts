export abstract class ImageBusinessPointRepository {
  abstract checkQuotaById(businessPointId: string): Promise<number>;
}
