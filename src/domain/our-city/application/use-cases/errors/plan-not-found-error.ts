import { UseCaseError } from 'src/core/errors/use-case-error';

export class PlanNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Plano não encontrado');
  }
}
