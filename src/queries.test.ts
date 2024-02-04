import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { migrateDB } from "./db/migrate";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getAllLessons } from "./queries";

// jest.mock("./db", () => {
//   let container: StartedPostgreSqlContainer;
//   let db: PostgresJsDatabase<Record<string, never>>;

//   beforeEach(async () => {
//     container = await new PostgreSqlContainer("postgres:14-alpine").start();
//     const connectionString = `postgres://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getMappedPort(
//       5432
//     )}/${container.getDatabase()}`;
//     console.log("connection string", connectionString);

//     const queryClient = postgres(connectionString);
//     db = drizzle(queryClient);
//     await migrateDB(db);
//   });

//   afterEach(async () => {
//     await container?.stop();
//   });

//   return db!;
// });

describe("my drizzle queires", () => {
  test("placeholder for now", () => {
    expect("1").toBe("1");
  });

  it("aaa", async () => {
    const lessons = await getAllLessons();
    expect(lessons.length).toBe(0);
  });
});
