import { PrismaAssessmentsRepository } from '@/repositories/prisma/prisma-assessment-repository'
import { GetAssessmentByIdUseCase } from '../assessments/get-assessment-by-id'

export function makeGetAssessmentUseCase() {
  const assessmentRepository = new PrismaAssessmentsRepository()
  const getAssessmentByIdUseCase = new GetAssessmentByIdUseCase(
    assessmentRepository,
  )

  return getAssessmentByIdUseCase
}
