import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTrainingByIdUseCase } from './get-training-by-id'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let trainingsRepository: InMemoryTrainingsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetTrainingByIdUseCase

describe('Get Training Use-Case', () => {
  beforeEach(() => {
    trainingsRepository = new InMemoryTrainingsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetTrainingByIdUseCase(trainingsRepository)
  })

  it('should be able to get training by id', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const newTraining = await trainingsRepository.create({
      user_id: 'user-id',
    })

    const { training } = await sut.execute({
      id: newTraining.id,
    })

    expect(training.id).toEqual(expect.any(String))
  })

  it('should not be able to get training without invalid id', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    await trainingsRepository.create({
      user_id: 'user-id',
    })

    expect(async () => {
      await sut.execute({
        id: 'invalid-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
