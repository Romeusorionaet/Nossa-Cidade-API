import { HashGeneratorRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-generator.repository';
import { HashComparerRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-comparer.repository';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHash
  implements HashGeneratorRepository, HashComparerRepository
{
  private HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
