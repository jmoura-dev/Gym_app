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

  async findById(id: string) {
    const assessment = await prisma.assessment.findUnique({
      where: {
        id,
      },
    })

    return assessment
  }

  async fetchManyByUserId(userId: string) {
    const assessments = await prisma.assessment.findMany({
      where: {
        user_id: userId,
      },
    })

    return assessments
  }
}
