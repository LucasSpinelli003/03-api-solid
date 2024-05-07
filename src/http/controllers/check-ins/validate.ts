import { AlreadyValidated } from "@/services/errors/already-validated";
import { LateCheckInValidationError } from "@/services/errors/late-check-in-validate-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found";
import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const validationRequest = z.object({
    checkInId: z.string(),
  });

  try {
    const { checkInId } = validationRequest.parse(request.params);

    const validateCheckInService = makeValidateCheckInService();

    const { checkIn } = await validateCheckInService.execute({
      checkInId,
    });

    return response.status(200).send(checkIn);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).send({ error: error.message });
    }
    if (error instanceof LateCheckInValidationError) {
      return response.status(400).send({ error: error.message });
    }
    if (error instanceof AlreadyValidated) {
      return response.status(400).send({ error: error.message });
    }
  }
}
