import { GetUserProfileUseCase } from 'src/domain/our-city/application/use-cases/user/get-user-profile';
import { CurrentUser } from 'src/infra/http/middlewares/auth/current-user-decorator';
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error';
import { BadRequestException, Controller, HttpCode, Get } from '@nestjs/common';
import { UserProfilePresenter } from '../../presenters/user-profile-presenter';
import { UserPayload } from 'src/domain/authentication/token-schema';

@Controller('/auth/profile')
export class GetUserProfileController {
  constructor(private getUserProfiler: GetUserProfileUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload) {
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

      return UserProfilePresenter.toHTTP(result.value.userProfile);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
