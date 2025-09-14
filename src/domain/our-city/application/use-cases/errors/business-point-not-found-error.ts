import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Ponto comercial não encontrado');
  }
}
