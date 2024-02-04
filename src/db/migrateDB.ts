import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function migrateDB(connectionString: string) {
  const migrationClient = postgres(connectionString, { max: 1 });

  return migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
}
