import { makeFetchNearByGyms } from "@/services/factories/make-fetch-nearBy-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const gymRequest = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = gymRequest.parse(request.body);

  const gymService = makeFetchNearByGyms();

  const { gyms } = await gymService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return response.status(201).send(gyms);
}
