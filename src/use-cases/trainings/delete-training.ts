import { TrainingsRepository } from '@/repositories/trainings-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

interface DeleteTrainingUseCaseRequest {
  id: string
}

type DeleteTrainingUseCaseResponse = void

export class DeleteTrainingUseCase {
  constructor(private trainingRepository: TrainingsRepository) {}

  async execute({
    id,
  }: DeleteTrainingUseCaseRequest): Promise<DeleteTrainingUseCaseResponse> {
    const training = await this.trainingRepository.findById(id)

    if (!training) {
      throw new ResourceNotFound()
    }

    await this.trainingRepository.deleteById(training.id)
  }
}
