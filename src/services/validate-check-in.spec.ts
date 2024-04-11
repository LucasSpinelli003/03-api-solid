import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found";

describe("Validate Check In Service", () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInService;

  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(inMemoryCheckInsRepository);
  });

  it("should be able to validade the check-in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: "fake_id",
      user_id: "fake_id",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn).toEqual(
      expect.objectContaining({ validated_at: expect.any(Date) }),
    );
  });

  it("should not be able to check-in with not existing id", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "fake_id",
      user_id: "fake_id",
    });

    await expect(() =>
      sut.execute({
        checkInId: "invalid-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
