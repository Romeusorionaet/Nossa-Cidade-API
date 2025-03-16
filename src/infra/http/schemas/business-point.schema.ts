import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

export const businessPointSchema = z.object({
  categoryId: z.string(),
  name: z
    .string()
    .min(6, { message: 'Nome muito curto.' })
    .max(100, { message: 'Nome muito longo.' }),
  description: z
    .string()
    .min(10, { message: 'Descrição insuficiente.' })
    .max(400, { message: 'Descrição muito longo.' }),
  street: z.string().min(1, { message: 'Campo obrigatório' }),
  houseNumber: z.string().min(1, { message: 'Campo obrigatório' }),
  neighborhood: z.string().min(1, { message: 'Campo obrigatório' }),
  highlight: z
    .string()
    .min(10, { message: 'Muito curto..' })
    .max(100, { message: 'Muito longo. (max = 100 caracteres)' })
    .optional(),
  customTags: z.array(z.string()).optional(),
  categoriesAssociate: z.array(z.string()).optional(),
  location: z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
  }),
  openingHours: z.record(z.any()),
});

export const businessPointSchemaValidationPipe = new ZodValidationPipe(
  businessPointSchema,
);

export type businessPointRequest = z.infer<typeof businessPointSchema>;
