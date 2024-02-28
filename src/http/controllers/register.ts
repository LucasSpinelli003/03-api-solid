import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const userRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = userRequestSchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return response.status(201).send();
}
