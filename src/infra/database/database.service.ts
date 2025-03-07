import { DatabaseClient } from './database.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(private readonly databaseClient: DatabaseClient) {}

  get database() {
    return this.databaseClient.database;
  }
}
