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
import { BusinessPointImageLimitExceededError } from 'src/domain/our-city/application/use-cases/errors/business-point-image-limit-exceeded-error';
import { SaveImagesBusinessPointUseCase } from 'src/domain/our-city/application/use-cases/business-point/save-images-business-point';
import { CheckBusinessPointImageQuotaUseCase } from 'src/domain/our-city/application/use-cases/upload/check-user-image-quota';
import { BusinessPointImageQuota } from 'src/domain/our-city/application/shared/constants/business-point-image-quota';
import { UploadImageError } from 'src/domain/our-city/application/use-cases/errors/upload-image-error';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';
import { ValidateFilesInterceptor } from '../../interceptors/validate-files.interceptor';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerConfig } from '../../config/multer.config';

@Controller('/business-point/register-image/:id')
export class UploadImageToBusinessPointController {
  constructor(
    private readonly checkBusinessPointImageQuotaUseCase: CheckBusinessPointImageQuotaUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly saveImagesBusinessPointUseCase: SaveImagesBusinessPointUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', BusinessPointImageQuota, multerConfig),
    ValidateFilesInterceptor,
  )
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    try {
      const resultCheck =
        await this.checkBusinessPointImageQuotaUseCase.execute({
          businessPointId: id,
        });

      if (resultCheck.isLeft()) {
        const err = resultCheck.value;
        switch (err.constructor) {
          case BusinessPointImageLimitExceededError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

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

      await this.saveImagesBusinessPointUseCase.execute({
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
