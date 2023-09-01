import { Assessment, Prisma } from '@prisma/client'

export interface AssessmentsRepository {
  create(data: Prisma.AssessmentUncheckedCreateInput): Promise<Assessment>
  findById(id: string): Promise<Assessment | null>
  fetchManyByUserId(userId: string): Promise<Assessment[]>
}
