import { InMemoryAssessmentsRepository } from '@/repositories/in-memory/in-memory-assessments-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAssessmentByIdUseCase } from './get-assessment-by-id'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let assessmentsRepository: InMemoryAssessmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetAssessmentByIdUseCase

describe('Get Assessment By Id UseCase', () => {
  beforeEach(() => {
    assessmentsRepository = new InMemoryAssessmentsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetAssessmentByIdUseCase(assessmentsRepository)
  })

  it('should be able to get the assessment by id', async () => {
    const user = await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const newAssessment = await assessmentsRepository.create({
      user_id: user.id,
    })

    const { assessment } = await sut.execute({
      id: newAssessment.id,
    })

    expect(assessment.id).toEqual(newAssessment.id)
  })

  it('should not be able to get the assessment with invalid id', async () => {
    const user = await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await assessmentsRepository.create({
      user_id: user.id,
    })

    expect(async () => {
      await sut.execute({
        id: 'invalid-search-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
