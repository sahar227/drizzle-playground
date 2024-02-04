import { db } from "./db";
import { lessons } from "./db/schema";

export async function getAllLessons() {
  const allLessons = await db.select().from(lessons);
  return allLessons;
}
