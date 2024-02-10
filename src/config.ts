import { config } from "dotenv";
if (process.env.NODE_ENV === "development") config();

export const connectionString = process.env.CONNECTION_STRING;
