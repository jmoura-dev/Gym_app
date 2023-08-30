import { Prisma, Training } from '@prisma/client'

export interface TrainingsRepository {
  create(data: Prisma.TrainingUncheckedCreateInput): Promise<Training>
  findById(id: string): Promise<Training | null>
  findManyByUserId(userId: string): Promise<Training[]>
  deleteById(id: string): Promise<void>
}
