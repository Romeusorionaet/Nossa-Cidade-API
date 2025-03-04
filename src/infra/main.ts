import type { ConfigService } from '@nestjs/config';
import { EnvService } from './env/env.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { Env } from './env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get<ConfigService<Env, true>>(EnvService);
  const port = envService.get('PORT') || 4000;

  app.enableCors({
    origin: 'http://localhost:3000',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
