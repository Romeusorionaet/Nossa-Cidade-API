import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string(),
  NOSSA_CIDADE_HOST: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  NODE_MAILER_EMAIL: z.string(),
  NODE_MAILER_PASS: z.string(),
  CONFIRM_EMAIL_NOSSA_CIDADE_HOST: z.string(),
  FORGOT_PASSWORD_NOSSA_CIDADE_HOST: z.string(),
  UPLOADTHING_TOKEN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
