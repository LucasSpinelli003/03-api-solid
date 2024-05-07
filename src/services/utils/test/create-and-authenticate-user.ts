import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "user",
    email: "user@fakeuser.com",
    password: "fakePassword",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "user@fakeuser.com",
    password: "fakePassword",
  });
  const { token } = authResponse.body;

  return {
    token,
  };
}
