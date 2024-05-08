import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";

describe("Get history check-in tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list check-in history", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .get("/check-ins/history")
      .query({
        page: 1,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
