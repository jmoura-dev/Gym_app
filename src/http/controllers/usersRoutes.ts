import { UsersController } from './UsersController'
import { FastifyInstance } from 'fastify'

const usersController = new UsersController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', usersController.register)
}
