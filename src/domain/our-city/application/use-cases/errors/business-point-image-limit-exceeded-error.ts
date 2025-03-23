import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointImageLimitExceededError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Limite de imagem atribuido a um ponto comercial excedido.');
  }
}
