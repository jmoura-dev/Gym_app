import { PrismaExerciseRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { DeleteExerciseUseCase } from '../exercises/delete-exercise'

export function makeDeleteExerciseUseCase() {
  const exerciseRepository = new PrismaExerciseRepository()
  const deleteExerciseUseCase = new DeleteExerciseUseCase(exerciseRepository)

  return deleteExerciseUseCase
}
