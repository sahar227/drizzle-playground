import { eq } from "drizzle-orm";
import { db } from "./db";
import { lessons, teachers } from "./db/schema";

export async function getAllLessons() {
  const allLessons = await db().select().from(lessons);
  return allLessons;
}

export async function getAllLessons2() {
  const allLessons = await db().query.lessons.findMany();
  return allLessons;
}

type InsertTeacher = typeof teachers.$inferInsert;

export async function createTeacher(teacher: InsertTeacher) {
  return await db()
    .insert(teachers)
    .values(teacher)
    .returning({ id: teachers.id });
}

type InsertLesson = typeof lessons.$inferInsert;

export async function createLesson(lesson: InsertLesson) {
  return await db()
    .insert(lessons)
    .values(lesson)
    .returning({ id: lessons.id });
}

export async function getTeacherAndLessons(teacherId: bigint) {
  return await db().query.teachers.findFirst({
    where: eq(teachers.id, teacherId),
    with: { lessons: true },
  });
}
