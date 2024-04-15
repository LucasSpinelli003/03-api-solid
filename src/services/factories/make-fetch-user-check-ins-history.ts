import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsService } from "../fetch-user-check-ins-history";

export function makeFetchCheckInHistoryService() {
  const checkInsRepository = new PrimaCheckInsRepository();
  const useCase = new FetchUserCheckInsService(checkInsRepository);

  return useCase;
}
