import { drizzle } from "drizzle-orm/postgres-js";
import type { EnvService } from "../env/env.service";
import { Injectable } from "@nestjs/common";
import * as schema from "./schemas/index";
import * as postgres from "postgres";

@Injectable()
export class DatabaseClient {
	public readonly database: ReturnType<typeof drizzle>;

	constructor(private readonly envService: EnvService) {
		const databaseURL = this.envService.get("DATABASE_URL");
		const client = postgres(databaseURL, {
			// ssl: process.env.DATABASE_SSL === 'true',
		});
		this.database = drizzle(client, { schema, logger: true });
	}
}
