import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { LateCheckInValidationError } from "./errors/late-check-in-validate-error";
import { ResourceNotFoundError } from "./errors/resource-not-found";

describe("Validate Check In Service", () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInService;

  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(inMemoryCheckInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("should not be able to validate", async () => {
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

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40));

    const checkIn = await inMemoryCheckInsRepository.create({
      gym_id: "fake_id",
      user_id: "fake_id",
    });

    const twentyMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyMinutesInMs);

    expect(() =>
      sut.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
