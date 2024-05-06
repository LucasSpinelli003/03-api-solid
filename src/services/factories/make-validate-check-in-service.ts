import { ValidateCheckInService } from "../validate-check-in";
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeValidateCheckInService() {
  const prismaCheckInsRepository = new PrimaCheckInsRepository();
  const service = new ValidateCheckInService(prismaCheckInsRepository);

  return service;
}
