import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInService } from "./checkin";

describe("Check in test", () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(inMemoryCheckInRepository);
  });

  it("should be able to create a new checkIn", async () => {
    const checkIn = await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
    });

    console.log(checkIn);

    expect(checkIn.checkIn.id).toEqual(expect.any(String));
  });
});
