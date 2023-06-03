import type { Application } from 'express'
import { UserController } from '../controllers/userController'
import { apiPaths } from '../../../shared/apiPaths'

export const attachUserRoutes = (app: Application): void => {
  app.post(apiPaths.user.register, UserController.register)
}
