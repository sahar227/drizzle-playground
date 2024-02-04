import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { migrateDB } from "./db/migrateDB";
import { getAllLessons } from "./queries";
import { connect } from "./db";

let container: StartedPostgreSqlContainer;

describe("my drizzle queires", () => {
  beforeEach(async () => {
    container = await new PostgreSqlContainer("postgres:14-alpine").start();
    const connectionString = `postgres://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getMappedPort(
      5432
    )}/${container.getDatabase()}`;
    console.log("connection string", connectionString);

    connect(connectionString);
    await migrateDB(connectionString);
  });

  afterEach(async () => {
    await container?.stop();
  });

  it("aaa", async () => {
    const lessons = await getAllLessons();
    expect(lessons.length).toBe(0);
  });
});
