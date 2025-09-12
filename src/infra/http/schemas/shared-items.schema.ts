import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const sharedItemPropsSchema = z.object({
  name: z.string().min(1),
});

const sharedItemCategories = [
  'serviceOptions',
  'accessibility',
  'environments',
  'categories',
  'amenities',
  'audience',
  'payments',
  'planning',
  'parking',
  'menu',
  'pets',
] as const;

type SharedItemCategory = (typeof sharedItemCategories)[number];

const schemaShape: Record<SharedItemCategory, any> = {} as any;
// biome-ignore lint/complexity/noForEach: <explanation>
sharedItemCategories.forEach((key) => {
  schemaShape[key] = z.array(sharedItemPropsSchema);
});

const sharedItemsSchemaBase = z.object(schemaShape);

export const sharedItemsSchema = sharedItemsSchemaBase.partial();

export const sharedItemsSchemaValidationPipe = new ZodValidationPipe(
  sharedItemsSchema,
);

export type SharedItemsRequest = Partial<{
  [K in SharedItemCategory]: { name: string }[];
}>;
