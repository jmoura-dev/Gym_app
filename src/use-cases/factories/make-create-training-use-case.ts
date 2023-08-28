import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateTrainingUseCase } from '../trainings/create-training'
import { PrismaTrainingsRepository } from '@/repositories/prisma/prisma-trainings-repository'

export function makeCreateTrainingUseCase() {
  const trainingsRepository = new PrismaTrainingsRepository()
  const usersRepository = new PrismaUsersRepository()

  const createTrainingUseCase = new CreateTrainingUseCase(
    trainingsRepository,
    usersRepository,
  )

  return createTrainingUseCase
}
