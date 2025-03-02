export class InvalidCredentialsError extends Error {
	constructor() {
		super("Credencial inválido.");
	}
}
