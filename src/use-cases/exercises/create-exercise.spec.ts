import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExerciseUseCase } from './create-exercise'
import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let exerciseRepository: InMemoryExercisesRepository
let trainingRepository: InMemoryTrainingsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateExerciseUseCase

describe('Exercise Use Case', () => {
  beforeEach(() => {
    exerciseRepository = new InMemoryExercisesRepository()
    trainingRepository = new InMemoryTrainingsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateExerciseUseCase(exerciseRepository, trainingRepository)
  })

  it('should be able to create a new exercise', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'joão',
      email: 'joao@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const training = await trainingRepository.create({
      user_id: 'user-id',
    })

    const { exercise } = await sut.execute({
      data: {
        name: 'Supino-reto',
        focus: 'Superior-peito',
        amount: 3,
        repetitions: 12,
        training_id: training.id,
      },
    })

    console.log(exercise)

    expect(exercise.name).toEqual('Supino-reto')
    expect(exercise.focus).toEqual('Superior-peito')
  })

  it('should not be able to create a new exercise without invalid training_id', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'joão',
      email: 'joao@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await trainingRepository.create({
      user_id: 'user-id',
    })

    expect(async () => {
      await sut.execute({
        data: {
          name: 'Supino-reto',
          focus: 'Superior-peito',
          amount: 3,
          repetitions: 12,
          training_id: 'invalid-id',
        },
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
