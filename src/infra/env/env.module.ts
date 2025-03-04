import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { Module } from '@nestjs/common';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
