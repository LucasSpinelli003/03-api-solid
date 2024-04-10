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
      latitude: 41.8278787,
      longitude: -78.5869713,
    });

    console.log(gyms);

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ description: "teste-1" }),
      expect.objectContaining({ description: "teste-2" }),
    ]);
  });
});
