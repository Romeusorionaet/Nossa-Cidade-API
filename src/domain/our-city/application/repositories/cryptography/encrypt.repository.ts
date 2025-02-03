import { ValidationEmailTokenPayload } from 'src/core/@types/validation-email-token-payload';
import { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';

export abstract class EncryptRepository {
  abstract encryptAccessToken(
    payload: AccessTokenPayload<'access-token'>,
  ): Promise<string>;
  abstract encryptRefreshToken(
    payload: AccessTokenPayload<'access-token'>,
  ): Promise<string>;
  abstract encryptValidationEmailToken(
    payload: ValidationEmailTokenPayload<'confirmation-token'>,
  ): Promise<string>;
  abstract encryptForgotPasswordToken(
    payload: ForgotPasswordTokenPayload<'forgot-password-token'>,
  ): Promise<string>;
}
