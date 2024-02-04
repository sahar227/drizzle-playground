import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { migrateDB } from "./db/migrateDB";
import { getAllLessons } from "./queries";
import { connect, db } from "./db";
import { lessons, teachers } from "./db/schema";

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

  it("returns a lesson from the db", async () => {
    const teacherIds = await db()
      .insert(teachers)
      .values({ name: "Sahar" })
      .returning({ id: teachers.id });
    await db()
      .insert(lessons)
      .values({
        description: "",
        name: "",
        teacherId: teacherIds[0].id,
        maxStudents: 0,
      })
      .returning();
    const allLessons = await getAllLessons();
    expect(allLessons.length).toBe(1);
  });

  it("No lessons if nothing inserted", async () => {
    const lessons = await getAllLessons();
    expect(lessons.length).toBe(0);
  });
});
