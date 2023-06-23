import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './createUser'
import { compare } from 'bcryptjs'
import { EmailAlreadyRegistered } from '../errors/verify-already-email'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use-Case', async () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jackson',
      email: 'jackson@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to crypto password', async () => {
    const { user } = await sut.execute({
      name: 'Jackson',
      email: 'jackson@email.com',
      password: '123456',
    })

    const verifyHash = await compare('123456', user.password_hash)

    expect(verifyHash).toEqual(true)
  })

  it('should not be able to register with same e-mail', async () => {
    await sut.execute({
      name: 'Jackson',
      email: 'jackson@email.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Pedro',
        email: 'jackson@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyRegistered)
  })
})
