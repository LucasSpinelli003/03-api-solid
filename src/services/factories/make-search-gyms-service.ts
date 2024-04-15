import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms--repository";
import { SearchGymsService } from "../search-gym";

export function makeRegisterService() {
  const searchGymsRepository = new PrismaGymsRepository();
  const service = new SearchGymsService(searchGymsRepository);

  return service;
}
