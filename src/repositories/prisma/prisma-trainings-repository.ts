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
}