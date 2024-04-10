import { Gym, Prisma } from "@prisma/client";
export interface FindManyNearby {
  longitude: number;
  latitude: number;
}

export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  serchMany(query: string, page: number): Promise<Gym[]>;
  FindManyNearby(params: FindManyNearby): Promise<Gym[]>;
}
