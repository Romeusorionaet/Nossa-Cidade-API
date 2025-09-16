import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

const addressSchema = z
  .object({
    street: z.string().min(1, { message: 'Campo obrigatório' }),
    neighborhood: z.string().min(1, { message: 'Campo obrigatório' }),
    houseNumber: z.coerce.number().min(1, { message: 'Campo obrigatório' }),
  })
  .partial();

const locationSchema = z
  .object({
    longitude: z.coerce.number().min(-180).max(180),
    latitude: z.coerce.number().min(-90).max(90),
  })
  .partial();

export const businessPointUpdateSchema = z.object({
  categoryId: z.string().min(1, { message: 'Id da Categoria obrigatório' }),
  name: z
    .string()
    .min(6, { message: 'Nome muito curto.' })
    .max(100, { message: 'Nome muito longo.' }),
  description: z
    .string()
    .min(10, { message: 'Descrição insuficiente.' })
    .max(400, { message: 'Descrição muito longo.' }),
  address: addressSchema.refine(
    (address) => {
      if (!address) return true;
      const values = Object.values(address).filter(Boolean);
      return values.length === 0 || values.length === 3;
    },
    {
      message: 'Todos os campos de endereço devem ser preenchidos ou nenhum.',
    },
  ),
  highlight: z
    .string()
    .min(10, { message: 'Muito curto..' })
    .max(100, { message: 'Muito longo. (max = 100 caracteres)' }),
  customTags: z.array(z.string()),
  categoriesAssociate: z.array(z.string()),
  location: locationSchema.refine(
    (location) => {
      if (!location) return true;
      const values = Object.values(location).filter((val) => val !== undefined);
      return values.length === 0 || values.length === 2;
    },
    {
      message:
        'Latitude e longitude devem ser preenchidos juntos ou não enviados.',
    },
  ),
  openingHours: z.record(z.any()),
  website: z.string(),
  censorship: z.boolean(),
});

export const updateBusinessPointSchema = businessPointUpdateSchema.partial();

export const updateBusinessPointSchemaValidationPipe = new ZodValidationPipe(
  updateBusinessPointSchema,
);

export type UpdateBusinessPointRequest = z.infer<
  typeof updateBusinessPointSchema
>;
