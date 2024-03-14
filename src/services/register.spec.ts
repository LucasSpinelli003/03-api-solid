import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";

describe("Register Service", () => {
  let inMemoryRepository: UsersRepository;
  let sut: RegisterService;

  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository();
    sut = new RegisterService(inMemoryRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });
  it("should not be able to register with the same email twice", async () => {
    const email = "john.doe@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  it("should be able to register", async () => {
    const email = "john.doe@gmail.com";

    const user = await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(user.user.id).toEqual(expect.any(String));
  });
});
