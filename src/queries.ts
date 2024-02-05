import { db } from "./db";
import { lessons, teachers } from "./db/schema";

export async function getAllLessons() {
  const allLessons = await db().select().from(lessons);
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
