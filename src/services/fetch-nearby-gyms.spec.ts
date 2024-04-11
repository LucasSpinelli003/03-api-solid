import { describe, beforeEach, it, expect } from "vitest";
import { FetchNearbyService } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyService;

describe("Fetch nearby service", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyService(inMemoryGymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "teste",
      description: "teste-1",
      phone: "",
      latitude: 41.8312199,
      longitude: -78.6592216,
    });
    await inMemoryGymsRepository.create({
      title: "teste",
      description: "teste-2",
      phone: "",
      latitude: 41.8302064,
      longitude: -78.5203862,
    });
    const { gyms } = await sut.execute({
      userLatitude: 41.8278787,
      userLongitude: -78.5869713,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ description: "teste-1" }),
      expect.objectContaining({ description: "teste-2" }),
    ]);
  });

  it("shoud not be able to fecth gym with more than 10km", async () => {
    await inMemoryGymsRepository.create({
      title: "Far Gym",
      description: "teste-1",
      phone: "",
      latitude: 41.8312199,
      longitude: -78.6592216,
    });

    await inMemoryGymsRepository.create({
      title: "Near Gym",
      description: "teste-1",
      phone: "",
      latitude: -2.5527762,
      longitude: -79.8721455,
    });

    const { gyms } = await sut.execute({
      userLatitude: -2.5527762,
      userLongitude: -79.8721455,
    });

    expect(gyms).toHaveLength(1);
  });
});
