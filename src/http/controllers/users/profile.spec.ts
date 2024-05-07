import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";

describe("Profile tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able go get profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const getProfile = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(getProfile.statusCode).toEqual(200);
    expect(getProfile.body.user).toEqual(
      expect.objectContaining({ email: "user@fakeuser.com" }),
    );
  });
});
