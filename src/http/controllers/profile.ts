import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({
    id: request.user.sub,
  });

  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
