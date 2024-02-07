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
  getTeacherAndLessons,
  getTeacherAndLessonsWithJoins,
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
    const teacher = await createTeacher({ name: "Sahar" });
    if (!teacher) throw new Error("Teacher was not created");

    const newLesson = {
      description: "",
      name: "Math",
      teacherId: teacher.id,
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

  it("Returns teacher with all of their lessons", async () => {
    const teacher = await createTeacher({ name: "Sahar" });
    if (!teacher) throw new Error("Teacher was not created");

    await createLesson({
      name: "Math",
      teacherId: teacher.id,
      description: "",
      maxStudents: 5,
    });
    await createLesson({
      name: "English",
      teacherId: teacher.id,
      description: "",
      maxStudents: 5,
    });

    const teacherWithLessons = await getTeacherAndLessons(teacher.id);

    expect(teacherWithLessons?.id).toBe(teacher.id);
    expect(teacherWithLessons?.lessons.length).toBe(2);
    const mathLesson = teacherWithLessons?.lessons.find(
      (v) => v.name === "Math"
    );
    expect(mathLesson).toBeTruthy();
    const englishLesson = teacherWithLessons?.lessons.find(
      (v) => v.name === "English"
    );
    expect(englishLesson).toBeTruthy();
  });

  it("Returns teachers with their lessons (using joins)", async () => {
    const teacher = await createTeacher({ name: "Sahar" });
    const teacher2 = await createTeacher({ name: "Sahar2" }); // Additional teacher to ensure query only returns the relevant data

    if (!teacher) throw new Error("Teacher was not created");
    if (!teacher2) throw new Error("Teacher2 was not created");

    await createLesson({
      name: "Math",
      teacherId: teacher.id,
      description: "",
      maxStudents: 5,
    });
    await createLesson({
      name: "English",
      teacherId: teacher.id,
      description: "",
      maxStudents: 5,
    });
    await createLesson({
      name: "English2",
      teacherId: teacher2.id, // A lesson for teacher2 to make sure the query does not return lessons that don't belong
      description: "",
      maxStudents: 5,
    });

    const teacherWithLessons = await getTeacherAndLessonsWithJoins(teacher.id);

    expect(teacherWithLessons.length).toBe(2);
    const englishRow = teacherWithLessons.find(
      (v) => v.lessons.name === "English"
    );
    expect(englishRow?.teachers.id).toBe(teacher.id);
    const mathRow = teacherWithLessons.find((v) => v.lessons.name === "Math");
    expect(mathRow?.teachers.id).toBe(teacher.id);
  });
});
