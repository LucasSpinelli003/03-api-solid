import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterService } from "@/services/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

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

  const prismaUsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(prismaUsersRepository);

  try {
    await registerService.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: err.message });
    }
    return response.status(500).send(); // TODO: fix me!
  }

  return response.status(201).send();
}
