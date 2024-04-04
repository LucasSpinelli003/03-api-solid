import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsService } from "./fetch-user-check-ins-history";

describe("Fetch User Check ins History", () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRepository;
  let sut: FetchUserCheckInsService;
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsService(inMemoryCheckInRepository);
  });

  it("should be able list history check ins by userId", async () => {
    await inMemoryCheckInRepository.create({
      gym_id: "teste",
      user_id: "userTeste",
    });
    await inMemoryCheckInRepository.create({
      gym_id: "teste2",
      user_id: "userTeste",
    });

    const { checkIns } = await sut.execute({
      userId: "userTeste",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "teste" }),
      expect.objectContaining({ gym_id: "teste2" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryCheckInRepository.create({
        gym_id: `teste-${i}`,
        user_id: "userTeste",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "userTeste",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
  });
});
