import { UseCaseError } from 'src/core/errors/use-case-error';

export class CategoryTagNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('A Tag dessa categoria não foi encontrada.');
  }
}
