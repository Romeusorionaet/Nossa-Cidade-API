import { UseCaseError } from 'src/core/errors/use-case-error';

export class ProductImageLimitExceededError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Limite de imagem atribuido o produdo excedido.');
  }
}
