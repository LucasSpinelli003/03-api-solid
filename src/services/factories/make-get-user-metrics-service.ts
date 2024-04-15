import { GetUserMetricService } from "../get-user-metrics";
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrimaCheckInsRepository();
  const useCase = new GetUserMetricService(checkInsRepository);

  return useCase;
}
