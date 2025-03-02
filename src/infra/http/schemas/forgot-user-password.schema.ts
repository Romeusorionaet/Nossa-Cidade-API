import { ZodValidationPipe } from "../pipes/zod-validation.pipe";
import { z } from "zod";

export const forgotUserPasswordSchema = z.object({
	password: z.string().min(6, { message: "No mínimo 6 digitos" }),
});

export const forgotUserPasswordSchemaPipe = new ZodValidationPipe(
	forgotUserPasswordSchema,
);

export type ForgotUserPasswordRequest = z.infer<
	typeof forgotUserPasswordSchema
>;
