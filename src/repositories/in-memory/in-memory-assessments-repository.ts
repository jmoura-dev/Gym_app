import { Assessment, Prisma } from '@prisma/client'
import { AssessmentsRepository } from '../assessments-repository'
import { randomUUID } from 'crypto'

export class InMemoryAssessmentsRepository implements AssessmentsRepository {
  public items: Assessment[] = []

  async create(data: Prisma.AssessmentUncheckedCreateInput) {
    const assessments = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      weight: data.weight ? new Prisma.Decimal(data.weight.toString()) : null,
      height: data.height ? new Prisma.Decimal(data.height.toString()) : null,
      body_mass_index: data.body_mass_index
        ? new Prisma.Decimal(data.body_mass_index.toString())
        : null,
      fat_percentage: data.fat_percentage
        ? new Prisma.Decimal(data.fat_percentage.toString())
        : null,
      created_at: new Date(),
    }

    this.items.push(assessments)

    return assessments
  }
}
