import { ExerciseRepository } from '@/repositories/exercises-repository'
import { TrainingsRepository } from '@/repositories/trainings-repository'
import { Exercise } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface CreateExerciseUseCaseRequest {
  data: {
    id?: string
    name: string
    focus: string
    amount: number
    repetitions: number
    link_demo?: string | null
    training_id: string
  }
}

interface CreateExerciseUseCaseResponse {
  exercise: Exercise
}

export class CreateExerciseUseCase {
  constructor(
    private exerciseRepository: ExerciseRepository,
    private trainingRepository: TrainingsRepository,
  ) {}

  async execute({
    data,
  }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
    const training = await this.trainingRepository.findById(data.training_id)

    if (!training) {
      throw new ResourceNotFound()
    }

    const exercise = await this.exerciseRepository.create(data)

    return {
      exercise,
    }
  }
}
