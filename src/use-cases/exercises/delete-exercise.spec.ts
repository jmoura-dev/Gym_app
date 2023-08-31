import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteExerciseUseCase } from './delete-exercise'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InMemoryTrainingsRepository } from '@/repositories/in-memory/in-memory-trainings-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

let exerciseRepository: InMemoryExercisesRepository
let usersRepository: InMemoryUsersRepository
let trainingRepository: InMemoryTrainingsRepository
let sut: DeleteExerciseUseCase

describe('Delete exercise Use Case', () => {
  beforeEach(() => {
    exerciseRepository = new InMemoryExercisesRepository()
    usersRepository = new InMemoryUsersRepository()
    trainingRepository = new InMemoryTrainingsRepository()
    sut = new DeleteExerciseUseCase(exerciseRepository)
  })

  it('should be able to delete exercise', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'joão',
      email: 'joao@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const training = await trainingRepository.create({
      user_id: 'user-id',
    })

    await exerciseRepository.create({
      id: 'exercise-1',
      name: 'Leg-press',
      focus: 'Quadríceps',
      amount: 3,
      repetitions: 12,
      training_id: training.id,
    })

    const exercise = await exerciseRepository.create({
      id: 'exercise-2',
      name: 'Supino-reto',
      focus: 'Superior-peito',
      amount: 3,
      repetitions: 12,
      training_id: training.id,
    })

    const { exerciseDeleted } = await sut.execute({
      id: exercise.id,
    })

    const arrayWithoutExerciseDeleted = exerciseRepository.items.filter(
      (item) => item.id !== exerciseDeleted.id,
    )

    expect(arrayWithoutExerciseDeleted).toHaveLength(1)
    expect(arrayWithoutExerciseDeleted).toEqual([
      expect.objectContaining({ name: 'Leg-press' }),
    ])
    expect(exerciseDeleted.name).toEqual('Supino-reto')
  })

  it('should not be able to delete exercise with invalid id', async () => {
    await usersRepository.create({
      id: 'user-id',
      name: 'joão',
      email: 'joao@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const training = await trainingRepository.create({
      user_id: 'user-id',
    })

    await exerciseRepository.create({
      id: 'exercise-1',
      name: 'Leg-press',
      focus: 'Quadríceps',
      amount: 3,
      repetitions: 12,
      training_id: training.id,
    })

    expect(async () => {
      await sut.execute({
        id: 'exercise-2',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
