import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchManyTrainingsUseCase } from './fetch-many-trainings'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let trainingsRepository: InMemoryTrainingsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchManyTrainingsUseCase

describe('Fetch many Trainings Use-Case', () => {
  beforeEach(() => {
    trainingsRepository = new InMemoryTrainingsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchManyTrainingsUseCase(trainingsRepository)
  })

  it('should be able to fetch training list', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'João',
      email: 'joao@example.com',
      password_hash: await hash('123456', 6),
    })

    await trainingsRepository.create({
      user_id: 'user-id',
      name: 'Peitoral',
    })

    await trainingsRepository.create({
      user_id: 'user-id',
      name: 'Perna',
    })

    const { trainings } = await sut.execute({ userId: 'user-id' })

    expect(trainings).toHaveLength(2)
    expect(trainings).toEqual([
      expect.objectContaining({ name: 'Peitoral' }),
      expect.objectContaining({ name: 'Perna' }),
    ])
  })
})
