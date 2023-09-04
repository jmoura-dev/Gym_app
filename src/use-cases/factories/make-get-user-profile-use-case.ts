import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../users/getUserProfile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfile = new GetUserProfileUseCase(usersRepository)

  return getUserProfile
}
