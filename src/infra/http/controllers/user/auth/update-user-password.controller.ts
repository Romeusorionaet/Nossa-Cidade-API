import {
  BadRequestException,
  Controller,
  UseGuards,
  HttpCode,
  Body,
  Put,
} from '@nestjs/common';
import {
  updatePasswordSchemaValidationPipe,
  UpdatePasswordRequest,
} from '../../../schemas/update-password.schema';
import { UpdateUserPasswordUseCase } from 'src/domain/our-city/application/use-cases/user/auth/update-user-password';
import { AccessTokenGuard } from '../../../middlewares/auth/guards/access-token.guard';

@Controller('/auth/update/password')
export class UpdateUserPasswordController {
  constructor(private readonly updateUserPassword: UpdateUserPasswordUseCase) {}
  @Put()
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async handle(
    @Body(updatePasswordSchemaValidationPipe) body: UpdatePasswordRequest,
  ) {
    try {
      const { email, newPassword, oldPassword } = body;

      const result = await this.updateUserPassword.execute({
        newPassword,
        oldPassword,
        email,
      });

      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }

      return { message: 'Senha atualizada.' };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
