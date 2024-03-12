import { describe } from "node:test";
import { expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Service", () => {
  it("should be able to authenticate", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(inMemoryRepository);

    const email = "john.doe@gmail.com";

    await inMemoryRepository.create({
      name: "John Doe",
      email,
      password_hash: await hash("123456", 6),
    });

    const user = await sut.execute({
      email,
      password: "123456",
    });

    expect(user.user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong mail", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(inMemoryRepository);

    expect(() =>
      sut.execute({
        email: "john.doe@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const inMemoryRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(inMemoryRepository);

    await inMemoryRepository.create({
      name: "John Doe",
      email: "john.doe@mail.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "john.doe@mail.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
