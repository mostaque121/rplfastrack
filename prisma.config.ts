import "dotenv/config";

import { defineConfig } from "prisma/config";

// Prisma 7 reads the connection string here (not in schema.prisma) and no longer loads .env
// itself: run the CLI with `--env-file=.env` (Node) or rely on the host's environment.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
