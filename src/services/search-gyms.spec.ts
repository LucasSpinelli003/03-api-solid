import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsService } from "./search-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Search gyms service", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(inMemoryGymsRepository);
  });

  it("should be able to serch gym by title", async () => {
    await inMemoryGymsRepository.create({
      title: "javascript-gym",
      description: "teste",
      phone: "11321321321",
      latitude: 38.7237576,
      longitude: -9.1614494,
    });
    await inMemoryGymsRepository.create({
      title: "typescript-gym",
      description: "teste",
      phone: "11321321321",
      latitude: 38.7237576,
      longitude: -9.1614494,
    });

    const { gyms } = await sut.execute({
      query: "javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript-gym" }),
    ]);
  });

  it("should be able to paginate gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `typescript-${i}`,
        description: "teste",
        phone: "11321321321",
        latitude: 38.7237576,
        longitude: -9.1614494,
      });
    }
    const { gyms } = await sut.execute({
      query: "typescript",
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "typescript-21" }),
      expect.objectContaining({ title: "typescript-22" }),
    ]);
  });
});
