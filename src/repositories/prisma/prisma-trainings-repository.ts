import { prisma } from '@/lib/prisma'
import { TrainingsRepository } from '../trainings-repository'
import { Prisma } from '@prisma/client'

export class PrismaTrainingsRepository implements TrainingsRepository {
  async create(data: Prisma.TrainingUncheckedCreateInput) {
    const newTraining = await prisma.training.create({
      data,
    })

    return newTraining
  }

  async findById(id: string) {
    const training = await prisma.training.findUnique({
      where: {
        id,
      },
      include: {
        exercises: true,
      },
    })

    return training
  }

  async findManyByUserId(userId: string) {
    const trainings = await prisma.training.findMany({
      where: {
        user_id: userId,
      },
      include: {
        exercises: true,
      },
    })

    return trainings
  }

  async deleteById(id: string) {
    await prisma.training.delete({
      where: {
        id,
      },
    })
  }
}
