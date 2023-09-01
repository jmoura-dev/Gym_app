import { AssessmentsRepository } from '@/repositories/assessments-repository'
import { Assessment } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface GetAssessmentByIdUseCaseRequest {
  id: string
}

interface GetAssessmentByIdUseCaseResponse {
  assessment: Assessment
}

export class GetAssessmentByIdUseCase {
  constructor(private assessmentRepository: AssessmentsRepository) {}

  async execute({
    id,
  }: GetAssessmentByIdUseCaseRequest): Promise<GetAssessmentByIdUseCaseResponse> {
    const assessment = await this.assessmentRepository.findById(id)

    if (!assessment) {
      throw new ResourceNotFound()
    }

    return {
      assessment,
    }
  }
}
