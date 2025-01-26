import { pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('business_point_status', ['ativo', 'inativo']);
