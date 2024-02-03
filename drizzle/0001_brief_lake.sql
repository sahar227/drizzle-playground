CREATE TABLE IF NOT EXISTS "lessons" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"max_students" integer NOT NULL,
	CONSTRAINT "name_unique" UNIQUE("name")
);
