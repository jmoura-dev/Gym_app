import { Exercise, Prisma } from '@prisma/client'
import { ExerciseRepository } from '../exercises-repository'
import { randomUUID } from 'crypto'

export class InMemoryExercisesRepository implements ExerciseRepository {
  public items: Exercise[] = []

  async create(data: Prisma.ExerciseUncheckedCreateInput) {
    const exercise = {
      id: data.id ?? randomUUID(),
      name: data.name,
      focus: data.focus,
      amount: data.amount,
      repetitions: data.repetitions,
      link_demo: data.link_demo ?? null,
      training_id: data.training_id,
    }

    this.items.push(exercise)

    return exercise
  }
}
