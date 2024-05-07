import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/services/utils/test/create-and-authenticate-user";

describe("Search nearby gyms tests end to end ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gym's nearby", async () => {
    const { token } = await createAndAuthenticateUser(app);
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript GYm",
        description: "sada",
        phone: "12331321",
        latitude: 10,
        longitude: 10,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Typescript",
        description: "sada",
        phone: "12331321",
        latitude: 90,
        longitude: 180,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        query: "Typescript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Typescript",
      }),
    ]);
  });
});
