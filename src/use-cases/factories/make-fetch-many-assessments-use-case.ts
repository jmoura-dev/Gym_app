import { PrismaAssessmentsRepository } from '@/repositories/prisma/prisma-assessment-repository'
import { FetchManyAssessmentsUseCase } from '../assessments/fetch-many-assessments'

export function makeFetchManyTrainingUseCase() {
  const assessmentsRepository = new PrismaAssessmentsRepository()
  const fetchManyAssessmentsUseCase = new FetchManyAssessmentsUseCase(
    assessmentsRepository,
  )

  return fetchManyAssessmentsUseCase
}
