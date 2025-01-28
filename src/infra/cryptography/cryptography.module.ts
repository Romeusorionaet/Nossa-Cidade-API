import { Module } from '@nestjs/common';
import { JwtEncrypt } from './jwt-encrypt';
import { BcryptHash } from './bcrypt-hash';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt-repository';
import { HashComparerRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-comparer-repository';
import { HashGeneratorRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-generator-repository';

@Module({
  providers: [
    { provide: EncryptRepository, useClass: JwtEncrypt },
    { provide: HashComparerRepository, useClass: BcryptHash },
    { provide: HashGeneratorRepository, useClass: BcryptHash },
  ],
  exports: [HashGeneratorRepository, HashComparerRepository],
})
export class CryptographyModule {}
