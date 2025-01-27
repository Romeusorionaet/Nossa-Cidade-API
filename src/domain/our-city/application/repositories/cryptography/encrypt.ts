export abstract class Encrypt {
  abstract encryptAccessToken(
    payload: Record<string, unknown>,
  ): Promise<string>;
  abstract encryptRefreshToken(
    payload: Record<string, unknown>,
  ): Promise<string>;
}
