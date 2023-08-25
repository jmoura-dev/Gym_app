import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './getUserProfile'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('GetUserProfile use-case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    await usersRepository.create({
      id: 'user-profile',
      name: 'John doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: 'user-profile',
    })

    expect(user.email).toEqual('john@example.com')
  })

  it('should not be able to get user profile with invalid id', async () => {
    await usersRepository.create({
      id: 'user-profile',
      name: 'John doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        userId: 'invalid-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
