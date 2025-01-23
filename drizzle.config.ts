/* eslint-disable prettier/prettier */
import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABASE_URL, '==')

export default defineConfig({
  schema: './src/infra/database/schemas/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
