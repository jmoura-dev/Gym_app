import { AssessmentsRepository } from '@/repositories/assessments-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Assessment, Prisma } from '@prisma/client'
import { ResourceNotFound } from '../errors/resource-not-found'

interface CreateAssessmentsUseCaseRequest {
  data: Prisma.AssessmentUncheckedCreateInput
}

interface CreateAssessmentsUseCaseResponse {
  assessment: Assessment
}

export class CreateAssessmentsUseCase {
  constructor(
    private assessmentsRepository: AssessmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    data,
  }: CreateAssessmentsUseCaseRequest): Promise<CreateAssessmentsUseCaseResponse> {
    const user = await this.usersRepository.findById(data.user_id)

    if (!user) {
      throw new ResourceNotFound()
    }

    const assessment = await this.assessmentsRepository.create(data)

    return {
      assessment,
    }
  }
}
