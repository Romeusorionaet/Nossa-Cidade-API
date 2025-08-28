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
import { UploadImageError } from 'src/domain/our-city/application/use-cases/errors/upload-image-error';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';
import { ValidateFilesInterceptor } from '../../interceptors/validate-files.interceptor';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerConfig } from '../../config/multer.config';
import { SaveImagesProductUseCase } from 'src/domain/our-city/application/use-cases/product/save-images-product';
import { CheckProductImageQuotaUseCase } from 'src/domain/our-city/application/use-cases/product/check-product-image-quota';
import { ProductImageQuota } from 'src/domain/our-city/application/shared/constants/product-image-quota';
import { ProductImageLimitExceededError } from 'src/domain/our-city/application/use-cases/errors/product-image-limit-exceeded-error';

@Controller('/product/register-image/:id')
export class UploadImageToProductController {
  constructor(
    private readonly checkProductImageQuotaUseCase: CheckProductImageQuotaUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly saveImagesProductUseCase: SaveImagesProductUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', ProductImageQuota, multerConfig),
    ValidateFilesInterceptor,
  )
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
  ) {
    try {
      const resultCheck = await this.checkProductImageQuotaUseCase.execute({
        productId: id,
        filesLength: files.length,
      });

      if (resultCheck.isLeft()) {
        const err = resultCheck.value;
        switch (err.constructor) {
          case ProductImageLimitExceededError:
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

      await this.saveImagesProductUseCase.execute({
        productId: id,
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
