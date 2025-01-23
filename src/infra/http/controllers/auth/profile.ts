import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/auth/profile')
export class Profile {
  constructor() {}

  @Get()
  @HttpCode(200)
  async handle() {}
}
