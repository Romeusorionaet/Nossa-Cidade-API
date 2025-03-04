import { StaffRepository } from '../../repositories/staff.repository';
import { Either, right } from 'src/core/either';
import { Injectable } from '@nestjs/common';

interface PromoteUserToMerchantUseCaseRequest {
  id: string;
}

type PromoteUserToMerchantUseCaseResponse = Either<null, object>;

@Injectable()
export class PromoteUserToMerchantUseCase {
  constructor(private staffRepository: StaffRepository) {}

  async execute({
    id,
  }: PromoteUserToMerchantUseCaseRequest): Promise<PromoteUserToMerchantUseCaseResponse> {
    await this.staffRepository.addUserToStaff(id);

    return right({});
  }
}
