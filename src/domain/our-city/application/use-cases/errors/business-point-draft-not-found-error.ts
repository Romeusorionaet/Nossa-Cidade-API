import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointDraftNotFoundError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Rascunho do ponto comercial não encontrado.');
  }
}
