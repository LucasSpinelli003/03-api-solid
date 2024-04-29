import { Environment } from "vitest";
import "dotenv/config";
import { randomUUID } from "node:crypto";

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide database url");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const randomSchema = randomUUID();

    console.log(generateDatabaseUrl(randomSchema));

    return {
      async teardown() {
        console.log("Teardown executed!");
      },
    };
  },
  transformMode: "ssr",
};
