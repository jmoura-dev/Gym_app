import { PrismaExerciseRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { CreateExerciseUseCase } from '../exercises/create-exercise'
import { PrismaTrainingsRepository } from '@/repositories/prisma/prisma-trainings-repository'

export function makeCreateExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const trainingRepository = new PrismaTrainingsRepository()

  const createExerciseUseCase = new CreateExerciseUseCase(
    exerciseRepository,
    trainingRepository,
  )

  return createExerciseUseCase
}
