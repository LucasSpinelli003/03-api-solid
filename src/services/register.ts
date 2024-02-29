import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

const prismaDao = new PrismaUsersRepository();

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export async function RegisterService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already in use!");
  }

  prismaDao.create({ name, email, password_hash });
}
