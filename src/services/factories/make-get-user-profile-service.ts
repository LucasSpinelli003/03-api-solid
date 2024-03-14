import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfile } from "../get-user-profile";

export function makeGetUserProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserProfile = new GetUserProfile(prismaUsersRepository);
  return getUserProfile;
}
