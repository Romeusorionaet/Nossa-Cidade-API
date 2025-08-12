import { UseCaseError } from './use-case-error';

export class DatabaseFrozenError extends Error implements UseCaseError {
  constructor() {
    super(
      'O banco de dados está inativo e requer intervenção manual do desenvolvedor para ser reativado.',
    );
  }
}
