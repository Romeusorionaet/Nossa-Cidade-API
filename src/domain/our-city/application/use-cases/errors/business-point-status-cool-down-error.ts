import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointStatusCoolDownError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(
      'O ponto comercial só pode alterar ativar/desativar a cada 24 horas.',
    );
  }
}
