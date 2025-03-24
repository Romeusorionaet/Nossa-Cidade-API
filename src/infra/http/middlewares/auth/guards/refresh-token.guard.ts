import { TokenPurposeEnum } from 'src/domain/our-city/application/shared/enums/token-purpose.enum';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  TokenPurposeEnum.REFRESH_TOKEN,
) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.purpose !== TokenPurposeEnum.REFRESH_TOKEN) {
      throw new BadRequestException('Invalid token purpose');
    }

    return super.canActivate(context);
  }
}
