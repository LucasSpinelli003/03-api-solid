import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";

describe("Create check-in tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
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

    const gymId = createGym.body.gym.id;

    const createCheckIn = await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userLatitude: 90,
        userLongitude: 180,
      });

    expect(createCheckIn.statusCode).toEqual(201);
  });
});
