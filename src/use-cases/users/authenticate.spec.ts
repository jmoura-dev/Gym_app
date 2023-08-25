import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate use-case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jackson moura',
      email: 'jackson@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jackson@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    await usersRepository.create({
      name: 'Jackson moura',
      email: 'jackson@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'invalid@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to authenticate with invalid password', async () => {
    await usersRepository.create({
      name: 'Jackson moura',
      email: 'jackson@email.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'jackson@email.com',
        password: 'invalid-password',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
