import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Refresh token tests", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be refresh token auth", async () => {
    await request(app.server).post("/users").send({
      name: "user",
      email: "user@fakeuser.com",
      password: "fakePassword",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "user@fakeuser.com",
      password: "fakePassword",
    });

    const cookies = authResponse.get("Set-Cookie");

    const RefreshTokenResponse = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(RefreshTokenResponse.statusCode).toEqual(200);
    expect(RefreshTokenResponse.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
