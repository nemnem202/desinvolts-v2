import "dotenv/config";
import { defineConfig } from "prisma/config";
import { env } from "./lib/env";

const databaseUrl = env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl || "",
  },
});
