import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  categories,
  lessons,
  posts,
  postsOnCategories,
  teachers,
} from "./db/schema";

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
  return (
    await db().insert(teachers).values(teacher).returning({ id: teachers.id })
  )?.at(0);
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

export async function getTeacherAndLessonsWithJoins(teacherId: bigint) {
  return await db()
    .select()
    .from(teachers)
    .innerJoin(lessons, eq(teachers.id, lessons.teacherId))
    .where(eq(teachers.id, teacherId));
}

export async function createPost(post: typeof posts.$inferInsert) {
  const newPost = (
    await db().insert(posts).values(post).returning({ id: posts.id })
  ).at(0);
  if (!newPost) throw new Error("error!");
  return newPost.id;
}

export async function createCategory(category: typeof categories.$inferInsert) {
  const newCategory = (
    await db()
      .insert(categories)
      .values(category)
      .returning({ id: categories.id })
  ).at(0);
  if (!newCategory) throw new Error("error!");

  return newCategory.id;
}

export async function connectPostAndCategory(
  postId: number,
  categoryId: number
) {
  await db().insert(postsOnCategories).values({ categoryId, postId });
}

export async function getPosts() {
  const posts = await db().query.posts.findMany({
    with: {
      categories: {
        columns: { categoryId: false, postId: false },
        with: { category: true },
      },
    },
  });

  return posts;
}
