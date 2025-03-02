import { ZodValidationPipe } from "../pipes/zod-validation.pipe";
import { z } from "zod";

export const validateBusinessPointSchema = z.object({
	params: z.object({
		latitude: z.coerce.number().min(-90).max(90),
		longitude: z.coerce.number().min(-180).max(180),
	}),
});

export const validateBusinessPointSchemaValidationPipe = new ZodValidationPipe(
	validateBusinessPointSchema,
);

export type businessPointRequest = z.infer<typeof validateBusinessPointSchema>;
