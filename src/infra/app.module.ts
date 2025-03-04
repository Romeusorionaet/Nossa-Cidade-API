import { HttpModule } from './http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class AppModule {}
