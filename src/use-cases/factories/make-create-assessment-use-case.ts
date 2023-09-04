import { PrismaAssessmentsRepository } from '@/repositories/prisma/prisma-assessment-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateAssessmentsUseCase } from '../assessments/create-assessment'

export function makeCreateExerciseUseCase() {
  const assessmentsRepository = new PrismaAssessmentsRepository()
  const usersRepository = new PrismaUsersRepository()

  const createAssessmentsUseCase = new CreateAssessmentsUseCase(
    assessmentsRepository,
    usersRepository,
  )

  return createAssessmentsUseCase
}
