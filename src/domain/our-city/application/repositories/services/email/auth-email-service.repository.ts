export abstract class AuthEmailServiceRepository {
  abstract sendValidationEmail({ email }: { email: string }): Promise<boolean>;
  abstract sendForgotPassword({ email }: { email: string }): Promise<void>;
}
