import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { UpdateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/update-business-point';
import { BusinessPointNotFoundError } from 'src/domain/our-city/application/use-cases/errors/business-point-not-found-error';
import { BusinessPointDraftNotFoundError } from 'src/domain/our-city/application/use-cases/errors/business-point-draft-not-found-error';

@Controller('/business-point/update/:id')
export class UpdateBusinessPointController {
  constructor(
    private readonly updateBusinessPointUseCase: UpdateBusinessPointUseCase,
  ) {}

  @Patch()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') businessPointId: string) {
    try {
      const result = await this.updateBusinessPointUseCase.execute({
        businessPointId,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case BusinessPointNotFoundError:
          case BusinessPointDraftNotFoundError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        message: 'Local atualizado.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
