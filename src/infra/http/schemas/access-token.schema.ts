import { z } from 'zod';

export const accessTokenSchema = z.object({
  sub: z.string().uuid('Não autorizado'),
  publicId: z.string().uuid('Não autorizado'),
  staffId: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  email: z.string(),
  permissions: z.string().array(),
  purpose: z.string(),
});
