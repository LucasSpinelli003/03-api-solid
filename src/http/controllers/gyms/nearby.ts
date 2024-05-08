import { makeFetchNearByGyms } from "@/services/factories/make-fetch-nearBy-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, response: FastifyReply) {
  const gymRequest = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { userLatitude, userLongitude } = gymRequest.parse(request.query);

  const gymService = makeFetchNearByGyms();

  const { gyms } = await gymService.execute({
    userLatitude,
    userLongitude,
  });

  return response.status(200).send({ gyms });
}
