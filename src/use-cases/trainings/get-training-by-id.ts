import { TrainingsRepository } from '@/repositories/trainings-repository'
import { Training } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface GetTrainingByIdUseCaseRequest {
  id: string
}

interface GetTrainingByIdUseCaseResponse {
  training: Training
}

export class GetTrainingByIdUseCase {
  constructor(private trainingRepository: TrainingsRepository) {}

  async execute({
    id,
  }: GetTrainingByIdUseCaseRequest): Promise<GetTrainingByIdUseCaseResponse> {
    const training = await this.trainingRepository.findById(id)

    if (!training) {
      throw new ResourceNotFound()
    }

    return {
      training,
    }
  }
}
