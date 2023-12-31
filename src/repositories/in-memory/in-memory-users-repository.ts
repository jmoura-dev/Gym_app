import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({
    id,
    name,
    email,
    password_hash,
    isAdmin,
  }: Prisma.UserCreateInput) {
    const user = {
      id: id ?? randomUUID(),
      name,
      email,
      password_hash,
      isAdmin: isAdmin ?? false,
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
