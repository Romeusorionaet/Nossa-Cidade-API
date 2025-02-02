import { z } from 'zod';

export const accessTokenSchema = z.object({
  sub: z.string().uuid('Não autorizado'),
  publicId: z.string().uuid('Não autorizado'),
  staffId: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  permissions: z.string().array(),
});
export type UserPayload = z.infer<typeof accessTokenSchema>;
