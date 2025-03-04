import { HashGeneratorRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-generator.repository';
import { HashComparerRepository } from 'src/domain/our-city/application/repositories/cryptography/hash-comparer.repository';
import { EncryptRepository } from 'src/domain/our-city/application/repositories/cryptography/encrypt.repository';
import { JwtEncrypt } from './jwt-encrypt.cryptography';
import { BcryptHash } from './bcrypt-hash.cryptography';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [JwtModule, EnvModule],
  providers: [
    { provide: EncryptRepository, useClass: JwtEncrypt },
    { provide: HashComparerRepository, useClass: BcryptHash },
    { provide: HashGeneratorRepository, useClass: BcryptHash },
  ],
  exports: [HashGeneratorRepository, HashComparerRepository],
})
export class CryptographyModule {}
