import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let _db: PostgresJsDatabase<Record<string, never>>;
export function connect(connectionString: string) {
  const queryClient = postgres(connectionString);
  _db = drizzle(queryClient);
}

export function db() {
  if (!_db) throw new Error("Must connect first!");
  return _db;
}
