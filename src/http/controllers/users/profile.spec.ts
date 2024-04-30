import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Profile tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able go get profile", async () => {
    await request(app.server).post("/users").send({
      name: "lucas",
      email: "lucas.spina@tecs.com",
      password: "asdadsadasd",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "lucas.spina@tecs.com",
      password: "asdadsadasd",
    });
    const { token } = authResponse.body;

    const getProfile = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(getProfile.statusCode).toEqual(200);
    expect(getProfile.body.user).toEqual(
      expect.objectContaining({ email: "lucas.spina@tecs.com" }),
    );
  });
});
