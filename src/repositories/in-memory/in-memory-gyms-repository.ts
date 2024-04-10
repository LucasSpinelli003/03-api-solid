import { Gym, Prisma } from "@prisma/client";
import { FindManyNearby, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCordinates } from "@/services/utils/get-distance-between-cordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async serchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async FindManyNearby(params: FindManyNearby) {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );
      return distance < 10;
    });
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((gym) => {
      return gym.id === id;
    });

    if (!gym) {
      return null;
    }
    return gym;
  }
}
