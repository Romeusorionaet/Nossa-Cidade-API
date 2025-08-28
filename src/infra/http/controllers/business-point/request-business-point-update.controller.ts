import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import {
  updateBusinessPointSchemaValidationPipe,
  UpdateBusinessPointRequest,
} from '../../schemas/business-point-update.schema';
import { VerifyBusinessPointOwnershipUseCase } from 'src/domain/our-city/application/use-cases/business-point/verify-business-point-owner-ship';
import { BusinessPointUnderAnalysisError } from 'src/domain/our-city/application/use-cases/errors/business-point-under-analysis-error';
import { ValidateBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/validate-business-point';
import { BusinessPointNotFoundError } from 'src/domain/our-city/application/use-cases/errors/business-point-not-found-error';
import { RequestBusinessPointUpdateUseCase } from 'src/domain/our-city/application/use-cases/business-point/update-business-point';
import { CurrentUser } from '../../middlewares/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { GeometryPoint } from 'src/core/@types/geometry';

@Controller('/business-point/request-update/:id')
export class RequestBusinessPointUpdateController {
  constructor(
    private readonly verifyBusinessPointOwnershipUseCase: VerifyBusinessPointOwnershipUseCase,
    private readonly validateBusinessPointUseCase: ValidateBusinessPointUseCase,
    private readonly requestBusinessPointUpdateUseCase: RequestBusinessPointUpdateUseCase,
  ) {}

  @Put()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(updateBusinessPointSchemaValidationPipe)
    body: UpdateBusinessPointRequest,
    @CurrentUser() user: AccessTokenPayload,
    @Param('id') businessPointId: string,
  ) {
    try {
      const businessPoint = body;
      const { sub: userId } = user;

      const hasAtLeastOneField = Object.values(body).some(
        (value) => value !== undefined && value !== null,
      );

      if (!hasAtLeastOneField) {
        throw new BadRequestException(
          'Ao menos um campo deve ser fornecido para atualização.',
        );
      }

      const resultValidationOwnerShip =
        await this.verifyBusinessPointOwnershipUseCase.execute({
          businessPointId,
          userId,
        });

      if (resultValidationOwnerShip.isLeft()) {
        const err = resultValidationOwnerShip.value;
        throw new BadRequestException(err.message);
      }

      const lat = businessPoint?.location?.latitude;
      const lng = businessPoint?.location?.longitude;

      const location: GeometryPoint = {
        type: 'Point',
        coordinates: [lat, lng],
      };

      if (lat && lng) {
        const resultValidation =
          await this.validateBusinessPointUseCase.execute({
            location,
          });

        if (resultValidation.isLeft()) {
          const err = resultValidation.value;
          throw new BadRequestException(err.message);
        }
      }

      const result = await this.requestBusinessPointUpdateUseCase.execute({
        businessPointId,
        categoryId: businessPoint.categoryId,
        name: businessPoint?.name,
        neighborhood: businessPoint.address?.neighborhood,
        street: businessPoint.address?.street,
        houseNumber: businessPoint.address?.houseNumber,
        location: location.coordinates[0] ? location : undefined,
        openingHours: businessPoint?.openingHours,
        description: businessPoint?.description,
        highlight: businessPoint?.highlight,
        website: businessPoint?.website,
        censorship: businessPoint?.censorship,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case BusinessPointNotFoundError:
          case BusinessPointUnderAnalysisError:
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
