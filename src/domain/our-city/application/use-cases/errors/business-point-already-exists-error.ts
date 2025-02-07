import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Já existe um ponto comercial nesta localização.');
  }
}
