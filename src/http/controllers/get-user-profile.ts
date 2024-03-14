import { ResourceNotFound } from "@/services/errors/resource-not-found";
import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserProfile(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestSchema = z.object({
    id: z.string(),
  });

  const { id } = requestSchema.parse(request.body);

  try {
    const makeUserProfileService = makeGetUserProfileService();

    const user = await makeUserProfileService.execute({ id });

    return response.status(200).send(user);
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return response.status(404).send({ message: error.message });
    }
    throw error;
  }
}
