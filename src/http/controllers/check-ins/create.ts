import { makeCheckInService } from "@/services/factories/make-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const checkInParamsRequest = z.object({
    gymId: z.string(),
  });

  const checkInBodyRequest = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { userLatitude, userLongitude } = checkInBodyRequest.parse(
    request.body,
  );

  const { gymId } = checkInParamsRequest.parse(request.params);

  const checkInService = makeCheckInService();

  const { checkIn } = await checkInService.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  });

  return response.status(201).send(checkIn);
}
