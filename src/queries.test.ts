import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { migrateDB } from "./db/migrateDB";
import {
  createLesson,
  createTeacher,
  getAllLessons,
  getAllLessons2,
} from "./queries";
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

  it("returns a lesson from the db", async () => {
    const teacherIds = await createTeacher({ name: "Sahar" });
    const newLesson = {
      description: "",
      name: "Math",
      teacherId: teacherIds[0].id,
      maxStudents: 0,
    };
    await createLesson(newLesson);

    const allLessons = await getAllLessons();
    expect(allLessons.length).toBe(1);
  });

  it("No lessons if nothing inserted", async () => {
    const lessons = await getAllLessons();
    expect(lessons.length).toBe(0);
  });

  it("No lessons if nothing inserted (query version)", async () => {
    const lessons = await getAllLessons2();
    expect(lessons.length).toBe(0);
  });
});
