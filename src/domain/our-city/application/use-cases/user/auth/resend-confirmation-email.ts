import { AuthEmailServiceRepository } from '../../../repositories/services/email/auth-email-service.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface ResendConfirmationEmailUseCaseRequest {
  email: string;
}

type ResendConfirmationEmailUseCaseResponse = Either<null, object>;

@Injectable()
export class ResendConfirmationEmailUseCase {
  constructor(private authEmailService: AuthEmailServiceRepository) {}

  async execute({
    email,
  }: ResendConfirmationEmailUseCaseRequest): Promise<ResendConfirmationEmailUseCaseResponse> {
    await this.authEmailService.sendValidationEmail({
      email,
    });

    return right({});
  }
}
