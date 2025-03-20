import { SharedItemsAssociateKeysEnum } from 'src/domain/our-city/application/shared/enums/shared-items-associate-keys.enum';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { z } from 'zod';

const allowedKeys = z.nativeEnum(SharedItemsAssociateKeysEnum);

export const businessPointDetailsSchema = z.object({
  businessPointId: z.string().uuid(),
  newListItems: z.record(allowedKeys, z.array(z.string())),
  removedListItems: z.record(allowedKeys, z.array(z.string())),
});

export const businessPointDetailsSchemaValidationPipe = new ZodValidationPipe(
  businessPointDetailsSchema,
);

export type businessPointDetailsRequest = z.infer<
  typeof businessPointDetailsSchema
>;
