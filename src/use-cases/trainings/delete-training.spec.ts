import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTrainingUseCase } from './delete-training'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let trainingsRepository: InMemoryTrainingsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeleteTrainingUseCase

describe('Delete training Use-Case', () => {
  beforeEach(() => {
    trainingsRepository = new InMemoryTrainingsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteTrainingUseCase(trainingsRepository)
  })

  it('should be able to delete training', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'João',
      email: 'joao@example.com',
      password_hash: await hash('123456', 6),
    })

    const treino1 = await trainingsRepository.create({
      user_id: 'user-id',
      name: 'Peitoral',
    })

    await trainingsRepository.create({
      user_id: 'user-id',
      name: 'Perna',
    })

    await sut.execute({
      id: treino1.id,
    })

    const arrayWithoutTheDeletedItem =
      await trainingsRepository.findManyByUserId('user-id')

    expect(arrayWithoutTheDeletedItem.length).toEqual(1)
    expect(arrayWithoutTheDeletedItem).toEqual([
      expect.objectContaining({ name: 'Perna' }),
    ])
  })
})
