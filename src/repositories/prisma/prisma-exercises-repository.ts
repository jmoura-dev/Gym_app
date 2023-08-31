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
}
