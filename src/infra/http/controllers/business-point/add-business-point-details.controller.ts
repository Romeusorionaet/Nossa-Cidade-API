import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Post,
} from '@nestjs/common';
import { AddBusinessPointDetailsUseCase } from 'src/domain/our-city/application/use-cases/business-point/add-business-point-details';
import {
  businessPointDetailsSchemaValidationPipe,
  businessPointDetailsRequest,
} from '../../schemas/business-point-details.schema';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/business-point/add-details')
export class AddBusinessPointDetailsController {
  constructor(
    private addBusinessPointDetailsUseCase: AddBusinessPointDetailsUseCase,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(businessPointDetailsSchemaValidationPipe)
    body: businessPointDetailsRequest,
  ) {
    try {
      const businessPointDetails = body;

      await this.addBusinessPointDetailsUseCase.execute({
        businessPointId: businessPointDetails.businessPointId,
        payments: businessPointDetails.payments ?? [],
        pets: businessPointDetails.pets ?? [],
        planning: businessPointDetails.planning ?? [],
        accessibility: businessPointDetails.accessibility ?? [],
        parking: businessPointDetails.parking ?? [],
        audience: businessPointDetails.audience ?? [],
        amenities: businessPointDetails.amenities ?? [],
        menu: businessPointDetails.menu ?? [],
        serviceOptions: businessPointDetails.serviceOptions ?? [],
        environments: businessPointDetails.environments ?? [],
      });

      return { message: 'Detalhes registrado.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
