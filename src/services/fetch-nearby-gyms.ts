import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyServiceRequest {
  longitude: number;
  latitude: number;
}

interface FetchNearbyServiceResponse {
  gyms: Gym[];
}

export class FetchNearbyService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    latitude,
    longitude,
  }: FetchNearbyServiceRequest): Promise<FetchNearbyServiceResponse> {
    const gyms = await this.gymsRepository.FindManyNearby({
      latitude,
      longitude,
    });

    return { gyms };
  }
}
