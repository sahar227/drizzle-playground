import { seed } from ".";
import { connectionString } from "../config";

seed(connectionString).then(() => {
  console.log("Seed completed");
  process.exit(0);
});
