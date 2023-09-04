import { PrismaTrainingsRepository } from '@/repositories/prisma/prisma-trainings-repository'
import { GetTrainingByIdUseCase } from '../trainings/get-training-by-id'

export function makeGetTrainingUseCase() {
  const trainingRepository = new PrismaTrainingsRepository()
  const getTrainingByIdUseCase = new GetTrainingByIdUseCase(trainingRepository)

  return getTrainingByIdUseCase
}
