import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { UserProfilePresenter } from '../../presenters/user-profile.presenter';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';

@Controller('/user/profile')
export class GetUserProfileController {
  constructor(private readonly getUserProfiler: GetUserProfileUseCase) {}

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
        throw new BadRequestException(result.value.message);
      }

      return {
        userProfile: UserProfilePresenter.toHTTP(result.value.userProfile),
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
