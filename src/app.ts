import { fastify } from 'fastify'
import { usersRoutes } from './http/controllers/usersRoutes'

export const app = fastify()

app.register(usersRoutes)
