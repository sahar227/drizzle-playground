import {
  bigserial,
  integer,
  pgEnum,
  pgTable,
  serial,
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

export const lessons = pgTable(
  "lessons",
  {
    id: bigserial("id", { mode: "bigint" }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: undefined }).notNull(),
    maxStudents: integer("max_students").notNull(),
  },
  (lessons) => ({
    uniqueName: unique("name_unique").on(lessons.name),
  })
);
