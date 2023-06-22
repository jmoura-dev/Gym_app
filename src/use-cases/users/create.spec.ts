import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './create'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use-Case', async () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'jackson',
      email: 'jackson@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
