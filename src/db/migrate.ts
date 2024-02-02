import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "../config";

const migrationClient = postgres(connectionString, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" }).then(() => {
  console.log("Migration done");
  process.exit(0);
});
