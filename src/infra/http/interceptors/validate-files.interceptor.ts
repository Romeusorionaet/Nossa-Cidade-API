import {
  BadRequestException,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class ValidateFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (!request.files || request.files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    return next.handle();
  }
}
