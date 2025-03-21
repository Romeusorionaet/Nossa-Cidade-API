import { UseCaseError } from 'src/core/errors/use-case-error';

export class UploadImageError extends Error implements UseCaseError {
  constructor() {
    super('Erro ao fazer o upload da imagem.');
  }
}
