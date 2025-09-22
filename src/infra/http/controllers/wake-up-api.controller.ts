import { WakeUpDatabaseUseCase } from 'src/domain/our-city/application/use-cases/user/wake-up-database';
import { BadRequestException, Controller, HttpCode, Get } from '@nestjs/common';
import { Public } from '../middlewares/auth/decorators/public.decorator';

@Controller('/wake-up-api')
export class WakeUpApiController {
  constructor(private wakeUpDatabaseUseCase: WakeUpDatabaseUseCase) {}
  @Public()
  @Get()
  @HttpCode(200)
  async handle() {
    try {
      const resultDB = await this.wakeUpDatabaseUseCase.execute();

      if (resultDB.isLeft()) {
        throw new BadRequestException(resultDB.value.message);
      }

      return { success: true };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
