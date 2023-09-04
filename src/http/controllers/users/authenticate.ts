import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodyAuthenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodyAuthenticateSchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
