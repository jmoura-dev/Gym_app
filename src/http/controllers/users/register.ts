import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyRegistered } from '@/use-cases/errors/verify-already-email-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    await registerUserUseCase.execute({ name, email, password })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof EmailAlreadyRegistered) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
