import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ToggleBusinessPointActiveUseCase } from 'src/domain/our-city/application/use-cases/business-point/toggle-business-point-active';
import { BusinessPointNotFoundError } from 'src/domain/our-city/application/use-cases/errors/business-point-not-found-error';
import { BusinessPointStatusCoolDownError } from 'src/domain/our-city/application/use-cases/errors/business-point-status-cool-down-error';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/toggle-business-point/active/:id')
export class ToggleBusinessPointActiveController {
  constructor(
    private readonly toggleBusinessPointActiveUseCase: ToggleBusinessPointActiveUseCase,
  ) {}

  @Patch()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') businessPointId: string) {
    try {
      const result = await this.toggleBusinessPointActiveUseCase.execute({
        businessPointId,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case BusinessPointNotFoundError:
          case BusinessPointStatusCoolDownError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return { message: 'Alteração realizada' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
