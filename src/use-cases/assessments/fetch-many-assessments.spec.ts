import { InMemoryAssessmentsRepository } from '@/repositories/in-memory/in-memory-assessments-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyAssessmentsUseCase } from './fetch-many-assessments'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let assessmentsRepository: InMemoryAssessmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchManyAssessmentsUseCase

describe('Fetch Many Assessments UseCase', () => {
  beforeEach(() => {
    assessmentsRepository = new InMemoryAssessmentsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchManyAssessmentsUseCase(assessmentsRepository)
  })

  it('should be able to fetch many assessments in list', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const assessmentOne = await assessmentsRepository.create({
      user_id: user.id,
      height: '70',
      weight: '170',
    })

    const assessmentTwo = await assessmentsRepository.create({
      user_id: user.id,
      height: '60',
      weight: '165',
    })

    const { assessments } = await sut.execute({
      userId: user.id,
    })

    expect(assessments).toHaveLength(2)
    expect(assessments).toEqual([
      expect.objectContaining({ id: assessmentOne.id }),
      expect.objectContaining({ id: assessmentTwo.id }),
    ])
  })
})
