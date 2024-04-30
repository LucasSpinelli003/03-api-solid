import { makeCreateGymService } from "@/services/factories/make-create-gym-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const gymRequest = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
  });

  const { description, latitude, longitude, phone, title } = gymRequest.parse(
    request.body,
  );

  const gymService = makeCreateGymService();

  const gym = await gymService.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return response.status(201).send(gym);
}
