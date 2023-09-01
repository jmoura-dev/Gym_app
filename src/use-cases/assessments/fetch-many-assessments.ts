import { AssessmentsRepository } from '@/repositories/assessments-repository'
import { Assessment } from '@prisma/client'

interface FetchManyAssessmentsUseCaseRequest {
  userId: string
}

interface FetchManyAssessmentsUseCaseResponse {
  assessments: Assessment[]
}

export class FetchManyAssessmentsUseCase {
  constructor(private assessmentsRepository: AssessmentsRepository) {}

  async execute({
    userId,
  }: FetchManyAssessmentsUseCaseRequest): Promise<FetchManyAssessmentsUseCaseResponse> {
    const assessments = await this.assessmentsRepository.fetchManyByUserId(
      userId,
    )

    return {
      assessments,
    }
  }
}
