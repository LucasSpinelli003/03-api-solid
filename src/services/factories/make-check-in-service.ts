import { CheckInService } from "../checkin";
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms--repository";

export function makeCheckInService() {
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrimaCheckInsRepository();
  const service = new CheckInService(checkInsRepository, gymsRepository);

  return service;
}
