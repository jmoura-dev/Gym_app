import { TrainingsRepository } from '@/repositories/trainings-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Prisma, Training } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface CreateTrainingUseCaseRequest {
  data: Prisma.TrainingUncheckedCreateInput
}

interface CreateTrainingUseCaseResponse {
  training: Training
}

export class CreateTrainingUseCase {
  constructor(
    private trainingsRepository: TrainingsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    data,
  }: CreateTrainingUseCaseRequest): Promise<CreateTrainingUseCaseResponse> {
    const user = await this.usersRepository.findById(data.user_id)

    if (!user) {
      throw new ResourceNotFound()
    }

    const training = await this.trainingsRepository.create(data)

    return {
      training,
    }
  }
}
