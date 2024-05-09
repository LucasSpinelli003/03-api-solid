import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate check-in tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
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

    const checkInId = createCheckIn.body.checkIn.id;

    const validation = await request(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(validation.statusCode).toEqual(200);
    const checkInValidated = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkInId,
      },
    });
    expect(checkInValidated?.validated_at).toEqual(expect.any(Date));
  });
});
