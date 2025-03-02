import type { ConfirmationEmailTokenPayload } from "src/core/@types/validation-email-token-payload";
import type { ForgotPasswordTokenPayload } from "src/core/@types/forgot-password-token-payload";
import type { AccessTokenPayload } from "src/core/@types/access-token-payload";
import type { RefreshTokenPayload } from "src/core/@types/refresh-token-payload";

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
