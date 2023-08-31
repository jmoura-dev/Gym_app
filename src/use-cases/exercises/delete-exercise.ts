import { ExerciseRepository } from '@/repositories/exercises-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { Exercise } from '@prisma/client'

interface DeleteExerciseUseCaseRequest {
  id: string
}

interface DeleteExerciseUseCaseResponse {
  exerciseDeleted: Exercise
}

export class DeleteExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    id,
  }: DeleteExerciseUseCaseRequest): Promise<DeleteExerciseUseCaseResponse> {
    const exercise = await this.exerciseRepository.findById(id)

    if (!exercise) {
      throw new ResourceNotFound()
    }

    const exerciseDeleted = await this.exerciseRepository.delete(id)

    return {
      exerciseDeleted,
    }
  }
}
