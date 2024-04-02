import { beforeEach, expect, it, describe } from "vitest";
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./gym";

describe("Create Gym Service", () => {
  let inMemoryRepository: GymsRepository;
  let sut: CreateGymService;

  beforeEach(() => {
    inMemoryRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(inMemoryRepository);
  });

  it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      title:"teste",
      description:"",
      phone:"",
      latitude:38.7237576,
      longitude:-9.1614494,
    });
    console.log(gym)

    expect(gym.id).toEqual(expect.any(String))
  });
});
