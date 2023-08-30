import { TrainingsRepository } from '@/repositories/trainings-repository'
import { Training } from '@prisma/client'
import { EmptyTrainingListError } from '../errors/Empty-training-list-error'

interface FetchManyTrainingsUseCaseRequest {
  userId: string
}

interface FetchManyTrainingsUseCaseResponse {
  trainings: Training[]
}

export class FetchManyTrainingsUseCase {
  constructor(private trainingsRepository: TrainingsRepository) {}

  async execute({
    userId,
  }: FetchManyTrainingsUseCaseRequest): Promise<FetchManyTrainingsUseCaseResponse> {
    const trainings = await this.trainingsRepository.findManyByUserId(userId)

    if (trainings.length === 0) {
      throw new EmptyTrainingListError()
    }

    return {
      trainings,
    }
  }
}
