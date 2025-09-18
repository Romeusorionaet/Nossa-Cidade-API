import { AccessTokenPayload } from 'src/core/@types/access-token-payload';

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
