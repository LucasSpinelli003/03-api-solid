import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, response: FastifyReply) {
  const searchRequest = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchRequest.parse(request.query);

  const gymService = makeSearchGymsService();

  const { gyms } = await gymService.execute({ query, page });

  return response.status(201).send(gyms);
}
