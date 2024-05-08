import { makeFetchCheckInHistoryService } from "@/services/factories/make-fetch-user-check-ins-history";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, response: FastifyReply) {
  const historyRequest = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyRequest.parse(request.query);

  const fetchHistoryService = makeFetchCheckInHistoryService();
  try {
    const { checkIns } = await fetchHistoryService.execute({
      page,
      userId: request.user.sub,
    });

    return response.status(200).send(checkIns);
  } catch (error) {}
}
