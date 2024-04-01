import { describe, beforeEach, it, expect } from "vitest";
import { GetUserProfileService } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/resource-not-found";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Get user profile", () => {
  let inMemoryRepository: InMemoryUsersRepository;
  let sut: GetUserProfileService;

  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(inMemoryRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await inMemoryRepository.create({
      name: "John Doe",
      email: "john.doe@mail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      id: createUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile by incorrectly id", async () => {
    expect(async () => {
      await sut.execute({
        id: "id_not_existent",
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
