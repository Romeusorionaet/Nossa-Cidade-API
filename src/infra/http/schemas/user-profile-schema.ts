import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { z } from 'zod';

const baseUserProfileSchema = z.object({
  email: z.string(),
  username: z.string(),
  picture: z.string(),
});

const userProfileFromAuthSchema = baseUserProfileSchema;

const userProfileSchema = baseUserProfileSchema.extend({
  password: z.string(),
});

export const userProfileFromAuthValidationPipe = new ZodValidationPipe(
  userProfileFromAuthSchema,
);
export const userProfileValidationPipe = new ZodValidationPipe(
  userProfileSchema,
);

export type UserProfileFromAuth = z.infer<typeof userProfileFromAuthSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
