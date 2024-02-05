import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { teachers } from "./schema";

let _db: PostgresJsDatabase<Record<string, never>>;
export function connect(connectionString: string) {
  if (!!_db) return;
  const queryClient = postgres(connectionString);
  _db = drizzle(queryClient);
}

export function db() {
  if (!_db) throw new Error("Must connect first!");
  return _db;
}

export async function seed(connectionString: string) {
  connect(connectionString);
  await _db.insert(teachers).values([{ name: "Sahar" }, { name: "Luna" }]);
}
