import { Prisma } from '@prisma/client'
import { ExerciseRepository } from '../exercises-repository'
import { prisma } from '@/lib/prisma'

export class PrismaExerciseRepository implements ExerciseRepository {
  async create(data: Prisma.ExerciseUncheckedCreateInput) {
    const exercise = await prisma.exercise.create({
      data,
    })

    return exercise
  }

  async findById(id: string) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    return exercise
  }

  async delete(id: string) {
    const exerciseDeleted = await prisma.exercise.delete({
      where: {
        id,
      },
    })
    return exerciseDeleted
  }
}
