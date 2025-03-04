import { ConfirmationEmailTokenPayload } from 'src/core/@types/validation-email-token-payload';
import { ForgotPasswordTokenPayload } from 'src/core/@types/forgot-password-token-payload';
import { AccessTokenPayload } from 'src/core/@types/access-token-payload';
import { RefreshTokenPayload } from 'src/core/@types/refresh-token-payload';

export abstract class EncryptRepository {
  abstract encryptAccessToken(payload: AccessTokenPayload): Promise<string>;
  abstract encryptRefreshToken(payload: RefreshTokenPayload): Promise<string>;
  abstract encryptValidationEmailToken(
    payload: ConfirmationEmailTokenPayload,
  ): Promise<string>;
  abstract encryptForgotPasswordToken(
    payload: ForgotPasswordTokenPayload,
  ): Promise<string>;
}
