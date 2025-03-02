export abstract class AuthEmailServiceRepository {
	abstract sendValidationEmail({ email }: { email: string }): Promise<void>;
	abstract sendForgotPassword({ email }: { email: string }): Promise<void>;
}
