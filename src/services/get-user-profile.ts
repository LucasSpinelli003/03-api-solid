import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface getUserProfileRequest {
  id: string;
}

interface getUserProfileResponse {
  user: User;
}

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: getUserProfileRequest): Promise<getUserProfileResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFound();
    }

    return { user };
  }
}
