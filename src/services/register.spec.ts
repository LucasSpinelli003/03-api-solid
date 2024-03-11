import { describe } from "node:test";
import { expect, it } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Service", () => {
  it("should hash user password upon registration", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });
  it("should not be able to register with the same email twice", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryRepository);

    const email = "john.doe@gmail.com";

    await registerService.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerService.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  it("should be able to register", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(inMemoryRepository);

    const email = "john.doe@gmail.com";

    const user = await registerService.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(user.user.id).toEqual(expect.any(String));
  });
});
