import { UploadThingMiddleware } from './http/middlewares/uploadthing.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadThingMiddleware).forRoutes('/api/uploadthing');
  }
}
