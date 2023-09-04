import { PrismaTrainingsRepository } from '@/repositories/prisma/prisma-trainings-repository'
import { FetchManyTrainingsUseCase } from '../trainings/fetch-many-trainings'

export function makeFetchManyTrainingUseCase() {
  const trainingRepository = new PrismaTrainingsRepository()
  const fetchManyTrainingUseCase = new FetchManyTrainingsUseCase(
    trainingRepository,
  )

  return fetchManyTrainingUseCase
}
