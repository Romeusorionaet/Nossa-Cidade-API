import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { Module } from '@nestjs/common';
import { envSchema } from './env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}
