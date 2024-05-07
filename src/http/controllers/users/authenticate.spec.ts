import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Authenticate tests", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "user",
      email: "user@fakeuser.com",
      password: "fakePassword",
    });

    const token = await request(app.server).post("/sessions").send({
      email: "user@fakeuser.com",
      password: "fakePassword",
    });

    expect(token.statusCode).toEqual(200);
    expect(token.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    );
  });
});
