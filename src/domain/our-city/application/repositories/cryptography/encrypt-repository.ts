export abstract class EncryptRepository {
  abstract encryptAccessToken(
    payload: Record<string, unknown>,
  ): Promise<string>;
  abstract encryptRefreshToken(
    payload: Record<string, unknown>,
  ): Promise<string>;
}
