import { fastify } from 'fastify'
import { usersRoutes } from './http/controllers/usersRoutes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
