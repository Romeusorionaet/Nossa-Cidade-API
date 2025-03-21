import {
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  Controller,
  UseGuards,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { SaveImagesBusinessPointImageUseCase } from 'src/domain/our-city/application/use-cases/business-point/save-images-business-point';
import { UploadImageError } from 'src/domain/our-city/application/use-cases/errors/upload-image-error';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerConfig } from '../../config/multer.config';

@Controller('/business-point/register-image/:id')
export class UploadImageToBusinessPointController {
  constructor(
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly saveImagesBusinessPointImageUseCase: SaveImagesBusinessPointImageUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 2, multerConfig))
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    try {
      const resultUpload = await this.uploadImageUseCase.execute({ files });

      if (resultUpload.isLeft()) {
        const err = resultUpload.value;
        switch (err.constructor) {
          case UploadImageError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      await this.saveImagesBusinessPointImageUseCase.execute({
        businessPointId: id,
        imgUrls: resultUpload.value.imageUrls,
      });

      return {
        message: 'Imagem salva.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
