import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricService } from "./get-user-metrics";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricService;
describe("Get User Metrics Service", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricService(inMemoryCheckInsRepository);
  });

  it("should be able to get User Metrics", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "teste_gym",
      user_id: "teste_user",
    });
    await inMemoryCheckInsRepository.create({
      gym_id: "teste_gym2",
      user_id: "teste_user",
    });
    const { checkInsCount } = await sut.execute({ userId: "teste_user" });
    expect(checkInsCount).toEqual(2);
  });
});
