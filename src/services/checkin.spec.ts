import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInService } from "./checkin";

describe("Check in test", () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(inMemoryCheckInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a new check-in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
    });

    console.log(checkIn.createdAt);
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to chech-in twice in the same day", async () => {
    await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
    });
    
    await expect(() =>
      sut.execute({
        gymId: "testeGym",
        userId: "testeUser",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
