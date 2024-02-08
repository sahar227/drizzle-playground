CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"created_at_date" date DEFAULT now()
);
