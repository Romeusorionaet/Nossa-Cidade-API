import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from 'src/domain/authentication/token-schema';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserPayload;
  },
);
