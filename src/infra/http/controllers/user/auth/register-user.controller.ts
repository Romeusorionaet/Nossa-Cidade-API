import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  userProfileValidationPipe,
  UserProfile,
} from 'src/infra/http/schemas/user-profile.schema';
import { UserAlreadyExistsError } from 'src/domain/our-city/application/use-cases/errors/user-already-exists-error';
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/infra/http/config/multer.config';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';
import { UploadImageError } from 'src/domain/our-city/application/use-cases/errors/upload-image-error';

@Controller('/auth/register')
export class RegisterUserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(200)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body(userProfileValidationPipe) body: UserProfile,
  ) {
    try {
      const { email, username, password } = body;

      let avatar = '';

      if (file) {
        const resultUpload = await this.uploadImageUseCase.execute({
          files: [file],
        });

        if (resultUpload.isLeft()) {
          const err = resultUpload.value;
          switch (err.constructor) {
            case UploadImageError:
              throw new BadRequestException(err.message);

            default:
              throw new BadRequestException(err.message);
          }
        }

        avatar = resultUpload.value.imageUrls[0];
      }

      const result = await this.registerUserUseCase.execute({
        avatar,
        email,
        username,
        password,
      });

      if (result.isLeft()) {
        const err = result.value;
        switch (err.constructor) {
          case UserAlreadyExistsError:
            throw new BadRequestException(err.message);

          default:
            throw new BadRequestException(err.message);
        }
      }

      return {
        message:
          'Enviamos um email de confirmação. Por favor, verifique sua caixa de entrada e siga as instruções para confirmar seu endereço de email.',
      };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
