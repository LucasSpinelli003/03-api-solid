import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service";
export async function metrics(request: FastifyRequest, response: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService();

  const checkInsCount = await getUserMetricsService.execute({
    userId: request.user.sub,
  });

  response.status(200).send(checkInsCount);
}
