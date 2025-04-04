import { UseCaseError } from 'src/core/errors/use-case-error';

export class BusinessPointUnderAnalysisError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Não é permitido a edição enquanto estiver em análise.');
  }
}
