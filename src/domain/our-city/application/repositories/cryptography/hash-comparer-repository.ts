export abstract class HashComparerRepository {
  abstract compare(plain: string, hash: string): Promise<boolean>;
}
