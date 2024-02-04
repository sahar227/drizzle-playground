import { migrateDB } from "./migrateDB";
import { connectionString } from "../config";

migrateDB(connectionString).then(() => {
  console.log("Migration done");
  process.exit(0);
});
