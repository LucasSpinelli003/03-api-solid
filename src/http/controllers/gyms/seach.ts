import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const gymRequest = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = gymRequest.parse(request.params);

  const gymService = makeSearchGymsService();

  const { gyms } = await gymService.execute({ query, page });

  return response.status(201).send(gyms);
}
