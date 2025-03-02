import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import type { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { UserProfilePresenter } from '../../presenters/user-profile.presenter';
import type { AccessTokenPayload } from 'src/core/@types/access-token-payload';

@Controller('/user/profile')
export class GetUserProfileController {
  constructor(private getUserProfiler: GetUserProfileUseCase) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@CurrentUser() user: AccessTokenPayload) {
    try {
      const { sub: id } = user;

      const result = await this.getUserProfiler.execute({
        userId: id,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case ResourceNotFoundError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        userProfile: UserProfilePresenter.toHTTP(result.value.userProfile),
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
