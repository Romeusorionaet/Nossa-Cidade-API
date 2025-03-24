import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';
import { DeleteBusinessPointImageUseCase } from 'src/domain/our-city/application/use-cases/business-point/delete-business-point-image';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';

@Controller('/business-point/delete-image/:id')
export class DeleteBusinessPointImageController {
  constructor(
    private readonly deleteBusinessPointImageUseCase: DeleteBusinessPointImageUseCase,
  ) {}

  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    try {
      await this.deleteBusinessPointImageUseCase.execute({
        urlId: id,
      });

      return { message: 'A imagem foi deletado.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
