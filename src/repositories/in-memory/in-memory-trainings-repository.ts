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
}
