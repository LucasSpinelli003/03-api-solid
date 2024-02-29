import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterService } from "@/services/register";

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

  try {
    await RegisterService({ name, email, password });
  } catch (error) {
    return response.status(409).send(error);
  }

  return response.status(201).send();
}
