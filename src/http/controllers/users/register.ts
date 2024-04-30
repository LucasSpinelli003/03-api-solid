import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const userRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = userRequestSchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    const user = await registerService.execute({ name, email, password });
    return response.status(201).send(user);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: err.message });
    }
    throw err;
  }
}
