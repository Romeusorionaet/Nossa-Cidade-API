import { UseCaseError } from './use-case-error';

export class ActionNotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Ação não permitida.');
  }
}
