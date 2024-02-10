import { config } from "dotenv";
import { z } from "zod";
if (process.env.NODE_ENV === "development") config();

const environmentSchema = z.object({
  NODE_ENV: z.union([
    z.literal("production"),
    z.literal("development"),
    z.literal(undefined),
  ]),
  CONNECTION_STRING: z.string(),
});

const environment = environmentSchema.parse(process.env);

export const connectionString = environment.CONNECTION_STRING;
