import { z } from "zod";

export const confirmationEmailTokenSchema = z.object({
	email: z.string().email("Email inválido"),
});
