export abstract class HashGeneratorRepository {
  abstract hash(plain: string): Promise<string>;
}
