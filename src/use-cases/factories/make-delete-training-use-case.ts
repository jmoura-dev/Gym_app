import { PrismaTrainingsRepository } from '@/repositories/prisma/prisma-trainings-repository'
import { DeleteTrainingUseCase } from '../trainings/delete-training'

export function makeDeleteTrainingUseCase() {
  const trainingRepository = new PrismaTrainingsRepository()
  const deleteTrainingUseCase = new DeleteTrainingUseCase(trainingRepository)

  return deleteTrainingUseCase
}
