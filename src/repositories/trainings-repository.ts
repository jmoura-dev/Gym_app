import { Prisma, Training } from '@prisma/client'

export interface TrainingsRepository {
  create(data: Prisma.TrainingUncheckedCreateInput): Promise<Training>
  findById(id: string): Promise<Training | null>
}
