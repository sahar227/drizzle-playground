import { migrate } from "drizzle-orm/postgres-js/migrator";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "../config";

const migrationClient = postgres(connectionString, { max: 1 });

export function migrateDB(db: PostgresJsDatabase<Record<string, never>>) {
  return migrate(db, { migrationsFolder: "drizzle" });
}

migrateDB(drizzle(migrationClient)).then(() => {
  console.log("Migration done");
  process.exit(0);
});
