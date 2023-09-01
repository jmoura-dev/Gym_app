import { Assessment, Prisma } from '@prisma/client'

export interface AssessmentsRepository {
  create(data: Prisma.AssessmentUncheckedCreateInput): Promise<Assessment>
}
