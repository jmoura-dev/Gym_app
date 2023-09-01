import { Prisma } from '@prisma/client'
import { AssessmentsRepository } from '../assessments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAssessmentsRepository implements AssessmentsRepository {
  async create(data: Prisma.AssessmentUncheckedCreateInput) {
    const assessment = await prisma.assessment.create({
      data,
    })

    return assessment
  }
}
