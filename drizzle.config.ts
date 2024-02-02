import type { Config } from "drizzle-kit";
import { connectionString } from "./src/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
