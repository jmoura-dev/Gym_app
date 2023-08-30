import { Prisma, Training } from '@prisma/client'
import { TrainingsRepository } from '../trainings-repository'
import { randomUUID } from 'crypto'

export class InMemoryTrainingsRepository implements TrainingsRepository {
  public items: Training[] = []

  async create(data: Prisma.TrainingUncheckedCreateInput) {
    const training = {
      id: data.id ?? randomUUID(),
      name: data.name || null,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(training)

    return training
  }

  async findById(id: string) {
    const training = this.items.find((item) => item.id === id)

    if (!training) {
      return null
    }

    return training
  }

  async findManyByUserId(userId: string) {
    const trainings = this.items.filter((item) => item.user_id === userId)

    return trainings
  }

  async deleteById(id: string) {
    let index = -1

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i
        break
      }
    }

    if (index !== -1) {
      this.items.splice(index, 1)
    } else {
      console.log('Value not found.')
    }
  }
}
