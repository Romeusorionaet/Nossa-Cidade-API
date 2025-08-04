/* eslint-disable prettier/prettier */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infra/database/schemas/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  extensionsFilters: ['postgis'],
  introspect: {
    casing: 'camel',
  },
});
