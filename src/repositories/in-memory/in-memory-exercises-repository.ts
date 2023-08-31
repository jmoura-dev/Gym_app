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

  async findById(id: string) {
    const exercise = this.items.find((item) => item.id === id)

    if (!exercise) {
      return null
    }

    return exercise
  }

  async delete(id: string) {
    let index = -1

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i
        break
      }
    }

    const exercise = this.items[index]

    if (index !== -1) {
      this.items.splice(index, 1)
    } else {
      console.log('Value not found.')
    }

    return exercise
  }
}
