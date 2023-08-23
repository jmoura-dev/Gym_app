import { RegisterUserUseCase } from '@/use-cases/users/createUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EmailAlreadyRegistered } from '@/use-cases/errors/verify-already-email-error'

export class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const usersRepository = new PrismaUsersRepository()
      const registerUserUseCase = new RegisterUserUseCase(usersRepository)

      await registerUserUseCase.execute({ name, email, password })

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof EmailAlreadyRegistered) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }
  }
}
