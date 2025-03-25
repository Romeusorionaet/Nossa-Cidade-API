import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointNotFoundError extends Error implements UseCaseError {
  constructor(identifier?: string) {
    super(`O ponto comercial [ ${identifier} ] não foi encontrado`);
  }
}
