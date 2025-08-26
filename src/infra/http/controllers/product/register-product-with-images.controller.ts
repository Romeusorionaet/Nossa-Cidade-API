import {
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  Controller,
  UseGuards,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { ValidateFilesInterceptor } from '../../interceptors/validate-files.interceptor';
import { AccessTokenGuard } from '../../middlewares/auth/guards/access-token.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerConfig } from '../../config/multer.config';
import { ProductImageQuota } from 'src/domain/our-city/application/shared/constants/product-image-quota';
import {
  productRequest,
  productSchemaValidationPipe,
} from '../../schemas/product.schema';
import { RegisterProductWithImagesUseCase } from 'src/domain/our-city/application/use-cases/product/register-product-with-images';
import { UploadImageError } from 'src/domain/our-city/application/use-cases/errors/upload-image-error';

@Controller('/product/register')
export class RegisterProductWithImagesController {
  constructor(
    private readonly registerProductWithImagesUseCase: RegisterProductWithImagesUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', ProductImageQuota, multerConfig),
    ValidateFilesInterceptor,
  )
  @UseGuards(AccessTokenGuard)
  @HttpCode(201)
  async handle(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(productSchemaValidationPipe) body: productRequest,
  ) {
    try {
      const result = await this.registerProductWithImagesUseCase.execute({
        businessPointId: body.businessPointId,
        customTags: body.customTags,
        price: Number(body.price),
        title: body.title,
        files,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case UploadImageError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        message: 'Product registrado.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
