import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInService } from "./checkin";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-off-check-ins-error";

describe("Check in test", () => {
  let inMemoryCheckInRepository: InMemoryCheckInsRepository;
  let inMemoryGymsRepository: InMemoryGymsRepository;
  let sut: CheckInService;

  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(inMemoryCheckInRepository, inMemoryGymsRepository);

    await inMemoryGymsRepository.create({
      id: "testeGym",
      title: "teste",
      description: "",
      latitude: new Decimal(-23.5339776),
      longitude: new Decimal(-46.563328),
      phone: "",
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a new check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
      userLatitude: -23.5339776,
      userLongitude: -46.563328,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to chech-in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
      userLatitude: -23.5339776,
      userLongitude: -46.563328,
    });

    await expect(() =>
      sut.execute({
        gymId: "testeGym",
        userId: "testeUser",
        userLatitude: -23.5339776,
        userLongitude: -46.563328,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });
  it("should be able to chech-in twice but in differents days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
      userLatitude: -23.5339776,
      userLongitude: -46.563328,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gymId: "testeGym",
      userId: "testeUser",
      userLatitude: -23.5339776,
      userLongitude: -46.563328,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distance gym", async () => {
    inMemoryGymsRepository.create({
      id: "testeGym02",
      title: "teste",
      description: "",
      latitude: new Decimal(-23.4814413),
      longitude: new Decimal(-46.4738478),
      phone: "",
    });

    await expect(() =>
      sut.execute({
        gymId: "testeGym02",
        userId: "testeUser",
        userLatitude: -23.5339776,
        userLongitude: -46.563328,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
