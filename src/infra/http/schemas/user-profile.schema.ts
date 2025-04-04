import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

const baseUserProfileSchema = z.object({
  email: z.string().min(1, { message: 'Email obrigatório' }),
  username: z.string().min(1, { message: 'Username obrigatório' }),
  picture: z.string().nullable().optional(),
});

const userProfileFromAuthSchema = baseUserProfileSchema;

const userProfileSchema = baseUserProfileSchema.extend({
  password: z.string().min(1, { message: 'Password obrigatório' }),
});

export const userProfileFromAuthValidationPipe = new ZodValidationPipe(
  userProfileFromAuthSchema,
);
export const userProfileValidationPipe = new ZodValidationPipe(
  userProfileSchema,
);

export type UserProfileFromAuth = z.infer<typeof userProfileFromAuthSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
