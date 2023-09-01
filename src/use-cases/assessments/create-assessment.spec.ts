import { InMemoryAssessmentsRepository } from '@/repositories/in-memory/in-memory-assessments-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAssessmentsUseCase } from './create-assessment'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let assessmentsRepository: InMemoryAssessmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateAssessmentsUseCase

describe('Create Assessment UseCase', () => {
  beforeEach(() => {
    assessmentsRepository = new InMemoryAssessmentsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateAssessmentsUseCase(assessmentsRepository, usersRepository)
  })

  it('should be able to create a new assessment', async () => {
    const user = await usersRepository.create({
      name: 'jack',
      email: 'jack@email.com',
      password_hash: await hash('123456', 6),
    })

    const { assessment } = await sut.execute({
      data: {
        user_id: user.id,
      },
    })

    expect(assessment.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new assessment with invalid user_id', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'jack',
      email: 'jack@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        data: {
          user_id: 'invalid-user-id',
        },
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
