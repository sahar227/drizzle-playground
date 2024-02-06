import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: PostgresJsDatabase<typeof schema>;

export function connect(connectionString: string) {
  const queryClient = postgres(connectionString);
  _db = drizzle(queryClient, { schema });
}

export function db() {
  if (!_db) throw new Error("Must connect first!");
  return _db;
}

export async function seed(connectionString: string) {
  connect(connectionString);
  await _db
    .insert(schema.teachers)
    .values([{ name: "Sahar" }, { name: "Luna" }]);
}
