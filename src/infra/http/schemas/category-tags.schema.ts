import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const categoryTagsSchema = z.object({
  categoryTags: z.array(z.string()),
});

export const categoryTagsSchemaValidationPipe = new ZodValidationPipe(
  categoryTagsSchema,
);

export type categoryTagsRequest = z.infer<typeof categoryTagsSchema>;
