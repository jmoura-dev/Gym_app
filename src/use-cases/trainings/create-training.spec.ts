import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTrainingUseCase } from './create-training'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let trainingsRepository: InMemoryTrainingsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateTrainingUseCase

describe('Training Use-Case', async () => {
  beforeEach(() => {
    trainingsRepository = new InMemoryTrainingsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateTrainingUseCase(trainingsRepository, usersRepository)
  })

  it('should be able to create training', async () => {
    const user = await usersRepository.create({
      id: '1',
      name: 'John doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { training } = await sut.execute({
      data: {
        user_id: '1',
      },
    })

    expect(training.user_id).toEqual(user.id)
  })

  it('should not be able to create training without a registered user ', async () => {
    await usersRepository.create({
      id: '1',
      name: 'John doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        data: {
          user_id: '2',
        },
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
