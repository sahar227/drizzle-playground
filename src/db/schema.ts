import { relations } from "drizzle-orm";
import {
  bigint,
  bigserial,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// declaring enum in database
export const popularityEnum = pgEnum("popularity", [
  "unknown",
  "known",
  "popular",
]);

export const countries = pgTable(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (countries) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(countries.name),
    };
  }
);

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: integer("country_id").references(() => countries.id),
  popularity: popularityEnum("popularity"),
});

export const teachers = pgTable("teachers", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const lessons = pgTable(
  "lessons",
  {
    id: bigserial("id", { mode: "bigint" }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: undefined }).notNull(),
    maxStudents: integer("max_students").notNull(),
    teacherId: bigint("teacher_id", { mode: "bigint" })
      .notNull()
      .references(() => teachers.id),
  },
  (lessons) => ({
    uniqueName: unique("name_unique").on(lessons.name),
  })
);

export const teacherRelations = relations(teachers, ({ many }) => ({
  lessons: many(lessons),
}));

export const lessonsRealtions = relations(lessons, ({ one }) => ({
  teacher: one(teachers, {
    fields: [lessons.teacherId],
    references: [teachers.id],
  }),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  createdAtDate: date("created_at_date").defaultNow(),
});
