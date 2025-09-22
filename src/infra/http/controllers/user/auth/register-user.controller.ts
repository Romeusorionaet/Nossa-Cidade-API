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
import { RegisterUserUseCase } from 'src/domain/our-city/application/use-cases/user/auth/register-user';
import { Public } from 'src/infra/http/middlewares/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/infra/http/config/multer.config';
import { UploadImageUseCase } from 'src/domain/our-city/application/use-cases/upload/upload-image';

@Controller('/auth/register')
export class RegisterUserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly uploadImageUseCase: UploadImageUseCase,
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(201)
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
          throw new BadRequestException(resultUpload.value.message);
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
        throw new BadRequestException(result.value.message);
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
