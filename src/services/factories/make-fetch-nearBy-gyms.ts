import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms--repository";
import { FetchNearbyService } from "../fetch-nearby-gyms";

export function makeFetchNearByGymsRepository() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new FetchNearbyService(gymsRepository);

  return service;
}
