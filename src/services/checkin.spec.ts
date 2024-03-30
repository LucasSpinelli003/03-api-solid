import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInService } from "./checkin";

describe("Check in test", () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(inMemoryCheckInRepository);
  });

  it("should be able to create a new check-in", async () => {
    const checkIn = await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
    });
    expect(checkIn.checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to create two check-ins", async () => {
    await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
    });
    await expect(() => {
      sut.execute({
        gymId: "testeGym",
        userId: "testeUser",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
