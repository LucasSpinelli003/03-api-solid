import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";

describe("Create Gym tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const createGym = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript GYm",
        description: "sada",
        phone: "12331321",
        latitude: 90,
        longitude: 180,
      });

    expect(createGym.statusCode).toEqual(201);
    expect(createGym.body.gym).toEqual(
      expect.objectContaining({ title: "Javascript GYm" }),
    );
  });
});
