import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymRequestService {
  query: string;
  page: number;
}

interface SearchGymResponseService {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymRequestService): Promise<SearchGymResponseService> {
    const gyms = await this.gymsRepository.serchMany(query, page);

    return { gyms };
  }
}
