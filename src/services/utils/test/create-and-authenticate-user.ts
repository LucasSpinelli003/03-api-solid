import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "Jonh Doe",
      email: "user@fakeuser.com",
      password_hash: await hash("fakePassword", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
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
