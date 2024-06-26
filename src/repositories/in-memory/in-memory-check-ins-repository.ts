import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async findManyById(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });
    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      createdAt: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }

  async findById(checkInId: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === checkInId);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInPosition = this.checkIns.findIndex(
      (checkInItem) => checkInItem.id === checkIn.id,
    );
    if (checkInPosition >= 0) {
      this.checkIns[checkInPosition] = checkIn;
    }

    return checkIn;
  }
}
